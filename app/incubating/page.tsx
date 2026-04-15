'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'

type Lang = 'en' | 'zh'

const copy = {
  en: {
    badge: 'Ideas Page',
    title: 'Decentralized Daily Life Network',
    subtitle:
      'One umbrella project that brings Web3 into real consumer behavior: local services, commerce, ride-hailing, media, and AI working as one coordinated network.',
    statusLabel: 'Current stage',
    statusValue: 'Research and system design',
    structureLabel: 'Project shape',
    structureValue: 'One network, multiple consumer apps',
    fundingLabel: 'Rough financing path',
    fundingValue: '$300k MVP to $2M multi-vertical expansion',
    noteTitle: 'Core thesis',
    note:
      'The real opportunity is not one isolated app. It is a connected stack of consumer platforms where incentives, payments, advertising budgets, creator rewards, and AI services all reinforce each other.',
    sections: {
      vision: 'Vision',
      modules: 'Project Modules',
      infrastructure: 'Shared Infrastructure',
      rollout: 'Execution Path',
      economics: 'Economic Model',
      funding: 'Financing Plan',
      moat: 'Why This Could Compound',
      risks: 'Main Risks',
    },
    vision: [
      'Most daily-life apps are still highly centralized, especially food delivery, ecommerce, ride-hailing, and video distribution.',
      'Users, merchants, drivers, riders, and creators all pay hidden platform taxes through ranking systems, ad auctions, commissions, and algorithmic distribution.',
      'Web3 has not yet fully entered everyday consumer infrastructure. That gap is the opportunity.',
    ],
    modules: [
      'Decentralized local life platform: food ordering, errands, merchant campaigns, and rider incentives with transparent subsidy accounting.',
      'Decentralized ecommerce: lower-fee merchant storefronts, onchain loyalty, and direct promotion budgets flowing to customer discounts.',
      'Decentralized ride-hailing: driver choice, lower platform take rate, and rider-driver incentives with more transparent fee breakdowns.',
      'Decentralized video platform: creators keep more of the value, viewers receive direct participation rewards, and advertisers buy measurable exposure without opaque middle layers.',
      'Decentralized AI layer: recommendation, search, customer service, personalization, and creator tooling become a shared intelligence network across every app.',
    ],
    infrastructure: [
      'Wallet and identity layer so one account can move across commerce, delivery, transport, media, and AI tools.',
      'Stablecoin settlement rails so payments, rewards, promotions, and creator payouts can run on one treasury system.',
      'Merchant and advertiser budget engine so promotion money can be routed directly into visible user rewards instead of disappearing into black-box ad systems.',
      'Reputation graph covering customers, merchants, drivers, riders, and creators across the network.',
      'AI orchestration layer for matching, ranking, fraud control, user assistance, and long-term personalization.',
    ],
    rollout: [
      'Phase 1: start with the narrowest real-world wedge, likely local life or commerce, because they create the clearest transaction loops.',
      'Phase 2: reuse the same identity, wallet, and budget engine for adjacent verticals like ride-hailing or creator commerce.',
      'Phase 3: add video and creator tools so attention, commerce, and distribution begin feeding one another.',
      'Phase 4: unify all products under a decentralized AI network that learns from the full ecosystem rather than one isolated app.',
    ],
    economics: [
      'Take small service fees instead of extreme platform extraction.',
      'Charge small technology and routing fees on merchant or advertiser promotion budgets.',
      'Return more of the ad budget directly to users, creators, drivers, or riders as visible benefits.',
      'Let the AI layer become a later monetization engine through enterprise tools, matching, optimization, and automation services.',
    ],
    funding: [
      'Research and prototype phase: $20k - $80k if execution is heavily founder-led.',
      'First usable MVP in one vertical: roughly $300k - $600k including product, operations, compliance, and user acquisition.',
      'City-scale or category-scale validation: roughly $800k - $1.2M.',
      'Multi-vertical expansion plus shared AI infrastructure: likely $1.5M - $2M+ depending on geography and compliance burden.',
    ],
    moat: [
      'Each vertical can feed the others: merchants buy promotion, users earn discounts, creators drive traffic, AI improves matching, and stablecoin rails unify settlement.',
      'The network becomes stronger when budgets, attention, reputation, and identity are portable across products.',
      'This is not just a cheaper app. It is a different economic structure for digital daily life.',
    ],
    risks: [
      'Consumer products are much harder than token dashboards because real logistics, support, and fraud control matter.',
      'Stablecoin custody, money transmission, labor rules, and local regulation can become major execution constraints.',
      'The first version must stay focused. Trying to launch all modules at once would destroy execution quality.',
      'The AI layer only matters if the underlying consumer products actually gain transaction density and retention.',
    ],
    moduleCards: [
      {
        title: 'Local Life',
        desc: 'Delivery, errands, merchant rewards, and rider incentives.',
      },
      {
        title: 'Commerce',
        desc: 'Lower-fee ecommerce with onchain loyalty and transparent ad spend.',
      },
      {
        title: 'Ride-Hailing',
        desc: 'Driver-first economics and clearer fee transparency.',
      },
      {
        title: 'Video',
        desc: 'Creator rewards, audience incentives, and ad efficiency.',
      },
      {
        title: 'Decentralized AI',
        desc: 'A shared intelligence layer connecting every app in the network.',
      },
    ],
  },
  zh: {
    badge: '想法页面',
    title: '去中心化日常生活网络',
    subtitle:
      '这不是单一 App，而是一个总项目：把本地生活、电商、打车、视频和去中心化 AI 连接起来，让 Web3 真正进入现实世界的消费与服务场景。',
    statusLabel: '当前阶段',
    statusValue: '研究与系统设计阶段',
    structureLabel: '项目形态',
    structureValue: '一个底层网络，多个消费级应用',
    fundingLabel: '粗略融资路径',
    fundingValue: '从 30 万美元 MVP 到 200 万美元多垂类扩张',
    noteTitle: '核心判断',
    note:
      '真正有价值的不是单独做一个 Web3 外卖或一个 Web3 打车，而是建立一张完整的去中心化日常生活网络，让支付、广告预算、激励、内容分发和 AI 服务彼此连通。',
    sections: {
      vision: '项目愿景',
      modules: '项目模块',
      infrastructure: '共享基础设施',
      rollout: '推进路径',
      economics: '经济模型',
      funding: '融资规划',
      moat: '为什么会形成复利',
      risks: '主要风险',
    },
    vision: [
      '今天绝大多数日常生活类应用依然高度中心化，尤其是外卖、电商、打车和视频分发。',
      '用户、商家、司机、骑手和创作者都在为平台的排序机制、广告竞价、抽成和流量分发支付隐性成本。',
      'Web3 还没有真正进入现实中的消费基础设施，这正是最大的机会之一。',
    ],
    modules: [
      '去中心化本地生活平台：外卖、跑腿、商家推广预算和骑手补贴都可以做得更透明。',
      '去中心化电商：更低抽成的商家店铺、链上会员积分和直接转化为优惠的推广预算。',
      '去中心化打车软件：司机与乘客之间更清晰的费用结构，更低的平台抽成和更公平的激励。',
      '去中心化视频平台：创作者分成更直接，用户观看更有参与收益，广告商能用更低成本获得更透明的曝光。',
      '去中心化 AI 层：推荐、搜索、客服、个性化和创作者工具都由一套共享的 AI 网络来支持。',
    ],
    infrastructure: [
      '统一的钱包与身份系统，让用户能在电商、本地生活、打车、视频和 AI 工具之间无缝切换。',
      '稳定币结算轨道，让支付、补贴、广告预算和创作者分成都能跑在同一套资金系统上。',
      '商家与广告主预算引擎，让推广费用直接变成可见的用户福利、创作者激励、司机或骑手奖励。',
      '跨应用信誉图谱，连接用户、商家、司机、骑手和创作者。',
      'AI 编排层，负责匹配、推荐、反作弊、用户协助和长期个性化。',
    ],
    rollout: [
      '阶段 1：先从最窄、最能形成真实交易闭环的场景切入，优先考虑本地生活或电商。',
      '阶段 2：复用同一套身份、钱包和预算系统，拓展到打车或创作者商业化场景。',
      '阶段 3：加入视频平台，让内容、消费和分发彼此导流。',
      '阶段 4：最终把所有产品接到去中心化 AI 网络上，让整张网不再是几个孤立应用。',
    ],
    economics: [
      '平台只收小额服务费，不走传统平台那种高抽成路线。',
      '对商家和广告主预算收取小额技术与分发费用。',
      '把更多广告预算直接返还给用户、创作者、司机或骑手，形成真正可感知的福利。',
      '长期来看，AI 层会成为更强的增值引擎，提供匹配优化、自动化运营和企业工具收入。',
    ],
    funding: [
      '研究和原型阶段：如果主要靠创始人推进，大约需要 2 万到 8 万美元。',
      '单一垂类的第一个可用 MVP：粗略需要 30 万到 60 万美元，覆盖产品、运营、合规和冷启动。',
      '一个城市或一个品类的有效验证：粗略需要 80 万到 120 万美元。',
      '多垂类扩张并叠加共享 AI 基础设施：大概率需要 150 万到 200 万美元以上。',
    ],
    moat: [
      '每个模块都能给其他模块输送价值：商家买推广，用户拿优惠，创作者带流量，AI 提升匹配，稳定币系统统一结算。',
      '当预算、注意力、信誉和身份可以跨产品流动时，这张网络会越来越强。',
      '这不只是“更便宜的 App”，而是一种新的数字日常生活经济结构。',
    ],
    risks: [
      '消费级产品远比纯链上工具难，真正的履约、客服和反作弊会决定成败。',
      '稳定币托管、支付合规、劳动关系和本地监管会成为实操层面的重大难题。',
      '第一版必须非常聚焦，不能试图一次性把所有模块一起上线。',
      '去中心化 AI 只有在前面的消费产品真的建立了交易密度和留存之后才有意义。',
    ],
    moduleCards: [
      {
        title: '本地生活',
        desc: '外卖、跑腿、商家奖励与骑手激励。',
      },
      {
        title: '电商',
        desc: '更低抽成的电商系统与链上会员体系。',
      },
      {
        title: '打车',
        desc: '更透明的费用结构与司机优先的经济模型。',
      },
      {
        title: '视频',
        desc: '创作者收益、用户参与和广告效率的重构。',
      },
      {
        title: '去中心化 AI',
        desc: '连接整个网络的共享智能层。',
      },
    ],
  },
} as const

const sectionOrder = [
  'vision',
  'modules',
  'infrastructure',
  'rollout',
  'economics',
  'funding',
  'moat',
  'risks',
] as const

export default function IncubatingPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const t = copy[lang]

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="none" />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.18),transparent_30%),rgba(255,255,255,0.03)] p-6 sm:p-8"
        >
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">{t.badge}</p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">{t.title}</h1>
            <p className="mt-5 text-sm leading-7 text-white/72 sm:text-base">{t.subtitle}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetaCard label={t.statusLabel} value={t.statusValue} />
            <MetaCard label={t.structureLabel} value={t.structureValue} />
            <MetaCard label={t.fundingLabel} value={t.fundingValue} />
          </div>
        </motion.section>

        <section className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-400/8 p-5 text-sm leading-7 text-emerald-50/90">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">{t.noteTitle}</div>
          <p className="mt-3">{t.note}</p>
        </section>

        <section className="mt-10">
          <div className="mb-5 text-xs uppercase tracking-[0.28em] text-white/45">
            {lang === 'zh' ? '核心模块' : 'Core Modules'}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {t.moduleCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: Math.min(index * 0.04, 0.16) }}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <div className="h-1.5 w-12 rounded-full bg-white" />
                <h2 className="mt-4 text-xl font-black">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{card.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6">
          {sectionOrder.map((sectionKey, index) => (
            <motion.section
              key={sectionKey}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: Math.min(index * 0.04, 0.2) }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
            >
              <h2 className="text-2xl font-black sm:text-3xl">{t.sections[sectionKey]}</h2>
              <ul className="mt-5 space-y-3">
                {t[sectionKey].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-white/75 sm:text-base">
                    <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  )
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <div className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</div>
      <div className="mt-3 text-base font-semibold leading-7 text-white/85">{value}</div>
    </div>
  )
}
