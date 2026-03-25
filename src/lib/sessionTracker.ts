/*
  Session Tracker — Ambient Intelligence Layer
  Stocke dans sessionStorage les actions du visiteur.
  Lu par ProactiveChat pour personnaliser le message d'ouverture.
  Ne dépend d'aucune lib externe.
*/

const KEY = "oussama_sess";

export interface SessionData {
  visitedPages:  string[];   /* ex: ["/", "/lab", "/blog"] */
  articlesRead:  string[];   /* slugs ex: ["recrutement-ia-temps-divise-par-5"] */
  labToolsUsed:  string[];   /* ex: ["lead-hunter", "roi", "workflow"] */
  roiHours?:     number;     /* résultat du ROI Calculator */
  roiEuros?:     number;
  firstSeen:     number;     /* timestamp */
  pageCount:     number;
}

function empty(): SessionData {
  return {
    visitedPages: [],
    articlesRead: [],
    labToolsUsed: [],
    firstSeen:    Date.now(),
    pageCount:    0,
  };
}

export function getSession(): SessionData {
  if (typeof window === "undefined") return empty();
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : empty();
  } catch {
    return empty();
  }
}

function save(data: SessionData) {
  if (typeof window === "undefined") return;
  try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch { /* quota */ }
}

export function trackPageVisit(path: string) {
  const s = getSession();
  if (!s.visitedPages.includes(path)) s.visitedPages.push(path);
  s.pageCount = (s.pageCount ?? 0) + 1;

  /* Detect blog article */
  const match = path.match(/^\/blog\/(.+)/);
  if (match && !s.articlesRead.includes(match[1])) {
    s.articlesRead.push(match[1]);
  }
  save(s);
}

export function trackLabTool(tool: string) {
  const s = getSession();
  if (!s.labToolsUsed.includes(tool)) s.labToolsUsed.push(tool);
  if (!s.visitedPages.includes("/lab")) s.visitedPages.push("/lab");
  save(s);
}

export function trackROIResult(hours: number, euros: number) {
  const s     = getSession();
  s.roiHours  = hours;
  s.roiEuros  = euros;
  save(s);
}

/* ── Generate personalized welcome string ────────────────────────
   Called client-side — no API needed.
   Returns null if no interesting data (falls back to generic welcome).
────────────────────────────────────────────────────────────────── */
const ARTICLE_LABELS: Record<string, string> = {
  "5-taches-repetitives-encore-a-la-main":       "les 5 tâches répétitives",
  "recrutement-ia-temps-divise-par-5":            "le recrutement IA",
  "automatiser-prospection-b2b-n8n":              "la prospection B2B avec n8n",
  "roi-automatisation-calcul-concret":            "le calcul ROI",
  "agent-ia-multi-agents-architecture":           "les systèmes multi-agents",
  "ia-pas-reservee-grandes-entreprises":          "l'IA pour les PME",
};

const TOOL_LABELS: Record<string, string> = {
  "lead-hunter": "Lead Hunter",
  "roi":         "ROI Calculator",
  "workflow":    "Workflow Builder",
  "automation":  "Live Pipeline",
  "email-gen":   "Email Generator",
  "gallery":     "Workflow Gallery",
};

export function buildPersonalizedWelcome(
  lang: string,
  currentPage: string,
): string | null {
  const s = getSession();

  const hasArticle  = s.articlesRead.length > 0;
  const hasTool     = s.labToolsUsed.length > 0;
  const hasROI      = s.roiHours !== undefined && s.roiEuros !== undefined;
  const isReturning = s.pageCount > 2;

  /* Nothing interesting yet */
  if (!hasArticle && !hasTool && !hasROI && !isReturning) return null;

  if (lang === "fr") {
    if (hasROI) {
      const h = Math.round(s.roiHours!);
      const e = Math.round(s.roiEuros!).toLocaleString("fr-FR");
      return `J'ai vu que vous avez calculé **${h}h/semaine** perdues — soit **${e}€/an**. 🔥 Voulez-vous qu'on parle de comment éliminer ça concrètement ?`;
    }
    if (hasArticle) {
      const topic = ARTICLE_LABELS[s.articlesRead[s.articlesRead.length - 1]] ?? "l'automatisation";
      return `J'ai vu que vous avez lu l'article sur **${topic}**. 📖 Vous avez des questions ou un cas concret à explorer ?`;
    }
    if (hasTool) {
      const tool = TOOL_LABELS[s.labToolsUsed[s.labToolsUsed.length - 1]] ?? "les outils";
      return `Je vois que vous avez testé le **${tool}** 🧪 Des questions sur comment ça fonctionnerait pour votre business ?`;
    }
    if (isReturning) {
      return `Vous explorez le site en détail 👀 Je peux vous aider à trouver exactement ce que vous cherchez.`;
    }
  }

  if (lang === "en") {
    if (hasROI) {
      const h = Math.round(s.roiHours!);
      const e = Math.round(s.roiEuros!).toLocaleString("en-US");
      return `I saw you calculated **${h}h/week** lost — that's **$${e}/year**. 🔥 Want to talk about how to eliminate that concretely?`;
    }
    if (hasArticle) {
      return `I saw you were reading the blog 📖 Any questions or a specific case you'd like to explore?`;
    }
    if (hasTool) {
      const tool = TOOL_LABELS[s.labToolsUsed[s.labToolsUsed.length - 1]] ?? "the tools";
      return `I see you tested the **${tool}** 🧪 Questions about how it would work for your business?`;
    }
    if (isReturning) {
      return `You're exploring the site closely 👀 I can help you find exactly what you're looking for.`;
    }
  }

  /* For ar/es/nl — generic returning visitor message */
  if (isReturning || hasArticle || hasTool || hasROI) {
    if (lang === "ar") return `أرى أنك تتصفح الموقع بتمعن 👀 هل يمكنني مساعدتك في العثور على ما تبحث عنه؟`;
    if (lang === "es") return `Veo que estás explorando el sitio 👀 ¿Puedo ayudarte a encontrar exactamente lo que buscas?`;
    if (lang === "nl") return `Ik zie dat je de site grondig bekijkt 👀 Kan ik je helpen precies te vinden wat je zoekt?`;
  }

  return null;
}
