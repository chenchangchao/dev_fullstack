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
  { channel: "搜索", spend: 38, orders: 1260 },
  { channel: "信息流", spend: 31, orders: 860 },
  { channel: "短视频", spend: 24, orders: 790 },
  { channel: "达人", spend: 18, orders: 430 },
  { channel: "私域", spend: 8, orders: 360 },
];

export default function AdvertisingChannelChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="channel" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="spend" name="花费(万)" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="orders" name="订单" fill="#0f766e" radius={[4, 4, 0, 0]} />
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
