'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import type { HotTokenSignal } from '@/lib/hot-tokens'
import { ensureChainCoverage, isChineseNarrativeToken } from '@/lib/token-radar-utils'

type RadarMode = 'all' | 'chinese'
type Lang = 'en' | 'zh'

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

const copy = {
  en: {
    backHome: 'Back to Home',
    backNews: 'News Signals',
    toHot: 'All Hot Tokens',
    toChinese: 'Chinese Tokens',
    refresh: 'Refresh',
    updated: 'Updated',
    disclaimer:
      'This page is for watchlists and research support only. Hot attention does not equal low risk, and most onchain tokens remain highly speculative.',
    loadingAll: 'Loading onchain hot tokens...',
    loadingChinese: 'Loading Chinese narrative tokens...',
    emptyAll: 'No hot tokens are available right now.',
    emptyChinese: 'No Chinese narrative tokens are surfacing right now.',
    chainCoverage: 'BNB Chain coverage added',
    filters: {
      all: 'All chains',
    },
    sections: {
      summary: 'Watch thesis',
      reasons: 'Why it is hot',
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
      dexscreener: 'DexScreener',
      other: 'Link',
    },
  },
  zh: {
    backHome: '返回首页',
    backNews: '新闻信号',
    toHot: '全部热门代币',
    toChinese: '中文代币',
    refresh: '刷新',
    updated: '更新时间',
    disclaimer:
      '这个页面更适合做观察名单和研究辅助，不构成投资建议。链上热门代币通常波动很大，热度高不代表风险低。',
    loadingAll: '正在加载链上热门代币...',
    loadingChinese: '正在加载中文叙事代币...',
    emptyAll: '当前没有可展示的热门代币。',
    emptyChinese: '当前没有筛选到中文叙事代币。',
    chainCoverage: '已加强 BNB Chain 覆盖',
    filters: {
      all: '全部链',
    },
    sections: {
      summary: '观察逻辑',
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
      openExplorer: '打开浏览器',
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
      dexscreener: 'DexScreener',
      other: '链接',
    },
  },
} as const

const BROWSER_HEADERS = {
  accept: 'application/json',
  'user-agent': 'Mozilla/5.0 (compatible; ShawnWickHotTokensBrowser/2.0)',
}

const BROWSER_CHAIN_LABELS: Record<string, string> = {
  solana: 'Solana',
  ethereum: 'Ethereum',
  base: 'Base',
  bsc: 'BNB Chain',
  arbitrum: 'Arbitrum',
  polygon: 'Polygon',
  blast: 'Blast',
  avalanche: 'Avalanche',
}

const BROWSER_EXPLORERS: Record<string, string> = {
  solana: 'https://solscan.io/token/',
  ethereum: 'https://etherscan.io/token/',
  base: 'https://basescan.org/token/',
  bsc: 'https://bscscan.com/token/',
  arbitrum: 'https://arbiscan.io/token/',
  polygon: 'https://polygonscan.com/token/',
  blast: 'https://blastscan.io/token/',
  avalanche: 'https://snowtrace.io/token/',
}

function pageHeader(mode: RadarMode, lang: Lang) {
  if (mode === 'chinese') {
    return lang === 'zh'
      ? {
          badge: '中文叙事雷达',
          title: '中文代币',
          subtitle:
            '从 DexScreener 热门流里筛出带中文名称、中文文本或华语叙事线索的代币，方便单独盯盘和做事件跟踪。',
        }
      : {
          badge: 'Chinese Narrative Radar',
          title: 'Chinese Tokens',
          subtitle:
            'A filtered view of hot tokens with Chinese names, Chinese-language text, or Chinese narrative cues pulled from DexScreener feeds.',
        }
  }

  return lang === 'zh'
    ? {
        badge: '链上热门雷达',
        title: '热门代币',
        subtitle:
          '实时抓取 DexScreener 热门代币流，并补强 BNB Chain 覆盖，把链、合约、热度原因和风险提示整理成更容易操作的观察卡片。',
      }
    : {
        badge: 'Onchain Radar',
        title: 'Hot Tokens',
        subtitle:
          'Live onchain tokens pulled from DexScreener hot feeds with stronger BNB Chain coverage, translated into chain, contract, momentum context, and simple reasons to watch.',
      }
}

function modeFetchLimit(mode: RadarMode) {
  return mode === 'chinese' ? 48 : 24
}

function filterSignalsByMode(signals: HotTokenSignal[], mode: RadarMode) {
  if (mode === 'chinese') {
    return signals.filter((signal) => isChineseNarrativeToken(signal))
  }

  return signals
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
  } else if (/(china|chinese|mandarin|yuanbao|renmin|caishen|hongbao|zhongguo|binance life)/.test(narrativeText)) {
    reasons.push('Chinese-language or Chinese narrative cues are part of the attention.')
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
    ...((pair.info?.websites ?? []).map((link) => ({
      url: link.url,
      label: link.label || 'Website',
      type: 'website',
    }))),
    ...((pair.info?.socials ?? []).map((link) => ({
      url: link.url,
      type: link.type || 'other',
      label: link.type || 'Link',
    }))),
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

function mergeBrowserCandidates(candidates: DexBoostCandidate[]) {
  const merged = new Map<string, DexBoostCandidate>()

  for (const candidate of candidates) {
    const key = `${candidate.chainId}:${candidate.tokenAddress}`
    const existing = merged.get(key)

    if (!existing) {
      merged.set(key, candidate)
      continue
    }

    merged.set(key, {
      ...existing,
      ...candidate,
      links: [...(existing.links ?? []), ...(candidate.links ?? [])].filter(
        (link, index, array) => array.findIndex((entry) => entry.url === link.url) === index
      ),
      totalAmount: Math.max(existing.totalAmount ?? 0, candidate.totalAmount ?? 0),
    })
  }

  return Array.from(merged.values())
}

async function fetchHotTokenSignalsInBrowser(limit = 18): Promise<HotTokenSignal[]> {
  const [boostsResponse, profilesResponse] = await Promise.all([
    fetch('https://api.dexscreener.com/token-boosts/top/v1', {
      headers: BROWSER_HEADERS,
      cache: 'no-store',
    }),
    fetch('https://api.dexscreener.com/token-profiles/latest/v1', {
      headers: BROWSER_HEADERS,
      cache: 'no-store',
    }),
  ])

  if (!boostsResponse.ok) {
    throw new Error(`DexScreener boosts request failed with ${boostsResponse.status}`)
  }

  if (!profilesResponse.ok) {
    throw new Error(`DexScreener profiles request failed with ${profilesResponse.status}`)
  }

  const boosts = (await boostsResponse.json()) as DexBoostCandidate[]
  const profiles = (await profilesResponse.json()) as DexBoostCandidate[]

  const candidates = mergeBrowserCandidates([
    ...boosts.slice(0, 20),
    ...boosts.filter((candidate) => candidate.chainId === 'bsc').slice(0, 14),
    ...profiles.filter((candidate) => candidate.chainId === 'bsc').slice(0, 24),
    ...profiles.slice(0, 40),
  ])

  const settled = await Promise.allSettled(
    candidates.slice(0, 36).map(async (candidate) => {
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
        summary:
          reasons.slice(0, 2).join(' ') || 'This token is active enough to monitor, but still needs more confirmation.',
        hotReasons: reasons,
        riskFlags: risks,
        links: browserLinks(pair, candidate),
      } satisfies HotTokenSignal
    })
  )

  const signals = settled
    .flatMap((result) => (result.status === 'fulfilled' && result.value ? [result.value] : []))
    .filter((signal) => {
      const liquidity = signal.liquidityUsd ?? 0
      const volume = signal.volume24h ?? 0
      return liquidity >= 5_000 || volume >= 20_000 || signal.boostAmount >= 50
    })
    .sort((a, b) => b.score - a.score || (b.volume24h ?? 0) - (a.volume24h ?? 0))

  return ensureChainCoverage(signals, limit, 'bsc', limit >= 12 ? 4 : Math.min(3, limit))
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
  const labels = copy[lang].labels

  if (type === 'website') return labels.website
  if (type === 'twitter') return labels.twitter
  if (type === 'telegram') return labels.telegram
  if (type === 'docs') return labels.docs
  if (type === 'app') return labels.app
  if (type === 'explorer') return labels.explorer
  if (type === 'dexscreener') return labels.dexscreener
  return labels.other
}

function localizeGeneratedLine(text: string, lang: Lang) {
  if (lang === 'en') {
    return text
  }

  const rules: Array<[RegExp, (matches: RegExpMatchArray) => string]> = [
    [/DexScreener boost exposure is elevated at (\d+)\./, (m) => `DexScreener 曝光分较高，当前为 ${m[1]}。`],
    [/The token is still receiving visible boosted attention at (\d+)\./, (m) => `这个代币仍然有明显的置顶曝光，当前曝光分为 ${m[1]}。`],
    [/24-hour volume is already above \$1M\./, () => '24 小时成交量已经超过 100 万美元。'],
    [/24-hour volume is meaningful for a hot onchain token\./, () => '24 小时成交量对链上热门代币来说已经比较有代表性。'],
    [/Liquidity is stronger than most fresh meme launches\./, () => '和多数新发 meme 相比，它的流动性更强。'],
    [/Liquidity is usable enough for a watchlist candidate\./, () => '流动性已经足够支持加入观察名单。'],
    [/One-hour momentum is extremely strong\./, () => '最近 1 小时的动量非常强。'],
    [/One-hour momentum is clearly positive\./, () => '最近 1 小时的动量明显偏强。'],
    [/Buy-side activity is dominating the last hour\./, () => '最近 1 小时买盘明显强于卖盘。'],
    [/The pair is still very new, so attention is concentrated\./, () => '这个交易对上线时间很短，注意力更集中。'],
    [/X or Elon-related narrative is driving attention\./, () => 'X 或 Elon 相关叙事正在带来注意力。'],
    [/Animal or meme-character narrative is spreading quickly\./, () => '动物或 meme 角色叙事扩散得很快。'],
    [/AI or product narrative is part of the move\./, () => 'AI 或产品叙事是这波走势的一部分。'],
    [/Chinese-language or Chinese narrative cues are part of the attention\./, () => '中文文本或中文叙事线索也是当前关注度的一部分。'],
    [/New listing: volatility can be extreme\./, () => '新上线代币，波动通常会非常夸张。'],
    [/Thin liquidity can create large slippage\./, () => '流动性偏薄，滑点可能很大。'],
    [/Part of the attention may be driven by paid exposure\./, () => '这波热度里可能有一部分来自付费曝光。'],
    [/The move is already steep, so pullback risk is high\./, () => '涨幅已经比较陡，回撤风险偏高。'],
    [/This token is active enough to monitor, but still needs more confirmation\./, () => '这个代币足够活跃，值得观察，但还需要更多确认。'],
    [/([A-Za-z0-9$ _-]+) is surfacing in current hot token feeds\./, (m) => `${m[1]} 正在出现在当前热门代币流里。`],
  ]

  for (const [pattern, formatter] of rules) {
    const matches = text.match(pattern)
    if (matches) {
      return formatter(matches)
    }
  }

  return text
}

export default function TokenRadarPage({ mode = 'all' }: { mode?: RadarMode }) {
  const [lang, setLang] = useState<Lang>('zh')
  const [loading, setLoading] = useState(true)
  const [signals, setSignals] = useState<HotTokenSignal[]>([])
  const [generatedAt, setGeneratedAt] = useState('')
  const [selectedChain, setSelectedChain] = useState('all')
  const [copiedId, setCopiedId] = useState('')

  const t = copy[lang]
  const header = pageHeader(mode, lang)

  const modeSignals = useMemo(() => filterSignalsByMode(signals, mode), [mode, signals])

  const chainFilters = useMemo(() => {
    return ['all', ...Array.from(new Set(modeSignals.map((signal) => signal.chainId)))]
  }, [modeSignals])

  const filteredSignals = useMemo(() => {
    if (selectedChain === 'all') {
      return modeSignals
    }
    return modeSignals.filter((signal) => signal.chainId === selectedChain)
  }, [modeSignals, selectedChain])

  useEffect(() => {
    void fetchSignals()
  }, [mode])

  useEffect(() => {
    if (!chainFilters.includes(selectedChain)) {
      setSelectedChain('all')
    }
  }, [chainFilters, selectedChain])

  async function fetchSignals() {
    try {
      setLoading(true)
      const response = await fetch(`/api/tokens/hot?limit=${modeFetchLimit(mode)}`, { cache: 'no-store' })
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
        const directSignals = await fetchHotTokenSignalsInBrowser(modeFetchLimit(mode))
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

      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(18,95,74,0.68),transparent_42%),radial-gradient(circle_at_75%_20%,rgba(29,78,216,0.26),transparent_32%),#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a href="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
                <span>{t.backHome}</span>
              </a>
              <a href="/news/signals" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
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
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100/90">
                {header.badge}
              </span>
              {mode === 'all' && (
                <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100/90">
                  {t.chainCoverage}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">{header.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">{header.subtitle}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
              <span>
                {t.updated}: {formatTimestamp(generatedAt)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span>DexScreener</span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span>{modeSignals.length} tokens</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/tokens/hot"
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  mode === 'all'
                    ? 'border-white bg-white text-black'
                    : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
                }`}
              >
                {t.toHot}
              </a>
              <a
                href="/tokens/chinese"
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  mode === 'chinese'
                    ? 'border-white bg-white text-black'
                    : 'border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:text-white'
                }`}
              >
                {t.toChinese}
              </a>
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
                  : modeSignals.find((signal) => signal.chainId === chain)?.chainLabel ?? chain}
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
            <p>{mode === 'chinese' ? t.loadingChinese : t.loadingAll}</p>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
            <p>{mode === 'chinese' ? t.emptyChinese : t.emptyAll}</p>
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
                          ? signal.hotReasons
                              .slice(0, 2)
                              .map((reason) => localizeGeneratedLine(reason, lang))
                              .join(' ')
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
                  <MetricCard label={t.sections.chain} value={signal.chainLabel} />
                  <MetricCard label={t.sections.dex} value={signal.dexId.toUpperCase()} />
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
                  <MetricCard label={t.labels.pair} value={signal.pairAddress.slice(0, 12)} />
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
