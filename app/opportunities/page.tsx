'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'
import {
  categoryLabels,
  getOpportunityStatus,
  opportunities,
  riskLabels,
  statusLabels,
} from '@/lib/opportunities'

const translations = {
  en: {
    title: 'Market Opportunities',
    subtitle:
      'A cleaner board for event-driven setups, narrative windows, and research-worthy ideas.',
    filterAll: 'All',
    filterActive: 'Active',
    filterEnding: 'Ending Soon',
    filterExpired: 'Expired',
    source: 'Source',
    potential: 'Potential',
    participation: 'How to Approach',
    startDate: 'Start Date',
    endDate: 'End Date',
    actualReturn: 'Observed Result',
    empty: 'No opportunities match this filter right now.',
    official: 'Official Link',
    badge: 'Opportunity Board',
  },
  zh: {
    title: '市场机遇',
    subtitle: '把事件驱动机会、题材窗口和值得研究的想法放到一个更清晰的看板里。',
    filterAll: '全部',
    filterActive: '进行中',
    filterEnding: '即将结束',
    filterExpired: '已过期',
    source: '来源',
    potential: '潜在空间',
    participation: '参与方式',
    startDate: '开始时间',
    endDate: '结束时间',
    actualReturn: '结果记录',
    empty: '当前筛选下没有可展示的机遇。',
    official: '官方链接',
    badge: 'Opportunity Board',
  },
} as const

type Lang = 'en' | 'zh'
type FilterKey = 'all' | 'active' | 'ending_soon' | 'expired'

export default function OpportunitiesPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const [filter, setFilter] = useState<FilterKey>('all')

  const t = translations[lang]

  const resolvedOpportunities = useMemo(() => {
    return opportunities
      .map((opportunity) => ({
        ...opportunity,
        resolvedStatus: getOpportunityStatus(opportunity),
      }))
      .sort((left, right) => {
        return new Date(right.startDate).getTime() - new Date(left.startDate).getTime()
      })
  }, [])

  const filteredOpportunities = resolvedOpportunities.filter((opportunity) => {
    if (filter === 'all') return true
    return opportunity.resolvedStatus === filter
  })

  function getStatusColor(status: FilterKey) {
    if (status === 'active') return 'bg-emerald-500/12 text-emerald-100 border-emerald-400/30'
    if (status === 'ending_soon') return 'bg-amber-400/12 text-amber-50 border-amber-300/30'
    return 'bg-white/5 text-white/72 border-white/12'
  }

  function getRiskColor(risk: 'low' | 'medium' | 'high') {
    if (risk === 'low') return 'text-emerald-200'
    if (risk === 'medium') return 'text-amber-200'
    return 'text-rose-200'
  }

  return (
    <div className="page-shell">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="opportunities" />

      <main className="page-container pb-20 pt-32 md:pt-36">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(216,246,168,0.14),transparent_22%),radial-gradient(circle_at_82%_20%,rgba(153,200,255,0.14),transparent_18%)]" />
          <div className="relative max-w-4xl">
            <p className="section-label">{t.badge}</p>
            <h1 className="section-title mt-4 text-5xl sm:text-6xl lg:text-7xl">{t.title}</h1>
            <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">{t.subtitle}</p>
          </div>
        </motion.section>

        <div className="mt-8 flex flex-wrap gap-3">
          {([
            ['all', t.filterAll],
            ['active', t.filterActive],
            ['ending_soon', t.filterEnding],
            ['expired', t.filterExpired],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === key
                  ? 'border-white bg-white text-black'
                  : 'border-white/12 bg-white/[0.04] text-white/72 hover:border-white/20 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="glass-panel-soft mt-8 rounded-[1.8rem] px-8 py-20 text-center text-white/65">
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.article
                key={opportunity.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.2), duration: 0.55 }}
                className="glass-panel rounded-[1.9rem] px-6 py-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(
                          opportunity.resolvedStatus
                        )}`}
                      >
                        {statusLabels[lang][opportunity.resolvedStatus]}
                      </span>
                      <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/72">
                        {categoryLabels[lang][opportunity.category]}
                      </span>
                      <span className={`text-sm font-semibold ${getRiskColor(opportunity.riskLevel)}`}>
                        {riskLabels[lang][opportunity.riskLevel]}
                      </span>
                    </div>

                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/92 sm:text-4xl">
                      {lang === 'en' ? opportunity.title : opportunity.titleZh}
                    </h2>
                    <p className="section-copy mt-4 text-sm sm:text-base">
                      {lang === 'en' ? opportunity.description : opportunity.descriptionZh}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoCard
                    label={t.source}
                    value={lang === 'en' ? opportunity.source : opportunity.sourceZh}
                  />
                  <InfoCard
                    label={t.potential}
                    value={
                      lang === 'en'
                        ? opportunity.potentialReturn || '--'
                        : opportunity.potentialReturnZh || '--'
                    }
                  />
                  <InfoCard label={t.startDate} value={opportunity.startDate} />
                  <InfoCard label={t.endDate} value={opportunity.endDate || '--'} />
                </div>

                <section className="glass-panel-soft mt-6 rounded-[1.4rem] p-4">
                  <h3 className="text-sm font-semibold text-white/84">{t.participation}</h3>
                  <p className="section-copy mt-3 text-sm">
                    {lang === 'en'
                      ? opportunity.participationMethod
                      : opportunity.participationMethodZh}
                  </p>
                </section>

                {opportunity.actualReturn ? (
                  <section className="glass-panel-soft mt-5 rounded-[1.4rem] p-4">
                    <h3 className="text-sm font-semibold text-[var(--accent-cyan)]">
                      {t.actualReturn}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/78">{opportunity.actualReturn}</p>
                  </section>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {(lang === 'en' ? opportunity.tags : opportunity.tagsZh).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/64"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {opportunity.links?.official ? (
                  <div className="mt-6">
                    <a
                      href={opportunity.links.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-button-secondary"
                    >
                      {t.official}
                    </a>
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel-soft rounded-[1.35rem] p-4">
      <div className="section-label text-[10px]">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/86">{value}</div>
    </div>
  )
}
