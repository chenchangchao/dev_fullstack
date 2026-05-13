"use client";

import {
  FunnelChart,
  Funnel,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipContentProps,
  LabelList,
} from "recharts";

const data = [
  {
    value: 100,
    name: "展现",
    fill: "#8884d8",
  },
  {
    value: 80,
    name: "点击",
    fill: "#83a6ed",
  },
  {
    value: 50,
    name: "访问",
    fill: "#8dd1e1",
  },
  {
    value: 40,
    name: "咨询",
    fill: "#82ca9d",
  },
  {
    value: 26,
    name: "订单",
    fill: "#a4de6c",
  },
];

const FunelChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart
        width={500}
        height={300}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Funnel dataKey="value" data={data} isAnimationActive={true}>
        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
        </Funnel>
      </FunnelChart>
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
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          value:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default FunelChartComponent;
