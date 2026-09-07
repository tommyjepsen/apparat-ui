import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface SegmentedOption {
  value: string
  label: React.ReactNode
}

export interface CreativeSegmentedControlProps {
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export const CreativeSegmentedControl: React.FC<CreativeSegmentedControlProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className,
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
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 flex h-full flex-1 items-center justify-center font-mono text-[8px] uppercase tracking-wider transition-colors focus-visible:outline-none",
              isSelected
                ? "font-semibold text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {/* Sliding Active Pill Background */}
            {isSelected && (
              <motion.div
                layoutId="segmented-pill"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute inset-0 z-[-1] rounded-[10px] bg-background shadow-sm border border-border/50"
              />
            )}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
