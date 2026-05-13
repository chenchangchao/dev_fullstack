"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipContentProps,
} from "recharts";

const productSales = [
  { name: "1月", direct: 4000, channel: 2400 },
  { name: "2月", direct: 3000, channel: 2210 },
  { name: "3月", direct: 2000, channel: 2290 },
  { name: "4月", direct: 2780, channel: 2000 },
  { name: "5月", direct: 1890, channel: 2181 },
  { name: "6月", direct: 2390, channel: 2500 },
];

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={productSales}
        margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
      >
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />

        <Area
          type="monotone"
          dataKey="direct"
          name="直营收入"
          stroke="#0f766e"
          fill="#5eead4"
          stackId="1"
        />

        <Area
          type="monotone"
          dataKey="channel"
          name="渠道收入"
          stroke="#2563eb"
          fill="#93c5fd"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{label}</p>
        <p className="text-xs text-teal-700 dark:text-teal-300">
          直营收入:
          <span className="ml-2">¥{payload[0].value}</span>
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          渠道收入:
          <span className="ml-2">¥{payload[1].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default AreaChartComponent;
