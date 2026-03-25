import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey:  process.env.GROQ_API_KEY!,
});

/*
  Reçoit le transcript vocal brut.
  Retourne un JSON structuré pour pré-remplir le formulaire de brief :
  { name, email, problem, tools, budget }
*/
export async function POST(req: NextRequest) {
  try {
    const { transcript, lang = "fr" } = await req.json();
    if (!transcript) return NextResponse.json({ error: "No transcript" }, { status: 400 });

    const langNames: Record<string, string> = {
      fr: "français", en: "English", ar: "arabe", es: "español", nl: "Nederlands",
    };

    const prompt = `Tu es un assistant qui extrait des informations structurées depuis un brief oral de projet.

Transcript (en ${langNames[lang] ?? "français"}) :
"${transcript}"

Extrait ces informations et retourne UNIQUEMENT un JSON valide avec ces clés :
{
  "name": "prénom et nom si mentionnés, sinon chaîne vide",
  "email": "email si mentionné, sinon chaîne vide",
  "problem": "résumé clair du problème/besoin en 1-2 phrases, dans la langue du transcript",
  "tools": "outils mentionnés séparés par virgule, sinon chaîne vide",
  "budget": "l'une de ces valeurs EXACTES si mentionné: '< 500 €' | '500 € – 1 500 €' | '1 500 € – 5 000 €' | '> 5 000 €' | 'À définir ensemble', sinon 'À définir ensemble'"
}

Retourne UNIQUEMENT le JSON, sans texte autour.`;

    const response = await groq.chat.completions.create({
      model:      "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages:   [{ role: "user", content: prompt }],
    });

    const raw  = response.choices[0]?.message?.content ?? "{}";
    const match = raw.match(/\{[\s\S]*\}/);
    const data  = match ? JSON.parse(match[0]) : {};

    return NextResponse.json(data);
  } catch (err) {
    console.error("[voice-brief]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
