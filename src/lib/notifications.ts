type EmailPayload = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const getEnv = (key: string) => process.env[key]?.trim() || "";

const parseEmailList = (value?: string) =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

const safeValue = (value?: string | null) => value?.trim() || "-";

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `${formatter.format(date)} (Asia/Bangkok)`;
};

const buildList = (rows: { label: string; value?: string | null }[]) =>
  rows
    .map((row) => `${row.label}: ${safeValue(row.value)}`)
    .join("\n");

const BRAND = {
  primary: "#0B3D91",
  background: "#F5F7FA",
  text: "#0B1A33",
  border: "#E2E8F0",
};

const toHtmlRows = (rows: { label: string; value?: string | null }[]) =>
  rows
    .map(
      (row) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};font-weight:600;width:160px;">
            ${row.label}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};">
            ${safeValue(row.value)}
          </td>
        </tr>
      `,
    )
    .join("");

const wrapHtml = (title: string, subtitle: string, rows: string) => `
  <div style="background:${BRAND.background};padding:32px;font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
      <div style="background:${BRAND.primary};color:#ffffff;padding:20px 24px;">
        <h1 style="margin:0;font-size:20px;line-height:1.3;">${title}</h1>
        <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">${subtitle}</p>
      </div>
      <div style="padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>
            ${rows}
          </tbody>
        </table>
        <p style="margin:18px 0 0;color:#64748B;font-size:12px;">
          อีเมลนี้ถูกส่งอัตโนมัติจากระบบ ORIGO.
        </p>
      </div>
    </div>
  </div>
`;

export async function sendNotificationEmail(payload: EmailPayload) {
  const apiKey = getEnv("RESEND_API_KEY");
  const to = getEnv("EMAIL_TO");
  const from = getEnv("EMAIL_FROM");
  const cc = parseEmailList(getEnv("EMAIL_CC"));
  const bcc = parseEmailList(getEnv("EMAIL_BCC"));

  if (!apiKey || !to || !from) {
    console.warn(
      "Email notification skipped: missing RESEND_API_KEY, EMAIL_FROM, or EMAIL_TO.",
    );
    return { ok: false, skipped: true };
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      reply_to: payload.replyTo,
      cc: cc.length ? cc : undefined,
      bcc: bcc.length ? bcc : undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("Email notification failed.", response.status, errorText);
    return { ok: false, skipped: false };
  }

  return { ok: true, skipped: false };
}

export const buildLeadEmail = (lead: {
  name?: string | null;
  company?: string | null;
  position?: string | null;
  employeeCount?: string | null;
  industry?: string | null;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  source?: string | null;
  quizSessionId?: string | null;
  path?: string | null;
}) => {
  const subject = `New lead: ${safeValue(lead.name)} @ ${safeValue(
    lead.company,
  )}`;
  const rows = [
    { label: "Name", value: lead.name },
    { label: "Company", value: lead.company },
    { label: "Position", value: lead.position },
    { label: "Employees", value: lead.employeeCount },
    { label: "Industry", value: lead.industry },
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    { label: "Message", value: lead.message },
    { label: "Source", value: lead.source },
    { label: "Quiz Session", value: lead.quizSessionId },
    { label: "Path", value: lead.path },
  ];
  const text = buildList(rows);
  const html = wrapHtml("มี Lead ใหม่เข้ามา", "รายละเอียดจากฟอร์มติดต่อ", toHtmlRows(rows));

  return {
    subject,
    text,
    html,
    replyTo: lead.email ?? undefined,
  };
};

export const buildAppointmentEmail = (appointment: {
  name?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  startTime?: string | null;
  timezone?: string | null;
  source?: string | null;
  quizSessionId?: string | null;
}) => {
  const subject = `New appointment: ${safeValue(appointment.name)} @ ${safeValue(
    appointment.company,
  )}`;
  const rows = [
    { label: "Name", value: appointment.name },
    { label: "Company", value: appointment.company },
    { label: "Email", value: appointment.email },
    { label: "Phone", value: appointment.phone },
    { label: "Message", value: appointment.message },
    { label: "Start Time", value: formatDateTime(appointment.startTime) },
    { label: "Timezone", value: appointment.timezone },
    { label: "Source", value: appointment.source },
    { label: "Quiz Session", value: appointment.quizSessionId },
  ];
  const text = buildList(rows);
  const html = wrapHtml(
    "มีการจองเวลานัดหมายใหม่",
    "โปรดตรวจสอบรายละเอียดด้านล่าง",
    toHtmlRows(rows),
  );

  return {
    subject,
    text,
    html,
    replyTo: appointment.email ?? undefined,
  };
};

export const buildSubmissionEmail = (payload: {
  contact: {
    name?: string | null;
    company?: string | null;
    position?: string | null;
    employeeCount?: string | null;
    industry?: string | null;
    phone?: string | null;
    email?: string | null;
  };
  appointment: {
    startTime?: string | null;
    timezone?: string | null;
  };
  summary: {
    raw_score_total: number;
    score_percent_final: number;
    tier: string;
  };
  source?: string | null;
  path?: string | null;
}) => {
  const subject = `New submission: ${safeValue(payload.contact.name)} @ ${safeValue(
    payload.contact.company,
  )}`;
  const rows = [
    { label: "Name", value: payload.contact.name },
    { label: "Company", value: payload.contact.company },
    { label: "Position", value: payload.contact.position },
    { label: "Employees", value: payload.contact.employeeCount },
    { label: "Industry", value: payload.contact.industry },
    { label: "Email", value: payload.contact.email },
    { label: "Phone", value: payload.contact.phone },
    { label: "Start Time", value: formatDateTime(payload.appointment.startTime) },
    { label: "Timezone", value: payload.appointment.timezone },
    { label: "Score", value: String(payload.summary.score_percent_final ?? "-") },
    { label: "Tier", value: payload.summary.tier },
    { label: "Source", value: payload.source },
    { label: "Path", value: payload.path },
  ];
  const text = buildList(rows);
  const html = wrapHtml(
    "มี Submission ใหม่ครบทุกขั้นตอน",
    "แบบสอบถาม + นัดหมาย",
    toHtmlRows(rows),
  );

  return {
    subject,
    text,
    html,
    replyTo: payload.contact.email ?? undefined,
  };
};
