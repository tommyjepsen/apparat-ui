import React, { useRef, useState, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface SelectOption {
  value: string
  label: string
}

export interface CreativeSelectProps {
  label?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
  variant?: "default" | "ghost"
}

export const CreativeSelect: React.FC<CreativeSelectProps> = ({
  label,
  value,
  options,
  onChange,
  className,
  disabled = false,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value) || options[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={cn("relative w-full select-none", className)}>
      {/* Trigger Pill / Input Box */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group relative flex h-8 w-full items-center justify-between overflow-hidden rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          variant === "default"
            ? "border border-border bg-secondary/40 px-2"
            : "border border-transparent bg-transparent px-1.5 hover:bg-secondary/30",
          disabled
            ? "cursor-not-allowed opacity-50"
            : variant === "default"
            ? "cursor-pointer hover:border-foreground/10 active:border-foreground/12"
            : "cursor-pointer",
          isOpen && (variant === "default" ? "border-foreground/15" : "bg-secondary/40")
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

        {/* Select value & chevron on the right */}
        <div className="flex items-center gap-1.5 pl-2 font-mono text-[8px] uppercase tracking-wider text-foreground">
          <span className="truncate">{selectedOption?.label}</span>
          <ChevronDown
            className={cn(
              "text-muted-foreground transition-transform duration-150",
              isOpen && "rotate-180 text-foreground"
            )}
          />
        </div>
      </button>

      {/* Dropdown Popup */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-border bg-popover p-1 backdrop-blur">
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex h-7 w-full items-center justify-between rounded-lg px-2.5 font-mono text-[8px] uppercase tracking-wider transition-colors",
                  isSelected
                    ? "bg-secondary text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="text-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
