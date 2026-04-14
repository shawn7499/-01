export interface NewsArticle {
  id: string
  title: string
  link: string
  description: string
  published: string
  source: string
  category: string
}

export interface NewsSignal extends NewsArticle {
  score: number
  opportunityLevel: 'high' | 'medium' | 'low'
  direction: 'bullish' | 'bearish' | 'watch'
  triggerType: string
  thesis: string
  actionPlan: string
  execution: string[]
  risks: string[]
  detectedAssets: string[]
  timeWindow: 'immediate' | 'same_day' | 'swing' | 'research'
}

type TriggerRule = {
  name: string
  direction: NewsSignal['direction']
  scoreDelta: number
  timeWindow: NewsSignal['timeWindow']
  thesis: string
  actionPlan: string
  execution: string[]
  risks: string[]
  keywords: string[]
}

const SOURCE_BONUS: Record<string, number> = {
  Odaily: 6,
  BlockBeats: 8,
}

const TRIGGER_RULES: TriggerRule[] = [
  {
    name: 'Exchange Listing',
    direction: 'bullish',
    scoreDelta: 28,
    timeWindow: 'same_day',
    thesis: '上所或新增交易对通常会带来短线流动性和情绪强化，适合优先观察是否有放量确认。',
    actionPlan: '只在现货或低杠杆场景里跟踪强势标的，等待成交量和价格同步放大后再考虑参与。',
    execution: [
      '先确认消息来自交易所或项目官方，而不是二手转述。',
      '观察消息发布后 15 到 30 分钟的成交量和盘口承接，避免第一根情绪拉升直接追入。',
      '若是小市值代币，把单笔风险控制在总资金的 0.5% 到 1% 以内。',
    ],
    risks: [
      '消息往往在媒体发出前已经被部分资金提前交易。',
      '小币种容易出现插针和流动性不足。',
    ],
    keywords: ['listing', 'listed', 'launchpool', 'open trading', '上线', '上币', '交易对', '开盘'],
  },
  {
    name: 'Funding Or Partnership',
    direction: 'bullish',
    scoreDelta: 18,
    timeWindow: 'swing',
    thesis: '融资、合作或生态整合更偏中短线叙事增强，通常不是秒级买点，但会提高关注度。',
    actionPlan: '把它当作加入观察列表的理由，而不是马上梭哈的理由，优先看龙头和高流动性标的。',
    execution: [
      '把相关项目或生态加入自选列表，观察接下来 24 小时是否有二次传播。',
      '优先找流动性更好的主标的或生态龙头，不追同名小币。',
      '等回踩或二次确认后再做轻仓参与。',
    ],
    risks: [
      '很多融资或合作消息对价格影响并不持续。',
      '容易被“重大合作”标题诱导，实际落地节奏偏慢。',
    ],
    keywords: ['funding', 'raised', 'investment', 'partnership', 'collaboration', '融资', '合作', '战略合作', '投资'],
  },
  {
    name: 'Airdrop Or Incentives',
    direction: 'watch',
    scoreDelta: 14,
    timeWindow: 'research',
    thesis: '空投、积分和激励更适合做任务或埋伏，不适合用追涨来表达。',
    actionPlan: '优先研究是否值得交互、质押或提供流动性，不把它当成即时买入信号。',
    execution: [
      '检查项目官方入口、交互成本和女巫过滤要求。',
      '评估参与成本与预期回报，避免被高 gas 或高磨损成本吃掉收益。',
      '如果必须买币参与，只做最小试仓。',
    ],
    risks: [
      '空投预期常常无法兑现。',
      '交互成本和时间成本可能高于最终收益。',
    ],
    keywords: ['airdrop', 'points', 'reward', 'incentive', '空投', '积分', '激励', '任务'],
  },
  {
    name: 'ETF Or Macro Tailwind',
    direction: 'bullish',
    scoreDelta: 24,
    timeWindow: 'swing',
    thesis: 'ETF、政策放松或宏观利好更适合做大币和核心赛道，不适合追逐末端山寨。',
    actionPlan: '优先考虑 BTC、ETH 或强关联生态龙头，避免把宏观利好误解为所有小币一起暴涨。',
    execution: [
      '确认消息对哪类资产最直接受益。',
      '优先看 BTC、ETH、SOL、BNB 等高流动性标的的量价反馈。',
      '把交易计划拆成分批入场和分批止盈。',
    ],
    risks: [
      '宏观利好经常在预期里提前反映。',
      '如果消息表述模糊，市场可能很快回吐。',
    ],
    keywords: ['etf', 'approval', 'approved', 'fed', 'rate cut', '降息', '获批', '通过', '宏观'],
  },
  {
    name: 'Narrative Meme Catalyst',
    direction: 'watch',
    scoreDelta: 12,
    timeWindow: 'immediate',
    thesis: '名人发言、梗图或书名叙事更像超短线情绪交易，只适合极小仓位和极快执行。',
    actionPlan: '默认只做提醒，不建议产品里把这类消息包装成确定性买点。',
    execution: [
      '如果要参与，只看流动性最好、成交最真实的候选代币。',
      '确认合约是否可卖、持仓是否过于集中，再决定是否试仓。',
      '把预期持有周期控制在日内或极短波段。',
    ],
    risks: [
      '极容易被同名假币、貔貅盘和夹子吃掉。',
      '情绪退潮速度通常比上涨更快。',
    ],
    keywords: ['cz', 'meme', 'book', 'binance life', '币安人生', '梗', '叙事', '喊单'],
  },
  {
    name: 'Hack Or Exploit',
    direction: 'bearish',
    scoreDelta: 30,
    timeWindow: 'immediate',
    thesis: '黑客、盗币或漏洞消息优先考虑风险回避，而不是抄底幻想。',
    actionPlan: '对相关代币和生态保持回避，直到官方给出明确修复、赔付或恢复方案。',
    execution: [
      '第一时间确认受影响的是协议、桥、交易所还是单个合约。',
      '如果持仓相关资产，先评估是否需要降风险而不是补仓。',
      '等待官方事后复盘和链上资金流向更明朗后再重建观点。',
    ],
    risks: [
      '二次爆雷和流动性抽离很常见。',
      '抄底判断错误时，损失可能快速扩大。',
    ],
    keywords: ['hack', 'exploit', 'stolen', 'drain', '漏洞', '攻击', '被盗', '利用漏洞'],
  },
  {
    name: 'Unlock Or Sell Pressure',
    direction: 'bearish',
    scoreDelta: 22,
    timeWindow: 'same_day',
    thesis: '大额解锁、清算或抛压消息通常偏利空，适合降低预期和等待波动释放。',
    actionPlan: '避免在抛压窗口抢反弹，等解锁兑现后再重新评估风险收益比。',
    execution: [
      '查看解锁规模占流通市值比例。',
      '只在流动性好的市场做对冲或观望，不在小币里赌瞬间反转。',
      '如果没有成熟风控，最好的动作通常是等待。',
    ],
    risks: [
      '有些利空会被提前交易，但时间点不容易猜。',
      '反弹常常是流动性驱动，不代表风险解除。',
    ],
    keywords: ['unlock', 'liquidation', 'sell-off', 'token unlock', '解锁', '清算', '抛压'],
  },
]

const ASSET_KEYWORDS = [
  { label: 'BTC', keywords: ['btc', 'bitcoin', '比特币'] },
  { label: 'ETH', keywords: ['eth', 'ethereum', '以太坊'] },
  { label: 'SOL', keywords: ['sol', 'solana'] },
  { label: 'BNB', keywords: ['bnb', 'binance', '币安', 'bnb chain'] },
  { label: 'DeFi', keywords: ['defi', 'dex', 'amm', '借贷', '质押'] },
  { label: 'Meme', keywords: ['meme', 'memecoin', 'meme coin', '梗', '土狗'] },
  { label: 'Airdrop', keywords: ['airdrop', '积分', '空投'] },
]

function normalizeText(article: NewsArticle) {
  return `${article.title} ${article.description}`.toLowerCase()
}

function detectAssets(text: string) {
  const detected = new Set<string>()

  for (const asset of ASSET_KEYWORDS) {
    if (asset.keywords.some((keyword) => text.includes(keyword))) {
      detected.add(asset.label)
    }
  }

  const tickerMatches = text.match(/\$[a-z0-9]{2,10}/g) ?? []
  tickerMatches.forEach((match) => detected.add(match.toUpperCase()))

  return Array.from(detected).slice(0, 5)
}

function getMatchedRule(text: string): TriggerRule | null {
  let selected: TriggerRule | null = null

  for (const rule of TRIGGER_RULES) {
    const matchedCount = rule.keywords.filter((keyword) => text.includes(keyword)).length
    if (!matchedCount) {
      continue
    }

    if (!selected || rule.scoreDelta > selected.scoreDelta) {
      selected = rule
    }
  }

  return selected
}

function getRecencyBonus(published: string) {
  const diffMs = Date.now() - new Date(published).getTime()
  const hours = diffMs / 1000 / 60 / 60

  if (hours <= 1) return 12
  if (hours <= 4) return 8
  if (hours <= 12) return 4
  return 0
}

function getOpportunityLevel(score: number): NewsSignal['opportunityLevel'] {
  if (score >= 75) return 'high'
  if (score >= 55) return 'medium'
  return 'low'
}

function fallbackSignal(article: NewsArticle): NewsSignal {
  const text = normalizeText(article)
  const detectedAssets = detectAssets(text)
  const score = 38 + (SOURCE_BONUS[article.source] ?? 0) + getRecencyBonus(article.published)

  return {
    ...article,
    score: Math.min(score, 52),
    opportunityLevel: 'low',
    direction: 'watch',
    triggerType: 'Context Update',
    thesis: '这条新闻更适合放进观察列表，目前缺少足够强的价格催化或明确执行路径。',
    actionPlan: '把它作为情报输入，等待官方确认、二次传播或链上数据配合后再判断。',
    execution: [
      '先确认消息原始出处与发布时间。',
      '观察相关标的是否出现同步成交量提升。',
      '没有明确优势时，不急于建仓。',
    ],
    risks: [
      '媒体转述类新闻经常缺少足够的交易边。',
      '模糊消息很容易让人追在情绪末端。',
    ],
    detectedAssets,
    timeWindow: 'research',
  }
}

export function analyzeArticle(article: NewsArticle): NewsSignal {
  const text = normalizeText(article)
  const detectedAssets = detectAssets(text)
  const matchedRule = getMatchedRule(text)

  if (!matchedRule) {
    return fallbackSignal(article)
  }

  const baseScore = matchedRule.direction === 'bearish' ? 64 : 52
  const score = Math.max(
    25,
    Math.min(95, baseScore + matchedRule.scoreDelta + (SOURCE_BONUS[article.source] ?? 0) + getRecencyBonus(article.published))
  )

  return {
    ...article,
    score,
    opportunityLevel: getOpportunityLevel(score),
    direction: matchedRule.direction,
    triggerType: matchedRule.name,
    thesis: matchedRule.thesis,
    actionPlan: matchedRule.actionPlan,
    execution: matchedRule.execution,
    risks: matchedRule.risks,
    detectedAssets,
    timeWindow: matchedRule.timeWindow,
  }
}

export function analyzeArticles(articles: NewsArticle[]) {
  return articles
    .map(analyzeArticle)
    .sort((a, b) => {
      const directionWeight = (signal: NewsSignal) => {
        if (signal.direction === 'bullish') return 2
        if (signal.direction === 'watch') return 1
        return 0
      }

      return b.score - a.score || directionWeight(b) - directionWeight(a)
    })
}
