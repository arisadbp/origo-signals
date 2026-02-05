import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import {
  buildAppointmentEmail,
  sendNotificationEmail,
} from "@/lib/notifications";

const APPOINTMENT_CONFIG = {
  timezone: "Asia/Bangkok",
  openHour: 8,
  closeHour: 17,
  slotMinutes: 60,
  bufferMinutes: 0,
};

const BANGKOK_OFFSET_MINUTES = 7 * 60;

const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60 * 1000);

const getBangkokDateParts = (date: Date) => {
  const shifted = new Date(date.getTime() + BANGKOK_OFFSET_MINUTES * 60 * 1000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
};

const createBangkokDate = (
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
) => new Date(Date.UTC(year, month - 1, day, hour - 7, minute));

const isWeekdayBangkok = (date: Date) => {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
};

const isSlotAligned = (start: Date) => {
  const { openHour, closeHour, slotMinutes, bufferMinutes } =
    APPOINTMENT_CONFIG;
  const parts = getBangkokDateParts(start);
  const base = createBangkokDate(parts.year, parts.month, parts.day, 0, 0);
  if (!isWeekdayBangkok(base)) {
    return false;
  }
  const minutesFromOpen =
    start.getTime() - addMinutes(base, openHour * 60).getTime();
  if (minutesFromOpen < 0) {
    return false;
  }
  const totalMinutes = (closeHour - openHour) * 60;
  if (minutesFromOpen >= totalMinutes * 60 * 1000) {
    return false;
  }
  const slotBlock = (slotMinutes + bufferMinutes) * 60 * 1000;
  return minutesFromOpen % slotBlock === 0;
};

const hasConflict = (
  slot: { start: Date; end: Date },
  appointments: { start_time: string; end_time: string }[],
) => {
  const buffer = APPOINTMENT_CONFIG.bufferMinutes;
  return appointments.some((appointment) => {
    const existingStart = new Date(appointment.start_time);
    const existingEnd = new Date(appointment.end_time);
    const windowStart = addMinutes(existingStart, -buffer);
    const windowEnd = addMinutes(existingEnd, buffer);
    return slot.start < windowEnd && slot.end > windowStart;
  });
};

type AppointmentPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  startTime?: string;
  timezone?: string;
  source?: string;
  metadata?: Record<string, unknown> | null;
  quizSessionId?: string;
  honeypot?: string;
  formStartedAt?: number;
};

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, number[]>();

const isRateLimited = (key: string) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const entries = rateLimitStore.get(key) ?? [];
  const recent = entries.filter((timestamp) => timestamp >= windowStart);
  recent.push(now);
  rateLimitStore.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
};

export async function POST(request: Request) {
  let payload: AppointmentPayload | null = null;

  try {
    payload = (await request.json()) as AppointmentPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { error: "Missing appointment payload." },
      { status: 400 },
    );
  }

  const { name, company, email, phone, message, startTime } = payload;
  if (!name || !company || !email || !startTime) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (payload.honeypot && payload.honeypot.trim() !== "") {
    return NextResponse.json({ error: "Rejected." }, { status: 400 });
  }

  if (
    typeof payload.formStartedAt === "number" &&
    Number.isFinite(payload.formStartedAt)
  ) {
    const elapsed = Date.now() - payload.formStartedAt;
    if (elapsed < 3000) {
      return NextResponse.json({ error: "Too fast." }, { status: 429 });
    }
  }

  const start = new Date(startTime);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid startTime." }, { status: 400 });
  }

  if (!isSlotAligned(start)) {
    return NextResponse.json({ error: "Slot not aligned." }, { status: 400 });
  }

  const end = addMinutes(start, APPOINTMENT_CONFIG.slotMinutes);

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip =
    forwardedFor.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;
  if (ip && isRateLimited(`appointments:${ip}`)) {
    return NextResponse.json({ error: "Rate limited." }, { status: 429 });
  }

  const supabase = createSupabaseAdmin();
  const { data: existing, error: fetchError } = await supabase
    .from("appointments")
    .select("start_time,end_time,status")
    .gte("start_time", addMinutes(start, -1440).toISOString())
    .lte("start_time", addMinutes(start, 1440).toISOString());

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (hasConflict({ start, end }, existing ?? [])) {
    return NextResponse.json(
      { error: "Selected slot is unavailable." },
      { status: 409 },
    );
  }

  const { error } = await supabase.from("appointments").insert({
    name,
    company,
    email,
    phone: phone ?? null,
    message: message ?? null,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    timezone: payload.timezone ?? APPOINTMENT_CONFIG.timezone,
    source: payload.source ?? null,
    metadata: payload.metadata ?? null,
    quiz_session_id: payload.quizSessionId ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    const emailPayload = buildAppointmentEmail({
      name,
      company,
      email,
      phone: phone ?? null,
      message: message ?? null,
      startTime: start.toISOString(),
      timezone: payload.timezone ?? APPOINTMENT_CONFIG.timezone,
      source: payload.source ?? null,
      quizSessionId: payload.quizSessionId ?? null,
    });
    await sendNotificationEmail(emailPayload);
  } catch (err) {
    console.error("Appointment email notification failed.", err);
  }

  return NextResponse.json(
    { ok: true, startTime: start.toISOString(), endTime: end.toISOString() },
    { status: 201 },
  );
}
