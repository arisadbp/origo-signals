"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";

const data = [
  { month: "Jan", value: 2400, growth: 12 },
  { month: "Feb", value: 2800, growth: 16 },
  { month: "Mar", value: 3200, growth: 14 },
  { month: "Apr", value: 3600, growth: 12 },
  { month: "May", value: 4200, growth: 16 },
  { month: "Jun", value: 4800, growth: 14 },
  { month: "Jul", value: 5500, growth: 14 },
  { month: "Aug", value: 6300, growth: 14 },
  { month: "Sep", value: 7200, growth: 14 },
  { month: "Oct", value: 8100, growth: 12 },
  { month: "Nov", value: 9200, growth: 13 },
  { month: "Dec", value: 10500, growth: 14 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 border border-[#FFB347]/30 shadow-glow">
        <p className="text-white/60 text-xs font-mono mb-1">{payload[0].payload.month} 2024</p>
        <p className="text-white font-heading text-lg font-bold">
          ${payload[0].value?.toLocaleString()}M
        </p>
        <p className="text-[#FFB347] text-sm font-mono">
          +{payload[0].payload.growth}% growth
        </p>
      </div>
    );
  }
  return null;
};

export function TradeGrowthChart() {
  return (
    <div className="w-full h-[400px] glass-card p-6 rounded-2xl border border-[#FFB347]/20">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-heading font-bold text-white mb-2">
          Trade Volume Growth
        </h3>
        <p className="text-white/60 text-sm font-body">
          Monthly export performance in 2024
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFB347" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFB347" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 179, 71, 0.1)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="#ffffff60"
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#ffffff60"
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#FFB347", strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#FFB347"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1500}
            animationBegin={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
