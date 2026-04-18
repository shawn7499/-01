'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import DesktopHoverNav from '@/components/DesktopHoverNav'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { incubatingHomeCopy, incubatingProjects } from '@/lib/incubating-projects'
import { homeNavItems } from '@/lib/navigation'
import { translations } from '@/lib/translations'

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh')
  const [ideasMenuOpen, setIdeasMenuOpen] = useState(false)

  const t = translations[lang]
  const ideasCopy = incubatingHomeCopy[lang]

  const projectLinks = ['/news/signals', '/tokens/hot', '/opportunities']

  const contactItems = [
    { name: 'X', icon: 'X', link: 'https://x.com/shawnwick960' },
    { name: 'Telegram', icon: 'TG', link: 'https://t.me/shawick' },
    { name: 'Email', icon: '@', link: 'mailto:shawnwick7499@gmail.com' },
    { name: 'GitHub', icon: 'GH', link: 'https://github.com/shawn7499' },
    { name: 'WeChat', icon: 'WX', wechat: 'shawnwick' },
  ]

  return (
    <div className="page-shell">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/8 bg-[rgba(5,8,12,0.72)] backdrop-blur-2xl">
        <div className="page-container py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <a
              href="/"
              className="text-xs font-semibold tracking-[0.34em] text-white/88 md:text-sm"
            >
              SHAWN WICK
            </a>

            <div className="hidden items-center gap-6 lg:flex">
              <DesktopHoverNav
                items={homeNavItems}
                lang={lang}
                className="hidden items-center gap-5 lg:flex xl:gap-7"
              />
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={setLang}
                className="flex rounded-full border border-white/10 bg-[rgba(10,14,20,0.76)] p-1 shadow-[0_14px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl"
              />
            </div>

            <LanguageSwitcher
              currentLang={lang}
              onLanguageChange={setLang}
              className="flex rounded-full border border-white/10 bg-[rgba(10,14,20,0.76)] p-1 shadow-[0_14px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:hidden"
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {homeNavItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/72"
                title={item.subtitle[lang]}
              >
                {item.label[lang]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative overflow-hidden">
        <section className="page-container pt-32 pb-16 md:pt-40 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel grid-surface rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9 lg:rounded-[2.6rem] lg:px-12 lg:py-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(153,200,255,0.16),transparent_26%),radial-gradient(circle_at_80%_26%,rgba(110,231,212,0.12),transparent_18%),radial-gradient(circle_at_68%_82%,rgba(216,246,168,0.1),transparent_22%)]" />
            <div className="relative grid gap-12 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] xl:items-center">
              <div>
                <div className="section-label">{t.hero.eyebrow}</div>
                <h1 className="section-title mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl xl:text-[5.55rem]">
                  {t.hero.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg text-white/84 sm:text-2xl">
                  {t.hero.subtitle}
                </p>
                <p className="section-copy mt-6 max-w-2xl text-sm sm:text-base lg:text-lg">
                  {t.hero.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {t.hero.pills.map((pill) => (
                    <div key={pill} className="chip">
                      <span className="chip-dot" />
                      <span>{pill}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#projects" className="site-button">
                    {t.hero.btnProjects}
                  </a>
                  <a href="#about" className="site-button-secondary">
                    {t.hero.btnLearn}
                  </a>
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-[30rem] justify-center xl:justify-end">
                <div className="hero-orbit hidden sm:block" />
                <div className="hero-glow" />
                <div className="relative w-full max-w-[26rem] space-y-4 sm:space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="glass-panel-soft rounded-[1.6rem] p-5"
                  >
                    <div className="section-label">Signal surfaces</div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: 'News', value: 'Filtered' },
                        { label: 'Radar', value: 'Live' },
                        { label: 'Ideas', value: 'Growing' },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.1rem] border border-white/8 bg-black/20 p-3"
                        >
                          <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                            {item.label}
                          </div>
                          <div className="mt-2 text-lg font-semibold text-white/88">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.7 }}
                    className="glass-panel-soft rounded-[1.75rem] p-5 sm:ml-8"
                  >
                    <div className="section-label">Operating style</div>
                    <div className="mt-4 space-y-3">
                      {[
                        lang === 'zh'
                          ? '把研究型产品做得更清楚、更好看、更好用。'
                          : 'Turning research-heavy products into clear, beautiful interfaces.',
                        lang === 'zh'
                          ? '保持一人团队的速度，同时逐步建立系统感。'
                          : 'Keeping solo-builder speed while layering in stronger product systems.',
                        lang === 'zh'
                          ? '让网站本身先成为下一批应用的母站。'
                          : 'Using the site itself as the parent surface for the next product set.',
                      ].map((line) => (
                        <div
                          key={line}
                          className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/72"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="page-container py-8 lg:py-10">
          <motion.div {...fadeUp} className="mb-8 max-w-3xl">
            <div className="section-label">{t.nav.whatIDo}</div>
            <h2 className="section-title mt-4 text-4xl sm:text-5xl lg:text-6xl">
              {t.about.title}
            </h2>
            <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">
              {t.about.description}
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.about.skills.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.24) }}
                className="glass-panel-soft hover-lift rounded-[1.5rem] p-5 sm:p-6"
              >
                <div className="section-label text-[10px]">Capability</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white/92">
                  {item.title}
                </h3>
                <p className="section-copy mt-3 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="page-container py-14 lg:py-16">
          <motion.div {...fadeUp} className="mb-8 max-w-3xl">
            <div className="section-label">{t.nav.projects}</div>
            <h2 className="section-title mt-4 text-4xl sm:text-5xl lg:text-6xl">
              {t.projects.title}
            </h2>
            <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">
              {t.projects.description}
            </p>
          </motion.div>

          <div className="grid gap-4 xl:grid-cols-3">
            {t.projects.items.map((project, index) => (
              <motion.a
                key={project.title}
                href={projectLinks[index]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.24) }}
                className="glass-panel-soft hover-lift rounded-[1.7rem] p-6"
              >
                <div className="section-label text-[10px]">Live surface</div>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/92">
                  {project.title}
                </h3>
                <p className="section-copy mt-4 text-sm">{project.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/62"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/84">
                  <span>{project.btnText}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setIdeasMenuOpen(true)}
            onMouseLeave={() => setIdeasMenuOpen(false)}
            onFocusCapture={() => setIdeasMenuOpen(true)}
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget as Node | null
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
                setIdeasMenuOpen(false)
              }
            }}
            className="glass-panel mt-8 rounded-[1.9rem] px-6 py-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(110,231,212,0.12),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(153,200,255,0.14),transparent_22%)]" />
            <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="section-label">{ideasCopy.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/92 sm:text-4xl">
                  {ideasCopy.title}
                </h3>
                <p className="section-copy mt-4 text-sm sm:text-base">
                  {ideasCopy.description}
                </p>
                <p className="mt-4 hidden text-xs uppercase tracking-[0.24em] text-white/36 md:block">
                  {ideasCopy.hoverHint}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIdeasMenuOpen((open) => !open)}
                  aria-expanded={ideasMenuOpen}
                  aria-controls="incubating-project-menu"
                  className="site-button-secondary"
                >
                  {ideasCopy.browseTracks}
                </button>
                <a href="/incubating" className="site-button">
                  {ideasCopy.openPage}
                </a>
              </div>
            </div>

            <div
              id="incubating-project-menu"
              className={`relative mt-6 overflow-hidden transition-all duration-300 ${
                ideasMenuOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {incubatingProjects.map((project) => (
                  <a
                    key={project.id}
                    href={`/incubating#${project.id}`}
                    className="glass-panel-soft hover-lift rounded-[1.35rem] p-4"
                  >
                    <div className="section-label text-[10px]">{project.stage[lang]}</div>
                    <h4 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white/92">
                      {project.title[lang]}
                    </h4>
                    <p className="section-copy mt-2 text-sm">{project.summary[lang]}</p>
                    <div className="mt-4 text-sm font-semibold text-white/82">
                      {ideasCopy.jumpToProject}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="roadmap" className="page-container py-14 lg:py-16">
          <motion.div {...fadeUp} className="mb-8 max-w-3xl">
            <div className="section-label">{t.nav.roadmap}</div>
            <h2 className="section-title mt-4 text-4xl sm:text-5xl lg:text-6xl">
              {t.roadmap.title}
            </h2>
            <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">
              {t.roadmap.description}
            </p>
          </motion.div>

          <div className="grid gap-4 xl:grid-cols-3">
            {t.roadmap.phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.24) }}
                className="glass-panel-soft rounded-[1.7rem] p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-6xl font-semibold tracking-[-0.08em] text-white/18">
                      {phase.number}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white/92">
                      {phase.phase}
                    </h3>
                  </div>
                  <div className="section-label text-right text-[10px]">{phase.period}</div>
                </div>

                <ul className="mt-6 space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-white/72">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="page-container py-14 lg:py-20">
          <motion.div
            {...fadeUp}
            className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_16%,rgba(153,200,255,0.16),transparent_24%),radial-gradient(circle_at_80%_22%,rgba(110,231,212,0.12),transparent_18%)]" />
            <div className="relative">
              <div className="section-label">{t.nav.contact}</div>
              <h2 className="section-title mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
                {t.contact.title}
              </h2>
              <p className="section-copy mt-5 max-w-3xl text-sm sm:text-base lg:text-lg">
                {t.contact.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {contactItems.map((contact, index) =>
                  contact.link ? (
                    <motion.a
                      key={contact.name}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.2) }}
                      className="glass-panel-soft hover-lift rounded-[1.3rem] p-4"
                    >
                      <div className="section-label text-[10px]">{contact.icon}</div>
                      <div className="mt-4 text-lg font-semibold text-white/92">
                        {contact.name}
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div
                      key={contact.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.2) }}
                      className="glass-panel-soft hover-lift rounded-[1.3rem] p-4"
                    >
                      <div className="section-label text-[10px]">{contact.icon}</div>
                      <div className="mt-4 text-lg font-semibold text-white/92">
                        {contact.name}
                      </div>
                      <div className="mt-2 text-sm text-white/58">{contact.wechat}</div>
                    </motion.div>
                  )
                )}
              </div>

              <div className="mt-8">
                <a href="mailto:shawnwick7499@gmail.com" className="site-button">
                  {t.contact.message}
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/8 py-10">
        <div className="page-container flex flex-col gap-6 text-sm text-white/54 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.34em] text-white/88">
              {t.footer.title}
            </div>
            <p className="mt-3 max-w-xl leading-7">{t.footer.description}</p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex gap-5">
              {[
                { name: 'X', link: 'https://x.com/shawnwick960' },
                { name: 'Telegram', link: 'https://t.me/shawick' },
                { name: 'GitHub', link: 'https://github.com/shawn7499' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="muted-link"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
