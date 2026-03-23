import React from 'react';
import { StatusCardData } from '../../../types/statusCard';

const FONT_MAP: Record<string, string> = {
    serif: "'Noto Serif SC', 'Kaiti SC', STKaiti, serif",
    sans: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    handwrite: "'ShouXie6', 'HuangHunShouXie', 'Kaiti SC', STKaiti, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

/* ── appType presets ── */
const APP_PRESETS: Record<string, { navIcon: string; navTitle: string; bodyIcon: string }> = {
    weather:      { navIcon: '🌤️', navTitle: '天气',   bodyIcon: '🌡️' },
    delivery:     { navIcon: '🛵',  navTitle: '外卖',   bodyIcon: '📦' },
    notification: { navIcon: '🔔',  navTitle: '通知中心', bodyIcon: '💬' },
    generic:      { navIcon: '📱',  navTitle: '应用',   bodyIcon: '' },
};

/* ── Signal bars (pure CSS) ── */
const SignalBars: React.FC<{ count: number; color: string }> = ({ count, color }) => {
    const bars = [1, 2, 3, 4];
    return (
        <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: '1.5px', height: '10px' }}>
            {bars.map(i => (
                <span key={i} style={{
                    width: '3px',
                    height: `${i * 2.5}px`,
                    borderRadius: '0.5px',
                    background: i <= count ? color : `${color}33`,
                    transition: 'background 0.3s',
                }} />
            ))}
        </span>
    );
};

/* ── Battery icon (pure CSS) ── */
const BatteryIcon: React.FC<{ pct: number; color: string }> = ({ pct, color }) => {
    const fillColor = pct <= 20 ? '#FF3B30' : pct <= 50 ? '#FFCC00' : '#34C759';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '2px',
        }}>
            <span style={{
                position: 'relative', width: '22px', height: '10px',
                border: `1.5px solid ${color}`,
                borderRadius: '2.5px',
                display: 'inline-block',
            }}>
                {/* fill */}
                <span style={{
                    position: 'absolute', left: '1px', top: '1px', bottom: '1px',
                    width: `${Math.min(100, Math.max(0, pct)) * 0.18}px`,
                    background: fillColor,
                    borderRadius: '1px',
                }} />
            </span>
            {/* nub */}
            <span style={{
                width: '2px', height: '4px',
                background: color,
                borderRadius: '0 1px 1px 0',
                marginLeft: '-1px',
            }} />
        </span>
    );
};

/** PhoneScreenSkeleton — 手机截图骨架（精制版） */
const PhoneScreenSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, meta, style } = data;

    /* ── colours & fonts ── */
    const bg = style.bgGradient
        ? `linear-gradient(180deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : '#1c1c1e';
    const textColor = style.textColor || '#ffffff';
    const accent = style.accent || '#007AFF';
    const fontFamily = FONT_MAP[style.fontStyle || 'sans'];

    /* ── meta ── */
    const appType = (meta?.appType as string) || 'generic';
    const signal  = typeof meta?.signal  === 'number' ? meta.signal  : 3;
    const battery = typeof meta?.battery === 'number' ? meta.battery : 78;

    /* ── dynamic time ── */
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    /* ── app-type preset ── */
    const preset = APP_PRESETS[appType] || APP_PRESETS.generic;
    const navIcon  = icon || preset.navIcon;
    const navTitle = title || preset.navTitle;

    /* ── subtle indicator color (lighter version of textColor) ── */
    const barColor = `${textColor}cc`;

    return (
        <div style={{
            width: '330px',
            maxWidth: 'calc(100vw - 48px)',
            background: bg,
            color: textColor,
            fontFamily,
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow:
                '0 0 0 1px rgba(255,255,255,0.08), ' +
                '0 2px 4px rgba(0,0,0,0.15), ' +
                '0 16px 48px -8px rgba(0,0,0,0.55)',
            border: '3px solid rgba(128,128,128,0.25)',
            position: 'relative',
        }}>
            {/* ── Inner screen bezel ── */}
            <div style={{
                borderRadius: '29px',
                overflow: 'hidden',
            }}>

                {/* ═══════════  iOS Status Bar  ═══════════ */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 22px 4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: "'SF Pro Text', 'Inter', system-ui, sans-serif",
                    letterSpacing: '-0.2px',
                }}>
                    {/* Left — Time */}
                    <span style={{ minWidth: '40px' }}>{timeStr}</span>

                    {/* Center — Notch (subtle pill) */}
                    <span style={{
                        width: '80px',
                        height: '22px',
                        background: 'rgba(0,0,0,0.65)',
                        borderRadius: '20px',
                        display: 'inline-block',
                    }} />

                    {/* Right — Icons */}
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        minWidth: '40px',
                        justifyContent: 'flex-end',
                    }}>
                        <SignalBars count={signal} color={barColor} />
                        <span style={{ fontSize: '10px', opacity: 0.7, fontWeight: 400 }}>
                            {battery}%
                        </span>
                        <BatteryIcon pct={battery} color={barColor} />
                    </span>
                </div>

                {/* ═══════════  App Navigation Bar  ═══════════ */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px 12px',
                    background: `linear-gradient(180deg, ${accent}22, ${accent}08)`,
                    borderBottom: `0.5px solid ${accent}30`,
                }}>
                    {/* Back arrow */}
                    <span style={{
                        fontSize: '18px',
                        opacity: 0.55,
                        lineHeight: 1,
                        cursor: 'default',
                    }}>‹</span>
                    <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px' }}>{navIcon}</span>
                        <span style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            letterSpacing: '0.2px',
                        }}>{navTitle}</span>
                    </span>
                    {/* Right accessory */}
                    <span style={{ fontSize: '14px', opacity: 0.4 }}>⋯</span>
                </div>

                {/* ═══════════  Content Area  ═══════════ */}
                <div style={{
                    padding: '20px 20px 8px',
                    minHeight: '110px',
                    position: 'relative',
                }}>
                    {/* Optional body icon (large, centred above text for weather/delivery) */}
                    {appType !== 'generic' && preset.bodyIcon && (
                        <div style={{
                            textAlign: 'center',
                            fontSize: '36px',
                            marginBottom: '12px',
                            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                        }}>
                            {preset.bodyIcon}
                        </div>
                    )}

                    {/* Body text */}
                    <div style={{
                        fontSize: '14px',
                        lineHeight: '1.85',
                        whiteSpace: 'pre-wrap',
                        letterSpacing: '0.3px',
                    }}>
                        {body}
                    </div>

                    {/* Dashed divider */}
                    <div style={{
                        margin: '16px 0 8px',
                        borderTop: `1px dashed ${textColor}20`,
                    }} />

                    {/* Footer */}
                    {footer && (
                        <div style={{
                            fontSize: '11px',
                            opacity: 0.4,
                            textAlign: 'right',
                            paddingBottom: '4px',
                            fontStyle: 'italic',
                        }}>
                            {footer}
                        </div>
                    )}
                </div>

                {/* ═══════════  Home Indicator  ═══════════ */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: '10px',
                    paddingTop: '2px',
                }}>
                    <span style={{
                        width: '100px',
                        height: '4px',
                        background: `${textColor}30`,
                        borderRadius: '2px',
                    }} />
                </div>
            </div>
        </div>
    );
};

export default PhoneScreenSkeleton;
