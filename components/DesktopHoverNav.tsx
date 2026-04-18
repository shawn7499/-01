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
              className={`inline-flex items-center rounded-full px-1 py-2 text-[0.78rem] font-medium tracking-[0.22em] transition ${
                isActive ? 'text-white' : 'text-white/62 hover:text-white'
              }`}
            >
              {item.label[lang]}
            </a>

            <div className="pointer-events-none absolute left-1/2 top-full z-50 hidden w-64 -translate-x-1/2 pt-3 group-hover:block group-focus-within:block">
              <div className="glass-panel rounded-[1.25rem] px-4 py-3">
                <div className="section-label text-[10px] text-white/42">
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
