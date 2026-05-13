"use client";

import dynamic from "next/dynamic";
import { GridItem } from "@/utils/index";

const chartLoading = () => (
  <div className="h-full w-full animate-pulse rounded-md bg-slate-100 dark:bg-slate-800" />
);

const AdvertisingRoiChart = dynamic(
  () => import("@/components/content/AdvertisingRoiChart"),
  { ssr: false, loading: chartLoading },
);
const AdvertisingChannelChart = dynamic(
  () => import("@/components/content/AdvertisingChannelChart"),
  { ssr: false, loading: chartLoading },
);
const AdvertisingCostChart = dynamic(
  () => import("@/components/content/AdvertisingCostChart"),
  { ssr: false, loading: chartLoading },
);

const metrics = [
  ["本月花费", "¥17.3万"],
  ["归因收入", "¥75.8万"],
  ["广告 ROI", "4.38x"],
  ["获客成本", "¥59"],
];

const insights = [
  "ROI 连续 4 周提升，当前主要由搜索和短视频渠道拉动。",
  "CPA 从 ¥86 降至 ¥59，投放结构优化已带来明显成本改善。",
  "信息流订单效率偏弱，建议把 8%-12% 预算迁移到高意向搜索词和私域再营销。",
];

export default function AdvertisingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 md:px-8 xl:px-10">
      <section className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            推广效费
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 dark:text-slate-50">
            广告投放效率分析
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            追踪花费、归因收入、ROI 和获客成本，判断预算是否投向更高质量的增长渠道。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[560px]">
          {metrics.map(([label, value]) => (
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

      <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">
          经营结论
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {insights.map((item, index) => (
            <p
              className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-950 dark:text-slate-300"
              key={item}
            >
              <span className="mr-2 font-semibold text-slate-950 dark:text-slate-50">
                {index + 1}.
              </span>
              {item}
            </p>
          ))}
        </div>
      </section>

      <div className="grid w-full gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <GridItem
          title="ROI 趋势"
          description="归因收入与投放回报变化"
          value="4.38x"
          trend="+0.93x"
        >
          <AdvertisingRoiChart />
        </GridItem>

        <GridItem
          title="渠道效费"
          description="渠道花费与订单产出对比"
          value="搜索最佳"
          trend="1260 单"
        >
          <AdvertisingChannelChart />
        </GridItem>

        <GridItem
          title="获客成本"
          description="点击成本与成交成本趋势"
          value="¥59"
          trend="-31.4%"
        >
          <AdvertisingCostChart />
        </GridItem>
      </div>
    </div>
  );
}
