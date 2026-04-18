'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'

interface NewsArticle {
  id: number
  title: string
  link: string
  description: string
  published: string
  source: string
  category: string
  translatedTitle?: string
  translatedDescription?: string
}

type Lang = 'en' | 'zh'

const translations = {
  en: {
    title: 'Crypto News',
    subtitle:
      'A cleaner reading surface for major crypto headlines, with filters for category and source.',
    category: 'Category',
    source: 'Source',
    loading: 'Loading news...',
    noNews: 'No news available',
    signalBadge: 'Signal Feed',
    signalTitle: 'Turn headlines into action plans',
    signalDescription:
      'Open the signal page to translate Odaily and BlockBeats headlines into trade ideas, risk labels, and execution checklists.',
    signalCta: 'Open Signal Page',
    categories: {
      All: 'All',
      Bitcoin: 'Bitcoin',
      Ethereum: 'Ethereum',
      DeFi: 'DeFi',
      Meme: 'Meme',
      NFT: 'NFT',
      Regulation: 'Regulation',
      General: 'General',
    },
    sources: {
      All: 'All',
      Odaily: 'Odaily',
      BlockBeats: 'BlockBeats',
      CoinDesk: 'CoinDesk',
      'Foresight News': 'Foresight News',
      PANews: 'PANews',
    },
    badge: 'News Desk',
  },
  zh: {
    title: '加密新闻',
    subtitle: '把主要加密媒体的新闻整理成更清爽的阅读面板，并支持按分类和来源快速筛选。',
    category: '分类',
    source: '来源',
    loading: '正在加载新闻...',
    noNews: '暂无新闻',
    signalBadge: '信号页',
    signalTitle: '把标题翻译成可执行判断',
    signalDescription:
      '进入信号页后，可以直接查看 Odaily 和 BlockBeats 被整理后的机会判断、风险标签和执行清单。',
    signalCta: '打开信号页',
    categories: {
      All: '全部',
      Bitcoin: '比特币',
      Ethereum: '以太坊',
      DeFi: 'DeFi',
      Meme: 'Meme',
      NFT: 'NFT',
      Regulation: '监管',
      General: '综合',
    },
    sources: {
      All: '全部',
      Odaily: 'Odaily',
      BlockBeats: 'BlockBeats',
      CoinDesk: 'CoinDesk',
      'Foresight News': 'Foresight News',
      PANews: 'PANews',
    },
    badge: 'News Desk',
  },
} as const

const categories = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'Meme', 'NFT', 'Regulation', 'General']
const sources = ['All', 'Odaily', 'BlockBeats', 'CoinDesk', 'Foresight News', 'PANews']

export default function NewsPage() {
  const [lang, setLang] = useState<Lang>('zh')
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedSource, setSelectedSource] = useState<string>('All')

  const t = translations[lang]

  useEffect(() => {
    void fetchNews()
    const interval = window.setInterval(() => {
      void fetchNews()
    }, 60000)

    return () => window.clearInterval(interval)
  }, [selectedCategory, selectedSource])

  useEffect(() => {
    if (lang === 'zh' && articles.length > 0) {
      void translateArticles()
    }
  }, [lang, articles.length])

  async function fetchNews() {
    try {
      setLoading(true)

      let url = '/api/news?limit=50'
      if (selectedCategory !== 'All') {
        url += `&category=${selectedCategory}`
      }
      if (selectedSource !== 'All') {
        url += `&source=${selectedSource}`
      }

      const response = await fetch(url, { cache: 'no-store' })
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  async function translateArticles() {
    const translatedArticles = await Promise.all(
      articles.map(async (article) => {
        if (article.translatedTitle) return article

        try {
          const titleRes = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: article.title, targetLang: 'zh-CN' }),
          })
          const titleData = await titleRes.json()

          let descData: { translated?: string } | null = null
          if (article.description) {
            const descRes = await fetch('/api/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: article.description, targetLang: 'zh-CN' }),
            })
            descData = await descRes.json()
          }

          return {
            ...article,
            translatedTitle: titleData.translated,
            translatedDescription: descData?.translated,
          }
        } catch (error) {
          console.error('Translation failed:', error)
          return article
        }
      })
    )

    setArticles(translatedArticles)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) {
      return lang === 'zh' ? `${Math.max(minutes, 1)} 分钟前` : `${Math.max(minutes, 1)} min ago`
    }
    if (hours < 24) {
      return lang === 'zh' ? `${hours} 小时前` : `${hours}h ago`
    }
    if (days < 7) {
      return lang === 'zh' ? `${days} 天前` : `${days}d ago`
    }

    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US')
  }

  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      Bitcoin: 'bg-orange-500/12 text-orange-100 border-orange-400/20',
      Ethereum: 'bg-blue-500/12 text-blue-100 border-blue-400/20',
      DeFi: 'bg-emerald-500/12 text-emerald-100 border-emerald-400/20',
      NFT: 'bg-violet-500/12 text-violet-100 border-violet-400/20',
      Regulation: 'bg-rose-500/12 text-rose-100 border-rose-400/20',
      General: 'bg-white/5 text-white/70 border-white/10',
    }

    return colors[category] || colors.General
  }

  return (
    <div className="page-shell">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="news" />

      <main className="page-container pb-14 pt-32 md:pt-36">
        <section className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(153,200,255,0.16),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(110,231,212,0.12),transparent_18%)]" />
          <div className="relative max-w-4xl">
            <p className="section-label">{t.badge}</p>
            <h1 className="section-title mt-4 text-5xl sm:text-6xl lg:text-7xl">{t.title}</h1>
            <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">{t.subtitle}</p>
          </div>
        </section>

        <section className="glass-panel mt-8 rounded-[1.8rem] px-6 py-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(110,231,212,0.14),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(153,200,255,0.1),transparent_18%)]" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="section-label">{t.signalBadge}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white/92">
                {t.signalTitle}
              </h2>
              <p className="section-copy mt-3 text-sm sm:text-base">{t.signalDescription}</p>
            </div>
            <a href="/news/signals" className="site-button">
              {t.signalCta}
            </a>
          </div>
        </section>

        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="glass-panel-soft rounded-[1.55rem] p-5">
            <h3 className="section-label">{t.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedCategory === category
                      ? 'border-white bg-white text-black'
                      : 'border-white/12 bg-white/[0.04] text-white/72 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {t.categories[category as keyof typeof t.categories]}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel-soft rounded-[1.55rem] p-5">
            <h3 className="section-label">{t.source}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => setSelectedSource(source)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedSource === source
                      ? 'border-white bg-white text-black'
                      : 'border-white/12 bg-white/[0.04] text-white/72 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {t.sources[source as keyof typeof t.sources]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-8">
          {loading ? (
            <div className="glass-panel-soft rounded-[1.9rem] px-8 py-20 text-center text-white/65">
              <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-[var(--accent)]" />
              <p>{t.loading}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="glass-panel-soft rounded-[1.9rem] px-8 py-20 text-center text-white/65">
              <p>{t.noNews}</p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {articles.map((article, index) => (
                <motion.a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.18), duration: 0.5 }}
                  className="glass-panel-soft hover-lift rounded-[1.6rem] p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {t.categories[article.category as keyof typeof t.categories] || article.category}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/62">
                      {article.source}
                    </span>
                    <span className="text-xs text-white/45">{formatDate(article.published)}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white/92">
                    {lang === 'zh' ? article.translatedTitle || article.title : article.title}
                  </h2>

                  <p className="section-copy mt-3 text-sm">
                    {lang === 'zh'
                      ? article.translatedDescription || article.description
                      : article.description}
                  </p>
                </motion.a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
