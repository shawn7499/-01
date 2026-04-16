'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'

type Lang = 'en' | 'zh'

type Gainer = {
  symbol: string
  price: number
  change_1h: number
  volume: number
  exchange: string
}

type GainersResponse = {
  success: boolean
  timestamp?: string
  error?: string
  data?: {
    okx?: Gainer[]
    binance?: Gainer[]
  }
}

const copy = {
  en: {
    badge: 'Live Crypto Monitor',
    title: '1H Gainers Watchlist',
    subtitle:
      'A local FastAPI monitor that tracks the top one-hour gainers on OKX and Binance, refreshed automatically every minute.',
    refresh: 'Refresh Now',
    refreshing: 'Refreshing...',
    autoRefresh: 'Auto refresh every 60 seconds',
    lastUpdated: 'Last updated',
    dataSource: 'Data source',
    okx: 'OKX Top 10',
    binance: 'Binance Top 10',
    rank: '#',
    symbol: 'Symbol',
    price: 'Price',
    change: '1H Change',
    volume: 'Volume',
    loading: 'Loading monitor data...',
    empty: 'No gainers available right now.',
    errorTitle: 'Monitor service unavailable',
    errorHint:
      'Make sure the FastAPI service is running on http://localhost:8004, or set GAINERS_API_URL to a reachable endpoint before deployment.',
    sourceProxy: 'Next.js proxy',
    sourceLocal: 'Local fallback',
  },
  zh: {
    badge: '实时加密监控',
    title: '1 小时涨幅榜监控',
    subtitle:
      '接入本地 FastAPI 涨幅榜服务，展示 OKX 和币安 1 小时涨幅 Top 10，并每分钟自动刷新。',
    refresh: '立即刷新',
    refreshing: '刷新中...',
    autoRefresh: '每 60 秒自动刷新',
    lastUpdated: '最后更新',
    dataSource: '数据来源',
    okx: 'OKX 涨幅 Top 10',
    binance: '币安涨幅 Top 10',
    rank: '#',
    symbol: '币种',
    price: '价格',
    change: '1H 涨幅',
    volume: '成交量',
    loading: '正在加载监控数据...',
    empty: '当前暂无涨幅榜数据。',
    errorTitle: '监控服务暂时不可用',
    errorHint:
      '请确认 FastAPI 服务已运行在 http://localhost:8004，或者上线前把 GAINERS_API_URL 配置成公网可访问地址。',
    sourceProxy: 'Next.js 代理',
    sourceLocal: '本地直连备用',
  },
} as const

export default function CryptoMonitorPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const [data, setData] = useState<GainersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [source, setSource] = useState<'proxy' | 'local'>('proxy')
  const [lastChecked, setLastChecked] = useState<string | null>(null)
  const t = copy[lang]

  const okx = useMemo(() => normalizeList(data?.data?.okx), [data])
  const binance = useMemo(() => normalizeList(data?.data?.binance), [data])

  useEffect(() => {
    void fetchGainers()
    const interval = window.setInterval(() => {
      void fetchGainers({ silent: true })
    }, 60000)

    return () => window.clearInterval(interval)
  }, [])

  async function fetchGainers(options?: { silent?: boolean }) {
    if (options?.silent) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const proxyData = await requestJson('/api/crypto-monitor/gainers')
      setSource('proxy')
      setData(proxyData)
      setLastChecked(new Date().toISOString())
    } catch (proxyError) {
      try {
        const localData = await requestJson('http://localhost:8004/api/gainers')
        setSource('local')
        setData(localData)
        setLastChecked(new Date().toISOString())
      } catch (localError) {
        console.error('Crypto monitor fetch failed:', { proxyError, localError })
        setData({
          success: false,
          timestamp: new Date().toISOString(),
          error:
            localError instanceof Error
              ? localError.message
              : 'Unable to load crypto monitor data',
        })
        setLastChecked(new Date().toISOString())
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="crypto-monitor" />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.16),transparent_30%),rgba(255,255,255,0.03)] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">{t.badge}</p>
              <h1 className="mt-4 text-4xl font-black sm:text-6xl">{t.title}</h1>
              <p className="mt-5 text-sm leading-7 text-white/72 sm:text-base">{t.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => fetchGainers()}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center rounded-full border border-white bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading || refreshing ? t.refreshing : t.refresh}
            </button>
          </div>
        </motion.section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard label={t.autoRefresh} value="60s" />
          <InfoCard label={t.lastUpdated} value={formatDate(data?.timestamp || lastChecked, lang)} />
          <InfoCard
            label={t.dataSource}
            value={source === 'proxy' ? t.sourceProxy : t.sourceLocal}
          />
        </section>

        {loading ? (
          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] px-8 py-20 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="mt-5 text-sm text-white/65">{t.loading}</p>
          </section>
        ) : data?.success === false ? (
          <section className="mt-8 rounded-[2rem] border border-rose-400/25 bg-rose-500/8 p-6">
            <h2 className="text-2xl font-black text-rose-100">{t.errorTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-rose-50/75">{data.error || t.errorHint}</p>
            <p className="mt-3 text-sm leading-7 text-white/55">{t.errorHint}</p>
          </section>
        ) : (
          <section className="mt-8 grid gap-6 xl:grid-cols-2">
            <ExchangeTable title={t.okx} rows={okx} lang={lang} />
            <ExchangeTable title={t.binance} rows={binance} lang={lang} />
          </section>
        )}
      </main>
    </div>
  )
}

function ExchangeTable({ title, rows, lang }: { title: string; rows: Gainer[]; lang: Lang }) {
  const t = copy[lang]

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
          Top {rows.length || 10}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="px-6 py-16 text-center text-sm text-white/55">{t.empty}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-white/35">
                <th className="px-5 py-4 font-semibold">{t.rank}</th>
                <th className="px-5 py-4 font-semibold">{t.symbol}</th>
                <th className="px-5 py-4 font-semibold">{t.price}</th>
                <th className="px-5 py-4 font-semibold">{t.change}</th>
                <th className="px-5 py-4 font-semibold">{t.volume}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={`${row.exchange}-${row.symbol}-${index}`}
                  className="border-b border-white/8 transition hover:bg-white/[0.04]"
                >
                  <td className="px-5 py-4 text-sm font-bold text-white/45">{index + 1}</td>
                  <td className="px-5 py-4">
                    <div className="text-base font-black">{row.symbol}</div>
                    <div className="mt-1 text-xs text-white/38">{row.exchange}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-white/80">{formatPrice(row.price)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-black ${
                        row.change_1h >= 0
                          ? 'bg-emerald-400/12 text-emerald-200'
                          : 'bg-rose-400/12 text-rose-200'
                      }`}
                    >
                      {row.change_1h >= 0 ? '+' : ''}
                      {row.change_1h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-white/65">
                    {formatVolume(row.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.article>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs uppercase tracking-[0.22em] text-white/35">{label}</div>
      <div className="mt-3 text-base font-semibold text-white/85">{value}</div>
    </div>
  )
}

async function requestJson(url: string): Promise<GainersResponse> {
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  const data = (await response.json()) as GainersResponse

  if (!data.success) {
    throw new Error(data.error || 'Monitor returned unsuccessful response')
  }

  return data
}

function normalizeList(rows?: Gainer[]) {
  return [...(rows || [])]
    .filter((row) => Number.isFinite(row.change_1h))
    .sort((left, right) => right.change_1h - left.change_1h)
    .slice(0, 10)
}

function formatPrice(price: number) {
  if (!Number.isFinite(price)) return '--'
  if (price >= 1) return `$${price.toFixed(4)}`
  if (price >= 0.01) return `$${price.toFixed(6)}`
  return `$${price.toFixed(8)}`
}

function formatVolume(volume: number) {
  if (!Number.isFinite(volume)) return '--'
  if (volume >= 1_000_000_000) return `$${(volume / 1_000_000_000).toFixed(2)}B`
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(1)}K`
  return `$${volume.toFixed(0)}`
}

function formatDate(value: string | undefined | null, lang: Lang) {
  if (!value) return '--'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '--'

  return date.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}
