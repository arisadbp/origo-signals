import {
  companies,
  companyCountryHsMetrics,
  companyTradeRows,
  countries,
  countryMetrics,
  hsCodes,
  months,
  type Company,
  type CompanyTradeRow,
} from "@/mocks/market-intelligence";

export type DateRangeOption = "12m" | "3y" | "5y" | "custom";
export type MetricOption = "weight" | "value" | "importers";
export type TrendDirection = "up" | "down" | "flat";

export type CountrySummaryRow = {
  countryCode: string;
  countryName: string;
  total: number;
  importersCount: number;
  share: number;
  trend: { direction: TrendDirection; changePct: number };
  series: number[];
};

export type CompanySummaryRow = {
  companyId: string;
  name: string;
  buyerType?: Company["buyerType"];
  weightKg: number;
  valueUsd?: number;
  frequency: number;
  frequencyLabel: string;
  trend: { direction: TrendDirection; changePct: number };
  lastActiveDate?: string;
};

export const metricDefinitions = {
  weight: {
    key: "weightKg",
    label: "Total Weight (KG)",
  },
  value: {
    key: "valueUsd",
    label: "Total Value (USD)",
  },
  importers: {
    key: "importersCount",
    label: "#Importers",
  },
} as const;

export const countryByCode = new Map(
  countries.map((country) => [country.code, country])
);

export const hsCodeByCode = new Map(hsCodes.map((hs) => [hs.code, hs]));

export const companyById = new Map(companies.map((company) => [company.id, company]));

const numberFormatter = new Intl.NumberFormat("en-US");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatNumber(value: number) {
  return numberFormatter.format(Math.round(value));
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatMonthLabel(month: string) {
  const [year, monthValue] = month.split("-");
  const date = new Date(Number(year), Number(monthValue) - 1, 1);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export function formatDateLabel(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getFlagEmoji(code: string) {
  if (!code || code.length !== 2) return "";
  const chars = code.toUpperCase().split("") as [string, string];
  return String.fromCodePoint(
    127397 + chars[0].charCodeAt(0),
    127397 + chars[1].charCodeAt(0)
  );
}

export function getAvailableMonthsForHs(hsCode: string) {
  const monthsSet = new Set(
    countryMetrics
      .filter((row) => row.hsCode === hsCode)
      .map((row) => row.month)
  );
  return months.filter((month) => monthsSet.has(month));
}

export function getDateRangeMonths(option: DateRangeOption, available: string[]) {
  if (!available.length) return [];
  const latestIndex = available.length - 1;
  const count = option === "12m" ? 12 : option === "3y" ? 36 : option === "5y" ? 60 : available.length;
  const startIndex = Math.max(0, latestIndex - count + 1);
  return available.slice(startIndex);
}

export function getDateRangeLabel(option: DateRangeOption, monthsInRange: string[]) {
  if (!monthsInRange.length) return "";
  if (option === "12m") return "Last 12M";
  if (option === "3y") return "Last 3Y";
  if (option === "5y") return "Last 5Y";
  const start = formatMonthLabel(monthsInRange[0]);
  const end = formatMonthLabel(monthsInRange[monthsInRange.length - 1]);
  return `${start} - ${end}`;
}

export function getHsCoverage(hsCode: string) {
  const metrics = countryMetrics.filter((row) => row.hsCode === hsCode);
  const countryCount = new Set(metrics.map((row) => row.countryCode)).size;
  const monthsSorted = metrics.map((row) => row.month).sort();
  const firstMonth = monthsSorted[0];
  const lastMonth = monthsSorted[monthsSorted.length - 1];
  return {
    countryCount,
    dateRange: firstMonth && lastMonth ? `${formatMonthLabel(firstMonth)} - ${formatMonthLabel(lastMonth)}` : "",
    lastUpdated: lastMonth ? formatMonthLabel(lastMonth) : "",
  };
}

export function hasValueMetric(hsCode: string) {
  return countryMetrics.some((row) => row.hsCode === hsCode && typeof row.valueUsd === "number");
}

function getMetricValue(row: { weightKg: number; valueUsd?: number; importersCount: number }, metric: MetricOption) {
  if (metric === "value") return row.valueUsd ?? 0;
  if (metric === "importers") return row.importersCount;
  return row.weightKg;
}

export function computeTrend(series: number[]) {
  const lookback = Math.min(12, Math.floor(series.length / 2));
  if (lookback === 0) {
    return { direction: "flat" as TrendDirection, changePct: 0 };
  }
  const current = series.slice(-lookback).reduce((sum, value) => sum + value, 0);
  const previous = series.slice(-lookback * 2, -lookback).reduce((sum, value) => sum + value, 0);
  if (previous === 0) {
    return {
      direction: current > 0 ? "up" : "flat",
      changePct: current > 0 ? 1 : 0,
    };
  }
  const changePct = (current - previous) / previous;
  if (changePct > 0.05) return { direction: "up", changePct };
  if (changePct < -0.05) return { direction: "down", changePct };
  return { direction: "flat", changePct };
}

export function getCountrySummary(
  hsCode: string,
  monthsInRange: string[],
  metric: MetricOption
): CountrySummaryRow[] {
  const monthsSet = new Set(monthsInRange);
  const totalsByCountry = new Map<
    string,
    {
      total: number;
      importersTotal: number;
      monthCount: number;
      seriesByMonth: Map<string, number>;
    }
  >();

  for (const row of countryMetrics) {
    if (row.hsCode !== hsCode || !monthsSet.has(row.month)) continue;
    const entry = totalsByCountry.get(row.countryCode) ?? {
      total: 0,
      importersTotal: 0,
      monthCount: 0,
      seriesByMonth: new Map<string, number>(),
    };
    const metricValue = getMetricValue(row, metric);
    entry.total += metricValue;
    entry.importersTotal += row.importersCount;
    entry.monthCount += 1;
    entry.seriesByMonth.set(row.month, (entry.seriesByMonth.get(row.month) ?? 0) + metricValue);
    totalsByCountry.set(row.countryCode, entry);
  }

  const globalTotal = Array.from(totalsByCountry.values()).reduce((sum, entry) => sum + entry.total, 0);

  return Array.from(totalsByCountry.entries()).map(([countryCode, entry]) => {
    const country = countryByCode.get(countryCode);
    const series = monthsInRange.map((month) => entry.seriesByMonth.get(month) ?? 0);
    return {
      countryCode,
      countryName: country?.name ?? countryCode,
      total: entry.total,
      importersCount: Math.round(entry.importersTotal / Math.max(1, entry.monthCount)),
      share: globalTotal ? entry.total / globalTotal : 0,
      trend: computeTrend(series),
      series,
    };
  });
}

export function getCompanySummary(
  hsCode: string,
  monthsInRange: string[],
  countryCode?: string
): CompanySummaryRow[] {
  const monthsSet = new Set(monthsInRange);
  const byCompany = new Map<
    string,
    {
      weightKg: number;
      valueUsd: number;
      shipments: number;
      seriesByMonth: Map<string, number>;
      lastActiveDate?: string;
      monthsActive: Set<string>;
    }
  >();

  for (const row of companyCountryHsMetrics) {
    if (row.hsCode !== hsCode || !monthsSet.has(row.month)) continue;
    const company = companyById.get(row.companyId);
    if (countryCode && company?.countryCode !== countryCode) continue;

    const entry = byCompany.get(row.companyId) ?? {
      weightKg: 0,
      valueUsd: 0,
      shipments: 0,
      seriesByMonth: new Map<string, number>(),
      lastActiveDate: row.lastActiveDate,
      monthsActive: new Set<string>(),
    };
    entry.weightKg += row.weightKg;
    entry.valueUsd += row.valueUsd ?? 0;
    entry.shipments += row.shipmentsCount ?? 0;
    entry.seriesByMonth.set(row.month, (entry.seriesByMonth.get(row.month) ?? 0) + row.weightKg);
    entry.lastActiveDate = row.lastActiveDate ?? entry.lastActiveDate;
    entry.monthsActive.add(row.month);
    byCompany.set(row.companyId, entry);
  }

  return Array.from(byCompany.entries()).map(([companyId, entry]) => {
    const company = companyById.get(companyId);
    const series = monthsInRange.map((month) => entry.seriesByMonth.get(month) ?? 0);
    const trend = computeTrend(series);
    const frequency = entry.shipments > 0 ? entry.shipments : entry.monthsActive.size;
    const frequencyLabel = entry.shipments > 0 ? "shipments" : "months";
    return {
      companyId,
      name: company?.name ?? companyId,
      buyerType: company?.buyerType,
      weightKg: entry.weightKg,
      valueUsd: entry.valueUsd,
      frequency,
      frequencyLabel,
      trend,
      lastActiveDate: entry.lastActiveDate,
    };
  });
}

export function getCompanyTradeHistory(
  companyId: string,
  hsCode: string,
  monthsInRange: string[]
): CompanyTradeRow[] {
  const monthsSet = new Set(monthsInRange);
  return companyTradeRows
    .filter((row) => row.companyId === companyId && row.hsCode === hsCode)
    .filter((row) => monthsSet.has(row.date.slice(0, 7)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getDisplayCountry(code?: string) {
  if (!code) return null;
  return countryByCode.get(code);
}

export function formatMetricValue(metric: MetricOption, value: number) {
  if (metric === "value") return formatCurrency(value);
  if (metric === "importers") return formatNumber(value);
  return `${formatNumber(value)} kg`;
}

export function formatShare(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatTrendLabel(direction: TrendDirection, changePct: number) {
  if (direction === "flat") return "0%";
  return `${Math.abs(changePct * 100).toFixed(1)}%`;
}

export function getCountryList() {
  return countries;
}

export { hsCodes, countries, companies };
