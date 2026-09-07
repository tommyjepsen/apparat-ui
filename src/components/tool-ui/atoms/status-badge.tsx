import React from "react"
import { cn } from "@/lib/utils"
import { StatusDot, type StatusDotVariant } from "./status-dot"

export type StatusVariant = StatusDotVariant

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: StatusVariant
  pulse?: boolean
  label?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = "online",
  pulse = true,
  label,
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<StatusVariant, { text: string; bg: string }> = {
    online: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "border-emerald-500/20 bg-emerald-500/10",
    },
    rendering: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "border-amber-500/20 bg-amber-500/10",
    },
    draft: {
      text: "text-muted-foreground",
      bg: "border-border bg-secondary/40",
    },
    error: {
      text: "text-rose-600 dark:text-rose-400",
      bg: "border-rose-500/20 bg-rose-500/10",
    },
    accent: {
      text: "text-accent",
      bg: "border-accent/20 bg-accent/10",
    },
  }

  const current = variantStyles[status] || variantStyles.online

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider select-none",
        current.bg,
        current.text,
        className
      )}
      {...props}
    >
      <StatusDot status={status} pulse={pulse} size="default" />
      <span>{label || children || status}</span>
    </div>
  )
}
