"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ui/animated";
import { Package } from "lucide-react";

type Box = {
  width: number;
  height: number;
  top: number;
  left: number;
  rotation: number;
  opacity: number;
};

export function InventoryOptimizationSection() {
  const [boxes, setBoxes] = useState<Box[] | null>(null);

  useEffect(() => {
    // Generate random boxes only on client side
    setBoxes([...Array(20)].map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 80 + 40,
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotation: Math.random() * 20 - 10,
      opacity: Math.random() * 0.3 + 0.1,
    })));
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Abstract warehouse pattern background */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]"></div>

        {/* Abstract grid pattern suggesting warehouse/storage */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>

        {/* Geometric boxes pattern */}
        {boxes && (
          <div className="absolute inset-0">
            {boxes.map((box, i) => (
              <div
                key={i}
                className="absolute border border-[#FFB347]/10 bg-[#FFB347]/5"
                style={{
                  width: `${box.width}px`,
                  height: `${box.height}px`,
                  top: `${box.top}%`,
                  left: `${box.left}%`,
                  transform: `rotate(${box.rotation}deg)`,
                  opacity: box.opacity,
                }}
              />
            ))}
          </div>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/85 to-[#050505]/95"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
              <Package className="w-4 h-4" />
              INVENTORY SOLUTION
            </div>
          </div>
        </ScrollReveal>

        {/* Main content card */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="glass-card p-10 md:p-16 rounded-3xl border-2 border-[#FFB347]/30 shadow-glow-strong">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              ปลดล็อกสต็อกส่วนเกิน
              <br />
              <span className="gradient-text-premium">ก่อนต้นทุนจะกลายเป็นปัญหา</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[#FFB347] text-xl md:text-2xl font-semibold mb-8">
              เมื่อการผลิตไม่สอดคล้องกับดีมานด์จริงของตลาด
            </p>

            {/* Description paragraphs */}
            <div className="space-y-6 text-white/80 font-body text-base md:text-lg leading-relaxed">
              <p>
                หลายธุรกิจต้องเผชิญกับ สต็อกคงค้างจากการคาดการณ์ที่คลาดเคลื่อน ต้นทุนเพิ่มขึ้น แรงกดดันต่อทีมขายและการเงิน
              </p>

              <p>
                โดยเฉพาะสินค้า Seasonal ที่ "จังหวะเวลา" สำคัญกว่าปริมาณการผลิต
              </p>

              <p className="text-white/90 font-semibold">
                เราช่วยวางแผนการขายล่วงหน้า จับคู่สินค้า กับ "ตลาดที่ต้องการจริง" ในช่วงเวลาที่เหมาะสมที่สุด
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB347]/30 to-transparent"></div>
    </section>
  );
}
