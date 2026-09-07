import { useState, useEffect } from "react"
import { Code2, Moon, Sun, Download, Sparkles, Copy, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { CreativeSlider } from "@/components/tool-ui/creative-slider"
import { Label } from "@/components/tool-ui/label"
import { CreativeSelect } from "@/components/tool-ui/creative-select"
import { CreativeToggle } from "@/components/tool-ui/creative-toggle"
import { CreativeColorPicker } from "@/components/tool-ui/creative-color-picker"
import { CreativeNumberInput } from "@/components/tool-ui/creative-number-input"
import { CreativeSegmentedControl } from "@/components/tool-ui/creative-segmented-control"
import { CreativeButton } from "@/components/tool-ui/creative-button"
import { CreativeColorPopover } from "@/components/tool-ui/creative-color-popover"
import { DotPattern } from "@/components/tool-ui/dot-pattern"
import { CodeModal } from "@/components/code-modal"
import { LayoutsPage } from "@/pages/layouts"
import creativeSliderRawCode from "@/components/tool-ui/creative-slider.tsx?raw"
import labelRawCode from "@/components/tool-ui/label.tsx?raw"
import creativeSelectRawCode from "@/components/tool-ui/creative-select.tsx?raw"
import creativeToggleRawCode from "@/components/tool-ui/creative-toggle.tsx?raw"
import creativeColorPickerRawCode from "@/components/tool-ui/creative-color-picker.tsx?raw"
import creativeNumberInputRawCode from "@/components/tool-ui/creative-number-input.tsx?raw"
import creativeSegmentedControlRawCode from "@/components/tool-ui/creative-segmented-control.tsx?raw"
import creativeButtonRawCode from "@/components/tool-ui/creative-button.tsx?raw"
import creativeColorPopoverRawCode from "@/components/tool-ui/creative-color-popover.tsx?raw"
import dotPatternRawCode from "@/components/tool-ui/dot-pattern.tsx?raw"



export function App() {
  const [activeTab, setActiveTab] = useState<"components" | "layouts">("components")
  const [blendMode, setBlendMode] = useState("normal")
  const [gridEnabled, setGridEnabled] = useState(true)
  const [accentColor, setAccentColor] = useState("#EA580C")
  const [paddingVal, setPaddingVal] = useState(24)
  const [alignMode, setAlignMode] = useState("center")
  const [popoverColor, setPopoverColor] = useState("#3B82F6")
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme")
      if (stored) return stored === "dark"
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  const [sliderVal, setSliderVal] = useState<number>(5)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    title: string
    code: string
  }>({
    isOpen: false,
    title: "",
    code: "",
  })

  const openCode = (title: string, code: string) => {
    setModalState({ isOpen: true, title, code })
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-150">
      {/* Minimal Header */}
      <header className={`mx-auto flex items-center justify-between px-6 py-6 transition-all duration-150 ${activeTab === "layouts" ? "w-fit min-w-[80vw] max-w-7xl" : "max-w-4xl"}`}>
        <div className="flex items-center gap-6">
          <span className="font-mono text-sm font-semibold tracking-tight">tool-ui</span>
          <nav className="flex items-center gap-4 font-mono text-xs">
            <button
              onClick={() => setActiveTab("components")}
              className={`transition-colors ${
                activeTab === "components"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              components
            </button>
            <button
              onClick={() => setActiveTab("layouts")}
              className={`transition-colors ${
                activeTab === "layouts"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              layouts
            </button>
          </nav>
        </div>

        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      {/* Main Content */}
      {activeTab === "layouts" ? (
        <LayoutsPage />
      ) : (
        <main className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Card 1: Creative Slider */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">01 / slider</span>
              <button
                onClick={() =>
                  openCode("creative-slider.tsx", creativeSliderRawCode)
                }
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="w-full max-w-[240px] self-center">
              <CreativeSlider
                label="Amount"
                value={sliderVal}
                onChange={setSliderVal}
                min={0}
                max={10}
                step={1}
              />
            </div>

            <div />
          </div>

          {/* Card 2: Label */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">02 / label</span>
              <button
                onClick={() => openCode("label.tsx", labelRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="flex flex-col items-center justify-center gap-2 self-center">
              <Label>Property Name</Label>
              <Label className="text-foreground">Active Layer</Label>
              <Label className="text-accent">Accent State</Label>
            </div>

            <div />
          </div>

          {/* Card 3: Creative Select */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">03 / select</span>
              <button
                onClick={() => openCode("creative-select.tsx", creativeSelectRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="w-full max-w-[240px] self-center">
              <CreativeSelect
                label="Blend"
                value={blendMode}
                onChange={setBlendMode}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "multiply", label: "Multiply" },
                  { value: "screen", label: "Screen" },
                  { value: "overlay", label: "Overlay" },
                  { value: "darken", label: "Darken" },
                ]}
              />
            </div>

            <div />
          </div>

          {/* Card 4: Creative Toggle */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">04 / toggle</span>
              <button
                onClick={() => openCode("creative-toggle.tsx", creativeToggleRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="w-full max-w-[240px] self-center">
              <CreativeToggle
                label="Snap to grid"
                checked={gridEnabled}
                onChange={setGridEnabled}
              />
            </div>

            <div />
          </div>

          {/* Card 5: Creative Color Picker */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">05 / color</span>
              <button
                onClick={() => openCode("creative-color-picker.tsx", creativeColorPickerRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="w-full max-w-[240px] self-center">
              <CreativeColorPicker
                label="Color"
                value={accentColor}
                onChange={setAccentColor}
              />
            </div>

            <div />
          </div>

          {/* Card 6: Creative Number Input */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">06 / number</span>
              <button
                onClick={() => openCode("creative-number-input.tsx", creativeNumberInputRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="w-full max-w-[240px] self-center">
              <CreativeNumberInput
                label="Padding"
                unit="px"
                value={paddingVal}
                onChange={setPaddingVal}
                min={0}
                max={120}
                step={1}
              />
            </div>

            <div />
          </div>

          {/* Card 7: Creative Segmented Control */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">07 / segmented</span>
              <button
                onClick={() => openCode("creative-segmented-control.tsx", creativeSegmentedControlRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="flex w-full max-w-[240px] flex-col gap-3 self-center">
              {/* Icons only with tooltips */}
              <CreativeSegmentedControl
                layoutId="segmented-pill-icons"
                value={alignMode}
                onChange={setAlignMode}
                options={[
                  { value: "left", label: <AlignLeft aria-label="Align left" />, tooltip: "Left" },
                  { value: "center", label: <AlignCenter aria-label="Align center" />, tooltip: "Center" },
                  { value: "right", label: <AlignRight aria-label="Align right" />, tooltip: "Right" },
                ]}
              />

              {/* Text / Label only */}
              <CreativeSegmentedControl
                layoutId="segmented-pill-text"
                value={alignMode}
                onChange={setAlignMode}
                options={[
                  { value: "left", label: "Left" },
                  { value: "center", label: "Center" },
                  { value: "right", label: "Right" },
                ]}
              />
            </div>

            <div />
          </div>

          {/* Card 8: Creative Button */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">08 / button</span>
              <button
                onClick={() => openCode("creative-button.tsx", creativeButtonRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="flex items-center justify-center gap-1.5 self-center">
              <CreativeButton variant="default" className="gap-1 px-2">
                <Download />
                <span>Export</span>
              </CreativeButton>
              <CreativeButton variant="accent" className="gap-1 px-2">
                <Sparkles />
                <span>Render</span>
              </CreativeButton>
              <CreativeButton variant="outline" className="gap-1 px-2">
                <Copy />
                <span>Copy</span>
              </CreativeButton>
            </div>

            <div />
          </div>

          {/* Card 9: Dot Pattern */}
          <div className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">09 / dot pattern</span>
              <button
                onClick={() => openCode("dot-pattern.tsx", dotPatternRawCode)}
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component: preview dot pattern inside miniature container */}
            <div className="relative z-10 flex h-24 w-full max-w-[240px] items-center justify-center self-center overflow-hidden rounded-xl border border-border/80 bg-background/60 backdrop-blur-sm">
              <DotPattern size={14} radius={1} className="text-foreground" />
              <span className="relative z-10 rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm border border-border/50">
                Pattern BG
              </span>
            </div>

            <div className="relative z-10" />
          </div>

          {/* Card 10: Color Popover */}
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/10">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-tight text-muted-foreground">10 / popover</span>
              <button
                onClick={() =>
                  openCode("creative-color-popover.tsx", creativeColorPopoverRawCode)
                }
                className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                title="View code"
              >
                <Code2 className="h-3 w-3" />
                <span>code</span>
              </button>
            </div>

            {/* Center Component */}
            <div className="w-full max-w-[240px] self-center">
              <CreativeColorPopover
                label="Palette"
                value={popoverColor}
                onChange={setPopoverColor}
              />
            </div>

            <div />
          </div>
        </div>
      </main>
      )}

      {/* Code Modal */}
      <CodeModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        code={modalState.code}
      />
    </div>
  )
}

export default App

