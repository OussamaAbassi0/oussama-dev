import { NextRequest, NextResponse } from "next/server";

/* ── Types ───────────────────────────────────────────────── */
interface CapturePayload {
  source: "Lead Hunter" | "Audit Machine";
  query: string;   // requête texte ou URL
  email: string;
  timestamp: string;
}

/* ── POST /api/webhook-capture ───────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { source, query, email } = await req.json();

    /* Validation minimale */
    if (!source || !query?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Champs requis : source, query, email" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[webhook-capture] N8N_WEBHOOK_URL non défini dans .env.local");
      return NextResponse.json(
        { error: "Webhook non configuré côté serveur" },
        { status: 500 }
      );
    }

    /* Payload envoyé à n8n */
    const payload: CapturePayload = {
      source,
      query:     query.trim(),
      email:     email.trim(),
      timestamp: new Date().toISOString(),
    };

    /* Forward vers n8n — timeout 8s pour ne pas bloquer l'UX */
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 8000);

    const n8nRes = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
      signal:  controller.signal,
    });

    clearTimeout(timeout);

    if (!n8nRes.ok) {
      const detail = await n8nRes.text().catch(() => "—");
      console.error(`[webhook-capture] n8n a répondu ${n8nRes.status}: ${detail}`);
      return NextResponse.json(
        { error: `Webhook error: ${n8nRes.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[webhook-capture] Timeout — n8n n'a pas répondu dans les 8s");
      return NextResponse.json({ error: "Webhook timeout" }, { status: 504 });
    }
    console.error("[webhook-capture]", err);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
