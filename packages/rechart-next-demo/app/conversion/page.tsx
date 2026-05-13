"use client";

import dynamic from "next/dynamic";
import { GridItem } from "@/utils/index";

const chartLoading = () => (
  <div className="h-full w-full animate-pulse rounded-md bg-slate-100 dark:bg-slate-800" />
);

const ConversionFunnelChart = dynamic(
  () => import("@/components/content/ConversionFunnelChart"),
  { ssr: false, loading: chartLoading },
);
const ConversionRateChart = dynamic(
  () => import("@/components/content/ConversionRateChart"),
  { ssr: false, loading: chartLoading },
);
const TrafficSourceChart = dynamic(
  () => import("@/components/content/TrafficSourceChart"),
  { ssr: false, loading: chartLoading },
);

const metrics = [
  ["访客数", "12.8万"],
  ["商品浏览率", "66.1%"],
  ["支付转化率", "7.6%"],
  ["私域支付率", "15.4%"],
];

const insights = [
  "最大流失发生在商品浏览到加购阶段，加购率只有 17.0%。",
  "加购到支付持续改善，周日达到 48.1%，说明优惠和结算链路表现稳定。",
  "私域流量规模小但支付率最高，应增加复购触达和会员专属承接页。",
];

export default function ConversionPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 md:px-8 xl:px-10">
      <section className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            流量转化
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 dark:text-slate-50">
            用户转化链路分析
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            从访问、浏览、加购、下单到支付拆解转化效率，定位高价值流量和关键流失环节。
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
          title="转化漏斗"
          description="访问到支付的核心链路"
          value="7.6%"
          trend="+0.8%"
        >
          <ConversionFunnelChart />
        </GridItem>

        <GridItem
          title="转化率趋势"
          description="加购与支付关键动作变化"
          value="48.1%"
          trend="+6.5%"
        >
          <ConversionRateChart />
        </GridItem>

        <GridItem
          title="流量来源质量"
          description="访客规模与支付率对比"
          value="私域最佳"
          trend="15.4%"
        >
          <TrafficSourceChart />
        </GridItem>
      </div>
    </div>
  );
}
