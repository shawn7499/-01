'use client'

import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { FullPageScroll } from '@/components/FullPageScroll'
import dynamic from 'next/dynamic'
import Giscus from '@/components/Giscus'

// 动态导入组件
const MatrixRain = dynamic(() => import('@/components/MatrixRain'), {
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-black" />,
  ssr: false,
})

const AICreatePage = dynamic(() => import('@/components/AICreatePage'), {
  loading: () => <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black">Loading...</div>,
  ssr: false,
})

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')

  const content = {
    en: {
      hero: {
        title: 'Building the Future',
        subtitle: 'Beyond the Universe',
        mission: 'Taking Humanity Beyond the Universe',
      },
      intro: {
        text: 'Pioneering technology that enables humanity\'s cosmic exploration, scalable, and inevitable.',
      },
      whatIDo: {
        title: 'WHAT I DO',
        items: [
          { number: '01', title: 'AI Automation', desc: 'Building intelligent agents with OpenClaw', icon: '🤖' },
          { number: '02', title: 'Quantitative Trading', desc: 'Developing profitable trading strategies', icon: '📈' },
          { number: '03', title: 'AI Creation', desc: 'Advanced image and video generation', icon: '🎨' },
          { number: '04', title: 'Web3 Development', desc: 'Creating decentralized applications', icon: '🌐' },
          { number: '05', title: 'Meme Coin Trading', desc: 'Early opportunities in crypto', icon: '🚀' },
        ],
      },
      projects: {
        title: 'ACTIVE PROJECTS',
        items: [
          {
            number: '01',
            title: 'AI Creative Workshop',
            desc: 'Generate stunning images and videos with advanced AI models',
            tags: ['Image Generation', 'AI', 'Creative Tools'],
            icon: '🎬',
          },
          {
            number: '02',
            title: 'Trading Bot',
            desc: 'Automated quantitative trading with real-time profit generation',
            tags: ['Trading', 'Automation', 'Crypto'],
            icon: '💹',
          },
          {
            number: '03',
            title: 'OpenClaw Services',
            desc: 'Professional AI automation and custom integration services',
            tags: ['Automation', 'AI', 'Custom'],
            icon: '⚙️',
          },
        ],
      },
      roadmap: {
        title: 'MISSION ROADMAP',
        subtitle: 'Building the path to transcend the universe',
        phases: [
          {
            number: '01',
            phase: 'Capital Accumulation',
            period: '2024-2030',
            status: 'Current Phase',
            items: ['Build wealth through multiple streams', 'AI & trading automation', 'Web3 innovation', 'Market dominance'],
          },
          {
            number: '02',
            phase: 'Space & Technology',
            period: '2030-2040',
            status: 'Next Phase',
            items: ['Private space infrastructure', 'Advanced AI research', 'Quantum computing', 'Dimensional exploration'],
          },
          {
            number: '03',
            phase: 'Universal Transcendence',
            period: '2040+',
            status: 'Ultimate Goal',
            items: ['Multiverse exploration', 'Consciousness digitization', 'Dimensional ascension', 'Cosmic civilization'],
          },
        ],
      },
      contact: {
        title: 'CONNECT',
        items: [
          { name: 'X (Twitter)', link: 'https://x.com/shawnwick960', icon: '𝕏' },
          { name: 'Telegram', link: 'https://t.me/shawick', icon: '✈️' },
          { name: 'Email', link: 'mailto:shawnwick7499@gmail.com', icon: '✉️' },
          { name: 'GitHub', link: 'https://github.com/shawn7499', icon: '💻' },
          { name: 'WeChat', link: null, icon: '💬', wechat: 'shawnwick' },
        ],
      },
    },
    zh: {
      hero: {
        title: '构建未来',
        subtitle: '超越宇宙',
        mission: '让人类超越宇宙',
      },
      intro: {
        text: '开创技术，让人类的宇宙探索成为可能、可扩展和必然。',
      },
      whatIDo: {
        title: '我的专长',
        items: [
          { number: '01', title: 'AI 自动化', desc: '使用 OpenClaw 构建智能代理', icon: '🤖' },
          { number: '02', title: '量化交易', desc: '开发盈利交易策略', icon: '📈' },
          { number: '03', title: 'AI 创意', desc: '高级图像和视频生成', icon: '🎨' },
          { number: '04', title: 'Web3 开发', desc: '创建去中心化应用', icon: '🌐' },
          { number: '05', title: '币种交易', desc: '捕捉加密市场机会', icon: '🚀' },
        ],
      },
      projects: {
        title: '活跃项目',
        items: [
          {
            number: '01',
            title: 'AI 创意工坊',
            desc: '使用先进 AI 模型生成令人惊叹的图像和视频',
            tags: ['图像生成', 'AI', '创意工具'],
            icon: '🎬',
          },
          {
            number: '02',
            title: '交易机器人',
            desc: '自动化量化交易，实时盈利生成',
            tags: ['交易', '自动化', '加密'],
            icon: '💹',
          },
          {
            number: '03',
            title: 'OpenClaw 服务',
            desc: '专业 AI 自动化和自定义集成服务',
            tags: ['自动化', 'AI', '定制'],
            icon: '⚙️',
          },
        ],
      },
      roadmap: {
        title: '使命路线图',
        subtitle: '构建超越宇宙的路径',
        phases: [
          {
            number: '01',
            phase: '资本积累',
            period: '2024-2030',
            status: '当前阶段',
            items: ['通过多种渠道建立财富', 'AI 和交易自动化', 'Web3 创新', '市场主导'],
          },
          {
            number: '02',
            phase: '空间与技术',
            period: '2030-2040',
            status: '下一阶段',
            items: ['私人空间基础设施', '先进 AI 研究', '量子计算', '维度探索'],
          },
          {
            number: '03',
            phase: '宇宙超越',
            period: '2040+',
            status: '终极目标',
            items: ['多元宇宙探索', '意识数字化', '维度升华', '宇宙文明'],
          },
        ],
      },
      contact: {
        title: '联系我',
        items: [
          { name: 'X (Twitter)', link: 'https://x.com/shawnwick960', icon: '𝕏' },
          { name: 'Telegram', link: 'https://t.me/shawick', icon: '✈️' },
          { name: '邮箱', link: 'mailto:shawnwick7499@gmail.com', icon: '✉️' },
          { name: 'GitHub', link: 'https://github.com/shawn7499', icon: '💻' },
          { name: '微信', link: null, icon: '💬', wechat: 'shawnwick' },
        ],
      },
    },
  }

  const t = content[lang]

  // 星空背景组件
  const StarryBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )

  const sections = [
    // Hero Section
    <div key="hero" className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <StarryBackground />
      <MatrixRain />
      
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 bg-gradient-to-b from-black to-transparent">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            WICK
          </motion.div>
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="px-4 py-2 border border-cyan-400/50 hover:border-cyan-400 text-cyan-400 rounded-lg transition-all hover:bg-cyan-400/10 text-sm md:text-base font-semibold"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t.hero.title}
          </span>
        </motion.h1>
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {t.hero.subtitle}
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-cyan-400 text-cyan-400 text-base md:text-xl font-bold rounded-lg mb-12 hover:bg-cyan-400/10 transition-all"
        >
          {t.hero.mission}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          {t.intro.text}
        </motion.p>
      </motion.div>
    </div>,

    // What I Do Section
    <div key="what-i-do" className="min-h-screen flex items-center justify-center px-6 relative bg-gradient-to-b from-black via-slate-900 to-black py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="text-cyan-400 text-sm font-bold mb-4 uppercase tracking-widest">/// {t.whatIDo.title}</div>
          <h2 className="text-5xl md:text-6xl font-black text-white">What I Do</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whatIDo.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group glass-effect p-8 rounded-xl hover:border-cyan-400 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-cyan-400 text-sm font-bold mb-3">/{item.number}</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,

    // AI Create Section
    <AICreatePage />,

    // Projects Section
    <div key="projects" className="min-h-screen flex items-center justify-center px-6 relative bg-gradient-to-b from-black via-slate-900 to-black py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="text-cyan-400 text-sm font-bold mb-4 uppercase tracking-widest">/// {t.projects.title}</div>
          <h2 className="text-5xl md:text-6xl font-black text-white">Active Projects</h2>
        </motion.div>
        <div className="space-y-8">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group glass-effect p-8 md:p-12 rounded-xl hover:border-cyan-400 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-6xl">{project.icon}</div>
                <div className="flex-1">
                  <div className="text-cyan-400 text-sm font-bold mb-2">/{project.number}</div>
                  <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 border border-cyan-400/50 text-cyan-400 text-sm rounded-lg group-hover:border-cyan-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-cyan-400 text-3xl">→</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,

    // Roadmap Section
    <div key="roadmap" className="min-h-screen flex items-center justify-center px-6 relative bg-gradient-to-b from-black via-slate-900 to-black py-20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="text-cyan-400 text-sm font-bold mb-4 uppercase tracking-widest">/// {t.roadmap.title}</div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Mission Roadmap</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.roadmap.subtitle}</p>
        </motion.div>
        <div className="space-y-8">
          {t.roadmap.phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass-effect p-8 md:p-12 rounded-xl border-l-4 border-cyan-400 hover:border-cyan-300 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="text-7xl font-black text-cyan-400/30 mb-4">{phase.number}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">{phase.phase}</h3>
                  <div className="text-gray-400 mb-3">{phase.period}</div>
                  <div className="inline-block px-4 py-2 bg-cyan-400/20 text-cyan-400 rounded-lg text-sm font-bold">
                    {phase.status}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,

    // Contact Section
    <div key="contact" className="h-screen flex items-center justify-center px-6 relative bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="container mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-cyan-400 text-sm font-bold mb-6 uppercase tracking-widest">/// {t.contact.title}</div>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-16">Let\'s Connect</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {t.contact.items.map((item, index) =>
              item.link ? (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="glass-effect p-8 text-center rounded-xl group hover:border-cyan-400 transition-all"
                >
                  <span className="text-5xl block mb-3">{item.icon}</span>
                  <div className="text-sm font-bold text-gray-300 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect p-8 text-center rounded-xl group cursor-pointer hover:border-cyan-400 transition-all"
                  title={item.wechat}
                >
                  <span className="text-5xl block mb-3">{item.icon}</span>
                  <div className="text-sm font-bold text-gray-300">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-2">{item.wechat}</div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>,
  ]

  return <FullPageScroll sections={sections} />
}
