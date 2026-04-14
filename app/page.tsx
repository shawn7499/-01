'use client'

import Link from 'next/link'
import { useState } from 'react'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import { translations } from '@/lib/translations'

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const t = translations[lang]

  const anchorLinks = [
    { href: '#focus', label: t.nav.focus },
    { href: '#products', label: t.nav.products },
    { href: '#roadmap', label: t.nav.roadmap },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <div className="relative overflow-x-hidden bg-[#050505] text-white">
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at center, black 35%, transparent 82%)',
        }}
      />

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050505]/78 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-sm font-black tracking-[0.28em] text-white sm:text-base">
              SHAWN WICK
            </Link>

            <div className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
              {anchorLinks.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
              ))}
              <Link href="/news" className="transition hover:text-white">
                {t.nav.news}
              </Link>
            </div>

            <Link
              href="/news/signals"
              className="inline-flex items-center rounded-full border border-white/10 bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#dbeafe] sm:text-sm"
            >
              {t.nav.signalFeed}
            </Link>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {anchorLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/news"
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
            >
              {t.nav.news}
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section className="relative pt-32 sm:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_12%_18%,rgba(61,137,179,0.24),transparent_24%),radial-gradient(circle_at_80%_16%,rgba(124,92,255,0.18),transparent_20%),radial-gradient(circle_at_50%_75%,rgba(43,166,132,0.14),transparent_28%)]"
          />

          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-18 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_26rem] lg:px-8 lg:pb-24">
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100/80">
                <span className="h-2 w-2 rounded-full bg-cyan-200" />
                {t.hero.eyebrow}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-7xl">
                {t.hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                {t.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/news/signals"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#dbeafe] sm:text-base"
                >
                  {t.hero.primaryCta}
                </Link>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/25 hover:bg-white/[0.08] sm:text-base"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>

              <p className="mt-8 max-w-2xl text-sm leading-6 text-white/52">{t.hero.note}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {t.hero.status.map((item) => (
                  <div key={item.label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/38">{item.label}</div>
                    <div className="mt-2 text-sm font-semibold text-white/88">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pt-10">
              <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/70">{t.hero.panel.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">{t.hero.panel.title}</h2>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/55">
                    shawnwick.com
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {t.hero.panel.items.map((item, index) => (
                    <div
                      key={item}
                      className="flex gap-4 rounded-[1.4rem] border border-white/8 bg-black/25 p-4 text-sm leading-6 text-white/72"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-white/70">
                        0{index + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/38">{t.hero.panel.routesTitle}</p>
                      <p className="mt-2 text-sm text-white/58">{t.hero.panel.routesDescription}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {t.products.items.map((item, index) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center justify-between rounded-[1.3rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-white/16 hover:bg-white/[0.06]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs uppercase tracking-[0.18em] text-white/32">0{index + 1}</span>
                            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] text-white/56">
                              {item.status}
                            </span>
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">{item.title}</div>
                        </div>
                        <span className="ml-4 text-sm text-white/40">-&gt;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="focus" className="scroll-mt-28 border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.32em] text-white/40">{t.focus.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{t.focus.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">{t.focus.description}</p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {t.focus.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/58">
                    {item.tag}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="scroll-mt-28 border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.32em] text-white/40">{t.products.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{t.products.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">{t.products.description}</p>
              </div>
              <div className="rounded-[1.6rem] border border-cyan-300/14 bg-cyan-300/7 px-5 py-4 text-sm leading-6 text-cyan-50/82 lg:max-w-sm">
                {t.products.note}
              </div>
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-[1.2fr_1fr_1fr]">
              {t.products.items.map((item, index) => (
                <article
                  key={item.title}
                  className={`rounded-[2rem] border p-6 ${
                    index === 0
                      ? 'border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(255,255,255,0.03))] shadow-[0_24px_60px_rgba(17,120,146,0.08)]'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/58">
                      {item.status}
                    </span>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/32">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/62"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <Link
                      href={item.href}
                      className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/[0.12]"
                    >
                      {item.cta}
                    </Link>
                    <span className="text-sm text-white/28">0{index + 1}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="scroll-mt-28 border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.32em] text-white/40">{t.roadmap.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{t.roadmap.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">{t.roadmap.description}</p>
            </div>

            <div className="mt-10 space-y-5">
              {t.roadmap.phases.map((phase) => (
                <article
                  key={phase.step}
                  className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:items-start lg:p-8"
                >
                  <div>
                    <div className="text-5xl font-black leading-none text-white/20">{phase.step}</div>
                    <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/40">{phase.period}</div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">{phase.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {phase.bullets.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 border-t border-white/8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-white/40">{t.contact.eyebrow}</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">{t.contact.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">{t.contact.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:shawnwick7499@gmail.com"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#dbeafe] sm:text-base"
                >
                  {t.contact.primaryCta}
                </a>
                <a
                  href="https://github.com/shawn7499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/22 hover:bg-white/[0.1] sm:text-base"
                >
                  {t.contact.secondaryCta}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-white/35">{t.contact.channelsTitle}</p>
              <div className="mt-5 space-y-3">
                {t.contact.channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-black/20 px-4 py-4 transition hover:border-white/16 hover:bg-white/[0.05]"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">{channel.label}</div>
                      <div className="mt-1 text-xs text-white/52">{channel.value}</div>
                    </div>
                    <span className="text-sm text-white/38">-&gt;</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-black tracking-[0.28em] text-white/86">{t.footer.title}</div>
            <div className="mt-2 max-w-xl">{t.footer.description}</div>
          </div>
          <div>{t.footer.copyright}</div>
        </div>
      </footer>
    </div>
  )
}
