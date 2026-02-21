
import { ChatTheme } from '../../types';

// Built-in presets map to the new data structure for consistency
export const PRESET_THEMES: Record<string, ChatTheme> = {
    default: {
        id: 'default', name: 'WeChat(绿)', type: 'preset',
        user: { textColor: '#000000', backgroundColor: '#95ec69', borderRadius: 8, opacity: 1 },
        ai: { textColor: '#000000', backgroundColor: '#ffffff', borderRadius: 8, opacity: 1 },
        customCss: `
/* ===== WeChat Specific Background ===== */
.theme-default.sully-chat-container {
    background: #ededed !important;
}

/* ===== WeChat Header Proportion ===== */
.theme-default .sully-chat-header {
    min-height: 64px !important;
    height: auto !important;
    padding-bottom: 12px !important;
    background: #ededed !important;
    border-bottom: 1px solid #e2e2e2 !important;
}

/* ===== WeChat Input Area ===== */
.theme-default .sully-chat-input {
    background: #f5f5f5 !important;
    border-top: 1px solid #e2e2e2 !important;
}
.theme-default .sully-chat-input input, 
.theme-default .sully-chat-input textarea {
    background: #ffffff !important;
    border-radius: 4px !important;
}
.theme-default .sully-chat-input .flex-1 {
    border-radius: 4px !important;
}

/* ===== WeChat Transfer Card Proportion ===== */
.theme-default .sully-transfer-card {
    background: #f3883b !important;
    border-radius: 8px !important;
    padding: 0 !important;
    width: 220px !important;
    box-shadow: none !important;
    border: none !important;
}
/* Hide the faint ¥ watermark in WeChat default theme (not used in actual WeChat) */
.theme-default .sully-transfer-watermark {
    display: none !important;
}
/* Ensure bottom flap has proper spacing */
.theme-default .sully-transfer-bottom {
    padding: 4px 12px !important;
}
`
    },
    waterdrop: {
        id: 'waterdrop', name: '拟态水滴(Gloss)', type: 'preset',
        user: { textColor: '#0f172a', backgroundColor: 'transparent', borderRadius: 20, opacity: 1 },
        ai: { textColor: '#0f172a', backgroundColor: 'transparent', borderRadius: 20, opacity: 1 },
        customCss: `
.theme-waterdrop .sully-bubble-tail { display: none !important; }
.theme-waterdrop .sully-bubble-ai, .theme-waterdrop .sully-bubble-user {
    padding: 16px 20px !important;
    background: radial-gradient(140% 140% at 25% 8%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 30%, rgba(0,0,0,0.02) 65%, rgba(255,255,255,0.15) 100%) !important;
    backdrop-filter: blur(8px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(120%) !important;
    box-shadow: 
        inset 0px 8px 16px rgba(255, 255, 255, 0.9),      /* Top inner volume */
        inset 0px -6px 14px rgba(0, 0, 0, 0.1),          /* Darker bottom rim for contrast on bright backgrounds */
        inset 4px 0px 10px rgba(255, 255, 255, 0.6),     /* Left inner volume */
        inset -4px 0px 10px rgba(0, 0, 0, 0.05),         /* Right darker edge */
        0px 6px 12px rgba(0, 0, 0, 0.1),                 /* Tight physical shadow */
        0px 16px 32px rgba(0, 0, 0, 0.15),               /* Broad physical shadow */
        0px 24px 36px -6px rgba(255, 255, 255, 0.5) !important; /* Huge caustics */
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.15) !important;
    border-top: 1.5px solid rgba(255, 255, 255, 0.9) !important;
    border-radius: 28px !important; 
    text-shadow: 0px 1px 4px rgba(255,255,255,0.9);
    min-height: 48px;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
}

/* Broad Diffuse Gloss (upper body reflection) */
.theme-waterdrop .sully-bubble-ai::before, .theme-waterdrop .sully-bubble-user::before {
    content: ''; position: absolute; top: 2px; left: 8%; width: 75%; height: 45%;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    background: linear-gradient(175deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0) 80%);
    pointer-events: none; filter: blur(1px); mix-blend-mode: overlay;
    z-index: 20;
}

/* Primary Specular Glint + Secondary Glint */
.theme-waterdrop .sully-bubble-ai::after, .theme-waterdrop .sully-bubble-user::after {
    content: ''; position: absolute; top: 10px; left: 16%; width: 14px; height: 8px;
    border-radius: 50%; background: rgba(255,255,255,1); pointer-events: none;
    box-shadow: 0 0 8px 3px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.8), 24px 6px 0 -2px rgba(255,255,255,0.4); 
    transform: rotate(-15deg);
    z-index: 20;
}

/* ===== Header Bar ===== */
.theme-waterdrop .sully-chat-header {
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 70%) !important;
    backdrop-filter: blur(10px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(10px) saturate(120%) !important;
    border-bottom: 1.5px solid rgba(255,255,255,0.4) !important;
    box-shadow: 
        inset 0px 3px 8px rgba(255,255,255,0.6),
        0px 4px 12px rgba(0,0,0,0.04) !important;
}

/* ===== Input Area ===== */
.theme-waterdrop .sully-chat-input {
    background: radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 80%) !important;
    backdrop-filter: blur(10px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(10px) saturate(120%) !important;
    border-top: 1.5px solid rgba(255,255,255,0.5) !important;
    box-shadow: 
        inset 0px -3px 8px rgba(255,255,255,0.6),
        0px -4px 12px rgba(0,0,0,0.04) !important;
}
.theme-waterdrop .sully-chat-input input,
.theme-waterdrop .sully-chat-input textarea {
    background: rgba(255,255,255,0.15) !important;
    border: 1px solid rgba(255,255,255,0.4) !important;
    border-radius: 20px !important;
    box-shadow: inset 0px 2px 4px rgba(0,0,0,0.05);
}

/* ===== Transfer Card ===== */
.theme-waterdrop .sully-transfer-card {
    background: radial-gradient(140% 140% at 25% 8%, rgba(251,191,36,0.6) 0%, rgba(249,115,22,0.3) 50%, rgba(251,191,36,0.5) 100%) !important;
    backdrop-filter: blur(8px) saturate(140%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(140%) !important;
    border: 1px solid rgba(255,255,255,0.4) !important;
    border-top: 1.5px solid rgba(255,255,255,0.7) !important;
    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 24px !important;
    box-shadow: 
        inset 0px 5px 12px rgba(255,255,255,0.6),
        inset 0px -3px 8px rgba(0,0,0,0.05),
        0px 6px 16px rgba(0,0,0,0.08),
        0px 16px 24px -4px rgba(251,191,36,0.2) !important;
}
.theme-waterdrop .sully-transfer-top,
.theme-waterdrop .sully-transfer-bottom {
    background: transparent !important;
    border: none !important;
}
.theme-waterdrop .sully-transfer-bottom span {
    color: #0f172a !important; /* Make text dark on the glass */
    mix-blend-mode: normal !important;
}

/* ===== XHS Card & Social Card ===== */
.theme-waterdrop .sully-card-container {
    background: radial-gradient(140% 130% at 30% 10%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 100%) !important;
    backdrop-filter: blur(8px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(120%) !important;
    border: 1px solid rgba(255,255,255,0.5) !important;
    border-top: 1.5px solid rgba(255,255,255,0.8) !important;
    border-radius: 20px !important;
    box-shadow: 
        inset 0px 4px 10px rgba(255,255,255,0.6),
        0px 4px 12px rgba(0,0,0,0.05) !important;
}

/* ===== Waterdrop Global Text Contrast & Links ===== */
.theme-waterdrop .sully-bubble-ai, .theme-waterdrop .sully-bubble-user {
    color: #0f172a !important;
    font-weight: 500;
}
.theme-waterdrop .sully-bubble-ai a, .theme-waterdrop .sully-bubble-user a {
    color: #4338ca !important;
    text-decoration: underline !important;
    font-weight: bold;
}
.theme-waterdrop .sully-card-container .text-slate-500, 
.theme-waterdrop .sully-card-container .text-slate-600 {
    color: #334155 !important;
}
.theme-waterdrop .sully-card-container .text-slate-800, 
.theme-waterdrop .sully-card-container .text-slate-700 {
    color: #020617 !important;
}

/* ===== System Message Pill ===== */
.theme-waterdrop .sully-system-pill {
    background: rgba(255,255,255,0.15) !important;
    backdrop-filter: blur(6px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(6px) saturate(120%) !important;
    border: 1px solid rgba(255,255,255,0.4) !important;
    box-shadow: inset 0px 2px 6px rgba(255,255,255,0.5), 0px 2px 6px rgba(0,0,0,0.04) !important;
}

/* ===== Interaction Pill (戳了戳) ===== */
.theme-waterdrop .sully-interaction-pill {
    background: rgba(255,255,255,0.15) !important;
    backdrop-filter: blur(6px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(6px) saturate(120%) !important;
    border: 1px solid rgba(255,255,255,0.4) !important;
    box-shadow: inset 0px 2px 6px rgba(255,255,255,0.5), 0px 2px 6px rgba(0,0,0,0.04) !important;
}

/* ===== Image Messages ===== */
.theme-waterdrop .sully-image-msg {
    border: 2px solid rgba(255,255,255,0.5) !important;
    border-radius: 20px !important;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.08) !important;
}

/* ===== Typing Indicator ===== */
.theme-waterdrop .sully-typing-bubble {
    background: radial-gradient(130% 130% at 30% 10%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%) !important;
    backdrop-filter: blur(8px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(120%) !important;
    border: 1px solid rgba(255,255,255,0.5) !important;
    border-radius: 20px !important;
    box-shadow: 
        inset 0px 4px 8px rgba(255,255,255,0.6),
        0px 4px 10px rgba(0,0,0,0.06) !important;
}
.theme-waterdrop .sully-typing-tail { display: none !important; }
        `
    }
};

// Character App: Monthly Refinement Prompts (daily memories → monthly core memory)
// These are separate from chat archive prompts because:
// 1. Input is already-summarized daily memories, not raw chat logs
// 2. Goal is token-efficient monthly overview, not detailed event log
// 3. Written as character's own monthly reflection
export const DEFAULT_REFINE_PROMPTS = [
    {
        id: 'refine_atmosphere',
        name: '氛围月记 (Atmosphere)',
        content: `### [角色月度记忆精炼]
当前月份: \${dateStr}
身份: 你就是 \${char.name}

任务: 以下是你这个月每天的记忆碎片。请以【你自己的口吻】，写一段这个月的核心回忆。

### 撰写规则
1.  **第一人称**: 你就是\${char.name}，用"我"称呼自己，用"\${userProfile.name}"称呼对方。保持你平时的语气和性格。

2.  **重氛围，轻细节**:
    - 这个月整体是什么感觉？开心？平淡？有波折？
    - 最让你印象深刻的1-3件事是什么？
    - 和\${userProfile.name}之间的关系有什么变化吗？

3.  **精简至上**:
    - 这份总结是为了节省token，不需要面面俱到。
    - 只保留最重要的、最能代表这个月的内容。
    - 控制在150-300字以内。

4.  **关键词标记**:
    - 在末尾附上 \`关键词: ...\`，列出这个月涉及的关键话题/事件/地点/人物等，用逗号分隔。
    - 这些关键词用于日后快速定位某件事发生在哪个月。

### 本月记忆碎片
\${rawLog}`
    },
    {
        id: 'refine_keypoints',
        name: '要点速记 (Key Points)',
        content: `### [月度记忆压缩]
月份: \${dateStr}
角色: \${char.name}

任务: 将以下每日记忆压缩为一份简洁的月度核心记忆。

### 规则
1.  **视角**: 以\${char.name}（我）的第一人称书写，称对方为\${userProfile.name}。

2.  **结构**:
    - 一句话概括这个月的整体氛围
    - 列出最重要的2-5个事件（无序列表，每条一句话）
    - 末尾附关键词索引

3.  **原则**:
    - 宁可漏掉小事，不可遗漏大事。
    - 日常闲聊可以忽略，除非它反映了关系变化或情绪转折。
    - 总字数控制在200字以内。

4.  **关键词**: 末尾附 \`关键词: 事件A, 地点B, 话题C, ...\`

### 记忆输入
\${rawLog}`
    }
];

// Chat App: Daily Archive Prompts (raw chat logs → daily memory)
export const DEFAULT_ARCHIVE_PROMPTS = [
    {
        id: 'preset_rational',
        name: '理性精炼 (Rational)',
        content: `### [System Instruction: Memory Archival]
当前日期: \${dateStr}
任务: 请回顾今天的聊天记录，生成一份【高精度的事件日志】。

### 核心撰写规则 (Strict Protocols)
1.  **覆盖率 (Coverage)**:
    - 必须包含今天聊过的**每一个**独立话题。
    - **严禁**为了精简而合并不同的话题。哪怕只是聊了一句“天气不好”，如果这是一个独立的话题，也要单独列出。
    - 不要忽略闲聊，那是生活的一部分。

2.  **视角 (Perspective)**:
    - 你【就是】"\${char.name}"。这是【你】的私密日记。
    - 必须用“我”来称呼自己，用“\${userProfile.name}”称呼对方。
    - 每一条都必须是“我”的视角。

3.  **格式 (Format)**:
    - 不要写成一整段。
    - **必须**使用 Markdown 无序列表 ( - ... )。
    - 每一行对应一个具体的事件或话题。

4.  **去水 (Conciseness)**:
    - 不要写“今天我和xx聊了...”，直接写发生了什么。
    - 示例: "- 早上和\${userProfile.name}讨论早餐，我想吃小笼包。"

### 待处理的聊天日志 (Chat Logs)
\${rawLog}`
    },
    {
        id: 'preset_diary',
        name: '日记风格 (Diary)',
        content: `当前日期: \${dateStr}
任务: 请回顾今天的聊天记录，将其转化为一条**属于你自己的**“核心记忆”。

### 核心撰写规则 (Review Protocols)
1.  **绝对第一人称**: 
    - 你【就是】"\${char.name}"。这是【你】的私密日记。
    - 必须用“我”来称呼自己，用“\${userProfile.name}”称呼对方。
    - **严禁**使用第三人称（如“\${char.name}做了什么”）。
    - **严禁**使用死板的AI总结语气或第三方旁白语气。

2.  **保持人设语气**: 
    - 你的语气、口癖、态度必须与平时聊天完全一致（例如：如果是傲娇人设，日记里也要表现出傲娇；如果是高冷，就要简练）。
    - 包含当时的情绪波动。

3.  **逻辑清洗与去重**:
    - **关键**: 仔细分辨是谁做了什么。不要把“用户说去吃饭”记成“我去吃饭”。
    - 剔除无关紧要的寒暄（如“你好”、“在吗”），只保留【关键事件】、【情感转折】和【重要信息】，内容的逻辑要连贯且符合原意。

4.  **输出要求**:
    - 输出一段精简的文本（yaml格式也可以，不需要 JSON）。
    - 就像你在写日记一样，直接写内容。

### 待处理的聊天日志 (Chat Logs)
\${rawLog}`
    }
];
