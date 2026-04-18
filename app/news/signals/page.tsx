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
    badge: 'Signal Feed',
  },
  zh: {
    pageTitle: '新闻信号',
    pageSubtitle: '把 Odaily 和 BlockBeats 的新闻翻译成更可执行的判断、风险提示和行动框架。',
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
    note: '这些卡片用于辅助判断，不代表确定收益。对大多数用户来说，确认信号和控制仓位比速度更重要。',
    badge: 'Signal Feed',
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
    if (level === 'high') return 'border-emerald-400/30 bg-emerald-500/12 text-emerald-100'
    if (level === 'medium') return 'border-amber-400/30 bg-amber-500/12 text-amber-100'
    return 'border-white/12 bg-white/5 text-white/72'
  }

  function getDirectionClasses(direction: NewsSignal['direction']) {
    if (direction === 'bullish') return 'bg-cyan-400/10 text-cyan-100 border-cyan-400/30'
    if (direction === 'bearish') return 'bg-rose-500/10 text-rose-100 border-rose-400/30'
    return 'bg-white/5 text-white/80 border-white/12'
  }

  return (
    <div className="page-shell">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="news" />

      <main className="page-container pb-16 pt-32 md:pt-36">
        <section className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(153,200,255,0.16),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(110,231,212,0.12),transparent_18%)]" />
          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <a href="/news" className="muted-link inline-flex items-center gap-2 text-sm">
                <span aria-hidden="true">←</span>
                <span>{t.back}</span>
              </a>

              <button type="button" onClick={() => void fetchSignals()} className="site-button-secondary">
                {t.refresh}
              </button>
            </div>

            <div className="max-w-4xl">
              <p className="section-label">{t.badge}</p>
              <h1 className="section-title mt-4 text-5xl sm:text-6xl lg:text-7xl">
                {t.pageTitle}
              </h1>
              <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">
                {t.pageSubtitle}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/56">
              <span>
                {t.generatedAt}: {formatTimestamp(generatedAt)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/22" />
              <span>Odaily + BlockBeats</span>
              <span className="h-1 w-1 rounded-full bg-white/22" />
              <span>{signals.length} cards</span>
            </div>
          </div>
        </section>

        <div className="glass-panel-soft mt-8 rounded-[1.7rem] p-5 text-sm leading-6 text-white/72">
          {t.note}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {(['all', 'bullish', 'watch', 'bearish'] as FilterKey[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === item
                  ? 'border-white bg-white text-black'
                  : 'border-white/12 bg-white/[0.04] text-white/72 hover:border-white/20 hover:text-white'
              }`}
            >
              {t.filters[item]}
            </button>
          ))}
        </div>

        <section className="mt-8">
          {loading ? (
            <div className="glass-panel-soft rounded-[1.9rem] px-8 py-20 text-center text-white/65">
              <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-[var(--accent)]" />
              <p>{t.loading}</p>
            </div>
          ) : filteredSignals.length === 0 ? (
            <div className="glass-panel-soft rounded-[1.9rem] px-8 py-20 text-center text-white/65">
              <p>{t.empty}</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredSignals.map((signal, index) => (
                <motion.article
                  key={signal.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.5 }}
                  className="glass-panel rounded-[1.9rem] px-6 py-6"
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
                    <div className="text-right text-xs text-white/46">
                      <div>{signal.source}</div>
                      <div>{formatTimestamp(signal.published)}</div>
                    </div>
                  </div>

                  <a
                    href={signal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 block text-2xl font-semibold leading-tight tracking-[-0.04em] text-white/92 transition hover:text-[var(--accent)]"
                  >
                    {signal.title}
                  </a>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <MetaPill label={t.sections.trigger} value={signal.triggerType} />
                    <MetaPill label={t.sections.window} value={t.windows[signal.timeWindow]} />
                  </div>

                  <SignalBlock title={t.sections.thesis} items={[signal.thesis]} />
                  <SignalBlock title={t.sections.action} items={[signal.actionPlan]} />
                  <SignalBlock title={t.sections.execution} items={signal.execution} />
                  <SignalBlock title={t.sections.risks} items={signal.risks} />
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel-soft rounded-[1.25rem] p-4">
      <div className="section-label text-[10px]">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/84">{value}</div>
    </div>
  )
}

function SignalBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="glass-panel-soft mt-5 rounded-[1.35rem] p-4">
      <h3 className="text-sm font-semibold text-white/84">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/72">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
