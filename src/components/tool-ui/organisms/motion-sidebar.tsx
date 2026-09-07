import React, { useState } from "react"
import {
  CreativeSlider,
  CreativeNumberInput,
  CreativeSelect,
  CreativeToggle,
  CreativeSegmentedControl,
  CreativeEasingCurve,
} from "../molecules"
import { Label, CreativeButton } from "../atoms"
import { RotateCcw, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MotionSidebarProps {
  className?: string
}

export const MotionSidebar: React.FC<MotionSidebarProps> = ({ className }) => {
  const [targetType, setTargetType] = useState("spring")
  const [duration, setDuration] = useState(600)
  const [delay, setDelay] = useState(0)
  const [stiffness, setStiffness] = useState(300)
  const [damping, setDamping] = useState(25)
  const [mass, setMass] = useState(1)
  const [loop, setLoop] = useState(false)
  const [triggerMode, setTriggerMode] = useState("hover")

  return (
    <div
      className={cn(
        "flex w-full max-w-[280px] flex-col gap-5 rounded-2xl border border-border bg-card p-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
          Motion & Transition
        </span>
        <span className="font-mono text-[8px] text-muted-foreground">
          ORGANISM
        </span>
      </div>

      {/* Physics / Curve Segmented Type */}
      <div className="space-y-2">
        <Label>Engine</Label>
        <CreativeSegmentedControl
          layoutId="motion-sidebar-engine"
          value={targetType}
          onChange={setTargetType}
          options={[
            { value: "spring", label: "Spring" },
            { value: "bezier", label: "Bezier" },
            { value: "linear", label: "Linear" },
          ]}
        />
      </div>

      {/* Easing Curve Molecule */}
      <div className="space-y-2">
        <CreativeEasingCurve label="Curve Preset" />
      </div>

      {/* Parameters Timing Group */}
      <div className="space-y-2">
        <Label>Timing</Label>
        <div className="grid grid-cols-2 gap-2">
          <CreativeNumberInput
            label="Duration"
            unit="ms"
            value={duration}
            onChange={setDuration}
            min={50}
            max={3000}
            step={50}
          />
          <CreativeNumberInput
            label="Delay"
            unit="ms"
            value={delay}
            onChange={setDelay}
            min={0}
            max={2000}
            step={50}
          />
        </div>
      </div>

      {/* Spring Dynamics Group */}
      {targetType === "spring" && (
        <div className="space-y-2.5">
          <Label>Dynamics</Label>
          <CreativeSlider
            label="Stiffness"
            value={stiffness}
            onChange={setStiffness}
            min={50}
            max={600}
            step={10}
          />
          <CreativeSlider
            label="Damping"
            value={damping}
            onChange={setDamping}
            min={5}
            max={50}
            step={1}
          />
          <CreativeSlider
            label="Mass"
            value={mass}
            onChange={setMass}
            min={0.1}
            max={5}
            step={0.1}
          />
        </div>
      )}

      {/* Trigger & Behavior */}
      <div className="space-y-2">
        <Label>Trigger</Label>
        <CreativeSelect
          label="On"
          value={triggerMode}
          onChange={setTriggerMode}
          options={[
            { value: "hover", label: "On Hover" },
            { value: "click", label: "On Click" },
            { value: "mount", label: "On Mount" },
            { value: "scroll", label: "On Scroll" },
          ]}
        />
        <CreativeToggle
          label="Infinite loop"
          checked={loop}
          onChange={setLoop}
        />
      </div>

      {/* Action Footer */}
      <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
        <CreativeButton
          variant="secondary"
          className="flex-1 gap-1 px-2"
          onClick={() => {
            setDuration(600)
            setDelay(0)
            setStiffness(300)
            setDamping(25)
            setMass(1)
            setLoop(false)
          }}
        >
          <RotateCcw />
          <span>Reset</span>
        </CreativeButton>
        <CreativeButton variant="accent" className="flex-1 gap-1 px-2">
          <Sparkles />
          <span>Apply</span>
        </CreativeButton>
      </div>
    </div>
  )
}
