import React, { useState } from "react"
import {
  CreativeSlider,
  CreativeSelect,
  CreativeToggle,
  CreativeColorPicker,
  CreativeNumberInput,
  CreativeAngleKnob,
  CreativeBoxModel,
  CreativeSegmentedControl,
  CreativeGradientSlider,
} from "../molecules"
import { CreativeButton, DotPattern, Label } from "../atoms"
import { FloatingToolbar } from "../organisms/floating-toolbar"
import { LayerTree } from "../organisms/layer-tree"
import {
  Square,
  Circle,
  PenTool,
  MousePointer,
  Download,
  RotateCcw,
} from "lucide-react"

export const VectorDrawingEditor: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string>("pen")
  const [strokeWidth, setStrokeWidth] = useState<number>(2)
  const [strokeColor, setStrokeColor] = useState<string>("#EA580C")
  const [fillColor, setFillColor] = useState<string>("#FFFFFF")
  const [opacity, setOpacity] = useState<number>(100)
  const [rotation, setRotation] = useState<number>(0)
  const [strokeJoin, setStrokeJoin] = useState<string>("round")
  const [dashArray, setDashArray] = useState<number>(0)
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true)
  const [padding, setPadding] = useState({ top: 8, right: 8, bottom: 8, left: 8 })

  return (
    <div className="mx-auto w-full min-w-[760px] max-w-[1920px] px-2 sm:px-6 pb-20">
      {/* 16:9 Aspect Ratio Vector Drawing Tool Shell */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-card flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Vector Hierarchy / Layer Tree & Tools */}
          <aside className="w-64 border-r border-border bg-card p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between border-b border-border pb-2 px-0.5">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
                Vector Tools
              </span>
              <span className="font-mono text-[8px] text-accent">PATHS</span>
            </div>

            <div className="space-y-2">
              <Label className="block">Draw Mode</Label>
              <CreativeSegmentedControl
                layoutId="vector-tool-mode"
                value={activeTool}
                onChange={setActiveTool}
                options={[
                  { value: "select", label: <MousePointer aria-label="Select" />, tooltip: "Select (V)" },
                  { value: "pen", label: <PenTool aria-label="Pen" />, tooltip: "Pen Tool (P)" },
                  { value: "rect", label: <Square aria-label="Rectangle" />, tooltip: "Rectangle (R)" },
                  { value: "ellipse", label: <Circle aria-label="Ellipse" />, tooltip: "Ellipse (O)" },
                ]}
              />
            </div>

            {/* Embedded Layer Tree */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <LayerTree className="w-full max-w-none border-none bg-transparent p-0 shadow-none" />
            </div>
          </aside>

          {/* Center Canvas Area: Vector Viewport */}
          <section className="relative flex flex-1 items-center justify-center bg-muted/40 p-6 overflow-hidden">
            <DotPattern size={16} radius={1} />

            {/* Vector Artboard (Poster Ratio ~3:4 with pure dots visuals) */}
            <div className="relative z-10 w-[240px] sm:w-[280px] aspect-[3/4] rounded-sm border border-border/80 bg-[#ECEBE7] p-6 flex items-center justify-center select-none transition-transform duration-150">
              <svg
                viewBox="0 0 152 196"
                className="w-full max-w-[175px] h-auto"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  opacity: opacity / 100,
                }}
              >
                {/* Row 1 */}
                <circle cx="28" cy="18" r="10" fill="#171717" />

                {/* Row 2 */}
                <circle cx="28" cy="50" r="10" fill="#171717" />
                <circle cx="60" cy="50" r="10" fill="#171717" />

                {/* Row 3 */}
                <circle cx="28" cy="82" r="10" fill="#171717" />
                <circle cx="60" cy="82" r="10" fill="#171717" />
                <circle cx="92" cy="82" r="10" fill="#171717" />
                <circle cx="124" cy="82" r="10" fill="#171717" />

                {/* Row 4 */}
                <circle cx="28" cy="114" r="10" fill="#171717" />

                {/* Row 5: Black dot + Accent Dot reacting to active stroke color */}
                <circle cx="28" cy="146" r="10" fill="#171717" />
                <circle cx="60" cy="146" r="10" fill={strokeColor || "#EA580C"} />

                {/* Row 6 */}
                <circle cx="28" cy="178" r="10" fill="#171717" />
              </svg>
            </div>

            {/* Centered Bottom Floating Toolbar */}
            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
              <FloatingToolbar />
            </div>
          </section>

          {/* Right Sidebar: Stroke, Fill, Geometry & Box Model */}
          <aside className="w-64 border-l border-border bg-card p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between border-b border-border pb-2 px-0.5">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
                Path Styling
              </span>
              <span className="font-mono text-[8px] text-muted-foreground">PROPERTIES</span>
            </div>

            <div className="space-y-2.5">
              <CreativeColorPicker
                label="Fill"
                value={fillColor}
                onChange={setFillColor}
              />
              <CreativeColorPicker
                label="Stroke"
                value={strokeColor}
                onChange={setStrokeColor}
              />
              <CreativeGradientSlider label="Ramp" />
            </div>

            <div className="space-y-2.5 border-t border-border/80 pt-3">
              <CreativeSlider
                label="Width"
                value={strokeWidth}
                onChange={setStrokeWidth}
                min={1}
                max={16}
                step={1}
                unit="px"
              />
              <CreativeSelect
                label="Join"
                value={strokeJoin}
                onChange={setStrokeJoin}
                options={[
                  { value: "round", label: "Round" },
                  { value: "miter", label: "Miter" },
                  { value: "bevel", label: "Bevel" },
                ]}
              />
              <CreativeNumberInput
                label="Dash"
                value={dashArray}
                onChange={setDashArray}
                min={0}
                max={20}
              />
              <CreativeAngleKnob
                label="Angle"
                value={rotation}
                onChange={setRotation}
              />
              <CreativeSlider
                label="Opacity"
                value={opacity}
                onChange={setOpacity}
                min={0}
                max={100}
                step={1}
                unit="%"
              />
            </div>

            <div className="space-y-2 border-t border-border/80 pt-3">
              <Label className="block">Bounds Margin</Label>
              <CreativeBoxModel
                label="Inset"
                value={padding}
                onChange={setPadding}
                unit="px"
              />
            </div>

            <div className="space-y-2 border-t border-border/80 pt-3">
              <CreativeToggle
                label="Snap Grid"
                checked={snapToGrid}
                onChange={setSnapToGrid}
              />
            </div>

            <div className="mt-auto flex items-center gap-2 pt-2">
              <CreativeButton
                variant="secondary"
                className="flex-1 gap-1"
                onClick={() => {
                  setRotation(0)
                  setStrokeWidth(2)
                  setOpacity(100)
                }}
              >
                <RotateCcw />
                <span>Reset</span>
              </CreativeButton>
              <CreativeButton variant="accent" className="flex-1 gap-1">
                <Download />
                <span>SVG</span>
              </CreativeButton>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
