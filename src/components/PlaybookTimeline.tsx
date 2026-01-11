import { PlaybookStep } from "@/lib/financeData";

type PlaybookTimelineProps = {
  steps: PlaybookStep[];
};

export function PlaybookTimeline({ steps }: PlaybookTimelineProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-xl shadow-black/30">
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-white">Finance Automation Playbook</h2>
        <p className="text-sm text-slate-300">
          Opinionated sequence to operationalize your treasury in n8n. Drop it into your
          workspace, configure credentials, and hit deploy.
        </p>
      </header>
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-semibold text-emerald-200">
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <span className="mt-1 h-full w-px bg-gradient-to-b from-emerald-400/50 to-transparent" />
              )}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-emerald-200/80">{step.objective}</p>
              <p className="mt-3 text-sm text-slate-200/90">{step.details}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">
                Automation hooks:{" "}
                <span className="font-medium text-white">{step.automation}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
