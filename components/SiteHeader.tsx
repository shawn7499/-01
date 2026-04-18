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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/8 bg-[rgba(5,8,12,0.72)] backdrop-blur-2xl">
      <div className="page-container py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            className="text-xs font-semibold tracking-[0.34em] text-white/88 md:text-sm"
          >
            SHAWN WICK
          </a>

          <DesktopHoverNav
            items={siteNavItems}
            lang={lang}
            activeKey={active === 'none' ? undefined : active}
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          />

          <div className="flex rounded-full border border-white/10 bg-[rgba(10,14,20,0.76)] p-1 shadow-[0_14px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            {([
              { label: 'EN', value: 'en' },
              { label: '中文', value: 'zh' },
            ] as const).map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => onLanguageChange(item.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 ${
                  lang === item.value
                    ? 'bg-white text-black'
                    : 'text-white/68 hover:bg-white/8 hover:text-white'
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
                    : 'border-white/10 bg-white/[0.04] text-white/72'
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
