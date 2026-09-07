import React from "react"
import { cn } from "@/lib/utils"

export interface MicroKbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[]
}

export const MicroKbd: React.FC<MicroKbdProps> = ({
  keys,
  children,
  className,
  ...props
}) => {
  const renderList = keys || (typeof children === "string" ? [children] : [])

  return (
    <span className={cn("inline-flex items-center gap-1 select-none", className)} {...props}>
      {renderList.length > 0
        ? renderList.map((k, i) => (
            <kbd
              key={i}
              className="inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded border border-border/80 bg-secondary/50 px-1 font-mono text-[9px] font-medium uppercase tracking-tight text-muted-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.15)]"
            >
              {k}
            </kbd>
          ))
        : children}
    </span>
  )
}
