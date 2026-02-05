"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TimeSlotList } from "@/components/booking/TimeSlotList";
import { LeadInfoFields } from "@/components/booking/LeadInfoFields";

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

type FormData = {
  name: string;
  company: string;
  position: string;
  employeeCount: string;
  industry: string;
  phone: string;
  email: string;
};

export default function ContactPage() {
  const [formStartedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(
    null,
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    position: "",
    employeeCount: "",
    industry: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [consent, setConsent] = useState(false);

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

  useEffect(() => {
    sessionStorage.setItem(FLOW_KEY, "contact");
  }, []);

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
  }, []);

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
    return `${dateLabel} • ${formatTimeRange(slot)}`;
  };

  const formatMonthLabel = (year: number, month: number) =>
    monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));

  const validateForm = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = "กรุณาระบุชื่อ-นามสกุล";
    }
    if (!formData.company.trim()) {
      errors.company = "กรุณาระบุชื่อบริษัท";
    }
    if (!formData.position) {
      errors.position = "กรุณาเลือกตำแหน่ง";
    }
    if (!formData.employeeCount) {
      errors.employeeCount = "กรุณาเลือกจำนวนพนักงาน";
    }
    if (!formData.industry) {
      errors.industry = "กรุณาเลือกอุตสาหกรรม";
    }
    if (!formData.email.trim()) {
      errors.email = "กรุณาระบุอีเมล";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setErrorMessage(null);

    if (!selectedSlot) {
      setErrorMessage("กรุณาเลือกวันและเวลาก่อนส่งคำขอ");
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setErrorMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);

    try {
      const quizAnswers = {
        1: formData.name,
        2: formData.company,
        3: formData.position,
        4: formData.employeeCount,
        5: formData.industry,
        6: formData.phone,
        7: formData.email,
      };
      sessionStorage.setItem("origo-quiz-answers", JSON.stringify(quizAnswers));
      sessionStorage.setItem(
        BOOKING_KEY,
        JSON.stringify({ start: selectedSlot.start, end: selectedSlot.end }),
      );

      window.location.href = "/quiz/8";
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleErrorClear = (field: keyof FormData) => {
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Contact Form */}
      <section className="pt-28 pb-20 md:pb-28 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10 mobile-shell desktop-shell">
          <div className="glass-card rounded-3xl p-8 md:p-10 border border-[#FFB347]/20 shadow-glow space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 text-center">
                นัดหมายเวลาคุยกับเรา
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-6 text-center">
                เลือกวันและเวลาที่สะดวก แล้วทีมงานจะติดต่อกลับเพื่อยืนยัน
              </p>

              {isLoadingSlots && (
                <p className="text-white/50 text-sm">กำลังโหลดช่วงเวลา...</p>
              )}
              {availabilityError && (
                <p className="text-red-400 text-sm">{availabilityError}</p>
              )}

              {!isLoadingSlots && !availabilityError && (
                <div className="space-y-6">
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
                                  setErrorMessage(null);
                                }}
                                className={`aspect-square rounded-lg sm:rounded-xl border text-xs sm:text-sm font-semibold transition-smooth flex flex-col items-center justify-center ${
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
                          setErrorMessage(null);
                        }}
                        dateLabel={formatDateLabel(selectedDate)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedSlot && (
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8 text-center">
                  ข้อมูลสำหรับติดต่อกลับ
                </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />
                  <LeadInfoFields
                    formData={formData}
                    onChange={handleFormChange}
                    errors={formErrors}
                    onErrorClear={handleErrorClear}
                  />

                  <label className="flex items-start gap-3 text-white/60 text-xs md:text-sm">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-[#FFB347] focus:ring-[#FFB347]/30"
                      required
                    />
                    <span>
                      ยินยอมให้ทีมงานติดต่อกลับเพื่อให้คำปรึกษาเบื้องต้นเกี่ยวกับ
                      Market Signal
                    </span>
                  </label>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !consent}
                    className="w-full bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold text-base md:text-lg px-8 py-6 rounded-full transition-smooth transform hover:scale-105 shadow-glow-strong border-2 border-[#FFD700]/30 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? "กำลังส่งข้อมูล..." : "ยืนยันเวลานัดหมาย"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>

                  <p className="text-center text-white/60 text-xs md:text-sm">
                    เวลาที่เลือก: {formatSlotSummary(selectedSlot)}
                  </p>

                  {errorMessage && (
                    <p className="text-center text-red-400 text-sm">
                      {errorMessage}
                    </p>
                  )}

                  {submitted && !errorMessage && (
                    <p className="text-center text-[#FFB347] text-sm">
                      รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
