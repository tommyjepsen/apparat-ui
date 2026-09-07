import React, { useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface CreativeColorPopoverProps {
  label?: string
  value: string
  onChange: (value: string) => void
  palette?: string[]
  disabled?: boolean
  className?: string
}

const DEFAULT_PALETTE = [
  // Row 1: Vivid primary / secondary hues
  "#EF4444", // Red
  "#F97316", // Orange
  "#F59E0B", // Amber
  "#EAB308", // Yellow
  "#10B981", // Emerald
  "#06B6D4", // Cyan
  "#3B82F6", // Blue
  "#8B5CF6", // Violet
  // Row 2: Deep / pastel / neutral accents
  "#EC4899", // Pink
  "#D946EF", // Fuchsia
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#84CC16", // Lime
  "#78716C", // Warm Stone
  "#64748B", // Slate
  "#09090B", // Black / Dark
]

export const CreativeColorPopover: React.FC<CreativeColorPopoverProps> = ({
  label,
  value,
  onChange,
  palette = DEFAULT_PALETTE,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [typedHex, setTypedHex] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)

  // Keep typedHex in sync with value
  useEffect(() => {
    setTypedHex(value)
  }, [value])

  // Close popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  const handleStartEditing = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
    setTimeout(() => {
      textInputRef.current?.focus()
      textInputRef.current?.select()
    }, 0)
  }

  const commitHex = () => {
    setIsEditing(false)
    let cleaned = typedHex.trim()
    if (!cleaned.startsWith("#")) {
      cleaned = "#" + cleaned
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned) || /^#[0-9A-Fa-f]{3}$/.test(cleaned)) {
      onChange(cleaned.toUpperCase())
    } else {
      setTypedHex(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitHex()
    } else if (e.key === "Escape") {
      setTypedHex(value)
      setIsEditing(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => {
          if (!disabled && !isEditing) setIsOpen((prev) => !prev)
        }}
        className={cn(
          "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-foreground/10 active:border-foreground/12",
          isOpen && "border-foreground/15",
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

        {/* Hex value & Color Swatch on the right */}
        <div className="flex items-center gap-2 pl-2">
          {isEditing ? (
            <input
              ref={textInputRef}
              type="text"
              value={typedHex}
              onChange={(e) => setTypedHex(e.target.value)}
              onBlur={commitHex}
              onKeyDown={handleKeyDown}
              maxLength={7}
              onClick={(e) => e.stopPropagation()}
              className="w-12 bg-transparent p-0 text-right font-mono text-[8px] uppercase tracking-wider text-foreground outline-none border-none ring-0 shadow-none"
            />
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={handleStartEditing}
              className="cursor-text font-mono text-[8px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              title="Click to edit HEX"
            >
              {value}
            </button>
          )}

          {/* Swatch circle that triggers popup */}
          <span
            className="h-4 w-4 rounded-full border border-black/10 transition-transform duration-100 hover:scale-110 active:scale-95"
            style={{ backgroundColor: value }}
          />
        </div>
      </div>

      {/* 8x2 Grid Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl border border-border bg-popover p-2 backdrop-blur">
          <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            <span>Swatches</span>
            <span>8 × 2</span>
          </div>

          <div className="grid grid-cols-8 gap-1.5">
            {palette.slice(0, 16).map((colorHex) => {
              const isSelected =
                colorHex.toUpperCase() === value.toUpperCase()
              return (
                <div key={colorHex} className="group/swatch relative flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      onChange(colorHex.toUpperCase())
                      setIsOpen(false)
                    }}
                    className={cn(
                      "relative flex aspect-square w-full items-center justify-center rounded-full border border-black/10 transition-all hover:scale-110 active:scale-95",
                      isSelected && "ring-1 ring-foreground ring-offset-1 ring-offset-popover"
                    )}
                    style={{ backgroundColor: colorHex }}
                    aria-label={`Select ${colorHex}`}
                  >
                    {isSelected && (
                      <Check className="text-white drop-shadow-sm" />
                    )}
                  </button>

                  {/* Tooltip with hex color on hover */}
                  <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/swatch:opacity-100 z-50">
                    <span className="whitespace-nowrap rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-foreground">
                      {colorHex}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
