"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  countries,
  getCountrySummary,
  getDateRangeLabel,
  getDateRangeMonths,
  getDisplayCountry,
  getHsCoverage,
  getCompanySummary,
  getAvailableMonthsForHs,
  getCountryList,
  hasValueMetric,
  hsCodes,
  metricDefinitions,
  type DateRangeOption,
  type MetricOption,
} from "@/lib/market-intelligence";
import { cn } from "@/lib/utils";

import CompanyProfileDrawer from "@/components/market-intelligence/CompanyProfileDrawer";
import MarketIntelligenceMap from "@/components/market-intelligence/MarketIntelligenceMap";
import MarketIntelligenceTable from "@/components/market-intelligence/MarketIntelligenceTable";

const rangeOptions: Array<{ value: DateRangeOption; label: string }> = [
  { value: "12m", label: "Last 12M" },
  { value: "3y", label: "Last 3Y" },
  { value: "5y", label: "Last 5Y" },
  { value: "custom", label: "Custom" },
];

const metricOptions: Array<{ value: MetricOption; label: string }> = [
  { value: "weight", label: "Total Weight (KG)" },
  { value: "value", label: "Total Value (USD)" },
  { value: "importers", label: "#Importers" },
];

function formatHsOption(code: string, description: string) {
  return `${code} - ${description}`;
}

export default function MarketIntelligencePage() {
  const [selectedHsCode, setSelectedHsCode] = useState(hsCodes[0]?.code ?? "");
  const [hsInput, setHsInput] = useState(
    hsCodes[0] ? formatHsOption(hsCodes[0].code, hsCodes[0].description) : ""
  );
  const [dateRange, setDateRange] = useState<DateRangeOption>("12m");
  const [metric, setMetric] = useState<MetricOption>("weight");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryInput, setCountryInput] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout = useRef<number | null>(null);
  const profileTimeout = useRef<number | null>(null);

  const availableMonths = useMemo(
    () => getAvailableMonthsForHs(selectedHsCode),
    [selectedHsCode]
  );
  const monthsInRange = useMemo(
    () => getDateRangeMonths(dateRange, availableMonths),
    [dateRange, availableMonths]
  );
  const rangeLabel = useMemo(
    () => getDateRangeLabel(dateRange, monthsInRange),
    [dateRange, monthsInRange]
  );
  const hsCoverage = useMemo(
    () => getHsCoverage(selectedHsCode),
    [selectedHsCode]
  );
  const hasValue = useMemo(() => hasValueMetric(selectedHsCode), [selectedHsCode]);
  const activeMetric: MetricOption =
    hasValue || metric !== "value" ? metric : "weight";

  useEffect(() => {
    return () => {
      if (loadingTimeout.current) {
        window.clearTimeout(loadingTimeout.current);
      }
      if (profileTimeout.current) {
        window.clearTimeout(profileTimeout.current);
      }
    };
  }, []);

  const triggerLoading = () => {
    if (loadingTimeout.current) {
      window.clearTimeout(loadingTimeout.current);
    }
    setIsLoading(true);
    loadingTimeout.current = window.setTimeout(() => setIsLoading(false), 300);
  };

  const triggerProfileLoading = () => {
    if (profileTimeout.current) {
      window.clearTimeout(profileTimeout.current);
    }
    setProfileLoading(true);
    profileTimeout.current = window.setTimeout(() => setProfileLoading(false), 350);
  };

  const countrySummary = useMemo(
    () => getCountrySummary(selectedHsCode, monthsInRange, activeMetric),
    [selectedHsCode, monthsInRange, activeMetric]
  );

  const companySummary = useMemo(
    () =>
      selectedCountry
        ? getCompanySummary(selectedHsCode, monthsInRange, selectedCountry)
        : [],
    [selectedCountry, selectedHsCode, monthsInRange]
  );

  const handleHsChange = (value: string) => {
    setHsInput(value);
    const match = hsCodes.find(
      (hs) => value.trim() === hs.code || value.startsWith(hs.code)
    );
    if (match) {
      setSelectedHsCode(match.code);
      setSelectedCountry(null);
      setSelectedCompany(null);
      setProfileLoading(false);
      if (!hasValueMetric(match.code) && metric === "value") {
        setMetric("weight");
      }
      triggerLoading();
    }
  };

  const handleCountryInput = (value: string) => {
    setCountryInput(value);
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      setSelectedCountry(null);
      return;
    }
    const match = getCountryList().find((country) => {
      const label = `${country.name} (${country.code})`.toLowerCase();
      return (
        country.code.toLowerCase() === normalized ||
        country.name.toLowerCase() === normalized ||
        label === normalized
      );
    });
    if (match) {
      setSelectedCountry(match.code);
      setSelectedCompany(null);
      setProfileLoading(false);
      setCountryInput(`${match.name} (${match.code})`);
      triggerLoading();
    }
  };

  const handleSelectCountry = (countryCode: string) => {
    const country = getDisplayCountry(countryCode);
    setSelectedCountry(countryCode);
    setSelectedCompany(null);
    setProfileLoading(false);
    setCountryInput(country ? `${country.name} (${country.code})` : countryCode);
    triggerLoading();
  };

  const clearCountry = () => {
    setSelectedCountry(null);
    setSelectedCompany(null);
    setProfileLoading(false);
    setCountryInput("");
    triggerLoading();
  };

  const selectedCountryMeta = selectedCountry
    ? getDisplayCountry(selectedCountry)
    : null;

  const selectedHs = hsCodes.find((hs) => hs.code === selectedHsCode);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              O
            </div>
            <div>
              <p className="text-sm font-semibold">ORIGO Intelligence</p>
              <p className="text-xs text-muted-foreground">Multi-tenant mock workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link className="text-foreground" href="/market-intelligence">
              Market Intelligence
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="#">
              My Company
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="#">
              Upload Center
            </Link>
          </nav>
          <Badge variant="secondary">Mock Auth</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-6 pb-16 pt-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Market Intelligence</h1>
            <p className="text-sm text-muted-foreground">
              Monitor demand signals, importer density, and buyer activity by HS code.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">Global view</Badge>
            <Badge variant="secondary">Updated {hsCoverage.lastUpdated}</Badge>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-4 p-4">
            <p className="text-xs font-medium text-muted-foreground">HS Code</p>
            <div className="mt-2">
              <Input
                list="hs-code-list"
                value={hsInput}
                onChange={(event) => handleHsChange(event.target.value)}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
                placeholder="Search HS code"
              />
              <datalist id="hs-code-list">
                {hsCodes.map((hs) => (
                  <option
                    key={hs.code}
                    value={formatHsOption(hs.code, hs.description)}
                  />
                ))}
              </datalist>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {selectedHs?.code}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedHs?.description}
                  </p>
                </div>
                <Badge variant="secondary">Chapter {selectedHs?.chapter}</Badge>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Category</span>
                  <span className="font-medium text-foreground">
                    {selectedHs?.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data coverage</span>
                  <span className="font-medium text-foreground">
                    {hsCoverage.countryCount} countries
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Date range</span>
                  <span className="font-medium text-foreground">
                    {hsCoverage.dateRange}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last updated</span>
                  <span className="font-medium text-foreground">
                    {hsCoverage.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-4">
            <p className="text-xs font-medium text-muted-foreground">Date Range</p>
            <Select
              value={dateRange}
              onValueChange={(value) => {
                setDateRange(value as DateRangeOption);
                setSelectedCompany(null);
                triggerLoading();
              }}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {rangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {dateRange === "custom" && (
              <p className="mt-3 text-xs text-muted-foreground">
                Custom range coming soon.
              </p>
            )}
            <div className="mt-4 text-xs text-muted-foreground">
              <p>Active range</p>
              <p className="font-medium text-foreground">{rangeLabel}</p>
            </div>
          </Card>

          <Card className="lg:col-span-3 p-4">
            <p className="text-xs font-medium text-muted-foreground">Metric</p>
            <div className="mt-3 grid gap-2">
              {metricOptions
                .filter((option) => (option.value === "value" ? hasValue : true))
                .map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setMetric(option.value);
                      triggerLoading();
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-md border border-border px-3 py-2 text-left text-sm",
                      activeMetric === option.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {activeMetric === option.value ? "Selected" : ""}
                    </span>
                  </button>
                ))}
            </div>
          </Card>

          <Card className="lg:col-span-3 p-4">
            <p className="text-xs font-medium text-muted-foreground">Country Filter</p>
            <Input
              list="country-list"
              value={countryInput}
              onChange={(event) => handleCountryInput(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
              placeholder="Search country"
            />
            <datalist id="country-list">
              {countries.map((country) => (
                <option
                  key={country.code}
                  value={`${country.name} (${country.code})`}
                />
              ))}
            </datalist>
            <div className="mt-4">
              {selectedCountryMeta ? (
                <div className="flex items-center justify-between rounded-md border border-border bg-muted/20 px-3 py-2 text-xs">
                  <span>
                    Selected: {selectedCountryMeta.name} ({selectedCountryMeta.code})
                  </span>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={clearCountry}
                  >
                    x Clear
                  </button>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Focus the map and company list by selecting a country.
                </p>
              )}
            </div>
          </Card>
        </section>

        <Card className="p-4">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">World Trade Concentration</p>
              <p className="text-xs text-muted-foreground">
                Choropleth view of {metricDefinitions[activeMetric].label.toLowerCase()} for HS {selectedHsCode}
              </p>
            </div>
            {selectedCountryMeta && (
              <div className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1 text-xs">
                <span>
                  Selected: {selectedCountryMeta.name} ({selectedCountryMeta.code})
                </span>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={clearCountry}
                >
                  x Clear
                </button>
              </div>
            )}
          </div>
          <MarketIntelligenceMap
            data={countrySummary}
            metric={activeMetric}
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
            onResetView={clearCountry}
            isLoading={isLoading}
          />
        </Card>

        <Card className="p-4">
          <MarketIntelligenceTable
            mode={selectedCountry ? "companies" : "countries"}
            countryRows={countrySummary}
            companyRows={companySummary}
            metric={activeMetric}
            onSelectCountry={handleSelectCountry}
            onViewCompany={(companyId) => {
              setSelectedCompany(companyId);
              triggerProfileLoading();
            }}
            isLoading={isLoading}
          />
        </Card>
      </main>

      <CompanyProfileDrawer
        open={Boolean(selectedCompany)}
        companyId={selectedCompany}
        onClose={() => {
          setSelectedCompany(null);
          setProfileLoading(false);
        }}
        hsCode={selectedHsCode}
        monthsInRange={monthsInRange}
        rangeLabel={rangeLabel}
        isLoading={profileLoading}
      />
    </div>
  );
}
