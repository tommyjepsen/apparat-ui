import React from "react"
import { cn } from "@/lib/utils"

export interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  radius?: number
  className?: string
  dotClassName?: string
}

export const DotPattern: React.FC<DotPatternProps> = ({
  size = 16,
  radius = 1,
  className,
  dotClassName,
  ...props
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full select-none overflow-hidden",
        className
      )}
      {...props}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="dot-pattern"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className={cn("fill-border/70 dark:fill-border/60", dotClassName)}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  )
}
