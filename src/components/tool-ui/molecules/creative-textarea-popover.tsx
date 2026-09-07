import React, { useState, useRef, useEffect } from "react"
import { TextInitial } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface CreativeTextareaPopoverProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  rows?: number
  maxLength?: number
}

export const CreativeTextareaPopover: React.FC<CreativeTextareaPopoverProps> = ({
  label,
  value,
  onChange,
  placeholder = "Empty",
  disabled = false,
  className,
  rows = 4,
  maxLength = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [draftValue, setDraftValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setDraftValue(value)
  }, [value])

  // Close popup when clicking outside and commit
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        onChange(draftValue)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
      // auto-focus textarea
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 0)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, draftValue, onChange])

  const handleToggle = () => {
    if (disabled) return
    if (isOpen) {
      onChange(draftValue)
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onChange(draftValue)
      setIsOpen(false)
    } else if (e.key === "Escape") {
      setDraftValue(value)
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger bar */}
      <div
        onClick={handleToggle}
        className={cn(
          "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:border-foreground/10 active:border-foreground/12",
          isOpen && "border-foreground/15",
          className
        )}
      >
        {/* Label on the left - non shrinking */}
        {label ? (
          <Label className="pointer-events-none shrink-0 truncate text-muted-foreground mr-2">
            {label}
          </Label>
        ) : (
          <span />
        )}

        {/* Preview of text & Icon indicator on the right */}
        <div className="group/ta-preview relative flex min-w-0 flex-1 items-center justify-end gap-1.5 pl-2">
          <span
            className={cn(
              "truncate font-mono text-[8px] uppercase tracking-wider transition-colors",
              value ? "text-foreground" : "text-muted-foreground/60"
            )}
          >
            {value || placeholder}
          </span>
          <TextInitial className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />

          {/* Hover tooltip for trigger bar */}
          {value && (
            <div className="pointer-events-none absolute -top-7 right-0 z-50 opacity-0 transition-opacity duration-150 group-hover/ta-preview:opacity-100">
              <span className="max-w-[200px] truncate block rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-foreground">
                {value}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Popover Textarea Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 flex flex-col rounded-xl border border-border bg-popover p-2.5 backdrop-blur">
          <textarea
            ref={textareaRef}
            value={draftValue}
            rows={rows}
            maxLength={maxLength}
            onChange={(e) => {
              const val = e.target.value
              if (maxLength === undefined || val.length <= maxLength) {
                setDraftValue(val)
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 p-2 font-mono text-[9px] uppercase tracking-wider text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/20"
          />

          <div className="mt-2 flex items-center justify-between">
            <span
              className={cn(
                "font-mono text-[8px] tabular-nums transition-colors",
                draftValue.length >= maxLength
                  ? "text-accent font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {draftValue.length}/{maxLength}
            </span>
            <button
              type="button"
              onClick={() => {
                onChange(draftValue)
                setIsOpen(false)
              }}
              className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
            >
              <span>Save</span>
              <span className="text-[7px] text-muted-foreground/70">⌘+</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
