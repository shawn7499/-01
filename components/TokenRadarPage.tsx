'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'
import type { HotTokenSignal } from '@/lib/hot-tokens'

type Lang = 'en' | 'zh'

type TokenRadarPageProps = {
  signals: HotTokenSignal[]
  generatedAt: string
}

type RefreshStatus = {
  tone: 'success' | 'neutral' | 'error'
  checkedAt: string
  newTokens: number
  changedTokens: number
}

const copy = {
  en: {
    hero: {
      badge: 'Token Radar',
      source: 'GMGN Live Feed',
      title: 'All hot onchain tokens in one place',
      subtitle:
        'Track the broader hot-token stream with contracts, chain labels, market context, and direct GMGN links.',
      refresh: 'Refresh',
      refreshing: 'Refreshing...',
      updated: 'Updated',
      sourceLabel: 'Source',
      cta: 'Jump to Feed',
    },
    stats: {
      total: 'Hot Feed',
      bsc: 'BNB Chain',
      bscDescription: 'Visible inside the same feed',
      liveLabel: 'Research Ready',
      liveValue: 'Live',
      liveDescription: 'Contracts, chains, reasons, and links included',
    },
    section: {
      badge: 'All Hot Tokens',
      title: 'Cross-chain hot tokens',
      description:
        'Scan the full feed first, then use the chain filter to focus on BNB Chain, Solana, Base, or other pockets of momentum.',
      filterLabel: 'Chain filter',
      allChains: 'All chains',
      disclaimer:
        'This page is for monitoring and research support only. Hot attention does not equal low risk, and narrative tokens still need contract, holder, and liquidity checks before any decision.',
      loading: 'Loading latest token data...',
      empty: 'No hot-token data is available right now.',
      summary: 'Watch Thesis',
      reasons: 'Why It Is Hot',
      risks: 'Risk Flags',
      contract: 'Contract',
      price: 'Price',
      volume1h: '1H volume',
      liquidity: 'Liquidity',
      momentum24h: '24H change',
      pairAge: 'Age',
      buys1h: '1H buys',
      sells1h: '1H sells',
      score: 'Heat score',
    },
    actions: {
      copy: 'Copy',
      copied: 'Copied',
      openGmgn: 'Open GMGN',
      openExplorer: 'Open Explorer',
    },
    labels: {
      website: 'Website',
      twitter: 'X',
      telegram: 'Telegram',
      docs: 'Docs',
      app: 'App',
      explorer: 'Explorer',
      gmgn: 'GMGN',
      other: 'Link',
    },
  },
  zh: {
    hero: {
      badge: '代币雷达',
      source: 'GMGN 实时数据',
      title: '全站热门代币',
      subtitle: '在一个页面里查看热门代币、所属链、合约地址、热度理由和直达 GMGN 的链接。',
      refresh: '刷新',
      refreshing: '刷新中...',
      updated: '更新时间',
      sourceLabel: '数据源',
      cta: '查看热门列表',
    },
    stats: {
      total: '热门总览',
      bsc: 'BNB Chain',
      bscDescription: '已并入主热门流',
      liveLabel: '研究就绪',
      liveValue: '在线',
      liveDescription: '合约、链、理由和跳转链接都已整理',
    },
    section: {
      badge: '热门代币',
      title: '跨链热门代币',
      description: '先看整体热门流，再用链筛选切到 BNB Chain、Solana、Base 等重点链。',
      filterLabel: '链筛选',
      allChains: '全部链',
      disclaimer:
        '这个页面用于观察和研究，不构成投资建议。热度不等于安全，做决定前仍然要复核合约、持仓结构和流动性。',
      loading: '正在加载最新代币数据...',
      empty: '当前没有拿到热门代币数据。',
      summary: '观察逻辑',
      reasons: '热门理由',
      risks: '风险提示',
      contract: '合约地址',
      price: '价格',
      volume1h: '1 小时成交量',
      liquidity: '流动性',
      momentum24h: '24 小时涨跌',
      pairAge: '上线时间',
      buys1h: '1 小时买单',
      sells1h: '1 小时卖单',
      score: '热度分',
    },
    actions: {
      copy: '复制',
      copied: '已复制',
      openGmgn: '打开 GMGN',
      openExplorer: '打开浏览器',
    },
    labels: {
      website: '官网',
      twitter: 'X',
      telegram: 'Telegram',
      docs: '文档',
      app: '应用',
      explorer: '浏览器',
      gmgn: 'GMGN',
      other: '链接',
    },
  },
} as const

function formatCompactNumber(value: number | null, lang: Lang) {
  if (value === null || Number.isNaN(value)) return '--'

  return new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 1000 ? 1 : 2,
  }).format(value)
}

function formatCurrency(value: number | null, lang: Lang) {
  if (value === null || Number.isNaN(value)) return '--'

  if (value >= 1) {
    return new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value)
  }

  return `$${value.toFixed(value >= 0.01 ? 4 : 8)}`
}

function formatPercent(value: number | null) {
  if (value === null || Number.isNaN(value)) return '--'
  const prefix = value > 0 ? '+' : ''
  return `${prefix}${value.toFixed(1)}%`
}

function formatAge(hours: number | null, lang: Lang) {
  if (hours === null) return '--'

  if (hours < 1) {
    const minutes = Math.max(1, Math.round(hours * 60))
    return lang === 'zh' ? `${minutes} 分钟` : `${minutes} min`
  }

  if (hours < 24) {
    return lang === 'zh' ? `${hours.toFixed(1)} 小时` : `${hours.toFixed(1)} h`
  }

  const days = hours / 24
  return lang === 'zh' ? `${days.toFixed(1)} 天` : `${days.toFixed(1)} d`
}

function formatTimestamp(value: string, lang: Lang) {
  if (!value) return '--'

  return new Date(value).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function sectionMeta(signals: HotTokenSignal[]) {
  const chains = Array.from(new Set(signals.map((signal) => signal.chainLabel)))
  return chains.join(' / ') || 'GMGN'
}

function countSignalChanges(previousSignals: HotTokenSignal[], nextSignals: HotTokenSignal[]) {
  const previousMap = new Map(previousSignals.map((signal) => [signal.id, signal]))

  let newTokens = 0
  let changedTokens = 0

  for (const signal of nextSignals) {
    const previousSignal = previousMap.get(signal.id)

    if (!previousSignal) {
      newTokens += 1
      changedTokens += 1
      continue
    }

    if (
      previousSignal.score !== signal.score ||
      previousSignal.priceChange1h !== signal.priceChange1h ||
      previousSignal.priceChange24h !== signal.priceChange24h ||
      previousSignal.volume1h !== signal.volume1h ||
      previousSignal.liquidityUsd !== signal.liquidityUsd
    ) {
      changedTokens += 1
    }
  }

  return { newTokens, changedTokens }
}

function describeRefreshStatus(status: RefreshStatus, lang: Lang) {
  if (status.tone === 'error') {
    return {
      message:
        lang === 'zh'
          ? '刷新失败了，稍后再试一次。'
          : 'Refresh failed. Please try again in a moment.',
      meta:
        lang === 'zh'
          ? `最后检查：${formatTimestamp(status.checkedAt, lang)}`
          : `Last check: ${formatTimestamp(status.checkedAt, lang)}`,
      className: 'border-rose-300/20 bg-rose-400/10 text-rose-100/90',
    }
  }

  if (status.newTokens > 0) {
    return {
      message:
        lang === 'zh'
          ? `刚刚已刷新，发现 ${status.newTokens} 个新代币。`
          : `Updated just now. ${status.newTokens} new tokens detected.`,
      meta:
        lang === 'zh'
          ? `最后检查：${formatTimestamp(status.checkedAt, lang)}`
          : `Last check: ${formatTimestamp(status.checkedAt, lang)}`,
      className: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100/90',
    }
  }

  if (status.changedTokens > 0) {
    return {
      message:
        lang === 'zh'
          ? `刚刚已刷新，${status.changedTokens} 个代币数据有变化。`
          : `Updated just now. ${status.changedTokens} token entries changed.`,
      meta:
        lang === 'zh'
          ? `最后检查：${formatTimestamp(status.checkedAt, lang)}`
          : `Last check: ${formatTimestamp(status.checkedAt, lang)}`,
      className: 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100/90',
    }
  }

  return {
    message:
      lang === 'zh'
        ? '刚刚已检查，热门列表没有明显变化。'
        : 'Checked just now. No major feed changes detected.',
    meta:
      lang === 'zh'
        ? `最后检查：${formatTimestamp(status.checkedAt, lang)}`
        : `Last check: ${formatTimestamp(status.checkedAt, lang)}`,
    className: 'border-white/10 bg-white/[0.05] text-white/75',
  }
}

function localizeGeneratedLine(text: string, lang: Lang) {
  if (lang === 'en') {
    return text
  }

  const rules: Array<[RegExp, (matches: RegExpMatchArray) => string]> = [
    [/GMGN hot level is elevated at (\d+)\./, (m) => `GMGN 热度等级较高，当前为 ${m[1]}。`],
    [/Smart-money participation is notable with (\d+) active wallets\./, (m) => `聪明钱参与度不低，当前活跃钱包约为 ${m[1]} 个。`],
    [/1-hour volume is already above \$1M\./, () => '1 小时成交量已经超过 100 万美元。'],
    [/Liquidity is stronger than most fresh meme launches\./, () => '流动性强于大多数新发的 meme 代币。'],
    [/One-hour momentum is extremely strong\./, () => '1 小时动能非常强。'],
    [/One-hour momentum is clearly positive\./, () => '1 小时动能明显偏强。'],
    [/Buy-side activity is still dominating the last hour\./, () => '最近 1 小时依然是买盘占优。'],
    [/The token is still very new, so attention is concentrated and fast-moving\./, () => '这个代币还很新，注意力集中且变化很快。'],
    [/Chinese-language or Chinese narrative cues are part of the attention\./, () => '中文文本或中文叙事线索也是热度来源之一。'],
    [/New listing: volatility can be extreme\./, () => '新上线代币，波动可能非常大。'],
    [/Top-holder concentration is elevated\./, () => '前排持仓集中度偏高。'],
    [/The move is already steep, so pullback risk is high\./, () => '涨幅已经较陡，回撤风险偏高。'],
    [/Contract source visibility is limited\./, () => '合约源码可见性有限。'],
    [/Ownership is not clearly renounced yet\./, () => '所有权是否放弃还不够明确。'],
    [/Creator wallet still appears active in token holdings\./, () => '创建者钱包在持仓中依然较活跃。'],
    [/Launchpad: (.+)\./, (m) => `启动平台：${m[1]}。`],
    [/GMGN translation hints: (.+)\./, (m) => `GMGN 给出的翻译线索包括：${m[1]}。`],
  ]

  for (const [pattern, formatter] of rules) {
    const matches = text.match(pattern)
    if (matches) {
      return formatter(matches)
    }
  }

  return text
}

function linkLabel(signal: HotTokenSignal, url: string, label: string | undefined, lang: Lang) {
  const labels = copy[lang].labels

  if (url === signal.dexscreenerUrl || label === 'GMGN') return labels.gmgn
  if (url === signal.explorerUrl || label === 'Explorer') return labels.explorer
  if (label === 'Website') return labels.website
  if (label === 'X') return labels.twitter
  if (label === 'Telegram') return labels.telegram
  if (label === 'Docs') return labels.docs
  if (label === 'App') return labels.app
  return label || labels.other
}

export default function TokenRadarPage({
  signals: initialSignals,
  generatedAt: initialGeneratedAt,
}: TokenRadarPageProps) {
  const [lang, setLang] = useState<Lang>('zh')
  const [signals, setSignals] = useState(initialSignals)
  const [generatedAt, setGeneratedAt] = useState(initialGeneratedAt)
  const [selectedChain, setSelectedChain] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [refreshStatus, setRefreshStatus] = useState<RefreshStatus | null>(null)
  const [copiedId, setCopiedId] = useState('')

  const t = copy[lang]
  const refreshFeedback = refreshStatus ? describeRefreshStatus(refreshStatus, lang) : null

  const chainFilters = useMemo(
    () => ['all', ...Array.from(new Set(signals.map((signal) => signal.chainId)))],
    [signals]
  )

  const filteredSignals = useMemo(() => {
    if (selectedChain === 'all') {
      return signals
    }

    return signals.filter((signal) => signal.chainId === selectedChain)
  }, [signals, selectedChain])

  const bscCount = useMemo(
    () => signals.filter((signal) => signal.chainId === 'bsc').length,
    [signals]
  )

  useEffect(() => {
    if (!chainFilters.includes(selectedChain)) {
      setSelectedChain('all')
    }
  }, [chainFilters, selectedChain])

  async function refreshData() {
    try {
      setRefreshing(true)
      const response = await fetch(`/api/tokens/hot?limit=18&refresh=${Date.now()}`, {
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error('Token radar refresh failed.')
      }

      const data = await response.json()
      const nextSignals = data.signals ?? []
      const nextGeneratedAt = data.generatedAt ?? new Date().toISOString()
      const changes = countSignalChanges(signals, nextSignals)

      setSignals(nextSignals)
      setGeneratedAt(nextGeneratedAt)
      setRefreshStatus({
        tone: changes.newTokens > 0 || changes.changedTokens > 0 ? 'success' : 'neutral',
        checkedAt: nextGeneratedAt,
        newTokens: changes.newTokens,
        changedTokens: changes.changedTokens,
      })
    } catch (error) {
      console.error('Failed to refresh token radar data:', error)
      setRefreshStatus({
        tone: 'error',
        checkedAt: new Date().toISOString(),
        newTokens: 0,
        changedTokens: 0,
      })
    } finally {
      setRefreshing(false)
    }
  }

  async function copyContract(id: string, contract: string) {
    try {
      await navigator.clipboard.writeText(contract)
      setCopiedId(id)
      window.setTimeout(() => setCopiedId(''), 1500)
    } catch (error) {
      console.error('Failed to copy contract:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="tokens" />

      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(18,95,74,0.7),transparent_42%),radial-gradient(circle_at_75%_20%,rgba(29,78,216,0.24),transparent_32%),#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100/90">
                {t.hero.badge}
              </span>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100/90">
                {t.hero.source}
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight sm:text-6xl">{t.hero.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">{t.hero.subtitle}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span>
                {t.hero.updated}: {formatTimestamp(generatedAt, lang)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>
                {t.hero.sourceLabel}: GMGN
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{signals.length} tokens</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#hot-feed"
                className="rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                {t.hero.cta}
              </a>
              <button
                onClick={() => void refreshData()}
                disabled={refreshing}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  refreshing
                    ? 'cursor-not-allowed border-white/10 bg-white/[0.04] text-white/45'
                    : 'border-white/15 text-white/80 hover:border-white/30 hover:bg-white/5 hover:text-white'
                }`}
              >
                {refreshing ? t.hero.refreshing : t.hero.refresh}
              </button>
            </div>

            <div className="mt-4 min-h-[52px]" aria-live="polite">
              {refreshFeedback ? (
                <div
                  className={`inline-flex max-w-full flex-col gap-1 rounded-2xl border px-4 py-3 text-sm ${refreshFeedback.className}`}
                >
                  <span>{refreshFeedback.message}</span>
                  <span className="text-xs opacity-80">{refreshFeedback.meta}</span>
                </div>
              ) : null}
            </div>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard label={t.stats.total} value={String(signals.length)} description={sectionMeta(signals)} />
            <StatCard label={t.stats.bsc} value={String(bscCount)} description={t.stats.bscDescription} />
            <StatCard label={t.stats.liveLabel} value={t.stats.liveValue} description={t.stats.liveDescription} />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-400/8 p-4 text-sm leading-6 text-amber-50/85">
          {t.section.disclaimer}
        </div>

        <section id="hot-feed" className="scroll-mt-28 py-6">
          <div className="mb-6">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              {t.section.badge}
            </span>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{t.section.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">{t.section.description}</p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-white/58">{t.section.filterLabel}</span>
            {chainFilters.map((chain) => {
              const isSelected = selectedChain === chain
              const label =
                chain === 'all'
                  ? t.section.allChains
                  : signals.find((signal) => signal.chainId === chain)?.chainLabel ?? chain

              return (
                <button
                  key={chain}
                  onClick={() => setSelectedChain(chain)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {refreshing && signals.length === 0 ? (
            <LoadingState text={t.section.loading} />
          ) : filteredSignals.length === 0 ? (
            <EmptyState text={t.section.empty} />
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredSignals.map((signal, index) => (
                <TokenCard
                  key={signal.id}
                  signal={signal}
                  lang={lang}
                  copiedId={copiedId}
                  index={index}
                  onCopyContract={copyContract}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function TokenCard({
  signal,
  lang,
  copiedId,
  index,
  onCopyContract,
}: {
  signal: HotTokenSignal
  lang: Lang
  copiedId: string
  index: number
  onCopyContract: (id: string, contract: string) => Promise<void>
}) {
  const t = copy[lang]

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.24) }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {signal.imageUrl ? (
            <img
              src={signal.imageUrl}
              alt={signal.name}
              className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-bold">
              {signal.symbol.slice(0, 2)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {signal.chainLabel}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/65">
                {t.section.score}: {signal.score}
              </span>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                {signal.dexId.toUpperCase()}
              </span>
            </div>

            <h3 className="mt-3 truncate text-2xl font-bold text-white">
              {signal.name} <span className="text-white/55">${signal.symbol}</span>
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {signal.hotReasons.length
                ? signal.hotReasons
                    .slice(0, 2)
                    .map((reason) => localizeGeneratedLine(reason, lang))
                    .join(' ')
                : localizeGeneratedLine(signal.summary, lang)}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-sm font-semibold ${
              (signal.priceChange1h ?? 0) >= 0 ? 'text-emerald-300' : 'text-rose-300'
            }`}
          >
            {formatPercent(signal.priceChange1h)}
          </div>
          <div className="mt-1 text-xs text-white/45">1H</div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard label={t.section.price} value={formatCurrency(signal.priceUsd, lang)} />
        <MetricCard label={t.section.volume1h} value={formatCurrency(signal.volume1h, lang)} />
        <MetricCard label={t.section.liquidity} value={formatCurrency(signal.liquidityUsd, lang)} />
        <MetricCard label={t.section.momentum24h} value={formatPercent(signal.priceChange24h)} />
        <MetricCard label={t.section.pairAge} value={formatAge(signal.ageHours, lang)} />
        <MetricCard
          label={`${t.section.buys1h} / ${t.section.sells1h}`}
          value={`${formatCompactNumber(signal.buys1h, lang)} / ${formatCompactNumber(signal.sells1h, lang)}`}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.24em] text-white/35">{t.section.contract}</div>
            <div className="mt-2 break-all text-sm font-semibold text-white/85">{signal.tokenAddress}</div>
          </div>
          <button
            onClick={() => void onCopyContract(signal.id, signal.tokenAddress)}
            className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/25 hover:text-white"
          >
            {copiedId === signal.id ? t.actions.copied : t.actions.copy}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h4 className="text-sm font-semibold text-emerald-200">{t.section.summary}</h4>
          <p className="mt-2 text-sm leading-6 text-white/78">
            {localizeGeneratedLine(signal.description, lang)}
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h4 className="text-sm font-semibold text-cyan-200">{t.section.reasons}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
            {signal.hotReasons.slice(0, 4).map((reason) => (
              <li key={reason} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                <span>{localizeGeneratedLine(reason, lang)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h4 className="text-sm font-semibold text-rose-200">{t.section.risks}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
            {signal.riskFlags.slice(0, 4).map((risk) => (
              <li key={risk} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rose-300" />
                <span>{localizeGeneratedLine(risk, lang)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {signal.links.slice(0, 5).map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
          >
            {linkLabel(signal, link.url, link.label, lang)}
          </a>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={signal.dexscreenerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          {t.actions.openGmgn}
        </a>
        <a
          href={signal.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
        >
          {t.actions.openExplorer}
        </a>
      </div>
    </motion.article>
  )
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</div>
      <div className="mt-3 text-3xl font-black">{value}</div>
      <div className="mt-2 text-sm text-white/62">{description}</div>
    </div>
  )
}

function LoadingState({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
      <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-emerald-300" />
      <p>{text}</p>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
      <p>{text}</p>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-white/35">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  )
}
