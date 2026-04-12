'use client'

import { useEffect, useRef } from 'react'

export default function MosaicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const blockSize = 40
    const colors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.2)', 'rgba(0,255,136,0.05)']

    let animationId: number
    const animate = () => {
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制模糊马赛克
      for (let x = 0; x < canvas.width; x += blockSize) {
        for (let y = 0; y < canvas.height; y += blockSize) {
          const colorIndex = Math.floor(Math.random() * colors.length)
          ctx.fillStyle = colors[colorIndex]
          ctx.fillRect(x, y, blockSize, blockSize)
        }
      }

      // 添加高斯模糊效果
      ctx.filter = 'blur(8px)'
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: '#000000' }}
    />
  )
}
