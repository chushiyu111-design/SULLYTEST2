
import React, { useRef, useEffect } from 'react';
import { ShareNetwork, Trash, Plus, Smiley, PaperPlaneTilt, Money, BookOpenText, GearSix, Image, Lock, ArrowsClockwise } from '@phosphor-icons/react';
import { CharacterProfile, ChatTheme, EmojiCategory, Emoji } from '../../types';
import { PRESET_THEMES } from './ChatConstants';

// ===== WeChat 1:1 Pixel-Perfect Inline SVG Icons =====
// Matched to real WeChat iOS bottom input bar icons

// Voice icon: Circle with a speaker cone and two soundwaves
const WxIconVoice = ({ className = 'w-[28px] h-[28px]' }: { className?: string }) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="21" />
        <path d="M14 20.5v7h4.5L24 33v-18l-5.5 5.5H14z" />
        <path d="M29 19q3 5 0 10" />
        <path d="M34 14.5q5 9.5 0 19" />
    </svg>
);

// Emoji icon: Circle with dots for eyes and a clean arched smile
const WxIconEmoji = ({ className = 'w-[28px] h-[28px]' }: { className?: string }) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="21" />
        {/* Eyes perfectly vertically aligned in their upper half */}
        <circle cx="16" cy="19" r="2" fill="#2A2A2A" stroke="none" />
        <circle cx="32" cy="19" r="2" fill="#2A2A2A" stroke="none" />
        {/* Smile - perfectly elegant wide arc */}
        <path d="M14 28 Q24 35 34 28" />
    </svg>
);

// Plus icon: Circle with a precise elegant cross
const WxIconPlus = ({ className = 'w-[28px] h-[28px]' }: { className?: string }) => (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="21" />
        <line x1="24" y1="13" x2="24" y2="35" />
        <line x1="13" y1="24" x2="35" y2="24" />
    </svg>
);

// Microphone icon (rarely used now, but keeping for compatibility)
const WxIconMic = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#b2b2b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="3" width="6" height="10" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <line x1="12" y1="18" x2="12" y2="21" />
    </svg>
);

interface ChatInputAreaProps {
    input: string;
    setInput: (v: string) => void;
    isTyping: boolean;
    selectionMode: boolean;
    showPanel: 'none' | 'actions' | 'emojis' | 'chars';
    setShowPanel: (v: 'none' | 'actions' | 'emojis' | 'chars') => void;
    onSend: () => void;
    onDeleteSelected: () => void;
    onForwardSelected?: () => void;
    selectedCount: number;
    emojis: Emoji[];
    characters: CharacterProfile[];
    activeCharacterId: string;
    onCharSelect: (id: string) => void;
    customThemes: ChatTheme[];
    onUpdateTheme: (id: string) => void;
    onRemoveTheme: (id: string) => void;
    activeThemeId: string;
    onPanelAction: (type: string, payload?: any) => void;
    onImageSelect: (file: File) => void;
    isSummarizing: boolean;
    // Categories Support
    categories?: EmojiCategory[];
    activeCategory?: string;
    // Reroll Support
    onReroll: () => void;
    canReroll: boolean;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({
    input, setInput, isTyping, selectionMode,
    showPanel, setShowPanel, onSend, onDeleteSelected, onForwardSelected, selectedCount,
    emojis, characters, activeCharacterId, onCharSelect,
    customThemes, onUpdateTheme, onRemoveTheme, activeThemeId,
    onPanelAction, onImageSelect, isSummarizing,
    categories = [], activeCategory = 'default',
    onReroll, canReroll
}) => {
    const chatImageInputRef = useRef<HTMLInputElement>(null);
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startPos = useRef({ x: 0, y: 0 });
    const isLongPressTriggered = useRef(false); // Track if long press action fired
    const wxTextareaRef = useRef<HTMLTextAreaElement>(null); // WeChat auto-expand ref

    // WeChat theme: auto-expand textarea height (up to ~5 lines = 120px)
    useEffect(() => {
        const el = wxTextareaRef.current;
        if (!el || activeThemeId !== 'default') return;
        el.style.height = '0px'; // Reset to measure natural scrollHeight
        const scrollH = el.scrollHeight;
        el.style.height = Math.min(scrollH, 120) + 'px';
    }, [input, activeThemeId]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'chat' | 'bg') => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
        if (e.target) e.target.value = ''; // Reset
    };

    // --- Unified Touch/Long-Press Logic ---

    const clearTimer = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const handleTouchStart = (item: any, type: 'emoji' | 'category', e: React.TouchEvent | React.MouseEvent) => {
        // 1. Always reset state first to ensure clean slate for any interaction
        // This fixes the bug where deleting a category leaves the flag true, blocking clicks on system categories
        clearTimer();
        isLongPressTriggered.current = false;

        // 2. Skip long-press for the default category (no options needed)
        if (type === 'category' && item.id === 'default') return;

        // 3. Store coordinates and start timer for valid long-press candidates
        if ('touches' in e) {
            startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            startPos.current = { x: e.clientX, y: e.clientY };
        }

        longPressTimer.current = setTimeout(() => {
            isLongPressTriggered.current = true;
            // Trigger action
            if (type === 'emoji') {
                onPanelAction('delete-emoji-req', item);
            } else {
                onPanelAction('category-options', item);
            }
        }, 500); // 500ms threshold
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!longPressTimer.current) return;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const diffX = Math.abs(clientX - startPos.current.x);
        const diffY = Math.abs(clientY - startPos.current.y);

        // Cancel long press if moved more than 10px (scrolling)
        if (diffX > 10 || diffY > 10) {
            clearTimer();
        }
    };

    const handleTouchEnd = () => {
        clearTimer();
    };

    // Wrapper for Click to prevent conflicts
    const handleItemClick = (e: React.MouseEvent, item: any, type: 'emoji' | 'category') => {
        // If long press action triggered, block the click event (do not send)
        if (isLongPressTriggered.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // If click happens, ensure timer is cleared (prevents "Send then Pop up" ghost issue)
        clearTimer();

        if (type === 'emoji') {
            onPanelAction('send-emoji', item);
        } else {
            onPanelAction('select-category', item.id);
        }
    };

    return (
        <div className="sully-chat-input bg-white/90 backdrop-blur-2xl border-t border-slate-200/50 pb-safe shrink-0 z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] relative transition-all duration-300">

            {selectionMode ? (
                <div className="p-3 flex gap-2 bg-white/50 backdrop-blur-md">
                    {onForwardSelected && (
                        <button
                            onClick={onForwardSelected}
                            disabled={selectedCount === 0}
                            className={`flex-1 py-3 font-bold rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${selectedCount === 0 ? 'bg-slate-200 text-slate-400 shadow-none' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-200'}`}
                        >
                            <ShareNetwork className="w-5 h-5" weight="bold" />
                            转发 ({selectedCount})
                        </button>
                    )}
                    <button
                        onClick={onDeleteSelected}
                        className={`${onForwardSelected ? 'flex-1' : 'w-full'} py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2`}
                    >
                        <Trash className="w-5 h-5" weight="bold" />
                        删除 ({selectedCount})
                    </button>
                </div>
            ) : activeThemeId === 'default' ? (
                /* ===== WeChat Pixel-Perfect Input Bar ===== */
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        minHeight: '56px',
                        padding: '10px 8px',
                        gap: '8px',
                        background: '#f7f7f7',
                        borderTop: '0.5px solid rgba(0,0,0,0.15)',
                        transition: 'min-height 0.15s ease',
                    }}
                >
                    {/* Voice Button — decorative only (voice input not supported) */}
                    <div
                        style={{
                            width: '40px', height: '40px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, opacity: 0.5,
                        }}
                    >
                        <WxIconVoice />
                    </div>

                    {/* Input Field */}
                    <div
                        style={{
                            flex: 1, minWidth: 0, minHeight: '36px',
                            background: '#ffffff', borderRadius: '4px',
                            border: '0.5px solid rgba(0,0,0,0.1)',
                            display: 'flex', alignItems: 'flex-end',
                            padding: '6px 8px',
                        }}
                    >
                        <textarea
                            ref={wxTextareaRef}
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{
                                flex: 1, minWidth: 0, background: 'transparent',
                                fontSize: '15px', color: '#333333',
                                border: 'none', outline: 'none', resize: 'none',
                                minHeight: '24px', maxHeight: '120px',
                                lineHeight: '24px',
                                padding: 0, margin: 0,
                                overflowY: 'auto',
                            }}
                            className="no-scrollbar"
                            placeholder=""
                        />
                        {/* Microphone icon inside input field (right side, like real WeChat) */}
                        <WxIconMic />
                    </div>

                    {/* Emoji Button */}
                    <button
                        onClick={() => setShowPanel(showPanel === 'emojis' ? 'none' : 'emojis')}
                        style={{
                            width: '40px', height: '40px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            background: 'transparent', border: 'none',
                            padding: 0, cursor: 'pointer', flexShrink: 0,
                        }}
                    >
                        <WxIconEmoji />
                    </button>

                    {/* Plus / Send Toggle */}
                    {input.trim() ? (
                        <button
                            onClick={onSend}
                            style={{
                                width: '60px', height: '36px', flexShrink: 0,
                                background: '#07c160', borderRadius: '4px',
                                color: '#ffffff', fontSize: '15px', fontWeight: 500,
                                border: 'none', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'opacity 0.15s',
                            }}
                        >
                            发送
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowPanel(showPanel === 'actions' ? 'none' : 'actions')}
                            style={{
                                width: '40px', height: '40px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                background: 'transparent', border: 'none',
                                padding: 0, cursor: 'pointer', flexShrink: 0,
                            }}
                        >
                            <WxIconPlus />
                        </button>
                    )}
                </div>
            ) : (
                /* ===== Original Layout (all other themes) ===== */
                <div className="p-3 px-4 flex gap-3 items-end">
                    <button onClick={() => setShowPanel(showPanel === 'actions' ? 'none' : 'actions')} className="w-11 h-11 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                        <Plus className="w-6 h-6" weight="bold" />
                    </button>
                    <div className="flex-1 min-w-0 bg-slate-100 rounded-[24px] flex items-center px-1 border border-transparent focus-within:bg-white focus-within:border-primary/30 transition-all overflow-hidden">
                        <textarea
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 min-w-0 bg-transparent px-4 py-3 text-[15px] resize-none max-h-24 no-scrollbar"
                            placeholder="Message..."
                            style={{ height: 'auto' }}
                        />
                        <button onClick={() => setShowPanel(showPanel === 'emojis' ? 'none' : 'emojis')} className="p-2 shrink-0 text-slate-400 hover:text-primary">
                            <Smiley className="w-6 h-6" weight="regular" />
                        </button>
                    </div>
                    <button
                        onClick={onSend}
                        disabled={!input.trim()}
                        className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-primary text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}
                    >
                        <PaperPlaneTilt className="w-5 h-5" weight="fill" />
                    </button>
                </div>
            )}

            {/* Panels */}
            {showPanel !== 'none' && !selectionMode && (
                <div className="bg-slate-50 h-72 border-t border-slate-200/60 overflow-hidden relative z-0 flex flex-col">

                    {/* Emojis Panel with Categories */}
                    {showPanel === 'emojis' && (
                        <>
                            {/* Categories Bar */}
                            <div className="h-10 bg-white border-b border-slate-100 flex items-center px-2 gap-2 overflow-x-auto no-scrollbar shrink-0">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={(e) => handleItemClick(e, cat, 'category')}
                                        // Long press handlers for Categories
                                        onTouchStart={(e) => handleTouchStart(cat, 'category', e)}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                        onMouseDown={(e) => handleTouchStart(cat, 'category', e)}
                                        onMouseMove={handleTouchMove}
                                        onMouseUp={handleTouchEnd}
                                        onMouseLeave={handleTouchEnd}
                                        onContextMenu={(e) => e.preventDefault()}
                                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all select-none flex items-center gap-1 ${activeCategory === cat.id ? 'bg-primary text-white font-bold shadow-sm' : 'bg-slate-100 text-slate-500'}`}
                                    >
                                        {cat.name}
                                        {cat.allowedCharacterIds && cat.allowedCharacterIds.length > 0 && (
                                            <Lock className="w-3 h-3 opacity-60" weight="bold" />
                                        )}
                                    </button>
                                ))}
                                <button onClick={() => onPanelAction('add-category')} className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 hover:bg-slate-200">+</button>
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar p-4">
                                <div className="grid grid-cols-4 gap-3">
                                    <button onClick={() => onPanelAction('emoji-import')} className="aspect-square bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-2xl text-slate-400">+</button>
                                    {emojis.map((e, i) => (
                                        <button
                                            key={i}
                                            onClick={(ev) => handleItemClick(ev, e, 'emoji')}
                                            // Long press handlers for Emojis
                                            onTouchStart={(ev) => handleTouchStart(e, 'emoji', ev)}
                                            onTouchMove={handleTouchMove}
                                            onTouchEnd={handleTouchEnd}
                                            onMouseDown={(ev) => handleTouchStart(e, 'emoji', ev)}
                                            onMouseMove={handleTouchMove}
                                            onMouseUp={handleTouchEnd}
                                            onMouseLeave={handleTouchEnd}
                                            onContextMenu={(ev) => ev.preventDefault()}
                                            className="aspect-square bg-white rounded-2xl p-2 shadow-sm relative active:scale-95 transition-transform select-none"
                                        >
                                            <img src={e.url} className="w-full h-full object-contain pointer-events-none" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Actions Panel */}
                    {showPanel === 'actions' && (
                        <div className="p-6 grid grid-cols-4 gap-8 overflow-y-auto">
                            <button onClick={() => onPanelAction('transfer')} className="flex flex-col items-center gap-2 text-slate-600 active:scale-95 transition-transform">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shadow-sm text-orange-400 border border-orange-100">
                                    <Money className="w-6 h-6" weight="bold" />
                                </div>
                                <span className="text-xs font-bold">转账</span>
                            </button>

                            <button onClick={() => onPanelAction('poke')} className="flex flex-col items-center gap-2 text-slate-600 active:scale-95 transition-transform">
                                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center shadow-sm text-2xl border border-sky-100">👉</div>
                                <span className="text-xs font-bold">戳一戳</span>
                            </button>

                            <button onClick={() => onPanelAction('archive')} className="flex flex-col items-center gap-2 text-slate-600 active:scale-95 transition-transform">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-sm text-indigo-400 border border-indigo-100">
                                    <BookOpenText className="w-6 h-6" weight="bold" />
                                </div>
                                <span className="text-xs font-bold">{isSummarizing ? '归档中...' : '记忆归档'}</span>
                            </button>

                            <button onClick={() => onPanelAction('settings')} className="flex flex-col items-center gap-2 text-slate-600 active:scale-95 transition-transform">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm text-slate-500 border border-slate-100">
                                    <GearSix className="w-6 h-6" weight="bold" /></div>
                                <span className="text-xs font-bold">设置</span>
                            </button>

                            <button onClick={() => chatImageInputRef.current?.click()} className="flex flex-col items-center gap-2 text-slate-600 active:scale-95 transition-transform">
                                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center shadow-sm text-pink-400 border border-pink-100">
                                    <Image className="w-6 h-6" weight="bold" />
                                </div>
                                <span className="text-xs font-bold">相册</span>
                            </button>
                            <input type="file" ref={chatImageInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'chat')} />

                            {/* Regenerate Button */}
                            <button onClick={onReroll} disabled={!canReroll} className={`flex flex-col items-center gap-2 active:scale-95 transition-transform ${canReroll ? 'text-slate-600' : 'text-slate-300 opacity-50'}`}>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border ${canReroll ? 'bg-emerald-50 text-emerald-400 border-emerald-100' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                                    <ArrowsClockwise className="w-6 h-6" weight="bold" />
                                </div>
                                <span className="text-xs font-bold">重新生成</span>
                            </button>

                        </div>
                    )}
                    {showPanel === 'chars' && (
                        <div className="p-5 space-y-6 overflow-y-auto no-scrollbar">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 px-1 tracking-wider uppercase mb-3">气泡样式</h3>
                                <div className="flex gap-3 px-1 overflow-x-auto no-scrollbar pb-2">
                                    {Object.values(PRESET_THEMES).map(t => (
                                        <button key={t.id} onClick={() => onUpdateTheme(t.id)} className={`px-6 py-3 rounded-2xl text-xs font-bold border shrink-0 transition-all ${activeThemeId === t.id ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600'}`}>{t.name}</button>
                                    ))}
                                    {customThemes.map(t => (
                                        <div key={t.id} className="relative group shrink-0">
                                            <button onClick={() => onUpdateTheme(t.id)} className={`px-6 py-3 rounded-2xl text-xs font-bold border transition-all ${activeThemeId === t.id ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                                                {t.name} (DIY)
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); onRemoveTheme(t.id); }} className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 px-1 tracking-wider uppercase mb-3">切换会话</h3>
                                <div className="space-y-3">
                                    {characters.map(c => (
                                        <div key={c.id} onClick={() => onCharSelect(c.id)} className={`flex items-center gap-4 p-3 rounded-[20px] border cursor-pointer ${c.id === activeCharacterId ? 'bg-white border-primary/30 shadow-md' : 'bg-white/50 border-transparent'}`}>
                                            <img src={c.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                                            <div className="flex-1"><div className="font-bold text-sm text-slate-700">{c.name}</div><div className="text-xs text-slate-400 truncate">{c.description}</div></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default React.memo(ChatInputArea);
