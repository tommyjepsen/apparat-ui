import React, { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface CreativeRangeSliderProps {
  label?: string
  min?: number
  max?: number
  step?: number
  value?: [number, number]
  onChange?: (value: [number, number]) => void
  unit?: string
  className?: string
  disabled?: boolean
}

export const CreativeRangeSlider: React.FC<CreativeRangeSliderProps> = ({
  label = "Range",
  min = 0,
  max = 100,
  step = 1,
  value: initialValue = [20, 80],
  onChange,
  unit = "",
  className,
  disabled = false,
}) => {
  const [range, setRange] = useState<[number, number]>(initialValue)
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingHandleRef = useRef<0 | 1 | null>(null)

  useEffect(() => {
    setRange(initialValue)
  }, [initialValue])

  const getValueFromPointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return 0
      const rect = trackRef.current.getBoundingClientRect()
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      const raw = min + ratio * (max - min)
      const stepped = Math.round(raw / step) * step
      return Math.min(Math.max(stepped, min), max)
    },
    [min, max, step]
  )

  const handlePointerDown = (handleIndex: 0 | 1) => (e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    draggingHandleRef.current = handleIndex
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingHandleRef.current === null) return
    const newVal = getValueFromPointer(e.clientX)

    setRange((prev) => {
      let next: [number, number]
      if (draggingHandleRef.current === 0) {
        next = [Math.min(newVal, prev[1] - step), prev[1]]
      } else {
        next = [prev[0], Math.max(newVal, prev[0] + step)]
      }
      onChange?.(next)
      return next
    })
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingHandleRef.current !== null) {
      try {
        ;(e.target as Element).releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      draggingHandleRef.current = null
    }
  }

  // Percentage positions
  const leftPct = ((range[0] - min) / (max - min)) * 100
  const rightPct = ((range[1] - min) / (max - min)) * 100

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-foreground/10 active:border-foreground/12",
        className
      )}
    >
      {/* Label */}
      <Label className="z-10 truncate text-muted-foreground">{label}</Label>

      {/* Slider Track Area */}
      <div
        ref={trackRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative mx-3 flex h-full flex-1 touch-none items-center"
      >
        {/* Background Track line */}
        <div className="h-1 w-full rounded-full bg-border" />

        {/* Highlighted Active Range Fill */}
        <div
          className="absolute h-1 rounded-full bg-accent"
          style={{
            left: `${leftPct}%`,
            width: `${rightPct - leftPct}%`,
          }}
        />

        {/* Handle Min */}
        <div
          onPointerDown={handlePointerDown(0)}
          className="absolute h-3 w-3 -translate-x-1/2 cursor-grab rounded-full border border-accent bg-background shadow-xs transition-transform active:scale-125 active:cursor-grabbing"
          style={{ left: `${leftPct}%` }}
        />

        {/* Handle Max */}
        <div
          onPointerDown={handlePointerDown(1)}
          className="absolute h-3 w-3 -translate-x-1/2 cursor-grab rounded-full border border-accent bg-background shadow-xs transition-transform active:scale-125 active:cursor-grabbing"
          style={{ left: `${rightPct}%` }}
        />
      </div>

      {/* Value Readout */}
      <div className="z-10 flex items-center gap-1 font-mono text-[8px] tabular-nums text-foreground">
        <span>{range[0]}</span>
        <span className="text-muted-foreground">-</span>
        <span>{range[1]}{unit}</span>
      </div>
    </div>
  )
}
