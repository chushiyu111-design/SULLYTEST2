/**
 * MusicPlayerSkeleton — 音乐播放器骨架
 *
 * 类 Spotify/Apple Music 播放界面：深色渐变 + 专辑封面色块 + 进度条 + 控制按钮
 * 参照 skeleton_card_spec.md #6 设计
 */
import React from 'react';
import { StatusCardData } from '../../../types/statusCard';

const FONT_MAP: Record<string, string> = {
    serif: "'Noto Serif SC', 'Kaiti SC', STKaiti, serif",
    sans: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
    handwrite: "'ShouXie6', 'HuangHunShouXie', 'Kaiti SC', STKaiti, serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

const MusicPlayerSkeleton: React.FC<{ data: StatusCardData }> = ({ data }) => {
    const { title, body, footer, icon, meta, style } = data;

    const bgStyle = style.bgGradient
        ? `linear-gradient(160deg, ${style.bgGradient[0]}, ${style.bgGradient[1]})`
        : 'linear-gradient(160deg, #1a1a2e, #16213e)';
    const textColor = style.textColor || '#e8e1d7';
    const accent = style.accent || '#1DB954';
    const fontFamily = FONT_MAP[style.fontStyle || 'sans'];

    /* meta 字段 */
    const artist = meta?.artist || body || '';
    const progress = Math.min(100, Math.max(0, meta?.progress ?? 38));
    const duration = meta?.duration || '3:42';

    /* 进度条时间计算 */
    const durationParts = duration.split(':');
    const totalSec = (parseInt(durationParts[0] || '3') * 60) + parseInt(durationParts[1] || '42');
    const currentSec = Math.round(totalSec * progress / 100);
    const currentTime = `${Math.floor(currentSec / 60)}:${String(currentSec % 60).padStart(2, '0')}`;

    /* 从 accent 提取半透明色 */
    const accentDim = accent + '40';
    const accentGlow = accent + '60';

    return (
        <div
            style={{
                width: '330px',
                maxWidth: 'calc(100vw - 48px)',
                background: bgStyle,
                color: textColor,
                fontFamily,
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative' as const,
                boxShadow:
                    '0 4px 12px rgba(0,0,0,0.25), ' +
                    '0 20px 48px -8px rgba(0,0,0,0.45), ' +
                    'inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
        >
            {/* ---- 毛玻璃光泽叠加层 ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    inset: 0,
                    background:
                        'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), ' +
                        'radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 50%)',
                    pointerEvents: 'none' as const,
                    zIndex: 1,
                }}
            />

            {/* ---- 顶部间距 + 专辑封面区域 ---- */}
            <div
                style={{
                    padding: '28px 28px 0 28px',
                    position: 'relative' as const,
                    zIndex: 2,
                }}
            >
                {/* 专辑封面 (渐变色块 + icon) */}
                <div
                    style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        borderRadius: '12px',
                        background: style.bgGradient
                            ? `linear-gradient(135deg, ${style.bgGradient[1]}, ${accent}88, ${style.bgGradient[0]})`
                            : `linear-gradient(135deg, #16213e, ${accent}66, #0f3460)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative' as const,
                        overflow: 'hidden',
                        boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)`,
                    }}
                >
                    {/* 专辑封面装饰 — 模拟唱片纹路 */}
                    <div
                        style={{
                            position: 'absolute' as const,
                            inset: 0,
                            background: `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.08) 31%, transparent 32%, transparent 45%, rgba(0,0,0,0.05) 46%, transparent 47%, transparent 60%, rgba(0,0,0,0.04) 61%, transparent 62%)`,
                            pointerEvents: 'none' as const,
                        }}
                    />
                    {/* 高光反射 */}
                    <div
                        style={{
                            position: 'absolute' as const,
                            top: '-30%',
                            left: '-20%',
                            width: '80%',
                            height: '80%',
                            borderRadius: '50%',
                            background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)',
                            pointerEvents: 'none' as const,
                        }}
                    />
                    {/* icon 居中显示 */}
                    {icon && (
                        <span
                            style={{
                                fontSize: '56px',
                                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                                zIndex: 1,
                            }}
                        >
                            {icon}
                        </span>
                    )}
                </div>
            </div>

            {/* ---- 歌曲信息 ---- */}
            <div
                style={{
                    padding: '20px 28px 0 28px',
                    position: 'relative' as const,
                    zIndex: 2,
                }}
            >
                {/* 歌曲名 */}
                <div
                    style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        letterSpacing: '0.2px',
                        lineHeight: 1.3,
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap' as const,
                    }}
                >
                    {title || '未知曲目'}
                </div>

                {/* 歌手名/歌词 */}
                <div
                    style={{
                        fontSize: '13px',
                        opacity: 0.6,
                        letterSpacing: '0.3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap' as const,
                    }}
                >
                    {artist}
                </div>
            </div>

            {/* ---- 进度条 ---- */}
            <div
                style={{
                    padding: '20px 28px 0 28px',
                    position: 'relative' as const,
                    zIndex: 2,
                }}
            >
                {/* 进度条轨道 */}
                <div
                    style={{
                        width: '100%',
                        height: '4px',
                        borderRadius: '2px',
                        background: 'rgba(255,255,255,0.12)',
                        position: 'relative' as const,
                        overflow: 'visible',
                    }}
                >
                    {/* 已播放进度 */}
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            borderRadius: '2px',
                            background: accent,
                            position: 'relative' as const,
                            boxShadow: `0 0 8px ${accentGlow}`,
                        }}
                    >
                        {/* 进度圆点 */}
                        <div
                            style={{
                                position: 'absolute' as const,
                                right: '-5px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#fff',
                                boxShadow: `0 0 6px ${accentDim}, 0 1px 3px rgba(0,0,0,0.3)`,
                            }}
                        />
                    </div>
                </div>

                {/* 时间标签 */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '8px',
                        fontSize: '11px',
                        opacity: 0.45,
                        fontVariantNumeric: 'tabular-nums',
                        fontFamily: "'Inter', 'SF Mono', system-ui, sans-serif",
                    }}
                >
                    <span>{currentTime}</span>
                    <span>{duration}</span>
                </div>
            </div>

            {/* ---- 控制按钮（纯装饰） ---- */}
            <div
                style={{
                    padding: '16px 28px 8px 28px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '32px',
                    position: 'relative' as const,
                    zIndex: 2,
                }}
            >
                {/* ⏮ 上一曲 */}
                <div
                    style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.5,
                        cursor: 'default',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" fill={textColor} />
                    </svg>
                </div>

                {/* ▶ 播放 / 暂停 */}
                <div
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                        cursor: 'default',
                    }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7L8 5z" fill="#1a1a2e" />
                    </svg>
                </div>

                {/* ⏭ 下一曲 */}
                <div
                    style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.5,
                        cursor: 'default',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z" fill={textColor} />
                    </svg>
                </div>
            </div>

            {/* ---- Footer ---- */}
            {footer && (
                <div
                    style={{
                        padding: '4px 28px 22px 28px',
                        textAlign: 'center' as const,
                        fontSize: '10px',
                        opacity: 0.35,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase' as const,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        position: 'relative' as const,
                        zIndex: 2,
                    }}
                >
                    {footer}
                </div>
            )}

            {/* ---- 如果没有 footer 的底部间距 ---- */}
            {!footer && (
                <div style={{ height: '22px' }} />
            )}

            {/* ---- 底部环境光映射（模拟封面色投射到底部） ---- */}
            <div
                style={{
                    position: 'absolute' as const,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: `linear-gradient(to top, ${accent}10, transparent)`,
                    pointerEvents: 'none' as const,
                    zIndex: 0,
                }}
            />
        </div>
    );
};

export default MusicPlayerSkeleton;
