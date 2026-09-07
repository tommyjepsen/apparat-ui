import React from "react"
import { cn } from "@/lib/utils"

export interface CreativeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "accent" | "outline" | "ghost"
  size?: "sm" | "default" | "icon"
  children: React.ReactNode
}

export const CreativeButton = React.forwardRef<
  HTMLButtonElement,
  CreativeButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex select-none items-center justify-center font-mono text-[8px] uppercase tracking-wider transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default:
        "rounded-xl border border-border bg-secondary/40 text-foreground hover:border-foreground/20 hover:bg-secondary/70 active:border-foreground/25",
      secondary:
        "rounded-xl border border-border bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
      accent:
        "rounded-xl border border-accent bg-accent text-accent-foreground shadow-sm hover:opacity-90 active:opacity-100",
      outline:
        "rounded-xl border border-border bg-transparent text-foreground hover:border-foreground/20 hover:bg-secondary/40",
      ghost:
        "rounded-xl border border-transparent bg-transparent text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
    }

    const sizes = {
      default: "h-8 px-3.5",
      sm: "h-7 px-2.5",
      icon: "h-8 w-8 p-0",
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CreativeButton.displayName = "CreativeButton"
