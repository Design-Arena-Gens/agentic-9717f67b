import { Transaction } from "@/lib/financeData";
import { cn } from "@/lib/utils";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const statusMap: Record<Transaction["status"], string> = {
  cleared: "text-emerald-300 bg-emerald-400/10 border-emerald-500/30",
  pending: "text-sky-200 bg-sky-500/10 border-sky-500/40",
  flagged: "text-rose-200 bg-rose-500/10 border-rose-500/30",
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 shadow-xl shadow-black/40">
      <header className="flex items-center justify-between px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Latest Signals</h2>
          <p className="text-sm text-slate-300">
            Enriched transactions flowing through the n8n finance graph.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          Warehouse sync &bull; 3 min ago
        </span>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Merchant</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-left">Tags</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white/90">{transaction.date}</td>
                <td className="px-6 py-4">{transaction.merchant}</td>
                <td className="px-6 py-4 text-slate-300">{transaction.category}</td>
                <td className="px-6 py-4 text-right font-semibold">
                  {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {transaction.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
                      statusMap[transaction.status],
                    )}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
