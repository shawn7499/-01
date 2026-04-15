'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'
import type { NewsSignal } from '@/lib/news-signals'

type Lang = 'en' | 'zh'
type FilterKey = 'all' | 'bullish' | 'watch' | 'bearish'

const translations = {
  en: {
    pageTitle: 'News Signals',
    pageSubtitle:
      'Odaily and BlockBeats headlines translated into tradeable scenarios and risk-aware action plans.',
    back: 'Back to News',
    refresh: 'Refresh',
    generatedAt: 'Updated',
    filters: {
      all: 'All',
      bullish: 'Bullish',
      watch: 'Watchlist',
      bearish: 'Risk-Off',
    },
    levels: {
      high: 'High Conviction',
      medium: 'Medium Conviction',
      low: 'Low Conviction',
    },
    directions: {
      bullish: 'Bullish Setup',
      watch: 'Watch Setup',
      bearish: 'Risk Warning',
    },
    windows: {
      immediate: 'Act fast',
      same_day: 'Same day',
      swing: 'Swing window',
      research: 'Research first',
    },
    sections: {
      thesis: 'Why It Matters',
      action: 'Suggested Action',
      execution: 'Execution Checklist',
      risks: 'Key Risks',
      trigger: 'Trigger Type',
      window: 'Time Window',
    },
    loading: 'Building signal cards...',
    empty: 'No signals match this filter right now.',
    note:
      'These cards are decision-support summaries, not guaranteed outcomes. Small size and confirmation matter more than speed.',
  },
  zh: {
    pageTitle: '新闻信号',
    pageSubtitle: '把 Odaily 和 BlockBeats 的新闻翻译成可执行的机会判断与风险提示。',
    back: '返回新闻页',
    refresh: '刷新',
    generatedAt: '更新时间',
    filters: {
      all: '全部',
      bullish: '偏多机会',
      watch: '观察名单',
      bearish: '风险提示',
    },
    levels: {
      high: '高优先级',
      medium: '中优先级',
      low: '低优先级',
    },
    directions: {
      bullish: '偏多信号',
      watch: '观察信号',
      bearish: '回避信号',
    },
    windows: {
      immediate: '尽快确认',
      same_day: '日内关注',
      swing: '波段窗口',
      research: '先研究再动',
    },
    sections: {
      thesis: '为什么重要',
      action: '建议动作',
      execution: '执行清单',
      risks: '核心风险',
      trigger: '触发类型',
      window: '时间窗口',
    },
    loading: '正在生成信号卡片...',
    empty: '当前筛选下没有匹配的信号。',
    note: '这些卡片用于辅助判断，不代表确定收益。对多数用户来说，确认信号和控制仓位比速度更重要。',
  },
} as const

export default function NewsSignalsPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const [signals, setSignals] = useState<NewsSignal[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [generatedAt, setGeneratedAt] = useState('')

  const t = translations[lang]

  useEffect(() => {
    void fetchSignals()
  }, [])

  const filteredSignals = useMemo(() => {
    if (filter === 'all') {
      return signals
    }
    return signals.filter((signal) => signal.direction === filter)
  }, [filter, signals])

  async function fetchSignals() {
    try {
      setLoading(true)
      const response = await fetch('/api/news/signals?limit=24', { cache: 'no-store' })
      const data = await response.json()
      setSignals(data.signals || [])
      setGeneratedAt(data.generatedAt || '')
    } catch (error) {
      console.error('Failed to fetch signals:', error)
      setSignals([])
    } finally {
      setLoading(false)
    }
  }

  function formatTimestamp(value: string) {
    if (!value) return '--'
    return new Date(value).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function getLevelClasses(level: NewsSignal['opportunityLevel']) {
    if (level === 'high') return 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
    if (level === 'medium') return 'border-amber-400/60 bg-amber-500/10 text-amber-100'
    return 'border-slate-500/60 bg-slate-500/10 text-slate-200'
  }

  function getDirectionClasses(direction: NewsSignal['direction']) {
    if (direction === 'bullish') return 'bg-cyan-400/10 text-cyan-200 border-cyan-400/40'
    if (direction === 'bearish') return 'bg-rose-500/10 text-rose-200 border-rose-400/40'
    return 'bg-white/5 text-white/80 border-white/15'
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="news" />

      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,#1f3b4d,transparent_45%),radial-gradient(circle_at_80%_20%,#28301a,transparent_25%),#060606]">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <a
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <span>←</span>
              <span>{t.back}</span>
            </a>
            <button
              onClick={() => void fetchSignals()}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              {t.refresh}
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/70">Signal Feed</p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{t.pageTitle}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
              {t.pageSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span>
                {t.generatedAt}: {formatTimestamp(generatedAt)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>Odaily + BlockBeats</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{signals.length} cards</span>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3">
            {(['all', 'bullish', 'watch', 'bearish'] as FilterKey[]).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  filter === item
                    ? 'border-white bg-white text-black'
                    : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
                }`}
              >
                {t.filters[item]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-400/8 p-4 text-sm leading-6 text-amber-50/85">
          {t.note}
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
            <p>{t.loading}</p>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredSignals.map((signal, index) => (
              <motion.article
                key={signal.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.24) }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getLevelClasses(signal.opportunityLevel)}`}
                    >
                      {t.levels[signal.opportunityLevel]}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDirectionClasses(signal.direction)}`}
                    >
                      {t.directions[signal.direction]}
                    </span>
                  </div>
                  <div className="text-right text-xs text-white/45">
                    <div>{signal.source}</div>
                    <div>{formatTimestamp(signal.published)}</div>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href={signal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold leading-tight transition hover:text-cyan-200"
                  >
                    {signal.title}
                  </a>
                  <p className="mt-3 text-sm leading-6 text-white/60">{signal.description}</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <SignalMetric label={t.sections.trigger} value={signal.triggerType} />
                  <SignalMetric label="Score" value={`${signal.score} / 100`} />
                  <SignalMetric label={t.sections.window} value={t.windows[signal.timeWindow]} />
                </div>

                <div className="mt-5 grid gap-5">
                  <SignalBlock title={t.sections.thesis} accent="text-cyan-200">
                    {signal.thesis}
                  </SignalBlock>
                  <SignalBlock title={t.sections.action} accent="text-emerald-200">
                    {signal.actionPlan}
                  </SignalBlock>
                  <ListBlock title={t.sections.execution} accent="text-white" items={signal.execution} dotClass="bg-cyan-300" />
                  <ListBlock title={t.sections.risks} accent="text-rose-200" items={signal.risks} dotClass="bg-rose-300" />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(signal.detectedAssets.length ? signal.detectedAssets : [signal.category]).map((asset) => (
                    <span
                      key={asset}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function SignalMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.25em] text-white/35">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  )
}

function SignalBlock({
  title,
  accent,
  children,
}: {
  title: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h2 className={`text-sm font-semibold ${accent}`}>{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/78">{children}</p>
    </section>
  )
}

function ListBlock({
  title,
  accent,
  items,
  dotClass,
}: {
  title: string
  accent: string
  items: string[]
  dotClass: string
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h2 className={`text-sm font-semibold ${accent}`}>{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-white/72">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${dotClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
