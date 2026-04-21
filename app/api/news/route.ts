import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser();

const RSS_SOURCES = {
  Odaily: 'https://rss.odaily.news/rss/newsflash',
  BlockBeats: 'https://api.theblockbeats.news/v1/open-api/home-xml',
  CoinDesk: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
  'Foresight News': 'https://foresightnews.pro/rss.xml',
  PANews: 'https://www.panewslab.com/rss/index.xml',
} as const;

const MAX_CACHE_ITEMS = 1000;
const FEED_ITEM_LIMIT = 250;
const CACHE_REFRESH_MS = 60_000;
const CACHE_FILE_PATH = path.join(os.tmpdir(), 'wick-portfolio-news-cache.json');

interface NewsArticle {
  id: string;
  title: string;
  link: string;
  description: string;
  published: string;
  source: string;
  category: string;
}

interface NewsCachePayload {
  refreshedAt: string;
  articles: NewsArticle[];
}

let memoryCache: NewsCachePayload | null = null;
let refreshPromise: Promise<NewsCachePayload> | null = null;

function repairMojibake(text: string) {
  if (!text) return '';

  const likelyBroken = /[\u00C0-\u00FF]{3,}/.test(text);
  if (!likelyBroken) {
    return text;
  }

  try {
    return Buffer.from(text, 'latin1').toString('utf8');
  } catch {
    return text;
  }
}

function categorizeArticle(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('defi') || titleLower.includes('dex') || titleLower.includes('swap')) {
    return 'DeFi';
  }
  if (titleLower.includes('nft') || titleLower.includes('opensea') || titleLower.includes('blur')) {
    return 'NFT';
  }
  if (titleLower.includes('btc') || titleLower.includes('bitcoin')) {
    return 'Bitcoin';
  }
  if (titleLower.includes('eth') || titleLower.includes('ethereum')) {
    return 'Ethereum';
  }
  if (titleLower.includes('sec') || titleLower.includes('regulation') || titleLower.includes('law')) {
    return 'Regulation';
  }
  return 'General';
}

function createArticleId(source: string, title: string, link: string, published: string) {
  return createHash('sha1')
    .update(`${source}|${title}|${link}|${published}`)
    .digest('hex');
}

function normalizeDate(rawDate?: string) {
  const parsed = rawDate ? new Date(rawDate) : new Date();
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }
  return parsed.toISOString();
}

async function fetchFeed(url: string, sourceName: string) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (compatible; ShawnWickNewsBot/1.0)',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`${sourceName} request failed with ${response.status}`);
  }

  return parser.parseString(await response.text());
}

async function readDiskCache(): Promise<NewsCachePayload | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as NewsCachePayload;
    if (!Array.isArray(parsed.articles)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function writeDiskCache(payload: NewsCachePayload) {
  try {
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(payload), 'utf8');
  } catch (error) {
    console.error('Failed to write news cache:', error);
  }
}

async function refreshCache(existingArticles: NewsArticle[] = []): Promise<NewsCachePayload> {
  const merged = new Map<string, NewsArticle>();

  for (const article of existingArticles) {
    merged.set(article.id, article);
  }

  for (const [sourceName, url] of Object.entries(RSS_SOURCES)) {
    try {
      const feed = await fetchFeed(url, sourceName);
      feed.items.slice(0, FEED_ITEM_LIMIT).forEach((item) => {
        const title = repairMojibake(item.title || 'No Title');
        const description = repairMojibake(item.contentSnippet || item.content || '');
        const published = normalizeDate(item.pubDate);
        const link = item.link || '';
        const normalized: NewsArticle = {
          id: createArticleId(sourceName, title, link, published),
          title,
          link,
          description,
          published,
          source: sourceName,
          category: categorizeArticle(title),
        };

        merged.set(normalized.id, normalized);
      });
    } catch (error) {
      console.error(`Failed to fetch ${sourceName}:`, error);
    }
  }

  const articles = Array.from(merged.values())
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, MAX_CACHE_ITEMS);

  const payload = {
    refreshedAt: new Date().toISOString(),
    articles,
  };

  memoryCache = payload;
  await writeDiskCache(payload);
  return payload;
}

async function getCachePayload() {
  if (!memoryCache) {
    memoryCache = await readDiskCache();
  }

  const isFresh =
    memoryCache &&
    Date.now() - new Date(memoryCache.refreshedAt).getTime() < CACHE_REFRESH_MS &&
    memoryCache.articles.length > 0;

  if (isFresh && memoryCache) {
    return memoryCache;
  }

  if (!refreshPromise) {
    refreshPromise = refreshCache(memoryCache?.articles ?? []).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedLimit = parseInt(searchParams.get('limit') || '50', 10);
    const limit = Math.min(Math.max(requestedLimit, 1), MAX_CACHE_ITEMS);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const sourceFilter = searchParams.get('source');
    const categoryFilter = searchParams.get('category');

    const payload = await getCachePayload();

    const filteredArticles = payload.articles.filter((article) => {
      const sourceMatches =
        !sourceFilter || sourceFilter === 'All' || sourceFilter === article.source;
      const categoryMatches =
        !categoryFilter || categoryFilter === 'All' || categoryFilter === article.category;
      return sourceMatches && categoryMatches;
    });

    const articles = filteredArticles.slice(offset, offset + limit);

    return NextResponse.json({
      total: filteredArticles.length,
      cachedTotal: payload.articles.length,
      limit,
      offset,
      hasMore: offset + limit < filteredArticles.length,
      refreshedAt: payload.refreshedAt,
      articles,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
