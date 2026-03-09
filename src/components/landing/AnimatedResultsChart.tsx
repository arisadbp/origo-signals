"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedResultsChartProps {
  isInView: boolean;
  totalSales: string;
  variant: "mobile" | "desktop";
}

const POINTS_DESKTOP = [
  { x: 80, y: 210 },
  { x: 230, y: 145 },
  { x: 370, y: 115 },
  { x: 490, y: 60 },
];

const POINTS_MOBILE = [
  { x: 20, y: 120 },
  { x: 95, y: 85 },
  { x: 185, y: 65 },
  { x: 285, y: 30 },
];

const LABELS_DESKTOP = [
  { x: 70, y: 234, text: "Month 1" },
  { x: 210, y: 234, text: "Month 2" },
  { x: 340, y: 234, text: "Month 3" },
  { x: 450, y: 234, text: "Month 4" },
];

const LABELS_MOBILE = [
  { x: 12, y: 136, text: "M1" },
  { x: 86, y: 136, text: "M2" },
  { x: 176, y: 136, text: "M3" },
  { x: 270, y: 136, text: "M4" },
];

const Y_LABELS = [
  { x: 22, y: 18, text: "200%" },
  { x: 26, y: 70, text: "100%" },
  { x: 30, y: 120, text: "50%" },
  { x: 30, y: 170, text: "25%" },
  { x: 34, y: 228, text: "0%" },
];

function pointsToPath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
}

function getPathLength(points: { x: number; y: number }[]) {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

export default function AnimatedResultsChart({
  isInView,
  totalSales,
  variant,
}: AnimatedResultsChartProps) {
  const isMobile = variant === "mobile";
  const points = isMobile ? POINTS_MOBILE : POINTS_DESKTOP;
  const labels = isMobile ? LABELS_MOBILE : LABELS_DESKTOP;
  const pathD = pointsToPath(points);
  const pathLength = getPathLength(points);

  const [phase, setPhase] = useState<"idle" | "grid" | "line" | "dots" | "labels" | "done">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!isInView) return;
    // Clear previous timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];

    // Phase sequence
    setPhase("grid");
    timerRef.current.push(setTimeout(() => setPhase("line"), 400));
    timerRef.current.push(setTimeout(() => setPhase("dots"), 1800));
    timerRef.current.push(setTimeout(() => setPhase("labels"), 2400));
    timerRef.current.push(setTimeout(() => setPhase("done"), 3000));

    return () => timerRef.current.forEach(clearTimeout);
  }, [isInView]);

  const showGrid = phase !== "idle";
  const showLine = phase !== "idle" && phase !== "grid";
  const showDots = ["dots", "labels", "done"].includes(phase);
  const showLabels = ["labels", "done"].includes(phase);

  const gradientId = isMobile ? "lineGlowMobile" : "lineGlow";
  const viewBox = isMobile ? "0 0 320 140" : "0 0 720 240";
  const svgClass = isMobile ? "h-36 w-full" : "h-60 w-full";
  const dotRadius = isMobile ? 3.5 : 4.5;

  return (
    <div className="relative">
      <svg
        viewBox={viewBox}
        className={svgClass}
        role="img"
        aria-label="ยอดขายเติบโต 4 เดือน"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFBF5A" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Y-axis labels (desktop only) */}
        {!isMobile && (
          <g
            fill="rgba(255,255,255,0.55)"
            fontSize="12"
            style={{
              opacity: showGrid ? 1 : 0,
              transition: "opacity 0.6s ease-out",
            }}
          >
            {Y_LABELS.map((l) => (
              <text key={l.text} x={l.x} y={l.y}>{l.text}</text>
            ))}
          </g>
        )}

        {/* X-axis labels */}
        <g
          fill="rgba(255,255,255,0.6)"
          fontSize={isMobile ? "10" : "12"}
          style={{
            opacity: showGrid ? 1 : 0,
            transition: "opacity 0.6s ease-out",
          }}
        >
          {labels.map((l) => (
            <text key={l.text} x={l.x} y={l.y}>{l.text}</text>
          ))}
        </g>

        {/* Animated line */}
        <path
          d={pathD}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: showLine ? 0 : pathLength,
            transition: showLine ? "stroke-dashoffset 1.4s ease-in-out" : "none",
          }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={`dot-${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={dotRadius}
            fill="#FFBF5A"
            style={{
              opacity: showDots ? 1 : 0,
              transform: showDots ? "scale(1)" : "scale(0)",
              transformOrigin: `${point.x}px ${point.y}px`,
              transition: `opacity 0.35s ease-out ${i * 0.12}s, transform 0.35s ease-out ${i * 0.12}s`,
            }}
          />
        ))}
      </svg>

      {/* Sales counter overlay */}
      <div
        className={
          isMobile
            ? "pointer-events-none absolute right-2 top-2 text-right"
            : "pointer-events-none absolute right-6 top-14 text-right sm:right-10"
        }
        style={{
          opacity: showLabels ? 1 : 0,
          transform: showLabels ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {isMobile ? (
          <>
            <p className="text-xs text-white/70">ยอดขายรวมมากกว่า</p>
            <div className="-mt-1 text-2xl font-semibold text-[var(--luxury-accent)] data-counter">
              {totalSales}+
            </div>
            <p className="-mt-1 text-base text-white/90">ล้านบาท</p>
          </>
        ) : (
          <>
            <p className="text-xl text-white/60 sm:text-2xl">ยอดขายรวมมากกว่า</p>
            <div className="-mt-4 text-[3rem] font-semibold text-[var(--luxury-accent)] sm:text-[3.6rem] data-counter">
              {totalSales}+
            </div>
            <p className="-mt-4 text-3xl text-white/95 sm:text-4xl">ล้านบาท</p>
          </>
        )}
      </div>
    </div>
  );
}
