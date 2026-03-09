import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/landing/TopNav";

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen bg-[#0f1012] text-white">
      <TopNav />

      {/* ── HERO: Full-bleed editorial cover ── */}
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <Image
          src="/who-we-are/hero-office.png"
          alt="ORIGO office"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#0f1012]" />

        <div className="relative z-10 flex h-full flex-col justify-end pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <span className="mb-6 inline-flex items-center rounded-full border border-[#FFB347]/40 bg-black/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.5em] text-[#FFB347] backdrop-blur-sm">
              About ORIGO
            </span>
            <h1 className="font-heading text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
              <span className="block text-[#6d6e71]">WHO</span>
              <span className="block">
                WE <span className="text-[#FFB347]">ARE</span>
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL INTRO: Magazine two-column ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          {/* Large pull-quote */}
          <div className="mb-16 border-l-2 border-[#FFB347] pl-8 md:pl-12">
            <p className="font-heading text-2xl font-light leading-relaxed text-white/90 sm:text-3xl md:text-4xl lg:text-5xl">
              ประสบการณ์มากกว่า <span className="font-bold text-[#FFB347]">18 ปี</span><br className="hidden md:block" />
              ในธุรกิจส่งออกและการค้าระหว่างประเทศ
            </p>
          </div>

          {/* Two-column magazine layout */}
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-6 text-base leading-[1.85] text-white/65 sm:text-lg">
              <p>
                ทีมผู้บริหารของเราเชี่ยวชาญในการจับคู่ผู้ผลิต ผู้ส่งออก
                และผู้ซื้อรายใหญ่ในระดับ Global Supply Chain จากหลากหลายอุตสาหกรรม
              </p>
              <p>
                ในปี 2024 เรารวมทักษะและความเชี่ยวชาญเหล่านี้ เพื่อสร้าง <span className="font-semibold text-white">ORIGO</span> –
                บริการที่ช่วยผู้ประกอบการ SME
                เข้าถึงลูกค้ากลุ่มเป้าหมายในตลาดโลกได้เร็วขึ้นและเติบโตได้อย่างยั่งยืน
              </p>
            </div>

            <div className="flex items-start">
              <div className="rounded-2xl border border-white/10 bg-[#16171b] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <p className="text-base leading-[1.85] text-white/70 sm:text-lg">
                  ประสบการณ์ที่ทำให้เราเข้าใจว่า{" "}
                  <span className="font-semibold text-white">&ldquo;ตลาดโลก&rdquo;</span> ไม่ได้ไกล&mdash;
                  <span className="font-semibold text-white">เครื่องมือที่ดี</span>{" "}
                  ช่วยให้มองหาโอกาสได้เร็วขึ้น เข้าถึงกลุ่มลูกค้าได้ง่ายขึ้น
                  และลดต้นทุนของธุรกิจ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO EDITORIAL: CEO Working ── */}
      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid items-center gap-0 md:grid-cols-[1.1fr_0.9fr]">
            {/* Image — full bleed left */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-r-none md:rounded-l-2xl">
              <Image
                src="/who-we-are/ceo-working.jpg"
                alt="CEO working at ORIGO office"
                fill
                className="object-cover object-[30%_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f1012]/80 hidden md:block" />
            </div>

            {/* Text — right */}
            <div className="bg-[#14151a] p-10 md:p-16 rounded-2xl md:rounded-l-none md:rounded-r-2xl border border-white/5 md:border-l-0">
              <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.4em] text-[#FFB347]">
                Leadership
              </span>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                โฟกัสในสิ่งที่<br />
                <span className="text-[#FFB347]">ถูกต้อง</span>
              </h2>
              <p className="mt-6 text-base leading-[1.85] text-white/60 sm:text-lg">
                จากงานวิจัยและแนวคิดด้านการจัดการที่ใช้กันในองค์กรชั้นนำ 1%
                เราพบว่าสิ่งที่ทำให้ธุรกิจเติบโตได้ไม่ใช่การทำทุกอย่างพร้อมกัน
                แต่คือการโฟกัสในสิ่งที่ถูกต้อง
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 92% / 8% BELIEF SECTION ── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.4em] text-[#FFB347]">
              What We Believe
            </span>
            <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              สิ่งที่เราเชื่อ
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
            {/* 92% card */}
            <div className="flex flex-col justify-center rounded-2xl border border-white/8 bg-[#14151a] p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-10">
              <p className="text-base text-white/55 sm:text-lg">
                ธุรกิจส่วนใหญ่มีโอกาสในการเติบโต
              </p>
              <div className="my-4 font-mono text-6xl font-bold text-[#555] md:text-7xl">
                92<span className="text-4xl text-[#555]/60 md:text-5xl">%</span>
              </div>
              <p className="text-base leading-relaxed text-white/55 sm:text-lg">
                ไปกับงานระบบ ข้อมูล และการประสานงาน
                ซึ่งควรถูกจัดการด้วยระบบและเทคโนโลยี{" "}
                <span className="font-semibold text-white">(Ai)</span>
              </p>
            </div>

            {/* 8% card — hero accent */}
            <div className="flex flex-col justify-center rounded-2xl border border-[#FFB347]/20 bg-[#14151a] p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5),_0_0_60px_rgba(255,179,71,0.15)] md:p-14">
              <p className="text-lg text-white sm:text-xl md:text-2xl">
                เพื่อให้ผู้บริหารมีเวลาเหลือไปโฟกัสกับ
              </p>
              <div className="my-5 font-mono text-7xl font-bold text-[#FFB347] sm:text-8xl md:text-9xl">
                8<span className="text-5xl text-[#FFB347]/70 md:text-6xl">%</span>
              </div>
              <p className="text-lg leading-relaxed text-white/80 sm:text-xl md:text-2xl">
                ที่สำคัญที่สุด — ลูกค้า ความสัมพันธ์ และ
                การตัดสินใจเชิงกลยุทธ์เพื่อการเติบโต
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE BUILDING — Full-width editorial break ── */}
      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
            <Image
              src="/who-we-are/office-building.jpg"
              alt="ORIGO headquarters"
              fill
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#FFB347]">
                Headquarters
              </span>
              <p className="mt-2 text-lg font-light text-white/80 md:text-xl">
                บริษัท โอริโก้ คอนซัลติ้ง จำกัด
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h4 className="font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            พร้อมที่จะเริ่มต้น<br className="sm:hidden" />กับเราหรือยัง?
          </h4>
          <p className="mt-4 text-base text-white/50 sm:text-lg">
            ให้เราช่วยคุณวางแผนตลาดที่สร้างกลยุทธ์การเติบโตที่ยั่งยืน
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FFB347] px-10 py-3.5 text-sm font-semibold text-[#1a1a1a] shadow-[0_14px_30px_rgba(255,179,71,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,179,71,0.35)]"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>
    </main>
  );
}
