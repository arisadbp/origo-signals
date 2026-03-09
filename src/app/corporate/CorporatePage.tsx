"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import TopNav from "@/components/landing/TopNav";

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
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

const corporateLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
/* ─── Section 1: Hero — One clear message ─── */
function HeroSection() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center bg-[var(--luxury-bg-base)] snap-start overflow-hidden">
      {/* Minimal ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--luxury-accent)]/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo animation */}
        <div className="w-24 h-24 md:w-32 md:h-32 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
            <circle
              className="animate-[squishRing_0.6s_cubic-bezier(.28,.84,.42,1)_infinite_alternate_0.3s]"
              cx="110" cy="110" r="45"
              stroke="var(--luxury-accent)" strokeWidth="30" fill="none"
              style={{ transformOrigin: "110px 155px" }}
            />
            <circle
              className="animate-[jumpDot_0.6s_cubic-bezier(.28,.84,.42,1)_infinite_alternate]"
              cx="45" cy="45" r="15"
              fill="var(--luxury-accent)"
              style={{ transformOrigin: "45px 45px" }}
            />
          </svg>
        </div>

        <h1 className="animate-fade-in-up font-heading font-black text-white leading-[1.05] tracking-tight text-[clamp(2.8rem,7vw,5.5rem)]" style={{ animationDelay: "0.2s" }}>
          <span className="text-white">Focus the </span>
          <span className="text-[var(--luxury-accent)]">8%</span>
        </h1>

        <p className="mt-3 animate-fade-in-up font-heading text-white/30 font-medium tracking-wide text-[clamp(1rem,2.5vw,1.5rem)]" style={{ animationDelay: "0.35s" }}>
          Design the 92%
        </p>

        <p className="mt-8 animate-fade-in-up text-white/50 text-sm md:text-base max-w-lg leading-relaxed" style={{ animationDelay: "0.5s" }}>
          We help businesses focus on what truly drives growth — customers, relationships, and strategy — while intelligent systems handle everything else.
        </p>

        {/* Single CTA */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.65s" }}>
          <a
            href="#about"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--luxury-accent)] px-8 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(255,189,89,0.25)]"
          >
            Start with ORIGO
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0A0A0A]/20 transition-transform duration-300 group-hover:rotate-45">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: About — Clean split layout ─── */
function AboutSection() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section id="about" className="relative h-screen flex items-center bg-[var(--luxury-bg-base)] snap-start overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <div
            ref={r1.ref}
            className={`transition-all duration-1000 ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="relative group">
              <div className="relative w-full aspect-[3/4] max-w-[320px] mx-auto rounded-2xl overflow-hidden">
                <Image
                  src="/landing-hero/ceo-v2.jpg"
                  alt="Executive Leadership"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Minimal accent corner */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-[var(--luxury-accent)]/30 rounded-br-2xl" />
            </div>
          </div>

          {/* Text */}
          <div
            ref={r2.ref}
            className={`transition-all duration-1000 delay-200 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--luxury-accent)]/80 mb-6">
              About ORIGO
            </p>

            <h2 className="font-heading text-2xl md:text-4xl font-bold text-white leading-[1.2]">
              Over{" "}
              <span className="text-[var(--luxury-accent)]">18 years</span>
              <br />
              in international trade
            </h2>

            <div className="mt-6 w-12 h-px bg-white/10" />

            <p className="mt-6 text-white/50 text-sm md:text-base leading-[1.9]">
              Our leadership team has deep expertise in export and global trade, specializing in matching manufacturers, exporters, and major buyers across industries worldwide.
            </p>

            <p className="mt-4 text-white/40 text-sm md:text-base leading-[1.9]">
              In 2024, we combined these capabilities to create ORIGO — a service that helps SME businesses reach target customers in global markets faster and grow sustainably.
            </p>

            {/* Stats — minimal */}
            <div className="mt-10 flex gap-10">
              {[
                { val: 18, suf: "+", lab: "Years" },
                { val: 165, suf: "+", lab: "Countries" },
                { val: 70, suf: "K+", lab: "Partners" },
              ].map((s) => (
                <div key={s.lab}>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    <Counter end={s.val} suffix={s.suf} />
                  </p>
                  <p className="mt-1 text-[11px] text-white/35 uppercase tracking-wider">{s.lab}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Experience — 92% vs 8% ─── */
function ExperienceSection() {
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <section id="experience" className="relative h-screen flex items-center bg-[var(--luxury-bg-base)] snap-start overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        {/* Header */}
        <div
          ref={r1.ref}
          className={`transition-all duration-700 ${r1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--luxury-accent)]/80 mb-6">
            Our Insight
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white leading-[1.3] max-w-2xl">
            Growth doesn&apos;t come from doing everything at once
          </h2>
          <p className="mt-3 text-white/40 text-base md:text-lg max-w-xl">
            It comes from focusing on what truly matters
          </p>
        </div>

        {/* 92% vs 8% comparison */}
        <div
          ref={r2.ref}
          className={`mt-14 md:mt-16 transition-all duration-700 delay-200 ${r2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-center">
            {/* 92% — faded */}
            <div className="text-center md:text-right md:pr-12">
              <span className="text-5xl md:text-7xl font-black text-white/[0.07] leading-none">92%</span>
              <p className="mt-3 text-white/30 text-sm leading-relaxed max-w-xs mx-auto md:ml-auto md:mr-0">
                Operational work that systems can handle
                <br />
                <span className="text-white/20">Data · Processes · Coordination</span>
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </div>
            <div className="md:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* 8% — hero moment */}
            <div className="text-center md:text-left md:pl-12 relative">
              {/* Subtle glow behind */}
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,189,89,0.04) 0%, transparent 70%)",
                  animation: r2.visible ? "goldGlowPulse 5s ease-in-out infinite" : "none",
                }}
              />
              <span
                className="relative text-5xl md:text-7xl font-black text-[var(--luxury-accent)] leading-none"
                style={{
                  textShadow: r2.visible ? "0 0 80px rgba(255,189,89,0.2)" : "none",
                }}
              >
                8%
              </span>
              <p className="relative mt-3 text-white/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                What truly drives long-term growth
                <br />
                <span className="text-[var(--luxury-accent)]/70 font-medium">Customers · Relationships · Strategy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Services — Clean cards ─── */
function HowItWorksSection() {
  const rv = useReveal();

  const cards = [
    {
      num: "01",
      title: "Market Intelligence Platform",
      desc: "Access real-time market intelligence and operational insights in one place.",
      detail: "Origo replaces fragmented spreadsheets and delayed reports with a unified platform designed for international suppliers and manufacturers.",
      values: ["Real-time market signals", "Operational dashboards", "Clear business insights"],
    },
    {
      num: "02",
      title: "Business Intelligence Structuring",
      desc: "Every company holds its own internal intelligence — shaped by experience, culture, and resources.",
      detail: "Origo helps structure this knowledge into a system that supports better decision-making.",
      values: ["Organize internal business knowledge", "Turn experience into structured insights", "Build a clearer strategic perspective"],
    },
    {
      num: "03",
      title: "AI Decision Support",
      desc: "Origo uses AI and automation to handle operational complexity, allowing leaders to focus on relationships, trust, and long-term strategic decisions.",
      detail: "",
      values: ["AI-assisted analysis", "Process automation", "Strategic decision support"],
    },
  ];

  return (
    <section id="services" className="relative min-h-screen flex flex-col justify-center py-20 bg-[var(--luxury-bg-elevated-1)] snap-start overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {/* Header */}
        <div
          ref={rv.ref}
          className={`text-center mb-16 transition-all duration-700 ${rv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40 mb-4">
            Our Services
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-white">
            How It <span className="text-[var(--luxury-accent)]">Works</span>
          </h2>
          <p className="mt-3 text-white/40 text-sm md:text-base max-w-lg mx-auto">
            Three integrated layers designed to give you clarity, structure, and strategic advantage.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card, i) => {
            const cr = useReveal();
            return (
              <div
                key={card.num}
                ref={cr.ref}
                className={`group rounded-2xl p-6 md:p-7 border border-white/[0.04] bg-white/[0.02] transition-all duration-700 hover:border-[var(--luxury-accent)]/15 hover:bg-white/[0.04] flex flex-col ${
                  cr.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <span className="text-[var(--luxury-accent)]/50 text-xs font-mono">{card.num}</span>
                <h3 className="mt-4 text-base md:text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-white/45 text-sm leading-[1.8]">{card.desc}</p>
                {card.detail && (
                  <p className="mt-2 text-white/30 text-sm leading-[1.8]">{card.detail}</p>
                )}

                {/* Key Values */}
                <div className="mt-auto pt-5 space-y-2.5 border-t border-white/[0.04]">
                  <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--luxury-accent)]/60">Key Value</span>
                  {card.values.map((v, vi) => (
                    <div key={vi} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[var(--luxury-accent)]/40 shrink-0" />
                      <span className="text-white/50 text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/signals"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--luxury-accent)] px-8 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(255,189,89,0.25)]"
          >
            Start with Origo Signals
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0A0A0A]/20 transition-transform duration-300 group-hover:rotate-45">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: Contact / Footer ─── */
function CorporateFooter() {
  return (
    <footer id="contact" className="relative h-screen flex flex-col items-center justify-center bg-[var(--luxury-bg-base)] snap-start">
      <div className="text-center px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/30 mb-8">
          Contact
        </p>

        <h2 className="font-heading text-2xl md:text-4xl font-bold text-white">
          Ready to grow together?
        </h2>

        <p className="mt-4 text-white/40 text-sm md:text-base max-w-md mx-auto">
          Book a consultation to discover how ORIGO can help your business expand into global markets with clarity and confidence.
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center px-10 py-4 rounded-full bg-[var(--luxury-accent)] text-sm font-semibold text-[#0A0A0A] transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(255,189,89,0.25)]"
        >
          Book a Consultation
        </Link>

        <p className="mt-4 text-white/20 text-xs">
          Limited to 5 companies per month
        </p>
      </div>

      {/* Footer credits */}
      <div className="absolute bottom-8 text-center">
        <p className="text-white/15 text-xs">
          © {new Date().getFullYear()} ORIGO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function CorporateHomePage() {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory bg-[var(--luxury-bg-base)] text-white scroll-smooth custom-scrollbar">
      <TopNav links={corporateLinks} ctaLabel="Login" ctaHref="https://www.origo-ai.com" ctaExternal />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <HowItWorksSection />
      <CorporateFooter />
    </main>
  );
}

export { AboutSection, ExperienceSection, HowItWorksSection, CorporateFooter, CorporateNav };
