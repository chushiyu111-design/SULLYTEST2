/**
 * DiarySkeleton — 日记页骨架
 *
 * 横线本页风格：红色装订线 + repeating 横线 + 手写感 + 墨渍装饰
 * 参照 skeleton_card_spec.md #5 设计
 */
import React from 'react';
import { StatusCardData } from '../../../types/statusCard';

const FONT_MAP: Record<string, string> = {
    serif: "'Noto Serif SC', 'Kaiti SC', STKaiti, serif",
    sans: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    handwrite: "'ShouXie6', 'HuangHunShouXie', 'Kaiti SC', STKaiti, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

/* ---- 内联 SVG：纸张纹理 (fractal noise) ---- */
const PAPER_TEXTURE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`;

/* 行高（px），横线间距基准 */
const LINE_HEIGHT_PX = 34;

const DiarySkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, style } = data;

    const bgGrad = style.bgGradient
        ? `linear-gradient(180deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : '#FEFCF3';
    const textColor = style.textColor || '#3D3425';
    const accent = style.accent || '#C0392B';
    const fontFamily = FONT_MAP[style.fontStyle || 'handwrite'];

    /* 装订线颜色 —— 基于 accent 略透明 */
    const bindingColor = accent;

    return (
        <div
            style={{
                width: '330px',
                maxWidth: 'calc(100vw - 48px)',
                background: typeof bgGrad === 'string' && bgGrad.startsWith('linear')
                    ? bgGrad : bgGrad as string,
                color: textColor,
                fontFamily,
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative' as const,
                boxShadow:
                    '0 2px 6px rgba(0,0,0,0.06), ' +
                    '0 12px 28px -4px rgba(0,0,0,0.18), ' +
                    '0 32px 56px -12px rgba(0,0,0,0.22), ' +
                    'inset 0 0 0 1px rgba(255,255,255,0.45)',
            }}
        >
            {/* ---- 纸张纹理叠加 ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    inset: 0,
                    backgroundImage: PAPER_TEXTURE_SVG,
                    backgroundRepeat: 'repeat',
                    pointerEvents: 'none' as const,
                    zIndex: 1,
                    mixBlendMode: 'multiply' as const,
                }}
            />

            {/* ---- 红色装订线（左侧竖线，双线） ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    left: '38px',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: `${bindingColor}30`,
                    zIndex: 3,
                    boxShadow: `3px 0 0 0 ${bindingColor}20`,
                }}
            />

            {/* ---- 装订孔装饰（左边缘圆孔） ---- */}
            {[0, 1, 2].map((i) => (
                <div
                    key={`hole-${i}`}
                    style={{
                        position: 'absolute' as const,
                        left: '10px',
                        top: `${60 + i * 80}px`,
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)',
                        zIndex: 4,
                    }}
                />
            ))}

            {/* ---- 日期头区域 ---- */}
            <div
                style={{
                    padding: '18px 20px 14px 54px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `2px solid ${accent}25`,
                    position: 'relative' as const,
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                    }}
                >
                    {icon && (
                        <span style={{ fontSize: '18px' }}>{icon}</span>
                    )}
                    <span>{title || '日记'}</span>
                </div>
                {footer && (
                    <span
                        style={{
                            fontSize: '10px',
                            opacity: 0.55,
                            fontFamily: "'Georgia', serif",
                            letterSpacing: '0.15em',
                        }}
                    >
                        {footer}
                    </span>
                )}
            </div>

            {/* ---- 粗分隔线（标题与正文之间的横线） ---- */}
            <div
                style={{
                    marginLeft: '54px',
                    marginRight: '20px',
                    height: '1px',
                    background: `linear-gradient(90deg, ${accent}20, ${accent}08)`,
                    position: 'relative' as const,
                    zIndex: 2,
                }}
            />

            {/* ---- 横线本体内容区域 ---- */}
            <div
                style={{
                    padding: `18px 20px 32px 54px`,
                    fontSize: '15px',
                    lineHeight: `${LINE_HEIGHT_PX}px`,
                    whiteSpace: 'pre-wrap' as const,
                    minHeight: '170px',
                    position: 'relative' as const,
                    zIndex: 2,
                    /* 横线用 repeating-linear-gradient 实现 */
                    backgroundImage: `repeating-linear-gradient(
                        transparent,
                        transparent ${LINE_HEIGHT_PX - 1}px,
                        #DED6C6 ${LINE_HEIGHT_PX - 1}px,
                        #DED6C6 ${LINE_HEIGHT_PX}px
                    )`,
                    backgroundPosition: '0 17px',
                    letterSpacing: '0.6px',
                }}
            >
                {/* 微妙墨迹效果 — 文字略带不齐感 */}
                <span
                    style={{
                        display: 'inline',
                        textShadow: '0.3px 0.2px 0px rgba(45,35,25,0.08)',
                    }}
                >
                    {body?.trim()}
                </span>
            </div>

            {/* ---- 钢笔墨渍装饰（半透明圆点） ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    bottom: '28px',
                    right: '24px',
                    zIndex: 3,
                    pointerEvents: 'none' as const,
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'flex-end',
                }}
            >
                {/* 大墨点 */}
                <div
                    style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: `${textColor}15`,
                        boxShadow: `1px 1px 3px ${textColor}08`,
                    }}
                />
                {/* 小墨点 */}
                <div
                    style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: `${textColor}12`,
                    }}
                />
                {/* 极小溅射点 */}
                <div
                    style={{
                        width: '2px',
                        height: '2px',
                        borderRadius: '50%',
                        background: `${textColor}10`,
                        transform: 'translate(3px, -5px)',
                    }}
                />
            </div>

            {/* ---- 角落装饰 icon ---- */}
            {icon && (
                <div
                    style={{
                        position: 'absolute' as const,
                        bottom: '16px',
                        right: '18px',
                        fontSize: '22px',
                        opacity: 0.12,
                        transform: 'rotate(-8deg)',
                        zIndex: 2,
                        pointerEvents: 'none' as const,
                    }}
                >
                    {icon}
                </div>
            )}

            {/* ---- 纸张右下角微卷效果 ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    bottom: 0,
                    right: 0,
                    width: '32px',
                    height: '32px',
                    background:
                        'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.015) 50%, rgba(0,0,0,0.035) 100%)',
                    pointerEvents: 'none' as const,
                    zIndex: 5,
                }}
            />

            {/* ---- 页面顶部微妙的年代感暗角 ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    inset: 0,
                    background:
                        'radial-gradient(ellipse at center, transparent 60%, rgba(120,100,70,0.06) 100%)',
                    pointerEvents: 'none' as const,
                    zIndex: 1,
                }}
            />
        </div>
    );
};

export default DiarySkeleton;
