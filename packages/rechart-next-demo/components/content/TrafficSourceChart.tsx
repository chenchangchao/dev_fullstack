"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { source: "自然搜索", visitors: 42000, payRate: 8.8 },
  { source: "品牌词", visitors: 31000, payRate: 12.6 },
  { source: "推荐流", visitors: 26000, payRate: 7.1 },
  { source: "广告", visitors: 21000, payRate: 6.8 },
  { source: "私域", visitors: 8000, payRate: 15.4 },
];

export default function TrafficSourceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="source" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="visitors" name="访客数" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="payRate" name="支付率(%)" fill="#0f766e" radius={[4, 4, 0, 0]} />
      </BarChart>
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
