'use client'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'zh'
  onLanguageChange: (lang: 'en' | 'zh') => void
  className?: string
}

export default function LanguageSwitcher({
  currentLang,
  onLanguageChange,
  className,
}: LanguageSwitcherProps) {
  return (
    <div
      className={
        className ??
        'flex rounded-full border border-white/10 bg-[rgba(10,14,20,0.76)] p-1 shadow-[0_14px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl'
      }
    >
      {([
        { label: 'EN', value: 'en' },
        { label: '中文', value: 'zh' },
      ] as const).map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onLanguageChange(item.value)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 ${
            currentLang === item.value
              ? 'bg-white text-black'
              : 'text-white/68 hover:bg-white/8 hover:text-white'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
