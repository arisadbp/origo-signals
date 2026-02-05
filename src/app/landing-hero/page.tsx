import Image from "next/image";
import Link from "next/link";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import TopNav from "@/components/landing/TopNav";

export default function LandingHeroClonePage() {
  return (
    <main className="min-h-screen bg-[var(--luxury-bg-base)] text-white">
      <TopNav />
      <section id="hero" className="relative overflow-hidden bg-black">
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/landing-hero/hero-7.png')] bg-cover bg-center bg-no-repeat opacity-75 md:bg-[position:-35%_50%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.2) 82%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl mobile-shell desktop-shell flex-col justify-start px-5 py-12 text-center sm:px-6 sm:py-20 sm:text-left md:items-end md:px-0 md:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-xl md:ml-auto md:mr-0 md:w-[55%] md:max-w-none">
            <h1 className="font-heading leading-[1.12] text-white">
              <span className="grid justify-items-center sm:justify-items-start">
                <span className="block w-full text-white tracking-tight text-[clamp(1.6rem,4.2vw,3.25rem)] md:whitespace-nowrap">
                  บ่อยครั้งไหม...คุณกำลัง
                </span>
                <span className="mt-3 block w-full font-semibold tracking-tight text-[var(--luxury-accent)] text-[clamp(2.3rem,7vw,5.2rem)] md:whitespace-nowrap">
                  "ทำงานหนัก"
                </span>
                <span className="mt-4 block w-full font-normal text-white/90 tracking-tight text-[clamp(1.2rem,3.4vw,3rem)] md:whitespace-nowrap">
                  แต่ไม่แน่ใจว่ามาถูกทาง?
                </span>
              </span>
            </h1>

            <p className="mt-7 text-white/85 text-[clamp(0.95rem,2.4vw,1.6rem)] max-w-none">
              <span className="block sm:pl-6 md:whitespace-nowrap">
                ยอดขายต่างประเทศยัง
                <span className="font-semibold text-white underline underline-offset-4 decoration-white">
                  ไม่โต
                </span>
                แม้ลงทุนเพิ่ม?
              </span>
              <span className="mt-2 block sm:pl-10 md:whitespace-nowrap">
                เครื่องมือมากขึ้นแต่ความ{" "}
                <span className="font-semibold text-white underline underline-offset-4 decoration-white">
                  ชัดเจนน้อยลง?
                </span>
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-14 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-center sm:text-left">
              <h2 className="font-heading text-2xl font-semibold leading-tight sm:text-4xl md:text-7xl">
                พร้อมแล้วหรือยัง?
              </h2>
              <p className="mt-2 text-base leading-relaxed text-white/90 sm:text-xl md:text-[2.5rem]">
                คำถามเพียง <span className="font-semibold">3 นาที</span>
                <br />
                ที่จะพาคุณออกไปจากจุดเดิม
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/75 sm:text-base md:text-lg">
                {[
                  "เพื่อกำหนดทิศทางได้แม่นยำขึ้น",
                  "เพิ่มโอกาสในการปิดการขายได้มากขึ้น",
                  "ที่จะมีเครื่องมือที่ดีกว่าเดิม",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-3 sm:items-start sm:justify-start">
                    <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80">
                      ✓
                    </span>
                    <p className="text-center sm:text-left">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/quiz/lead-info"
                className="btn-luxury group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--luxury-accent)] px-7 py-3 text-base font-semibold text-[#0A0A0A] sm:w-auto sm:px-9 sm:py-4 sm:text-lg md:px-10 md:text-2xl"
              >
                <span className="relative z-10">เริ่มประเมิน (ฟรี)</span>
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white transition-transform duration-300 group-hover:rotate-45 sm:h-10 sm:w-10">
                  →
                </span>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#76851f] text-black shadow-luxury-md">
                ✓
              </div>

              <div className="card-luxury w-full rounded-3xl p-5 md:p-6">
                <p className="text-sm text-white/70">
                  สถานะ Market Signal ของคุณ
                </p>

                <div className="mt-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/20 text-lg font-semibold text-[var(--luxury-accent)]">
                    89%
                  </div>
                </div>

                <p className="mt-3 text-center text-sm font-semibold">
                  พร้อมเติบโตอย่างมีทิศทาง
                </p>

                <div className="mt-4 space-y-3 text-xs text-white/70">
                  {[
                    { label: "ทิศทางตลาด", value: "88%" },
                    { label: "ตำแหน่งทางตลาด", value: "87%" },
                    { label: "ข้อมูลในการตัดสินใจ", value: "92%" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span className="text-white/60">{item.value}</span>
                      </div>
                      <div className="progress-luxury h-2 w-full">
                        <div
                          className="progress-luxury-bar h-2 rounded-full"
                          style={{ width: item.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="relative overflow-hidden py-16 sm:py-20 scroll-mt-24">
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
              <span className="text-4xl font-semibold text-white sm:text-6xl md:text-7xl">4</span>{" "}
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
                  <div className="-mt-1 text-2xl font-semibold text-[var(--luxury-accent)]">
                    4,000+
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
                  <div className="-mt-4 text-[3rem] font-semibold text-[var(--luxury-accent)] sm:text-[3.6rem]">
                    4,000+
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
                  <span className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.96rem] font-semibold text-white">
                    250%
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
                  <span className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.96rem] font-semibold text-white">85%</span>
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

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-6 text-center mobile-shell desktop-shell-narrow">
          <p className="text-sm text-white/70 sm:text-2xl md:text-2xl">
            ไม่ใช่เพราะทำงานหนักขึ้น
          </p>
          <p className="mt-3 text-xl text-white/90 sm:text-3xl md:text-4xl">
            แต่เพราะเริ่มจากการ
          </p>
          <h2 className="mt-2 font-heading text-2xl leading-tight text-white sm:text-4xl md:text-6xl">
            กำหนดทิศทางการขายที่ชัดเจน
          </h2>

          <div className="mt-10 space-y-10 text-xl text-white/95 sm:text-3xl md:text-4xl">
            <div>
              <span className="font-semibold text-[var(--luxury-accent)] sm:text-5xl">
                เจ้าของธุรกิจ
              </span>
              <p className="mt-2 text-white/90 sm:text-4xl">
                มีเวลาเหลือมากขึ้น
              </p>
            </div>

            <div className="mx-auto h-10 w-px bg-[#FFBF5A]" />

            <div>
              <span className="font-semibold text-[var(--luxury-accent)] sm:text-5xl">
                ธุรกิจ
              </span>
              <p className="mt-2 text-white/90 sm:text-4xl">
                เติบโตอย่างเป็นระบบ
              </p>
            </div>

            <div className="mx-auto h-10 w-px bg-[#FFBF5A]" />

            <div>
              <span className="font-semibold text-[var(--luxury-accent)] sm:text-5xl">
                ทีมงาน
              </span>
              <p className="mt-2 text-white/90 sm:text-4xl">
                รู้ชัดว่าควรโฟกัสอะไร
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="h-10 w-px bg-[#FFBF5A]" />
          </div>
          <div className="mt-4 flex items-center justify-center text-[var(--luxury-accent)]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5v12m0 0l-5-5m5 5l5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-[var(--luxury-bg-elevated-1)] py-16 sm:py-20 scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="image-luxury relative overflow-hidden rounded-2xl bg-[var(--luxury-bg-elevated-2)] aspect-[4/5]">
              <Image
                src="/landing-hero/profile (25).png"
                alt="ORIGO profile"
                width={640}
                height={720}
                className="h-full w-full object-cover object-[75%_100%] scale-[1.16] -translate-y-[4%] transition-transform duration-500"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                ABOUT ME
              </div>
              <h2 className="font-heading text-2xl leading-tight text-white sm:text-4xl md:text-6xl max-w-3xl">
                ประสบการณ์{" "}
                <span className="whitespace-nowrap font-semibold text-[var(--luxury-accent)]">
                  18 ปี
                </span>
                <br />
                จากการทำตลาด
                <br />
                และความสำเร็จจริง
              </h2>
              <p className="mt-6 text-base text-white/65 sm:text-xl md:text-3xl">
                เราจะอยู่เป็นส่วนหนึ่งในทีมของคุณ
                <br />
                ทุกการตัดสินใจที่สำคัญ
              </p>
              <Link
                href="/who-we-are"
                className="btn-luxury mt-8 inline-flex w-full items-center justify-center rounded-md bg-[var(--luxury-accent)] px-7 py-3 text-base font-semibold text-[#0A0A0A] leading-none sm:w-auto sm:px-10 sm:py-4 sm:text-lg md:text-2xl"
              >
                <span className="relative z-10">ทำความรู้จัก ORIGO</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-8 pt-10 md:grid-cols-3 text-left">
            <div>
              <p className="text-2xl font-semibold text-white sm:text-4xl md:text-6xl">
                165+
              </p>
              <p className="mt-2 text-xl text-white/85 sm:text-2xl md:text-3xl">ประเทศ</p>
              <p className="mt-3 text-base text-white/50 sm:text-lg">
                ครอบคลุมวิเคราะห์สัญญาณ
                <br />
                ตลาดจากหลายภูมิภาคทั่วโลก
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white sm:text-4xl md:text-6xl">
                18+
              </p>
              <p className="mt-2 text-xl text-white/85 sm:text-2xl md:text-3xl">ปี</p>
              <p className="mt-3 text-base text-white/50 sm:text-lg">
                ประสบการณ์จริงในการทำ
                <br />
                Go-to-Market ระดับสากล
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white sm:text-4xl md:text-6xl">
                70,000+
              </p>
              <p className="mt-2 text-xl text-white/85 sm:text-2xl md:text-3xl">พาร์ตเนอร์</p>
              <p className="mt-3 text-base text-white/50 sm:text-lg">
                เครือข่ายการค้าและซัพพลายเชน
                <br />
                ที่เชื่อมโยงกันจริง
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative bg-[var(--luxury-bg-elevated-1)] py-16 sm:py-20 scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xl text-white/85 sm:text-2xl md:text-[2.875rem]">ช่วยคุณ</p>
                <h2 className="font-heading text-2xl font-semibold leading-tight text-[var(--luxury-accent)] sm:text-4xl md:text-6xl md:whitespace-nowrap">
                  วิเคราะห์และเลือกตลาด
                </h2>
                <p className="text-xl text-white/85 sm:text-2xl md:text-[2.875rem]">
                  รวมถึงผู้ซื้อจากทั่วโลก
                </p>
              </div>

              <p className="text-lg text-white/60 sm:text-xl md:text-[2.175rem] md:whitespace-nowrap">
                ให้คุณเข้าถึงกลุ่มลูกค้าเป้าหมายได้รวดเร็ว
              </p>

              <div className="space-y-4 text-base text-white/60 sm:text-lg md:text-[1.9575rem] md:whitespace-nowrap">
                {[
                  {
                    th: "มองเห็น",
                    en: "Market Signal",
                    icon: "/landing-hero/4.png",
                    alt: "Market signal icon",
                  },
                  {
                    th: "เลือกให้ถูก",
                    en: "Customer & Market Focus",
                    icon: "/landing-hero/5.png",
                    alt: "Market focus icon",
                  },
                  {
                    th: "ตัดสินใจอย่างมั่นใจ",
                    en: "Decision Clarity",
                    icon: "/landing-hero/6.png",
                    alt: "Decision clarity icon",
                  },
                ].map((item) => (
                  <div key={item.en} className="flex items-start gap-3">
                    <img
                      src={item.icon}
                      alt={item.alt}
                      className="mt-1 h-10 w-10"
                    />
                    <p>
                      <span className="text-white">{item.th}</span>
                      <span className="text-white/60"> - {item.en}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="image-luxury relative w-full aspect-[7/6] overflow-hidden rounded-[36px]">
              <Image
                src="/2.png"
                alt="Market insight overview"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--luxury-bg-elevated-1)] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 mobile-shell desktop-shell">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-white sm:text-4xl md:text-5xl">
              ผลลัพธ์จากลูกค้าของเรา
            </h2>
            <p className="mt-2 text-sm text-white/50">
              (อ้างอิงจากกรณีจริง ขอสงวนสิทธิ์ไม่เปิดเผยชื่อ)
            </p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      <section id="contact" className="relative bg-[var(--luxury-bg-elevated-1)] py-16 sm:py-20 scroll-mt-24">
        <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
          <div className="rounded-3xl border border-luxury-subtle bg-[var(--luxury-bg-elevated-2)] px-6 py-12 text-center shadow-luxury-xl sm:px-10 sm:py-16">
            <h2 className="font-heading text-xl font-semibold text-white sm:text-3xl md:text-5xl">
              จองเวลาเพื่อคุยกับเรา
            </h2>
            <p className="mt-3 text-base text-white/70 sm:text-xl md:text-3xl">
              ว่าธุรกิจของคุณ ควรวางแผนการเติบโตอย่างไร
            </p>

            <Link
              href="/contact"
              className="btn-luxury mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--luxury-accent)] px-7 py-3 text-base font-semibold text-[#0A0A0A] sm:w-auto sm:px-12 sm:py-5 sm:text-xl"
            >
              <span className="relative z-10">จองเวลา</span>
            </Link>

            <p className="mt-4 text-sm text-white/40 sm:text-lg">
              (จำกัด 5 บริษัทต่อเดือน)
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--luxury-bg-elevated-1)] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 mobile-shell desktop-shell">
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-white">
                  ORIG<span className="text-[var(--luxury-accent)]">O</span>
                </p>
                <p className="mt-3 text-sm text-[var(--luxury-text-tertiary)]">
                  Market Intelligence for International Trade
                </p>
              </div>

              <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--luxury-text-tertiary)]">
                {[
                  { label: 'เกี่ยวกับเรา', href: '#about' },
                  { label: 'ผลลัพธ์', href: '#results' },
                  { label: 'บริการ', href: '#services' }
                ].map((link, index, arr) => (
                  <span key={link.label} className="flex items-center gap-6">
                    <a
                      href={link.href}
                      className="link-luxury hover:text-[var(--luxury-accent)] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                    {index < arr.length - 1 && (
                      <span className="text-[var(--luxury-text-disabled)]">·</span>
                    )}
                  </span>
                ))}
              </nav>

              <p className="text-xs text-[var(--luxury-text-disabled)]">
                © 2026 ORIGO. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
