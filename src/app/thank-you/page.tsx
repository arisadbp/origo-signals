"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BOOKING_KEY = "origo-booking";

type BookingInfo = {
  start: string;
  end: string;
};

export default function ThankYouPage() {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

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

  useEffect(() => {
    const stored = sessionStorage.getItem(BOOKING_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as BookingInfo;
      if (parsed?.start && parsed?.end) {
        setBookingInfo(parsed);
      }
    } catch {
      // Ignore storage parse errors.
    }
  }, []);

  const formatSlotSummary = (slot: BookingInfo) => {
    const dateLabel = dateFormatter.format(new Date(slot.start));
    const start = timeFormatter.format(new Date(slot.start));
    const end = timeFormatter.format(new Date(slot.end));
    return `${dateLabel} (${start} - ${end})`;
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 text-center shadow-glow mobile-shell">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#FFB347]/30 bg-[#FFB347]/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FFB347]">
          Thank You
        </div>
        <h1 className="mt-6 text-3xl md:text-4xl font-heading font-bold text-white">
          ขอบคุณสำหรับการนัดหมาย
        </h1>
        <p className="mt-3 text-white/60 text-sm md:text-base">
          ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง พร้อมสรุปแนวทางที่เหมาะกับธุรกิจของคุณ
        </p>

        {bookingInfo && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-white/70 text-sm text-center">
            <span className="block sm:inline">เวลานัดหมาย:</span>{" "}
            <span className="block sm:inline">
              {formatSlotSummary(bookingInfo)}
            </span>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FFB347] via-[#FFA500] to-[#FFB347] text-black font-heading font-bold px-8 py-6 rounded-full shadow-glow-strong"
            >
              กลับหน้าแรก
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
