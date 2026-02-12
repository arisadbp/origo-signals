export type HsCode = {
  code: string;
  description: string;
  category?: string;
  chapter?: string;
};

export type CountryMeta = {
  code: string;
  name: string;
  region?: string;
  lat: number;
  lng: number;
};

export type CountryMetric = {
  hsCode: string;
  month: string; // YYYY-MM
  countryCode: string;
  weightKg: number;
  valueUsd?: number;
  importersCount: number;
  share: number;
};

export type Company = {
  id: string;
  name: string;
  countryCode: string;
  buyerType?: "Importer" | "Distributor" | "Trader";
  industry?: string;
  website?: string;
  contacts?: {
    person?: string;
    email?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
  };
};

export type CompanyCountryHsMetric = {
  companyId: string;
  hsCode: string;
  month: string;
  weightKg: number;
  shipmentsCount?: number;
  valueUsd?: number;
  lastActiveDate?: string;
};

export type CompanyTradeRow = {
  companyId: string;
  hsCode: string;
  date: string;
  originCountry?: string;
  counterparty?: string;
  weightKg: number;
  shipmentsCount?: number;
  valueUsd?: number;
};

export const hsCodes: HsCode[] = [
  {
    code: "0901",
    description: "Coffee, whether or not roasted or decaffeinated",
    category: "Food & Beverage",
    chapter: "09",
  },
  {
    code: "3004",
    description: "Medicaments consisting of mixed or unmixed products",
    category: "Pharmaceuticals",
    chapter: "30",
  },
  {
    code: "8517",
    description: "Telephone sets and other apparatus for transmission",
    category: "Electronics",
    chapter: "85",
  },
  {
    code: "8703",
    description: "Motor cars and other motor vehicles",
    category: "Automotive",
    chapter: "87",
  },
];

export const countries: CountryMeta[] = [
  { code: "US", name: "United States", region: "North America", lat: 37.0902, lng: -95.7129 },
  { code: "CN", name: "China", region: "Asia", lat: 35.8617, lng: 104.1954 },
  { code: "JP", name: "Japan", region: "Asia", lat: 36.2048, lng: 138.2529 },
  { code: "DE", name: "Germany", region: "Europe", lat: 51.1657, lng: 10.4515 },
  { code: "NL", name: "Netherlands", region: "Europe", lat: 52.1326, lng: 5.2913 },
  { code: "IN", name: "India", region: "Asia", lat: 20.5937, lng: 78.9629 },
  { code: "VN", name: "Vietnam", region: "Asia", lat: 14.0583, lng: 108.2772 },
  { code: "TH", name: "Thailand", region: "Asia", lat: 15.87, lng: 100.9925 },
  { code: "BR", name: "Brazil", region: "South America", lat: -14.235, lng: -51.9253 },
  { code: "MX", name: "Mexico", region: "North America", lat: 23.6345, lng: -102.5528 },
  { code: "AE", name: "United Arab Emirates", region: "Middle East", lat: 23.4241, lng: 53.8478 },
  { code: "KR", name: "South Korea", region: "Asia", lat: 35.9078, lng: 127.7669 },
];

export const companies: Company[] = [
  {
    id: "c-jp-1",
    name: "Nippon Harvest Trading",
    countryCode: "JP",
    buyerType: "Importer",
    industry: "Food & Beverage",
    website: "https://nipponharvest.example",
    contacts: {
      person: "Keiko Tanaka",
      email: "keiko@nipponharvest.example",
      phone: "+81 3 5550 2100",
      website: "https://nipponharvest.example",
      linkedin: "https://linkedin.com/company/nippon-harvest",
    },
  },
  {
    id: "c-jp-2",
    name: "Sakura Foods Co.",
    countryCode: "JP",
    buyerType: "Distributor",
    industry: "Retail",
    website: "https://sakurafoods.example",
    contacts: {
      person: "Akira Sato",
      email: "akira@sakurafoods.example",
      phone: "+81 6 4920 8810",
      website: "https://sakurafoods.example",
    },
  },
  {
    id: "c-cn-1",
    name: "Shanghai Global Imports",
    countryCode: "CN",
    buyerType: "Importer",
    industry: "Electronics",
    website: "https://sgi.example",
    contacts: {
      person: "Li Wei",
      email: "li.wei@sgi.example",
      phone: "+86 21 6690 7712",
      website: "https://sgi.example",
      linkedin: "https://linkedin.com/company/sgi-global",
    },
  },
  {
    id: "c-cn-2",
    name: "Guangzhou Meridian Traders",
    countryCode: "CN",
    buyerType: "Trader",
    industry: "Automotive",
    website: "https://meridian-cn.example",
    contacts: {
      person: "Zhang Min",
      email: "zhang.min@meridian-cn.example",
      phone: "+86 20 3021 1100",
      website: "https://meridian-cn.example",
    },
  },
  {
    id: "c-th-1",
    name: "Origo Foods Thailand",
    countryCode: "TH",
    buyerType: "Importer",
    industry: "Food & Beverage",
    website: "https://origofoods-th.example",
    contacts: {
      person: "Pimchanok W.",
      email: "pimchanok@origofoods-th.example",
      phone: "+66 2 710 1400",
      website: "https://origofoods-th.example",
    },
  },
  {
    id: "c-vn-1",
    name: "VietAgro Hub",
    countryCode: "VN",
    buyerType: "Distributor",
    industry: "Agriculture",
    website: "https://vietagro.example",
    contacts: {
      person: "Nguyen Minh",
      email: "minh@vietagro.example",
      phone: "+84 28 3322 9010",
      website: "https://vietagro.example",
    },
  },
  {
    id: "c-de-1",
    name: "Rheinland Distribution",
    countryCode: "DE",
    buyerType: "Distributor",
    industry: "Pharmaceuticals",
    website: "https://rheinland-distribution.example",
    contacts: {
      person: "Lena Hoffmann",
      email: "lena@rheinland-distribution.example",
      phone: "+49 30 5512 3991",
      website: "https://rheinland-distribution.example",
      linkedin: "https://linkedin.com/company/rheinland-distribution",
    },
  },
  {
    id: "c-nl-1",
    name: "Holland Gate Logistics",
    countryCode: "NL",
    buyerType: "Trader",
    industry: "Logistics",
    website: "https://hollandgate.example",
    contacts: {
      person: "Marieke Janssen",
      email: "marieke@hollandgate.example",
      phone: "+31 20 990 4410",
      website: "https://hollandgate.example",
    },
  },
  {
    id: "c-us-1",
    name: "Sunrise MedTech",
    countryCode: "US",
    buyerType: "Importer",
    industry: "Healthcare",
    website: "https://sunrisemedtech.example",
    contacts: {
      person: "Jordan Lee",
      email: "jordan@sunrisemedtech.example",
      phone: "+1 415 555 0191",
      website: "https://sunrisemedtech.example",
      linkedin: "https://linkedin.com/company/sunrise-medtech",
    },
  },
  {
    id: "c-us-2",
    name: "Pacific Auto Supplies",
    countryCode: "US",
    buyerType: "Distributor",
    industry: "Automotive",
    website: "https://pacificauto.example",
    contacts: {
      person: "Morgan Reyes",
      email: "morgan@pacificauto.example",
      phone: "+1 213 555 7744",
      website: "https://pacificauto.example",
    },
  },
  {
    id: "c-ae-1",
    name: "Emirates TradeLink",
    countryCode: "AE",
    buyerType: "Trader",
    industry: "General Trading",
    website: "https://emiratestradelink.example",
    contacts: {
      person: "Amira Hassan",
      email: "amira@emiratestradelink.example",
      phone: "+971 4 568 9920",
      website: "https://emiratestradelink.example",
    },
  },
  {
    id: "c-mx-1",
    name: "Mexico City Importers",
    countryCode: "MX",
    buyerType: "Importer",
    industry: "Retail",
    website: "https://mc-importers.example",
    contacts: {
      person: "Carlos Ruiz",
      email: "carlos@mc-importers.example",
      phone: "+52 55 3310 0042",
      website: "https://mc-importers.example",
    },
  },
  {
    id: "c-kr-1",
    name: "Korea Connect Trading",
    countryCode: "KR",
    buyerType: "Trader",
    industry: "Electronics",
    website: "https://koreaconnect.example",
    contacts: {
      person: "Jisoo Park",
      email: "jisoo@koreaconnect.example",
      phone: "+82 2 533 8220",
      website: "https://koreaconnect.example",
    },
  },
  {
    id: "c-br-1",
    name: "Brasil Norte Distribuicao",
    countryCode: "BR",
    buyerType: "Distributor",
    industry: "Food & Beverage",
    website: "https://brasilnorte.example",
    contacts: {
      person: "Fernanda Souza",
      email: "fernanda@brasilnorte.example",
      phone: "+55 11 4440 2090",
      website: "https://brasilnorte.example",
    },
  },
  {
    id: "c-in-1",
    name: "Indus Bharat Traders",
    countryCode: "IN",
    buyerType: "Importer",
    industry: "Pharmaceuticals",
    website: "https://indusbharat.example",
    contacts: {
      person: "Ravi Gupta",
      email: "ravi@indusbharat.example",
      phone: "+91 22 4002 9020",
      website: "https://indusbharat.example",
      linkedin: "https://linkedin.com/company/indus-bharat",
    },
  },
];

const hsUnitPrice: Record<string, number> = {
  "0901": 4.2,
  "3004": 68.5,
  "8517": 145.0,
  "8703": 220.0,
};

const hsBaseMultiplier: Record<string, number> = {
  "0901": 0.85,
  "3004": 0.7,
  "8517": 1.15,
  "8703": 1.25,
};

const countryBase: Record<string, number> = {
  US: 120000,
  CN: 165000,
  JP: 98000,
  DE: 86000,
  NL: 64000,
  IN: 110000,
  VN: 72000,
  TH: 68000,
  BR: 74000,
  MX: 69000,
  AE: 60000,
  KR: 88000,
};

const companyBase: Record<string, number> = {
  "c-jp-1": 8200,
  "c-jp-2": 6200,
  "c-cn-1": 9800,
  "c-cn-2": 7600,
  "c-th-1": 5400,
  "c-vn-1": 4800,
  "c-de-1": 5200,
  "c-nl-1": 4300,
  "c-us-1": 9100,
  "c-us-2": 7800,
  "c-ae-1": 4600,
  "c-mx-1": 5100,
  "c-kr-1": 5600,
  "c-br-1": 5000,
  "c-in-1": 5700,
};

const companyHsMap: Record<string, string[]> = {
  "c-jp-1": ["0901", "3004"],
  "c-jp-2": ["0901"],
  "c-cn-1": ["8517", "3004"],
  "c-cn-2": ["8703", "8517"],
  "c-th-1": ["0901"],
  "c-vn-1": ["0901"],
  "c-de-1": ["3004"],
  "c-nl-1": ["3004", "8517"],
  "c-us-1": ["3004"],
  "c-us-2": ["8703"],
  "c-ae-1": ["8517"],
  "c-mx-1": ["8703", "0901"],
  "c-kr-1": ["8517"],
  "c-br-1": ["0901"],
  "c-in-1": ["3004", "0901"],
};

const originsByHs: Record<string, string[]> = {
  "0901": ["BR", "VN", "CO", "ID"],
  "3004": ["DE", "US", "IN"],
  "8517": ["CN", "KR", "VN"],
  "8703": ["JP", "DE", "US"],
};

const counterparties = [
  "Blue Harbor Export",
  "NorthGate Suppliers",
  "Zenith Freight",
  "Apex Commodities",
  "Lighthouse Partners",
];

function createMonthRange(start: string, end: string) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] = end.split("-").map(Number);
  const months: string[] = [];
  let year = startYear;
  let month = startMonth;
  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push(`${year}-${String(month).padStart(2, "0")}`);
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return months;
}

function seasonality(index: number) {
  const radians = (index / 12) * Math.PI * 2;
  return 0.85 + 0.2 * Math.sin(radians) + 0.1 * Math.cos(radians * 0.5);
}

export const months = createMonthRange("2021-01", "2025-12");

const countryMetricsSeed = months.flatMap((month, monthIndex) =>
  hsCodes.flatMap((hsCode, hsIndex) =>
    countries.map((country, countryIndex) => {
      const yearOffset = Number(month.slice(0, 4)) - 2021;
      const base = countryBase[country.code] ?? 60000;
      const hsFactor = hsBaseMultiplier[hsCode.code] ?? 1;
      const yearGrowth = 1 + yearOffset * 0.06;
      const seasonal = seasonality(monthIndex + hsIndex);
      const variance = 0.92 + (countryIndex % 5) * 0.03 + (hsIndex % 3) * 0.02;
      const weightKg = Math.round(base * hsFactor * yearGrowth * seasonal * variance);
      const valueUsd = Math.round(weightKg * (hsUnitPrice[hsCode.code] ?? 20) * (0.9 + (countryIndex % 4) * 0.03));
      const importersCount = Math.max(3, Math.round(weightKg / 12000 + (countryIndex % 6)));
      return {
        hsCode: hsCode.code,
        month,
        countryCode: country.code,
        weightKg,
        valueUsd,
        importersCount,
        share: 0,
      } satisfies CountryMetric;
    })
  )
);

const totalsByHsMonth = new Map<string, number>();
for (const row of countryMetricsSeed) {
  const key = `${row.hsCode}-${row.month}`;
  totalsByHsMonth.set(key, (totalsByHsMonth.get(key) ?? 0) + row.weightKg);
}

export const countryMetrics: CountryMetric[] = countryMetricsSeed.map((row) => {
  const key = `${row.hsCode}-${row.month}`;
  const total = totalsByHsMonth.get(key) ?? 1;
  return {
    ...row,
    share: row.weightKg / total,
  };
});

export const companyCountryHsMetrics: CompanyCountryHsMetric[] = months.flatMap(
  (month, monthIndex) =>
    companies.flatMap((company, companyIndex) => {
      const hsList = companyHsMap[company.id] ?? [];
      return hsList.map((hsCode, hsIndex) => {
        const yearOffset = Number(month.slice(0, 4)) - 2021;
        const base = companyBase[company.id] ?? 4000;
        const hsFactor = hsBaseMultiplier[hsCode] ?? 1;
        const yearGrowth = 1 + yearOffset * 0.05;
        const seasonal = seasonality(monthIndex + companyIndex);
        const variance = 0.9 + (hsIndex % 4) * 0.04;
        const weightKg = Math.round(base * hsFactor * yearGrowth * seasonal * variance * 10);
        const shipmentsCount = Math.max(1, Math.round(weightKg / 3500));
        const valueUsd = Math.round(weightKg * (hsUnitPrice[hsCode] ?? 20));
        const lastActiveDate = `${month}-28`;
        return {
          companyId: company.id,
          hsCode,
          month,
          weightKg,
          shipmentsCount,
          valueUsd,
          lastActiveDate,
        } satisfies CompanyCountryHsMetric;
      });
    })
);

export const companyTradeRows: CompanyTradeRow[] = companyCountryHsMetrics.map(
  (metric, index) => {
    const origins = originsByHs[metric.hsCode] ?? ["CN", "US"];
    const originCountry = origins[index % origins.length];
    const counterparty = counterparties[index % counterparties.length];
    return {
      companyId: metric.companyId,
      hsCode: metric.hsCode,
      date: `${metric.month}-15`,
      originCountry,
      counterparty,
      weightKg: metric.weightKg,
      shipmentsCount: metric.shipmentsCount,
      valueUsd: metric.valueUsd,
    } satisfies CompanyTradeRow;
  }
);
