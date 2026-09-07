import React, { useState } from "react"
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Folder,
  FolderOpen,
  Square,
  Type,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface LayerItem {
  id: string
  name: string
  type: "frame" | "shape" | "text" | "image"
  visible: boolean
  locked: boolean
  children?: LayerItem[]
}

const INITIAL_LAYERS: LayerItem[] = [
  {
    id: "artboard-1",
    name: "Canvas Viewport",
    type: "frame",
    visible: true,
    locked: false,
    children: [
      { id: "layer-hero", name: "Hero Background", type: "image", visible: true, locked: true },
      { id: "layer-title", name: "Heading Text", type: "text", visible: true, locked: false },
      { id: "layer-card", name: "Preview Card", type: "shape", visible: true, locked: false },
    ],
  },
  {
    id: "artboard-2",
    name: "Overlay Floating Dock",
    type: "frame",
    visible: true,
    locked: false,
    children: [
      { id: "layer-toolbar", name: "Tool Pill", type: "shape", visible: true, locked: false },
    ],
  },
]

export const LayerTree: React.FC<{ className?: string }> = ({ className }) => {
  const [layers, setLayers] = useState<LayerItem[]>(INITIAL_LAYERS)
  const [selectedId, setSelectedId] = useState<string>("layer-title")
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleProp = (id: string, prop: "visible" | "locked", e: React.MouseEvent) => {
    e.stopPropagation()
    const updateRecursive = (items: LayerItem[]): LayerItem[] =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        if (item.children) {
          return { ...item, children: updateRecursive(item.children) }
        }
        return item
      })
    setLayers(updateRecursive(layers))
  }

  const renderIcon = (type: LayerItem["type"], isExpanded: boolean) => {
    switch (type) {
      case "frame":
        return isExpanded ? <FolderOpen /> : <Folder />
      case "text":
        return <Type />
      case "image":
        return <ImageIcon />
      default:
        return <Square />
    }
  }

  const renderNode = (item: LayerItem, depth = 0) => {
    const isSelected = selectedId === item.id
    const isExpanded = !collapsed[item.id]
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className="flex flex-col">
        <div
          onClick={() => setSelectedId(item.id)}
          style={{ paddingLeft: `${depth * 12 + 6}px` }}
          className={cn(
            "group relative flex h-7 select-none items-center justify-between rounded-lg pr-2 font-mono text-[8px] uppercase tracking-wider transition-colors cursor-pointer",
            isSelected
              ? "bg-secondary text-foreground font-semibold"
              : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
            !item.visible && "opacity-40"
          )}
        >
          <div className="flex items-center gap-1.5 truncate">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleCollapse(item.id, e)}
                className="flex h-3.5 w-3.5 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
              </button>
            ) : (
              <span className="w-3.5" />
            )}

            <span className="text-muted-foreground">{renderIcon(item.type, isExpanded)}</span>
            <span className="truncate">{item.name}</span>
          </div>

          {/* Quick Visibility & Lock toggles */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => toggleProp(item.id, "visible", e)}
              className="flex h-4 w-4 items-center justify-center text-muted-foreground hover:text-foreground"
              title={item.visible ? "Hide layer" : "Show layer"}
            >
              {item.visible ? <Eye /> : <EyeOff />}
            </button>
            <button
              type="button"
              onClick={(e) => toggleProp(item.id, "locked", e)}
              className="flex h-4 w-4 items-center justify-center text-muted-foreground hover:text-foreground"
              title={item.locked ? "Unlock layer" : "Lock layer"}
            >
              {item.locked ? <Lock /> : <Unlock />}
            </button>
          </div>
        </div>

        {/* Children if expanded */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col">
            {item.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-[280px] flex-col gap-3 rounded-2xl border border-border bg-card p-3",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border pb-2.5 px-1">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-foreground">
          Layers
        </span>
        <span className="font-mono text-[8px] text-muted-foreground">ORGANISM</span>
      </div>

      <div className="flex flex-col gap-0.5">
        {layers.map((layer) => renderNode(layer))}
      </div>
    </div>
  )
}
