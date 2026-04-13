'use client'

import { useState } from 'react'

interface LanguageSwitcherProps {
  currentLang: 'en' | 'zh'
  onLanguageChange: (lang: 'en' | 'zh') => void
}

export default function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <>
      <style>{`
        .lang-switcher {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 99999;
          display: flex;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .lang-switcher {
            top: 10px;
            right: 10px;
            gap: 4px;
          }
        }
        .lang-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .lang-btn {
            padding: 6px 12px;
            font-size: 12px;
          }
        }
        .lang-btn.active {
          background-color: white;
          color: black;
        }
        .lang-btn.inactive {
          background-color: #374151;
          color: white;
        }
        .lang-btn.inactive:hover {
          background-color: #4b5563;
        }
      `}</style>
      <div className="lang-switcher">
        <button
          onClick={() => onLanguageChange('en')}
          className={`lang-btn ${currentLang === 'en' ? 'active' : 'inactive'}`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange('zh')}
          className={`lang-btn ${currentLang === 'zh' ? 'active' : 'inactive'}`}
        >
          中文
        </button>
      </div>
    </>
  )
}
