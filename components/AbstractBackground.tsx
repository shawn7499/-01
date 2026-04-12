'use client'

import { useEffect, useRef } from 'react'

interface AbstractBackgroundProps {
  type: 'gradient' | 'waves' | 'particles' | 'geometric'
}

export default function AbstractBackground({ type }: AbstractBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    let animationId: number
    let time = 0

    const drawGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#0a0e27')
      gradient.addColorStop(0.5, '#1a2f5a')
      gradient.addColorStop(1, '#0a0e27')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawWaves = () => {
      ctx.fillStyle = '#0a0e27'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)'
      ctx.lineWidth = 2

      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 10) {
          const y = canvas.height / 2 + Math.sin((x + time) * 0.005 + i) * 50 + i * 30
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const drawParticles = () => {
      ctx.fillStyle = '#0a0e27'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time * 0.001 + i) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.0008 + i * 0.5) * 0.5 + 0.5) * canvas.height
        const size = Math.sin(time * 0.002 + i) * 2 + 3
        const opacity = Math.sin(time * 0.003 + i) * 0.5 + 0.5

        ctx.fillStyle = `rgba(100, 150, 255, ${opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawGeometric = () => {
      ctx.fillStyle = '#0a0e27'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(100, 150, 255, 0.4)'
      ctx.lineWidth = 1

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const x = (i * canvas.width) / 10 + Math.sin(time * 0.001 + i + j) * 20
          const y = (j * canvas.height) / 10 + Math.cos(time * 0.001 + i + j) * 20
          const size = 30 + Math.sin(time * 0.002 + i * j) * 15

          ctx.beginPath()
          ctx.rect(x - size / 2, y - size / 2, size, size)
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      time += 1

      try {
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
      } catch (e) {
        console.error('Canvas drawing error:', e)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationId)
    }
  }, [type])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        display: 'block',
        backgroundColor: '#0a0e27',
      }}
    />
  )
}
