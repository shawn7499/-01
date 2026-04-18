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
      'Track the latest stories across major crypto news sources with category and source filters.',
    category: 'Category',
    source: 'Source',
    loading: 'Loading...',
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
  },
  zh: {
    title: '加密新闻',
    subtitle: '聚合主要加密媒体的最新动态，并支持按分类与来源快速筛选。',
    category: '分类',
    source: '来源',
    loading: '加载中...',
    noNews: '暂无新闻',
    signalBadge: '信号页',
    signalTitle: '把新闻翻译成可执行判断',
    signalDescription:
      '打开信号页后，你可以直接查看 Odaily 和 BlockBeats 被整理成的机会判断、风险标签和执行清单。',
    signalCta: '打开信号页',
    categories: {
      All: '全部',
      Bitcoin: '比特币',
      Ethereum: '以太坊',
      DeFi: 'DeFi',
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
  },
} as const

const categories = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Regulation', 'General']
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
      Bitcoin: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      Ethereum: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      DeFi: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      NFT: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      Regulation: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      General: 'bg-white/10 text-white/70 border-white/15',
    }

    return colors[category] || colors.General
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="news" />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <section className="mb-8 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_75%_20%,rgba(168,85,247,0.12),transparent_30%),rgba(255,255,255,0.03)] p-6 sm:p-8">
          <h1 className="text-4xl font-black sm:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
            {t.subtitle}
          </p>
        </section>

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_75%_20%,rgba(168,85,247,0.12),transparent_30%),rgba(255,255,255,0.03)] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                {t.signalBadge}
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">{t.signalTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-300 sm:text-base">
                {t.signalDescription}
              </p>
            </div>
            <a
              href="/news/signals"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              {t.signalCta}
            </a>
          </div>
        </section>

        <div className="mb-8 space-y-4">
          <div>
            <h3 className="mb-2 text-sm text-gray-400">{t.category}</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedCategory === category
                      ? 'border-white bg-white text-black'
                      : 'border-white/20 bg-transparent text-white hover:border-white/40'
                  }`}
                >
                  {t.categories[category as keyof typeof t.categories]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm text-gray-400">{t.source}</h3>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedSource === source
                      ? 'border-white bg-white text-black'
                      : 'border-white/20 bg-transparent text-white hover:border-white/40'
                  }`}
                >
                  {t.sources[source as keyof typeof t.sources]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-white" />
            <p className="mt-4 text-gray-400">{t.loading}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400">{t.noNews}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.2) }}
                className="block rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-gray-300">
                      {lang === 'zh' && article.translatedTitle
                        ? article.translatedTitle
                        : article.title}
                    </h2>

                    {article.description ? (
                      <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                        {lang === 'zh' && article.translatedDescription
                          ? article.translatedDescription
                          : article.description}
                      </p>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className={`rounded-full border px-2.5 py-1 ${getCategoryColor(article.category)}`}>
                        {t.categories[article.category as keyof typeof t.categories] || article.category}
                      </span>
                      <span className="text-gray-500">
                        {t.sources[article.source as keyof typeof t.sources] || article.source}
                      </span>
                      <span className="text-gray-500">{formatDate(article.published)}</span>
                    </div>
                  </div>

                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
