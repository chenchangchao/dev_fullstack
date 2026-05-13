"use client";

import dynamic from "next/dynamic";
import { GridItem } from "@/utils/index";

const chartLoading = () => (
  <div className="h-full w-full animate-pulse rounded-md bg-slate-100 dark:bg-slate-800" />
);

const AreaChart = dynamic(() => import("@/components/content/AreaChart"), {
  ssr: false,
  loading: chartLoading,
});
const BarChart = dynamic(() => import("@/components/content/BarChart"), {
  ssr: false,
  loading: chartLoading,
});
const LineChart = dynamic(() => import("@/components/content/LineChart"), {
  ssr: false,
  loading: chartLoading,
});
const ComposedChart = dynamic(() => import("@/components/content/ComposedChart"), {
  ssr: false,
  loading: chartLoading,
});

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 md:px-8 xl:px-10">
      <section className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            经营驾驶舱
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 dark:text-slate-50">
            多渠道业务表现概览
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            汇总收入、利润、流量与订单表现，帮助团队快速识别增长趋势和投放效率。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[560px]">
          {[
            ["总收入", "¥86.4万"],
            ["毛利率", "31.8%"],
            ["转化率", "8.7%"],
            ["广告 ROI", "4.2x"],
          ].map(([label, value]) => (
            <div
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
              key={label}
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-slate-950 dark:text-slate-50">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid w-full gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <GridItem
          title="收入结构"
          description="核心产品线月度收入贡献"
          value="¥42.8万"
          trend="+12.4%"
        >
          <AreaChart />
        </GridItem>

        <GridItem
          title="收入与利润"
          description="收入规模和利润表现对比"
          value="31.8%"
          trend="+3.1%"
        >
          <BarChart />
        </GridItem>

        <GridItem
          title="增长趋势"
          description="收入和利润的月度波动"
          value="¥9.8万"
          trend="+8.6%"
        >
          <LineChart />
        </GridItem>

        <GridItem
          title="综合经营指标"
          description="访问、成交与客单价联动"
          value="4.2x"
          trend="+0.5x"
        >
          <ComposedChart />
        </GridItem>
      </div>
    </div>
  );
};
