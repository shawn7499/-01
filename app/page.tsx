'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const { scrollYProgress } = useScroll()
  
  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 1])

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
          {
            number: '01',
            title: 'AI Automation',
            desc: 'Building intelligent agents with OpenClaw',
          },
          {
            number: '02',
            title: 'Quantitative Trading',
            desc: 'Developing profitable trading strategies',
          },
          {
            number: '03',
            title: 'Web3 Development',
            desc: 'Creating decentralized applications',
          },
          {
            number: '04',
            title: 'Meme Coin Trading',
            desc: 'Caught Trump 7u→65u, early WLFI investor',
            status: 'Waiting for opportunities',
          },
          {
            number: '05',
            title: 'Prediction Market Bot',
            desc: 'Automated monitoring for Polymarket',
            status: 'In Development',
          },
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
          {
            number: '01',
            title: 'AI 自动化',
            desc: '使用 OpenClaw 构建智能代理',
          },
          {
            number: '02',
            title: '量化交易',
            desc: '开发盈利的交易策略',
          },
          {
            number: '03',
            title: 'Web3 开发',
            desc: '创建去中心化应用',
          },
          {
            number: '04',
            title: 'Meme 币交易',
            desc: '抓住 Trump 7u→65u，WLFI 早期投资者',
            status: '等待机会',
          },
          {
            number: '05',
            title: '预测市场机器人',
            desc: 'Polymarket 自动监控',
            status: '开发中',
          },
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 抽象背景元素 - 增强版 */}
      <div className="fixed inset-0 pointer-events-none">
        {/* 主光晕 - 视差 + 脉冲 */}
        <motion.div
          style={{ y: y1, opacity }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2, opacity }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl"
        />
        {/* 额外的浮动光晕 */}
        <motion.div
          style={{ y: y3 }}
          animate={{
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#00ff88]/3 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#8b5cf6]/3 rounded-full blur-3xl"
        />
      </div>

      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-lg md:text-xl font-bold">SHAWN WICK</div>
            <div className="flex gap-3 md:gap-8 items-center text-sm md:text-base">
              <a href="#what-i-do" className="hidden md:block hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'What I Do' : '我在做的'}
              </a>
              <a href="#projects" className="hidden md:block hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'Projects' : '项目'}
              </a>
              <a href="#roadmap" className="hidden md:block hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'Roadmap' : '路线图'}
              </a>
              <a href="#contact" className="hover:text-[#00ff88] transition-colors">
                {lang === 'en' ? 'Contact' : '联系'}
              </a>
              <button
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className="px-3 md:px-4 py-1 md:py-2 border border-white/20 rounded hover:border-[#00ff88] transition-colors text-sm"
              >
                {lang === 'en' ? '中文' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 leading-tight">
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
        </div>
      </section>

      {/* 过渡动画元素 1 - LayerZero 风格线条 */}
      <div className="relative h-48 md:h-64 overflow-hidden my-16">
        {/* 网格线条 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
          {/* 水平线条组 */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            x1="0" y1="80" x2="1000" y2="80"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            viewport={{ once: true }}
            x1="0" y1="100" x2="1000" y2="100"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            viewport={{ once: true }}
            x1="0" y1="120" x2="1000" y2="120"
            stroke="#00ff88"
            strokeWidth="1"
          />
          {/* 垂直线条 */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            viewport={{ once: true }}
            x1="200" y1="60" x2="200" y2="140"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.8 }}
            viewport={{ once: true }}
            x1="500" y1="60" x2="500" y2="140"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            viewport={{ once: true }}
            x1="800" y1="60" x2="800" y2="140"
            stroke="#00ff88"
            strokeWidth="1"
          />
          {/* 连接节点 */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: true }}
            cx="200" cy="100" r="3" fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            viewport={{ once: true }}
            cx="500" cy="100" r="3" fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            viewport={{ once: true }}
            cx="800" cy="100" r="3" fill="#00ff88"
          />
        </svg>
      </div>

      {/* What I Do Section - 与动画结合 */}
      <section id="what-i-do" className="py-32 px-6 relative">
        {/* 背景扩展元素 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[#00ff88] blur-3xl"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mb-16"
          >
            /// {t.whatIDo.title}
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.whatIDo.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="border border-white/10 hover:border-[#00ff88] transition-all duration-300 p-8 group relative overflow-hidden"
              >
                {/* 卡片背景扩展 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-[#00ff88]/5 group-hover:bg-[#00ff88]/10 transition-all"
                />
                
                <div className="relative z-10">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 过渡动画元素 2 - 几何图形变换 */}
      <div className="relative h-48 md:h-64 overflow-hidden my-16">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
          {/* 三角形组合 */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
            d="M 400 60 L 450 140 L 350 140 Z"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            viewport={{ once: true }}
            d="M 500 80 L 540 140 L 460 140 Z"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
            viewport={{ once: true }}
            d="M 600 60 L 650 140 L 550 140 Z"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
          />
          {/* 矩形框架 */}
          <motion.rect
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
            viewport={{ once: true }}
            x="250" y="70" width="60" height="60"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
          />
          <motion.rect
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
            viewport={{ once: true }}
            x="700" y="70" width="60" height="60"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
          />
          {/* 连接线 */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
            viewport={{ once: true }}
            x1="310" y1="100" x2="400" y2="100"
            stroke="#00ff88"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.7 }}
            viewport={{ once: true }}
            x1="650" y1="100" x2="700" y2="100"
            stroke="#8b5cf6"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Projects Section - 与动画结合 */}
      <section id="projects" className="py-32 px-6 relative">
        {/* 背景扩展元素 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[#8b5cf6] blur-3xl"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mb-4"
          >
            /// {t.projects.title}
          </motion.div>
          
          <div className="space-y-8">
            {t.projects.items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0, x: -50 }}
                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* 卡片背景扩展 */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 to-transparent origin-left"
                />
                
                <a
                  href={project.link || '#'}
                  target={project.link ? '_blank' : undefined}
                  rel={project.link ? 'noopener noreferrer' : undefined}
                  className="block border border-white/10 hover:border-[#00ff88] transition-all duration-300 p-6 md:p-12 relative z-10"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">[{project.number}]</div>
                      <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-[#00ff88] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-base md:text-xl text-gray-400 mb-6 leading-relaxed">
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
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 10 }}
                        className="text-[#00ff88] text-2xl"
                      >
                        →
                      </motion.div>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 过渡动画元素 3 - 抽象线条网络 */}
      <div className="relative h-48 md:h-64 overflow-hidden my-16">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
          {/* 主对角线 */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
            x1="100" y1="50" x2="900" y2="150"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            viewport={{ once: true }}
            x1="100" y1="150" x2="900" y2="50"
            stroke="#8b5cf6"
            strokeWidth="1"
          />
          {/* 分支线条 */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
            viewport={{ once: true }}
            d="M 300 80 L 400 100 L 500 90"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
            viewport={{ once: true }}
            d="M 500 110 L 600 100 L 700 120"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
          />
          {/* 节点组 */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: true }}
            cx="300" cy="80" r="4" fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            viewport={{ once: true }}
            cx="500" cy="100" r="5" fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            viewport={{ once: true }}
            cx="700" cy="120" r="4" fill="#8b5cf6"
          />
          {/* 脉冲光晕 */}
          <motion.circle
            initial={{ r: 0, opacity: 0 }}
            whileInView={{ r: 20, opacity: 0 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            viewport={{ once: true }}
            cx="500" cy="100" r="20" fill="none" stroke="#00ff88" strokeWidth="1" opacity="0.3"
          />
          {/* 水平连接线 */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
            viewport={{ once: true }}
            x1="200" y1="100" x2="800" y2="100"
            stroke="#00ff88"
            strokeWidth="1"
            strokeDasharray="10,10"
          />
        </svg>
      </div>

      {/* Roadmap Section - 与动画结合 */}
      <section id="roadmap" className="py-32 px-6 relative">
        {/* 背景扩展元素 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.04 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[#00ff88] blur-3xl"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mb-4"
          >
            /// {t.roadmap.title}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 mb-16"
          >
            {t.roadmap.subtitle}
          </motion.p>
          
          <div className="space-y-8">
            {t.roadmap.phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.85, opacity: 0, rotateX: -15 }}
                whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                style={{ perspective: 1000 }}
                className="border border-white/10 p-6 md:p-12 hover:border-[#00ff88]/50 transition-all relative overflow-hidden"
              >
                {/* 卡片背景扩展 */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                  className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 rounded-full blur-3xl"
                />
                
                <div className="flex items-start gap-8 relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                    className="text-6xl font-bold text-gray-800"
                  >
                    [{phase.number}]
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{phase.phase}</h3>
                    <div className="flex gap-4 text-sm text-gray-500 mb-6">
                      <span>{phase.period}</span>
                      <span>•</span>
                      <span>{phase.status}</span>
                    </div>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.8 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="text-gray-400 flex items-start gap-3"
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
      </section>

      {/* Stats Section - 与动画结合 */}
      <section className="py-32 px-6 relative">
        {/* 背景扩展元素 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[#8b5cf6] blur-3xl"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.stats.items.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                style={{ perspective: 1000 }}
                whileHover={{ scale: 1.05 }}
                className="text-center border border-white/10 p-8 md:p-12 hover:border-[#00ff88] transition-all relative overflow-hidden"
              >
                {/* 卡片背景扩展 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-[#00ff88]/5"
                />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-[#00ff88] mb-4"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 过渡动画元素 4 - 螺旋扩散 */}
      <div className="relative h-48 md:h-64 overflow-hidden my-16">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice">
          {/* 中心扩散圆环 */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            cx="500" cy="100" r="40"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            cx="500" cy="100" r="60"
            stroke="#8b5cf6"
            strokeWidth="1"
            fill="none"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
            cx="500" cy="100" r="80"
            stroke="#00ff88"
            strokeWidth="1"
            fill="none"
          />
          {/* 放射线 */}
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
            viewport={{ once: true }}
            x1="500" y1="100" x2="650" y2="50"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.1 }}
            viewport={{ once: true }}
            x1="500" y1="100" x2="650" y2="150"
            stroke="#00ff88"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.3 }}
            viewport={{ once: true }}
            x1="500" y1="100" x2="350" y2="50"
            stroke="#8b5cf6"
            strokeWidth="1"
          />
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
            viewport={{ once: true }}
            x1="500" y1="100" x2="350" y2="150"
            stroke="#8b5cf6"
            strokeWidth="1"
          />
          {/* 端点节点 */}
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
            viewport={{ once: true }}
            cx="650" cy="50" r="3" fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            viewport={{ once: true }}
            cx="650" cy="150" r="3" fill="#00ff88"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            viewport={{ once: true }}
            cx="350" cy="50" r="3" fill="#8b5cf6"
          />
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            viewport={{ once: true }}
            cx="350" cy="150" r="3" fill="#8b5cf6"
          />
        </svg>
      </div>

      {/* Contact Section - 与动画结合 */}
      <section id="contact" className="py-32 px-6 relative">
        {/* 背景扩展元素 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[#00ff88] blur-3xl"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 mb-8"
          >
            /// {t.contact.title}
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.contact.items.map((item, index) => (
              item.link ? (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0, rotateZ: -45 }}
                  whileInView={{ scale: 1, opacity: 1, rotateZ: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="border border-white/10 hover:border-[#00ff88] p-6 md:p-8 text-center transition-all group flex flex-col items-center gap-3 relative overflow-hidden"
                >
                  {/* 卡片背景扩展 */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-[#00ff88]/5 group-hover:bg-[#00ff88]/10 transition-all"
                  />
                  
                  <span className="text-4xl relative z-10">{item.icon}</span>
                  <div className="text-sm font-bold group-hover:text-[#00ff88] transition-colors relative z-10">
                    {item.name}
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0, rotateZ: -45 }}
                  whileInView={{ scale: 1, opacity: 1, rotateZ: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="border border-white/10 hover:border-[#00ff88] p-6 md:p-8 text-center transition-all group flex flex-col items-center gap-3 cursor-pointer relative overflow-hidden"
                  title={item.wechat}
                >
                  {/* 卡片背景扩展 */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-[#00ff88]/5 group-hover:bg-[#00ff88]/10 transition-all"
                  />
                  
                  <span className="text-4xl relative z-10">{item.icon}</span>
                  <div className="text-sm font-bold group-hover:text-[#00ff88] transition-colors relative z-10">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 relative z-10">{item.wechat}</div>
                </motion.div>
              )
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
