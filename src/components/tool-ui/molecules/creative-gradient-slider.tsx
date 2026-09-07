import React, { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface GradientStop {
  id: string
  color: string
  offset: number // 0 to 100
}

export interface CreativeGradientSliderProps {
  label?: string
  stops?: GradientStop[]
  onChange?: (stops: GradientStop[]) => void
  className?: string
}

const DEFAULT_STOPS: GradientStop[] = [
  { id: "1", color: "#EA580C", offset: 0 },
  { id: "2", color: "#F59E0B", offset: 50 },
  { id: "3", color: "#3B82F6", offset: 100 },
]

export const CreativeGradientSlider: React.FC<CreativeGradientSliderProps> = ({
  label = "Gradient",
  stops: propStops,
  onChange,
  className,
}) => {
  const [stops, setStops] = useState<GradientStop[]>(propStops || DEFAULT_STOPS)
  const [activeStopId, setActiveStopId] = useState<string>(
    (propStops || DEFAULT_STOPS)[0]?.id || ""
  )
  const trackRef = useRef<HTMLDivElement>(null)
  const stopsRef = useRef<GradientStop[]>(stops)
  stopsRef.current = stops

  useEffect(() => {
    if (propStops) {
      setStops(propStops)
    }
  }, [propStops])

  const getOffsetFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return 0
    const rect = trackRef.current.getBoundingClientRect()
    if (rect.width === 0) return 0
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    return Math.round(ratio * 100)
  }, [])

  const handlePointerDown = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveStopId(id)

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const offset = getOffsetFromPointer(moveEvent.clientX)
      const next = stopsRef.current.map((s) =>
        s.id === id ? { ...s, offset } : s
      )
      setStops(next)
      onChange?.(next)
    }

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointercancel", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("pointercancel", handlePointerUp)
  }

  // Double click track to add stop
  const handleTrackDoubleClick = (e: React.MouseEvent) => {
    const offset = getOffsetFromPointer(e.clientX)
    const newStop: GradientStop = {
      id: Math.random().toString(36).substring(2, 9),
      color: "#FFFFFF",
      offset,
    }
    const next = [...stops, newStop].sort((a, b) => a.offset - b.offset)
    setStops(next)
    setActiveStopId(newStop.id)
    onChange?.(next)
  }

  // Construct CSS linear-gradient string
  const sortedStops = [...stops].sort((a, b) => a.offset - b.offset)
  const gradientString = `linear-gradient(to right, ${sortedStops
    .map((s) => `${s.color} ${s.offset}%`)
    .join(", ")})`

  const activeStop = stops.find((s) => s.id === activeStopId) || stops[0]

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10",
        className
      )}
    >
      <Label className="z-10 truncate text-muted-foreground">{label}</Label>

      {/* Interactive Ramp Bar */}
      <div
        ref={trackRef}
        onDoubleClick={handleTrackDoubleClick}
        className="relative mx-3 flex h-3 flex-1 cursor-crosshair touch-none items-center rounded-md border border-border/80"
        style={{ background: gradientString }}
        title="Double click to add color stop"
      >
        {stops.map((stop) => {
          const isSelected = stop.id === activeStopId
          return (
            <div
              key={stop.id}
              onPointerDown={handlePointerDown(stop.id)}
              className={cn(
                "absolute h-3.5 w-3.5 -translate-x-1/2 cursor-grab touch-none rounded-full border border-background shadow-xs transition-transform active:scale-125 active:cursor-grabbing",
                isSelected ? "ring-2 ring-foreground z-20" : "ring-1 ring-border z-10"
              )}
              style={{
                left: `${stop.offset}%`,
                backgroundColor: stop.color,
              }}
            />
          )
        })}
      </div>

      {/* Color Hex Input of active stop */}
      {activeStop && (
        <div className="z-10 flex items-center gap-1 font-mono text-[8px] uppercase text-foreground">
          <input
            type="color"
            value={activeStop.color}
            onChange={(e) => {
              const next = stops.map((s) =>
                s.id === activeStop.id ? { ...s, color: e.target.value } : s
              )
              setStops(next)
              onChange?.(next)
            }}
            className="h-3.5 w-3.5 cursor-pointer rounded-full border border-border bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full"
          />
          <span>{activeStop.offset}%</span>
        </div>
      )}
    </div>
  )
}
