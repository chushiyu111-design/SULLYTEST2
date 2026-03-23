/**
 * ReceiptSkeleton — 收据/小票骨架
 *
 * 热敏纸打印小票风格：等宽字体 + 锯齿边缘 + 虚线分隔 + 条形码装饰
 * 参照 skeleton_card_spec.md #4 设计
 */
import React from 'react';
import { StatusCardData } from '../../../types/statusCard';

const FONT_MAP: Record<string, string> = {
    serif: "'Noto Serif SC', 'Kaiti SC', STKaiti, serif",
    sans: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    handwrite: "'ShouXie6', 'HuangHunShouXie', 'Kaiti SC', STKaiti, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

/* ── 热敏纸纹理 SVG (subtle grain) ── */
const THERMAL_TEXTURE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23t)' opacity='0.035'/%3E%3C/svg%3E")`;

/* ── 锯齿边缘 (zigzag) 生成器 ── */
const zigzagStyle = (position: 'top' | 'bottom', paperColor: string): React.CSSProperties => {
    const size = 10; // triangle size in px
    if (position === 'top') {
        return {
            position: 'absolute' as const,
            top: `-${size}px`,
            left: 0,
            right: 0,
            height: `${size}px`,
            backgroundImage:
                `linear-gradient(135deg, ${paperColor} 33.33%, transparent 33.33%), ` +
                `linear-gradient(225deg, ${paperColor} 33.33%, transparent 33.33%)`,
            backgroundSize: `${size * 1.4}px ${size}px`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'top left',
        };
    }
    return {
        position: 'absolute' as const,
        bottom: `-${size}px`,
        left: 0,
        right: 0,
        height: `${size}px`,
        backgroundImage:
            `linear-gradient(315deg, ${paperColor} 33.33%, transparent 33.33%), ` +
            `linear-gradient(45deg, ${paperColor} 33.33%, transparent 33.33%)`,
        backgroundSize: `${size * 1.4}px ${size}px`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom left',
    };
};

/* ── 虚线分隔符 ── */
const DashedDivider: React.FC<{ color: string; spacing?: string }> = ({ color, spacing = '10px 0' }) => (
    <div style={{
        margin: spacing,
        height: '1px',
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px)`,
        backgroundSize: '8px 1px',
        backgroundRepeat: 'repeat-x',
    }} />
);

/* ── CSS 条形码装饰 ── */
const Barcode: React.FC<{ color: string }> = ({ color }) => {
    // 生成随机宽度的条形码线条 — 用固定种子模拟
    const bars = [2,1,1,3,1,2,1,1,3,1,1,2,3,1,1,2,1,3,1,1,2,1,1,3,1,2,1,1,2,3,1,1,2,1,3,1,1,2,1,1];
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '0.5px',
            marginTop: '14px',
            padding: '0 20px',
            opacity: 0.35,
        }}>
            {bars.map((w, i) => (
                <div key={i} style={{
                    width: `${w}px`,
                    height: `${16 + (i % 5 === 0 ? 4 : 0)}px`,
                    background: color,
                    borderRadius: '0.5px',
                }} />
            ))}
        </div>
    );
};

const ReceiptSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, meta, style } = data;

    /* ── 颜色 & 字体 ── */
    const paperColor = '#FEFDF5';
    const textColor = style.textColor || '#3A3530';
    const accent = style.accent || '#888';
    const fontFamily = FONT_MAP['mono']; // 小票始终等宽

    /* ── 热敏纸微黄渐变（模拟纸张老化不均匀） ── */
    const paperBg = style.bgGradient
        ? `linear-gradient(180deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : `linear-gradient(180deg, #FEFDF5 0%, #FBF8EE 40%, #F8F4E8 100%)`;

    return (
        <div style={{
            width: '260px',
            maxWidth: 'calc(100vw - 48px)',
            background: paperBg,
            color: textColor,
            fontFamily,
            padding: '22px 18px 18px',
            position: 'relative' as const,
            boxShadow:
                '0 1px 3px rgba(0,0,0,0.06), ' +       /* 近影 — 纸张贴近 */
                '0 6px 16px rgba(0,0,0,0.08), ' +       /* 中影 */
                '0 20px 40px -10px rgba(0,0,0,0.18), ' + /* 远影 — 长条纸悬浮感 */
                'inset 0 0 0 0.5px rgba(0,0,0,0.04)',    /* 纸边 */
            /* 小票略微倾斜，模拟随手放在桌上 */
            transform: 'rotate(0.8deg)',
        }}>
            {/* ── 热敏纸纹理叠加 ── */}
            <div style={{
                position: 'absolute' as const,
                inset: 0,
                backgroundImage: THERMAL_TEXTURE_SVG,
                backgroundRepeat: 'repeat',
                pointerEvents: 'none' as const,
                zIndex: 1,
                mixBlendMode: 'multiply' as const,
            }} />

            {/* ── 模拟热敏纸边缘轻微泛黄/褪色 ── */}
            <div style={{
                position: 'absolute' as const,
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 60%, rgba(200,180,140,0.06) 100%)',
                pointerEvents: 'none' as const,
                zIndex: 1,
            }} />

            {/* ═══════════  锯齿顶部  ═══════════ */}
            <div style={zigzagStyle('top', paperColor)} />

            {/* ═══════════  店铺标题 / 小票抬头  ═══════════ */}
            <div style={{
                textAlign: 'center' as const,
                position: 'relative' as const,
                zIndex: 2,
            }}>
                {/* 星号装饰 + 标题 */}
                <div style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                }}>
                    <span style={{ opacity: 0.5, fontSize: '11px' }}>★</span>
                    <span>{title || '收据'}</span>
                    <span style={{ opacity: 0.5, fontSize: '11px' }}>★</span>
                </div>

                {/* 副标题装饰行 */}
                <div style={{
                    fontSize: '8px',
                    letterSpacing: '3px',
                    opacity: 0.4,
                    textTransform: 'uppercase' as const,
                    marginBottom: '2px',
                }}>
                    {icon ? `${icon} INNER VOICE` : 'INNER VOICE'}
                </div>
            </div>

            {/* ── 虚线分隔 ── */}
            <DashedDivider color={`${textColor}40`} spacing="12px 0" />

            {/* ═══════════  正文内容区  ═══════════ */}
            <div style={{
                position: 'relative' as const,
                zIndex: 2,
                fontSize: '12px',
                lineHeight: '2.1',
                whiteSpace: 'pre-wrap' as const,
                letterSpacing: '0.5px',
                padding: '2px 0',
            }}>
                {body}
            </div>

            {/* ═══════════  明细列表（如果 meta.items 存在）═══════════ */}
            {meta?.items && Array.isArray(meta.items) && meta.items.length > 0 && (
                <div style={{ position: 'relative' as const, zIndex: 2 }}>
                    <DashedDivider color={`${textColor}30`} spacing="8px 0" />

                    {/* 明细表头 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '9px',
                        fontWeight: 700,
                        opacity: 0.45,
                        letterSpacing: '1px',
                        marginBottom: '4px',
                        textTransform: 'uppercase' as const,
                    }}>
                        <span>ITEM</span>
                        <span>PRICE</span>
                    </div>

                    {/* 明细行 */}
                    {meta.items.map((item: { name: string; price: string }, i: number) => (
                        <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            fontSize: '11px',
                            lineHeight: '2.0',
                            gap: '8px',
                        }}>
                            <span style={{
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap' as const,
                            }}>{item.name}</span>
                            {/* 点线连接 */}
                            <span style={{
                                flex: 1,
                                borderBottom: `1px dotted ${textColor}25`,
                                height: '1px',
                                minWidth: '20px',
                            }} />
                            <span style={{
                                fontWeight: 600,
                                whiteSpace: 'nowrap' as const,
                            }}>{item.price}</span>
                        </div>
                    ))}

                    {/* 合计行 */}
                    {meta.total && (
                        <>
                            <DashedDivider color={`${textColor}35`} spacing="6px 0" />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                fontSize: '13px',
                                fontWeight: 700,
                            }}>
                                <span>合计 TOTAL</span>
                                <span>{meta.total}</span>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ── 底部虚线分隔 ── */}
            <DashedDivider color={`${textColor}35`} spacing="12px 0 8px" />

            {/* ═══════════  Footer（日期 / 签名）═══════════ */}
            {footer && (
                <div style={{
                    textAlign: 'center' as const,
                    fontSize: '10px',
                    opacity: 0.5,
                    letterSpacing: '1px',
                    position: 'relative' as const,
                    zIndex: 2,
                    marginBottom: '4px',
                }}>
                    {footer}
                </div>
            )}

            {/* ═══════════  Thank you 装饰文字  ═══════════ */}
            <div style={{
                textAlign: 'center' as const,
                fontSize: '8px',
                letterSpacing: '4px',
                opacity: 0.3,
                textTransform: 'uppercase' as const,
                position: 'relative' as const,
                zIndex: 2,
                marginTop: '4px',
            }}>
                THANK YOU
            </div>

            {/* ═══════════  条形码装饰  ═══════════ */}
            <div style={{ position: 'relative' as const, zIndex: 2 }}>
                <Barcode color={textColor} />
                {/* 条形码下方数字 */}
                <div style={{
                    textAlign: 'center' as const,
                    fontSize: '7px',
                    letterSpacing: '3px',
                    opacity: 0.25,
                    marginTop: '3px',
                }}>
                    4 902430 581039
                </div>
            </div>

            {/* ═══════════  锯齿底部  ═══════════ */}
            <div style={zigzagStyle('bottom', paperColor)} />

            {/* ── 右下角纸卷翘起效果 ── */}
            <div style={{
                position: 'absolute' as const,
                bottom: 0,
                right: 0,
                width: '30px',
                height: '30px',
                background:
                    'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.015) 50%, rgba(0,0,0,0.035) 100%)',
                pointerEvents: 'none' as const,
                zIndex: 3,
            }} />

            {/* ── 左边缘热敏打印机压痕 ── */}
            <div style={{
                position: 'absolute' as const,
                top: '15%',
                bottom: '15%',
                left: '2px',
                width: '1px',
                background: `linear-gradient(180deg, transparent, ${textColor}08, ${textColor}05, transparent)`,
                pointerEvents: 'none' as const,
                zIndex: 3,
            }} />
        </div>
    );
};

export default ReceiptSkeleton;
