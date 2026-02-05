"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { COPY } from "@/lib/copy";
import { AnswerMap, computeScoreSummary, TierKey } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { TimeSlotList } from "@/components/booking/TimeSlotList";
import Link from "next/link";

const STORAGE_KEY = "origo-quiz-answers";
const FLOW_KEY = "origo-flow";
const BOOKING_KEY = "origo-booking";

type AvailabilitySlot = {
  start: string;
  end: string;
};

type AvailabilityDay = {
  date: string;
  slots: AvailabilitySlot[];
};

export default function ResultPage() {
  const router = useRouter();
  const [formStartedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [answers, setAnswers] = useState<AnswerMap | null>(null);
  const [flowType, setFlowType] = useState<"quiz" | "contact">(() => {
    if (typeof window === "undefined") return "quiz";
    const stored = sessionStorage.getItem(FLOW_KEY);
    return stored === "contact" ? "contact" : "quiz";
  });
  const [bookingInfo, setBookingInfo] = useState<AvailabilitySlot | null>(null);
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null,
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [activeTier, setActiveTier] = useState<TierKey>("noiseDrivenExecution");

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
        weekday: "short",
        day: "2-digit",
        month: "short",
      }),
    [],
  );
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [],
  );
  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("th-TH", {
        timeZone: "Asia/Bangkok",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  const availabilityByDate = useMemo(
    () => new Map(availability.map((day) => [day.date, day])),
    [availability],
  );
  const monthList = useMemo(() => {
    const groups = new Map<
      string,
      { key: string; year: number; month: number }
    >();
    availability.forEach((day) => {
      const [year, month] = day.date
        .split("-")
        .map((part) => Number(part));
      const key = `${year}-${String(month).padStart(2, "0")}`;
      if (!groups.has(key)) {
        groups.set(key, { key, year, month });
      }
    });
    return Array.from(groups.values()).sort((a, b) =>
      a.year === b.year ? a.month - b.month : a.year - b.year,
    );
  }, [availability]);
  const currentMonth = monthList[currentMonthIndex] ?? null;

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

  useEffect(() => {
    const storedFlow = sessionStorage.getItem(FLOW_KEY);
    setFlowType(storedFlow === "contact" ? "contact" : "quiz");
    const storedBooking = sessionStorage.getItem(BOOKING_KEY);
    if (!storedBooking) return;
    try {
      const parsed = JSON.parse(storedBooking) as AvailabilitySlot;
      if (parsed?.start && parsed?.end) {
        setBookingInfo(parsed);
      }
    } catch {
      // Ignore storage parse errors.
    }
  }, []);

  useEffect(() => {
    if (flowType === "contact") {
      setIsLoadingSlots(false);
      return;
    }
    setIsLoadingSlots(true);
    fetch("/api/appointments/availability?days=60")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("โหลดช่วงเวลาไม่สำเร็จ");
        }
        const payload = await response.json();
        setAvailability(payload.days ?? []);
      })
      .catch((error) => {
        setAvailabilityError(
          error.message || "เกิดข้อผิดพลาดในการโหลดช่วงเวลา",
        );
      })
      .finally(() => {
        setIsLoadingSlots(false);
      });
  }, [flowType]);

  useEffect(() => {
    if (monthList.length > 0) {
      setCurrentMonthIndex(0);
    }
  }, [monthList]);

  useEffect(() => {
    if (selectedDate && !availabilityByDate.has(selectedDate)) {
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  }, [availabilityByDate, selectedDate]);

  const summary = useMemo(
    () => (answers ? computeScoreSummary(answers) : null),
    [answers],
  );

  useEffect(() => {
    if (summary) {
      setActiveTier(summary.tier);
    }
  }, [summary]);

  const contact = useMemo(() => {
    const safe = (value: unknown) =>
      typeof value === "string" ? value.trim() : "";
    return {
      name: safe(answers?.[1]),
      company: safe(answers?.[2]),
      position: safe(answers?.[3]),
      employeeCount: safe(answers?.[4]),
      industry: safe(answers?.[5]),
      phone: safe(answers?.[6]),
      email: safe(answers?.[7]).toLowerCase(),
    };
  }, [answers]);

  const isContactReady =
    Boolean(contact.name) &&
    Boolean(contact.company) &&
    Boolean(contact.position) &&
    Boolean(contact.employeeCount) &&
    Boolean(contact.industry) &&
    Boolean(contact.email);

  if (!summary) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen text-white/70 text-xl">
        กำลังโหลดผลลัพธ์...
      </div>
    );
  }

  const { tier, insights, score_percent_final } = summary;
  const interpretation = COPY.result.interpretations[tier];

  const statusMessages = {
    noiseDrivenExecution: "ยังไม่เห็นทิศทางตลาดที่ชัดเจน",
    partialSignalClarity: "เริ่มเห็นทิศทาง แต่ยังไม่ชัดเจน",
    signalDrivenGrowthReady: "พร้อมเติบโตอย่างมีทิศทาง"
  };

  const benefitsMessages = {
    noiseDrivenExecution: [
      "ตลาดหรือประเทศใด ควรระวัง หรือยังไม่ควรลงทุนเพิ่ม",
      "ลูกค้ากลุ่มใดมีแนวโน้มซื้อจริง",
      "จุดที่องค์กรกำลังใช้เวลาและงบกับตลาดที่ไม่สร้างผลลัพธ์"
    ],
    partialSignalClarity: [
      "ตลาดที่ควรเร่ง มีระยะเวลาในการซื้อขาย",
      "ลูกค้าที่สร้างยอดขายต่อเนื่องและมีกำลังซื้อสูง",
      "วิธีทำให้ทีมใช้ข้อมูลเดียวกันในการตัดสินใจ"
    ],
    signalDrivenGrowthReady: [
      "การจัดลำดับตลาดและลูกค้าเพื่อ \"เร่งการเติบโต\"",
      "แผนขยายตลาดอย่างแม่นยำ ลดการคาดเดา",
      "ข้อมูลรองรับการเติบโตในหลายประเทศ"
    ]
  };

  const tierTabs = [
    { key: "noiseDrivenExecution", label: "0–40%" },
    { key: "partialSignalClarity", label: "41–70%" },
    { key: "signalDrivenGrowthReady", label: "71–100%" },
  ] as const;
  const activeTierDetails = COPY.result.interpretations[activeTier];

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

  const formatDateLabel = (date: string) => {
    const [year, month, day] = date.split("-").map((part) => Number(part));
    const dateObj = new Date(Date.UTC(year, month - 1, day, 0, 0));
    return dateFormatter.format(dateObj);
  };

  const formatTimeRange = (slot: AvailabilitySlot) => {
    const start = timeFormatter.format(new Date(slot.start));
    const end = timeFormatter.format(new Date(slot.end));
    return `${start} - ${end}`;
  };

  const formatSlotSummary = (slot: AvailabilitySlot) => {
    const dateLabel = dateFormatter.format(new Date(slot.start));
    return `${dateLabel} (${formatTimeRange(slot)})`;
  };

  const formatMonthLabel = (year: number, month: number) =>
    monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setBookingError(null);
    if (!selectedSlot) {
      setBookingError("กรุณาเลือกวันและเวลาก่อนส่งคำขอ");
      return;
    }
    if (!isContactReady) {
      setBookingError("กรุณากรอกข้อมูลติดต่อให้ครบก่อนเลือกเวลานัดหมาย");
      return;
    }
    setIsSubmitting(true);

    try {
      const submissionResponse = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          answers,
          appointment: { startTime: selectedSlot.start, timezone: "Asia/Bangkok" },
          source: "result-page",
          metadata: {
            userAgent: navigator.userAgent,
            referrer: document.referrer || null,
            path: window.location.pathname,
            flow: "quiz",
          },
          utm: getUtmParams(),
          device: getDeviceInfo(),
          honeypot,
          formStartedAt,
        }),
      });

      if (!submissionResponse.ok) {
        const payload = await submissionResponse.json().catch(() => null);
        throw new Error(payload?.error || "Submit failed.");
      }

      setBookingSubmitted(true);
      sessionStorage.setItem(
        BOOKING_KEY,
        JSON.stringify({ start: selectedSlot.start, end: selectedSlot.end }),
      );
      setSelectedSlot(null);
      router.push("/thank-you");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
      setBookingError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-12 py-12 animate-fade-in-up">
      {/* Header: Status */}
      <section className="text-center space-y-6">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">
          สถานะ Market Signal ของคุณ
        </h1>

        {/* Score Circle */}
        <div className="flex justify-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"
                 style={{ width: '120px', height: '120px' }} />
            <div className="relative flex flex-col items-center justify-center"
                 style={{ width: '120px', height: '120px' }}>
              <span className="text-4xl font-bold text-[#FFB347]">
                {score_percent_final}%
              </span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-semibold text-white">
            {statusMessages[tier]}
          </p>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            {interpretation.status}
          </p>
        </div>
      </section>

      {/* Score Tiers */}
      <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-white text-center">
          ระดับคะแนน
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {tierTabs.map((tab) => {
            const isActive = activeTier === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTier(tab.key)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-smooth ${
                  isActive
                    ? "bg-[#FFB347] text-black shadow-glow"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
          <p className="text-sm md:text-base font-semibold text-white">
            {activeTierDetails.title}
          </p>
          <p className="text-sm md:text-base text-white/70">
            {activeTierDetails.status}
          </p>
          {"risk" in activeTierDetails && (
            <p className="text-sm md:text-base text-white/70">
              {activeTierDetails.risk}
            </p>
          )}
          {"opportunity" in activeTierDetails && (
            <p className="text-sm md:text-base text-white/70">
              {activeTierDetails.opportunity}
            </p>
          )}
        </div>
      </section>

      {/* Progress Bars */}
      <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-6">
        {progressBars.map((bar, index) => (
          <div key={bar.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-white/80">{bar.label}</span>
              <span className="text-sm font-semibold text-[#FFB347]">{bar.value}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFB347] to-[#FFA500] transition-all duration-1000"
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Benefits */}
      <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-white text-center">
          สิ่งที่คุณจะได้รู้จาก Market Signal
        </h2>
        <ul className="space-y-3">
          {benefitsMessages[tier].map((benefit, index) => (
            <li key={index} className="flex items-start gap-3 text-sm md:text-base text-white/70">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FFB347]/20 text-[#FFB347] flex-shrink-0 text-xs mt-0.5">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {flowType === "contact" ? (
        <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#FFB347]/30 bg-[#FFB347]/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FFB347]">
            Thank You
          </div>
          <div className="space-y-3">
            <p className="text-2xl md:text-3xl font-heading font-bold text-white">
              ขอบคุณสำหรับการนัดหมาย
            </p>
            <p className="text-white/60 text-sm md:text-base">
              ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง พร้อมสรุปแนวทางที่เหมาะกับธุรกิจของคุณ
            </p>
          </div>
          {bookingInfo && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-white/70 text-sm text-center">
              <span className="block sm:inline">เวลานัดหมาย:</span>{" "}
              <span className="block sm:inline">
                {formatSlotSummary(bookingInfo)}
              </span>
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-8">
          <div className="text-center">
            <p className="text-lg md:text-2xl font-heading font-bold text-white">
              นัดหมายเวลาคุยกับเรา
            </p>
            <p className="text-white/60 text-sm md:text-base mt-2">
              เลือกวันและเวลาที่สะดวก แล้วทีมงานจะติดต่อกลับเพื่อยืนยัน
            </p>
          </div>

          {isLoadingSlots && (
            <p className="text-white/50 text-sm text-center">
              กำลังโหลดช่วงเวลา...
            </p>
          )}
          {availabilityError && (
            <p className="text-red-400 text-sm text-center">
              {availabilityError}
            </p>
          )}

          {!isLoadingSlots && !availabilityError && (
            <div className="space-y-6">
              {!isContactReady && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center text-white/60 text-sm">
                  ไม่พบข้อมูลติดต่อจากแบบทดสอบ กรุณากรอกข้อมูลก่อนนัดหมาย{" "}
                  <Link href="/quiz/lead-info" className="text-[#FFB347]">
                    ไปกรอกข้อมูล
                  </Link>
                </div>
              )}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-white/80 font-semibold">
                  <span>
                    {currentMonth
                      ? formatMonthLabel(currentMonth.year, currentMonth.month)
                      : "ไม่มีข้อมูลเดือนนี้"}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      disabled={currentMonthIndex === 0}
                      onClick={() => {
                        setCurrentMonthIndex((prev) => Math.max(prev - 1, 0));
                        setSelectedDate(null);
                        setSelectedSlot(null);
                        setBookingError(null);
                      }}
                      className={`rounded-full border px-3 py-1 ${
                        currentMonthIndex === 0
                          ? "border-white/10 text-white/30 cursor-not-allowed"
                          : "border-white/20 text-white/70 hover:border-[#FFB347]/60 hover:text-white"
                      }`}
                    >
                      เดือนก่อนหน้า
                    </button>
                    <button
                      type="button"
                      disabled={currentMonthIndex >= monthList.length - 1}
                      onClick={() => {
                        setCurrentMonthIndex((prev) =>
                          Math.min(prev + 1, monthList.length - 1),
                        );
                        setSelectedDate(null);
                        setSelectedSlot(null);
                        setBookingError(null);
                      }}
                      className={`rounded-full border px-3 py-1 ${
                        currentMonthIndex >= monthList.length - 1
                          ? "border-white/10 text-white/30 cursor-not-allowed"
                          : "border-white/20 text-white/70 hover:border-[#FFB347]/60 hover:text-white"
                      }`}
                    >
                      เดือนถัดไป
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-[11px] sm:text-xs text-white/40 font-semibold">
                  {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((label) => (
                    <div key={label} className="text-center py-1">
                      {label}
                    </div>
                  ))}
                </div>
                {currentMonth && (() => {
                  const daysInMonth = new Date(
                    Date.UTC(currentMonth.year, currentMonth.month, 0),
                  ).getUTCDate();
                  const startOffset = new Date(
                    Date.UTC(currentMonth.year, currentMonth.month - 1, 1),
                  ).getUTCDay();
                  return (
                    <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                      {Array.from({ length: startOffset }).map((_, index) => (
                        <div key={`empty-${index}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const dayNumber = index + 1;
                        const dateKey = `${currentMonth.year}-${String(
                          currentMonth.month,
                        ).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
                        const dayAvailability = availabilityByDate.get(dateKey);
                        const hasSlots = (dayAvailability?.slots.length ?? 0) > 0;
                        const isSelected = selectedDate === dateKey;
                        const isEnabled = Boolean(dayAvailability);
                        return (
                          <button
                            key={dateKey}
                            type="button"
                            disabled={!isEnabled}
                            onClick={() => {
                              setSelectedDate(dateKey);
                              setSelectedSlot(null);
                              setBookingError(null);
                            }}
                            className={`aspect-square rounded-lg border text-xs font-semibold transition-smooth flex flex-col items-center justify-center ${
                              isSelected
                                ? "border-[#FFB347] bg-[#FFB347]/20 text-[#FFB347]"
                                : hasSlots
                                  ? "border-white/10 text-white/80 hover:border-[#FFB347]/60 hover:text-white"
                                  : "border-white/10 text-white/40 hover:text-white/60"
                            } ${isEnabled ? "" : "border-white/5 text-white/20 cursor-not-allowed"}`}
                          >
                            <span>{dayNumber}</span>
                            <span
                              className={`mt-1 h-1.5 w-1.5 rounded-full ${
                                hasSlots ? "bg-[#FFB347]" : "bg-white/20"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

            {selectedDate && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <TimeSlotList
                  slots={availabilityByDate.get(selectedDate)?.slots ?? []}
                  selectedSlot={selectedSlot}
                  onSelectSlot={(slot) => {
                    setSelectedSlot(slot);
                    setBookingError(null);
                  }}
                  dateLabel={formatDateLabel(selectedDate)}
                />
              </div>
            )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !selectedSlot || !isContactReady}
                  className="w-full bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold text-base md:text-lg px-8 py-6 rounded-full transition-smooth transform hover:scale-105 shadow-glow-strong border-2 border-[#FFD700]/30 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? "กำลังส่งข้อมูล..." : "ยืนยันเวลานัดหมาย"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>

                {selectedSlot && (
                  <p className="text-center text-white/60 text-xs md:text-sm">
                    เวลาที่เลือก: {formatSlotSummary(selectedSlot)}
                  </p>
                )}

                {bookingError && (
                  <p className="text-center text-red-400 text-sm">
                    {bookingError}
                  </p>
                )}

                {bookingSubmitted && !bookingError && (
                  <p className="text-center text-[#FFB347] text-sm">
                    รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด
                  </p>
                )}
              </form>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
  const getUtmParams = () => {
    if (typeof window === "undefined") return undefined;
    const params = new URLSearchParams(window.location.search);
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];
    const utm = utmKeys.reduce<Record<string, string>>((acc, key) => {
      const value = params.get(key);
      if (value) acc[key] = value;
      return acc;
    }, {});
    return Object.keys(utm).length ? utm : undefined;
  };

  const getDeviceInfo = () => {
    if (typeof navigator === "undefined") return undefined;
    return {
      user_agent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
    };
  };
