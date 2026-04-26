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
    name: '交易所与流动性事件',
    direction: 'bullish',
    scoreDelta: 28,
    timeWindow: 'same_day',
    thesis: '上所、新增交易对、Launchpool 或交易所生态事件通常会带来短线流动性和情绪增量，适合优先观察是否有成交量确认。',
    actionPlan: '先确认消息来源，再观察 15 到 30 分钟的价格、成交量和盘口承接。只有量价同步放大时，才考虑小仓位参与。',
    execution: [
      '确认公告是否来自交易所、项目方或可信媒体，不用二手标题直接交易。',
      '优先看高流动性标的，避开同名小盘币和假盘。',
      '如果已经大幅拉升，等待回踩或二次确认，不追第一根情绪线。',
    ],
    risks: [
      '上所消息经常被提前交易，媒体报道时可能已经完成第一段拉升。',
      '小盘标的容易出现滑点、插针和流动性抽离。',
    ],
    keywords: [
      'listing',
      'listed',
      'launchpool',
      'launchpad',
      'open trading',
      '上线',
      '上币',
      '交易对',
      '开放交易',
    ],
  },
  {
    name: '链上资金与巨鲸行为',
    direction: 'watch',
    scoreDelta: 18,
    timeWindow: 'same_day',
    thesis: '大额提现、充值、巨鲸持仓和链上地址行为能反映资金关注方向，但需要结合价格、成交量和资金费率判断，不适合作为单独买点。',
    actionPlan: '把它当作资金流线索，先观察相关标的是否出现持续买盘、价格承接和二次传播。',
    execution: [
      '区分是从交易所提币、转入交易所，还是链上地址内部转移。',
      '如果是提币到自托管地址，偏向观察潜在持有意愿；如果是转入交易所，偏向观察潜在卖压。',
      '等待价格结构和成交量确认，不用单一地址行为直接开仓。',
    ],
    risks: [
      '链上地址意图很难完全确认，单次转账可能只是调仓或托管迁移。',
      '大户行为被媒体报道后，市场可能已经完成第一段反应。',
    ],
    keywords: ['whale', 'onchain', 'address', 'wallet', 'deposit', 'withdraw', '持仓', '地址', '巨鲸', '链上', '提取', '提现', '充值', '转入', '转出'],
  },
  {
    name: '融资与合作事件',
    direction: 'bullish',
    scoreDelta: 18,
    timeWindow: 'swing',
    thesis: '融资、战略合作和生态整合更偏中短线叙事增强，通常不是秒级买点，但会提高项目关注度。',
    actionPlan: '把它加入观察列表，优先跟踪二次传播、生态龙头和高流动性标的，不把标题本身当成立刻开仓理由。',
    execution: [
      '确认融资规模、领投机构和合作对象是否真实重要。',
      '观察接下来 24 小时是否出现二次传播和成交量持续放大。',
      '等待回踩或结构确认后再考虑轻仓参与。',
    ],
    risks: [
      '很多融资和合作新闻对价格影响不持续。',
      '如果缺少产品落地，短线热度可能很快衰减。',
    ],
    keywords: ['funding', 'raised', 'investment', 'partnership', 'collaboration', '融资', '合作', '战略合作', '投资', '领投'],
  },
  {
    name: '空投与激励机会',
    direction: 'watch',
    scoreDelta: 16,
    timeWindow: 'research',
    thesis: '空投、积分和激励更适合做任务或埋伏，不适合直接理解成追涨买入信号。',
    actionPlan: '优先研究参与成本、交互门槛和潜在收益。如果需要买币参与，只用很小仓位测试。',
    execution: [
      '查看官方入口、交互成本、资格规则和截止时间。',
      '估算 gas、手续费、质押成本和时间成本。',
      '记录任务路径，避免重复交互和无效交互。',
    ],
    risks: [
      '空投预期可能无法兑现，积分价值也可能被稀释。',
      '交互成本可能高于最终收益。',
    ],
    keywords: ['airdrop', 'points', 'reward', 'incentive', 'campaign', '空投', '积分', '激励', '任务', '奖励'],
  },
  {
    name: '宏观与 ETF 资金线',
    direction: 'bullish',
    scoreDelta: 22,
    timeWindow: 'swing',
    thesis: 'ETF、降息预期、机构资金和宏观流动性消息更适合映射到 BTC、ETH 和主流生态资产，而不是直接追小盘山寨。',
    actionPlan: '优先观察 BTC、ETH、SOL、BNB 等高流动性资产的量价反馈，再判断是否扩散到生态标的。',
    execution: [
      '区分消息是直接影响加密资产，还是只是宏观背景。',
      '看 BTC 和 ETH 是否先给出方向确认。',
      '如果扩散到山寨，优先选择生态龙头，不追末端小币。',
    ],
    risks: [
      '宏观利好常常会提前反映，落地后反而容易震荡。',
      '如果资金没有持续流入，标题利好很快会被市场消化。',
    ],
    keywords: ['etf', 'approval', 'approved', 'fed', 'rate cut', '降息', '获批', '通过', '机构', '资金流入', '宏观'],
  },
  {
    name: '名人叙事与 Meme 催化',
    direction: 'watch',
    scoreDelta: 20,
    timeWindow: 'immediate',
    thesis: 'CZ、Elon、Binance、X、书名、梗图和热点词相关消息容易触发短线 meme 叙事，但波动和假盘风险也最高。',
    actionPlan: '默认做提醒和观察，不把它包装成确定性买点。若参与，只看流动性最好、传播最强、风险标签较少的候选。',
    execution: [
      '先确认原始消息和发布时间，避免被旧消息二次炒作误导。',
      '同名币只看成交量、流动性、持仓集中度更好的候选。',
      '把持有周期控制在日内或极短线，预设 sell the news 风险。',
    ],
    risks: [
      '同名假币、貔貅盘、撤池和夹子风险都很高。',
      '情绪退潮通常比上涨更快，后排进场很容易接盘。',
    ],
    keywords: ['cz', 'elon', 'musk', 'xchat', 'meme', 'memecoin', 'book', 'binance life', '币安人生', '梗', '叙事', '喊单', '马斯克'],
  },
  {
    name: '安全事故与攻击风险',
    direction: 'bearish',
    scoreDelta: 32,
    timeWindow: 'immediate',
    thesis: '黑客、漏洞、被盗、攻击和资金异常流出消息应优先按风险事件处理，而不是急着抄底。',
    actionPlan: '对相关项目、链和生态保持回避，等官方给出修复、补偿或完整复盘后再重建观点。',
    execution: [
      '确认受影响对象是协议、跨链桥、交易所、钱包还是单个合约。',
      '如果持有相关资产，先评估是否需要降风险。',
      '等待官方复盘、链上资金流向和交易所处理结果。',
    ],
    risks: [
      '安全事件常有二次影响，第一条新闻通常信息不完整。',
      '抄底判断错误时，亏损可能快速扩大。',
    ],
    keywords: ['hack', 'exploit', 'stolen', 'drain', 'attack', '漏洞', '攻击', '被盗', '盗币', '异常流出', '利用漏洞'],
  },
  {
    name: '解锁与抛压',
    direction: 'bearish',
    scoreDelta: 24,
    timeWindow: 'same_day',
    thesis: '大额解锁、清算、抛压和做市转移通常会提高短线波动和下行风险，适合降低预期而不是急着抢反弹。',
    actionPlan: '先看解锁规模占流通市值比例，再决定是回避、对冲还是等待波动释放。',
    execution: [
      '检查解锁规模、接收地址和历史卖压行为。',
      '只在流动性足够好的市场里考虑对冲或观察。',
      '没有成熟风控时，最好的动作通常是等待。',
    ],
    risks: [
      '部分利空会被提前交易，时间点不容易判断。',
      '短线反弹不代表风险解除。',
    ],
    keywords: ['unlock', 'liquidation', 'sell-off', 'token unlock', '解锁', '强平', '抛压', '巨鲸转入', '转入交易所'],
  },
  {
    name: '监管与政策风险',
    direction: 'bearish',
    scoreDelta: 20,
    timeWindow: 'same_day',
    thesis: '监管执法、诉讼、禁令和政策收紧会影响市场风险偏好，尤其会压制相关交易所、稳定币、隐私币或项目代币。',
    actionPlan: '先判断监管对象和影响范围，再降低相关标的预期。没有明确受益资产时，不把监管新闻硬解释成机会。',
    execution: [
      '确认消息来自官方文件、法院信息还是媒体转述。',
      '区分是行业级风险，还是单个项目风险。',
      '观察 BTC 和 ETH 是否出现同步风险偏好变化。',
    ],
    risks: [
      '监管新闻标题容易夸大，必须看影响对象和执行时间。',
      '市场可能先恐慌后修复，追空也有被反抽风险。',
    ],
    keywords: ['sec', 'cftc', 'lawsuit', 'ban', 'regulation', '监管', '起诉', '执法', '禁令', '罚款', '合规'],
  },
]

const ASSET_KEYWORDS = [
  { label: 'BTC', keywords: ['btc', 'bitcoin', '比特币'] },
  { label: 'ETH', keywords: ['eth', 'ethereum', '以太坊'] },
  { label: 'SOL', keywords: ['sol', 'solana'] },
  { label: 'BNB', keywords: ['bnb', 'binance', '币安', 'bnb chain'] },
  { label: 'XRP', keywords: ['xrp', 'ripple'] },
  { label: 'DOGE', keywords: ['doge', 'dogecoin', '狗狗币'] },
  { label: 'SUI', keywords: ['sui'] },
  { label: 'TON', keywords: ['ton', 'telegram'] },
  { label: 'DeFi', keywords: ['defi', 'dex', 'amm', '借贷', '质押'] },
  { label: 'Meme', keywords: ['meme', 'memecoin', 'meme coin', '梗', '土狗'] },
  { label: 'Airdrop', keywords: ['airdrop', '积分', '空投'] },
]

const CRYPTO_RELEVANCE_KEYWORDS = [
  'crypto',
  'cryptocurrency',
  'token',
  'blockchain',
  'web3',
  'bitcoin',
  'ethereum',
  'solana',
  'binance',
  'bnb',
  'btc',
  'eth',
  'sol',
  'defi',
  'airdrop',
  'meme',
  'nft',
  '稳定币',
  '代币',
  '加密',
  '区块链',
  '比特币',
  '以太坊',
  '公链',
  '交易所',
  '空投',
  '链上',
]

function normalizeText(article: NewsArticle) {
  return `${article.title} ${article.description}`.toLowerCase()
}

function detectAssets(text: string) {
  const detected = new Set<string>()

  for (const asset of ASSET_KEYWORDS) {
    if (asset.keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      detected.add(asset.label)
    }
  }

  const tickerMatches = text.match(/\$[a-z0-9]{2,12}/g) ?? []
  tickerMatches.forEach((match) => detected.add(match.toUpperCase()))

  return Array.from(detected).slice(0, 8)
}

function isCryptoRelevant(text: string) {
  return CRYPTO_RELEVANCE_KEYWORDS.some((keyword) => text.includes(keyword.toLowerCase()))
}

function getMatchedRule(text: string): TriggerRule | null {
  let selected: TriggerRule | null = null
  let selectedMatchCount = 0

  for (const rule of TRIGGER_RULES) {
    const matchedCount = rule.keywords.filter((keyword) => text.includes(keyword.toLowerCase())).length
    if (!matchedCount) {
      continue
    }

    if (!selected || matchedCount > selectedMatchCount || rule.scoreDelta > selected.scoreDelta) {
      selected = rule
      selectedMatchCount = matchedCount
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
  if (hours <= 24) return 2
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
  const score = Math.min(52, 34 + (SOURCE_BONUS[article.source] ?? 0) + getRecencyBonus(article.published))

  return {
    ...article,
    score,
    opportunityLevel: 'low',
    direction: 'watch',
    triggerType: '背景情报',
    thesis: '这条消息更适合作为背景输入，目前缺少足够强的交易催化或明确执行路径。',
    actionPlan: '先放入观察列表，等待官方确认、二次传播或链上数据配合后再判断。',
    execution: [
      '确认消息来源、发布时间和是否为重复转述。',
      '观察相关标的是否出现成交量、价格或 OI 的同步变化。',
      '没有清晰边际优势时，不急于建仓。',
    ],
    risks: [
      '媒体转述类消息经常缺少足够交易边际。',
      '模糊消息容易让人追在情绪末端。',
    ],
    detectedAssets,
    timeWindow: 'research',
  }
}

export function analyzeArticle(article: NewsArticle): NewsSignal {
  const text = normalizeText(article)
  const detectedAssets = detectAssets(text)
  const matchedRule = getMatchedRule(text)
  const cryptoRelevant = isCryptoRelevant(text) || detectedAssets.length > 0

  if (!matchedRule) {
    return fallbackSignal(article)
  }

  if (!cryptoRelevant) {
    return {
      ...fallbackSignal(article),
      triggerType: '宏观背景',
      thesis: '这条消息更像宏观背景，目前缺少直接映射到加密资产的清晰路径。',
      actionPlan: '把它作为风险偏好参考，等它传导到 BTC、ETH 或主流生态后再跟进。',
      risks: [
        '宏观消息很容易被过度解释成所有币种的买点。',
        '如果没有资金流和价格确认，贸然交易性价比很低。',
      ],
    }
  }

  const baseScore = matchedRule.direction === 'bearish' ? 58 : matchedRule.direction === 'bullish' ? 48 : 42
  const assetBonus = Math.min(detectedAssets.length * 3, 9)
  const score = Math.max(
    25,
    Math.min(
      95,
      baseScore +
        matchedRule.scoreDelta +
        (SOURCE_BONUS[article.source] ?? 0) +
        getRecencyBonus(article.published) +
        assetBonus
    )
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
        if (signal.direction === 'bearish') return 3
        if (signal.direction === 'bullish') return 2
        return 1
      }

      return b.score - a.score || directionWeight(b) - directionWeight(a)
    })
}
