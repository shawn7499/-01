'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { translations } from '@/lib/translations'

const AbstractBackground = dynamic(() => import('@/components/AbstractBackground'), {
  ssr: false,
})

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const t = translations[lang]

  return (
    <div className="bg-black text-white">
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      {/* Navigation - Mobile Optimized */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur border-b border-gray-800 px-3 md:px-6 py-2.5 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-base md:text-2xl font-black tracking-tight">SHAWN WICK</h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-sm text-gray-300 hover:text-white transition">{t.nav.whatIDo}</a>
            <a href="#projects" className="text-sm text-gray-300 hover:text-white transition">{t.nav.projects}</a>
            <a href="#roadmap" className="text-sm text-gray-300 hover:text-white transition">{t.nav.roadmap}</a>
            <a href="/opportunities" className="text-sm text-gray-300 hover:text-white transition">Opportunities</a>
            <a href="/news" className="text-sm text-gray-300 hover:text-white transition">News</a>
            <a href="#contact" className="text-sm text-gray-300 hover:text-white transition">{t.nav.contact}</a>
          </div>
          <div className="md:hidden flex gap-2.5 items-center text-xs">
            <a href="#about" className="text-gray-400 hover:text-white transition px-1.5">About</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition px-1.5">Work</a>
            <a href="/opportunities" className="text-gray-400 hover:text-white transition px-1.5">Opps</a>
            <a href="/news" className="text-gray-400 hover:text-white transition px-1.5">News</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition px-1.5">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative pt-32 overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl text-center relative z-20">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-10 md:mb-12 leading-tight tracking-tight">{t.hero.title}</h1>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-12 md:mb-16 text-gray-200 leading-tight">{t.hero.subtitle}</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 sm:mb-16 md:mb-20 leading-relaxed max-w-3xl mx-auto">
            {t.hero.description}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8 sm:mt-12 relative z-20 w-full px-4 sm:px-0">
          <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all text-sm sm:text-base">
            {t.hero.btnProjects}
          </a>
          <a href="#about" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-black transition-all text-sm sm:text-base">
            {t.hero.btnLearn}
          </a>
        </motion.div>
      </section>

      {/* What I Do Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 z-0">
          <AbstractBackground type="waves" />
        </div>
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 sm:mb-8 leading-tight">{t.about.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t.about.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {t.about.skills.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-4 border-white pl-4 sm:pl-6 bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded">
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 z-0">
          <AbstractBackground type="particles" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{t.projects.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t.projects.description}</p>
          </motion.div>

          <div className="space-y-12">
            {t.projects.items.map((project, i) => (
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
                {project.btnText && (
                  <a 
                    href={
                      i === 0 ? '/news' : 
                      i === 1 ? 'https://smartgold.ai/dashboard?inviteCode=J5n5Rv' : 
                      '/ai-workshop'
                    } 
                    target={i === 1 ? '_blank' : undefined} 
                    rel={i === 1 ? 'noopener noreferrer' : undefined} 
                    className="inline-block px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all text-sm font-semibold"
                  >
                    {project.btnText} →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 z-0">
          <AbstractBackground type="geometric" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{t.roadmap.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t.roadmap.description}</p>
          </motion.div>

          <div className="space-y-16">
            {t.roadmap.phases.map((phase, i) => (
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

      {/* Contact Section */}
      <section 
        id="contact" 
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="max-w-5xl mx-auto text-center w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black mb-12 leading-tight">{t.contact.title}</h2>
            <p className="text-xl text-gray-300 mb-20 leading-relaxed">{t.contact.description}</p>

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
                {t.contact.message}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-4">{t.footer.title}</h3>
          <p className="text-gray-400 mb-8">{t.footer.description}</p>
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
          <p className="text-gray-600 text-sm">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
