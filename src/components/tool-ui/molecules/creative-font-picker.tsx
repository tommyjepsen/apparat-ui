import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"
import { Type, ChevronDown } from "lucide-react"

export interface CreativeFontPickerProps {
  label?: string
  fontFamily?: string
  weight?: string
  fontSize?: number
  onChange?: (val: { fontFamily: string; weight: string }) => void
  className?: string
}

const FONTS = [
  { name: "Inter", weights: ["Regular", "Medium", "Bold"] },
  { name: "Space Mono", weights: ["Regular", "Bold"] },
  { name: "Geist Mono", weights: ["Light", "Regular", "Bold"] },
  { name: "Playfair", weights: ["Regular", "Italic", "Bold"] },
]

export const CreativeFontPicker: React.FC<CreativeFontPickerProps> = ({
  label = "Font",
  fontFamily: initialFont = "Inter",
  weight: initialWeight = "Medium",
  onChange,
  className,
}) => {
  const [font, setFont] = useState(initialFont)
  const [weight, setWeight] = useState(initialWeight)
  const [open, setOpen] = useState(false)

  const handleSelect = (f: string, w: string) => {
    setFont(f)
    setWeight(w)
    setOpen(false)
    onChange?.({ fontFamily: f, weight: w })
  }

  return (
    <div className={cn("relative w-full select-none", className)}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="group flex h-8 w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10"
      >
        <div className="flex items-center gap-1.5 truncate">
          <Type className="h-3 w-3 text-muted-foreground" />
          <Label className="truncate text-muted-foreground">{label}</Label>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <span className="truncate font-semibold text-foreground">{font}</span>
          <span className="rounded bg-secondary/70 px-1 py-0.5 text-[8px] text-muted-foreground">
            {weight}
          </span>
          <ChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
        </div>
      </div>

      {/* Flyout dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-border bg-popover p-1.5 shadow-xl">
          <div className="flex flex-col gap-0.5 max-h-40 overflow-y-auto">
            {FONTS.map((item) => (
              <div
                key={item.name}
                onClick={() => handleSelect(item.name, item.weights[0])}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2 py-1 font-mono text-[9px] cursor-pointer transition-colors",
                  font === item.name
                    ? "bg-secondary text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <span>{item.name}</span>
                <span className="text-[8px] text-muted-foreground/70">
                  {item.weights.length} weights
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
