import React, { useState } from "react"
import {
  CreativeSlider,
  CreativeSelect,
  CreativeToggle,
  CreativeNumberInput,
  CreativeSegmentedControl,
  CreativeEasingCurve,
} from "../molecules"
import { CreativeButton, DotPattern, Label } from "../atoms"
import { KeyframeTimeline } from "../organisms/keyframe-timeline"
import {
  Download,
  Play,
  Sparkles,
  Video,
  Share2,
  Settings2,
} from "lucide-react"

export const MotionVideoEditor: React.FC = () => {
  const [resolution, setResolution] = useState<string>("1080p")
  const [frameRate, setFrameRate] = useState<string>("60fps")
  const [duration, setDuration] = useState<number>(5)
  const [motionBlur, setMotionBlur] = useState<boolean>(true)
  const [interpolate, setInterpolate] = useState<boolean>(true)
  const [exportQuality, setExportQuality] = useState<number>(92)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(100)
  const [dampingVal, setDampingVal] = useState<number>(24)
  const [stiffnessVal, setStiffnessVal] = useState<number>(180)

  return (
    <div className="mx-auto w-full min-w-[760px] max-w-[1920px] px-2 sm:px-6 pb-20">
      {/* 16:9 Aspect Video Editor Workspace Shell */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-card flex flex-col">
        {/* Main Content: Left Sidebar, Canvas Center, Right Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar: Easing & Animation Settings */}
          <aside className="w-64 border-r border-border bg-card p-4 flex flex-col gap-5 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between border-b border-border pb-2 px-0.5">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
                Motion Curves
              </span>
              <span className="font-mono text-[8px] text-accent">SPRING</span>
            </div>

            <div className="space-y-3">
              <Label className="block">Curve Profile</Label>
              <CreativeEasingCurve label="Playback Bezier" />
            </div>

            <div className="space-y-3">
              <Label className="block">Physics Dynamics</Label>
              <div className="space-y-2.5">
                <CreativeSlider
                  label="Stiffness"
                  value={stiffnessVal}
                  onChange={setStiffnessVal}
                  min={50}
                  max={400}
                  step={5}
                />
                <CreativeSlider
                  label="Damping"
                  value={dampingVal}
                  onChange={setDampingVal}
                  min={5}
                  max={60}
                  step={1}
                />
                <CreativeSlider
                  label="Speed"
                  value={speedMultiplier}
                  onChange={setSpeedMultiplier}
                  min={25}
                  max={200}
                  step={5}
                  unit="%"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="block">Interpolation</Label>
              <div className="space-y-2">
                <CreativeToggle
                  label="Motion Blur"
                  checked={motionBlur}
                  onChange={setMotionBlur}
                />
                <CreativeToggle
                  label="Sub-frame Smoothing"
                  checked={interpolate}
                  onChange={setInterpolate}
                />
              </div>
            </div>
          </aside>

          {/* Central Video Viewport */}
          <section className="relative flex flex-1 items-center justify-center bg-muted/40 p-6 overflow-hidden">
            <DotPattern size={20} radius={1.2} />

            {/* Video Preview Frame */}
            <div className="relative z-10 aspect-video w-full max-w-[440px] rounded-xl border border-border bg-background/90 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                <Video className="h-2.5 w-2.5 text-accent" />
                <span>Sequence 01 — {resolution}</span>
              </div>

              {/* Animated Graphic Indicator */}
              <div className="relative flex flex-col items-center gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 shadow-lg transition-transform hover:scale-110">
                  <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-foreground font-semibold">
                    Motion Graphic Layer
                  </span>
                  <span className="font-mono text-[8px] text-muted-foreground">
                    cubic-bezier(0.25, 0.1, 0.25, 1.0)
                  </span>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[8px] text-muted-foreground backdrop-blur-sm">
                {frameRate}
              </div>
            </div>
          </section>

          {/* Right Sidebar: Render, Quality & Export */}
          <aside className="w-64 border-l border-border bg-card p-4 flex flex-col gap-5 overflow-y-auto shrink-0">
            <div className="flex items-center justify-between border-b border-border pb-2 px-0.5">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
                Export & Render
              </span>
              <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              <Label className="block">Resolution Format</Label>
              <CreativeSegmentedControl
                layoutId="motion-res-preset"
                value={resolution}
                onChange={setResolution}
                options={[
                  { value: "720p", label: "720p" },
                  { value: "1080p", label: "1080p" },
                  { value: "4K", label: "4K" },
                ]}
              />
            </div>

            <div className="space-y-3">
              <Label className="block">Output Profile</Label>
              <div className="space-y-2.5">
                <CreativeSelect
                  label="Framerate"
                  value={frameRate}
                  onChange={setFrameRate}
                  options={[
                    { value: "24fps", label: "24 FPS" },
                    { value: "30fps", label: "30 FPS" },
                    { value: "60fps", label: "60 FPS" },
                  ]}
                />

                <CreativeNumberInput
                  label="Length"
                  unit="s"
                  value={duration}
                  onChange={setDuration}
                  min={1}
                  max={120}
                />

                <CreativeSlider
                  label="Quality"
                  value={exportQuality}
                  onChange={setExportQuality}
                  min={50}
                  max={100}
                  step={1}
                  unit="%"
                />
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-2">
              <CreativeButton variant="accent" className="w-full gap-1.5">
                <Download />
                <span>Export MP4</span>
              </CreativeButton>
              <div className="flex items-center gap-2">
                <CreativeButton variant="outline" className="flex-1 gap-1">
                  <Play />
                  <span>Queue</span>
                </CreativeButton>
                <CreativeButton variant="secondary" className="flex-1 gap-1">
                  <Share2 />
                  <span>Share</span>
                </CreativeButton>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Panel: Interactive Keyframe Timeline */}
        <div className="border-t border-border bg-card/60 px-4 py-2 flex items-center justify-center shrink-0">
          <KeyframeTimeline className="max-w-none w-full border-none bg-transparent p-1 shadow-none" />
        </div>
      </div>
    </div>
  )
}
