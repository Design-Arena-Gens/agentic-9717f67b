import { NextResponse } from "next/server";

const DEFAULT_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  const url = process.env.N8N_WEBHOOK_URL;

  if (!url) {
    return NextResponse.json(
      { error: "N8N_WEBHOOK_URL is not configured." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    const body = await request.json();
    payload = {
      ...body,
      triggeredAt: new Date().toISOString(),
    };
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload provided." },
      { status: 400 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const responseData = await response
      .json()
      .catch(() => ({ message: "No JSON response body detected." }));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: responseData?.error ?? "n8n webhook returned an error response.",
          status: response.status,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      status: response.status,
      message: responseData?.message ?? "Workflow executed successfully.",
      data: responseData,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Timed out waiting for n8n webhook."
        : "Could not reach n8n webhook.";

    return NextResponse.json({ error: message }, { status: 504 });
  }
}

export async function GET() {
  const url = process.env.N8N_WEBHOOK_URL;

  return NextResponse.json({
    ready: Boolean(url),
    message: url
      ? "n8n webhook URL configured"
      : "Add N8N_WEBHOOK_URL to your environment to enable live triggers.",
  });
}
