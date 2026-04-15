import { execFile } from 'node:child_process'
import { join } from 'node:path'
import { promisify } from 'node:util'

import type { HotTokenSignal } from '@/lib/hot-tokens'
import {
  containsChineseText,
  ensureChainCoverage,
  hasChineseNarrativeKeyword,
} from '@/lib/token-radar-utils'

const execFileAsync = promisify(execFile)

const DEFAULT_GMGN_API_KEY = 'gmgn_solbscbaseethmonadtron'
const DEFAULT_TRENDING_INTERVAL = '1h'

const CHAIN_CONFIG = {
  sol: {
    chainId: 'solana',
    chainLabel: 'Solana',
    explorerBase: 'https://solscan.io/token/',
    gmgnPath: 'sol',
  },
  bsc: {
    chainId: 'bsc',
    chainLabel: 'BNB Chain',
    explorerBase: 'https://bscscan.com/token/',
    gmgnPath: 'bsc',
  },
  base: {
    chainId: 'base',
    chainLabel: 'Base',
    explorerBase: 'https://basescan.org/token/',
    gmgnPath: 'base',
  },
} as const

const LOCALIZED_CHINESE_KEYWORDS = [
  'binance',
  'story',
  'summer',
  'chat',
  'dragon',
  'loong',
  'jelly',
  'prediction',
  'master trader',
  'audiobook',
  'build',
  'virus',
  'ai pro',
] as const

type SupportedChain = keyof typeof CHAIN_CONFIG
type GmgnTrendingInterval = '5m' | '1h'

type GmgnTrendingResponse = {
  code: number
  data?: {
    rank?: GmgnTrendingToken[]
  }
  message?: string
  reason?: string
}

type GmgnTrendingToken = {
  chain: SupportedChain
  address: string
  name: string
  symbol: string
  logo?: string
  price?: number
  price_change_percent?: number
  price_change_percent1m?: number
  price_change_percent5m?: number
  price_change_percent1h?: number
  volume?: number
  liquidity?: number
  market_cap?: number
  total_supply?: number
  history_highest_market_cap?: number
  swaps?: number
  buys?: number
  sells?: number
  holder_count?: number
  top_10_holder_rate?: number
  open_timestamp?: number
  creation_timestamp?: number
  launchpad?: string
  launchpad_platform?: string
  launchpad_status?: string
  exchange?: string
  twitter_username?: string
  website?: string
  telegram?: string
  creator_token_status?: string
  creator_close?: boolean
  hot_level?: number
  is_wash_trading?: boolean
  rat_trader_amount_rate?: number
  rug_ratio?: number
  sniper_count?: number
  smart_degen_count?: number
  renowned_count?: number
  bundler_rate?: number
  entrapment_ratio?: number
  is_og?: boolean
  gas_fee?: number
  dev_team_hold_rate?: number
  top70_sniper_hold_rate?: number
  bot_degen_count?: number
  buy_tax?: string
  sell_tax?: string
  is_honeypot?: number
  is_renounced?: number
  is_open_source?: number
  lock_percent?: number
  bot_degen_rate?: number
  rank?: number
  trans_name?: string
  trans_symbol?: string
  trans_name_zhcn?: string
  trans_symbol_zhcn?: string
}

type GmgnSignalSnapshot = {
  token: GmgnTrendingToken
  intervals: Set<GmgnTrendingInterval>
}

function getGmgnApiKey() {
  return process.env.GMGN_API_KEY?.trim() || DEFAULT_GMGN_API_KEY
}

function getCliPath() {
  return join(process.cwd(), 'node_modules', 'gmgn-cli', 'dist', 'index.js')
}

function gmgnTokenUrl(chain: SupportedChain, address: string) {
  return `https://gmgn.ai/${CHAIN_CONFIG[chain].gmgnPath}/token/${address}`
}

function explorerUrl(chain: SupportedChain, address: string) {
  return `${CHAIN_CONFIG[chain].explorerBase}${address}`
}

function toOptionalNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function toBooleanFlag(value: unknown) {
  return value === 1 || value === true
}

function ageHoursFromSeconds(timestamp?: number) {
  if (!timestamp || timestamp <= 0) return null
  return (Date.now() - timestamp * 1000) / (1000 * 60 * 60)
}

function formatLaunchpad(value?: string) {
  if (!value) return null
  return value.replace(/[_-]/g, ' ')
}

function buildSummary(reasons: string[]) {
  if (reasons.length === 0) {
    return 'This token is active enough to monitor, but it still needs more confirmation.'
  }

  return reasons.slice(0, 2).join(' ')
}

function buildScore(token: GmgnTrendingToken) {
  const hotLevel = Math.min(token.hot_level ?? 0, 5) * 5
  const volume = Math.min(Math.log10((token.volume ?? 0) + 1) * 13, 34)
  const liquidity = Math.min(Math.log10((token.liquidity ?? 0) + 1) * 8, 20)
  const activity = Math.min(((token.buys ?? 0) + (token.sells ?? 0)) / 180, 18)
  const smartMoney = Math.min((token.smart_degen_count ?? 0) * 1.7, 14)
  const renowned = Math.min((token.renowned_count ?? 0) * 1.4, 10)
  const momentum = Math.max(0, Math.min(token.price_change_percent1h ?? 0, 160) * 0.12)
  const freshness = (() => {
    const age = ageHoursFromSeconds(token.creation_timestamp)
    if (age === null) return 0
    if (age <= 6) return 12
    if (age <= 24) return 8
    if (age <= 72) return 4
    return 0
  })()
  const riskPenalty =
    Math.min(token.top_10_holder_rate ?? 0, 0.4) * 22 +
    Math.min(token.bundler_rate ?? 0, 0.3) * 16 +
    Math.min(token.bot_degen_rate ?? 0, 0.5) * 14 +
    (toBooleanFlag(token.is_honeypot) ? 30 : 0)

  return Math.max(
    1,
    Math.min(
      99,
      Math.round(26 + hotLevel + volume + liquidity + activity + smartMoney + renowned + momentum + freshness - riskPenalty)
    )
  )
}

function buildHotReasons(token: GmgnTrendingToken) {
  const reasons: string[] = []
  const launchpad = formatLaunchpad(token.launchpad_platform || token.launchpad)
  const age = ageHoursFromSeconds(token.creation_timestamp)

  if ((token.hot_level ?? 0) >= 3) {
    reasons.push(`GMGN hot level is elevated at ${token.hot_level}.`)
  }

  if ((token.smart_degen_count ?? 0) >= 8) {
    reasons.push(`Smart-money participation is notable with ${token.smart_degen_count} active wallets.`)
  } else if ((token.renowned_count ?? 0) >= 6) {
    reasons.push(`KOL-style participation is visible with ${token.renowned_count} renowned wallets involved.`)
  }

  if ((token.volume ?? 0) >= 1_000_000) {
    reasons.push('1-hour volume is already above $1M.')
  } else if ((token.volume ?? 0) >= 150_000) {
    reasons.push('1-hour volume is meaningful for a hot onchain token.')
  }

  if ((token.liquidity ?? 0) >= 100_000) {
    reasons.push('Liquidity is stronger than most fresh meme launches.')
  } else if ((token.liquidity ?? 0) >= 25_000) {
    reasons.push('Liquidity is usable enough for a watchlist candidate.')
  }

  if ((token.price_change_percent1h ?? 0) >= 80) {
    reasons.push('One-hour momentum is extremely strong.')
  } else if ((token.price_change_percent1h ?? 0) >= 20) {
    reasons.push('One-hour momentum is clearly positive.')
  }

  if ((token.buys ?? 0) > (token.sells ?? 0) * 1.2 && (token.buys ?? 0) >= 200) {
    reasons.push('Buy-side activity is still dominating the last hour.')
  }

  if (age !== null && age <= 24) {
    reasons.push('The token is still very new, so attention is concentrated and fast-moving.')
  }

  if (launchpad) {
    reasons.push(`Launchpad attention is coming from ${launchpad}.`)
  }

  if (
    token.trans_name_zhcn ||
    token.trans_symbol_zhcn ||
    containsChineseText(token.name, token.symbol)
  ) {
    reasons.push('Chinese-language or Chinese narrative cues are part of the attention.')
  }

  return reasons.slice(0, 4)
}

function buildRiskFlags(token: GmgnTrendingToken) {
  const risks: string[] = []
  const age = ageHoursFromSeconds(token.creation_timestamp)

  if (age !== null && age <= 24) {
    risks.push('New listing: volatility can be extreme.')
  }
  if (toBooleanFlag(token.is_honeypot)) {
    risks.push('GMGN marks this token as a potential honeypot risk.')
  }
  if ((token.top_10_holder_rate ?? 0) >= 0.22) {
    risks.push('Top-holder concentration is elevated.')
  }
  if ((token.dev_team_hold_rate ?? 0) >= 0.05) {
    risks.push('Developer/team hold rate is still noticeable.')
  }
  if ((token.bundler_rate ?? 0) >= 0.1) {
    risks.push('Bundler activity is elevated, so early flow may be crowded.')
  }
  if ((token.bot_degen_rate ?? 0) >= 0.28) {
    risks.push('Bot-driven trading activity is relatively high.')
  }
  if ((token.price_change_percent1h ?? 0) >= 140 || (token.price_change_percent ?? 0) >= 220) {
    risks.push('The move is already steep, so pullback risk is high.')
  }
  if (!toBooleanFlag(token.is_open_source)) {
    risks.push('Contract source visibility is limited.')
  }
  if (!toBooleanFlag(token.is_renounced) && token.chain !== 'sol') {
    risks.push('Ownership is not clearly renounced yet.')
  }
  if (token.creator_close === false) {
    risks.push('Creator wallet still appears active in token holdings.')
  }

  return risks.slice(0, 4)
}

function buildDescription(token: GmgnTrendingToken) {
  const translations = [
    token.trans_name,
    token.trans_symbol,
    token.trans_name_zhcn,
    token.trans_symbol_zhcn,
  ].filter(Boolean)
  const translationText = translations.length ? ` GMGN translation hints: ${translations.join(' / ')}.` : ''
  const launchpad = formatLaunchpad(token.launchpad_platform || token.launchpad)
  const launchpadText = launchpad ? ` Launchpad: ${launchpad}.` : ''

  return `${CHAIN_CONFIG[token.chain].chainLabel} trending token surfaced by GMGN.${launchpadText}${translationText}`.trim()
}

function normalizeLinks(token: GmgnTrendingToken) {
  const links: HotTokenSignal['links'] = [
    {
      type: 'app',
      label: 'GMGN',
      url: gmgnTokenUrl(token.chain, token.address),
    },
    {
      type: 'explorer',
      label: 'Explorer',
      url: explorerUrl(token.chain, token.address),
    },
  ]

  if (token.website) {
    links.push({ type: 'website', label: 'Website', url: token.website })
  }
  if (token.twitter_username) {
    links.push({ type: 'twitter', label: 'X', url: token.twitter_username })
  }
  if (token.telegram) {
    links.push({ type: 'telegram', label: 'Telegram', url: token.telegram })
  }

  const seen = new Set<string>()
  return links.filter((link) => {
    if (!link.url || seen.has(link.url)) {
      return false
    }

    seen.add(link.url)
    return true
  })
}

function mapToken(token: GmgnTrendingToken, options?: { relaxed?: boolean }): HotTokenSignal | null {
  if (toBooleanFlag(token.is_honeypot)) {
    return null
  }

  const reasons = buildHotReasons(token)
  const risks = buildRiskFlags(token)
  const createdAt = token.creation_timestamp && token.creation_timestamp > 0 ? token.creation_timestamp * 1000 : null
  const score = buildScore(token)
  const volume = token.volume ?? 0
  const liquidity = token.liquidity ?? 0

  if (!options?.relaxed && volume < 25_000 && liquidity < 10_000 && score < 45) {
    return null
  }

  if (options?.relaxed && volume < 1_000 && liquidity < 4_000 && score < 38) {
    return null
  }

  return {
    id: `${CHAIN_CONFIG[token.chain].chainId}-${token.address}`,
    chainId: CHAIN_CONFIG[token.chain].chainId,
    chainLabel: CHAIN_CONFIG[token.chain].chainLabel,
    tokenAddress: token.address,
    explorerUrl: explorerUrl(token.chain, token.address),
    dexscreenerUrl: gmgnTokenUrl(token.chain, token.address),
    pairAddress: token.exchange || token.address,
    dexId: formatLaunchpad(token.launchpad_platform || token.launchpad) || 'gmgn',
    name: token.name,
    symbol: token.symbol,
    description: buildDescription(token),
    imageUrl: token.logo ?? null,
    headerUrl: null,
    priceUsd: toOptionalNumber(token.price),
    priceChange5m: toOptionalNumber(token.price_change_percent5m),
    priceChange1h: toOptionalNumber(token.price_change_percent1h),
    priceChange24h: toOptionalNumber(token.price_change_percent),
    volume5m: null,
    volume1h: toOptionalNumber(token.volume),
    volume24h: toOptionalNumber(token.volume),
    liquidityUsd: toOptionalNumber(token.liquidity),
    fdv: toOptionalNumber(token.history_highest_market_cap ?? token.market_cap),
    marketCap: toOptionalNumber(token.market_cap),
    boostAmount: Math.max(token.hot_level ?? 0, 0),
    buys5m: 0,
    sells5m: 0,
    buys1h: token.buys ?? 0,
    sells1h: token.sells ?? 0,
    pairCreatedAt: createdAt,
    ageHours: ageHoursFromSeconds(token.creation_timestamp),
    score,
    summary: buildSummary(reasons),
    hotReasons: reasons,
    riskFlags: risks,
    links: normalizeLinks(token),
  }
}

async function fetchChainTrending(
  chain: SupportedChain,
  limit: number,
  interval: GmgnTrendingInterval = DEFAULT_TRENDING_INTERVAL
) {
  const { stdout } = await execFileAsync(
    process.execPath,
    [
      getCliPath(),
      'market',
      'trending',
      '--chain',
      chain,
      '--interval',
      interval,
      '--limit',
      String(limit),
      '--raw',
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        GMGN_API_KEY: getGmgnApiKey(),
      },
      maxBuffer: 8 * 1024 * 1024,
    }
  )

  const parsed = JSON.parse(stdout.trim()) as GmgnTrendingResponse
  if (parsed.code !== 0) {
    throw new Error(parsed.reason || parsed.message || `GMGN returned code ${parsed.code}`)
  }

  return parsed.data?.rank ?? []
}

function tokenPriority(token: GmgnTrendingToken) {
  return (
    (token.hot_level ?? 0) * 10_000 +
    (token.volume ?? 0) +
    (token.liquidity ?? 0) * 0.75 +
    (token.smart_degen_count ?? 0) * 500 +
    (token.renowned_count ?? 0) * 300
  )
}

function mergeSnapshots(
  entries: Array<{ interval: GmgnTrendingInterval; token: GmgnTrendingToken }>
) {
  const merged = new Map<string, GmgnSignalSnapshot>()

  for (const entry of entries) {
    const key = `${entry.token.chain}:${entry.token.address}`
    const existing = merged.get(key)

    if (!existing) {
      merged.set(key, {
        token: entry.token,
        intervals: new Set([entry.interval]),
      })
      continue
    }

    const alreadyHadHourly = existing.intervals.has('1h')
    existing.intervals.add(entry.interval)

    const shouldPromote =
      entry.interval === '1h' && !alreadyHadHourly
        ? true
        : tokenPriority(entry.token) > tokenPriority(existing.token)

    if (shouldPromote) {
      existing.token = entry.token
    }
  }

  return Array.from(merged.values())
}

function dedupeText(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)))
}

function hasLocalizedChineseNarrative(token: GmgnTrendingToken) {
  const allParts = [
    token.name,
    token.symbol,
    token.trans_name,
    token.trans_symbol,
    token.trans_name_zhcn,
    token.trans_symbol_zhcn,
  ]
  const haystack = allParts.filter(Boolean).join(' ').toLowerCase()

  return (
    hasChineseNarrativeKeyword(...allParts) ||
    LOCALIZED_CHINESE_KEYWORDS.some((keyword) => haystack.includes(keyword))
  )
}

function isBscChineseCandidate(token: GmgnTrendingToken) {
  if (token.chain !== 'bsc') {
    return false
  }

  if (containsChineseText(token.name, token.symbol)) {
    return true
  }

  if (!containsChineseText(token.trans_name_zhcn, token.trans_symbol_zhcn)) {
    return false
  }

  return hasLocalizedChineseNarrative(token)
}

function enhanceChineseSignal(signal: HotTokenSignal, snapshot: GmgnSignalSnapshot) {
  const originalChinese = containsChineseText(snapshot.token.name, snapshot.token.symbol)
  const hasFastConfirmation = snapshot.intervals.has('5m')
  const hasSlowConfirmation = snapshot.intervals.has('1h')

  const chineseLead = originalChinese
    ? 'Original name or symbol already uses Chinese text.'
    : 'GMGN translation plus narrative cues suggest Chinese-language attention.'
  const intervalLead =
    hasFastConfirmation && hasSlowConfirmation
      ? 'The token is appearing in both GMGN 5-minute and 1-hour BSC trending windows.'
      : hasFastConfirmation
        ? 'The token is surfacing in the fast 5-minute GMGN BSC trending window.'
        : 'The token is still present in the 1-hour GMGN BSC trending window.'

  const hotReasons = dedupeText([chineseLead, intervalLead, ...signal.hotReasons]).slice(0, 5)
  const riskFlags = dedupeText(signal.riskFlags).slice(0, 4)
  const scoreBoost = (originalChinese ? 8 : 4) + (hasFastConfirmation && hasSlowConfirmation ? 4 : 0)

  return {
    ...signal,
    score: Math.min(99, signal.score + scoreBoost),
    summary: `${chineseLead} ${intervalLead}`.trim(),
    description: originalChinese
      ? `${signal.name} is surfacing in GMGN BSC feeds with an original Chinese name or symbol.`
      : `${signal.name} is surfacing in GMGN BSC feeds with translated Chinese cues and a matching narrative.`,
    hotReasons,
    riskFlags,
  }
}

export async function getGmgnHotTokenSignals(limit = 18) {
  const perChainLimit = Math.max(8, Math.ceil(limit / 2))
  const chains: SupportedChain[] = ['sol', 'bsc', 'base']

  const results = await Promise.all(chains.map((chain) => fetchChainTrending(chain, perChainLimit, '1h')))
  const signals = Array.from(
    new Map(
      results
        .flat()
        .map((token) => mapToken(token))
        .filter((signal): signal is HotTokenSignal => Boolean(signal))
        .map((signal) => [signal.id, signal])
    ).values()
  )
    .sort((a, b) => b.score - a.score || (b.volume1h ?? 0) - (a.volume1h ?? 0))

  return ensureChainCoverage(signals, limit, 'bsc', limit >= 12 ? 4 : Math.min(3, limit))
}

export async function getGmgnBscChineseSignals(limit = 12) {
  const fetchLimit = Math.max(limit * 2, 24)
  const [hourly, fast] = await Promise.all([
    fetchChainTrending('bsc', fetchLimit, '1h'),
    fetchChainTrending('bsc', fetchLimit, '5m'),
  ])

  const mergedSnapshots = mergeSnapshots([
    ...hourly.map((token) => ({ token, interval: '1h' as const })),
    ...fast.map((token) => ({ token, interval: '5m' as const })),
  ])

  return mergedSnapshots
    .filter((snapshot) => isBscChineseCandidate(snapshot.token))
    .map((snapshot) => {
      const signal = mapToken(snapshot.token, { relaxed: true })
      return signal ? enhanceChineseSignal(signal, snapshot) : null
    })
    .filter((signal): signal is HotTokenSignal => Boolean(signal))
    .sort((a, b) => b.score - a.score || (b.volume1h ?? 0) - (a.volume1h ?? 0))
    .slice(0, limit)
}
