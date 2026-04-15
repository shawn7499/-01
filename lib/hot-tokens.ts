import { ensureChainCoverage } from '@/lib/token-radar-utils'

type DexLink = {
  type?: string
  label?: string
  url: string
}

type DexCandidate = {
  url?: string
  chainId: string
  tokenAddress: string
  description?: string
  icon?: string
  header?: string
  links?: DexLink[]
  totalAmount?: number
  updatedAt?: string
}

type DexPair = {
  chainId: string
  dexId: string
  url: string
  pairAddress: string
  baseToken: {
    address: string
    name: string
    symbol: string
  }
  quoteToken: {
    address: string
    name: string
    symbol: string
  }
  priceUsd?: string
  priceNative?: string
  txns?: {
    m5?: { buys?: number; sells?: number }
    h1?: { buys?: number; sells?: number }
    h24?: { buys?: number; sells?: number }
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
    header?: string
    websites?: DexLink[]
    socials?: DexLink[]
  }
  boosts?: {
    active?: number
  }
}

type DexPairResponse = DexPair[] | { pairs?: DexPair[] }

type TokenLinkType = 'website' | 'twitter' | 'telegram' | 'discord' | 'docs' | 'app' | 'dexscreener' | 'explorer' | 'other'

export interface HotTokenSignal {
  id: string
  chainId: string
  chainLabel: string
  tokenAddress: string
  explorerUrl: string
  dexscreenerUrl: string
  pairAddress: string
  dexId: string
  name: string
  symbol: string
  description: string
  imageUrl: string | null
  headerUrl: string | null
  priceUsd: number | null
  priceChange5m: number | null
  priceChange1h: number | null
  priceChange24h: number | null
  volume5m: number | null
  volume1h: number | null
  volume24h: number | null
  liquidityUsd: number | null
  fdv: number | null
  marketCap: number | null
  boostAmount: number
  buys5m: number
  sells5m: number
  buys1h: number
  sells1h: number
  pairCreatedAt: number | null
  ageHours: number | null
  score: number
  summary: string
  hotReasons: string[]
  riskFlags: string[]
  links: Array<{
    type: TokenLinkType
    label: string
    url: string
  }>
}

const DEX_SCREENER_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; ShawnWickHotTokens/1.0)',
}

const CHAIN_LABELS: Record<string, string> = {
  solana: 'Solana',
  ethereum: 'Ethereum',
  base: 'Base',
  bsc: 'BNB Chain',
  arbitrum: 'Arbitrum',
  polygon: 'Polygon',
  blast: 'Blast',
  avalanche: 'Avalanche',
}

const EXPLORER_BASE: Record<string, string> = {
  solana: 'https://solscan.io/token/',
  ethereum: 'https://etherscan.io/token/',
  base: 'https://basescan.org/token/',
  bsc: 'https://bscscan.com/token/',
  arbitrum: 'https://arbiscan.io/token/',
  polygon: 'https://polygonscan.com/token/',
  blast: 'https://blastscan.io/token/',
  avalanche: 'https://snowtrace.io/token/',
}

function toArray(response: DexPairResponse): DexPair[] {
  if (Array.isArray(response)) {
    return response
  }
  return response.pairs ?? []
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    headers: DEX_SCREENER_HEADERS,
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Request failed ${response.status} for ${url}`)
  }

  return (await response.json()) as T
}

function dedupeLinks(links: DexLink[]) {
  const seen = new Set<string>()

  return links.filter((link) => {
    if (!link?.url || seen.has(link.url)) {
      return false
    }
    seen.add(link.url)
    return true
  })
}

function buildExplorerUrl(chainId: string, tokenAddress: string) {
  return `${EXPLORER_BASE[chainId] ?? 'https://dexscreener.com/'}${tokenAddress}`
}

function chainLabel(chainId: string) {
  return CHAIN_LABELS[chainId] ?? chainId
}

function safeNumber(value?: string | number | null) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function ageHours(pairCreatedAt?: number) {
  if (!pairCreatedAt) return null
  return (Date.now() - pairCreatedAt) / (1000 * 60 * 60)
}

function pairRankScore(pair: DexPair) {
  const volume = pair.volume?.h24 ?? 0
  const liquidity = pair.liquidity?.usd ?? 0
  const txns = (pair.txns?.h1?.buys ?? 0) + (pair.txns?.h1?.sells ?? 0)
  const boost = pair.boosts?.active ?? 0

  return volume * 0.7 + liquidity * 1.2 + txns * 90 + boost * 150
}

function chooseBestPair(pairs: DexPair[]) {
  return [...pairs].sort((a, b) => pairRankScore(b) - pairRankScore(a))[0]
}

function inferNarrative(text: string) {
  if (!text) return null

  const lower = text.toLowerCase()

  if (/(ai|agent|wallet|terminal|infrastructure|protocol|app)/.test(lower)) {
    return 'AI or product narrative is part of the current attention.'
  }
  if (/(elon|musk|xchat|x coin|cashtag)/.test(lower)) {
    return 'X or Elon-related narrative is helping attention.'
  }
  if (/(pepe|furie|frog|cat|dog|otter|goat|animal|wombat)/.test(lower)) {
    return 'Animal or meme-character narrative is spreading fast.'
  }
  if (/(cto|community|cult|portal|pump)/.test(lower)) {
    return 'Community-driven meme narrative is a big part of the move.'
  }
  if (/(bridge|vault|yield|defi|swap|staking)/.test(lower)) {
    return 'Product and DeFi utility narrative supports the token.'
  }

  return null
}

function buildReasons(pair: DexPair, candidate: DexCandidate) {
  const reasons: string[] = []

  const boostAmount = candidate.totalAmount ?? pair.boosts?.active ?? 0
  const volume24h = pair.volume?.h24 ?? 0
  const liquidityUsd = pair.liquidity?.usd ?? 0
  const change1h = pair.priceChange?.h1 ?? 0
  const buys1h = pair.txns?.h1?.buys ?? 0
  const sells1h = pair.txns?.h1?.sells ?? 0
  const age = ageHours(pair.pairCreatedAt)

  if (boostAmount >= 250) {
    reasons.push(`DexScreener boost exposure is elevated at ${boostAmount}.`)
  } else if (boostAmount >= 50) {
    reasons.push(`The token is still receiving boosted attention with a score of ${boostAmount}.`)
  }

  if (volume24h >= 1_000_000) {
    reasons.push('24-hour trading volume is above $1M, showing strong turnover.')
  } else if (volume24h >= 250_000) {
    reasons.push('24-hour trading volume is already meaningful for a hot onchain token.')
  }

  if (liquidityUsd >= 100_000) {
    reasons.push('Liquidity is relatively stronger than most fresh onchain meme tokens.')
  } else if (liquidityUsd >= 25_000) {
    reasons.push('Liquidity is workable enough for a watchlist candidate.')
  }

  if (change1h >= 80) {
    reasons.push('One-hour price momentum is extremely strong.')
  } else if (change1h >= 20) {
    reasons.push('One-hour momentum is clearly positive.')
  }

  if (buys1h >= sells1h * 2 && buys1h >= 200) {
    reasons.push('Buy-side activity is still dominating the last hour.')
  }

  if (age !== null && age <= 12) {
    reasons.push('The pair is still very new, so attention is concentrated and fast-moving.')
  } else if (age !== null && age <= 48) {
    reasons.push('The pair is still fresh enough for narrative momentum to matter.')
  }

  const narrative = inferNarrative(`${candidate.description ?? ''} ${pair.baseToken.name} ${pair.baseToken.symbol}`)
  if (narrative) {
    reasons.push(narrative)
  }

  if ((pair.info?.websites?.length ?? 0) + (pair.info?.socials?.length ?? 0) >= 2) {
    reasons.push('There is at least a minimal set of website or social links to verify the story.')
  }

  return reasons.slice(0, 4)
}

function buildRiskFlags(pair: DexPair, candidate: DexCandidate) {
  const risks: string[] = []

  const liquidityUsd = pair.liquidity?.usd ?? 0
  const change1h = pair.priceChange?.h1 ?? 0
  const change24h = pair.priceChange?.h24 ?? 0
  const boostAmount = candidate.totalAmount ?? pair.boosts?.active ?? 0
  const age = ageHours(pair.pairCreatedAt)

  if (age !== null && age <= 24) {
    risks.push('New listing: volatility can be extreme.')
  }
  if (liquidityUsd < 20_000) {
    risks.push('Thin liquidity can create large slippage.')
  }
  if (boostAmount > 0) {
    risks.push('Part of the attention may be driven by paid exposure.')
  }
  if (change1h >= 120 || change24h >= 250) {
    risks.push('The move is already steep, so pullback risk is high.')
  }
  if ((pair.info?.websites?.length ?? 0) === 0 && (pair.info?.socials?.length ?? 0) === 0) {
    risks.push('Project links are limited, so due diligence is harder.')
  }

  return risks.slice(0, 4)
}

function buildScore(pair: DexPair, candidate: DexCandidate) {
  const boost = Math.min(candidate.totalAmount ?? pair.boosts?.active ?? 0, 500) * 0.06
  const volume = Math.min(Math.log10((pair.volume?.h24 ?? 0) + 1) * 12, 32)
  const liquidity = Math.min(Math.log10((pair.liquidity?.usd ?? 0) + 1) * 8, 20)
  const activity = Math.min(((pair.txns?.h1?.buys ?? 0) + (pair.txns?.h1?.sells ?? 0)) / 100, 18)
  const momentum = Math.max(0, Math.min(pair.priceChange?.h1 ?? 0, 120) * 0.16)
  const freshness = (() => {
    const age = ageHours(pair.pairCreatedAt)
    if (age === null) return 0
    if (age <= 12) return 10
    if (age <= 48) return 6
    if (age <= 168) return 3
    return 0
  })()

  return Math.max(1, Math.min(99, Math.round(18 + boost + volume + liquidity + activity + momentum + freshness)))
}

function normalizeLinks(pair: DexPair, candidate: DexCandidate) {
  const rawLinks = dedupeLinks([
    ...(candidate.links ?? []),
    ...(pair.info?.websites ?? []),
    ...(pair.info?.socials ?? []),
  ])

  const normalized: Array<{
    type: TokenLinkType
    label: string
    url: string
  }> = rawLinks.map((link) => {
    const type = (link.type ?? link.label ?? 'other').toLowerCase()

    let normalizedType: TokenLinkType = 'other'
    if (type.includes('twitter') || type === 'x') normalizedType = 'twitter'
    else if (type.includes('telegram')) normalizedType = 'telegram'
    else if (type.includes('discord')) normalizedType = 'discord'
    else if (type.includes('website')) normalizedType = 'website'
    else if (type.includes('docs')) normalizedType = 'docs'
    else if (type.includes('app')) normalizedType = 'app'

    return {
      type: normalizedType,
      label: link.label || link.type || 'Link',
      url: link.url,
    }
  })

  normalized.unshift({
    type: 'explorer',
    label: 'Explorer',
    url: buildExplorerUrl(pair.chainId, pair.baseToken.address),
  })

  normalized.unshift({
    type: 'dexscreener',
    label: 'DexScreener',
    url: pair.url,
  })

  const seen = new Set<string>()

  return normalized.filter((link) => {
    if (!link.url || seen.has(link.url)) {
      return false
    }
    seen.add(link.url)
    return true
  })
}

function buildSummary(reasons: string[]) {
  if (reasons.length === 0) {
    return 'This token is active enough to monitor, but it still needs more confirmation.'
  }

  return reasons.slice(0, 2).join(' ')
}

async function fetchCandidates() {
  const [boosted, profiles] = await Promise.all([
    fetchJson<DexCandidate[]>('https://api.dexscreener.com/token-boosts/top/v1'),
    fetchJson<DexCandidate[]>('https://api.dexscreener.com/token-profiles/latest/v1'),
  ])

  const candidates = new Map<string, DexCandidate>()

  const prioritizedPools = [
    ...boosted.slice(0, 20),
    ...boosted.filter((item) => item.chainId === 'bsc').slice(0, 14),
    ...profiles.filter((item) => item.chainId === 'bsc').slice(0, 24),
    ...profiles.slice(0, 40),
  ]

  for (const item of prioritizedPools) {
    const key = `${item.chainId}:${item.tokenAddress}`
    const existing = candidates.get(key)

    if (!existing) {
      candidates.set(key, item)
      continue
    }

    candidates.set(key, {
      ...existing,
      ...item,
      links: dedupeLinks([...(existing.links ?? []), ...(item.links ?? [])]),
      totalAmount: Math.max(existing.totalAmount ?? 0, item.totalAmount ?? 0),
    })
  }

  return Array.from(candidates.values())
}

async function buildSignal(candidate: DexCandidate) {
  const pairResponse = await fetchJson<DexPairResponse>(
    `https://api.dexscreener.com/tokens/v1/${candidate.chainId}/${candidate.tokenAddress}`
  )

  const pair = chooseBestPair(toArray(pairResponse))
  if (!pair) {
    return null
  }

  const reasons = buildReasons(pair, candidate)
  const risks = buildRiskFlags(pair, candidate)
  const score = buildScore(pair, candidate)

  const signal: HotTokenSignal = {
    id: `${pair.chainId}-${pair.baseToken.address}`,
    chainId: pair.chainId,
    chainLabel: chainLabel(pair.chainId),
    tokenAddress: pair.baseToken.address,
    explorerUrl: buildExplorerUrl(pair.chainId, pair.baseToken.address),
    dexscreenerUrl: pair.url,
    pairAddress: pair.pairAddress,
    dexId: pair.dexId,
    name: pair.baseToken.name,
    symbol: pair.baseToken.symbol,
    description: candidate.description?.trim() || `${pair.baseToken.name} is currently surfacing in onchain hot token feeds.`,
    imageUrl: pair.info?.imageUrl ?? candidate.icon ?? null,
    headerUrl: pair.info?.header ?? candidate.header ?? null,
    priceUsd: safeNumber(pair.priceUsd),
    priceChange5m: safeNumber(pair.priceChange?.m5),
    priceChange1h: safeNumber(pair.priceChange?.h1),
    priceChange24h: safeNumber(pair.priceChange?.h24),
    volume5m: safeNumber(pair.volume?.m5),
    volume1h: safeNumber(pair.volume?.h1),
    volume24h: safeNumber(pair.volume?.h24),
    liquidityUsd: safeNumber(pair.liquidity?.usd),
    fdv: safeNumber(pair.fdv),
    marketCap: safeNumber(pair.marketCap),
    boostAmount: candidate.totalAmount ?? pair.boosts?.active ?? 0,
    buys5m: pair.txns?.m5?.buys ?? 0,
    sells5m: pair.txns?.m5?.sells ?? 0,
    buys1h: pair.txns?.h1?.buys ?? 0,
    sells1h: pair.txns?.h1?.sells ?? 0,
    pairCreatedAt: pair.pairCreatedAt ?? null,
    ageHours: ageHours(pair.pairCreatedAt),
    score,
    summary: buildSummary(reasons),
    hotReasons: reasons,
    riskFlags: risks,
    links: normalizeLinks(pair, candidate),
  }

  return signal
}

export async function getHotTokenSignals(limit = 18) {
  const candidates = await fetchCandidates()

  const settled = await Promise.allSettled(candidates.slice(0, 36).map(buildSignal))

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
