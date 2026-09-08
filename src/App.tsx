import { useState, useEffect } from "react"
import { Code2, Moon, Sun, Download, Sparkles, Copy, AlignLeft, AlignCenter, AlignRight, Monitor } from "lucide-react"
import {
  Label,
  CreativeButton,
  SlidingNumber,
  DotPattern,
  StatusBadge,
  StatusDot,
  MicroKbd,
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
  CreativeAngleKnob,
  CreativeRangeSlider,
  CreativeBoxModel,
  CreativeGradientSlider,
  CreativeAlignmentMatrix,
  CreativeSpringPhysics,
  CreativeHistogramLevels,
  CreativeFontPicker,
  CreativeMaskControl,
  CreativeAudioWaveform,
  CreativeNodeItem,
  PropertyInspector,
  FloatingToolbar,
  MotionSidebar,
  LayerTree,
  KeyframeTimeline,
  ToolCommandPalette,
  ShaderNodeGraph,
  ExportPresetsDialog,
  CanvasEditor,
  MotionVideoEditor,
  VectorDrawingEditor,
  WorkflowNodeBuilder,
} from "@/components/tool-ui"
import { CodeModal } from "@/components/code-modal"

// Raw source imports for code viewer
import labelRawCode from "@/components/tool-ui/atoms/label.tsx?raw"
import creativeButtonRawCode from "@/components/tool-ui/atoms/creative-button.tsx?raw"
import slidingNumberRawCode from "@/components/tool-ui/atoms/sliding-number.tsx?raw"
import dotPatternRawCode from "@/components/tool-ui/atoms/dot-pattern.tsx?raw"
import statusBadgeRawCode from "@/components/tool-ui/atoms/status-badge.tsx?raw"
import statusDotRawCode from "@/components/tool-ui/atoms/status-dot.tsx?raw"
import microKbdRawCode from "@/components/tool-ui/atoms/micro-kbd.tsx?raw"
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
import creativeAngleKnobRawCode from "@/components/tool-ui/molecules/creative-angle-knob.tsx?raw"
import creativeRangeSliderRawCode from "@/components/tool-ui/molecules/creative-range-slider.tsx?raw"
import creativeBoxModelRawCode from "@/components/tool-ui/molecules/creative-box-model.tsx?raw"
import creativeGradientSliderRawCode from "@/components/tool-ui/molecules/creative-gradient-slider.tsx?raw"
import creativeAlignmentMatrixRawCode from "@/components/tool-ui/molecules/creative-alignment-matrix.tsx?raw"
import creativeSpringPhysicsRawCode from "@/components/tool-ui/molecules/creative-spring-physics.tsx?raw"
import creativeHistogramLevelsRawCode from "@/components/tool-ui/molecules/creative-histogram-levels.tsx?raw"
import creativeFontPickerRawCode from "@/components/tool-ui/molecules/creative-font-picker.tsx?raw"
import creativeMaskControlRawCode from "@/components/tool-ui/molecules/creative-mask-control.tsx?raw"
import creativeAudioWaveformRawCode from "@/components/tool-ui/molecules/creative-audio-waveform.tsx?raw"
import creativeNodeItemRawCode from "@/components/tool-ui/molecules/creative-node-item.tsx?raw"
import propertyInspectorRawCode from "@/components/tool-ui/organisms/property-inspector.tsx?raw"
import floatingToolbarRawCode from "@/components/tool-ui/organisms/floating-toolbar.tsx?raw"
import motionSidebarRawCode from "@/components/tool-ui/organisms/motion-sidebar.tsx?raw"
import layerTreeRawCode from "@/components/tool-ui/organisms/layer-tree.tsx?raw"
import keyframeTimelineRawCode from "@/components/tool-ui/organisms/keyframe-timeline.tsx?raw"
import toolCommandPaletteRawCode from "@/components/tool-ui/organisms/tool-command-palette.tsx?raw"
import shaderNodeGraphRawCode from "@/components/tool-ui/organisms/shader-node-graph.tsx?raw"
import exportPresetsDialogRawCode from "@/components/tool-ui/organisms/export-presets-dialog.tsx?raw"
import canvasEditorRawCode from "@/components/tool-ui/templates/canvas-editor.tsx?raw"
import motionVideoEditorRawCode from "@/components/tool-ui/templates/motion-video-editor.tsx?raw"
import vectorDrawingEditorRawCode from "@/components/tool-ui/templates/vector-drawing-editor.tsx?raw"
import workflowNodeBuilderRawCode from "@/components/tool-ui/templates/workflow-node-builder.tsx?raw"

export function App() {
  const [activeTab, setActiveTab] = useState<
    "home" | "components" | "blocks" | "templates"
  >("home")
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [activeTab])

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
    {
      id: "status-badge",
      num: "05",
      title: "status badge",
      file: "status-badge.tsx",
      code: statusBadgeRawCode,
      render: (
        <div className="flex flex-wrap items-center justify-center gap-2 self-center max-w-[220px]">
          <StatusBadge status="online" label="Engine Active" />
          <StatusBadge status="rendering" label="Rendering" />
          <StatusBadge status="accent" label="Spring 60fps" />
          <StatusBadge status="draft" label="Unsaved" pulse={false} />
        </div>
      ),
    },
    {
      id: "status-dot",
      num: "06",
      title: "status dot",
      file: "status-dot.tsx",
      code: statusDotRawCode,
      render: (
        <div className="flex flex-col items-center justify-center gap-3 self-center">
          <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-secondary/30 px-4 py-2.5">
            <StatusDot status="online" size="lg" />
            <StatusDot status="rendering" size="lg" />
            <StatusDot status="accent" size="lg" />
            <StatusDot status="error" size="lg" />
            <StatusDot status="draft" size="lg" pulse={false} />
          </div>
          <span className="font-mono text-[9px] text-muted-foreground">pulsing activity indicators</span>
        </div>
      ),
    },
    {
      id: "micro-kbd",
      num: "07",
      title: "micro kbd",
      file: "micro-kbd.tsx",
      code: microKbdRawCode,
      render: (
        <div className="flex flex-col items-center justify-center gap-2.5 self-center">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-muted-foreground">Export:</span>
            <MicroKbd keys={["⌘", "Shift", "E"]} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-muted-foreground">Command:</span>
            <MicroKbd keys={["⌘", "K"]} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-muted-foreground">Pen Tool:</span>
            <MicroKbd keys={["P"]} />
          </div>
        </div>
      ),
    },
  ]

  const moleculeCards = [
    {
      id: "slider",
      num: "08",
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
      num: "09",
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
      num: "10",
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
      num: "11",
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
      num: "12",
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
      num: "13",
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
      num: "14",
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
      num: "15",
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
      num: "16",
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
      num: "17",
      title: "easing curve",
      file: "creative-easing-curve.tsx",
      code: creativeEasingCurveRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeEasingCurve />
        </div>
      ),
    },
    {
      id: "angle-knob",
      num: "18",
      title: "angle knob",
      file: "creative-angle-knob.tsx",
      code: creativeAngleKnobRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeAngleKnob label="Rotation" value={45} />
        </div>
      ),
    },
    {
      id: "range-slider",
      num: "19",
      title: "range slider",
      file: "creative-range-slider.tsx",
      code: creativeRangeSliderRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeRangeSlider label="Interval" value={[25, 75]} unit="%" />
        </div>
      ),
    },
    {
      id: "box-model",
      num: "20",
      title: "box model",
      file: "creative-box-model.tsx",
      code: creativeBoxModelRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeBoxModel label="Padding" value={{ top: 12, right: 16, bottom: 12, left: 16 }} unit="px" />
        </div>
      ),
    },
    {
      id: "gradient-slider",
      num: "21",
      title: "gradient ramp",
      file: "creative-gradient-slider.tsx",
      code: creativeGradientSliderRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeGradientSlider label="Ramp" />
        </div>
      ),
    },
    {
      id: "alignment-matrix",
      num: "22",
      title: "anchor matrix",
      file: "creative-alignment-matrix.tsx",
      code: creativeAlignmentMatrixRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeAlignmentMatrix label="Anchor" value="center" />
        </div>
      ),
    },
    {
      id: "spring-physics",
      num: "23",
      title: "spring physics",
      file: "creative-spring-physics.tsx",
      code: creativeSpringPhysicsRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeSpringPhysics label="Spring" stiffness={180} damping={22} />
        </div>
      ),
    },
    {
      id: "histogram-levels",
      num: "24",
      title: "histogram levels",
      file: "creative-histogram-levels.tsx",
      code: creativeHistogramLevelsRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeHistogramLevels label="Levels" blackPoint={20} whitePoint={235} />
        </div>
      ),
    },
    {
      id: "font-picker",
      num: "25",
      title: "font picker",
      file: "creative-font-picker.tsx",
      code: creativeFontPickerRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeFontPicker label="Typeface" fontFamily="Inter" weight="Medium" />
        </div>
      ),
    },
    {
      id: "mask-control",
      num: "26",
      title: "mask mode",
      file: "creative-mask-control.tsx",
      code: creativeMaskControlRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeMaskControl label="Mask" value="clipping" />
        </div>
      ),
    },
    {
      id: "audio-waveform",
      num: "27",
      title: "audio waveform",
      file: "creative-audio-waveform.tsx",
      code: creativeAudioWaveformRawCode,
      render: (
        <div className="w-full max-w-[240px] self-center">
          <CreativeAudioWaveform label="Track" progress={42} />
        </div>
      ),
    },
    {
      id: "node-item",
      num: "28",
      title: "node item",
      file: "creative-node-item.tsx",
      code: creativeNodeItemRawCode,
      render: (
        <div className="flex items-center justify-center self-center">
          <CreativeNodeItem
            title="Color Ramp"
            nodeType="filter"
            inputs={["factor", "color_in"]}
            outputs={["rgba", "alpha"]}
          />
        </div>
      ),
    },
  ]

  const componentCards = [...atomCards, ...moleculeCards]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-150">
      {/* Minimal Header */}
      <header
        className={`mx-auto flex flex-wrap items-center justify-between gap-y-3 px-4 py-4 sm:px-6 sm:py-6 transition-all duration-150 ${activeTab === "templates" ? "w-full max-w-[1920px]" : "max-w-4xl"
          }`}
      >
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <span className="font-mono text-[10px] font-semibold tracking-tight">apparat/ui</span>
          <nav className="flex items-center gap-4 sm:gap-5 overflow-x-auto font-mono text-[10px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {(["home", "components", "blocks", "templates"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap transition-colors ${activeTab === tab
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-0.5">
          {/* X (x) */}
          <div className="group relative flex items-center justify-center">
            <a
              href="http://x.com/tommy_jepsen"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="X (twitter)"
            >
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <div className="pointer-events-none absolute top-full mt-1.5 whitespace-nowrap rounded-md border border-border/60 bg-popover px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-popover-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">
              Tommy Jepsen
            </div>
          </div>

          {/* LinkedIn */}
          <div className="group relative flex items-center justify-center">
            <a
              href="https://www.linkedin.com/in/toje"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5v-8.37H5.07v8.37h2.79z" />
              </svg>
            </a>
            <div className="pointer-events-none absolute top-full mt-1.5 whitespace-nowrap rounded-md border border-border/60 bg-popover px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-popover-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">
              Tommy Jepsen
            </div>
          </div>

          {/* GitHub */}
          <div className="group relative flex items-center justify-center">
            <a
              href="https://github.com/tommyjepsen/apparat-ui"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub Repository"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <div className="pointer-events-none absolute top-full mt-1.5 whitespace-nowrap rounded-md border border-border/60 bg-popover px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-popover-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">
              /apparat-ui
            </div>
          </div>

          <div className="mx-1 h-3.5 w-px bg-border" />

          {/* Theme Toggle */}
          <div className="group relative flex items-center justify-center">
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun /> : <Moon />}
            </button>
            <div className="pointer-events-none absolute top-full mt-1.5 whitespace-nowrap rounded-md border border-border/60 bg-popover px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-popover-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">
              {isDark ? "Light Mode" : "Dark Mode"}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-only Notice Bar */}
      <div className="mx-auto flex sm:hidden max-w-4xl px-4 pb-4">
        <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-secondary/30 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          <Monitor className="h-3 w-3 text-accent" />
          <span>Optimized for desktop only</span>
        </div>
      </div>
      {activeTab === "templates" ? (
        <main className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 pb-16">
          <div className="flex flex-col gap-10 py-4">
            {/* Template 01 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  01
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
              <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <CanvasEditor />
              </div>
            </div>

            {/* Template 02: Motion Graphic Video Editor */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  02 / MOTION GRAPHIC VIDEO EDITOR
                </span>
                <button
                  onClick={() => openCode("motion-video-editor.tsx", motionVideoEditorRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <MotionVideoEditor />
              </div>
            </div>

            {/* Template 03: Simple Vector Drawing Tool */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  03 / SIMPLE VECTOR DRAWING TOOL
                </span>
                <button
                  onClick={() => openCode("vector-drawing-editor.tsx", vectorDrawingEditorRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <VectorDrawingEditor />
              </div>
            </div>

            {/* Template 04: Workflow Creative Node Builder */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  04 / WORKFLOW CREATIVE BUILDER
                </span>
                <button
                  onClick={() => openCode("workflow-node-builder.tsx", workflowNodeBuilderRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <WorkflowNodeBuilder />
              </div>
            </div>
          </div>
        </main>
      ) : activeTab === "blocks" ? (
        <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
          <div className="flex flex-col gap-6 py-4 sm:py-6">
            {/* Organism 01: Floating Toolbar */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
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
              <div className="flex min-h-[120px] items-center justify-center overflow-x-auto rounded-lg border border-border/40 bg-background/50 p-4 sm:p-6">
                <FloatingToolbar />
              </div>
            </div>

            {/* Organism 02: Property Inspector */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
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
              <div className="flex justify-center p-2 sm:p-4">
                <PropertyInspector />
              </div>
            </div>

            {/* Organism 03: Motion Customizer Sidebar */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
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
              <div className="flex justify-center p-2 sm:p-4">
                <MotionSidebar />
              </div>
            </div>

            {/* Organism 04: Layer Tree */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  04 / LAYER TREE
                </span>
                <button
                  onClick={() => openCode("layer-tree.tsx", layerTreeRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center p-2 sm:p-4">
                <LayerTree />
              </div>
            </div>

            {/* Organism 05: Keyframe Timeline */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  05 / KEYFRAME TIMELINE
                </span>
                <button
                  onClick={() => openCode("keyframe-timeline.tsx", keyframeTimelineRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center overflow-x-auto p-2 sm:p-4">
                <KeyframeTimeline />
              </div>
            </div>

            {/* Organism 06: Command Palette */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  06 / COMMAND PALETTE
                </span>
                <button
                  onClick={() => openCode("tool-command-palette.tsx", toolCommandPaletteRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center p-2 sm:p-4">
                <ToolCommandPalette onToggleTheme={() => setIsDark((prev) => !prev)} />
              </div>
            </div>

            {/* Organism 07: Shader Node Graph */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  07 / SHADER NODE GRAPH
                </span>
                <button
                  onClick={() => openCode("shader-node-graph.tsx", shaderNodeGraphRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center p-2 sm:p-4">
                <ShaderNodeGraph />
              </div>
            </div>

            {/* Organism 08: Export Presets Dialog */}
            <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  08 / EXPORT PRESETS DIALOG
                </span>
                <button
                  onClick={() => openCode("export-presets-dialog.tsx", exportPresetsDialogRawCode)}
                  className="flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                  title="View code"
                >
                  <Code2 className="h-3 w-3" />
                  <span>code</span>
                </button>
              </div>
              <div className="flex justify-center p-2 sm:p-4">
                <ExportPresetsDialog />
              </div>
            </div>
          </div>
        </main>
      ) : activeTab === "home" ? (
        <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
          <div className="mb-8 max-w-sm space-y-2">
            <h1 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Build creative tools faster
            </h1>
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
              A Dieter Rams-inspired tactile UI component library designed for creative software, editors, and canvas tools.

              <br /><br />Created by Tommy Jepsen -{" "}
              <a
                href="http://x.com/tommy_jepsen"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:text-accent hover:decoration-accent"
              >
                X
              </a>{" "}
              and{" "}
              <a
                href="https://www.linkedin.com/in/toje"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:text-accent hover:decoration-accent"
              >
                LinkedIn
              </a>.
              <br />
              Open source on{" "}
              <a href="https://github.com/tommyjepsen/creative-tool-ui" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:text-accent hover:decoration-accent">
                GitHub
              </a>.
            </p>
          </div>

          {/* Featured Example: 02 / PROPERTY INSPECTOR */}
          <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
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
            <div className="flex justify-center p-2 sm:p-4">
              <PropertyInspector />
            </div>
          </div>
        </main>
      ) : (
        <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            {componentCards.map((card) => (
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

