'use client'

import { useEffect, useRef } from 'react'

export default function GradientMosaic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const blockSize = 50
    const colors = [
      { r: 100, g: 150, b: 255 },  // 蓝色
      { r: 150, g: 100, b: 255 },  // 紫色
      { r: 255, g: 100, b: 200 },  // 粉色
      { r: 100, g: 200, b: 255 },  // 青色
      { r: 200, g: 100, b: 255 },  // 紫粉
      { r: 100, g: 150, b: 200 },  // 蓝紫
    ]

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.fillStyle = '#0a0e27'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let x = 0; x < canvas.width; x += blockSize) {
        for (let y = 0; y < canvas.height; y += blockSize) {
          // 基于位置和时间的伪随机
          const seed = Math.sin(x * 0.001 + y * 0.001 + time) * 0.5 + 0.5
          const colorIndex = Math.floor(seed * colors.length)
          const color = colors[colorIndex]

          // 添加时间变化的亮度
          const brightness = 0.3 + Math.sin(time + x * 0.002 + y * 0.002) * 0.3
          const r = Math.floor(color.r * brightness)
          const g = Math.floor(color.g * brightness)
          const b = Math.floor(color.b * brightness)
          const a = 0.4 + brightness * 0.3

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
          ctx.fillRect(x, y, blockSize, blockSize)
        }
      }

      // 添加高斯模糊
      ctx.filter = 'blur(12px)'
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
      style={{ background: '#0a0e27' }}
    />
  )
}
