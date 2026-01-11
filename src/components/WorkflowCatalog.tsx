import { Workflow } from "@/lib/financeData";
import { cn } from "@/lib/utils";

type WorkflowCatalogProps = {
  workflows: Workflow[];
};

const statusColors: Record<Workflow["status"], string> = {
  healthy: "bg-emerald-400/20 text-emerald-300 border-emerald-500/40",
  warning: "bg-amber-400/20 text-amber-300 border-amber-500/40",
  error: "bg-rose-500/20 text-rose-300 border-rose-500/40",
};

export function WorkflowCatalog({ workflows }: WorkflowCatalogProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {workflows.map((workflow) => (
        <article
          key={workflow.id}
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-black/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{workflow.description}</p>
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide",
                statusColors[workflow.status],
              )}
            >
              {workflow.status}
            </span>
          </div>
          <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300/80">
            <div>
              <dt className="text-slate-400">Cadence</dt>
              <dd className="font-medium text-white/90">{workflow.cadence}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Last run</dt>
              <dd className="font-medium text-white/90">{workflow.lastRun}</dd>
            </div>
            <div className="basis-full">
              <dt className="text-slate-400">Key metrics</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {workflow.kpis.map((kpi) => (
                  <span
                    key={kpi}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {kpi}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </section>
  );
}
