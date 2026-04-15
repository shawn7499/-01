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
      'Apple App Store lists XChat from X Corp. for April 17, 2026. XChat-themed meme tokens on Solana and BNB Chain may attract short-term attention before launch.',
    descriptionZh:
      'Apple App Store 显示 X Corp. 的 XChat 预计于 2026 年 4 月 17 日上线。上线前，Solana 和 BNB Chain 上的 XChat 题材 meme 代币可能获得短线关注。',
    source: 'Apple App Store / X Corp.',
    sourceZh: 'Apple App Store / X Corp.',
    riskLevel: 'high',
    potentialReturn: 'Event-driven, short-term only',
    potentialReturnZh: '事件驱动，偏短线',
    participationMethod:
      'Watch liquidity, volume, and slippage first. Focus on the most liquid XChat-themed token, size small, and avoid chasing a vertical move.',
    participationMethodZh:
      '先看流动性、成交量和滑点，只关注流动性最强的 XChat 题材代币，小仓位观察，避免在直线拉升后追高。',
    links: {
      official: 'https://apps.apple.com/us/app/xchat/id6760873038',
    },
    tags: ['XChat', 'Event Trade', 'Meme', 'Solana', 'BNB Chain'],
    tagsZh: ['XChat', '事件交易', 'Meme', 'Solana', 'BNB Chain'],
  },
  {
    id: 'spacex-ipo-bitget-2026-04',
    title: 'SpaceX Stock IPO on Bitget',
    titleZh: 'Bitget 上的 SpaceX 股票 IPO',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-14',
    description:
      'Bitget launched SpaceX stock trading, opening a blockchain-based route for users who want exposure before a traditional IPO.',
    descriptionZh:
      'Bitget 已上线 SpaceX 股票交易，为希望在传统 IPO 前获得相关敞口的用户提供了链上入口。',
    source: 'Bitget Official',
    sourceZh: 'Bitget 官方',
    riskLevel: 'high',
    potentialReturn: 'High if narrative keeps expanding',
    potentialReturnZh: '若叙事继续扩散，潜在空间较高',
    participationMethod: 'Trade on Bitget and monitor liquidity, spreads, and premium changes.',
    participationMethodZh: '在 Bitget 参与，并重点观察流动性、买卖价差和溢价变化。',
    links: {
      official: 'https://www.bitget.art/zh-CN/support/articles/12560603882368',
    },
    tags: ['Stock', 'SpaceX', 'IPO', 'Bitget', 'RWA'],
    tagsZh: ['股票', 'SpaceX', 'IPO', 'Bitget', 'RWA'],
  },
  {
    id: 'arc-network-2026-04',
    title: 'Arc Network Token Launch',
    titleZh: 'Arc Network 发币预期',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-14',
    description:
      'Circle founder confirmed that Arc Network plans to launch a token, but the exact distribution and market structure are still pending.',
    descriptionZh:
      'Circle 创始人确认 Arc Network 计划发币，但具体的发放方式和市场结构仍待公布。',
    source: 'Circle Founder',
    sourceZh: 'Circle 创始人',
    riskLevel: 'medium',
    potentialReturn: 'Details pending',
    potentialReturnZh: '细节待定',
    participationMethod: 'Track official disclosures and avoid pricing in unconfirmed allocation details.',
    participationMethodZh: '持续跟踪官方披露，不要提前把未经确认的分配细节计入预期。',
    links: {},
    tags: ['Token Launch', 'Circle', 'Layer 2'],
    tagsZh: ['发币', 'Circle', 'Layer 2'],
  },
  {
    id: 'eth-whale-strategy-2026-04',
    title: 'ETH Whale Mean Reversion Strategy',
    titleZh: 'ETH 鲸鱼均值回归策略',
    category: 'trading_strategy',
    status: 'active',
    startDate: '2026-04-14',
    description:
      'Backtested strategy: buy ETH into 5% dips and reduce into 5% pumps on the 4H timeframe with controlled leverage.',
    descriptionZh:
      '回测策略：在 4 小时周期中，ETH 下跌 5% 时分批买入，上涨 5% 时逐步减仓，并配合受控杠杆。',
    source: 'Whale Trader Strategy',
    sourceZh: '鲸鱼交易策略',
    riskLevel: 'high',
    potentialReturn: '+15.64% in backtest',
    potentialReturnZh: '回测收益 +15.64%',
    participationMethod: 'Use Binance Futures with strict leverage limits, fixed sizing, and stop-loss rules.',
    participationMethodZh: '使用币安合约时控制杠杆、固定仓位，并严格执行止损规则。',
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
