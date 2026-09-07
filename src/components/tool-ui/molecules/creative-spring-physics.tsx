import React, { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Label } from "../atoms/label"
import { Play, RotateCcw } from "lucide-react"

export interface CreativeSpringPhysicsProps {
  label?: string
  stiffness?: number // 50 to 500
  damping?: number // 5 to 60
  mass?: number // 0.1 to 5
  className?: string
}

export const CreativeSpringPhysics: React.FC<CreativeSpringPhysicsProps> = ({
  label = "Spring",
  stiffness: initialStiffness = 180,
  damping: initialDamping = 20,
  mass = 1,
  className,
}) => {
  const stiffness = initialStiffness
  const damping = initialDamping
  const [animating, setAnimating] = useState(false)
  const [ballPos, setBallPos] = useState(0) // 0 to 1
  const animRef = useRef<number | null>(null)

  const triggerAnimation = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setAnimating(true)

    let pos = 0
    let velocity = 0
    const target = 1
    let lastTime = performance.now()

    const step = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.032)
      lastTime = time

      // Spring formula: F = -k * (x - target) - c * v
      const springForce = -stiffness * (pos - target)
      const dampingForce = -damping * velocity
      const acceleration = (springForce + dampingForce) / mass

      velocity += acceleration * dt
      pos += velocity * dt

      setBallPos(Math.max(0, Math.min(pos, 1.4)))

      // Stop condition
      if (Math.abs(velocity) < 0.005 && Math.abs(pos - target) < 0.005) {
        setBallPos(1)
        setAnimating(false)
        return
      }

      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
  }, [stiffness, damping, mass])

  const reset = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setBallPos(0)
    setAnimating(false)
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div
      className={cn(
        "group relative flex h-8 w-full select-none items-center justify-between overflow-hidden rounded-xl border border-border bg-secondary/40 px-2 transition-colors hover:border-foreground/10",
        className
      )}
    >
      <Label className="truncate text-muted-foreground">{label}</Label>

      {/* Spring Track & Bouncing Ball */}
      <div className="relative mx-3 flex h-3 flex-1 items-center rounded-md border border-border/70 bg-background/50 px-1">
        {/* Destination Target Line */}
        <div className="absolute right-2 h-full w-[1.5px] bg-accent/40" />

        {/* Dynamic Spring Line */}
        <div
          className="h-[1px] bg-accent/30"
          style={{ width: `${Math.min(ballPos * 85, 90)}%` }}
        />

        {/* Live Bouncing Puck */}
        <div
          className="absolute h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_rgba(234,88,12,0.8)] transition-transform"
          style={{
            left: `${Math.min(ballPos * 85 + 5, 95)}%`,
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 font-mono text-[8px] text-muted-foreground">
        <button
          type="button"
          onClick={animating ? reset : triggerAnimation}
          className="flex h-5 w-5 items-center justify-center rounded-md border border-border/80 bg-secondary/60 text-foreground transition-colors hover:bg-secondary active:scale-95"
          title={animating ? "Reset" : "Test Spring"}
        >
          {animating ? <RotateCcw className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
        </button>
      </div>
    </div>
  )
}
