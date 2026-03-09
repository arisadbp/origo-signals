"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

interface Stage {
  scale: number;
  origin: number;
  dest: number;
  cust: number;
  dotIndices: number[];
  delay: number;
}

const STAGES: Stage[] = [
  { scale: 0.15, origin: 10, dest: 4, cust: 42, dotIndices: [0, 1], delay: 450 },
  { scale: 0.30, origin: 18, dest: 9, cust: 115, dotIndices: [2], delay: 450 },
  { scale: 0.40, origin: 22, dest: 14, cust: 160, dotIndices: [3], delay: 450 },
  { scale: 0.75, origin: 34, dest: 21, cust: 235, dotIndices: [4, 5], delay: 550 },
  { scale: 1, origin: 41, dest: 26, cust: 274, dotIndices: [6], delay: 450 },
];

const DATA_POINTS = [
  { x: 120, y: 280 },
  { x: 272, y: 210 },
  { x: 348, y: 190 },
  { x: 766, y: 110 },
  { x: 880, y: 60 },
];

const MAP_DOTS = [
  { top: "35%", left: "20%", delay: 0 },
  { top: "40%", left: "75%", delay: 0.3 },
  { top: "65%", left: "32%", delay: 0.1 },
  { top: "45%", left: "68%", delay: 0.5 },
  { top: "28%", left: "52%", delay: 0.2 },
  { top: "22%", left: "70%", delay: 0.4 },
  { top: "50%", left: "20%", delay: 0.1 },
];

const MAP_REGIONS = [
  // Americas
  [
    { top: "20%", left: "10%", w: "20%", h: "30%" },
    { top: "25%", left: "68%", w: "18%", h: "25%" },
  ],
  // Africa/South
  [
    { top: "55%", left: "25%", w: "15%", h: "30%" },
    { top: "40%", left: "65%", w: "15%", h: "25%" },
  ],
  // Asia
  [
    { top: "15%", left: "45%", w: "15%", h: "25%" },
    { top: "10%", left: "60%", w: "30%", h: "25%" },
  ],
];

function useAnimatedValue(target: number, duration = 350) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = value;
    const range = target - start;
    if (!range) return;
    let startTime: number | null = null;

    function step(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(start + progress * range));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

export default function GlobalMarketDashboard() {
  const [containerRef, isInView] = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [stageIndex, setStageIndex] = useState(-1);
  const [visibleDots, setVisibleDots] = useState<Set<number>>(new Set());
  const [visiblePoints, setVisiblePoints] = useState<Set<number>>(new Set());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentStage = stageIndex >= 0 ? STAGES[stageIndex] : null;
  const originVal = useAnimatedValue(currentStage?.origin ?? 0);
  const destVal = useAnimatedValue(currentStage?.dest ?? 0);
  const custVal = useAnimatedValue(currentStage?.cust ?? 0);
  const sweepScale = currentStage?.scale ?? 0;

  const playTimeline = useCallback(async () => {
    // Clear
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleDots(new Set());
    setVisiblePoints(new Set());
    setStageIndex(-1);

    let elapsed = 400;
    for (let i = 0; i < STAGES.length; i++) {
      const stage = STAGES[i];
      const idx = i;
      timersRef.current.push(
        setTimeout(() => {
          setStageIndex(idx);
          setTimeout(() => {
            setVisiblePoints((prev) => new Set([...prev, idx]));
            setVisibleDots((prev) => {
              const next = new Set(prev);
              stage.dotIndices.forEach((d) => next.add(d));
              return next;
            });
          }, 150);
        }, elapsed)
      );
      elapsed += stage.delay;
    }

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (isInView) playTimeline();
  }, [isInView, playTimeline]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border border-white/[0.06] bg-[#1a1a1a] p-5 md:p-6 flex flex-col overflow-hidden"
      style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease-out, transform 0.6s ease-out" }}
    >
      {/* Header */}
      <div className="text-center z-10 mb-4">
        <h3 className="text-xl md:text-2xl font-bold tracking-wide">
          <span>Global </span>
          <span className="text-[var(--luxury-accent)]">YOUR</span>
        </h3>
        <p className="text-xs text-white/50 mt-0.5">product to International Market</p>
      </div>

      {/* World Maps */}
      <div className="flex justify-between items-center w-full px-1 mb-3 z-10">
        {MAP_REGIONS.map((regions, mapIdx) => (
          <div key={mapIdx} className="w-[31%] aspect-[2/1] relative">
            <div
              className="absolute inset-0 bg-white/20"
              style={{
                maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                maskSize: "contain", WebkitMaskSize: "contain",
                maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
                maskPosition: "center", WebkitMaskPosition: "center",
              }}
            >
              {regions.map((r, rIdx) => (
                <div
                  key={rIdx}
                  className="absolute bg-[var(--luxury-accent)] blur-md"
                  style={{ top: r.top, left: r.left, width: r.w, height: r.h, opacity: 0.8 }}
                />
              ))}
            </div>
            {/* Pulsing dots for this map region */}
            {MAP_DOTS.filter((_, dIdx) => {
              // Distribute dots across maps
              if (mapIdx === 0) return dIdx < 2;
              if (mapIdx === 1) return dIdx >= 2 && dIdx < 4;
              return dIdx >= 4;
            }).map((dot, i) => {
              const globalIdx = mapIdx === 0 ? i : mapIdx === 1 ? i + 2 : i + 4;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: dot.top, left: dot.left,
                    opacity: visibleDots.has(globalIdx) ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <div
                    className="w-[3px] h-[3px] bg-[var(--luxury-accent)] rounded-full"
                    style={{
                      animation: visibleDots.has(globalIdx) ? `pulseGlowMap 2s infinite alternate` : "none",
                      animationDelay: `${dot.delay}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative flex-grow w-full min-h-[140px] md:min-h-[180px]">
        <div className="absolute top-0 left-1 z-20 pointer-events-none">
          <h4 className="text-base md:text-lg font-bold leading-tight">
            Market<br />
            <span className="text-[var(--luxury-accent)] font-normal">Insight</span>
          </h4>
        </div>
        <div className="w-full h-full absolute inset-0 pt-5 pb-1">
          <svg viewBox="0 0 1000 380" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            <defs>
              <clipPath id="sweepRevealDash">
                <rect
                  x="0" y="-50" width="1100" height="450"
                  style={{
                    transform: `scaleX(${sweepScale})`,
                    transformOrigin: "left",
                    transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                />
              </clipPath>
              <path
                id="coreLineDash"
                d="M 120 280 C 180 265, 220 230, 272 210 C 300 200, 310 190, 348 190 C 380 190, 480 240, 550 240 C 620 240, 700 110, 766 110 C 810 110, 840 60, 880 60 C 920 60, 960 40, 1000 40"
                fill="none"
              />
            </defs>

            {/* Axis */}
            <g opacity={0.9}>
              <line x1="100" y1="340" x2="980" y2="340" stroke="#4b5563" strokeWidth="1.5" />
              <text x="75" y="344" fill="var(--luxury-accent-hex, #f59e0b)" fontSize="14" fontWeight="bold" textAnchor="end">MTS</text>
              {[
                { x: 120, label: "1 M" },
                { x: 272, label: "1.4 M" },
                { x: 348, label: "1.6 M" },
                { x: 766, label: "2.7 M" },
                { x: 880, label: "3 M" },
              ].map((tick) => (
                <g key={tick.x}>
                  <line x1={tick.x} y1="340" x2={tick.x} y2="345" stroke="#4b5563" strokeWidth="1.5" />
                  <text x={tick.x} y="365" fill="var(--luxury-accent-hex, #f59e0b)" fontSize="14" fontWeight="bold" textAnchor="middle">
                    {tick.label}
                  </text>
                </g>
              ))}
            </g>

            {/* Sweep-revealed content */}
            <g clipPath="url(#sweepRevealDash)">
              {/* Ghost lines */}
              <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
                {[0.95, 0.90, 0.84, 0.77, 0.69, 0.60, 0.50].map((s, i) => (
                  <use
                    key={i}
                    href="#coreLineDash"
                    transform={`translate(0,${2 + i * 5}) translate(120,280) scale(1,${s}) translate(-120,-280)`}
                  />
                ))}
              </g>

              {/* Main line */}
              <use
                href="#coreLineDash"
                stroke="var(--luxury-accent-hex, #f59e0b)"
                strokeWidth="2.5"
                filter="drop-shadow(0px 2px 4px rgba(245,158,11,0.4))"
              />

              {/* Data points */}
              {DATA_POINTS.map((pt, i) => (
                <g
                  key={i}
                  style={{
                    opacity: visiblePoints.has(i) ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <line x1={pt.x} y1={pt.y} x2={pt.x} y2={340} stroke="var(--luxury-accent-hex, #f59e0b)" strokeWidth="1.5" strokeDasharray="5,4" />
                  <circle cx={pt.x} cy={pt.y} r="7" fill="#1a1a1a" stroke="var(--luxury-accent-hex, #f59e0b)" strokeWidth="2" />
                  <circle cx={pt.x} cy={pt.y} r="3" fill="var(--luxury-accent-hex, #f59e0b)" />
                  <circle cx={pt.x} cy={340} r="3.5" fill="var(--luxury-accent-hex, #f59e0b)" />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Product Overview */}
      <div className="bg-[#111111] rounded-xl p-5 mt-2 z-10">
        <h4 className="text-lg md:text-xl font-bold mb-4 tracking-wide">
          Product <span className="text-[var(--luxury-accent)]">Overview</span>
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-white text-xs mb-1">Origin</span>
            <span className="text-2xl md:text-3xl font-bold text-[var(--luxury-accent)] leading-none">{originVal}</span>
            <span className="text-[10px] mt-2 leading-tight">
              <span className="text-white/40">Top3:</span>{" "}
              <span className="text-white/60 ml-1">China United States India</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xs mb-1">Destination</span>
            <span className="text-2xl md:text-3xl font-bold text-[var(--luxury-accent)] leading-none">{destVal}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xs mb-1">Customers</span>
            <span className="text-2xl md:text-3xl font-bold text-[var(--luxury-accent)] leading-none">{custVal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
