import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import {
  buildLeadEmail,
  sendNotificationEmail,
} from "@/lib/notifications";

type LeadPayload = {
  name?: string;
  company?: string;
  position?: string;
  employeeCount?: string;
  industry?: string;
  phone?: string;
  email?: string;
  message?: string;
  source?: string;
  quizSessionId?: string;
  metadata?: Record<string, unknown> | null;
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
  let payload: LeadPayload | null = null;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { error: "Missing lead payload." },
      { status: 400 },
    );
  }

  const name = normalize(payload.name);
  const company = normalize(payload.company);
  const position = normalize(payload.position);
  const employeeCount = normalize(payload.employeeCount);
  const industry = normalize(payload.industry);
  const email = normalize(payload.email);

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

  if (!name || !company || !position || !employeeCount || !industry || !email) {
    return NextResponse.json(
      { error: "Missing required lead fields." },
      { status: 400 },
    );
  }

  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for") ?? "";
  const ip =
    forwardedFor.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null;
  if (ip && isRateLimited(`leads:${ip}`)) {
    return NextResponse.json({ error: "Rate limited." }, { status: 429 });
  }

  const geo = {
    country: headers.get("x-vercel-ip-country"),
    region: headers.get("x-vercel-ip-country-region"),
    city: headers.get("x-vercel-ip-city"),
    postal: headers.get("x-vercel-ip-postal-code"),
    latitude: headers.get("x-vercel-ip-latitude"),
    longitude: headers.get("x-vercel-ip-longitude"),
  };

  const supabase = createSupabaseAdmin();

  const path = payload.metadata?.path
    ? String(payload.metadata.path)
    : headers.get("x-vercel-pathname");

  const { error } = await supabase.from("contact_requests").insert({
    name,
    company,
    position,
    employee_count: employeeCount,
    industry,
    phone: normalize(payload.phone),
    email,
    message: normalize(payload.message),
    source: normalize(payload.source),
    quiz_session_id: normalize(payload.quizSessionId),
    metadata: payload.metadata ?? null,
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
      { error: "Failed to store lead." },
      { status: 500 },
    );
  }

  try {
    const emailPayload = buildLeadEmail({
      name,
      company,
      position,
      employeeCount,
      industry,
      phone: normalize(payload.phone),
      email,
      message: normalize(payload.message),
      source: normalize(payload.source),
      quizSessionId: normalize(payload.quizSessionId),
      path,
    });
    await sendNotificationEmail(emailPayload);
  } catch (err) {
    console.error("Lead email notification failed.", err);
  }

  return NextResponse.json({ ok: true });
}
