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
  { day: "周一", viewToCart: 15.2, cartToPay: 41.6 },
  { day: "周二", viewToCart: 15.8, cartToPay: 42.1 },
  { day: "周三", viewToCart: 16.4, cartToPay: 43.8 },
  { day: "周四", viewToCart: 17.1, cartToPay: 45.2 },
  { day: "周五", viewToCart: 17.8, cartToPay: 46.4 },
  { day: "周六", viewToCart: 18.3, cartToPay: 47.2 },
  { day: "周日", viewToCart: 18.9, cartToPay: 48.1 },
];

export default function ConversionRateChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} unit="%" />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line dataKey="viewToCart" name="浏览-加购" dot={false} stroke="#2563eb" strokeWidth={2} type="monotone" />
        <Line dataKey="cartToPay" name="加购-支付" dot={false} stroke="#0f766e" strokeWidth={2} type="monotone" />
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
          {item.name}: <span className="ml-1 font-medium">{item.value}%</span>
        </p>
      ))}
    </div>
  );
}
