"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Cell } from "recharts";

const data = [
  { region: "Asia-Pacific", value: 3500, percentage: 35, color: "#FFB347" },
  { region: "Europe", value: 2800, percentage: 28, color: "#FFA500" },
  { region: "North America", value: 2200, percentage: 22, color: "#FF8C00" },
  { region: "Middle East", value: 1000, percentage: 10, color: "#FF7F50" },
  { region: "Latin America", value: 500, percentage: 5, color: "#FF6347" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 border border-[#FFB347]/30 shadow-glow">
        <p className="text-white font-heading text-base font-bold mb-1">
          {payload[0].payload.region}
        </p>
        <p className="text-[#FFB347] text-lg font-mono font-bold">
          ${payload[0].value?.toLocaleString()}M
        </p>
        <p className="text-white/60 text-sm font-mono">
          {payload[0].payload.percentage}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function MarketDistributionChart() {
  return (
    <div className="w-full h-[400px] glass-card p-6 rounded-2xl border border-[#FFB347]/20">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-bold text-white mb-2">
          Market Distribution
        </h3>
        <p className="text-white/60 text-sm font-body">
          Export volume by region in 2024
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 179, 71, 0.1)"
            horizontal={false}
          />

          <XAxis
            type="number"
            stroke="#ffffff60"
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />

          <YAxis
            type="category"
            dataKey="region"
            stroke="#ffffff60"
            style={{
              fontSize: "13px",
              fontFamily: "var(--font-space-grotesk)",
            }}
            tickLine={false}
            axisLine={false}
            width={95}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 179, 71, 0.1)" }} />

          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            animationDuration={1500}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
