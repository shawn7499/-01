'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'

type Lang = 'en' | 'zh'

const copy = {
  en: {
    badge: 'Incubating Project',
    title: 'Onchain Local Commerce Network',
    subtitle:
      'A practical consumer app where users can switch between ordering and delivery, merchants fund visible discounts, and stablecoin settlement makes incentives more transparent.',
    heroCta: 'Why This Could Matter',
    statusLabel: 'Current status',
    statusValue: 'Research and planning',
    modelLabel: 'Core model',
    modelValue: 'Centralized fulfillment, onchain settlement rails',
    fundingLabel: 'Rough financing',
    fundingValue: '$250k - $500k pre-seed for first city pilot',
    sections: {
      problem: 'Problem',
      concept: 'Product Concept',
      architecture: 'How It Would Work',
      roadmap: 'Execution Roadmap',
      business: 'Business Model',
      funding: 'Financing Plan',
      risks: 'Key Risks',
      metrics: 'What Success Looks Like',
    },
    problem: [
      'Local commerce platforms capture most of the value through opaque commissions, ad auctions, and ranking systems.',
      'Merchants spend heavily on promotion, but users and riders rarely see where that budget goes.',
      'Most Web3 consumer products still stop at tokens and trading instead of solving a real-world habit like ordering food or local delivery.',
    ],
    concept: [
      'Users can switch between customer mode and rider mode inside the same app.',
      'Merchants deposit promotion budgets that are converted into direct user discounts, repeat-order rewards, and rider peak-hour bonuses.',
      'The platform earns a small service fee per order plus a small fee on ad or promotion budgets instead of extracting oversized marketplace margins.',
      'Checkout supports stablecoins, with a USDT-first user experience and room to add other stablecoin rails over time.',
    ],
    architecture: [
      'Keep dispatch, order matching, refunds, customer service, and fraud controls off-chain so the app stays fast and operationally realistic.',
      'Put treasury, settlement records, promotion pools, and transparent subsidy accounting onchain so merchants can verify how budgets are used.',
      'Launch with an embedded wallet flow so normal users do not need to understand private keys before placing an order.',
      'Use partner off-ramp and compliance services before attempting direct multi-party stablecoin payout infrastructure.',
    ],
    roadmap: [
      'Phase 0: Validate one niche market such as a campus, apartment cluster, or one commercial district.',
      'Phase 1 MVP: Customer app, rider mode, merchant dashboard, promotion budget engine, coupon logic, and simple stablecoin checkout.',
      'Phase 2 Pilot: Add dispatch rules, anti-fraud, refunds, rider scoring, merchant analytics, and wallet abstraction polish.',
      'Phase 3 First city: Expand density before variety. Win one neighborhood deeply before adding many categories.',
    ],
    business: [
      'Order service fee: small percentage charged per completed transaction.',
      'Promotion fee: small fee on merchant-funded acquisition and retention budgets.',
      'Merchant SaaS tools: analytics, campaign tools, CRM, and loyalty automation later on.',
      'Long-term moat: lower take rate plus transparent subsidy distribution and faster merchant feedback loops.',
    ],
    funding: [
      'Bootstrap research and design: $10k - $30k if the first version is mostly self-built.',
      'Functional MVP with wallet, order flow, and merchant tooling: roughly $80k - $150k.',
      'Real first-city pilot with operations, compliance, support, and growth budget: roughly $250k - $500k pre-seed.',
      'If the model proves retention and repeat order density, larger seed capital can be used for city expansion rather than premature token speculation.',
    ],
    risks: [
      'Payment and custody rules are more difficult than the product demo. Stablecoin settlement introduces compliance and money-transmission questions.',
      'Rider management, refunds, fake orders, and subsidy abuse are harder than building the frontend.',
      'If delivery density is weak, unit economics break quickly.',
      'The first version must solve one narrow real-world use case instead of trying to replace every centralized platform at once.',
    ],
    metrics: [
      'Merchant retention after the first 30 to 60 days.',
      'Repeat order rate and effective customer acquisition cost after subsidy usage.',
      'Average delivery time and successful fulfillment rate.',
      'Promotion budget efficiency compared with existing marketplace channels.',
    ],
    noteTitle: 'Planning Note',
    note:
      'This is intentionally a hybrid design. The goal is not to force everything onchain. The goal is to use Web3 where it creates real transparency and better incentives.',
  },
  zh: {
    badge: '酝酿中的项目',
    title: '链上本地生活网络',
    subtitle:
      '这会是一款更贴近真实消费场景的应用：用户可以在同一个系统里切换点单和骑手身份，商家的推广预算会更透明地流向补贴，稳定币负责结算，平台只赚小额服务费。',
    heroCta: '为什么值得做',
    statusLabel: '当前状态',
    statusValue: '研究与规划阶段',
    modelLabel: '核心模式',
    modelValue: '中心化履约 + 链上结算轨道',
    fundingLabel: '粗略融资需求',
    fundingValue: '首个城市试点约需 25 万到 50 万美元 Pre-seed',
    sections: {
      problem: '要解决的问题',
      concept: '产品构想',
      architecture: '大致实现方式',
      roadmap: '推进路线',
      business: '商业模式',
      funding: '融资规划',
      risks: '核心风险',
      metrics: '成功指标',
    },
    problem: [
      '本地生活平台的抽成、广告竞价和排序机制高度中心化，商家投入大量预算，但真实流向对用户和骑手并不透明。',
      '商家交了推广费和广告费，最终真正变成了多少优惠、多少骑手补贴，通常是黑盒。',
      '很多 Web3 应用停留在发币和交易，缺少真正进入日常消费场景的产品。',
    ],
    concept: [
      '用户在同一个应用里可以切换顾客模式和骑手模式，不必被完全分割成两个体系。',
      '商家把推广预算充值进平台，这部分预算不只是买曝光，而是直接转化成新客优惠、复购补贴和骑手高峰奖励。',
      '平台每单只收小额服务费，同时对商家推广预算收取小额运营费，而不是靠高抽成赚钱。',
      '支付体验可以优先支持 USDT，同时保留后续接入更多稳定币结算轨道的空间。',
    ],
    architecture: [
      '订单撮合、配送调度、客服、退款和反作弊放在链下完成，这样响应速度和履约效率才足够现实。',
      '资金池、结算记录、补贴池和推广预算使用情况放到链上记账，让商家能清楚看到预算怎么被消耗。',
      '第一版采用嵌入式钱包或轻钱包体验，让普通用户不用先学会私钥管理才能下单。',
      '真正做多方稳定币结算之前，先接第三方出入金和合规服务，避免平台一开始就把支付复杂度扛满。',
    ],
    roadmap: [
      '阶段 0：先验证一个非常窄的场景，比如校园、园区、公寓群或单一商圈。',
      '阶段 1 MVP：完成顾客端、骑手模式、商家后台、推广预算引擎、优惠券逻辑和基础稳定币支付。',
      '阶段 2 试点：补齐调度规则、反作弊、退款流程、骑手评分、商家分析和钱包抽象体验。',
      '阶段 3 首城验证：先做高密度，再做大而全，优先打透一个片区而不是同时铺很多城市。',
    ],
    business: [
      '订单服务费：对完成订单收取小额服务费。',
      '推广预算费：对商家引流和复购预算收取小额技术与运营费。',
      '后续 SaaS 工具：商家分析、活动管理、CRM 和会员系统可以成为追加收入来源。',
      '长期护城河：更低抽成、更透明的补贴流向，以及更快的商家反馈循环。',
    ],
    funding: [
      '自研调研和设计阶段：如果主要靠自己推进，大约需要 1 万到 3 万美元。',
      '能跑起来的 MVP：带钱包、订单流和商家后台，粗略需要 8 万到 15 万美元。',
      '真正的首城试点：加上运营、合规、客服和增长预算，粗略需要 25 万到 50 万美元的 Pre-seed。',
      '如果后面验证了复购率和片区密度，再去拿更大的 Seed，比一开始就做发币叙事更健康。',
    ],
    risks: [
      '最大难点不是页面，而是支付合规和资金流设计。稳定币结算很容易碰到托管和传输问题。',
      '骑手管理、退款、虚假订单、刷补贴和商家自买自刷都会是真实难题。',
      '如果订单密度起不来，配送成本会快速压垮模型。',
      '第一版必须解决一个窄但真实的需求，而不是一上来就想替代所有中心化平台。',
    ],
    metrics: [
      '商家在 30 到 60 天后的留存率。',
      '补贴消耗后的复购率和真实获客成本。',
      '平均配送时长与履约成功率。',
      '商家推广预算相较传统平台的转化效率。',
    ],
    noteTitle: '规划说明',
    note:
      '这会是一个刻意保持混合架构的项目。目标不是为了上链而上链，而是只把透明结算和激励分配这些真正适合 Web3 的部分放到链上。',
  },
} as const

const sectionOrder = ['problem', 'concept', 'architecture', 'roadmap', 'business', 'funding', 'risks', 'metrics'] as const

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
            <MetaCard label={t.modelLabel} value={t.modelValue} />
            <MetaCard label={t.fundingLabel} value={t.fundingValue} />
          </div>
        </motion.section>

        <section className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-400/8 p-5 text-sm leading-7 text-emerald-50/90">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">{t.heroCta}</div>
          <p className="mt-3">{t.note}</p>
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
