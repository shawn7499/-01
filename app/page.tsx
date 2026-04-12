'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const AICreatePage = dynamic(() => import('@/components/AICreatePage'), {
  ssr: false,
})

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')

  const content = {
    en: {
      hero: { title: 'Building the Future', subtitle: 'Beyond the Universe' },
      whatIDo: {
        title: 'What I Do',
        items: [
          { number: '01', title: 'AI Automation', desc: 'Building intelligent agents with OpenClaw' },
          { number: '02', title: 'Quantitative Trading', desc: 'Developing profitable trading strategies' },
          { number: '03', title: 'AI Creation', desc: 'Advanced image and video generation' },
          { number: '04', title: 'Web3 Development', desc: 'Creating decentralized applications' },
          { number: '05', title: 'Meme Coin Trading', desc: 'Early opportunities in crypto' },
        ],
      },
      projects: {
        title: 'Active Projects',
        items: [
          { number: '01', title: 'AI Creative Workshop', desc: 'Generate stunning images and videos with advanced AI models' },
          { number: '02', title: 'Trading Bot', desc: 'Automated quantitative trading with real-time profit generation' },
          { number: '03', title: 'OpenClaw Services', desc: 'Professional AI automation and custom integration services' },
        ],
      },
      roadmap: {
        title: 'Mission Roadmap',
        phases: [
          { number: '01', phase: 'Capital Accumulation', period: '2024-2030', items: ['Build wealth through multiple streams', 'AI & trading automation', 'Web3 innovation', 'Market dominance'] },
          { number: '02', phase: 'Space & Technology', period: '2030-2040', items: ['Private space infrastructure', 'Advanced AI research', 'Quantum computing', 'Dimensional exploration'] },
          { number: '03', phase: 'Universal Transcendence', period: '2040+', items: ['Multiverse exploration', 'Consciousness digitization', 'Dimensional ascension', 'Cosmic civilization'] },
        ],
      },
      contact: {
        title: 'Connect',
        items: [
          { name: 'X', link: 'https://x.com/shawnwick960', icon: '𝕏' },
          { name: 'Telegram', link: 'https://t.me/shawick', icon: '✈️' },
          { name: 'Email', link: 'mailto:shawnwick7499@gmail.com', icon: '✉️' },
          { name: 'GitHub', link: 'https://github.com/shawn7499', icon: '💻' },
          { name: 'WeChat', icon: '💬', wechat: 'shawnwick' },
        ],
      },
    },
    zh: {
      hero: { title: '构建未来', subtitle: '超越宇宙' },
      whatIDo: {
        title: '我的专长',
        items: [
          { number: '01', title: 'AI 自动化', desc: '使用 OpenClaw 构建智能代理' },
          { number: '02', title: '量化交易', desc: '开发盈利交易策略' },
          { number: '03', title: 'AI 创意', desc: '高级图像和视频生成' },
          { number: '04', title: 'Web3 开发', desc: '创建去中心化应用' },
          { number: '05', title: '币种交易', desc: '捕捉加密市场机会' },
        ],
      },
      projects: {
        title: '活跃项目',
        items: [
          { number: '01', title: 'AI 创意工坊', desc: '使用先进 AI 模型生成令人惊叹的图像和视频' },
          { number: '02', title: '交易机器人', desc: '自动化量化交易，实时盈利生成' },
          { number: '03', title: 'OpenClaw 服务', desc: '专业 AI 自动化和自定义集成服务' },
        ],
      },
      roadmap: {
        title: '使命路线图',
        phases: [
          { number: '01', phase: '资本积累', period: '2024-2030', items: ['通过多种渠道建立财富', 'AI 和交易自动化', 'Web3 创新', '市场主导'] },
          { number: '02', phase: '空间与技术', period: '2030-2040', items: ['私人空间基础设施', '先进 AI 研究', '量子计算', '维度探索'] },
          { number: '03', phase: '宇宙超越', period: '2040+', items: ['多元宇宙探索', '意识数字化', '维度升华', '宇宙文明'] },
        ],
      },
      contact: {
        title: '联系我',
        items: [
          { name: 'X', link: 'https://x.com/shawnwick960', icon: '𝕏' },
          { name: 'Telegram', link: 'https://t.me/shawick', icon: '✈️' },
          { name: '邮箱', link: 'mailto:shawnwick7499@gmail.com', icon: '✉️' },
          { name: 'GitHub', link: 'https://github.com/shawn7499', icon: '💻' },
          { name: '微信', icon: '💬', wechat: 'shawnwick' },
        ],
      },
    },
  }

  const t = content[lang]
  const backgroundImages = [
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1462332420958-a05d1e7413e3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop',
  ]

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* 固定导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 bg-black/40 backdrop-blur-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl md:text-3xl font-black tracking-widest">WICK</div>
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="px-4 py-2 border border-white/30 hover:border-white text-white rounded text-sm font-medium transition-all"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Hero Section - 高质量宇宙背景 */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* 暗色覆盖层 */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* 内容 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight tracking-tighter">
            {t.hero.title}
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-12 text-white/80 tracking-wide">
            {t.hero.subtitle}
          </h2>
        </motion.div>
      </section>

      {/* What I Do Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 py-20 relative"
        style={{
          backgroundImage: `url(${backgroundImages[1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">{t.whatIDo.title}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.whatIDo.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="text-sm font-bold mb-4 text-white/50 group-hover:text-white/70 transition-colors">{item.number}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white/90 transition-colors">{item.title}</h3>
                <p className="text-white/60 leading-relaxed group-hover:text-white/75 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Workshop */}
      <AICreatePage />

      {/* Projects Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 py-20 relative"
        style={{
          backgroundImage: `url(${backgroundImages[2]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">{t.projects.title}</h2>
          </motion.div>
          <div className="space-y-12">
            {t.projects.items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-md p-12 rounded border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="text-sm font-bold mb-4 text-white/50 group-hover:text-white/70 transition-colors">{project.number}</div>
                <h3 className="text-4xl font-bold mb-6 group-hover:text-white/90 transition-colors">{project.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed group-hover:text-white/75 transition-colors">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 py-20 relative"
        style={{
          backgroundImage: `url(${backgroundImages[3]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">{t.roadmap.title}</h2>
          </motion.div>
          <div className="space-y-12">
            {t.roadmap.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-md p-12 rounded border border-white/10 border-l-2 hover:border-l-white hover:border-white/30 transition-all group"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-5xl font-black text-white/20 mb-4 group-hover:text-white/30 transition-colors">{phase.number}</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white/90 transition-colors">{phase.phase}</h3>
                    <p className="text-white/50 group-hover:text-white/70 transition-colors">{phase.period}</p>
                  </div>
                  <div className="md:col-span-2">
                    <ul className="space-y-4">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-white/60 group-hover:text-white/75 transition-colors">
                          <span className="mt-1 flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-black">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-20">{t.contact.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {t.contact.items.map((item, index) =>
                item.link ? (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-8 border border-white/20 hover:border-white/60 rounded transition-all group"
                  >
                    <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{item.name}</div>
                  </motion.a>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 border border-white/20 hover:border-white/60 rounded transition-all group cursor-pointer"
                    title={item.wechat}
                  >
                    <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <div className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{item.name}</div>
                    <div className="text-xs text-white/30 mt-2">{item.wechat}</div>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outro - 首尾呼应 */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImages[4]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">The Future is Now</h3>
          <p className="text-xl md:text-2xl text-white/70 font-light">Building the path beyond the universe</p>
        </motion.div>
      </section>
    </div>
  )
}
