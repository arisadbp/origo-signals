"use client";

import { useResultsCounters } from "@/hooks/useResultsCounters";

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
              <svg
                viewBox="0 0 320 140"
                className="h-36 w-full"
                role="img"
                aria-label="ยอดขายเติบโต 4 เดือน"
              >
                <defs>
                  <linearGradient id="lineGlowMobile" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#FFB347" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFBF5A" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 120 L95 85 L185 65 L285 30"
                  fill="none"
                  stroke="url(#lineGlowMobile)"
                  strokeWidth="2"
                />
                <g fill="#FFBF5A">
                  {[
                    { x: 20, y: 120 },
                    { x: 95, y: 85 },
                    { x: 185, y: 65 },
                    { x: 285, y: 30 },
                  ].map((point) => (
                    <circle
                      key={`mobile-${point.x}-${point.y}`}
                      cx={point.x}
                      cy={point.y}
                      r="3.5"
                    />
                  ))}
                </g>
                <g fill="rgba(255,255,255,0.6)" fontSize="10">
                  <text x="12" y="136">M1</text>
                  <text x="86" y="136">M2</text>
                  <text x="176" y="136">M3</text>
                  <text x="270" y="136">M4</text>
                </g>
              </svg>

              <div className="pointer-events-none absolute right-2 top-2 text-right">
                <p className="text-xs text-white/70">ยอดขายรวมมากกว่า</p>
                <div className="-mt-1 text-2xl font-semibold text-[var(--luxury-accent)] data-counter">
                  {totalSales}+
                </div>
                <p className="-mt-1 text-base text-white/90">ล้านบาท</p>
              </div>
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
              <svg
                viewBox="0 0 720 240"
                className="h-60 w-full"
                role="img"
                aria-label="ยอดขายเติบโต 4 เดือน"
              >
                <defs>
                  <linearGradient id="lineGlow" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#FFB347" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFBF5A" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <g fill="rgba(255,255,255,0.55)" fontSize="12">
                  <text x="22" y="18">
                    200%
                  </text>
                  <text x="26" y="70">
                    100%
                  </text>
                  <text x="30" y="120">
                    50%
                  </text>
                  <text x="30" y="170">
                    25%
                  </text>
                  <text x="34" y="228">
                    0%
                  </text>
                </g>
                <path
                  d="M80 210 L230 145 L370 115 L490 60"
                  fill="none"
                  stroke="url(#lineGlow)"
                  strokeWidth="2"
                />
                <g fill="#FFBF5A">
                  {[
                    { x: 80, y: 210 },
                    { x: 230, y: 145 },
                    { x: 370, y: 115 },
                    { x: 490, y: 60 },
                  ].map((point) => (
                    <circle
                      key={`${point.x}-${point.y}`}
                      cx={point.x}
                      cy={point.y}
                      r="4.5"
                    />
                  ))}
                </g>
                <g fill="rgba(255,255,255,0.6)" fontSize="12">
                  <text x="70" y="234">
                    Month 1
                  </text>
                  <text x="210" y="234">
                    Month 2
                  </text>
                  <text x="340" y="234">
                    Month 3
                  </text>
                  <text x="450" y="234">
                    Month 4
                  </text>
                </g>
              </svg>

              <div className="pointer-events-none absolute right-6 top-14 text-right sm:right-10">
                <p className="text-xl text-white/60 sm:text-2xl">ยอดขายรวมมากกว่า</p>
                <div className="-mt-4 text-[3rem] font-semibold text-[var(--luxury-accent)] sm:text-[3.6rem] data-counter">
                  {totalSales}+
                </div>
                <p className="-mt-4 text-3xl text-white/95 sm:text-4xl">
                  ล้านบาท
                </p>
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
