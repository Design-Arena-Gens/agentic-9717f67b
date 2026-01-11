## n8n Finance Bot

Autonomous finance automation cockpit built with Next.js, Tailwind, and the n8n workflow engine. Monitor liquidity, trigger playbooks, and triage alerts from a single control plane deployable to Vercel.

### Features

- Live KPI grid covering burn, liquidity, revenue, and automation health
- Workflow catalog highlighting the operational state of each n8n flow
- Command center for alerts, enriched transactions, and strategic insights
- One-click manual trigger that POSTs to your `N8N_WEBHOOK_URL` for testing or remediation
- Opinionated automation playbook to roll out treasury and approvals safely

### Quick start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the dashboard.

### Environment

Copy `.env.example` to `.env.local` and add your n8n incoming webhook URL (e.g. a workflow’s test URL):

```
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/finance-bot
```

The manual trigger panel calls this endpoint and relays the response to the UI.

### Production build

```bash
npm run lint
npm run build
```

### Project structure

- `src/app/page.tsx` – landing page and layout orchestration
- `src/app/api/n8n/route.ts` – proxy endpoint that forwards payloads to n8n
- `src/components/*` – UI modules for metrics, workflows, alerts, triggers, and playbooks
- `src/lib/financeData.ts` – deterministic sample data used to render the dashboard

### Deployment

Optimized for Vercel. Once environment variables are configured, deploy with:

```
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-9717f67b
```

After DNS propagates, verify via `curl https://agentic-9717f67b.vercel.app`.
