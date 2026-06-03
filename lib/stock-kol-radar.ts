import { promises as fs } from 'fs'
import path from 'path'

export type StockStance = 'bullish' | 'bearish' | 'neutral'
export type StockQueue = 'constructive' | 'watch' | 'caution' | 'high_risk'

export type StockKolMention = {
  id: string
  author: string
  publishedAt: string
  text: string
  tickers: string[]
  url?: string
}

export type StockKolSignal = {
  id: string
  ticker: string
  companyName: string
  sector: string
  industry: string
  kol: string
  stance: StockStance
  queue: StockQueue
  priorityScore: number
  convictionScore: number
  mentions24h: number
  mentions7d: number
  mentions30d: number
  news7d: number
  filings30d: number
  revenueYoyPct: number | null
  momentum: StockStance
  lastMentionAt: string
  thesis: string
  risks: string[]
  mentions: StockKolMention[]
}

export type StockKolFeed = {
  generatedAt: string
  sourceLabel: string
  sourceStatus: 'live' | 'local' | 'sample'
  signals: StockKolSignal[]
}

const sampleMentions: StockKolMention[] = [
  {
    id: 'sample-nvda-1',
    author: 'Serenity-style watchlist',
    publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    text: 'AI infrastructure demand remains the strongest large-cap theme. Watch NVDA pullbacks instead of chasing vertical candles.',
    tickers: ['NVDA'],
  },
  {
    id: 'sample-avgo-1',
    author: 'Serenity-style watchlist',
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    text: 'Custom silicon and networking names are still where AI capex translates into revenue. AVGO remains on the high-quality list.',
    tickers: ['AVGO'],
  },
  {
    id: 'sample-hims-1',
    author: 'Serenity-style watchlist',
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    text: 'HIMS has strong retail attention, but valuation and headline risk make position sizing more important than narrative excitement.',
    tickers: ['HIMS'],
  },
]

const sampleSignals: StockKolSignal[] = [
  {
    id: 'NVDA',
    ticker: 'NVDA',
    companyName: 'NVIDIA',
    sector: 'Technology',
    industry: 'AI Infrastructure / Semiconductors',
    kol: 'Serenity-style',
    stance: 'bullish',
    queue: 'constructive',
    priorityScore: 96,
    convictionScore: 91,
    mentions24h: 3,
    mentions7d: 18,
    mentions30d: 55,
    news7d: 10,
    filings30d: 3,
    revenueYoyPct: 65.5,
    momentum: 'bullish',
    lastMentionAt: sampleMentions[0].publishedAt,
    thesis:
      'AI infrastructure remains the dominant market narrative. The signal is strongest when KOL mentions, earnings momentum, and sector breadth move together.',
    risks: ['Crowded large-cap positioning', 'Earnings gap risk', 'AI capex slowdown would hurt the thesis'],
    mentions: [sampleMentions[0]],
  },
  {
    id: 'AVGO',
    ticker: 'AVGO',
    companyName: 'Broadcom',
    sector: 'Technology',
    industry: 'Custom Silicon / Networking',
    kol: 'Serenity-style',
    stance: 'bullish',
    queue: 'constructive',
    priorityScore: 88,
    convictionScore: 84,
    mentions24h: 1,
    mentions7d: 7,
    mentions30d: 22,
    news7d: 4,
    filings30d: 1,
    revenueYoyPct: 44.3,
    momentum: 'bullish',
    lastMentionAt: sampleMentions[1].publishedAt,
    thesis:
      'A cleaner AI infrastructure compounder than many speculative names. KOL attention becomes more useful around earnings and guidance.',
    risks: ['Semiconductor beta', 'Valuation compression', 'Customer concentration risk'],
    mentions: [sampleMentions[1]],
  },
  {
    id: 'HIMS',
    ticker: 'HIMS',
    companyName: 'Hims & Hers',
    sector: 'Healthcare',
    industry: 'Digital Health',
    kol: 'Serenity-style',
    stance: 'neutral',
    queue: 'high_risk',
    priorityScore: 73,
    convictionScore: 58,
    mentions24h: 2,
    mentions7d: 9,
    mentions30d: 30,
    news7d: 5,
    filings30d: 1,
    revenueYoyPct: 32.1,
    momentum: 'bullish',
    lastMentionAt: sampleMentions[2].publishedAt,
    thesis:
      'Retail attention and growth are strong, but the name needs tighter risk control. Treat KOL mentions as a watch signal, not an automatic buy.',
    risks: ['Regulatory and headline risk', 'High volatility', 'Narrative can reverse quickly'],
    mentions: [sampleMentions[2]],
  },
]

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeSignal(raw: Partial<StockKolSignal> & Record<string, unknown>): StockKolSignal | null {
  const ticker = String(raw.ticker ?? '').trim().toUpperCase()
  if (!ticker) return null

  const stance = ['bullish', 'bearish', 'neutral'].includes(String(raw.stance))
    ? (raw.stance as StockStance)
    : ['bullish', 'bearish', 'neutral'].includes(String(raw.direction))
      ? (raw.direction as StockStance)
      : 'neutral'

  const queue = ['constructive', 'watch', 'caution', 'high_risk'].includes(String(raw.queue))
    ? (raw.queue as StockQueue)
    : String(raw.current_view ?? '').includes('caution')
      ? 'caution'
      : String(raw.current_view ?? '').includes('high_risk')
        ? 'high_risk'
        : String(raw.current_view ?? '').includes('constructive')
          ? 'constructive'
          : 'watch'

  return {
    id: String(raw.id ?? ticker),
    ticker,
    companyName: String(raw.companyName ?? raw.company_name ?? ticker),
    sector: String(raw.sector ?? 'US Equities'),
    industry: String(raw.industry ?? raw.industry_id ?? 'Unclassified'),
    kol: String(raw.kol ?? raw.author ?? 'KOL Feed'),
    stance,
    queue,
    priorityScore: asNumber(raw.priorityScore ?? raw.priority_score, 0),
    convictionScore: asNumber(raw.convictionScore ?? raw.conviction_score ?? raw.priorityScore ?? raw.priority_score, 0),
    mentions24h: asNumber(raw.mentions24h ?? raw.recent_mentions_24h, 0),
    mentions7d: asNumber(raw.mentions7d ?? raw.recent_mentions_7d, 0),
    mentions30d: asNumber(raw.mentions30d ?? raw.recent_mentions_30d, 0),
    news7d: asNumber(raw.news7d ?? raw.recent_stock_news_7d, 0),
    filings30d: asNumber(raw.filings30d ?? raw.recent_sec_filings_30d, 0),
    revenueYoyPct:
      raw.revenueYoyPct === null || raw.revenue_yoy_pct === null
        ? null
        : asNumber(raw.revenueYoyPct ?? raw.revenue_yoy_pct, Number.NaN),
    momentum: ['bullish', 'bearish', 'neutral'].includes(String(raw.momentum))
      ? (raw.momentum as StockStance)
      : ['bullish', 'bearish', 'neutral'].includes(String(raw.momentum_direction))
        ? (raw.momentum_direction as StockStance)
        : 'neutral',
    lastMentionAt: String(raw.lastMentionAt ?? raw.author_stance_updated_at ?? new Date().toISOString()),
    thesis: String(raw.thesis ?? 'KOL attention detected. Use this as a watchlist signal, not as standalone investment advice.'),
    risks: Array.isArray(raw.risks) ? raw.risks.map(String) : ['KOL calls can be late, crowded, or wrong. Confirm with price, volume, filings, and risk limits.'],
    mentions: Array.isArray(raw.mentions) ? (raw.mentions as StockKolMention[]) : [],
  }
}

async function readLocalFeed(): Promise<StockKolSignal[] | null> {
  const localPath = path.join(process.cwd(), 'data', 'stock-kol-signals.json')
  try {
    const raw = await fs.readFile(localPath, 'utf8')
    const payload = JSON.parse(raw)
    const list = Array.isArray(payload) ? payload : payload.signals
    if (!Array.isArray(list)) return null
    return list.map(normalizeSignal).filter(Boolean) as StockKolSignal[]
  } catch {
    return null
  }
}

async function readRemoteFeed(): Promise<StockKolSignal[] | null> {
  const sourceUrl = process.env.KOL_STOCK_RANKING_URL
  if (!sourceUrl) return null

  const response = await fetch(sourceUrl, { cache: 'no-store' })
  if (!response.ok) return null

  const payload = await response.json()
  const list = Array.isArray(payload) ? payload : payload.signals ?? payload.stocks ?? payload.data
  if (!Array.isArray(list)) return null

  return list.map(normalizeSignal).filter(Boolean) as StockKolSignal[]
}

export async function getStockKolFeed(): Promise<StockKolFeed> {
  const remoteSignals = await readRemoteFeed().catch(() => null)
  if (remoteSignals?.length) {
    return {
      generatedAt: new Date().toISOString(),
      sourceLabel: process.env.KOL_STOCK_RANKING_URL ?? 'Remote KOL feed',
      sourceStatus: 'live',
      signals: remoteSignals.sort((a, b) => b.priorityScore - a.priorityScore),
    }
  }

  const localSignals = await readLocalFeed()
  if (localSignals?.length) {
    return {
      generatedAt: new Date().toISOString(),
      sourceLabel: 'data/stock-kol-signals.json',
      sourceStatus: 'local',
      signals: localSignals.sort((a, b) => b.priorityScore - a.priorityScore),
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    sourceLabel: 'Sample Serenity-style schema',
    sourceStatus: 'sample',
    signals: sampleSignals,
  }
}
