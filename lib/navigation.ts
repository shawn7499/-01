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
      en: 'Return to the main landing page and mission overview.',
      zh: '返回主站首页，查看整体定位与主线内容。',
    },
  },
  {
    key: 'news',
    href: '/news',
    label: { en: 'News', zh: '新闻' },
    subtitle: {
      en: 'Browse cached crypto headlines with source and category filters.',
      zh: '查看加密新闻聚合，并按来源和分类筛选。',
    },
  },
  {
    key: 'intelligence',
    href: '/news/signals',
    label: { en: 'Intelligence', zh: '情报' },
    subtitle: {
      en: 'Monitor Odaily and BlockBeats with market context, risks, and next actions.',
      zh: '监控 Odaily 和 BlockBeats，并输出市场情报、风险和下一步动作。',
    },
  },
  {
    key: 'stocks',
    href: '/stocks',
    label: { en: 'Stock Radar', zh: '美股雷达' },
    subtitle: {
      en: 'Track KOL stock calls, mention momentum, and watchlist conviction.',
      zh: '追踪美股 KOL 喊单、提及热度和观察名单强弱。',
    },
  },
]

export const homeNavItems: NavItem[] = [
  {
    key: 'about',
    href: '#about',
    label: { en: 'What I Do', zh: '我的专长' },
    subtitle: {
      en: 'AI, trading, design, and Web3 capabilities in one overview.',
      zh: '快速了解我在 AI、交易、设计与 Web3 上的能力结构。',
    },
  },
  {
    key: 'projects',
    href: '#projects',
    label: { en: 'Projects', zh: '项目' },
    subtitle: {
      en: 'See active products, live experiments, and the project atlas.',
      zh: '查看当前产品、实验项目和项目实验室入口。',
    },
  },
  {
    key: 'roadmap',
    href: '#roadmap',
    label: { en: 'Roadmap', zh: '路线图' },
    subtitle: {
      en: 'A long-range mission map for where the work is heading.',
      zh: '查看长期目标、阶段路线与未来推进方向。',
    },
  },
  {
    key: 'news',
    href: '/news',
    label: { en: 'News', zh: '新闻' },
    subtitle: {
      en: 'Curated crypto headlines with filters and intelligence translation.',
      zh: '查看加密新闻聚合与情报解读。',
    },
  },
  {
    key: 'intelligence',
    href: '/news/signals',
    label: { en: 'Intelligence', zh: '情报' },
    subtitle: {
      en: 'Turn Odaily and BlockBeats headlines into intelligence cards.',
      zh: '把 Odaily 和 BlockBeats 消息整理成情报卡片。',
    },
  },
  {
    key: 'stocks',
    href: '/stocks',
    label: { en: 'Stock Radar', zh: '美股雷达' },
    subtitle: {
      en: 'Follow public KOL stock calls and build a watchlist from mention momentum.',
      zh: '跟踪公开 KOL 美股喊单，用提及热度整理观察池。',
    },
  },
  {
    key: 'contact',
    href: '#contact',
    label: { en: 'Contact', zh: '联系' },
    subtitle: {
      en: 'Reach out through X, Telegram, GitHub, or email.',
      zh: '通过 X、Telegram、GitHub 或邮箱联系我。',
    },
  },
]
