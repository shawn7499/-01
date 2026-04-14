'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { opportunities, categoryLabels, statusLabels, riskLabels, Opportunity } from '@/lib/opportunities'

const translations = {
  en: {
    title: 'Investment Opportunities',
    subtitle: 'Curated opportunities in crypto, trading, and Web3',
    filterAll: 'All',
    filterActive: 'Active',
    filterEnding: 'Ending Soon',
    filterExpired: 'Expired',
    category: 'Category',
    status: 'Status',
    risk: 'Risk',
    potential: 'Potential Return',
    participation: 'How to Participate',
    source: 'Source',
    startDate: 'Start Date',
    endDate: 'End Date',
    actualReturn: 'Actual Return',
    viewDetails: 'View Details',
    backToHome: '← Back to Home'
  },
  zh: {
    title: '投资机会',
    subtitle: '精选加密货币、交易和 Web3 机会',
    filterAll: '全部',
    filterActive: '进行中',
    filterEnding: '即将结束',
    filterExpired: '已结束',
    category: '类别',
    status: '状态',
    risk: '风险等级',
    potential: '潜在收益',
    participation: '参与方式',
    source: '来源',
    startDate: '开始日期',
    endDate: '结束日期',
    actualReturn: '实际收益',
    viewDetails: '查看详情',
    backToHome: '← 返回首页'
  }
}

export default function OpportunitiesPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const [filter, setFilter] = useState<'all' | 'active' | 'ending_soon' | 'expired'>('all')
  
  const t = translations[lang]
  
  const filteredOpportunities = opportunities.filter(opp => {
    if (filter === 'all') return true
    return opp.status === filter
  })
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'ending_soon': return 'bg-yellow-500'
      case 'expired': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-sm hover:text-gray-300 transition-colors">
            {t.backToHome}
          </a>
          <h1 className="text-xl font-bold">{t.title}</h1>
          <div className="w-32"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">{t.title}</h2>
            <p className="text-xl text-gray-300">{t.subtitle}</p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-12 justify-center"
          >
            {(['all', 'active', 'ending_soon', 'expired'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 border transition-all ${
                  filter === f 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white border-white hover:bg-white/10'
                }`}
              >
                {f === 'all' ? t.filterAll : 
                 f === 'active' ? t.filterActive :
                 f === 'ending_soon' ? t.filterEnding :
                 t.filterExpired}
              </button>
            ))}
          </motion.div>

          {/* Opportunities Grid */}
          <div className="space-y-8">
            {filteredOpportunities.map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-l-4 border-white pl-8 py-8 bg-white/5 backdrop-blur-sm p-6 rounded hover:border-gray-300 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">
                      {lang === 'en' ? opp.title : opp.titleZh}
                    </h3>
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className={`px-3 py-1 text-xs font-bold ${getStatusColor(opp.status)} text-black rounded`}>
                        {statusLabels[lang][opp.status]}
                      </span>
                      <span className="px-3 py-1 text-xs font-bold bg-gray-700 text-white rounded">
                        {categoryLabels[lang][opp.category]}
                      </span>
                      <span className={`text-sm font-bold ${getRiskColor(opp.riskLevel)}`}>
                        {riskLabels[lang][opp.riskLevel]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {lang === 'en' ? opp.description : opp.descriptionZh}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{t.source}</div>
                    <div className="font-semibold">{lang === 'en' ? opp.source : opp.sourceZh}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{t.potential}</div>
                    <div className="font-semibold text-green-400">
                      {lang === 'en' ? opp.potentialReturn : opp.potentialReturnZh}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{t.startDate}</div>
                    <div className="font-semibold">{opp.startDate}</div>
                  </div>
                  {opp.endDate && (
                    <div>
                      <div className="text-sm text-gray-400 mb-1">{t.endDate}</div>
                      <div className="font-semibold">{opp.endDate}</div>
                    </div>
                  )}
                  {opp.actualReturn && (
                    <div className="md:col-span-2">
                      <div className="text-sm text-gray-400 mb-1">{t.actualReturn}</div>
                      <div className="font-semibold text-blue-400">{opp.actualReturn}</div>
                    </div>
                  )}
                </div>

                {/* Participation Method */}
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-2">{t.participation}</div>
                  <div className="text-gray-300">
                    {lang === 'en' ? opp.participationMethod : opp.participationMethodZh}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(lang === 'en' ? opp.tags : opp.tagsZh).map((tag, j) => (
                    <span key={j} className="px-3 py-1 text-xs bg-white/10 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOpportunities.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No opportunities found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
