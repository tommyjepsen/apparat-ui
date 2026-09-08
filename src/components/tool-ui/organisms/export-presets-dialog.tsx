import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { CreativeButton } from "../atoms/creative-button"
import { CreativeSelect } from "../molecules/creative-select"
import { CreativeToggle } from "../molecules/creative-toggle"
import { CreativeSegmentedControl } from "../molecules/creative-segmented-control"
import { Download, Sparkles, Check } from "lucide-react"

export interface ExportPreset {
  id: string
  format: "png" | "svg" | "webp" | "pdf"
  scale: string
  colorSpace: string
}

export const ExportPresetsDialog: React.FC<{ className?: string }> = ({ className }) => {
  const [scale, setScale] = useState<string>("2x")
  const [format, setFormat] = useState<string>("png")
  const [colorSpace, setColorSpace] = useState<string>("display-p3")
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [trimTransparent, setTrimTransparent] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [done, setDone] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    }, 800)
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-md select-none",
        className
      )}
    >
      {/* Dialog Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Download className="h-3.5 w-3.5 text-accent" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
            Export Artwork
          </span>
        </div>
        <span className="font-mono text-[8px] text-muted-foreground">ORGANISM</span>
      </div>

      {/* Settings Body */}
      <div className="flex flex-col gap-3.5 p-4">
        {/* Scale Multiplier */}
        <div className="space-y-1.5">
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            Resolution Multiplier
          </span>
          <CreativeSegmentedControl
            layoutId="export-dialog-scale"
            value={scale}
            onChange={setScale}
            options={[
              { value: "1x", label: "1x" },
              { value: "2x", label: "2x (Retina)" },
              { value: "3x", label: "3x" },
            ]}
          />
        </div>

        {/* Format Selector */}
        <div className="space-y-1.5">
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            File Format
          </span>
          <CreativeSegmentedControl
            layoutId="export-dialog-format"
            value={format}
            onChange={setFormat}
            options={[
              { value: "png", label: "PNG" },
              { value: "svg", label: "SVG" },
              { value: "webp", label: "WebP" },
              { value: "pdf", label: "PDF" },
            ]}
          />
        </div>

        {/* Color Space */}
        <div className="space-y-1.5">
          <CreativeSelect
            label="Color Space"
            value={colorSpace}
            onChange={setColorSpace}
            options={[
              { value: "srgb", label: "sRGB IEC61966" },
              { value: "display-p3", label: "Display P3 Wide" },
              { value: "adobe-rgb", label: "Adobe RGB (1998)" },
            ]}
          />
        </div>

        {/* Flags */}
        <div className="space-y-2 border-t border-border/70 pt-2.5">
          <CreativeToggle
            label="Embed Color Profile"
            checked={includeMetadata}
            onChange={setIncludeMetadata}
          />
          <CreativeToggle
            label="Trim Transparent Pixels"
            checked={trimTransparent}
            onChange={setTrimTransparent}
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between border-t border-border bg-secondary/20 p-3">
        <span className="font-mono text-[8px] text-muted-foreground">
          Est: ~1.4 MB
        </span>

        <CreativeButton
          variant="accent"
          onClick={handleExport}
          className="gap-1.5"
        >
          {done ? (
            <>
              <Check className="h-3 w-3" />
              <span>Exported</span>
            </>
          ) : isExporting ? (
            <>
              <Sparkles className="h-3 w-3 animate-spin" />
              <span>Rendering...</span>
            </>
          ) : (
            <>
              <Download className="h-3 w-3" />
              <span>Export {format.toUpperCase()}</span>
            </>
          )}
        </CreativeButton>
      </div>
    </div>
  )
}
