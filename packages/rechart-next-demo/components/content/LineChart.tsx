"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipContentProps,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  {
    name: "1月",
    revenue: 4000,
    profit: 2400,
  },
  {
    name: "2月",
    revenue: 3000,
    profit: 1398,
  },
  {
    name: "3月",
    revenue: 9800,
    profit: 2000,
  },
  {
    name: "4月",
    revenue: 3908,
    profit: 2780,
  },
  {
    name: "5月",
    revenue: 4800,
    profit: 1890,
  },
  {
    name: "6月",
    revenue: 3800,
    profit: 2390,
  },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          top: 8,
          right: 12,
          left: -18,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="revenue" name="营业收入" stroke="#2563eb" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="profit" name="经营利润" stroke="#0f766e" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{label}</p>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          营业收入:
          <span className="ml-2">¥{payload[0].value}</span>
        </p>
        <p className="text-xs text-teal-700 dark:text-teal-300">
          经营利润:
          <span className="ml-2">¥{payload[1].value}</span>
        </p>
      </div>
    );
  }
  return null;
};
