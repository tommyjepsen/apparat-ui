import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export type NodeType = "input" | "filter" | "output"

export interface NodePort {
  id: string
  label: string
  connected?: boolean
}

export interface CreativeNodeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  nodeType?: NodeType
  selected?: boolean
  inputs?: (string | NodePort)[]
  outputs?: (string | NodePort)[]
  onPortToggle?: (portId: string, direction: "input" | "output", connected: boolean) => void
}

export const CreativeNodeItem: React.FC<CreativeNodeItemProps> = ({
  title = "Color Ramp",
  nodeType = "filter",
  selected = false,
  inputs: initialInputs = [
    { id: "factor", label: "factor", connected: true },
    { id: "color_in", label: "color in", connected: false },
  ],
  outputs: initialOutputs = [
    { id: "rgba", label: "rgba", connected: true },
    { id: "alpha", label: "alpha", connected: false },
  ],
  onPortToggle,
  className,
  ...props
}) => {
  // Normalize initial ports
  const normalizePorts = (list: (string | NodePort)[]): NodePort[] =>
    list.map((item) =>
      typeof item === "string" ? { id: item, label: item, connected: false } : item
    )

  const [inputPorts, setInputPorts] = useState<NodePort[]>(normalizePorts(initialInputs))
  const [outputPorts, setOutputPorts] = useState<NodePort[]>(normalizePorts(initialOutputs))

  useEffect(() => {
    setInputPorts(normalizePorts(initialInputs))
  }, [initialInputs])

  useEffect(() => {
    setOutputPorts(normalizePorts(initialOutputs))
  }, [initialOutputs])

  const togglePort = (id: string, direction: "input" | "output") => {
    if (direction === "input") {
      setInputPorts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          const nextState = !p.connected
          onPortToggle?.(id, "input", nextState)
          return { ...p, connected: nextState }
        })
      )
    } else {
      setOutputPorts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          const nextState = !p.connected
          onPortToggle?.(id, "output", nextState)
          return { ...p, connected: nextState }
        })
      )
    }
  }

  const typeIndicator =
    nodeType === "input"
      ? "bg-blue-500"
      : nodeType === "filter"
      ? "bg-accent"
      : "bg-emerald-500"

  return (
    <div
      className={cn(
        "relative flex w-44 flex-col rounded-xl border bg-white dark:bg-card/95 p-3.5 select-none transition-all",
        selected
          ? "border-accent ring-1 ring-accent/60"
          : "border-border/80 hover:border-foreground/30",
        className
      )}
      {...props}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-2 mb-3">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground truncate">
          {title}
        </span>
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", typeIndicator)} />
      </div>

      {/* Input / Output Socket Rows */}
      <div className="flex flex-col gap-2.5">
        {/* Render rows pairing inputs and outputs side-by-side */}
        {Array.from({ length: Math.max(inputPorts.length, outputPorts.length) }).map((_, idx) => {
          const inPort = inputPorts[idx]
          const outPort = outputPorts[idx]

          return (
            <div key={idx} className="relative flex h-5 items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-wider">
              {/* Left Input Port + External Hanging Circle Pin */}
              {inPort ? (
                <div
                  onClick={() => togglePort(inPort.id, "input")}
                  className="group/port flex items-center cursor-pointer transition-colors"
                  title={`${inPort.label} (${inPort.connected ? "Connected" : "Click to connect"})`}
                >
                  {/* Hanging Socket Pin over the left border edge */}
                  <div
                    className={cn(
                      "absolute -left-5 top-1/2 -translate-y-1/2 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-background transition-all group-hover/port:scale-125",
                      inPort.connected
                        ? "border-accent bg-accent"
                        : "border-border/80 group-hover/port:border-accent"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full",
                        inPort.connected ? "bg-white" : "bg-muted-foreground/50"
                      )}
                    />
                  </div>

                  {/* Port Label */}
                  <span
                    className={cn(
                      "transition-colors pl-0.5",
                      inPort.connected ? "text-accent font-medium" : "text-muted-foreground group-hover/port:text-foreground"
                    )}
                  >
                    {inPort.label}
                  </span>
                </div>
              ) : (
                <div />
              )}

              {/* Right Output Port + External Hanging Circle Pin */}
              {outPort ? (
                <div
                  onClick={() => togglePort(outPort.id, "output")}
                  className="group/port ml-auto flex items-center cursor-pointer transition-colors"
                  title={`${outPort.label} (${outPort.connected ? "Connected" : "Click to connect"})`}
                >
                  {/* Port Label */}
                  <span
                    className={cn(
                      "transition-colors pr-0.5",
                      outPort.connected ? "text-accent font-medium" : "text-muted-foreground group-hover/port:text-foreground"
                    )}
                  >
                    {outPort.label}
                  </span>

                  {/* Hanging Socket Pin over the right border edge */}
                  <div
                    className={cn(
                      "absolute -right-5 top-1/2 -translate-y-1/2 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-background transition-all group-hover/port:scale-125",
                      outPort.connected
                        ? "border-accent bg-accent"
                        : "border-border/80 group-hover/port:border-accent"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full",
                        outPort.connected ? "bg-white" : "bg-muted-foreground/50"
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
