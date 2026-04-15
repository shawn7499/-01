'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import type { HotTokenSignal } from '@/lib/hot-tokens'

type Lang = 'en' | 'zh'

const translations = {
  en: {
    badge: 'Onchain Radar',
    title: 'Hot Tokens',
    subtitle:
      'Live onchain tokens pulled from DexScreener hot feeds, translated into chain, contract, momentum context, and simple reasons to watch.',
    backHome: 'Back to Home',
    backNews: 'News Signals',
    refresh: 'Refresh',
    updated: 'Updated',
    disclaimer:
      'This page is for watchlists and research support only. High attention does not mean low risk, and most hot onchain tokens remain highly speculative.',
    loading: 'Loading hot token feed...',
    empty: 'No hot tokens are available right now.',
    filters: {
      all: 'All chains',
    },
    sections: {
      summary: 'Why it is hot',
      reasons: 'Hot reasons',
      risks: 'Risk flags',
      chain: 'Chain',
      contract: 'Contract',
      dex: 'DEX',
      pairAge: 'Pair age',
      price: 'Price',
      volume1h: '1H volume',
      volume24h: '24H volume',
      liquidity: 'Liquidity',
      momentum1h: '1H change',
      momentum24h: '24H change',
      buys5m: '5M buys',
      sells5m: '5M sells',
      buys1h: '1H buys',
      sells1h: '1H sells',
      fdv: 'FDV',
      score: 'Heat score',
    },
    actions: {
      copy: 'Copy',
      copied: 'Copied',
      openDex: 'Open DexScreener',
      openExplorer: 'Open Explorer',
    },
    labels: {
      boosted: 'Boost',
      pair: 'Pair',
      website: 'Website',
      twitter: 'Twitter',
      telegram: 'Telegram',
      docs: 'Docs',
      app: 'App',
      explorer: 'Explorer',
    },
  },
  zh: {
    badge: '链上雷达',
    title: '热门代币',
    subtitle:
      '接入 DexScreener 热门数据，把当前链上热币整理成链、合约、热度原因、风险标签和基础动量指标。',
    backHome: '返回首页',
    backNews: '新闻信号',
    refresh: '刷新',
    updated: '更新时间',
    disclaimer:
      '这个页面更适合做观察名单和研究辅助，不构成投资建议。链上热门币通常波动极大，热度高不代表风险低。',
    loading: '正在加载链上热门代币...',
    empty: '当前没有可展示的热门代币。',
    filters: {
      all: '全部链',
    },
    sections: {
      summary: '热门概览',
      reasons: '热门理由',
      risks: '风险提示',
      chain: '链',
      contract: '合约',
      dex: '交易来源',
      pairAge: '交易对年龄',
      price: '价格',
      volume1h: '1小时成交量',
      volume24h: '24小时成交量',
      liquidity: '流动性',
      momentum1h: '1小时涨跌',
      momentum24h: '24小时涨跌',
      buys5m: '5分钟买单',
      sells5m: '5分钟卖单',
      buys1h: '1小时买单',
      sells1h: '1小时卖单',
      fdv: 'FDV',
      score: '热度分',
    },
    actions: {
      copy: '复制',
      copied: '已复制',
      openDex: '打开 DexScreener',
      openExplorer: '打开区块浏览器',
    },
    labels: {
      boosted: '曝光分',
      pair: '交易对',
      website: '官网',
      twitter: 'X',
      telegram: 'Telegram',
      docs: '文档',
      app: '应用',
      explorer: '浏览器',
    },
  },
} as const

type DexBoostCandidate = {
  chainId: string
  tokenAddress: string
  description?: string
  icon?: string
  header?: string
  links?: Array<{ type?: string; label?: string; url: string }>
  totalAmount?: number
}

type DexBrowserPair = {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  priceUsd?: string
  txns?: {
    m5?: { buys?: number; sells?: number }
    h1?: { buys?: number; sells?: number }
  }
  volume?: {
    m5?: number
    h1?: number
    h24?: number
  }
  priceChange?: {
    m5?: number
    h1?: number
    h24?: number
  }
  liquidity?: {
    usd?: number
  }
  fdv?: number
  marketCap?: number
  pairCreatedAt?: number
  info?: {
    imageUrl?: string
    websites?: Array<{ url: string; label?: string }>
    socials?: Array<{ url: string; type?: string }>
  }
  boosts?: {
    active?: number
  }
}

const BROWSER_HEADERS = {
  accept: 'application/json',
  'user-agent': 'Mozilla/5.0 (compatible; ShawnWickHotTokensBrowser/1.0)',
}

const BROWSER_CHAIN_LABELS: Record<string, string> = {
  solana: 'Solana',
  ethereum: 'Ethereum',
  base: 'Base',
  bsc: 'BNB Chain',
  arbitrum: 'Arbitrum',
  polygon: 'Polygon',
  blast: 'Blast',
}

const BROWSER_EXPLORERS: Record<string, string> = {
  solana: 'https://solscan.io/token/',
  ethereum: 'https://etherscan.io/token/',
  base: 'https://basescan.org/token/',
  bsc: 'https://bscscan.com/token/',
  arbitrum: 'https://arbiscan.io/token/',
  polygon: 'https://polygonscan.com/token/',
  blast: 'https://blastscan.io/token/',
}

function browserChainLabel(chainId: string) {
  return BROWSER_CHAIN_LABELS[chainId] ?? chainId
}

function browserExplorerUrl(chainId: string, tokenAddress: string) {
  return `${BROWSER_EXPLORERS[chainId] ?? 'https://dexscreener.com/'}${tokenAddress}`
}

function browserAgeHours(pairCreatedAt?: number) {
  if (!pairCreatedAt) return null
  return (Date.now() - pairCreatedAt) / (1000 * 60 * 60)
}

function browserBestPairScore(pair: DexBrowserPair) {
  const volume = pair.volume?.h24 ?? 0
  const liquidity = pair.liquidity?.usd ?? 0
  const txns = (pair.txns?.h1?.buys ?? 0) + (pair.txns?.h1?.sells ?? 0)
  return volume * 0.7 + liquidity * 1.2 + txns * 75 + (pair.boosts?.active ?? 0) * 120
}

function browserChooseBestPair(pairs: DexBrowserPair[]) {
  return [...pairs].sort((a, b) => browserBestPairScore(b) - browserBestPairScore(a))[0]
}

function browserReasons(pair: DexBrowserPair, candidate: DexBoostCandidate) {
  const reasons: string[] = []
  const boost = candidate.totalAmount ?? pair.boosts?.active ?? 0
  const volume24h = pair.volume?.h24 ?? 0
  const liquidityUsd = pair.liquidity?.usd ?? 0
  const change1h = pair.priceChange?.h1 ?? 0
  const buys1h = pair.txns?.h1?.buys ?? 0
  const sells1h = pair.txns?.h1?.sells ?? 0
  const age = browserAgeHours(pair.pairCreatedAt)
  const narrativeText = `${candidate.description ?? ''} ${pair.baseToken.name} ${pair.baseToken.symbol}`.toLowerCase()

  if (boost >= 250) reasons.push(`DexScreener boost exposure is elevated at ${boost}.`)
  else if (boost >= 50) reasons.push(`The token is still receiving visible boosted attention at ${boost}.`)

  if (volume24h >= 1_000_000) reasons.push('24-hour volume is already above $1M.')
  else if (volume24h >= 250_000) reasons.push('24-hour volume is meaningful for a hot onchain token.')

  if (liquidityUsd >= 100_000) reasons.push('Liquidity is stronger than most fresh meme launches.')
  else if (liquidityUsd >= 25_000) reasons.push('Liquidity is usable enough for a watchlist candidate.')

  if (change1h >= 80) reasons.push('One-hour momentum is extremely strong.')
  else if (change1h >= 20) reasons.push('One-hour momentum is clearly positive.')

  if (buys1h >= sells1h * 2 && buys1h >= 200) reasons.push('Buy-side activity is dominating the last hour.')
  if (age !== null && age <= 24) reasons.push('The pair is still very new, so attention is concentrated.')

  if (/(elon|musk|xchat|x coin|cashtag)/.test(narrativeText)) {
    reasons.push('X or Elon-related narrative is driving attention.')
  } else if (/(pepe|furie|frog|cat|dog|otter|goat|animal)/.test(narrativeText)) {
    reasons.push('Animal or meme-character narrative is spreading quickly.')
  } else if (/(ai|agent|wallet|terminal|protocol|app)/.test(narrativeText)) {
    reasons.push('AI or product narrative is part of the move.')
  }

  return reasons.slice(0, 4)
}

function browserRisks(pair: DexBrowserPair, candidate: DexBoostCandidate) {
  const risks: string[] = []
  const age = browserAgeHours(pair.pairCreatedAt)
  const liquidityUsd = pair.liquidity?.usd ?? 0
  const boost = candidate.totalAmount ?? pair.boosts?.active ?? 0
  const change1h = pair.priceChange?.h1 ?? 0
  const change24h = pair.priceChange?.h24 ?? 0

  if (age !== null && age <= 24) risks.push('New listing: volatility can be extreme.')
  if (liquidityUsd < 20_000) risks.push('Thin liquidity can create large slippage.')
  if (boost > 0) risks.push('Part of the attention may be driven by paid exposure.')
  if (change1h >= 120 || change24h >= 250) risks.push('The move is already steep, so pullback risk is high.')

  return risks.slice(0, 4)
}

function browserScore(pair: DexBrowserPair, candidate: DexBoostCandidate) {
  const boost = Math.min(candidate.totalAmount ?? pair.boosts?.active ?? 0, 500) * 0.06
  const volume = Math.min(Math.log10((pair.volume?.h24 ?? 0) + 1) * 12, 32)
  const liquidity = Math.min(Math.log10((pair.liquidity?.usd ?? 0) + 1) * 8, 20)
  const activity = Math.min(((pair.txns?.h1?.buys ?? 0) + (pair.txns?.h1?.sells ?? 0)) / 100, 18)
  const momentum = Math.max(0, Math.min(pair.priceChange?.h1 ?? 0, 120) * 0.16)
  const freshness = (() => {
    const age = browserAgeHours(pair.pairCreatedAt)
    if (age === null) return 0
    if (age <= 12) return 10
    if (age <= 48) return 6
    if (age <= 168) return 3
    return 0
  })()

  return Math.max(1, Math.min(99, Math.round(18 + boost + volume + liquidity + activity + momentum + freshness)))
}

function browserLinks(pair: DexBrowserPair, candidate: DexBoostCandidate) {
  const merged: Array<{ type?: string; label?: string; url: string }> = [
    { type: 'dexscreener', label: 'DexScreener', url: pair.url },
    { type: 'explorer', label: 'Explorer', url: browserExplorerUrl(pair.chainId, pair.baseToken.address) },
    ...(candidate.links ?? []),
    ...((pair.info?.websites ?? []).map((link) => ({ url: link.url, label: link.label || 'Website', type: 'website' }))),
    ...((pair.info?.socials ?? []).map((link) => ({ url: link.url, type: link.type || 'other', label: link.type || 'Link' }))),
  ]

  const seen = new Set<string>()

  return merged
    .filter((link) => {
      if (!link?.url || seen.has(link.url)) return false
      seen.add(link.url)
      return true
    })
    .map((link) => ({
      type: (link.type || 'other') as HotTokenSignal['links'][number]['type'],
      label: link.label || link.type || 'Link',
      url: link.url,
    }))
}

async function fetchHotTokenSignalsInBrowser(limit = 18): Promise<HotTokenSignal[]> {
  const boostsResponse = await fetch('https://api.dexscreener.com/token-boosts/top/v1', {
    headers: BROWSER_HEADERS,
    cache: 'no-store',
  })

  if (!boostsResponse.ok) {
    throw new Error(`DexScreener boosts request failed with ${boostsResponse.status}`)
  }

  const candidates = (await boostsResponse.json()) as DexBoostCandidate[]

  const settled = await Promise.allSettled(
    candidates.slice(0, 16).map(async (candidate) => {
      const pairResponse = await fetch(
        `https://api.dexscreener.com/tokens/v1/${candidate.chainId}/${candidate.tokenAddress}`,
        {
          headers: BROWSER_HEADERS,
          cache: 'no-store',
        }
      )

      if (!pairResponse.ok) {
        throw new Error(`Pair request failed with ${pairResponse.status}`)
      }

      const pairs = (await pairResponse.json()) as DexBrowserPair[]
      const pair = browserChooseBestPair(Array.isArray(pairs) ? pairs : [])

      if (!pair) {
        return null
      }

      const reasons = browserReasons(pair, candidate)
      const risks = browserRisks(pair, candidate)

      return {
        id: `${pair.chainId}-${pair.baseToken.address}`,
        chainId: pair.chainId,
        chainLabel: browserChainLabel(pair.chainId),
        tokenAddress: pair.baseToken.address,
        explorerUrl: browserExplorerUrl(pair.chainId, pair.baseToken.address),
        dexscreenerUrl: pair.url,
        pairAddress: pair.pairAddress,
        dexId: pair.dexId,
        name: pair.baseToken.name,
        symbol: pair.baseToken.symbol,
        description: candidate.description?.trim() || `${pair.baseToken.name} is surfacing in current hot token feeds.`,
        imageUrl: pair.info?.imageUrl ?? candidate.icon ?? null,
        headerUrl: candidate.header ?? null,
        priceUsd: pair.priceUsd ? Number(pair.priceUsd) : null,
        priceChange5m: pair.priceChange?.m5 ?? null,
        priceChange1h: pair.priceChange?.h1 ?? null,
        priceChange24h: pair.priceChange?.h24 ?? null,
        volume5m: null,
        volume1h: pair.volume?.h1 ?? null,
        volume24h: pair.volume?.h24 ?? null,
        liquidityUsd: pair.liquidity?.usd ?? null,
        fdv: pair.fdv ?? null,
        marketCap: pair.marketCap ?? null,
        boostAmount: candidate.totalAmount ?? pair.boosts?.active ?? 0,
        buys5m: pair.txns?.m5?.buys ?? 0,
        sells5m: pair.txns?.m5?.sells ?? 0,
        buys1h: pair.txns?.h1?.buys ?? 0,
        sells1h: pair.txns?.h1?.sells ?? 0,
        pairCreatedAt: pair.pairCreatedAt ?? null,
        ageHours: browserAgeHours(pair.pairCreatedAt),
        score: browserScore(pair, candidate),
        summary: reasons.slice(0, 2).join(' ') || 'This token is active enough to monitor, but still needs more confirmation.',
        hotReasons: reasons,
        riskFlags: risks,
        links: browserLinks(pair, candidate),
      } satisfies HotTokenSignal
    })
  )

  return settled
    .flatMap((result) => (result.status === 'fulfilled' && result.value ? [result.value] : []))
    .sort((a, b) => b.score - a.score || (b.volume24h ?? 0) - (a.volume24h ?? 0))
    .slice(0, limit)
}

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

function linkLabel(type: string, lang: Lang) {
  const t = translations[lang].labels

  if (type === 'website') return t.website
  if (type === 'twitter') return t.twitter
  if (type === 'telegram') return t.telegram
  if (type === 'docs') return t.docs
  if (type === 'app') return t.app
  if (type === 'explorer') return t.explorer
  return type
}

function localizeGeneratedLine(text: string, lang: Lang) {
  if (lang === 'en') {
    return text
  }

  const rules: Array<[RegExp, (matches: RegExpMatchArray) => string]> = [
    [/DexScreener boost exposure is elevated at (\d+)\./, (m) => `DexScreener 的曝光加热分较高，当前为 ${m[1]}。`],
    [/The token is still receiving visible boosted attention at (\d+)\./, (m) => `这个代币仍然有明显的置顶曝光，当前曝光分为 ${m[1]}。`],
    [/The token is still receiving boosted attention with a score of (\d+)\./, (m) => `这个代币仍然在持续获得曝光，当前曝光分为 ${m[1]}。`],
    [/24-hour volume is already above \$1M\./, () => '24 小时成交量已经超过 100 万美元。'],
    [/24-hour volume is meaningful for a hot onchain token\./, () => '24 小时成交量对链上热门币来说已经算比较有存在感。'],
    [/24-hour trading volume is above \$1M, showing strong turnover\./, () => '24 小时成交量超过 100 万美元，换手很强。'],
    [/24-hour trading volume is already meaningful for a hot onchain token\./, () => '24 小时成交量已经达到链上热门币里比较有代表性的水平。'],
    [/Liquidity is stronger than most fresh meme launches\./, () => '和大多数新发 meme 币相比，它的流动性更强。'],
    [/Liquidity is relatively stronger than most fresh onchain meme tokens\./, () => '和大多数新上的链上 meme 币相比，它的流动性更强。'],
    [/Liquidity is usable enough for a watchlist candidate\./, () => '流动性已经足够把它放进观察名单。'],
    [/Liquidity is workable enough for a watchlist candidate\./, () => '流动性勉强够支撑观察和小规模跟踪。'],
    [/One-hour momentum is extremely strong\./, () => '最近 1 小时动量非常强。'],
    [/One-hour price momentum is extremely strong\./, () => '最近 1 小时价格动量非常强。'],
    [/One-hour momentum is clearly positive\./, () => '最近 1 小时动量明显偏强。'],
    [/One-hour momentum is clearly positive\./, () => '最近 1 小时动量明显偏强。'],
    [/One-hour price momentum is clearly positive\./, () => '最近 1 小时价格动量明显偏强。'],
    [/Buy-side activity is dominating the last hour\./, () => '最近 1 小时买盘明显强于卖盘。'],
    [/Buy-side activity is still dominating the last hour\./, () => '最近 1 小时买盘仍然明显强于卖盘。'],
    [/The pair is still very new, so attention is concentrated\./, () => '这个交易对上线时间很短，注意力高度集中。'],
    [/The pair is still very new, so attention is concentrated and fast-moving\./, () => '这个交易对还很新，热度集中而且节奏很快。'],
    [/The pair is still fresh enough for narrative momentum to matter\./, () => '这个交易对还比较新，叙事动量仍然有效。'],
    [/AI or product narrative is part of the move\./, () => 'AI 或产品叙事正在参与推动热度。'],
    [/AI or product narrative is part of the current attention\./, () => 'AI 或产品叙事是当前热度的一部分。'],
    [/X or Elon-related narrative is driving attention\./, () => '和 X / Elon 相关的叙事正在带来注意力。'],
    [/X or Elon-related narrative is helping attention\./, () => '和 X / Elon 相关的叙事正在帮助它获得关注。'],
    [/Animal or meme-character narrative is spreading quickly\./, () => '动物或角色型 meme 叙事扩散得很快。'],
    [/Animal or meme-character narrative is spreading fast\./, () => '动物或角色型 meme 叙事扩散得很快。'],
    [/Community-driven meme narrative is a big part of the move\./, () => '社区驱动的 meme 叙事是这波热度的重要组成部分。'],
    [/Product and DeFi utility narrative supports the token\./, () => '产品或 DeFi 功能叙事在支撑这个代币的关注度。'],
    [/There is at least a minimal set of website or social links to verify the story\./, () => '至少还有官网或社媒链接可以辅助你做基础核验。'],
    [/New listing: volatility can be extreme\./, () => '新上线代币，波动通常会非常夸张。'],
    [/Thin liquidity can create large slippage\./, () => '流动性偏薄，滑点可能很大。'],
    [/Part of the attention may be driven by paid exposure\./, () => '这波热度里可能有一部分来自付费曝光。'],
    [/The move is already steep, so pullback risk is high\./, () => '涨幅已经很陡，回撤风险偏高。'],
    [/Project links are limited, so due diligence is harder\./, () => '项目公开资料偏少，尽调难度更高。'],
    [/This token is active enough to monitor, but still needs more confirmation\./, () => '这个代币目前足够活跃，值得观察，但还需要更多确认。'],
    [/This token is active enough to monitor, but it still needs more confirmation\./, () => '这个代币目前足够活跃，值得观察，但还需要更多确认。'],
    [/(\w[\w\s$/-]+) is surfacing in current hot token feeds\./, (m) => `${m[1]} 正在出现在当前的热门代币榜单里。`],
    [/(\w[\w\s$/-]+) is currently surfacing in onchain hot token feeds\./, (m) => `${m[1]} 正在当前链上热币榜里出现。`],
  ]

  for (const [pattern, formatter] of rules) {
    const matches = text.match(pattern)
    if (matches) {
      return formatter(matches)
    }
  }

  return text
}

export default function HotTokensPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const [loading, setLoading] = useState(true)
  const [signals, setSignals] = useState<HotTokenSignal[]>([])
  const [generatedAt, setGeneratedAt] = useState('')
  const [selectedChain, setSelectedChain] = useState('all')
  const [copiedId, setCopiedId] = useState('')

  const t = translations[lang]

  useEffect(() => {
    void fetchSignals()
  }, [])

  const chainFilters = useMemo(() => {
    const uniqueChains = Array.from(new Set(signals.map((signal) => signal.chainId)))
    return ['all', ...uniqueChains]
  }, [signals])

  const filteredSignals = useMemo(() => {
    if (selectedChain === 'all') {
      return signals
    }
    return signals.filter((signal) => signal.chainId === selectedChain)
  }, [selectedChain, signals])

  async function fetchSignals() {
    try {
      setLoading(true)
      const response = await fetch('/api/tokens/hot?limit=18', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`API request failed with ${response.status}`)
      }

      const data = await response.json()

      if (!data.signals?.length) {
        throw new Error('API returned no hot tokens')
      }

      setSignals(data.signals ?? [])
      setGeneratedAt(data.generatedAt ?? '')
    } catch (error) {
      console.error('API hot token fetch failed, falling back to direct DexScreener requests:', error)

      try {
        const directSignals = await fetchHotTokenSignalsInBrowser(18)
        setSignals(directSignals)
        setGeneratedAt(new Date().toISOString())
      } catch (directError) {
        console.error('Direct hot token fetch failed:', directError)
        setSignals([])
      }
    } finally {
      setLoading(false)
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

  function formatTimestamp(value: string) {
    if (!value) return '--'
    return new Date(value).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="fixed right-4 top-20 z-50 flex rounded-full border border-white/10 bg-black/70 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:right-6 sm:top-24">
        <button
          onClick={() => setLang('en')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 ${
            lang === 'en' ? 'bg-white text-black' : 'text-white/70 hover:bg-white/8 hover:text-white'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('zh')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 ${
            lang === 'zh' ? 'bg-white text-black' : 'text-white/70 hover:bg-white/8 hover:text-white'
          }`}
        >
          中文
        </button>
      </div>

      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(19,78,74,0.72),transparent_42%),radial-gradient(circle_at_75%_20%,rgba(31,41,55,0.85),transparent_32%),#050505]">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a href="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
                <span>←</span>
                <span>{t.backHome}</span>
              </a>
              <a href="/news/signals" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
                <span>↗</span>
                <span>{t.backNews}</span>
              </a>
            </div>
            <button
              onClick={() => void fetchSignals()}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              {t.refresh}
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-emerald-200/75">{t.badge}</p>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">{t.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span>
                {t.updated}: {formatTimestamp(generatedAt)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span>DexScreener</span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span>{signals.length} tokens</span>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3">
            {chainFilters.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedChain === chain
                    ? 'border-white bg-white text-black'
                    : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
                }`}
              >
                {chain === 'all'
                  ? t.filters.all
                  : signals.find((signal) => signal.chainId === chain)?.chainLabel ?? chain}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-400/8 p-4 text-sm leading-6 text-amber-50/85">
          {t.disclaimer}
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-emerald-300"></div>
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
                transition={{ delay: index * 0.04 }}
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
                          {t.sections.score}: {signal.score}
                        </span>
                        {signal.boostAmount > 0 && (
                          <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                            {t.labels.boosted}: {signal.boostAmount}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 truncate text-2xl font-bold text-white">
                        {signal.name} <span className="text-white/55">${signal.symbol}</span>
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {signal.hotReasons.length
                          ? signal.hotReasons.slice(0, 2).map((reason) => localizeGeneratedLine(reason, lang)).join(' ')
                          : localizeGeneratedLine(signal.summary, lang)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-sm font-semibold ${(signal.priceChange1h ?? 0) >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {formatPercent(signal.priceChange1h)}
                    </div>
                    <div className="mt-1 text-xs text-white/45">{t.sections.momentum1h}</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/35">{t.sections.chain}</div>
                    <div className="mt-2 text-sm font-semibold text-white/85">{signal.chainLabel}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/35">{t.sections.dex}</div>
                    <div className="mt-2 text-sm font-semibold uppercase text-white/85">{signal.dexId}</div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.24em] text-white/35">{t.sections.contract}</div>
                      <div className="mt-2 break-all text-sm font-semibold text-white/85">{signal.tokenAddress}</div>
                    </div>
                    <button
                      onClick={() => void copyContract(signal.id, signal.tokenAddress)}
                      className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/25 hover:text-white"
                    >
                      {copiedId === signal.id ? t.actions.copied : t.actions.copy}
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <MetricCard label={t.sections.price} value={formatCurrency(signal.priceUsd, lang)} />
                  <MetricCard label={t.sections.volume1h} value={formatCurrency(signal.volume1h, lang)} />
                  <MetricCard label={t.sections.volume24h} value={formatCurrency(signal.volume24h, lang)} />
                  <MetricCard label={t.sections.liquidity} value={formatCurrency(signal.liquidityUsd, lang)} />
                  <MetricCard label={t.sections.momentum24h} value={formatPercent(signal.priceChange24h)} />
                  <MetricCard label={t.sections.pairAge} value={formatAge(signal.ageHours, lang)} />
                  <MetricCard label={t.sections.buys5m} value={formatCompactNumber(signal.buys5m, lang)} />
                  <MetricCard label={t.sections.sells5m} value={formatCompactNumber(signal.sells5m, lang)} />
                  <MetricCard label={t.sections.buys1h} value={formatCompactNumber(signal.buys1h, lang)} />
                  <MetricCard label={t.sections.sells1h} value={formatCompactNumber(signal.sells1h, lang)} />
                  <MetricCard label={t.sections.fdv} value={formatCurrency(signal.fdv, lang)} />
                  <MetricCard label={t.labels.pair} value={signal.pairAddress.slice(0, 10)} />
                </div>

                <div className="mt-5 grid gap-5">
                  <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="text-sm font-semibold text-emerald-200">{t.sections.summary}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/78">{localizeGeneratedLine(signal.description, lang)}</p>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="text-sm font-semibold text-cyan-200">{t.sections.reasons}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
                      {signal.hotReasons.map((reason) => (
                        <li key={reason} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300"></span>
                          <span>{localizeGeneratedLine(reason, lang)}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="text-sm font-semibold text-rose-200">{t.sections.risks}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
                      {signal.riskFlags.map((risk) => (
                        <li key={risk} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rose-300"></span>
                          <span>{localizeGeneratedLine(risk, lang)}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {signal.links.slice(0, 6).map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
                    >
                      {linkLabel(link.type, lang)}
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
                    {t.actions.openDex}
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
            ))}
          </div>
        )}
      </main>
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
