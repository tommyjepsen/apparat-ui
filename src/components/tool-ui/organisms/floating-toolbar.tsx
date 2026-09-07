import React, { useState } from "react"
import {
  MousePointer,
  Square,
  PenTool,
  Type,
  Hand,
  Columns2,
  Columns3,
  LayoutGrid,
} from "lucide-react"
import { CreativeButton } from "../atoms/creative-button"
import { CreativeSegmentedControl } from "../molecules/creative-segmented-control"
import { cn } from "@/lib/utils"

export type FigmaTool = "select" | "rectangle" | "pen" | "text" | "hand"
export type LayoutStage = "split" | "grid" | "canvas"

export interface FloatingToolbarProps {
  className?: string
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ className }) => {
  const [activeTool, setActiveTool] = useState<FigmaTool>("select")
  const [layoutStage, setLayoutStage] = useState<LayoutStage>("split")

  const tools: { id: FigmaTool; label: string; icon: React.ReactNode }[] = [
    { id: "select", label: "Select (V)", icon: <MousePointer aria-label="Select" /> },
    { id: "rectangle", label: "Rectangle (R)", icon: <Square aria-label="Rectangle" /> },
    { id: "pen", label: "Pen (P)", icon: <PenTool aria-label="Pen" /> },
    { id: "text", label: "Text (T)", icon: <Type aria-label="Text" /> },
    { id: "hand", label: "Hand (H)", icon: <Hand aria-label="Hand" /> },
  ]

  const stageOptions = [
    {
      value: "split",
      label: <Columns2 aria-label="Split View" />,
      tooltip: "Split View",
    },
    {
      value: "grid",
      label: <Columns3 aria-label="Columns View" />,
      tooltip: "Columns View",
    },
    {
      value: "canvas",
      label: <LayoutGrid aria-label="Canvas Grid" />,
      tooltip: "Canvas Grid",
    },
  ]

  return (
    <div
      className={cn(
        "inline-flex select-none items-center gap-2 rounded-2xl border border-border bg-card/95 p-1.5 backdrop-blur-md",
        className
      )}
    >
      {/* Tool Icon Buttons */}
      <div className="flex items-center gap-1">
        {tools.map((tool) => {
          const isSelected = activeTool === tool.id
          return (
            <div key={tool.id} className="group relative">
              <CreativeButton
                size="icon"
                variant={isSelected ? "default" : "ghost"}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "h-8 w-8 rounded-xl transition-colors",
                  isSelected
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                )}
                aria-label={tool.label}
              >
                {tool.icon}
              </CreativeButton>

              {/* Floating Tooltip */}
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border/60 bg-popover px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-popover-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {tool.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Subtle Divider */}
      <div className="h-4 w-px bg-border" />

      {/* Segmented Control for Layout Stages */}
      <div className="w-[104px]">
        <CreativeSegmentedControl
          layoutId="floating-toolbar-stages"
          value={layoutStage}
          onChange={(val) => setLayoutStage(val as LayoutStage)}
          options={stageOptions}
          className="h-8 bg-secondary/30"
        />
      </div>
    </div>
  )
}
