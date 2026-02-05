"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

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

interface Slide {
  id: number;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  bulletPoints?: string[];
  disclaimer?: string;
  visualization?: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    title: (
      <>
        <span className="gradient-text-premium">ลูกค้าของเรา เติบโตจริงในปี 2025</span>
        <br />
        ยอดขายรวมมากกว่า 4,000 ล้านบาท
      </>
    ),
    subtitle: (
      <>
        ไม่ใช่เพราะ<span className="gradient-text-premium">ทำงานหนัก</span>ขึ้นแต่เพราะเริ่มจากการกำหนด
        <span className="gradient-text-premium">ทิศทางการขายที่ชัดเจน</span>
      </>
    ),
    bulletPoints: [
      "เจ้าของธุรกิจมีเวลาเหลือมากขึ้น",
      "ธุรกิจเติบโตอย่างเป็นระบบ",
      "ทีมงานรู้ชัดว่าควรโฟกัสอะไร"
    ]
  },
  {
    id: 2,
    title: (
      <>
        <span className="gradient-text-premium">ความสำเร็จของลูกค้า</span>
        <br />
        การเติบโตแบบก้าวกระโดด เริ่มต้นภายใน 4 เดือน
      </>
    ),
    subtitle: (
      <>
        เราช่วยลูกค้าลดความเสี่ยงจากการทดลองตลาดที่สิ้นเปลือง และเร่งการเติบโต
        ด้วยทิศทาง <span className="gradient-text-premium">Go-to-Market</span> ที่ชัดเจนตั้งแต่วันแรก
      </>
    ),
    disclaimer: "กรณีศึกษานี้อ้างอิงจากสถานการณ์จริง โดยไม่เปิดเผยชื่อและข้อมูลลูกค้า ตามข้อตกลงด้านความลับทางธุรกิจ",
    visualization: (
      <div className="p-6 md:p-8 rounded-2xl border border-[#FFB347]/20 bg-[#0b0b0b] [&_*:focus]:outline-none [&_*:focus-visible]:outline-none mt-6">
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
    title: (
      <>
        <span className="gradient-text-premium">ขยายตลาดใหม่ให้ผลตอบแทนสูงกว่า 15%</span>
        <br />
        ค้นพบตลาดใหม่จากสัญญาณที่ตลาดกำลังเปลี่ยน
      </>
    ),
    subtitle: (
      <>
        เราพบว่า ในแต่ละปี <span className="gradient-text-premium">"ตลาดที่แข็งแรง"</span> และ{" "}
        <span className="gradient-text-premium">"ลูกค้าที่มีกำลังซื้อจริง"</span> ไม่ได้อยู่ในจุดเดิมเสมอไป
        โดยเราช่วยลูกค้าวิเคราะห์ <span className="gradient-text-premium">Market Signal</span> เพื่อมองเห็น
        การเปลี่ยนแปลงของตลาดที่มีกำลังซื้อสูง
      </>
    )
  },
  {
    id: 4,
    title: (
      <>
        <span className="gradient-text-premium">ปลดล็อกสต็อกส่วนเกิน</span>
        <br />
        ก่อนต้นทุนจะกลายเป็นปัญหา
      </>
    ),
    subtitle: (
      <>
        เมื่อการผลิตไม่สอดคล้องกับ{" "}
        <span className="gradient-text-premium">ดีมานด์จริงของตลาด</span>
      </>
    ),
    description: (
      <>
        หลายธุรกิจต้องเผชิญกับ สต็อกคงค้างจากการคาดการณ์ที่คลาดเคลื่อน ต้นทุนเพิ่มขึ้น
        แรงกดดันต่อทีมขายและการเงิน โดยเฉพาะสินค้า Seasonal ที่{" "}
        <span className="gradient-text-premium">"จังหวะเวลา"</span> สำคัญกว่าปริมาณการผลิต
        เราช่วยวางแผนการขายล่วงหน้า จับคู่สินค้ากับ{" "}
        <span className="gradient-text-premium">"ตลาดที่ต้องการจริง"</span> ในช่วงเวลาที่เหมาะสมที่สุด
      </>
    )
  }
];

export function SuccessCarouselSectionMap() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      const totalDistance = rect.height + viewportHeight * 0.2;
      const scrolledDistance = viewportHeight * 0.6 - rect.top;
      const progress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));

      if (progressRef.current) {
        progressRef.current.style.height = `${progress * 100}%`;
      }

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const focusPoint = viewportHeight * 0.45;

      slideRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        const slideRect = node.getBoundingClientRect();
        const slideFocus = slideRect.top + slideRect.height * 0.35;
        const distance = Math.abs(slideFocus - focusPoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="scroll-mt-24 bg-[#050505] py-10 md:py-14 lg:py-20 relative overflow-hidden dot-pattern"
    >
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

        {/* Timeline Container */}
        <div className="relative">
          <div className="absolute left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 pointer-events-none z-0">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 right-0 bg-[#FFB347]"
              style={{ height: "0%" }}
            ></div>
          </div>

          <div className="space-y-0">
            {slides.map((slide, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={slide.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className="relative py-12 md:py-16 lg:py-20"
                >
                  {index !== 0 && (
                    <div className="absolute left-1/2 top-0 h-12 md:h-16 lg:h-20 w-[2px] bg-[#FFB347]/20 -translate-x-1/2"></div>
                  )}
                  {index !== slides.length - 1 && (
                    <div className="absolute left-1/2 bottom-0 h-12 md:h-16 lg:h-20 w-[2px] bg-[#FFB347]/20 -translate-x-1/2"></div>
                  )}

                  <div className="absolute left-1/2 top-12 md:top-16 lg:top-20 h-4 w-4 -translate-x-1/2">
                    <div
                      className={`h-full w-full rounded-full border ${
                        isActive ? "border-[#FFB347]" : "border-white/20"
                      } bg-[#050505]`}
                    ></div>
                    <div
                      className={`absolute inset-0 rounded-full ${
                        isActive ? "bg-[#FFB347]/40" : "bg-white/10"
                      } blur-md`}
                    ></div>
                  </div>

                  <div className="pl-0 md:max-w-3xl md:mx-auto">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-[#050505] z-0"></div>
                      <Card
                        className="glass-card p-6 md:p-10 rounded-3xl relative z-10 transition-smooth hover:scale-105 shadow-glow group card-tilt animate-fade-in-up h-full"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white mb-3 leading-tight text-center">
                        {slide.title}
                      </h3>

                      {/* Subtitle */}
                      {slide.subtitle && (
                        <p className="text-sm md:text-base text-white/90 font-semibold mb-4 text-center">
                          {slide.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      {slide.description && (
                        <p className="text-white/80 font-body text-sm md:text-base leading-relaxed mb-4 text-center">
                          {slide.description}
                        </p>
                      )}

                      {/* Bullet Points */}
                      {slide.bulletPoints && (
                        <div className="grid gap-3 md:grid-cols-3 mb-4 md:max-w-3xl md:mx-auto">
                          {slide.bulletPoints.map((point, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-white/90 font-body text-xs md:text-sm"
                            >
                              {point}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Disclaimer */}
                      {slide.disclaimer && (
                        <p className="text-white/40 font-body text-xs leading-relaxed border-t border-white/10 pt-3 mb-4 text-center">
                          {slide.disclaimer}
                        </p>
                      )}

                      {/* Visualization */}
                      {slide.visualization && (
                        <div className="mt-4">
                          {slide.visualization}
                        </div>
                      )}
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
