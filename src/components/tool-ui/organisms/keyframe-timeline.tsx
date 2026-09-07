import React, { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Plus } from "lucide-react"
import { CreativeButton } from "../atoms/creative-button"
import { cn } from "@/lib/utils"

export interface TimelineTrack {
  id: string
  name: string
  keyframes: number[] // frame numbers (e.g. 0, 30, 60, 90)
}

export const KeyframeTimeline: React.FC<{ className?: string }> = ({ className }) => {
  const [currentFrame, setCurrentFrame] = useState(24)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    { id: "1", name: "Transform: X / Y", keyframes: [0, 24, 60] },
    { id: "2", name: "Opacity: Alpha", keyframes: [0, 48] },
    { id: "3", name: "Rotation: Angle", keyframes: [12, 36, 72] },
  ])

  const totalFrames = 80

  const handleToggleKeyframe = (trackId: string, frame: number) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id !== trackId) return t
        const exists = t.keyframes.includes(frame)
        return {
          ...t,
          keyframes: exists
            ? t.keyframes.filter((k) => k !== frame)
            : [...t.keyframes, frame].sort((a, b) => a - b),
        }
      })
    )
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-border bg-card p-3 select-none",
        className
      )}
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-border pb-2 px-1">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          <span className="font-semibold text-foreground">Timeline</span>
          <span className="text-border">|</span>
          <span className="tabular-nums text-accent">00:00:{currentFrame.toString().padStart(2, "0")}</span>
          <span>({currentFrame}f)</span>
        </div>

        {/* Player Transport Controls */}
        <div className="flex items-center gap-1">
          <CreativeButton
            size="icon"
            variant="ghost"
            onClick={() => setCurrentFrame(0)}
            className="h-6 w-6"
            title="Start"
          >
            <SkipBack />
          </CreativeButton>
          <CreativeButton
            size="icon"
            variant="default"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-6 w-6"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause /> : <Play />}
          </CreativeButton>
          <CreativeButton
            size="icon"
            variant="ghost"
            onClick={() => setCurrentFrame(totalFrames)}
            className="h-6 w-6"
            title="End"
          >
            <SkipForward />
          </CreativeButton>
        </div>
      </div>

      {/* Track Grid */}
      <div className="flex flex-col gap-1.5 pt-1">
        {tracks.map((track) => (
          <div key={track.id} className="flex items-center gap-3">
            {/* Track Name */}
            <div className="w-28 truncate font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
              {track.name}
            </div>

            {/* Timeline Ruler & Track Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
                setCurrentFrame(Math.round(ratio * totalFrames))
              }}
              className="relative flex h-6 flex-1 cursor-pointer items-center rounded-lg border border-border/70 bg-secondary/30 px-2"
            >
              {/* Scrub Playhead indicator line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-accent z-20 pointer-events-none"
                style={{ left: `${(currentFrame / totalFrames) * 100}%` }}
              >
                <div className="h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
              </div>

              {/* Diamonds Keyframe Markers */}
              {track.keyframes.map((kf) => (
                <button
                  key={kf}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentFrame(kf)
                  }}
                  className="absolute z-10 -translate-x-1/2 cursor-pointer transition-transform hover:scale-125"
                  style={{ left: `${(kf / totalFrames) * 100}%` }}
                  title={`Keyframe at frame ${kf}`}
                >
                  <div className="h-2 w-2 rotate-45 border border-accent bg-background" />
                </button>
              ))}
            </div>

            {/* Add Keyframe on current position */}
            <button
              type="button"
              onClick={() => handleToggleKeyframe(track.id, currentFrame)}
              className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Add keyframe at playhead"
            >
              <Plus />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
