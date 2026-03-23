/**
 * StickyNoteSkeleton — 便签/便利贴骨架
 * 方形彩色便利贴，图钉装饰，翘角效果，纸质质感
 */
import React from 'react';
import { StatusCardData } from '../../../types/statusCard';

const FONT_MAP: Record<string, string> = {
    serif: "'Noto Serif SC', 'Kaiti SC', STKaiti, serif",
    sans: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    handwrite: "'ShouXie6', 'HuangHunShouXie', 'Kaiti SC', STKaiti, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

const StickyNoteSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, style } = data;

    // 便签底色 — 优先用渐变首色做主色调，再做微妙的同色渐变
    const baseColor = style.bgGradient?.[0] || '#FFF9C4';
    const endColor = style.bgGradient?.[1] || baseColor;
    const bgStyle = `linear-gradient(165deg, ${baseColor} 0%, ${endColor} 100%)`;

    const textColor = style.textColor || '#4A4A2E';
    const accent = style.accent || '#C9A84C';
    const fontFamily = FONT_MAP[style.fontStyle || 'handwrite'];

    return (
        <div style={{
            width: '280px',
            maxWidth: 'calc(100vw - 48px)',
            position: 'relative',
            /* 纸张整体微微倾斜 */
            transform: 'rotate(1.2deg)',
        }}>
            {/* ── 📌 图钉装饰 ── */}
            <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 38% 35%, ${accent}ee, ${accent}88 60%, ${accent}55)`,
                boxShadow: `0 3px 6px rgba(0,0,0,0.25), inset 0 -2px 3px rgba(0,0,0,0.15), 0 1px 2px ${accent}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* 图钉高光 */}
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.8), rgba(255,255,255,0.1))',
                }} />
            </div>

            {/* ── 图钉阴影针脚 ── */}
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '3px',
                height: '8px',
                background: `linear-gradient(180deg, ${accent}66, transparent)`,
                borderRadius: '0 0 1px 1px',
                zIndex: 2,
            }} />

            {/* ── 便签主体 ── */}
            <div style={{
                background: bgStyle,
                color: textColor,
                fontFamily,
                padding: '28px 22px 20px',
                minHeight: '220px',
                position: 'relative',
                overflow: 'hidden',
                /* 厚重投影 + 微妙内阴影模拟纸质 */
                boxShadow: `
                    3px 5px 20px rgba(0,0,0,0.18),
                    1px 2px 6px rgba(0,0,0,0.08),
                    inset 0 1px 0 rgba(255,255,255,0.35),
                    inset 0 -2px 6px rgba(0,0,0,0.04)
                `,
                display: 'flex',
                flexDirection: 'column' as const,
            }}>

                {/* ── 纸张纹理覆盖层 ── */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                    pointerEvents: 'none' as const,
                    zIndex: 1,
                }} />

                {/* ── 上边缘胶带痕迹 (淡淡的粘贴区域) ── */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '30%',
                    right: '30%',
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${accent}18, transparent)`,
                    pointerEvents: 'none' as const,
                }} />

                {/* ── 翘角效果 (右下角) ── */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '35px',
                    height: '35px',
                    background: `linear-gradient(225deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 40%, transparent 60%)`,
                    pointerEvents: 'none' as const,
                    zIndex: 2,
                }} />
                {/* 翘角处的纸张折叠阴影 */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '25px',
                    height: '25px',
                    background: `linear-gradient(225deg, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                    pointerEvents: 'none' as const,
                    zIndex: 2,
                }} />

                {/* ── 标题区域 ── */}
                {title && (
                    <div style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        marginBottom: '14px',
                        marginTop: '2px',
                        letterSpacing: '0.5px',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        {icon && <span style={{ fontSize: '17px' }}>{icon}</span>}
                        <span>{title}</span>
                    </div>
                )}

                {/* ── 装饰分割线 ── */}
                {title && (
                    <div style={{
                        width: '40px',
                        height: '2px',
                        background: `${accent}55`,
                        borderRadius: '1px',
                        marginBottom: '14px',
                        position: 'relative',
                        zIndex: 1,
                    }} />
                )}

                {/* 如果没有标题，但有icon，单独显示 */}
                {!title && icon && (
                    <div style={{
                        fontSize: '22px',
                        marginBottom: '10px',
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        {icon}
                    </div>
                )}

                {/* ── 主体内容 ── */}
                <div style={{
                    fontSize: '15px',
                    lineHeight: '2.0',
                    whiteSpace: 'pre-wrap' as const,
                    transform: 'rotate(0.5deg)',
                    flex: 1,
                    position: 'relative',
                    zIndex: 1,
                    wordBreak: 'break-word' as const,
                }}>
                    {body}
                </div>

                {/* ── 底部签名/日期 ── */}
                {footer && (
                    <div style={{
                        fontSize: '11px',
                        opacity: 0.5,
                        marginTop: '18px',
                        textAlign: 'right' as const,
                        fontStyle: 'italic' as const,
                        position: 'relative',
                        zIndex: 1,
                        letterSpacing: '0.3px',
                    }}>
                        — {footer}
                    </div>
                )}

                {/* ── 左下角装饰墨点 ── */}
                <div style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '16px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: `${textColor}22`,
                    boxShadow: `8px -6px 0 1px ${textColor}11, 16px 2px 0 0px ${textColor}0a`,
                    pointerEvents: 'none' as const,
                    zIndex: 1,
                }} />
            </div>
        </div>
    );
};

export default StickyNoteSkeleton;
