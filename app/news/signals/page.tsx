'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'
import type { NewsSignal } from '@/lib/news-signals'

type Lang = 'en' | 'zh'
type FilterKey = 'all' | 'high' | 'bullish' | 'watch' | 'bearish'

const translations = {
  en: {
    pageTitle: 'Crypto Intelligence Agent',
    pageSubtitle:
      'An Odaily and BlockBeats monitor that turns fresh headlines into market intelligence, risk notes, and next actions.',
    back: 'Back to News',
    refresh: 'Refresh',
    refreshing: 'Refreshing...',
    generatedAt: 'Updated',
    scanned: 'Headlines scanned',
    cards: 'Intel cards',
    sources: 'Sources',
    filters: {
      all: 'All',
      high: 'High Priority',
      bullish: 'Opportunity',
      watch: 'Watch',
      bearish: 'Risk',
    },
    levels: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    directions: {
      bullish: 'Opportunity',
      watch: 'Watch',
      bearish: 'Risk',
    },
    windows: {
      immediate: 'Immediate',
      same_day: 'Same day',
      swing: 'Swing',
      research: 'Research',
    },
    sections: {
      thesis: 'Intelligence',
      action: 'Next Action',
      execution: 'Checklist',
      risks: 'Risks',
      trigger: 'Trigger',
      window: 'Window',
      assets: 'Assets',
    },
    loading: 'Building intelligence cards...',
    empty: 'No intelligence cards match this filter right now.',
    note:
      'This is a decision-support agent. It helps you prioritize research, not guarantee trades.',
  },
  zh: {
    pageTitle: '加密情报智能体',
    pageSubtitle:
      '监控 Odaily 和 BlockBeats，把最新消息整理成市场情报、风险提示和下一步行动建议。',
    back: '返回新闻页',
    refresh: '刷新',
    refreshing: '刷新中...',
    generatedAt: '更新时间',
    scanned: '扫描新闻',
    cards: '情报卡片',
    sources: '来源',
    filters: {
      all: '全部',
      high: '高优先级',
      bullish: '机会',
      watch: '观察',
      bearish: '风险',
    },
    levels: {
      high: '高',
      medium: '中',
      low: '低',
    },
    directions: {
      bullish: '机会',
      watch: '观察',
      bearish: '风险',
    },
    windows: {
      immediate: '即时',
      same_day: '日内',
      swing: '波段',
      research: '先研究',
    },
    sections: {
      thesis: '情报判断',
      action: '下一步动作',
      execution: '执行清单',
      risks: '风险提示',
      trigger: '触发类型',
      window: '时间窗口',
      assets: '影响对象',
    },
    loading: '正在生成情报卡片...',
    empty: '当前筛选下没有匹配的情报。',
    note: '这是辅助决策智能体，用来帮你排序研究优先级，不代表确定收益或直接买卖建议。',
  },
} as const

export default function NewsSignalsPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const [signals, setSignals] = useState<NewsSignal[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [generatedAt, setGeneratedAt] = useState('')
  const [scanned, setScanned] = useState(0)
  const [sources, setSources] = useState<string[]>([])

  const t = translations[lang]

  useEffect(() => {
    void fetchSignals()
    const interval = window.setInterval(() => {
      void fetchSignals(false)
    }, 60000)

    return () => window.clearInterval(interval)
  }, [])

  const filteredSignals = useMemo(() => {
    if (filter === 'all') {
      return signals
    }
    if (filter === 'high') {
      return signals.filter((signal) => signal.opportunityLevel === 'high')
    }
    return signals.filter((signal) => signal.direction === filter)
  }, [filter, signals])

  const summary = useMemo(
    () => ({
      high: signals.filter((signal) => signal.opportunityLevel === 'high').length,
      opportunities: signals.filter((signal) => signal.direction === 'bullish').length,
      risks: signals.filter((signal) => signal.direction === 'bearish').length,
    }),
    [signals]
  )

  async function fetchSignals(showLoading = true) {
    try {
      if (showLoading) {
        setLoading(true)
      }
      const response = await fetch('/api/news/signals?limit=40', { cache: 'no-store' })
      const data = await response.json()
      setSignals(data.signals || [])
      setGeneratedAt(data.generatedAt || '')
      setScanned(data.scanned || 0)
      setSources(data.sources || [])
    } catch (error) {
      console.error('Failed to fetch intelligence:', error)
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
    return 'border-white/15 bg-white/5 text-white/72'
  }

  function getDirectionClasses(direction: NewsSignal['direction']) {
    if (direction === 'bullish') return 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
    if (direction === 'bearish') return 'border-rose-400/40 bg-rose-500/10 text-rose-200'
    return 'border-white/15 bg-white/5 text-white/78'
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="news" />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <a href="/news" className="text-sm text-white/65 transition hover:text-white">
            ← {t.back}
          </a>
          <button
            onClick={() => void fetchSignals()}
            disabled={loading}
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? t.refreshing : t.refresh}
          </button>
        </div>

        <section className="mb-8 border-b border-white/10 pb-8">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-200/70">
            Odaily + BlockBeats
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
            {t.pageTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
            {t.pageSubtitle}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryItem label={t.generatedAt} value={formatTimestamp(generatedAt)} />
            <SummaryItem label={t.scanned} value={String(scanned)} />
            <SummaryItem label={t.cards} value={String(signals.length)} />
            <SummaryItem label={t.sources} value={sources.join(' / ') || '--'} />
          </div>
        </section>

        <section className="mb-8 grid gap-3 md:grid-cols-3">
          <MiniStat label={t.filters.high} value={summary.high} />
          <MiniStat label={t.filters.bullish} value={summary.opportunities} />
          <MiniStat label={t.filters.bearish} value={summary.risks} />
        </section>

        <div className="mb-6 flex flex-wrap gap-3">
          {(['all', 'high', 'bullish', 'watch', 'bearish'] as FilterKey[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === item
                  ? 'border-white bg-white text-black'
                  : 'border-white/15 bg-white/[0.04] text-white/75 hover:border-white/30 hover:text-white'
              }`}
            >
              {t.filters[item]}
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-50/85">
          {t.note}
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
            <p>{t.loading}</p>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredSignals.map((signal, index) => (
              <motion.article
                key={signal.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.18) }}
                className="border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getLevelClasses(signal.opportunityLevel)}`}>
                      {t.levels[signal.opportunityLevel]}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDirectionClasses(signal.direction)}`}>
                      {t.directions[signal.direction]}
                    </span>
                  </div>
                  <div className="text-right text-xs text-white/45">
                    <div>{signal.source}</div>
                    <div>{formatTimestamp(signal.published)}</div>
                  </div>
                </div>

                <a
                  href={signal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block text-xl font-bold leading-snug transition hover:text-cyan-200"
                >
                  {signal.title}
                </a>

                {signal.description ? (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/55">
                    {signal.description}
                  </p>
                ) : null}

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <SignalMetric label={t.sections.trigger} value={signal.triggerType} />
                  <SignalMetric label="Score" value={`${signal.score}/100`} />
                  <SignalMetric label={t.sections.window} value={t.windows[signal.timeWindow]} />
                </div>

                <div className="mt-5 space-y-4">
                  <SignalBlock title={t.sections.thesis}>{signal.thesis}</SignalBlock>
                  <SignalBlock title={t.sections.action}>{signal.actionPlan}</SignalBlock>
                  <ListBlock title={t.sections.execution} items={signal.execution} />
                  <ListBlock title={t.sections.risks} items={signal.risks} danger />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(signal.detectedAssets.length ? signal.detectedAssets : [signal.category]).map((asset) => (
                    <span
                      key={asset}
                      className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
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

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-white/35">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-4">
      <div className="text-sm text-white/55">{label}</div>
      <div className="mt-2 text-3xl font-black">{value}</div>
    </div>
  )
}

function SignalMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/20 p-3">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  )
}

function SignalBlock({ title, children }: { title: string; children: string }) {
  return (
    <section className="border border-white/10 bg-black/20 p-4">
      <h2 className="text-sm font-semibold text-cyan-100">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/75">{children}</p>
    </section>
  )
}

function ListBlock({ title, items, danger = false }: { title: string; items: string[]; danger?: boolean }) {
  return (
    <section className="border border-white/10 bg-black/20 p-4">
      <h2 className={`text-sm font-semibold ${danger ? 'text-rose-200' : 'text-white'}`}>{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-white/72">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${danger ? 'bg-rose-300' : 'bg-cyan-300'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
