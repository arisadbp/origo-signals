export function HeroSection() {
  return (
    <section
      id="top"
      className="scroll-mt-24 relative min-h-[75vh] md:min-h-screen flex items-center bg-[#050505] pt-12 pb-4 md:pt-16 md:pb-12 lg:pt-20 lg:pb-16 overflow-hidden dot-pattern"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
        <div className="absolute inset-0 dot-pattern opacity-80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-block mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <span className="px-4 py-2 rounded-full glass-card text-sm font-mono text-[#FFB347]">
            MARKET SIGNAL
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.2] sm:leading-[1.15] md:leading-[1.1] lg:leading-[1.05] tracking-tight max-w-5xl mx-auto">
          <span className="block animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            บ่อยครั้งไหม…
          </span>
          <span className="block animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            คุณกำลัง{" "}
            <span className="gradient-text-premium font-heading">
              ทำงานหนัก
            </span>
          </span>
          <span className="block animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
            แต่ไม่แน่ใจว่ามาถูกทาง
          </span>
        </h1>

        <div className="mt-8 space-y-4 text-white/70 text-base md:text-lg font-body max-w-3xl mx-auto">
          <p className="animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
            <span className="gradient-text-premium font-semibold">ยอดขายต่างประเทศ</span>{" "}
            ยังไม่โต แม้ลงทุนเพิ่ม
          </p>
          <p className="animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
            เครื่องมือมากขึ้น แต่{" "}
            <span className="gradient-text-premium font-semibold">
              ความชัดเจนน้อยลง
            </span>
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 md:mt-16 animate-fade-in-up" style={{ animationDelay: "0.65s" }}>
          <a
            href="#services"
            className="inline-flex flex-col items-center gap-2 text-white/50 hover:text-[#FFB347] transition-smooth group cursor-pointer"
            aria-label="Scroll to next section"
          >
            <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
            <svg
              className="w-6 h-6 animate-bounce group-hover:translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
