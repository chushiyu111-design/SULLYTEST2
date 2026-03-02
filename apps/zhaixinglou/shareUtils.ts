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
 *
 * 策略：
 * 1. 遍历所有 <style> 标签 → 正则替换文本内容
 * 2. 遍历所有元素的 inline style → 正则替换
 * 3. 这样从源头上消除 html2canvas 的解析错误
 */
function sanitizeModernColors(clonedDoc: Document) {
    // 匹配 oklch(...), oklab(...), color-mix(...), lch(...), lab(...), 
    // color(...) 等 html2canvas 不支持的色彩函数
    // 注意：括号嵌套处理——匹配最外层括号对
    const COLOR_FN_REGEX = /(?:oklch|oklab|color-mix|lch|lab|color)\([^()]*(?:\([^()]*\)[^()]*)*\)/g;

    // 1. 替换所有 <style> 标签中的内容
    clonedDoc.querySelectorAll('style').forEach(styleEl => {
        if (styleEl.textContent && COLOR_FN_REGEX.test(styleEl.textContent)) {
            styleEl.textContent = styleEl.textContent.replace(COLOR_FN_REGEX, 'transparent');
        }
        // 重置 lastIndex（全局正则）
        COLOR_FN_REGEX.lastIndex = 0;
    });

    // 2. 替换所有元素的 inline style 属性
    clonedDoc.querySelectorAll('[style]').forEach(el => {
        const styleAttr = el.getAttribute('style');
        if (styleAttr && COLOR_FN_REGEX.test(styleAttr)) {
            el.setAttribute('style', styleAttr.replace(COLOR_FN_REGEX, 'transparent'));
        }
        COLOR_FN_REGEX.lastIndex = 0;
    });
}

// ─── 分享卡片导出 ───

export async function exportShareCard(cardElement: HTMLElement): Promise<Blob> {
    // 等待所有自定义字体就绪
    await document.fonts.ready;

    const elW = cardElement.scrollWidth;
    const elH = cardElement.scrollHeight;
    const rect = cardElement.getBoundingClientRect();

    const canvas = await html2canvas(cardElement, {
        useCORS: true,
        allowTaint: true,
        scale: Math.max(window.devicePixelRatio || 2, 2),
        logging: false,
        backgroundColor: null,
        // ⚠️ 关键修复：显式传入元素完整尺寸，防止 html2canvas 按视口高度分段截取
        // 分段截取时每段会重新绘制背景渐变，导致导出图出现"两截色"断层
        width: elW,
        height: elH,
        // 修正滚动偏移，确保从元素实际位置开始捕获
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        // 将虚拟窗口高度设为元素高度，确保单次完整捕获
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: Math.max(elH + Math.abs(rect.top) + 200, document.documentElement.scrollHeight),
        onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
            // 在 html2canvas 解析之前清洗掉所有不支持的色彩函数
            sanitizeModernColors(clonedDoc);
            // ⚠️ 消除边缘色差：移除 boxShadow 和 border
            // boxShadow 会在元素外部渲染光晕，与卡片背景色叠加后产生色差边框
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

export async function shareOrDownload(blob: Blob, filename: string): Promise<void> {
    // 1. 优先尝试系统原生分享
    try {
        if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
            const file = new File([blob], filename, { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file] });
                return;
            }
        }
    } catch {
        // 用户取消或 API 不可用
    }

    // 2. fallback：使用 Blob URL 触发下载
    const url = URL.createObjectURL(blob);
    try {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 1000);
    } catch {
        URL.revokeObjectURL(url);
        throw new Error('下载失败');
    }
}
