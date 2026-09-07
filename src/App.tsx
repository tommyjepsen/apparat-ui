import { useState, useEffect } from "react"
import { Code2, Moon, Sun } from "lucide-react"
import { CreativeSlider } from "@/components/tool-ui/creative-slider"
import { Label } from "@/components/tool-ui/label"
import { CodeModal } from "@/components/code-modal"
import { LayoutsPage } from "@/pages/layouts"
import creativeSliderRawCode from "@/components/tool-ui/creative-slider.tsx?raw"
import labelRawCode from "@/components/tool-ui/label.tsx?raw"

export function App() {
  const [activeTab, setActiveTab] = useState<"components" | "layouts">("components")
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
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">01 / slider</span>
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
          <div className="group relative flex aspect-square flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">02 / label</span>
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

          {/* Placeholder Card 3 */}
          <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 p-6 text-center">
            <span className="font-mono text-xs text-muted-foreground/60">+ component</span>
          </div>

          {/* Placeholder Card 4 */}
          <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 p-6 text-center">
            <span className="font-mono text-xs text-muted-foreground/60">+ component</span>
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

