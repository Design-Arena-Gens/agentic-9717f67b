export type Metric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaType: "positive" | "negative" | "neutral";
  context: string;
};

export type Workflow = {
  id: string;
  name: string;
  description: string;
  cadence: string;
  lastRun: string;
  status: "healthy" | "warning" | "error";
  kpis: string[];
};

export type Alert = {
  id: string;
  title: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
  message: string;
  remediation: string;
};

export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  status: "cleared" | "flagged" | "pending";
  tags: string[];
};

export type PlaybookStep = {
  title: string;
  objective: string;
  details: string;
  automation: string;
};

export const metrics: Metric[] = [
  {
    id: "cash",
    label: "Operating Cash",
    value: "$128,745",
    delta: "+4.8% WoW",
    deltaType: "positive",
    context: "Includes liquidity buffer and scheduled transfers",
  },
  {
    id: "burn",
    label: "Monthly Burn",
    value: "$42,180",
    delta: "-6.1% MoM",
    deltaType: "positive",
    context: "Across payroll, SaaS, infrastructure, and credit lines",
  },
  {
    id: "revenue",
    label: "Net Revenue",
    value: "$198,520",
    delta: "+12.3% QoQ",
    deltaType: "positive",
    context: "Aggregated from Stripe, Shopify, and ACH collections",
  },
  {
    id: "alerts",
    label: "Automation Health",
    value: "99.3%",
    delta: "2 degraded webhooks",
    deltaType: "negative",
    context: "SLA breaches in expense categorization flow",
  },
];

export const workflows: Workflow[] = [
  {
    id: "bank-sync",
    name: "Multi-bank Transaction Sync",
    description:
      "Pulls transactions from Mercury, Brex, and SVB, normalizes fields, and pushes enriched rows into the warehouse.",
    cadence: "Runs hourly at :10",
    lastRun: "7 minutes ago",
    status: "healthy",
    kpis: ["312 new records", "Latency 18s", "0 duplicates"],
  },
  {
    id: "burn-monitor",
    name: "Burn Rate Guardrails",
    description:
      "Calculates rolling 30-day burn, compares against finance targets, and alerts Slack if variance exceeds 5%.",
    cadence: "Runs daily at 07:30 UTC",
    lastRun: "1 hour ago",
    status: "warning",
    kpis: ["Variance +6.1%", "Slack alert sent", "Needs reforecast"],
  },
  {
    id: "invoice-routing",
    name: "Invoice Approval Routing",
    description:
      "Routes invoices based on department, validates against budgets, and coordinates approvals inside Notion.",
    cadence: "Event driven via webhook",
    lastRun: "Triggered 3 times today",
    status: "healthy",
    kpis: ["Median approval 2h", "Budget adherence 94%", "4 pending"],
  },
  {
    id: "treasury-rollover",
    name: "Treasury Ladder Rollover",
    description:
      "Shifts idle cash into treasury ladder, syncs allocations with Google Sheets, and emails confirm to CFO.",
    cadence: "Runs weekly on Monday",
    lastRun: "2 days ago",
    status: "error",
    kpis: ["Broker API timeout", "Retry scheduled", "Escalation open"],
  },
];

export const alerts: Alert[] = [
  {
    id: "burn-variance",
    title: "Burn variance exceeded guardrail",
    timestamp: "12 minutes ago",
    severity: "warning",
    message:
      "Spend on vendor cluster `cloud-compute` is trending 9.4% above forecast for the current sprint.",
    remediation: "Review cost optimization backlog and approve compute downshift recipe.",
  },
  {
    id: "treasury-timeout",
    title: "Treasury rollover failed",
    timestamp: "43 minutes ago",
    severity: "critical",
    message:
      "External brokerage API timed out. n8n marked workflow `treasury-rollover` as failed after 3 retries.",
    remediation: "Manually confirm available cash and re-run the workflow with the retry button.",
  },
  {
    id: "invoice-queue",
    title: "Invoice approvals piling up",
    timestamp: "1 hour ago",
    severity: "info",
    message: "Four invoices are waiting for sign-off from Ops leadership, median wait time 2.9h.",
    remediation: "Ping approvers in Slack via `/finance-alerts remind invoice-routing`.",
  },
];

export const transactions: Transaction[] = [
  {
    id: "txn-001",
    date: "2025-01-18",
    merchant: "GCP Compute",
    category: "Infrastructure",
    amount: -4820.34,
    status: "flagged",
    tags: ["variance", "cloud"],
  },
  {
    id: "txn-002",
    date: "2025-01-17",
    merchant: "Salesforce",
    category: "Software",
    amount: -2180.0,
    status: "cleared",
    tags: ["contract"],
  },
  {
    id: "txn-003",
    date: "2025-01-16",
    merchant: "Stripe",
    category: "Revenue",
    amount: 18245.87,
    status: "cleared",
    tags: ["payout", "subscriptions"],
  },
  {
    id: "txn-004",
    date: "2025-01-16",
    merchant: "AWS - S3",
    category: "Infrastructure",
    amount: -980.12,
    status: "pending",
    tags: ["storage"],
  },
  {
    id: "txn-005",
    date: "2025-01-15",
    merchant: "Notion",
    category: "Software",
    amount: -432.0,
    status: "cleared",
    tags: ["productivity"],
  },
];

export const playbook: PlaybookStep[] = [
  {
    title: "Collect & Normalize",
    objective: "Unify every inflow and outflow across platforms in near real-time.",
    details:
      "Webhook connectors ingest transactions from banking APIs, cards, and billing tools. Deduplication and type coercion run in n8n function nodes before persisting to your warehouse.",
    automation: "Workflows: `bank-sync`, `invoice-routing`",
  },
  {
    title: "Monitor & Detect",
    objective: "Forecast burn, detect anomalies, and quantify variances.",
    details:
      "Guardrail recipes compare rolling averages against budgets. Enrichment nodes fetch FX rates and vendor attributes for more useful insights.",
    automation: "Workflows: `burn-monitor`, `treasury-rollover`",
  },
  {
    title: "Act & Communicate",
    objective: "Close the loop with alerts, approvals, and treasury allocation.",
    details:
      "Slack, email, and ticketing automations ensure every variance is acknowledged. Human-in-the-loop steps keep auditors happy while still shipping fast.",
    automation: "Workflows: `invoice-routing`, `treasury-rollover`",
  },
];
