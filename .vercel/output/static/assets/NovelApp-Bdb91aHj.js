import{s as Te,e as _e,u as Ee,r as m,j as e,M as te}from"./index-62Wwk-p-.js";import{C as Pe}from"./ConfirmDialog-CBWCIgpG.js";import{p as ze}from"./file-DrOI3gtx.js";const me=[{id:"sakura",name:"樱花 (Sakura)",bg:"bg-pink-50",paper:"bg-[#fff5f7]",text:"text-slate-700",accent:"text-pink-500",button:"bg-pink-400",activeTab:"bg-pink-500 text-white"},{id:"parchment",name:"羊皮纸 (Vintage)",bg:"bg-[#f5e6d3]",paper:"bg-[#fdf6e3]",text:"text-[#433422]",accent:"text-[#8c6b48]",button:"bg-[#b58900]",activeTab:"bg-[#b58900] text-white"},{id:"kraft",name:"牛皮纸 (Kraft)",bg:"bg-[#d7ccc8]",paper:"bg-[#e7e0d8]",text:"text-[#3e2723]",accent:"text-[#5d4037]",button:"bg-[#5d4037]",activeTab:"bg-[#5d4037] text-white"},{id:"midnight",name:"深夜 (Midnight)",bg:"bg-[#0f172a]",paper:"bg-[#1e293b]",text:"text-slate-300",accent:"text-blue-400",button:"bg-blue-600",activeTab:"bg-blue-600 text-white"},{id:"matcha",name:"抹茶 (Matcha)",bg:"bg-[#ecfccb]",paper:"bg-[#f7fee7]",text:"text-emerald-800",accent:"text-emerald-600",button:"bg-emerald-500",activeTab:"bg-emerald-500 text-white"}],Le=s=>{var w,f,I,P,h;if(!s)return["风格未定"];const r=new Set,i=((s.description||"")+(s.worldview||"")).toLowerCase();if(s.impression){const a=((w=s.impression.personality_core)==null?void 0:w.observed_traits)||[],l=((f=s.impression.mbti_analysis)==null?void 0:f.type)||"",$=((I=s.impression.value_map)==null?void 0:I.likes)||[],C=((P=s.impression.value_map)==null?void 0:P.dislikes)||[];l.includes("N")?(r.add("意象丰富"),r.add("跳跃")):l.includes("S")&&(r.add("细节考据"),r.add("写实")),l.includes("T")?(r.add("逻辑严密"),r.add("克制")):l.includes("F")&&(r.add("情感细腻"),r.add("渲染力强")),l.includes("J")?(r.add("结构工整"),r.add("伏笔")):l.includes("P")&&(r.add("随性"),r.add("反转"));const E={冷:["冷峻","极简"],傲娇:["口是心非","心理戏多"],温柔:["治愈","舒缓"],乐天:["轻快","对话密集"],中二:["燃","夸张"],电波:["意识流","抽象"],腹黑:["暗喻","悬疑"],社恐:["内心独白","敏感"],强势:["快节奏","压迫感"],猫:["喵体文学","慵懒"],活泼:["轻快","跳跃"],理性:["逻辑严密","客观"],感性:["情感细腻","渲染力强"],高冷:["冷峻","留白"]};a.forEach(M=>{Object.entries(E).forEach(([R,u])=>{M.includes(R)&&u.forEach(S=>r.add(S))})}),$.some(M=>M.includes("美")||M.includes("艺术"))&&r.add("唯美"),C.some(M=>M.includes("虚伪"))&&r.add("犀利直白")}if(Object.entries({古风:["古韵","半文白"],武侠:["快意","古韵"],科幻:["硬核","技术流"],猫:["喵体文学","慵懒"],温柔:["治愈","舒缓"],可爱:["萌系","轻快"],冷:["冷峻","克制"],热血:["燃","快节奏"],搞笑:["吐槽","跳跃"],暗黑:["暗喻","悬疑"]}).forEach(([a,l])=>{i.includes(a)&&l.forEach($=>r.add($))}),s.writerPersona){const a=s.writerPersona;a.includes("新手")&&r.add("青涩"),a.includes("大师")&&r.add("老练"),a.includes("诗意")&&r.add("诗意"),a.includes("大白话")&&r.add("口语化"),a.includes("写实")&&r.add("写实"),a.includes("动作")&&r.add("动作流"),a.includes("情感")&&r.add("情感流"),a.includes("对话")&&r.add("对话密集")}let b=Array.from(r);if(b.length===0){const a=["自然流","平实","日常","稳定","朴素"],l=(((h=s.name)==null?void 0:h.charCodeAt(0))||0)%a.length;b=[a[l],a[(l+2)%a.length]]}const c=a=>{let l=0;for(let $=0;$<a.length;$++)l=(l<<5)-l+a.charCodeAt($),l|=0;return l},v=c(s.name||"default");return b.sort((a,l)=>{const $=c(a+v.toString()),C=c(l+v.toString());return $-C}).slice(0,5)},Ce=s=>{var P,h,a,l;if(!s)return"未知风格";const r=((P=s.impression)==null?void 0:P.personality_core.observed_traits)||[],i=((a=(h=s.impression)==null?void 0:h.mbti_analysis)==null?void 0:a.type)||"",p=s.description||"",b={冷漠:{focus:"逻辑漏洞、战术细节",style:"简洁、克制，避免情感渲染",rhythm:"快节奏，少废话",taboo:"煽情、过度心理描写"},高冷:{focus:"逻辑漏洞、战术细节",style:"简洁、克制，避免情感渲染",rhythm:"快节奏，少废话",taboo:"煽情、过度心理描写"},冷静:{focus:"因果关系、客观事实",style:"冷静、旁观者视角",rhythm:"稳定",taboo:"情绪化表达"},乐天:{focus:"人物互动、温馨细节",style:'轻快、多对话，爱用"！"',rhythm:"跳跃式，可能突然插科打诨",taboo:"长篇阴郁描写、绝望氛围"},活泼:{focus:"人物互动、温馨细节",style:'轻快、多对话，爱用"！"',rhythm:"跳跃式，可能突然插科打诨",taboo:"长篇阴郁描写、绝望氛围"},感性:{focus:"情绪波动、微表情、内心戏",style:"细腻、意识流，大量心理活动",rhythm:"缓慢，停留在一个瞬间反复琢磨",taboo:"干巴巴的动作描写、快节奏战斗"},温柔:{focus:"情感交流、氛围营造",style:"柔和、细腻",rhythm:"舒缓",taboo:"粗暴、血腥"},傲娇:{focus:"口是心非、别扭的关心",style:"带有情绪色彩，心理活动丰富",rhythm:"起伏不定",taboo:"直球、坦率"},中二:{focus:"酷炫场景、角色帅气度",style:'夸张、比喻多、爱用"——"破折号',rhythm:"爆发式，高潮迭起",taboo:"平淡日常、琐碎细节"},电波:{focus:"奇怪的联想、超展开",style:"跳跃、抽象、不明觉厉",rhythm:"混乱",taboo:"循规蹈矩"},腹黑:{focus:"潜在危机、人性阴暗面",style:"优雅、暗藏玄机",rhythm:"从容",taboo:"傻白甜"},理性:{focus:"因果关系、世界观逻辑",style:"客观、有条理，像写报告",rhythm:"稳定，按时间线推进",taboo:"跳跃剪辑、模糊的意象"}};let c=r.find($=>b[$])||(r.length>0?r[0]:"理性");b[c]||(c.includes("冷")?c="冷漠":c.includes("热")||c.includes("活")?c="乐天":c.includes("柔")||c.includes("感")?c="感性":c="理性");let v=b[c]||b.理性,f={INTJ:"战略布局、权力博弈",INTP:"概念解构、设定严谨",ENTJ:"宏大叙事、征服感",ENTP:"脑洞大开、反转",INFJ:"宿命感、救赎",INFP:"理想主义、内心成长",ENFJ:"人际羁绊、群体命运",ENFP:"自由冒险、浪漫奇遇",ISTJ:"细节考据、现实逻辑",ISFJ:"守护、回忆",ESTJ:"秩序、规则冲突",ESFJ:"社交氛围、家庭伦理",ISTP:"动作细节、机械原理",ISFP:"美学体验、感官描写",ESTP:"感官刺激、即时反应",ESFP:"当下享乐、戏剧冲突"}[i]||"剧情推进",I=`
### ${s.name} 的创作人格档案 (Simple)
**核心性格**: ${c}
**关注点**: ${v.focus}，${f}
**笔触**: ${v.style}
**节奏**: ${v.rhythm}
**审美**: 喜欢${((l=s.impression)==null?void 0:l.value_map.likes.join("、"))||"未知"}
**禁忌**: ${v.taboo}
`;return(p.includes("猫")||p.includes("喵")||r.includes("猫"))&&(I+=`
### ⚠️ 特别注意：你是猫！
写作特征：
1. 用短句（猫的注意力不持久）。
2. 关注"能不能吃"、"舒不舒服"、"好不好玩"。
3. 突然走神写一段环境描写（如"阳光真暖"）。
4. 吐槽时必须带"喵"。
禁止：写出像人类一样的理性长篇大论。
`),I},We=s=>{var b,c,v;const r=((b=s.impression)==null?void 0:b.personality_core.observed_traits)||[],i=((c=s.impression)==null?void 0:c.value_map.dislikes)||[];let p=`## ${s.name} 的写作禁区（你必须遵守）：
`;return r.some(w=>w.includes("冷")||w.includes("高冷")||w.includes("理性"))?p+=`
- ❌ 禁止：煽情、超过2句话的心理描写、任何"感动"相关词汇。
- ❌ 禁止：使用“仿佛”、“似乎”这种不确定的词。
- ✅ 只能：白描动作、极简对话、留白。
- 节奏：每段不超过3句话，快刀斩乱麻。
`:r.some(w=>w.includes("感性")||w.includes("温柔"))?p+=`
- ❌ 禁止：粗暴的动作描写、超过1个感叹号、脏话。
- ❌ 禁止：干巴巴的说明文式描写。
- ✅ 只能：细腻的感官描写、内心独白、慢节奏铺陈。
- 节奏：可以在一个瞬间停留很久，写出呼吸感。
`:r.some(w=>w.includes("乐天")||w.includes("活泼"))?p+=`
- ❌ 禁止：超过3句话不出现对话、阴郁氛围、死亡话题。
- ✅ 只能：大量"！"、俏皮话、突然的吐槽。
- 节奏：跳跃式，可以突然岔开话题。
`:r.some(w=>w.includes("中二"))?p+=`
- ❌ 禁止：平淡的日常、"普通"这个词、任何自嘲。
- ✅ 只能：夸张比喻、破折号、酷炫的动作描写。
- 节奏：高潮迭起，每段都要有"燃点"。
`:p+=`
- ❌ 禁止：情绪化表达、模糊的意象、跳跃的时间线。
- ✅ 只能：客观描述、因果逻辑、线性叙事。
- 节奏：稳定推进，像纪录片。
`,i.length>0&&(p+=`
### 额外禁忌（基于你的价值观）：
`,i.forEach(w=>{p+=`- 如果剧情涉及"${w}"，你会下意识回避细节描写，或者表达出厌恶。
`})),((v=s.description)!=null&&v.includes("猫")||r.includes("猫"))&&(p+=`
### 🐱 猫属性强制规则：
`,p+=`- 注意力最多持续3句话就要走神。
`,p+=`- 必须关注"舒适度"、"食物"、"好玩的东西"。
`,p+=`- 吐槽时必须带"喵"。
`,p+=`- 禁止写出人类式的长篇大论。
`),p},Je=async(s,r,i,p,b=!1)=>{var v,w,f,I,P,h,a;if(!s)return"Error: No Character";if(!b&&s.writerPersona&&s.writerPersonaGeneratedAt&&Date.now()-s.writerPersonaGeneratedAt<7*24*60*60*1e3)return s.writerPersona;const c=`你是一位人物心理分析专家和写作教练。我会给你一个虚拟角色的完整档案，以及与他/她互动的用户档案。请你深入理解这个角色，然后告诉我：

**如果这个角色本人来写小说，他/她会有什么样的创作风格？**

---

### 角色档案

**姓名**: ${s.name}

**基础描述**: 
${s.description||"无"}

**背景故事**: 
${s.worldview||"无详细背景"}

**性格特质**: 
${((v=s.impression)==null?void 0:v.personality_core.observed_traits.join("、"))||"未知"}

**MBTI类型**: 
${((f=(w=s.impression)==null?void 0:w.mbti_analysis)==null?void 0:f.type)||"未知"}

**核心价值观**:
- 珍视/喜欢: ${((I=s.impression)==null?void 0:I.value_map.likes.join("、"))||"未知"}
- 厌恶/讨厌: ${((P=s.impression)==null?void 0:P.value_map.dislikes.join("、"))||"未知"}

**个人癖好/习惯**:
${((h=s.impression)==null?void 0:h.behavior_profile.response_patterns)||"- 无"}

**近期记忆片段**（了解当前心境）:
${((a=s.memories)==null?void 0:a.slice(-3).map(l=>`- ${l.summary}`).join(`
`))||"- 无记忆"}

---

### 互动对象（用户背景）
(角色的记忆和性格形成深受用户影响)
**用户昵称**: ${r.name}
**用户描述**: ${r.bio||"无"}

---

### 分析任务

请从以下**8个维度**分析这个角色的写作风格：

#### 1. 写作能力 (Skill Level)
他/她实际上擅长写作吗？还是只是想写？
- 新手：经常用错词，逻辑混乱，但有热情
- 业余：能写通顺，但技巧生硬
- 熟练：有自己的风格，技巧自然
- 大师：行云流水，深谙叙事之道

#### 2. 语言风格 (Language)
他/她说话/写作时用什么语言？
- 大白话：口语化，"就是那种感觉你懂吧"
- 书面语：规范、优雅
- 诗意：比喻、意象丰富
- 学术：专业术语，逻辑严密

#### 3. 表现手法 (Technique)
他/她倾向写实还是写意？
- 写实：精确描写，像纪录片
- 印象派：捕捉感觉，模糊但有氛围
- 象征派：用隐喻，一切都有深意

#### 4. 叙事重心 (Focus)
他/她写作时最关注什么？
- 动作：打斗、追逐、机械操作
- 情感：内心戏、人际关系
- 对话：角色互动、语言交锋
- 氛围：环境、意境、美学

#### 5. 偏好与禁忌 (Preference)
他/她喜欢写什么？讨厌写什么？
- 喜欢的题材/场景
- 避之不及的俗套

#### 6. 角色理解 (Character View)
他/她怎么看待自己笔下的【小说主角】（Fictional Protagonist）？
(注意：是指小说里的人物，不是指正在和他对话的用户)
- 是英雄？受害者？工具人？
- 会不会对主角的行为有自己的意见？

#### 7. 剧情态度 (Plot Opinion)
他/她对当前剧情有什么看法？
- 认为合理吗？
- 会不会想改变走向？
- 有没有更想写的支线？

#### 8. 互动倾向 (Collaboration Style)
他/她会怎么和共创搭档（用户）互动？
- 会吐槽搭档写得不对吗？
- 会用专业术语"互殴"吗？
- 还是默默接受搭档的设定？
- 态度是冷漠、热情、傲娇还是温柔？(参考性格特质)

---

**输出格式**（严格遵守, 不要用markdown标记）：

写作能力: (新手/业余/熟练/大师) - 一句话说明理由

语言风格: (大白话/书面语/诗意/学术) - 举例说明

表现手法: (写实/印象派/象征派) - 具体描述

叙事重心: (动作/情感/对话/氛围) - 为什么

偏好题材: (列举3个) | 禁忌俗套: (列举3个)

主角看法: (他/她怎么看待小说主角？一句话)

剧情态度: (对当前剧情的看法，30字)

互动模式: (与用户的互动风格？)

专业术语: (如果这个角色有特定领域的专业知识，列举3-5个术语；没有则写"无")

---

**字数要求**：总共400-600字。`;try{const l=await fetch(`${i.baseUrl.replace(/\/+$/,"")}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i.apiKey}`},body:JSON.stringify({model:i.model,messages:[{role:"user",content:c}],temperature:.7,max_tokens:8e3})});if(l.ok){const C=(await Te(l)).choices[0].message.content.trim(),E=`
### ${s.name} 的创作人格档案（AI深度分析）

${C}

---
*分析生成于: ${new Date().toLocaleDateString("zh-CN")}*
`.trim();return p(s.id,{writerPersona:E,writerPersonaGeneratedAt:Date.now()}),E}else throw new Error(`API Error: ${l.status}`)}catch(l){return console.error("Deep analysis failed:",l),Ce(s)}},Fe=s=>{var b;let i=(((b=s.impression)==null?void 0:b.personality_core.observed_traits)||[]).find(c=>["冷漠","高冷","感性","温柔","乐天","活泼","中二","电波"].some(v=>c.includes(v)))||"理性";i.includes("冷")&&(i="冷漠"),(i.includes("柔")||i.includes("感"))&&(i="感性"),(i.includes("乐")||i.includes("活"))&&(i="乐天");const p={冷漠:`
**错误示范（AI机械味）**：
"他的内心充满了愤怒，那种无法言说的痛苦让他几乎无法呼吸。他的心跳加速到每分钟120次，肌肉紧绷。月光透过窗户洒在他的脸上，仿佛在诉说着什么。"

**正确示范（${s.name}的风格）**：
"他盯着那人。指节捏得咯咯响。"
（短句，不解释情绪，不量化生理反应）
`,感性:`
**错误示范（数字量化+干巴）**：
"他难过地离开了房间。他的眼泪流了大约8滴，呼吸频率降低了15%。"

**正确示范（${s.name}的风格）**：
"他转身的时候，肩膀抖了一下。走到门口，停了很久。手放在门把上，又放下，又放上去。最终还是推开了。外面在下雨。他没带伞。雨水混着眼泪，分不清了。"
（慢节奏，停留在细节里，用感受代替数字）
`,乐天:`
**错误示范（量化+死板）**：
"虽然遭遇了挫折，但他依然保持乐观，心率恢复到正常的每分钟70次，决定继续前行。"

**正确示范（${s.name}的风格）**：
"'嘿，至少没摔断腿！'他龇牙咧嘴地爬起来，拍拍灰，'下次肯定能飞更远！哎，裤子破了，回头得缝缝...算了，这样更酷！'"
（用对话和动作，不要数字，要有人味）
`,理性:`
**错误示范（过度量化）**：
"这东西的辐射值为342.7贝克勒尔，温度上升了23.5摄氏度，他的瞳孔放大了2.3毫米。"

**正确示范（${s.name}的风格）**：
"读数显示辐射超标。仪器开始发烫。建议立即撤离。"
（用事实，但避免无意义的精确，专注关键信息）
`};return p[i]||p.理性},He=(s,r,i,p,b,c,v,w)=>{var M,R;const f=_e.buildCoreContext(s,r,!0),I=s.writerPersona||Ce(s),P=Fe(s),h=We(s),a=(i==null?void 0:i.protagonists.map(u=>`- ${u.name} (${u.role}): ${u.description}`).join(`
`))||"无",l=`
小说：《${i==null?void 0:i.title}》
世界观：${i==null?void 0:i.worldSetting}
主要角色：
${a}
`,$=`
${f}

# 当前模式：小说共创 (Co-Writing Mode)
你正在与 **${r.name}** (用户) 合作撰写小说。
书名：《${i==null?void 0:i.title}》

**你的角色**：
1. 你既是小说作者之一，也是${r.name}的${((M=s.impression)==null?void 0:M.personality_core.summary)||"伙伴"}。
2. 在【分析】和【吐槽】环节，请完全保持你的人设（语气、性格、对用户的态度）。
3. 如果你们关系亲密，不要表现得像个陌生的AI工具人；如果你们关系紧张/傲娇，也要体现出来。

# 身份设定
你是 **${s.name}**。
你正在用自己的方式参与小说《${i==null?void 0:i.title}》的创作。

---

# ⚠️ 反趋同协议 (Anti-Cliché Protocol)

## 你必须记住：
1. **你是${s.name}，你有你的性格，你或许很擅长写作刻画，也有可能你的文字表达能力其实很差劲，这取决于你是谁，你的经历等**
   - 不要写出"AI味"的文字
   - 不要试图"完美"或"教科书式"
   
2. **每个作者的笔触必须不同**
   ${h}

3. **绝对禁止的AI通病**：
   - ❌ "仿佛/似乎/好像" → 要么确定，要么别写
   - ❌ "内心五味杂陈" → 说清楚是哪五味
   - ❌ "眼神中透露出XXX" → 写动作，不要总结情绪
   - ❌ "月光洒在..." → 2024年了，别用这种意象
   - ❌ 对称的排比句 → 真人不会这么说话
   - ❌ **数字量化描写** → 禁止"心跳了83次"、"肌肉收缩了12次"这种机械化表达

4. **⚠️ 数字使用铁律**：
   - ✅ 允许：剧情必需的数字（"3个敌人"、"第5层楼"）
   - ✅ 允许：对话中的数字（"给我5分钟"）
   - ❌ 禁止：生理反应的数字（心跳、呼吸、眨眼次数）
   - ❌ 禁止：情绪量化（"焦虑指数上升37%"）
   - ❌ 禁止：无意义的精确数字（"等待了127秒"）

---

# 你的写作人格
${I}

# 风格参考 (Do vs Don't)
${P}

---

# 上文回顾
${b}

${l}

---

# 用户指令
${p||"[用户未输入，请根据上文自然续写]"}

---
`;let C=`### [创作任务]
请按以下结构输出JSON。
`,E=[];if(c.analyze&&(C+=`
1. **分析**: 以${s.name}的视角，简评上文。
   - 语气：保持你的人设（${s.name}）。
   - 内容：如果是你觉得不合理的地方，可以直接指出；如果觉得好，可以夸奖搭档。
`,E.push('"analysis": { "reaction": "第一反应", "focus": "关注点", "critique": "评价" }')),c.write&&(C+=`
2. **正文续写**: 
   - 场景化: 描写动作、环境、感官。
   - 节奏: 符合你的性格。
   - 字数: 400-800字。
`,E.push('"writer": { "content": "正文内容", "technique": "技巧", "mood": "基调" }')),c.comment){const u=v.slice(-5).filter(S=>S.authorId!=="user"&&S.authorId!==s.id&&(S.role==="writer"||S.type==="story")).map(S=>{const q=w.find(K=>K.id===S.authorId);return{name:(q==null?void 0:q.name)||"Unknown",content:S.content.substring(0,100)}});C+=`
3. **吐槽/感想 (带互动)**: 
   写完后的第一人称碎碎念。这是你直接对用户说的话。
   
   ${u.length>0?`
   **特别提示**：最近有其他作者也写了内容：
   ${u.map(S=>`- ${S.name}写的：${S.content}`).join(`
`)}
   
   如果你（${s.name}）对他们的写法有意见，可以在吐槽里说出来！
   - 如果你觉得他们理解错了角色，可以反驳
   - 如果你有专业知识（${s.description}），可以用术语纠正
   - 如果你就是看不惯，直说！
   `:""}
   
   ${(R=s.description)!=null&&R.includes("猫")?'必须有"喵"！':""}
`,E.push('"comment": { "content": "即时反应（与用户对话）" }')}return`${$}

${C}

### 最终输出格式 (Strict JSON, No Markdown)
{
  ${E.join(`,
  `)},
  "meta": { "tone": "本段情绪基调", "suggestion": "简短的下一步建议" }
}
`},Re=s=>{const r=s.split(`
`),i={写作能力:"✍️",语言风格:"💬",表现手法:"🎨",叙事重心:"🎯",偏好:"❤️",禁忌:"🚫",主角:"👤",剧情:"📖",互动:"🤝",创作人格:"🧠",特别注意:"⚠️",审美:"✨",节奏:"🎵",关注点:"👁️",笔触:"🖌️",核心性格:"💎",专业术语:"📚"},p=w=>{for(const[f,I]of Object.entries(i))if(w.includes(f))return I;return"📌"},b=[];let c=null;r.forEach(w=>{var P;const f=w.trim();if(!f)return;const I=f.match(/^###\s*(.+)/)||f.match(/^\*\*([^*]+)\*\*\s*[:：]\s*(.*)/)||f.match(/^([^-•\d][^:：]{1,15})[:：]\s*(.*)/);if(I){c&&c.content.length>0&&b.push(c);const h=(I[1]||"").replace(/\*\*/g,"").trim();c={title:h,icon:p(h),content:[]};const a=(P=I[2])==null?void 0:P.trim();a&&c.content.push(a)}else if(c){const h=f.replace(/^\*\*|\*\*$/g,"").replace(/^[-•]\s*/,"");h&&c.content.push(h)}});const v=c;return v&&v.content.length>0&&b.push(v),b},Ue=({char:s,userProfile:r,targetCharId:i,isTyping:p,setIsTyping:b,setConfirmDialog:c,addToast:v,apiConfig:w,updateCharacter:f})=>{const I=s.writerPersona||Ce(s),P=Re(I);return e.jsxs("div",{className:"bg-gradient-to-b from-slate-50 to-white border-b border-black/5 overflow-hidden",children:[e.jsx("div",{className:"max-h-[45vh] overflow-y-auto p-4 space-y-3 overscroll-contain",children:P.length===0?e.jsxs("div",{className:"text-center py-8 text-slate-400 text-sm",children:["暂无详细风格数据",e.jsx("br",{}),e.jsx("span",{className:"text-xs",children:"点击下方按钮生成"})]}):P.map((h,a)=>e.jsxs("div",{className:"bg-white p-4 rounded-2xl border border-slate-100 shadow-sm",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2 pb-2 border-b border-slate-100",children:[e.jsx("span",{className:"text-base",children:h.icon}),e.jsx("h4",{className:"text-sm font-bold text-slate-800",children:h.title})]}),e.jsx("div",{className:"space-y-1.5",children:h.content.map((l,$)=>e.jsx("p",{className:"text-sm text-slate-600 leading-relaxed",children:l},$))})]},a))}),e.jsx("div",{className:"px-4 py-3 border-t border-slate-100 bg-white/80",children:e.jsx("button",{onClick:async()=>{i&&c({isOpen:!0,title:"重新生成风格",message:"确定要重新分析该角色的写作人格吗？这将消耗一定量的 Token。",variant:"info",confirmText:"重新生成",onConfirm:async()=>{c(null),v("正在分析...","info"),b(!0);try{await Je(s,r,w,f,!0),v("风格已更新","success")}catch{v("失败","error")}finally{b(!1)}}})},disabled:p,className:"w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50",children:p?e.jsx("div",{className:"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"}):e.jsx(e.Fragment,{children:"🔄 深度分析写作风格"})})})]})},Ve=({activeBook:s,updateNovel:r,characters:i,userProfile:p,apiConfig:b,onBack:c,updateCharacter:v,collaborators:w,targetCharId:f,setTargetCharId:I,onOpenSettings:P})=>{var ge;const{addToast:h}=Ee(),a=m.useMemo(()=>me.find(n=>n.id===s.coverStyle)||me[0],[s.coverStyle]),[l,$]=m.useState({write:!0,comment:!1,analyze:!1}),[C,E]=m.useState(""),[M,R]=m.useState(!1),[u,S]=m.useState(s.segments),[q,K]=m.useState(null),[se,ae]=m.useState(!1),[X,ne]=m.useState(!1),[le,Q]=m.useState(null),[re,oe]=m.useState(""),[N,Z]=m.useState(null),[we,O]=m.useState(!1),[Y,G]=m.useState(""),[xe,ue]=m.useState(!1),[pe,D]=m.useState(!1),[J,ie]=m.useState(null),B=m.useRef(null);m.useEffect(()=>{S(s.segments)},[s.segments]),m.useEffect(()=>{B.current&&!X&&(B.current.scrollTop=B.current.scrollHeight)},[u,M,X]);const je=m.useMemo(()=>u.filter(n=>n.focus==="chapter_summary").length+1,[u]),F=i.find(n=>n.id===f),ee=u.length>0&&u[u.length-1].authorId!=="user",ve=m.useMemo(()=>{let n=-1;for(let o=u.length-1;o>=0;o--)if(u[o].focus==="chapter_summary"){n=o;break}return u.slice(n+1)},[u]),x=m.useMemo(()=>u.filter(n=>n.focus==="chapter_summary"),[u]),H=m.useMemo(()=>{const n=[],o=[];u.forEach((d,j)=>{d.focus==="chapter_summary"&&o.push(j)});for(let d=0;d<o.length;d++){const j=d===0?0:o[d-1]+1,z=o[d],k=u.slice(j,z).filter(L=>L.type==="story");n.push({title:`第 ${d+1} 章`,segments:k,summary:u[o[d]].content})}return n},[u]),he=async(n,o,d)=>{var j,z;R(!0),K(null);try{const k=d.filter(y=>y.focus==="chapter_summary");let L=0;if(k.length>0){const y=k[k.length-1];L=d.findIndex(V=>V.id===y.id)+1}const U=d.slice(L).filter(y=>y.role==="writer"||y.type==="story");let t="";k.length>0?(t+=`【前情回顾 / Chapter Recaps】
`,k.forEach((y,V)=>t+=`
第${V+1}章总结：
${y.content}
`),t+=`
---

【当前章节 / Current Chapter】
`):t+=`【当前章节 / Current Chapter】
`,U.forEach(y=>{var Ne;const V=y.authorId==="user"?p.name:((Ne=i.find($e=>$e.id===y.authorId))==null?void 0:Ne.name)||"AI";t+=`
[${V}]: ${y.content}
`});const g=He(n,p,s,o,t,l,d,i),T=((j=n.impression)==null?void 0:j.personality_core.observed_traits)||[];let _=.85;T.some(y=>y.includes("电波")||y.includes("疯"))&&(_=.98),T.some(y=>y.includes("理性")||y.includes("冷")||y.includes("逻辑"))&&(_=.6);const W=await fetch(`${b.baseUrl.replace(/\/+$/,"")}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b.apiKey}`},body:JSON.stringify({model:b.model,messages:[{role:"user",content:g}],temperature:_,max_tokens:8e3})});if(W.ok){const y=await Te(W);(z=y.usage)!=null&&z.total_tokens&&K(y.usage.total_tokens);let V=y.choices[0].message.content.trim();const Ne=V;V=V.replace(/```json\n?/g,"").replace(/```\n?/g,"");const $e=V.match(/\{[\s\S]*\}/);$e&&(V=$e[0]);let A;try{A=JSON.parse(V)}catch{A={writer:{content:Ne}}}const Se=[],ce=Date.now();A.analysis&&(A.analysis.critique||A.analysis.reaction)&&Se.push({id:`seg-${ce}-a`,role:"analyst",type:"analysis",authorId:n.id,content:A.analysis.critique||JSON.stringify(A.analysis),focus:A.analysis.focus,meta:{reaction:A.analysis.reaction},timestamp:ce+1}),A.writer&&A.writer.content&&Se.push({id:`seg-${ce}-w`,role:"writer",type:"story",authorId:n.id,content:A.writer.content,meta:{...A.meta||{},technique:A.writer.technique,mood:A.writer.mood},timestamp:ce+2}),A.comment&&A.comment.content&&Se.push({id:`seg-${ce}-c`,role:"commenter",type:"discussion",authorId:n.id,content:A.comment.content,timestamp:ce+3}),S(Ae=>{const Oe=[...Ae,...Se];return r(s.id,{segments:Oe}),Oe})}else throw new Error(`API Error: ${W.status}`)}catch(k){h("请求失败: "+k.message,"error")}finally{R(!1)}},ye=async()=>{if(!f){h("请先选择一个角色","error");return}const n=i.find(j=>j.id===f);if(!n)return;let o=u;if(C.trim()){const j={id:`seg-${Date.now()}`,role:"writer",type:"story",authorId:"user",content:C,timestamp:Date.now()};o=[...u,j],S(o),r(s.id,{segments:o})}const d=C;E(""),await he(n,d,o)},be=async()=>{if(!f)return;const n=i.find(j=>j.id===f);if(!n)return;let o=[...u],d=0;for(;o.length>0&&o[o.length-1].authorId!=="user";)o.pop(),d++;if(d===0){h("没有可重随的 AI 内容","info");return}S(o),r(s.id,{segments:o}),h("正在重随...","info"),await he(n,"",o)},de=n=>{Q(n),oe(n.content),ne(!0)},fe=()=>{if(!le)return;const n=u.map(o=>o.id===le.id?{...o,content:re}:o);S(n),r(s.id,{segments:n}),ne(!1),Q(null)},ke=n=>{Z({isOpen:!0,title:"删除段落",message:"确定要删除这个段落吗？",variant:"danger",onConfirm:()=>{const o=u.filter(d=>d.id!==n);S(o),r(s.id,{segments:o}),Z(null)}})},Ie=async()=>{ue(!0),O(!0),G("正在回顾本章节内容...");try{let n=0,o=-1;for(let t=u.length-1;t>=0;t--)if(u[t].focus==="chapter_summary"){o=t;break}o!==-1&&(n=o+1);const j=u.slice(n).filter(t=>t.type==="story"||t.role==="writer").map(t=>t.content).join(`

`);if(!j.trim()){G("本章似乎还没有足够的内容来生成总结。"),ue(!1);return}const z=u.filter(t=>t.focus==="chapter_summary"),k=z.length>0?`
### 前章摘要参考（保持一致性）
${z.map((t,g)=>`第${g+1}章：${t.content.substring(0,300)}`).join(`
`)}
`:"",L=`### 任务：章节归档总结
小说：《${s.title}》
世界观：${s.worldSetting||"未设定"}
${k}
### 当前章节正文
${j.substring(0,2e5)}

### 总结要求
请为上述章节内容生成一份**高质量归档总结**，满足以下要求：

1. **剧情轨迹**：按时间顺序梳理本章发生的所有关键事件，不遗漏任何主线或支线转折点。
2. **角色动态**：记录每个出场角色的行为、态度变化、关系发展。特别注意角色之间的互动和情感变化。
3. **氛围与基调**：描述本章的整体氛围（例如：紧张、温馨、悬疑），以及氛围的转折点。
4. **重要信息**：标记所有可能影响后续剧情的伏笔、承诺、悬念、新设定等。
5. **场景与环境**：记录关键场景的地点、时间、环境特征。
6. **写作格式**：使用清晰的结构化格式（可以分段或使用标记），让后续章节的AI仅凭此总结就能无缝衔接创作。

请直接输出总结内容，不需要JSON格式。`,U=await fetch(`${b.baseUrl.replace(/\/+$/,"")}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b.apiKey}`},body:JSON.stringify({model:b.model,messages:[{role:"user",content:L}]})});if(U.ok){const t=await Te(U);G(t.choices[0].message.content)}else G("生成失败，请重试。")}catch(n){G(`错误: ${n.message}`)}finally{ue(!1)}},Me=async()=>{const n={id:`seg-summary-${Date.now()}`,role:"analyst",type:"analysis",authorId:"system",content:Y,focus:"chapter_summary",timestamp:Date.now(),meta:{reaction:"本章结束",suggestion:"新章节开始"}},o=[...u,n];S(o),await r(s.id,{segments:o});const d=new Date().toISOString().split("T")[0],j=o.filter(k=>k.focus==="chapter_summary").length,z=w.map(k=>k.name).join("、");for(const k of s.collaboratorIds){const L=i.find(U=>U.id===k);if(L){const U={id:`mem-${Date.now()}-${Math.random()}`,date:d,summary:`与${z}一起为《${s.title}》创作了第${j}章，已完成归档。`,mood:"creative"};v(L.id,{memories:[...L.memories||[],U]})}}O(!1),G(""),h("章节已归档，记忆已同步","success")};return e.jsxs("div",{className:`h-full w-full flex flex-col font-serif ${a.bg} transition-colors duration-500 relative`,children:[e.jsx(Pe,{isOpen:!!N,title:(N==null?void 0:N.title)||"",message:(N==null?void 0:N.message)||"",variant:N==null?void 0:N.variant,confirmText:(N==null?void 0:N.confirmText)||(N!=null&&N.onConfirm?"确认":"OK"),onConfirm:(N==null?void 0:N.onConfirm)||(()=>Z(null)),onCancel:()=>Z(null)}),e.jsxs("div",{className:`flex flex-col border-b border-black/5 shrink-0 z-20 backdrop-blur-md ${a.bg}/90 transition-all`,children:[e.jsxs("div",{className:"h-16 flex items-center justify-between px-4 pt-2",children:[e.jsx("button",{onClick:c,className:"p-3 -ml-3 rounded-full hover:bg-black/5 active:scale-90 transition-transform",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:`w-6 h-6 ${a.text}`,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5 8.25 12l7.5-7.5"})})}),e.jsxs("div",{className:"flex flex-col items-center cursor-pointer active:opacity-70 transition-opacity",onClick:P,children:[e.jsx("span",{className:`font-bold text-base ${a.text} truncate max-w-[150px]`,children:s.title}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:`text-[10px] opacity-60 ${a.text}`,children:["第 ",je," 章"]}),q&&e.jsxs("span",{className:`text-[9px] px-1.5 py-0.5 rounded opacity-50 font-mono border border-current ${a.text}`,children:["⚡ ",q]})]})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("button",{onClick:()=>D(!0),className:`p-2 rounded-full hover:bg-black/5 transition-colors ${a.text}`,title:"历史章节",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"})})}),e.jsx("button",{onClick:Ie,disabled:M,className:`p-2 rounded-full hover:bg-black/5 transition-colors ${a.text}`,title:"结束本章",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"})})})]})]}),e.jsx("div",{className:"px-4 pb-3 flex gap-3 overflow-x-auto no-scrollbar",children:w.map(n=>e.jsxs("button",{onClick:()=>I(n.id),className:`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all relative ${f===n.id?"bg-slate-800 text-white border-slate-800":"bg-white/50 border-black/5 hover:bg-white text-slate-600"}`,children:[e.jsx("img",{src:n.avatar,className:"w-6 h-6 rounded-full object-cover"}),e.jsx("span",{className:"text-xs font-bold whitespace-nowrap",children:n.name}),n.writerPersona&&e.jsx("span",{className:"absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full border border-white"})]},n.id))})]}),e.jsxs("div",{className:`z-10 ${a.bg}/95 backdrop-blur-md border-b border-black/5 shadow-sm`,children:[e.jsxs("div",{className:"px-4 py-2 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 mr-4",children:[e.jsxs("div",{className:"flex items-center gap-2 shrink-0",children:[F&&e.jsx("img",{src:F.avatar,className:"w-6 h-6 rounded-full object-cover"}),e.jsx("span",{className:"text-xs font-bold text-slate-700",children:F!=null&&F.name?`${F.name}的风格`:"未选择角色"})]}),e.jsx("div",{className:"flex-1 flex gap-2 overflow-x-auto no-scrollbar",children:F&&Le(F).slice(0,3).map((n,o)=>{let d="bg-indigo-50 text-indigo-700 border-indigo-100";return["快节奏","慢节奏","节奏"].some(j=>n.includes(j))&&(d="bg-blue-50 text-blue-700 border-blue-100"),["冷峻","温情","治愈","燃","致郁"].some(j=>n.includes(j))&&(d="bg-pink-50 text-pink-700 border-pink-100"),["对话","心理","白描","意识流"].some(j=>n.includes(j))&&(d="bg-amber-50 text-amber-700 border-amber-100"),e.jsx("span",{className:`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap border ${d}`,children:n},o)})})]}),e.jsxs("button",{onClick:()=>ae(!se),className:"shrink-0 text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-full hover:bg-slate-50 text-slate-600 flex items-center gap-1 transition-colors",children:["详情 ",e.jsx("span",{className:`transform transition-transform ${se?"rotate-180":""}`,children:"▼"})]})]}),e.jsx("div",{className:`transition-all duration-300 ease-out overflow-hidden ${se?"max-h-[60vh] opacity-100":"max-h-0 opacity-0"}`,children:F?e.jsx(Ue,{char:F,userProfile:p,targetCharId:f,isTyping:M,setIsTyping:R,setConfirmDialog:Z,addToast:h,apiConfig:b,updateCharacter:v}):e.jsx("div",{className:"p-4 text-center text-xs text-slate-400",children:"请先选择一个角色"})})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-40",ref:B,children:[ve.length===0&&e.jsx("div",{className:"text-center py-20 opacity-40",children:e.jsxs("p",{className:"text-sm italic font-serif",children:["第 ",je," 章",e.jsx("br",{}),"提笔写下新的开始..."]})}),ve.map(n=>{var k,L;const o=n.authorId==="user",d=o?null:i.find(U=>U.id===n.authorId),j=n.role||(n.type==="story"?"writer":n.type==="analysis"?"analyst":"commenter"),z=e.jsxs("div",{className:"absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10 bg-white/80 backdrop-blur rounded-lg p-1 shadow-sm border border-slate-100",children:[e.jsx("button",{onClick:()=>de(n),className:"p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-500",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"w-3 h-3",children:e.jsx("path",{d:"m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"})})}),e.jsx("button",{onClick:()=>ke(n.id),className:"p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"w-3 h-3",children:e.jsx("path",{fillRule:"evenodd",d:"M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z",clipRule:"evenodd"})})})]});return j==="writer"?e.jsxs("div",{className:`p-6 rounded-sm shadow-sm leading-loose text-justify text-[17px] relative group transition-all ${a.paper} ${a.text} ${o?"border-l-4 border-slate-300":""}`,children:[z,e.jsxs("div",{className:"absolute -top-3 left-4 bg-white/90 border border-black/5 px-2 py-0.5 rounded text-[9px] font-sans font-bold uppercase tracking-wider text-slate-500 shadow-sm flex items-center gap-1.5",children:[o?null:e.jsx("img",{src:d==null?void 0:d.avatar,className:"w-3 h-3 rounded-full object-cover"}),e.jsxs("span",{children:[o?"我 (User)":d==null?void 0:d.name," 执笔"]}),!o&&((k=n.meta)==null?void 0:k.mood)&&e.jsx("span",{className:"bg-slate-100 px-1.5 rounded text-[9px] text-slate-600 normal-case",children:n.meta.mood})]}),e.jsx("div",{className:"whitespace-pre-wrap",children:n.content})]},n.id):j==="commenter"?e.jsxs("div",{className:"flex gap-3 max-w-[85%] font-sans ml-auto flex-row-reverse animate-slide-up group relative",children:[e.jsx("div",{className:"w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm mt-1",children:e.jsx("img",{src:o?p.avatar:d==null?void 0:d.avatar,className:"w-full h-full object-cover"})}),e.jsxs("div",{className:"p-3 rounded-xl text-sm shadow-sm relative bg-[#fff9c4] text-slate-700 transform rotate-1 border border-yellow-200/50",children:[z,n.content]})]},n.id):j==="analyst"?e.jsxs("div",{className:"mx-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200 p-4 text-xs font-sans text-slate-600 shadow-sm group relative",children:[z,e.jsxs("div",{className:"flex items-center gap-2 mb-2 pb-2 border-b border-slate-200",children:[e.jsx("span",{className:"text-lg",children:"🧠"}),e.jsxs("span",{className:"font-bold text-slate-800",children:[d==null?void 0:d.name," 的分析"]}),n.focus&&e.jsx("span",{className:"bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold",children:n.focus})]}),((L=n.meta)==null?void 0:L.reaction)&&e.jsxs("div",{className:"mb-2 pb-2 border-b border-dashed border-slate-200",children:[e.jsx("span",{className:"text-slate-400 text-[10px] uppercase",children:"第一反应"}),e.jsxs("p",{className:"text-sm font-bold text-slate-700 mt-0.5",children:['"',n.meta.reaction,'"']})]}),e.jsx("p",{className:"leading-relaxed whitespace-pre-wrap",children:n.content})]},n.id):null}),M&&e.jsx("div",{className:"flex justify-center py-4",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:`w-2 h-2 rounded-full ${a.button} animate-bounce`}),e.jsx("div",{className:`w-2 h-2 rounded-full ${a.button} animate-bounce delay-75`}),e.jsx("div",{className:`w-2 h-2 rounded-full ${a.button} animate-bounce delay-150`})]})})]}),e.jsxs("div",{className:"absolute bottom-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 z-30 transition-transform duration-300 font-sans shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-safe",children:[e.jsxs("div",{className:"flex gap-2 px-4 py-2 text-xs border-b border-slate-100 overflow-x-auto no-scrollbar",children:[e.jsxs("button",{onClick:()=>$({...l,write:!l.write}),className:`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${l.write?"bg-slate-800 text-white border-slate-800":"bg-white text-slate-500 border-slate-200"}`,children:[e.jsx("span",{children:"✍️"})," 续写正文"]}),e.jsxs("button",{onClick:()=>$({...l,comment:!l.comment}),className:`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${l.comment?"bg-slate-800 text-white border-slate-800":"bg-white text-slate-500 border-slate-200"}`,children:[e.jsx("span",{children:"💬"})," 角色吐槽"]}),e.jsxs("button",{onClick:()=>$({...l,analyze:!l.analyze}),className:`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${l.analyze?"bg-slate-800 text-white border-slate-800":"bg-white text-slate-500 border-slate-200"}`,children:[e.jsx("span",{children:"🧠"})," 深度分析"]})]}),e.jsxs("div",{className:"p-3 flex gap-2 items-end",children:[e.jsx("textarea",{value:C,onChange:n=>E(n.target.value),placeholder:l.write?C.trim()?"输入剧情大纲...":"输入指令或留空AI续写...":"输入讨论内容...",className:"flex-1 bg-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-700 outline-none resize-none max-h-32 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all",rows:1,style:{minHeight:"44px"}}),ee&&!M&&!C.trim()&&e.jsx("button",{onClick:be,className:"w-11 h-11 rounded-full flex items-center justify-center text-slate-500 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all shrink-0",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"})})}),e.jsx("button",{onClick:ye,disabled:M||!C.trim()&&!l.write,className:`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all shrink-0 ${C.trim()||l.write?a.button:"bg-slate-300"}`,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:"w-5 h-5",children:e.jsx("path",{d:"M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"})})})]})]}),e.jsx(te,{isOpen:X,title:"编辑段落",onClose:()=>ne(!1),footer:e.jsx("button",{onClick:fe,className:"w-full py-3 bg-slate-800 text-white font-bold rounded-2xl",children:"保存"}),children:e.jsx("textarea",{value:re,onChange:n=>oe(n.target.value),className:"w-full h-48 bg-slate-100 rounded-xl p-3 text-sm resize-none focus:outline-none leading-relaxed"})}),e.jsx(te,{isOpen:we,title:"章节总结",onClose:()=>O(!1),footer:xe?e.jsx("div",{className:"w-full py-3 bg-slate-100 text-slate-500 font-bold rounded-2xl text-center",children:"AI生成中..."}):e.jsx("button",{onClick:Me,className:"w-full py-3 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg",children:"确认归档并开启新章"}),children:e.jsx("textarea",{value:Y,onChange:n=>G(n.target.value),className:"w-full h-64 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm resize-none focus:outline-none leading-relaxed",placeholder:"总结生成中..."})}),e.jsx(te,{isOpen:pe,title:"历史章节",onClose:()=>D(!1),children:e.jsxs("div",{className:"max-h-[60vh] overflow-y-auto space-y-4 p-1",children:[x.length===0&&e.jsx("div",{className:"text-center text-slate-400 py-4 text-xs",children:"暂无历史章节"}),x.map((n,o)=>e.jsxs("div",{className:"bg-slate-50 p-4 rounded-xl border border-slate-100",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsxs("div",{className:"font-bold text-sm text-slate-700",children:["第 ",o+1," 章"]}),e.jsx("button",{onClick:()=>{ie(o),D(!1)},className:"text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg font-bold hover:bg-indigo-100 border border-indigo-100 transition-colors",children:"阅读原文"})]}),e.jsx("div",{className:"text-xs text-slate-600 leading-relaxed whitespace-pre-wrap line-clamp-4",children:n.content})]},n.id))]})}),e.jsx(te,{isOpen:J!==null,title:((ge=H[J??0])==null?void 0:ge.title)||"",onClose:()=>ie(null),children:e.jsx("div",{className:"max-h-[70vh] overflow-y-auto space-y-4 p-1",children:J!==null&&H[J]&&e.jsxs(e.Fragment,{children:[H[J].segments.map(n=>{const o=n.authorId==="user",d=o?null:i.find(j=>j.id===n.authorId);return e.jsxs("div",{className:`${a.paper} p-5 rounded-sm leading-loose text-justify text-[15px] ${a.text} ${o?"border-l-4 border-slate-300":""}`,children:[e.jsxs("div",{className:"text-[9px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5",children:[!o&&d&&e.jsx("img",{src:d.avatar,className:"w-3 h-3 rounded-full object-cover"}),e.jsxs("span",{children:[o?"我":d==null?void 0:d.name," 执笔"]})]}),e.jsx("div",{className:"whitespace-pre-wrap font-serif",children:n.content})]},n.id)}),e.jsxs("div",{className:"bg-indigo-50 p-4 rounded-xl border border-indigo-100 mt-4",children:[e.jsx("div",{className:"text-[10px] font-bold text-indigo-400 uppercase mb-2",children:"章节总结"}),e.jsx("div",{className:"text-xs text-indigo-700 leading-relaxed whitespace-pre-wrap",children:H[J].summary})]}),e.jsxs("div",{className:"flex justify-between pt-2",children:[e.jsx("button",{onClick:()=>ie(Math.max(0,(J??0)-1)),disabled:J===0,className:"text-xs text-slate-400 disabled:opacity-30 px-3 py-1.5 rounded-lg hover:bg-slate-100",children:"← 上一章"}),e.jsx("button",{onClick:()=>ie(Math.min(H.length-1,(J??0)+1)),disabled:J===H.length-1,className:"text-xs text-slate-400 disabled:opacity-30 px-3 py-1.5 rounded-lg hover:bg-slate-100",children:"下一章 →"})]})]})})})]})},Ke=()=>{const{closeApp:s,novels:r,addNovel:i,updateNovel:p,deleteNovel:b,characters:c,updateCharacter:v,apiConfig:w,addToast:f,userProfile:I,worldbooks:P}=Ee(),[h,a]=m.useState("shelf"),[l,$]=m.useState(null),[C,E]=m.useState(me[0]),[M,R]=m.useState(""),[u,S]=m.useState(""),[q,K]=m.useState(""),[se,ae]=m.useState(""),[X,ne]=m.useState(new Set),[le,Q]=m.useState([]),[re,oe]=m.useState(""),[N,Z]=m.useState(""),we=m.useRef(null),[O,Y]=m.useState(null),[G,xe]=m.useState(!1),[ue,pe]=m.useState(!1),[D,J]=m.useState("system"),[ie,B]=m.useState(!1),[je,F]=m.useState(!1),[ee,ve]=m.useState(null),[x,H]=m.useState(null),[he,ye]=m.useState(null),be=t=>me.find(g=>g.id===t)||me[0],de=m.useMemo(()=>l?c.filter(t=>l.collaboratorIds.includes(t.id)):[],[l,c]),fe=m.useMemo(()=>{const t=[],g=new Set;return r.forEach(T=>{T.protagonists.forEach(_=>{const W=`${_.name}-${_.role}`;g.has(W)||(g.add(W),t.push(_))})}),t},[r]);m.useEffect(()=>{l&&de.length>0&&!he&&ye(de[0].id)},[l,de]),m.useEffect(()=>{l&&E(be(l.coverStyle))},[l]);const ke=()=>{if(!M.trim()){f("请输入标题","error");return}const t={id:`novel-${Date.now()}`,title:M,subtitle:u,summary:q,coverStyle:C.id,coverImage:N,worldSetting:se,collaboratorIds:Array.from(X),protagonists:le,segments:[],createdAt:Date.now(),lastActiveAt:Date.now()};i(t),$(t),a("write"),ge()},Ie=()=>{l&&(R(l.title),S(l.subtitle||""),K(l.summary),ae(l.worldSetting),E(be(l.coverStyle)),Z(l.coverImage||""),ne(new Set(l.collaboratorIds)),Q(l.protagonists),a("settings"))},Me=async()=>{if(!l)return;const t={...l,title:M,subtitle:u,summary:q,worldSetting:se,coverStyle:C.id,coverImage:N,collaboratorIds:Array.from(X),protagonists:le,segments:l.segments,lastActiveAt:Date.now()};await p(l.id,t),$(t),a("write"),f("设定已更新，内容完好","success")},ge=()=>{R(""),S(""),K(""),ae(""),ne(new Set),Q([]),Z(""),oe("")},n=async t=>{H({isOpen:!0,title:"删除作品",message:"确定要删除这本小说吗？此操作无法撤销。",variant:"danger",onConfirm:()=>{b(t),(l==null?void 0:l.id)===t&&a("shelf"),f("已删除","success"),H(null)}})},o=async t=>{var T;const g=(T=t.target.files)==null?void 0:T[0];if(g)try{const _=await ze(g,{maxWidth:800,quality:.8});Z(_)}catch{f("图片处理失败","error")}},d=()=>{re&&Z(re)},j=t=>{Y(t||{id:`proto-${Date.now()}`,name:"",role:"主角",description:""}),xe(!0)},z=()=>{if(!O||!O.name.trim()){f("角色名不能为空","error");return}Q(t=>t.find(T=>T.id===O.id)?t.map(T=>T.id===O.id?O:T):[...t,O]),xe(!1),Y(null)},k=t=>{const g={id:`proto-${Date.now()}-${Math.random()}`,name:t.name,role:t.role||"主角",description:t.description||""};Q(T=>[...T,g]),pe(!1),f(`已导入角色: ${t.name}`,"success")},L=t=>{const g=`

【${t.title}】
${t.content}`;ae(T=>(T+g).trim()),B(!1),f(`已导入设定: ${t.title}`,"success")},U=({p:t,onDelete:g,onClick:T})=>e.jsxs("div",{onClick:T,className:"bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative group cursor-pointer hover:border-slate-400 transition-colors",children:[e.jsxs("div",{className:"font-bold text-slate-800 text-sm flex justify-between",children:[e.jsx("span",{children:t.name}),e.jsx("span",{className:"text-[10px] bg-slate-100 px-1.5 rounded text-slate-500 font-normal",children:t.role})]}),e.jsx("div",{className:"text-xs text-slate-500 mt-1 line-clamp-2",children:t.description||"暂无描述"}),g&&e.jsx("button",{onClick:_=>{_.stopPropagation(),g()},className:"absolute top-1 right-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",children:"×"})]});return h==="library"?e.jsxs("div",{className:"h-full w-full bg-slate-50 flex flex-col font-sans",children:[e.jsx("div",{className:"h-20 bg-white/80 backdrop-blur-md flex items-end pb-3 px-6 border-b border-slate-200 shrink-0 sticky top-0 z-20",children:e.jsxs("div",{className:"flex justify-between items-center w-full",children:[e.jsx("button",{onClick:()=>a("shelf"),className:"p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-90 transition-transform",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6 text-slate-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5 8.25 12l7.5-7.5"})})}),e.jsx("span",{className:"font-bold text-slate-800 text-lg tracking-wide",children:"角色库"}),e.jsx("div",{className:"w-8"})]})}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar",children:[e.jsxs("section",{children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2",children:[e.jsx("span",{children:"🤖"})," 系统角色 (AI Collaborators)"]}),e.jsx("div",{className:"grid grid-cols-2 gap-4",children:c.map(t=>e.jsxs("div",{onClick:()=>{ve(t),F(!0)},className:"bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 cursor-pointer hover:shadow-md transition-all active:scale-95",children:[e.jsx("img",{src:t.avatar,className:"w-16 h-16 rounded-full object-cover border-2 border-slate-50"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-bold text-slate-700 text-sm",children:t.name}),e.jsx("div",{className:"text-[10px] text-slate-400 mt-1 px-2 py-0.5 bg-slate-50 rounded-full",children:"共创者"})]})]},t.id))})]}),e.jsxs("section",{children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2",children:[e.jsx("span",{children:"🎭"})," 历史剧中人 (From History)"]}),fe.length===0?e.jsx("div",{className:"text-center py-8 text-slate-400 text-xs",children:"暂无历史角色数据"}):e.jsx("div",{className:"grid grid-cols-1 gap-3",children:fe.map((t,g)=>e.jsxs("div",{className:"bg-white p-4 rounded-xl border border-slate-200 shadow-sm",children:[e.jsxs("div",{className:"flex justify-between items-start mb-2",children:[e.jsx("span",{className:"font-bold text-slate-800",children:t.name}),e.jsx("span",{className:"text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100",children:t.role})]}),e.jsx("p",{className:"text-xs text-slate-500 leading-relaxed line-clamp-3",children:t.description||"暂无描述"})]},g))})]})]}),e.jsx(te,{isOpen:je,title:(ee==null?void 0:ee.name)||"角色风格",onClose:()=>F(!1),children:e.jsx("div",{className:"max-h-[60vh] overflow-y-auto space-y-4 p-1",children:ee?e.jsx("div",{className:"bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap",children:ee.writerPersona||Ce(ee)}):null})})]}):h==="shelf"?e.jsxs("div",{className:"h-full w-full bg-slate-50 flex flex-col font-sans relative",children:[e.jsx(Pe,{isOpen:!!x,title:(x==null?void 0:x.title)||"",message:(x==null?void 0:x.message)||"",variant:x==null?void 0:x.variant,confirmText:(x==null?void 0:x.confirmText)||(x!=null&&x.onConfirm?"确认":"OK"),onConfirm:(x==null?void 0:x.onConfirm)||(()=>H(null)),onCancel:()=>H(null)}),e.jsxs("div",{className:"h-24 flex items-end justify-between px-6 pb-6 bg-white/80 backdrop-blur-md z-20 shrink-0 border-b border-slate-100",children:[e.jsx("button",{onClick:s,className:"p-3 -ml-3 rounded-full hover:bg-slate-100 active:scale-95 transition-all",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",className:"w-6 h-6 text-slate-600",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5 8.25 12l7.5-7.5"})})}),e.jsx("span",{className:"font-black text-2xl text-slate-800 tracking-tight",children:"我的手稿"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>a("library"),className:"w-10 h-10 bg-white text-slate-600 border border-slate-200 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-slate-50",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"})})}),e.jsx("button",{onClick:()=>{a("create"),ge()},className:"w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform hover:bg-black",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.5,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]})]}),e.jsxs("div",{className:"p-6 grid grid-cols-2 gap-5 overflow-y-auto pb-24",children:[r.map(t=>{const g=be(t.coverStyle),T=t.segments.reduce((W,y)=>W+(y.type==="story"?y.content.length:0),0),_=t.coverImage?{backgroundImage:`url(${t.coverImage})`,backgroundSize:"cover",backgroundPosition:"center"}:{};return e.jsxs("div",{onClick:()=>{$(t),a("write")},className:"group relative aspect-auto min-h-[14rem] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer flex flex-col",children:[e.jsxs("div",{className:`h-28 shrink-0 ${g.bg} relative p-4 flex flex-col justify-end`,style:_,children:[e.jsx("div",{className:`absolute inset-0 ${t.coverImage?"bg-black/30":""}`}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("h3",{className:`font-bold text-lg leading-tight line-clamp-2 ${t.coverImage?"text-white drop-shadow-md":g.text}`,children:t.title}),t.subtitle&&e.jsx("p",{className:`text-[10px] font-bold opacity-80 uppercase tracking-wide truncate ${t.coverImage?"text-white":g.text}`,children:t.subtitle})]})]}),e.jsxs("div",{className:"p-4 flex-1 flex flex-col justify-between",children:[e.jsx("p",{className:"text-xs text-slate-500 line-clamp-3 leading-relaxed mb-3",children:t.summary||"暂无简介..."}),e.jsxs("div",{className:"flex items-center justify-between pt-3 border-t border-slate-50",children:[e.jsx("div",{className:"flex -space-x-2",children:c.filter(W=>t.collaboratorIds.includes(W.id)).map(W=>e.jsx("img",{src:W.avatar,className:"w-6 h-6 rounded-full border-2 border-white object-cover"},W.id))}),e.jsxs("span",{className:"text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded-full",children:[(T/1e3).toFixed(1),"k 字"]})]})]}),e.jsx("button",{onClick:W=>{W.stopPropagation(),n(t.id)},className:"absolute top-2 right-2 text-slate-400/50 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur rounded-full",children:"×"})]},t.id)}),r.length===0&&e.jsxs("div",{className:"col-span-2 flex flex-col items-center justify-center h-64 text-slate-300 gap-3",children:[e.jsx("span",{className:"text-4xl opacity-50 grayscale",children:"🖋️"}),e.jsx("span",{className:"text-sm font-sans",children:"点击右上角，开始创作"})]})]})]}):h==="create"||h==="settings"?e.jsxs("div",{className:"h-full w-full bg-slate-50 flex flex-col font-sans relative",children:[e.jsx(Pe,{isOpen:!!x,title:(x==null?void 0:x.title)||"",message:(x==null?void 0:x.message)||"",variant:x==null?void 0:x.variant,confirmText:(x==null?void 0:x.confirmText)||(x!=null&&x.onConfirm?"确认":"OK"),onConfirm:(x==null?void 0:x.onConfirm)||(()=>H(null)),onCancel:()=>H(null)}),e.jsxs("div",{className:"h-16 flex items-center justify-between px-4 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-20",children:[e.jsx("button",{onClick:()=>a(h==="create"?"shelf":"write"),className:"text-slate-500 text-sm",children:"取消"}),e.jsx("span",{className:"font-bold text-slate-800",children:h==="create"?"新建书稿":"小说设定"}),e.jsx("button",{onClick:h==="create"?ke:Me,className:"bg-slate-800 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md active:scale-95 transition-transform",children:"保存"})]}),e.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-8 pb-20",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("input",{value:M,onChange:t=>R(t.target.value),placeholder:"书名",className:"w-full text-2xl font-bold bg-transparent border-b border-slate-200 py-2 outline-none focus:border-slate-800 font-serif"}),e.jsx("input",{value:u,onChange:t=>S(t.target.value),placeholder:"卷名/副标题",className:"w-full text-sm font-bold bg-transparent border-b border-slate-200 py-2 outline-none focus:border-slate-800 text-slate-600"}),e.jsx("textarea",{value:q,onChange:t=>K(t.target.value),placeholder:"一句话简介...",className:"w-full h-20 bg-slate-100 rounded-xl p-3 text-sm resize-none outline-none"}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase mb-2 block",children:"内页风格"}),e.jsx("div",{className:"flex gap-3 overflow-x-auto pb-2 no-scrollbar",children:me.map(t=>e.jsx("button",{onClick:()=>E(t),className:`w-12 h-16 rounded-md shadow-sm border-2 shrink-0 ${t.bg} ${C.id===t.id?"border-slate-800 scale-105":"border-transparent"}`},t.id))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase mb-2 block",children:"自定义封面"}),e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsxs("div",{onClick:()=>{var t;return(t=we.current)==null?void 0:t.click()},className:"w-16 h-24 bg-slate-100 rounded-md border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-slate-500 relative overflow-hidden",children:[N?e.jsx("img",{src:N,className:"w-full h-full object-cover"}):e.jsx("span",{className:"text-xs text-slate-400",children:"+"}),e.jsx("input",{type:"file",ref:we,className:"hidden",accept:"image/*",onChange:o})]}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx("input",{value:re,onChange:t=>oe(t.target.value),onBlur:d,placeholder:"粘贴图片链接...",className:"w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-400"}),N&&e.jsx("button",{onClick:()=>{Z(""),oe("")},className:"text-xs text-red-400 underline",children:"清除封面"})]})]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase block",children:"世界观设定"}),e.jsxs("button",{onClick:()=>B(!0),className:"text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-100 flex items-center gap-1",children:[e.jsx("span",{children:"📚"})," 导入世界书"]})]}),e.jsx("textarea",{value:se,onChange:t=>ae(t.target.value),placeholder:"世界观设定...",className:"w-full h-32 bg-white border border-slate-200 rounded-xl p-3 text-sm resize-none outline-none focus:border-slate-400"})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase block",children:"共创者"}),e.jsx("div",{className:"flex gap-3 overflow-x-auto pb-2 no-scrollbar",children:c.map(t=>e.jsxs("div",{onClick:()=>{const g=new Set(X);g.has(t.id)?g.delete(t.id):g.add(t.id),ne(g)},className:`flex flex-col items-center gap-2 cursor-pointer transition-opacity ${X.has(t.id)?"opacity-100":"opacity-50 grayscale"}`,children:[e.jsx("img",{src:t.avatar,className:"w-12 h-12 rounded-full object-cover shadow-sm"}),e.jsx("span",{className:"text-[10px] font-bold text-slate-600",children:t.name})]},t.id))})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase",children:"剧中人"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>pe(!0),className:"text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-bold hover:bg-indigo-100 border border-indigo-100",children:"📂 导入"}),e.jsx("button",{onClick:()=>j(),className:"text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 hover:bg-slate-200 transition-colors",children:"+ 添加"})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-3",children:le.map((t,g)=>e.jsx(U,{p:t,onClick:()=>j(t),onDelete:()=>Q(le.filter((T,_)=>_!==g))},t.id))})]})]}),e.jsx(te,{isOpen:G,title:"编辑角色",onClose:()=>xe(!1),footer:e.jsx("button",{onClick:z,className:"w-full py-3 bg-slate-800 text-white font-bold rounded-2xl",children:"保存"}),children:O&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase block mb-1",children:"姓名"}),e.jsx("input",{value:O.name,onChange:t=>Y({...O,name:t.target.value}),className:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase block mb-1",children:"定位"}),e.jsx("input",{value:O.role,onChange:t=>Y({...O,role:t.target.value}),className:"w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm",placeholder:"主角 / 反派"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-xs font-bold text-slate-400 uppercase block mb-1",children:"设定"}),e.jsx("textarea",{value:O.description,onChange:t=>Y({...O,description:t.target.value}),className:"w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm resize-none leading-relaxed"})]})]})}),e.jsxs(te,{isOpen:ue,title:"导入角色",onClose:()=>pe(!1),children:[e.jsxs("div",{className:"flex p-1 bg-slate-100 rounded-xl mb-3",children:[e.jsx("button",{onClick:()=>J("system"),className:`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${D==="system"?"bg-white shadow text-indigo-600":"text-slate-400"}`,children:"系统角色 (AI)"}),e.jsx("button",{onClick:()=>J("history"),className:`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${D==="history"?"bg-white shadow text-indigo-600":"text-slate-400"}`,children:"历史角色"})]}),e.jsxs("div",{className:"max-h-[50vh] overflow-y-auto no-scrollbar space-y-3 p-1",children:[D==="system"&&c.map(t=>e.jsxs("button",{onClick:()=>k({name:t.name,role:"客串",description:t.description}),className:"w-full flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 shadow-sm active:scale-95 transition-all text-left",children:[e.jsx("img",{src:t.avatar,className:"w-8 h-8 rounded-full object-cover"}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"font-bold text-sm text-slate-700",children:t.name}),e.jsx("div",{className:"text-[10px] text-slate-400 truncate",children:t.description})]})]},t.id)),D==="history"&&fe.map((t,g)=>e.jsxs("button",{onClick:()=>k(t),className:"w-full flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 shadow-sm active:scale-95 transition-all text-left",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200",children:t.name[0]}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("div",{className:"font-bold text-sm text-slate-700",children:t.name}),e.jsxs("div",{className:"text-[10px] text-slate-400 truncate",children:[t.role," - ",t.description||"无描述"]})]})]},`hist-${g}`))]})]}),e.jsx(te,{isOpen:ie,title:"导入世界书设定",onClose:()=>B(!1),children:e.jsx("div",{className:"max-h-[50vh] overflow-y-auto no-scrollbar space-y-2 p-1",children:P.map(t=>e.jsxs("button",{onClick:()=>L(t),className:"w-full text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-300 bg-white shadow-sm active:scale-95 transition-all",children:[e.jsx("div",{className:"font-bold text-slate-700 text-sm",children:t.title}),e.jsx("div",{className:"text-[10px] text-slate-400 mt-1",children:t.category||"未分类"})]},t.id))})})]}):h==="write"&&l?e.jsx(Ve,{activeBook:l,updateNovel:p,characters:c,userProfile:I,apiConfig:w,onBack:()=>a("shelf"),updateCharacter:v,collaborators:de,targetCharId:he,setTargetCharId:ye,onOpenSettings:Ie}):null};export{Ke as default};
