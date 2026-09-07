import React, { useRef, useCallback, useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { SlidingNumber } from "./sliding-number"
import { Label } from "./label"

export interface CreativeSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  unit?: string
  className?: string
  disabled?: boolean
  formatValue?: (val: number) => string | number
  showDots?: boolean
}

export const CreativeSlider: React.FC<CreativeSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = "",
  className,
  disabled = false,
  formatValue,
  showDots = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Clamp helper
  const clamp = (val: number, minVal: number, maxVal: number) =>
    Math.min(Math.max(val, minVal), maxVal)

  // Calculate percentage fill (0 to 100)
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  // Calculate step points/dots (capped to 60 to prevent over-dense rendering)
  const stepDots = useMemo(() => {
    if (!showDots) return []
    const totalSteps = Math.round((max - min) / step)
    if (totalSteps <= 0 || totalSteps > 60) return []

    const dots: { val: number; pct: number }[] = []
    for (let i = 0; i <= totalSteps; i++) {
      const stepVal = min + i * step
      const pct = ((stepVal - min) / (max - min)) * 100
      dots.push({ val: stepVal, pct })
    }
    return dots
  }, [min, max, step, showDots])

  const calculateSteppedValue = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return value
      const rect = containerRef.current.getBoundingClientRect()
      const rawRatio = (clientX - rect.left) / rect.width
      const clampedRatio = Math.max(0, Math.min(1, rawRatio))
      const rawValue = min + clampedRatio * (max - min)

      const steppedValue = Math.round(rawValue / step) * step
      return clamp(
        Number(steppedValue.toFixed(step < 1 ? 2 : 0)),
        min,
        max
      )
    },
    [min, max, step, value]
  )

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    isDraggingRef.current = true
    setHoverValue(null)
    e.currentTarget.setPointerCapture(e.pointerId)
    const newVal = calculateSteppedValue(e.clientX)
    onChange(newVal)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    const calculated = calculateSteppedValue(e.clientX)
    if (isDraggingRef.current) {
      onChange(calculated)
    } else {
      setHoverValue(calculated)
    }
  }

  const handlePointerEnter = () => {
    if (!disabled) setIsHovered(true)
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    if (!isDraggingRef.current) {
      setHoverValue(null)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignore if pointer capture was lost
    }
    if (!e.currentTarget.matches(":hover")) {
      setIsHovered(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      onChange(clamp(value + step, min, max))
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      onChange(clamp(value - step, min, max))
    } else if (e.key === "Home") {
      e.preventDefault()
      onChange(min)
    } else if (e.key === "End") {
      e.preventDefault()
      onChange(max)
    }
  }

  const isPreviewing = hoverValue !== null && hoverValue !== value
  const displayVal = isPreviewing ? hoverValue : value

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative flex h-8 w-full select-none items-center overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-ew-resize hover:border-foreground/20 active:border-foreground/25",
        className
      )}
    >
      {/* Visual Filled Track */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 bg-muted/80 transition-[width] duration-75 ease-out group-hover:bg-muted group-active:bg-muted"
        style={{ width: `${percentage}%` }}
      />

      {/* Hover Step Dots */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center transition-opacity duration-150",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        {stepDots.map((dot) => {
          const isCurrent = dot.val === value
          const isHover = dot.val === hoverValue
          return (
            <span
              key={`dot-${dot.val}`}
              className={cn(
                "absolute h-[2px] w-[2px] -translate-x-1/2 rounded-full transition-colors duration-100",
                isHover
                  ? "bg-foreground/50"
                  : isCurrent
                  ? "bg-accent/80"
                  : "bg-muted-foreground/30"
              )}
              style={{ left: `${dot.pct}%` }}
            />
          )
        })}
      </div>

      {/* Track Indicator Edge */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-accent transition-[left] duration-75 ease-out"
        style={{ left: `calc(${percentage}% - 1px)` }}
      />

      {/* Label on the left */}
      {label && (
        <Label className="pointer-events-none relative z-10 truncate text-muted-foreground">
          {label}
        </Label>
      )}

      {/* Animated Counter on the right inside slider */}
      <div className="pointer-events-none relative z-10 ml-auto flex items-center">
        <SlidingNumber
          value={displayVal}
          unit={unit}
          formatValue={formatValue}
          className={isPreviewing ? "text-muted-foreground/70" : "text-foreground"}
        />
      </div>
    </div>
  )
}
