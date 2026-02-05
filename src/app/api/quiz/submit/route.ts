import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";

type QuizPayload = {
  contact?: Record<string, unknown> | null;
  answers?: Record<string, unknown> | null;
  rawPoints?: Record<string, unknown> | null;
  rawScoreTotal?: number | null;
  scorePercentFinal?: number | null;
  tier?: string | null;
  insights?: Record<string, unknown> | null;
  utm?: Record<string, unknown> | null;
  device?: Record<string, unknown> | null;
  formStartedAt?: number;
  honeypot?: string;
};

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
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
  let payload: QuizPayload | null = null;

  try {
    payload = (await request.json()) as QuizPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { error: "Missing quiz payload." },
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

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip =
    forwardedFor.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;
  if (ip && isRateLimited(`quiz:${ip}`)) {
    return NextResponse.json({ error: "Rate limited." }, { status: 429 });
  }

  const sessionId = crypto.randomUUID();
  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("quiz_sessions").insert({
    id: sessionId,
    contact: payload.contact ?? null,
    answers: payload.answers ?? null,
    raw_points: payload.rawPoints ?? null,
    raw_score_total: payload.rawScoreTotal ?? null,
    score_percent_final: payload.scorePercentFinal ?? null,
    tier: payload.tier ?? null,
    insights: payload.insights ?? null,
    utm: payload.utm ?? null,
    device: payload.device ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sessionId });
}
