'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const AICreatePage = dynamic(() => import('@/components/AICreatePage'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tight">
            Building the Future
          </h1>
          <h2 className="text-3xl md:text-5xl font-light mb-16 text-gray-700 leading-tight">
            Beyond the Universe
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-20 leading-relaxed max-w-3xl mx-auto">
            Pioneering technology that enables humanity's cosmic exploration, scalable, and inevitable.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-black text-white font-bold rounded hover:bg-gray-900 transition-all"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="px-8 py-4 border-2 border-black text-black font-bold rounded hover:bg-black hover:text-white transition-all"
          >
            Learn More
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">What I Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Combining AI, trading, and Web3 to build the future of technology and create sustainable abundance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: 'AI Automation', desc: 'Building intelligent agents with OpenClaw' },
              { title: 'Quantitative Trading', desc: 'Developing profitable trading strategies' },
              { title: 'AI Creation', desc: 'Advanced image and video generation' },
              { title: 'Web3 Development', desc: 'Creating decentralized applications' },
              { title: 'Meme Coin Trading', desc: 'Early opportunities in crypto' },
              { title: 'Innovation', desc: 'Pushing boundaries of what\'s possible' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-4 border-black pl-6"
              >
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Workshop */}
      <section className="py-20 bg-gray-50">
        <AICreatePage />
      </section>

      {/* Projects Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Active Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforming ideas into reality with cutting-edge technology.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: 'AI Creative Workshop',
                desc: 'Generate stunning images and videos with advanced AI models. Powered by state-of-the-art diffusion technology.',
                stats: ['61+ Models', 'Real-time Generation', 'High Resolution'],
              },
              {
                title: 'Trading Bot',
                desc: 'Automated quantitative trading with real-time profit generation. Intelligent algorithms powered by machine learning.',
                stats: ['24/7 Trading', 'Multi-Market', 'Risk Management'],
              },
              {
                title: 'OpenClaw Services',
                desc: 'Professional AI automation and custom integration services. Building the future of intelligent automation.',
                stats: ['Custom Solutions', 'Enterprise Grade', 'Full Support'],
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-4 border-black pl-8 py-8"
              >
                <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-6">
                  {project.stats.map((stat, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full"></span>
                      <span className="font-semibold">{stat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Mission Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A vision to transcend the universe and enable humanity's cosmic exploration.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                phase: 'Capital Accumulation',
                period: '2024-2030',
                items: ['Build wealth through multiple streams', 'AI & trading automation', 'Web3 innovation', 'Market dominance'],
              },
              {
                number: '02',
                phase: 'Space & Technology',
                period: '2030-2040',
                items: ['Private space infrastructure', 'Advanced AI research', 'Quantum computing', 'Dimensional exploration'],
              },
              {
                number: '03',
                phase: 'Universal Transcendence',
                period: '2040+',
                items: ['Multiverse exploration', 'Consciousness digitization', 'Dimensional ascension', 'Cosmic civilization'],
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="border-l-4 border-black pl-8 py-8"
              >
                <div className="flex items-start gap-12">
                  <div className="flex-shrink-0">
                    <div className="text-7xl font-black text-gray-200">{phase.number}</div>
                    <h3 className="text-3xl font-bold mt-4 mb-2">{phase.phase}</h3>
                    <p className="text-gray-600 font-semibold">{phase.period}</p>
                  </div>
                  <div className="flex-1 mt-8">
                    <ul className="space-y-3">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-700 text-lg">
                          <span className="text-black font-bold mt-0.5">→</span>
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
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">Let's Connect</h2>
            <p className="text-xl text-gray-600 mb-20 leading-relaxed">
              Join me on the journey to build the future. Let's create something extraordinary together.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'X', icon: '𝕏', link: 'https://x.com/shawnwick960' },
                { name: 'Telegram', icon: '✈️', link: 'https://t.me/shawick' },
                { name: 'Email', icon: '✉️', link: 'mailto:shawnwick7499@gmail.com' },
                { name: 'GitHub', icon: '💻', link: 'https://github.com/shawn7499' },
                { name: 'WeChat', icon: '💬', wechat: 'shawnwick' },
              ].map((contact, i) =>
                contact.link ? (
                  <motion.a
                    key={i}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-6 border-2 border-black rounded hover:bg-black hover:text-white transition-all group"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{contact.icon}</div>
                    <div className="font-bold text-sm">{contact.name}</div>
                  </motion.a>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 border-2 border-black rounded cursor-pointer hover:bg-black hover:text-white transition-all group"
                    title={contact.wechat}
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{contact.icon}</div>
                    <div className="font-bold text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-600 group-hover:text-white/70 mt-1 transition-colors">{contact.wechat}</div>
                  </motion.div>
                )
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <p className="text-gray-600 text-lg mb-8">
                Ready to build the future? Let's make it happen.
              </p>
              <a
                href="mailto:shawnwick7499@gmail.com"
                className="inline-block px-8 py-4 bg-black text-white font-bold rounded hover:bg-gray-900 transition-all"
              >
                Send Me a Message
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-4">WICK</h3>
          <p className="text-gray-400 mb-8">
            Building the path beyond the universe
          </p>
          <div className="flex justify-center gap-8 mb-8">
            {[
              { name: 'X', link: 'https://x.com/shawnwick960' },
              { name: 'Telegram', link: 'https://t.me/shawick' },
              { name: 'GitHub', link: 'https://github.com/shawn7499' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-semibold"
              >
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">© 2024 WICK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
