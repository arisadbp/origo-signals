import { COPY } from "@/lib/copy";

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok",
  }).format(date);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(date);
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok",
  }).format(date);
};

export const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) return "-";
  return `${Math.round(value)}%`;
};

export const getContactValue = (
  contact: Record<string, string>,
  key: string,
) => {
  const value = contact?.[key];
  return typeof value === "string" ? value.trim() : "";
};

export const buildAnswerList = (answers: Record<string, string>) => {
  return Object.entries(answers ?? {})
    .map(([key, value]) => ({
      step: Number(key),
      value,
    }))
    .filter((item) => Number.isFinite(item.step))
    .sort((a, b) => a.step - b.step);
};

export const getQuizStepLabel = (step: number) => {
  const stepData = COPY.quiz.steps[step as keyof typeof COPY.quiz.steps];
  if (!stepData) return `ข้อที่ ${step}`;
  return "question" in stepData ? stepData.question : stepData.label;
};

export const QUIZ_INSIGHTS = [
  { label: "Market Direction", key: "market_direction_clarity_percent" },
  { label: "Customer Focus", key: "customer_prioritisation_strength_percent" },
  { label: "CAC Efficiency", key: "cac_efficiency_risk_percent" },
];
