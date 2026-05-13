"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { week: "W1", cpc: 2.8, cpa: 86 },
  { week: "W2", cpc: 2.7, cpa: 82 },
  { week: "W3", cpc: 2.5, cpa: 74 },
  { week: "W4", cpc: 2.4, cpa: 68 },
  { week: "W5", cpc: 2.35, cpa: 64 },
  { week: "W6", cpc: 2.22, cpa: 59 },
];

export default function AdvertisingCostChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line dataKey="cpc" name="CPC(元)" dot={false} stroke="#2563eb" strokeWidth={2} type="monotone" />
        <Line dataKey="cpa" name="CPA(元)" dot={false} stroke="#0f766e" strokeWidth={2} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 text-xs shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-2 text-sm font-semibold text-slate-950 dark:text-slate-50">{label}</p>
      {payload.map((item) => (
        <p className="text-slate-600 dark:text-slate-300" key={`${item.name}-${item.value}`}>
          {item.name}: <span className="ml-1 font-medium">{item.value}</span>
        </p>
      ))}
    </div>
  );
}
