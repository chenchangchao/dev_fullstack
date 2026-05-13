import type { ReactNode } from "react";

export function GridItem({
  title,
  description,
  value,
  trend,
  children,
}: {
  title: string;
  description?: string;
  value?: string;
  trend?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex h-[360px] min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-950 dark:text-slate-50">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
        {value ? (
          <div className="shrink-0 text-right">
            <p className="text-xl font-semibold tabular-nums text-slate-950 dark:text-slate-50">
              {value}
            </p>
            {trend ? (
              <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {trend}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="min-h-0 min-w-0 flex-1">{children}</div>
    </section>
  );
}
