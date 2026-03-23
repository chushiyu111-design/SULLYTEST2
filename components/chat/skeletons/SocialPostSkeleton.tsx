/**
 * SocialPostSkeleton — 社交动态骨架
 *
 * 类微博/推特/朋友圈卡片风格：头像、用户名、动态内容、底部互动操作栏
 * 参照 skeleton_card_spec.md #8 设计
 */
import React, { useMemo } from 'react';
import { StatusCardData } from '../../../types/statusCard';

const FONT_MAP: Record<string, string> = {
    serif: "'Noto Serif SC', 'Kaiti SC', STKaiti, serif",
    sans: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    handwrite: "'ShouXie6', 'HuangHunShouXie', 'Kaiti SC', STKaiti, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

const SocialPostSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, meta, style } = data;
    
    // Determine dark mode
    const isDark = style.mood === 'dark' || (style.bgGradient && style.bgGradient[0].match(/^#[0-3]/));
    
    // Default backgrounds for Twitter-like UI
    const defaultBg = isDark ? '#15202B' : '#FFFFFF';
    const bgStyle = style.bgGradient
        ? `linear-gradient(145deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : defaultBg;
        
    const textColor = style.textColor || (isDark ? '#E7E9EA' : '#0F1419');
    const secondaryTextColor = isDark ? '#8B98A5' : '#536471';
    const accent = style.accent || '#1D9BF0'; 
    const fontFamily = FONT_MAP[style.fontStyle || 'sans'];
    
    // Stable random metrics
    const { likes, comments, shares } = useMemo(() => {
        return {
            likes: meta?.likes ?? Math.floor(Math.random() * 800 + 10),
            comments: meta?.comments ?? Math.floor(Math.random() * 80 + 2),
            shares: meta?.shares ?? Math.floor(Math.random() * 50),
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Avatar fallback
    const avatar = meta?.avatar || icon || '🐱';
    
    // Formatting username
    const username = title ? title.toLowerCase().replace(/\s+/g, '_') : 'user';

    return (
        <div
            style={{
                width: '330px',
                maxWidth: 'calc(100vw - 48px)',
                background: typeof bgStyle === 'string' && bgStyle.startsWith('linear') 
                    ? bgStyle : bgStyle as string,
                color: textColor,
                fontFamily,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isDark 
                    ? '0 12px 30px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08)' 
                    : '0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative' as const,
            }}
        >
            {/* --- Header: Avatar, Name & Meta --- */}
            <div style={{
                padding: '16px 16px 12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}>
                {/* Avatar Circle */}
                <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${accent}40, ${accent}90)`,
                    backgroundColor: accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                }}>
                    {avatar}
                </div>
                
                {/* Name Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, gap: '2px' }}>
                    <div style={{ 
                        fontSize: '15px', 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span style={{ 
                            textOverflow: 'ellipsis', 
                            overflow: 'hidden', 
                            whiteSpace: 'nowrap',
                            maxWidth: '140px' 
                        }}>
                            {title || '匿名用户'}
                        </span>
                        {/* Verified Badge Icon */}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={accent} style={{ flexShrink: 0, marginTop: '2px' }}>
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.746 2.75 1.87 3.45-.098.346-.152.712-.152 1.09 0 2.21 1.71 4 3.918 4 .58 0 1.13-.15 1.616-.41 1.252 1.05 2.85 1.69 4.58 1.69 1.73 0 3.328-.64 4.58-1.69.486.26 1.036.41 1.616.41 2.21 0 3.918-1.792 3.918-4 0-.378-.054-.744-.152-1.09 1.124-.7 1.87-1.99 1.87-3.45zm-10.42 5.01-4.88-4.88 1.768-1.767 3.112 3.11 7.356-7.355 1.767 1.768-9.123 9.124z" />
                        </svg>
                    </div>
                    <div style={{ 
                        fontSize: '13px', 
                        color: secondaryTextColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span>@{username}</span>
                        <span>·</span>
                        <span style={{ opacity: 0.9 }}>now</span>
                    </div>
                </div>
                
                {/* Options icon */}
                <div style={{ color: secondaryTextColor, padding: '4px', opacity: 0.8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="5" cy="12" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="19" cy="12" r="2" />
                    </svg>
                </div>
            </div>

            {/* --- Body Content --- */}
            <div style={{ 
                padding: '2px 16px 14px 16px', 
                fontSize: '15px', 
                lineHeight: '1.55',
                whiteSpace: 'pre-wrap' as const,
                wordBreak: 'break-word',
                letterSpacing: '0.1px'
            }}>
                {body}
            </div>

            {/* --- Footer Info --- */}
            {footer && (
                <div style={{
                    padding: '0 16px 14px 16px',
                    fontSize: '13px',
                    color: secondaryTextColor,
                }}>
                    {footer}
                </div>
            )}

            {/* --- Divider --- */}
            <div style={{
                height: '1px',
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                margin: '0 16px',
            }} />

            {/* --- Engagement Bar --- */}
            <div style={{
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                color: secondaryTextColor,
                fontSize: '13px',
                fontWeight: 500,
            }}>
                {/* Comments */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    <span>{comments}</span>
                </div>
                
                {/* Reposts */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 1l4 4-4 4"/>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                        <path d="M7 23l-4-4 4-4"/>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                    </svg>
                    <span>{shares}</span>
                </div>
                
                {/* Likes */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: style.accent ? accent : '#F91880' 
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={style.accent ? accent : '#F91880'} stroke={style.accent ? accent : '#F91880'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{likes}</span>
                </div>
                
                {/* Share/External */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16 6 12 2 8 6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SocialPostSkeleton;
