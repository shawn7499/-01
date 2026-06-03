'use client'

import { useEffect, useMemo, useState, startTransition } from 'react'
import { motion } from 'framer-motion'
import SiteHeader from '@/components/SiteHeader'
import type { StockKolFeed, StockKolSignal, StockQueue, StockStance } from '@/lib/stock-kol-radar'

type Language = 'zh' | 'en'
type StanceFilter = 'all' | StockStance
type QueueFilter = 'all' | StockQueue

const stanceCopy: Record<StockStance, Record<Language, string>> = {
  bullish: { zh: '看多', en: 'Bullish' },
  neutral: { zh: '中性', en: 'Neutral' },
  bearish: { zh: '看空', en: 'Bearish' },
}

const queueCopy: Record<StockQueue, Record<Language, string>> = {
  constructive: { zh: '建设性看多', en: 'Constructive' },
  watch: { zh: '观察名单', en: 'Watch' },
  caution: { zh: '谨慎跟踪', en: 'Caution' },
  high_risk: { zh: '高风险', en: 'High risk' },
}

const stanceTone: Record<StockStance, string> = {
  bullish: 'border-emerald-300/50 bg-emerald-300/10 text-emerald-100',
  neutral: 'border-slate-300/35 bg-white/8 text-slate-100',
  bearish: 'border-rose-300/50 bg-rose-300/10 text-rose-100',
}

const queueTone: Record<StockQueue, string> = {
  constructive: 'border-emerald-300/50 bg-emerald-300/10 text-emerald-100',
  watch: 'border-blue-300/45 bg-blue-300/10 text-blue-100',
  caution: 'border-amber-300/50 bg-amber-300/10 text-amber-100',
  high_risk: 'border-rose-300/45 bg-rose-300/10 text-rose-100',
}

const sourceCopy: Record<StockKolFeed['sourceStatus'], Record<Language, string>> = {
  live: { zh: '实时数据源', en: 'Live feed' },
  local: { zh: '本地缓存', en: 'Local cache' },
  sample: { zh: '演示样例', en: 'Demo data' },
}

function formatNumber(value: number | null | undefined, digits = 0) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '-'
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return '-'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function scoreGradient(signal: StockKolSignal) {
  if (signal.stance === 'bearish' || signal.queue === 'high_risk') {
    return 'from-rose-400/25 via-slate-950/70 to-slate-950/95'
  }

  if (signal.queue === 'caution') {
    return 'from-amber-300/25 via-slate-950/70 to-slate-950/95'
  }

  return 'from-cyan-300/20 via-slate-950/70 to-slate-950/95'
}

function buildSearchText(signal: StockKolSignal) {
  return [
    signal.ticker,
    signal.companyName,
    signal.sector,
    signal.industry,
    signal.kol,
    signal.thesis,
    signal.risks.join(' '),
  ]
    .join(' ')
    .toLowerCase()
}

export default function StockKolRadarPage({ feed: initialFeed }: { feed: StockKolFeed }) {
  const [language, setLanguage] = useState<Language>('zh')
  const [feed, setFeed] = useState(initialFeed)
  const [query, setQuery] = useState('')
  const [stance, setStance] = useState<StanceFilter>('all')
  const [queue, setQueue] = useState<QueueFilter>('all')
  const [refreshing, setRefreshing] = useState(false)
  const [lastError, setLastError] = useState('')

  const copy = {
    nav: language === 'zh' ? '返回首页' : 'Back home',
    eyebrow: language === 'zh' ? 'US STOCK KOL RADAR' : 'US STOCK KOL RADAR',
    title: language === 'zh' ? '美股 KOL 喊单雷达' : 'Stock KOL Mention Radar',
    description:
      language === 'zh'
        ? '把 Serenity 这类 KOL 的公开观点、提及热度、新闻和基本面线索合并成一个股票观察榜。它不是自动买入信号，而是帮你更快发现“谁被反复提到、为什么被提到、现在该怎么处理”。'
        : 'A ranking surface for public KOL calls, mention momentum, news context, and basic fundamental clues. It is a decision dashboard, not an automatic buy signal.',
    search: language === 'zh' ? '搜索股票、KOL、行业或逻辑' : 'Search ticker, KOL, sector, thesis',
    refresh: language === 'zh' ? '刷新数据' : 'Refresh',
    refreshing: language === 'zh' ? '刷新中...' : 'Refreshing...',
    allStances: language === 'zh' ? '全部观点' : 'All stances',
    allQueues: language === 'zh' ? '全部队列' : 'All queues',
    total: language === 'zh' ? '股票池' : 'Signals',
    bullish: language === 'zh' ? '看多数量' : 'Bullish',
    mentions: language === 'zh' ? '24H 提及' : '24h mentions',
    topScore: language === 'zh' ? '最高评分' : 'Top score',
    source: language === 'zh' ? '数据状态' : 'Source',
    sampleNote:
      language === 'zh'
        ? '当前页面已经支持实时刷新，但还没有接入你的 X 采集器，所以展示的是演示/缓存数据。后面给 KOL_STOCK_RANKING_URL 配置采集器地址即可替换成真实数据。'
        : 'This page is realtime-ready. Configure KOL_STOCK_RANKING_URL to replace demo/cache data with your collector feed.',
    thesis: language === 'zh' ? '交易逻辑' : 'Thesis',
    risks: language === 'zh' ? '风险' : 'Risks',
    recentMentions: language === 'zh' ? '最新 KOL 提及' : 'Recent KOL mentions',
    empty: language === 'zh' ? '没有匹配的股票，换个筛选条件试试。' : 'No matching signals.',
    caution:
      language === 'zh'
        ? '提示：KOL 喊单只能作为情报入口，真正下单前仍要看财报、估值、流动性、期权波动和止损规则。'
        : 'Note: KOL calls are intelligence inputs. Validate earnings, valuation, liquidity, options volatility, and risk rules before trading.',
  }

  const filteredSignals = useMemo(() => {
    const search = query.trim().toLowerCase()

    return feed.signals.filter((signal) => {
      if (stance !== 'all' && signal.stance !== stance) {
        return false
      }

      if (queue !== 'all' && signal.queue !== queue) {
        return false
      }

      if (!search) {
        return true
      }

      return buildSearchText(signal).includes(search)
    })
  }, [feed.signals, query, queue, stance])

  const stats = useMemo(() => {
    const mentions24h = feed.signals.reduce((sum, signal) => sum + signal.mentions24h, 0)
    const bullishCount = feed.signals.filter((signal) => signal.stance === 'bullish').length
    const topScore = feed.signals.reduce((max, signal) => Math.max(max, signal.priorityScore), 0)

    return {
      mentions24h,
      bullishCount,
      topScore,
      total: feed.signals.length,
    }
  }, [feed.signals])

  const refreshFeed = async () => {
    setRefreshing(true)
    setLastError('')

    try {
      const response = await fetch('/api/stocks/kol', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const nextFeed = (await response.json()) as StockKolFeed
      startTransition(() => {
        setFeed(nextFeed)
      })
    } catch (error) {
      setLastError(error instanceof Error ? error.message : 'Refresh failed')
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      void refreshFeed()
    }, 60_000)

    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070b] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute right-[-10rem] top-32 h-[30rem] w-[30rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      </div>

      <SiteHeader active="stocks" lang={language} onLanguageChange={setLanguage} />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,211,252,0.95)]" />
              {copy.eyebrow}
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search}
                className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-200/50 focus:ring-4 focus:ring-cyan-300/10"
              />
              <button
                type="button"
                onClick={() => void refreshFeed()}
                disabled={refreshing}
                className="min-h-12 rounded-2xl border border-white/10 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {refreshing ? copy.refreshing : copy.refresh}
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <select
                value={stance}
                onChange={(event) => setStance(event.target.value as StanceFilter)}
                className="min-h-11 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none focus:border-cyan-200/50"
              >
                <option value="all">{copy.allStances}</option>
                {Object.keys(stanceCopy).map((key) => (
                  <option key={key} value={key}>
                    {stanceCopy[key as StockStance][language]}
                  </option>
                ))}
              </select>
              <select
                value={queue}
                onChange={(event) => setQueue(event.target.value as QueueFilter)}
                className="min-h-11 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none focus:border-cyan-200/50"
              >
                <option value="all">{copy.allQueues}</option>
                {Object.keys(queueCopy).map((key) => (
                  <option key={key} value={key}>
                    {queueCopy[key as StockQueue][language]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: copy.total, value: stats.total },
              { label: copy.bullish, value: stats.bullishCount },
              { label: copy.mentions, value: stats.mentions24h },
              { label: copy.topScore, value: stats.topScore.toFixed(1) },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
                <div className="mt-4 text-3xl font-semibold text-white">{item.value}</div>
              </motion.div>
            ))}

            <div className="sm:col-span-2 rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  {sourceCopy[feed.sourceStatus][language]}
                </span>
                <span className="text-xs text-slate-400">
                  {copy.source}: {feed.sourceLabel} · {formatDate(feed.generatedAt)}
                </span>
              </div>
              {feed.sourceStatus !== 'live' && <p className="mt-4 text-sm leading-6 text-slate-300">{copy.sampleNote}</p>}
              {lastError && <p className="mt-3 text-sm text-rose-200">Refresh error: {lastError}</p>}
            </div>
          </div>
        </motion.div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-4">
          <div className="mb-4 rounded-3xl border border-amber-200/20 bg-amber-200/10 px-4 py-3 text-sm leading-6 text-amber-50">
            {copy.caution}
          </div>

          {filteredSignals.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center text-slate-300">{copy.empty}</div>
          ) : (
            <div className="grid gap-4">
              {filteredSignals.map((signal, index) => (
                <SignalCard key={signal.id} index={index} language={language} signal={signal} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function SignalCard({ signal, language, index }: { signal: StockKolSignal; language: Language; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.45 }}
      className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${scoreGradient(signal)} shadow-xl shadow-black/20`}
    >
      <div className="grid gap-5 p-5 lg:grid-cols-[0.72fr_1.28fr] lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">{signal.ticker}</h2>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${stanceTone[signal.stance]}`}>
                  {stanceCopy[signal.stance][language]}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">{signal.companyName}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-right">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Score</div>
              <div className="mt-1 text-2xl font-semibold text-white">{signal.priorityScore.toFixed(1)}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${queueTone[signal.queue]}`}>
              {queueCopy[signal.queue][language]}
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
              {signal.sector}
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
              {signal.industry}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric label="24H" value={signal.mentions24h} />
            <Metric label="7D" value={signal.mentions7d} />
            <Metric label="30D" value={signal.mentions30d} />
            <Metric label="Revenue YoY" value={`${formatNumber(signal.revenueYoyPct, 1)}%`} />
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-slate-950/35 p-3">
            <MiniMetric label={language === 'zh' ? '新闻' : 'News'} value={signal.news7d} />
            <MiniMetric label={language === 'zh' ? 'SEC' : 'SEC'} value={signal.filings30d} />
            <MiniMetric label={language === 'zh' ? '信心' : 'Conviction'} value={signal.convictionScore.toFixed(1)} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{language === 'zh' ? '交易逻辑' : 'Thesis'}</div>
            <p className="mt-3 text-sm leading-7 text-slate-200">{signal.thesis}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{language === 'zh' ? '风险' : 'Risks'}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {signal.risks.map((risk) => (
                  <span key={risk} className="rounded-full border border-rose-200/20 bg-rose-200/10 px-3 py-1 text-xs text-rose-50">
                    {risk}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{language === 'zh' ? 'KOL' : 'KOLs'}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {signal.kol.split(',').map((kol) => kol.trim()).filter(Boolean).map((kol) => (
                  <span key={kol} className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs text-cyan-50">
                    {kol}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">{language === 'zh' ? '最后提及' : 'Last mention'}: {formatDate(signal.lastMentionAt)}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              {language === 'zh' ? '最新 KOL 提及' : 'Recent KOL mentions'}
            </div>
            <div className="space-y-3">
              {signal.mentions.slice(0, 3).map((mention) => (
                <div key={mention.id} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{mention.author}</span>
                    <span>{formatDate(mention.publishedAt)}</span>
                    {mention.url && (
                      <a href={mention.url} target="_blank" rel="noreferrer" className="text-cyan-200 hover:text-cyan-100">
                        X
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{mention.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
      <div className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-white">{typeof value === 'number' ? formatNumber(value) : value}</div>
    </div>
  )
}

function MiniMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <div className="text-[0.65rem] uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white">{typeof value === 'number' ? formatNumber(value) : value}</div>
    </div>
  )
}
