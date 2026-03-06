import Image from "next/image";
import Link from "next/link";
import TopNav from "@/components/landing/TopNav";

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen bg-[#0f1012] text-white">
      <TopNav />
      <section className="relative overflow-hidden bg-[#101114]">
        <div className="absolute inset-0">
          <Image
            src="/who-we-are/hero-office.png"
            alt="ORIGO office"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/70 to-[#0f1012]" />
        </div>

        <div className="relative">
          <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-20 lg:pt-24 mobile-shell desktop-shell">
            <div className="flex items-start">
              <span className="inline-flex items-center rounded-full border border-[#FFB347]/40 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.45em] text-[#FFB347]">
                ABOUT ORIGO
              </span>
            </div>

            <div className="mt-12 text-center">
              <h1 className="inline-block text-left font-heading text-4xl font-black leading-[0.9] tracking-tight text-[#6d6e71] sm:text-5xl md:text-7xl lg:text-8xl">
                <span className="block">WHO</span>
                <span className="block">
                  WE <span className="text-[#FFB347]">ARE</span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 sm:py-14 mobile-shell desktop-shell-narrow">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-5xl">
          จุดเริ่มต้นของ ORIGO
        </h2>
        <div className="mt-5 space-y-5 text-xl leading-relaxed text-white/70 sm:text-2xl md:text-3xl sm:leading-relaxed">
          <p>
            ทีมผู้บริหารของเรามีประสบการณ์มากกว่า 18 ปี
            ในธุรกิจส่งออกและการค้าระหว่างประเทศ
            เราเชี่ยวชาญในการจับคู่ผู้ผลิต ผู้ส่งออก
            และผู้ซื้อรายใหญ่ในระดับ Global Supply Chain จากหลากหลายอุตสาหกรรม
          </p>
          <p>
            ในปี 2024 เรารวมทักษะและความเชี่ยวชาญเหล่านี้ เพื่อสร้าง ORIGO –
            บริการที่ช่วยผู้ประกอบการ SME
            เข้าถึงลูกค้ากลุ่มเป้าหมายในตลาดโลกได้เร็วขึ้นและเติบโตได้อย่างยั่งยืน
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#1a1b1f] p-5 text-lg leading-relaxed text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:p-6 sm:text-xl md:text-2xl">
          <p className="text-center leading-relaxed">
            ประสบการณ์ที่ทำให้เราเข้าใจว่า{" "}
            <span className="font-semibold text-white">“ตลาดโลก”</span> ไม่ได้ไกล
            <span className="font-semibold text-white">เครื่องมือที่ดี</span>
            ช่วยให้เรามองหาโอกาสได้เร็วขึ้น
            เข้าถึงกลุ่มลูกค้าได้ง่ายขึ้น และลดต้นทุนของธุรกิจ
          </p>
        </div>

        <p className="mt-6 text-xl leading-relaxed text-white/60 sm:text-2xl md:text-3xl text-center">
          <span className="font-semibold text-white">จากงานวิจัย</span> และแนวคิดด้านการจัดการที่ใช้กันในองค์กรชั้นนำ 1%
          เราพบว่าสิ่งที่ทำให้ธุรกิจเติบโตได้ไม่ใช่การทำทุกอย่างพร้อมกัน
          แต่คือการ{" "}
          <span className="font-semibold text-white text-[1.2em] sm:text-[1.25em] md:text-[1.4em]">
            โฟกัสในสิ่งที่ถูกต้อง
          </span>
        </p>
      </section>

      <section className="bg-[#1b1d22] py-12">
        <div className="mx-auto w-full max-w-4xl px-6 mobile-shell desktop-shell-narrow">
          <h3 className="text-center text-2xl font-bold text-white sm:text-4xl">
            สิ่งที่เราเชื่อ
          </h3>

          <div className="mt-6 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#17181b] p-4 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-5 md:h-[80%] md:self-center md:flex md:flex-col md:justify-center">
              <p className="text-base text-white/60 sm:text-[1.05rem] md:text-[1.2rem]">
                ธุรกิจส่วนใหญ่มีโอกาสในการเติบโต
              </p>
              <div className="mt-3 text-3xl font-bold text-[#737373] sm:text-4xl md:text-5xl">
                92%
              </div>
              <p className="mt-2 text-base leading-relaxed text-white/60 sm:text-[1.05rem] md:text-[1.2rem]">
                ไปกับงานระบบ ข้อมูล และการประสานงานซึ่งควรถูกจัดการด้วยระบบและเทคโนโลยี{" "}
                <span className="font-semibold text-white">(Ai)</span>
              </p>
            </div>

            <div className="rounded-3xl border border-[#FFB347]/25 bg-[#17181b] p-8 text-center shadow-[0_26px_70px_rgba(0,0,0,0.5),_0_0_55px_rgba(255,179,71,0.22)] sm:p-10 md:p-14">
              <p className="text-lg text-white sm:text-xl md:text-2xl">
                เพื่อให้ผู้บริหารมีเวลาเหลือไปโฟกัสกับ
              </p>
              <div className="mt-5 text-6xl font-bold text-[#FFB347] sm:text-7xl md:text-9xl">
                8%
              </div>
              <p className="mt-4 text-lg leading-relaxed text-white sm:text-xl md:text-2xl">
                ที่สำคัญที่สุด ลูกค้า ความสัมพันธ์ และ
                การตัดสินใจเชิงกลยุทธ์เพื่อการเติบโต
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#0f1012] py-10">
        <div className="mx-auto w-full max-w-4xl px-6 text-center mobile-shell desktop-shell-narrow">
          <h4 className="text-4xl font-semibold text-white">
            พร้อมที่จะเริ่มต้นกับเราหรือยัง?
          </h4>
          <p className="mt-2 text-xs text-white/60 sm:text-sm">
            ให้เราช่วยคุณวางแผนตลาดที่สร้างกลยุทธ์การเติบโตที่ยั่งยืน
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#FFB347] px-8 py-3 text-sm font-semibold text-[#1a1a1a] shadow-[0_14px_30px_rgba(255,179,71,0.25)] transition-transform hover:translate-y-[-2px] sm:w-auto"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>
    </main>
  );
}
