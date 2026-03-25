import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey:  process.env.GROQ_API_KEY!,
});

/* ─── Tool signature map ─────────────────────────────────────────
   Maps known script/pixel/cookie patterns → tool name + category
──────────────────────────────────────────────────────────────── */
const TOOL_SIGNATURES: Array<{ pattern: RegExp; tool: string; category: string }> = [
  /* CRM / Sales */
  { pattern: /hubspot|hs-scripts|hs-analytics/i,  tool: "HubSpot",        category: "CRM" },
  { pattern: /salesforce|pardot/i,                 tool: "Salesforce",     category: "CRM" },
  { pattern: /pipedrive/i,                          tool: "Pipedrive",      category: "CRM" },
  { pattern: /notion\.so|notionusercontent/i,       tool: "Notion",         category: "PM" },

  /* Email marketing */
  { pattern: /mailchimp|mc\.js|chimpstatic/i,       tool: "Mailchimp",      category: "Email" },
  { pattern: /brevo|sendinblue/i,                   tool: "Brevo",          category: "Email" },
  { pattern: /klaviyo/i,                             tool: "Klaviyo",        category: "Email" },
  { pattern: /activecampaign/i,                      tool: "ActiveCampaign", category: "Email" },
  { pattern: /mailerlite/i,                          tool: "MailerLite",     category: "Email" },

  /* Analytics */
  { pattern: /google-analytics|gtag|ga4|UA-\d/i,   tool: "Google Analytics", category: "Analytics" },
  { pattern: /segment\.com|segment\.io/i,           tool: "Segment",        category: "Analytics" },
  { pattern: /mixpanel/i,                           tool: "Mixpanel",       category: "Analytics" },
  { pattern: /hotjar|_hjid/i,                       tool: "Hotjar",         category: "Analytics" },

  /* Support / Chat */
  { pattern: /intercom/i,                           tool: "Intercom",       category: "Support" },
  { pattern: /zendesk/i,                            tool: "Zendesk",        category: "Support" },
  { pattern: /crisp\.chat|crisp-website/i,          tool: "Crisp",          category: "Support" },
  { pattern: /drift\.com|driftt\.com/i,             tool: "Drift",          category: "Support" },
  { pattern: /tawk\.to/i,                           tool: "Tawk.to",        category: "Support" },

  /* Advertising */
  { pattern: /google.*tag|googletagmanager/i,       tool: "Google Tag Manager", category: "Ads" },
  { pattern: /facebook.*pixel|fbq\(/i,             tool: "Meta Pixel",     category: "Ads" },
  { pattern: /linkedin.*insight/i,                  tool: "LinkedIn Insight", category: "Ads" },

  /* Forms / Lead capture */
  { pattern: /typeform/i,                           tool: "Typeform",       category: "Forms" },
  { pattern: /tally\.so/i,                          tool: "Tally",          category: "Forms" },
  { pattern: /jotform/i,                            tool: "JotForm",        category: "Forms" },
  { pattern: /calendly/i,                           tool: "Calendly",       category: "Calendar" },

  /* Spreadsheets / low code */
  { pattern: /airtable/i,                           tool: "Airtable",       category: "Database" },
  { pattern: /webflow/i,                            tool: "Webflow",        category: "CMS" },
  { pattern: /shopify/i,                            tool: "Shopify",        category: "eCommerce" },
  { pattern: /wordpress|wp-content/i,               tool: "WordPress",      category: "CMS" },
];

/* ─── Fetch domain HTML (server-side, avoids CORS) ──────────── */
async function fetchDomainInfo(domain: string): Promise<{
  html:     string;
  headers:  Record<string, string>;
  title:    string;
  error?:   string;
}> {
  try {
    const url = domain.startsWith("http") ? domain : `https://${domain}`;
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal:  controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AuditBot/1.0)" },
    });
    clearTimeout(timeout);

    const html    = await res.text();
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => { headers[k] = v; });

    /* Extract title */
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title      = titleMatch?.[1]?.trim() ?? domain;

    return { html, headers, title };
  } catch (e: unknown) {
    return { html: "", headers: {}, title: domain, error: String(e) };
  }
}

/* ─── Detect tools from HTML + headers ──────────────────────── */
function detectTools(html: string, headers: Record<string, string>): { tool: string; category: string }[] {
  const source   = [html, JSON.stringify(headers)].join(" ");
  const detected = new Map<string, string>(); /* tool → category */

  for (const sig of TOOL_SIGNATURES) {
    if (sig.pattern.test(source) && !detected.has(sig.tool)) {
      detected.set(sig.tool, sig.category);
    }
  }
  return Array.from(detected.entries()).map(([tool, category]) => ({ tool, category }));
}

/* ─── API route ──────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { domain, lang = "fr" } = await req.json();
    if (!domain) return NextResponse.json({ error: "No domain" }, { status: 400 });

    const { html, headers, title, error: fetchError } = await fetchDomainInfo(domain);
    const detectedTools = detectTools(html, headers);

    const toolList = detectedTools.length > 0
      ? detectedTools.map(t => `${t.tool} (${t.category})`).join(", ")
      : "Aucun outil identifié publiquement";

    const techStack = headers["x-powered-by"] ?? headers["server"] ?? "inconnu";

    const langMap: Record<string, string> = {
      fr: "français", en: "English", ar: "arabe", es: "español", nl: "Nederlands",
    };

    const systemPrompt = `Tu es Oussama Abassi, expert en automatisation B2B.
Tu viens d'analyser le site ${domain} et tu vas donner un audit d'automatisation personnalisé.
Réponds en ${langMap[lang] ?? "français"}.
Sois direct, concret et enthousiaste. Maximum 5 phrases par section.`;

    const userPrompt = `Domaine analysé : ${domain}
Titre du site : ${title}
Stack technique détectée : ${techStack}
Outils détectés (pixels, scripts, intégrations) : ${toolList}
Erreur de chargement : ${fetchError ?? "aucune"}

Génère un audit d'automatisation personnalisé en JSON avec cette structure EXACTE :
{
  "headline": "titre accrocheur basé sur leur stack réelle (1 phrase)",
  "detected": ["liste des outils détectés, max 6"],
  "opportunities": [
    { "title": "nom de l'opportunité", "description": "ce qu'on automatiserait entre leurs outils", "saving": "estimation temps économisé ex: 8h/semaine" }
  ],
  "quickWin": "l'automatisation la plus rapide à mettre en place (1-2 phrases)",
  "roiEstimate": "estimation ROI sur 12 mois (ex: +340h/an, 18 000€ récupérés)",
  "maturityScore": 3
}

Règles :
- opportunities : exactement 3, basées sur les vrais outils détectés
- Si aucun outil détecté, invente des opportunités communes pour leur secteur
- maturityScore : 1 à 5 (1=très manuel, 5=déjà bien automatisé)
- Retourne UNIQUEMENT le JSON, sans texte autour`;

    const response = await groq.chat.completions.create({
      model:      "llama-3.3-70b-versatile",
      max_tokens: 700,
      messages:   [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt },
      ],
    });

    const raw   = response.choices[0]?.message?.content ?? "{}";
    const match = raw.match(/\{[\s\S]*\}/);
    const data  = match ? JSON.parse(match[0]) : {};

    return NextResponse.json({
      ...data,
      domain,
      title,
      detected: detectedTools.map(t => t.tool),
    });
  } catch (err) {
    console.error("[domain-audit]", err);
    return NextResponse.json({ error: "Audit failed" }, { status: 500 });
  }
}
