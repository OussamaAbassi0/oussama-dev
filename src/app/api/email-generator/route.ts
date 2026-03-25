import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { company, sector, context, lang } = await req.json();
  if (!company || !sector) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  // System prompt en français mais répondre dans lang
  const systemPrompt = `Tu es Oussama Abassi, expert en automatisation B2B.
Génère un email de prospection B2B court (max 120 mots) ultra-personnalisé pour l'entreprise cible.
L'email doit:
- Avoir un objet accrocheur court (max 8 mots)
- Montrer que tu connais leur secteur et leurs problèmes spécifiques
- Mentionner 1 résultat concret (ex: "+340h économisées/mois", "+12k leads")
- Se terminer par une question simple et directe
- Ton humain, pas corporate
- NE PAS mentionner d'appels téléphoniques
Réponds UNIQUEMENT en JSON: {"subject": "...", "body": "..."}
Réponds dans la langue: ${lang}`;

  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 400,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Entreprise: ${company}\nSecteur: ${sector}\nContexte: ${context || "Aucun contexte supplémentaire"}` },
      ],
    });
    const text = res.choices[0]?.message?.content ?? "";
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
    return NextResponse.json({ subject: json.subject ?? "", body: json.body ?? "" });
  } catch (err) {
    console.error("[email-generator]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
