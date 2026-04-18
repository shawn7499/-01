'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import SiteHeader from '@/components/SiteHeader'
import {
  incubatingPageCopy,
  incubatingProjects,
  type SiteLang,
} from '@/lib/incubating-projects'

export default function IncubatingPage() {
  const [lang, setLang] = useState<SiteLang>('zh')
  const copy = incubatingPageCopy[lang]

  return (
    <div className="page-shell">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="none" />

      <main id="top" className="page-container pb-20 pt-32 md:pt-36">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(153,200,255,0.16),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(110,231,212,0.12),transparent_18%)]" />
          <div className="relative max-w-4xl">
            <p className="section-label">{copy.badge}</p>
            <h1 className="section-title mt-4 text-5xl sm:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            <p className="section-copy mt-5 text-sm sm:text-base lg:text-lg">
              {copy.subtitle}
            </p>
          </div>
        </motion.section>

        <section className="glass-panel-soft mt-8 rounded-[1.7rem] p-5 sm:p-6">
          <div className="section-label">{copy.noteTitle}</div>
          <p className="section-copy mt-4 text-sm sm:text-base">{copy.note}</p>
        </section>

        <section className="mt-12">
          <div className="section-label">{copy.directoryEyebrow}</div>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title text-4xl sm:text-5xl">{copy.directoryTitle}</h2>
            <p className="section-copy max-w-2xl text-sm sm:text-base lg:text-right">
              {copy.directoryDescription}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {incubatingProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={`#${project.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: Math.min(index * 0.05, 0.18), duration: 0.6 }}
                className="glass-panel-soft hover-lift rounded-[1.5rem] p-5"
              >
                <div className="section-label text-[10px]">{project.stage[lang]}</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white/92">
                  {project.title[lang]}
                </h3>
                <p className="section-copy mt-3 text-sm">{project.summary[lang]}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/84">
                  <span>{copy.openSection}</span>
                  <span aria-hidden="true">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <div className="mt-10 space-y-8">
          {incubatingProjects.map((project, index) => (
            <motion.section
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ delay: Math.min(index * 0.04, 0.16), duration: 0.6 }}
              className="glass-panel scroll-mt-28 rounded-[2rem] px-6 py-6 sm:px-7 sm:py-7"
            >
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                <div>
                  <div className="section-label">{project.stage[lang]}</div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white/92 sm:text-4xl">
                    {project.title[lang]}
                  </h2>
                  <p className="section-copy mt-4 text-sm sm:text-base">{project.summary[lang]}</p>
                  <p className="section-copy mt-4 text-sm sm:text-base">{project.strapline[lang]}</p>
                </div>

                <div className="grid gap-4">
                  <MetaCard label={copy.stageLabel} value={project.stage[lang]} />
                  <a
                    href="#top"
                    className="glass-panel-soft hover-lift inline-flex min-h-[104px] items-center justify-center rounded-[1.4rem] px-5 text-sm font-semibold text-white/84"
                  >
                    {copy.backToTop}
                  </a>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <ContentCard title={copy.whyLabel} items={project.why[lang]} />
                <ContentCard title={copy.buildLabel} items={project.build[lang]} />
                <ContentCard title={copy.proofLabel} items={project.proof[lang]} />
                <ContentCard title={copy.fundingLabel} items={project.funding[lang]} />
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  )
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel-soft rounded-[1.4rem] p-5">
      <div className="section-label text-[10px]">{label}</div>
      <div className="mt-3 text-base font-semibold leading-7 text-white/86">{value}</div>
    </div>
  )
}

function ContentCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-panel-soft rounded-[1.55rem] p-5">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-white/92">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-white/72 sm:text-base">
            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
