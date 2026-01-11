import { Alert } from "@/lib/financeData";
import { cn } from "@/lib/utils";

type AlertsPanelProps = {
  alerts: Alert[];
};

const severityStyles: Record<Alert["severity"], string> = {
  info: "border-sky-500/40 bg-sky-500/10 text-sky-200",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  critical: "border-rose-500/40 bg-rose-500/10 text-rose-200",
};

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <section className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-lg shadow-black/40">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Automation Control Room</h2>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Live alerts
        </span>
      </header>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className={cn(
              "rounded-2xl border px-4 py-3 transition hover:border-white/40 hover:bg-white/5",
              severityStyles[alert.severity],
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
              <span className="text-xs text-slate-200/70">{alert.timestamp}</span>
            </div>
            <p className="mt-2 text-sm text-slate-100/90">{alert.message}</p>
            <p className="mt-3 text-xs text-slate-200/70">
              Next step: <span className="font-medium text-white">{alert.remediation}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
