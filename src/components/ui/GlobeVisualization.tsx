"use client";

interface GlobeVisualizationProps {
  animate?: boolean;
}

export function GlobeVisualization({ animate = true }: GlobeVisualizationProps) {
  const orbitRadius = 160;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Globe Representation */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Main Globe */}
        <div
          className={`absolute inset-0 rounded-full glass-strong border-2 border-[#FFB347]/30 ${
            animate ? "animate-float-slow" : ""
          }`}
        >
          {/* Latitude Lines */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB347]/50 to-transparent"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>

          {/* Longitude Lines */}
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-[#FFB347]/30 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#FFB347]/50 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-[#FFB347]/30 to-transparent"></div>

          {/* Rotating Orbit Ring */}
          <div
            className={`absolute inset-0 rounded-full border border-[#FFB347]/40 ${
              animate ? "animate-spin" : ""
            }`}
            style={animate ? { animationDuration: "20s" } : undefined}
          >
            <div
              className={`absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#FFB347] shadow-glow ${
                animate ? "animate-pulse" : ""
              }`}
            ></div>
          </div>

          {/* Inner Glow */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#FFB347]/10 to-transparent blur-xl"></div>
        </div>

        {/* Orbiting Dots (Countries) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
            style={{
              animation: animate ? `orbit ${10 + i * 2}s linear infinite` : undefined,
              animationDelay: animate ? `${i * -1.5}s` : undefined,
              transform: !animate
                ? `rotate(${i * 45}deg) translateX(${orbitRadius}px)`
                : undefined,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FFB347] shadow-glow"></div>
          </div>
        ))}

        {/* Pulse Rings */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-[#FFB347]/20 ${
            animate ? "animate-ping" : ""
          }`}
          style={animate ? { animationDuration: "3s" } : undefined}
        ></div>
        <div
          className={`absolute inset-8 rounded-full border border-[#FFB347]/30 ${
            animate ? "animate-ping" : ""
          }`}
          style={animate ? { animationDuration: "2.5s", animationDelay: "0.5s" } : undefined}
        ></div>
      </div>

      {/* Data Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFB347" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="10%"
          y1="20%"
          x2="50%"
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className={animate ? "animate-pulse" : ""}
        />
        <line
          x1="90%"
          y1="30%"
          x2="50%"
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className={animate ? "animate-pulse" : ""}
          style={animate ? { animationDelay: "0.5s" } : undefined}
        />
        <line
          x1="80%"
          y1="80%"
          x2="50%"
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className={animate ? "animate-pulse" : ""}
          style={animate ? { animationDelay: "1s" } : undefined}
        />
      </svg>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(160px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(160px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
