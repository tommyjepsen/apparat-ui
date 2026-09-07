import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface SlidingNumberProps {
  value: number
  unit?: string
  formatValue?: (val: number) => string | number
  className?: string
}

export const SlidingNumber: React.FC<SlidingNumberProps> = ({
  value,
  unit = "",
  formatValue,
  className,
}) => {
  const prevValueRef = useRef<number>(value)
  const [direction, setDirection] = useState<"up" | "down">("down")

  useEffect(() => {
    if (value > prevValueRef.current) {
      // Increasing: new number slides down from above, old slides down & out
      setDirection("down")
    } else if (value < prevValueRef.current) {
      // Decreasing: new number slides up from below, old slides up & out
      setDirection("up")
    }
    prevValueRef.current = value
  }, [value])

  const formattedStr = formatValue ? String(formatValue(value)) : `${value}`
  const characters = formattedStr.split("")

  const variants: Variants = {
    initial: (dir: "up" | "down") => ({
      y: dir === "down" ? "-100%" : "100%",
      opacity: 0,
    }),
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 450, damping: 32 },
        opacity: { duration: 0.12 },
      },
    },
    exit: (dir: "up" | "down") => ({
      y: dir === "down" ? "100%" : "-100%",
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 450, damping: 32 },
        opacity: { duration: 0.12 },
      },
    }),
  }

  return (
    <div
      className={cn(
        "flex items-center font-mono text-[8px] tabular-nums text-foreground transition-colors",
        className
      )}
    >
      {characters.map((char, index) => {
        // If it's not a digit (e.g. decimal, negative sign), render statically
        if (!/\d/.test(char)) {
          return (
            <span key={`char-${index}`} className="inline-block">
              {char}
            </span>
          )
        }

        return (
          <div
            key={`col-${index}`}
            className="relative inline-flex h-4 w-[1ch] items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.span
                key={`${index}-${char}`}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </div>
        )
      })}
      {unit && <span className="ml-0.5">{unit}</span>}
    </div>
  )
}
