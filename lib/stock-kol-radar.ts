import { promises as fs } from 'fs'
import path from 'path'

export type StockStance = 'bullish' | 'bearish' | 'neutral'
export type StockQueue = 'constructive' | 'watch' | 'caution' | 'high_risk'

export type StockKolMention = {
  id: string
  author: string
  publishedAt: string
  text: string
  textZh: string
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
  overallScore: number
  priorityScore: number
  convictionScore: number
  marketCapUsd: number | null
  mentions24h: number
  mentions7d: number
  mentions30d: number
  news7d: number
  filings30d: number
  revenueYoyPct: number | null
  momentum: StockStance
  lastMentionAt: string
  thesis: string
  thesisZh: string
  risks: string[]
  risksZh: string[]
  mentions: StockKolMention[]
}

export type StockKolFeed = {
  generatedAt: string
  sourceLabel: string
  sourceStatus: 'live' | 'local' | 'sample'
  signals: StockKolSignal[]
}

type RawRecord = Record<string, unknown>

type SampleSignal = Omit<StockKolSignal, 'id' | 'lastMentionAt' | 'mentions'> & {
  mentionMinutesAgo: number
  mentionText: string
  mentionTextZh: string
}

const sampleDefinitions: SampleSignal[] = [
  {
    ticker: 'NVDA',
    companyName: 'NVIDIA',
    sector: 'Technology',
    industry: 'AI Infrastructure / Semiconductors',
    kol: 'Serenity-style, AI infra KOL',
    stance: 'bullish',
    queue: 'constructive',
    overallScore: 96,
    priorityScore: 96,
    convictionScore: 91,
    marketCapUsd: 4_250_000_000_000,
    mentions24h: 5,
    mentions7d: 24,
    mentions30d: 68,
    news7d: 13,
    filings30d: 3,
    revenueYoyPct: 65.5,
    momentum: 'bullish',
    thesis: 'AI infrastructure remains the strongest large-cap theme. KOL mentions are most useful when they align with earnings momentum and sector breadth.',
    thesisZh: 'AI 基础设施仍是大市值股票里最强的主线之一。如果 KOL 提及、财报增长和半导体板块强度同时共振，NVDA 更适合放在核心观察位，而不是单纯追高。',
    risks: ['Crowded positioning', 'Earnings gap risk', 'AI capex slowdown'],
    risksZh: ['机构和散户持仓都偏拥挤，追高容易被洗', '财报或指引不及预期时容易跳空', '如果 AI 资本开支降温，估值会受到压力'],
    mentionMinutesAgo: 45,
    mentionText: 'AI infrastructure demand remains the strongest large-cap theme. Watch NVDA pullbacks instead of chasing vertical candles.',
    mentionTextZh: 'AI 基础设施需求仍是大盘成长股里最强的主题，NVDA 更适合等回踩和结构确认，不适合在垂直拉升时无计划追入。',
  },
  {
    ticker: 'AVGO',
    companyName: 'Broadcom',
    sector: 'Technology',
    industry: 'Custom Silicon / Networking',
    kol: 'Serenity-style, Semiconductor KOL',
    stance: 'bullish',
    queue: 'constructive',
    overallScore: 89,
    priorityScore: 89,
    convictionScore: 85,
    marketCapUsd: 1_650_000_000_000,
    mentions24h: 2,
    mentions7d: 11,
    mentions30d: 31,
    news7d: 6,
    filings30d: 1,
    revenueYoyPct: 44.3,
    momentum: 'bullish',
    thesis: 'Custom silicon and networking are where AI capex can translate into durable revenue. AVGO is a quality compounder watchlist name.',
    thesisZh: '定制芯片和网络设备是 AI 资本开支真正落到收入的方向，AVGO 比许多纯题材股更偏高质量复利标的，适合在财报窗口和板块回踩时重点观察。',
    risks: ['Semiconductor beta', 'Valuation compression', 'Customer concentration'],
    risksZh: ['会受到整个半导体板块波动拖累', '估值偏高时容易出现压缩', '大客户订单变化会影响市场预期'],
    mentionMinutesAgo: 95,
    mentionText: 'Custom silicon and networking names are still where AI capex translates into revenue. AVGO remains on the high-quality list.',
    mentionTextZh: 'AI 资本开支落地到收入的方向仍然集中在定制芯片和网络设备，AVGO 继续属于高质量观察名单。',
  },
  {
    ticker: 'AMD',
    companyName: 'Advanced Micro Devices',
    sector: 'Technology',
    industry: 'AI Accelerators / Semiconductors',
    kol: 'AI hardware KOL',
    stance: 'bullish',
    queue: 'watch',
    overallScore: 83,
    priorityScore: 83,
    convictionScore: 75,
    marketCapUsd: 280_000_000_000,
    mentions24h: 3,
    mentions7d: 14,
    mentions30d: 38,
    news7d: 8,
    filings30d: 1,
    revenueYoyPct: 18.2,
    momentum: 'bullish',
    thesis: 'AMD is a second-line AI hardware beneficiary. It can move fast when sentiment rotates away from mega-cap leaders.',
    thesisZh: 'AMD 属于 AI 硬件二线受益标的，当资金从一线龙头扩散时弹性会更强。更适合做趋势确认后的跟随，而不是把它当成确定性最高的核心仓。',
    risks: ['Execution risk', 'Margin pressure', 'Competition with NVIDIA'],
    risksZh: ['AI 加速卡落地速度需要持续验证', '价格竞争可能压缩利润率', '和 NVIDIA 的差距仍会影响估值上限'],
    mentionMinutesAgo: 140,
    mentionText: 'If AI breadth expands, AMD is one of the cleaner second-line expressions. Confirmation matters more than narrative.',
    mentionTextZh: '如果 AI 行情从龙头扩散，AMD 是比较干净的二线表达之一，但需要价格和成交量确认，不能只靠叙事买入。',
  },
  {
    ticker: 'PLTR',
    companyName: 'Palantir',
    sector: 'Technology',
    industry: 'AI Software / Government Data',
    kol: 'Growth stock KOL',
    stance: 'bullish',
    queue: 'caution',
    overallScore: 82,
    priorityScore: 82,
    convictionScore: 70,
    marketCapUsd: 330_000_000_000,
    mentions24h: 4,
    mentions7d: 19,
    mentions30d: 52,
    news7d: 11,
    filings30d: 2,
    revenueYoyPct: 30.1,
    momentum: 'bullish',
    thesis: 'PLTR has strong AI software narrative power and retail attention, but valuation makes entries highly sensitive to market mood.',
    thesisZh: 'PLTR 的 AI 软件叙事和散户关注度都很强，适合作为动量观察标的。但估值较高，入场位置对胜率影响很大，更适合等回踩或突破确认。',
    risks: ['High valuation', 'Retail crowding', 'Sharp multiple compression'],
    risksZh: ['估值容错率低', '散户拥挤度高，容易剧烈洗盘', '市场风险偏好下降时估值压缩会很快'],
    mentionMinutesAgo: 185,
    mentionText: 'PLTR remains a momentum favorite, but the risk is paying any price for the AI label.',
    mentionTextZh: 'PLTR 仍然是动量资金喜欢的 AI 软件标的，但最大风险是为了 AI 标签支付过高价格。',
  },
  {
    ticker: 'TSLA',
    companyName: 'Tesla',
    sector: 'Consumer Discretionary',
    industry: 'EV / Autonomy / Robotics',
    kol: 'Momentum KOL, EV KOL',
    stance: 'neutral',
    queue: 'watch',
    overallScore: 78,
    priorityScore: 78,
    convictionScore: 62,
    marketCapUsd: 900_000_000_000,
    mentions24h: 6,
    mentions7d: 28,
    mentions30d: 80,
    news7d: 18,
    filings30d: 2,
    revenueYoyPct: 3.8,
    momentum: 'neutral',
    thesis: 'TSLA has unmatched narrative reflexivity, but the stock needs a clear catalyst around autonomy, deliveries, or robotics to justify aggressive risk.',
    thesisZh: 'TSLA 的叙事反身性很强，KOL 一喊很容易带动情绪，但现在更需要自动驾驶、交付或机器人方向出现清晰催化，才值得提高仓位级别。',
    risks: ['Headline volatility', 'Delivery pressure', 'Valuation depends on future optionality'],
    risksZh: ['消息面波动非常大', '交付和毛利率压力会影响趋势', '估值依赖未来业务兑现，容错率不高'],
    mentionMinutesAgo: 220,
    mentionText: 'TSLA needs catalyst confirmation. Treat mentions as alert triggers, not a blind long.',
    mentionTextZh: 'TSLA 需要催化确认，KOL 提及更适合作为提醒，而不是无脑做多信号。',
  },
  {
    ticker: 'META',
    companyName: 'Meta Platforms',
    sector: 'Communication Services',
    industry: 'Advertising / AI Infrastructure',
    kol: 'Mega-cap KOL',
    stance: 'bullish',
    queue: 'constructive',
    overallScore: 86,
    priorityScore: 86,
    convictionScore: 80,
    marketCapUsd: 1_700_000_000_000,
    mentions24h: 2,
    mentions7d: 10,
    mentions30d: 34,
    news7d: 9,
    filings30d: 1,
    revenueYoyPct: 21.6,
    momentum: 'bullish',
    thesis: 'META combines advertising cash flow with AI product leverage. It is less explosive than small caps but higher quality.',
    thesisZh: 'META 同时具备广告现金流和 AI 产品杠杆，爆发力不一定最强，但质量和抗风险能力更好，适合作为大盘科技里的稳健观察标的。',
    risks: ['Ad cycle sensitivity', 'AI capex spending pressure', 'Regulatory risk'],
    risksZh: ['广告周期回落会影响收入', 'AI 投入过大会压制利润率预期', '监管风险长期存在'],
    mentionMinutesAgo: 260,
    mentionText: 'META is a cleaner mega-cap AI-advertising compounder. Watch capex commentary and ad growth.',
    mentionTextZh: 'META 是更干净的大盘 AI+广告复利标的，重点看资本开支表态和广告增长质量。',
  },
  {
    ticker: 'MSFT',
    companyName: 'Microsoft',
    sector: 'Technology',
    industry: 'Cloud / AI Software',
    kol: 'Mega-cap KOL',
    stance: 'bullish',
    queue: 'constructive',
    overallScore: 85,
    priorityScore: 85,
    convictionScore: 82,
    marketCapUsd: 3_700_000_000_000,
    mentions24h: 1,
    mentions7d: 8,
    mentions30d: 27,
    news7d: 7,
    filings30d: 2,
    revenueYoyPct: 15.6,
    momentum: 'bullish',
    thesis: 'MSFT is the lower-volatility AI software and cloud exposure. It is more suitable for core watchlists than short-term chase trades.',
    thesisZh: 'MSFT 是波动相对更低的 AI 软件和云计算敞口，更适合作为核心观察名单，而不是短线追涨标的。',
    risks: ['Slower upside beta', 'Cloud growth expectations', 'AI monetization timing'],
    risksZh: ['上涨弹性通常不如高波动标的', '云业务增长预期一旦下修会压制股价', 'AI 变现节奏需要持续验证'],
    mentionMinutesAgo: 300,
    mentionText: 'MSFT is the steady AI compounder. Less exciting, but quality matters when volatility expands.',
    mentionTextZh: 'MSFT 是更稳的 AI 复利标的，不一定最刺激，但在波动放大时质量很重要。',
  },
  {
    ticker: 'AMZN',
    companyName: 'Amazon',
    sector: 'Consumer Discretionary',
    industry: 'Cloud / Ecommerce / Ads',
    kol: 'Cloud KOL',
    stance: 'bullish',
    queue: 'watch',
    overallScore: 81,
    priorityScore: 81,
    convictionScore: 76,
    marketCapUsd: 2_400_000_000_000,
    mentions24h: 1,
    mentions7d: 9,
    mentions30d: 26,
    news7d: 6,
    filings30d: 1,
    revenueYoyPct: 11.2,
    momentum: 'neutral',
    thesis: 'AMZN offers AWS, retail margin expansion, and advertising optionality. The cleaner entry is usually after cloud growth confirmation.',
    thesisZh: 'AMZN 同时有 AWS、零售利润率改善和广告业务弹性。更干净的入场点通常来自云业务增长重新确认，而不是单纯跟随大盘科技上涨。',
    risks: ['AWS growth disappointment', 'Consumer demand softness', 'Margin expectation risk'],
    risksZh: ['AWS 增速不及预期会压制估值', '消费需求变弱会影响零售', '利润率改善预期过高时容易回撤'],
    mentionMinutesAgo: 360,
    mentionText: 'AMZN needs AWS acceleration confirmation. Good watchlist name when cloud sentiment improves.',
    mentionTextZh: 'AMZN 需要 AWS 增长加速确认，当云计算情绪改善时值得放进观察名单。',
  },
  {
    ticker: 'GOOGL',
    companyName: 'Alphabet',
    sector: 'Communication Services',
    industry: 'Search / Cloud / AI',
    kol: 'Mega-cap KOL',
    stance: 'bullish',
    queue: 'watch',
    overallScore: 80,
    priorityScore: 80,
    convictionScore: 74,
    marketCapUsd: 2_250_000_000_000,
    mentions24h: 1,
    mentions7d: 8,
    mentions30d: 24,
    news7d: 8,
    filings30d: 1,
    revenueYoyPct: 12.9,
    momentum: 'neutral',
    thesis: 'GOOGL is a value-plus-AI setup. It needs the market to believe search durability and AI monetization can coexist.',
    thesisZh: 'GOOGL 是“估值不贵 + AI 选择权”的组合，关键在于市场是否相信搜索业务韧性和 AI 变现能够同时成立。',
    risks: ['Search disruption narrative', 'Regulatory overhang', 'Cloud margin pressure'],
    risksZh: ['搜索被 AI 颠覆的叙事会反复扰动', '监管压力长期存在', '云业务利润率仍需改善'],
    mentionMinutesAgo: 410,
    mentionText: 'GOOGL remains a valuation-friendly AI name, but search disruption headlines can cap multiples.',
    mentionTextZh: 'GOOGL 仍是估值相对友好的 AI 标的，但搜索被颠覆的消息会压制估值上限。',
  },
  {
    ticker: 'COIN',
    companyName: 'Coinbase',
    sector: 'Financials',
    industry: 'Crypto Exchange',
    kol: 'Crypto equity KOL',
    stance: 'bullish',
    queue: 'caution',
    overallScore: 79,
    priorityScore: 79,
    convictionScore: 67,
    marketCapUsd: 65_000_000_000,
    mentions24h: 3,
    mentions7d: 15,
    mentions30d: 42,
    news7d: 12,
    filings30d: 2,
    revenueYoyPct: 38.4,
    momentum: 'bullish',
    thesis: 'COIN is a liquid equity proxy for crypto risk appetite. It works best when BTC trend, volume, and regulatory tone align.',
    thesisZh: 'COIN 是美股里比较直接的加密风险偏好代理，最好的环境是 BTC 趋势、交易量和监管语气同时转强。',
    risks: ['BTC beta', 'Regulatory headline risk', 'Fee compression'],
    risksZh: ['和 BTC 波动高度相关', '监管消息会突然改变市场情绪', '长期手续费压缩会影响盈利预期'],
    mentionMinutesAgo: 500,
    mentionText: 'COIN becomes interesting when BTC trend and exchange volumes confirm the same direction.',
    mentionTextZh: '当 BTC 趋势和交易所成交量同时确认时，COIN 才更值得关注。',
  },
  {
    ticker: 'MSTR',
    companyName: 'MicroStrategy',
    sector: 'Technology',
    industry: 'Bitcoin Treasury',
    kol: 'Crypto equity KOL',
    stance: 'neutral',
    queue: 'high_risk',
    overallScore: 74,
    priorityScore: 74,
    convictionScore: 55,
    marketCapUsd: 95_000_000_000,
    mentions24h: 4,
    mentions7d: 18,
    mentions30d: 49,
    news7d: 10,
    filings30d: 3,
    revenueYoyPct: 1.4,
    momentum: 'bullish',
    thesis: 'MSTR is a leveraged BTC narrative vehicle. Mentions can create momentum, but risk control matters more than conviction.',
    thesisZh: 'MSTR 更像带杠杆的 BTC 叙事工具，KOL 提及会放大动量，但它不是普通科技股，仓位和止损比观点本身更重要。',
    risks: ['Leverage to BTC downside', 'Premium compression', 'Financing structure risk'],
    risksZh: ['BTC 下跌时回撤会被放大', '相对 BTC 的溢价可能压缩', '融资结构变化会带来额外风险'],
    mentionMinutesAgo: 540,
    mentionText: 'MSTR can run hard, but it is a risk instrument first. Size it like volatility, not like a normal compounder.',
    mentionTextZh: 'MSTR 可以涨得很猛，但它首先是高波动风险工具，仓位要按波动率管理，不能当普通复利股处理。',
  },
  {
    ticker: 'HIMS',
    companyName: 'Hims & Hers',
    sector: 'Healthcare',
    industry: 'Digital Health',
    kol: 'Growth stock KOL',
    stance: 'neutral',
    queue: 'high_risk',
    overallScore: 72,
    priorityScore: 72,
    convictionScore: 56,
    marketCapUsd: 12_000_000_000,
    mentions24h: 2,
    mentions7d: 12,
    mentions30d: 33,
    news7d: 5,
    filings30d: 1,
    revenueYoyPct: 32.1,
    momentum: 'bullish',
    thesis: 'HIMS has strong retail attention and growth, but headline risk makes it a tactical watch rather than a blind buy.',
    thesisZh: 'HIMS 有较强散户关注度和成长性，但消息面风险较高，更适合作为战术观察标的，而不是看到 KOL 提及就直接买入。',
    risks: ['Regulatory risk', 'High volatility', 'Narrative reversal'],
    risksZh: ['监管和医疗合规风险较高', '波动率大，容易快速回撤', '题材一旦反转会很伤仓位'],
    mentionMinutesAgo: 610,
    mentionText: 'HIMS is interesting, but position sizing matters more than excitement.',
    mentionTextZh: 'HIMS 值得关注，但仓位控制比兴奋感更重要。',
  },
  {
    ticker: 'APP',
    companyName: 'AppLovin',
    sector: 'Technology',
    industry: 'AdTech / AI Advertising',
    kol: 'Growth stock KOL',
    stance: 'bullish',
    queue: 'caution',
    overallScore: 77,
    priorityScore: 77,
    convictionScore: 66,
    marketCapUsd: 125_000_000_000,
    mentions24h: 2,
    mentions7d: 10,
    mentions30d: 25,
    news7d: 5,
    filings30d: 1,
    revenueYoyPct: 36.9,
    momentum: 'bullish',
    thesis: 'APP is a high-beta AI advertising name. It can trend strongly, but entries need discipline because valuation can reset fast.',
    thesisZh: 'APP 是高弹性的 AI 广告标的，趋势强时会很猛，但估值重置也会很快，适合用趋势纪律而不是主观信仰交易。',
    risks: ['High beta', 'Valuation reset risk', 'Ad cycle sensitivity'],
    risksZh: ['高弹性也意味着高回撤', '估值重置风险较高', '广告周期变弱会影响收入预期'],
    mentionMinutesAgo: 690,
    mentionText: 'APP remains one of the higher-beta AI advertising expressions. Respect the chart.',
    mentionTextZh: 'APP 仍是 AI 广告方向里弹性较高的表达之一，但必须尊重走势和止损。',
  },
  {
    ticker: 'CRWD',
    companyName: 'CrowdStrike',
    sector: 'Technology',
    industry: 'Cybersecurity',
    kol: 'Software KOL',
    stance: 'bullish',
    queue: 'watch',
    overallScore: 76,
    priorityScore: 76,
    convictionScore: 69,
    marketCapUsd: 115_000_000_000,
    mentions24h: 1,
    mentions7d: 7,
    mentions30d: 21,
    news7d: 4,
    filings30d: 1,
    revenueYoyPct: 28.5,
    momentum: 'neutral',
    thesis: 'Cybersecurity remains a durable software theme. CRWD is worth tracking when software breadth improves.',
    thesisZh: '网络安全仍是比较长期的企业软件主线。CRWD 适合在软件板块整体宽度改善时放入观察名单。',
    risks: ['Software multiple pressure', 'Execution expectations', 'Sector rotation'],
    risksZh: ['软件股估值整体受利率和风险偏好影响', '市场对执行质量要求高', '资金可能轮动到更高弹性的 AI 硬件'],
    mentionMinutesAgo: 760,
    mentionText: 'CRWD is a quality software watch when cybersecurity breadth improves.',
    mentionTextZh: '当网络安全板块宽度改善时，CRWD 是质量较高的软件观察标的。',
  },
]

const sampleSignals: StockKolSignal[] = sampleDefinitions.map(createSampleSignal)

function createSampleSignal(signal: SampleSignal): StockKolSignal {
  const publishedAt = new Date(Date.now() - signal.mentionMinutesAgo * 60_000).toISOString()

  return {
    ...signal,
    id: signal.ticker,
    lastMentionAt: publishedAt,
    mentions: [
      {
        id: `sample-${signal.ticker.toLowerCase()}-1`,
        author: signal.kol,
        publishedAt,
        text: signal.mentionText,
        textZh: signal.mentionTextZh,
        tickers: [signal.ticker],
      },
    ],
  }
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function asNullableNumber(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function asStringArray(value: unknown, fallback: string[]) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string' && value.trim()) {
    return value
      .split(/[;|，,]/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return fallback
}

function normalizeStance(value: unknown, fallback: StockStance = 'neutral'): StockStance {
  const normalized = String(value ?? '').toLowerCase()
  if (normalized.includes('bull') || normalized.includes('long') || normalized.includes('看多')) return 'bullish'
  if (normalized.includes('bear') || normalized.includes('short') || normalized.includes('看空')) return 'bearish'
  if (['bullish', 'bearish', 'neutral'].includes(normalized)) return normalized as StockStance
  return fallback
}

function normalizeQueue(raw: RawRecord): StockQueue {
  const value = String(raw.queue ?? raw.current_view ?? raw.view ?? '').toLowerCase()
  if (value.includes('high') || value.includes('risk') || value.includes('高风险')) return 'high_risk'
  if (value.includes('caution') || value.includes('谨慎')) return 'caution'
  if (value.includes('constructive') || value.includes('priority') || value.includes('建设')) return 'constructive'
  return 'watch'
}

function fallbackThesisZh(signal: {
  ticker: string
  stance: StockStance
  queue: StockQueue
  mentions24h: number
  mentions7d: number
  overallScore: number
}) {
  const stance = signal.stance === 'bullish' ? '偏多' : signal.stance === 'bearish' ? '偏空' : '中性观察'
  const queue = signal.queue === 'high_risk' ? '高风险名单' : signal.queue === 'caution' ? '谨慎跟踪名单' : signal.queue === 'constructive' ? '优先观察名单' : '观察名单'
  return `${signal.ticker} 当前被归入${queue}，综合观点为${stance}。最近 24 小时提及 ${signal.mentions24h} 次，7 天提及 ${signal.mentions7d} 次，总体评分 ${signal.overallScore.toFixed(1)}。这更适合作为观察和复盘入口，真正交易前仍要结合价格趋势、成交量、财报和止损规则。`
}

function fallbackMentionZh(ticker: string, author: string) {
  return `${author} 最近提到了 ${ticker}。这条信息可作为情报提醒，但需要结合股价位置、成交量、新闻催化和风险控制再决定是否交易。`
}

function fallbackRisksZh(queue: StockQueue) {
  if (queue === 'high_risk') {
    return ['高风险标的，仓位必须更小', 'KOL 喊单可能已经被市场提前交易', '需要明确止损，避免情绪化追涨']
  }
  if (queue === 'caution') {
    return ['估值或波动率偏高，不能追太急', '需要等待价格和成交量确认', '消息面反转会影响短线胜率']
  }
  return ['KOL 观点可能滞后或出错', '需要确认财报、估值和流动性', '不要把提及次数当成单独买入理由']
}

function normalizeMention(raw: unknown, ticker: string, fallbackAuthor: string, index: number): StockKolMention | null {
  if (!raw || typeof raw !== 'object') return null
  const mention = raw as RawRecord
  const author = String(mention.author ?? mention.kol ?? mention.kolName ?? mention.user ?? fallbackAuthor)
  const text = String(mention.text ?? mention.content ?? mention.body ?? '').trim()
  const textZh = String(mention.textZh ?? mention.text_zh ?? mention.translationZh ?? mention.translation_zh ?? '').trim()

  return {
    id: String(mention.id ?? `${ticker}-${index}`),
    author,
    publishedAt: String(mention.publishedAt ?? mention.published_at ?? mention.createdAt ?? mention.created_at ?? new Date().toISOString()),
    text: text || `${author} mentioned ${ticker}.`,
    textZh: textZh || fallbackMentionZh(ticker, author),
    tickers: Array.isArray(mention.tickers) ? mention.tickers.map(String) : [ticker],
    url: typeof mention.url === 'string' ? mention.url : undefined,
  }
}

function normalizeSignal(raw: Partial<StockKolSignal> & RawRecord): StockKolSignal | null {
  const ticker = String(raw.ticker ?? raw.symbol ?? '').trim().toUpperCase()
  if (!ticker) return null

  const stance = normalizeStance(raw.stance ?? raw.direction ?? raw.author_stance)
  const queue = normalizeQueue(raw)
  const overallScore = asNumber(raw.overallScore ?? raw.overall_score ?? raw.totalScore ?? raw.total_score ?? raw.score ?? raw.priorityScore ?? raw.priority_score, 0)
  const priorityScore = asNumber(raw.priorityScore ?? raw.priority_score ?? overallScore, overallScore)
  const mentions24h = asNumber(raw.mentions24h ?? raw.recent_mentions_24h ?? raw.mentions_24h, 0)
  const mentions7d = asNumber(raw.mentions7d ?? raw.recent_mentions_7d ?? raw.mentions_7d, 0)
  const kol = Array.isArray(raw.kolNames)
    ? raw.kolNames.map(String).join(', ')
    : String(raw.kol ?? raw.author ?? raw.author_name ?? 'KOL Feed')

  const risks = asStringArray(raw.risks ?? raw.riskFactors ?? raw.risk_factors, [
    'KOL calls can be late, crowded, or wrong. Confirm with price, volume, filings, and risk limits.',
  ])
  const risksZh = asStringArray(raw.risksZh ?? raw.risks_zh ?? raw.riskFactorsZh ?? raw.risk_factors_zh, fallbackRisksZh(queue))
  const lastMentionAt = String(raw.lastMentionAt ?? raw.author_stance_updated_at ?? raw.last_mention_at ?? new Date().toISOString())
  const mentions = Array.isArray(raw.mentions)
    ? raw.mentions.map((mention, index) => normalizeMention(mention, ticker, kol, index)).filter(Boolean) as StockKolMention[]
    : []

  if (!mentions.length) {
    mentions.push({
      id: `${ticker}-summary`,
      author: kol,
      publishedAt: lastMentionAt,
      text: String(raw.latestMention ?? raw.latest_mention ?? `${kol} mentioned ${ticker}.`),
      textZh: String(raw.latestMentionZh ?? raw.latest_mention_zh ?? fallbackMentionZh(ticker, kol)),
      tickers: [ticker],
      url: typeof raw.url === 'string' ? raw.url : undefined,
    })
  }

  const normalized = {
    ticker,
    stance,
    queue,
    overallScore,
    priorityScore,
    mentions24h,
    mentions7d,
  }

  return {
    id: String(raw.id ?? ticker),
    ticker,
    companyName: String(raw.companyName ?? raw.company_name ?? raw.name ?? ticker),
    sector: String(raw.sector ?? 'US Equities'),
    industry: String(raw.industry ?? raw.industry_id ?? 'Unclassified'),
    kol,
    stance,
    queue,
    overallScore,
    priorityScore,
    convictionScore: asNumber(raw.convictionScore ?? raw.conviction_score ?? raw.confidence ?? overallScore, overallScore),
    marketCapUsd: asNullableNumber(raw.marketCapUsd ?? raw.market_cap_usd ?? raw.marketCap ?? raw.market_cap ?? raw.mktCap ?? raw.mkt_cap),
    mentions24h,
    mentions7d,
    mentions30d: asNumber(raw.mentions30d ?? raw.recent_mentions_30d ?? raw.mentions_30d, 0),
    news7d: asNumber(raw.news7d ?? raw.recent_stock_news_7d ?? raw.news_7d, 0),
    filings30d: asNumber(raw.filings30d ?? raw.recent_sec_filings_30d ?? raw.filings_30d, 0),
    revenueYoyPct: asNullableNumber(raw.revenueYoyPct ?? raw.revenue_yoy_pct ?? raw.revenueGrowthYoy),
    momentum: normalizeStance(raw.momentum ?? raw.momentum_direction, 'neutral'),
    lastMentionAt,
    thesis: String(raw.thesis ?? raw.tradeLogic ?? raw.trade_logic ?? 'KOL attention detected. Use this as a watchlist signal, not as standalone investment advice.'),
    thesisZh: String(raw.thesisZh ?? raw.thesis_zh ?? raw.tradeLogicZh ?? raw.trade_logic_zh ?? fallbackThesisZh(normalized)),
    risks,
    risksZh,
    mentions,
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

async function fetchYahooMarketCaps(tickers: string[]) {
  if (!tickers.length || process.env.DISABLE_STOCK_MARKET_CAP === '1') return new Map<string, number>()

  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(tickers.join(','))}`
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  })
  if (!response.ok) return new Map<string, number>()

  const payload = await response.json()
  const results = payload?.quoteResponse?.result
  if (!Array.isArray(results)) return new Map<string, number>()

  return new Map<string, number>(
    results
      .map((item: RawRecord) => [String(item.symbol ?? '').toUpperCase(), asNullableNumber(item.marketCap)] as const)
      .filter((entry): entry is readonly [string, number] => Boolean(entry[0]) && typeof entry[1] === 'number')
  )
}

async function enrichMarketCaps(signals: StockKolSignal[]) {
  const missingTickers = signals
    .filter((signal) => !signal.marketCapUsd)
    .map((signal) => signal.ticker)

  const marketCaps = await fetchYahooMarketCaps(Array.from(new Set(missingTickers))).catch(() => new Map<string, number>())
  if (!marketCaps.size) return signals

  return signals.map((signal) => ({
    ...signal,
    marketCapUsd: signal.marketCapUsd ?? marketCaps.get(signal.ticker) ?? null,
  }))
}

function sortSignals(signals: StockKolSignal[]) {
  return signals.sort((a, b) => b.overallScore - a.overallScore)
}

export async function getStockKolFeed(): Promise<StockKolFeed> {
  const remoteSignals = await readRemoteFeed().catch(() => null)
  if (remoteSignals?.length) {
    return {
      generatedAt: new Date().toISOString(),
      sourceLabel: process.env.KOL_STOCK_RANKING_URL ?? 'Remote KOL feed',
      sourceStatus: 'live',
      signals: sortSignals(await enrichMarketCaps(remoteSignals)),
    }
  }

  const localSignals = await readLocalFeed()
  if (localSignals?.length) {
    return {
      generatedAt: new Date().toISOString(),
      sourceLabel: 'data/stock-kol-signals.json',
      sourceStatus: 'local',
      signals: sortSignals(await enrichMarketCaps(localSignals)),
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    sourceLabel: 'Sample Serenity-style schema',
    sourceStatus: 'sample',
    signals: sortSignals(sampleSignals),
  }
}
