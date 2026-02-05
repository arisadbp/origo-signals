"use client";

import { ReactNode } from "react";

interface FloatingCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  delay?: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

export function FloatingCard({
  icon,
  value,
  label,
  delay = 0,
  position,
}: FloatingCardProps) {
  return (
    <div
      className="absolute glass-card p-4 rounded-xl shadow-glow hover:scale-110 transition-smooth animate-float group cursor-pointer"
      style={{
        ...position,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFB347] to-[#FFA500] p-0.5 group-hover:rotate-6 transition-smooth">
          <div className="w-full h-full bg-[#0a0a0a] rounded-lg flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div>
          <div className="font-mono text-xl font-bold gradient-text-premium neon-glow data-counter">
            {value}
          </div>
          <div className="text-white/60 text-xs font-body">
            {label}
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFB347]/0 to-[#FFA500]/0 group-hover:from-[#FFB347]/10 group-hover:to-[#FFA500]/10 transition-smooth pointer-events-none"></div>
    </div>
  );
}
