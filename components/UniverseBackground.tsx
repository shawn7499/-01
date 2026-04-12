'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function UniverseBackground() {
  // 宇宙主题背景图片 URLs（使用免费宇宙图片服务）
  const cosmicBackgrounds = [
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1462332420958-a05d1e7413e3?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1200&h=800&fit=crop',
  ]

  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % cosmicBackgrounds.length)
    }, 10000) // 每10秒切换一次
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 主背景图片 */}
      <div className="relative w-full h-full">
        <img
          src={cosmicBackgrounds[currentBg]}
          alt="cosmic"
          className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
        />
        {/* 深色覆盖层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>
    </div>
  )
}
