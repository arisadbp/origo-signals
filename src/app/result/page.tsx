"use client";

import { useEffect, useMemo, useState } from "react";
import { AnswerMap, computeScoreSummary } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const STORAGE_KEY = "origo-quiz-answers";

export default function ResultPage() {
  const [answers, setAnswers] = useState<AnswerMap | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setAnswers({});
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        setAnswers(parsed as AnswerMap);
        return;
      }
    } catch {
      // Ignore storage parse errors.
    }
    setAnswers({});
  }, []);

  const summary = useMemo(
    () => (answers ? computeScoreSummary(answers) : null),
    [answers],
  );

  if (!summary) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen text-white/70 text-xl">
        กำลังโหลดผลลัพธ์...
      </div>
    );
  }

  const { tier, score_percent_final, insights } = summary;

  const statusMessages = {
    noiseDrivenExecution: "ยังไม่เห็นทิศทางตลาดที่ชัดเจน",
    partialSignalClarity: "เริ่มเห็นทิศทาง แต่ยังไม่ชัดเจน",
    signalDrivenGrowthReady: "พร้อมเติบโตอย่างมีทิศทาง",
  };

  const statusDescriptions = {
    noiseDrivenExecution:
      "สถานะของคุณ: ตอนนี้องค์กรของคุณกำลัง “ทำงานหนัก” แต่การตัดสินใจเรื่องตลาดยังต้องอาศัยประสบการณ์ ความเคยชินหรือการลองผิดลองถูกเป็นหลัก เห็นผลช้าและใช้ทรัพยากรมากกว่าที่ควร",
    partialSignalClarity:
      "สถานะของคุณ: คุณมีข้อมูลและเริ่มเห็นสัญญาณตลาดบางส่วน ระบบการตัดสินใจสำคัญยังขึ้นกับบุคคลหรือสถานการณ์เฉพาะหน้า ยังไม่สามารถขยายตลาดได้มากเท่าที่ควร",
    signalDrivenGrowthReady:
      "สถานะ: องค์กรของคุณมีทิศทางตลาดค่อนข้างชัด รู้ว่าลูกค้าคือใคร และควรโฟกัสตลาดไหนเพื่อให้ได้ผลตอบแทนสูงสุด",
  };

  const benefitsMessages = {
    noiseDrivenExecution: [
      "ตลาดหรือประเทศใด ควรระวัง หรือยังไม่ควรลงทุนเพิ่ม",
      "ลูกค้ากลุ่มใดมีแนวโน้มซื้อจริง",
      "จุดที่องค์กรกำลังใช้เวลาและงบกับตลาดที่ไม่สร้างผลลัพธ์",
    ],
    partialSignalClarity: [
      "ตลาดที่ควรเร่ง มีระยะเวลาในการซื้อขาย",
      "ลูกค้าที่สร้างยอดขายต่อเนื่องและมีกำลังซื้อสูง",
      "วิธีทำให้ทีมใช้ข้อมูลเดียวกันในการตัดสินใจ",
    ],
    signalDrivenGrowthReady: [
      "การจัดลำดับตลาดและลูกค้าเพื่อ “เร่งการเติบโต”",
      "แผนขยายตลาดอย่างแม่นยำ ลดการคาดเดา",
      "ข้อมูลรองรับการเติบโตในหลายประเทศ",
    ],
  };

  const ctaMessages = {
    noiseDrivenExecution: "นัดหมายเพื่อดูภาพตลาดของคุณ",
    partialSignalClarity: "นัดหมายเพื่อจัดลำดับตลาดและลูกค้าที่ควรโฟกัส",
    signalDrivenGrowthReady: "นัดหมายเพื่อวางแผนการขยายธุรกิจ",
  };

  const isDev = process.env.NODE_ENV === "development";

  const applyTierForDev = (nextTier: keyof typeof statusMessages) => {
    if (typeof window === "undefined") return;
    const presets = {
      noiseDrivenExecution: {
        8: "ยังไม่มีความชัดเจน",
        9: "ยังไม่มีข้อมูล",
        10: "ยังไม่มีการคัดกรอง ลองทำทุกอย่าง",
        11: "ยังไม่มีการจัดลำดับความสำคัญ",
        12: "ไม่มีการเก็บข้อมูลส่วนนี้ชัดเจน",
        13: "ไม่ทราบ / ไม่มีข้อมูลชัดเจน",
        14: "ใช้สัญชาตญาณหรือประสบการณ์ส่วนตัว",
        15: "ไม่เคยทำเลย",
        16: "ไม่มีการบันทึกเลย",
        17: "ไม่ทราบเลย",
      },
      partialSignalClarity: {
        8: "มีข้อมูลบางส่วน แต่ยังไม่เห็นภาพรวม",
        9: "ค่อนข้างชัดเจน",
        10: "พอทราบเป็นแนวทางบ้าง",
        11: "ค่อนข้างชัดเจน",
        12: "ค่อนข้างมั่นใจ",
        13: "มีบ้าง",
        14: "มีบางส่วน แต่ยังไม่เป็นโครงสร้าง",
        15: "ทำบ้างบางครั้ง",
        16: "บันทึกไว้เพียงบางส่วน",
        17: "น่าจะพอทราบ",
      },
      signalDrivenGrowthReady: {
        8: "มี — สอบถามจากลูกค้าในตลาดที่เกิดขึ้นจริงในช่วงปีที่ผ่านมา",
        9: "ชัดเจนมาก",
        10: "รู้ชัดเจน และมีการกำหนดแผนไว้แล้ว",
        11: "กลุ่มเป้าหมายชัดเจนมาก",
        12: "มั่นใจมาก",
        13: "น้อยมาก",
        14: "มีระบบการตัดสินใจที่ชัดเจน",
        15: "ทำทุกครั้ง",
        16: "บันทึกครบถ้วนและนำไปใช้ต่อได้ทันที",
        17: "ระบุได้อย่างชัดเจน",
      },
    } satisfies Record<
      keyof typeof statusMessages,
      Record<number, string>
    >;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(presets[nextTier]),
    );
    window.location.reload();
  };
  const progressBars = [
    {
      label: "ทิศทางตลาด",
      value: insights.market_direction_clarity_percent,
    },
    {
      label: "ต้นทุนการหาลูกค้า",
      value: insights.customer_prioritisation_strength_percent,
    },
    {
      label: "ข้อมูลในการตัดสินใจ",
      value: 100 - insights.cac_efficiency_risk_percent,
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-10 py-12 animate-fade-in-up">
      <section className="text-center space-y-6">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">
          สถานะ Market Signal ของคุณ
        </h1>

        <div className="flex justify-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[10px] border-white/10 w-48 h-48 md:w-52 md:h-52" />
            <div className="relative flex flex-col items-center justify-center w-48 h-48 md:w-52 md:h-52">
              <span className="text-5xl md:text-6xl font-bold text-[#FFB347]">
                {score_percent_final}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-semibold text-white">
            {statusMessages[tier]}
          </p>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            {statusDescriptions[tier]}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-6">
        {progressBars.map((bar) => (
          <div key={bar.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-white/80">
                {bar.label}
              </span>
              <span className="text-sm font-semibold text-[#FFB347]">
                {bar.value}%
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${bar.value}%`, backgroundColor: "#737373" }}
              />
            </div>
          </div>
        ))}
      </section>

      {isDev ? (
        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 text-center">
            Dev Test Tools
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button
              type="button"
              variant="outline"
              className="border-white/15 text-white/80 hover:text-white hover:border-[#FFB347]/60"
              onClick={() => applyTierForDev("noiseDrivenExecution")}
            >
              Tier: Low
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/15 text-white/80 hover:text-white hover:border-[#FFB347]/60"
              onClick={() => applyTierForDev("partialSignalClarity")}
            >
              Tier: Mid
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/15 text-white/80 hover:text-white hover:border-[#FFB347]/60"
              onClick={() => applyTierForDev("signalDrivenGrowthReady")}
            >
              Tier: High
            </Button>
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-white text-center">
          สิ่งที่คุณจะได้รู้จาก Market Signal
        </h2>
        <ul className="space-y-3">
          {benefitsMessages[tier].map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 text-sm md:text-base text-white/70"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB347]/20 text-[#FFB347] flex-shrink-0 text-xs mt-0.5">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold text-base md:text-lg px-8 py-6 rounded-full transition-smooth transform hover:scale-105 shadow-glow-strong border-2 border-[#FFD700]/30"
          >
            <Link href="/contact">{ctaMessages[tier]}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
