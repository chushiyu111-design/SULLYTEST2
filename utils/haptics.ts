
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

// ── Global Toggle (read by all haptic functions) ────────────────────────────
// This is set from OSContext and persisted in IndexedDB.
let _hapticsEnabled = true;

export const setHapticsEnabled = (v: boolean) => { _hapticsEnabled = v; };
export const getHapticsEnabled = () => _hapticsEnabled;

const isNative = Capacitor.isNativePlatform();

// ── Core vibration wrapper ──────────────────────────────────────────────────
const vibrate = (style: ImpactStyle, fallbackMs: number) => {
    if (!_hapticsEnabled) return;
    try {
        if (isNative) { Haptics.impact({ style }); }
        else if (navigator.vibrate) { navigator.vibrate(fallbackMs); }
    } catch { /* silent */ }
};

const notify = (type: NotificationType, fallbackMs: number) => {
    if (!_hapticsEnabled) return;
    try {
        if (isNative) { Haptics.notification({ type }); }
        else if (navigator.vibrate) { navigator.vibrate(fallbackMs); }
    } catch { /* silent */ }
};

// ── Semantic API ────────────────────────────────────────────────────────────
export const haptic = {
    light: () => vibrate(ImpactStyle.Light, 10),
    medium: () => vibrate(ImpactStyle.Medium, 20),
    heavy: () => vibrate(ImpactStyle.Heavy, 30),
    success: () => notify(NotificationType.Success, 15),
    warning: () => notify(NotificationType.Warning, 25),
    error: () => notify(NotificationType.Error, 30),
    selection: () => vibrate(ImpactStyle.Light, 8),
};

// ── WeChat Notification Sound ───────────────────────────────────────────────
// Preloaded audio object, reused on every call.
let _wechatSound: HTMLAudioElement | null = null;

const getWechatSound = (): HTMLAudioElement => {
    if (!_wechatSound) {
        _wechatSound = new Audio('https://image2url.com/r2/default/audio/1771769870930-c9be8c96-c34e-4509-bc81-48619ad5406d.wav');
        _wechatSound.volume = 0.6;
        _wechatSound.preload = 'auto';
    }
    return _wechatSound;
};

// Eagerly pre-load the sound file on module initialization
if (typeof window !== 'undefined') {
    getWechatSound();
}

/**
 * Play the WeChat notification sound.
 * Call this ONLY when the active chat theme is WeChat ('default').
 * The caller is responsible for the theme check.
 */
export const playWechatNotification = () => {
    try {
        const sound = getWechatSound();
        sound.currentTime = 0;
        sound.play().catch(() => { /* autoplay blocked or network error — silent */ });
    } catch { /* silent */ }
};
