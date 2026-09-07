import { useState, useEffect } from "react"
import { Code2, Moon, Sun, Download, Sparkles, Copy, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import {
  Label,
  CreativeButton,
  SlidingNumber,
  DotPattern,
  CreativeSlider,
  CreativeSelect,
  CreativeToggle,
  CreativeColorPicker,
  CreativeColorPopover,
  CreativeNumberInput,
  CreativeTextInput,
  CreativeTextareaPopover,
  CreativeSegmentedControl,
  CreativeEasingCurve,
  PropertyInspector,
  FloatingToolbar,
  MotionSidebar,
  CanvasEditor,
} from "@/components/tool-ui"
import { CodeModal } from "@/components/code-modal"

// Raw source imports for code viewer
import labelRawCode from "@/components/tool-ui/atoms/label.tsx?raw"
import creativeButtonRawCode from "@/components/tool-ui/atoms/creative-button.tsx?raw"
import slidingNumberRawCode from "@/components/tool-ui/atoms/sliding-number.tsx?raw"
import dotPatternRawCode from "@/components/tool-ui/atoms/dot-pattern.tsx?raw"
import creativeSliderRawCode from "@/components/tool-ui/molecules/creative-slider.tsx?raw"
import creativeSelectRawCode from "@/components/tool-ui/molecules/creative-select.tsx?raw"
import creativeToggleRawCode from "@/components/tool-ui/molecules/creative-toggle.tsx?raw"
import creativeColorPickerRawCode from "@/components/tool-ui/molecules/creative-color-picker.tsx?raw"
import creativeColorPopoverRawCode from "@/components/tool-ui/molecules/creative-color-popover.tsx?raw"
import creativeNumberInputRawCode from "@/components/tool-ui/molecules/creative-number-input.tsx?raw"
import creativeTextInputRawCode from "@/components/tool-ui/molecules/creative-text-input.tsx?raw"
import creativeTextareaPopoverRawCode from "@/components/tool-ui/molecules/creative-textarea-popover.tsx?raw"
import creativeSegmentedControlRawCode from "@/components/tool-ui/molecules/creative-segmented-control.tsx?raw"
import creativeEasingCurveRawCode from "@/components/tool-ui/molecules/creative-easing-curve.tsx?raw"
import propertyInspectorRawCode from "@/components/tool-ui/organisms/property-inspector.tsx?raw"
import floatingToolbarRawCode from "@/components/tool-ui/organisms/floating-toolbar.tsx?raw"
import motionSidebarRawCode from "@/components/tool-ui/organisms/motion-sidebar.tsx?raw"
import canvasEditorRawCode from "@/components/tool-ui/templates/canvas-editor.tsx?raw"

export function App() {
  const [activeTab, setActiveTab] = useState<
    "all" | "atoms" | "molecules" | "organisms" | "templates"
  >("all")
  const [blendMode, setBlendMode] = useState("normal")
  const [gridEnabled, setGridEnabled] = useState(true)
  const [accentColor, setAccentColor] = useState("#EA580C")
  const [paddingVal, setPaddingVal] = useState(24)
  const [alignMode, setAlignMode] = useState("center")
  const [popoverColor, setPopoverColor] = useState("#3B82F6")
  const [layerName, setLayerName] = useState("Hero Element")
  const [promptVal, setPromptVal] = useState("Generate an ultra-crisp minimalist UI card.")
  const [slidingCount, setSlidingCount] = useState(42)
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

  // Define Atomic Components
  const atomCards = [
    {
      id: "label",
      num: "01",
      title: "label",
      file: "label.tsx",
      code: labelRawCode,
      render: (
        <div className="flex flex-col items-center justify-center gap-2 self-center">
          <Label>Property Name</Label>
          <Label className="text-foreground">Active Layer</Label>
          <Label className="text-accent">Accent State</Label>
        </div>
      ),
    },
    {
      id: "button",
      num: "02",
      title: "button",
      file: "creative-button.tsx",
      code: creativeButtonRawCode,
      render: (
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
      ),
    },
    {
      id: "sliding-number",
      num: "03",
      title: "sliding number",
      file: "sliding-number.tsx",
      code: slidingNumberRawCode,
      render: (
        <div className="flex flex-col items-center justify-center gap-3 self-center">
          <div className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-secondary/30 px-2.5 py-1">
            <button
              onClick={() => setSlidingCount((c) => Math.max(0, c - 1))}
              className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground active:scale-95"
            >
              -
            </button>
            <SlidingNumber value={slidingCount} unit="px" className="text-[10px] font-normal" />
            <button
              onClick={() => setSlidingCount((c) => c + 1)}
              className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground active:scale-95"
            >
              +
            </button>
          </div>
          <span className="font-mono text-[9px] text-muted-foreground">spring digit roller</span>
        </div>
      ),
    },
    {
      id: "dot-pattern",
      num: "04",
      title: "dot pattern",
      file: "dot-pattern.tsx",
      code: dotPatternRawCode,
      render: (
        <div className="relative z-10 flex h-24 w-full max-w-[240px] items-center justify-center self-center overflow-hidden rounded-xl border border-border/80 bg-background/60 backdrop-blur-sm">
          <DotPattern size={14} radius={1} className="text-foreground" />
          <span className="relative z-10 rounded-md border border-border/50 bg-secondary/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            Pattern BG
          </span>
        </div>
      ),
    },
  ]

  const moleculeCards = [
    {
      id: "slider",
      num: "05",
      title: "slider",
      file: "creative-slider.tsx",
      code: creativeSliderRawCode,
      render: (
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
      ),
    },
    {
      id: "select",
      num: "06",
      title: "select",
      file: "creative-select.tsx",
      code: creativeSelectRawCode,
      render: (
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
      ),
    },
    {
      id: "toggle",
      num: "07",
      title: "toggle",
      file: "creative-toggle.tsx",
      code: creativeToggleRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeToggle
            label="Snap to grid"
            checked={gridEnabled}
            onChange={setGridEnabled}
          />
        </div>
      ),
    },
    {
      id: "color-picker",
      num: "08",
      title: "color picker",
      file: "creative-color-picker.tsx",
      code: creativeColorPickerRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeColorPicker
            label="Color"
            value={accentColor}
            onChange={setAccentColor}
          />
        </div>
      ),
    },
    {
      id: "number-input",
      num: "09",
      title: "number",
      file: "creative-number-input.tsx",
      code: creativeNumberInputRawCode,
      render: (
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
      ),
    },
    {
      id: "segmented",
      num: "10",
      title: "segmented",
      file: "creative-segmented-control.tsx",
      code: creativeSegmentedControlRawCode,
      render: (
        <div className="flex w-full max-w-[240px] flex-col gap-3 self-center">
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
      ),
    },
    {
      id: "color-popover",
      num: "11",
      title: "color popover",
      file: "creative-color-popover.tsx",
      code: creativeColorPopoverRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeColorPopover
            label="Palette"
            value={popoverColor}
            onChange={setPopoverColor}
          />
        </div>
      ),
    },
    {
      id: "text-input",
      num: "12",
      title: "input",
      file: "creative-text-input.tsx",
      code: creativeTextInputRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeTextInput
            label="Name"
            value={layerName}
            onChange={setLayerName}
            placeholder="Untitled"
          />
        </div>
      ),
    },
    {
      id: "textarea-popover",
      num: "13",
      title: "textarea",
      file: "creative-textarea-popover.tsx",
      code: creativeTextareaPopoverRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeTextareaPopover
            label="Prompt"
            value={promptVal}
            onChange={setPromptVal}
            placeholder="Enter prompt..."
          />
        </div>
      ),
    },
    {
      id: "easing-curve",
      num: "14",
      title: "easing curve",
      file: "creative-easing-curve.tsx",
      code: creativeEasingCurveRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeEasingCurve />
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-150">
      {/* Minimal Header */}
      <header
        className={`mx-auto flex items-center justify-between px-6 py-6 transition-all duration-150 ${
          activeTab === "templates" ? "w-fit min-w-[80vw] max-w-7xl" : "max-w-4xl"
        }`}
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] font-semibold tracking-tight">creative tool ui</span>
          <nav className="flex items-center gap-3 font-mono text-[10px]">
            {(["all", "atoms", "molecules", "organisms", "templates"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors ${
                  activeTab === tab
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
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
      {activeTab === "templates" ? (
        <main className="mx-auto w-full min-w-[80vw] max-w-7xl px-6 pb-16">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              TEMPLATE / CANVAS EDITOR
            </span>
            <button
              onClick={() => openCode("canvas-editor.tsx", canvasEditorRawCode)}
              className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
              title="View code"
            >
              <Code2 className="h-3 w-3" />
              <span>code</span>
            </button>
          </div>
          <CanvasEditor />
        </main>
      ) : activeTab === "organisms" ? (
        <main className="mx-auto max-w-4xl px-6 pb-16">
          <div className="flex flex-col gap-6 py-6">
            {/* Organism 01: Floating Toolbar */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  01 / FLOATING TOOLBAR
                </span>
                <button
                  onClick={() => openCode("floating-toolbar.tsx", floatingToolbarRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-border/40 bg-background/50 p-6">
                <FloatingToolbar />
              </div>
            </div>

            {/* Organism 02: Property Inspector */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  02 / PROPERTY INSPECTOR
                </span>
                <button
                  onClick={() => openCode("property-inspector.tsx", propertyInspectorRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center p-4">
                <PropertyInspector />
              </div>
            </div>

            {/* Organism 03: Motion Customizer Sidebar */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  03 / MOTION CUSTOMIZER
                </span>
                <button
                  onClick={() => openCode("motion-sidebar.tsx", motionSidebarRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center p-4">
                <MotionSidebar />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="mx-auto max-w-4xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {(activeTab === "all" || activeTab === "atoms") &&
              atomCards.map((card) => (
                <div
                  key={card.id}
                  className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl bg-card p-6 transition-all"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {card.num} / {card.title}
                    </span>
                    <button
                      onClick={() => openCode(card.file, card.code)}
                      className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                      title="View code"
                    >
                      <Code2 className="h-3 w-3" />
                      <span>code</span>
                    </button>
                  </div>

                  {card.render}

                  <div className="relative z-10" />
                </div>
              ))}

            {(activeTab === "all" || activeTab === "molecules") &&
              moleculeCards.map((card) => (
                <div
                  key={card.id}
                  className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl bg-card p-6 transition-all"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {card.num} / {card.title}
                    </span>
                    <button
                      onClick={() => openCode(card.file, card.code)}
                      className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                      title="View code"
                    >
                      <Code2 className="h-3 w-3" />
                      <span>code</span>
                    </button>
                  </div>

                  {card.render}

                  <div className="relative z-10" />
                </div>
              ))}
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

