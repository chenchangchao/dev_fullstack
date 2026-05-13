"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { stage: "访问", value: 128000, rate: "100%" },
  { stage: "商品浏览", value: 84600, rate: "66.1%" },
  { stage: "加购", value: 21800, rate: "17.0%" },
  { stage: "下单", value: 11600, rate: "9.1%" },
  { stage: "支付", value: 9720, rate: "7.6%" },
];

export default function ConversionFunnelChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 44, left: 4, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} />
        <XAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} type="number" />
        <YAxis axisLine={false} dataKey="stage" tickLine={false} tick={{ fontSize: 12 }} type="category" width={70} />
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="value" name="人数" fill="#2563eb" radius={[0, 4, 4, 0]}>
          <LabelList dataKey="rate" position="right" className="fill-slate-600 text-xs dark:fill-slate-300" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 text-xs shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-2 text-sm font-semibold text-slate-950 dark:text-slate-50">{label}</p>
      <p className="text-slate-600 dark:text-slate-300">
        人数: <span className="ml-1 font-medium">{payload[0].value}</span>
      </p>
    </div>
  );
}
