import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

import { analyzeArticles, NewsArticle } from '@/lib/news-signals'

export const dynamic = 'force-dynamic'

const parser = new Parser()

const SIGNAL_SOURCES = {
  Odaily: 'https://www.odaily.news/feed',
  BlockBeats: 'https://www.theblockbeats.info/rss',
}

function categorizeArticle(title: string): string {
  const titleLower = title.toLowerCase()
  if (titleLower.includes('btc') || titleLower.includes('bitcoin') || titleLower.includes('比特币')) {
    return 'Bitcoin'
  }
  if (titleLower.includes('eth') || titleLower.includes('ethereum') || titleLower.includes('以太坊')) {
    return 'Ethereum'
  }
  if (titleLower.includes('defi') || titleLower.includes('dex') || titleLower.includes('swap')) {
    return 'DeFi'
  }
  if (titleLower.includes('meme') || titleLower.includes('memecoin') || titleLower.includes('土狗')) {
    return 'Meme'
  }
  return 'General'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '18', 10)

    const sourceResults = await Promise.all(
      Object.entries(SIGNAL_SOURCES).map(async ([source, url]) => {
        try {
          const feed = await parser.parseURL(url)

          return feed.items.slice(0, 20).map((item, index) => {
            const title = item.title || 'Untitled'

            return {
              id: `${source}-${index}-${item.pubDate || Date.now()}`,
              title,
              link: item.link || '',
              description: item.contentSnippet || item.content || '',
              published: item.pubDate || new Date().toISOString(),
              source,
              category: categorizeArticle(title),
            } satisfies NewsArticle
          })
        } catch (error) {
          console.error(`Failed to fetch signal feed from ${source}:`, error)
          return []
        }
      })
    )

    const dedupedArticles = Array.from(
      new Map(
        sourceResults
          .flat()
          .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
          .map((article) => [`${article.source}-${article.link || article.title}`, article])
      ).values()
    )

    const signals = analyzeArticles(dedupedArticles).slice(0, limit)

    return NextResponse.json({
      total: signals.length,
      generatedAt: new Date().toISOString(),
      signals,
    })
  } catch (error) {
    console.error('Signal API error:', error)
    return NextResponse.json({ error: 'Failed to build news signals' }, { status: 500 })
  }
}
