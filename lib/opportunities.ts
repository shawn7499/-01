export interface Opportunity {
  id: string
  title: string
  titleZh: string
  category: 'token_launch' | 'airdrop' | 'trading_strategy' | 'defi' | 'nft'
  status: 'active' | 'ending_soon' | 'expired'
  startDate: string
  endDate?: string
  description: string
  descriptionZh: string
  source: string
  sourceZh: string
  riskLevel: 'low' | 'medium' | 'high'
  potentialReturn?: string
  potentialReturnZh?: string
  participationMethod: string
  participationMethodZh: string
  actualReturn?: string
  links?: {
    official?: string
    twitter?: string
    telegram?: string
    docs?: string
  }
  tags: string[]
  tagsZh: string[]
}

export const opportunities: Opportunity[] = [
  {
    id: 'xchat-launch-watch-2026-04-17',
    title: 'XChat Launch Watch',
    titleZh: 'XChat 上线题材观察',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-15',
    endDate: '2026-04-17T00:00:00+08:00',
    description:
      'Apple App Store listed XChat from X Corp. for April 17, 2026. XChat-themed meme tokens on Solana and BNB Chain may attract short-term attention before launch.',
    descriptionZh:
      'Apple App Store 显示 X Corp. 的 XChat 预计于 2026 年 4 月 17 日上线。上线前，Solana 和 BNB Chain 上的 XChat 题材 meme 代币可能吸引短线关注。',
    source: 'Apple App Store / X Corp.',
    sourceZh: 'Apple App Store / X Corp.',
    riskLevel: 'high',
    potentialReturn: 'Event-driven, short term only',
    potentialReturnZh: '事件驱动，偏短线',
    participationMethod:
      'Watch liquidity, volume, and slippage first. Focus on the most liquid XChat-themed token, size small, and avoid chasing a vertical move.',
    participationMethodZh:
      '先看流动性、成交量和滑点，只关注流动性最强的 XChat 题材代币，用小仓位观察，避免在直线拉升后追高。',
    links: {
      official: 'https://apps.apple.com/us/app/xchat/id6760873038',
    },
    tags: ['XChat', 'Event Trade', 'Meme', 'Solana', 'BNB Chain'],
    tagsZh: ['XChat', '事件交易', 'Meme', 'Solana', 'BNB Chain'],
  },
  {
    id: 'spacex-ipo-bitget-2026-04',
    title: 'SpaceX Stock Listing on Bitget',
    titleZh: 'Bitget 上的 SpaceX 股票入口',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-14',
    description:
      'Bitget opened a blockchain-based route for users who want exposure to SpaceX before a traditional public listing.',
    descriptionZh:
      'Bitget 打开了一条链上入口，让希望在传统上市前获得 SpaceX 相关敞口的用户可以先行参与。',
    source: 'Bitget Official',
    sourceZh: 'Bitget 官方',
    riskLevel: 'high',
    potentialReturn: 'High if narrative keeps expanding',
    potentialReturnZh: '如果叙事继续发酵，空间可能较大',
    participationMethod:
      'Monitor liquidity, spreads, and premium changes before treating it as a clean proxy.',
    participationMethodZh:
      '重点观察流动性、买卖价差和溢价变化，不要把它直接当成完全等价的官方敞口。',
    links: {
      official: 'https://www.bitget.art/zh-CN/support/articles/12560603882368',
    },
    tags: ['Stock', 'SpaceX', 'IPO', 'Bitget', 'RWA'],
    tagsZh: ['股票', 'SpaceX', 'IPO', 'Bitget', 'RWA'],
  },
  {
    id: 'arc-network-2026-04',
    title: 'Arc Network Token Watch',
    titleZh: 'Arc Network 发币预期',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-14',
    description:
      'Circle founder confirmed Arc Network plans to launch a token, but the exact structure and distribution details are still pending.',
    descriptionZh:
      'Circle 创始人确认 Arc Network 计划发币，但具体结构和分发细节仍未完全落地。',
    source: 'Circle Founder',
    sourceZh: 'Circle 创始人',
    riskLevel: 'medium',
    potentialReturn: 'Details pending',
    potentialReturnZh: '细节待定',
    participationMethod:
      'Track official updates and avoid pricing in unconfirmed allocation assumptions too early.',
    participationMethodZh:
      '持续跟踪官方信息，不要过早把未经确认的分配预期直接计入价格。',
    links: {},
    tags: ['Token Launch', 'Circle', 'Layer 2'],
    tagsZh: ['发币', 'Circle', 'Layer 2'],
  },
  {
    id: 'eth-whale-strategy-2026-04',
    title: 'ETH Whale Mean-Reversion Strategy',
    titleZh: 'ETH 鲸鱼均值回归策略',
    category: 'trading_strategy',
    status: 'active',
    startDate: '2026-04-14',
    description:
      'Backtested setup: buy ETH into sharp 4H dips and reduce into 4H pumps with controlled leverage and strict risk rules.',
    descriptionZh:
      '回测思路是在 4 小时级别里逢大跌分批买入 ETH，逢大涨逐步减仓，同时控制杠杆并严格执行风控。',
    source: 'Whale Trader Strategy',
    sourceZh: '鲸鱼交易策略',
    riskLevel: 'high',
    potentialReturn: '+15.64% in backtest',
    potentialReturnZh: '回测收益 +15.64%',
    participationMethod:
      'Use futures only with clear leverage limits, fixed sizing, and stop-loss rules.',
    participationMethodZh:
      '若要参与，只适合在明确杠杆上限、固定仓位和止损规则下进行。',
    actualReturn: '+15.64% over 167 backtested days',
    links: {},
    tags: ['Trading', 'ETH', 'Futures', 'Mean Reversion'],
    tagsZh: ['交易', 'ETH', '合约', '均值回归'],
  },
]

export function getOpportunityStatus(
  opportunity: Opportunity,
  now: Date = new Date()
): Opportunity['status'] {
  if (opportunity.id === 'xchat-launch-watch-2026-04-17' && opportunity.endDate) {
    return now.getTime() >= new Date(opportunity.endDate).getTime() ? 'expired' : 'active'
  }

  return opportunity.status
}

export const categoryLabels = {
  en: {
    token_launch: 'Token Launch',
    airdrop: 'Airdrop',
    trading_strategy: 'Trading Strategy',
    defi: 'DeFi',
    nft: 'NFT',
  },
  zh: {
    token_launch: '发币题材',
    airdrop: '空投',
    trading_strategy: '交易策略',
    defi: 'DeFi',
    nft: 'NFT',
  },
}

export const statusLabels = {
  en: {
    active: 'Active',
    ending_soon: 'Ending Soon',
    expired: 'Expired',
  },
  zh: {
    active: '进行中',
    ending_soon: '即将结束',
    expired: '已过期',
  },
}

export const riskLabels = {
  en: {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  },
  zh: {
    low: '低风险',
    medium: '中风险',
    high: '高风险',
  },
}
