import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import {
  APPOINTMENT_CONFIG,
  addMinutes,
  buildSlotsForDate,
  getBangkokDateParts,
  createBangkokDate,
  hasConflict,
} from "@/lib/appointments";

const toDateKey = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const daysRequested = Number(url.searchParams.get("days"));
  const days = Number.isFinite(daysRequested)
    ? Math.min(Math.max(daysRequested, 1), APPOINTMENT_CONFIG.maxDays)
    : APPOINTMENT_CONFIG.defaultDays;

  const now = new Date();
  const { year, month, day } = getBangkokDateParts(now);
  const startDate = createBangkokDate(year, month, day, 0, 0);
  const endDate = addMinutes(startDate, days * 24 * 60);

  const supabase = createSupabaseAdmin();
  const { data: appointments, error } = await supabase
    .from("submissions")
    .select("appointment_start_time,appointment_end_time")
    .gte("appointment_start_time", startDate.toISOString())
    .lte("appointment_start_time", endDate.toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result: { date: string; slots: { start: string; end: string }[] }[] =
    [];

  for (let offset = 0; offset < days; offset += 1) {
    const current = addMinutes(startDate, offset * 24 * 60);
    const parts = getBangkokDateParts(current);
    const slots = buildSlotsForDate(parts.year, parts.month, parts.day)
      .filter(
        (slot) =>
          !hasConflict(
            slot,
            (appointments ?? []).map((appointment) => ({
              start_time: appointment.appointment_start_time,
              end_time: appointment.appointment_end_time,
            })),
          ),
      )
      .map((slot) => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
      }));
    if (slots.length > 0) {
      result.push({
        date: toDateKey(parts.year, parts.month, parts.day),
        slots,
      });
    }
  }

  return NextResponse.json({ days: result });
}
