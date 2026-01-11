import { AlertsPanel } from "@/components/AlertsPanel";
import { InsightsPanel } from "@/components/InsightsPanel";
import { MetricGrid } from "@/components/MetricGrid";
import { PlaybookTimeline } from "@/components/PlaybookTimeline";
import { TransactionsTable } from "@/components/TransactionsTable";
import { WorkflowCatalog } from "@/components/WorkflowCatalog";
import { WorkflowTriggerForm } from "@/components/WorkflowTriggerForm";
import {
  alerts,
  metrics,
  playbook,
  transactions,
  workflows,
} from "@/lib/financeData";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-200px] h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-emerald-500/30 blur-[160px]" />
        <div className="absolute bottom-[-220px] left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[160px]" />
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:px-8">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            n8n finance bot
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              Autonomous finance control tower for operators who automate first.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Stitch your bank feeds, SaaS spend, payroll, and revenue streams into a
              single automation graph. This n8n kit detects anomalies, orchestrates approvals,
              and keeps your treasury allocations on autopilot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              Live guardrails on variance
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              Human-in-the-loop approvals
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              Treasury ladder automation
            </span>
          </div>
        </header>

        <MetricGrid metrics={metrics} />

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <WorkflowCatalog workflows={workflows} />
          <AlertsPanel alerts={alerts} />
        </div>

        <TransactionsTable transactions={transactions} />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <WorkflowTriggerForm />
          <InsightsPanel />
        </div>

        <PlaybookTimeline steps={playbook} />

        <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-200">
          <div>
            <p className="font-semibold text-white">Bring it into your workspace</p>
            <p className="text-slate-300">
              Duplicate the workflows, plug in credentials, and run the validation recipe
              before you ship to prod.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://docs.n8n.io/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 font-medium text-white transition hover:border-emerald-400 hover:text-emerald-200"
            >
              n8n docs
            </a>
            <a
              href="https://component.n8n.io/automations"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Grab the template
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
