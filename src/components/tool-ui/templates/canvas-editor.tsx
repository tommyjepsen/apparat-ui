import React, { useState } from "react"
import {
  CreativeSlider,
  CreativeSelect,
  CreativeToggle,
  CreativeColorPicker,
  CreativeNumberInput,
  CreativeSegmentedControl,
} from "../molecules"
import { CreativeButton, DotPattern, Label } from "../atoms"
import { RotateCcw, Download } from "lucide-react"

export const CanvasEditor: React.FC = () => {
  const [aspect, setAspect] = useState<string>("16:9")
  const [posX, setPosX] = useState<number>(0)
  const [posY, setPosY] = useState<number>(0)
  const [opacity, setOpacity] = useState<number>(100)
  const [blur, setBlur] = useState<number>(0)
  const [scale, setScale] = useState<number>(100)
  const [rotation, setRotation] = useState<number>(0)
  const [blendMode, setBlendMode] = useState<string>("normal")
  const [hasShadow, setHasShadow] = useState<boolean>(true)
  const [canvasColor, setCanvasColor] = useState<string>("#FFFFFF")

  return (
    <div className="mx-auto w-full min-w-[80vw] max-w-7xl px-6 pb-20">
      {/* Container Card in 16:9 Aspect Ratio */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
        {/* Editor Mockup Shell */}
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Left Sidebar */}
          <aside className="w-full border-b border-border bg-card p-5 md:w-64 md:border-b-0 md:border-r flex flex-col gap-6 overflow-y-auto">
            <div className="space-y-3">
              <Label className="block">Ratio</Label>
              <CreativeSegmentedControl
                layoutId="editor-aspect"
                value={aspect}
                onChange={setAspect}
                options={[
                  { value: "16:9", label: "16:9" },
                  { value: "1:1", label: "1:1" },
                  { value: "9:16", label: "9:16" },
                ]}
              />
            </div>

            <div className="space-y-3">
              <Label className="block">Transform</Label>
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <CreativeNumberInput
                    label="X"
                    unit="px"
                    value={posX}
                    onChange={setPosX}
                  />
                  <CreativeNumberInput
                    label="Y"
                    unit="px"
                    value={posY}
                    onChange={setPosY}
                  />
                </div>

                <CreativeSlider
                  label="Scale"
                  value={scale}
                  onChange={setScale}
                  min={10}
                  max={200}
                  step={1}
                  unit="%"
                />

                <CreativeSlider
                  label="Rotation"
                  value={rotation}
                  onChange={setRotation}
                  min={-180}
                  max={180}
                  step={1}
                  unit="°"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="block">Appearance</Label>
              <div className="space-y-2.5">
                <CreativeColorPicker
                  label="Fill"
                  value={canvasColor}
                  onChange={setCanvasColor}
                />

                <CreativeSelect
                  label="Blend"
                  value={blendMode}
                  onChange={setBlendMode}
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "multiply", label: "Multiply" },
                    { value: "screen", label: "Screen" },
                    { value: "overlay", label: "Overlay" },
                  ]}
                />

                <CreativeToggle
                  label="Drop Shadow"
                  checked={hasShadow}
                  onChange={setHasShadow}
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

                <CreativeSlider
                  label="Blur"
                  value={blur}
                  onChange={setBlur}
                  min={0}
                  max={20}
                  step={1}
                  unit="px"
                />
              </div>
            </div>

            <div className="mt-auto pt-2 flex items-center gap-2">
              <CreativeButton
                variant="secondary"
                className="flex-1 gap-1.5"
                onClick={() => {
                  setPosX(0)
                  setPosY(0)
                  setScale(100)
                  setRotation(0)
                  setOpacity(100)
                  setBlur(0)
                }}
              >
                <RotateCcw />
                <span>Reset</span>
              </CreativeButton>
              <CreativeButton variant="accent" className="flex-1 gap-1.5">
                <Download />
                <span>Export</span>
              </CreativeButton>
            </div>
          </aside>

          {/* Right Canvas Area: muted background with repeated dot pattern and canvas box in the center */}
          <section className="relative flex flex-1 items-center justify-center bg-muted/40 p-8 overflow-hidden">
            <DotPattern size={20} radius={1.2} />

            <div
              className={`relative z-10 w-full transition-all duration-150 flex items-center justify-center border border-border rounded-xl ${
                aspect === "16:9"
                  ? "aspect-video max-w-[420px]"
                  : aspect === "1:1"
                  ? "aspect-square max-w-[280px]"
                  : "aspect-[9/16] max-w-[200px]"
              }`}
              style={{
                backgroundColor: canvasColor,
                opacity: opacity / 100,
                filter: `blur(${blur}px)`,
                transform: `translate(${posX}px, ${posY}px) scale(${scale / 100}) rotate(${rotation}deg)`,
              }}
            >
              <span className="font-mono text-[8px] uppercase text-muted-foreground select-none tracking-widest">
                {aspect} Canvas
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
