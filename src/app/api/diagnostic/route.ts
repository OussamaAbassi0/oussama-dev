import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { answers, lang } = await req.json();
  // answers = array de 5 strings (les valeurs des options choisies)

  const systemPrompt = `Tu es Oussama Abassi, expert en automatisation IA. Analyse les réponses d'un visiteur à un quiz de diagnostic et génère un rapport personnalisé.
Réponds UNIQUEMENT avec un JSON valide (aucun texte avant ou après):
{
  "level": "Débutant|Intermédiaire|Avancé|Expert",
  "levelColor": "#f5a623|#00e5ff|#a78bfa|#00ffc8",
  "score": 0-100,
  "headline": "phrase accroche personnalisée 1 ligne",
  "roiMin": 500,
  "roiMax": 3000,
  "quickWins": ["action concrète 1", "action concrète 2", "action concrète 3"],
  "roadmap": [
    {"week": "Semaine 1", "action": "...", "impact": "..."},
    {"week": "Semaine 2-4", "action": "...", "impact": "..."},
    {"week": "Mois 2-3", "action": "...", "impact": "..."}
  ],
  "summary": "2-3 phrases bilan personnalisé"
}
Réponds dans la langue: ${lang ?? "fr"}`;

  try {
    const res = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 800,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Réponses au quiz: ${answers.join(", ")}` },
      ],
    });
    const text = res.choices[0]?.message?.content ?? "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON");
    const report = JSON.parse(match[0]);
    return NextResponse.json(report);
  } catch (err) {
    console.error("[diagnostic]", err);
    // Fallback report
    return NextResponse.json({
      level: "Intermédiaire",
      levelColor: "#00e5ff",
      score: 65,
      headline: "Vous avez un fort potentiel d'automatisation !",
      roiMin: 800,
      roiMax: 2500,
      quickWins: [
        "Automatiser vos relances email",
        "Synchroniser votre CRM",
        "Qualifier vos leads automatiquement",
      ],
      roadmap: [
        { week: "Semaine 1", action: "Audit de vos processus", impact: "Identifier les 3 priorités" },
        { week: "Semaine 2-4", action: "Premier workflow", impact: "-5h/semaine" },
        { week: "Mois 2-3", action: "Pipeline complet", impact: "-15h/semaine" },
      ],
      summary:
        "Votre profil montre un potentiel élevé. Commencez par automatiser vos tâches les plus répétitives pour récupérer rapidement plusieurs heures par semaine.",
    });
  }
}
