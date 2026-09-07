import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface CreativeHistogramLevelsProps {
  label?: string
  blackPoint?: number // 0 to 255
  midPoint?: number // 0.1 to 9.9 (default 1.0)
  whitePoint?: number // 0 to 255
  onChange?: (values: { black: number; mid: number; white: number }) => void
  className?: string
}

export const CreativeHistogramLevels: React.FC<CreativeHistogramLevelsProps> = ({
  label = "Levels",
  blackPoint: initialBlack = 15,
  midPoint: initialMid = 1.0,
  whitePoint: initialWhite = 240,
  onChange,
  className,
}) => {
  const [black, setBlack] = useState(initialBlack)
  const [mid, setMid] = useState(initialMid)
  const [white, setWhite] = useState(initialWhite)
  const trackRef = useRef<HTMLDivElement>(null)

  // Mock histogram curve bars
  const bars = [
    2, 4, 8, 12, 18, 26, 32, 28, 22, 15, 12, 18, 25, 38, 45, 40, 30, 22, 18, 14,
    10, 8, 12, 19, 25, 20, 15, 10, 6, 3,
  ]

  const handlePointerDown = (type: "black" | "mid" | "white") => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const handleMove = (moveEvent: PointerEvent) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const ratio = Math.min(Math.max((moveEvent.clientX - rect.left) / rect.width, 0), 1)

      if (type === "black") {
        const val = Math.min(Math.round(ratio * 255), white - 10)
        setBlack(val)
        onChange?.({ black: val, mid, white })
      } else if (type === "white") {
        const val = Math.max(Math.round(ratio * 255), black + 10)
        setWhite(val)
        onChange?.({ black, mid, white: val })
      } else {
        // mid is normalized between black and white
        const val = Number((0.2 + ratio * 2).toFixed(2))
        setMid(val)
        onChange?.({ black, mid: val, white })
      }
    }

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
      window.removeEventListener("pointercancel", handleUp)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
    window.addEventListener("pointercancel", handleUp)
  }

  const blackPercent = (black / 255) * 100
  const whitePercent = (white / 255) * 100
  const midPercent = blackPercent + ((whitePercent - blackPercent) * (mid / 2))

  // Pointer scrub for number readouts
  const handleNumberScrub = (type: "black" | "white") => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startVal = type === "black" ? black : white

    const handleMove = (moveEvent: PointerEvent) => {
      const delta = Math.round((moveEvent.clientX - startX) * 0.5)
      if (type === "black") {
        const next = Math.max(0, Math.min(startVal + delta, white - 5))
        setBlack(next)
        onChange?.({ black: next, mid, white })
      } else {
        const next = Math.max(black + 5, Math.min(startVal + delta, 255))
        setWhite(next)
        onChange?.({ black, mid, white: next })
      }
    }

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
  }

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10",
        className
      )}
    >
      <Label className="truncate text-muted-foreground">{label}</Label>

      {/* Histogram Wave Track */}
      <div
        ref={trackRef}
        className="relative mx-3 flex h-4 flex-1 items-end rounded-md border border-border/70 bg-background/50 px-1 overflow-hidden"
      >
        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-between px-0.5 opacity-30">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-[2px] bg-foreground/60 rounded-t-[0.5px]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Selected Range Tint */}
        <div
          className="absolute inset-y-0 bg-foreground/[0.08] dark:bg-foreground/[0.12] pointer-events-none"
          style={{
            left: `${blackPercent}%`,
            width: `${Math.max(0, whitePercent - blackPercent)}%`,
          }}
        />

        {/* Black Slider Pin */}
        <div
          onPointerDown={handlePointerDown("black")}
          className="absolute bottom-0 h-full w-[1px] -translate-x-1/2 cursor-ew-resize bg-foreground hover:bg-accent active:bg-accent"
          style={{ left: `${blackPercent}%` }}
          title={`Black: ${black}`}
        />

        {/* Midpoint Slider Pin */}
        <div
          onPointerDown={handlePointerDown("mid")}
          className="absolute bottom-0 h-full w-[1px] -translate-x-1/2 cursor-ew-resize bg-muted-foreground/80 hover:bg-accent active:bg-accent"
          style={{ left: `${Math.min(Math.max(midPercent, 5), 95)}%` }}
          title={`Midtone: ${mid}`}
        />

        {/* White Slider Pin */}
        <div
          onPointerDown={handlePointerDown("white")}
          className="absolute bottom-0 h-full w-[1px] -translate-x-1/2 cursor-ew-resize bg-foreground hover:bg-accent active:bg-accent"
          style={{ left: `${whitePercent}%` }}
          title={`White: ${white}`}
        />
      </div>

      <div className="flex items-center gap-1 font-mono text-[8px] tabular-nums text-foreground">
        <span
          onPointerDown={handleNumberScrub("black")}
          className="cursor-ew-resize rounded px-1 py-0.5 transition-colors hover:bg-secondary hover:text-accent active:bg-accent/20"
          title="Drag horizontally to scrub black point"
        >
          {black}
        </span>
        <span className="text-border">/</span>
        <span
          onPointerDown={handleNumberScrub("white")}
          className="cursor-ew-resize rounded px-1 py-0.5 transition-colors hover:bg-secondary hover:text-accent active:bg-accent/20"
          title="Drag horizontally to scrub white point"
        >
          {white}
        </span>
      </div>
    </div>
  )
}
