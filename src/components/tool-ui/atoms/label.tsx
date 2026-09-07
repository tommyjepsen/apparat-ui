import React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "font-mono text-[8px] uppercase tracking-wider text-muted-foreground select-none leading-none",
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)

Label.displayName = "Label"
