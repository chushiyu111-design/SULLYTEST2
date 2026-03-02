/**
 * Zhaixinglou — 分享工具函数
 *
 * 核心能力：
 * 1. splitParagraphs: 将 AI 回复按自然段落拆分
 * 2. exportShareCard: DOM → 高清 PNG（含 Tailwind v4 oklch/oklab 兼容处理）
 * 3. shareOrDownload: 系统分享 → fallback 下载
 *
 * ⚠️ html2canvas v1.4.1 不支持 oklch() / oklab() 色彩函数。
 * Tailwind CSS v4 在 <style> 标签中大量使用这两种函数。
 * 解决方案：在 onclone 阶段对克隆文档的所有 <style> 内容做正则替换。
 */
import html2canvas from 'html2canvas';

// ─── 段落拆分 ───

export function splitParagraphs(content: string): string[] {
    if (!content) return [];
    return content
        .split(/\n{2,}/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
}

// ─── Tailwind v4 色彩兼容清洗 ───

/**
 * 在克隆的 DOM 中替换所有 oklch() / oklab() / color-mix() 等
 * html2canvas 不支持的现代 CSS 色彩函数为安全的回退值。
 */
function sanitizeModernColors(clonedDoc: Document) {
    // 每次调用都新建正则实例，避免 g 标志共享 lastIndex 导致的跳过匹配 bug
    const makeFnRegex = () =>
        /(?:oklch|oklab|color-mix|lch|lab|color)\([^()]*(?:\([^()]*\)[^()]*)*\)/g;

    clonedDoc.querySelectorAll('style').forEach(styleEl => {
        if (styleEl.textContent) {
            styleEl.textContent = styleEl.textContent.replace(makeFnRegex(), 'transparent');
        }
    });

    clonedDoc.querySelectorAll('[style]').forEach(el => {
        const styleAttr = el.getAttribute('style');
        if (styleAttr) {
            el.setAttribute('style', styleAttr.replace(makeFnRegex(), 'transparent'));
        }
    });
}

// ─── 分享卡片导出 ───

export async function exportShareCard(cardElement: HTMLElement): Promise<Blob> {
    await document.fonts.ready;
    // 等一帧让布局稳定（getBoundingClientRect 准确）
    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 100)));

    const elW = cardElement.scrollWidth;
    const elH = cardElement.scrollHeight;
    const rect = cardElement.getBoundingClientRect();

    const canvas = await html2canvas(cardElement, {
        useCORS: true,
        scale: Math.max(window.devicePixelRatio || 3, 3),
        logging: false,
        backgroundColor: null,
        width: elW,
        height: elH,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: Math.max(elH + Math.abs(rect.top) + 200, document.documentElement.scrollHeight),
        onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
            sanitizeModernColors(clonedDoc);
            clonedEl.style.boxShadow = 'none';
            clonedEl.style.border = 'none';
        },
    });

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            blob => blob ? resolve(blob) : reject(new Error('Canvas toBlob 失败')),
            'image/png',
        );
    });
}

// ─── 分享 / 下载 ───

/**
 * 保存或分享已生成的图片 Blob。
 *
 * ⚠️ 调用者必须确保在用户手势（click）处理期间**立即**调用此函数，
 * 不要在调用前做任何 await（html2canvas 等慢操作）。
 * 否则 navigator.share() 会因 User Activation 超时被浏览器拒绝。
 *
 * 优先级：navigator.share → window.open → <a download>
 */
export async function shareOrDownload(blob: Blob, filename: string): Promise<void> {
    // 1. navigator.share — 最佳体验
    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
        try {
            const file = new File([blob], filename, { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file] });
                return;
            }
        } catch (err: any) {
            // AbortError = 用户主动取消，直接返回
            if (err?.name === 'AbortError') return;
            // NotAllowedError / 其他 = activation 过期等，走 fallback
        }
    }

    // 2. window.open — 移动端可长按保存（已验证有效）
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (w) {
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        return;
    }

    // 3. <a download> — 最终兜底（桌面端有效）
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
}
