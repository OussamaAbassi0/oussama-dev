/* ═══════════════════════════════════════════════════════════
   CENTRALIZED PROJECT DATA — oussama-dev portfolio
═══════════════════════════════════════════════════════════ */

export type Lang = "fr" | "en" | "ar" | "es" | "nl";

export interface SaasProject {
  id: string;
  name: string;
  type: "saas" | "agent";
  year: string;
  color: string;
  tagline: Record<string, string>;
  desc: Record<string, string>;
  challenge: Record<string, string>;
  solution: Record<string, string>;
  impact: Record<string, string>;
  category: Record<string, string>;
  stack: string[];
  metrics: { label: string; value: string; icon: string }[];
  screenshot: string;
  screenshotAlt: string;
  liveUrl: string;
}

export interface N8nProject {
  id: string;
  name: string;
  color: string;
  emoji: string;
  category: string;
  categoryKey: string;
  problem: Record<string, string>;
  solution: Record<string, string>;
  result: Record<string, string>;
  stack: string[];
  metrics: { icon: string; val: string; label: string }[];
  screenshot: string;
}

/* ─── STACK COLORS ─── */
export const STACK_COLORS: Record<string, string> = {
  "Next.js": "#ffffff", "OpenAI GPT-4o": "#74aa9c", "OpenAI GPT-4 Turbo": "#74aa9c",
  "Stripe": "#635bff", "Prisma": "#5a67d8", "Neon": "#39e09b", "Clerk": "#6c47ff",
  "Vercel": "#ffffff", "Vercel AI SDK": "#ffffff", "Groq LLaMA 3.3": "#f97316",
  "OpenRouter": "#ff6b6b", "Tavily API": "#00ffc8", "Firecrawl": "#ff4d6d",
  "n8n": "#f5a623", "Google Sheets": "#34a853", "Whisper": "#74aa9c",
  "Tailwind CSS": "#38bdf8", "HubSpot": "#ff7a59", "Slack": "#4a154b",
  "Gmail": "#ea4335", "Notion": "#ffffff", "Typeform": "#262627",
  "Apollo": "#3b71f3", "Calendly": "#006bff", "Zendesk": "#03363d",
  "Shopify": "#96bf48", "Twilio": "#f22f46", "Jira": "#0052cc",
  "Twitter/X": "#1da1f2", "LinkedIn": "#0077b5", "Stripe Trigger": "#635bff",
  "GPT-4o": "#74aa9c", "Google Analytics": "#e37400", "Google Workspace": "#4285f4",
};

/* ─── SAAS / AGENT PROJECTS ─── */
export const SAAS_PROJECTS: SaasProject[] = [
  {
    id: "flowaudit",
    name: "FlowAudit AI",
    type: "saas",
    year: "2025",
    color: "#00ffc8",
    tagline: {
      fr: "Ton processus métier → workflow n8n en 30 secondes",
      en: "Your business process → n8n workflow in 30 seconds",
    },
    desc: {
      fr: "SaaS full-stack monétisé. Décris ton processus en langage naturel, l'IA analyse les goulots d'étranglement, calcule tes économies et génère un workflow n8n prêt à importer.",
      en: "Full-stack monetized SaaS. Describe your process in plain language, AI analyzes bottlenecks, calculates savings and generates a ready-to-import n8n workflow.",
    },
    challenge: {
      fr: "Les PME perdent des heures à documenter leurs processus manuels et à trouver comment les automatiser. Le manque d'expertise technique crée un fossé entre les besoins réels et les solutions disponibles.",
      en: "SMBs waste hours documenting their manual processes and figuring out how to automate them. The lack of technical expertise creates a gap between real needs and available solutions.",
    },
    solution: {
      fr: "FlowAudit AI transforme n'importe quelle description en langage naturel en un audit structuré : identification des goulots d'étranglement, calcul précis des économies de temps et génération automatique d'un workflow n8n prêt à déployer.",
      en: "FlowAudit AI transforms any natural language description into a structured audit: bottleneck identification, precise time-saving calculation, and auto-generation of a ready-to-deploy n8n workflow.",
    },
    impact: {
      fr: "182h/an économisées en moyenne par client. Export JSON n8n instantané. Free tier 3 audits pour l'acquisition. Monétisation Stripe intégrée.",
      en: "182h/year saved on average per client. Instant JSON n8n export. Free tier with 3 audits for acquisition. Integrated Stripe monetization.",
    },
    category: { fr: "SaaS · IA Générative", en: "SaaS · Generative AI" },
    stack: ["Next.js", "OpenAI GPT-4o", "Stripe", "Prisma", "Neon", "Clerk", "Vercel"],
    metrics: [
      { label: "Économie calculée", value: "182h/an", icon: "⏱" },
      { label: "Export direct", value: "JSON n8n", icon: "📦" },
      { label: "Free tier", value: "3 audits", icon: "🆓" },
    ],
    screenshot: "/projects/flowaudit-hero.png",
    screenshotAlt: "FlowAudit AI",
    liveUrl: "https://flowaudit-ai.vercel.app/",
  },
  {
    id: "leadscout",
    name: "LeadScout AI",
    type: "agent",
    year: "2026",
    color: "#a78bfa",
    tagline: {
      fr: "Agent IA autonome de génération de leads B2B",
      en: "Autonomous AI agent for B2B lead generation",
    },
    desc: {
      fr: "Agent IA agentique. Donne un prompt, l'agent cherche sur le web, scrape leurs sites, et rédige des cold emails ultra-personnalisés basés sur leurs vrais projets.",
      en: "Agentic AI. Give a prompt, the agent searches the web, scrapes sites, and writes ultra-personalized cold emails based on real projects.",
    },
    challenge: {
      fr: "La prospection B2B personnalisée prend 45 minutes par lead : recherche LinkedIn, visite du site, compréhension du contexte, rédaction d'un email pertinent. Aucune équipe ne peut scaler ça manuellement.",
      en: "Personalized B2B outreach takes 45 minutes per lead: LinkedIn research, site visit, context understanding, relevant email writing. No team can scale this manually.",
    },
    solution: {
      fr: "LeadScout AI est un agent entièrement autonome. Donne-lui une cible (ex: \"startups SaaS B2B Paris Series A\"), il recherche sur le web, scrape chaque site, analyse le contexte et génère un email de prospection ultra-personnalisé.",
      en: "LeadScout AI is a fully autonomous agent. Give it a target (e.g. \"Paris Series A B2B SaaS startups\"), it searches the web, scrapes each site, analyzes context and generates an ultra-personalized outreach email.",
    },
    impact: {
      fr: "Recherche 100% autonome. Emails personnalisés au niveau humain. Intégration native n8n + Google Sheets pour le suivi pipeline.",
      en: "100% autonomous research. Human-level personalized emails. Native n8n + Google Sheets integration for pipeline tracking.",
    },
    category: { fr: "Agent IA · Lead Gen", en: "AI Agent · Lead Gen" },
    stack: ["Next.js", "Vercel AI SDK", "OpenAI GPT-4o", "Tavily API", "Firecrawl", "n8n", "Google Sheets"],
    metrics: [
      { label: "Recherche autonome", value: "100%", icon: "🤖" },
      { label: "Emails personnalisés", value: "Auto", icon: "📧" },
      { label: "Intégration", value: "n8n + Sheets", icon: "🔗" },
    ],
    screenshot: "/projects/leadscout.png",
    screenshotAlt: "LeadScout AI",
    liveUrl: "https://lead-scout-ai-agent.vercel.app/",
  },
  {
    id: "talentscout",
    name: "TalentScout AI",
    type: "saas",
    year: "2025",
    color: "#f5a623",
    tagline: {
      fr: "ATS complet — recrutement 10x plus rapide avec IA vocale",
      en: "Full ATS — 10x faster recruitment with AI voice agents",
    },
    desc: {
      fr: "SaaS RH full-stack. Entretiens vocaux IA asynchrones, parsing de CV + Match Score, planification auto sur Google Calendar. Documentation technique 24 pages.",
      en: "Full-stack HR SaaS. Async AI voice interviews, CV parsing + Match Score, auto-scheduling on Google Calendar.",
    },
    challenge: {
      fr: "Le recrutement traditionnel est un goulot d'étranglement : trier 150+ CVs manuellement, planifier des entretiens préliminaires, évaluer de façon subjective. Les bons talents disparaissent pendant que les équipes RH sont submergées.",
      en: "Traditional recruitment is a bottleneck: manually sorting 150+ CVs, scheduling preliminary interviews, subjective evaluation. Great talent disappears while HR teams are overwhelmed.",
    },
    solution: {
      fr: "TalentScout AI est un ATS complet : l'IA parse chaque CV et calcule un Match Score personnalisé, envoie automatiquement des entretiens vocaux asynchrones aux candidats retenus, puis planifie les entretiens humains sur Google Calendar.",
      en: "TalentScout AI is a full ATS: AI parses each CV and calculates a custom Match Score, automatically sends async voice interviews to selected candidates, then schedules human interviews on Google Calendar.",
    },
    impact: {
      fr: "Processus 10x plus rapide. Réduction de 80% du temps de qualification. Documentation technique de 24 pages. Zéro bon profil raté.",
      en: "10x faster process. 80% reduction in qualification time. 24-page technical documentation. Zero missed good profile.",
    },
    category: { fr: "SaaS · RH · IA Vocale", en: "SaaS · HR · Voice AI" },
    stack: ["Next.js", "OpenAI GPT-4 Turbo", "Whisper", "Neon", "Prisma", "Clerk", "Vercel"],
    metrics: [
      { label: "Plus rapide", value: "10x", icon: "⚡" },
      { label: "Réduction qualification", value: "-80%", icon: "📉" },
      { label: "Doc technique", value: "24 pages", icon: "📋" },
    ],
    screenshot: "/projects/talentscout-hero.png",
    screenshotAlt: "TalentScout AI",
    liveUrl: "https://talentscout-ai-seven.vercel.app/",
  },
  {
    id: "darkosclaw",
    name: "DarkosClaw",
    type: "agent",
    year: "2025",
    color: "#ff4d6d",
    tagline: {
      fr: "OS cyberpunk open-source — 25 outils, zéro coût",
      en: "Open-source cyberpunk AI OS — 25 tools, zero cost",
    },
    desc: {
      fr: "Agent IA open-source personnel construit de A à Z. Connecté à des LLMs gratuits (Groq / OpenRouter). 25 outils intégrés : recherche web, scraping, exécution Python, vision, OSINT.",
      en: "Personal open-source AI agent built from scratch. Connected to free LLMs. 25 integrated tools: web search, scraping, Python, vision, OSINT.",
    },
    challenge: {
      fr: "Les assistants IA du marché coûtent cher, sont fermés, et ne peuvent pas être étendus librement. Il n'existe pas d'alternative open-source complète intégrant tous les outils d'un développeur (OSINT, vision, code execution, web scraping) en un seul agent.",
      en: "Market AI assistants are expensive, closed, and can't be freely extended. There's no complete open-source alternative integrating all developer tools (OSINT, vision, code execution, web scraping) in one agent.",
    },
    solution: {
      fr: "DarkosClaw est un OS d'IA cyberpunk construit from scratch : connecté à Groq LLaMA (gratuit), OpenRouter en fallback, avec 25 outils natifs intégrés allant de la recherche web au scraping en passant par l'exécution de code Python et la vision IA.",
      en: "DarkosClaw is a cyberpunk AI OS built from scratch: connected to Groq LLaMA (free), OpenRouter as fallback, with 25 native integrated tools ranging from web search to scraping, Python code execution, and AI vision.",
    },
    impact: {
      fr: "25 outils intégrés. Coût opérationnel 0€. Support multi-LLM (Groq + OpenRouter). Open-source et extensible à l'infini.",
      en: "25 integrated tools. 0€ operational cost. Multi-LLM support (Groq + OpenRouter). Open-source and infinitely extensible.",
    },
    category: { fr: "Agent IA · Open Source", en: "AI Agent · Open Source" },
    stack: ["Next.js", "Vercel AI SDK", "Groq LLaMA 3.3", "OpenRouter", "Tavily API", "Firecrawl", "Whisper"],
    metrics: [
      { label: "Outils intégrés", value: "25", icon: "🛠" },
      { label: "Coût opérationnel", value: "0€", icon: "💰" },
      { label: "LLMs supportés", value: "Groq + OR", icon: "🧠" },
    ],
    screenshot: "/projects/darkosclaw.png",
    screenshotAlt: "DarkosClaw",
    liveUrl: "#",
  },
];

/* ─── N8N WORKFLOW PROJECTS ─── */
export const N8N_PROJECTS: N8nProject[] = [
  {
    id: "wf-linkedin", name: "LinkedIn → CRM Auto-Enrich", color: "#00ffc8",
    emoji: "🎯", category: "Prospection · Sales", categoryKey: "sales",
    problem: { fr: "Chaque connexion LinkedIn était traitée manuellement — 45 min par prospect perdu.", en: "Each LinkedIn connection was handled manually — 45 min per prospect wasted." },
    solution: { fr: "Automatisation complète : Apollo enrichit le profil, GPT-4o calcule un score ICP, email ultra-personnalisé déclenché si score > 70.", en: "Full automation: Apollo enriches profile, GPT-4o calculates ICP score, ultra-personalized email triggered if score > 70." },
    result: { fr: "15h/semaine récupérées. Taux de réponse email x3 grâce à la personnalisation IA.", en: "15h/week saved. Email response rate x3 thanks to AI personalization." },
    stack: ["n8n", "LinkedIn", "Apollo", "OpenAI GPT-4o", "HubSpot", "Gmail"],
    metrics: [{ icon: "⏱", val: "15h/sem", label: "Économisées" }, { icon: "📈", val: "x3", label: "Taux réponse" }, { icon: "🎯", val: ">70", label: "Score ICP auto" }],
    screenshot: "/workflows/linkedin.png",
  },
  {
    id: "wf-inbound", name: "Inbound Lead Qualifier IA", color: "#ff4d6d",
    emoji: "🔥", category: "Prospection · Sales", categoryKey: "sales",
    problem: { fr: "Leads Typeform non qualifiés traités 24h après — les chauds refroidissent.", en: "Typeform leads unqualified, processed 24h later — hot leads go cold." },
    solution: { fr: "GPT-4o qualifie Chaud/Tiède/Froid en temps réel. Alerte Slack + email de réponse auto envoyé en < 2 minutes pour les leads chauds.", en: "GPT-4o qualifies Hot/Warm/Cold in real time. Slack alert + auto reply email sent in < 2 minutes for hot leads." },
    result: { fr: "Temps de réponse : 24h → 2 minutes. Taux de conversion leads chauds +40%.", en: "Response time: 24h → 2 minutes. Hot lead conversion rate +40%." },
    stack: ["n8n", "Typeform", "OpenAI GPT-4o", "Slack", "Gmail"],
    metrics: [{ icon: "⚡", val: "<2min", label: "Réponse auto" }, { icon: "🔥", val: "+40%", label: "Conversion" }, { icon: "📋", val: "3 segments", label: "Qualification" }],
    screenshot: "/workflows/inbound-lead.png",
  },
  {
    id: "wf-cold-email", name: "Cold Email Machine B2B", color: "#00e5ff",
    emoji: "📨", category: "Prospection · Sales", categoryKey: "sales",
    problem: { fr: "Rédiger 50 emails personnalisés par semaine prenait 25h à l'équipe sales.", en: "Writing 50 personalized emails per week took 25h from the sales team." },
    solution: { fr: "CSV importé → Apollo enrichit → GPT génère un email unique par secteur/poste/entreprise → envoi séquencé → RDV Calendly créés auto.", en: "CSV imported → Apollo enriches → GPT generates unique email per industry/role/company → sequenced send → Calendly meetings auto-created." },
    result: { fr: "25h/semaine économisées. 300 emails/jour envoyés avec personnalisation niveau humain.", en: "25h/week saved. 300 emails/day sent with human-level personalization." },
    stack: ["n8n", "Apollo", "OpenAI GPT-4o", "Instantly", "Calendly", "Slack"],
    metrics: [{ icon: "📧", val: "300/jour", label: "Emails envoyés" }, { icon: "⏱", val: "25h/sem", label: "Économisées" }, { icon: "🤝", val: "Auto", label: "RDV Calendly" }],
    screenshot: "/workflows/cold-email.png",
  },
  {
    id: "wf-cv", name: "CV Screener IA", color: "#a78bfa",
    emoji: "👥", category: "RH · Recrutement", categoryKey: "hr",
    problem: { fr: "Trier 150 CVs par semaine manuellement. 20h perdues par recrutement.", en: "Sorting 150 CVs per week manually. 20h lost per recruitment cycle." },
    solution: { fr: "CV reçu par Gmail → GPT-4o score 0-100 → >75 : convocation auto + Calendly → <40 : refus poli → ATS Notion mis à jour.", en: "CV received by Gmail → GPT-4o scores 0-100 → >75: auto invite + Calendly → <40: polite rejection → Notion ATS updated." },
    result: { fr: "20h → 30 minutes par recrutement. Zéro bon profil raté. ATS toujours à jour.", en: "20h → 30 min per recruitment. Zero missed good profiles. ATS always up to date." },
    stack: ["n8n", "Gmail", "OpenAI GPT-4o", "Calendly", "Notion", "Slack"],
    metrics: [{ icon: "⏱", val: "-95%", label: "Temps tri CVs" }, { icon: "🎯", val: "0", label: "Bons profils ratés" }, { icon: "📝", val: "Auto", label: "ATS mis à jour" }],
    screenshot: "/workflows/cv-screener.png",
  },
  {
    id: "wf-onboarding", name: "Employee Onboarding Automatisé", color: "#4ade80",
    emoji: "🚀", category: "RH · Recrutement", categoryKey: "hr",
    problem: { fr: "Onboarding d'un nouvel employé = 3 jours de setup manuel entre IT, RH et managers.", en: "Onboarding a new employee = 3 days of manual setup between IT, HR and managers." },
    solution: { fr: "Contrat signé → comptes Slack/Notion/Google créés → email bienvenue → parcours J+1 à J+14 → manager notifié à chaque étape.", en: "Contract signed → Slack/Notion/Google accounts created → welcome email → J+1 to J+14 journey → manager notified at each step." },
    result: { fr: "3 jours → 15 minutes. Expérience employé homogène. Zéro accès oublié.", en: "3 days → 15 minutes. Consistent employee experience. Zero forgotten access." },
    stack: ["n8n", "Google Workspace", "Slack", "Notion", "Gmail"],
    metrics: [{ icon: "⚡", val: "15min", label: "Setup complet" }, { icon: "📅", val: "14 jours", label: "Parcours auto" }, { icon: "✅", val: "100%", label: "Accès créés" }],
    screenshot: "/workflows/onboarding.png",
  },
  {
    id: "wf-support-triage", name: "Support Client Auto-Triage", color: "#f5a623",
    emoji: "🎫", category: "Support · Communication", categoryKey: "support",
    problem: { fr: "Emails support non triés — questions simples bloquent les agents sur les urgences.", en: "Unsorted support emails — simple questions block agents from real urgencies." },
    solution: { fr: "Email reçu → GPT classifie (Urgence/Technique/Commercial/Spam) → ticket Zendesk créé → assigné au bon agent → réponse auto pour les cas simples.", en: "Email received → GPT classifies (Urgent/Technical/Commercial/Spam) → Zendesk ticket → assigned to right agent → auto-reply for simple cases." },
    result: { fr: "18h/semaine de triage éliminées. Temps de résolution urgences -60%.", en: "18h/week of triaging eliminated. Urgent resolution time -60%." },
    stack: ["n8n", "Gmail", "OpenAI GPT-4o", "Zendesk", "Slack"],
    metrics: [{ icon: "⏱", val: "18h/sem", label: "Triage éliminé" }, { icon: "⚡", val: "-60%", label: "Résolution urgences" }, { icon: "🤖", val: "Auto", label: "Réponses simples" }],
    screenshot: "/workflows/support-triage.png",
  },
  {
    id: "wf-ecom-support", name: "Support E-commerce 24/7", color: "#ff8c42",
    emoji: "🛒", category: "Support · Communication", categoryKey: "support",
    problem: { fr: "Support fermé la nuit — 40% des questions arrivent hors horaires, clients frustrés.", en: "Support closed at night — 40% of questions arrive off-hours, frustrated customers." },
    solution: { fr: "Agent IA accède aux commandes Shopify en temps réel, répond en autonomie, escalade uniquement les cas complexes vers Slack.", en: "AI agent accesses Shopify orders in real time, responds autonomously, escalates only complex cases to Slack." },
    result: { fr: "Support 24/7 sans coût supplémentaire. 80% des tickets résolus automatiquement.", en: "24/7 support with no extra cost. 80% of tickets resolved automatically." },
    stack: ["n8n", "Shopify", "OpenAI GPT-4o", "Gmail", "Slack"],
    metrics: [{ icon: "🕐", val: "24/7", label: "Disponibilité" }, { icon: "🤖", val: "80%", label: "Tickets auto-résolus" }, { icon: "⚡", val: "<30sec", label: "Temps réponse" }],
    screenshot: "/workflows/ecom-support.png",
  },
  {
    id: "wf-social", name: "Social Listening & Réponse IA", color: "#00ffc8",
    emoji: "📡", category: "Marketing · Social", categoryKey: "marketing",
    problem: { fr: "Mentions sur Twitter/LinkedIn non détectées — une crise peut durer 48h sans réaction.", en: "Twitter/LinkedIn mentions undetected — a crisis can last 48h without reaction." },
    solution: { fr: "Scan toutes les 2h → GPT analyse sentiment → négatif : alerte Slack + réponse suggérée → positif : demande témoignage auto.", en: "Scan every 2h → GPT analyzes sentiment → negative: Slack alert + suggested reply → positive: auto testimonial request." },
    result: { fr: "12h/semaine de veille éliminées. 0 crise ignorée. +15 témoignages collectés/mois.", en: "12h/week of manual monitoring eliminated. 0 ignored crisis. +15 testimonials/month." },
    stack: ["n8n", "Twitter/X", "LinkedIn", "OpenAI GPT-4o", "Slack", "Notion"],
    metrics: [{ icon: "⏱", val: "12h/sem", label: "Veille éliminée" }, { icon: "🔴", val: "<2h", label: "Réaction crise" }, { icon: "⭐", val: "+15/mois", label: "Témoignages" }],
    screenshot: "/workflows/social-listening.png",
  },
  {
    id: "wf-report", name: "Business Report Automatique", color: "#a78bfa",
    emoji: "📊", category: "Ops · Finance", categoryKey: "ops",
    problem: { fr: "Rapport hebdo = 6h de collecte manuelle GA4 + Stripe + CRM + rédaction chaque vendredi.", en: "Weekly report = 6h of manual collection GA4 + Stripe + CRM + writing every Friday." },
    solution: { fr: "Chaque vendredi 17h : collecte automatique GA4 + Stripe + HubSpot → GPT rédige un rapport narratif avec insights → PDF envoyé + archivé Notion.", en: "Every Friday 5pm: auto-collect GA4 + Stripe + HubSpot → GPT writes narrative report → PDF sent + archived in Notion." },
    result: { fr: "6h → 0h de travail manuel. Rapport plus riche avec tendances et recommandations IA.", en: "6h → 0h of manual work. Richer report with AI trends and recommendations." },
    stack: ["n8n", "Google Analytics", "Stripe", "HubSpot", "OpenAI GPT-4o", "Gmail", "Notion"],
    metrics: [{ icon: "⏱", val: "6h/sem", label: "Économisées" }, { icon: "📊", val: "3 sources", label: "KPIs consolidés" }, { icon: "🤖", val: "IA", label: "Insights narratifs" }],
    screenshot: "/workflows/business-report.png",
  },
  {
    id: "wf-invoice", name: "Facturation & Relances Auto", color: "#f5a623",
    emoji: "💳", category: "Ops · Finance", categoryKey: "ops",
    problem: { fr: "Suivi des impayés = 1h/jour manuellement. Taux de recouvrement faible.", en: "Unpaid invoice follow-up = 1h/day manually. Low recovery rate." },
    solution: { fr: "Facture Stripe créée → email auto → J+7 non payée : relance douce → J+14 : relance ferme → J+21 : alerte Slack + suspension accès.", en: "Stripe invoice created → auto email → D+7 unpaid: soft reminder → D+14: firm reminder → D+21: Slack alert + automatic access suspension." },
    result: { fr: "6h/semaine récupérées. Taux de recouvrement J+14 : +35%. Zéro impayé oublié.", en: "6h/week saved. D+14 recovery rate: +35%. Zero forgotten unpaid invoice." },
    stack: ["n8n", "Stripe", "Gmail", "Slack"],
    metrics: [{ icon: "💰", val: "+35%", label: "Taux recouvrement" }, { icon: "⏱", val: "6h/sem", label: "Économisées" }, { icon: "🔒", val: "Auto", label: "Suspension J+21" }],
    screenshot: "/workflows/invoice.png",
  },
  {
    id: "wf-cart", name: "Abandoned Cart Recovery", color: "#ff4d6d",
    emoji: "🛍️", category: "E-commerce · Marketing", categoryKey: "ecommerce",
    problem: { fr: "70% des paniers abandonnés sans relance. Milliers d'euros perdus chaque mois.", en: "70% of abandoned carts without follow-up. Thousands of euros lost every month." },
    solution: { fr: "Panier abandonné → 1h wait → email avec contenu → SMS J+1 via Twilio → code promo -10% généré J+3.", en: "Abandoned cart → 1h wait → cart content email → SMS D+1 via Twilio → -10% promo code generated D+3." },
    result: { fr: "+15% de taux de récupération. ROI séquence : 12x le coût mensuel.", en: "+15% recovery rate. Sequence ROI: 12x the monthly automation cost." },
    stack: ["n8n", "Shopify", "Gmail", "Twilio", "Slack"],
    metrics: [{ icon: "🛒", val: "+15%", label: "Récupération" }, { icon: "💰", val: "12x ROI", label: "Automatisation" }, { icon: "📱", val: "SMS+Email", label: "Multi-canal" }],
    screenshot: "/workflows/abandoned-cart.png",
  },
  {
    id: "wf-scoring", name: "Lead Scoring & Nurturing IA", color: "#4ade80",
    emoji: "⚡", category: "Marketing · Sales", categoryKey: "marketing",
    problem: { fr: "Tous les leads traités pareil — l'équipe sales perd du temps sur des contacts pas prêts.", en: "All leads treated the same — sales team wastes time on unready contacts." },
    solution: { fr: "Lead entrant → GPT calcule score ICP 0-100 + segment → HubSpot mis à jour → si ≥70 : email ultra-perso + alerte Slack → si <70 : séquence nurturing.", en: "Incoming lead → GPT calculates ICP score 0-100 + segment → HubSpot updated → if ≥70: ultra-personalized email + Slack alert → if <70: nurturing sequence." },
    result: { fr: "Sales focalisés sur les vrais leads. Taux de qualification x2. 12h/semaine économisées.", en: "Sales focused on real leads. Qualification rate x2. 12h/week saved." },
    stack: ["n8n", "OpenAI GPT-4o", "HubSpot", "Gmail", "Slack"],
    metrics: [{ icon: "🎯", val: "x2", label: "Qualification" }, { icon: "⏱", val: "12h/sem", label: "Économisées" }, { icon: "📊", val: "4 segments", label: "ICP auto" }],
    screenshot: "/workflows/lead-scoring.png",
  },
  {
    id: "wf-medical-doc-intelligence",
    name: "AI Medical Document Intelligence Pipeline",
    color: "#00ffc8",
    emoji: "🏥",
    category: "Healthcare · IA Médicale",
    categoryKey: "healthcare",
    problem: {
      fr: "Des centaines d'ordonnances et bilans PDF arrivaient par email chaque semaine — traitement 100% manuel, risques d'erreurs critiques dans un contexte médical sensible.",
      en: "Hundreds of PDF prescriptions and lab results arrived by email weekly — 100% manual processing with critical error risk in a sensitive medical context.",
    },
    solution: {
      fr: "Pipeline n8n en 32 nœuds : OCR via PDF.co → classification GPT-4o (6 types de documents) → extraction structurée spécialisée → validation → dossier patient → archivage Drive → alerte STAT Slack → résumé clinique → tâche Notion → rapport conformité RGPD.",
      en: "32-node n8n pipeline: OCR via PDF.co → GPT-4o classification (6 document types) → specialized structured extraction → validation → patient record → Drive archive → STAT Slack alert → clinical summary → Notion task → GDPR compliance report.",
    },
    result: {
      fr: "Traitement automatisé bout-en-bout. Alertes STAT instantanées. Conformité RGPD intégrée. Zéro document perdu. Piste d'audit complète Google Sheets.",
      en: "End-to-end automated processing. Instant STAT alerts. Built-in GDPR compliance. Zero lost document. Full Google Sheets audit trail.",
    },
    stack: ["n8n", "GPT-4o", "PDF.co (OCR)", "Google Drive", "Google Sheets", "Notion", "Slack", "Gmail"],
    metrics: [
      { icon: "🏥", val: "6 types", label: "Documents classifiés IA" },
      { icon: "⚡", val: "STAT", label: "Alertes critiques instant." },
      { icon: "🔒", val: "RGPD", label: "Conformité intégrée" },
      { icon: "🔗", val: "32 nœuds", label: "Pipeline complet" },
    ],
    screenshot: "/workflows/medical-doc-intelligence.png",
  },
  {
    id: "wf-b2b-revenue-autopilot",
    name: "B2B Revenue Intelligence & Outreach Autopilot",
    color: "#a78bfa",
    emoji: "🚀",
    category: "Sales · Prospection IA",
    categoryKey: "sales",
    problem: {
      fr: "La prospection B2B manuelle : 3h/jour pour chercher des leads, rédiger des emails, relancer, qualifier — et les meilleurs prospects n'étaient jamais contactés au bon moment.",
      en: "Manual B2B prospecting: 3h/day finding leads, writing emails, following up, qualifying — and the best prospects were never contacted at the right time.",
    },
    solution: {
      fr: "Autopilot en 33 nœuds : Apollo fetch leads ICP (CEO/CTO, 10-1000 emp) → dédoublonnage HubSpot → enrichissement complet → scoring ICP GPT-4o (0-100 + pain points + hook perso) → email ultra-personnalisé → séquence J+3/J+7 → deal auto si réponse → brief pré-RDV intelligence → rapport hebdo Slack.",
      en: "33-node autopilot: Apollo fetch ICP leads (CEO/CTO, 10-1000 emp) → HubSpot dedup → full enrichment → GPT-4o ICP scoring (0-100 + pain points + perso hook) → ultra-personalized email → J+3/J+7 sequence → auto deal on reply → pre-meeting intelligence brief → weekly Slack report.",
    },
    result: {
      fr: "Prospection 24/7 sans intervention humaine. Emails personnalisés niveau humain à grande échelle. Deal HubSpot + brief pré-RDV auto dès qu'un prospect répond. Rapport pipeline chaque vendredi.",
      en: "24/7 prospecting without human intervention. Human-level personalized emails at scale. HubSpot deal + pre-meeting brief auto-created on reply. Pipeline report every Friday.",
    },
    stack: ["n8n", "Apollo.io", "GPT-4o", "HubSpot", "Gmail", "Google Sheets", "Slack", "Calendly"],
    metrics: [
      { icon: "🎯", val: "0-100", label: "Score ICP GPT-4o" },
      { icon: "📧", val: "J+3/J+7", label: "Séquence auto" },
      { icon: "🔥", val: "Auto", label: "Deal sur réponse" },
      { icon: "🔗", val: "33 nœuds", label: "Pipeline complet" },
    ],
    screenshot: "/workflows/b2b-revenue-autopilot.png",
  },
  {
    id: "wf-payment", name: "Paiement → Ticket → Notification", color: "#00e5ff",
    emoji: "✉️", category: "Ops · Finance", categoryKey: "ops",
    problem: { fr: "Après un paiement Stripe, 3 actions manuelles : créer ticket Jira, notifier Slack, envoyer facture.", en: "After a Stripe payment, 3 manual actions: create Jira ticket, notify Slack, send invoice." },
    solution: { fr: "Paiement Stripe → ticket Jira auto → équipe notifiée Slack → facture HTML personnalisée → si Enterprise : alerte VIP.", en: "Stripe payment → Jira ticket auto-created → team notified on Slack → personalized HTML invoice → if Enterprise plan: VIP alert." },
    result: { fr: "4h/semaine de saisie manuelle éliminées. Zéro paiement sans ticket. Clients satisfaits.", en: "4h/week of manual entry eliminated. Zero payment without ticket. Satisfied clients." },
    stack: ["n8n", "Stripe", "Jira", "Slack", "Gmail"],
    metrics: [{ icon: "⚡", val: "4h/sem", label: "Saisie éliminée" }, { icon: "🎫", val: "100%", label: "Tickets créés" }, { icon: "📧", val: "Auto", label: "Factures HTML" }],
    screenshot: "/workflows/payment-ticket.png",
  },
];
