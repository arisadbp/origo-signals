import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import {
  APPOINTMENT_CONFIG,
  addMinutes,
  hasConflict,
  isSlotAligned,
} from "@/lib/appointments";
import { computeScoreSummary } from "@/lib/scoring";
import {
  buildSubmissionEmail,
  sendNotificationEmail,
} from "@/lib/notifications";

type AnswerMap = Record<number | string, string>;

type SubmissionPayload = {
  contact?: {
    name?: string;
    company?: string;
    position?: string;
    employeeCount?: string;
    industry?: string;
    phone?: string;
    email?: string;
  } | null;
  answers?: AnswerMap | null;
  appointment?: {
    startTime?: string;
    timezone?: string;
  } | null;
  source?: string;
  metadata?: Record<string, unknown> | null;
  utm?: Record<string, unknown> | null;
  device?: Record<string, unknown> | null;
  honeypot?: string;
  formStartedAt?: number;
};

const normalize = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const parseNumber = (value?: string) => {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const getAnswerValue = (answers: AnswerMap, step: number) =>
  answers[step] ?? answers[String(step)] ?? "";

const REQUIRED_STEPS = [
  1, 2, 3, 4, 5, 7,
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
];

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

const buildContactFromAnswers = (answers: AnswerMap) => ({
  name: normalize(getAnswerValue(answers, 1)),
  company: normalize(getAnswerValue(answers, 2)),
  position: normalize(getAnswerValue(answers, 3)),
  employeeCount: normalize(getAnswerValue(answers, 4)),
  industry: normalize(getAnswerValue(answers, 5)),
  phone: normalize(getAnswerValue(answers, 6)),
  email: normalize(getAnswerValue(answers, 7))?.toLowerCase() ?? null,
});

const toAnswerMap = (answers: AnswerMap) =>
  Object.entries(answers).reduce<Record<number, string>>((acc, [key, value]) => {
    const step = Number(key);
    if (Number.isFinite(step)) {
      acc[step] = value;
    }
    return acc;
  }, {});

export async function POST(request: Request) {
  let payload: SubmissionPayload | null = null;

  try {
    payload = (await request.json()) as SubmissionPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { error: "Missing submission payload." },
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

  const answersRaw = payload.answers ?? null;
  if (!answersRaw || Object.keys(answersRaw).length === 0) {
    return NextResponse.json(
      { error: "Missing quiz answers." },
      { status: 400 },
    );
  }

  const answers = toAnswerMap(answersRaw);
  const missingRequired = REQUIRED_STEPS.filter((step) => {
    const value = getAnswerValue(answers, step);
    return !value || value.trim() === "";
  });
  if (missingRequired.length > 0) {
    return NextResponse.json(
      { error: "Missing required quiz answers." },
      { status: 400 },
    );
  }

  const contactFromAnswers = buildContactFromAnswers(answers);
  const contact = {
    name: normalize(payload.contact?.name) ?? contactFromAnswers.name,
    company: normalize(payload.contact?.company) ?? contactFromAnswers.company,
    position:
      normalize(payload.contact?.position) ?? contactFromAnswers.position,
    employeeCount:
      normalize(payload.contact?.employeeCount) ??
      contactFromAnswers.employeeCount,
    industry: normalize(payload.contact?.industry) ?? contactFromAnswers.industry,
    phone: normalize(payload.contact?.phone) ?? contactFromAnswers.phone,
    email:
      normalize(payload.contact?.email)?.toLowerCase() ??
      contactFromAnswers.email,
  };

  if (
    !contact.name ||
    !contact.company ||
    !contact.position ||
    !contact.employeeCount ||
    !contact.industry ||
    !contact.email
  ) {
    return NextResponse.json(
      { error: "Missing required contact fields." },
      { status: 400 },
    );
  }

  const startTime = payload.appointment?.startTime;
  if (!startTime) {
    return NextResponse.json(
      { error: "Missing appointment startTime." },
      { status: 400 },
    );
  }

  const start = new Date(startTime);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid startTime." }, { status: 400 });
  }

  if (!isSlotAligned(start)) {
    return NextResponse.json({ error: "Slot not aligned." }, { status: 400 });
  }

  const end = addMinutes(start, APPOINTMENT_CONFIG.slotMinutes);

  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for") ?? "";
  const ip =
    forwardedFor.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null;
  if (ip && isRateLimited(`submissions:${ip}`)) {
    return NextResponse.json({ error: "Rate limited." }, { status: 429 });
  }

  const supabase = createSupabaseAdmin();
  const { data: existing, error: fetchError } = await supabase
    .from("submissions")
    .select("appointment_start_time,appointment_end_time")
    .gte("appointment_start_time", addMinutes(start, -1440).toISOString())
    .lte("appointment_start_time", addMinutes(start, 1440).toISOString());

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (
    hasConflict(
      { start, end },
      (existing ?? []).map((row) => ({
        start_time: row.appointment_start_time,
        end_time: row.appointment_end_time,
      })),
    )
  ) {
    return NextResponse.json(
      { error: "Selected slot is unavailable." },
      { status: 409 },
    );
  }

  const geo = {
    country: headers.get("x-vercel-ip-country"),
    region: headers.get("x-vercel-ip-country-region"),
    city: headers.get("x-vercel-ip-city"),
    postal: headers.get("x-vercel-ip-postal-code"),
    latitude: headers.get("x-vercel-ip-latitude"),
    longitude: headers.get("x-vercel-ip-longitude"),
  };

  const summary = computeScoreSummary(answers as Record<number, string>);
  const path = payload.metadata?.path
    ? String(payload.metadata.path)
    : headers.get("x-vercel-pathname");

  const { error } = await supabase.from("submissions").insert({
    name: contact.name,
    company: contact.company,
    position: contact.position,
    employee_count: contact.employeeCount,
    industry: contact.industry,
    phone: contact.phone,
    email: contact.email,
    message: null,
    answers,
    raw_points: summary.raw_points_per_step,
    raw_score_total: summary.raw_score_total,
    score_percent_final: summary.score_percent_final,
    tier: summary.tier,
    insights: summary.insights,
    utm: payload.utm ?? null,
    device: payload.device ?? null,
    metadata: payload.metadata ?? null,
    source: normalize(payload.source),
    appointment_start_time: start.toISOString(),
    appointment_end_time: end.toISOString(),
    timezone: payload.appointment?.timezone ?? APPOINTMENT_CONFIG.timezone,
    ip,
    country: geo.country,
    region: geo.region,
    city: geo.city,
    postal: geo.postal,
    latitude: parseNumber(geo.latitude ?? undefined),
    longitude: parseNumber(geo.longitude ?? undefined),
    user_agent: headers.get("user-agent"),
    referrer: headers.get("referer") ?? headers.get("referrer"),
    path,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to store submission." },
      { status: 500 },
    );
  }

  try {
    const emailPayload = buildSubmissionEmail({
      contact,
      appointment: {
        startTime: start.toISOString(),
        timezone: payload.appointment?.timezone ?? APPOINTMENT_CONFIG.timezone,
      },
      summary,
      source: normalize(payload.source),
      path,
    });
    const result = await sendNotificationEmail(emailPayload);
    if (result.skipped) {
      console.warn("⚠️  Email notification skipped: Missing environment variables (RESEND_API_KEY, EMAIL_FROM, or EMAIL_TO)");
    } else if (!result.ok) {
      console.error("❌ Email notification failed: Check Resend API key and domain verification");
    } else {
      console.log("✅ Email notification sent successfully");
    }
  } catch (err) {
    console.error("❌ Submission email notification failed:", err);
  }

  return NextResponse.json({ ok: true });
}
