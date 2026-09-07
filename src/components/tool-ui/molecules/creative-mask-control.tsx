import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"
import { Scissors, Sparkles, Contrast, FlipHorizontal } from "lucide-react"

export type MaskMode = "alpha" | "clipping" | "luminance" | "inverted"

export interface CreativeMaskControlProps {
  label?: string
  value?: MaskMode
  onChange?: (mode: MaskMode) => void
  className?: string
}

const MODES: { id: MaskMode; label: string; icon: React.ReactNode }[] = [
  { id: "clipping", label: "Clip", icon: <Scissors className="h-3 w-3" /> },
  { id: "alpha", label: "Alpha", icon: <Sparkles className="h-3 w-3" /> },
  { id: "luminance", label: "Luma", icon: <Contrast className="h-3 w-3" /> },
  { id: "inverted", label: "Invert", icon: <FlipHorizontal className="h-3 w-3" /> },
]

export const CreativeMaskControl: React.FC<CreativeMaskControlProps> = ({
  label = "Mask",
  value = "clipping",
  onChange,
  className,
}) => {
  const [mode, setMode] = useState<MaskMode>(value)

  const handleSelect = (m: MaskMode) => {
    setMode(m)
    onChange?.(m)
  }

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10",
        className
      )}
    >
      <Label className="truncate text-muted-foreground">{label}</Label>

      <div className="flex items-center gap-1">
        {MODES.map((item) => {
          const isSelected = item.id === mode
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              title={item.label}
              className={cn(
                "flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider transition-all",
                isSelected
                  ? "bg-accent text-accent-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
