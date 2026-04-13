'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NewsArticle {
  id: number;
  title: string;
  link: string;
  description: string;
  published: string;
  source: string;
  category: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');

  const categories = ['All', 'Bitcoin', 'Ethereum', 'DeFi', 'NFT', 'Regulation', 'General'];
  const sources = ['All', 'Odaily', 'BlockBeats', 'CoinDesk'];

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // 每分钟刷新
    return () => clearInterval(interval);
  }, [selectedCategory, selectedSource]);

  const fetchNews = async () => {
    try {
      let url = '/api/news?limit=50';
      if (selectedCategory !== 'All') {
        url += `&category=${selectedCategory}`;
      }
      if (selectedSource !== 'All') {
        url += `&source=${selectedSource}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Bitcoin: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      Ethereum: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      DeFi: 'bg-green-500/20 text-green-400 border-green-500/30',
      NFT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Regulation: 'bg-red-500/20 text-red-400 border-red-500/30',
      General: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[category] || colors.General;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold">SHAWN WICK</a>
            <h1 className="text-2xl font-bold">Crypto News</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm text-gray-400 mb-2">分类</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === category
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white border-white/20 hover:border-white/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Source Filter */}
          <div>
            <h3 className="text-sm text-gray-400 mb-2">来源</h3>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedSource === source
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white border-white/20 hover:border-white/40'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4 text-gray-400">加载中...</p>
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
                transition={{ delay: index * 0.05 }}
                className="block bg-black border-l-4 border-white p-6 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
                      {article.title}
                    </h2>
                    {article.description && (
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-2 py-1 rounded border ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className="text-gray-500">{article.source}</span>
                      <span className="text-gray-500">{formatDate(article.published)}</span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0"
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

        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">暂无新闻</p>
          </div>
        )}
      </main>
    </div>
  );
}
