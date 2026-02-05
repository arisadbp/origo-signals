"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
}: ScrollRevealProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getTransform = () => {
    if (!isInView) {
      switch (direction) {
        case "up":
          return "translateY(60px)";
        case "down":
          return "translateY(-60px)";
        case "left":
          return "translateX(60px)";
        case "right":
          return "translateX(-60px)";
        case "scale":
          return "scale(0.8)";
        case "fade":
          return "translateY(0)";
        default:
          return "translateY(60px)";
      }
    }
    return direction === "scale" ? "scale(1)" : "translateY(0) translateX(0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
