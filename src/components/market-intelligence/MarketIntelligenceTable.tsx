"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formatDateLabel,
  formatMetricValue,
  formatNumber,
  formatTrendLabel,
  getFlagEmoji,
  type CompanySummaryRow,
  type CountrySummaryRow,
  type MetricOption,
} from "@/lib/market-intelligence";
import { cn } from "@/lib/utils";

const SORT_ICON = ArrowUpDown;

type SortDirection = "asc" | "desc";

type Props = {
  mode: "countries" | "companies";
  countryRows: CountrySummaryRow[];
  companyRows: CompanySummaryRow[];
  metric: MetricOption;
  onSelectCountry: (countryCode: string) => void;
  onViewCompany: (companyId: string) => void;
  isLoading?: boolean;
};

function TrendIndicator({
  direction,
  changePct,
}: {
  direction: "up" | "down" | "flat";
  changePct: number;
}) {
  const Icon = direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : ArrowRight;
  const colorClass =
    direction === "up"
      ? "text-emerald-600"
      : direction === "down"
        ? "text-rose-500"
        : "text-muted-foreground";
  return (
    <div className={cn("flex items-center gap-1 text-xs font-medium", colorClass)}>
      <Icon className="size-3" />
      <span>{formatTrendLabel(direction, changePct)}</span>
    </div>
  );
}

export default function MarketIntelligenceTable({
  mode,
  countryRows,
  companyRows,
  metric,
  onSelectCountry,
  onViewCompany,
  isLoading,
}: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const rows = useMemo(() => {
    if (mode === "countries") {
      const filtered = countryRows.filter((row) => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return true;
        return (
          row.countryName.toLowerCase().includes(keyword) ||
          row.countryCode.toLowerCase().includes(keyword)
        );
      });

      const sorted = [...filtered].sort((a, b) => {
        const multiplier = sortDirection === "asc" ? 1 : -1;
        if (sortKey === "country") {
          return multiplier * a.countryName.localeCompare(b.countryName);
        }
        if (sortKey === "importers") {
          return multiplier * (a.importersCount - b.importersCount);
        }
        if (sortKey === "trend") {
          return multiplier * (a.trend.changePct - b.trend.changePct);
        }
        return multiplier * (a.total - b.total);
      });
      return sorted;
    }

    const filteredCompanies = companyRows.filter((row) => {
      const keyword = search.trim().toLowerCase();
      if (!keyword) return true;
      return row.name.toLowerCase().includes(keyword);
    });

    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      if (sortKey === "company") {
        return multiplier * a.name.localeCompare(b.name);
      }
      if (sortKey === "frequency") {
        return multiplier * (a.frequency - b.frequency);
      }
      if (sortKey === "trend") {
        return multiplier * (a.trend.changePct - b.trend.changePct);
      }
      if (sortKey === "lastActive") {
        return multiplier * (a.lastActiveDate ?? "").localeCompare(b.lastActiveDate ?? "");
      }
      return multiplier * (a.weightKg - b.weightKg);
    });

    return sortedCompanies;
  }, [companyRows, countryRows, mode, search, sortDirection, sortKey]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {mode === "countries" ? "Global Country Summary" : "Country Company List"}
          </p>
          <p className="text-xs text-muted-foreground">
            {mode === "countries"
              ? "Sorted by market size and growth signals"
              : "Company activity for the selected market"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={mode === "countries" ? "Search countries" : "Search companies"}
            className="h-9 w-56 rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            {mode === "countries" ? (
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    type="button"
                    onClick={() => handleSort("country")}
                    className="flex items-center gap-1"
                  >
                    Country
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort("total")}
                    className="ml-auto flex items-center gap-1"
                  >
                    {metric === "importers" ? "#Importers" : "Total"}
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    type="button"
                    onClick={() => handleSort("trend")}
                    className="flex items-center gap-1"
                  >
                    Growth
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort("importers")}
                    className="ml-auto flex items-center gap-1"
                  >
                    #Importers
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            ) : (
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    type="button"
                    onClick={() => handleSort("company")}
                    className="flex items-center gap-1"
                  >
                    Company
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">Buyer Type</th>
                <th className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort("total")}
                    className="ml-auto flex items-center gap-1"
                  >
                    Est. Weight (KG)
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort("frequency")}
                    className="ml-auto flex items-center gap-1"
                  >
                    Frequency
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    type="button"
                    onClick={() => handleSort("trend")}
                    className="flex items-center gap-1"
                  >
                    Trend
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleSort("lastActive")}
                    className="ml-auto flex items-center gap-1"
                  >
                    Last Active
                    <SORT_ICON className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  <td className="px-4 py-4" colSpan={mode === "countries" ? 5 : 7}>
                    <div className="h-3 w-full rounded-full bg-muted/40" />
                  </td>
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                  colSpan={mode === "countries" ? 5 : 7}
                >
                  No results for this selection.
                </td>
              </tr>
            ) : mode === "countries" ? (
              rows.map((row) => (
                <tr key={row.countryCode} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getFlagEmoji(row.countryCode)}</span>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {row.countryName}
                        </div>
                        <div className="text-xs text-muted-foreground">{row.countryCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    {formatMetricValue(metric, row.total)}
                  </td>
                  <td className="px-4 py-3">
                    <TrendIndicator {...row.trend} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {formatNumber(row.importersCount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSelectCountry(row.countryCode)}
                    >
                      View / Focus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              rows.map((row) => (
                <tr key={row.companyId} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-foreground">{row.name}</div>
                    <div className="text-xs text-muted-foreground">{row.companyId}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.buyerType ?? "--"}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    {formatNumber(row.weightKg)}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {formatNumber(row.frequency)} {row.frequencyLabel}
                  </td>
                  <td className="px-4 py-3">
                    <TrendIndicator {...row.trend} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {row.lastActiveDate ? formatDateLabel(row.lastActiveDate) : "--"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewCompany(row.companyId)}
                    >
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
