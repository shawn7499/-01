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
    <div className="min-h-screen bg-[#060606] text-white">
      <SiteHeader lang={lang} onLanguageChange={setLang} active="none" />

      <main id="top" className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.18),transparent_30%),rgba(255,255,255,0.03)] p-6 sm:p-8"
        >
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">{copy.badge}</p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">{copy.title}</h1>
            <p className="mt-5 text-sm leading-7 text-white/72 sm:text-base">{copy.subtitle}</p>
          </div>
        </motion.section>

        <section className="mt-8 rounded-[1.75rem] border border-emerald-300/20 bg-emerald-400/8 p-5 text-sm leading-7 text-emerald-50/90">
          <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">{copy.noteTitle}</div>
          <p className="mt-3">{copy.note}</p>
        </section>

        <section className="mt-10">
          <div className="mb-5 text-xs uppercase tracking-[0.28em] text-white/45">{copy.directoryEyebrow}</div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-black sm:text-4xl">{copy.directoryTitle}</h2>
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-right sm:text-base">
              {copy.directoryDescription}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {incubatingProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={`#${project.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: Math.min(index * 0.05, 0.2) }}
                className="group rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition hover:border-emerald-300/40 hover:bg-white/[0.06]"
              >
                <div className="text-xs uppercase tracking-[0.28em] text-white/40">{project.stage[lang]}</div>
                <h3 className="mt-4 text-2xl font-black">{project.title[lang]}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{project.summary[lang]}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition group-hover:text-white">
                  <span>{copy.openSection}</span>
                  <span aria-hidden="true">-&gt;</span>
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
              transition={{ delay: Math.min(index * 0.04, 0.18) }}
              className="scroll-mt-32 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
            >
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
                <div>
                  <div className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/55">
                    {project.stage[lang]}
                  </div>
                  <h2 className="mt-5 text-3xl font-black sm:text-4xl">{project.title[lang]}</h2>
                  <p className="mt-4 text-base leading-8 text-white/78">{project.summary[lang]}</p>
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-white/62 sm:text-base">
                    {project.strapline[lang]}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <MetaCard label={copy.stageLabel} value={project.stage[lang]} />
                  <a
                    href="#top"
                    className="inline-flex min-h-[104px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/20 px-5 text-sm font-semibold text-white transition hover:border-emerald-300/40 hover:bg-white/8"
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
    <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
      <div className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</div>
      <div className="mt-3 text-base font-semibold leading-7 text-white/85">{value}</div>
    </div>
  )
}

function ContentCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
      <h3 className="text-lg font-black sm:text-xl">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-white/72 sm:text-base">
            <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-white" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
