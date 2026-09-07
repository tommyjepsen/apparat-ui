import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Activity, Plus } from "lucide-react"
import {
  CreativeNodeItem,
  type NodeType,
  type NodePort,
} from "../molecules/creative-node-item"

export interface GraphNodeData {
  id: string
  title: string
  type: NodeType
  x: number
  y: number
  inputs: NodePort[]
  outputs: NodePort[]
}

const INITIAL_NODE: GraphNodeData = {
  id: "node-color-ramp",
  title: "Color Ramp",
  type: "filter",
  x: 0,
  y: 0,
  inputs: [
    { id: "factor", label: "factor", connected: true },
    { id: "color_in", label: "color in", connected: false },
  ],
  outputs: [
    { id: "rgba", label: "rgba", connected: true },
    { id: "alpha", label: "alpha", connected: false },
  ],
}

export const ShaderNodeGraph: React.FC<{ className?: string }> = ({ className }) => {
  const [node, setNode] = useState<GraphNodeData>(INITIAL_NODE)
  const [selected, setSelected] = useState<boolean>(true)

  const handleTogglePort = (portId: string, direction: "input" | "output", connected: boolean) => {
    const key = direction === "input" ? "inputs" : "outputs"
    setNode((prev) => ({
      ...prev,
      [key]: prev[key].map((p) => (p.id === portId ? { ...p, connected } : p)),
    }))
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card select-none",
        className
      )}
    >
      {/* Graph Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-3.5 py-2">
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-muted-foreground" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
            Shader Node Graph
          </span>
          <span className="font-mono text-[8px] text-muted-foreground">ORGANISM</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex items-center gap-1 rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-foreground hover:bg-secondary active:scale-95"
          >
            <Plus className="h-2.5 w-2.5" />
            <span>Add Node</span>
          </button>
        </div>
      </div>

      {/* Node Canvas Workspace */}
      <div className="relative flex h-60 w-full items-center justify-center overflow-hidden bg-muted/20 p-6">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Hanging Edge Leads */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
          {/* Incoming cable to left input socket */}
          <line
            x1="0"
            y1="50%"
            x2="calc(50% - 88px)"
            y2="50%"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="text-muted-foreground/40"
          />
          {/* Outgoing cable from right output socket */}
          <line
            x1="calc(50% + 88px)"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="text-muted-foreground/40"
          />
        </svg>

        {/* Composed Single Node */}
        <div
          onClick={() => setSelected((prev) => !prev)}
          className="relative z-20 cursor-pointer"
        >
          <CreativeNodeItem
            title={node.title}
            nodeType={node.type}
            selected={selected}
            inputs={node.inputs}
            outputs={node.outputs}
            onPortToggle={(portId, dir, connected) =>
              handleTogglePort(portId, dir, connected)
            }
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-border bg-secondary/20 px-3 py-1.5 font-mono text-[8px] text-muted-foreground">
        <span>Active Node: {node.title}</span>
        <span className="text-accent">Realtime Shading Active</span>
      </div>
    </div>
  )
}
