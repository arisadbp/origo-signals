import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Clock } from "lucide-react";
import { CountUp, ScrollReveal } from "@/components/ui/animated";

export function CaseStudySection() {
  return (
    <section className="bg-[#0F0F0F] py-16 md:py-24 relative overflow-hidden dot-pattern">
      {/* Enhanced glow effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FFB347] rounded-full opacity-12 blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#FFA500] rounded-full opacity-10 blur-[130px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#FFD700] rounded-full opacity-8 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern-dense opacity-30" />

      {/* Geometric accent */}
      <div className="absolute top-10 left-10 w-64 h-64 border border-[#FFB347]/10 rotate-12 rounded-lg animate-float-slow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Main Impact */}
          <div className="text-left">
            <ScrollReveal direction="left">
              <h2 className="text-white/60 font-body text-lg md:text-xl mb-4 font-normal">
                ลูกค้าของเราเติบโตจริงในปี 2025
              </h2>
              <div className="font-mono text-6xl md:text-8xl font-bold mb-3 transition-smooth hover:scale-105">
                <CountUp
                  end={4000}
                  duration={2500}
                  separator
                  className="gradient-text-premium neon-glow data-counter"
                />
                <span className="text-5xl md:text-7xl gradient-text">M</span>
              </div>
              <p className="text-white/70 font-body text-base md:text-lg mb-6">
                ยอดขายรวมมากกว่า 4,000 ล้านบาท
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column - Description */}
          <div className="flex items-center">
            <ScrollReveal direction="right">
              <p className="text-white/60 font-body text-base md:text-lg leading-relaxed">
                พร้อมจะเติบโตแบบนี้แล้วหรือยัง เริ่มต้นด้วยการค้นหาโอกาสของคุณวันนี้
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Benefit 1 */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="glass-card rounded-xl p-6 text-center transition-smooth hover:scale-105 shadow-glow group card-tilt">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#FFB347]/10 flex items-center justify-center transition-smooth group-hover:bg-[#FFB347]/20 group-hover:scale-110 border border-[#FFB347]/20">
                  <TrendingUp className="w-8 h-8 text-[#FFB347]" />
                </div>
              </div>
              <h3 className="font-mono text-3xl md:text-4xl font-bold mb-2 gradient-text-premium data-counter">
                <CountUp end={15} suffix="%+" duration={2000} />
              </h3>
              <p className="text-white/80 font-body text-base">
                ผลตอบแทนจากตลาดใหม่
              </p>
            </div>
          </ScrollReveal>

          {/* Benefit 2 */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="glass-card rounded-xl p-6 text-center transition-smooth hover:scale-105 shadow-glow group card-tilt">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#FFB347]/10 flex items-center justify-center transition-smooth group-hover:bg-[#FFB347]/20 group-hover:scale-110 border border-[#FFB347]/20">
                  <Clock className="w-8 h-8 text-[#FFB347]" />
                </div>
              </div>
              <h3 className="font-mono text-3xl md:text-4xl font-bold mb-2 gradient-text-premium data-counter">
                <CountUp end={4} suffix=" เดือน" duration={1500} />
              </h3>
              <p className="text-white/80 font-body text-base">
                เริ่มเห็นผลการเติบโต
              </p>
            </div>
          </ScrollReveal>

          {/* Benefit 3 */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="glass-card rounded-xl p-6 text-center transition-smooth hover:scale-105 shadow-glow group card-tilt">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#FFB347]/10 flex items-center justify-center transition-smooth group-hover:bg-[#FFB347]/20 group-hover:scale-110 border border-[#FFB347]/20">
                  <Target className="w-8 h-8 text-[#FFB347]" />
                </div>
              </div>
              <h3 className="font-mono text-3xl md:text-4xl font-bold mb-2 gradient-text-premium data-counter">
                <CountUp end={40} suffix="%" duration={2000} />
              </h3>
              <p className="text-white/80 font-body text-base">
                ลดต้นทุนหาลูกค้าได้
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/70 font-body text-lg md:text-xl mb-6">
            พร้อมจะเติบโตแบบนี้แล้วหรือยัง
          </p>
          <Link href="/quiz/lead-info">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold text-base md:text-lg px-10 py-6 rounded-full transition-smooth transform hover:scale-110 shadow-glow-strong w-full sm:w-auto relative overflow-hidden group border-2 border-[#FFD700]/30"
            >
              <span className="relative z-10">เริ่มค้นหาโอกาสของคุณ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
