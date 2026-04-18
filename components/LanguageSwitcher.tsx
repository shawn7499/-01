'use client'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'zh'
  onLanguageChange: (lang: 'en' | 'zh') => void
}

export default function LanguageSwitcher({
  currentLang,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div className="fixed right-4 top-20 z-50 flex rounded-full border border-white/10 bg-black/70 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:right-6 sm:top-24">
      {([
        { label: 'EN', value: 'en' },
        { label: '中文', value: 'zh' },
      ] as const).map((item) => (
        <button
          key={item.value}
          onClick={() => onLanguageChange(item.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 ${
            currentLang === item.value
              ? 'bg-white text-black'
              : 'text-white/70 hover:bg-white/8 hover:text-white'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
