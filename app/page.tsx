'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const AbstractBackground = dynamic(() => import('@/components/AbstractBackground'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black">SHAWN WICK</h1>
          <div className="flex gap-8">
            <a href="#about" className="text-gray-300 hover:text-white transition">What I Do</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
            <a href="#roadmap" className="text-gray-300 hover:text-white transition">Roadmap</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Gradient Abstract Background */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative pt-32 overflow-hidden bg-black">
        <AbstractBackground type="gradient" />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl text-center relative z-20">
          <h1 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tight">Building the Future</h1>
          <h2 className="text-3xl md:text-5xl font-light mb-16 text-gray-200 leading-tight">Beyond the Universe</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-20 leading-relaxed max-w-3xl mx-auto">
            Pioneering technology that enables humanity's cosmic exploration, scalable, and inevitable.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col sm:flex-row gap-6 justify-center mt-12 relative z-20">
          <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all">
            View Projects
          </a>
          <a href="#about" className="px-8 py-4 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-black transition-all">
            Learn More
          </a>
        </motion.div>
      </section>

      {/* What I Do - Waves Abstract Background */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-black overflow-hidden">
        <AbstractBackground type="waves" />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">What I Do</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Combining AI, trading, and Web3 to build the future of technology.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: 'AI Automation', desc: 'Building intelligent agents with OpenClaw' },
              { title: 'Quantitative Trading', desc: 'Developing profitable trading strategies' },
              { title: 'AI Creation', desc: 'Advanced image and video generation' },
              { title: 'Web3 Development', desc: 'Creating decentralized applications' },
              { title: 'Meme Coin Trading', desc: 'Early opportunities in crypto' },
              { title: 'Innovation', desc: 'Pushing boundaries of whats possible' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-4 border-white pl-6 bg-white/5 backdrop-blur-sm p-6 rounded">
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Particles Abstract Background */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-black overflow-hidden">
        <AbstractBackground type="particles" />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Active Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Transforming ideas into reality with cutting-edge technology.</p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: 'Gold Quantitative Trading',
                desc: 'Sustainable compound interest strategy for long-term wealth accumulation. Intelligent algorithms for consistent returns.',
                stats: ['Compound Returns', 'Risk Management', 'Long-term Growth'],
                link: 'https://smartgold.ai/dashboard?inviteCode=J5n5Rv'
              },
              {
                title: 'AI Creative Workshop',
                desc: 'Generate stunning images and videos with advanced AI models. 61+ models with real-time generation capabilities.',
                stats: ['61+ Models', 'Real-time Generation', 'High Resolution'],
                link: '/ai-workshop'
              },
              {
                title: 'OpenClaw Services',
                desc: 'Professional AI automation and custom integration services. Building the future of intelligent automation.',
                stats: ['Custom Solutions', 'Enterprise Grade', 'Full Support'],
                link: null
              },
            ].map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-4 border-white pl-8 py-8 bg-white/5 backdrop-blur-sm p-6 rounded group hover:border-gray-300 transition-colors">
                <h3 className="text-4xl font-bold mb-4 group-hover:text-gray-100 transition-colors">{project.title}</h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-6 mb-8">
                  {project.stats.map((stat, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span className="font-semibold text-gray-300">{stat}</span>
                    </div>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="inline-block px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all text-sm font-semibold">
                    {project.link.startsWith('http') ? 'Visit Project' : 'View Project'} arrow
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap - Geometric Abstract Background */}
      <section id="roadmap" className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-black overflow-hidden">
        <AbstractBackground type="geometric" />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Mission Roadmap</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">A vision to transcend the universe and enable humanity's cosmic exploration.</p>
          </motion.div>

          <div className="space-y-16">
            {[
              { number: '01', phase: 'Capital Accumulation', period: '2024-2030', items: ['Build wealth through multiple streams', 'AI and trading automation', 'Web3 innovation', 'Market dominance'] },
              { number: '02', phase: 'Space and Technology', period: '2030-2040', items: ['Private space infrastructure', 'Advanced AI research', 'Quantum computing', 'Dimensional exploration'] },
              { number: '03', phase: 'Universal Transcendence', period: '2040+', items: ['Multiverse exploration', 'Consciousness digitization', 'Dimensional ascension', 'Cosmic civilization'] },
            ].map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="border-l-4 border-white pl-8 py-8 bg-white/5 backdrop-blur-sm p-6 rounded">
                <div className="flex items-start gap-12">
                  <div className="flex-shrink-0">
                    <div className="text-7xl font-black text-gray-500">{phase.number}</div>
                    <h3 className="text-3xl font-bold mt-4 mb-2">{phase.phase}</h3>
                    <p className="text-gray-400 font-semibold">{phase.period}</p>
                  </div>
                  <div className="flex-1 mt-8">
                    <ul className="space-y-3">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-300 text-lg">
                          <span className="text-white font-bold mt-0.5">-</span>
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

      {/* Contact - Gradient Abstract Background */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-black overflow-hidden">
        <AbstractBackground type="gradient" />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="max-w-5xl mx-auto text-center w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">Lets Connect</h2>
            <p className="text-xl text-gray-300 mb-20 leading-relaxed">Join me on the journey to build the future. Lets create something extraordinary together.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'X', icon: 'X', link: 'https://x.com/shawnwick960' },
                { name: 'Telegram', icon: 'TG', link: 'https://t.me/shawick' },
                { name: 'Email', icon: '@', link: 'mailto:shawnwick7499@gmail.com' },
                { name: 'GitHub', icon: 'GH', link: 'https://github.com/shawn7499' },
                { name: 'WeChat', icon: 'WX', wechat: 'shawnwick' },
              ].map((contact, i) =>
                contact.link ? (
                  <motion.a key={i} href={contact.link} target="_blank" rel="noopener noreferrer" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.1 }} className="p-6 border-2 border-white rounded hover:bg-white hover:text-black transition-all group bg-white/5 backdrop-blur-sm">
                    <div className="text-xl font-bold mb-3">{contact.icon}</div>
                    <div className="font-bold text-sm">{contact.name}</div>
                  </motion.a>
                ) : (
                  <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 border-2 border-white rounded cursor-pointer hover:bg-white hover:text-black transition-all group bg-white/5 backdrop-blur-sm" title={contact.wechat}>
                    <div className="text-xl font-bold mb-3">{contact.icon}</div>
                    <div className="font-bold text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-400 group-hover:text-black/70 mt-1 transition-colors">{contact.wechat}</div>
                  </motion.div>
                )
              )}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20">
              <a href="mailto:shawnwick7499@gmail.com" className="inline-block px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all">
                Send Me a Message
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 text-white py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-4">SHAWN WICK</h3>
          <p className="text-gray-400 mb-8">Building the path beyond the universe</p>
          <div className="flex justify-center gap-8 mb-8">
            {[
              { name: 'X', link: 'https://x.com/shawnwick960' },
              { name: 'Telegram', link: 'https://t.me/shawick' },
              { name: 'GitHub', link: 'https://github.com/shawn7499' },
            ].map((link, i) => (
              <a key={i} href={link.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors font-semibold">
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-sm">© 2024 SHAWN WICK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
