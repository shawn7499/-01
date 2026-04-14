'use client'

import { useEffect, useRef } from 'react'

interface AbstractBackgroundProps {
  type: 'gradient' | 'waves' | 'particles' | 'geometric' | 'orbital'
}

type Particle = {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  alpha: number
}

type Orbit = {
  centerX: number
  centerY: number
  radiusX: number
  radiusY: number
  rotation: number
  speed: number
  phase: number
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
    let orbits: Orbit[] = []

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

    const buildOrbits = () => {
      const orbitCount = width < 768 ? 3 : 5
      const baseRadius = Math.min(width, height)

      orbits = Array.from({ length: orbitCount }, (_, index) => {
        const spread = orbitCount > 1 ? index / (orbitCount - 1) : 0
        const radiusScale = width < 768 ? 0.18 + spread * 0.18 : 0.2 + spread * 0.2

        return {
          centerX: width * (0.22 + spread * 0.56),
          centerY: height * (0.34 + Math.sin(index * 0.8) * 0.08),
          radiusX: baseRadius * (radiusScale + 0.08),
          radiusY: baseRadius * radiusScale * 0.42,
          rotation: ((Math.PI / 180) * 18) + index * 0.34,
          speed: 0.24 + index * 0.06,
          phase: index * 1.6,
          alpha: 0.1 + index * 0.018,
        }
      })
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
      buildOrbits()
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

    const drawOrbital = () => {
      clear()

      const glow = ctx.createRadialGradient(width * 0.5, height * 0.42, 0, width * 0.5, height * 0.42, Math.max(width, height) * 0.56)
      glow.addColorStop(0, 'rgba(255,255,255,0.12)')
      glow.addColorStop(0.28, 'rgba(113,214,255,0.09)')
      glow.addColorStop(0.6, 'rgba(0,255,136,0.04)')
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      orbits.forEach((orbit, index) => {
        ctx.save()
        ctx.translate(orbit.centerX, orbit.centerY)
        ctx.rotate(orbit.rotation + Math.sin(time * 0.18 + index) * 0.08)

        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,255,255,${orbit.alpha})`
        ctx.lineWidth = index % 2 === 0 ? 1.2 : 0.8
        ctx.setLineDash(index % 2 === 0 ? [0, 0] : [8, 10])
        ctx.ellipse(0, 0, orbit.radiusX, orbit.radiusY, 0, 0, Math.PI * 2)
        ctx.stroke()

        const angle = time * orbit.speed + orbit.phase
        const nodeX = Math.cos(angle) * orbit.radiusX
        const nodeY = Math.sin(angle) * orbit.radiusY

        ctx.beginPath()
        ctx.fillStyle = 'rgba(255,255,255,0.78)'
        ctx.shadowColor = 'rgba(162,234,255,0.45)'
        ctx.shadowBlur = width < 768 ? 10 : 14
        ctx.arc(nodeX, nodeY, width < 768 ? 2.1 : 2.8, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = `rgba(164,237,255,${0.12 + index * 0.02})`
        ctx.lineWidth = 0.7
        ctx.moveTo(0, 0)
        ctx.lineTo(nodeX, nodeY)
        ctx.stroke()
        ctx.restore()
      })

      const shapeCount = width < 768 ? 4 : 6

      for (let i = 0; i < shapeCount; i += 1) {
        const drift = time * (0.18 + i * 0.02)
        const centerX = width * (0.14 + (i / Math.max(shapeCount - 1, 1)) * 0.72) + Math.sin(drift + i) * 12
        const centerY = height * (0.24 + ((i % 3) * 0.22)) + Math.cos(drift * 0.8 + i * 1.3) * 10
        const size = (width < 768 ? 22 : 30) + (i % 3) * 10
        const rotation = drift * 0.35 + i

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation)
        ctx.beginPath()

        for (let side = 0; side < 4; side += 1) {
          const theta = (Math.PI * 2 * side) / 4
          const px = Math.cos(theta) * size
          const py = Math.sin(theta) * size * 0.56

          if (side === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }

        ctx.closePath()
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + (i % 3) * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      }

      particles.forEach((particle, index) => {
        particle.x += particle.speedX * 0.55
        particle.y += particle.speedY * 0.55

        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20

        const pulse = 0.48 + Math.sin(time * 0.9 + index) * 0.18

        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${particle.alpha * pulse * 0.75})`
        ctx.arc(particle.x, particle.y, particle.radius * 0.9, 0, Math.PI * 2)
        ctx.fill()
      })
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
        case 'orbital':
          drawOrbital()
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
