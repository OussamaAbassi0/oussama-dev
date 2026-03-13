import { NextRequest, NextResponse } from "next/server";

/* ══════════════════════════════════════════════════════════
   SYSTEM PROMPT — Architecte B2B intelligent
   Conçu pour comprendre des problèmes vagues et inventer
   une architecture professionnelle complète.
══════════════════════════════════════════════════════════ */
const SYSTEM_PROMPT = `Tu es un Architecte d'Automatisation B2B expert (façon n8n/Make). Le client va te donner un problème metier ou une idee vague (ex: gerer mes emails).
Ta mission : Concevoir un workflow d'automatisation complet, logique et professionnel pour resoudre ce probleme (avec un Declencheur, des etapes de Traitement IA/Filtres, et des Actions finales).

CONTRAINTE ABSOLUE : Tu dois repondre UNIQUEMENT avec le code Mermaid.js brut. AUCUN texte avant ou apres. AUCUN bloc de code markdown (pas de \`\`\`mermaid ou \`\`\`). Commence directement par graph TD.

Utilise une syntaxe Mermaid tres simple et sure pour eviter les erreurs de parsing.
REGLES DE SYNTAXE STRICTES :
- Identifiants courts sans espaces ni accents : A, B, C, Trigger, Filter, Action1
- Labels entre crochets simples uniquement : A[Declencheur Email]
- Fleches simples uniquement : A --> B
- Labels sur fleches entre barres et crochets : A -->|condition| B
- JAMAIS de guillemets doubles ou simples dans les labels
- JAMAIS de parentheses, accents, apostrophes ou caracteres speciaux dans les labels
- Maximum 8 noeuds pour rester lisible
- Losange pour les decisions : D{Condition}
- Rectangle pour tout le reste : A[Action]

EXEMPLE pour le probleme gerer mes emails :
graph TD
    A[Email entrant Gmail] --> B[Lecture par IA GPT-4o]
    B --> C{Categorie detectee}
    C -->|Urgent| D[Repondre automatiquement]
    C -->|Commercial| E[Ajouter au CRM HubSpot]
    C -->|Spam| F[Archiver et ignorer]
    D --> G[Notifier Slack equipe]
    E --> G
    G --> H[Rapport quotidien envoye]`;

/* ══════════════════════════════════════════════════════════
   SANITIZATION — Rend le code Mermaid bullet-proof
══════════════════════════════════════════════════════════ */
function sanitizeMermaid(raw: string): string {
  let code = raw ?? "";

  // 1. Supprimer TOUTES les balises markdown même imbriquées
  code = code.replace(/```mermaid/gi, "").replace(/```/g, "").trim();

  // 2. Supprimer guillemets doubles et simples (cause principale de crash Mermaid)
  code = code.replace(/["']/g, " ");

  // 3. Supprimer les caractères spéciaux dangereux pour le parser
  //    Garde : lettres, chiffres, espaces, newlines, [], {}, ->, |, #, _
  code = code.replace(/[^\w\s\[\]{}\-|>#\n\r\.,éèêëàâùûüîïôœç%+*!?:\/]/g, " ");

  // 4. Normaliser les flèches (parfois l'IA écrit => ou ->)
  code = code.replace(/=>/g, "-->").replace(/([^-])>/g, "$1-->");

  // 5. Forcer le début par graph TD si manquant ou mal formaté
  if (!code.trimStart().startsWith("graph")) {
    code = "graph TD\n" + code;
  }

  // 6. Nettoyer les lignes vides multiples
  code = code.replace(/\n{3,}/g, "\n\n").trim();

  return code;
}

/* ══════════════════════════════════════════════════════════
   API ROUTE
══════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt requis" }, { status: 400 });
    }

    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey:  process.env.GROQ_API_KEY!,
    });

    const completion = await client.chat.completions.create({
      model:       "llama-3.3-70b-versatile",
      max_tokens:  500,
      temperature: 0.2,   // Bas = syntaxe plus fiable, moins créatif sur la forme
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: prompt },
      ],
    });

    const rawCode = completion.choices[0]?.message?.content ?? "";
    const code    = sanitizeMermaid(rawCode);

    return NextResponse.json({ code });

  } catch (err) {
    console.error("[blueprint]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
