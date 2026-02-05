"use client";

import { ScrollReveal } from "@/components/ui/animated";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const growthData = [
  { month: "เดือน 1", revenue: 100, percentage: 0, label: "เริ่มต้น" },
  { month: "เดือน 2", revenue: 180, percentage: 80, label: "ปรับกลยุทธ์" },
  { month: "เดือน 3", revenue: 350, percentage: 250, label: "เห็นผล" },
  { month: "เดือน 4", revenue: 650, percentage: 550, label: "ก้าวกระโดด" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      label: string;
      percentage: number;
      month: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card px-4 py-3 border border-[#FFB347]/30 rounded-lg">
        <p className="text-white font-heading text-base mb-1">{data.label}</p>
        <p className="text-[#FFB347] text-2xl font-mono font-bold">
          +{data.percentage}%
        </p>
        <p className="text-white/60 text-sm mt-1">{data.month}</p>
      </div>
    );
  }
  return null;
};

export function GrowthSuccessSection() {
  return (
    <section id="case-studies" className="bg-[#050505] py-20 md:py-32 relative overflow-hidden dot-pattern">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#FFB347] rounded-full opacity-10 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FFA500] rounded-full opacity-10 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Floating shapes */}
      <div className="absolute top-1/4 right-1/3 w-40 h-40 border border-[#FFB347]/10 rotate-45 animate-float-slow" />
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border-2 border-[#FFA500]/10 rounded-full animate-float" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Label */}
        <ScrollReveal direction="up">
          <div className="text-center mb-8">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              CASE STUDY
            </span>
          </div>
        </ScrollReveal>

        {/* Title & Description */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white text-center mb-6 leading-tight">
            การเติบโตแบบก้าวกระโดด
            <br />
            <span className="gradient-text-premium">เริ่มต้นภายใน 4 เดือน</span>
          </h2>
          <p className="text-white/80 font-body text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            เราช่วยลูกค้าลดความเสี่ยงจากการทดลองตลาดที่สิ้นเปลือง และเร่งการเติบโต ด้วยทิศทาง Go-to-Market ที่ชัดเจนตั้งแต่วันแรก
          </p>
        </ScrollReveal>

        {/* Chart */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="glass-card p-6 md:p-10 rounded-3xl border border-[#FFB347]/20 shadow-glow [&_*:focus]:outline-none [&_*:focus-visible]:outline-none">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={growthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB347" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFB347" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" opacity={0.1} vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#FFFFFF"
                  opacity={0.6}
                  tick={{ fill: '#FFFFFF', opacity: 0.7 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#FFFFFF"
                  opacity={0.6}
                  tick={{ fill: '#FFFFFF', opacity: 0.7 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Area
                  type="monotone"
                  dataKey="percentage"
                  stroke="#FFB347"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  animationDuration={1500}
                  animationBegin={200}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <ScrollReveal direction="up" delay={0.5}>
          <p className="text-white/40 font-body text-xs md:text-sm italic text-center mt-8 border-t border-white/10 pt-6 max-w-3xl mx-auto">
            กรณีศึกษานี้อ้างอิงจากสถานการณ์จริง โดยไม่เปิดเผยชื่อและข้อมูลลูกค้า ตามข้อตกลงด้านความลับทางธุรกิจ
          </p>
        </ScrollReveal>
      </div>

      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
