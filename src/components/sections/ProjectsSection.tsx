"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   STACK COLORS
══════════════════════════════════════════════════════════ */
const STACK_COLORS: Record<string, string> = {
  "Next.js":"#ffffff","OpenAI GPT-4o":"#74aa9c","OpenAI GPT-4 Turbo":"#74aa9c",
  "Stripe":"#635bff","Prisma":"#5a67d8","Neon":"#39e09b","Clerk":"#6c47ff",
  "Vercel":"#ffffff","Vercel AI SDK":"#ffffff","Groq LLaMA 3.3":"#f97316",
  "OpenRouter":"#ff6b6b","Tavily API":"#00ffc8","Firecrawl":"#ff4d6d",
  "n8n":"#f5a623","Google Sheets":"#34a853","Whisper":"#74aa9c",
  "Tailwind CSS":"#38bdf8","HubSpot":"#ff7a59","Slack":"#4a154b",
  "Gmail":"#ea4335","Notion":"#ffffff","Typeform":"#262627",
  "Apollo":"#3b71f3","Calendly":"#006bff","Zendesk":"#03363d",
  "Shopify":"#96bf48","Twilio":"#f22f46","Jira":"#0052cc",
  "Twitter/X":"#1da1f2","LinkedIn":"#0077b5","Stripe Trigger":"#635bff",
  "GPT-4o":"#74aa9c","Google Analytics":"#e37400","Google Workspace":"#4285f4",
};

/* ══════════════════════════════════════════════════════════
   SAAS / AGENT PROJECTS
══════════════════════════════════════════════════════════ */
const SAAS_PROJECTS = [
  {
    id:"flowaudit", name:"FlowAudit AI", type:"saas", year:"2025", color:"#00ffc8",
    tagline:{ fr:"Ton processus métier → workflow n8n en 30 secondes", en:"Your business process → n8n workflow in 30 seconds" },
    desc:{ fr:"SaaS full-stack monétisé. Décris ton processus en langage naturel, l'IA analyse les goulots d'étranglement, calcule tes économies et génère un workflow n8n prêt à importer.", en:"Full-stack monetized SaaS. Describe your process in plain language, AI analyzes bottlenecks, calculates savings and generates a ready-to-import n8n workflow." },
    category:{ fr:"SaaS · IA Générative", en:"SaaS · Generative AI" },
    stack:["Next.js","OpenAI GPT-4o","Stripe","Prisma","Neon","Clerk","Vercel"],
    metrics:[{ label:"Économie calculée", value:"182h/an", icon:"⏱" },{ label:"Export direct", value:"JSON n8n", icon:"📦" },{ label:"Free tier", value:"3 audits", icon:"🆓" }],
    screenshot:"/projects/flowaudit-hero.png", screenshotAlt:"FlowAudit AI",
    liveUrl:"https://flowaudit-ai.vercel.app/",
  },
  {
    id:"leadscout", name:"LeadScout AI", type:"agent", year:"2026", color:"#a78bfa",
    tagline:{ fr:"Agent IA autonome de génération de leads B2B", en:"Autonomous AI agent for B2B lead generation" },
    desc:{ fr:"Agent IA agentique. Donne un prompt, l'agent cherche sur le web, scrape leurs sites, et rédige des cold emails ultra-personnalisés basés sur leurs vrais projets.", en:"Agentic AI. Give a prompt, the agent searches the web, scrapes sites, and writes ultra-personalized cold emails based on real projects." },
    category:{ fr:"Agent IA · Lead Gen", en:"AI Agent · Lead Gen" },
    stack:["Next.js","Vercel AI SDK","OpenAI GPT-4o","Tavily API","Firecrawl","n8n","Google Sheets"],
    metrics:[{ label:"Recherche autonome", value:"100%", icon:"🤖" },{ label:"Emails personnalisés", value:"Auto", icon:"📧" },{ label:"Intégration", value:"n8n + Sheets", icon:"🔗" }],
    screenshot:"/projects/leadscout.png", screenshotAlt:"LeadScout AI",
    liveUrl:"https://lead-scout-ai-agent.vercel.app/",
  },
  {
    id:"talentscout", name:"TalentScout AI", type:"saas", year:"2025", color:"#f5a623",
    tagline:{ fr:"ATS complet — recrutement 10x plus rapide avec IA vocale", en:"Full ATS — 10x faster recruitment with AI voice agents" },
    desc:{ fr:"SaaS RH full-stack. Entretiens vocaux IA asynchrones, parsing de CV + Match Score, planification auto sur Google Calendar. Documentation technique 24 pages.", en:"Full-stack HR SaaS. Async AI voice interviews, CV parsing + Match Score, auto-scheduling on Google Calendar." },
    category:{ fr:"SaaS · RH · IA Vocale", en:"SaaS · HR · Voice AI" },
    stack:["Next.js","OpenAI GPT-4 Turbo","Whisper","Neon","Prisma","Clerk","Vercel"],
    metrics:[{ label:"Plus rapide", value:"10x", icon:"⚡" },{ label:"Réduction qualification", value:"-80%", icon:"📉" },{ label:"Doc technique", value:"24 pages", icon:"📋" }],
    screenshot:"/projects/talentscout-hero.png", screenshotAlt:"TalentScout AI",
    liveUrl:"https://talentscout-ai-seven.vercel.app/",
  },
  {
    id:"darkosclaw", name:"DarkosClaw", type:"agent", year:"2025", color:"#ff4d6d",
    tagline:{ fr:"OS cyberpunk open-source — 25 outils, zéro coût", en:"Open-source cyberpunk AI OS — 25 tools, zero cost" },
    desc:{ fr:"Agent IA open-source personnel construit de A à Z. Connecté à des LLMs gratuits (Groq / OpenRouter). 25 outils intégrés : recherche web, scraping, exécution Python, vision, OSINT.", en:"Personal open-source AI agent built from scratch. Connected to free LLMs. 25 integrated tools: web search, scraping, Python, vision, OSINT." },
    category:{ fr:"Agent IA · Open Source", en:"AI Agent · Open Source" },
    stack:["Next.js","Vercel AI SDK","Groq LLaMA 3.3","OpenRouter","Tavily API","Firecrawl","Whisper"],
    metrics:[{ label:"Outils intégrés", value:"25", icon:"🛠" },{ label:"Coût opérationnel", value:"0€", icon:"💰" },{ label:"LLMs supportés", value:"Groq + OR", icon:"🧠" }],
    screenshot:"/projects/darkosclaw.png", screenshotAlt:"DarkosClaw",
    liveUrl:"#",
  },
];

/* ══════════════════════════════════════════════════════════
   N8N WORKFLOW PROJECTS
══════════════════════════════════════════════════════════ */
const N8N_PROJECTS = [
  {
    id:"wf-linkedin", name:"LinkedIn → CRM Auto-Enrich", color:"#00ffc8",
    emoji:"🎯", category:"Prospection · Sales",
    problem:{ fr:"Chaque connexion LinkedIn était traitée manuellement — 45 min par prospect perdu.", en:"Each LinkedIn connection was handled manually — 45 min per prospect wasted." },
    solution:{ fr:"Automatisation complète : Apollo enrichit le profil, GPT-4o calcule un score ICP, email ultra-personnalisé déclenché si score > 70.", en:"Full automation: Apollo enriches profile, GPT-4o calculates ICP score, ultra-personalized email triggered if score > 70." },
    result:{ fr:"15h/semaine récupérées. Taux de réponse email x3 grâce à la personnalisation IA.", en:"15h/week saved. Email response rate x3 thanks to AI personalization." },
    stack:["n8n","LinkedIn","Apollo","OpenAI GPT-4o","HubSpot","Gmail"],
    metrics:[{ icon:"⏱", val:"15h/sem", label:"Économisées" },{ icon:"📈", val:"x3", label:"Taux réponse" },{ icon:"🎯", val:">70", label:"Score ICP auto" }],
    screenshot:"/workflows/linkedin.png",
  },
  {
    id:"wf-inbound", name:"Inbound Lead Qualifier IA", color:"#ff4d6d",
    emoji:"🔥", category:"Prospection · Sales",
    problem:{ fr:"Leads Typeform non qualifiés traités 24h après — les chauds refroidissent.", en:"Typeform leads unqualified, processed 24h later — hot leads go cold." },
    solution:{ fr:"GPT-4o qualifie Chaud/Tiède/Froid en temps réel. Alerte Slack + email de réponse auto envoyé en < 2 minutes pour les leads chauds.", en:"GPT-4o qualifies Hot/Warm/Cold in real time. Slack alert + auto reply email sent in < 2 minutes for hot leads." },
    result:{ fr:"Temps de réponse : 24h → 2 minutes. Taux de conversion leads chauds +40%.", en:"Response time: 24h → 2 minutes. Hot lead conversion rate +40%." },
    stack:["n8n","Typeform","OpenAI GPT-4o","Slack","Gmail"],
    metrics:[{ icon:"⚡", val:"<2min", label:"Réponse auto" },{ icon:"🔥", val:"+40%", label:"Conversion" },{ icon:"📋", val:"3 segments", label:"Qualification" }],
    screenshot:"/workflows/inbound-lead.png",
  },
  {
    id:"wf-cold-email", name:"Cold Email Machine B2B", color:"#00e5ff",
    emoji:"📨", category:"Prospection · Sales",
    problem:{ fr:"Rédiger 50 emails personnalisés par semaine prenait 25h à l'équipe sales.", en:"Writing 50 personalized emails per week took 25h from the sales team." },
    solution:{ fr:"CSV importé → Apollo enrichit → GPT génère un email unique par secteur/poste/entreprise → envoi séquencé via Instantly → RDV Calendly créés auto.", en:"CSV imported → Apollo enriches → GPT generates unique email per industry/role/company → sequenced via Instantly → Calendly meetings auto-created." },
    result:{ fr:"25h/semaine économisées. 300 emails/jour envoyés avec personnalisation niveau humain.", en:"25h/week saved. 300 emails/day sent with human-level personalization." },
    stack:["n8n","Apollo","OpenAI GPT-4o","Instantly","Calendly","Slack"],
    metrics:[{ icon:"📧", val:"300/jour", label:"Emails envoyés" },{ icon:"⏱", val:"25h/sem", label:"Économisées" },{ icon:"🤝", val:"Auto", label:"RDV Calendly" }],
    screenshot:"/workflows/cold-email.png",
  },
  {
    id:"wf-cv", name:"CV Screener IA", color:"#a78bfa",
    emoji:"👥", category:"RH · Recrutement",
    problem:{ fr:"Trier 150 CVs par semaine manuellement. 20h perdues par recrutement.", en:"Sorting 150 CVs per week manually. 20h lost per recruitment cycle." },
    solution:{ fr:"CV reçu par Gmail → GPT-4o score 0-100 selon critères personnalisés → >75 : convocation auto + Calendly → <40 : email refus poli → ATS Notion mis à jour.", en:"CV received by Gmail → GPT-4o scores 0-100 per custom criteria → >75: auto invite + Calendly → <40: polite rejection → Notion ATS updated." },
    result:{ fr:"20h → 30 minutes par recrutement. Zéro bon profil raté. ATS toujours à jour.", en:"20h → 30 min per recruitment. Zero missed good profiles. ATS always up to date." },
    stack:["n8n","Gmail","OpenAI GPT-4o","Calendly","Notion","Slack"],
    metrics:[{ icon:"⏱", val:"-95%", label:"Temps tri CVs" },{ icon:"🎯", val:"0", label:"Bons profils ratés" },{ icon:"📝", val:"Auto", label:"ATS mis à jour" }],
    screenshot:"/workflows/cv-screener.png",
  },
  {
    id:"wf-onboarding", name:"Employee Onboarding Automatisé", color:"#4ade80",
    emoji:"🚀", category:"RH · Recrutement",
    problem:{ fr:"Onboarding d'un nouvel employé = 3 jours de setup manuel entre IT, RH et managers.", en:"Onboarding a new employee = 3 days of manual setup between IT, HR and managers." },
    solution:{ fr:"Contrat signé → comptes Slack/Notion/Google créés → email bienvenue → parcours J+1 à J+14 automatique → manager notifié à chaque étape clé.", en:"Contract signed → Slack/Notion/Google accounts created → welcome email → J+1 to J+14 journey → manager notified at each key step." },
    result:{ fr:"3 jours → 15 minutes. Expérience employé homogène. Zéro accès oublié.", en:"3 days → 15 minutes. Consistent employee experience. Zero forgotten access." },
    stack:["n8n","Google Workspace","Slack","Notion","Gmail"],
    metrics:[{ icon:"⚡", val:"15min", label:"Setup complet" },{ icon:"📅", val:"14 jours", label:"Parcours auto" },{ icon:"✅", val:"100%", label:"Accès créés" }],
    screenshot:"/workflows/onboarding.png",
  },
  {
    id:"wf-support-triage", name:"Support Client Auto-Triage", color:"#f5a623",
    emoji:"🎫", category:"Support · Communication",
    problem:{ fr:"Emails support non triés — questions simples bloquent les agents sur les urgences.", en:"Unsorted support emails — simple questions block agents from real urgencies." },
    solution:{ fr:"Email reçu → GPT classifie (Urgence/Technique/Commercial/Spam) → ticket Zendesk créé → assigné au bon agent → réponse auto pour les cas simples.", en:"Email received → GPT classifies (Urgent/Technical/Commercial/Spam) → Zendesk ticket created → assigned to right agent → auto-reply for simple cases." },
    result:{ fr:"18h/semaine de triage éliminées. Temps de résolution urgences -60%.", en:"18h/week of triaging eliminated. Urgent resolution time -60%." },
    stack:["n8n","Gmail","OpenAI GPT-4o","Zendesk","Slack"],
    metrics:[{ icon:"⏱", val:"18h/sem", label:"Triage éliminé" },{ icon:"⚡", val:"-60%", label:"Résolution urgences" },{ icon:"🤖", val:"Auto", label:"Réponses simples" }],
    screenshot:"/workflows/support-triage.png",
  },
  {
    id:"wf-ecom-support", name:"Support E-commerce 24/7", color:"#ff8c42",
    emoji:"🛒", category:"Support · Communication",
    problem:{ fr:"Support fermé la nuit — 40% des questions arrivent hors horaires, clients frustrés.", en:"Support closed at night — 40% of questions arrive off-hours, frustrated customers." },
    solution:{ fr:"Agent IA accède aux commandes Shopify en temps réel, répond en autonomie, escalade uniquement les cas complexes vers Slack avec contexte complet.", en:"AI agent accesses Shopify orders in real time, responds autonomously, escalates only complex cases to Slack with full context." },
    result:{ fr:"Support 24/7 sans coût supplémentaire. 80% des tickets résolus automatiquement.", en:"24/7 support with no extra cost. 80% of tickets resolved automatically." },
    stack:["n8n","Shopify","OpenAI GPT-4o","Gmail","Slack"],
    metrics:[{ icon:"🕐", val:"24/7", label:"Disponibilité" },{ icon:"🤖", val:"80%", label:"Tickets auto-résolus" },{ icon:"⚡", val:"<30sec", label:"Temps réponse" }],
    screenshot:"/workflows/ecom-support.png",
  },
  {
    id:"wf-social", name:"Social Listening & Réponse IA", color:"#00ffc8",
    emoji:"📡", category:"Marketing · Social",
    problem:{ fr:"Mentions sur Twitter/LinkedIn non détectées — une crise peut durer 48h sans réaction.", en:"Twitter/LinkedIn mentions undetected — a crisis can last 48h without reaction." },
    solution:{ fr:"Scan toutes les 2h → GPT analyse sentiment → négatif : alerte Slack prioritaire + réponse suggérée → positif : demande témoignage auto → tout loggé dans Notion.", en:"Scan every 2h → GPT analyzes sentiment → negative: priority Slack alert + suggested reply → positive: auto testimonial request → all logged in Notion." },
    result:{ fr:"12h/semaine de veille manuelle éliminées. 0 crise ignorée. +15 témoignages collectés/mois.", en:"12h/week of manual monitoring eliminated. 0 ignored crisis. +15 testimonials collected/month." },
    stack:["n8n","Twitter/X","LinkedIn","OpenAI GPT-4o","Slack","Notion"],
    metrics:[{ icon:"⏱", val:"12h/sem", label:"Veille éliminée" },{ icon:"🔴", val:"<2h", label:"Réaction crise" },{ icon:"⭐", val:"+15/mois", label:"Témoignages" }],
    screenshot:"/workflows/social-listening.png",
  },
  {
    id:"wf-report", name:"Business Report Automatique", color:"#a78bfa",
    emoji:"📊", category:"Ops · Finance",
    problem:{ fr:"Rapport hebdo = 6h de collecte manuelle GA4 + Stripe + CRM + rédaction chaque vendredi.", en:"Weekly report = 6h of manual collection GA4 + Stripe + CRM + writing every Friday." },
    solution:{ fr:"Chaque vendredi 17h : collecte automatique GA4 + Stripe + HubSpot → GPT rédige un rapport narratif avec insights → PDF envoyé aux dirigeants + archivé Notion.", en:"Every Friday 5pm: auto-collect GA4 + Stripe + HubSpot → GPT writes narrative report with insights → PDF sent to executives + archived in Notion." },
    result:{ fr:"6h → 0h de travail manuel. Rapport plus riche avec tendances et recommandations IA.", en:"6h → 0h of manual work. Richer report with AI trends and recommendations." },
    stack:["n8n","Google Analytics","Stripe","HubSpot","OpenAI GPT-4o","Gmail","Notion"],
    metrics:[{ icon:"⏱", val:"6h/sem", label:"Économisées" },{ icon:"📊", val:"3 sources", label:"KPIs consolidés" },{ icon:"🤖", val:"IA", label:"Insights narratifs" }],
    screenshot:"/workflows/business-report.png",
  },
  {
    id:"wf-invoice", name:"Facturation & Relances Auto", color:"#f5a623",
    emoji:"💳", category:"Ops · Finance",
    problem:{ fr:"Suivi des impayés = 1h/jour manuellement. Taux de recouvrement faible.", en:"Unpaid invoice follow-up = 1h/day manually. Low recovery rate." },
    solution:{ fr:"Facture Stripe créée → email envoyé auto → J+7 non payée : relance douce → J+14 : relance ferme → J+21 : alerte Slack + suspension accès automatique.", en:"Stripe invoice created → auto email → D+7 unpaid: soft reminder → D+14: firm reminder → D+21: Slack alert + automatic access suspension." },
    result:{ fr:"6h/semaine récupérées. Taux de recouvrement J+14 : +35%. Zéro impayé oublié.", en:"6h/week saved. D+14 recovery rate: +35%. Zero forgotten unpaid invoice." },
    stack:["n8n","Stripe","Gmail","Slack"],
    metrics:[{ icon:"💰", val:"+35%", label:"Taux recouvrement" },{ icon:"⏱", val:"6h/sem", label:"Économisées" },{ icon:"🔒", val:"Auto", label:"Suspension J+21" }],
    screenshot:"/workflows/invoice.png",
  },
  {
    id:"wf-cart", name:"Abandoned Cart Recovery", color:"#ff4d6d",
    emoji:"🛍️", category:"E-commerce · Marketing",
    problem:{ fr:"70% des paniers abandonnés sans relance. Milliers d'euros perdus chaque mois.", en:"70% of abandoned carts without follow-up. Thousands of euros lost every month." },
    solution:{ fr:"Panier abandonné → 1h wait → email avec contenu du panier → SMS de rappel J+1 via Twilio → code promo -10% généré et envoyé J+3.", en:"Abandoned cart → 1h wait → email with cart contents → SMS reminder D+1 via Twilio → -10% promo code generated and sent D+3." },
    result:{ fr:"+15% de taux de récupération. ROI séquence : 12x le coût mensuel de l'automatisation.", en:"+15% recovery rate. Sequence ROI: 12x the monthly automation cost." },
    stack:["n8n","Shopify","Gmail","Twilio","Slack"],
    metrics:[{ icon:"🛒", val:"+15%", label:"Récupération" },{ icon:"💰", val:"12x ROI", label:"Automatisation" },{ icon:"📱", val:"SMS+Email", label:"Multi-canal" }],
    screenshot:"/workflows/abandoned-cart.png",
  },
  {
    id:"wf-scoring", name:"Lead Scoring & Nurturing IA", color:"#4ade80",
    emoji:"⚡", category:"Marketing · Sales",
    problem:{ fr:"Tous les leads traités pareil — l'équipe sales perd du temps sur des contacts pas prêts.", en:"All leads treated the same — sales team wastes time on unready contacts." },
    solution:{ fr:"Lead entrant → GPT calcule score ICP 0-100 + segment (Enterprise/SMB/Startup) → HubSpot mis à jour → si ≥70 : email ultra-personnalisé + alerte Slack → si <70 : séquence nurturing.", en:"Incoming lead → GPT calculates ICP score 0-100 + segment → HubSpot updated → if ≥70: ultra-personalized email + Slack alert → if <70: nurturing sequence." },
    result:{ fr:"Sales focalisés sur les vrais leads. Taux de qualification x2. 12h/semaine économisées.", en:"Sales focused on real leads. Qualification rate x2. 12h/week saved." },
    stack:["n8n","OpenAI GPT-4o","HubSpot","Gmail","Slack"],
    metrics:[{ icon:"🎯", val:"x2", label:"Qualification" },{ icon:"⏱", val:"12h/sem", label:"Économisées" },{ icon:"📊", val:"4 segments", label:"ICP auto" }],
    screenshot:"/workflows/lead-scoring.png",
  },
  {
    id:"wf-payment", name:"Paiement → Ticket → Notification", color:"#00e5ff",
    emoji:"✉️", category:"Ops · Finance",
    problem:{ fr:"Après un paiement Stripe, 3 actions manuelles : créer ticket Jira, notifier Slack, envoyer facture.", en:"After a Stripe payment, 3 manual actions: create Jira ticket, notify Slack, send invoice." },
    solution:{ fr:"Paiement Stripe détecté → ticket Jira créé automatiquement → équipe notifiée sur Slack → facture HTML personnalisée envoyée au client → si plan Enterprise : alerte VIP.", en:"Stripe payment detected → Jira ticket auto-created → team notified on Slack → personalized HTML invoice sent to client → if Enterprise plan: VIP alert." },
    result:{ fr:"4h/semaine de saisie manuelle éliminées. Zéro paiement sans ticket. Clients satisfaits.", en:"4h/week of manual entry eliminated. Zero payment without ticket. Satisfied clients." },
    stack:["n8n","Stripe","Jira","Slack","Gmail"],
    metrics:[{ icon:"⚡", val:"<5sec", label:"Ticket créé" },{ icon:"⏱", val:"4h/sem", label:"Économisées" },{ icon:"✅", val:"100%", label:"Paiements trackés" }],
    screenshot:"/workflows/payment-ticket.png",
  },
];

/* ══════════════════════════════════════════════════════════
   SAAS PROJECT CARD
══════════════════════════════════════════════════════════ */
function SaasCard({ project, lang }: { project: typeof SAAS_PROJECTS[0]; lang: string }) {
  const [hovered, setHovered] = useState(false);
  const isLive = project.liveUrl !== "#";
  const tagline  = project.tagline[lang as keyof typeof project.tagline]  ?? project.tagline.en;
  const desc     = project.desc[lang as keyof typeof project.desc]        ?? project.desc.en;
  const category = project.category[lang as keyof typeof project.category] ?? project.category.en;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#07090f", border:`1px solid ${hovered ? project.color+"50" : "rgba(255,255,255,.07)"}`,
        borderRadius:"16px", overflow:"hidden",
        transition:"border-color .3s, box-shadow .3s, transform .3s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}10` : "none",
        display:"flex", flexDirection:"column",
      }}
    >
      {/* Screenshot */}
      <div style={{ position:"relative", height:"220px", overflow:"hidden", background:"#050810", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom, transparent 60%, #07090f 100%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg, ${project.color}, transparent)`, zIndex:2 }} />
        <Image src={project.screenshot} alt={project.screenshotAlt} fill
          style={{ objectFit:"cover", objectPosition:"top", transition:"transform .5s ease", transform: hovered ? "scale(1.04)" : "scale(1)", opacity:.9 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div style={{ position:"absolute", top:"12px", right:"12px", zIndex:3, padding:"3px 10px", borderRadius:"20px",
          background: project.type === "saas" ? "rgba(0,255,200,.15)" : "rgba(167,139,250,.15)",
          border:`1px solid ${project.type === "saas" ? "rgba(0,255,200,.3)" : "rgba(167,139,250,.3)"}`,
          fontFamily:"'Courier New', monospace", fontSize:"9px", fontWeight:700,
          color: project.type === "saas" ? "#00ffc8" : "#a78bfa", letterSpacing:".1em",
        }}>
          {project.type === "saas" ? "SaaS" : "AI AGENT"}
        </div>
        <div style={{ position:"absolute", top:"12px", left:"12px", zIndex:3, fontFamily:"'Courier New', monospace", fontSize:"9px", color:"rgba(255,255,255,.3)", letterSpacing:".1em" }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:"24px", flex:1, display:"flex", flexDirection:"column" }}>
        <p style={{ fontFamily:"'Courier New', monospace", fontSize:"10px", color:project.color, opacity:.7, letterSpacing:".12em", textTransform:"uppercase", marginBottom:"8px" }}>{category}</p>
        <h3 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:"20px", color:"white", marginBottom:"6px", lineHeight:1.2 }}>{project.name}</h3>
        <p style={{ fontFamily:"'Courier New', monospace", fontSize:"11px", color:project.color, opacity:.85, marginBottom:"12px", lineHeight:1.5 }}>{tagline}</p>
        <p style={{ fontFamily:"Arial, sans-serif", fontSize:"13px", color:"rgba(255,255,255,.5)", lineHeight:1.7, marginBottom:"20px", flex:1 }}>{desc}</p>

        {/* Metrics */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"8px", marginBottom:"20px" }}>
          {project.metrics.map(m => (
            <div key={m.label} style={{ padding:"10px 8px", background:`${project.color}08`, border:`1px solid ${project.color}18`, borderRadius:"8px", textAlign:"center" }}>
              <div style={{ fontSize:"14px", marginBottom:"3px" }}>{m.icon}</div>
              <div style={{ fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"11px", color:project.color, marginBottom:"2px" }}>{m.value}</div>
              <div style={{ fontFamily:"Arial, sans-serif", fontSize:"9px", color:"rgba(255,255,255,.3)", lineHeight:1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom:"20px" }}>
          {project.stack.map(s => (
            <span key={s} style={{ padding:"2px 8px", borderRadius:"4px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", fontFamily:"'Courier New', monospace", fontSize:"9px", color: STACK_COLORS[s] ?? "rgba(255,255,255,.5)", letterSpacing:".04em" }}>{s}</span>
          ))}
        </div>

        <a href={isLive ? project.liveUrl : undefined} target={isLive ? "_blank" : undefined} rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"11px",
            background: hovered && isLive ? project.color : "transparent",
            color: hovered && isLive ? "#050810" : project.color,
            fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"12px",
            border:`1px solid ${project.color}50`, borderRadius:"8px", textDecoration:"none",
            cursor: isLive ? "pointer" : "not-allowed", opacity: isLive ? 1 : 0.5,
            transition:"all .25s", letterSpacing:".04em",
          }}
        >
          {isLive ? (lang === "ar" ? "← عرض المشروع" : "Voir le projet →") : (lang === "ar" ? "الرابط قريباً" : "Lien bientôt")}
          {isLive && <span style={{ fontSize:"10px" }}>↗</span>}
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   N8N WORKFLOW CARD — design différent, plus visuel
══════════════════════════════════════════════════════════ */
function N8nCard({ wf, lang, index }: { wf: typeof N8N_PROJECTS[0]; lang: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const problem  = wf.problem[lang as keyof typeof wf.problem]  ?? wf.problem.en;
  const solution = wf.solution[lang as keyof typeof wf.solution] ?? wf.solution.en;
  const result   = wf.result[lang as keyof typeof wf.result]     ?? wf.result.en;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"#07090f",
        border:`1px solid ${hovered ? wf.color+"40" : "rgba(255,255,255,.06)"}`,
        borderRadius:"14px", overflow:"hidden",
        transition:"all .35s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-5px) scale(1.005)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 24px 64px ${wf.color}18, 0 0 0 1px ${wf.color}12` : "none",
        display:"flex", flexDirection:"column",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Color bar top */}
      <div style={{ height:"3px", background:`linear-gradient(90deg, ${wf.color}, ${wf.color}40, transparent)` }} />

      {/* Screenshot */}
      <div style={{
        position:"relative", height: hovered ? "170px" : "130px",
        overflow:"hidden", background:"#020409",
        transition:"height .4s cubic-bezier(.4,0,.2,1)",
        flexShrink:0,
      }}>
        {!imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={wf.screenshot}
            alt={wf.name}
            onError={() => setImgError(true)}
            style={{
              width:"100%", height:"100%", objectFit:"cover", objectPosition:"top left",
              transition:"transform .5s ease, filter .3s",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              filter: hovered ? "brightness(1)" : "brightness(.85)",
            }}
          />
        ) : (
          <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
            background:`linear-gradient(135deg, ${wf.color}08, #020409)`,
          }}>
            <span style={{ fontSize:"48px", opacity:.4 }}>{wf.emoji}</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 40%, #07090f 100%)", pointerEvents:"none" }} />
        {/* Category badge */}
        <div style={{ position:"absolute", top:"10px", left:"10px",
          padding:"3px 10px", borderRadius:"20px",
          background:"rgba(0,0,0,.7)", backdropFilter:"blur(8px)",
          border:`1px solid ${wf.color}30`,
          fontFamily:"'Courier New', monospace", fontSize:"9px", color:wf.color, letterSpacing:".08em",
        }}>
          {wf.category}
        </div>
        {/* n8n badge */}
        <div style={{ position:"absolute", top:"10px", right:"10px",
          padding:"3px 10px", borderRadius:"20px",
          background:"rgba(245,166,35,.12)", border:"1px solid rgba(245,166,35,.3)",
          fontFamily:"'Courier New', monospace", fontSize:"9px", color:"#f5a623", fontWeight:700,
        }}>
          n8n
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"20px", flex:1, display:"flex", flexDirection:"column", gap:"14px" }}>

        {/* Title */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{
            width:"36px", height:"36px", borderRadius:"8px", flexShrink:0,
            background:`${wf.color}12`, border:`1px solid ${wf.color}25`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px",
          }}>
            {wf.emoji}
          </div>
          <h3 style={{ fontFamily:"var(--sans)", fontWeight:700, fontSize:"14px", color:"white", lineHeight:1.3 }}>
            {wf.name}
          </h3>
        </div>

        {/* Metrics row */}
        <div style={{ display:"flex", gap:"6px" }}>
          {wf.metrics.map(m => (
            <div key={m.label} style={{
              flex:1, padding:"8px 6px",
              background:`${wf.color}08`, border:`1px solid ${wf.color}15`,
              borderRadius:"8px", textAlign:"center",
              transition:"background .25s",
              ...(hovered ? { background:`${wf.color}14` } : {}),
            }}>
              <div style={{ fontSize:"13px", marginBottom:"2px" }}>{m.icon}</div>
              <div style={{ fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"11px", color:wf.color }}>{m.val}</div>
              <div style={{ fontFamily:"Arial, sans-serif", fontSize:"8px", color:"rgba(255,255,255,.3)", lineHeight:1.3, marginTop:"1px" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem → Solution → Result */}
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {[
            { icon:"❌", label:"Problème", text:problem,  bg:"rgba(255,77,109,.06)",  border:"rgba(255,77,109,.15)" },
            { icon:"⚙️", label:"Solution", text:solution, bg:`${wf.color}06`,         border:`${wf.color}18` },
            { icon:"✅", label:"Résultat", text:result,   bg:"rgba(74,222,128,.06)",  border:"rgba(74,222,128,.15)" },
          ].map(row => (
            <div key={row.label} style={{ padding:"10px 12px", background:row.bg, border:`1px solid ${row.border}`, borderRadius:"8px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"4px" }}>
                <span style={{ fontSize:"11px" }}>{row.icon}</span>
                <span style={{ fontFamily:"'Courier New', monospace", fontSize:"9px", color:"rgba(255,255,255,.4)", letterSpacing:".1em", textTransform:"uppercase" }}>{row.label}</span>
              </div>
              <p style={{ fontFamily:"Arial, sans-serif", fontSize:"12px", color:"rgba(255,255,255,.6)", lineHeight:1.6, margin:0 }}>{row.text}</p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
          {wf.stack.map(s => (
            <span key={s} style={{
              padding:"2px 7px", borderRadius:"4px",
              background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
              fontFamily:"'Courier New', monospace", fontSize:"8px",
              color: STACK_COLORS[s] ?? "rgba(255,255,255,.45)", letterSpacing:".04em",
            }}>{s}</span>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════════ */
function Timeline({ lang }: { lang: string }) {
  const EVENTS = [
    { year:"2022", event:{ fr:"Première automatisation n8n — début du voyage", en:"First n8n automation — the journey begins" }, color:"rgba(255,255,255,.2)" },
    { year:"2023", event:{ fr:"Premier client payant · Spécialisation Python + APIs", en:"First paying client · Python + APIs specialization" }, color:"rgba(255,255,255,.35)" },
    { year:"2024", event:{ fr:"Plongée dans l'IA générative — LangGraph, RAG, Agents", en:"Deep dive into generative AI — LangGraph, RAG, Agents" }, color:"#f5a623" },
    { year:"2025", event:{ fr:"3 SaaS lancés en autonomie — FlowAudit, TalentScout, DarkosClaw", en:"3 SaaS launched solo — FlowAudit, TalentScout, DarkosClaw" }, color:"#a78bfa" },
    { year:"2026", event:{ fr:"LeadScout AI · Expert Malt & Upwork · Ce portfolio", en:"LeadScout AI · Malt & Upwork Expert · This portfolio" }, color:"#00ffc8" },
  ];
  return (
    <div style={{ display:"flex", gap:"0", overflowX:"auto", paddingBottom:"8px", scrollbarWidth:"none", marginBottom:"64px" }}>
      {EVENTS.map((e, i) => (
        <div key={e.year} style={{ flex:1, minWidth:"140px", display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
          {i < EVENTS.length - 1 && (
            <div style={{ position:"absolute", top:"16px", left:"50%", right:"-50%", height:"1px",
              background:`linear-gradient(90deg, ${e.color}, ${EVENTS[i+1].color})`, opacity:.4, zIndex:0 }} />
          )}
          <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:e.color, boxShadow:`0 0 10px ${e.color}`, marginBottom:"12px", position:"relative", zIndex:1, flexShrink:0 }} />
          <div style={{ fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"13px", color:e.color, marginBottom:"6px" }}>{e.year}</div>
          <div style={{ fontFamily:"Arial, sans-serif", fontSize:"11px", color:"rgba(255,255,255,.5)", textAlign:"center", lineHeight:1.5, padding:"0 8px" }}>
            {e.event[lang as keyof typeof e.event] ?? e.event.en}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════════════════ */
function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / 40;
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(t); }
        else setCount(Math.floor(start));
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function ProjectsSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const [tab, setTab] = useState<"all" | "saas" | "n8n">("all");

  const TABS = [
    { id:"all",  label:{ fr:"Tous les projets", en:"All projects",    ar:"جميع المشاريع",   es:"Todos", nl:"Alle projecten" }, count: SAAS_PROJECTS.length + N8N_PROJECTS.length },
    { id:"saas", label:{ fr:"SaaS & Agents IA", en:"SaaS & AI Agents", ar:"SaaS والوكلاء",   es:"SaaS & Agentes", nl:"SaaS & AI-agents" }, count: SAAS_PROJECTS.length },
    { id:"n8n",  label:{ fr:"Automatisations n8n", en:"n8n Automations", ar:"أتمتة n8n", es:"Automatizaciones n8n", nl:"n8n Automatiseringen" }, count: N8N_PROJECTS.length },
  ];

  const l = (obj: Record<string, string>) => obj[lang] ?? obj.en;

  return (
    <section id="projects" style={{ padding:"100px 24px", background:"var(--bg2)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth:"1200px", margin:"0 auto" }}>

        {/* ── Header ── */}
        <p className="section-label">// {l({ fr:"Mes projets & automatisations", en:"My projects & automations", ar:"مشاريعي وأتمتتي", es:"Mis proyectos y automatizaciones", nl:"Mijn projecten & automatiseringen" })}</p>
        <h2 className="section-title">
          {l({ fr:"Ce que j'ai construit.", en:"What I've built.", ar:"ما قمت ببنائه.", es:"Lo que he construido.", nl:"Wat ik heb gebouwd." })}<br />
          <span className="text-cyan">{l({ fr:"Des résultats réels.", en:"Real results.", ar:"نتائج حقيقية.", es:"Resultados reales.", nl:"Echte resultaten." })}</span>
        </h2>
        <p style={{ fontFamily:"Arial, sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", maxWidth:"600px", lineHeight:1.7, marginBottom:"56px" }}>
          {l({ fr:"4 SaaS/agents IA live + 13 automatisations n8n clients. Pas des démos — des projets avec des résultats mesurables.", en:"4 live SaaS/AI agents + 13 client n8n automations. Not demos — projects with measurable results.", ar:"4 مشاريع SaaS حية + 13 أتمتة n8n. ليست عروضاً — مشاريع بنتائج قابلة للقياس.", es:"4 SaaS/agentes IA en vivo + 13 automatizaciones n8n. No demos — proyectos con resultados medibles.", nl:"4 live SaaS/AI-agents + 13 n8n-automatiseringen. Geen demo's — projecten met meetbare resultaten." })}
        </p>

        {/* ── KPI Banner ── */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"16px", marginBottom:"56px" }}>
          {[
            { icon:"🚀", val:17, suffix:"+", label:{ fr:"Projets livrés", en:"Projects delivered" } },
            { icon:"⏱", val:148, suffix:"h", label:{ fr:"Économisées/semaine", en:"Saved/week" } },
            { icon:"🤖", val:13, suffix:"", label:{ fr:"Workflows n8n", en:"n8n workflows" } },
            { icon:"💰", val:0, suffix:"€", label:{ fr:"Coût bug (0 en prod)", en:"Bug cost (0 in prod)" } },
          ].map((s) => (
            <div key={s.icon} style={{
              flex:"1 1 160px", padding:"20px", borderRadius:"12px",
              background:"rgba(0,255,200,.03)", border:"1px solid rgba(0,255,200,.1)",
              textAlign:"center",
            }}>
              <div style={{ fontSize:"22px", marginBottom:"6px" }}>{s.icon}</div>
              <div style={{ fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"24px", color:"var(--cyan)" }}>
                <AnimatedCount target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily:"Arial, sans-serif", fontSize:"11px", color:"rgba(255,255,255,.35)", marginTop:"4px" }}>
                {l(s.label)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <p style={{ fontFamily:"'Courier New', monospace", fontSize:"11px", color:"rgba(0,255,200,.6)", letterSpacing:".15em", textTransform:"uppercase", marginBottom:"28px" }}>
          // {l({ fr:"Ma progression 2022 → 2026", en:"My progression 2022 → 2026", ar:"تطوري 2022 → 2026", es:"Mi progresión 2022 → 2026", nl:"Mijn progressie 2022 → 2026" })}
        </p>
        <Timeline lang={lang} />

        {/* ── Tabs ── */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"40px", flexWrap:"wrap" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              style={{
                padding:"10px 20px", borderRadius:"8px", cursor:"pointer",
                fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"12px",
                letterSpacing:".06em", transition:"all .25s",
                background: tab === t.id ? "var(--cyan)" : "rgba(255,255,255,.04)",
                color:       tab === t.id ? "#050810"    : "rgba(255,255,255,.5)",
                border:      tab === t.id ? "1px solid var(--cyan)" : "1px solid rgba(255,255,255,.08)",
                display:"flex", alignItems:"center", gap:"8px",
              }}
            >
              {l(t.label)}
              <span style={{
                padding:"1px 7px", borderRadius:"10px", fontSize:"10px",
                background: tab === t.id ? "rgba(0,0,0,.2)" : "rgba(255,255,255,.08)",
                color:       tab === t.id ? "#050810" : "rgba(255,255,255,.4)",
              }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── SaaS / Agent grid ── */}
        {(tab === "all" || tab === "saas") && (
          <>
            {tab === "all" && (
              <p style={{ fontFamily:"'Courier New', monospace", fontSize:"11px", color:"rgba(167,139,250,.7)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:"20px" }}>
                // SaaS &amp; Agents IA
              </p>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:"24px", marginBottom: tab === "all" ? "60px" : "0" }}>
              {SAAS_PROJECTS.map(p => <SaasCard key={p.id} project={p} lang={lang} />)}
            </div>
          </>
        )}

        {/* ── n8n Workflows grid ── */}
        {(tab === "all" || tab === "n8n") && (
          <>
            {tab === "all" && (
              <p style={{ fontFamily:"'Courier New', monospace", fontSize:"11px", color:"rgba(245,166,35,.7)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:"20px" }}>
                // Automatisations n8n livrées
              </p>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))", gap:"20px" }}>
              {N8N_PROJECTS.map((wf, i) => <N8nCard key={wf.id} wf={wf} lang={lang} index={i} />)}
            </div>
          </>
        )}

        {/* ── Badge stats ── */}
        <div style={{ marginTop:"56px", padding:"20px 28px", background:"rgba(0,255,200,.03)", border:"1px solid rgba(0,255,200,.1)", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", gap:"24px", flexWrap:"wrap" }}>
          {[
            { icon:"📅", val:"2022", label: l({ fr:"Dans ce domaine depuis", en:"In this field since" }) },
            { icon:"🚀", val:"17+",  label: l({ fr:"Projets livrés", en:"Projects delivered" }) },
            { icon:"🛠", val:"20+",  label: l({ fr:"Technologies maîtrisées", en:"Technologies mastered" }) },
            { icon:"⭐", val:"5/5",  label: l({ fr:"Note Malt & Upwork", en:"Malt & Upwork rating" }) },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"18px", marginBottom:"4px" }}>{s.icon}</div>
              <div style={{ fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:"18px", color:"var(--cyan)" }}>{s.val}</div>
              <div style={{ fontFamily:"Arial, sans-serif", fontSize:"11px", color:"rgba(255,255,255,.3)", marginTop:"2px" }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
