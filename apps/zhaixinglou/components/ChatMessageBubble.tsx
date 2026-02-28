/**
 * ChatMessageBubble — 摘星楼共享聊天气泡组件
 *
 * 功能：
 * 1. 长按检测 → 弹出浮动操作菜单
 * 2. 支持三种操作：编辑（仅用户消息）、删除、重新生成
 * 3. 编辑模式下内联显示输入框
 *
 * 架构约定：
 * - 纯展示 + 交互组件，不持有消息列表状态
 * - 所有副作用通过回调 props 交给父组件处理
 * - 样式用 className 管理，方便后续统一美化
 */
import React, { useState, useRef, useCallback } from 'react';

export interface MessageAction {
    onEdit?: (index: number, newContent: string) => void;
    onDelete?: (index: number) => void;
    onRegenerate?: (index: number) => void;
}

interface ChatMessageBubbleProps {
    index: number;
    role: 'user' | 'assistant' | 'system';
    content: string;
    actions: MessageAction;
}

const LONG_PRESS_MS = 500;

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ index, role, content, actions }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const touchMoved = useRef(false);

    // ── Long press detection (touch + mouse) ──
    const startPress = useCallback(() => {
        touchMoved.current = false;
        longPressTimer.current = setTimeout(() => {
            if (!touchMoved.current) {
                setShowMenu(true);
            }
        }, LONG_PRESS_MS);
    }, []);

    const cancelPress = useCallback(() => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    }, []);

    const handleTouchMove = useCallback(() => {
        touchMoved.current = true;
        cancelPress();
    }, [cancelPress]);

    const handleTouchEnd = useCallback(() => {
        cancelPress();
    }, [cancelPress]);

    // ── Action handlers ──
    const handleEdit = useCallback(() => {
        setShowMenu(false);
        setEditText(content);
        setIsEditing(true);
    }, [content]);

    const handleEditConfirm = useCallback(() => {
        if (editText.trim() && actions.onEdit) {
            actions.onEdit(index, editText.trim());
        }
        setIsEditing(false);
        setEditText('');
    }, [editText, actions, index]);

    const handleEditCancel = useCallback(() => {
        setIsEditing(false);
        setEditText('');
    }, []);

    const handleDelete = useCallback(() => {
        setShowMenu(false);
        actions.onDelete?.(index);
    }, [actions, index]);

    const handleRegenerate = useCallback(() => {
        setShowMenu(false);
        actions.onRegenerate?.(index);
    }, [actions, index]);

    const dismissMenu = useCallback(() => {
        setShowMenu(false);
    }, []);

    const isUser = role === 'user';

    // ── Editing mode ──
    if (isEditing) {
        return (
            <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] w-full flex flex-col gap-1.5">
                    <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="w-full bg-black/40 border border-[#d4af37]/40 rounded-xl px-3 py-2 text-sm text-[#e5d08f] focus:outline-none focus:border-[#d4af37]/70 resize-none"
                        rows={Math.min(6, Math.max(2, editText.split('\n').length))}
                        autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={handleEditCancel}
                            className="px-3 py-1 text-[10px] text-[#8c6b3e]/60 border border-white/10 rounded-lg active:scale-95 transition-transform"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleEditConfirm}
                            className="px-3 py-1 text-[10px] text-[#d4af37] border border-[#d4af37]/40 bg-[#d4af37]/10 rounded-lg active:scale-95 transition-transform"
                        >
                            确认
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Normal display ──
    return (
        <>
            {/* Backdrop to dismiss menu */}
            {showMenu && (
                <div className="fixed inset-0 z-[9998]" onClick={dismissMenu} />
            )}

            <div className={`relative flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap select-text ${isUser
                        ? 'bg-[#d4af37]/20 text-[#e5d08f] rounded-br-md border border-[#d4af37]/30'
                        : 'bg-white/5 text-[#c8b88a] rounded-bl-md border border-white/10'
                        }`}
                    onTouchStart={startPress}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={startPress}
                    onMouseUp={cancelPress}
                    onMouseLeave={cancelPress}
                    onContextMenu={e => { e.preventDefault(); setShowMenu(true); }}
                >
                    {content}
                </div>

                {/* ── Floating action menu ── */}
                {showMenu && (
                    <div
                        className={`absolute z-[9999] flex gap-1 ${isUser ? 'right-0' : 'left-0'}`}
                        style={{ top: '-36px' }}
                    >
                        <div className="flex items-center gap-0.5 bg-black/80 backdrop-blur-xl border border-[#d4af37]/25 rounded-xl px-1 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                            {/* Edit (user only) */}
                            {isUser && actions.onEdit && (
                                <button
                                    onClick={handleEdit}
                                    className="px-2.5 py-1.5 text-[10px] text-[#e5d08f]/80 hover:bg-white/10 rounded-lg transition-colors tracking-wider"
                                >
                                    编辑
                                </button>
                            )}
                            {/* Regenerate */}
                            {actions.onRegenerate && (
                                <button
                                    onClick={handleRegenerate}
                                    className="px-2.5 py-1.5 text-[10px] text-[#e5d08f]/80 hover:bg-white/10 rounded-lg transition-colors tracking-wider"
                                >
                                    重发
                                </button>
                            )}
                            {/* Delete */}
                            {actions.onDelete && (
                                <button
                                    onClick={handleDelete}
                                    className="px-2.5 py-1.5 text-[10px] text-red-400/70 hover:bg-red-900/20 rounded-lg transition-colors tracking-wider"
                                >
                                    删除
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatMessageBubble;
