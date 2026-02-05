import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    id: 1,
    number: "01",
    title: "สามารถกำหนดทิศทางได้แม่นยำขึ้น",
  },
  {
    id: 2,
    number: "02",
    title: "เพิ่มโอกาสในการปิดการขายได้มากขึ้น",
  },
  {
    id: 3,
    number: "03",
    title: "ออกจากจุดเดิมด้วยคำถามเพียง 3 นาที",
  },
];

export function FirstCTASection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-[#050505] py-10 md:py-14 lg:py-20 relative overflow-hidden grid-pattern-dense"
    >
      {/* Subtle glow effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FFB347] rounded-full opacity-5 blur-[120px]" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#FFA500] rounded-full opacity-5 blur-[120px]" />

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#FFB347]/10 rounded-full animate-float-slow" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Headline */}
        <div className="text-center mb-4 md:mb-6 lg:mb-8 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              ASSESSMENT
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            พร้อมแล้วหรือยัง<br />
            ที่จะมี<span className="gradient-text-premium">เครื่องมือที่ดีกว่าเดิม</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mt-6 md:mt-8 lg:mt-10">
          {benefits.map((benefit, index) => {
            return (
              <Card
                key={benefit.id}
                className="glass-card p-6 rounded-xl relative transition-smooth hover:scale-105 shadow-glow group card-tilt animate-fade-in-up h-full flex flex-col overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number - Premium Style */}
                <div className="absolute -top-4 -left-2 transition-smooth group-hover:scale-110">
                  <span className="font-mono text-8xl md:text-9xl font-black gradient-text-premium opacity-20 group-hover:opacity-30 leading-none select-none">
                    {benefit.number}
                  </span>
                </div>

                {/* Step Number - Small Display */}
                <div className="mb-4 relative z-10">
                  <span className="inline-block px-3 py-1 rounded-lg glass-card text-sm font-mono font-bold text-[#FFB347] border border-[#FFB347]/20">
                    STEP {benefit.number}
                  </span>
                </div>

                {/* Title */}
                <p className="text-white/90 font-body text-base md:text-lg leading-relaxed relative z-10 flex-1">
                  {benefit.title}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col items-center gap-3 md:gap-4 animate-fade-in-up">
          <Link href="/quiz/lead-info">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold text-base md:text-lg px-8 py-6 rounded-full transition-smooth transform hover:scale-110 shadow-glow-strong border-2 border-[#FFD700]/30 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                เริ่มประเมิน Market Signal
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </Link>
          <p className="text-white/50 text-xs md:text-sm font-body text-center">
            (คุณเติบโตได้มากกว่านี้ ถ้าคุณรู้ว่าควรขาย "ที่ไหน" และ "ให้ใคร")
          </p>
        </div>
      </div>
    </section>
  );
}
