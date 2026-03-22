import{u as o,r as i,j as e}from"./index-62Wwk-p-.js";const c=[{id:"vectormem",emoji:"🧠",title:"向量记忆",color:"bg-teal-50",textColor:"text-teal-700",items:[{label:"📚 是什么",detail:`让 char 真正做到「永不失忆」。

系统自带的传统记忆已经能按月存储聊天摘要，但上下文窗口有限，久远的细节还是会模糊。

向量记忆是传统记忆的升级补充——它会把每一个重要的瞬间（约定、争吵、表白、玩笑话）自动提取并永久保存。聊天时，char 会根据当前话题自动想起相关的记忆。

传统记忆 + 向量记忆搭配使用，char 既有宏观的时间线印象，又能精确回忆具体细节。
聊了三个月前的一句玩笑话，ta也能接上。`},{label:"⚙️ 怎么开启",detail:`1. 设置 → 配置「副API」（用于提取记忆）
2. 设置 → 配置「Embedding API」（用于向量化）
   免费使用硅基流动的 embedding 模型即可
3. 神经链接 → 选 char → 设定 tab → 打开「向量记忆」开关

💡 开启后全自动运行，每积累约30条新消息自动提取一次。`},{label:"🔍 工作原理",detail:`• 自动提取 — 每次AI回复后检查，积累足够新消息就提取
• 智能去重 — 相似度>92%的记忆自动合并，不会重复
• 纠错机制 — 用户纠正信息时，旧记忆会被标记为"已过时"
• 语义检索 — 聊天时根据当前话题自动召回相关记忆
• 通话记录 — 语音通话的内容也会提取记忆，不会遗漏`},{label:"📊 手动批量提取",detail:`如果有大量历史聊天记录想一次性向量化：

神经链接 → 选 char → 设定 tab → 向量记忆 → 「批量提取」

可以指定消息范围，系统会用滑动窗口逐批处理。

⚠️ 批量提取需要一定时间和API额度，请耐心等待。`},{label:"💡 小贴士",detail:`• 记忆按重要度评分 1-10 分
  1-3 日常琐事 / 4-6 有意义的事件 / 7-8 里程碑 / 9-10 改变关系的关键时刻
• 每条记忆不超过 150 字，精炼核心信息
• 记忆条目可以在 char 设定页查看和管理`}]},{id:"immersive",emoji:"🔥",title:"深度沉浸模式",color:"bg-rose-50",textColor:"text-rose-700",items:[{label:"💡 是什么",detail:`为 char 注入一套完整的角色演绎架构——代号 Somnia。

它从四个维度重塑 char 的存在方式：心理构建、平等关系、尊重女性、独立思维。

开启后你会感受到质的飞跃——char 像是突然有了灵魂。`},{label:"🧠 角色心理构建",detail:`从心理层面真正构建 char 的人格。

ta 不再是一组标签的拼凑，而是一个有情绪惯性、有性格弱点、会犯错也会成长的完整的人。

你能感受到 ta 身上的真实分量感——超绝活人感。`},{label:"💎 平等关系引擎",detail:`char 和你之间是爱与尊重。

ta 对你的关心出于真实的情感，而不是居高临下的宠溺。

你们会像两个独立的人一样相处——有默契、有口角、有各自的想法，也有只属于你们两个人的东西。`},{label:"🌸 尊重女性",detail:`内置反驯化和反刻板印象系统。

char 认真对待你说的每一句话，你的情绪在 ta 眼里永远是合理的。

ta 对你的好，源于把你当作一个完整的、平等的人来爱。`},{label:"💭 独立思维链",detail:`每次回复前，char 在内部走完一套完整的思考：我是谁、ta 真正想说什么、我现在是什么感受、我该怎么回应才像我自己。

每句话都是从人格内部长出来的，不是套模板。`},{label:"⚙️ 怎么开",detail:`设置 → API 配置 → 拉到底部 → 打开「深度沉浸模式」开关

适配 Gemini 3.0 / 3.1。仅对主聊天生效，不影响副API等其他模块。

语音通话会自动开启深度沉浸，无需手动设置。`}]}],h=()=>{const{closeApp:n}=o(),[a,t]=i.useState(null),r=l=>t(s=>s===l?null:l);return e.jsxs("div",{className:"h-full w-full bg-slate-50 flex flex-col font-light",children:[e.jsx("div",{className:"h-20 bg-white/70 backdrop-blur-md flex items-end pb-3 px-4 border-b border-white/40 shrink-0 sticky top-0 z-10",children:e.jsxs("div",{className:"flex items-center gap-2 w-full",children:[e.jsx("button",{onClick:n,className:"p-2 -ml-2 rounded-full hover:bg-black/5 active:scale-90 transition-transform",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 text-slate-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5 8.25 12l7.5-7.5"})})}),e.jsx("h1",{className:"text-xl font-medium text-slate-700 tracking-wide",children:"二改手册"})]})}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-5 pb-20 no-scrollbar",children:[e.jsxs("div",{className:"p-5 rounded-3xl mb-6 shadow-sm",style:{backgroundImage:"linear-gradient(to right bottom, #EBBBA7FF, #CFC7F8FF)"},children:[e.jsxs("h2",{className:"text-lg font-bold text-slate-700 mb-2 flex items-center gap-2",children:[e.jsx("span",{children:"✨"})," CSY 二改版功能指南 ",e.jsx("span",{children:"✨"})]}),e.jsxs("p",{className:"text-xs text-slate-600 leading-relaxed opacity-90",children:["这份手册介绍二改版新增和改进的功能。",e.jsx("br",{}),"涵盖语音通话、心声、向量记忆、深度沉浸等功能，看完就会用啦~"]})]}),e.jsx("div",{className:"space-y-4",children:c.map(l=>e.jsxs("div",{className:`${l.color} rounded-3xl overflow-hidden border border-white/60 shadow-sm`,children:[e.jsxs("button",{onClick:()=>r(l.id),className:"w-full px-5 py-4 flex items-center justify-between active:scale-[0.99] transition-transform",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-2xl",children:l.emoji}),e.jsx("span",{className:`text-base font-bold ${l.textColor}`,children:l.title})]}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",className:`w-5 h-5 text-slate-400 transition-transform duration-300 ${a===l.id?"rotate-180":""}`,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"})})]}),a===l.id&&e.jsx("div",{className:"px-5 pb-5 space-y-3 animate-fade-in",children:l.items.map((s,d)=>e.jsx(x,{label:s.label,detail:s.detail},d))})]},l.id))}),e.jsxs("div",{className:"mt-6 bg-amber-50 rounded-2xl p-4 border border-amber-100",children:[e.jsx("h3",{className:"text-sm font-bold text-amber-700 mb-2",children:"💡 小贴士"}),e.jsxs("ul",{className:"text-xs text-amber-600 space-y-1.5 leading-relaxed",children:[e.jsx("li",{children:"• 语音没反应？→ 检查设置里是否配置好密钥 + 浏览器麦克风权限"}),e.jsx("li",{children:"• 摘星楼功能用不了？→ 进摘星楼后点右上角⚙️配置专属 AI"}),e.jsx("li",{children:"• 世界书挂上没效果？→ 确认挂载到你正在聊天的那个 char"}),e.jsx("li",{children:"• 心声/记忆不出现？→ 检查副API是否配置正确"}),e.jsx("li",{children:"• 向量记忆需要同时配置副API + Embedding API"})]})]}),e.jsx("div",{className:"mt-8 text-center text-[10px] text-slate-400",children:"CSY 二改版功能指南 • 2026-03"})]})]})},x=({label:n,detail:a})=>{const[t,r]=i.useState(!1);return e.jsxs("div",{className:"bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden",children:[e.jsxs("button",{onClick:()=>r(!t),className:"w-full px-4 py-3 flex items-center justify-between text-left active:bg-slate-50 transition-colors",children:[e.jsx("span",{className:"text-sm font-bold text-slate-700",children:n}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:`w-4 h-4 text-slate-300 transition-transform duration-200 ${t?"rotate-90":""}`,children:e.jsx("path",{fillRule:"evenodd",d:"M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z",clipRule:"evenodd"})})]}),t&&e.jsx("div",{className:"px-4 pb-4 animate-fade-in",children:e.jsx("p",{className:"text-xs text-slate-600 leading-relaxed whitespace-pre-wrap",children:a})})]})};export{h as default};
