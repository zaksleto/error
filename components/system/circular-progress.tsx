"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { cn, DataProgress } from "@/lib/utils"

export function CircularProgress({
  value,
  time,
  color = "hsl(var(--primary))",
  description,
  className,
  ...props
}: DataProgress & React.HTMLAttributes<HTMLDivElement>) {
  const [progress, setProgress] = useState(0)
  const size = 120
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  useEffect(() => {
    const steps = 60 // Number of steps for smooth animation
    const increment = value / steps
    const stepDuration = (time * 1000) / steps; // Convert time from seconds to milliseconds
    let currentProgress = 0

    const interval = setInterval(() => {
      if (currentProgress < value) {
        currentProgress = Math.min(currentProgress + increment, value)
        setProgress(currentProgress)
      } else {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [value, time])

  return (
    <div className={cn("flex flex-col items-center gap-2", className)} {...props}>
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-200 ease-in-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-semibold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{description}</span>
    </div>
  )
}

