'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MatrixRain from '../components/MatrixRain'

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')

  const content = {
    en: {
      hero: {
        name: 'Shawn Wick',
        tagline: 'Building the Future',
        mission: 'Taking Humanity Beyond the Universe',
        subtitle: 'Web3 Developer | AI Enthusiast | Trader',
        cta1: 'Enter',
        cta2: 'Contact',
      },
      roadmap: {
        title: 'Mission Roadmap',
        subtitle: 'Born 1998 - Mission: Enable humanity to transcend the universe',
        phases: [
          {
            phase: 'Phase 1: Capital Accumulation',
            period: '2024-2030',
            items: [
              'Build wealth through Web3 & Web4 technologies',
              'Establish multiple revenue streams',
              'Create sustainable passive income',
            ],
          },
          {
            phase: 'Phase 2: Space Empire',
            period: '2030-2040',
            items: [
              'Launch rocket company',
              'Build private space infrastructure',
              'Establish orbital operations',
            ],
          },
          {
            phase: 'Phase 3: Molecular Revolution',
            period: '2040-2050',
            items: [
              'Develop molecular-level recycling technology',
              'Achieve zero-waste civilization',
              'Master matter reconstruction',
            ],
          },
          {
            phase: 'Phase 4: Digital Immortality',
            period: '2050+',
            items: [
              'Mind uploading & downloading technology',
              'Virtual world eternal existence',
              'Continuous innovation in digital realm',
            ],
          },
        ],
      },
      projects: {
        title: 'Active Projects',
        items: [
          {
            title: 'Gold Quantitative Trading',
            desc: 'First project tested for over 2 years with highest annual returns. Sustainable compound interest strategy for long-term growth.',
            tech: ['Quantitative Trading', 'Compound Interest', 'Long-term Strategy'],
            link: 'https://smartgold.ai/dashboard?inviteCode=J5n5Rv',
          },
          {
            title: 'OpenClaw Custom Automation',
            desc: 'Full OpenClaw personalization services including low-cost token provision, installation, and ongoing maintenance. Monthly subscription available.',
            tech: ['OpenClaw', 'Automation', 'Custom Service'],
            link: null,
          },
          {
            title: 'Web3 Website Development',
            desc: 'Professional Web3 website design and development services. Custom solutions tailored to your needs.',
            tech: ['Web3', 'Next.js', 'Custom Design'],
            link: null,
          },
        ],
      },
      about: {
        title: 'What I Do',
        items: [
          {
            title: 'AI Automation',
            desc: 'Building intelligent agents with OpenClaw',
          },
          {
            title: 'Quantitative Trading',
            desc: 'Developing profitable trading strategies',
          },
          {
            title: 'Web3 Development',
            desc: 'Creating decentralized applications',
          },
          {
            title: 'Meme Coin Trading',
            desc: 'Caught Trump 7u→65u, early WLFI investor, already profitable',
            status: 'Waiting for opportunities',
          },
          {
            title: 'Prediction Market Bot',
            desc: 'Developing automated monitoring bot for Polymarket and prediction markets',
            status: 'In Development',
          },
        ],
      },
      contact: {
        title: 'Get In Touch',
        items: [
          { name: 'X (Twitter)', icon: '𝕏', link: 'https://x.com/shawnwick960' },
          { name: 'Telegram', icon: '✈️', link: 'https://t.me/shawick' },
          { name: 'Email', icon: '✉️', link: 'mailto:sahwnwick7499@gmail.com' },
          { name: 'GitHub', icon: '💻', link: 'https://github.com/shawn7499' },
          { name: 'WeChat', icon: '💬', link: null, wechat: 'shawnwick' },
        ],
      },
    },
    zh: {
      hero: {
        name: 'Shawn Wick',
        tagline: '构建未来',
        mission: '让人类走出宇宙',
        subtitle: 'Web3 开发者 | AI 爱好者 | 交易员',
        cta1: '进入',
        cta2: '联系我',
      },
      roadmap: {
        title: '使命路线图',
        subtitle: '生于 1998 - 使命：实现人类超越宇宙的思想启蒙',
        phases: [
          {
            phase: '第一阶段：资本积累',
            period: '2024-2030',
            items: [
              '通过 Web3 和 Web4 技术积累财富',
              '建立多元化收入渠道',
              '创建可持续被动收入',
            ],
          },
          {
            phase: '第二阶段：太空帝国',
            period: '2030-2040',
            items: [
              '创办火箭公司',
              '建设私人太空基础设施',
              '建立轨道运营系统',
            ],
          },
          {
            phase: '第三阶段：分子革命',
            period: '2040-2050',
            items: [
              '开发分子级别回收技术',
              '实现零垃圾文明',
              '掌握物质重组技术',
            ],
          },
          {
            phase: '第四阶段：数字永生',
            period: '2050+',
            items: [
              '思维上传与下载技术',
              '虚拟世界永恒存在',
              '数字领域持续创新',
            ],
          },
        ],
      },
      projects: {
        title: '正在运行项目',
        items: [
          {
            title: '黄金量化交易',
            desc: '首个测试超过2年的项目，年化收益最高。可持续复利投入，长期稳定增长策略。',
            tech: ['量化交易', '复利', '长期策略'],
            link: 'https://smartgold.ai/dashboard?inviteCode=J5n5Rv',
          },
          {
            title: 'OpenClaw 自动化个性定制',
            desc: '提供 OpenClaw 全方位个性化定制服务，包括低价 token 提供、安装服务和后期维护。按月订阅，欢迎联系。',
            tech: ['OpenClaw', '自动化', '定制服务'],
            link: null,
          },
          {
            title: 'Web3 网站制作',
            desc: '专业 Web3 网站设计与开发服务，根据您的需求量身定制解决方案。',
            tech: ['Web3', 'Next.js', '定制设计'],
            link: null,
          },
        ],
      },
      about: {
        title: '我在做什么',
        items: [
          {
            title: 'AI 自动化',
            desc: '使用 OpenClaw 构建智能代理',
          },
          {
            title: '量化交易',
            desc: '开发盈利的交易策略',
          },
          {
            title: 'Web3 开发',
            desc: '创建去中心化应用',
          },
          {
            title: '土狗交易',
            desc: '曾在 Trump 代币 7u→65u 获利，WLFI 早期投资者已回本',
            status: '机会等待中',
          },
          {
            title: '预测市场机器人',
            desc: '开发 Polymarket 等预测市场自动监控机器人',
            status: '开发中',
          },
        ],
      },
      contact: {
        title: '联系我',
        items: [
          { name: 'X (Twitter)', icon: '𝕏', link: 'https://x.com/shawnwick960' },
          { name: 'Telegram', icon: '✈️', link: 'https://t.me/shawick' },
          { name: '邮箱', icon: '✉️', link: 'mailto:sahwnwick7499@gmail.com' },
          { name: 'GitHub', icon: '💻', link: 'https://github.com/shawn7499' },
          { name: '微信', icon: '💬', link: null, wechat: 'shawnwick' },
        ],
      },
    },
  }

  const t = content[lang]

  return (
    <main className="min-h-screen bg-dark-bg text-white relative">
      {/* 黑客帝国代码雨背景 */}
      <MatrixRain />
      {/* 语言切换 */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          className="glass px-4 py-2 rounded-lg hover:bg-neon-green/10 transition-all"
        >
          {lang === 'en' ? '中文' : 'EN'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-8xl font-bold mb-4 neon-text">{t.hero.name}</h1>
          <p className="text-4xl mb-4 text-gray-400">{t.hero.tagline}</p>
          <p className="text-2xl mb-6 text-neon-purple font-semibold">{t.hero.mission}</p>
          <p className="text-xl mb-12 text-gray-500">{t.hero.subtitle}</p>
          
          <div className="flex gap-4 justify-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-green text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-neon-green/50 transition-all"
            >
              {t.hero.cta1}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              {t.hero.cta2}
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Projects Section - 移到前面 */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-16 text-center"
          >
            {t.projects.title}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.items.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => project.link && window.open(project.link, '_blank')}
                className={`glass rounded-xl p-6 hover:border-neon-green/50 transition-all ${
                  project.link ? 'cursor-pointer' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <div className="mt-4 text-neon-green text-sm">
                    {lang === 'en' ? 'Click to visit →' : '点击访问 →'}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-16 text-center"
          >
            {t.about.title}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {t.about.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="gradient-border"
              >
                <div className="gradient-border-content">
                  <h3 className="text-2xl font-bold mb-4 text-neon-green">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mb-3">{item.desc}</p>
                  {item.status && (
                    <span className="inline-block px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs">
                      {item.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">{t.roadmap.title}</h2>
            <p className="text-xl text-neon-purple">{t.roadmap.subtitle}</p>
          </motion.div>
          
          <div className="space-y-8">
            {t.roadmap.phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass rounded-xl p-8 hover:border-neon-green/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h3 className="text-3xl font-bold text-neon-green mb-2 md:mb-0">
                    {phase.phase}
                  </h3>
                  <span className="text-xl text-neon-purple">{phase.period}</span>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-300">
                      <span className="text-neon-green mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-12"
          >
            {t.contact.title}
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {t.contact.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass rounded-xl p-6 hover:bg-neon-green/10 transition-all flex flex-col items-center gap-3"
                  >
                    <span className="text-4xl">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </a>
                ) : (
                  <div className="glass rounded-xl p-6 hover:bg-neon-purple/10 transition-all flex flex-col items-center gap-3 cursor-pointer">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                    {item.wechat && (
                      <span className="text-xs text-gray-500">{item.wechat}</span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-800 relative z-10">
        <p>© 2026 Wick. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </main>
  )
}
