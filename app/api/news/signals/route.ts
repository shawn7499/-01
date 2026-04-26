import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

import { analyzeArticles, NewsArticle } from '@/lib/news-signals'

export const dynamic = 'force-dynamic'

const parser = new Parser()
const SOURCE_ITEM_LIMIT = 80
const MAX_SIGNAL_LIMIT = 60

const SIGNAL_SOURCES = {
  Odaily: 'https://rss.odaily.news/rss/newsflash',
  BlockBeats: 'https://api.theblockbeats.news/v1/open-api/home-xml',
}

function repairMojibake(text: string) {
  if (!text) return ''

  const likelyBroken = /[\u00C0-\u00FF]{3,}/.test(text)
  if (!likelyBroken) {
    return text
  }

  try {
    return Buffer.from(text, 'latin1').toString('utf8')
  } catch {
    return text
  }
}

function createArticleId(source: string, title: string, link: string, published: string) {
  return createHash('sha1').update(`${source}|${title}|${link}|${published}`).digest('hex')
}

function normalizeDate(rawDate?: string) {
  const parsed = rawDate ? new Date(rawDate) : new Date()
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString()
  }
  return parsed.toISOString()
}

async function fetchFeedItems(source: string, url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (compatible; ShawnWickIntelligenceAgent/1.0)',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`${source} feed request failed with ${response.status}`)
  }

  const xml = await response.text()
  const feed = await parser.parseString(xml)

  return feed.items
}

function categorizeArticle(title: string): string {
  const titleLower = title.toLowerCase()
  if (titleLower.includes('btc') || titleLower.includes('bitcoin') || title.includes('比特币')) {
    return 'Bitcoin'
  }
  if (titleLower.includes('eth') || titleLower.includes('ethereum') || title.includes('以太坊')) {
    return 'Ethereum'
  }
  if (titleLower.includes('defi') || titleLower.includes('dex') || titleLower.includes('swap')) {
    return 'DeFi'
  }
  if (titleLower.includes('meme') || titleLower.includes('memecoin') || title.includes('梗')) {
    return 'Meme'
  }
  if (titleLower.includes('airdrop') || title.includes('空投') || title.includes('积分')) {
    return 'Airdrop'
  }
  if (titleLower.includes('hack') || titleLower.includes('exploit') || title.includes('攻击') || title.includes('漏洞')) {
    return 'Security'
  }
  return 'General'
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const requestedLimit = parseInt(searchParams.get('limit') || '30', 10)
    const limit = Math.min(Math.max(requestedLimit, 1), MAX_SIGNAL_LIMIT)

    const sourceResults = await Promise.all(
      Object.entries(SIGNAL_SOURCES).map(async ([source, url]) => {
        try {
          const items = await fetchFeedItems(source, url)

          return items.slice(0, SOURCE_ITEM_LIMIT).map((item) => {
            const title = repairMojibake(item.title || 'Untitled')
            const description = repairMojibake(item.contentSnippet || item.content || '')
            const published = normalizeDate(item.pubDate)
            const link = item.link || ''

            return {
              id: createArticleId(source, title, link, published),
              title,
              link,
              description,
              published,
              source,
              category: categorizeArticle(title),
            } satisfies NewsArticle
          })
        } catch (error) {
          console.error(`Failed to fetch intelligence feed from ${source}:`, error)
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
      scanned: dedupedArticles.length,
      generatedAt: new Date().toISOString(),
      sources: Object.keys(SIGNAL_SOURCES),
      signals,
    })
  } catch (error) {
    console.error('Intelligence API error:', error)
    return NextResponse.json({ error: 'Failed to build crypto intelligence' }, { status: 500 })
  }
}
