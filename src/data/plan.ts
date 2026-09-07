export const contest = {
  name: "1010数字人节 · 2026全球智能体大赛",
  track: "赛道A · 高校组",
  theme: "文商旅",
  deadline: "2026-09-20 24:00",
  finals: "2026-10-10",
  platform: "https://workbrain.cn/chat/",
  signup: "https://di.workbrain.cn/webapp/r3vh7NpFy9qm64ke/17/releases/",
  home: "https://workbrain.cn/",
  opc: "https://opc.workbrain.cn/",
};

export const nav = [
  { href: "#decision", label: "选题" },
  { href: "#agents", label: "智能体" },
  { href: "#collab", label: "协同" },
  { href: "#journeys", label: "剧本" },
  { href: "#knowledge", label: "知识库" },
  { href: "#scoring", label: "评分" },
  { href: "#sprint", label: "排期" },
  { href: "#submit", label: "提交" },
];

export const decisionReasons = [
  {
    title: "对得上平台叙事",
    body: "智小途首页就把数字导游、文旅宣传、IP打造、智能客服放在同一套场景里。文商旅不是硬套赛题，而是把官方能力拼成一条可演示的城市场景。",
  },
  {
    title: "对得上评委现场",
    body: "总决赛在成都 1010 数字人节。用锦官城做样本，评委能立刻听懂，也方便现场路演点名宽窄巷子、大熊猫、川剧变脸。",
  },
  {
    title: "对得上「≥10个有效智能体」",
    body: "文、商、旅天然拆岗：规划、导览、非遗、美食、购物、交通、住宿、应急、翻译、商户、复盘。每个岗都有独立知识库，又必须共用一块行程白板，关联不是贴标签，是跑得通。",
  },
  {
    title: "对得上公众投票",
    body: "9月21–27日实名投票。旅游手账、数字人讲解、暴雨改签，比纯企业内部流程更好传播，也更适合做成 90 秒短视频。",
  },
];

export const themeCompare = [
  {
    id: "culture",
    name: "文商旅",
    pick: "主推",
    score: "推荐度 ★★★★★",
    why: "官方场景最密、视觉最好看、游客/商户双边能做出闭环。",
    risk: "景点资料要核实，避免幻觉带错路。",
  },
  {
    id: "edu",
    name: "教育",
    pick: "备选",
    score: "推荐度 ★★★★",
    why: "高校队伍最熟悉，知识库好收集，适合做「一校一脑」。",
    risk: "同类作品会非常多，差异化难。",
  },
  {
    id: "biz",
    name: "企业服务",
    pick: "备选",
    score: "推荐度 ★★★★",
    why: "最贴 WorkBrain V6.0 的 OPC 一人公司故事。",
    risk: "缺少真实企业数据时，Live Demo 发虚。",
  },
  {
    id: "med",
    name: "社区医疗",
    pick: "慎选",
    score: "推荐度 ★★★",
    why: "社会价值高，心理咨询/养生是平台现成场景。",
    risk: "医疗合规红线多，评委容易追问「会不会误诊」。",
  },
];

export type Agent = {
  id: string;
  no: string;
  name: string;
  role: string;
  persona: string;
  layer: "调度层" | "文" | "商" | "旅" | "保障层" | "进化层";
  greeting: string;
  inputs: string[];
  outputs: string[];
  knowledge: string[];
  calls: string[];
  calledBy: string[];
  mustHave: string;
};

export const agents: Agent[] = [
  {
    id: "xiaotu",
    no: "01",
    name: "小途",
    role: "锦官总调度",
    persona: "沉稳、会拆任务、不抢专家的话。像旅行团里真正管事的地接。",
    layer: "调度层",
    greeting:
      "我是小途。你说一句「今晚想吃不排队的火锅」，我来组班子，不让你在十二个窗口之间来回切。",
    inputs: ["用户原话", "行程白板当前状态", "天气/拥堵事件"],
    outputs: ["意图标签", "任务拆解单", "指定接手智能体", "冲突仲裁结果"],
    knowledge: ["调度协议", "禁答与升级清单", "十二岗职责表", "用户画像字段"],
    calls: [
      "lulu",
      "jinli",
      "zhizao",
      "lala",
      "jinxiu",
      "xingxing",
      "anan",
      "antu",
      "yitu",
      "shijing",
      "huixiang",
    ],
    calledBy: ["所有专家在完成后回传"],
    mustHave: "空间唯一入口。评委打开链接，第一个说话的必须是它。",
  },
  {
    id: "lulu",
    no: "02",
    name: "路路",
    role: "行程架构师",
    persona: "时间强迫症，会算步行分钟数和饭点空档。",
    layer: "旅",
    greeting: "给我约束：几天、几个人、预算、能不能走路。我给你一块能改的行程白板。",
    inputs: ["天数/人数/预算", "体力与无障碍", "天气", "商户可接单时段"],
    outputs: ["分时行程槽", "备选 Plan B", "改签建议"],
    knowledge: ["成都两日/三日黄金线", "景点开放时间", "错峰表"],
    calls: ["jinli", "lala", "xingxing", "anan", "shijing"],
    calledBy: ["xiaotu", "antu", "huixiang"],
    mustHave: "任何改签都写回同一块白板，禁止各说各的行程。",
  },
  {
    id: "jinli",
    no: "03",
    name: "锦里",
    role: "数字导游",
    persona: "会讲故事，不背词条。到点才开口，不在地铁里讲寺庙历史。",
    layer: "旅",
    greeting: "你到了哪儿，我就讲哪儿。要深度，我把非遗官织造叫来。",
    inputs: ["当前 POI", "用户停留时长", "是否带小孩"],
    outputs: ["三分钟导览", "拍照点", "下一段步行指引"],
    knowledge: ["宽窄/锦里/熊猫基地/杜甫草堂/武侯祠", "门票须知"],
    calls: ["zhizao", "xingxing", "lala"],
    calledBy: ["xiaotu", "lulu"],
    mustHave: "每个景点准备「30秒/3分钟/10分钟」三档讲解，适配演示。",
  },
  {
    id: "zhizao",
    no: "04",
    name: "织造",
    role: "非遗讲述官",
    persona: "慢、准、有典故。负责「文」这一笔，不负责卖货。",
    layer: "文",
    greeting: "蜀绣、川剧、盖碗茶，我只讲真的。想把文化带回家，我交给锦绣。",
    inputs: ["文化主题", "观众年龄", "是否要体验项目"],
    outputs: ["典故", "体验预约建议", "文创主题标签"],
    knowledge: ["省级/国家级非遗名录摘要", "川剧变脸边界说明", "茶馆礼仪"],
    calls: ["jinxiu", "jinli"],
    calledBy: ["xiaotu", "jinli", "jinxiu"],
    mustHave: "文化内容必须可溯源，知识库标注出处，评委追问不怕。",
  },
  {
    id: "lala",
    no: "05",
    name: "辣辣",
    role: "川味食探",
    persona: "嘴刁但护胃。先问辣度、忌口、排队忍耐，再推荐。",
    layer: "商",
    greeting: "别问「成都吃什么」。告诉我辣不辣、排队能不能忍、预算几档。",
    inputs: ["忌口/辣度", "餐段", "排队阈值", "是否有婴幼儿"],
    outputs: ["三家候选+理由", "排队预警", "给商户的需求包"],
    knowledge: ["火锅/串串/兔头/甜水面分区", "踩雷清单", "排队经验"],
    calls: ["shijing", "xingxing", "lulu"],
    calledBy: ["xiaotu", "lulu", "jinli"],
    mustHave: "推荐必须带「为什么不选另外两家」，体现决策而不是榜单。",
  },
  {
    id: "jinxiu",
    no: "06",
    name: "锦绣",
    role: "文创买手",
    persona: "会砍预算，不推廉价地摊货。把非遗主题翻译成可买的东西。",
    layer: "商",
    greeting: "织造负责讲，我负责让你带得走。预算说一声。",
    inputs: ["文化主题标签", "预算", "行李限制", "是否送礼"],
    outputs: ["商品短清单", "店铺位置", "价格带"],
    knowledge: ["文创品类", "伴手礼礼仪", "机场/宽窄店铺差异"],
    calls: ["shijing", "zhizao", "xingxing"],
    calledBy: ["xiaotu", "zhizao"],
    mustHave: "每件商品连回一个文化主题，证明「文」和「商」不是两张皮。",
  },
  {
    id: "xingxing",
    no: "07",
    name: "行行",
    role: "出行调度",
    persona: "算路的人。地铁、步行、打车、共享单车，按体力选。",
    layer: "旅",
    greeting: "下一站我来排。下雨我改室内接驳，不让路路的行程空转。",
    inputs: ["起终点", "携带行李", "天气", "高峰"],
    outputs: ["接驳方案", "耗时", "费用估计"],
    knowledge: ["地铁图摘要", "熊猫基地交通", "春熙路步行半径"],
    calls: ["lulu", "antu"],
    calledBy: ["xiaotu", "lulu", "lala", "jinli", "anan"],
    mustHave: "演示里至少做一次「因雨改道」，让协同看得见。",
  },
  {
    id: "anan",
    no: "08",
    name: "安安",
    role: "宿遇管家",
    persona: "细。问退房、行李寄存、凌晨到达，不问风景。",
    layer: "旅",
    greeting: "住哪里决定你明天几点能出门。我先把睡觉的事按住。",
    inputs: ["入住时段", "人数房型", "靠近地铁还是景点"],
    outputs: ["住宿三选", "寄存/夜到达方案"],
    knowledge: ["商圈住宿分层", "民宿注意", "酒店入住材料"],
    calls: ["xingxing", "lulu"],
    calledBy: ["xiaotu", "lulu", "antu"],
    mustHave: "住宿必须写进行程白板的夜间槽，不能独立聊天。",
  },
  {
    id: "antu",
    no: "09",
    name: "安途",
    role: "应急护卫",
    persona: "话少、优先级最高。一出手就打断别人。",
    layer: "保障层",
    greeting: "走散、生病、暴雨、证件丢失，先找我。其它智能体全部让路。",
    inputs: ["紧急类型", "位置", "是否未成年人"],
    outputs: ["处置步骤", "附近医院/派出所", "行程冻结/改签指令"],
    knowledge: ["三甲医院", "报警指引", "旅游保险要点", "不提供诊疗结论"],
    calls: ["lulu", "xingxing", "anan", "xiaotu"],
    calledBy: ["xiaotu", "任何专家升级"],
    mustHave: "明确「不诊断、不给药」，只做分诊和路径，避开医疗红线。",
  },
  {
    id: "yitu",
    no: "10",
    name: "译途",
    role: "多语通译",
    persona: "中英日韩泰。大赛有泰国、马来西亚赛区，这一岗是给评委看格局。",
    layer: "保障层",
    greeting: "你用哪国语言，我把成都话里的「巴适」翻译成对方听得懂的热情。",
    inputs: ["源语言", "场景（点餐/问路/买票）"],
    outputs: ["对照译文", "文化注释", "转交对应专家"],
    knowledge: ["文旅高频句", "辣度表达", "忌讳"],
    calls: ["lala", "jinli", "xiaotu"],
    calledBy: ["xiaotu", "jinli", "lala"],
    mustHave: "演示中插 20 秒外语对话，证明空间不是只服务本地学生。",
  },
  {
    id: "shijing",
    no: "11",
    name: "市井",
    role: "商户运营官",
    persona: "站商户这边。收的是游客需求包，回的是可接单时段和库存。",
    layer: "商",
    greeting: "游客想吃不排队的火锅，我告诉辣辣哪家今晚真的有位。不是再抄一张榜单。",
    inputs: ["需求包（餐型/时段/人数）", "商户营业状态"],
    outputs: ["可接单列表", "满员/优惠", "核销话术"],
    knowledge: ["模拟商户档案 20 家", "高峰规则", "优惠券模板"],
    calls: ["lala", "jinxiu", "lulu"],
    calledBy: ["lala", "jinxiu", "lulu"],
    mustHave: "这是作品差异点：同一空间里同时有 C 端和 B 端，文商旅的「商」才算落地。",
  },
  {
    id: "huixiang",
    no: "12",
    name: "回响",
    role: "复盘观察员",
    persona: "记者兼质检。旅程结束才主场，过程中默默记日志。",
    layer: "进化层",
    greeting: "晚上我给你一本旅程手账，也给评委一份「这十二个智能体到底有没有协作」的证据。",
    inputs: ["全程事件日志", "用户满意度", "失败任务"],
    outputs: ["旅程手账", "协作图谱", "知识库补丁建议"],
    knowledge: ["评分口径", "日志字段", "叙事模板"],
    calls: ["xiaotu", "lulu"],
    calledBy: ["xiaotu"],
    mustHave: "把隐性协同显式化。答辩时打开回响，比空口说「我们有关联」有用。",
  },
];

export const collabLayers = [
  {
    name: "一块白板",
    title: "TripBoard 共享行程状态",
    body: "所有智能体读写同一份状态：用户画像、分时槽位、预算余额、约束、事件日志。谁改了行程，谁必须签名。禁止私聊里另起一份计划。",
  },
  {
    name: "四种协同",
    title: "顺序 / 并行 / 升级 / 回流",
    body: "顺序：小途→路路→锦里。并行：辣辣问市井的同时，行行算路。升级：安途一票否决。回流：回响把失败案例写回知识库。",
  },
  {
    name: "事件总线",
    title: "天气、排队、预算、走散",
    body: "WEATHER_ALERT、QUEUE_SPIKE、BUDGET_BREACH、USER_FATIGUE、MERCHANT_OFFER、EMERGENCY。有事件才调度，没有事件不闲聊。",
  },
  {
    name: "人设边界",
    title: "专家不抢话，调度不专业",
    body: "小途不讲蜀绣，织造不订酒店。评委最容易拆穿的，就是一个万能机器人换了十二个名字。",
  },
];

export const events = [
  { code: "WEATHER_ALERT", from: "安途", to: "路路 / 行行", effect: "室外项改室内，重排接驳" },
  { code: "QUEUE_SPIKE", from: "市井", to: "辣辣 / 路路", effect: "换店或错峰，不让游客空等" },
  { code: "BUDGET_BREACH", from: "路路", to: "锦绣 / 辣辣", effect: "降档商品与餐饮" },
  { code: "USER_FATIGUE", from: "锦里", to: "路路 / 安安", effect: "砍景点，提前回酒店" },
  { code: "MERCHANT_OFFER", from: "市井", to: "辣辣 / 锦绣", effect: "把真实可接单插入推荐" },
  { code: "EMERGENCY", from: "安途", to: "全体暂停", effect: "冻结行程，只保留处置通道" },
];

export const journeys = [
  {
    id: "family",
    title: "主路径 · 一家三口两日游",
    duration: "演示 90–120 秒",
    goal: "证明空间完整：从接站到手账，十二岗都露脸，但不平均用力。",
    beats: [
      "成都东站到站。小途识别「两天、带小孩、怕辣、预算中等」。",
      "路路写出 D1 宽窄+锦里+火锅，D2 熊猫基地+草堂，夜间槽交给安安。",
      "宽窄巷子，锦里讲 3 分钟，小孩问绣花，转织造。",
      "织造讲完蜀绣，锦绣给三件可带走的绣片，预算未破。",
      "饭点辣辣给三家店，市井回「第三家 20 分钟内有位」，路路改晚餐槽。",
      "回响生成手账：走了哪、买了何、协作了几次。",
    ],
  },
  {
    id: "rain",
    title: "加分路径 · 暴雨改签",
    duration: "演示 40 秒",
    goal: "这是「智能体有关联」的铁证。没有事件总线的作品，这里会直接露馅。",
    beats: [
      "安途广播 WEATHER_ALERT：未来 90 分钟暴雨。",
      "路路把熊猫基地户外项改到太古里室内。",
      "行行重排地铁接驳，取消共享单车。",
      "安安确认酒店可提前寄存行李。",
      "小途用一句话向用户交代：改了什么、为什么、下一站怎么走。",
    ],
  },
  {
    id: "b2c",
    title: "差异路径 · 商户接单",
    duration: "演示 30 秒",
    goal: "把「商」做实。评委问「文商旅的商在哪」，直接切到市井视角。",
    beats: [
      "切换到商户端：火锅店老板打开市井。",
      "看到需求包：4 人、微辣、19:30、不要排队。",
      "回「可接 19:40，送锅底升级」。",
      "游客侧辣辣立刻把这家顶到第一，路路写回白板。",
    ],
  },
];

export const knowledgePacks = [
  {
    agent: "小途",
    files: ["00-调度协议.md", "00-意图标签表.md", "00-升级与禁答.md"],
  },
  {
    agent: "路路",
    files: ["成都两日黄金线.md", "开放时间与错峰.csv", "行程白板字段.md"],
  },
  {
    agent: "锦里 / 织造",
    files: ["POI导览三档稿.md", "非遗名录摘要.md", "出处与引用.md"],
  },
  {
    agent: "辣辣 / 锦绣 / 市井",
    files: ["模拟商户20家.json", "忌口与辣度.md", "伴手礼价格带.md"],
  },
  {
    agent: "行行 / 安安",
    files: ["地铁接驳摘要.md", "住宿分层.md", "行李与夜到达.md"],
  },
  {
    agent: "安途 / 译途 / 回响",
    files: ["应急黄页.md", "多语高频句.md", "日志与手账模板.md"],
  },
];

export const scoring = [
  {
    axis: "空间完整性",
    weight: "评委第一眼",
    tactic:
      "十二个智能体全部可点开、有人设、有知识库、有开场白。入口只有小途。空间简介写清「一块白板、四种协同、双边用户」。",
  },
  {
    axis: "场景价值",
    weight: "是否真能用",
    tactic:
      "游客能完成「来—玩—吃—住—买—走」。商户能接到需求包。应急岗明确不做诊疗。价值是闭环，不是功能清单。",
  },
  {
    axis: "创新体验",
    weight: "和别人的差别",
    tactic:
      "创新不靠堆模型名。创新是：C/B 同空间、事件总线改签、回响把协作可视化、译途对准国际赛区。",
  },
  {
    axis: "答辩呈现",
    weight: "9/28–30 与 10/10",
    tactic:
      "三分钟只演一条主路径+一次暴雨。准备「为什么十二个不是重复」的 30 秒回答。路演用回响的协作图谱收尾。",
  },
];

export const sprint = [
  {
    when: "9/7–9/8",
    title: "定稿与账号",
    items: [
      "确认赛道A、文商旅、队长组队",
      "注册智小途，创建「途见锦官」空间",
      "十二个智能体建档：名字、开场白、职责边界",
    ],
  },
  {
    when: "9/9–9/11",
    title: "知识库灌装",
    items: [
      "写调度协议和行程白板字段",
      "做 20 家模拟商户，不要用含糊的「网红店」",
      "POI 三档讲解稿，每条标注出处",
    ],
  },
  {
    when: "9/12–9/14",
    title: "打通协同",
    items: [
      "固定交接话术：小途如何点名下一岗",
      "跑通暴雨改签和商户接单两条支线",
      "给每个智能体至少 8 轮互测问答",
    ],
  },
  {
    when: "9/15–9/17",
    title: "包装与视频",
    items: [
      "数字人人设与封面统一视觉",
      "录 90 秒主路径 + 40 秒暴雨 + 30 秒商户",
      "写说明文档：架构图、职责表、知识库清单",
    ],
  },
  {
    when: "9/18–9/20",
    title: "提交与投票预热",
    items: [
      "校验十二个智能体全部有效、可对话",
      "提交空间链接、视频、文档、封面简介",
      "准备 9/21 投票物料：一句话、海报、二维码",
    ],
  },
];

export const submitItems = [
  { name: "参赛空间在线链接", note: "智小途空间，入口为小途，十二岗均可访问" },
  { name: "空间有效性校验", note: "每个智能体能独立对话，不是空壳" },
  { name: "演示视频", note: "建议 2–3 分钟，含主路径+暴雨+商户" },
  { name: "说明文档", note: "本站内容可导出为文档，补团队分工与知识库列表" },
  { name: "作品封面 + 简介", note: "一句话：十二个智能体，一块行程白板，服务游客也服务商户" },
];

export const alternatives = [
  {
    name: "教育 · 「一校智途」",
    summary:
      "同样十二岗，改成迎新、课表、学业、心理、就业、宿舍、社团、图书馆、教务、资助、安全、复盘。关联靠「学生画像」而不是行程白板。",
    agents:
      "迎新官、课表官、学业导师、心理关怀（只做倾听与转介）、就业参谋、宿舍管家、社团导览、图书馆员、教务通、资助助手、安全员、学情复盘。",
    when: "如果拿不到任何文旅资料，或学校能提供真实手册，就切这条。",
  },
  {
    name: "企业服务 · 「一人公司」",
    summary:
      "对标 OPC：老板一个人，背后是产品、设计、研发、投放、客服、财务。关联靠「项目看板」。",
    agents:
      "总助、需求官、文案、视觉、开发、投放、客服、财务、合规、数据、供应商、复盘。",
    when: "如果队里有真实小生意或校园摊位数据，这条对专家评委更狠。",
  },
];

export const platformMap = [
  { feature: "一句话创建智能体", use: "先快速起十二个壳，再逐个喂知识库" },
  { feature: "智能体空间 / 组建智能队", use: "一个空间即作品；小途当队长" },
  { feature: "私有知识库", use: "每岗独立库 + 一份共享白板说明" },
  { feature: "数字人形象", use: "调度朱红、文青黛、商金、旅石绿，四色分层" },
  { feature: "多模型", use: "讲解用稳的，调度用快的，不要十二个全换模型炫技" },
  { feature: "任务社区 / OPC", use: "作品简介里写清可复制到其它城市" },
];
