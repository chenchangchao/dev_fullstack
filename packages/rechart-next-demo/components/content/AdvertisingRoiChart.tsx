"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "1月", spend: 12.4, revenue: 42.8, roi: 3.45 },
  { month: "2月", spend: 13.8, revenue: 46.9, roi: 3.4 },
  { month: "3月", spend: 15.2, revenue: 57.8, roi: 3.8 },
  { month: "4月", spend: 14.6, revenue: 60.1, roi: 4.12 },
  { month: "5月", spend: 16.1, revenue: 68.7, roi: 4.27 },
  { month: "6月", spend: 17.3, revenue: 75.8, roi: 4.38 },
];

export default function AdvertisingRoiChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area dataKey="revenue" name="归因收入(万)" fill="#bfdbfe" stroke="#2563eb" type="monotone" />
        <Line dataKey="roi" name="ROI" dot={false} stroke="#0f766e" strokeWidth={2} type="monotone" />
      </ComposedChart>
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
