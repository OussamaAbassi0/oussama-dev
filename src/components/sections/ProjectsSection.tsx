"use client";
import Image from "next/image";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   PROJETS RÉELS — avec screenshots et liens live
══════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id:       "flowaudit",
    name:     "FlowAudit AI",
    tagline:  { fr:"Ton processus métier → workflow n8n en 30 secondes", en:"Your business process → n8n workflow in 30 seconds", ar:"عمليتك التجارية ← سير عمل n8n في 30 ثانية", es:"Tu proceso empresarial → workflow n8n en 30 segundos", nl:"Uw bedrijfsproces → n8n workflow in 30 seconden" },
    desc:     { fr:"SaaS full-stack monétisé. Décris ton processus en langage naturel, l'IA analyse les goulots d'étranglement, calcule tes économies et génère un workflow n8n prêt à importer.", en:"Full-stack monetized SaaS. Describe your process in plain language, AI analyzes bottlenecks, calculates savings and generates a ready-to-import n8n workflow.", ar:"SaaS متكامل. صف عمليتك بلغة طبيعية، يحلل الذكاء الاصطناعي الاختناقات ويولّد سير عمل n8n جاهزاً للاستيراد.", es:"SaaS full-stack monetizado. Describe tu proceso en lenguaje natural, la IA analiza cuellos de botella y genera un workflow n8n listo para importar.", nl:"Full-stack gemonetiseerde SaaS. Beschrijf je proces in gewone taal, AI analyseert knelpunten en genereert een importklare n8n workflow." },
    color:    "#00ffc8",
    category: { fr:"SaaS · IA Générative", en:"SaaS · Generative AI", ar:"SaaS · ذكاء اصطناعي", es:"SaaS · IA Generativa", nl:"SaaS · Generatieve AI" },
    year:     "2025",
    stack:    ["Next.js", "OpenAI GPT-4o", "Stripe", "Prisma", "Neon", "Clerk", "Vercel"],
    metrics:  [
      { label:"Économie calculée", value:"182h/an", icon:"⏱" },
      { label:"Export direct", value:"JSON n8n", icon:"📦" },
      { label:"Free tier", value:"3 audits", icon:"🆓" },
    ],
    screenshot: "/projects/flowaudit-hero.png",
    screenshotAlt: "FlowAudit AI — Interface principale",
    liveUrl:  "https://flowaudit-ai.vercel.app/",
    type:     "saas",
  },
  {
    id:       "leadscout",
    name:     "LeadScout AI",
    tagline:  { fr:"Agent IA autonome de génération de leads B2B", en:"Autonomous AI agent for B2B lead generation", ar:"وكيل ذكاء اصطناعي مستقل لتوليد عملاء B2B", es:"Agente IA autónomo de generación de leads B2B", nl:"Autonome AI-agent voor B2B leadgeneratie" },
    desc:     { fr:"Agent IA agentique. Donne un prompt (ex: 'Trouve 3 agences web à Paris'), l'agent cherche sur le web, scrape leurs sites, et rédige des cold emails ultra-personnalisés basés sur leurs vrais projets.", en:"Agentic AI. Give a prompt (e.g. 'Find 3 web agencies in Paris'), the agent searches the web, scrapes their sites, and writes ultra-personalized cold emails based on their real projects.", ar:"ذكاء اصطناعي وكيلي. أعطِ أمراً (مثل: 'ابحث عن 3 وكالات ويب في باريس')، يبحث الوكيل في الويب ويكتب رسائل باردة مخصصة.", es:"IA agéntica. Da un prompt (ej: 'Encuentra 3 agencias web en París'), el agente busca en la web y escribe cold emails ultra-personalizados.", nl:"Agentische AI. Geef een prompt (bv: '3 webagentschappen in Parijs'), de agent zoekt op het web en schrijft ultra-gepersonaliseerde cold emails." },
    color:    "#a78bfa",
    category: { fr:"Agent IA · Lead Gen", en:"AI Agent · Lead Gen", ar:"وكيل ذكاء اصطناعي", es:"Agente IA · Lead Gen", nl:"AI-agent · Lead Gen" },
    year:     "2026",
    stack:    ["Next.js", "Vercel AI SDK", "OpenAI GPT-4o", "Tavily API", "Firecrawl", "n8n", "Google Sheets"],
    metrics:  [
      { label:"Recherche autonome", value:"100%", icon:"🤖" },
      { label:"Emails personnalisés", value:"Auto", icon:"📧" },
      { label:"Intégration", value:"n8n + Sheets", icon:"🔗" },
    ],
    screenshot: "/projects/leadscout.png",
    screenshotAlt: "LeadScout AI — Agentic Lead Generation",
    liveUrl:  "https://lead-scout-ai-agent.vercel.app/",
    type:     "agent",
  },
  {
    id:       "talentscout",
    name:     "TalentScout AI",
    tagline:  { fr:"ATS complet — recrutement 10x plus rapide avec IA vocale", en:"Full ATS — 10x faster recruitment with AI voice agents", ar:"نظام تتبع المتقدمين — توظيف أسرع 10 مرات بوكلاء صوتيين", es:"ATS completo — reclutamiento 10x más rápido con IA de voz", nl:"Volledig ATS — 10x sneller werven met AI-spraakagenten" },
    desc:     { fr:"SaaS RH full-stack. Entretiens vocaux IA asynchrones, parsing de CV + Match Score, planification auto sur Google Calendar. Documentation technique 24 pages.", en:"Full-stack HR SaaS. Async AI voice interviews, CV parsing + Match Score, auto-scheduling on Google Calendar. 24-page technical documentation.", ar:"SaaS موارد بشرية متكامل. مقابلات صوتية بالذكاء الاصطناعي، تحليل السيرة الذاتية، جدولة تلقائية على Google Calendar.", es:"SaaS de RRHH full-stack. Entrevistas de voz IA asíncronas, parsing de CV + Match Score, programación automática en Google Calendar.", nl:"Full-stack HR SaaS. Asynchrone AI-spraakinterviews, CV-parsing + Match Score, auto-planning in Google Calendar." },
    color:    "#f5a623",
    category: { fr:"SaaS · RH · IA Vocale", en:"SaaS · HR · Voice AI", ar:"SaaS · موارد بشرية", es:"SaaS · RRHH · IA de Voz", nl:"SaaS · HR · Spraak AI" },
    year:     "2025",
    stack:    ["Next.js", "OpenAI GPT-4 Turbo", "Whisper", "Neon", "Prisma", "Clerk", "Vercel"],
    metrics:  [
      { label:"Plus rapide", value:"10x", icon:"⚡" },
      { label:"Réduction qualification", value:"-80%", icon:"📉" },
      { label:"Doc technique", value:"24 pages", icon:"📋" },
    ],
    screenshot: "/projects/talentscout-hero.png",
    screenshotAlt: "TalentScout AI — Screen Candidates 10x Faster",
    liveUrl:  "https://talentscout-ai-seven.vercel.app/",
    type:     "saas",
  },
  {
    id:       "darkosclaw",
    name:     "DarkosClaw",
    tagline:  { fr:"OS cyberpunk open-source — 25 outils, zéro coût", en:"Open-source cyberpunk AI OS — 25 tools, zero cost", ar:"نظام ذكاء اصطناعي سايبربانك مفتوح المصدر — 25 أداة، صفر تكلفة", es:"OS cyberpunk open-source — 25 herramientas, cero coste", nl:"Open-source cyberpunk AI OS — 25 tools, nul kosten" },
    desc:     { fr:"Agent IA open-source personnel construit de A à Z. Connecté à des LLMs gratuits (Groq / OpenRouter). 25 outils intégrés : recherche web, scraping, exécution Python, vision, OSINT, crypto, météo...", en:"Personal open-source AI agent built from scratch. Connected to free LLMs (Groq / OpenRouter). 25 integrated tools: web search, scraping, Python execution, vision, OSINT, crypto, weather...", ar:"وكيل ذكاء اصطناعي شخصي مفتوح المصدر. 25 أداة متكاملة: بحث ويب، تنفيذ Python، رؤية حاسوبية، OSINT...", es:"Agente IA personal open-source construido desde cero. 25 herramientas integradas: búsqueda web, scraping, ejecución Python, visión, OSINT...", nl:"Persoonlijke open-source AI-agent. 25 geïntegreerde tools: websearch, scraping, Python uitvoering, visie, OSINT..." },
    color:    "#ff4d6d",
    category: { fr:"Agent IA · Open Source", en:"AI Agent · Open Source", ar:"وكيل مفتوح المصدر", es:"Agente IA · Open Source", nl:"AI-agent · Open Source" },
    year:     "2025",
    stack:    ["Next.js", "Vercel AI SDK", "Groq LLaMA 3.3", "OpenRouter", "Tavily", "Firecrawl", "Whisper"],
    metrics:  [
      { label:"Outils intégrés", value:"25", icon:"🛠" },
      { label:"Coût opérationnel", value:"0€", icon:"💰" },
      { label:"LLMs supportés", value:"Groq + OR", icon:"🧠" },
    ],
    screenshot: "/projects/darkosclaw.png",
    screenshotAlt: "DarkosClaw OS v2.1 — Cyberpunk AI Agent",
    liveUrl:  "#",
    type:     "agent",
  },
];

/* ══════════════════════════════════════════════════════════
   BADGE STACK
══════════════════════════════════════════════════════════ */
const STACK_COLORS: Record<string, string> = {
  "Next.js":         "#ffffff",
  "OpenAI GPT-4o":   "#74aa9c",
  "OpenAI GPT-4 Turbo":"#74aa9c",
  "Stripe":          "#635bff",
  "Prisma":          "#5a67d8",
  "Neon":            "#39e09b",
  "Clerk":           "#6c47ff",
  "Vercel":          "#ffffff",
  "Vercel AI SDK":   "#ffffff",
  "Groq LLaMA 3.3":  "#f97316",
  "OpenRouter":      "#ff6b6b",
  "Tavily API":      "#00ffc8",
  "Firecrawl":       "#ff4d6d",
  "n8n":             "#f5a623",
  "Google Sheets":   "#34a853",
  "Whisper":         "#74aa9c",
  "Tailwind CSS":    "#38bdf8",
};

/* ══════════════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════════════ */
function ProjectCard({ project, lang }: { project: typeof PROJECTS[0]; lang: string }) {
  const [hovered, setHovered] = useState(false);

  const tagline  = project.tagline[lang as keyof typeof project.tagline]  ?? project.tagline.en;
  const desc     = project.desc[lang as keyof typeof project.desc]        ?? project.desc.en;
  const category = project.category[lang as keyof typeof project.category] ?? project.category.en;

  const isLive = project.liveUrl !== "#";

  const LABEL = {
    demo:  { fr:"Voir le projet →", en:"View project →", ar:"← عرض المشروع", es:"Ver proyecto →", nl:"Project bekijken →" },
    soon:  { fr:"Lien bientôt", en:"Link coming soon", ar:"الرابط قريباً", es:"Enlace próximamente", nl:"Link binnenkort" },
  };
  const btnLabel = isLive
    ? (LABEL.demo[lang as keyof typeof LABEL.demo] ?? LABEL.demo.en)
    : (LABEL.soon[lang as keyof typeof LABEL.soon] ?? LABEL.soon.en);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   "#07090f",
        border:       `1px solid ${hovered ? project.color + "50" : "rgba(255,255,255,.07)"}`,
        borderRadius: "16px",
        overflow:     "hidden",
        transition:   "border-color .3s, box-shadow .3s, transform .3s",
        transform:    hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow:    hovered ? `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}10` : "none",
        display:      "flex",
        flexDirection:"column",
      }}
    >
      {/* Screenshot */}
      <div style={{
        position:   "relative",
        height:     "220px",
        overflow:   "hidden",
        background: "#050810",
        borderBottom:`1px solid rgba(255,255,255,.05)`,
      }}>
        {/* Overlay gradient */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: `linear-gradient(to bottom, transparent 60%, #07090f 100%)`,
          pointerEvents: "none",
        }} />

        {/* Color top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          zIndex: 2,
        }} />

        {/* Screenshot image */}
        <Image
          src={project.screenshot}
          alt={project.screenshotAlt}
          fill
          style={{
            objectFit:    "cover",
            objectPosition: "top",
            transition:   "transform .5s ease",
            transform:    hovered ? "scale(1.04)" : "scale(1)",
            opacity:      0.9,
          }}
          onError={(e) => {
            /* Fallback si screenshot pas encore uploadé */
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Type badge */}
        <div style={{
          position:  "absolute", top: "12px", right: "12px", zIndex: 3,
          padding:   "3px 10px", borderRadius: "20px",
          background: project.type === "saas" ? "rgba(0,255,200,.15)" : "rgba(167,139,250,.15)",
          border:    `1px solid ${project.type === "saas" ? "rgba(0,255,200,.3)" : "rgba(167,139,250,.3)"}`,
          fontFamily:"'Courier New', monospace", fontSize: "9px", fontWeight: 700,
          color:     project.type === "saas" ? "#00ffc8" : "#a78bfa",
          letterSpacing: ".1em",
        }}>
          {project.type === "saas" ? "SaaS" : "AI AGENT"}
        </div>

        {/* Year */}
        <div style={{
          position:  "absolute", top: "12px", left: "12px", zIndex: 3,
          fontFamily:"'Courier New', monospace", fontSize: "9px",
          color:     "rgba(255,255,255,.3)", letterSpacing: ".1em",
        }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Category */}
        <p style={{
          fontFamily: "'Courier New', monospace", fontSize: "10px",
          color:      project.color, opacity: .7,
          letterSpacing: ".12em", textTransform: "uppercase",
          marginBottom: "8px",
        }}>
          {category}
        </p>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize:   "20px", color: "white",
          marginBottom: "6px", lineHeight: 1.2,
        }}>
          {project.name}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Courier New', monospace", fontSize: "11px",
          color:      project.color, opacity: .85,
          marginBottom: "12px", lineHeight: 1.5,
        }}>
          {tagline}
        </p>

        {/* Description */}
        <p style={{
          fontFamily: "Arial, sans-serif", fontSize: "13px",
          color:      "rgba(255,255,255,.5)", lineHeight: 1.7,
          marginBottom: "20px", flex: 1,
        }}>
          {desc}
        </p>

        {/* Metrics */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px", marginBottom: "20px",
        }}>
          {project.metrics.map(m => (
            <div key={m.label} style={{
              padding:    "10px 8px",
              background: `${project.color}08`,
              border:     `1px solid ${project.color}18`,
              borderRadius: "8px",
              textAlign:  "center",
            }}>
              <div style={{ fontSize: "14px", marginBottom: "3px" }}>{m.icon}</div>
              <div style={{
                fontFamily: "'Courier New', monospace", fontWeight: 700,
                fontSize:   "11px", color: project.color, marginBottom: "2px",
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "Arial, sans-serif", fontSize: "9px",
                color:      "rgba(255,255,255,.3)", lineHeight: 1.3,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "5px",
          marginBottom: "20px",
        }}>
          {project.stack.map(s => (
            <span key={s} style={{
              padding:    "2px 8px", borderRadius: "4px",
              background: "rgba(255,255,255,.04)",
              border:     "1px solid rgba(255,255,255,.08)",
              fontFamily: "'Courier New', monospace", fontSize: "9px",
              color:      STACK_COLORS[s] ?? "rgba(255,255,255,.5)",
              letterSpacing: ".04em",
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={isLive ? project.liveUrl : undefined}
          target={isLive ? "_blank" : undefined}
          rel="noopener noreferrer"
          style={{
            display:    "flex", alignItems: "center", justifyContent: "center",
            gap:        "8px",
            padding:    "11px",
            background: hovered && isLive ? project.color : "transparent",
            color:      hovered && isLive ? "#050810" : project.color,
            fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: "12px",
            border:     `1px solid ${project.color}50`,
            borderRadius: "8px",
            textDecoration: "none",
            cursor:     isLive ? "pointer" : "not-allowed",
            opacity:    isLive ? 1 : 0.5,
            transition: "all .25s",
            letterSpacing: ".04em",
          }}
        >
          {btnLabel}
          {isLive && <span style={{ fontSize: "10px" }}>↗</span>}
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TIMELINE 2022 → 2026
══════════════════════════════════════════════════════════ */
function Timeline({ lang }: { lang: string }) {
  const EVENTS = [
    { year:"2022", event:{ fr:"Première automatisation n8n — début du voyage", en:"First n8n automation — the journey begins", ar:"أول أتمتة n8n — بداية الرحلة", es:"Primera automatización n8n — comienza el viaje", nl:"Eerste n8n automatisering — begin van de reis" }, color:"rgba(255,255,255,.2)" },
    { year:"2023", event:{ fr:"Premier client payant · Spécialisation Python + APIs", en:"First paying client · Specialization Python + APIs", ar:"أول عميل مدفوع · تخصص Python + APIs", es:"Primer cliente de pago · Especialización Python + APIs", nl:"Eerste betalende klant · Specialisatie Python + APIs" }, color:"rgba(255,255,255,.35)" },
    { year:"2024", event:{ fr:"Plongée dans l'IA générative — LangGraph, RAG, Agents", en:"Deep dive into generative AI — LangGraph, RAG, Agents", ar:"الغوص في الذكاء الاصطناعي — LangGraph، RAG، Agents", es:"Inmersión en IA generativa — LangGraph, RAG, Agentes", nl:"Diep in generatieve AI — LangGraph, RAG, Agents" }, color:"#f5a623" },
    { year:"2025", event:{ fr:"3 SaaS lancés en autonomie — FlowAudit, TalentScout, DarkosClaw", en:"3 SaaS launched solo — FlowAudit, TalentScout, DarkosClaw", ar:"إطلاق 3 منتجات SaaS — FlowAudit وTalentScout وDarkosClaw", es:"3 SaaS lanzados en solitario — FlowAudit, TalentScout, DarkosClaw", nl:"3 SaaS solo gelanceerd — FlowAudit, TalentScout, DarkosClaw" }, color:"#a78bfa" },
    { year:"2026", event:{ fr:"LeadScout AI · Expert Malt & Upwork · Ce portfolio", en:"LeadScout AI · Malt & Upwork Expert · This portfolio", ar:"LeadScout AI · خبير Malt وUpwork · هذا الموقع", es:"LeadScout AI · Experto Malt & Upwork · Este portfolio", nl:"LeadScout AI · Malt & Upwork Expert · Dit portfolio" }, color:"#00ffc8" },
  ];

  return (
    <div style={{
      display:    "flex", gap: "0",
      overflowX:  "auto", paddingBottom: "8px",
      scrollbarWidth: "none",
      marginBottom: "64px",
    }}>
      {EVENTS.map((e, i) => (
        <div key={e.year} style={{
          flex: 1, minWidth: "140px",
          display: "flex", flexDirection: "column", alignItems: "center",
          position: "relative",
        }}>
          {/* Connector */}
          {i < EVENTS.length - 1 && (
            <div style={{
              position:  "absolute", top: "16px",
              left:      "50%", right: "-50%",
              height:    "1px",
              background:`linear-gradient(90deg, ${e.color}, ${EVENTS[i+1].color})`,
              opacity:   .4, zIndex: 0,
            }} />
          )}

          {/* Dot */}
          <div style={{
            width:      "12px", height: "12px",
            borderRadius: "50%",
            background: e.color,
            boxShadow:  `0 0 10px ${e.color}`,
            marginBottom: "12px",
            position:   "relative", zIndex: 1,
            flexShrink: 0,
          }} />

          {/* Year */}
          <div style={{
            fontFamily: "'Courier New', monospace", fontWeight: 700,
            fontSize:   "13px", color: e.color,
            marginBottom: "6px",
          }}>
            {e.year}
          </div>

          {/* Event */}
          <div style={{
            fontFamily: "Arial, sans-serif", fontSize: "11px",
            color:      "rgba(255,255,255,.5)", textAlign: "center",
            lineHeight: 1.5, padding: "0 8px",
          }}>
            {e.event[lang as keyof typeof e.event] ?? e.event.en}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function ProjectsSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();

  const LABELS = {
    sectionLabel: { fr:"// Mes projets réels", en:"// My real projects", ar:"// مشاريعي الحقيقية", es:"// Mis proyectos reales", nl:"// Mijn echte projecten" },
    title1:       { fr:"Ce que j'ai construit.", en:"What I've built.", ar:"ما قمت ببنائه.", es:"Lo que he construido.", nl:"Wat ik heb gebouwd." },
    title2:       { fr:"Testez-le vous-même.", en:"Test it yourself.", ar:"جرّبه بنفسك.", es:"Pruébalo tú mismo.", nl:"Test het zelf." },
    subtitle:     { fr:"4 projets live — du SaaS full-stack monétisé à l'agent IA agentique. Pas des démos. Des vrais produits que vous pouvez utiliser maintenant.", en:"4 live projects — from monetized full-stack SaaS to agentic AI agents. Not demos. Real products you can use right now.", ar:"4 مشاريع حية — من SaaS متكامل إلى وكلاء ذكاء اصطناعي. ليست عروضاً. منتجات حقيقية يمكنك استخدامها الآن.", es:"4 proyectos en vivo — desde SaaS full-stack monetizado hasta agentes IA agénticos. No son demos. Productos reales que puedes usar ahora.", nl:"4 live projecten — van gemonetiseerde full-stack SaaS tot agentische AI-agents. Geen demo's. Echte producten die u nu kunt gebruiken." },
    since:        { fr:"Dans ce domaine depuis", en:"In this field since", ar:"في هذا المجال منذ", es:"En este campo desde", nl:"In dit vakgebied sinds" },
    timelineLabel:{ fr:"// Ma progression 2022 → 2026", en:"// My progression 2022 → 2026", ar:"// تطوري 2022 → 2026", es:"// Mi progresión 2022 → 2026", nl:"// Mijn progressie 2022 → 2026" },
  };

  const l = (obj: Record<string, string>) => obj[lang] ?? obj.en;

  return (
    <section id="projects" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <p className="section-label">{l(LABELS.sectionLabel)}</p>
        <h2 className="section-title">
          {l(LABELS.title1)}<br />
          <span className="text-cyan">{l(LABELS.title2)}</span>
        </h2>
        <p style={{
          fontFamily: "Arial, sans-serif", fontSize: "15px",
          color:      "rgba(255,255,255,.5)", maxWidth: "560px",
          lineHeight: 1.7, marginBottom: "56px",
        }}>
          {l(LABELS.subtitle)}
        </p>

        {/* ── Timeline ── */}
        <p style={{
          fontFamily: "'Courier New', monospace", fontSize: "11px",
          color:      "rgba(0,255,200,.6)", letterSpacing: ".15em",
          textTransform: "uppercase", marginBottom: "28px",
        }}>
          {l(LABELS.timelineLabel)}
        </p>
        <Timeline lang={lang} />

        {/* ── Grid projets ── */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap:                 "24px",
        }}>
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} lang={lang} />
          ))}
        </div>

        {/* ── Badge "depuis 2022" ── */}
        <div style={{
          marginTop:  "48px",
          padding:    "20px 28px",
          background: "rgba(0,255,200,.03)",
          border:     "1px solid rgba(0,255,200,.1)",
          borderRadius: "12px",
          display:    "flex", alignItems: "center", justifyContent: "center",
          gap:        "24px", flexWrap: "wrap",
        }}>
          {[
            { icon:"📅", val:"2022", label: l(LABELS.since) },
            { icon:"🚀", val:"4",    label:{ fr:"Projets live", en:"Live projects", ar:"مشاريع حية", es:"Proyectos en vivo", nl:"Live projecten" }[lang] ?? "Live projects" },
            { icon:"🛠",  val:"15+",  label:{ fr:"Technologies maîtrisées", en:"Technologies mastered", ar:"تقنيات متقنة", es:"Tecnologías dominadas", nl:"Beheerste technologieën" }[lang] ?? "Technologies mastered" },
            { icon:"⭐", val:"5/5",  label:{ fr:"Note Malt & Upwork", en:"Malt & Upwork rating", ar:"تقييم Malt وUpwork", es:"Valoración Malt & Upwork", nl:"Malt & Upwork beoordeling" }[lang] ?? "Malt & Upwork rating" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: "18px", color: "var(--cyan)" }}>{s.val}</div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: "11px", color: "rgba(255,255,255,.3)", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
