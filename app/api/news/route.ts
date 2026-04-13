import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

const RSS_SOURCES = {
  "Odaily": "https://www.odaily.news/feed",
  "BlockBeats": "https://www.theblockbeats.info/rss",
  "CoinDesk": "https://www.coindesk.com/arc/outboundfeeds/rss/",
};

interface NewsArticle {
  id: string;
  title: string;
  link: string;
  description: string;
  published: string;
  source: string;
  category: string;
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const sourceFilter = searchParams.get('source');
    const categoryFilter = searchParams.get('category');

    const allArticles: NewsArticle[] = [];

    // Fetch from all RSS sources
    for (const [sourceName, url] of Object.entries(RSS_SOURCES)) {
      if (sourceFilter && sourceFilter !== 'All' && sourceFilter !== sourceName) {
        continue;
      }

      try {
        const feed = await parser.parseURL(url);
        
        feed.items.slice(0, 20).forEach((item, index) => {
          const title = item.title || 'No Title';
          const category = categorizeArticle(title);

          if (categoryFilter && categoryFilter !== 'All' && categoryFilter !== category) {
            return;
          }

          allArticles.push({
            id: `${sourceName}-${index}-${Date.now()}`,
            title,
            link: item.link || '',
            description: item.contentSnippet || item.content || '',
            published: item.pubDate || new Date().toISOString(),
            source: sourceName,
            category,
          });
        });
      } catch (error) {
        console.error(`Failed to fetch ${sourceName}:`, error);
      }
    }

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });

    // Limit results
    const limitedArticles = allArticles.slice(0, limit);

    return NextResponse.json({
      total: limitedArticles.length,
      articles: limitedArticles,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
