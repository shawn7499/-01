'use client'

import { type NavItem, type NavLang } from '@/lib/navigation'

type DesktopHoverNavProps = {
  items: NavItem[]
  lang: NavLang
  activeKey?: string
  className?: string
}

export default function DesktopHoverNav({
  items,
  lang,
  activeKey,
  className,
}: DesktopHoverNavProps) {
  return (
    <nav className={className ?? 'hidden items-center gap-8 md:flex'}>
      {items.map((item) => {
        const isActive = activeKey === item.key

        return (
          <div key={item.key} className="group relative">
            <a
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`text-sm transition ${
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label[lang]}
            </a>

            <div className="pointer-events-none absolute left-1/2 top-full z-50 hidden w-64 -translate-x-1/2 pt-3 group-hover:block group-focus-within:block">
              <div className="rounded-[1.35rem] border border-white/10 bg-black/95 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">
                  {item.label[lang]}
                </div>
                <p className="mt-2 text-sm leading-6 text-white/72">{item.subtitle[lang]}</p>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
