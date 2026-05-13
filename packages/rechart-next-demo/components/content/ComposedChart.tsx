"use client";

import {
 ComposedChart,
 Area,
 Bar,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 ResponsiveContainer,
 TooltipContentProps,
} from "recharts";  

const data = [
 { name: "周一", visitors: 4000, orders: 2400, unitPrice: 2400 },
 { name: "周二", visitors: 3000, orders: 1398, unitPrice: 2210 },
 { name: "周三", visitors: 2000, orders: 9800, unitPrice: 2290 },
 { name: "周四", visitors: 2780, orders: 3908, unitPrice: 2000 },
 { name: "周五", visitors: 1890, orders: 4800, unitPrice: 2181 },
 { name: "周六", visitors: 2390, orders: 3800, unitPrice: 2500 },
 { name: "周日", visitors: 3490, orders: 4300, unitPrice: 2100 }
]

const ComposedChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
      >
        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <Area type="monotone" dataKey="unitPrice" name="客单价" fill="#bfdbfe" stroke="#2563eb" />
        <Bar dataKey="orders" name="成交订单" barSize={20} fill="#0f766e" radius={[4, 4, 0, 0]} />
        <Line type="monotone" dataKey="visitors" name="访问人数" stroke="#f59e0b" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartComponent;
const CustomTooltip = (props: TooltipContentProps) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{label}</p>
        {payload.map((item) => (
          <p className="text-xs text-slate-600 dark:text-slate-300" key={`${item.name}-${item.value}`}>
            {item.name}: <span className="ml-1">{item.value}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};
