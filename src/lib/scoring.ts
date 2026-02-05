export type AnswerMap = Record<number, string>;

export type TierKey =
  | "noiseDrivenExecution"
  | "partialSignalClarity"
  | "signalDrivenGrowthReady";

const SCORE_STEPS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] as const;

const OPTION_POINTS_BY_STEP: Record<number, Record<string, number>> = {
  8: {
    "มี — สอบถามจากลูกค้าในตลาดที่เกิดขึ้นจริงในช่วงปีที่ผ่านมา": 10,
    "มีข้อมูลบางส่วน แต่ยังไม่เห็นภาพรวม": 7,
    "ส่วนใหญ่เป็นการทดลองขาย": 3,
    "ยังไม่มีความชัดเจน": 0,
  },
  9: {
    "ชัดเจนมาก": 10,
    "ค่อนข้างชัดเจน": 7,
    "ไม่ชัดเจน": 3,
    "ยังไม่มีข้อมูล": 0,
  },
  10: {
    "รู้ชัดเจน และมีการกำหนดแผนไว้แล้ว": 10,
    "พอทราบเป็นแนวทางบ้าง": 7,
    "ยังไม่ค่อยชัด": 3,
    "ยังไม่มีการคัดกรอง ลองทำทุกอย่าง": 0,
  },
  11: {
    "กลุ่มเป้าหมายชัดเจนมาก": 10,
    "ค่อนข้างชัดเจน": 7,
    "กำหนดเป้าหมายไว้กว้าง ๆ": 3,
    "ยังไม่มีการจัดลำดับความสำคัญ": 0,
  },
  12: {
    "มั่นใจมาก": 10,
    "ค่อนข้างมั่นใจ": 7,
    "ยังไม่แน่ใจ": 3,
    "ไม่มีการเก็บข้อมูลส่วนนี้ชัดเจน": 0,
  },
  13: {
    "น้อยมาก": 10,
    "มีบ้าง": 7,
    "ค่อนข้างมาก": 3,
    "ไม่ทราบ / ไม่มีข้อมูลชัดเจน": 0,
  },
  14: {
    "มีระบบการตัดสินใจที่ชัดเจน": 10,
    "มีบางส่วน แต่ยังไม่เป็นโครงสร้าง": 7,
    "ตัดสินใจตามสถานการณ์เฉพาะหน้า": 3,
    "ใช้สัญชาตญาณหรือประสบการณ์ส่วนตัว": 0,
  },
  15: {
    "ทำทุกครั้ง": 10,
    "ทำบ้างบางครั้ง": 7,
    "ทำแต่น้อยมาก": 3,
    "ไม่เคยทำเลย": 0,
  },
  16: {
    "บันทึกครบถ้วนและนำไปใช้ต่อได้ทันที": 10,
    "บันทึกไว้เพียงบางส่วน": 7,
    "เน้นจากประสบการณ์ตัวบุคคล": 3,
    "ไม่มีการบันทึกเลย": 0,
  },
  17: {
    "ระบุได้อย่างชัดเจน": 10,
    "น่าจะพอทราบ": 7,
    "ไม่แน่ใจ": 3,
    "ไม่ทราบเลย": 0,
  },
};

const GATE_A_NO_DATA = new Set([
  "ยังไม่มีความชัดเจน",
  "ยังไม่มีข้อมูล",
  "ไม่มีการเก็บข้อมูลส่วนนี้ชัดเจน",
  "ไม่มีการบันทึกเลย",
]);

const GATE_B_STEP_8 = "ยังไม่มีความชัดเจน";
const GATE_B_STEP_17 = "ไม่ทราบเลย";
const GATE_C_STEP_12 = "ไม่มีการเก็บข้อมูลส่วนนี้ชัดเจน";

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const toPercent = (raw: number, max: number) => {
  if (max <= 0) return 0;
  return clamp(Math.round((raw / max) * 100));
};

export const mapOptionToPoints = (step: number, optionText?: string) => {
  if (!optionText) return 0;
  const map = OPTION_POINTS_BY_STEP[step];
  if (!map) return 0;
  const points = map[optionText];
  return typeof points === "number" ? points : 0;
};

export const computeRawPointsPerStep = (answers: AnswerMap) => {
  return SCORE_STEPS.reduce<Record<number, number>>((acc, step) => {
    acc[step] = mapOptionToPoints(step, answers[step]);
    return acc;
  }, {});
};

export const computeRawScoreTotal = (rawPointsPerStep: Record<number, number>) =>
  SCORE_STEPS.reduce((total, step) => total + (rawPointsPerStep[step] ?? 0), 0);

export const applyGates = (
  scorePercent: number,
  answers: AnswerMap,
  rawPointsPerStep: Record<number, number>,
) => {
  let finalScore = scorePercent;

  const hasNoData = [8, 9, 12, 16].some((step) =>
    GATE_A_NO_DATA.has(answers[step] ?? ""),
  );
  if (hasNoData) {
    finalScore = Math.max(0, finalScore - 5);
  }

  if (answers[8] === GATE_B_STEP_8 && answers[17] === GATE_B_STEP_17) {
    finalScore = Math.min(finalScore, 40);
  }

  if (answers[12] === GATE_C_STEP_12) {
    finalScore = Math.min(finalScore, 70);
  }

  return clamp(finalScore);
};

export const getTierKey = (scorePercentFinal: number): TierKey => {
  if (scorePercentFinal <= 40) return "noiseDrivenExecution";
  if (scorePercentFinal <= 70) return "partialSignalClarity";
  return "signalDrivenGrowthReady";
};

export const computeInsights = (rawPointsPerStep: Record<number, number>) => {
  const marketRaw =
    (rawPointsPerStep[8] ?? 0) +
    (rawPointsPerStep[9] ?? 0) +
    (rawPointsPerStep[10] ?? 0) +
    (rawPointsPerStep[17] ?? 0);
  const customerRaw =
    (rawPointsPerStep[11] ?? 0) +
    (rawPointsPerStep[13] ?? 0) +
    (rawPointsPerStep[14] ?? 0);
  const cacHealthRaw =
    (rawPointsPerStep[12] ?? 0) +
    (rawPointsPerStep[15] ?? 0) +
    (rawPointsPerStep[13] ?? 0);

  const marketDirectionClarityPercent = toPercent(marketRaw, 40);
  const customerPrioritisationStrengthPercent = toPercent(customerRaw, 30);
  const cacHealthPercent = toPercent(cacHealthRaw, 30);
  const cacEfficiencyRiskPercent = clamp(Math.round(100 - cacHealthPercent));

  return {
    market_direction_clarity_percent: marketDirectionClarityPercent,
    customer_prioritisation_strength_percent:
      customerPrioritisationStrengthPercent,
    cac_efficiency_risk_percent: cacEfficiencyRiskPercent,
  };
};

export const computeScoreSummary = (answers: AnswerMap) => {
  const rawPointsPerStep = computeRawPointsPerStep(answers);
  const rawScoreTotal = computeRawScoreTotal(rawPointsPerStep);
  const scorePercentFinal = applyGates(rawScoreTotal, answers, rawPointsPerStep);
  const tier = getTierKey(scorePercentFinal);
  const insights = computeInsights(rawPointsPerStep);

  return {
    raw_points_per_step: rawPointsPerStep,
    raw_score_total: rawScoreTotal,
    score_percent_final: scorePercentFinal,
    tier,
    insights,
  };
};
