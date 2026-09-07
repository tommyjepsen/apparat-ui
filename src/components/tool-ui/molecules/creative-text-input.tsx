import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface CreativeTextInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number
}

export const CreativeTextInput: React.FC<CreativeTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "None",
  disabled = false,
  className,
  maxLength,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [typedValue, setTypedValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOverflowing, setIsOverflowing] = useState(false)
  const textDisplayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setTypedValue(value)
  }, [value])

  // Check if text is truncated / overflowing
  useEffect(() => {
    const el = textDisplayRef.current
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth)
    }
  }, [value, placeholder])

  const handleStartEditing = () => {
    if (disabled) return
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  const handleCommit = () => {
    setIsEditing(false)
    onChange(typedValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommit()
    } else if (e.key === "Escape") {
      setTypedValue(value)
      setIsEditing(false)
    }
  }

  const displayText = value || placeholder

  return (
    <div
      onClick={handleStartEditing}
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed opacity-50"
          : isEditing
          ? "cursor-text border-foreground/15"
          : "cursor-pointer hover:border-foreground/10 active:border-foreground/12",
        className
      )}
    >
      {/* Label on the left - strictly preserved and non-shrinking */}
      {label ? (
        <Label className="pointer-events-none shrink-0 truncate text-muted-foreground mr-2">
          {label}
        </Label>
      ) : (
        <span />
      )}

      {/* Text on the right: click to edit inline */}
      <div className="group/text-val relative flex min-w-0 flex-1 items-center justify-end">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={typedValue}
            onChange={(e) => setTypedValue(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            className="w-full bg-transparent p-0 text-right font-mono text-[8px] uppercase tracking-wider text-foreground outline-none border-none ring-0 shadow-none placeholder:text-muted-foreground/50"
            placeholder={placeholder}
          />
        ) : (
          <>
            <span
              ref={textDisplayRef}
              className={cn(
                "w-full truncate text-right font-mono text-[8px] uppercase tracking-wider transition-colors",
                value ? "text-foreground" : "text-muted-foreground/60"
              )}
            >
              {displayText}
            </span>

            {/* Hover Tooltip when text overflows */}
            {isOverflowing && !isEditing && (
              <div className="pointer-events-none absolute -top-7 right-0 z-50 opacity-0 transition-opacity duration-150 group-hover/text-val:opacity-100">
                <span className="whitespace-nowrap rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-foreground">
                  {displayText}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
