'use client'

import { useEffect, useRef } from 'react'

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 创建粒子数组
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      update: () => void
      draw: () => void
    }> = []
    const particleCount = 150

    const createParticle = () => {
      const w = canvas.width
      const h = canvas.height
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        update() {
          this.x += this.vx
          this.y += this.vy
          if (this.x < 0) this.x = w
          if (this.x > w) this.x = 0
          if (this.y < 0) this.y = h
          if (this.y > h) this.y = 0
        },
        draw() {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          ctx.fill()
        },
      }
    }

    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }

    // 绘制渐变背景
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#0a0e27')
      gradient.addColorStop(0.5, '#1a1f3a')
      gradient.addColorStop(1, '#0f0f1e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // 绘制连接线
    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            ctx.globalAlpha = 0.1 * (1 - distance / 100)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
    }

    // 动画循环
    let animationId: number
    const animate = () => {
      drawBackground()
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      drawConnections()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // 响应窗口大小变化
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
      style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f0f1e 100%)' }}
    />
  )
}
