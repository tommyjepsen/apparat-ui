import React, { useState } from "react"
import {
  CreativeSlider,
  CreativeNumberInput,
  CreativeSelect,
  CreativeToggle,
  CreativeColorPicker,
  CreativeColorPopover,
  CreativeTextInput,
  CreativeTextareaPopover,
  CreativeSegmentedControl,
} from "../molecules"
import { Label, CreativeButton } from "../atoms"
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Download } from "lucide-react"

export const PropertyInspector: React.FC = () => {
  const [name, setName] = useState("Hero Element")
  const [prompt, setPrompt] = useState("Minimalist UI design system")
  const [aspect, setAspect] = useState("16:9")
  const [align, setAlign] = useState("center")
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const [color, setColor] = useState("#EA580C")
  const [swatchColor, setSwatchColor] = useState("#3B82F6")
  const [blend, setBlend] = useState("normal")
  const [opacity, setOpacity] = useState(100)
  const [grid, setGrid] = useState(true)

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-5 rounded-2xl border border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
          Inspector
        </span>
        <span className="font-mono text-[8px] text-muted-foreground">
          ORGANISM
        </span>
      </div>

      {/* Layer Identity */}
      <div className="space-y-2">
        <Label>Layer</Label>
        <CreativeTextInput
          label="Name"
          value={name}
          onChange={setName}
        />
        <CreativeTextareaPopover
          label="Prompt"
          value={prompt}
          onChange={setPrompt}
        />
      </div>

      {/* Transform Group */}
      <div className="space-y-2">
        <Label>Transform</Label>
        <CreativeSegmentedControl
          layoutId="inspector-aspect"
          value={aspect}
          onChange={setAspect}
          options={[
            { value: "16:9", label: "16:9" },
            { value: "1:1", label: "1:1" },
            { value: "9:16", label: "9:16" },
          ]}
        />
        <CreativeSegmentedControl
          layoutId="inspector-align"
          value={align}
          onChange={setAlign}
          options={[
            { value: "left", label: <AlignLeft aria-label="Left" />, tooltip: "Left" },
            { value: "center", label: <AlignCenter aria-label="Center" />, tooltip: "Center" },
            { value: "right", label: <AlignRight aria-label="Right" />, tooltip: "Right" },
          ]}
        />
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
      </div>

      {/* Appearance Group */}
      <div className="space-y-2">
        <Label>Appearance</Label>
        <CreativeColorPicker
          label="Color"
          value={color}
          onChange={setColor}
        />
        <CreativeColorPopover
          label="Preset"
          value={swatchColor}
          onChange={setSwatchColor}
        />
        <CreativeSelect
          label="Blend"
          value={blend}
          onChange={setBlend}
          options={[
            { value: "normal", label: "Normal" },
            { value: "multiply", label: "Multiply" },
            { value: "screen", label: "Screen" },
          ]}
        />
        <CreativeSlider
          label="Opacity"
          value={opacity}
          onChange={setOpacity}
          min={0}
          max={100}
          unit="%"
        />
        <CreativeToggle
          label="Grid snap"
          checked={grid}
          onChange={setGrid}
        />
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-2 border-t border-border pt-3">
        <CreativeButton variant="secondary" className="flex-1 gap-1.5">
          <RotateCcw />
          <span>Reset</span>
        </CreativeButton>
        <CreativeButton variant="accent" className="flex-1 gap-1.5">
          <Download />
          <span>Export</span>
        </CreativeButton>
      </div>
    </div>
  )
}
