const insights = [
  {
    title: "Liquidity runway",
    description: "11.3 months based on trailing 90 day burn with uncommitted cash included.",
  },
  {
    title: "Vendor concentration",
    description: "Top 5 vendors make up 61% of total OpEx; cloud infra alone is 38%.",
  },
  {
    title: "Collections latency",
    description: "DSO dropped to 23.4 days since enabling automatic dunning via n8n.",
  },
];

export function InsightsPanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur">
      <h2 className="text-lg font-semibold text-white">Strategic signals</h2>
      <ul className="mt-4 space-y-4 text-sm text-slate-200">
        {insights.map((insight) => (
          <li
            key={insight.title}
            className="rounded-2xl border border-white/5 bg-slate-900/50 p-4 transition hover:border-emerald-400/40 hover:bg-emerald-500/10"
          >
            <p className="font-semibold text-white">{insight.title}</p>
            <p className="mt-1 text-slate-300">{insight.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
