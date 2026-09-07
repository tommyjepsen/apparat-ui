import React, { useState, useRef, useCallback } from "react"
import { Play } from "lucide-react"
import { Label } from "../atoms/label"
import { CreativeButton } from "../atoms/creative-button"
import { CreativeSelect } from "./creative-select"
import { cn } from "@/lib/utils"

export interface EasingPoint {
  x: number // 0 to 1
  y: number // 0 to 1
}

export interface CreativeEasingCurveProps {
  label?: string
  p1?: EasingPoint
  p2?: EasingPoint
  onChange?: (p1: EasingPoint, p2: EasingPoint) => void
  className?: string
}

const PRESETS: Record<string, { label: string; p1: EasingPoint; p2: EasingPoint }> = {
  ease: { label: "Ease", p1: { x: 0.25, y: 0.1 }, p2: { x: 0.25, y: 1 } },
  easeIn: { label: "Ease In", p1: { x: 0.42, y: 0 }, p2: { x: 1, y: 1 } },
  easeOut: { label: "Ease Out", p1: { x: 0, y: 0 }, p2: { x: 0.58, y: 1 } },
  easeInOut: { label: "Ease In Out", p1: { x: 0.42, y: 0 }, p2: { x: 0.58, y: 1 } },
  springy: { label: "Springy", p1: { x: 0.175, y: 0.885 }, p2: { x: 0.32, y: 1.275 } },
}

export const CreativeEasingCurve: React.FC<CreativeEasingCurveProps> = ({
  label = "Easing",
  p1: initialP1 = { x: 0.25, y: 0.1 },
  p2: initialP2 = { x: 0.25, y: 1.0 },
  onChange,
  className,
}) => {
  const [p1, setP1] = useState<EasingPoint>(initialP1)
  const [p2, setP2] = useState<EasingPoint>(initialP2)
  const [preset, setPreset] = useState("ease")
  const [isPlaying, setIsPlaying] = useState(false)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const draggingHandleRef = useRef<1 | 2 | null>(null)

  // SVG coordinate dimensions
  const width = 200
  const height = 120
  const padding = 18
  const plotWidth = width - padding * 2
  const plotHeight = height - padding * 2

  // Transform normalized 0..1 to SVG pixel coordinates (Y is inverted)
  const toSvgX = (x: number) => padding + x * plotWidth
  const toSvgY = (y: number) => height - padding - y * plotHeight

  // Transform SVG coordinate back to 0..1
  const fromSvgX = (svgX: number) => Math.min(Math.max((svgX - padding) / plotWidth, 0), 1)
  const fromSvgY = (svgY: number) => {
    const raw = (height - padding - svgY) / plotHeight
    // allow slight overshoot for springy curves
    return Math.min(Math.max(raw, -0.25), 1.35)
  }

  const p0 = { x: 0, y: 0 }
  const p3 = { x: 1, y: 1 }

  const handlePointerDown = (handle: 1 | 2) => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    draggingHandleRef.current = handle
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingHandleRef.current || !svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const svgX = ((e.clientX - rect.left) / rect.width) * width
      const svgY = ((e.clientY - rect.top) / rect.height) * height

      const newX = parseFloat(fromSvgX(svgX).toFixed(2))
      const newY = parseFloat(fromSvgY(svgY).toFixed(2))

      if (draggingHandleRef.current === 1) {
        const nextP1 = { x: newX, y: newY }
        setP1(nextP1)
        onChange?.(nextP1, p2)
      } else if (draggingHandleRef.current === 2) {
        const nextP2 = { x: newX, y: newY }
        setP2(nextP2)
        onChange?.(p1, nextP2)
      }
      setPreset("custom")
    },
    [p1, p2, onChange]
  )

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingHandleRef.current) {
      try {
        ;(e.target as Element).releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      draggingHandleRef.current = null
    }
  }

  const handlePresetChange = (key: string) => {
    setPreset(key)
    if (PRESETS[key]) {
      setP1(PRESETS[key].p1)
      setP2(PRESETS[key].p2)
      onChange?.(PRESETS[key].p1, PRESETS[key].p2)
    }
  }

  const trackRef = useRef<HTMLDivElement | null>(null)
  const [runnerX, setRunnerX] = useState(0)

  const handlePlay = () => {
    if (!trackRef.current) return
    const trackWidth = trackRef.current.clientWidth - 16 - 12 // padding + runner size
    // Reset to start
    setIsPlaying(false)
    setRunnerX(0)
    
    // Trigger transition on next animation frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsPlaying(true)
        setRunnerX(trackWidth > 0 ? trackWidth : 160)
      })
    })
  }

  // Cubic bezier path string
  const pathD = `M ${toSvgX(p0.x)} ${toSvgY(p0.y)} C ${toSvgX(p1.x)} ${toSvgY(p1.y)}, ${toSvgX(p2.x)} ${toSvgY(p2.y)}, ${toSvgX(p3.x)} ${toSvgY(p3.y)}`
  const cssBezier = `cubic-bezier(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {/* Header with Label and Preset Selector */}
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="w-auto min-w-[70px]">
          <CreativeSelect
            variant="ghost"
            label=""
            value={preset}
            onChange={handlePresetChange}
            options={[
              { value: "ease", label: "Ease" },
              { value: "easeIn", label: "Ease In" },
              { value: "easeOut", label: "Ease Out" },
              { value: "easeInOut", label: "In-Out" },
              { value: "springy", label: "Spring" },
              ...(preset === "custom" ? [{ value: "custom", label: "Custom" }] : []),
            ]}
          />
        </div>
      </div>

      {/* Interactive Bezier Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/30 p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="h-28 w-full touch-none select-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Subtle Grid Lines */}
          <line
            x1={padding}
            y1={toSvgY(0)}
            x2={width - padding}
            y2={toSvgY(0)}
            stroke="currentColor"
            className="text-border"
            strokeDasharray="2 2"
          />
          <line
            x1={padding}
            y1={toSvgY(1)}
            x2={width - padding}
            y2={toSvgY(1)}
            stroke="currentColor"
            className="text-border"
            strokeDasharray="2 2"
          />
          <line
            x1={toSvgX(0)}
            y1={toSvgY(0)}
            x2={toSvgX(1)}
            y2={toSvgY(1)}
            stroke="currentColor"
            className="text-border/40"
            strokeWidth="1"
          />

          {/* Control handle arm 1 */}
          <line
            x1={toSvgX(p0.x)}
            y1={toSvgY(p0.y)}
            x2={toSvgX(p1.x)}
            y2={toSvgY(p1.y)}
            stroke="currentColor"
            className="text-accent/60"
            strokeWidth="1.2"
          />

          {/* Control handle arm 2 */}
          <line
            x1={toSvgX(p3.x)}
            y1={toSvgY(p3.y)}
            x2={toSvgX(p2.x)}
            y2={toSvgY(p2.y)}
            stroke="currentColor"
            className="text-accent/60"
            strokeWidth="1.2"
          />

          {/* Cubic Bezier Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Endpoints */}
          <circle cx={toSvgX(p0.x)} cy={toSvgY(p0.y)} r="2.5" className="fill-muted-foreground" />
          <circle cx={toSvgX(p3.x)} cy={toSvgY(p3.y)} r="2.5" className="fill-muted-foreground" />

          {/* Interactive Handle 1 */}
          <circle
            cx={toSvgX(p1.x)}
            cy={toSvgY(p1.y)}
            r="4.5"
            onPointerDown={handlePointerDown(1)}
            className="cursor-grab fill-background stroke-accent transition-transform active:scale-125 active:cursor-grabbing"
            strokeWidth="1.5"
          />

          {/* Interactive Handle 2 */}
          <circle
            cx={toSvgX(p2.x)}
            cy={toSvgY(p2.y)}
            r="4.5"
            onPointerDown={handlePointerDown(2)}
            className="cursor-grab fill-background stroke-accent transition-transform active:scale-125 active:cursor-grabbing"
            strokeWidth="1.5"
          />
        </svg>

        {/* Readout Coordinates */}
        <div className="mt-1 flex items-center justify-between px-1 font-mono text-[8px] text-muted-foreground">
          <span>P1: [{p1.x}, {p1.y}]</span>
          <span>P2: [{p2.x}, {p2.y}]</span>
        </div>
      </div>

      {/* Animation Preview Track & Play Button */}
      <div className="flex items-center gap-2">
        <div
          ref={trackRef}
          className="relative flex h-8 flex-1 items-center overflow-hidden rounded-xl border border-border bg-secondary/20 px-2"
        >
          {/* Animated Runner */}
          <div
            className="h-3 w-3 rounded-full bg-accent"
            style={{
              transform: `translateX(${runnerX}px)`,
              transitionProperty: isPlaying ? "transform" : "none",
              transitionDuration: isPlaying ? "850ms" : "0ms",
              transitionTimingFunction: cssBezier,
            }}
          />
        </div>

        <CreativeButton
          variant="secondary"
          size="icon"
          onClick={handlePlay}
          className="h-8 w-8 shrink-0"
          title="Play preview"
          aria-label="Play preview"
        >
          <Play />
        </CreativeButton>
      </div>
    </div>
  )
}
