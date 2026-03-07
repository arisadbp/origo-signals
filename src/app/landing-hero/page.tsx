import Image from "next/image";
import Link from "next/link";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import TopNav from "@/components/landing/TopNav";
import ValueStatementSection from "@/components/landing/ValueStatementSection";
import ResultsSection from "@/components/landing/ResultsSection";

export default function LandingHeroClonePage() {
  return (
    <main className="min-h-screen bg-[var(--luxury-bg-base)] text-white">
      <TopNav />

      {/* ─── Hero ─── */}
      <section id="hero" className="relative overflow-hidden bg-[var(--luxury-bg-base)]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/landing-hero/hero-7.png')] bg-cover bg-center bg-no-repeat opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/70 to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--luxury-bg-base)] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-center px-6 py-24 sm:py-32 md:py-36 md:items-end">
          <div className="w-full max-w-lg md:ml-auto md:mr-0">
            <h1 className="font-heading leading-[1.1]">
              <span className="block text-white text-[clamp(1.4rem,3.5vw,2.5rem)]">
                บ่อยครั้งไหม...คุณกำลัง
              </span>
              <span className="mt-2 block font-bold text-[var(--luxury-accent)] text-[clamp(2rem,5.5vw,4rem)]">
                "ทำงานหนัก"
              </span>
              <span className="mt-2 block text-white/70 text-[clamp(1.1rem,2.8vw,2rem)]">
                แต่ไม่แน่ใจว่ามาถูกทาง?
              </span>
            </h1>

            <div className="mt-8 space-y-2 text-white/50 text-sm md:text-base">
              <p>ยอดขายต่างประเทศยังไม่โต แม้ลงทุนเพิ่ม</p>
              <p>เครื่องมือมากขึ้น แต่ความชัดเจนน้อยลง</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA: Assessment ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid gap-14 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-white leading-[1.3]">
                คำถามเพียง <span className="text-[var(--luxury-accent)]">3 นาที</span>
                <br />
                <span className="text-white/50 font-normal text-lg md:text-2xl">ที่จะพาคุณออกจากจุดเดิม</span>
              </h2>

              <div className="mt-8 space-y-3">
                {[
                  "กำหนดทิศทางได้แม่นยำขึ้น",
                  "เพิ่มโอกาสปิดการขาย",
                  "มีเครื่องมือที่ดีกว่าเดิม",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--luxury-accent)]/10 text-[var(--luxury-accent)] text-xs">✓</span>
                    <p className="text-white/50 text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/quiz/lead-info"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--luxury-accent)] px-8 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(255,189,89,0.25)]"
              >
                เริ่มประเมิน (ฟรี)
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0A0A0A]/20 transition-transform duration-300 group-hover:rotate-45">→</span>
              </Link>
            </div>

            {/* Score preview card */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
              <p className="text-xs text-white/40 uppercase tracking-wider">Market Signal Score</p>

              <div className="mt-6 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--luxury-accent)]/30 text-2xl font-bold text-[var(--luxury-accent)]">
                  89%
                </div>
              </div>

              <p className="mt-4 text-center text-sm font-medium text-white/70">
                พร้อมเติบโตอย่างมีทิศทาง
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { label: "ทิศทางตลาด", value: "88%" },
                  { label: "ตำแหน่งทางตลาด", value: "87%" },
                  { label: "ข้อมูลในการตัดสินใจ", value: "92%" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">{item.label}</span>
                      <span className="text-white/30">{item.value}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/[0.04]">
                      <div
                        className="h-1 rounded-full bg-[var(--luxury-accent)]/60"
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ResultsSection />
      <ValueStatementSection />

      {/* ─── About ─── */}
      <section id="about" className="relative py-20 sm:py-28 scroll-mt-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl bg-[var(--luxury-bg-elevated-2)] aspect-[3/4] max-w-[400px]">
              <Image
                src="/landing-hero/profile (25).png"
                alt="ORIGO profile"
                width={640}
                height={720}
                className="h-full w-full object-cover object-[75%_100%] scale-[1.1] transition-transform duration-500"
              />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30 mb-4">
                About
              </p>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-white leading-[1.3]">
                ประสบการณ์{" "}
                <span className="text-[var(--luxury-accent)]">18 ปี</span>
                <br />
                จากการทำตลาดและความสำเร็จจริง
              </h2>
              <p className="mt-6 text-white/40 text-sm md:text-base leading-relaxed">
                เราจะอยู่เป็นส่วนหนึ่งในทีมของคุณ ทุกการตัดสินใจที่สำคัญ
              </p>
              <Link
                href="/who-we-are"
                className="mt-8 inline-flex items-center px-8 py-3 rounded-full bg-[var(--luxury-accent)] text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:brightness-110"
              >
                ทำความรู้จัก ORIGO
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center md:text-left">
            {[
              { num: "165+", label: "ประเทศ", desc: "วิเคราะห์สัญญาณตลาดทั่วโลก" },
              { num: "18+", label: "ปี", desc: "ประสบการณ์ Go-to-Market ระดับสากล" },
              { num: "70K+", label: "พาร์ตเนอร์", desc: "เครือข่ายการค้าที่เชื่อมโยงกันจริง" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-white">{s.num}</p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
                <p className="mt-2 text-xs text-white/30 hidden md:block">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="relative py-20 sm:py-28 scroll-mt-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-white leading-[1.3]">
                ช่วยคุณ
                <span className="text-[var(--luxury-accent)]"> วิเคราะห์และเลือกตลาด</span>
                <br />
                <span className="text-white/50 font-normal text-lg md:text-2xl">รวมถึงผู้ซื้อจากทั่วโลก</span>
              </h2>

              <div className="mt-8 space-y-4">
                {[
                  { th: "มองเห็น", en: "Market Signal", icon: "/landing-hero/4.png" },
                  { th: "เลือกให้ถูก", en: "Customer & Market Focus", icon: "/landing-hero/5.png" },
                  { th: "ตัดสินใจอย่างมั่นใจ", en: "Decision Clarity", icon: "/landing-hero/6.png" },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-3">
                    <img src={item.icon} alt={item.en} className="h-8 w-8 opacity-80" />
                    <p className="text-sm">
                      <span className="text-white/70 font-medium">{item.th}</span>
                      <span className="text-white/30 ml-2">{item.en}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/2.png" alt="Market insight" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              ผลลัพธ์จากลูกค้าของเรา
            </h2>
            <p className="mt-2 text-xs text-white/30">
              อ้างอิงจากกรณีจริง ขอสงวนสิทธิ์ไม่เปิดเผยชื่อ
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section id="contact" className="relative py-20 sm:py-28 scroll-mt-24">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-16 md:px-16">
            <h2 className="font-heading text-xl md:text-3xl font-bold text-white">
              จองเวลาเพื่อคุยกับเรา
            </h2>
            <p className="mt-3 text-white/40 text-sm md:text-base">
              ว่าธุรกิจของคุณ ควรวางแผนการเติบโตอย่างไร
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center px-10 py-4 rounded-full bg-[var(--luxury-accent)] text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(255,189,89,0.25)]"
            >
              จองเวลา
            </Link>

            <p className="mt-4 text-white/20 text-xs">จำกัด 5 บริษัทต่อเดือน</p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-lg font-semibold text-white/80 tracking-tight">
            ORIG<span className="text-[var(--luxury-accent)]">O</span>
          </p>
          <p className="mt-2 text-xs text-white/20">
            Market Intelligence for International Trade
          </p>

          <nav className="mt-6 flex items-center justify-center gap-6 text-xs text-white/25">
            {[
              { label: "เกี่ยวกับเรา", href: "#about" },
              { label: "บริการ", href: "#services" },
              { label: "ผลลัพธ์", href: "#results" },
            ].map((link, i, arr) => (
              <span key={link.label} className="flex items-center gap-6">
                <a href={link.href} className="hover:text-white/50 transition-colors">{link.label}</a>
                {i < arr.length - 1 && <span className="text-white/10">·</span>}
              </span>
            ))}
          </nav>

          <p className="mt-8 text-[10px] text-white/10">
            © 2026 ORIGO. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
