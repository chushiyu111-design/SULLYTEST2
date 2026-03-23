/**
 * PolaroidSkeleton — 拍立得骨架
 *
 * 宝丽来照片风格：白色厚边框 + 正方形"照片"区域(渐变色块)
 * + 底部手写备注 + 胶带装饰 + 轻微倾斜 + 厚重投影
 * 参照 skeleton_card_spec.md #7 设计
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

/* ---- 胶带半透明 SVG ---- */
const TAPE_WIDTH = 70;
const TAPE_HEIGHT = 26;

const PolaroidSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { body, footer, icon, style } = data;

    const bgGrad = style.bgGradient
        ? `linear-gradient(135deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : 'linear-gradient(135deg, #dfe6e9, #b2bec3)';
    const textColor = style.textColor || '#2d3436';
    const accent = style.accent || '#b2bec3';
    const fontFamily = FONT_MAP[style.fontStyle || 'handwrite'];

    return (
        <div
            style={{
                width: '330px',
                maxWidth: 'calc(100vw - 48px)',
                position: 'relative' as const,
                /* 轻微倾斜 */
                transform: 'rotate(-2.5deg)',
                /* 不裁剪，让胶带可以超出 */
                overflow: 'visible',
            }}
        >
            {/* ---- 胶带装饰 (顶部居中，微微倾斜) ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    top: `-${TAPE_HEIGHT / 2 + 2}px`,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(3deg)',
                    width: `${TAPE_WIDTH}px`,
                    height: `${TAPE_HEIGHT}px`,
                    background: 'linear-gradient(180deg, rgba(255,245,220,0.55) 0%, rgba(245,230,195,0.45) 100%)',
                    borderRadius: '1px',
                    boxShadow:
                        '0 1px 3px rgba(0,0,0,0.06), ' +
                        'inset 0 0 0 0.5px rgba(200,180,140,0.20)',
                    zIndex: 10,
                    /* 胶带边缘锯齿效果 */
                    clipPath:
                        'polygon(' +
                        '2% 0%, 6% 100%, 10% 0%, 14% 100%, 18% 0%, 22% 100%, 26% 0%, 30% 100%, ' +
                        '34% 0%, 38% 100%, 42% 0%, 46% 100%, 50% 0%, 54% 100%, 58% 0%, 62% 100%, ' +
                        '66% 0%, 70% 100%, 74% 0%, 78% 100%, 82% 0%, 86% 100%, 90% 0%, 94% 100%, 98% 0%, ' +
                        '100% 0%, 100% 100%, 0% 100%, 0% 0%)',
                }}
            />
            {/* 胶带主体（覆盖锯齿内部区域） */}
            <div
                style={{
                    position: 'absolute' as const,
                    top: `-${TAPE_HEIGHT / 2 - 2}px`,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(3deg)',
                    width: `${TAPE_WIDTH}px`,
                    height: `${TAPE_HEIGHT - 6}px`,
                    background: 'linear-gradient(180deg, rgba(255,248,228,0.50) 0%, rgba(248,235,205,0.40) 100%)',
                    borderRadius: '0.5px',
                    zIndex: 11,
                    pointerEvents: 'none' as const,
                }}
            />

            {/* ---- 主卡片 (白色厚边框宝丽来) ---- */}
            <div
                style={{
                    width: '100%',
                    background: '#FFFFFF',
                    borderRadius: '2px',
                    /* 宝丽来经典边距：上左右窄，底部宽 */
                    padding: '16px 16px 44px 16px',
                    boxShadow:
                        '0 1px 3px rgba(0,0,0,0.06), ' +        /* 近影 */
                        '0 6px 16px rgba(0,0,0,0.10), ' +       /* 中影 */
                        '0 20px 44px -8px rgba(0,0,0,0.22), ' +  /* 远影 — 厚卡片 */
                        '0 36px 60px -16px rgba(0,0,0,0.16), ' + /* 落地影 */
                        'inset 0 0 0 1px rgba(0,0,0,0.04)',      /* 边线 */
                    position: 'relative' as const,
                    overflow: 'hidden',
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

                {/* ---- 微微泛黄的老照片效果边缘 ---- */}
                <div
                    style={{
                        position: 'absolute' as const,
                        inset: 0,
                        background:
                            'radial-gradient(ellipse at center, transparent 60%, rgba(245,235,210,0.15) 100%)',
                        pointerEvents: 'none' as const,
                        zIndex: 1,
                    }}
                />

                {/* ---- 正方形 "照片" 区域 ---- */}
                <div
                    style={{
                        position: 'relative' as const,
                        width: '100%',
                        aspectRatio: '1 / 1',
                        background: bgGrad,
                        borderRadius: '1px',
                        boxShadow:
                            'inset 0 2px 8px rgba(0,0,0,0.10), ' +
                            'inset 0 0 0 1px rgba(0,0,0,0.04)',
                        overflow: 'hidden',
                        zIndex: 2,
                    }}
                >
                    {/* 照片区域的光影效果 */}
                    <div
                        style={{
                            position: 'absolute' as const,
                            inset: 0,
                            background:
                                'linear-gradient(170deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.05) 100%)',
                            pointerEvents: 'none' as const,
                            zIndex: 2,
                        }}
                    />

                    {/* 照片颗粒/噪点纹理 */}
                    <div
                        style={{
                            position: 'absolute' as const,
                            inset: 0,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                            pointerEvents: 'none' as const,
                            zIndex: 3,
                            mixBlendMode: 'overlay' as const,
                        }}
                    />

                    {/* icon 居中显示 */}
                    {icon && (
                        <div
                            style={{
                                position: 'absolute' as const,
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '52px',
                                filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.20))',
                                zIndex: 4,
                                lineHeight: 1,
                            }}
                        >
                            {icon}
                        </div>
                    )}

                    {/* 照片边缘暗角 (vignette) */}
                    <div
                        style={{
                            position: 'absolute' as const,
                            inset: 0,
                            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.08)',
                            pointerEvents: 'none' as const,
                            zIndex: 5,
                        }}
                    />
                </div>

                {/* ---- 底部宽白边区域：手写文字 ---- */}
                <div
                    style={{
                        position: 'relative' as const,
                        zIndex: 2,
                        marginTop: '18px',
                        padding: '0 6px',
                    }}
                >
                    {/* body 手写文字 */}
                    <div
                        style={{
                            color: textColor,
                            fontFamily,
                            fontSize: '15px',
                            lineHeight: '2',
                            textAlign: 'center' as const,
                            whiteSpace: 'pre-wrap' as const,
                            letterSpacing: '0.3px',
                            /* 手写微倾效果 */
                            transform: 'rotate(0.5deg)',
                            minHeight: '36px',
                            display: 'flex',
                            flexDirection: 'column' as const,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {body?.trim()}
                    </div>

                    {/* footer */}
                    {footer && (
                        <div
                            style={{
                                marginTop: '8px',
                                fontSize: '10px',
                                color: accent,
                                fontFamily: "'Georgia', 'Noto Serif SC', serif",
                                letterSpacing: '0.15em',
                                textAlign: 'center' as const,
                                opacity: 0.55,
                                transform: 'rotate(0.5deg)',
                            }}
                        >
                            {footer}
                        </div>
                    )}
                </div>

                {/* ---- 右下角微翘效果 ---- */}
                <div
                    style={{
                        position: 'absolute' as const,
                        bottom: 0,
                        right: 0,
                        width: '50px',
                        height: '50px',
                        background:
                            'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.015) 50%, rgba(0,0,0,0.035) 100%)',
                        pointerEvents: 'none' as const,
                        zIndex: 3,
                    }}
                />

                {/* ---- 左上角微微泛黄的"老化"角 ---- */}
                <div
                    style={{
                        position: 'absolute' as const,
                        top: 0,
                        left: 0,
                        width: '80px',
                        height: '80px',
                        background:
                            'radial-gradient(circle at 0% 0%, rgba(245,230,200,0.12) 0%, transparent 70%)',
                        pointerEvents: 'none' as const,
                        zIndex: 3,
                    }}
                />
            </div>
        </div>
    );
};

export default PolaroidSkeleton;
