import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/landing/TopNav";

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen bg-[#0f1012] text-white">
      <TopNav />

      {/* ── COMPACT HEADER + INTRO ── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FFB347] rounded-full opacity-[0.04] blur-[180px]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          {/* Badge + Title row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-5 inline-flex items-center rounded-full border border-[#FFB347]/30 bg-[#FFB347]/[0.06] px-4 py-1.5 text-[10px] uppercase tracking-[0.5em] text-[#FFB347] backdrop-blur-sm">
                About ORIGO
              </span>
              <h1 className="font-heading text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-[#6d6e71]">WHO </span>
                WE <span className="text-[#FFB347]">ARE</span>
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/50 md:text-right md:text-lg">
              ประสบการณ์มากกว่า 18 ปี ในธุรกิจส่งออกและการค้าระหว่างประเทศ
            </p>
          </div>

          {/* Thin divider */}
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* ── BENTO GRID: Photos + Story ── */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-[auto_auto]">

            {/* CEO Photo — tall left */}
            <div className="relative overflow-hidden rounded-2xl md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-auto group">
              <Image
                src="/who-we-are/ceo-working.jpg"
                alt="CEO working at ORIGO office"
                fill
                className="object-cover object-[30%_25%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FFB347]">Leadership</span>
                <h2 className="mt-2 font-heading text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  โฟกัสในสิ่งที่<span className="text-[#FFB347]">ถูกต้อง</span>
                </h2>
              </div>
            </div>

            {/* Story card — top right */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#14151a] p-7 md:col-span-7 md:p-10 flex flex-col justify-center">
              <div className="mb-5 border-l-2 border-[#FFB347] pl-5">
                <p className="font-heading text-xl font-light leading-snug text-white/90 sm:text-2xl md:text-3xl">
                  จุดเริ่มต้นของ <span className="font-bold text-[#FFB347]">ORIGO</span>
                </p>
              </div>
              <div className="space-y-4 text-[15px] leading-[1.85] text-white/60 sm:text-base">
                <p>
                  ทีมผู้บริหารของเราเชี่ยวชาญในการจับคู่ผู้ผลิต ผู้ส่งออก
                  และผู้ซื้อรายใหญ่ในระดับ Global Supply Chain จากหลากหลายอุตสาหกรรม
                </p>
                <p>
                  ในปี 2024 เรารวมทักษะและความเชี่ยวชาญเหล่านี้ เพื่อสร้าง <span className="font-semibold text-white">ORIGO</span> –
                  บริการที่ช่วยผู้ประกอบการ SME เข้าถึงลูกค้ากลุ่มเป้าหมายในตลาดโลกได้เร็วขึ้น
                </p>
              </div>
            </div>

            {/* Quote card — bottom right */}
            <div className="rounded-2xl border border-[#FFB347]/10 bg-[#18191d] p-7 md:col-span-7 md:p-10 flex flex-col justify-center">
              <p className="text-[15px] leading-[1.85] text-white/65 sm:text-base">
                <span className="font-semibold text-white">&ldquo;ตลาดโลก&rdquo;</span> ไม่ได้ไกล —
                <span className="font-semibold text-white"> เครื่องมือที่ดี</span>{" "}
                ช่วยให้มองหาโอกาสได้เร็วขึ้น เข้าถึงกลุ่มลูกค้าได้ง่ายขึ้น
                และลดต้นทุนของธุรกิจ
              </p>
              <p className="mt-5 text-[15px] leading-[1.85] text-white/55 sm:text-base">
                จากงานวิจัยและแนวคิดด้านการจัดการที่ใช้กันในองค์กรชั้นนำ 1%
                เราพบว่าสิ่งที่ทำให้ธุรกิจเติบโตได้ไม่ใช่การทำทุกอย่างพร้อมกัน
                แต่คือการ<span className="font-semibold text-[#FFB347]"> โฟกัสในสิ่งที่ถูกต้อง</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 92% / 8% BELIEF ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block font-mono text-[10px] uppercase tracking-[0.5em] text-[#FFB347]">
              What We Believe
            </span>
            <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              สิ่งที่เราเชื่อ
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-stretch">
            {/* 92% */}
            <div className="flex flex-col justify-center rounded-2xl border border-white/[0.06] bg-[#14151a] p-8 text-center md:p-10">
              <p className="text-sm text-white/50 sm:text-base">ธุรกิจส่วนใหญ่มีโอกาสในการเติบโต</p>
              <div className="my-4 font-mono text-6xl font-bold text-[#444] md:text-7xl">
                92<span className="text-3xl text-[#444]/50 md:text-4xl">%</span>
              </div>
              <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                ไปกับงานระบบ ข้อมูล และการประสานงาน
                ซึ่งควรถูกจัดการด้วยระบบและเทคโนโลยี <span className="font-semibold text-white">(Ai)</span>
              </p>
            </div>

            {/* 8% */}
            <div className="flex flex-col justify-center rounded-2xl border border-[#FFB347]/15 bg-[#14151a] p-10 text-center shadow-[0_0_80px_rgba(255,179,71,0.08)] md:p-14">
              <p className="text-lg text-white/80 sm:text-xl">เพื่อให้ผู้บริหารมีเวลาเหลือไปโฟกัสกับ</p>
              <div className="my-5 font-mono text-7xl font-bold text-[#FFB347] sm:text-8xl md:text-9xl">
                8<span className="text-4xl text-[#FFB347]/60 md:text-5xl">%</span>
              </div>
              <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                ที่สำคัญที่สุด — ลูกค้า ความสัมพันธ์ และการตัดสินใจเชิงกลยุทธ์เพื่อการเติบโต
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE BUILDING — Cinematic strip ── */}
      <section className="relative py-4">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="relative aspect-[2.5/1] overflow-hidden rounded-2xl">
            <Image
              src="/who-we-are/office-building.jpg"
              alt="ORIGO headquarters"
              fill
              className="object-cover object-[50%_40%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012]/90 via-transparent to-[#0f1012]/30" />
            <div className="absolute bottom-0 left-0 p-7 md:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FFB347]">
                Headquarters
              </span>
              <p className="mt-1.5 text-base font-light text-white/75 md:text-lg">
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
            พร้อมที่จะเริ่มต้นกับเราหรือยัง?
          </h4>
          <p className="mt-4 text-base text-white/45 sm:text-lg">
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
