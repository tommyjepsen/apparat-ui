import React, { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface CreativeAngleKnobProps {
  label?: string
  value?: number // 0 - 360
  onChange?: (angle: number) => void
  className?: string
  disabled?: boolean
}

export const CreativeAngleKnob: React.FC<CreativeAngleKnobProps> = ({
  label = "Angle",
  value = 0,
  onChange,
  className,
  disabled = false,
}) => {
  const [angle, setAngle] = useState(value)
  const [isEditing, setIsEditing] = useState(false)
  const [tempText, setTempText] = useState("")

  const knobRef = useRef<HTMLDivElement>(null)
  const isDraggingDialRef = useRef(false)
  const isDraggingScrubRef = useRef(false)
  const startScrubRef = useRef<{ x: number; val: number }>({ x: 0, val: 0 })
  const hasMovedScrubRef = useRef(false)

  useEffect(() => {
    setAngle(value)
  }, [value])

  const normalizeAngle = (deg: number) => {
    let normalized = Math.round(deg) % 360
    if (normalized < 0) normalized += 360
    return normalized
  }

  const setAndNotifyAngle = (deg: number) => {
    const finalAngle = normalizeAngle(deg)
    setAngle(finalAngle)
    onChange?.(finalAngle)
  }

  // Dial rotation calculation
  const calculateAngleFromPointer = useCallback(
    (clientX: number, clientY: number, shiftKey: boolean) => {
      if (!knobRef.current) return
      const rect = knobRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = clientX - centerX
      const deltaY = clientY - centerY

      // Calculate angle in degrees (0deg = top/up)
      let deg = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90
      if (deg < 0) deg += 360

      let finalDeg = Math.round(deg)

      // Snap to 45 deg increments if shift key held
      if (shiftKey) {
        finalDeg = Math.round(finalDeg / 45) * 45
      }
      if (finalDeg === 360) finalDeg = 0

      setAndNotifyAngle(finalDeg)
    },
    []
  )

  const handleDialPointerDown = (e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    isDraggingDialRef.current = true
    ;(e.target as Element).setPointerCapture(e.pointerId)
    calculateAngleFromPointer(e.clientX, e.clientY, e.shiftKey)
  }

  const handleDialPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingDialRef.current) return
    calculateAngleFromPointer(e.clientX, e.clientY, e.shiftKey)
  }

  const handleDialPointerUp = (e: React.PointerEvent) => {
    if (isDraggingDialRef.current) {
      isDraggingDialRef.current = false
      try {
        ;(e.target as Element).releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }
  }

  // Scrubber handlers on the degree number readout
  const handleScrubPointerDown = (e: React.PointerEvent) => {
    if (disabled || isEditing) return
    isDraggingScrubRef.current = true
    hasMovedScrubRef.current = false
    startScrubRef.current = { x: e.clientX, val: angle }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handleScrubPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingScrubRef.current) return
    const deltaX = e.clientX - startScrubRef.current.x
    if (Math.abs(deltaX) > 2) {
      hasMovedScrubRef.current = true
    }
    // 1 degree per 2 pixels dragged
    const deltaDegrees = Math.round(deltaX / 2)
    setAndNotifyAngle(startScrubRef.current.val + deltaDegrees)
  }

  const handleScrubPointerUp = (e: React.PointerEvent) => {
    if (isDraggingScrubRef.current) {
      try {
        ;(e.target as Element).releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      isDraggingScrubRef.current = false

      // If merely clicked without dragging, switch to inline text input
      if (!hasMovedScrubRef.current) {
        setIsEditing(true)
        setTempText(String(angle))
      }
    }
  }

  const commitEdit = () => {
    const parsed = parseInt(tempText, 10)
    if (!isNaN(parsed)) {
      setAndNotifyAngle(parsed)
    }
    setIsEditing(false)
  }

  // Radians for indicator needle tip
  const rad = ((angle - 90) * Math.PI) / 180
  const needleLength = 6.5
  const needleX = 10 + needleLength * Math.cos(rad)
  const needleY = 10 + needleLength * Math.sin(rad)

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between rounded-xl border border-border bg-secondary/40 px-2 transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-foreground/10 active:border-foreground/12",
        className
      )}
    >
      {/* Label */}
      <Label className="truncate text-muted-foreground">{label}</Label>

      {/* Control: Degree Scrub/Edit + Knob Dial */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex items-center">
            <input
              autoFocus
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEdit()
                if (e.key === "Escape") setIsEditing(false)
              }}
              className="w-8 bg-transparent text-right font-mono text-[8px] tabular-nums text-foreground focus:outline-none"
            />
            <span className="font-mono text-[8px] text-muted-foreground">°</span>
          </div>
        ) : (
          <div
            onPointerDown={handleScrubPointerDown}
            onPointerMove={handleScrubPointerMove}
            onPointerUp={handleScrubPointerUp}
            onPointerCancel={handleScrubPointerUp}
            title="Drag to scrub angle / Click to type"
            className="cursor-ew-resize touch-none font-mono text-[8px] tabular-nums text-foreground transition-colors hover:text-accent active:text-accent"
          >
            {angle}°
          </div>
        )}

        {/* Interactive Knob Dial */}
        <div
          ref={knobRef}
          onPointerDown={handleDialPointerDown}
          onPointerMove={handleDialPointerMove}
          onPointerUp={handleDialPointerUp}
          onPointerCancel={handleDialPointerUp}
          className="relative h-5 w-5 cursor-grab touch-none items-center justify-center rounded-full border border-border/80 bg-background dark:bg-white dark:border-white transition-transform active:cursor-grabbing active:scale-95"
          title="Drag dial to rotate (Hold Shift to snap 45°)"
        >
          {/* Subtle needle indicator */}
          <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full pointer-events-none">
            {/* Center origin */}
            <circle cx="10" cy="10" r="1.2" className="fill-muted-foreground/40 dark:fill-neutral-400" />

            {/* Indicator Needle */}
            <line
              x1="10"
              y1="10"
              x2={needleX}
              y2={needleY}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="text-accent"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
