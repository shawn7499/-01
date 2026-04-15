export type SiteLang = 'en' | 'zh'

type LocalizedText = Record<SiteLang, string>
type LocalizedList = Record<SiteLang, string[]>

export type IncubatingProject = {
  id: string
  title: LocalizedText
  summary: LocalizedText
  strapline: LocalizedText
  stage: LocalizedText
  why: LocalizedList
  build: LocalizedList
  proof: LocalizedList
  funding: LocalizedList
}

export const incubatingHomeCopy = {
  en: {
    eyebrow: 'Project Atlas',
    title: 'Independent ideas in progress',
    description:
      'A growing directory of standalone projects I want to build next, from local life infrastructure to decentralized AI.',
    hoverHint: 'Hover to preview the project directory',
    browseTracks: 'Browse Projects',
    openPage: 'Open Ideas Page',
    jumpToProject: 'Jump to section',
  },
  zh: {
    eyebrow: '项目实验室',
    title: '正在酝酿的独立项目',
    description:
      '这里整理的是我后续想做、但还没有完全做好的独立项目，从本地生活基础设施到去中心化 AI，都会逐步展开。',
    hoverHint: '鼠标悬浮即可预览项目目录',
    browseTracks: '浏览项目',
    openPage: '打开想法页面',
    jumpToProject: '跳转到对应项目',
  },
} as const

export const incubatingPageCopy = {
  en: {
    badge: 'Ideas Page',
    title: 'Project Atlas',
    subtitle:
      'This page is a parent directory for standalone ideas in progress. Each track is an independent long-term project, not a single merged app.',
    noteTitle: 'How to read this page',
    note:
      'I am using this space to map the projects I want to build next. The content will keep evolving, but each section already has a clear product direction, validation target, and capital outline.',
    directoryEyebrow: 'Project Directory',
    directoryTitle: 'Enter each project from here',
    directoryDescription:
      'Use the anchors below to jump into the specific product track you want to read first.',
    stageLabel: 'Current stage',
    whyLabel: 'Why it matters',
    buildLabel: 'How it could work',
    proofLabel: 'What the first real version must prove',
    fundingLabel: 'Rough capital path',
    openSection: 'Open section',
    backToTop: 'Back to top',
  },
  zh: {
    badge: '想法页面',
    title: '项目实验室',
    subtitle:
      '这个页面是我所有酝酿中项目的父页面。每个方向都是独立的长期项目，不是简单合并成一个应用。',
    noteTitle: '阅读说明',
    note:
      '我先把想做的项目目录、方向、验证目标和融资轮廓整理出来，后面会分别继续补充产品、技术、运营和商业细节。',
    directoryEyebrow: '项目目录',
    directoryTitle: '从这里进入每个独立项目',
    directoryDescription: '下面每个卡片都会跳转到对应项目的详细 section，方便你后面继续逐个扩写。',
    stageLabel: '当前阶段',
    whyLabel: '为什么值得做',
    buildLabel: '大致如何实现',
    proofLabel: '第一版需要证明什么',
    fundingLabel: '粗略融资路径',
    openSection: '进入项目',
    backToTop: '返回顶部',
  },
} as const

export const incubatingProjects: IncubatingProject[] = [
  {
    id: 'local-life',
    title: {
      en: 'Decentralized Local Life Platform',
      zh: '去中心化本地生活平台',
    },
    summary: {
      en: 'Rebuild food delivery, errands, merchant subsidies, and stablecoin settlement into a more transparent local commerce network.',
      zh: '把外卖、跑腿、商家补贴和稳定币结算重新组织成更透明的本地消费网络。',
    },
    strapline: {
      en: 'The core idea is not “Web3 food delivery.” It is redirecting merchant promotion spend into visible user, rider, and retention incentives.',
      zh: '核心不是“链上外卖”这四个字，而是把商家的推广预算直接变成用户、骑手和复购激励。',
    },
    stage: {
      en: 'Research and product framing',
      zh: '研究与产品框架',
    },
    why: {
      en: [
        'Local life platforms extract high commissions while still forcing merchants to buy visibility inside black-box ad systems.',
        'Users only see coupons, not where the subsidy budget actually goes or who pays for growth.',
        'A transparent incentive and settlement model could make merchant acquisition and user retention more efficient.',
      ],
      zh: [
        '传统本地生活平台抽成高，商家还要继续为黑盒流量系统买排名和曝光。',
        '用户只能看到优惠券，却不知道补贴预算到底流向了哪里、是谁在为增长买单。',
        '如果激励与结算模型更透明，商家获客和用户留存的效率都有机会被重做。',
      ],
    },
    build: {
      en: [
        'Start with one dense district or campus, one delivery mode, and a narrow category set instead of a full-city launch.',
        'Let merchants allocate promotion budgets that convert directly into order discounts, rider boosts, or repeat-purchase rewards.',
        'Use stablecoin settlement rails and a centralized fulfillment layer in the first version to keep the experience usable.',
      ],
      zh: [
        '第一版只做一个高密度商圈或校园，控制品类和配送模式，不一开始就做全城通吃。',
        '让商家的推广预算直接转成下单减免、骑手高峰补贴或复购奖励，而不是烧进广告黑箱。',
        '首版先采用中心化履约加稳定币结算，把真实交易闭环跑顺，再逐步增强链上部分。',
      ],
    },
    proof: {
      en: [
        'Can one neighborhood produce repeat orders without extreme unsustainable subsidies?',
        'Will merchants move real promotion budget if the conversion path is more visible than incumbent platforms?',
        'Can riders and users understand the incentive rules without extra educational friction?',
      ],
      zh: [
        '能不能在一个商圈里先跑出真实复购，而不是完全靠失控补贴堆出来？',
        '如果转化路径更透明，商家是否愿意把真实推广预算迁移进平台？',
        '骑手和用户能不能在不增加过多学习成本的情况下理解这套激励规则？',
      ],
    },
    funding: {
      en: [
        'Founder-led prototype: roughly $20k-$80k.',
        'Single-district MVP with operations: roughly $300k-$600k.',
        'City-level validation with logistics depth: likely $800k+.',
      ],
      zh: [
        '创始人主导原型阶段：约 2 万到 8 万美元。',
        '带运营的单商圈 MVP：约 30 万到 60 万美元。',
        '如果要做到城市级验证：大概率需要 80 万美元以上。',
      ],
    },
  },
  {
    id: 'commerce',
    title: {
      en: 'Decentralized Commerce Platform',
      zh: '去中心化电商平台',
    },
    summary: {
      en: 'Give merchants a lower-fee storefront stack with portable customer assets, transparent promotion budgets, and stablecoin-native settlement.',
      zh: '让商家获得更低抽成、可迁移用户资产、推广费用更透明的电商系统。',
    },
    strapline: {
      en: 'This is not only about cheaper checkout. It is about changing how ads, loyalty, and merchant-user relationships are owned.',
      zh: '这不只是更便宜的支付页，而是要重新定义广告、会员和商家与用户之间的关系归属。',
    },
    stage: {
      en: 'Concept design and merchant-side workflow mapping',
      zh: '概念设计与商家流程梳理',
    },
    why: {
      en: [
        'Small merchants often lose margin to platform commissions, paid traffic, and closed customer ownership.',
        'Existing ecommerce growth loops are expensive and difficult to measure at the merchant level.',
        'Portable loyalty and transparent promotion pools can make repeat purchasing more rational for both sides.',
      ],
      zh: [
        '中小商家很容易被平台抽成、付费流量和封闭用户关系三层一起压利润。',
        '现有电商增长链路对商家来说又贵又不透明，预算经常花了也很难复盘。',
        '如果会员体系、返利和推广池可以迁移且透明，复购逻辑会更健康。',
      ],
    },
    build: {
      en: [
        'Start with one niche category or creator-led commerce segment instead of generic marketplace sprawl.',
        'Build merchant dashboards that turn ad budgets into direct buyer discounts, referral rewards, or loyalty tiers.',
        'Keep logistics and dispute resolution pragmatic in the early phase, while stablecoin rails and identity stay reusable.',
      ],
      zh: [
        '先从一个细分类目或创作者带货场景切入，不直接做什么都卖的大市场。',
        '给商家做清晰的预算面板，把广告费直接转成买家优惠、推荐奖励或会员等级激励。',
        '物流和售后在前期先保持务实，重点把结算、身份和商家工具打磨成可复用底座。',
      ],
    },
    proof: {
      en: [
        'Can merchants lower blended customer acquisition cost in a measurable way?',
        'Will buyers return because the reward structure is simpler and more tangible?',
        'Can portable identity and loyalty become a reason to stay instead of only a technical novelty?',
      ],
      zh: [
        '商家的综合获客成本能不能被真实、可量化地降下来？',
        '买家会不会因为奖励结构更简单直接而形成复购，而不是只薅一次羊毛？',
        '身份和会员资产可迁移这件事，能不能从“技术亮点”变成真实留存理由？',
      ],
    },
    funding: {
      en: [
        'Foundational merchant tooling and prototype: roughly $30k-$100k.',
        'Usable commerce MVP with merchant support: roughly $250k-$500k.',
        'If warehousing, financing, or creator ecosystems are added, capital needs increase quickly.',
      ],
      zh: [
        '商家工具与原型阶段：约 3 万到 10 万美元。',
        '可用的电商 MVP 加商家支持：约 25 万到 50 万美元。',
        '如果后面叠加仓储、金融或创作者生态，融资需求会很快上升。',
      ],
    },
  },
  {
    id: 'ride-hailing',
    title: {
      en: 'Decentralized Ride-Hailing Network',
      zh: '去中心化打车软件',
    },
    summary: {
      en: 'Build a driver-first mobility network with clearer fee logic, flexible incentives, and lower platform extraction.',
      zh: '做一个司机端更友好、费用结构更透明、平台抽成更低的出行网络。',
    },
    strapline: {
      en: 'The opportunity is to reprice trust, matching, and incentives, not simply clone the existing taxi app UI.',
      zh: '真正的机会在于重新定价信任、匹配和激励，而不是照着现有打车软件抄一套页面。',
    },
    stage: {
      en: 'Early thesis and operating model research',
      zh: '早期判断与运营模型研究',
    },
    why: {
      en: [
        'Drivers often face unclear take rates, uneven incentives, and little durable ownership in the system.',
        'Riders care about price, safety, and speed, but rarely understand how fees are split.',
        'A transparent, programmable incentive layer could help supply and demand rebalance during peak moments.',
      ],
      zh: [
        '司机端往往面对不透明的抽成、变化频繁的奖励规则，以及几乎不可沉淀的关系资产。',
        '乘客最关心价格、安全和效率，但通常不知道平台费用是如何拆分的。',
        '如果激励层更透明、可编排，供需在高峰时段的匹配方式就有机会被重写。',
      ],
    },
    build: {
      en: [
        'Do not start with an unrestricted city-wide network. Begin with scheduled trips, fixed routes, or dense local scenarios.',
        'Keep dispatching centralized in the first version, while exposing clear fee splits to drivers and riders.',
        'Use promotions as a programmable layer that can support riders, drivers, or both depending on supply pressure.',
      ],
      zh: [
        '第一版不要直接开放全城自由打车，而是从预约、固定路线或高密度场景开始。',
        '调度在首版仍可中心化，但要把司机、乘客和平台的费用拆分展示清楚。',
        '把补贴当成可编排层，根据供需压力灵活支持乘客、司机或双边，而不是一刀切烧钱。',
      ],
    },
    proof: {
      en: [
        'Can the network keep enough driver supply without relying on permanently inflated incentives?',
        'Will riders trust a new brand if the fee logic and service promises are easier to understand?',
        'Can operational reliability improve before expansion pressure destroys service quality?',
      ],
      zh: [
        '能不能在不过度依赖长期高补贴的情况下，维持足够的司机供给？',
        '如果费用规则和服务承诺更清晰，乘客会不会愿意信任一个新品牌？',
        '在扩张之前，运营可靠性能不能先建立起来，而不是被规模冲垮？',
      ],
    },
    funding: {
      en: [
        'Research and simulation tooling: roughly $30k-$120k.',
        'Pilot network in a narrow scenario: roughly $400k-$900k.',
        'Real city-scale ride-hailing is capital-intensive and compliance-heavy by default.',
      ],
      zh: [
        '研究与模拟工具阶段：约 3 万到 12 万美元。',
        '狭窄场景下的试点网络：约 40 万到 90 万美元。',
        '一旦要进入真实城市级打车，资金和合规压力都会非常重。',
      ],
    },
  },
  {
    id: 'video',
    title: {
      en: 'Decentralized Video Platform',
      zh: '去中心化视频平台',
    },
    summary: {
      en: 'Create a video network where creators keep more value, viewers participate in the upside, and ad spend becomes more measurable.',
      zh: '做一个让创作者保留更多价值、观众也能参与收益、广告投放更透明的视频网络。',
    },
    strapline: {
      en: 'If attention is the moat of the internet, then creator economics and distribution fairness are the real product layer to redesign.',
      zh: '如果注意力是互联网最大的护城河，那么创作者收益分配和分发公平性就是最值得重做的产品层。',
    },
    stage: {
      en: 'Narrative framing and creator incentive design',
      zh: '叙事框架与创作者激励设计',
    },
    why: {
      en: [
        'Creators often face opaque distribution rules, volatile monetization, and weak control over audience relationships.',
        'Advertisers still spend heavily inside ranking systems that are expensive and difficult to audit.',
        'A more transparent creator-viewer-advertiser triangle could support niche communities with stronger loyalty.',
      ],
      zh: [
        '创作者常常面对不透明的分发规则、波动很大的变现方式，以及脆弱的用户关系。',
        '广告主仍然在高成本、难审计的推荐系统里花很多预算，却很难知道真正效果。',
        '如果创作者、观众和广告主之间的关系更透明，细分社区反而更容易形成高粘性。',
      ],
    },
    build: {
      en: [
        'Start with one content vertical or one creator cohort rather than a general-purpose video battlefield.',
        'Design viewer participation carefully so it rewards meaningful engagement instead of pure bot-friendly farming.',
        'Treat creator tools, audience ownership, and commerce hooks as part of one product system.',
      ],
      zh: [
        '先从一个内容垂类或一批创作者社群切入，而不是直接做全品类视频战场。',
        '观众激励必须设计得足够谨慎，避免变成纯刷量、纯机器人的羊毛池。',
        '把创作者工具、用户关系和商业转化入口当成一个完整系统来设计。',
      ],
    },
    proof: {
      en: [
        'Can creators feel a real economic advantage compared with existing platforms?',
        'Can audience participation avoid turning into low-quality incentive mining?',
        'Will advertisers value transparency enough to test budget migration?',
      ],
      zh: [
        '创作者能不能感受到比现有平台更真实的经济优势？',
        '观众参与激励能不能避免退化成低质量刷量和纯挖矿行为？',
        '广告主会不会因为更透明的链路而愿意迁移一部分预算试水？',
      ],
    },
    funding: {
      en: [
        'Prototype plus creator tooling: roughly $50k-$150k.',
        'Vertical creator platform MVP: roughly $400k-$800k.',
        'Video storage, moderation, and content operations can make scale expensive quickly.',
      ],
      zh: [
        '原型加创作者工具阶段：约 5 万到 15 万美元。',
        '垂类创作者平台 MVP：约 40 万到 80 万美元。',
        '视频存储、审核和内容运营会让规模化成本很快上升。',
      ],
    },
  },
  {
    id: 'decentralized-ai',
    title: {
      en: 'Decentralized AI Network',
      zh: '去中心化 AI 网络',
    },
    summary: {
      en: 'Build the intelligence layer that can later power recommendations, search, support, creator tools, and coordination across every consumer product.',
      zh: '构建未来可以连接推荐、搜索、客服、创作者工具和跨应用协同的智能层。',
    },
    strapline: {
      en: 'This is the layer that can eventually turn separate products into one interoperable intelligence network.',
      zh: '这是未来把多个独立产品连接成同一张智能网络的关键层，而不是附带的小功能。',
    },
    stage: {
      en: 'Long-horizon infrastructure thesis',
      zh: '长期基础设施方向',
    },
    why: {
      en: [
        'Most AI products today are still centralized wrappers around closed models, closed data, and closed monetization.',
        'If user identity, merchant data, creator behavior, and service history stay siloed, network intelligence never compounds.',
        'A shared AI layer could become the coordination engine across commerce, mobility, media, and local services.',
      ],
      zh: [
        '今天绝大多数 AI 产品仍然是围绕封闭模型、封闭数据和封闭商业路径构建的外壳。',
        '如果用户身份、商家数据、创作者行为和服务历史都被切碎，网络智能就无法形成复利。',
        '一个共享的 AI 层有机会成为电商、出行、内容和本地服务之间的协同引擎。',
      ],
    },
    build: {
      en: [
        'Start with practical agent workflows and cross-product memory before promising a giant autonomous network.',
        'Treat identity, permissions, data access, and economic routing as first-class product design problems.',
        'Use the AI layer to improve matching, support, ranking, and productivity before attempting full decentralization theater.',
      ],
      zh: [
        '第一步先做有价值的 agent 工作流和跨产品记忆系统，而不是一上来宣称万能自治网络。',
        '把身份、权限、数据访问和收益分配当成第一等产品问题，而不是后补的技术细节。',
        '先让 AI 在匹配、客服、排序和效率上产生真实价值，再逐步推进更深的去中心化形态。',
      ],
    },
    proof: {
      en: [
        'Can one shared intelligence layer improve multiple products in measurable ways?',
        'Can users and merchants trust the permission model around data and automation?',
        'Does the network become more valuable as more products plug into it, or only more complex?',
      ],
      zh: [
        '同一层智能系统能不能对多个产品同时带来可量化提升？',
        '用户和商家会不会真正信任这套数据与自动化权限模型？',
        '随着接入的产品增多，这张网络会不会更有价值，而不只是更复杂？',
      ],
    },
    funding: {
      en: [
        'Founder-led research and tooling: roughly $20k-$100k.',
        'Usable cross-product AI MVP: roughly $200k-$600k.',
        'If it becomes a real network layer with infrastructure guarantees, capital needs could expand well beyond that.',
      ],
      zh: [
        '创始人主导的研究与工具阶段：约 2 万到 10 万美元。',
        '可用的跨产品 AI MVP：约 20 万到 60 万美元。',
        '如果要真正做成网络级基础设施，后续融资需求会远高于这个范围。',
      ],
    },
  },
]
