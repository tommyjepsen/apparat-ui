import React, { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"
import { Play, Pause } from "lucide-react"

export interface CreativeAudioWaveformProps {
  label?: string
  progress?: number // 0 to 100
  onChange?: (progress: number) => void
  className?: string
}

export const CreativeAudioWaveform: React.FC<CreativeAudioWaveformProps> = ({
  label = "Waveform",
  progress: initialProgress = 35,
  onChange,
  className,
}) => {
  const [progress, setProgress] = useState(initialProgress)
  const [isPlaying, setIsPlaying] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Waveform peak sample bars (mirror style)
  const peaks = [
    15, 25, 40, 65, 80, 50, 30, 45, 75, 95, 85, 60, 40, 55, 70, 90, 100, 75,
    50, 35, 60, 80, 70, 45, 30, 20, 35, 55, 40, 25, 15, 10,
  ]

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const update = (clientX: number) => {
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      const val = Math.round(ratio * 100)
      setProgress(val)
      onChange?.(val)
    }
    update(e.clientX)

    const handleMove = (moveEvent: PointerEvent) => {
      update(moveEvent.clientX)
    }

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
  }

  const handleNumberScrub = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startProgress = progress

    const handleMove = (moveEvent: PointerEvent) => {
      const delta = Math.round((moveEvent.clientX - startX) * 0.5)
      const next = Math.max(0, Math.min(100, startProgress + delta))
      setProgress(next)
      onChange?.(next)
    }

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
  }

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10",
        className
      )}
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-4 w-4 items-center justify-center rounded-sm bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5 ml-0.5" />}
        </button>
        <Label className="truncate text-muted-foreground">{label}</Label>
      </div>

      {/* Scrubbable Waveform Visualizer */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        className="relative mx-3 flex h-4 flex-1 cursor-pointer items-center justify-between gap-[1px] rounded-md px-1 overflow-hidden"
      >
        {peaks.map((height, i) => {
          const barPercent = (i / peaks.length) * 100
          const isPassed = barPercent <= progress
          return (
            <div
              key={i}
              className={cn(
                "w-[2px] rounded-full transition-colors",
                isPassed ? "bg-accent shadow-[0_0_4px_rgba(234,88,12,0.6)]" : "bg-muted-foreground/30"
              )}
              style={{ height: `${height}%` }}
            />
          )
        })}

        {/* Playhead Scrubber Pin */}
        <div
          className="absolute top-0 bottom-0 w-[1.5px] bg-foreground shadow-sm pointer-events-none"
          style={{ left: `${progress}%` }}
        />
      </div>

      <span
        onPointerDown={handleNumberScrub}
        className="w-7 text-right font-mono text-[8px] tabular-nums text-foreground shrink-0 cursor-ew-resize rounded px-0.5 py-0.5 transition-colors hover:bg-secondary hover:text-accent active:bg-accent/20"
        title="Drag horizontally to scrub progress"
      >
        {progress}%
      </span>
    </div>
  )
}
