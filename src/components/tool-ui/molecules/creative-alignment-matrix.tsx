import React from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"

export type AlignmentPin =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export interface CreativeAlignmentMatrixProps {
  label?: string
  value?: AlignmentPin
  onChange?: (value: AlignmentPin) => void
  className?: string
}

const PINS: { id: AlignmentPin; label: string }[] = [
  { id: "top-left", label: "TL" },
  { id: "top-center", label: "TC" },
  { id: "top-right", label: "TR" },
  { id: "center-left", label: "CL" },
  { id: "center", label: "C" },
  { id: "center-right", label: "CR" },
  { id: "bottom-left", label: "BL" },
  { id: "bottom-center", label: "BC" },
  { id: "bottom-right", label: "BR" },
]

export const CreativeAlignmentMatrix: React.FC<CreativeAlignmentMatrixProps> = ({
  label = "Anchor Point",
  value: initialValue = "center",
  onChange,
  className,
}) => {
  const [selectedPin, setSelectedPin] = React.useState<AlignmentPin>(initialValue)

  const handleSelect = (pin: AlignmentPin) => {
    setSelectedPin(pin)
    onChange?.(pin)
  }

  const activePinObj = PINS.find((p) => p.id === selectedPin)

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 select-none",
        className
      )}
    >
      {/* Tactile 3x3 Pin Grid Matrix Pad */}
      <div className="relative flex flex-col items-center gap-2">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border/80 bg-secondary/30 p-2 shadow-inner">
          {/* Subtle Grid Connecting Lines */}
          <div className="pointer-events-none absolute inset-4 grid grid-cols-2 grid-rows-2">
            <div className="border-r border-b border-border/50" />
            <div className="border-b border-border/50" />
            <div className="border-r border-border/50" />
            <div />
          </div>

          {/* 3x3 Clickable Anchor Pins */}
          <div className="relative z-10 grid h-full w-full grid-cols-3 grid-rows-3 place-items-center">
            {PINS.map((pin) => {
              const isSelected = pin.id === selectedPin
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => handleSelect(pin.id)}
                  title={`${pin.label} (${pin.id.replace("-", " ")})`}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-lg transition-all active:scale-90",
                    isSelected
                      ? "bg-accent text-accent-foreground shadow-[0_0_12px_rgba(234,88,12,0.6)] scale-110"
                      : "bg-background/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/70"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      isSelected ? "bg-white" : "bg-muted-foreground/60"
                    )}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Readout */}
        <div className="flex items-center gap-2">
          {label && <Label className="text-muted-foreground">{label}:</Label>}
          <span className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground">
            {activePinObj?.label} — {selectedPin.replace("-", " ")}
          </span>
        </div>
      </div>
    </div>
  )
}
