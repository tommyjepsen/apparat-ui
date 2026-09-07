import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface SegmentedOption {
  value: string
  label: React.ReactNode
  tooltip?: string
}

export interface CreativeSegmentedControlProps {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  layoutId?: string
}

export const CreativeSegmentedControl: React.FC<CreativeSegmentedControlProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className,
  layoutId,
}) => {
  return (
    <div
      role="radiogroup"
      className={cn(
        "relative flex h-8 w-full select-none items-center rounded-xl border border-border bg-secondary/40 p-0.5 text-sm font-medium transition-colors",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value
        const tooltipText = option.tooltip

        return (
          <div
            key={option.value}
            className="group/seg-item relative flex h-full flex-1 items-center justify-center"
          >
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative z-10 flex h-full w-full items-center justify-center font-mono text-[8px] uppercase tracking-wider transition-colors focus-visible:outline-none",
                isSelected
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Sliding Active Pill Background */}
              {isSelected && (
                <motion.div
                  layoutId={layoutId || "segmented-pill"}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 z-[-1] rounded-[10px] bg-background border border-border/50"
                />
              )}
              <span>{option.label}</span>
            </button>

            {/* Hover Tooltip */}
            {tooltipText && (
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/seg-item:opacity-100 z-50">
                <span className="whitespace-nowrap rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-foreground">
                  {tooltipText}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
