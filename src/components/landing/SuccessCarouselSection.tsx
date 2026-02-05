"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, TrendingUp, Globe, Package, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GlobeVisualization } from "@/components/ui/GlobeVisualization";

// Growth chart data
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

// Market signals data
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

interface Slide {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  description2?: string;
  bulletPoints?: string[];
  disclaimer?: string;
  cta?: string;
  visualization?: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    icon: <TrendingUp className="w-8 h-8 text-[#FFB347]" />,
    title: "ลูกค้าของเรา เติบโตจริงในปี 2025 ยอดขายรวมมากกว่า 4,000 ล้านบาท",
    description: "ไม่ใช่เพราะทำงานหนักขึ้น แต่เพราะเริ่มจากการกำหนดทิศทางการขายที่ชัดเจน",
    bulletPoints: [
      "เจ้าของธุรกิจมีเวลาเหลือมากขึ้น",
      "ธุรกิจเติบโตอย่างเป็นระบบ",
      "ทีมงานรู้ชัดว่าควรโฟกัสอะไร"
    ],
    cta: "(ดูตัวอย่างเคสจริง)"
  },
  {
    id: 2,
    icon: <TrendingUp className="w-8 h-8 text-[#FFB347]" />,
    title: "ความสำเร็จของลูกค้า",
    subtitle: "การเติบโตแบบก้าวกระโดด เริ่มต้นภายใน 4 เดือน",
    description: "เราช่วยลูกค้าลดความเสี่ยงจากการทดลองตลาดที่สิ้นเปลือง และเร่งการเติบโต ด้วยทิศทาง Go-to-Market ที่ชัดเจนตั้งแต่วันแรก",
    disclaimer: "กรณีศึกษานี้อ้างอิงจากสถานการณ์จริง โดยไม่เปิดเผยชื่อและข้อมูลลูกค้า ตามข้อตกลงด้านความลับทางธุรกิจ",
    visualization: (
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#FFB347]/20 shadow-glow [&_*:focus]:outline-none [&_*:focus-visible]:outline-none mt-6">
        <ResponsiveContainer width="100%" height={350}>
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
    )
  },
  {
    id: 3,
    icon: <Globe className="w-8 h-8 text-[#FFB347]" />,
    title: "การขยายตลาดใหม่ที่ให้ผลตอบแทนสูงกว่า 15%+",
    subtitle: "ค้นพบตลาดใหม่ จากสัญญาณที่ตลาดกำลังเปลี่ยน",
    description: "เราพบว่า ในแต่ละปี \"ตลาดที่แข็งแรง\" และ \"ลูกค้าที่มีกำลังซื้อจริง\" ไม่ได้อยู่ในจุดเดิมเสมอไป",
    description2: "เราช่วยลูกค้าวิเคราะห์ Market Signal เพื่อมองเห็น การเปลี่ยนแปลงของตลาดที่มีกำลังซื้อสูง",
    visualization: (
      <div className="relative h-[400px] mt-6">
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
    )
  },
  {
    id: 4,
    icon: <Package className="w-8 h-8 text-[#FFB347]" />,
    title: "ปลดล็อกสต็อกส่วนเกิน ก่อนต้นทุนจะกลายเป็นปัญหา",
    subtitle: "เมื่อการผลิตไม่สอดคล้องกับดีมานด์จริงของตลาด",
    description: "หลายธุรกิจต้องเผชิญกับ สต็อกคงค้างจากการคาดการณ์ที่คลาดเคลื่อน ต้นทุนเพิ่มขึ้น แรงกดดันต่อทีมขายและการเงิน",
    description2: "โดยเฉพาะสินค้า Seasonal ที่ \"จังหวะเวลา\" สำคัญกว่าปริมาณการผลิต\n\nเราช่วยวางแผนการขายล่วงหน้า จับคู่สินค้า กับ \"ตลาดที่ต้องการจริง\" ในช่วงเวลาที่เหมาะสมที่สุด"
  }
];

export function SuccessCarouselSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section
      id="case-studies"
      className="scroll-mt-24 bg-[#050505] py-10 md:py-14 lg:py-20 relative overflow-hidden dot-pattern"
    >
      {/* Larger glow effects with grid pattern feel */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FFB347] rounded-full opacity-12 blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FFA500] rounded-full opacity-12 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#FFD700] rounded-full opacity-8 blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Grid overlay for cyber/tech feel */}
      <div className="absolute inset-0 grid-pattern-dense opacity-30" />

      {/* Floating shapes - Different from FirstCTA */}
      <div className="absolute top-1/4 right-1/3 w-40 h-40 border border-[#FFB347]/10 rotate-45 animate-float-slow" />
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border-2 border-[#FFA500]/10 rounded-full animate-float" />
      <div className="absolute top-1/2 left-1/5 w-28 h-28 border border-[#FFD700]/10 rotate-12 animate-float" style={{ animationDelay: '0.7s' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Label */}
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              SUCCESS STORIES
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Slides */}
          <div className="relative min-h-[500px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 block'
                    : 'opacity-0 hidden'
                }`}
              >
                <div className="glass-card p-6 md:p-10 rounded-3xl shadow-glow border border-[#FFB347]/20">
                  {/* Icon */}
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB347]/20 to-[#FFA500]/20">
                    {slide.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white mb-3 leading-tight">
                    {slide.title}
                  </h3>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-base md:text-lg text-[#FFB347] font-semibold mb-4">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-white/80 font-body text-sm md:text-base leading-relaxed mb-4">
                    {slide.description}
                  </p>

                  {/* Second Description */}
                  {slide.description2 && (
                    <p className="text-white/80 font-body text-sm md:text-base leading-relaxed mb-4 whitespace-pre-line">
                      {slide.description2}
                    </p>
                  )}

                  {/* Bullet Points */}
                  {slide.bulletPoints && (
                    <ul className="space-y-2 mb-4">
                      {slide.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#FFB347] flex-shrink-0 mt-0.5" />
                          <span className="text-white/90 font-body text-sm md:text-base">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  {slide.cta && (
                    <p className="text-[#FFB347]/80 font-body text-xs md:text-sm mb-3">
                      {slide.cta}
                    </p>
                  )}

                  {/* Disclaimer */}
                  {slide.disclaimer && (
                    <p className="text-white/40 font-body text-xs leading-relaxed border-t border-white/10 pt-3 mb-4">
                      {slide.disclaimer}
                    </p>
                  )}

                  {/* Visualization */}
                  {slide.visualization && (
                    <div className="mt-4">
                      {slide.visualization}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
            <Button
              onClick={() => {
                prevSlide();
              }}
              variant="outline"
              size="icon"
              className="glass-card border-[#FFB347]/30 text-white hover:border-[#FFB347]/50 hover:scale-110 transition-smooth pointer-events-auto -ml-16 shadow-glow"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => {
                nextSlide();
              }}
              variant="outline"
              size="icon"
              className="glass-card border-[#FFB347]/30 text-white hover:border-[#FFB347]/50 hover:scale-110 transition-smooth pointer-events-auto -mr-16 shadow-glow"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8 lg:mt-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gradient-to-r from-[#FFB347] to-[#FFA500]'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex md:hidden justify-center gap-4 mt-5">
          <Button
            onClick={() => {
              prevSlide();
            }}
            variant="outline"
            size="icon"
            className="glass-card border-[#FFB347]/30 text-white hover:border-[#FFB347]/50 shadow-glow"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => {
              nextSlide();
            }}
            variant="outline"
            size="icon"
            className="glass-card border-[#FFB347]/30 text-white hover:border-[#FFB347]/50 shadow-glow"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
