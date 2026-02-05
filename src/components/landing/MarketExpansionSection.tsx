"use client";

import { ScrollReveal } from "@/components/ui/animated";
import { GlobeVisualization } from "@/components/ui/GlobeVisualization";

const marketSignals = [
  {
    id: 1,
    region: "Southeast Asia",
    growth: "+18%",
    position: { top: "35%", left: "72%" },
    strength: "high"
  },
  {
    id: 2,
    region: "Middle East",
    growth: "+15%",
    position: { top: "45%", left: "58%" },
    strength: "high"
  },
  {
    id: 3,
    region: "Eastern Europe",
    growth: "+12%",
    position: { top: "28%", left: "55%" },
    strength: "medium"
  },
  {
    id: 4,
    region: "Latin America",
    growth: "+16%",
    position: { top: "60%", left: "25%" },
    strength: "high"
  },
  {
    id: 5,
    region: "Central Asia",
    growth: "+10%",
    position: { top: "32%", left: "62%" },
    strength: "medium"
  },
];

export function MarketExpansionSection() {
  return (
    <section className="bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FFB347] rounded-full opacity-10 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#FFA500] rounded-full opacity-10 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Floating shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#FFB347]/10 rounded-full animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 border-2 border-[#FFA500]/10 rotate-45 animate-float" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Label */}
        <ScrollReveal direction="up">
          <div className="text-center mb-8">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              MARKET INTELLIGENCE
            </span>
          </div>
        </ScrollReveal>

        {/* Title & Descriptions */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white text-center mb-4 leading-tight">
            <span className="gradient-text-premium">การขยายตลาดใหม่</span>
            <br />
            ที่ให้ผลตอบแทนสูงกว่า 15%+
          </h2>
          <p className="text-[#FFB347] text-xl md:text-2xl font-semibold text-center mb-16">
            ค้นพบตลาดใหม่ จากสัญญาณที่ตลาดกำลังเปลี่ยน
          </p>
        </ScrollReveal>

        {/* Two-column layout: Globe + Text */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          {/* Globe Visualization */}
          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative h-[500px]">
              <GlobeVisualization />

              {/* Market signal overlays */}
              {marketSignals.map((signal, index) => (
                <div
                  key={signal.id}
                  className="absolute market-signal cursor-pointer group"
                  style={{
                    ...signal.position,
                    animationDelay: `${index * 0.3}s`,
                    zIndex: 20,
                  }}
                >
                  {/* Pulsing marker */}
                  <div className={`w-4 h-4 rounded-full ${
                    signal.strength === 'high' ? 'bg-[#FFD700]' : 'bg-[#FFB347]'
                  } shadow-glow`}></div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="glass-card px-3 py-2 rounded-lg whitespace-nowrap border border-[#FFB347]/30">
                      <p className="text-white text-sm font-semibold">{signal.region}</p>
                      <p className="text-[#FFB347] text-xs font-mono">{signal.growth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Text Content */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="space-y-6">
              <p className="text-white/80 font-body text-lg md:text-xl leading-relaxed">
                เราพบว่า ในแต่ละปี "ตลาดที่แข็งแรง" และ "ลูกค้าที่มีกำลังซื้อจริง" ไม่ได้อยู่ในจุดเดิมเสมอไป
              </p>
              <p className="text-white/80 font-body text-lg md:text-xl leading-relaxed">
                เราช่วยลูกค้าวิเคราะห์ Market Signal เพื่อมองเห็น การเปลี่ยนแปลงของตลาดที่มีกำลังซื้อสูง
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
