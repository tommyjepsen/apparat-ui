import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface CreativeColorPickerProps {
  label?: string
  value: string
  onChange: (color: string) => void
  disabled?: boolean
  className?: string
}

export const CreativeColorPicker: React.FC<CreativeColorPickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [typedHex, setTypedHex] = useState(value)

  useEffect(() => {
    setTypedHex(value)
  }, [value])

  const handleCircleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleStartEditing = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    setIsEditing(true)
    setTimeout(() => {
      textInputRef.current?.focus()
      textInputRef.current?.select()
    }, 0)
  }

  const commitHex = () => {
    setIsEditing(false)
    let formatted = typedHex.trim()
    if (!formatted.startsWith("#")) {
      formatted = `#${formatted}`
    }
    // Validate 3 or 6 hex digits
    if (/^#([0-9A-F]{3}){1,2}$/i.test(formatted)) {
      if (formatted.length === 4) {
        // Expand shorthand #RGB to #RRGGBB
        formatted = `#${formatted[1]}${formatted[1]}${formatted[2]}${formatted[2]}${formatted[3]}${formatted[3]}`
      }
      onChange(formatted.toUpperCase())
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
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-50" : "hover:border-foreground/10 active:border-foreground/12",
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

      {/* Hex value & Clickable Circle on the right */}
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

        {/* Circular Color Swatch */}
        <div
          onClick={handleCircleClick}
          className="relative flex cursor-pointer items-center justify-center"
          title="Open color picker"
        >
          <span
            className="h-4 w-4 rounded-full border border-black/10 transition-transform duration-100 hover:scale-110 active:scale-95"
            style={{ backgroundColor: value }}
          />

          {/* Hidden Native Color Input */}
          <input
            ref={inputRef}
            type="color"
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="absolute inset-0 h-full w-full opacity-0 pointer-events-none"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
