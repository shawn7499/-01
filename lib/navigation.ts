export type NavLang = 'en' | 'zh'

export type NavItem = {
  key: string
  href: string
  label: Record<NavLang, string>
  subtitle: Record<NavLang, string>
}

export const siteNavItems: NavItem[] = [
  {
    key: 'home',
    href: '/',
    label: { en: 'Home', zh: '首页' },
    subtitle: {
      en: 'Return to the main landing page and broader site direction.',
      zh: '回到主站首页，查看整体定位、作品入口和未来方向。',
    },
  },
  {
    key: 'news',
    href: '/news',
    label: { en: 'News', zh: '新闻' },
    subtitle: {
      en: 'Browse curated crypto headlines and the action-oriented signal feed.',
      zh: '查看加密新闻聚合，以及把消息翻译成行动判断的信号页。',
    },
  },
  {
    key: 'opportunities',
    href: '/opportunities',
    label: { en: 'Opportunities', zh: '机遇' },
    subtitle: {
      en: 'Track event-driven setups, timing windows, and narrative opportunities.',
      zh: '跟踪事件驱动机会、时间窗口和值得观察的市场题材。',
    },
  },
  {
    key: 'tokens',
    href: '/tokens/hot',
    label: { en: 'Token Radar', zh: '代币雷达' },
    subtitle: {
      en: 'Monitor hot tokens, chain rotation, contracts, and onchain momentum.',
      zh: '观察热门代币、链轮动、合约地址和快速变化的链上热度。',
    },
  },
]

export const homeNavItems: NavItem[] = [
  {
    key: 'about',
    href: '#about',
    label: { en: 'What I Do', zh: '我的能力' },
    subtitle: {
      en: 'A fast overview of the systems, product, and market skills behind the site.',
      zh: '快速了解我在产品、开发、设计、AI 和市场研究上的能力结构。',
    },
  },
  {
    key: 'projects',
    href: '#projects',
    label: { en: 'Projects', zh: '项目' },
    subtitle: {
      en: 'See live products, active experiments, and the broader project atlas.',
      zh: '查看当前在线产品、正在推进的实验，以及后续项目目录。',
    },
  },
  {
    key: 'roadmap',
    href: '#roadmap',
    label: { en: 'Roadmap', zh: '路线图' },
    subtitle: {
      en: 'A long-range map for how today’s work can grow into larger systems.',
      zh: '查看这些产品如何逐步扩展成更大系统的长期路线。',
    },
  },
  {
    key: 'opportunities',
    href: '/opportunities',
    label: { en: 'Opportunities', zh: '机遇' },
    subtitle: {
      en: 'A board for event-driven market ideas, timing windows, and setup tracking.',
      zh: '聚合事件驱动的市场机会、时间窗口和可跟踪的参与思路。',
    },
  },
  {
    key: 'news',
    href: '/news',
    label: { en: 'News', zh: '新闻' },
    subtitle: {
      en: 'Curated crypto headlines with filters, categories, and signal translation.',
      zh: '查看经过筛选的加密新闻，并进一步进入信号解读页。',
    },
  },
  {
    key: 'tokens',
    href: '/tokens/hot',
    label: { en: 'Token Radar', zh: '代币雷达' },
    subtitle: {
      en: 'Watch hot tokens, chain rotation, contract details, and onchain narratives.',
      zh: '跟踪热门代币、链轮动、合约信息和链上叙事热度。',
    },
  },
  {
    key: 'contact',
    href: '#contact',
    label: { en: 'Contact', zh: '联系' },
    subtitle: {
      en: 'Reach out through X, Telegram, GitHub, email, or WeChat.',
      zh: '通过 X、Telegram、GitHub、邮箱或微信与我联系。',
    },
  },
]
