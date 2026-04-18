'use client'

import DesktopHoverNav from '@/components/DesktopHoverNav'
import { siteNavItems } from '@/lib/navigation'

type Lang = 'en' | 'zh'
type ActivePage = 'home' | 'news' | 'opportunities' | 'tokens' | 'none'

type SiteHeaderProps = {
  lang: Lang
  onLanguageChange: (lang: Lang) => void
  active: ActivePage
}

export default function SiteHeader({
  lang,
  onLanguageChange,
  active,
}: SiteHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="text-sm font-black tracking-[0.2em] md:text-2xl md:tracking-tight">
            SHAWN WICK
          </a>

          <DesktopHoverNav
            items={siteNavItems}
            lang={lang}
            activeKey={active === 'none' ? undefined : active}
            className="hidden items-center gap-5 lg:flex xl:gap-8"
          />

          <div className="flex rounded-full border border-white/10 bg-black/70 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
            {([
              { label: 'EN', value: 'en' },
              { label: '中文', value: 'zh' },
            ] as const).map((item) => (
              <button
                key={item.value}
                onClick={() => onLanguageChange(item.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 ${
                  lang === item.value
                    ? 'bg-white text-black'
                    : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {siteNavItems.map((item) => {
            const isActive = active === item.key

            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${
                  isActive
                    ? 'border-white bg-white text-black'
                    : 'border-white/10 bg-white/[0.04] text-gray-300'
                }`}
                title={item.subtitle[lang]}
              >
                {item.label[lang]}
              </a>
            )
          })}
        </div>
      </div>
    </header>
  )
}
