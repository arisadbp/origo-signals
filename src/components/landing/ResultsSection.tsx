"use client";

import { useResultsCounters } from "@/hooks/useResultsCounters";
import AnimatedResultsChart from "@/components/landing/AnimatedResultsChart";

export default function ResultsSection() {
  const { ref, totalSales, customerGrowth, cacReduction } =
    useResultsCounters();

  return (
    <section
      id="results"
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-20 scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
        <div className="text-center">
          <h2 className="font-heading text-2xl leading-tight text-white sm:text-4xl md:text-5xl">
            <span className="relative inline-block font-semibold">
              ผลลัพธ์
              <span className="absolute left-0 top-full mt-1 h-[3px] w-full rounded-full bg-white/80" />
            </span>{" "}
            จากลูกค้า ปี 2025
          </h2>
          <p className="mt-4 text-2xl text-white/90 sm:text-4xl md:text-5xl">
            เติบโตแบบก้าวกระโดดใน{" "}
            <span className="text-4xl font-semibold text-white sm:text-6xl md:text-7xl">
              4
            </span>{" "}
            เดือน
          </p>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            เราช่วยลูกค้าลดความเสี่ยงจากการทดลองตลาดที่สิ้นเปลือง
            และเร่งการเติบโตที่ชัดเจนตั้งแต่วันแรก
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-luxury-subtle bg-[var(--luxury-bg-elevated-2)] px-8 py-8 shadow-luxury-xl sm:px-12 sm:py-10">
          {/* Mobile chart with map background */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-luxury-subtle bg-[var(--luxury-bg-elevated-2)] px-5 py-6 md:hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/map.png')",
                backgroundSize: "140% auto",
                backgroundPosition: "center 45%",
                backgroundRepeat: "no-repeat",
                opacity: 0.9,
                filter: "brightness(1.35) contrast(1.5)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
            <div className="relative">
              <AnimatedResultsChart isInView={!!ref.current} totalSales={totalSales} variant="mobile" />
            </div>
          </div>
          {/* Chart - hidden on mobile, visible on desktop */}
          <div className="relative overflow-hidden rounded-2xl border border-luxury-subtle bg-[var(--luxury-bg-elevated-2)] px-6 py-6 sm:px-8 sm:py-8 hidden md:block">
            <div
              className="absolute pointer-events-none"
              style={{
                top: "12px",
                right: "220px",
                bottom: "26px",
                left: "56px",
                backgroundImage: "url('/map.png')",
                backgroundSize: "112% auto",
                backgroundPosition: "center 44%",
                backgroundRepeat: "no-repeat",
                opacity: 1,
                filter: "brightness(1.4) contrast(1.7)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
            <div className="relative">
              <AnimatedResultsChart isInView={!!ref.current} totalSales={totalSales} variant="desktop" />
            </div>
          </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:gap-6 md:mt-8">
            {/* Customer growth card */}
            <div className="card-lift rounded-2xl border-luxury-subtle bg-[var(--luxury-bg-elevated-2)] shadow-luxury-md px-4 py-6 md:px-8 md:py-10 text-center">
              <p className="text-lg text-white/80 sm:text-2xl md:text-5xl">
                ฐานลูกค้าเติบโต
              </p>
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-center md:gap-6">
                <span className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.96rem] font-semibold text-white data-counter">
                  {customerGrowth}%
                </span>
                <img
                  src="/landing-hero/1.png"
                  alt="ขึ้น"
                  className="mt-2 md:mt-0 h-12 w-12 md:h-24 md:w-24"
                />
              </div>
            </div>

            {/* CAC reduction card */}
            <div className="card-lift rounded-2xl border-luxury-subtle bg-[var(--luxury-bg-elevated-2)] shadow-luxury-md px-4 py-6 md:px-8 md:py-10 text-center">
              <p className="text-lg text-white/80 sm:text-2xl md:text-5xl">
                ต้นทุนหาลูกค้าลดลง
              </p>
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-center md:gap-6">
                <span className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.96rem] font-semibold text-white data-counter">
                  {cacReduction}%
                </span>
                <img
                  src="/landing-hero/2.png"
                  alt="ลง"
                  className="mt-2 md:mt-0 h-12 w-12 md:h-24 md:w-24"
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            กรณีศึกษาจากข้อมูลจริงของลูกค้า โดยไม่เปิดเผยชื่อและข้อมูลลูกค้า
            ตามข้อกำหนดด้านความลับทางธุรกิจ
          </p>
        </div>
      </div>
    </section>
  );
}
