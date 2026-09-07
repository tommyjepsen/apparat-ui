import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export interface CreativeToggleProps {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export const CreativeToggle: React.FC<CreativeToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-foreground/10 active:border-foreground/12",
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

      {/* Pill Switch on the right */}
      <div
        className={cn(
          "pointer-events-none relative flex h-4 w-7 items-center rounded-full p-0.5 transition-colors duration-200",
          checked ? "bg-accent" : "bg-muted"
        )}
      >
        <motion.span
          animate={{ x: checked ? 12 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="block h-3 w-3 rounded-full bg-white"
        />
      </div>
    </button>
  )
}
