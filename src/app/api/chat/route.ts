import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Tu es l'assistant IA d'Oussama Abassi, Expert Full-Stack et IA/Automatisation.
Ton rôle : qualifier les visiteurs du site en moins de 3 échanges et les orienter vers le formulaire de Project Brief.

À propos d'Oussama :
- Expert en automatisation B2B (n8n, Make, OpenAI, LangGraph)
- Résultats clients moyens : -60% tâches répétitives, +40% leads qualifiés
- Communication asynchrone privilégiée — répond sous 24h avec une analyse personnalisée
- Disponible pour missions freelance et partenariats

Ta stratégie (3 questions max) :
1. Identifier le problème principal
2. Estimer l'impact business
3. Orienter vers le formulaire Project Brief

Après 2 échanges, propose TOUJOURS : "Je vois exactement ce qu'il faut faire. Remplissez le brief en 2 minutes via le bouton 'Démarrer un projet' — Oussama vous répondra avec une analyse personnalisée sous 24h."

Règles : réponses courtes (2-3 phrases), une seule question à la fois, ton humain et direct. Ne jamais mentionner d'appel téléphonique ou de visio.`;

/* ── Client Groq via compatibilité OpenAI SDK ─────────────── */
const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey:  process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await groq.chat.completions.create({
      model:      "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const text = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("[chat/groq]", err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
