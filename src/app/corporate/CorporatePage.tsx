"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal();
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(end * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Nav ─── */
function CorporateNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link href="/">
          <Image src="/LOGO_ORI.png" alt="ORIGO" width={130} height={36} className="h-8 md:h-10 w-auto" priority />
        </Link>
        <Link
          href="/signals"
          className="btn-gold text-sm px-5 py-2.5"
        >
          Origo Signals →
        </Link>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ffbd59]/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 pt-28 pb-20 md:pt-32 md:pb-28 text-center">
        {/* 92% */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block text-[clamp(5rem,14vw,10rem)] font-bold leading-none tracking-tighter text-white/[0.06] select-none">
            92%
          </span>
          <h2 className="mt-[-0.5em] text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white">
            Automation
          </h2>
          <p className="mt-4 text-white/60 text-[clamp(0.95rem,2vw,1.25rem)] max-w-2xl mx-auto leading-relaxed">
            เมื่อระบบจัดการข้อมูลและกระบวนการทำงานส่วนใหญ่โดยอัตโนมัติ
          </p>
        </div>

        {/* Divider */}
        <div className="my-10 md:my-14 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#ffbd59]/30" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd59]/60 animate-pulse-glow" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ffbd59]/30" />
        </div>

        {/* 8% */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <span className="inline-block text-[clamp(4rem,12vw,8rem)] font-bold leading-none tracking-tighter gradient-text-premium select-none">
            8%
          </span>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-white">
            Human Genius
          </h2>
          <p className="mt-4 text-white/60 text-[clamp(0.95rem,2vw,1.25rem)] max-w-2xl mx-auto leading-relaxed">
            คุณจึงโฟกัสกับการตัดสินใจที่สำคัญที่สุด
          </p>
        </div>

        {/* Body */}
        <div className="mt-14 md:mt-20 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <p className="text-white/50 text-[clamp(0.9rem,1.8vw,1.1rem)] leading-[1.8]">
            ORIGO ออกแบบ Intelligence System
            <br className="hidden sm:block" />
            ที่ช่วยเปลี่ยนข้อมูลจำนวนมากให้กลายเป็น
            <br className="hidden sm:block" />
            <span className="text-white/80">มุมมองตลาดที่เข้าใจง่ายและนำไปใช้ได้จริง</span>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          <Link
            href="/signals"
            className="btn-luxury btn-gold inline-flex items-center gap-2 text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4"
          >
            เริ่มต้นกับ Origo Signals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 md:mt-24 animate-fade-in-up" style={{ animationDelay: "1.1s" }}>
          <a href="#about" className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-[#ffbd59]/60 transition-colors">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Scroll</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function AboutSection() {
  const r1 = useReveal();
  const r2 = useReveal();

  const dataPoints = [
    { icon: "📊", label: "ตลาดและแนวโน้มอุตสาหกรรม" },
    { icon: "🤝", label: "ผู้ซื้อและเครือข่ายธุรกิจ" },
    { icon: "🏭", label: "กำลังการผลิตและซัพพลายเชน" },
    { icon: "⚔️", label: "โครงสร้างการแข่งขัน" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">
        {/* Label */}
        <div
          ref={r1.ref}
          className={`transition-all duration-700 ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#ffbd59]/20 text-[#ffbd59]/80 text-xs font-mono uppercase tracking-[0.15em] mb-8">
            About ORIGO
          </span>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — text */}
          <div
            ref={r2.ref}
            className={`transition-all duration-700 delay-200 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-white">
              From Information
              <br />
              to <span className="gradient-text-premium">Intelligence</span>
            </h2>

            <div className="mt-8 space-y-5 text-white/55 text-[clamp(0.9rem,1.6vw,1.05rem)] leading-[1.8]">
              <p>
                ORIGO ก่อตั้งขึ้นจากประสบการณ์การทำธุรกิจระหว่างประเทศ
                และการวิเคราะห์ตลาดมากกว่า <span className="text-white/90 font-semibold">18 ปี</span>
              </p>
              <p>
                เราเชื่อว่าข้อมูลเพียงอย่างเดียวไม่สร้างความได้เปรียบ
                <br />
                สิ่งสำคัญคือการเปลี่ยนข้อมูลให้กลายเป็น
                <br />
                <span className="text-[#ffbd59]/90 font-medium">ระบบความเข้าใจตลาด (Intelligence System)</span>
              </p>
            </div>
          </div>

          {/* Right — data points */}
          <div className="space-y-4">
            {dataPoints.map((dp, i) => {
              const rv = useReveal();
              return (
                <div
                  key={dp.label}
                  ref={rv.ref}
                  className={`card-luxury rounded-xl p-5 flex items-center gap-4 transition-all duration-500 ${
                    rv.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <span className="text-2xl">{dp.icon}</span>
                  <span className="text-white/80 text-sm md:text-base">{dp.label}</span>
                </div>
              );
            })}

            <p className="text-white/40 text-sm mt-6 pl-1 leading-relaxed">
              ให้กลายเป็นภาพรวมที่เข้าใจได้ทันที
              <br />
              เพื่อให้ผู้บริหารมองเห็นโอกาสและความเสี่ยงได้ชัดเจนขึ้น
            </p>
          </div>
        </div>

        {/* Proof points */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: 18, suffix: " ปี", label: "ประสบการณ์" },
            { value: 70, suffix: "K+", label: "เครือข่ายพาร์ทเนอร์" },
            { value: 165, suffix: "+", label: "ประเทศทั่วโลก" },
            { value: 4, suffix: "B+", label: "ยอดขายที่สร้างให้ลูกค้า (บาท)" },
          ].map((s) => {
            const rv = useReveal();
            return (
              <div
                key={s.label}
                ref={rv.ref}
                className={`text-center transition-all duration-700 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <div className="text-[clamp(2rem,5vw,3rem)] font-bold data-counter gradient-text-premium">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-white/40 text-xs md:text-sm">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const cards = [
    {
      phase: "01",
      title: "Get Clarity",
      subtitle: "Data Intelligence Phase",
      body: "เปลี่ยนข้อมูลตลาด ผู้ซื้อ และกำลังการผลิต ให้เป็นภาพข้อมูลที่เข้าใจง่ายผ่าน Dashboard",
      points: ["ธุรกิจของคุณอยู่ตรงไหนในตลาด", "ใครคือคู่แข่งสำคัญ", "โอกาสอยู่ที่ใด"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      phase: "02",
      title: "Get Connected",
      subtitle: "Market Activation Phase",
      body: "ใช้ฐานข้อมูลและการวิเคราะห์รูปแบบตลาด เพื่อค้นหาประเทศและผู้ซื้อที่เหมาะกับธุรกิจของคุณ",
      points: ["เข้าถึงตลาดใหม่อย่างมีทิศทาง"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      phase: "03",
      title: "Get Ahead",
      subtitle: "Action & Growth Phase",
      body: "ไม่ใช่แค่วิเคราะห์ข้อมูล แต่ช่วยแนะนำก้าวต่อไปของธุรกิจ พร้อมอัปเดตข้อมูลตลาดและคำแนะนำเชิงกลยุทธ์อย่างต่อเนื่อง",
      points: ["แนะนำก้าวต่อไปของธุรกิจ"],
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 md:py-36 bg-[#111215] overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">
        {/* Section header */}
        {(() => {
          const rv = useReveal();
          return (
            <div
              ref={rv.ref}
              className={`text-center mb-16 md:mb-20 transition-all duration-700 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#ffbd59]/20 text-[#ffbd59]/80 text-xs font-mono uppercase tracking-[0.15em] mb-6">
                How It Works
              </span>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-white">
                ORIGO ทำงานอย่างไร
              </h2>
            </div>
          );
        })()}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
          {cards.map((card, i) => {
            const rv = useReveal();
            return (
              <div
                key={card.phase}
                ref={rv.ref}
                className={`card-luxury rounded-2xl p-6 md:p-7 flex flex-col transition-all duration-700 ${
                  rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Phase number */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#ffbd59]/10 flex items-center justify-center text-[#ffbd59]">
                    {card.icon}
                  </div>
                  <span className="text-white/20 text-xs font-mono">{card.phase}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{card.title}</h3>
                <p className="text-[#ffbd59]/70 text-xs font-mono uppercase tracking-wider mb-4">{card.subtitle}</p>

                <p className="text-white/50 text-sm leading-[1.7] flex-1">{card.body}</p>

                {/* Points */}
                <ul className="mt-5 space-y-2">
                  {card.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-white/60 text-sm">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#ffbd59]/60 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {(() => {
          const rv = useReveal();
          return (
            <div
              ref={rv.ref}
              className={`text-center mt-16 md:mt-20 transition-all duration-700 delay-300 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Link
                href="/signals"
                className="btn-luxury btn-gold inline-flex items-center gap-2 text-base px-8 py-3.5"
              >
                เริ่มต้นกับ Origo Signals
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function CorporateFooter() {
  return (
    <footer className="py-12 md:py-16 bg-[#0A0A0A] border-t border-white/5">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Image src="/LOGO_ORI.png" alt="ORIGO" width={100} height={28} className="h-7 w-auto opacity-40" />
        <p className="text-white/25 text-xs text-center md:text-right">
          © {new Date().getFullYear()} ORIGO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function CorporateHomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <CorporateNav />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <CorporateFooter />
    </main>
  );
}
