"use client";

import { TrendingUp, Globe, Target, DollarSign, BarChart3, Activity } from "lucide-react";
import { ScrollReveal } from "@/components/ui/animated";
import { TradeGrowthChart } from "@/components/charts/TradeGrowthChart";
import { MarketDistributionChart } from "@/components/charts/MarketDistributionChart";

const liveMetrics = [
  {
    id: 1,
    icon: DollarSign,
    label: "Total Trade Volume",
    value: "$10.5B",
    change: "+14.2%",
    trend: "up",
  },
  {
    id: 2,
    icon: Globe,
    label: "Active Markets",
    value: "137",
    change: "+8",
    trend: "up",
  },
  {
    id: 3,
    icon: Target,
    label: "Success Rate",
    value: "94.3%",
    change: "+2.1%",
    trend: "up",
  },
  {
    id: 4,
    icon: Activity,
    label: "Avg. Response Time",
    value: "< 3 min",
    change: "-15%",
    trend: "down",
  },
];

export function DataVisualizationSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#000000] via-[#050505] to-[#0a0a0a] overflow-hidden dot-pattern">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 grid-pattern-dense opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FFB347] rounded-full opacity-12 blur-[150px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#FFA500] rounded-full opacity-10 blur-[130px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#FFD700] rounded-full opacity-8 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left Column - Text */}
          <ScrollReveal direction="left">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                <BarChart3 className="w-4 h-4 text-[#FFB347]" />
                <span className="text-white/80 text-sm font-mono">Real-time Intelligence</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                ข้อมูลที่<span className="gradient-text-premium">ชัดเจน</span>
                <br />
                ตัดสินใจได้<span className="gradient-text-premium">ทันที</span>
              </h2>

              <p className="text-white/60 text-lg md:text-xl font-body leading-relaxed">
                ระบบวิเคราะห์ข้อมูลการค้าระหว่างประเทศแบบ real-time
                ช่วยคุณเห็นโอกาสและทำการตัดสินใจได้อย่างมั่นใจ
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column - Visual placeholder */}
          <ScrollReveal direction="right">
            <div className="relative h-[300px] flex items-center justify-center">
              <div className="text-white/40 text-center">
                <BarChart3 className="w-24 h-24 mx-auto mb-4 text-[#FFB347]" />
                <p className="text-sm">Data Visualization</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ScrollReveal direction="left" delay={0.2}>
            <TradeGrowthChart />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.4}>
            <MarketDistributionChart />
          </ScrollReveal>
        </div>

        {/* Live Metrics Cards */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {liveMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const isPositive = metric.trend === "up";

              return (
                <div
                  key={metric.id}
                  className="glass-card p-5 rounded-xl border border-[#FFB347]/20 hover:border-[#FFB347]/40 transition-smooth hover:scale-105 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFB347]/20 to-[#FFA500]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                    <Icon className="w-6 h-6 text-[#FFB347]" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <div className="text-2xl md:text-3xl font-heading font-bold gradient-text-premium data-counter">
                      {metric.value}
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-white/60 text-xs md:text-sm font-body mb-2">
                    {metric.label}
                  </div>

                  {/* Change */}
                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`w-3 h-3 ${
                        isPositive ? "text-green-400" : "text-red-400"
                      } ${!isPositive && "rotate-180"}`}
                    />
                    <span
                      className={`text-xs font-mono ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {metric.change}
                    </span>
                    <span className="text-white/40 text-xs font-mono">vs last month</span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal direction="up" delay={0.8}>
          <div className="mt-16 text-center">
            <p className="text-white/60 text-base font-body mb-4">
              ต้องการดูข้อมูลเชิงลึกสำหรับธุรกิจของคุณ
            </p>
            <a
              href="/quiz/lead-info"
              className="inline-flex items-center gap-2 text-[#FFB347] font-heading font-semibold hover:text-[#FFA500] transition-smooth group"
            >
              <span>เริ่มวิเคราะห์ตลาดของคุณ</span>
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
