import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function BridgeCTASection() {
  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden dot-pattern">
      {/* Enhanced glow effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FFB347] rounded-full opacity-12 blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#FFA500] rounded-full opacity-10 blur-[130px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#FFD700] rounded-full opacity-8 blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern-dense opacity-30" />

      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dotted World Map Pattern */}
          <pattern
            id="worldmap"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1.5" fill="#333" />
          </pattern>
          <rect width="1200" height="600" fill="url(#worldmap)" />

          {/* Continents outline - simplified */}
          <path
            d="M200,150 L250,140 L300,160 L320,180 L300,200 L250,190 L200,150Z
               M400,200 L500,180 L550,200 L530,250 L480,260 L400,240Z
               M600,100 L700,90 L750,120 L740,170 L680,180 L600,150Z
               M800,250 L900,240 L950,270 L940,320 L880,330 L800,300Z"
            stroke="#1a1a1a"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Gold Location Pins */}
        {[
          { x: "15%", y: "30%" },
          { x: "25%", y: "40%" },
          { x: "45%", y: "25%" },
          { x: "55%", y: "45%" },
          { x: "70%", y: "35%" },
          { x: "80%", y: "50%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{ left: pos.x, top: pos.y }}
          >
            <MapPin className="w-6 h-6 text-[#FFB347] fill-[#FFB347]" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-left">
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFB347] mb-8">
              พร้อมแล้วหรือยัง
            </h2>

            {/* Subtext */}
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              ที่จะมีเครื่องมือที่ดีกว่าเดิม เพื่อกำหนดทิศทางได้แม่นยำขึ้น และเพิ่มโอกาสในการปิดการขายได้มากขึ้น
            </p>

            {/* Main Action Text */}
            <p className="text-white text-xl md:text-2xl mb-8 leading-relaxed">
              คำถามเพียง <span className="text-[#FFB347] font-bold">3 นาที</span> ที่จะพาคุณ
              <span className="text-[#FFB347] font-bold">ออกไปจากจุดเดิม</span>
            </p>

            {/* CTA Button */}
            <div className="mb-6">
              <Link href="/quiz/lead-info">
                <Button
                  size="lg"
                  className="bg-[#FFB347] hover:bg-[#FFA500] text-black font-bold text-base md:text-lg px-10 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Start the 3-min Quiz
                </Button>
              </Link>
            </div>

            {/* Footer Note */}
            <p className="text-gray-500 text-sm">
              (คุณเติบโตได้มากกว่านี้ ถ้าคุณรู้ว่าควรขาย 'ที่ไหน' และ 'ให้ใคร')
            </p>
          </div>

          {/* Right Column - Visual placeholder */}
          <div className="relative h-[400px] lg:h-[500px]">
            {/* Decorative map pins already exist above */}
          </div>
        </div>
      </div>
    </section>
  );
}
