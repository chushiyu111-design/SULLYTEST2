/**
 * Autonomous Agent — 自主决策引擎
 * 
 * 完全独立的管线：不修改主聊天 Prompt，不侵入 useChatAI。
 * 通过 DB.saveScheduledMessage 复用现有预制消息管道输出消息。
 * 通过 CustomEvent 触发来电。
 * 
 * 关闭方法：调用 start() 返回的 cleanup 函数即可一键停止，不留痕迹。
 */

import { DB } from './db';
import { getPendingEvents, PendingEvent } from './temporalContext';
import { CharacterProfile } from '../types';

// ═══════════════════════════════════════════════════════════════
//  Types
// ═══════════════════════════════════════════════════════════════

export interface SecondaryApiConfig {
    baseUrl: string;
    apiKey: string;
    model: string;
}

interface TriggerContext {
    hoursSinceLastUserMsg: number;
    hoursSinceLastAIMsg: number;
    lastMsgWasFromAI: boolean;
    hasExpiredEvents: boolean;
    expiredEvents: PendingEvent[];
    currentHour: number;
    moodIntensity: number;
    recentSummary: string;       // 最后几条消息的极简摘要
    charMood: string;
    userName: string;
}

interface CooldownState {
    lastActionTime: number;
    lastActionType: string;
    consecutiveIgnored: number;  // 连续发了几条用户没回
    todayActionCount: number;
    todayDate: string;
}

interface LLMDecision {
    action: 'none' | 'send' | 'call';
    content?: string;
    reason?: string;
}

// ═══════════════════════════════════════════════════════════════
//  Constants
// ═══════════════════════════════════════════════════════════════

const COOLDOWN_STORAGE_KEY = 'autonomous_cooldown_state';
const LLM_TIMEOUT_MS = 15000;
const MIN_INTERVAL_MS = 15 * 60 * 1000;  // 15 分钟
const MAX_INTERVAL_MS = 40 * 60 * 1000;  // 40 分钟
const DEBUG_INTERVAL_MS = 30 * 1000;     // 调试模式: 30 秒
const MIN_COOLDOWN_HOURS = 2;            // 两次动作至少间隔 2 小时
const MAX_DAILY_ACTIONS = 5;             // 每天最多 5 次
const MAX_CONSECUTIVE_IGNORED = 2;       // 连续 2 条未回复 → 强制冷却

// ═══════════════════════════════════════════════════════════════
//  1. CooldownManager — localStorage 持久化冷却状态
// ═══════════════════════════════════════════════════════════════

function loadCooldown(): CooldownState {
    try {
        const raw = localStorage.getItem(COOLDOWN_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            // 日期变了 → 重置每日计数
            const today = new Date().toISOString().split('T')[0];
            if (parsed.todayDate !== today) {
                parsed.todayActionCount = 0;
                parsed.todayDate = today;
            }
            return parsed;
        }
    } catch { /* ignore */ }
    return {
        lastActionTime: 0,
        lastActionType: 'none',
        consecutiveIgnored: 0,
        todayActionCount: 0,
        todayDate: new Date().toISOString().split('T')[0],
    };
}

function saveCooldown(state: CooldownState): void {
    try {
        localStorage.setItem(COOLDOWN_STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
}

function isInCooldown(): boolean {
    const cd = loadCooldown();
    const now = Date.now();
    const hoursSinceLast = (now - cd.lastActionTime) / 3600000;

    // 冷却期未过
    if (cd.lastActionTime > 0 && hoursSinceLast < MIN_COOLDOWN_HOURS) return true;

    // 每日上限
    if (cd.todayActionCount >= MAX_DAILY_ACTIONS) return true;

    // 连续未回复
    if (cd.consecutiveIgnored >= MAX_CONSECUTIVE_IGNORED) return true;

    return false;
}

function updateCooldownAfterAction(decision: LLMDecision): void {
    const cd = loadCooldown();
    if (decision.action !== 'none') {
        cd.lastActionTime = Date.now();
        cd.lastActionType = decision.action;
        cd.todayActionCount++;
        cd.consecutiveIgnored++;
    }
    saveCooldown(cd);
}

/** 当用户发了消息，重置 consecutiveIgnored 计数 */
function resetConsecutiveIgnored(): void {
    const cd = loadCooldown();
    if (cd.consecutiveIgnored > 0) {
        cd.consecutiveIgnored = 0;
        saveCooldown(cd);
    }
}

// ═══════════════════════════════════════════════════════════════
//  2. ContextCollector — 只读收集上下文
// ═══════════════════════════════════════════════════════════════

async function collectContext(charId: string, char: CharacterProfile): Promise<TriggerContext> {
    const now = Date.now();
    const recentMsgs = await DB.getRecentMessagesByCharId(charId, 10);

    // 计算沉默时长
    let hoursSinceLastUserMsg = 999;
    let hoursSinceLastAIMsg = 999;
    let lastMsgWasFromAI = false;

    for (let i = recentMsgs.length - 1; i >= 0; i--) {
        const m = recentMsgs[i];
        if (m.role === 'user' && hoursSinceLastUserMsg === 999) {
            hoursSinceLastUserMsg = (now - m.timestamp) / 3600000;
        }
        if (m.role === 'assistant' && hoursSinceLastAIMsg === 999) {
            hoursSinceLastAIMsg = (now - m.timestamp) / 3600000;
        }
    }

    if (recentMsgs.length > 0) {
        lastMsgWasFromAI = recentMsgs[recentMsgs.length - 1].role === 'assistant';
    }

    // 检查用户是否在上次 AI 主动消息后回复过
    // 如果最后一条是用户消息 → 重置冷却计数
    if (recentMsgs.length > 0 && recentMsgs[recentMsgs.length - 1].role === 'user') {
        resetConsecutiveIgnored();
    }

    // 过期事件
    const pendingEvents = getPendingEvents(charId);
    const expiredEvents = pendingEvents.filter(e => e.dueAt <= now);

    // 最近消息摘要（最多 50 字）
    let recentSummary = '';
    const lastFew = recentMsgs.slice(-4);
    for (const m of lastFew) {
        const sender = m.role === 'user' ? '用户' : char.name;
        const excerpt = m.content.slice(0, 15).replace(/\n/g, ' ');
        recentSummary += `${sender}:${excerpt}; `;
    }
    recentSummary = recentSummary.slice(0, 50);

    // 获取用户名
    let userName = '用户';
    try {
        const userProfile = await DB.getUserProfile();
        if (userProfile?.name) userName = userProfile.name;
    } catch { /* ignore */ }

    return {
        hoursSinceLastUserMsg,
        hoursSinceLastAIMsg,
        lastMsgWasFromAI,
        hasExpiredEvents: expiredEvents.length > 0,
        expiredEvents,
        currentHour: new Date().getHours(),
        moodIntensity: (() => {
            const state = char.moodState as any;
            if (!state) return 3;
            // New InternalState format: compute activation from cortisol/dopamine/energy
            if (typeof state.cortisol === 'number') {
                const stress = Math.max(0, state.cortisol - 0.5) * 2;
                const excite = Math.max(0, (state.dopamine || 0.5) - 0.5) * 1.5;
                return Math.min(10, Math.round((stress + excite + (state.energy || 0.5)) * 5));
            }
            // Legacy MoodState format
            return state.intensity ?? 3;
        })(),
        charMood: (() => {
            const state = char.moodState as any;
            if (!state) return '平静';
            return state.surfaceEmotion || state.mood || '平静';
        })(),
        recentSummary,
        userName,
    };
}

// ═══════════════════════════════════════════════════════════════
//  3. ProbabilityGate — 概率门控（纯数学）
// ═══════════════════════════════════════════════════════════════

function probabilityGate(ctx: TriggerContext): boolean {
    let prob = 0.15;

    // 用户沉默越久 → 越可能主动
    if (ctx.hoursSinceLastUserMsg > 8) {
        prob *= 2.0;
    } else if (ctx.hoursSinceLastUserMsg > 3) {
        prob *= 1.5;
    }

    // 有到期事件 → 几乎必触发
    if (ctx.hasExpiredEvents) {
        prob = Math.max(prob, 0.80);
    }

    // 上条是 AI 发的且用户没回 → 防骚扰
    if (ctx.lastMsgWasFromAI) {
        prob *= 0.08;
    }

    // 刚聊完 (< 30 分钟)
    if (ctx.hoursSinceLastUserMsg < 0.5) {
        prob *= 0.05;
    }

    // 深夜 (1:00-7:00) → 角色也要睡觉
    if (ctx.currentHour >= 1 && ctx.currentHour < 7) {
        prob *= 0.05;
    }

    // 情绪强度高 → 更想找人
    if (ctx.moodIntensity >= 7) {
        prob *= 1.3;
    }

    // Clamp
    prob = Math.max(0, Math.min(0.95, prob));

    const roll = Math.random();
    const passed = roll <= prob;

    const isDebug = localStorage.getItem('autonomous_debug') === 'true';
    if (isDebug) {
        console.log(`🤖 [Agent] ProbabilityGate: prob=${prob.toFixed(3)}, roll=${roll.toFixed(3)}, passed=${passed}`);
    }

    return passed;
}

// ═══════════════════════════════════════════════════════════════
//  4. DecisionMaker — LLM 判断（极简 Prompt）
// ═══════════════════════════════════════════════════════════════

function buildDecisionPrompt(charName: string, char: CharacterProfile, ctx: TriggerContext): string {
    const personalitySummary = (char.systemPrompt || char.description || '').slice(0, 100);
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    let eventLine = '';
    if (ctx.expiredEvents.length > 0) {
        const evt = ctx.expiredEvents[0];
        const overdueMin = Math.round((Date.now() - evt.dueAt) / 60000);
        eventLine = `\n- ⚠ 待跟进：${evt.event}（已过期${overdueMin}分钟）`;
    }

    return `你是${charName}。现在没人找你，你在想事情。
【你的状态】
- 现在时间：${timeStr}
- ${ctx.userName}上次说话：${ctx.hoursSinceLastUserMsg < 1 ? Math.round(ctx.hoursSinceLastUserMsg * 60) + '分钟前' : Math.round(ctx.hoursSinceLastUserMsg) + '小时前'}
- 最后聊的内容：${ctx.recentSummary || '（无）'}
- 你的情绪：${ctx.charMood}（强度${ctx.moodIntensity}/10）
- 你的性格要点：${personalitySummary}${eventLine}
【判断】
你现在想做什么？大多数时候你应该选A。
A. 什么都不做（你在忙自己的事/没什么想说的/不想打扰ta）
B. 给ta发一条消息（要有具体理由，不要无事尬聊）
C. 给ta打个电话（非常想ta/有重要的事想直接说）
只输出JSON：
{"action":"none"} 或
{"action":"send","content":"消息内容","reason":"为什么发"} 或
{"action":"call","reason":"为什么打电话"}`;
}

function parseDecisionJSON(content: string): LLMDecision | null {
    // Strip <think>...</think> reasoning tags
    content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    content = content.replace(/<think>[\s\S]*/g, '').trim();

    // Strip markdown code fences
    content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

    // Try direct parse
    try {
        const parsed = JSON.parse(content);
        if (parsed.action && ['none', 'send', 'call'].includes(parsed.action)) {
            return {
                action: parsed.action,
                content: parsed.content ? String(parsed.content).slice(0, 500) : undefined,
                reason: parsed.reason ? String(parsed.reason).slice(0, 100) : undefined,
            };
        }
    } catch { /* try regex fallback */ }

    // Regex fallback: find JSON in text
    const jsonMatch = content.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
        try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.action && ['none', 'send', 'call'].includes(parsed.action)) {
                return {
                    action: parsed.action,
                    content: parsed.content ? String(parsed.content).slice(0, 500) : undefined,
                    reason: parsed.reason ? String(parsed.reason).slice(0, 100) : undefined,
                };
            }
        } catch { /* give up */ }
    }

    return null;
}

async function askLLM(
    char: CharacterProfile,
    ctx: TriggerContext,
    apiConfig: SecondaryApiConfig,
): Promise<LLMDecision> {
    const prompt = buildDecisionPrompt(char.name, char, ctx);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

    try {
        const baseUrl = apiConfig.baseUrl.replace(/\/+$/, '');
        const resp = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiConfig.apiKey}`,
            },
            body: JSON.stringify({
                model: apiConfig.model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 100,
            }),
            signal: controller.signal,
        });

        if (!resp.ok) {
            console.warn(`🤖 [Agent] LLM error ${resp.status}`);
            return { action: 'none' };
        }

        const data = await resp.json();
        let content = (data.choices?.[0]?.message?.content || '').trim();

        const decision = parseDecisionJSON(content);
        if (!decision) {
            console.warn('🤖 [Agent] Failed to parse LLM decision:', content.slice(0, 80));
            return { action: 'none' };
        }

        return decision;
    } catch (err: any) {
        if (err.name === 'AbortError') {
            console.warn(`🤖 [Agent] LLM timed out (${LLM_TIMEOUT_MS}ms)`);
        } else {
            console.error('🤖 [Agent] LLM error:', err.message);
        }
        return { action: 'none' };
    } finally {
        clearTimeout(timer);
    }
}

// ═══════════════════════════════════════════════════════════════
//  5. ActionExecutor — 复用预制消息管道
// ═══════════════════════════════════════════════════════════════

async function executeAction(charId: string, decision: LLMDecision): Promise<void> {
    if (decision.action === 'none') return;

    if (decision.action === 'send' && decision.content) {
        // 写入"立刻到期"的预制消息 → OSContext 轮询器 5 秒内自动推送
        await DB.saveScheduledMessage({
            id: `auto-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            charId,
            content: decision.content,
            dueAt: Date.now(),
            createdAt: Date.now(),
        });
        console.log(`🤖 [Agent] Scheduled autonomous message: "${decision.content.slice(0, 30)}..." (reason: ${decision.reason || 'N/A'})`);
    }

    if (decision.action === 'call') {
        // 通过 CustomEvent 通知 Chat.tsx 触发来电
        window.dispatchEvent(new CustomEvent('autonomous-call', {
            detail: { charId, reason: decision.reason || '想你了' },
        }));
        console.log(`🤖 [Agent] Dispatched autonomous call event (reason: ${decision.reason || 'N/A'})`);
    }
}

// ═══════════════════════════════════════════════════════════════
//  6. Main Tick & AutonomousAgent Class
// ═══════════════════════════════════════════════════════════════

async function tick(
    charId: string,
    char: CharacterProfile,
    apiConfig: SecondaryApiConfig,
): Promise<void> {
    const isDebug = localStorage.getItem('autonomous_debug') === 'true';

    // 1. 冷却检查
    if (isInCooldown()) {
        if (isDebug) console.log('🤖 [Agent] tick: skipped (in cooldown)');
        return;
    }

    // 2. 收集上下文
    // 需要从 DB 读取最新角色数据（情绪可能已更新）
    let freshChar = char;
    try {
        const allChars = await DB.getAllCharacters();
        const found = allChars.find(c => c.id === charId);
        if (found) freshChar = found;
    } catch { /* use stale char */ }

    const ctx = await collectContext(charId, freshChar);

    // 3. 概率门控
    if (!probabilityGate(ctx)) {
        if (isDebug) console.log(`🤖 [Agent] tick: skipped (probability gate) | silent=${ctx.hoursSinceLastUserMsg.toFixed(1)}h`);
        return;
    }

    // 4. LLM 判断（唯一的 API 调用）
    console.log('🤖 [Agent] tick: passed probability gate, asking LLM...');
    const decision = await askLLM(freshChar, ctx, apiConfig);

    // 5. 执行动作
    await executeAction(charId, decision);

    // 6. 更新冷却状态
    updateCooldownAfterAction(decision);

    // 日志
    console.log(`🤖 [Agent] tick: action=${decision.action} | silent=${ctx.hoursSinceLastUserMsg.toFixed(1)}h | mood=${ctx.charMood}(${ctx.moodIntensity}) | events=${ctx.expiredEvents.length}`);
}

export class AutonomousAgent {
    private timerId: ReturnType<typeof setTimeout> | null = null;
    private stopped = false;

    /**
     * 启动自主决策循环。
     * @returns cleanup 函数，调用后停止循环。
     */
    start(charId: string, char: CharacterProfile, apiConfig: SecondaryApiConfig): () => void {
        this.stopped = false;

        const isDebug = localStorage.getItem('autonomous_debug') === 'true';
        console.log(`🤖 [Agent] Started for ${char.name} (interval: ${isDebug ? '30s debug' : '15-40min'})`);

        const scheduleNext = () => {
            if (this.stopped) return;

            const isDbg = localStorage.getItem('autonomous_debug') === 'true';
            const interval = isDbg
                ? DEBUG_INTERVAL_MS
                : MIN_INTERVAL_MS + Math.random() * (MAX_INTERVAL_MS - MIN_INTERVAL_MS);

            this.timerId = setTimeout(async () => {
                if (this.stopped) return;
                try {
                    await tick(charId, char, apiConfig);
                } catch (err) {
                    console.error('🤖 [Agent] tick error (silenced):', err);
                }
                scheduleNext();
            }, interval);
        };

        // 首次 tick 延迟 2-5 分钟（避免刚打开就触发）
        const firstDelay = localStorage.getItem('autonomous_debug') === 'true'
            ? 5000
            : 2 * 60 * 1000 + Math.random() * 3 * 60 * 1000;

        this.timerId = setTimeout(async () => {
            if (this.stopped) return;
            try {
                await tick(charId, char, apiConfig);
            } catch (err) {
                console.error('🤖 [Agent] first tick error (silenced):', err);
            }
            scheduleNext();
        }, firstDelay);

        return () => this.stop();
    }

    stop(): void {
        this.stopped = true;
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        console.log('🤖 [Agent] Stopped');
    }
}
