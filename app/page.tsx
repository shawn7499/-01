'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Giscus from '../components/Giscus'

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')

  const content = {
    en: {
      hero: {
        title: 'Permissionless infrastructure',
        subtitle: 'for a better world',
        mission: 'Taking Humanity Beyond the Universe',
      },
      intro: {
        text: 'Building technology that makes humanity\'s cosmic exploration possible, scalable, and inevitable.',
      },
      projects: {
        title: 'PROJECTS',
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
            items: [
              'Build wealth through Web3 & Web4',
              'Quantitative trading strategies',
              'OpenClaw automation services',
              'Multiple revenue streams',
            ],
          },
          {
            number: '02',
            phase: 'Parallel Execution',
            period: '2030+',
            status: 'Three Missions',
            items: [
              'Space Empire: Private space infrastructure',
              'Molecular Revolution: Zero-waste civilization',
              'Digital Immortality: Mind uploading/downloading',
            ],
          },
          {
            number: '03',
            phase: 'Ultimate Goal',
            period: 'Lifetime',
            status: 'Grand Vision',
            items: [
              'Enable humanity to transcend the universe',
              'Break through dimensional limitations',
              'Achieve true cosmic exploration',
            ],
          },
        ],
      },
      stats: {
        items: [
          { label: 'Years of Experience', value: '5+' },
          { label: 'Projects Completed', value: '20+' },
          { label: 'Trading ROI', value: '100x' },
        ],
      },
      contact: {
        title: 'Connect',
        items: [
          { name: 'X (Twitter)', link: 'https://x.com/shawnwick960' },
          { name: 'Telegram', link: 'https://t.me/shawick' },
          { name: 'Email', link: 'mailto:sahwnwick7499@gmail.com' },
          { name: 'GitHub', link: 'https://github.com/shawn7499' },
        ],
      },
    },
    zh: {
      hero: {
        title: '无需许可的基础设施',
        subtitle: '为了更美好的世界',
        mission: '让人类走出宇宙',
      },
      intro: {
        text: '构建让人类宇宙探索成为可能、可扩展且不可避免的技术。',
      },
      projects: {
        title: '项目',
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
            items: [
              '通过 Web3 & Web4 积累财富',
              '量化交易策略',
              'OpenClaw 自动化服务',
              '多元化收入来源',
            ],
          },
          {
            number: '02',
            phase: '并行执行',
            period: '2030+',
            status: '三大使命',
            items: [
              '太空帝国：私人太空基础设施',
              '分子革命：零废物文明',
              '数字永生：意识上传/下载',
            ],
          },
          {
            number: '03',
            phase: '终极目标',
            period: '终生',
            status: '宏伟愿景',
            items: [
              '让人类超越宇宙',
              '突破维度限制',
              '实现真正的宇宙探索',
            ],
          },
        ],
      },
      stats: {
        items: [
          { label: '经验年限', value: '5+' },
          { label: '完成项目', value: '20+' },
          { label: '交易回报', value: '100x' },
        ],
      },
      contact: {
        title: '联系',
        items: [
          { name: 'X (Twitter)', link: 'https://x.com/shawnwick960' },
          { name: 'Telegram', link: 'https://t.me/shawick' },
          { name: 'Email', link: 'mailto:sahwnwick7499@gmail.com' },
          { name: 'GitHub', link: 'https://github.com/shawn7499' },
        ],
      },
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">SHAWN WICK</div>
            <div className="flex gap-8 items-center">
              <a href="#projects" className="hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'Projects' : '项目'}
              </a>
              <a href="#roadmap" className="hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'Roadmap' : '路线图'}
              </a>
              <a href="#contact" className="hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'Contact' : '联系'}
              </a>
              <button
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="px-4 py-2 border border-white/20 rounded hover:border-[#00ff88] transition-colors"
              >
                {lang === 'en' ? '中文' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <h2 className="text-7xl md:text-9xl font-bold mb-12 leading-tight">
              {t.hero.subtitle}
            </h2>
            <div className="inline-block px-6 py-3 border border-[#00ff88] text-[#00ff88] text-xl mb-12">
              {t.hero.mission}
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.intro.text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm text-gray-500 mb-4">/// {t.projects.title}</div>
          
          <div className="space-y-8">
            {t.projects.items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <a
                  href={project.link || '#'}
                  target={project.link ? '_blank' : undefined}
                  rel={project.link ? 'noopener noreferrer' : undefined}
                  className="block border border-white/10 hover:border-[#00ff88] transition-all duration-300 p-12"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">[{project.number}]</div>
                      <h3 className="text-4xl font-bold mb-4 group-hover:text-[#00ff88] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                        {project.desc}
                      </p>
                      <div className="flex gap-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-sm text-gray-500 border border-white/10 px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.link && (
                      <div className="text-[#00ff88] text-2xl group-hover:translate-x-2 transition-transform">
                        →
                      </div>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-32 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm text-gray-500 mb-4">/// {t.roadmap.title}</div>
          <p className="text-xl text-gray-400 mb-16">{t.roadmap.subtitle}</p>
          
          <div className="space-y-8">
            {t.roadmap.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 p-12"
              >
                <div className="flex items-start gap-8">
                  <div className="text-6xl font-bold text-gray-800">[{phase.number}]</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2">{phase.phase}</h3>
                    <div className="flex gap-4 text-sm text-gray-500 mb-6">
                      <span>{phase.period}</span>
                      <span>•</span>
                      <span>{phase.status}</span>
                    </div>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-3">
                          <span className="text-[#00ff88] mt-1">→</span>
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

      {/* Stats Section */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.stats.items.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center border border-white/10 p-12"
              >
                <div className="text-6xl font-bold text-[#00ff88] mb-4">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-sm text-gray-500 mb-8">/// {t.contact.title}</div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.contact.items.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 hover:border-[#00ff88] p-8 text-center transition-all group"
              >
                <div className="text-xl font-bold group-hover:text-[#00ff88] transition-colors">
                  {item.name}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>SHAWN WICK 2026</div>
            <div className="flex gap-8">
              <a href="https://x.com/shawnwick960" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                X (Twitter)
              </a>
              <a href="https://t.me/shawick" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Telegram
              </a>
              <a href="https://github.com/shawn7499" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
