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
        ],
      },
      contact: {
        title: 'Get In Touch',
        telegram: 'Telegram',
        email: 'Email',
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
        ],
      },
      contact: {
        title: '联系我',
        telegram: 'Telegram',
        email: '邮箱',
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
          
          <div className="grid md:grid-cols-3 gap-8">
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
                  <p className="text-gray-400">{item.desc}</p>
                </div>
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
          
          <div className="flex gap-6 justify-center">
            <motion.a
              href="https://t.me/shawick"
              target="_blank"
              whileHover={{ scale: 1.1 }}
              className="px-8 py-4 glass rounded-lg hover:bg-neon-green/10 transition-all"
            >
              {t.contact.telegram}
            </motion.a>
            <motion.a
              href="mailto:your@email.com"
              whileHover={{ scale: 1.1 }}
              className="px-8 py-4 glass rounded-lg hover:bg-neon-purple/10 transition-all"
            >
              {t.contact.email}
            </motion.a>
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
