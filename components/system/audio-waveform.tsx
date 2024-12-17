import React, { useRef, useEffect } from 'react'

interface AudioWaveformProps {
  audioBuffer: AudioBuffer
  currentTime: number
  duration: number
}

export function AudioWaveform({ audioBuffer, currentTime, duration }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    const data = audioBuffer.getChannelData(0)
    const step = Math.ceil(data.length / canvas.width)
    const amp = canvas.height / 2

    const drawWaveform = (start: number, end: number, color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = start; i < end; i++) {
        const slice = data.slice(i * step, (i + 1) * step)
        const min = slice.reduce((a, b) => Math.min(a, b))
        const max = slice.reduce((a, b) => Math.max(a, b))
        ctx.moveTo(i, (1 + min) * amp)
        ctx.lineTo(i, (1 + max) * amp)
      }

      ctx.stroke()
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawWaveform(0, canvas.width, '#d1d5db')

    const progress = currentTime / duration
    const progressWidth = canvas.width * progress
    drawWaveform(0, progressWidth, '#3b82f6')

  }, [audioBuffer, currentTime, duration])

  return <canvas ref={canvasRef} className="w-full h-12" />
}

