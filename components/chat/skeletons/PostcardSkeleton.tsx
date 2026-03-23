/**
 * PostcardSkeleton — 明信片骨架
 *
 * 复古明信片风格：纸质纹理 + 邮戳装饰 + 微倾斜 + 厚卡纸投影
 * 参照 skeleton_card_spec.md #1 设计
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
const PAPER_TEXTURE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

const PostcardSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, style } = data;

    const bgGrad = style.bgGradient
        ? `linear-gradient(135deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : 'linear-gradient(135deg, #dcd0c0, #c2b280)';
    const textColor = style.textColor || '#2A2520';
    const accent = style.accent || '#8C8273';
    const fontFamily = FONT_MAP[style.fontStyle || 'handwrite'];

    /* 邮戳圆环 SVG */
    const postmarkSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Ccircle cx='36' cy='36' r='30' fill='none' stroke='${encodeURIComponent(accent)}' stroke-width='2' stroke-dasharray='4 3' opacity='0.45'/%3E%3Ccircle cx='36' cy='36' r='22' fill='none' stroke='${encodeURIComponent(accent)}' stroke-width='1' opacity='0.3'/%3E%3Cline x1='8' y1='36' x2='64' y2='36' stroke='${encodeURIComponent(accent)}' stroke-width='1' opacity='0.25'/%3E%3Cline x1='8' y1='30' x2='64' y2='30' stroke='${encodeURIComponent(accent)}' stroke-width='0.7' opacity='0.18'/%3E%3Cline x1='8' y1='42' x2='64' y2='42' stroke='${encodeURIComponent(accent)}' stroke-width='0.7' opacity='0.18'/%3E%3C/svg%3E")`;

    return (
        <div
            style={{
                width: '330px',
                maxWidth: 'calc(100vw - 48px)',
                background: '#F9F8F4',
                borderRadius: '3px',
                boxShadow:
                    '0 2px 4px rgba(0,0,0,0.08), ' +          /* 近影 */
                    '0 8px 16px rgba(0,0,0,0.10), ' +         /* 中影 */
                    '0 24px 48px -8px rgba(0,0,0,0.22), ' +    /* 远影 — 厚卡纸 */
                    '0 40px 64px -16px rgba(0,0,0,0.18), ' +   /* 落地影 */
                    'inset 0 0 0 1px rgba(255,255,255,0.65)',   /* 纸张高光边 */
                transform: 'rotate(-1.5deg)',
                padding: '14px',
                paddingBottom: '22px',
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

            {/* ---- 图片区域 (渐变色块, 4:3) ---- */}
            <div
                style={{
                    position: 'relative' as const,
                    width: '100%',
                    aspectRatio: '4 / 3',
                    background: bgGrad,
                    borderRadius: '1px',
                    boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    zIndex: 2,
                }}
            >
                {/* 邮戳装饰 */}
                <div
                    style={{
                        position: 'absolute' as const,
                        top: '12px',
                        right: '12px',
                        width: '72px',
                        height: '72px',
                        backgroundImage: postmarkSvg,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        transform: 'rotate(12deg)',
                        opacity: 0.7,
                    }}
                />

                {/* icon 居中于图片区 */}
                {icon && (
                    <div
                        style={{
                            position: 'absolute' as const,
                            bottom: '16px',
                            left: '16px',
                            fontSize: '28px',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
                        }}
                    >
                        {icon}
                    </div>
                )}

                {/* 微妙的胶片颗粒叠加 */}
                <div
                    style={{
                        position: 'absolute' as const,
                        inset: 0,
                        background:
                            'radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%), ' +
                            'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)',
                        pointerEvents: 'none' as const,
                    }}
                />
            </div>

            {/* ---- INNER VOICE 标题 ---- */}
            <div
                style={{
                    width: '100%',
                    marginTop: '22px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    zIndex: 2,
                    position: 'relative' as const,
                }}
            >
                {/* 左装饰线 */}
                <div
                    style={{
                        flex: 1,
                        maxWidth: '50px',
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${accent}55)`,
                    }}
                />
                <div
                    style={{
                        fontSize: '9px',
                        letterSpacing: '0.45em',
                        color: accent,
                        textTransform: 'uppercase' as const,
                        fontFamily: "'Georgia', 'Noto Serif SC', serif",
                        fontWeight: 400,
                        opacity: 0.85,
                    }}
                >
                    Inner Voice
                </div>
                {/* 右装饰线 */}
                <div
                    style={{
                        flex: 1,
                        maxWidth: '50px',
                        height: '1px',
                        background: `linear-gradient(90deg, ${accent}55, transparent)`,
                    }}
                />
            </div>

            {/* ---- 正文 ---- */}
            <div
                style={{
                    color: textColor,
                    fontSize: '15px',
                    lineHeight: '2.15',
                    fontFamily,
                    letterSpacing: '0.5px',
                    textAlign: 'center' as const,
                    whiteSpace: 'pre-wrap' as const,
                    minHeight: '48px',
                    display: 'flex',
                    flexDirection: 'column' as const,
                    justifyContent: 'center',
                    padding: '0 14px',
                    zIndex: 2,
                    position: 'relative' as const,
                }}
            >
                {body?.trim()}
            </div>

            {/* ---- 底部 — Vol.XX / Date ---- */}
            {footer && (
                <div
                    style={{
                        width: '100%',
                        marginTop: '20px',
                        paddingTop: '14px',
                        borderTop: `1px solid ${accent}28`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        zIndex: 2,
                        position: 'relative' as const,
                    }}
                >
                    <span
                        style={{
                            fontSize: '8px',
                            color: accent,
                            fontFamily: "'Georgia', serif",
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase' as const,
                            opacity: 0.65,
                        }}
                    >
                        {title || 'Vol.∞'}
                    </span>
                    <span
                        style={{
                            fontSize: '8px',
                            color: accent,
                            fontFamily: "'Georgia', serif",
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase' as const,
                            opacity: 0.65,
                        }}
                    >
                        {footer}
                    </span>
                </div>
            )}

            {/* ---- 右下角：模拟厚卡纸微翘 ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    bottom: 0,
                    right: 0,
                    width: '40px',
                    height: '40px',
                    background:
                        'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.04) 100%)',
                    pointerEvents: 'none' as const,
                    zIndex: 3,
                }}
            />
        </div>
    );
};

export default PostcardSkeleton;
