import React, { useState } from "react"
import {
  CreativeSlider,
  CreativeSelect,
  CreativeToggle,
  CreativeNumberInput,
  CreativeSegmentedControl,
  CreativeColorPicker,
} from "../molecules"
import { CreativeButton, StatusBadge } from "../atoms"
import {
  Play,
  RotateCcw,
  Activity,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

export const WorkflowNodeBuilder: React.FC = () => {
  // Node 1: Noise Generator state
  const [noiseType, setNoiseType] = useState<string>("perlin")
  const [frequency, setFrequency] = useState<number>(45)
  const [octaves, setOctaves] = useState<number>(4)
  const [persistence, setPersistence] = useState<number>(65)
  const [noiseInvert, setNoiseInvert] = useState<boolean>(false)

  // Node 2: Image Node state
  const [filterMode, setFilterMode] = useState<string>("duotone")
  const [brightness, setBrightness] = useState<number>(10)
  const [contrast, setContrast] = useState<number>(35)
  const [tintColor, setTintColor] = useState<string>("#EA580C")
  const [blendOpacity, setBlendOpacity] = useState<number>(85)

  // Canvas zoom state
  const [zoomLevel, setZoomLevel] = useState<number>(100)

  return (
    <div className="w-full min-w-[760px]">
      {/* 16:9 Workflow Canvas Shell */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-card flex flex-col select-none">
        {/* Top Header Bar */}
        <header className="flex h-11 items-center justify-between border-b border-border bg-card px-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase text-foreground">
              <Activity className="h-3.5 w-3.5 text-accent" />
              <span>Workflow Studio</span>
            </div>
            <span className="h-3 w-[1px] bg-border" />
            <span className="font-mono text-[9px] text-muted-foreground">Procedural Image Pipeline</span>
            <StatusBadge label="LIVE EXEC" status="online" />
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border border-border/80 bg-secondary/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="hover:text-foreground transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-3 w-3" />
              </button>
              <span className="w-10 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="hover:text-foreground transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-3 w-3" />
              </button>
            </div>

            <CreativeButton
              variant="outline"
              size="sm"
              className="h-7 text-[9px] gap-1.5"
              onClick={() => {
                setFrequency(45)
                setContrast(35)
                setBrightness(10)
              }}
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </CreativeButton>

            <CreativeButton
              variant="accent"
              size="sm"
              className="h-7 text-[9px] gap-1.5"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>Render</span>
            </CreativeButton>
          </div>
        </header>

        {/* Main Workspace Body */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Node Canvas Workspace */}
          <div className="relative flex-1 bg-muted/15 overflow-hidden flex items-center justify-center">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Nodes Grid Layout */}
            <div
              className="relative z-20 flex items-start gap-16 transition-transform duration-150"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* NODE 1: Noise Generator */}
              <div className="flex w-64 flex-col rounded-xl border border-border bg-white dark:bg-card select-none">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/80 px-3.5 py-2.5 bg-muted/20 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
                      Noise Generator
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-muted-foreground">GEN_01</span>
                </div>

                {/* Output Socket Row (at top right under header) */}
                <div className="relative flex items-center justify-between border-b border-border/70 bg-muted/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-wider">
                  <span className="text-muted-foreground">Output Signal</span>
                  <div className="relative flex items-center gap-1.5 text-muted-foreground">
                    <span>Noise Alpha</span>
                    {/* External Hanging Socket Pin */}
                    <div className="absolute -right-5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-border">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    </div>
                  </div>
                </div>

                {/* Noise Settings Body */}
                <div className="p-3.5 space-y-3.5">
                  <CreativeSegmentedControl
                    layoutId="wf-noise-type"
                    value={noiseType}
                    onChange={setNoiseType}
                    options={[
                      { value: "perlin", label: "Perlin" },
                      { value: "simplex", label: "Simplex" },
                      { value: "worley", label: "Worley" },
                    ]}
                  />

                  <CreativeSlider
                    label="Frequency"
                    value={frequency}
                    min={1}
                    max={100}
                    step={1}
                    unit="Hz"
                    onChange={setFrequency}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <CreativeNumberInput
                      label="Octaves"
                      value={octaves}
                      min={1}
                      max={8}
                      onChange={setOctaves}
                    />
                    <CreativeNumberInput
                      label="Persistence"
                      value={persistence}
                      min={0}
                      max={100}
                      unit="%"
                      onChange={setPersistence}
                    />
                  </div>

                  <CreativeToggle
                    label="Invert Map"
                    checked={noiseInvert}
                    onChange={setNoiseInvert}
                  />
                </div>
              </div>

              {/* NODE 2: Image Processing Node (With Preview on Top!) */}
              <div className="flex w-72 flex-col rounded-xl border border-border bg-white dark:bg-card select-none">
                {/* Node Header */}
                <div className="flex items-center justify-between border-b border-border/80 px-3.5 py-2.5 bg-muted/20 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground">
                      Image Shader
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-muted-foreground">SHADER_02</span>
                </div>

                {/* Sockets Row (at top right under header) */}
                <div className="relative flex items-center justify-between border-b border-border/70 bg-muted/10 px-3.5 py-2 font-mono text-[8px] uppercase tracking-wider">
                  <div className="relative flex items-center gap-1.5 text-muted-foreground">
                    {/* Hanging Input Socket Pin */}
                    <div className="absolute -left-5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-border">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    </div>
                    <span>Noise In</span>
                  </div>

                  <div className="relative flex items-center gap-1.5 text-muted-foreground">
                    <span>Texture Out</span>
                    {/* Hanging Output Socket Pin */}
                    <div className="absolute -right-5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-border">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    </div>
                  </div>
                </div>

                {/* Image Preview Banner */}
                <div className="relative h-32 w-full overflow-hidden border-b border-border bg-neutral-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                    alt="Shader preview"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: `contrast(${contrast + 70}%) brightness(${brightness + 90}%)`,
                      opacity: blendOpacity / 100,
                    }}
                  />
                  {/* Procedural Shader Color Tint Overlay */}
                  <div
                    className="absolute inset-0 mix-blend-color pointer-events-none transition-colors"
                    style={{ backgroundColor: tintColor, opacity: 0.65 }}
                  />

                  {/* Noise Vignette Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Badge & Resolution indicator */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between font-mono text-[8px] text-white/90">
                    <span className="rounded bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
                      1024 × 1024 RGBA
                    </span>
                    <span className="rounded bg-card/80 px-1.5 py-0.5 text-foreground">
                      {filterMode}
                    </span>
                  </div>
                </div>

                {/* Input Settings & Adjustments */}
                <div className="p-3.5 space-y-3.5">
                  <CreativeSelect
                    label="Blend"
                    value={filterMode}
                    onChange={setFilterMode}
                    options={[
                      { value: "duotone", label: "Duotone" },
                      { value: "multiply", label: "Multiply" },
                      { value: "overlay", label: "Overlay" },
                      { value: "difference", label: "Difference" },
                    ]}
                  />

                  <CreativeSlider
                    label="Contrast"
                    value={contrast}
                    min={-50}
                    max={100}
                    step={1}
                    unit="%"
                    onChange={setContrast}
                  />

                  <CreativeSlider
                    label="Brightness"
                    value={brightness}
                    min={-50}
                    max={50}
                    step={1}
                    unit="%"
                    onChange={setBrightness}
                  />

                  <CreativeColorPicker
                    label="Tint Accent"
                    value={tintColor}
                    onChange={setTintColor}
                  />

                  <CreativeSlider
                    label="Blend Opacity"
                    value={blendOpacity}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    onChange={setBlendOpacity}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
