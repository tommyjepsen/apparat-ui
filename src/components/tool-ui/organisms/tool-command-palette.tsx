import React, { useState, useEffect } from "react"
import { Search, Sparkles, Layers, Play, Download, Copy, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CommandAction {
  id: string
  title: string
  shortcut?: string
  category: "Actions" | "Navigation" | "Theme"
  icon: React.ReactNode
  perform?: () => void
}

export const ToolCommandPalette: React.FC<{
  onClose?: () => void
  onToggleTheme?: () => void
  autoFocus?: boolean
}> = ({ onClose, onToggleTheme, autoFocus = false }) => {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const actions: CommandAction[] = [
    { id: "export", title: "Export Canvas Artwork", shortcut: "⌘E", category: "Actions", icon: <Download /> },
    { id: "render", title: "Render Spring Dynamics", shortcut: "⌘R", category: "Actions", icon: <Sparkles /> },
    { id: "duplicate", title: "Duplicate Selected Layer", shortcut: "⌘D", category: "Actions", icon: <Copy /> },
    { id: "layers", title: "Toggle Layer Hierarchy", shortcut: "⌥L", category: "Navigation", icon: <Layers /> },
    { id: "motion", title: "Open Motion Customizer", shortcut: "⌥M", category: "Navigation", icon: <Play /> },
    { id: "theme", title: "Toggle Dark / Light Theme", shortcut: "⌘T", category: "Theme", icon: <Moon />, perform: onToggleTheme },
  ]

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-md">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands, actions, or tools..."
          className="flex-1 bg-transparent font-mono text-[10px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          autoFocus={autoFocus}
        />
        <kbd className="rounded-md border border-border/80 bg-secondary/50 px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground">
          ESC
        </kbd>
      </div>

      {/* Action Results List */}
      <div className="max-h-56 overflow-y-auto p-1.5 font-mono text-[8px] uppercase tracking-wider">
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            No matching actions found
          </div>
        ) : (
          filtered.map((action, idx) => {
            const isSelected = idx === selectedIndex
            return (
              <div
                key={action.id}
                onClick={() => {
                  action.perform?.()
                  onClose?.()
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={cn(
                  "flex h-8 cursor-pointer items-center justify-between rounded-lg px-2.5 transition-colors",
                  isSelected
                    ? "bg-secondary text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn(isSelected ? "text-accent" : "text-muted-foreground")}>
                    {action.icon}
                  </span>
                  <span>{action.title}</span>
                </div>

                {action.shortcut && (
                  <kbd className="rounded border border-border/70 bg-background/60 px-1.5 py-0.5 text-[8px] text-muted-foreground">
                    {action.shortcut}
                  </kbd>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Footer Hotkey Info */}
      <div className="flex items-center justify-between border-t border-border bg-secondary/20 px-3 py-1.5 font-mono text-[8px] text-muted-foreground">
        <span>Press ↵ to select</span>
        <span>⌘K to toggle</span>
      </div>
    </div>
  )
}
