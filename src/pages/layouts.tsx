import React, { useState } from "react"
import { CreativeSlider } from "@/components/tool-ui/creative-slider"
import { Label } from "@/components/tool-ui/label"

export const LayoutsPage: React.FC = () => {
  const [opacity, setOpacity] = useState<number>(100)
  const [blur, setBlur] = useState<number>(0)
  const [scale, setScale] = useState<number>(100)
  const [rotation, setRotation] = useState<number>(0)

  return (
    <div className="mx-auto w-full min-w-[80vw] max-w-7xl px-6 pb-20">
      {/* Container Card in 16:9 Aspect Ratio */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Editor Mockup Shell */}
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* Left Sidebar */}
          <aside className="w-full border-b border-border bg-card p-5 md:w-64 md:border-b-0 md:border-r flex flex-col gap-6">
            <div className="space-y-3">
              <Label className="block">Transform</Label>
              <div className="space-y-2.5">
                <CreativeSlider
                  label="Scale"
                  value={scale}
                  onChange={setScale}
                  min={20}
                  max={150}
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
          </aside>

          {/* Right Canvas Area: muted background with canvas box in the center */}
          <section className="relative flex flex-1 items-center justify-center bg-muted/40 p-8 overflow-hidden">
            <div
              className="aspect-video w-full max-w-[420px] rounded-xl bg-background shadow-xl transition-all duration-75 flex items-center justify-center border border-border"
              style={{
                opacity: opacity / 100,
                filter: `blur(${blur}px)`,
                transform: `scale(${scale / 100}) rotate(${rotation}deg)`,
              }}
            >
              <span className="font-mono text-[8px] uppercase text-muted-foreground select-none tracking-widest">
                16:9 Canvas
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
