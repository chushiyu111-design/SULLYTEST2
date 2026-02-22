


import React, { useRef, useState } from 'react';
import { Message, ChatTheme } from '../../types';

// --- Forward Card with expand/collapse ---
const ForwardCard: React.FC<{
    forwardData: any;
    commonLayout: (content: React.ReactNode) => JSX.Element;
    interactionProps: any;
    selectionMode: boolean;
}> = ({ forwardData, commonLayout, selectionMode }) => {
    const [expanded, setExpanded] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        if (selectionMode) return;
        e.stopPropagation();
        setExpanded(true);
    };

    const formatTime = (ts: number) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <>
            {commonLayout(
                <div className="sully-card-container w-64 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer" onClick={handleCardClick}>
                    <div className="px-4 pt-3 pb-2 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>
                            {forwardData.fromUserName} 和 {forwardData.fromCharName} 的聊天记录
                        </div>
                    </div>
                    <div className="px-4 py-2 space-y-1">
                        {(forwardData.preview || []).slice(0, 4).map((line: string, i: number) => (
                            <div key={i} className="text-[11px] text-slate-500 truncate leading-relaxed">{line}</div>
                        ))}
                    </div>
                    <div className="px-4 py-2 border-t border-slate-50 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>共 {forwardData.count || 0} 条聊天记录</span>
                        <span className="text-primary font-medium">点击查看</span>
                    </div>
                </div>
            )}

            {/* Expanded Full-screen Overlay */}
            {expanded && (
                <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-3 px-4 bg-white border-b border-slate-100 shrink-0 flex items-center gap-3">
                        <button onClick={() => setExpanded(false)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                        </button>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-700 truncate">{forwardData.fromUserName} 和 {forwardData.fromCharName} 的聊天记录</div>
                            <div className="text-[10px] text-slate-400">共 {forwardData.count || 0} 条消息</div>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {(forwardData.messages || []).map((msg: any, i: number) => {
                            const isUser = msg.role === 'user';
                            const senderName = isUser ? forwardData.fromUserName : forwardData.fromCharName;
                            return (
                                <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                                        <div className="text-[10px] text-slate-400 mb-1 px-1">{senderName} {msg.timestamp ? formatTime(msg.timestamp) : ''}</div>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-all ${isUser ? 'bg-primary text-white rounded-br-sm' : 'bg-white text-slate-700 rounded-bl-sm shadow-sm border border-slate-100'}`}>
                                            {msg.type === 'image' ? <img src={msg.content} className="max-w-[200px] rounded-xl" /> :
                                                msg.type === 'emoji' ? <img src={msg.content} className="max-w-[100px]" /> :
                                                    msg.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

interface MessageItemProps {
    msg: Message;
    isFirstInGroup: boolean;
    isLastInGroup: boolean;
    activeTheme: ChatTheme;
    charAvatar: string;
    charName: string;
    userAvatar: string;
    onLongPress: (m: Message) => void;
    selectionMode: boolean;
    isSelected: boolean;
    onToggleSelect: (id: number) => void;
    // Translation (AI messages only, bilingual content parsed from %%BILINGUAL%%)
    translationEnabled?: boolean;
    isShowingTarget?: boolean;
    onTranslateToggle?: (msgId: number) => void;
    // Transfer card actions
    onTransferAction?: (msg: Message) => void;
}

const MessageItem = React.memo(({
    msg: m,
    isFirstInGroup,
    isLastInGroup,
    activeTheme,
    charAvatar,
    charName,
    userAvatar,
    onLongPress,
    selectionMode,
    isSelected,
    onToggleSelect,
    translationEnabled,
    isShowingTarget,
    onTranslateToggle,
    onTransferAction,
}: MessageItemProps) => {
    const isUser = m.role === 'user';
    const isSystem = m.role === 'system';
    const marginBottom = isLastInGroup ? 'mb-4' : 'mb-2';
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startPos = useRef({ x: 0, y: 0 }); // Track touch start position

    const styleConfig = isUser ? activeTheme.user : activeTheme.ai;

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        // Record initial position
        if ('touches' in e) {
            startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            startPos.current = { x: e.clientX, y: e.clientY };
        }

        longPressTimer.current = setTimeout(() => {
            if (!selectionMode) {
                onLongPress(m);
            }
        }, 600);
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    // New handler to cancel long press if user drags/scrolls
    const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
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

        // If moved more than 10px, assume scrolling and cancel long press
        if (diffX > 10 || diffY > 10) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (selectionMode) {
            e.stopPropagation();
            e.preventDefault();
            onToggleSelect(m.id);
        }
    };

    const interactionProps = {
        onMouseDown: handleTouchStart,
        onMouseUp: handleTouchEnd,
        onMouseLeave: handleTouchEnd,
        onMouseMove: handleMove,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchMove: handleMove,
        onTouchCancel: handleTouchEnd, // Handle system interruptions
        onContextMenu: (e: React.MouseEvent) => {
            e.preventDefault();
            if (!selectionMode) onLongPress(m);
        },
        onClick: handleClick
    };

    const formatTime = (ts: number) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const renderAvatar = (src: string) => (
        <div className="relative w-9 h-9 shrink-0 z-0">
            <img
                src={src}
                className="w-full h-full rounded-[4px] object-cover bg-slate-200 pointer-events-none select-none"
                alt="avatar"
                loading="lazy"
                decoding="async"
            />
            {styleConfig.avatarDecoration && (
                <img
                    src={styleConfig.avatarDecoration}
                    className="absolute pointer-events-none z-10 max-w-none"
                    style={{
                        left: `${styleConfig.avatarDecorationX ?? 50}%`,
                        top: `${styleConfig.avatarDecorationY ?? 50}%`,
                        width: `${36 * (styleConfig.avatarDecorationScale ?? 1)}px`, // Base size 36px (w-9)
                        height: 'auto',
                        transform: `translate(-50%, -50%) rotate(${styleConfig.avatarDecorationRotate ?? 0}deg)`,
                    }}
                />
            )}
        </div>
    );

    // --- SYSTEM MESSAGE RENDERING ---
    if (isSystem) {
        // Clean up text: remove [System:] or [系统:] prefix for display
        const displayText = m.content.replace(/^\[(System|系统|System Log|系统记录)\s*[:：]?\s*/i, '').replace(/\]$/, '').trim();

        return (
            <div className={`flex flex-col items-center w-full ${selectionMode ? 'pl-8' : ''} animate-fade-in relative transition-[padding] duration-300`}>
                {selectionMode && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer z-20" onClick={() => onToggleSelect(m.id)}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 bg-white/80'}`}>
                            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                        </div>
                    </div>
                )}
                <div className="text-[10px] text-slate-400 mt-4 mb-0.5 opacity-70">{formatTime(m.timestamp)}</div>
                <div className="flex justify-center mb-4 px-10 w-full" {...interactionProps}>
                    <div className="sully-system-pill flex items-center gap-1.5 bg-slate-200/40 backdrop-blur-md text-slate-500 px-3 py-1 rounded-full shadow-sm border border-white/20 select-none cursor-pointer active:scale-95 transition-transform">
                        {/* Optional Icon based on content */}
                        {displayText.includes('任务') ? '✨' :
                            displayText.includes('纪念日') || displayText.includes('Event') ? '📅' :
                                displayText.includes('转账') ? '💰' : '🔔'}
                        <span className="text-[10px] font-medium tracking-wide">{displayText}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (m.type === 'interaction') {
        return (
            <div className={`flex flex-col items-center ${marginBottom} w-full animate-fade-in relative transition-[padding] duration-300 ${selectionMode ? 'pl-8' : ''}`}>
                {selectionMode && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer z-20" onClick={() => onToggleSelect(m.id)}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 bg-white/80'}`}>
                            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                        </div>
                    </div>
                )}
                <div className="text-[10px] text-slate-400 mb-1 opacity-70">{formatTime(m.timestamp)}</div>
                <div className="group relative cursor-pointer active:scale-95 transition-transform" {...interactionProps}>
                    <div className="sully-interaction-pill text-[11px] text-slate-500 bg-slate-200/50 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-white/40 shadow-sm select-none">
                        <span className="group-hover:animate-bounce">👉</span>
                        <span className="font-medium opacity-80">{isUser ? '你' : charName}</span>
                        <span className="opacity-60">戳了戳</span>
                        <span className="font-medium opacity-80">{isUser ? charName : '你'}</span>
                    </div>
                </div>
            </div>
        );
    }

    const commonLayout = (content: React.ReactNode) => (
        <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} ${marginBottom} px-3 group select-none relative transition-[padding] duration-300 ${selectionMode ? (isUser ? 'pr-14' : 'pl-14') : ''}`}>
            {selectionMode && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer z-20" onClick={() => onToggleSelect(m.id)}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary' : 'border-slate-300 bg-white/80'}`}>
                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                    </div>
                </div>
            )}

            {/* Avatar for AI */}
            {!isUser && renderAvatar(charAvatar)}

            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%] min-w-0 mx-2.5`} {...interactionProps}>
                <div className={`${selectionMode ? 'pointer-events-none' : ''} relative w-full`}>
                    {content}
                </div>
            </div>

            {/* Avatar for User */}
            {isUser && renderAvatar(userAvatar)}
        </div>
    );

    // [New] Social Card Rendering
    // --- Chat Forward Card ---
    if (m.type === 'chat_forward') {
        let forwardData: any = null;
        try { forwardData = JSON.parse(m.content); } catch { }
        if (forwardData) {
            return <ForwardCard forwardData={forwardData} commonLayout={commonLayout} interactionProps={interactionProps} selectionMode={selectionMode} />;
        }
    }

    // --- XHS Card Rendering (小红书笔记卡片) ---
    if (m.type === 'xhs_card' && m.metadata?.xhsNote) {
        const note = m.metadata.xhsNote;
        return commonLayout(
            <div className="sully-card-container w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer active:opacity-90 transition-opacity">
                {/* Cover image */}
                {note.coverUrl ? (
                    <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                        <img
                            src={note.coverUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            onError={(e: any) => {
                                // 图片加载失败时显示占位图（保持卡片高度）
                                const img = e.target;
                                const container = img.parentElement;
                                if (!container) return;
                                img.style.display = 'none';
                                // 避免重复插入占位
                                if (container.querySelector('.xhs-cover-fallback')) return;
                                const fallback = document.createElement('div');
                                fallback.className = 'xhs-cover-fallback w-full h-full bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center';
                                fallback.innerHTML = `<div class="text-center"><div class="text-2xl mb-1">📕</div><div class="text-[10px] text-red-300 font-medium">${note.title ? '封面加载失败' : '小红书笔记'}</div></div>`;
                                container.appendChild(fallback);
                            }}
                        />
                        {note.type === 'video' && (
                            <div className="absolute top-2 right-2 bg-black/50 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                                <span className="text-[9px] text-white font-medium">视频</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-14 bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center">
                        <span className="text-white/80 text-xs font-medium tracking-wide">小红书笔记</span>
                    </div>
                )}
                <div className="p-3">
                    {/* Title */}
                    <div className="font-bold text-sm text-slate-800 line-clamp-2 leading-snug mb-1.5">{note.title || '无标题笔记'}</div>
                    {/* Description */}
                    {note.desc && <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-2">{note.desc}</p>}
                    {/* Author + Likes */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-pink-400 flex items-center justify-center text-[8px] text-white font-bold">{(note.author || '?')[0]}</div>
                            <span className="text-[10px] text-slate-500 truncate max-w-[100px]">{note.author || '小红书用户'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-red-300"><path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.723.723 0 0 1-.692 0l-.003-.002Z" /></svg>
                            <span>{note.likes || 0}</span>
                        </div>
                    </div>
                    {/* Footer label */}
                    <div className="mt-2 pt-1.5 flex items-center gap-1 text-[9px] text-slate-300">
                        <span className="text-red-400 font-bold">小红书</span> <span>·</span> <span>{note.type === 'video' ? '视频' : '笔记'}{isUser ? '分享' : '推荐'}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (m.type === 'social_card' && m.metadata?.post) {
        const post = m.metadata.post;
        return commonLayout(
            <div className="w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer active:opacity-90 transition-opacity">
                <div className="h-32 w-full flex items-center justify-center text-6xl relative overflow-hidden" style={{ background: post.bgStyle || '#fce7f3' }}>
                    {post.images?.[0] || '📄'}
                    <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/30 to-transparent">
                        <div className="text-white text-xs font-bold line-clamp-1">{post.title}</div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                        <img src={post.authorAvatar} className="w-4 h-4 rounded-full" />
                        <span className="text-[10px] text-slate-500">{post.authorName}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.content}</p>
                    <div className="mt-2 pt-2 border-t border-slate-50 flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="text-red-400">Spark</span> • 笔记分享
                    </div>
                </div>
            </div>
        );
    }

    if (m.type === 'transfer') {
        const status = (m.metadata?.status as string) || 'pending';
        const isPending = status === 'pending';
        const isAccepted = status === 'accepted';
        const isReturned = status === 'returned';

        // Colors: pending=bright orange, accepted=muted light orange, returned=grey
        const topBg = isPending ? '#f3883b' : isReturned ? '#e8e8e8' : '#fadcce';
        const bottomBg = isPending ? '#ffffff' : isReturned ? '#f0f0f0' : '#f7ece3';
        const amtColor = isPending ? '#ffffff' : isReturned ? '#999999' : '#f09a37';
        const descColor = isPending ? 'rgba(255,255,255,0.8)' : isReturned ? '#aaaaaa' : '#c08a5a';
        const labelColor = isPending ? '#f3883b' : isReturned ? '#bbbbbb' : '#d4a574';

        // Status text from the viewer's perspective
        let statusText = '';
        if (isPending) {
            statusText = isUser ? `转账给${charName}` : '转账给你';
        } else if (isAccepted) {
            statusText = isUser ? '已被接收' : '已收款';
        } else if (isReturned) {
            statusText = '已退还';
        }

        // Icons for different states
        const StatusIcon = () => {
            if (isPending) {
                // Double-arrow transfer icon
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
                );
            }
            if (isAccepted) {
                // Checkmark circle
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10" /><path d="M8 12.5l2.5 3 5.5-6" /></svg>
                );
            }
            // Returned: undo/return arrow circle
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10" /><path d="M14.5 8.5H10a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h1" /><path d="M11 8.5l-2 2 2 2" /></svg>
            );
        };

        const handleTransferClick = (e: React.MouseEvent) => {
            if (selectionMode) return;
            if (!isPending) return; // Only pending cards are actionable
            e.stopPropagation();
            if (typeof onTransferAction === 'function') {
                onTransferAction(m);
            }
        };

        return commonLayout(
            <div
                className={`sully-transfer-card ${isReturned ? 'is-returned' : ''} ${isAccepted ? 'is-accepted' : ''} w-full max-w-[220px] sm:max-w-[240px] flex flex-col rounded-[8px] overflow-hidden shadow-sm ${isPending ? 'cursor-pointer active:scale-[0.98]' : ''} transition-transform`}
                onClick={handleTransferClick}
            >
                {/* Top Section */}
                <div className="sully-transfer-top p-3.5 pb-3 relative" style={{ backgroundColor: topBg }}>
                    {/* Faint ¥ watermark */}
                    <span className="sully-transfer-watermark absolute right-3 top-1/2 -translate-y-1/2 text-[42px] font-bold leading-none pointer-events-none select-none" style={{ fontFamily: 'system-ui, sans-serif', color: isPending ? 'rgba(255,255,255,0.12)' : 'rgba(210,160,100,0.15)' }}>¥</span>

                    <div className="flex items-center gap-3 relative z-10">
                        {/* Status icon */}
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: isPending ? 'rgba(255,255,255,0.2)' : 'rgba(210,160,100,0.2)', color: amtColor }}>
                            <StatusIcon />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-medium leading-tight" style={{ color: amtColor }}>¥{m.metadata?.amount || '0.00'}</span>
                            <span className="text-[11px] mt-0.5 max-w-[130px] truncate leading-tight" style={{ color: descColor }}>
                                {statusText}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Flap */}
                <div className="sully-transfer-bottom px-3.5 py-1.5 flex items-center" style={{ backgroundColor: bottomBg }}>
                    <span className="text-[10px] font-medium opacity-80" style={{ color: labelColor }}>微信转账</span>
                </div>
            </div>
        );
    }

    if (m.type === 'emoji') {
        return commonLayout(
            <img src={m.content} className="max-w-[160px] max-h-[160px] hover:scale-105 transition-transform drop-shadow-md active:scale-95" loading="lazy" decoding="async" />
        );
    }

    if (m.type === 'image') {
        return commonLayout(
            <div className="relative group">
                <img src={m.content} className="sully-image-msg max-w-[200px] max-h-[300px] rounded-2xl shadow-sm border border-black/5" alt="Uploaded" loading="lazy" decoding="async" />
            </div>
        );
    }

    // --- Dynamic Style Generation for Bubble ---
    const radius = styleConfig.borderRadius !== undefined ? styleConfig.borderRadius : 6;
    let borderObj: React.CSSProperties = { borderRadius: `${radius}px` };

    // Container style (BackgroundColor + Opacity)
    const containerStyle: React.CSSProperties = {
        backgroundColor: styleConfig.backgroundColor,
        opacity: styleConfig.opacity, // Overall container opacity
        ...borderObj,
    };

    // --- Inline formatting parser: code → bold+italic → bold → italic → plain ---
    const renderInline = (text: string): React.ReactNode[] => {
        // Pre-clean: markdown links [text](url) → just text
        let cleaned = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        // Pre-clean: stray backticks
        cleaned = cleaned.replace(/``+/g, '').replace(/(^|\s)`(\s|$)/g, '$1$2');

        const nodes: React.ReactNode[] = [];
        let nodeKey = 0;

        // Step 1: Split by inline code (`code`)
        const codeParts = cleaned.split(/(`[^`]+`)/g);
        for (const codePart of codeParts) {
            if (codePart.startsWith('`') && codePart.endsWith('`') && codePart.length > 2) {
                nodes.push(<code key={nodeKey++} className="bg-black/10 px-1 py-0.5 rounded text-[13px] font-mono">{codePart.slice(1, -1)}</code>);
                continue;
            }
            // Step 2: Split by bold+italic (***text***) — must come before ** and *
            const boldItalicParts = codePart.split(/(\*\*\*[^*]+\*\*\*)/g);
            for (const biPart of boldItalicParts) {
                if (biPart.startsWith('***') && biPart.endsWith('***') && biPart.length > 6) {
                    nodes.push(<strong key={nodeKey++} className="font-bold"><em className="italic">{biPart.slice(3, -3)}</em></strong>);
                    continue;
                }
                // Step 3: Split by bold (**text**)
                const boldParts = biPart.split(/(\*\*[^*]+\*\*)/g);
                for (const boldPart of boldParts) {
                    if (boldPart.startsWith('**') && boldPart.endsWith('**') && boldPart.length > 4) {
                        nodes.push(<strong key={nodeKey++} className="font-bold">{boldPart.slice(2, -2)}</strong>);
                        continue;
                    }
                    // Strip orphaned ** that didn't form a valid bold pair
                    const cleanedBold = boldPart.replace(/\*\*/g, '');
                    // Step 4: Split by italic (*text*) — safe because ** already stripped
                    const italicParts = cleanedBold.split(/(\*[^*]+\*)/g);
                    for (const italicPart of italicParts) {
                        if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
                            nodes.push(<em key={nodeKey++} className="italic opacity-80">{italicPart.slice(1, -1)}</em>);
                            continue;
                        }
                        // Strip orphaned * that didn't form a valid italic pair
                        const cleanedItalic = italicPart.replace(/\*/g, '');
                        if (cleanedItalic) nodes.push(cleanedItalic);
                    }
                }
            }
        }
        return nodes;
    };

    // --- Enhanced Text Rendering (Markdown Lite) ---
    const renderContent = (text: string) => {
        // 1. Split by Code Blocks (triple backtick)
        const parts = text.split(/(```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            // Render Code Block
            if (part.startsWith('```') && part.endsWith('```')) {
                const codeContent = part.replace(/^```\w*\n?/, '').replace(/```$/, '');
                return (
                    <pre key={index} className="bg-black/80 text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto my-2 whitespace-pre shadow-inner border border-white/10">
                        {codeContent}
                    </pre>
                );
            }

            // Clean stray backtick artifacts from non-code text
            let cleanedPart = part
                .replace(/``+/g, '')
                .replace(/(^|\s)`(\s|$)/gm, '$1$2');

            // Render Regular Text (split by newlines for paragraph spacing)
            return cleanedPart.split('\n').map((line, lineIdx) => {
                const key = `${index}-${lineIdx}`;

                // Quote Format "> text"
                if (line.trim().startsWith('>')) {
                    const quoteText = line.trim().substring(1).trim();
                    if (!quoteText) return null;
                    return (
                        <div key={key} className="my-1 pl-2.5 border-l-[3px] border-black/20 opacity-70 italic text-[13px]">
                            {renderInline(quoteText)}
                        </div>
                    );
                }

                // Markdown Header "# text" → render as bold text (strip the #)
                const headerMatch = line.match(/^#{1,6}\s+(.+)$/);
                if (headerMatch) {
                    return <div key={key} className="min-h-[1.2em] font-bold">{renderInline(headerMatch[1])}</div>;
                }

                return <div key={key} className="min-h-[1.2em]">{renderInline(line)}</div>;
            });
        });
    };

    // Robust content cleanup: strip legacy markers, separators, bilingual tags, stray formatting
    const stripJunk = (s: string) => s
        .replace(/%%TRANS%%[\s\S]*/gi, '')           // legacy translation marker
        .replace(/%%BILINGUAL%%/gi, '\n')            // raw bilingual marker → newline
        .replace(/<\/?翻译>|<\/?原文>|<\/?译文>/g, '')  // stray bilingual XML tags
        .replace(/\[\[(?:QU[OA]TE|引用)[：:][\s\S]*?\]\]/g, '')  // residual double-bracket quotes (incl. typos & Chinese)
        .replace(/\[(?:QU[OA]TE|引用)[：:][^\]]*\]/g, '')     // residual single-bracket quotes (incl. typos & Chinese)
        .replace(/\[回复\s*[""\u201C][^""\u201D]*?[""\u201D](?:\.{0,3})\]\s*[：:]?\s*/g, '')  // [回复 "content"]: format
        // Residual action/system tags that may have leaked through
        .replace(/\[\[(?:ACTION|RECALL|SEARCH|DIARY|READ_DIARY|FS_DIARY|FS_READ_DIARY|SEND_EMOJI|DIARY_START|DIARY_END|FS_DIARY_START|FS_DIARY_END)[:\s][\s\S]*?\]\]/g, '')
        .replace(/\[schedule_message[^\]]*\]/g, '')
        .replace(/^\s*---\s*$/gm, '')                // standalone --- lines
        .replace(/``+/g, '')                          // empty/stray backtick pairs
        .replace(/(^|\s)`(\s|$)/gm, '$1$2')         // lone backticks at boundaries
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')    // markdown links → just text
        .replace(/\n{3,}/g, '\n\n')                  // collapse excess newlines
        .trim();

    const rawContent = m.content;

    // Parse %%BILINGUAL%% for bilingual display (langA = "选" language, langB = "译" language)
    const bilingualIdx = rawContent.toLowerCase().indexOf('%%bilingual%%');
    const hasBilingual = bilingualIdx !== -1;
    const langAContent = hasBilingual ? stripJunk(rawContent.substring(0, bilingualIdx)) : stripJunk(rawContent);
    const langBContent = hasBilingual ? stripJunk(rawContent.substring(bilingualIdx + '%%BILINGUAL%%'.length)) : '';

    // Display: "选" language by default, "译" language when toggled
    const displayContent = (isShowingTarget && langBContent) ? langBContent : langAContent;
    const showTranslateButton = translationEnabled && hasBilingual && langBContent;

    // Don't render empty bubbles (e.g. messages that were just "---")
    if (!displayContent && m.type === 'text') return null;

    // To allow the arrow tail to show out of bounds, we do not use 'overflow-hidden' everywhere
    return commonLayout(
        <div className={`relative px-3 py-2 animate-fade-in active:scale-[0.98] transition-transform ${isUser ? 'sully-bubble-user mt-0' : 'sully-bubble-ai mt-0'}`} style={containerStyle}>

            {/* The Tail (CSS Triangle) — uses inherit to follow bubble background via CSS variable */}
            <svg
                className={`sully-bubble-tail absolute top-[12px] w-[6px] h-[10px] pointer-events-none ${isUser ? '-right-[5.5px]' : '-left-[5.5px]'}`}
                version="1.1" xmlns="http://www.w3.org/2000/svg"
            >
                {isUser ? (
                    <polygon points="0,0 6,5 0,10" style={{ fill: styleConfig.backgroundColor || 'var(--bubble-bg, #95ec69)' }} />
                ) : (
                    <polygon points="6,0 0,5 6,10" style={{ fill: styleConfig.backgroundColor || 'var(--bubble-bg, white)' }} />
                )}
            </svg>

            {/* Layer 1: Background Image with Independent Opacity */}
            {styleConfig.backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
                    style={{
                        backgroundImage: `url(${styleConfig.backgroundImage})`,
                        opacity: styleConfig.backgroundImageOpacity ?? 0.5
                    }}
                />
            )}

            {/* Layer 2: Decoration Sticker (Custom Position) */}
            {styleConfig.decoration && (
                <img
                    src={styleConfig.decoration}
                    className="absolute z-10 w-8 h-8 object-contain drop-shadow-sm pointer-events-none"
                    style={{
                        left: `${styleConfig.decorationX ?? (isUser ? 90 : 10)}%`,
                        top: `${styleConfig.decorationY ?? -10}%`,
                        transform: `translate(-50%, -50%) scale(${styleConfig.decorationScale ?? 1}) rotate(${styleConfig.decorationRotate ?? 0}deg)`
                    }}
                    alt=""
                />
            )}

            {/* Layer 3: Reply/Quote Block */}
            {m.replyTo && (
                <div className="relative z-10 mb-1 text-[10px] bg-black/5 p-1.5 rounded-md border-l-2 border-black/20 opacity-60 flex flex-col gap-0.5 max-w-full overflow-hidden">
                    <span className="font-bold opacity-90 truncate">{m.replyTo.name}</span>
                    <span className="truncate italic">"{m.replyTo.content}"</span>
                </div>
            )}

            {/* Layer 4: Text Content */}
            <div className="relative z-10 text-[15px] leading-relaxed whitespace-pre-wrap select-text" style={{ color: styleConfig.textColor, overflowWrap: 'break-word', wordBreak: 'normal' }}>
                {renderContent(displayContent)}
            </div>

            {/* Layer 5: Per-bubble Translate Toggle (AI bilingual messages only, no API calls) */}
            {showTranslateButton && (
                <div className="relative z-10 mt-2 flex justify-end">
                    <button
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); onTranslateToggle?.(m.id); }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all active:scale-95 select-none"
                        style={{
                            color: styleConfig.textColor,
                            opacity: 0.45,
                            backgroundColor: isShowingTarget ? 'rgba(0,0,0,0.06)' : 'transparent',
                        }}
                    >
                        {isShowingTarget ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z" clipRule="evenodd" /></svg>
                                <span>原文</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278.75.75 0 1 0 .198 1.487A31.545 31.545 0 0 1 8.7 5.545 19.381 19.381 0 0 1 7.257 9.04a19.391 19.391 0 0 1-1.727-2.29.75.75 0 1 0-1.29.77 20.9 20.9 0 0 0 2.023 2.684 19.549 19.549 0 0 1-3.158 2.57.75.75 0 1 0 .86 1.229A21.056 21.056 0 0 0 7.5 11.03c1.1.95 2.3 1.79 3.593 2.49a.75.75 0 1 0 .69-1.331A19.545 19.545 0 0 1 8.46 9.89a20.893 20.893 0 0 0 1.91-4.644h2.38a.75.75 0 0 0 0-1.5h-3v-1a.75.75 0 0 0-.75-.75Z" /><path d="M12.75 10a.75.75 0 0 1 .692.462l2.5 6a.75.75 0 1 1-1.384.576l-.532-1.278h-3.052l-.532 1.278a.75.75 0 1 1-1.384-.576l2.5-6A.75.75 0 0 1 12.75 10Zm-1.018 4.26h2.036L12.75 11.6l-1.018 2.66Z" /></svg>
                                <span>译</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}, (prev, next) => {
    return prev.msg.id === next.msg.id &&
        prev.msg.content === next.msg.content &&
        prev.msg.metadata?.status === next.msg.metadata?.status &&
        prev.isFirstInGroup === next.isFirstInGroup &&
        prev.isLastInGroup === next.isLastInGroup &&
        prev.activeTheme === next.activeTheme &&
        prev.selectionMode === next.selectionMode &&
        prev.isSelected === next.isSelected &&
        prev.translationEnabled === next.translationEnabled &&
        prev.isShowingTarget === next.isShowingTarget;
});

export default MessageItem;