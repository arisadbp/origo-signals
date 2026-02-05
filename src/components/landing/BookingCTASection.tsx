import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BookingCTASection() {
  return (
    <section className="bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] py-10 md:py-14 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 border-2 border-[#FFB347]/20 rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-[#FFA500]/20 rotate-45 animate-float-slow" />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-[#FFB347]/15 rounded-lg animate-float" style={{ animationDelay: '1s' }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Content Card */}
        <div className="glass-card p-6 md:p-10 rounded-3xl border-2 border-[#FFB347]/30 animate-fade-in-up">
          {/* Badge */}
          <div className="flex justify-center mb-4 md:mb-6">
            <Badge
              variant="outline"
              className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347] border-[#FFB347]/40 inline-flex items-center gap-2"
            >
              รับจำกัด 5 บริษัทต่อเดือน
            </Badge>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white text-center mb-3 md:mb-4 leading-tight">
            จองเวลาเพื่อ
            <span className="gradient-text-premium">คุยกับเรา</span>
          </h2>

          {/* Subheadline */}
          <p className="text-white/80 font-body text-base md:text-xl text-center mb-5 md:mb-6 max-w-2xl mx-auto leading-relaxed">
            ว่าธุรกิจของคุณ ควรวางแผนการเติบโตอย่างไร
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold text-lg md:text-xl px-12 py-7 rounded-full transition-smooth transform hover:scale-110 border-2 border-[#FFD700]/30 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  จองเวลาคุยกับเรา
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </Link>
          </div>

          {/* Supporting info */}
          <div className="mt-5 text-center">
            <p className="text-white/50 font-body text-sm md:text-base">
              เราจะติดต่อกลับภายใน 24 ชั่วโมง
            </p>
          </div>
        </div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
