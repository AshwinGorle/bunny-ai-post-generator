import React from "react"
import cn from "@/app/lib/cn.js"

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 [mask-image:radial-gradient(circle, white, transparent)]", // radial gradient for softer edge fade
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.03
        const animationDelay = `${i * 0.06}s`
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid"
        const borderOpacity = 5 + i * 5

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-orange-300 shadow-lg border [--i:${i}]`}
            // className={`absolute animate-ripple rounded-full bg-white/10 shadow-lg border [--i:${i}]`} // lighter background

            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)", // shadow for smooth edges
              backdropFilter: "blur(5px)" // subtle blur to soften any sharp lines
            }}
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"

export default Ripple
