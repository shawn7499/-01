export interface Opportunity {
  id: string
  title: string
  titleZh: string
  category: 'token_launch' | 'airdrop' | 'trading_strategy' | 'defi' | 'nft'
  status: 'active' | 'ending_soon' | 'expired'
  startDate: string // ISO 8601 format
  endDate?: string // ISO 8601 format, optional
  description: string
  descriptionZh: string
  source: string
  sourceZh: string
  riskLevel: 'low' | 'medium' | 'high'
  potentialReturn?: string
  potentialReturnZh?: string
  participationMethod: string
  participationMethodZh: string
  actualReturn?: string // For expired opportunities
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
    id: 'spacex-ipo-bitget-2026-04',
    title: 'SpaceX Stock IPO on Bitget',
    titleZh: 'SpaceX 股票 IPO（Bitget）',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-14',
    description: 'Bitget will launch SpaceX stock trading. Trade SpaceX shares on blockchain before traditional IPO.',
    descriptionZh: 'Bitget 将上线 SpaceX 股票交易。在传统 IPO 之前，通过区块链交易 SpaceX 股票。',
    source: 'Bitget Official',
    sourceZh: 'Bitget 官方',
    riskLevel: 'high',
    potentialReturn: 'High (SpaceX valuation growth)',
    potentialReturnZh: '高（SpaceX 估值增长）',
    participationMethod: 'Trade on Bitget platform',
    participationMethodZh: '在 Bitget 平台交易',
    links: {
      official: 'https://www.bitget.art/zh-CN/support/articles/12560603882368',
    },
    tags: ['Stock', 'SpaceX', 'IPO', 'Bitget', 'RWA'],
    tagsZh: ['股票', 'SpaceX', 'IPO', 'Bitget', 'RWA']
  },
  {
    id: 'arc-network-2026-04',
    title: 'Arc Network Token Launch',
    titleZh: 'Arc Network 代币发行',
    category: 'token_launch',
    status: 'active',
    startDate: '2026-04-14',
    description: 'Circle founder confirmed Arc Network will launch a token. More details to be disclosed.',
    descriptionZh: 'Circle 创始人确认 Arc Network 将会发币，后续将披露更多细节。',
    source: 'Circle Founder',
    sourceZh: 'Circle 创始人',
    riskLevel: 'medium',
    potentialReturn: 'TBD',
    potentialReturnZh: '待定',
    participationMethod: 'Details to be announced',
    participationMethodZh: '待公布',
    links: {},
    tags: ['Token Launch', 'Circle', 'Layer 2'],
    tagsZh: ['代币发行', 'Circle', '二层网络']
  },
  {
    id: 'eth-whale-strategy-2026-04',
    title: 'ETH Whale Mean Reversion Strategy',
    titleZh: 'ETH 巨鲸均值回归策略',
    category: 'trading_strategy',
    status: 'active',
    startDate: '2026-04-14',
    description: 'Backtested strategy: Buy ETH on 5% dips, sell on 5% pumps. 4H timeframe, 2x leverage. Historical return: +15.64% over 167 days.',
    descriptionZh: '回测策略：ETH 快速下跌 5% 做多，快速上涨 5% 做空。4H 周期，2 倍杠杆。历史收益：167 天 +15.64%。',
    source: 'Whale Trader Strategy',
    sourceZh: '巨鲸交易员策略',
    riskLevel: 'high',
    potentialReturn: '+15.64% (backtested)',
    potentialReturnZh: '+15.64%（回测）',
    participationMethod: 'Binance Futures, 2x leverage, 4H timeframe',
    participationMethodZh: '币安合约，2 倍杠杆，4H 周期',
    actualReturn: '+15.64% (167 days backtest)',
    links: {},
    tags: ['Trading', 'ETH', 'Futures', 'Mean Reversion'],
    tagsZh: ['交易', 'ETH', '合约', '均值回归']
  }
]

export const categoryLabels = {
  en: {
    token_launch: 'Token Launch',
    airdrop: 'Airdrop',
    trading_strategy: 'Trading Strategy',
    defi: 'DeFi',
    nft: 'NFT'
  },
  zh: {
    token_launch: '代币发行',
    airdrop: '空投',
    trading_strategy: '交易策略',
    defi: 'DeFi',
    nft: 'NFT'
  }
}

export const statusLabels = {
  en: {
    active: 'Active',
    ending_soon: 'Ending Soon',
    expired: 'Expired'
  },
  zh: {
    active: '进行中',
    ending_soon: '即将结束',
    expired: '已结束'
  }
}

export const riskLabels = {
  en: {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk'
  },
  zh: {
    low: '低风险',
    medium: '中风险',
    high: '高风险'
  }
}
