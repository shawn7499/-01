'use client'

import { useEffect, useRef } from 'react'

interface AbstractBackgroundProps {
  type: 'gradient' | 'waves' | 'particles' | 'geometric'
}

type Particle = {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  alpha: number
}

export default function AbstractBackground({ type }: AbstractBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let isVisible = true
    let pageVisible = !document.hidden
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let time = 0
    let particles: Particle[] = []

    const buildParticles = () => {
      const particleCount = width < 768 ? 16 : 28
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: width < 768 ? Math.random() * 1.6 + 1.4 : Math.random() * 2.2 + 1.8,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.18,
        alpha: Math.random() * 0.28 + 0.1,
      }))
    }

    const updateSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      width = parent.clientWidth
      height = parent.clientHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      buildParticles()
      drawFrame()
    }

    const clear = () => {
      ctx.clearRect(0, 0, width, height)
    }

    const drawGradient = () => {
      clear()
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, 'rgba(255,255,255,0.06)')
      gradient.addColorStop(0.5, 'rgba(0,255,136,0.04)')
      gradient.addColorStop(1, 'rgba(255,255,255,0.02)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    const drawWaves = () => {
      clear()
      const waveCount = width < 768 ? 3 : 5

      for (let i = 0; i < waveCount; i += 1) {
        ctx.beginPath()
        ctx.lineWidth = i === waveCount - 1 ? 1.8 : 1.2
        ctx.strokeStyle = `rgba(255,255,255,${0.06 + i * 0.02})`

        for (let x = 0; x <= width; x += 8) {
          const amplitude = 14 + i * 7
          const offsetY = height * (0.28 + i * 0.12)
          const y = offsetY + Math.sin((x * 0.008) + time * 0.7 + i * 0.9) * amplitude

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.stroke()
      }
    }

    const drawParticles = () => {
      clear()

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        const pulse = 0.45 + Math.sin(time * 1.2 + index) * 0.2

        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${particle.alpha * pulse})`
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < (width < 768 ? 80 : 120)) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - distance / 120)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const drawGeometric = () => {
      clear()
      const columns = width < 768 ? 5 : 8
      const rows = width < 768 ? 6 : 8
      const cellWidth = width / columns
      const cellHeight = height / rows

      for (let x = 0; x < columns; x += 1) {
        for (let y = 0; y < rows; y += 1) {
          const centerX = cellWidth * x + cellWidth / 2
          const centerY = cellHeight * y + cellHeight / 2
          const driftX = Math.sin(time + x * 0.8 + y * 0.4) * 6
          const driftY = Math.cos(time * 0.9 + y * 0.7 + x * 0.2) * 6
          const size = Math.min(cellWidth, cellHeight) * (0.28 + ((x + y) % 3) * 0.04)

          ctx.beginPath()
          ctx.strokeStyle = `rgba(255,255,255,${0.05 + ((x + y) % 4) * 0.015})`
          ctx.lineWidth = 1
          ctx.rect(centerX - size / 2 + driftX, centerY - size / 2 + driftY, size, size)
          ctx.stroke()
        }
      }
    }

    const drawFrame = () => {
      switch (type) {
        case 'gradient':
          drawGradient()
          break
        case 'waves':
          drawWaves()
          break
        case 'particles':
          drawParticles()
          break
        case 'geometric':
          drawGeometric()
          break
      }
    }

    const animate = () => {
      if (!isVisible || !pageVisible || reducedMotion) {
        drawFrame()
        return
      }

      time += 0.012
      drawFrame()
      animationId = window.requestAnimationFrame(animate)
    }

    const restartIfNeeded = () => {
      window.cancelAnimationFrame(animationId)
      animationId = 0

      if (!reducedMotion && isVisible && pageVisible) {
        animationId = window.requestAnimationFrame(animate)
      } else {
        drawFrame()
      }
    }

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden
      restartIfNeeded()
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      restartIfNeeded()
    }

    updateSize()

    resizeObserver = new ResizeObserver(() => updateSize())
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true
        restartIfNeeded()
      },
      { threshold: 0.05, rootMargin: '180px' }
    )
    intersectionObserver.observe(canvas)

    document.addEventListener('visibilitychange', handleVisibilityChange)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', handleMotionChange)

    restartIfNeeded()

    return () => {
      window.cancelAnimationFrame(animationId)
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
      style={{ display: 'block' }}
    />
  )
}
