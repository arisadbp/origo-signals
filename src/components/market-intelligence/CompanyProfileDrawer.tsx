"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, ExternalLink, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  companyById,
  formatCurrency,
  formatNumber,
  formatMonthLabel,
  getDisplayCountry,
  getCompanyTradeHistory,
  getFlagEmoji,
  hsCodeByCode,
} from "@/lib/market-intelligence";
import { cn } from "@/lib/utils";

const placeholder = "--";

type Props = {
  open: boolean;
  companyId?: string | null;
  onClose: () => void;
  hsCode: string;
  monthsInRange: string[];
  rangeLabel: string;
  isLoading?: boolean;
};

function CopyButton({ value }: { value?: string }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      <Copy className={cn("size-3", copied && "text-emerald-500")} />
    </Button>
  );
}

function DetailRow({ label, value, link }: { label: string; value?: string; link?: string }) {
  const canCopy = Boolean(value && value !== placeholder);
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 text-right font-medium text-foreground">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-foreground hover:underline"
          >
            {value ?? placeholder}
            <ExternalLink className="size-3" />
          </a>
        ) : (
          value ?? placeholder
        )}
        <CopyButton value={canCopy ? value : undefined} />
      </span>
    </div>
  );
}

function escapeCsv(value: string | number | undefined) {
  if (value === undefined) return "";
  const stringValue = String(value);
  if (stringValue.includes(",") || stringValue.includes("\"")) {
    return `"${stringValue.replace(/\"/g, '""')}"`;
  }
  return stringValue;
}

export default function CompanyProfileDrawer({
  open,
  companyId,
  onClose,
  hsCode,
  monthsInRange,
  rangeLabel,
  isLoading = false,
}: Props) {
  const company = companyId ? companyById.get(companyId) : undefined;
  const hsMeta = hsCodeByCode.get(hsCode);
  const countryMeta = company ? getDisplayCountry(company.countryCode) : null;

  const tradeRows = useMemo(() => {
    if (!companyId) return [];
    return getCompanyTradeHistory(companyId, hsCode, monthsInRange);
  }, [companyId, hsCode, monthsInRange]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleExport = () => {
    if (!tradeRows.length || !company) return;
    const header = [
      "Date",
      "Origin Country",
      "Counterparty",
      "Weight (KG)",
      "Value (USD)",
      "Shipments",
    ];
    const lines = tradeRows.map((row) => [
      escapeCsv(formatMonthLabel(row.date.slice(0, 7))),
      escapeCsv(row.originCountry ?? ""),
      escapeCsv(row.counterparty ?? ""),
      escapeCsv(row.weightKg),
      escapeCsv(row.valueUsd ?? 0),
      escapeCsv(row.shipmentsCount ?? 0),
    ]);
    const csv = [header.join(","), ...lines.map((line) => line.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `trade-history-${company.name.replace(/\s+/g, "-").toLowerCase()}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!open || !company) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-border bg-background p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase text-muted-foreground">Company Profile</p>
            <h2 className="text-2xl font-semibold text-foreground">{company.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {getFlagEmoji(company.countryCode)} {company.countryCode} - {company.industry ?? "General Trading"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <Card className="gap-4 p-5">
            <h3 className="text-sm font-semibold text-foreground">Company Identity</h3>
            <div className="mt-3 grid gap-3">
              <DetailRow label="Company" value={company.name} />
              <DetailRow
                label="Country"
                value={
                  countryMeta
                    ? `${countryMeta.name} (${countryMeta.code})`
                    : company.countryCode
                }
              />
              <DetailRow label="Industry" value={company.industry ?? placeholder} />
              <DetailRow label="Buyer Type" value={company.buyerType ?? placeholder} />
              <DetailRow label="Website" value={company.website ?? placeholder} link={company.website} />
            </div>
          </Card>

          <Card className="gap-4 p-5">
            <h3 className="text-sm font-semibold text-foreground">Contact Information</h3>
            <div className="mt-3 grid gap-3">
              <DetailRow label="Contact" value={company.contacts?.person ?? placeholder} />
              <DetailRow label="Email" value={company.contacts?.email ?? placeholder} link={company.contacts?.email ? `mailto:${company.contacts.email}` : undefined} />
              <DetailRow label="Phone" value={company.contacts?.phone ?? placeholder} link={company.contacts?.phone ? `tel:${company.contacts.phone}` : undefined} />
              <DetailRow label="Website" value={company.contacts?.website ?? company.website ?? placeholder} link={company.contacts?.website ?? company.website} />
              <DetailRow label="LinkedIn" value={company.contacts?.linkedin ?? placeholder} link={company.contacts?.linkedin} />
            </div>
          </Card>

          <Card className="gap-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Trade History</h3>
                <p className="text-xs text-muted-foreground">
                  {hsMeta?.code} {hsMeta?.description} - {rangeLabel}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Export CSV
              </Button>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-muted/40 text-[11px] uppercase text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Date</th>
                    <th className="px-3 py-2 text-left">Origin</th>
                    <th className="px-3 py-2 text-left">Counterparty</th>
                    <th className="px-3 py-2 text-right">Weight (KG)</th>
                    <th className="px-3 py-2 text-right">Value (USD)</th>
                    <th className="px-3 py-2 text-right">Shipments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={`profile-skeleton-${index}`} className="animate-pulse">
                        <td className="px-3 py-3" colSpan={6}>
                          <div className="h-3 w-full rounded-full bg-muted/40" />
                        </td>
                      </tr>
                    ))
                  ) : tradeRows.length === 0 ? (
                    <tr>
                      <td className="px-3 py-6 text-center text-xs text-muted-foreground" colSpan={6}>
                        No trade history for this selection.
                      </td>
                    </tr>
                  ) : (
                    tradeRows.map((row) => (
                      <tr key={`${row.companyId}-${row.date}`}>
                        <td className="px-3 py-2 text-muted-foreground">
                          {formatMonthLabel(row.date.slice(0, 7))}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {row.originCountry ?? placeholder}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {row.counterparty ?? placeholder}
                        </td>
                        <td className="px-3 py-2 text-right text-foreground">
                          {formatNumber(row.weightKg)}
                        </td>
                        <td className="px-3 py-2 text-right text-foreground">
                          {row.valueUsd ? formatCurrency(row.valueUsd) : placeholder}
                        </td>
                        <td className="px-3 py-2 text-right text-muted-foreground">
                          {row.shipmentsCount ?? placeholder}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
