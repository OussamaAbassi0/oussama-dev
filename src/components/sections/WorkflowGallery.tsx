"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const WF_SCREENSHOTS: Record<string, string> = {
  "linkedin-crm":       "/workflows/linkedin.png",
  "inbound-qualifier":  "/workflows/inbound-lead.png",
  "cold-email-machine": "/workflows/cold-email.png",
  "cv-screening":       "/workflows/cv-screener.png",
  "onboarding-bot":     "/workflows/onboarding.png",
  "support-triage":     "/workflows/support-triage.png",
  "ecom-support":       "/workflows/ecom-support.png",
  "social-listening":   "/workflows/social-listening.png",
  "rapport-hebdo":      "/workflows/business-report.png",
  "invoice-relance":    "/workflows/invoice.png",
  "abandoned-cart":     "/workflows/abandoned-cart.png",
  "lead-scoring":       "/workflows/lead-scoring.png",
  "email-stripe":       "/workflows/payment-ticket.png",
};

const WORKFLOWS = [
  /* ── Prospection & Sales ───────────────────────────────── */
  {
    id:     "linkedin-crm",
    emoji:  "🎯",
    title:  "LinkedIn → CRM Auto-Enrich",
    desc:   "Nouvelle connexion LinkedIn → Apollo enrichit le profil → score ICP calculé → si score > 70 : email personnalisé + lead HubSpot créé automatiquement.",
    tags:   ["LinkedIn", "Apollo", "HubSpot", "OpenAI"],
    time:   "4–5 jours",
    saving: "15h/sem",
    color:  "#00ffc8",
    nodes:  ["🔗 LinkedIn", "🔍 Apollo", "📊 Score ICP", "📧 Email IA", "🗂 HubSpot"],
    brief:  "Je veux automatiser : quand un prospect accepte ma connexion LinkedIn, enrichir son profil avec Apollo, calculer un score ICP et envoyer un email personnalisé si le score est élevé.",
  },
  {
    id:     "inbound-qualifier",
    emoji:  "🔥",
    title:  "Inbound Lead Qualifier IA",
    desc:   "Formulaire rempli → GPT-4o classe Chaud/Tiède/Froid → alerte Slack immédiate + email de réponse auto en moins de 2 minutes pour les leads chauds.",
    tags:   ["Typeform", "OpenAI", "Slack", "Gmail"],
    time:   "2–3 jours",
    saving: "8h/sem",
    color:  "#ff4d6d",
    nodes:  ["📋 Typeform", "🧠 GPT-4o", "🔥 Score", "💬 Slack", "📧 Réponse auto"],
    brief:  "Je veux automatiser : qualifier automatiquement mes leads entrants avec GPT-4o et alerter mon équipe sur Slack en temps réel pour les leads chauds.",
  },
  {
    id:     "cold-email-machine",
    emoji:  "📨",
    title:  "Cold Email Machine B2B",
    desc:   "CSV importé → Apollo enrichit chaque contact → GPT génère un email ultra-personnalisé par secteur → envoi séquencé → RDV Calendly créés automatiquement.",
    tags:   ["Apollo", "OpenAI", "Instantly", "Calendly"],
    time:   "5–7 jours",
    saving: "25h/sem",
    color:  "#00e5ff",
    nodes:  ["📂 CSV", "🔍 Apollo", "🧠 GPT Email", "📧 Instantly", "📅 Calendly"],
    brief:  "Je veux automatiser : importer une liste de prospects, les enrichir, générer des emails personnalisés par IA et planifier des RDV automatiquement sur les réponses positives.",
  },
  /* ── RH & Recrutement ──────────────────────────────────── */
  {
    id:     "cv-screening",
    emoji:  "👥",
    title:  "CV Screener IA",
    desc:   "CV reçu par email → GPT score selon vos critères (0–100) → si >75 : convocation auto + Calendly → si <40 : email de refus poli → ATS mis à jour.",
    tags:   ["Gmail", "OpenAI", "Calendly", "Notion"],
    time:   "5–7 jours",
    saving: "20h/recrutement",
    color:  "#a78bfa",
    nodes:  ["📧 Gmail", "🧠 GPT Score", "✅ >75 Convoc.", "❌ <40 Refus", "📝 ATS"],
    brief:  "Je veux automatiser : le tri de CVs reçus par email avec scoring IA selon mes critères, les convocations automatiques pour les bons profils et les refus polis.",
  },
  {
    id:     "onboarding-bot",
    emoji:  "🚀",
    title:  "Employee Onboarding Automatisé",
    desc:   "Contrat signé → comptes Slack/Notion/Google créés → email de bienvenue → parcours d'intégration envoyé jour par jour sur 2 semaines → manager notifié.",
    tags:   ["Google Workspace", "Slack", "Notion", "Gmail"],
    time:   "5–7 jours",
    saving: "10h/recrutement",
    color:  "#4ade80",
    nodes:  ["✍️ Contrat signé", "🔐 Comptes", "📧 Bienvenue", "📚 J+1→J+14", "✅ Suivi manager"],
    brief:  "Je veux automatiser : tout le processus d'onboarding d'un nouveau salarié — création des accès, email de bienvenue et parcours d'intégration progressif sur 2 semaines.",
  },
  /* ── Support & Communication ───────────────────────────── */
  {
    id:     "support-triage",
    emoji:  "🎫",
    title:  "Support Client Auto-Triage",
    desc:   "Email reçu → GPT classifie (Urgence/Technique/Commercial/Spam) → assigné au bon agent → réponse auto aux questions simples → ticket Zendesk créé.",
    tags:   ["Gmail", "OpenAI", "Zendesk", "Slack"],
    time:   "3–5 jours",
    saving: "18h/sem",
    color:  "#f5a623",
    nodes:  ["📧 Email entrant", "🧠 GPT Classify", "🎫 Zendesk", "👤 Assignation", "💬 Slack"],
    brief:  "Je veux automatiser : le tri de mes emails de support, la classification par priorité avec IA, l'assignation aux bons agents et les réponses auto aux questions simples.",
  },
  {
    id:     "ecom-support",
    emoji:  "🛒",
    title:  "Support E-commerce 24/7",
    desc:   "Agent IA répond aux questions clients (commandes, retours, stock), gère les cas simples en autonomie et escalade uniquement les situations complexes.",
    tags:   ["Shopify", "OpenAI", "Intercom", "Slack"],
    time:   "7–10 jours",
    saving: "35h/sem",
    color:  "#ff8c42",
    nodes:  ["🛍️ Shopify", "🤖 Agent IA", "💬 Réponse auto", "📦 Commandes", "📩 Escalade"],
    brief:  "Je veux automatiser : le support client de ma boutique avec un agent IA qui répond 24/7 aux questions courantes et n'escalade que les cas complexes.",
  },
  {
    id:     "social-listening",
    emoji:  "📡",
    title:  "Social Listening & Réponse IA",
    desc:   "Mention détectée sur Twitter/LinkedIn → GPT analyse le sentiment → si négatif : alerte Slack + suggestion de réponse → si positif : demande de témoignage auto.",
    tags:   ["Twitter/X", "OpenAI", "Slack", "Notion"],
    time:   "3–4 jours",
    saving: "12h/sem",
    color:  "#00ffc8",
    nodes:  ["📡 Mention", "🧠 Sentiment IA", "🔴 Alerte Slack", "💬 Réponse", "⭐ Témoignage"],
    brief:  "Je veux automatiser : la veille de ma marque sur les réseaux sociaux avec analyse de sentiment IA et suggestions de réponse adaptées au contexte.",
  },
  /* ── Ops & Finance ─────────────────────────────────────── */
  {
    id:     "rapport-hebdo",
    emoji:  "📊",
    title:  "Business Report Automatique",
    desc:   "Chaque vendredi 17h → collecte KPIs (GA4 + Stripe + CRM) → GPT rédige un rapport narratif → PDF envoyé aux dirigeants + archivé dans Notion.",
    tags:   ["Google Analytics", "Stripe", "OpenAI", "Notion"],
    time:   "3–4 jours",
    saving: "6h/sem",
    color:  "#a78bfa",
    nodes:  ["⏰ Vendredi 17h", "📈 GA4 + Stripe", "🧠 GPT Rédige", "📄 PDF", "📬 Email + Notion"],
    brief:  "Je veux automatiser : la génération d'un rapport hebdomadaire consolidant mes KPIs avec une rédaction narrative IA, envoyé automatiquement chaque vendredi.",
  },
  {
    id:     "invoice-relance",
    emoji:  "💳",
    title:  "Facturation & Relances Auto",
    desc:   "Facture Stripe créée → envoi auto → J+7 non payée : relance douce → J+14 : relance ferme → J+21 : alerte équipe + suspension d'accès automatique.",
    tags:   ["Stripe", "Gmail", "Slack", "n8n"],
    time:   "3–4 jours",
    saving: "6h/sem",
    color:  "#f5a623",
    nodes:  ["💰 Facture", "📧 Envoi auto", "⏰ J+7 Relance", "🚨 J+14 Ferme", "🔒 J+21 Suspend"],
    brief:  "Je veux automatiser : l'envoi de mes factures et les relances progressives avec escalade automatique et suspension d'accès en cas de non-paiement prolongé.",
  },
  /* ── E-commerce & Marketing ────────────────────────────── */
  {
    id:     "abandoned-cart",
    emoji:  "🛍️",
    title:  "Abandoned Cart Recovery",
    desc:   "Panier abandonné → 1h d'attente → email avec contenu du panier → SMS de rappel J+1 → code promo ciblé J+3 → stats conversions envoyées au marketing.",
    tags:   ["Shopify", "Klaviyo", "Twilio", "n8n"],
    time:   "4–5 jours",
    saving: "+15% conversions",
    color:  "#ff4d6d",
    nodes:  ["🛒 Panier", "⏱ 1h wait", "📧 Email rappel", "📱 SMS J+1", "🎁 Promo J+3"],
    brief:  "Je veux automatiser : la récupération des paniers abandonnés avec une séquence email + SMS progressive et des codes promo ciblés pour maximiser mes conversions.",
  },
  {
    id:     "lead-scoring",
    emoji:  "⚡",
    title:  "Lead Scoring & Nurturing IA",
    desc:   "Lead entrant → score ICP calculé par IA → segmenté par maturité → séquence email personnalisée déclenchée → CRM mis à jour en temps réel.",
    tags:   ["HubSpot", "OpenAI", "Brevo", "n8n"],
    time:   "5–6 jours",
    saving: "12h/sem",
    color:  "#4ade80",
    nodes:  ["🎯 Lead entrant", "🧠 Score ICP", "📊 Segment", "📧 Séquence", "🗂 CRM sync"],
    brief:  "Je veux automatiser : le scoring IA de mes leads entrants, leur segmentation par niveau de maturité et le déclenchement automatique de séquences email personnalisées.",
  },
  {
    id:     "email-stripe",
    emoji:  "✉️",
    title:  "Paiement → Ticket → Notification",
    desc:   "Chaque paiement Stripe crée automatiquement un ticket Jira, notifie l'équipe sur Slack et envoie une facture personnalisée au client.",
    tags:   ["Stripe", "Jira", "Slack", "Gmail"],
    time:   "2–3 jours",
    saving: "4h/sem",
    color:  "#00e5ff",
    nodes:  ["💳 Stripe", "🎫 Jira", "💬 Slack", "📧 Facture client"],
    brief:  "Je veux automatiser : quand je reçois un paiement Stripe, créer un ticket Jira, notifier mon équipe sur Slack et envoyer une facture automatiquement au client.",
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
  const screenshot = WF_SCREENSHOTS[wf.id];

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

      {/* Screenshot preview — visible au hover */}
      {screenshot && (
        <div style={{
          borderRadius:  "8px",
          overflow:      "hidden",
          border:        `1px solid ${wf.color}20`,
          height:        hovered ? "140px" : "0px",
          opacity:       hovered ? 1 : 0,
          transition:    "height .35s ease, opacity .3s ease",
          flexShrink:    0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshot}
            alt={`${wf.title} n8n workflow`}
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top left" }}
          />
        </div>
      )}

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
    { desc: "New LinkedIn connection → Apollo enriches the profile → ICP score calculated → if >70: personalized email + HubSpot lead created automatically.", brief: "I want to automate: when a prospect connects on LinkedIn, enrich their profile with Apollo, calculate an ICP score and send a personalized email if the score is high." },
    { desc: "Form submitted → GPT-4o classifies Hot/Warm/Cold → instant Slack alert + auto-reply email in under 2 minutes for hot leads.", brief: "I want to automate: qualify my incoming leads with GPT-4o and alert my team on Slack in real time for hot leads." },
    { desc: "CSV imported → Apollo enriches each contact → GPT generates an ultra-personalized email per industry → sequenced sending → Calendly meetings auto-created.", brief: "I want to automate: import a prospect list, enrich them, generate AI-personalized emails and automatically book meetings on positive replies." },
    { desc: "CV received by email → GPT scores against your criteria (0–100) → if >75: auto invite + Calendly → if <40: polite rejection email → ATS updated.", brief: "I want to automate: CV screening with AI scoring, automatic interview invites for top profiles and polite rejection emails." },
    { desc: "Contract signed → Slack/Notion/Google accounts created → welcome email → onboarding journey sent day by day over 2 weeks → manager notified.", brief: "I want to automate: the full onboarding process for new hires — account creation, welcome email and progressive 2-week integration journey." },
    { desc: "Email received → GPT classifies (Urgent/Technical/Commercial/Spam) → assigned to right agent → auto-reply for simple questions → Zendesk ticket created.", brief: "I want to automate: sorting my support emails, AI classification by priority, auto-assignment to the right agents and auto-replies for simple questions." },
    { desc: "AI agent answers customer questions (orders, returns, stock), handles simple cases autonomously and escalates only complex situations.", brief: "I want to automate: my store's customer support with an AI agent that responds 24/7 and only escalates complex cases to my team." },
    { desc: "Mention detected on Twitter/LinkedIn → GPT analyses sentiment → if negative: Slack alert + suggested reply → if positive: automatic testimonial request.", brief: "I want to automate: brand monitoring on social media with AI sentiment analysis and context-appropriate suggested responses." },
    { desc: "Every Friday 5pm → KPIs collected (GA4 + Stripe + CRM) → GPT writes a narrative report → PDF sent to executives + archived in Notion.", brief: "I want to automate: generating a weekly report consolidating my KPIs with AI narrative writing, sent automatically every Friday." },
    { desc: "Stripe invoice created → auto-sent → J+7 unpaid: soft reminder → J+14: firm reminder → J+21: team alert + automatic access suspension.", brief: "I want to automate: invoice sending and progressive follow-ups with automatic escalation and access suspension for prolonged non-payment." },
    { desc: "Cart abandoned → 1h wait → email with cart contents → SMS reminder D+1 → targeted promo code D+3 → conversion stats sent to marketing.", brief: "I want to automate: abandoned cart recovery with a progressive email + SMS sequence and targeted promo codes to maximize conversions." },
    { desc: "Incoming lead → ICP score calculated by AI → segmented by maturity → personalized email sequence triggered → CRM updated in real time.", brief: "I want to automate: AI scoring of my incoming leads, segmentation by maturity level and automatic triggering of personalized email sequences." },
    { desc: "Each Stripe payment automatically creates a Jira ticket, notifies the team on Slack and sends a personalized invoice to the client.", brief: "I want to automate: when I receive a Stripe payment, create a Jira ticket, notify my team on Slack and send an invoice to the client automatically." },
  ],
  ar: [
    { desc: "اتصال جديد على LinkedIn → Apollo يُثري الملف → حساب نقاط ICP → إذا >70: إرسال بريد مخصص + إنشاء عميل في HubSpot تلقائياً.", brief: "أريد أتمتة: عند اتصال مرشح على LinkedIn، إثراء ملفه وحساب نقاط ICP وإرسال بريد مخصص إذا كانت النقاط مرتفعة." },
    { desc: "استمارة مُعبّأة → GPT-4o يُصنّف ساخن/دافئ/بارد → تنبيه Slack فوري + رد تلقائي في أقل من دقيقتين للعملاء الساخنين.", brief: "أريد أتمتة: تأهيل عملائي الواردين بـGPT-4o وتنبيه فريقي على Slack فوراً للعملاء الساخنين." },
    { desc: "CSV مستورد → Apollo يُثري كل جهة اتصال → GPT يولّد بريداً مخصصاً حسب القطاع → إرسال متسلسل → مواعيد Calendly تُنشأ تلقائياً.", brief: "أريد أتمتة: استيراد قائمة مرشحين، إثراؤهم، توليد رسائل مخصصة بالذكاء الاصطناعي وحجز مواعيد تلقائياً." },
    { desc: "السيرة الذاتية تصل بالبريد → GPT يُسجّل نقاطاً (0–100) → إذا >75: دعوة تلقائية + Calendly → إذا <40: رد رفض مهذب → تحديث ATS.", brief: "أريد أتمتة: فرز السير الذاتية بتسجيل نقاط ذكاء اصطناعي والدعوة التلقائية للمرشحين المناسبين." },
    { desc: "توقيع العقد → إنشاء حسابات Slack/Notion/Google → بريد ترحيب → مسار تأهيل يومي على مدى أسبوعين → إخطار المدير.", brief: "أريد أتمتة: كامل عملية التأهيل لموظف جديد — إنشاء الحسابات والبريد الترحيبي ومسار التكامل التدريجي." },
    { desc: "بريد وارد → GPT يُصنّف (عاجل/تقني/تجاري/بريد عشوائي) → يُسند لوكيل مناسب → رد تلقائي للأسئلة البسيطة → تذكرة Zendesk.", brief: "أريد أتمتة: فرز رسائل الدعم وتصنيفها بالذكاء الاصطناعي والإسناد التلقائي والردود على الأسئلة البسيطة." },
    { desc: "وكيل ذكاء اصطناعي يرد على أسئلة العملاء ويدير المرتجعات ويُصعّد فقط الحالات المعقدة.", brief: "أريد أتمتة: دعم عملاء متجري بوكيل ذكاء اصطناعي يعمل 24/7 ويُصعّد الحالات المعقدة فقط." },
    { desc: "ذكر العلامة على تويتر/LinkedIn → GPT يحلل المشاعر → إذا سلبي: تنبيه Slack + اقتراح رد → إذا إيجابي: طلب شهادة تلقائي.", brief: "أريد أتمتة: مراقبة علامتي على الشبكات الاجتماعية بتحليل المشاعر والردود المقترحة." },
    { desc: "كل جمعة 17:00 → جمع KPIs (GA4 + Stripe + CRM) → GPT يكتب تقريراً سردياً → PDF يُرسل للمديرين + يُحفظ في Notion.", brief: "أريد أتمتة: توليد تقرير أسبوعي بكتابة سردية ذكاء اصطناعي يُرسل تلقائياً كل جمعة." },
    { desc: "فاتورة Stripe مُنشأة → إرسال تلقائي → Y+7 غير مدفوعة: تذكير لطيف → Y+14: تذكير حازم → Y+21: تنبيه + تعليق وصول.", brief: "أريد أتمتة: إرسال الفواتير والمتابعات التدريجية مع تصعيد تلقائي وتعليق وصول عند التأخر." },
    { desc: "سلة متروكة → انتظار ساعة → بريد بمحتوى السلة → رسالة نصية تذكير اليوم+1 → كود خصم مستهدف اليوم+3.", brief: "أريد أتمتة: استرداد السلات المتروكة بتسلسل بريد+رسائل نصية تدريجي وكودات خصم مستهدفة." },
    { desc: "عميل وارد → حساب نقاط ICP بالذكاء الاصطناعي → تقسيم حسب النضج → إطلاق تسلسل بريد مخصص → تحديث CRM.", brief: "أريد أتمتة: تسجيل نقاط عملائي الواردين وتقسيمهم وتشغيل تسلسلات بريد مخصصة تلقائياً." },
    { desc: "كل دفعة Stripe تُنشئ تذكرة Jira وتُخطر الفريق على Slack وترسل فاتورة مخصصة للعميل.", brief: "أريد أتمتة: عند تلقي دفعة Stripe، إنشاء تذكرة Jira وإخطار الفريق وإرسال فاتورة للعميل." },
  ],
  es: [
    { desc: "Nueva conexión LinkedIn → Apollo enriquece el perfil → puntuación ICP calculada → si >70: email personalizado + lead HubSpot creado automáticamente.", brief: "Quiero automatizar: cuando un prospecto conecta en LinkedIn, enriquecer su perfil, calcular un score ICP y enviar un email personalizado si el score es alto." },
    { desc: "Formulario enviado → GPT-4o clasifica Caliente/Tibio/Frío → alerta Slack inmediata + email de respuesta auto en menos de 2 minutos.", brief: "Quiero automatizar: calificar mis leads entrantes con GPT-4o y alertar a mi equipo en Slack en tiempo real para los leads calientes." },
    { desc: "CSV importado → Apollo enriquece cada contacto → GPT genera un email ultra-personalizado por sector → envío secuenciado → reuniones Calendly auto-creadas.", brief: "Quiero automatizar: importar lista de prospectos, enriquecerlos, generar emails personalizados con IA y reservar reuniones automáticamente." },
    { desc: "CV recibido por email → GPT puntúa según tus criterios (0–100) → si >75: invitación auto + Calendly → si <40: email de rechazo educado → ATS actualizado.", brief: "Quiero automatizar: filtrado de CVs con puntuación IA, invitaciones automáticas para los mejores perfiles y emails de rechazo educados." },
    { desc: "Contrato firmado → cuentas Slack/Notion/Google creadas → email de bienvenida → recorrido de incorporación enviado día a día durante 2 semanas.", brief: "Quiero automatizar: todo el proceso de incorporación de un nuevo empleado — creación de cuentas, email de bienvenida y journey de integración progresivo." },
    { desc: "Email recibido → GPT clasifica (Urgente/Técnico/Comercial/Spam) → asignado al agente correcto → respuesta auto para preguntas simples → ticket Zendesk.", brief: "Quiero automatizar: clasificación de emails de soporte con IA, asignación automática y respuestas auto para preguntas simples." },
    { desc: "Agente IA responde preguntas de clientes (pedidos, devoluciones, stock), gestiona casos simples y escala solo los complejos.", brief: "Quiero automatizar: soporte al cliente de mi tienda con un agente IA que responde 24/7 y solo escala los casos complejos." },
    { desc: "Mención detectada en Twitter/LinkedIn → GPT analiza el sentimiento → si negativo: alerta Slack + respuesta sugerida → si positivo: solicitud de testimonio.", brief: "Quiero automatizar: monitoreo de mi marca en redes sociales con análisis de sentimiento IA y respuestas sugeridas adaptadas." },
    { desc: "Cada viernes 17h → KPIs recopilados (GA4 + Stripe + CRM) → GPT redacta informe narrativo → PDF enviado a directivos + archivado en Notion.", brief: "Quiero automatizar: generación de informe semanal con redacción narrativa IA, enviado automáticamente cada viernes." },
    { desc: "Factura Stripe creada → envío auto → D+7 impagada: recordatorio suave → D+14: recordatorio firme → D+21: alerta equipo + suspensión de acceso.", brief: "Quiero automatizar: envío de facturas y seguimientos progresivos con escalada automática y suspensión de acceso por impago prolongado." },
    { desc: "Carrito abandonado → espera 1h → email con contenido del carrito → SMS recordatorio D+1 → código promo dirigido D+3.", brief: "Quiero automatizar: recuperación de carritos abandonados con secuencia email + SMS progresiva y códigos promo dirigidos." },
    { desc: "Lead entrante → puntuación ICP calculada por IA → segmentado por madurez → secuencia email personalizada activada → CRM actualizado.", brief: "Quiero automatizar: puntuación IA de mis leads, segmentación por madurez y activación automática de secuencias email personalizadas." },
    { desc: "Cada pago Stripe crea un ticket Jira, notifica al equipo en Slack y envía una factura personalizada al cliente.", brief: "Quiero automatizar: cuando recibo un pago Stripe, crear ticket Jira, notificar equipo en Slack y enviar factura al cliente." },
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
