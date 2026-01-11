"use client";

import { useMemo, useState } from "react";

type TriggerResult =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const payloadTemplates: Record<string, string> = {
  "burn-monitor": JSON.stringify(
    {
      type: "burn_rate_variance",
      orgId: "growth-labs",
      variance: 0.061,
      window: "30d",
      triggeredBy: "bot",
      notes: "Automated retainer for infra overspend",
    },
    null,
    2,
  ),
  "invoice-routing": JSON.stringify(
    {
      type: "invoice_received",
      vendor: "Artisan Logistics",
      amount: 4820.45,
      costCenter: "ops",
      approvers: ["aria@finance.bot", "marco@ops.bot"],
      attachments: ["https://s3.example.com/invoice-324.pdf"],
    },
    null,
    2,
  ),
  "treasury-rollover": JSON.stringify(
    {
      type: "treasury_rollover",
      portfolio: "short-term-ladder",
      maturity: "2025-03-30",
      allocationUSD: 25000,
      instructions: "Target 4-week T-Bills, reinvest interest",
    },
    null,
    2,
  ),
};

const workflows = [
  { id: "burn-monitor", label: "Burn rate guardrails" },
  { id: "invoice-routing", label: "Invoice approvals" },
  { id: "treasury-rollover", label: "Treasury rollover" },
];

export function WorkflowTriggerForm() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]?.id);
  const [payload, setPayload] = useState(
    payloadTemplates[workflows[0]?.id ?? "burn-monitor"],
  );
  const [result, setResult] = useState<TriggerResult>({ status: "idle" });

  const isSubmitting = result.status === "loading";

  const payloadPlaceholder = useMemo(() => {
    if (!selectedWorkflow) return "{ }";
    return payloadTemplates[selectedWorkflow] ?? "{ }";
  }, [selectedWorkflow]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult({ status: "loading" });

    try {
      const parsed = JSON.parse(payload);
      const response = await fetch("/api/n8n", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflow: selectedWorkflow,
          payload: parsed,
          triggerSource: "ui-manual",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Workflow trigger failed");
      }

      setResult({
        status: "success",
        message:
          data?.message ??
          `Workflow ${selectedWorkflow} invoked. Status ${data?.status ?? "ok"}.`,
      });
    } catch (error) {
      setResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to trigger workflow. Check payload JSON.",
      });
    }
  }

  function handleTemplateChange(workflowId: string) {
    setSelectedWorkflow(workflowId);
    setPayload(payloadTemplates[workflowId] ?? "{\n  \n}");
    setResult({ status: "idle" });
  }

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-xl shadow-emerald-900/40">
      <header>
        <h2 className="text-lg font-semibold text-white">Trigger n8n workflow</h2>
        <p className="text-sm text-emerald-100/80">
          Send a test payload to your finance automations. Use this to validate credentials
          or to re-run time-sensitive jobs after remediation.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3">
          <label className="text-sm font-medium text-slate-100" htmlFor="workflow">
            Workflow
          </label>
          <select
            id="workflow"
            value={selectedWorkflow}
            onChange={(event) => handleTemplateChange(event.target.value)}
            className="rounded-2xl border border-emerald-500/40 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
          >
            {workflows.map((workflow) => (
              <option key={workflow.id} value={workflow.id}>
                {workflow.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3">
          <label className="flex items-center justify-between text-sm font-medium text-slate-100">
            Payload
            <button
              type="button"
              className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/20"
              onClick={() => {
                if (selectedWorkflow) {
                  setPayload(payloadTemplates[selectedWorkflow]);
                  setResult({ status: "idle" });
                }
              }}
            >
              Reset template
            </button>
          </label>
          <textarea
            id="payload"
            value={payload}
            onChange={(event) => setPayload(event.target.value)}
            placeholder={payloadPlaceholder}
            spellCheck={false}
            className="min-h-[200px] rounded-2xl border border-emerald-500/30 bg-black/60 p-4 font-mono text-xs text-emerald-100 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/40"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-500/40"
          >
            {isSubmitting ? "Triggering…" : "Send to n8n"}
          </button>
          {result.status === "success" && (
            <span className="text-sm font-medium text-emerald-200">
              {result.message}
            </span>
          )}
          {result.status === "error" && (
            <span className="text-sm font-medium text-rose-200">{result.message}</span>
          )}
        </div>
      </form>
    </section>
  );
}
