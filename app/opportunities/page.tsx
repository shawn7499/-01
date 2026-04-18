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
      'Track event-driven setups, launch narratives, and strategy ideas in one place.',
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
  },
  zh: {
    title: '市场机遇',
    subtitle: '把题材、事件和策略机会放到同一个页面里，方便快速筛选和跟踪。',
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
    empty: '当前筛选下没有可展示的机会。',
    official: '官方链接',
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
    if (status === 'active') return 'bg-emerald-500 text-black'
    if (status === 'ending_soon') return 'bg-amber-400 text-black'
    return 'bg-white/20 text-white'
  }

  function getRiskColor(risk: 'low' | 'medium' | 'high') {
    if (risk === 'low') return 'text-emerald-300'
    if (risk === 'medium') return 'text-amber-300'
    return 'text-rose-300'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="opportunities" />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_75%_20%,rgba(59,130,246,0.14),transparent_30%),rgba(255,255,255,0.03)] p-6 sm:p-8"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">
            Opportunity Board
          </p>
          <h1 className="mt-4 text-4xl font-black sm:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
            {t.subtitle}
          </p>
        </motion.section>

        <div className="mb-10 flex flex-wrap gap-3">
          {([
            ['all', t.filterAll],
            ['active', t.filterActive],
            ['ending_soon', t.filterEnding],
            ['expired', t.filterExpired],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === key
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.article
                key={opportunity.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.06, 0.24) }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          opportunity.resolvedStatus
                        )}`}
                      >
                        {statusLabels[lang][opportunity.resolvedStatus]}
                      </span>
                      <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/75">
                        {categoryLabels[lang][opportunity.category]}
                      </span>
                      <span className={`text-sm font-semibold ${getRiskColor(opportunity.riskLevel)}`}>
                        {riskLabels[lang][opportunity.riskLevel]}
                      </span>
                    </div>

                    <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                      {lang === 'en' ? opportunity.title : opportunity.titleZh}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                      {lang === 'en' ? opportunity.description : opportunity.descriptionZh}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                <section className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-sm font-semibold text-white/85">{t.participation}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {lang === 'en'
                      ? opportunity.participationMethod
                      : opportunity.participationMethodZh}
                  </p>
                </section>

                {opportunity.actualReturn ? (
                  <section className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="text-sm font-semibold text-cyan-200">{t.actualReturn}</h3>
                    <p className="mt-2 text-sm leading-6 text-cyan-100/90">
                      {opportunity.actualReturn}
                    </p>
                  </section>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {(lang === 'en' ? opportunity.tags : opportunity.tagsZh).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {opportunity.links?.official ? (
                  <div className="mt-5">
                    <a
                      href={opportunity.links.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
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
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-[0.22em] text-white/35">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  )
}
