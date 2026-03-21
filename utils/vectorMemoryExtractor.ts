/**
 * Vector Memory Extractor — Write Path
 * 
 * Two modes:
 *   1. maybeExtract()  — auto mode, fires after every AI reply, checks interval
 *   2. batchExtractFromMessages() — manual mode, processes a user-specified message range
 * 
 * Both use the same LLM prompt to extract 1-3 memories per window,
 * embed them via the Embedding API, and store in IndexedDB.
 */

import { CharacterProfile, VectorMemory, APIConfig } from '../types';
import { EmbeddingService, getEmbeddingConfig } from './embeddingService';
import { DB } from './db';

// Module-level concurrency lock: one extraction per character at a time
const extractingChars = new Set<string>();

// Tail buffer: exclude the N most recent messages from auto-extraction
// to prevent extracting memories from messages the user might roll/regenerate.
const TAIL_BUFFER = 20;

interface ExtractResult {
    action: 'create' | 'update' | 'skip' | 'invalidate';
    targetId?: string;
    title?: string;
    content?: string;
    emotionalJourney?: string;
    importance?: number;
    reason?: string;  // Used by 'invalidate' action
}

// Shared prompt builder
function buildExtractionPrompt(
    charName: string,
    existingHeaders: { id: string; title: string; content?: string; importance: number }[],
    formattedMsgs: string
): string {
    const existingMemStr = existingHeaders.length > 0
        ? existingHeaders.map(h => `- [ID:${h.id}] "${h.title}": ${(h.content || '').slice(0, 60)} (重要度:${h.importance})`).join('\n')
        : '（暂无已有记忆）';

    return `你是 ${charName}，正在整理自己的记忆笔记。
当前时间：${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}

以下是你已有的记忆条目：
${existingMemStr}

以下是最近的对话记录：
${formattedMsgs}

请根据最近的对话，判断是否需要记录新的记忆或更新已有记忆。

规则：
1. 只记录值得长期记住的事情（用户的重要信息、关键事件、情感转折、承诺约定等）
2. **不同的事件、话题、时间段 → 必须 create 新记忆**。"update" 仅用于：对话中出现了与某条已有记忆描述的**完全相同的事件**的新进展或补充细节。不要把不相干的内容塞进同一条记忆！
3. 日常寒暄、无实质内容的对话选择 "skip"
4. 通话记录（标注 [通话记录] 的消息）同样重要，不要忽略
5. 每次输出 0 到 3 条记忆操作。用 JSON 数组格式，单条也用数组。只输出 JSON，不要加任何文字说明。
6. importance 评分：1-3 日常琐事，4-6 有意义的事件，7-8 重要里程碑，9-10 改变关系的关键时刻
7. content 必须精简，不超过 150 字！emotionalJourney 不超过 50 字！
8. 如果用户在对话中**纠正了之前的信息**（如"我其实不喜欢XX"、"我已经不再XX了"、"之前说错了"），且已有记忆中存在与之矛盾的条目，请使用 "invalidate" 标记该旧记忆为过时
9. 优先 create，谨慎 update。宁可多创建几条独立记忆，也不要把不同事件合并到一条里

请以 JSON 数组格式回答（不要用 markdown 代码块包裹，不要加任何额外说明文字）：
[
  {
    "action": "create" | "update" | "skip" | "invalidate",
    "targetId": "update 或 invalidate 时填写，指向已有记忆的 ID",
    "title": "8-15字事件描述短语（如：因纪念日被忘记而争吵、在西湖第一次牵手）",
    "content": "精简描述，不超过150字",
    "emotionalJourney": "情感变化，不超过50字",
    "importance": 1到10的整数,
    "reason": "仅 invalidate 时填写，说明为何此记忆已过时"
  }
]`;
}

// Format messages for the LLM prompt
function formatMessages(
    msgs: { timestamp: number; type: string; role: string; content: string }[],
    charName: string
): string {
    return msgs.map(m => {
        const time = new Date(m.timestamp).toLocaleString('zh-CN', {
            month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false
        });
        const prefix = m.type === 'call_log' ? '[通话记录] ' : '';
        const speaker = m.role === 'user' ? '用户' : charName;
        return `[${time}] ${prefix}${speaker}: ${m.content.slice(0, 300)}`;
    }).join('\n');
}

// Semantic dedup: check if a pre-computed vector is too similar to cached memories.
// Uses in-memory cache to avoid repeated full-table scans during a batch.
function findDuplicate(newVec: number[], vectorCache: Map<string, number[]>): string | null {
    if (vectorCache.size === 0) return null;

    let maxSim = 0;
    let maxId = '';

    for (const [id, vec] of vectorCache) {
        if (vec.length !== newVec.length) continue;
        const sim = EmbeddingService.cosineSimilarity(newVec, vec);
        if (sim > maxSim) {
            maxSim = sim;
            maxId = id;
        }
    }

    // If > 0.92 similarity, treat as duplicate → should update instead
    return maxSim > 0.92 ? maxId : null;
}

// Process a single extraction result.
// vectorCache is maintained across the batch to avoid repeated DB scans for dedup.
async function processResult(
    result: ExtractResult,
    charId: string,
    embeddingApiKey: string,
    vectorCache: Map<string, number[]>,
    sourceMessageIds: number[] = []
): Promise<boolean> {
    const config = getEmbeddingConfig();

    if (result.action === 'skip') {
        return false;
    }

    // Handle invalidation — mark a memory as deprecated
    if (result.action === 'invalidate' && result.targetId) {
        const target = await DB.getVectorMemoryById(result.targetId);
        if (target && !target.deprecated) {
            const updatedMem: VectorMemory = {
                ...target,
                deprecated: true,
                deprecatedReason: result.reason || '信息已过时',
                updatedAt: Date.now(),
            };
            await DB.saveVectorMemory(updatedMem);
            // Remove deprecated memory from dedup cache
            vectorCache.delete(result.targetId);
            console.log(`🧠 [VectorExtract] Invalidated: "${target.title}" — ${updatedMem.deprecatedReason}`);
            return true;
        }
        return false;
    }

    if (!result.title || !result.content) {
        return false;
    }

    const textToEmbed = `${result.title}: ${result.content}`;

    if (result.action === 'create') {
        // Embed once — reuse vector for dedup check to avoid double embedding
        const vector = await EmbeddingService.embed(textToEmbed, undefined, embeddingApiKey);
        const duplicateId = findDuplicate(vector, vectorCache);

        if (duplicateId) {
            console.log(`🧠 [VectorExtract] Semantic duplicate (sim>0.92), updating ${duplicateId}`);
            const target = await DB.getVectorMemoryById(duplicateId);
            if (target) {
                const mergedSourceIds = Array.from(new Set([...(target.sourceMessageIds || []), ...sourceMessageIds]));
                const updatedMem: VectorMemory = {
                    ...target,
                    title: result.title,
                    content: result.content,
                    emotionalJourney: result.emotionalJourney || target.emotionalJourney,
                    importance: Math.min(Math.max(result.importance || target.importance, 1), 10),
                    updatedAt: Date.now(),
                    vector,
                    modelId: config.model,
                    sourceMessageIds: mergedSourceIds,
                };
                await DB.saveVectorMemory(updatedMem);
                vectorCache.set(duplicateId, vector); // update cache with new vector
                console.log(`🧠 [VectorExtract] Dedup-updated: "${updatedMem.title}"`);
                return true;
            }
        }

        // Not a duplicate — save as new
        const newMem: VectorMemory = {
            id: `vmem-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            charId,
            title: result.title,
            content: result.content,
            emotionalJourney: result.emotionalJourney,
            importance: Math.min(Math.max(result.importance || 5, 1), 10),
            mentionCount: 0,
            lastMentioned: 0,
            createdAt: Date.now(),
            vector,
            modelId: config.model,
            source: 'auto',
            sourceMessageIds,
        };
        await DB.saveVectorMemory(newMem);
        vectorCache.set(newMem.id, vector); // add new memory to cache
        console.log(`🧠 [VectorExtract] Created: "${result.title}" (imp: ${newMem.importance})`);
        return true;

    } else if (result.action === 'update' && result.targetId) {
        // O(1) lookup by ID — no full table scan
        const target = await DB.getVectorMemoryById(result.targetId);
        const vector = await EmbeddingService.embed(textToEmbed, undefined, embeddingApiKey);

        if (target) {
            const mergedSourceIds = Array.from(new Set([...(target.sourceMessageIds || []), ...sourceMessageIds]));
            const updatedMem: VectorMemory = {
                ...target,
                title: result.title || target.title,
                content: result.content,
                emotionalJourney: result.emotionalJourney || target.emotionalJourney,
                importance: Math.min(Math.max(result.importance || target.importance, 1), 10),
                updatedAt: Date.now(),
                vector,
                modelId: config.model,
                sourceMessageIds: mergedSourceIds,
            };
            await DB.saveVectorMemory(updatedMem);
            vectorCache.set(result.targetId, vector); // update cache with new vector
            console.log(`🧠 [VectorExtract] Updated: "${updatedMem.title}"`);
        } else {
            // Fallback: create if target missing
            const newMem: VectorMemory = {
                id: `vmem-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                charId,
                title: result.title || '未命名记忆',
                content: result.content,
                emotionalJourney: result.emotionalJourney,
                importance: Math.min(Math.max(result.importance || 5, 1), 10),
                mentionCount: 0,
                lastMentioned: 0,
                createdAt: Date.now(),
                vector,
                modelId: config.model,
                source: 'auto',
                sourceMessageIds,
            };
            await DB.saveVectorMemory(newMem);
            vectorCache.set(newMem.id, vector); // add fallback-created memory to cache
            console.log(`🧠 [VectorExtract] Target not found, created as new: "${result.title}"`);
        }
        return true;
    }
    return false;
}

// Call LLM and parse response, with retry on truncation
async function callLLM(prompt: string, apiConfig: APIConfig): Promise<ExtractResult[]> {
    const doCall = async (promptText: string, maxTokens: number): Promise<{ content: string; truncated: boolean }> => {
        const response = await fetch(`${apiConfig.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiConfig.apiKey}`,
            },
            body: JSON.stringify({
                model: apiConfig.model,
                messages: [{ role: 'user', content: promptText }],
                temperature: 0.3,
                max_tokens: maxTokens,
            }),
        });

        if (!response.ok) {
            throw new Error(`LLM API error ${response.status}`);
        }

        const data = await response.json();
        const content = (data.choices?.[0]?.message?.content || '').replace(/```json/g, '').replace(/```/g, '').trim();
        const finishReason = data.choices?.[0]?.finish_reason || '';
        // "length" means the output was cut off by max_tokens
        const truncated = finishReason === 'length';
        return { content, truncated };
    };

    const parseContent = (content: string, label: string): ExtractResult[] => {
        let cleaned = content;

        // Strip any leading/trailing non-JSON text (e.g. "以下是..." or "好的，...")
        const arrStart = cleaned.indexOf('[');
        const arrEnd = cleaned.lastIndexOf(']');
        if (arrStart !== -1 && arrEnd > arrStart) {
            cleaned = cleaned.slice(arrStart, arrEnd + 1);
        }

        // Remove trailing commas before ] (common LLM mistake)
        cleaned = cleaned.replace(/,\s*]/g, ']');

        // Try clean JSON first
        try {
            const parsed = JSON.parse(cleaned);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            // If truncated, try to fix incomplete array: find last complete object and close array
            // Walk backwards to find a properly closed object (} followed by optional whitespace/comma)
            const bracketStart = cleaned.indexOf('[');
            if (bracketStart !== -1) {
                // Try removing trailing incomplete objects progressively
                let tryContent = cleaned;
                for (let i = 0; i < 3; i++) {
                    const lastBrace = tryContent.lastIndexOf('}');
                    if (lastBrace <= bracketStart) break;
                    const candidate = tryContent.slice(bracketStart, lastBrace + 1).replace(/,\s*$/, '') + ']';
                    try {
                        const parsed = JSON.parse(candidate);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            console.log(`🧠 [VectorExtract] [${label}] Fixed truncated JSON, recovered ${parsed.length} objects`);
                            return parsed;
                        }
                    } catch { /* try with one fewer object */ }
                    tryContent = tryContent.slice(0, lastBrace);
                }
            }

            // Fallback: regex extract complete objects
            const results: ExtractResult[] = [];
            const objRegex = /\{[^{}]*"action"\s*:\s*"(create|update|skip|invalidate)"[^{}]*\}/g;
            let match;
            while ((match = objRegex.exec(content)) !== null) {
                try {
                    const obj = JSON.parse(match[0]);
                    if (obj.action) results.push(obj);
                } catch { /* skip malformed */ }
            }
            if (results.length > 0) {
                console.log(`🧠 [VectorExtract] [${label}] Regex fallback recovered ${results.length} objects`);
            }
            return results;
        }
    };

    // First attempt — 4000 tokens (Chinese content is ~2x token-dense)
    const first = await doCall(prompt, 4000);
    console.log(`🧠 [VectorExtract] First attempt: ${first.content.length} chars, truncated=${first.truncated}`);
    let results = parseContent(first.content, 'first');

    if (results.length > 0) return results;

    // If first attempt failed completely (truncated or unparseable), retry with more tokens
    if (first.truncated || first.content.length > 50) {
        console.log('🧠 [VectorExtract] First attempt failed/truncated, retrying with more tokens and simpler prompt...');
        // Simplify: ask for just 1 memory with ultra-short format
        const retryPrompt = prompt.replace(
            /每次输出 0 到 \d+ 条.+?。/,
            '只输出 1 条最重要的记忆操作。'
        ).replace(
            /content 必须精简，不超过 \d+ 字！emotionalJourney 不超过 \d+ 字！/,
            'content 不超过 80 字！emotionalJourney 不超过 20 字！'
        );
        const retry = await doCall(retryPrompt, 6000);
        console.log(`🧠 [VectorExtract] Retry: ${retry.content.length} chars, truncated=${retry.truncated}`);
        results = parseContent(retry.content, 'retry');

        if (results.length > 0) {
            console.log(`🧠 [VectorExtract] Retry succeeded: ${results.length} objects`);
            return results;
        }
        console.warn('🧠 [VectorExtract] Retry also failed:', retry.content.slice(0, 500));
    } else {
        console.warn('🧠 [VectorExtract] Failed to parse (empty/skip):', first.content.slice(0, 200));
    }

    return [];
}

export const VectorMemoryExtractor = {

    /**
     * Auto mode — check if enough new messages, then extract.
     * Safe to call frequently; returns immediately if conditions aren't met.
     */
    async maybeExtract(
        charSnapshot: CharacterProfile,
        apiConfig: APIConfig,
        embeddingApiKey: string
    ): Promise<void> {
        const charId = charSnapshot.id;

        if (extractingChars.has(charId)) {
            console.log('🧠 [VectorExtract] Already extracting for', charId);
            return;
        }

        const interval = charSnapshot.vectorMemoryExtractInterval || 30;
        const lastExtractAt = charSnapshot.vectorMemoryLastExtractAt || 0;

        // Incremental load: only fetch messages after lastExtractAt
        // to avoid loading all historical messages into memory.
        const msgsAfterExtract = await DB.getMessagesByCharIdAfterTimestamp(charId, lastExtractAt);
        const allNewMsgs = msgsAfterExtract.filter(m =>
            (m.role === 'user' || m.role === 'assistant') &&
            (m.type === 'text' || m.type === 'call_log')
        );

        // Exclude the newest TAIL_BUFFER messages — they're in the "draft zone"
        // and might be rolled/regenerated by the user.
        const newMsgs = allNewMsgs.length > TAIL_BUFFER
            ? allNewMsgs.slice(0, -TAIL_BUFFER)
            : [];

        if (newMsgs.length < interval) {
            console.log(`🧠 [VectorExtract] Only ${newMsgs.length}/${interval} settled msgs (${allNewMsgs.length} total, ${TAIL_BUFFER} buffered). Skipping.`);
            return;
        }

        extractingChars.add(charId);
        console.log(`🧠 [VectorExtract] Starting auto-extract for ${charSnapshot.name} (${newMsgs.length} new)`);

        // Track the last successfully processed window's timestamp
        // so error recovery only skips what was actually processed.
        let lastProcessedTimestamp = lastExtractAt;

        try {
            // Load vector cache once for the entire batch to avoid repeated full-table scans in isDuplicate.
            const allMems = await DB.getAllVectorMemories(charId);
            const vectorCache = new Map<string, number[]>(allMems.map(m => [m.id, m.vector]));
            console.log(`🧠 [VectorExtract] Loaded vector cache: ${vectorCache.size} memories`);

            // Process all new messages in sliding windows (50 msgs, 10 overlap)
            // Each window refreshes existingHeaders to see newly created memories
            const WINDOW_SIZE = 50;
            const OVERLAP = 10;
            for (let i = 0; i < newMsgs.length; i += WINDOW_SIZE - OVERLAP) {
                const windowMsgs = newMsgs.slice(i, i + WINDOW_SIZE);
                const allHeaders = await DB.getVectorMemoryHeaders(charId);
                // Cap to newest 50 to prevent prompt bloat at scale
                const existingHeaders = allHeaders
                    .filter(h => !h.deprecated) // Exclude deprecated (LLM shouldn't try to update invalidated memories)
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 50);
                const formattedMsgs = formatMessages(windowMsgs, charSnapshot.name);
                const prompt = buildExtractionPrompt(charSnapshot.name, existingHeaders, formattedMsgs);
                const results = await callLLM(prompt, apiConfig);

                const windowSourceIds = windowMsgs.map(m => m.id).filter((id): id is number => typeof id === 'number');
                for (const result of results) {
                    await processResult(result, charId, embeddingApiKey, vectorCache, windowSourceIds);
                }

                // Mark this window as successfully processed
                lastProcessedTimestamp = windowMsgs[windowMsgs.length - 1].timestamp;

                // Delay between windows to avoid rate limiting
                if (i + WINDOW_SIZE < newMsgs.length) {
                    await new Promise(r => setTimeout(r, 2000));
                }
            }

            // Update lastExtractAt — read fresh char to minimize race condition
            const freshChar = (await DB.getAllCharacters()).find(c => c.id === charId);
            if (freshChar) {
                freshChar.vectorMemoryLastExtractAt = lastProcessedTimestamp;
                await DB.saveCharacter(freshChar);
                console.log(`🧠 [VectorExtract] Updated lastExtractAt to ${new Date(lastProcessedTimestamp).toLocaleString()}`);
            }
        } catch (err) {
            console.error('🧠 [VectorExtract] Extraction error:', err);
            // Only advance lastExtractAt to the last SUCCESSFULLY processed window,
            // so unprocessed windows will be retried on the next trigger.
            try {
                if (lastProcessedTimestamp > lastExtractAt) {
                    const freshChar = (await DB.getAllCharacters()).find(c => c.id === charId);
                    if (freshChar) {
                        freshChar.vectorMemoryLastExtractAt = lastProcessedTimestamp;
                        await DB.saveCharacter(freshChar);
                        console.log(`🧠 [VectorExtract] Error recovery: saved progress up to ${new Date(lastProcessedTimestamp).toLocaleString()} (failed windows will be retried)`);
                    }
                }
            } catch { /* silent */ }
        } finally {
            extractingChars.delete(charId);
        }
    },

    /**
     * Batch mode — process a specific range of messages.
     * Used for historical chat vectorization.
     *
     * @param charId - Character ID
     * @param startIdx - Start message index (0-based from full history)
     * @param endIdx - End message index (inclusive)
     * @param apiConfig - LLM API config
     * @param embeddingApiKey - Embedding API key
     * @param charName - Character name for prompts
     * @param onProgress - Progress callback (windowIdx, totalWindows, memoriesCreated)
     * @param signal - AbortSignal for cancellation
     * @returns Total memories created/updated
     */
    async batchExtractFromMessages(
        charId: string,
        startIdx: number,
        endIdx: number,
        apiConfig: APIConfig,
        embeddingApiKey: string,
        charName: string,
        onProgress?: (windowIdx: number, totalWindows: number, memoriesCreated: number) => void,
        signal?: AbortSignal
    ): Promise<number> {
        const allMsgs = await DB.getMessagesByCharId(charId);
        const targetMsgs = allMsgs
            .filter(m => (m.role === 'user' || m.role === 'assistant') && (m.type === 'text' || m.type === 'call_log'))
            .slice(startIdx, endIdx + 1);

        if (targetMsgs.length === 0) return 0;

        const WINDOW_SIZE = 40;
        const OVERLAP = 10; // Sliding window with 10-message overlap for RP context continuity
        const windows: typeof targetMsgs[] = [];

        for (let i = 0; i < targetMsgs.length; i += WINDOW_SIZE - OVERLAP) {
            if (signal?.aborted) break;
            windows.push(targetMsgs.slice(i, i + WINDOW_SIZE));
        }

        // Load vector cache once for the entire batch to avoid repeated full-table scans in isDuplicate.
        const allMems = await DB.getAllVectorMemories(charId);
        const vectorCache = new Map<string, number[]>(allMems.map(m => [m.id, m.vector]));
        console.log(`🧠 [VectorExtract] Batch: loaded vector cache: ${vectorCache.size} memories`);

        let totalCreated = 0;
        let totalUpdated = 0;

        for (let w = 0; w < windows.length; w++) {
            if (signal?.aborted) {
                console.log('🧠 [VectorExtract] Batch aborted by user');
                break;
            }

            onProgress?.(w + 1, windows.length, totalCreated + totalUpdated);

            // Refresh headers each window so LLM sees previously created memories
            const allHeaders = await DB.getVectorMemoryHeaders(charId);
            const existingHeaders = allHeaders.filter(h => !h.deprecated);
            const formattedMsgs = formatMessages(windows[w], charName);
            const prompt = buildExtractionPrompt(charName, existingHeaders, formattedMsgs);

            try {
                const results = await callLLM(prompt, apiConfig);
                const batchSourceIds = windows[w].map(m => m.id).filter((id): id is number => typeof id === 'number');
                for (const result of results) {
                    const success = await processResult(result, charId, embeddingApiKey, vectorCache, batchSourceIds);
                    if (success) {
                        if (result.action === 'create') totalCreated++;
                        else totalUpdated++;
                    }
                }
            } catch (err) {
                console.error(`🧠 [VectorExtract] Batch window ${w + 1} error:`, err);
            }

            // Delay between windows to avoid rate limiting (3s)
            if (w < windows.length - 1) {
                await new Promise(r => setTimeout(r, 3000));
            }
        }

        onProgress?.(windows.length, windows.length, totalCreated + totalUpdated);
        console.log(`🧠 [VectorExtract] Batch complete: ${totalCreated} created, ${totalUpdated} updated from ${windows.length} windows`);
        return totalCreated + totalUpdated;
    },

    /**
     * 通话结束后专项提取 — 从结构化通话历史直接提取记忆。
     * 不走 maybeExtract() 的消息计数机制，也不受 300 字截断限制。
     * @param charId 角色 ID
     * @param charName 角色名
     * @param callHistory 通话对话历史 [{role, content}, ...]
     * @param callTimestamp 通话时间戳
     * @param apiConfig LLM 配置
     * @param embeddingApiKey embedding API key
     * @returns 提取的记忆数量
     */
    async extractFromCallHistory(
        charId: string,
        charName: string,
        callHistory: { role: string; content: string }[],
        callTimestamp: number,
        apiConfig: APIConfig,
        embeddingApiKey: string,
    ): Promise<number> {
        // 短通话跳过（≤4 轮 ≈ 打个招呼）
        if (callHistory.length <= 4) {
            console.log(`🧠 [VectorExtract/Call] Only ${callHistory.length} turns, skipping.`);
            return 0;
        }

        // 并发锁
        if (extractingChars.has(charId)) {
            console.log(`🧠 [VectorExtract/Call] Already extracting for ${charId}, skipping call extraction.`);
            return 0;
        }
        extractingChars.add(charId);

        console.log(`🧠 [VectorExtract/Call] Starting extraction from ${callHistory.length}-turn call for ${charName}`);

        let totalExtracted = 0;
        try {
            // 转换为 formatMessages 兼容格式（每轮 +1s 偏移）
            const virtualMsgs = callHistory.map((h, i) => ({
                timestamp: callTimestamp + i * 1000,
                type: 'call_log' as const,
                role: h.role,
                content: h.content,
            }));

            // 加载向量缓存
            const allMems = await DB.getAllVectorMemories(charId);
            const vectorCache = new Map<string, number[]>(allMems.map(m => [m.id, m.vector]));

            // 滑动窗口（30 轮/窗，8 轮重叠）
            const WINDOW = 30;
            const OVERLAP = 8;

            for (let i = 0; i < virtualMsgs.length; i += WINDOW - OVERLAP) {
                const windowMsgs = virtualMsgs.slice(i, i + WINDOW);
                const allHeaders = await DB.getVectorMemoryHeaders(charId);
                const existingHeaders = allHeaders
                    .filter(h => !h.deprecated)
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(0, 50);

                const formattedMsgs = formatMessages(
                    windowMsgs.map(m => ({ ...m, content: m.content })), // 通话内容不截断
                    charName,
                );
                const prompt = buildExtractionPrompt(charName, existingHeaders, formattedMsgs);
                const results = await callLLM(prompt, apiConfig);

                for (const result of results) {
                    const success = await processResult(result, charId, embeddingApiKey, vectorCache);
                    if (success) totalExtracted++;
                }

                // 窗口间延迟
                if (i + WINDOW < virtualMsgs.length) {
                    await new Promise(r => setTimeout(r, 2000));
                }
            }

            console.log(`🧠 [VectorExtract/Call] Done: ${totalExtracted} memories from ${callHistory.length}-turn call`);
        } catch (err) {
            console.error('🧠 [VectorExtract/Call] Error:', err);
        } finally {
            extractingChars.delete(charId);
        }
        return totalExtracted;
    },
};
