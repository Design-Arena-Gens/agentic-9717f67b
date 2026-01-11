import { Metric } from "@/lib/financeData";
import { cn } from "@/lib/utils";

type MetricGridProps = {
  metrics: Metric[];
};

const deltaColors: Record<Metric["deltaType"], string> = {
  positive: "text-emerald-400",
  negative: "text-rose-400",
  neutral: "text-slate-400",
};

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.id}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-900/20 backdrop-blur"
        >
          <div className="text-sm uppercase tracking-wide text-slate-300">
            {metric.label}
          </div>
          <div className="mt-2 text-3xl font-semibold text-white">
            {metric.value}
          </div>
          <p className={cn("mt-1 text-sm font-medium", deltaColors[metric.deltaType])}>
            {metric.delta}
          </p>
          <p className="mt-4 text-xs text-slate-300/80">{metric.context}</p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
        </article>
      ))}
    </section>
  );
}
