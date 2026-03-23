/**
 * Hormone Dynamics Engine — 激素动力学引擎
 *
 * 纯计算模块，零 LLM 调用。
 * 负责将副模型的"语义感知"转化为持久的内部状态，
 * 通过 EMA 平滑、互抑修正、时间衰减三步实现仿真。
 *
 * 设计哲学：
 *   - 副模型只负责"感知"（输出人话标签）
 *   - 本模块负责"生理"（数值计算 + 化学反应）
 *   - 主模型只负责"表现"（基于注入的躯体描述自由涌现）
 */

import { InternalState, MoodState } from '../types/character';

// ═══════════════════════════════════════════════════════════════
//  Types
// ═══════════════════════════════════════════════════════════════

/** 副模型输出的语义感知标签 */
export type SenseDelta = '+high' | '+medium' | '+low' | 'stable' | '-low' | '-medium' | '-high';

/** 副模型的原始感知输出（人话维度） */
export interface RawSenseOutput {
    excitement: SenseDelta;     // 期待/兴奋 → 映射到 dopamine
    stability: SenseDelta;      // 安全感 → 映射到 serotonin
    pressure: SenseDelta;       // 压力/紧张 → 映射到 cortisol
    closeness: SenseDelta;      // 亲密感 → 映射到 oxytocin
    focus: SenseDelta;          // 专注度 → 映射到 norepinephrine
    relief: SenseDelta;         // 释然感 → 映射到 endorphin
    energyDrain: SenseDelta;    // 精力消耗 → 映射到 energy（注意方向反转）
}

/** 7 种递质的键名 */
const HORMONE_KEYS = [
    'dopamine', 'serotonin', 'cortisol', 'oxytocin',
    'norepinephrine', 'endorphin', 'energy',
] as const;
type HormoneKey = typeof HORMONE_KEYS[number];

// ═══════════════════════════════════════════════════════════════
//  Constants — EMA 学习率 (α)
// ═══════════════════════════════════════════════════════════════

/**
 * 每种递质的上升/下降 α 值。
 * α 大 → 新感知权重高 → 变化快
 * α 小 → 旧状态权重高 → 变化慢
 */
const EMA_RATES: Record<HormoneKey, { up: number; down: number }> = {
    dopamine:        { up: 0.70, down: 0.60 },  // 来得快去得也快
    serotonin:       { up: 0.15, down: 0.10 },  // 情绪基线极慢变化
    cortisol:        { up: 0.80, down: 0.15 },  // 来得极快去得极慢
    oxytocin:        { up: 0.20, down: 0.20 },  // 缓慢积累（背叛时代码另行处理）
    norepinephrine:  { up: 0.60, down: 0.40 },  // 中等速度
    endorphin:       { up: 0.50, down: 0.60 },  // 来得一般，消散略快
    energy:          { up: 0.30, down: 0.20 },  // 精力缓慢波动
};

/** 单轮最大变化幅度限制（保险丝） */
const MAX_DELTA_PER_ROUND = 0.30;

/** 基线值（"平静"状态） */
const BASELINE = 0.5;

/** 偏离基线多少才算"有感觉"（用于注入判断） */
export const DEVIATION_THRESHOLD = 0.15;

// ═══════════════════════════════════════════════════════════════
//  Constants — 时间衰减半衰期（小时）
// ═══════════════════════════════════════════════════════════════

const HALF_LIFE_HOURS: Record<HormoneKey, number> = {
    dopamine:        1.0,   // 兴奋很短暂
    serotonin:       24.0,  // 情绪基线极慢回归
    cortisol:        4.0,   // 压力约4小时半衰
    oxytocin:        12.0,  // 信任缓慢消退
    norepinephrine:  2.0,   // 专注持续一般
    endorphin:       1.5,   // 释然感较短暂
    energy:          Infinity,  // 能量不自然回归到基线，有专门的恢复逻辑
};

// ═══════════════════════════════════════════════════════════════
//  1. 语义标签 → 数值映射
// ═══════════════════════════════════════════════════════════════

const DELTA_MAP: Record<SenseDelta, number> = {
    '+high':   0.85,
    '+medium': 0.70,
    '+low':    0.60,
    'stable':  0.50,    // 不变 = 基线
    '-low':    0.40,
    '-medium': 0.30,
    '-high':   0.15,
};

/**
 * 将副模型的人话感知转为 7 个目标数值。
 * 注意: energyDrain 方向反转（消耗大 → energy 低）
 */
export function mapSenseToTargets(sense: RawSenseOutput): Record<HormoneKey, number> {
    return {
        dopamine:        DELTA_MAP[sense.excitement]   ?? BASELINE,
        serotonin:       DELTA_MAP[sense.stability]    ?? BASELINE,
        cortisol:        DELTA_MAP[sense.pressure]     ?? BASELINE,
        oxytocin:        DELTA_MAP[sense.closeness]    ?? BASELINE,
        norepinephrine:  DELTA_MAP[sense.focus]        ?? BASELINE,
        endorphin:       DELTA_MAP[sense.relief]       ?? BASELINE,
        // energyDrain "+high" 意味着消耗大 → energy 应该低
        energy: 1.0 - (DELTA_MAP[sense.energyDrain] ?? BASELINE),
    };
}

// ═══════════════════════════════════════════════════════════════
//  2. EMA 平滑
// ═══════════════════════════════════════════════════════════════

function applyEMA(prev: number, target: number, αUp: number, αDown: number): number {
    const isRising = target > prev;
    const α = isRising ? αUp : αDown;
    let result = prev * (1 - α) + target * α;

    // 单轮变化幅度限制（保险丝）
    const delta = result - prev;
    if (Math.abs(delta) > MAX_DELTA_PER_ROUND) {
        result = prev + Math.sign(delta) * MAX_DELTA_PER_ROUND;
    }

    return result;
}

/**
 * 对 7 个维度分别应用 EMA 平滑。
 * @param prev 上一轮的最终状态
 * @param targets 本轮副模型感知映射后的目标值
 */
export function applyEMASmoothing(
    prev: Record<HormoneKey, number>,
    targets: Record<HormoneKey, number>,
): Record<HormoneKey, number> {
    const result = {} as Record<HormoneKey, number>;
    for (const key of HORMONE_KEYS) {
        const rates = EMA_RATES[key];
        result[key] = applyEMA(prev[key], targets[key], rates.up, rates.down);
    }
    return result;
}

// ═══════════════════════════════════════════════════════════════
//  3. 互抑修正（化学反应）
// ═══════════════════════════════════════════════════════════════

/**
 * 基于递质之间的生理互动关系，对 EMA 后的数值进行修正。
 * 所有修正都是柔性的（乘法削减），不会产生负值。
 */
export function applyCrossEffects(state: Record<HormoneKey, number>): Record<HormoneKey, number> {
    const s = { ...state };

    // ── 皮质醇↑ → 压低血清素 (压力破坏情绪稳定) ──
    if (s.cortisol > 0.6) {
        const pressure = (s.cortisol - 0.6) * 0.5; // 最大削减: (0.95-0.6)*0.5 = 17.5%
        s.serotonin *= (1 - pressure);
    }

    // ── 皮质醇↑ → 催产素效果被削弱 (紧张时难感到亲密) ──
    if (s.cortisol > 0.6) {
        const pressure = (s.cortisol - 0.6) * 0.3;
        s.oxytocin *= (1 - pressure);
    }

    // ── 催产素↑ → 缓冲皮质醇 (安全的关系减压) ──
    if (s.oxytocin > 0.6) {
        const comfort = (s.oxytocin - 0.6) * 0.3;
        s.cortisol *= (1 - comfort);
    }

    // ── 内啡肽↑ → 加速皮质醇下降 (释然促进恢复) ──
    if (s.endorphin > 0.5) {
        const relief = (s.endorphin - 0.5) * 0.4;
        s.cortisol *= (1 - relief);
    }

    // ── 多巴胺↑ → 能量消耗加速 (兴奋是耗能的) ──
    if (s.dopamine > 0.7) {
        s.energy -= (s.dopamine - 0.7) * 0.15;
    }

    // ── 去甲肾上腺素↑ → 能量微耗 (高度专注也耗能) ──
    if (s.norepinephrine > 0.7) {
        s.energy -= (s.norepinephrine - 0.7) * 0.08;
    }

    // ── 能量↓ → 拉低血清素 + 去甲肾上腺素 (累了就容易 emo + 走神) ──
    if (s.energy < 0.3) {
        const penalty = (0.3 - s.energy) * 0.4;
        s.serotonin -= penalty;
        s.norepinephrine -= penalty;
    }

    // ── Clamp 所有值到 [0.05, 0.95] ──
    for (const key of HORMONE_KEYS) {
        s[key] = Math.max(0.05, Math.min(0.95, s[key]));
    }

    return s;
}

// ═══════════════════════════════════════════════════════════════
//  4. 时间衰减
// ═══════════════════════════════════════════════════════════════

/**
 * 基于距离上次更新的时间差，让各递质自然回归基线。
 * 使用半衰期公式: value = baseline + (value - baseline) × 0.5^(hours/halfLife)
 *
 * @param state 当前持久化的状态
 * @param elapsedMs 距上次更新的毫秒数
 */
export function applyTimeDecay(
    state: Record<HormoneKey, number>,
    elapsedMs: number,
): Record<HormoneKey, number> {
    const s = { ...state };
    const hours = elapsedMs / 3600000;

    // 如果间隔太短（< 10秒），不做时间衰减
    if (hours < 0.003) return s;

    for (const key of HORMONE_KEYS) {
        if (key === 'energy') continue; // 能量有专门的恢复逻辑
        const halfLife = HALF_LIFE_HOURS[key];
        if (!isFinite(halfLife)) continue;

        // 回归基线
        const decayFactor = Math.pow(0.5, hours / halfLife);
        s[key] = BASELINE + (s[key] - BASELINE) * decayFactor;
    }

    // ── 能量恢复逻辑（特殊处理）──
    const currentHour = new Date().getHours();
    const isLateNight = currentHour >= 1 && currentHour < 6;
    const recoveryRate = isLateNight ? 0.02 : 0.08; // 深夜恢复慢
    s.energy = Math.min(0.90, s.energy + hours * recoveryRate);

    // 如果离线前皮质醇高（"带着气睡觉"），能量恢复打折
    if (s.cortisol > 0.6) {
        const penalty = (s.cortisol - 0.6) * 0.5; // 最多 50% 打折
        s.energy -= hours * recoveryRate * penalty;
    }

    // Clamp
    for (const key of HORMONE_KEYS) {
        s[key] = Math.max(0.05, Math.min(0.95, s[key]));
    }

    return s;
}

// ═══════════════════════════════════════════════════════════════
//  5. 完整计算管线
// ═══════════════════════════════════════════════════════════════

/**
 * 从副模型的语义感知到最终的 InternalState，一步到位。
 *
 * @param sense 副模型输出的人话感知
 * @param previous 上一轮持久化的 InternalState（可能为 undefined）
 * @returns 新的 InternalState（不含 innerVoice，留给 generateInnerVoice 填充）
 */
export function computeNewState(
    sense: RawSenseOutput,
    previous: InternalState | undefined,
): Omit<InternalState, 'innerVoice' | 'surfaceEmotion'> {
    const now = Date.now();

    // 初始化：第一轮没有历史状态
    if (!previous) {
        const targets = mapSenseToTargets(sense);
        return {
            ...targets,
            roundCount: 1,
            updatedAt: now,
        };
    }

    // 提取上一轮的 7 维数值
    const prevHormones: Record<HormoneKey, number> = {
        dopamine: previous.dopamine,
        serotonin: previous.serotonin,
        cortisol: previous.cortisol,
        oxytocin: previous.oxytocin,
        norepinephrine: previous.norepinephrine,
        endorphin: previous.endorphin,
        energy: previous.energy,
    };

    // Step 0: 时间衰减（在 EMA 之前，基于上次更新到现在的时间差）
    const elapsed = now - previous.updatedAt;
    const decayed = applyTimeDecay(prevHormones, elapsed);

    // Step 1: 语义标签 → 目标数值
    const targets = mapSenseToTargets(sense);

    // Step 2: EMA 平滑（新旧加权）
    const smoothed = applyEMASmoothing(decayed, targets);

    // Step 3: 互抑修正（化学反应）
    const final = applyCrossEffects(smoothed);

    return {
        ...final,
        roundCount: previous.roundCount + 1,
        updatedAt: now,
    };
}

// ═══════════════════════════════════════════════════════════════
//  6. 旧格式迁移
// ═══════════════════════════════════════════════════════════════

/** 判断一个 moodState 是旧格式还是新格式 */
export function isLegacyMoodState(state: any): state is MoodState {
    return state && typeof state.mood === 'string' && typeof state.intensity === 'number' && !('dopamine' in state);
}

/** 将旧 MoodState 转换为新 InternalState 的初始值 */
export function migrateLegacyMoodState(legacy: MoodState): InternalState {
    const intensity = legacy.intensity / 10; // 1-10 → 0.1-1.0

    // 尝试从情绪词推断递质状态
    const mood = legacy.mood || '平静';
    const isNegative = /[委屈难过伤心生气烦躁焦虑紧张害怕不安愤怒]/.test(mood);
    const isPositive = /[开心高兴快乐幸福心动甜蜜放松满足期待兴奋]/.test(mood);

    return {
        dopamine:        isPositive ? BASELINE + intensity * 0.3 : BASELINE - intensity * 0.1,
        serotonin:       isNegative ? BASELINE - intensity * 0.3 : BASELINE + intensity * 0.1,
        cortisol:        isNegative ? BASELINE + intensity * 0.3 : BASELINE - intensity * 0.1,
        oxytocin:        isPositive ? BASELINE + intensity * 0.2 : BASELINE,
        norepinephrine:  intensity > 0.6 ? BASELINE + intensity * 0.2 : BASELINE,
        endorphin:       BASELINE,
        energy:          BASELINE,
        innerVoice:      legacy.innerVoice || '',
        surfaceEmotion:  legacy.mood || '平静',
        roundCount:      legacy.roundCount || 1,
        updatedAt:       legacy.updatedAt || Date.now(),
    };
}

/**
 * 获取标准化的 InternalState，自动处理迁移。
 * 如果传入旧格式，转为新格式；如果传入新格式或 undefined，直接返回。
 */
export function resolveInternalState(moodState: InternalState | MoodState | undefined): InternalState | undefined {
    if (!moodState) return undefined;
    if (isLegacyMoodState(moodState)) return migrateLegacyMoodState(moodState);
    return moodState as InternalState;
}

/** 创建默认的平静基线状态 */
export function createBaselineState(): InternalState {
    return {
        dopamine: BASELINE,
        serotonin: BASELINE,
        cortisol: BASELINE,
        oxytocin: BASELINE,
        norepinephrine: BASELINE,
        endorphin: BASELINE,
        energy: 0.7,  // 默认精力偏高（刚开始聊天）
        innerVoice: '',
        surfaceEmotion: '平静',
        roundCount: 0,
        updatedAt: Date.now(),
    };
}

// ═══════════════════════════════════════════════════════════════
//  7. 辅助工具
// ═══════════════════════════════════════════════════════════════

/** 计算综合激活度（用于自主决策引擎的概率门控） */
export function computeActivationLevel(state: InternalState): number {
    // 综合考虑压力、兴奋、精力
    const stressComponent = Math.max(0, state.cortisol - BASELINE) * 2;
    const exciteComponent = Math.max(0, state.dopamine - BASELINE) * 1.5;
    const energyComponent = state.energy;
    return Math.min(10, Math.round((stressComponent + exciteComponent + energyComponent) * 5));
}

/** 检查是否有任何维度偏离基线超过阈值（用于决定是否注入 prompt） */
export function hasSignificantDeviation(state: InternalState): boolean {
    for (const key of HORMONE_KEYS) {
        if (Math.abs(state[key] - BASELINE) > DEVIATION_THRESHOLD) {
            return true;
        }
    }
    // 能量的基线是 0.7 而非 0.5，特殊判断
    if (Math.abs(state.energy - 0.7) > DEVIATION_THRESHOLD) return true;
    return false;
}

/** 格式化为日志字符串 */
export function formatStateLog(state: InternalState): string {
    const vals = HORMONE_KEYS.map(k => `${k.slice(0, 4)}=${state[k].toFixed(2)}`).join(' ');
    return `${vals} | ${state.surfaceEmotion} | R${state.roundCount}`;
}
