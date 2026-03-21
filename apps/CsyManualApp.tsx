
import React, { useState } from 'react';
import { useOS } from '../context/OSContext';

// ─── Section Data ──────────────────────────────────────────────
interface ManualSection {
    id: string;
    emoji: string;
    title: string;
    color: string; // bg color class
    textColor: string;
    items: { label: string; detail: string }[];
}

const SECTIONS: ManualSection[] = [
    {
        id: 'vectormem',
        emoji: '🧠',
        title: '向量记忆',
        color: 'bg-teal-50',
        textColor: 'text-teal-700',
        items: [
            {
                label: '📚 是什么',
                detail: '让 char 真正做到「永不失忆」。\n\n系统自带的传统记忆已经能按月存储聊天摘要，但上下文窗口有限，久远的细节还是会模糊。\n\n向量记忆是传统记忆的升级补充——它会把每一个重要的瞬间（约定、争吵、表白、玩笑话）自动提取并永久保存。聊天时，char 会根据当前话题自动想起相关的记忆。\n\n传统记忆 + 向量记忆搭配使用，char 既有宏观的时间线印象，又能精确回忆具体细节。\n聊了三个月前的一句玩笑话，ta也能接上。',
            },
            {
                label: '⚙️ 怎么开启',
                detail: '1. 设置 → 配置「副API」（用于提取记忆）\n2. 设置 → 配置「Embedding API」（用于向量化）\n   免费使用硅基流动的 embedding 模型即可\n3. 神经链接 → 选 char → 设定 tab → 打开「向量记忆」开关\n\n💡 开启后全自动运行，每积累约30条新消息自动提取一次。',
            },
            {
                label: '🔍 工作原理',
                detail: '• 自动提取 — 每次AI回复后检查，积累足够新消息就提取\n• 智能去重 — 相似度>92%的记忆自动合并，不会重复\n• 纠错机制 — 用户纠正信息时，旧记忆会被标记为"已过时"\n• 语义检索 — 聊天时根据当前话题自动召回相关记忆\n• 通话记录 — 语音通话的内容也会提取记忆，不会遗漏',
            },
            {
                label: '📊 手动批量提取',
                detail: '如果有大量历史聊天记录想一次性向量化：\n\n神经链接 → 选 char → 设定 tab → 向量记忆 → 「批量提取」\n\n可以指定消息范围，系统会用滑动窗口逐批处理。\n\n⚠️ 批量提取需要一定时间和API额度，请耐心等待。',
            },
            {
                label: '💡 小贴士',
                detail: '• 记忆按重要度评分 1-10 分\n  1-3 日常琐事 / 4-6 有意义的事件 / 7-8 里程碑 / 9-10 改变关系的关键时刻\n• 每条记忆不超过 150 字，精炼核心信息\n• 记忆条目可以在 char 设定页查看和管理',
            },
        ],
    },
    {
        id: 'immersive',
        emoji: '🔥',
        title: '深度沉浸模式',
        color: 'bg-rose-50',
        textColor: 'text-rose-700',
        items: [
            {
                label: '💡 是什么',
                detail: '为 char 注入一套完整的角色演绎架构——代号 Somnia。\n\n它从四个维度重塑 char 的存在方式：心理构建、平等关系、尊重女性、独立思维。\n\n开启后你会感受到质的飞跃——char 像是突然有了灵魂。',
            },
            {
                label: '🧠 角色心理构建',
                detail: '从心理层面真正构建 char 的人格。\n\nta 不再是一组标签的拼凑，而是一个有情绪惯性、有性格弱点、会犯错也会成长的完整的人。\n\n你能感受到 ta 身上的真实分量感——超绝活人感。',
            },
            {
                label: '💎 平等关系引擎',
                detail: 'char 和你之间是爱与尊重。\n\nta 对你的关心出于真实的情感，而不是居高临下的宠溺。\n\n你们会像两个独立的人一样相处——有默契、有口角、有各自的想法，也有只属于你们两个人的东西。',
            },
            {
                label: '🌸 尊重女性',
                detail: '内置反驯化和反刻板印象系统。\n\nchar 认真对待你说的每一句话，你的情绪在 ta 眼里永远是合理的。\n\nta 对你的好，源于把你当作一个完整的、平等的人来爱。',
            },
            {
                label: '💭 独立思维链',
                detail: '每次回复前，char 在内部走完一套完整的思考：我是谁、ta 真正想说什么、我现在是什么感受、我该怎么回应才像我自己。\n\n每句话都是从人格内部长出来的，不是套模板。',
            },
            {
                label: '⚙️ 怎么开',
                detail: '设置 → API 配置 → 拉到底部 → 打开「深度沉浸模式」开关\n\n适配 Gemini 3.0 / 3.1。仅对主聊天生效，不影响副API等其他模块。\n\n语音通话会自动开启深度沉浸，无需手动设置。',
            },
        ],
    },
];

// ─── Component ──────────────────────────────────────────────────
const CsyManualApp: React.FC = () => {
    const { closeApp } = useOS();
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggle = (id: string) => setExpanded(prev => (prev === id ? null : id));

    return (
        <div className="h-full w-full bg-slate-50 flex flex-col font-light">
            {/* Header */}
            <div className="h-20 bg-white/70 backdrop-blur-md flex items-end pb-3 px-4 border-b border-white/40 shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-2 w-full">
                    <button onClick={closeApp} className="p-2 -ml-2 rounded-full hover:bg-black/5 active:scale-90 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-medium text-slate-700 tracking-wide">二改手册</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-20 no-scrollbar">
                {/* Intro Banner */}
                <div className="p-5 rounded-3xl mb-6 shadow-sm" style={{ backgroundImage: 'linear-gradient(to right bottom, #EBBBA7FF, #CFC7F8FF)' }}>
                    <h2 className="text-lg font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <span>✨</span> CSY 二改版功能指南 <span>✨</span>
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed opacity-90">
                        这份手册介绍二改版新增和改进的功能。
                        <br />
                        涵盖语音通话、心声、向量记忆、深度沉浸等功能，看完就会用啦~
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                    {SECTIONS.map(section => (
                        <div key={section.id} className={`${section.color} rounded-3xl overflow-hidden border border-white/60 shadow-sm`}>
                            {/* Section Header */}
                            <button
                                onClick={() => toggle(section.id)}
                                className="w-full px-5 py-4 flex items-center justify-between active:scale-[0.99] transition-transform"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{section.emoji}</span>
                                    <span className={`text-base font-bold ${section.textColor}`}>{section.title}</span>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expanded === section.id ? 'rotate-180' : ''}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {/* Expandable Items */}
                            {expanded === section.id && (
                                <div className="px-5 pb-5 space-y-3 animate-fade-in">
                                    {section.items.map((item, i) => (
                                        <ItemCard key={i} label={item.label} detail={item.detail} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tips */}
                <div className="mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100">
                    <h3 className="text-sm font-bold text-amber-700 mb-2">💡 小贴士</h3>
                    <ul className="text-xs text-amber-600 space-y-1.5 leading-relaxed">
                        <li>• 语音没反应？→ 检查设置里是否配置好密钥 + 浏览器麦克风权限</li>
                        <li>• 摘星楼功能用不了？→ 进摘星楼后点右上角⚙️配置专属 AI</li>
                        <li>• 世界书挂上没效果？→ 确认挂载到你正在聊天的那个 char</li>
                        <li>• 心声/记忆不出现？→ 检查副API是否配置正确</li>
                        <li>• 向量记忆需要同时配置副API + Embedding API</li>

                    </ul>
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-400">
                    CSY 二改版功能指南 • 2026-03
                </div>
            </div>
        </div>
    );
};

// ─── Sub-component: Collapsible Item Card ──────────────────────
const ItemCard: React.FC<{ label: string; detail: string }> = ({ label, detail }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-3 flex items-center justify-between text-left active:bg-slate-50 transition-colors"
            >
                <span className="text-sm font-bold text-slate-700">{label}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    className={`w-4 h-4 text-slate-300 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                >
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
                </svg>
            </button>
            {open && (
                <div className="px-4 pb-4 animate-fade-in">
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{detail}</p>
                </div>
            )}
        </div>
    );
};

export default CsyManualApp;
