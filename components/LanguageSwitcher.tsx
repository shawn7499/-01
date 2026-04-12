'use client'

import { useState } from 'react'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'zh'
  onLanguageChange: (lang: 'en' | 'zh') => void
}

export default function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="fixed top-20 right-6 z-50 flex gap-2">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-4 py-2 rounded font-bold transition-all ${
          currentLang === 'en'
            ? 'bg-white text-black'
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('zh')}
        className={`px-4 py-2 rounded font-bold transition-all ${
          currentLang === 'zh'
            ? 'bg-white text-black'
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}
      >
        中文
      </button>
    </div>
  )
}
