import React from "react"
import { cn } from "@/lib/utils"

export type StatusDotVariant = "online" | "rendering" | "draft" | "error" | "accent"

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusDotVariant
  pulse?: boolean
  size?: "sm" | "default" | "lg"
}

const DOT_COLORS: Record<StatusDotVariant, string> = {
  online: "bg-emerald-500",
  rendering: "bg-amber-500",
  draft: "bg-muted-foreground",
  error: "bg-rose-500",
  accent: "bg-accent",
}

const SIZE_CLASSES = {
  sm: "h-1 w-1",
  default: "h-1.5 w-1.5",
  lg: "h-2 w-2",
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status = "online",
  pulse = true,
  size = "default",
  className,
  ...props
}) => {
  const dotColor = DOT_COLORS[status] || DOT_COLORS.online
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.default

  return (
    <span
      className={cn("relative inline-flex items-center justify-center shrink-0", sizeClass, className)}
      {...props}
    >
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            dotColor
          )}
        />
      )}
      <span className={cn("relative inline-flex h-full w-full rounded-full", dotColor)} />
    </span>
  )
}
