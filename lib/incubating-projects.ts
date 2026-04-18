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
    title: 'Independent projects in incubation',
    description:
      'This is a growing directory of standalone ideas I want to build next, each with its own logic, constraints, and long-term potential.',
    hoverHint: 'Hover or open the list to preview the project directory',
    browseTracks: 'Browse Projects',
    openPage: 'Open Ideas Page',
    jumpToProject: 'Jump to project',
  },
  zh: {
    eyebrow: '项目图谱',
    title: '正在酝酿的独立项目',
    description:
      '这里整理的是我接下来想继续推进的独立项目，每一个都不是附属功能，而是未来可以单独长成产品的方向。',
    hoverHint: '悬停或展开列表，预览项目目录',
    browseTracks: '浏览项目',
    openPage: '打开想法页',
    jumpToProject: '进入项目',
  },
} as const

export const incubatingPageCopy = {
  en: {
    badge: 'Ideas Page',
    title: 'Project Atlas',
    subtitle:
      'This page is a parent directory for longer-horizon projects. Each section is an independent product direction rather than one merged super-app.',
    noteTitle: 'How to read this page',
    note:
      'I am using this space to map future products before they are fully built. The content will keep evolving, but every project already has a concrete motivation, first-version shape, and rough capital path.',
    directoryEyebrow: 'Project Directory',
    directoryTitle: 'Enter each project from here',
    directoryDescription:
      'Use the cards below to jump into the specific track you want to expand next.',
    stageLabel: 'Current stage',
    whyLabel: 'Why it matters',
    buildLabel: 'How it could work',
    proofLabel: 'What the first version must prove',
    fundingLabel: 'Rough funding path',
    openSection: 'Open section',
    backToTop: 'Back to top',
  },
  zh: {
    badge: '想法页面',
    title: '项目图谱',
    subtitle:
      '这个页面是长期项目的父页面。每个 section 都代表一个独立产品方向，而不是把所有想法硬塞进同一个超级应用。',
    noteTitle: '阅读说明',
    note:
      '我会先在这里整理项目动机、第一版产品形态和大致融资路径，后面再逐步补充更细的产品、运营和技术内容。',
    directoryEyebrow: '项目目录',
    directoryTitle: '从这里进入每个独立项目',
    directoryDescription: '下面的卡片会直接跳到对应项目的 section，方便后续分别展开。',
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
      en: 'The goal is not simply “Web3 food delivery”, but a better economic structure for merchants, riders, and users.',
      zh: '重点不是给外卖套一个 Web3 名字，而是重做商家、骑手和用户之间更合理的利益结构。',
    },
    stage: {
      en: 'Research and product framing',
      zh: '研究与产品定义',
    },
    why: {
      en: [
        'Merchants pay high platform fees and then still have to buy traffic inside opaque ad systems.',
        'Users see coupons but rarely understand how subsidies actually flow through the platform.',
        'A more transparent incentive model could lower waste and improve retention for all sides.',
      ],
      zh: [
        '商家一边承担平台抽成，一边还要继续为黑盒流量系统买推广。',
        '用户能看到优惠，却不知道补贴预算最终流向了哪里。',
        '如果激励和结算更透明，平台、商家和用户之间的浪费都有机会下降。',
      ],
    },
    build: {
      en: [
        'Start with one dense district or campus rather than a whole city.',
        'Let merchant promotion budgets convert directly into order discounts, rider boosts, or repeat-purchase rewards.',
        'Keep fulfillment pragmatic and centralized at first while stablecoin settlement stays reusable underneath.',
      ],
      zh: [
        '第一版先从一个高密度商圈或校园切入，而不是一开始就做全城。',
        '让商家的推广预算直接变成订单优惠、骑手补贴或复购奖励。',
        '履约层前期保持务实和中心化，结算层再逐步增强链上能力。',
      ],
    },
    proof: {
      en: [
        'Can one neighborhood produce repeat orders without extreme burn?',
        'Will merchants shift real budget if visibility and conversion are clearer?',
        'Can riders and users understand the rules without heavy education cost?',
      ],
      zh: [
        '能不能在一个商圈里先跑出真实复购，而不是完全靠补贴堆出来？',
        '如果转化路径更透明，商家会不会愿意迁移真实预算？',
        '骑手和用户能不能在很低学习成本下理解这套规则？',
      ],
    },
    funding: {
      en: [
        'Founder-led prototype: roughly $20k-$80k.',
        'Single-district MVP with operations: roughly $300k-$600k.',
        'City-level expansion becomes much more capital intensive.',
      ],
      zh: [
        '创始人主导原型阶段：大约 2 万到 8 万美元。',
        '带运营的单商圈 MVP：大约 30 万到 60 万美元。',
        '一旦进入城市级扩张，资金需求会明显上升。',
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
      en: 'Create a lower-fee commerce stack with portable customer assets, clearer promotion spending, and stablecoin-native settlement.',
      zh: '做一套更低抽成、用户资产可迁移、推广预算更透明的电商体系。',
    },
    strapline: {
      en: 'The deeper opportunity is not cheaper checkout, but rebuilding how merchants own growth and customer relationships.',
      zh: '真正值得重做的不是一次支付，而是商家如何拥有自己的增长路径和用户关系。',
    },
    stage: {
      en: 'Concept design and merchant workflow mapping',
      zh: '概念设计与商家流程梳理',
    },
    why: {
      en: [
        'Small merchants lose margin to commissions, paid traffic, and closed customer ownership.',
        'Growth tooling is fragmented and expensive, especially for small teams.',
        'A portable loyalty and promotion layer could make repeat buying more rational.',
      ],
      zh: [
        '中小商家经常同时被平台抽成、付费流量和封闭用户关系三层挤压利润。',
        '增长工具碎片化而且昂贵，对小团队尤其不友好。',
        '如果会员和补贴系统可迁移、可复用，复购逻辑会更健康。',
      ],
    },
    build: {
      en: [
        'Begin with one vertical category instead of a general marketplace.',
        'Turn ad spend into buyer discounts, referral rewards, or loyalty tiers inside the merchant dashboard.',
        'Keep logistics and disputes practical while user identity and settlement stay portable.',
      ],
      zh: [
        '先从一个垂直品类切入，而不是一开始就做泛电商大市场。',
        '在商家后台里把广告预算直接转化成优惠、分销奖励和会员等级激励。',
        '物流和售后先保持务实，身份和结算层则尽量设计成可迁移底座。',
      ],
    },
    proof: {
      en: [
        'Can merchants lower blended customer acquisition cost in a measurable way?',
        'Will buyers return because rewards are simpler and more tangible?',
        'Can portability become a real retention reason instead of a technical slogan?',
      ],
      zh: [
        '商家的综合获客成本能不能被真实、可量化地下调？',
        '买家会不会因为奖励结构更直接而形成复购？',
        '“可迁移”这件事能不能从技术口号变成真实留存理由？',
      ],
    },
    funding: {
      en: [
        'Foundational merchant tooling: roughly $30k-$100k.',
        'Usable commerce MVP with support: roughly $250k-$500k.',
        'Warehousing or financing layers would raise the capital requirement quickly.',
      ],
      zh: [
        '商家工具和原型阶段：大约 3 万到 10 万美元。',
        '可用的电商 MVP 加商家支持：大约 25 万到 50 万美元。',
        '如果后续叠加仓储或金融层，融资需求会快速增加。',
      ],
    },
  },
  {
    id: 'ride-hailing',
    title: {
      en: 'Decentralized Ride-Hailing Network',
      zh: '去中心化打车网络',
    },
    summary: {
      en: 'Build a driver-first mobility network with clearer fee splits, flexible incentives, and lower platform extraction.',
      zh: '做一个对司机更友好、费用拆分更透明、平台抽成更低的出行网络。',
    },
    strapline: {
      en: 'The real redesign is around trust, matching, and incentives, not just copying the taxi app interface.',
      zh: '真正需要重做的是信任、匹配和激励结构，而不只是复刻现有打车软件界面。',
    },
    stage: {
      en: 'Early thesis and operating-model research',
      zh: '早期判断与运营模型研究',
    },
    why: {
      en: [
        'Drivers face unclear take rates and frequently changing incentive rules.',
        'Riders care about price and speed, but usually cannot see how fees are split.',
        'A transparent incentive layer could rebalance supply during peak demand more efficiently.',
      ],
      zh: [
        '司机端常常面对不透明抽成和频繁变化的补贴规则。',
        '乘客关心价格和效率，但很少能看到费用是如何拆分的。',
        '如果激励结构更透明，在高峰期调节供给的效率可能会更高。',
      ],
    },
    build: {
      en: [
        'Start with scheduled routes, campuses, or dense local scenarios instead of free-form citywide coverage.',
        'Keep dispatching centralized in the first version, but expose clearer fee splits to drivers and riders.',
        'Use incentives as a programmable balancing layer rather than a blind burn tool.',
      ],
      zh: [
        '先从预约路线、校园或高密度场景切入，而不是直接铺开全城自由叫车。',
        '首版调度仍可中心化，但费用拆分要对司机和乘客更清晰。',
        '把补贴当作可编排的平衡层，而不是无差别烧钱工具。',
      ],
    },
    proof: {
      en: [
        'Can the network keep driver supply without permanently inflated incentives?',
        'Will riders trust a new brand if pricing logic is easier to understand?',
        'Can service reliability improve before scale pressure destroys quality?',
      ],
      zh: [
        '能不能在不过度依赖高补贴的情况下维持足够司机供给？',
        '如果价格规则更清晰，乘客会不会更愿意信任新品牌？',
        '在规模扩张之前，服务可靠性能不能先建立起来？',
      ],
    },
    funding: {
      en: [
        'Research and simulation tooling: roughly $30k-$120k.',
        'Pilot network in a narrow scenario: roughly $400k-$900k.',
        'Real city-scale execution is both capital and compliance heavy.',
      ],
      zh: [
        '研究和模拟阶段：大约 3 万到 12 万美元。',
        '窄场景试点网络：大约 40 万到 90 万美元。',
        '一旦进入真实城市级打车，资金和合规压力都会显著上升。',
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
      en: 'Build a video network where creators keep more value, viewers participate more meaningfully, and ad spend becomes measurable.',
      zh: '做一个让创作者保留更多价值、观众能参与收益、广告预算也更透明的视频网络。',
    },
    strapline: {
      en: 'Attention is the moat, but creator economics and distribution fairness are the product layer worth redesigning.',
      zh: '注意力是护城河，但真正值得重做的是创作者收益和分发公平性。',
    },
    stage: {
      en: 'Narrative framing and creator-incentive design',
      zh: '叙事框架与创作者激励设计',
    },
    why: {
      en: [
        'Creators face opaque distribution rules and unstable monetization.',
        'Advertisers still spend inside systems that are expensive and hard to audit.',
        'A clearer creator-viewer-advertiser loop could support stronger niche communities.',
      ],
      zh: [
        '创作者面临不透明分发规则和波动很大的变现方式。',
        '广告主仍然在高成本、难审计的分发系统里投放预算。',
        '如果创作者、观众和广告主之间的关系更透明，细分社区反而更容易形成高粘性。',
      ],
    },
    build: {
      en: [
        'Start with one content vertical or creator cohort.',
        'Design viewer participation carefully so it rewards quality engagement rather than farming.',
        'Treat creator tools, audience ownership, and commerce as one connected system.',
      ],
      zh: [
        '先从一个内容垂类或一批创作者社群切入。',
        '观众参与激励必须谨慎设计，避免退化成刷量和低质量挖矿。',
        '把创作者工具、用户关系和商业转化设计成同一套系统。',
      ],
    },
    proof: {
      en: [
        'Can creators feel a real economic advantage over existing platforms?',
        'Can audience participation stay meaningful instead of turning into spam farming?',
        'Will advertisers value transparency enough to test budget migration?',
      ],
      zh: [
        '创作者能不能感受到比现有平台更真实的经济优势？',
        '观众参与能不能保持高质量，而不是迅速变成刷量？',
        '广告主会不会因为链路更透明而愿意迁移部分预算？',
      ],
    },
    funding: {
      en: [
        'Prototype plus creator tooling: roughly $50k-$150k.',
        'Vertical creator platform MVP: roughly $400k-$800k.',
        'Storage, moderation, and content operations make scale expensive fast.',
      ],
      zh: [
        '原型加创作者工具阶段：大约 5 万到 15 万美元。',
        '垂类创作者平台 MVP：大约 40 万到 80 万美元。',
        '视频存储、审核和内容运营会让规模化成本快速上升。',
      ],
    },
  },
  {
    id: 'decentralized-ai',
    title: {
      en: 'Decentralized AI Layer',
      zh: '去中心化 AI 层',
    },
    summary: {
      en: 'Build an intelligence layer that can later power search, support, recommendations, creator tools, and coordination across consumer products.',
      zh: '构建未来可以连接搜索、客服、推荐、创作者工具和跨应用协同的智能层。',
    },
    strapline: {
      en: 'This is the connective tissue that could eventually make the wider network feel like one coherent system instead of isolated apps.',
      zh: '它更像一层连接组织，让未来这些产品不只是孤立应用，而是一张彼此协同的网络。',
    },
    stage: {
      en: 'Long-range architecture thinking',
      zh: '长期架构思考',
    },
    why: {
      en: [
        'Every consumer product eventually needs search, matching, recommendations, and support.',
        'If intelligence remains siloed, every product rebuilds the same layer from scratch.',
        'A reusable AI layer could become the coordination fabric across local life, commerce, media, and future tools.',
      ],
      zh: [
        '几乎所有面向用户的产品最终都需要搜索、匹配、推荐和客服能力。',
        '如果智能层始终割裂存在，每个产品都要重复造一遍轮子。',
        '一层可复用的 AI 能力有机会成为本地生活、电商、媒体和更多工具之间的协同底座。',
      ],
    },
    build: {
      en: [
        'Begin with narrow internal workflows before claiming a universal AI network.',
        'Make reasoning, memory, and task automation useful inside real products first.',
        'Treat identity, permissions, and context portability as core primitives from day one.',
      ],
      zh: [
        '先从窄场景内部工作流做起，而不是一开始就喊通用 AI 网络。',
        '先让推理、记忆和任务自动化在真实产品中变得有用。',
        '从一开始就把身份、权限和上下文迁移能力当作核心原语。',
      ],
    },
    proof: {
      en: [
        'Can one AI layer materially reduce repeated product work?',
        'Will users feel the benefit without getting buried under complexity?',
        'Can the intelligence layer improve multiple products rather than only one narrow workflow?',
      ],
      zh: [
        '一层 AI 能力是否真的能减少重复产品开发？',
        '用户能不能感受到好处，而不是被额外复杂性拖累？',
        '这层能力能否同时改善多个产品，而不只是单一工作流？',
      ],
    },
    funding: {
      en: [
        'Internal prototypes can start lean, but durable infrastructure requires long-term capital.',
        'The real expense appears when models, data pipelines, memory, and product integration mature together.',
        'This is a strategic layer that likely follows proof from the consumer products first.',
      ],
      zh: [
        '内部原型可以从轻量开始，但要做成稳定底座需要更长期的资本支持。',
        '真正的成本会出现在模型、数据管线、记忆层和产品集成一起成熟之后。',
        '它更适合作为前面几个消费级产品跑通之后再强化的战略层。',
      ],
    },
  },
]
