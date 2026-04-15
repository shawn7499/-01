'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import { translations } from '@/lib/translations'

const AbstractBackground = dynamic(() => import('@/components/AbstractBackground'), {
  ssr: false,
})

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const t = translations[lang]

  const projectLinks = [
    '/news',
    'https://smartgold.ai/dashboard?inviteCode=J5n5Rv',
    '#contact',
  ]

  const contactItems = [
    { name: 'X', icon: 'X', link: 'https://x.com/shawnwick960' },
    { name: 'Telegram', icon: 'TG', link: 'https://t.me/shawick' },
    { name: 'Email', icon: '@', link: 'mailto:shawnwick7499@gmail.com' },
    { name: 'GitHub', icon: 'GH', link: 'https://github.com/shawn7499' },
    { name: 'WeChat', icon: 'WX', wechat: 'shawnwick' },
  ]

  return (
    <div className="bg-black text-white">
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-sm font-black tracking-[0.2em] md:text-2xl md:tracking-tight">SHAWN WICK</h1>

            <div className="hidden md:flex gap-8 items-center">
              <a href="#about" className="text-sm text-gray-300 hover:text-white transition">
                {t.nav.whatIDo}
              </a>
              <a href="#projects" className="text-sm text-gray-300 hover:text-white transition">
                {t.nav.projects}
              </a>
              <a href="#roadmap" className="text-sm text-gray-300 hover:text-white transition">
                {t.nav.roadmap}
              </a>
              <a href="/opportunities" className="text-sm text-gray-300 hover:text-white transition">
                Opportunities
              </a>
              <a href="/news" className="text-sm text-gray-300 hover:text-white transition">
                News
              </a>
              <a href="/tokens/hot" className="text-sm text-gray-300 hover:text-white transition">
                Hot Tokens
              </a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-white transition">
                {t.nav.contact}
              </a>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
            <a href="#about" className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
              About
            </a>
            <a href="#projects" className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
              Work
            </a>
            <a href="/opportunities" className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
              Opps
            </a>
            <a href="/news" className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
              News
            </a>
            <a href="/tokens/hot" className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
              Hot
            </a>
            <a href="#contact" className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section className="hero-cover hero-vignette relative min-h-screen overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 opacity-[0.78]">
          <AbstractBackground type="orbital" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black 28%, transparent 92%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(116,214,255,0.16),transparent_20%),radial-gradient(circle_at_50%_72%,rgba(0,255,136,0.08),transparent_28%)]"
        />
        <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl items-start justify-center pt-12 sm:min-h-[calc(100vh-8rem)] sm:items-center sm:pt-0">
          <div className="relative z-10 w-full max-w-5xl px-2 py-10 text-center sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <div>
              <h1 className="text-4xl font-black leading-[0.98] tracking-tight text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.52)] sm:text-6xl lg:text-8xl">
                {t.hero.title}
              </h1>
              <h2 className="mt-5 text-xl font-light text-white/94 drop-shadow-[0_10px_24px_rgba(0,0,0,0.38)] sm:text-3xl lg:text-5xl">
                {t.hero.subtitle}
              </h2>
              <p className="mx-auto mt-6 max-w-[21rem] px-3 text-sm leading-6 text-white/92 drop-shadow-[0_8px_20px_rgba(0,0,0,0.28)] sm:max-w-3xl sm:px-0 sm:text-lg sm:leading-7 lg:text-2xl lg:leading-10">
                {t.hero.description}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-5">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200 sm:px-8 sm:text-base"
              >
                {t.hero.btnProjects}
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-black sm:px-8 sm:text-base"
              >
                {t.hero.btnLearn}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-ambient relative overflow-hidden border-t border-white/8 bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-75">
          <AbstractBackground type="waves" />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">{t.about.title}</h2>
            <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg md:text-xl">
              {t.about.description}
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {t.about.skills.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <div className="mb-5 h-1.5 w-14 rounded-full bg-white" />
                <h3 className="text-xl font-bold sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300 sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section-ambient relative overflow-hidden border-t border-white/8 bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-75">
          <AbstractBackground type="particles" />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">{t.projects.title}</h2>
            <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg md:text-xl">
              {t.projects.description}
            </p>
          </motion.div>

          <div className="mt-12 space-y-6 md:space-y-8">
            {t.projects.items.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="mb-5 h-1.5 w-16 rounded-full bg-white" />
                    <h3 className="text-3xl font-bold leading-tight sm:text-4xl">{project.title}</h3>
                    <p className="mt-4 text-base leading-8 text-gray-300 sm:text-xl">{project.desc}</p>

                    <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
                      {project.stats.map((stat) => (
                        <div key={stat} className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-white" />
                          <span className="font-semibold">{stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.btnText && (
                    <a
                      href={projectLinks[i]}
                      target={i === 1 ? '_blank' : undefined}
                      rel={i === 1 ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:text-base"
                    >
                      {project.btnText} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-ambient relative overflow-hidden border-t border-white/8 bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-75">
          <AbstractBackground type="geometric" />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">{t.roadmap.title}</h2>
            <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg md:text-xl">
              {t.roadmap.description}
            </p>
          </motion.div>

          <div className="mt-12 space-y-6 md:space-y-8">
            {t.roadmap.phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
                  <div>
                    <div className="text-6xl font-black leading-none text-gray-500 sm:text-7xl">{phase.number}</div>
                    <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{phase.phase}</h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">
                      {phase.period}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-1">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base leading-7 text-gray-300 sm:text-lg">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-white" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="hero-cover hero-vignette relative overflow-hidden border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl relative z-10">
          <motion.div
            {...fadeUp}
            className="rounded-[2rem] border border-white/10 bg-black/28 px-6 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-10 sm:py-16"
          >
            <h2 className="text-4xl font-black leading-tight sm:text-6xl md:text-7xl">{t.contact.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg md:text-xl">
              {t.contact.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 sm:gap-5">
              {contactItems.map((contact, i) =>
                contact.link ? (
                  <motion.a
                    key={contact.name}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-[1.5rem] border border-white/12 bg-white/[0.06] px-4 py-5 transition hover:bg-white hover:text-black"
                  >
                    <div className="mb-2 text-lg font-bold">{contact.icon}</div>
                    <div className="text-sm font-bold">{contact.name}</div>
                  </motion.a>
                ) : (
                  <motion.div
                    key={contact.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-[1.5rem] border border-white/12 bg-white/[0.06] px-4 py-5 transition hover:bg-white hover:text-black"
                    title={contact.wechat}
                  >
                    <div className="mb-2 text-lg font-bold">{contact.icon}</div>
                    <div className="text-sm font-bold">{contact.name}</div>
                    <div className="mt-1 text-xs text-gray-400">{contact.wechat}</div>
                  </motion.div>
                )
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-10"
            >
              <a
                href="mailto:shawnwick7499@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-gray-200 sm:text-base"
              >
                {t.contact.message}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-black px-6 py-12 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="mb-4 text-3xl font-black">{t.footer.title}</h3>
          <p className="mb-8 text-gray-400">{t.footer.description}</p>
          <div className="mb-8 flex justify-center gap-8">
            {[
              { name: 'X', link: 'https://x.com/shawnwick960' },
              { name: 'Telegram', link: 'https://t.me/shawick' },
              { name: 'GitHub', link: 'https://github.com/shawn7499' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-400 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-600">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
