"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const WORKFLOWS = [
  {
    id:      "email-stripe",
    emoji:   "✉️",
    title:   "Email Stripe → Jira → Slack",
    desc:    "Chaque paiement Stripe crée automatiquement un ticket Jira et notifie l'équipe sur Slack en temps réel.",
    tags:    ["Stripe", "Jira", "Slack", "n8n"],
    time:    "2–3 jours",
    saving:  "4h/sem",
    color:   "#a78bfa",
    nodes:   ["📧 Email", "💳 Stripe", "🎫 Jira", "💬 Slack"],
    brief:   "Je veux automatiser : quand je reçois un paiement Stripe, créer un ticket Jira et notifier mon équipe sur Slack automatiquement.",
  },
  {
    id:      "linkedin-crm",
    emoji:   "🎯",
    title:   "LinkedIn → CRM → Relance auto",
    desc:    "Scraping LinkedIn ciblé, enrichissement des profils et injection automatique dans votre CRM avec relance séquencée.",
    tags:    ["LinkedIn", "HubSpot", "Apollo", "n8n"],
    time:    "4–5 jours",
    saving:  "15h/sem",
    color:   "#00ffc8",
    nodes:   ["🔗 LinkedIn", "🔍 Apollo", "📊 CRM", "📨 Relance"],
    brief:   "Je veux automatiser : scraper des prospects sur LinkedIn, enrichir leurs données et les injecter dans mon CRM avec une séquence de relance automatique.",
  },
  {
    id:      "rapport-hebdo",
    emoji:   "📊",
    title:   "Rapport hebdo automatique",
    desc:    "Consolidation automatique de vos KPIs depuis Google Analytics, Stripe et votre CRM en un rapport PDF envoyé chaque lundi.",
    tags:    ["Google Analytics", "Stripe", "PDF", "Email"],
    time:    "3–4 jours",
    saving:  "6h/sem",
    color:   "#f5a623",
    nodes:   ["📈 Analytics", "💰 Stripe", "📋 CRM", "📄 PDF"],
    brief:   "Je veux automatiser : la génération d'un rapport hebdomadaire consolidant mes KPIs (analytics, revenus, leads) envoyé automatiquement chaque lundi.",
  },
  {
    id:      "cv-screening",
    emoji:   "👥",
    title:   "Tri CV & entretiens IA",
    desc:    "Les CVs reçus par email sont analysés par IA, scorés selon vos critères et les meilleurs sont planifiés automatiquement.",
    tags:    ["Gmail", "OpenAI", "Calendly", "Notion"],
    time:    "5–7 jours",
    saving:  "20h/sem",
    color:   "#ff4d6d",
    nodes:   ["📧 Gmail", "🧠 IA Score", "📅 Calendly", "📝 Notion"],
    brief:   "Je veux automatiser : le tri de CVs reçus par email, le scoring IA selon mes critères RH et la planification automatique d'entretiens pour les meilleurs candidats.",
  },
  {
    id:      "ecom-support",
    emoji:   "🛒",
    title:   "Support e-commerce 24/7",
    desc:    "Agent IA qui répond aux questions clients, gère les retours et escalade uniquement les cas complexes à votre équipe.",
    tags:    ["Shopify", "OpenAI", "Intercom", "Slack"],
    time:    "7–10 jours",
    saving:  "35h/sem",
    color:   "#00e5ff",
    nodes:   ["🛍️ Shopify", "🤖 Agent IA", "💬 Chat", "📩 Escalade"],
    brief:   "Je veux automatiser : le support client de ma boutique e-commerce avec un agent IA qui répond 24/7 et n'escalade que les cas complexes à mon équipe.",
  },
  {
    id:      "lead-scoring",
    emoji:   "⚡",
    title:   "Lead scoring & nurturing IA",
    desc:    "Chaque lead entrant est scoré par IA, segmenté et reçoit une séquence email personnalisée selon son profil et ses actions.",
    tags:    ["HubSpot", "OpenAI", "Brevo", "n8n"],
    time:    "5–6 jours",
    saving:  "12h/sem",
    color:   "#4ade80",
    nodes:   ["🎯 Lead", "🧠 Score IA", "📊 Segment", "📧 Séquence"],
    brief:   "Je veux automatiser : le scoring IA de mes leads entrants, leur segmentation automatique et l'envoi de séquences email personnalisées selon leur profil.",
  },
];

/* ══════════════════════════════════════════════════════════
   WORKFLOW CARD
══════════════════════════════════════════════════════════ */
function WorkflowCard({
  wf,
  onSelect,
  wantThis,
}: {
  wf: typeof WORKFLOWS[0];
  onSelect: (brief: string) => void;
  wantThis: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [animated, setAnimated] = useState(false);

  const handleHover = (in_: boolean) => {
    setHovered(in_);
    if (in_ && !animated) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 2000);
    }
  };

  return (
    <div
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={{
        background:   "#07090f",
        border:       `1px solid ${hovered ? wf.color + "40" : "rgba(255,255,255,.07)"}`,
        borderRadius: "14px",
        padding:      "24px",
        display:      "flex",
        flexDirection:"column",
        gap:          "16px",
        cursor:       "default",
        transition:   "border-color .25s, box-shadow .25s, transform .25s",
        transform:    hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow:    hovered ? `0 12px 40px ${wf.color}12, 0 0 0 1px ${wf.color}08` : "none",
        position:     "relative",
        overflow:     "hidden",
      }}
    >
      {/* Glow coin */}
      <div style={{
        position:  "absolute", top: "-40px", right: "-40px",
        width:     "120px", height: "120px", borderRadius: "50%",
        background:`radial-gradient(circle, ${wf.color}18 0%, transparent 70%)`,
        pointerEvents:"none",
        opacity:   hovered ? 1 : 0,
        transition:"opacity .3s",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div style={{
          width:  "44px", height: "44px", borderRadius: "10px", flexShrink: 0,
          background:`${wf.color}12`, border:`1px solid ${wf.color}25`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px",
        }}>
          {wf.emoji}
        </div>
        <div>
          <h3 style={{ fontFamily:"var(--sans)", fontWeight:700, fontSize:"15px", color:"white", lineHeight:1.3, marginBottom:"2px" }}>
            {wf.title}
          </h3>
          <div style={{ display:"flex", gap:"8px" }}>
            <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:wf.color, opacity:.7 }}>
              ⏱ {wf.time}
            </span>
            <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"#4ade80", opacity:.7 }}>
              💰 -{wf.saving}
            </span>
          </div>
        </div>
      </div>

      {/* Flow animé au hover */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "4px",
        padding:        "10px 12px",
        background:     "rgba(255,255,255,.03)",
        borderRadius:   "8px",
        border:         "1px solid rgba(255,255,255,.05)",
        overflowX:      "hidden",
      }}>
        {wf.nodes.map((node, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"4px", flexShrink:0 }}>
            <span style={{
              fontFamily:   "var(--mono)",
              fontSize:     "10px",
              color:        animated && i <= Math.floor((Date.now() / 300) % wf.nodes.length)
                ? wf.color
                : "rgba(255,255,255,.45)",
              background:   "rgba(255,255,255,.04)",
              border:       "1px solid rgba(255,255,255,.07)",
              borderRadius: "6px",
              padding:      "3px 8px",
              transition:   "color .3s",
              whiteSpace:   "nowrap",
            }}>
              {node}
            </span>
            {i < wf.nodes.length - 1 && (
              <span style={{
                fontFamily: "var(--mono)", fontSize: "10px",
                color:      `${wf.color}60`,
              }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      <p style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"13px", color:"rgba(255,255,255,.55)", lineHeight:1.6 }}>
        {wf.desc}
      </p>

      {/* Tags */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
        {wf.tags.map(t => (
          <span key={t} style={{
            fontFamily:"var(--mono)", fontSize:"9px",
            color:`${wf.color}90`, background:`${wf.color}10`,
            border:`1px solid ${wf.color}20`,
            borderRadius:"4px", padding:"2px 8px", letterSpacing:".04em",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onSelect(wf.brief)}
        style={{
          width:        "100%",
          padding:      "10px",
          background:   hovered ? wf.color : "rgba(255,255,255,.04)",
          color:        hovered ? "#050810"  : "rgba(255,255,255,.5)",
          fontFamily:   "var(--mono)",
          fontWeight:   700,
          fontSize:     "12px",
          border:       `1px solid ${hovered ? wf.color : "rgba(255,255,255,.08)"}`,
          borderRadius: "8px",
          cursor:       "pointer",
          transition:   "all .25s",
          letterSpacing:".04em",
          marginTop:    "auto",
        }}
      >
        {wantThis}
      </button>

      {/* Bottom line */}
      <div style={{
        position:"absolute", bottom:0, left:"15%", right:"15%", height:"1px",
        background:`linear-gradient(90deg,transparent,${wf.color}40,transparent)`,
        opacity: hovered ? 1 : 0, transition:"opacity .3s",
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
const WORKFLOW_TRANS: Record<string, { desc: string; brief: string }[]> = {
  fr: WORKFLOWS.map(w => ({ desc: w.desc, brief: w.brief })),
  nl: WORKFLOWS.map(w => ({ desc: w.desc, brief: w.brief })),
  en: [
    { desc:"Each Stripe payment automatically creates a Jira ticket and notifies the team on Slack in real time.", brief:"I want to automate: when I receive a Stripe payment, create a Jira ticket and notify my team on Slack automatically." },
    { desc:"Targeted LinkedIn scraping, profile enrichment and automatic injection into your CRM with sequenced follow-up.", brief:"I want to automate: scraping prospects on LinkedIn, enriching their data and injecting them into my CRM with an automated follow-up sequence." },
    { desc:"Automatic consolidation of your KPIs from Google Analytics, Stripe and your CRM into a PDF report sent every Monday.", brief:"I want to automate: generating a weekly report consolidating my KPIs (analytics, revenue, leads) sent automatically every Monday." },
    { desc:"CVs received by email are analyzed by AI, scored according to your criteria and the best ones are automatically scheduled.", brief:"I want to automate: sorting CVs received by email, AI scoring according to my HR criteria and automatic interview scheduling for the best candidates." },
    { desc:"AI agent that answers customer questions, handles returns and escalates only complex cases to your team.", brief:"I want to automate: customer support for my e-commerce store with an AI agent that responds 24/7 and only escalates complex cases to my team." },
    { desc:"Each incoming lead is AI-scored, segmented and receives a personalized email sequence based on their profile and actions.", brief:"I want to automate: AI scoring of my incoming leads, their automatic segmentation and sending personalized email sequences based on their profile." },
  ],
  ar: [
    { desc:"كل دفعة Stripe تنشئ تلقائياً تذكرة Jira وتُخطر الفريق على Slack في الوقت الفعلي.", brief:"أريد أتمتة: عند تلقي دفعة Stripe، إنشاء تذكرة Jira وإخطار فريقي على Slack تلقائياً." },
    { desc:"استخراج LinkedIn مستهدف، إثراء الملفات وحقنها تلقائياً في CRM مع متابعة متسلسلة.", brief:"أريد أتمتة: استخراج مرشحين على LinkedIn وإثراء بياناتهم وحقنهم في CRM مع تسلسل متابعة تلقائي." },
    { desc:"توحيد تلقائي لمؤشرات KPI من Analytics وStripe وCRM في تقرير PDF يُرسل كل اثنين.", brief:"أريد أتمتة: توليد تقرير أسبوعي يجمع مؤشراتي يُرسل تلقائياً كل اثنين." },
    { desc:"السير الذاتية الواردة بالبريد تُحلّل بالذكاء الاصطناعي وتُسجّل نقاط وتُجدول أفضلها تلقائياً.", brief:"أريد أتمتة: فرز السير الواردة وتسجيل نقاط بالذكاء الاصطناعي وجدولة المقابلات تلقائياً." },
    { desc:"وكيل ذكاء اصطناعي يرد على استفسارات العملاء ويدير المرتجعات ويصعّد فقط الحالات المعقدة.", brief:"أريد أتمتة: دعم عملاء متجرتي الإلكترونية بوكيل ذكاء اصطناعي يعمل 24/7." },
    { desc:"كل عميل وارد يُسجّل نقاطاً بالذكاء الاصطناعي ويُقسّم ويتلقى تسلسلاً بريدياً مخصصاً.", brief:"أريد أتمتة: تسجيل نقاط عملائي الواردين وتقسيمهم وإرسال تسلسلات بريدية مخصصة." },
  ],
  es: [
    { desc:"Cada pago de Stripe crea automáticamente un ticket en Jira y notifica al equipo en Slack en tiempo real.", brief:"Quiero automatizar: cuando recibo un pago de Stripe, crear un ticket en Jira y notificar a mi equipo en Slack automáticamente." },
    { desc:"Scraping de LinkedIn dirigido, enriquecimiento de perfiles e inyección automática en tu CRM con seguimiento secuenciado.", brief:"Quiero automatizar: extraer prospectos de LinkedIn, enriquecer sus datos e inyectarlos en mi CRM con una secuencia de seguimiento automático." },
    { desc:"Consolidación automática de tus KPIs de Google Analytics, Stripe y tu CRM en un informe PDF enviado cada lunes.", brief:"Quiero automatizar: generar un informe semanal consolidando mis KPIs enviado automáticamente cada lunes." },
    { desc:"Los CVs recibidos por email son analizados por IA, puntuados según tus criterios y los mejores se programan automáticamente.", brief:"Quiero automatizar: clasificar CVs recibidos por email, puntuación IA y programación automática de entrevistas." },
    { desc:"Agente IA que responde preguntas de clientes, gestiona devoluciones y escala solo los casos complejos a tu equipo.", brief:"Quiero automatizar: el soporte al cliente de mi tienda e-commerce con un agente IA que responde 24/7." },
    { desc:"Cada lead entrante es puntuado por IA, segmentado y recibe una secuencia de email personalizada según su perfil.", brief:"Quiero automatizar: puntuación IA de mis leads entrantes y envío de secuencias email personalizadas." },
  ],
};

export default function WorkflowGallery({ onOpenBrief }: { onOpenBrief: (prefill?: string) => void }) {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();

  const handleSelect = (brief: string) => {
    /* Stocke le brief en sessionStorage pour que CTASection le lise */
    sessionStorage.setItem("prefill_brief", brief);
    onOpenBrief(brief);
  };

  return (
    <section id="gallery" style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <p className="section-label">{t.gallery.label}</p>
        <h2 className="section-title">
          {t.gallery.title1}<br />
          <span className="text-cyan">{t.gallery.title2}</span>
        </h2>
        <p style={{
          fontFamily:"Arial, Helvetica, sans-serif", fontSize:"15px",
          color:"rgba(255,255,255,.5)", marginBottom:"48px",
          maxWidth:"520px", lineHeight:1.65,
        }}>
          {t.gallery.subtitle}
        </p>

        {/* Grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "18px",
        }}>
          {WORKFLOWS.map((wf, i) => {
            const trans = (WORKFLOW_TRANS[lang] ?? WORKFLOW_TRANS.fr)[i];
            return (
            <WorkflowCard key={wf.id} wf={{ ...wf, desc: trans.desc, brief: trans.brief }} onSelect={handleSelect} wantThis={t.gallery.wantThis} />
            );
          })}
        </div>

        {/* CTA personnalisé */}
        <div style={{
          marginTop:  "36px", textAlign:"center", padding:"24px",
          background: "rgba(0,229,255,.04)", border:"1px solid rgba(0,229,255,.1)",
          borderRadius:"12px",
        }}>
          <p style={{ fontFamily:"Arial, sans-serif", fontSize:"14px", color:"rgba(255,255,255,.5)", marginBottom:"12px" }}>
            {t.gallery.custom}
          </p>
          <button
            onClick={() => onOpenBrief()}
            style={{
              padding:"10px 24px", background:"var(--cyan)", color:"var(--bg)",
              fontFamily:"var(--mono)", fontWeight:700, fontSize:"12px",
              border:"none", borderRadius:"6px", cursor:"pointer", letterSpacing:".04em",
            }}
          >
            {t.gallery.customCta}
          </button>
        </div>
      </div>
    </section>
  );
}
