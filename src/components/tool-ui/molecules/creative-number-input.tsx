import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SlidingNumber } from "../atoms/sliding-number"
import { Label } from "../atoms/label"

export interface CreativeNumberInputProps {
  label?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  disabled?: boolean
  className?: string
  formatValue?: (val: number) => string | number
}

export const CreativeNumberInput: React.FC<CreativeNumberInputProps> = ({
  label,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  unit = "",
  disabled = false,
  className,
  formatValue,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isDraggingRef = useRef<boolean>(false)
  const startPosRef = useRef<{ x: number; val: number }>({ x: 0, val: 0 })
  const hasMovedRef = useRef<boolean>(false)

  const [isEditing, setIsEditing] = useState(false)
  const [typedValue, setTypedValue] = useState(String(value))

  useEffect(() => {
    setTypedValue(String(value))
  }, [value])

  const clamp = (val: number) => Math.min(Math.max(val, min), max)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || isEditing) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    startPosRef.current = { x: e.clientX, val: value }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || disabled || isEditing) return
    const deltaX = e.clientX - startPosRef.current.x
    if (Math.abs(deltaX) > 3) {
      hasMovedRef.current = true
    }
    // Scrub sensitivity: 1 step per 3 pixels dragged
    const stepsDelta = Math.round(deltaX / 3) * step
    const newVal = clamp(
      Number((startPosRef.current.val + stepsDelta).toFixed(step < 1 ? 2 : 0))
    )
    if (newVal !== value) {
      onChange(newVal)
    }
  }

  const startEditing = () => {
    if (disabled) return
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignore
    }
    // If it was a clean click on the component without dragging, open inline edit!
    if (!hasMovedRef.current) {
      startEditing()
    }
  }

  const commitTypedValue = () => {
    setIsEditing(false)
    const parsed = parseFloat(typedValue)
    if (!isNaN(parsed)) {
      const stepped = Math.round(parsed / step) * step
      const finalVal = clamp(
        Number(stepped.toFixed(step < 1 ? 2 : 0))
      )
      onChange(finalVal)
      setTypedValue(String(finalVal))
    } else {
      setTypedValue(String(value))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitTypedValue()
    } else if (e.key === "Escape") {
      setTypedValue(String(value))
      setIsEditing(false)
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed opacity-50"
          : isEditing
          ? "cursor-text"
          : "cursor-ew-resize hover:border-foreground/10 active:border-foreground/12",
        className
      )}
    >
      {/* Label on the left */}
      {label ? (
        <Label className="pointer-events-none truncate text-muted-foreground">
          {label}
        </Label>
      ) : (
        <span />
      )}

      {/* Number on the right: Draggable or click to edit */}
      <div className="flex items-center pl-2">
        {isEditing ? (
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="number"
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              onBlur={commitTypedValue}
              onKeyDown={handleKeyDown}
              step={step}
              className="w-12 bg-transparent p-0 text-right font-mono text-[8px] tabular-nums text-foreground outline-none border-none ring-0 shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {unit && (
              <span className="ml-1 font-mono text-[8px] text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation()
              startEditing()
            }}
            className="flex items-center cursor-text transition-opacity hover:opacity-80"
            title="Click to edit, or drag to scrub"
          >
            <SlidingNumber
              value={value}
              unit={unit}
              formatValue={formatValue}
            />
          </div>
        )}
      </div>
    </div>
  )
}
