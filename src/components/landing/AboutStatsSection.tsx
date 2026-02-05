import Link from "next/link";
import { CountUp, ScrollReveal } from "@/components/ui/animated";
import { ArrowRight } from "lucide-react";

const stats = [
  {
    id: 1,
    number: 137,
    suffix: "+",
    label: "ประเทศ",
    description: "ครอบคลุมวิเคราะห์สัญญาณตลาดจากหลายภูมิภาคทั่วโลก",
  },
  {
    id: 2,
    number: 18,
    suffix: "+",
    label: "ปี",
    description: "ประสบการณ์จริงในการทำ Go-to-Market ระดับสากล",
  },
  {
    id: 3,
    number: 70,
    suffix: "K+",
    label: "พาร์ตเนอร์",
    description: "เครือข่ายการค้าและซัพพลายเชนที่เชื่อมโยงกันจริง",
  },
];

export function AboutStatsSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#0F0F0F] py-10 md:py-14 lg:py-20 relative overflow-hidden grid-pattern-dense"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-[#FFB347] rounded-full opacity-5 blur-[150px] -translate-x-1/2" />

      {/* Geometric decorations */}
      <div className="absolute top-20 right-10 w-48 h-48 border border-[#FFB347]/10 rounded-lg rotate-45" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Headline */}
        <div className="text-center mb-6 md:mb-8 lg:mb-10 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              ABOUT
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            <span className="gradient-text-premium">ประสบการณ์ 18 ปี</span>
            <br />
            จากการทำตลาดและความสำเร็จจริง
          </h2>
          <p className="text-white/70 font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3 md:mb-4">
            เราจะอยู่เป็นส่วนหนึ่งในทีมของคุณ ทุกการตัดสินใจที่สำคัญ
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[#FFB347] hover:text-[#FFA500] font-body text-sm md:text-base transition-smooth group"
          >
            ทำความรู้จัก Origo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.id}
              direction="up"
              delay={index * 0.15}
            >
              <div className="text-center transition-smooth hover:scale-110 group glass-card p-6 rounded-xl">
                {/* Number - Visually Dominant */}
                <div className="mb-3">
                  <span className="font-mono text-5xl md:text-6xl font-bold block leading-none gradient-text-premium neon-glow transition-smooth group-hover:scale-105 data-counter">
                    <CountUp end={stat.number} suffix={stat.suffix || ""} duration={2500} separator />
                  </span>
                  <span className="text-xl md:text-2xl text-white font-heading font-semibold transition-smooth group-hover:text-[#FFB347]/80">
                    {stat.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/60 font-body text-base transition-smooth group-hover:text-white/80">
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
