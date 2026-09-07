import React, { useState, useRef, useEffect } from "react"
import { Link2, Unlink2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface BoxSides {
  top: number
  right: number
  bottom: number
  left: number
}

export interface CreativeBoxModelProps {
  label?: string
  value?: BoxSides
  onChange?: (value: BoxSides) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  className?: string
}

export const CreativeBoxModel: React.FC<CreativeBoxModelProps> = ({
  label = "Padding",
  value = { top: 8, right: 12, bottom: 8, left: 12 },
  onChange,
  min = 0,
  max = 200,
  step = 1,
  unit = "px",
  className,
}) => {
  const [sides, setSides] = useState<BoxSides>(value)
  const [isLinked, setIsLinked] = useState(true)

  // Track active editing side for manual keyboard input
  const [editingSide, setEditingSide] = useState<keyof BoxSides | null>(null)
  const [tempText, setTempText] = useState("")

  const draggingSideRef = useRef<keyof BoxSides | null>(null)
  const startRef = useRef<{ x: number; val: number }>({ x: 0, val: 0 })
  const hasDraggedRef = useRef(false)

  useEffect(() => {
    setSides(value)
  }, [value])

  const clamp = (val: number) => Math.min(Math.max(val, min), max)

  const updateSideValue = (side: keyof BoxSides, num: number) => {
    const clamped = clamp(isNaN(num) ? 0 : num)
    if (isLinked) {
      const next = { top: clamped, right: clamped, bottom: clamped, left: clamped }
      setSides(next)
      onChange?.(next)
    } else {
      const next = { ...sides, [side]: clamped }
      setSides(next)
      onChange?.(next)
    }
  }

  const handlePointerDown = (side: keyof BoxSides) => (e: React.PointerEvent) => {
    if (editingSide !== null) return
    draggingSideRef.current = side
    hasDraggedRef.current = false
    startRef.current = { x: e.clientX, val: sides[side] }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingSideRef.current) return
    const deltaX = e.clientX - startRef.current.x
    if (Math.abs(deltaX) > 2) {
      hasDraggedRef.current = true
    }
    const stepsDelta = Math.round(deltaX / 3) * step
    const nextVal = startRef.current.val + stepsDelta
    updateSideValue(draggingSideRef.current, nextVal)
  }

  const handlePointerUp = (side: keyof BoxSides) => (e: React.PointerEvent) => {
    if (draggingSideRef.current) {
      try {
        ;(e.target as Element).releasePointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      draggingSideRef.current = null

      // If user merely clicked without dragging, initiate inline edit
      if (!hasDraggedRef.current) {
        setEditingSide(side)
        setTempText(String(sides[side]))
      }
    }
  }

  const commitEdit = () => {
    if (editingSide !== null) {
      const parsed = parseInt(tempText, 10)
      updateSideValue(editingSide, parsed)
      setEditingSide(null)
    }
  }

  const toggleLink = () => {
    if (!isLinked) {
      // Synchronize all to top
      const syncVal = sides.top
      const next = { top: syncVal, right: syncVal, bottom: syncVal, left: syncVal }
      setSides(next)
      onChange?.(next)
    }
    setIsLinked(!isLinked)
  }

  const sideKeys: (keyof BoxSides)[] = ["top", "right", "bottom", "left"]
  const sideTitles: Record<keyof BoxSides, string> = {
    top: "Top (Drag to scrub / click to type)",
    right: "Right (Drag to scrub / click to type)",
    bottom: "Bottom (Drag to scrub / click to type)",
    left: "Left (Drag to scrub / click to type)",
  }

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10",
        className
      )}
    >
      <Label className="truncate text-muted-foreground">{label}</Label>

      <div className="flex items-center gap-1.5">
        {isLinked ? (
          /* Single Linked Scrubber / Input */
          <div className="flex items-center gap-0.5">
            {editingSide === "top" ? (
              <input
                autoFocus
                type="text"
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitEdit()
                  if (e.key === "Escape") setEditingSide(null)
                }}
                className="w-8 bg-transparent text-right font-mono text-[8px] tabular-nums text-foreground focus:outline-none"
              />
            ) : (
              <div
                onPointerDown={handlePointerDown("top")}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp("top")}
                onPointerCancel={handlePointerUp("top")}
                title="Drag to scrub / Click to type"
                className="cursor-ew-resize touch-none px-1 font-mono text-[8px] tabular-nums text-foreground transition-colors hover:text-accent active:text-accent"
              >
                {sides.top}
              </div>
            )}
            <span className="font-mono text-[8px] text-muted-foreground">{unit}</span>
          </div>
        ) : (
          /* 4 Individual Scrubbers / Inputs (T R B L) */
          <div className="flex items-center gap-1 font-mono text-[8px] tabular-nums text-foreground">
            {sideKeys.map((k, index) => (
              <React.Fragment key={k}>
                {index > 0 && <span className="text-border">/</span>}
                {editingSide === k ? (
                  <input
                    autoFocus
                    type="text"
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit()
                      if (e.key === "Escape") setEditingSide(null)
                    }}
                    className="w-6 bg-transparent text-center focus:outline-none"
                  />
                ) : (
                  <div
                    onPointerDown={handlePointerDown(k)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp(k)}
                    onPointerCancel={handlePointerUp(k)}
                    title={sideTitles[k]}
                    className="cursor-ew-resize touch-none px-0.5 transition-colors hover:text-accent active:text-accent"
                  >
                    {sides[k]}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Link / Unlink toggle */}
        <button
          type="button"
          onClick={toggleLink}
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-md transition-colors",
            isLinked
              ? "text-accent hover:bg-accent/10"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          title={isLinked ? "Unlink sides" : "Link sides"}
          aria-label={isLinked ? "Unlink sides" : "Link sides"}
        >
          {isLinked ? <Link2 /> : <Unlink2 />}
        </button>
      </div>
    </div>
  )
}
