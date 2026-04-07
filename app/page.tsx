'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FullPageScroll } from '@/components/FullPageScroll'
import MatrixRain from '@/components/MatrixRain'
import Giscus from '@/components/Giscus'

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')

  const content = {
    en: {
      hero: {
        title: 'Building the future',
        subtitle: 'beyond the universe',
        mission: 'Taking Humanity Beyond the Universe',
      },
      intro: {
        text: 'Building technology that makes humanity\'s cosmic exploration possible, scalable, and inevitable.',
      },
      whatIDo: {
        title: 'WHAT I DO',
        items: [
          { number: '01', title: 'AI Automation', desc: 'Building intelligent agents with OpenClaw' },
          { number: '02', title: 'Quantitative Trading', desc: 'Developing profitable trading strategies' },
          { number: '03', title: 'Web3 Development', desc: 'Creating decentralized applications' },
          { number: '04', title: 'Meme Coin Trading', desc: 'Caught Trump 7u→65u, early WLFI investor', status: 'Waiting for opportunities' },
          { number: '05', title: 'Prediction Market Bot', desc: 'Automated monitoring for Polymarket', status: 'In Development' },
        ],
      },
      projects: {
        title: 'ACTIVE PROJECTS',
        items: [
          {
            number: '01',
            title: 'Gold Quantitative Trading',
            desc: 'Sustainable compound interest strategy for long-term wealth accumulation.',
            tags: ['Quantitative', 'Compound Interest', 'Long-term'],
            link: 'https://smartgold.ai/dashboard?inviteCode=J5n5Rv',
          },
          {
            number: '02',
            title: 'OpenClaw Automation',
            desc: 'Full personalization services including token provision, installation, and maintenance.',
            tags: ['OpenClaw', 'Automation', 'Custom Service'],
            link: null,
          },
          {
            number: '03',
            title: 'Web3 Development',
            desc: 'Professional Web3 website design and development services.',
            tags: ['Web3', 'Next.js', 'Custom Design'],
            link: null,
          },
        ],
      },
      roadmap: {
        title: 'MISSION ROADMAP',
        subtitle: 'Born 1998 - Mission: Enable humanity to transcend the universe',
        phases: [
          {
            number: '01',
            phase: 'Capital Accumulation',
            period: '2024-2030',
            status: 'Current Phase',
            items: ['Build wealth through Web3 & Web4', 'Quantitative trading strategies', 'OpenClaw automation services', 'Multiple revenue streams'],
          },
          {
            number: '02',
            phase: 'Parallel Execution',
            period: '2030+',
            status: 'Three Missions',
            items: ['Space Empire: Private space infrastructure', 'Molecular Revolution: Zero-waste civilization', 'Digital Immortality: Mind uploading/downloading'],
          },
          {
            number: '03',
            phase: 'Ultimate Goal',
            period: 'Lifetime',
            status: 'Grand Vision',
            items: ['Enable humanity to transcend the universe', 'Break through dimensional limitations', 'Achieve true cosmic exploration'],
          },
        ],
      },
      contact: {
        title: 'CONNECT',
        items: [
          { name: 'X (Twitter)', link: 'https://x.com/shawnwick960', icon: '𝕏' },
          { name: 'Telegram', link: 'https://t.me/shawick', icon: '✈️' },
          { name: 'Email', link: 'mailto:sahwnwick7499@gmail.com', icon: '✉️' },
          { name: 'GitHub', link: 'https://github.com/shawn7499', icon: '💻' },
          { name: 'WeChat', link: null, icon: '💬', wechat: 'shawnwick' },
        ],
      },
    },
    zh: {
      hero: {
        title: '构建未来',
        subtitle: '超越宇宙',
        mission: '让人类走出宇宙',
      },
      intro: {
        text: '构建让人类宇宙探索成为可能、可扩展且不可避免的技术。',
      },
      whatIDo: {
        title: '我正在做的',
        items: [
          { number: '01', title: 'AI 自动化', desc: '使用 OpenClaw 构建智能代理' },
          { number: '02', title: '量化交易', desc: '开发盈利的交易策略' },
          { number: '03', title: 'Web3 开发', desc: '创建去中心化应用' },
          { number: '04', title: 'Meme 币交易', desc: '抓住 Trump 7u→65u，WLFI 早期投资者', status: '等待机会' },
          { number: '05', title: '预测市场机器人', desc: 'Polymarket 自动监控', status: '开发中' },
        ],
      },
      projects: {
        title: '活跃项目',
        items: [
          {
            number: '01',
            title: '黄金量化交易',
            desc: '可持续的复利策略，用于长期财富积累。',
            tags: ['量化交易', '复利', '长期策略'],
            link: 'https://smartgold.ai/dashboard?inviteCode=J5n5Rv',
          },
          {
            number: '02',
            title: 'OpenClaw 自动化',
            desc: '全方位个性化服务，包括代币供应、安装和维护。',
            tags: ['OpenClaw', '自动化', '定制服务'],
            link: null,
          },
          {
            number: '03',
            title: 'Web3 开发',
            desc: '专业的 Web3 网站设计和开发服务。',
            tags: ['Web3', 'Next.js', '定制设计'],
            link: null,
          },
        ],
      },
      roadmap: {
        title: '使命路线图',
        subtitle: '生于 1998 - 使命：让人类超越宇宙',
        phases: [
          {
            number: '01',
            phase: '资本积累',
            period: '2024-2030',
            status: '当前阶段',
            items: ['通过 Web3 和 Web4 积累财富', '量化交易策略', 'OpenClaw 自动化服务', '多元化收入来源'],
          },
          {
            number: '02',
            phase: '并行执行',
            period: '2030+',
            status: '三大使命',
            items: ['太空帝国：私人太空基础设施', '分子革命：零浪费文明', '数字永生：意识上传/下载'],
          },
          {
            number: '03',
            phase: '终极目标',
            period: '终生',
            status: '宏伟愿景',
            items: ['让人类超越宇宙', '突破维度限制', '实现真正的宇宙探索'],
          },
        ],
      },
      contact: {
        title: '联系方式',
        items: [
          { name: 'X (Twitter)', link: 'https://x.com/shawnwick960', icon: '𝕏' },
          { name: 'Telegram', link: 'https://t.me/shawick', icon: '✈️' },
          { name: '邮箱', link: 'mailto:sahwnwick7499@gmail.com', icon: '✉️' },
          { name: 'GitHub', link: 'https://github.com/shawn7499', icon: '💻' },
          { name: '微信', link: null, icon: '💬', wechat: 'shawnwick' },
        ],
      },
    },
  }

  const t = content[lang]

  // 定义所有页面区块
  const sections = [
    // Section 1: Hero
    <div key="hero" className="h-screen flex items-center justify-center px-6 relative">
      <MatrixRain />
      
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold">SHAWN WICK</div>
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="px-3 py-1 md:px-4 md:py-2 border border-white/20 hover:border-[#00ff88] transition-colors text-sm md:text-base"
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
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 leading-tight">
          {t.hero.title}
        </h1>
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-12 leading-tight">
          {t.hero.subtitle}
        </h2>
        <div className="inline-block px-4 md:px-6 py-2 md:py-3 border border-[#00ff88] text-[#00ff88] text-base md:text-xl mb-12">
          {t.hero.mission}
        </div>
        <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {t.intro.text}
        </p>
      </motion.div>
    </div>,

    // Section 2: What I Do
    <div key="what-i-do" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="container mx-auto max-w-6xl py-20">
        <div className="text-sm text-gray-500 mb-16">/// {t.whatIDo.title}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.whatIDo.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-white/10 hover:border-[#00ff88] transition-all duration-300 p-8 group"
            >
              <div className="text-sm text-gray-500 mb-4">[{item.number}]</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00ff88] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 mb-4">{item.desc}</p>
              {item.status && (
                <div className="text-sm text-[#00ff88] border border-[#00ff88]/30 px-3 py-1 inline-block">
                  {item.status}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>,

    // Section 3: Projects
    <div key="projects" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="container mx-auto max-w-6xl py-20">
        <div className="text-sm text-gray-500 mb-4">/// {t.projects.title}</div>
        <div className="space-y-8">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0, x: -50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <a
                href={project.link || '#'}
                target={project.link ? '_blank' : undefined}
                rel={project.link ? 'noopener noreferrer' : undefined}
                className={`block border border-white/10 p-8 md:p-12 hover:border-[#00ff88] transition-all ${
                  project.link ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex justify-between items-start gap-8">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-4">[{project.number}]</div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-[#00ff88] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 text-lg">{project.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 border border-white/20 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.link && (
                    <div className="text-[#00ff88] text-2xl">→</div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,

    // Section 4: Roadmap
    <div key="roadmap" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="container mx-auto max-w-6xl py-20">
        <div className="text-sm text-gray-500 mb-4">/// {t.roadmap.title}</div>
        <p className="text-xl text-gray-400 mb-16">{t.roadmap.subtitle}</p>
        <div className="space-y-8">
          {t.roadmap.phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateX: -15 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="border border-white/10 p-8 md:p-12 hover:border-[#00ff88] transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="text-6xl font-bold text-[#00ff88] mb-4"
                  >
                    [{phase.number}]
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">{phase.phase}</h3>
                  <div className="text-gray-500 mb-2">{phase.period}</div>
                  <div className="text-sm text-[#00ff88] border border-[#00ff88]/30 px-3 py-1 inline-block">
                    {phase.status}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 + i * 0.1 }}
                        className="flex items-start gap-3 text-gray-400"
                      >
                        <span className="text-[#00ff88] mt-1">→</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,

    // Section 5: Contact
    <div key="contact" className="h-screen flex items-center justify-center px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-sm text-gray-500 mb-8">/// {t.contact.title}</div>
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="border border-white/10 hover:border-[#00ff88] p-8 text-center transition-all group"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <div className="text-sm font-bold group-hover:text-[#00ff88] transition-colors">
                  {item.name}
                </div>
              </motion.a>
            ) : (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-white/10 p-8 text-center"
                title={item.wechat}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <div className="text-sm font-bold">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">{item.wechat}</div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>,
  ]

  return <FullPageScroll sections={sections} />
}
