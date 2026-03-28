"use client";
import { RefreshCw, ShieldCheck, Zap, FileText, X, Check } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

const GUARANTEE_ICONS = [
  <RefreshCw key="refresh" size={18} strokeWidth={2} />,
  <ShieldCheck key="shield" size={18} strokeWidth={2} />,
  <Zap key="zap" size={18} strokeWidth={2} />,
  <FileText key="file" size={18} strokeWidth={2} />,
];

/* ══════════════════════════════════════════════════════════
   TRUST SECTION — Before/After + 3 étapes + Garanties
   Objectif : convaincre le client hésitant en 30 secondes
══════════════════════════════════════════════════════════ */

const TRANS: Record<string, {
  beforeAfterLabel: string;
  beforeTitle: string; afterTitle: string;
  beforeItems: string[]; afterItems: string[];
  processLabel: string; processTitle: string; processSub: string;
  steps: { num: string; title: string; desc: string; tag: string }[];
  guaranteesLabel: string;
  guarantees: { icon: string; title: string; desc: string }[];
}> = {
  fr: {
    beforeAfterLabel: "// Ce que ça change concrètement",
    beforeTitle: "Avant",
    afterTitle: "Après",
    beforeItems: [
      "10h/semaine perdues sur des tâches répétitives",
      "Leads recherchés manuellement, 1 par 1",
      "Données copiées à la main entre outils",
      "Process opaques, zéro visibilité",
    ],
    afterItems: [
      "Ces 10h récupérées — sans recruter personne",
      "50 leads qualifiés générés en 3 minutes",
      "Synchronisation automatique entre tous les outils",
      "Workflows documentés, mesurables, modifiables",
    ],
    processLabel: "// Comment ça se passe",
    processTitle: "Simple, rapide, sans jargon.",
    processSub: "Pas besoin d'être tech. Tu décris ton problème en français — je m'occupe du reste.",
    steps: [
      {
        num: "01",
        title: "Tu décris ton besoin",
        desc: "2 minutes pour remplir le brief. Ton problème en langage simple — pas besoin de savoir ce qu'est une API.",
        tag: "2 minutes",
      },
      {
        num: "02",
        title: "J'analyse et je réponds",
        desc: "Tu reçois une analyse personnalisée sous 24h : ce qu'on peut automatiser, comment, et une estimation concrète. Gratuit.",
        tag: "Sous 24h",
      },
      {
        num: "03",
        title: "On livre — vite",
        desc: "Une automatisation simple : 1 jour. Un agent IA complet : quelques jours. Un SaaS full-stack : quelques semaines. Toujours clair avant de commencer.",
        tag: "Selon la taille",
      },
    ],
    guaranteesLabel: "Ce qui est toujours inclus",
    guarantees: [
      { icon: "🔄", title: "Révisions illimitées", desc: "Jusqu'à satisfaction totale. Pas de limite." },
      { icon: "🔒", title: "NDA disponible", desc: "Confidentialité totale sur demande." },
      { icon: "⚡", title: "Réponse sous 24h", desc: "Toujours. Même le week-end." },
      { icon: "🎯", title: "Devis gratuit", desc: "Sans engagement. Zéro pression." },
    ],
  },
  en: {
    beforeAfterLabel: "// What actually changes",
    beforeTitle: "Before",
    afterTitle: "After",
    beforeItems: [
      "10h/week lost on repetitive tasks",
      "Leads searched manually, one by one",
      "Data copied by hand between tools",
      "Opaque processes, zero visibility",
    ],
    afterItems: [
      "Those 10h recovered — without hiring anyone",
      "50 qualified leads generated in 3 minutes",
      "Automatic sync between all your tools",
      "Documented, measurable, editable workflows",
    ],
    processLabel: "// How it works",
    processTitle: "Simple, fast, no jargon.",
    processSub: "No tech skills needed. You describe your problem in plain language — I handle the rest.",
    steps: [
      {
        num: "01",
        title: "You describe your need",
        desc: "2 minutes to fill the brief. Your problem in plain language — no need to know what an API is.",
        tag: "2 minutes",
      },
      {
        num: "02",
        title: "I analyze and respond",
        desc: "You get a personalized analysis within 24h: what we can automate, how, and a concrete estimate. Free.",
        tag: "Within 24h",
      },
      {
        num: "03",
        title: "We deliver — fast",
        desc: "A simple automation: 1 day. A full AI agent: a few days. A full-stack SaaS: a few weeks. Always clear before we start.",
        tag: "Depends on size",
      },
    ],
    guaranteesLabel: "Always included",
    guarantees: [
      { icon: "🔄", title: "Unlimited revisions", desc: "Until total satisfaction. No limit." },
      { icon: "🔒", title: "NDA available", desc: "Full confidentiality on request." },
      { icon: "⚡", title: "24h response", desc: "Always. Even on weekends." },
      { icon: "🎯", title: "Free quote", desc: "No commitment. Zero pressure." },
    ],
  },
  ar: {
    beforeAfterLabel: "// ما الذي يتغير فعلياً",
    beforeTitle: "قبل",
    afterTitle: "بعد",
    beforeItems: [
      "10 ساعات أسبوعياً ضائعة في مهام متكررة",
      "البحث عن العملاء يدوياً، واحداً تلو الآخر",
      "نسخ البيانات يدوياً بين الأدوات",
      "عمليات غير شفافة، صفر رؤية",
    ],
    afterItems: [
      "استعادة تلك الـ10 ساعات — دون توظيف أحد",
      "50 عميلاً محتملاً خلال 3 دقائق",
      "مزامنة تلقائية بين جميع أدواتك",
      "سير عمل موثق وقابل للقياس والتعديل",
    ],
    processLabel: "// كيف يسير الأمر",
    processTitle: "بسيط، سريع، بدون مصطلحات تقنية.",
    processSub: "لا تحتاج إلى خبرة تقنية. صف مشكلتك بلغة بسيطة — أنا أتولى الباقي.",
    steps: [
      {
        num: "01",
        title: "تصف احتياجك",
        desc: "دقيقتان لملء الموجز. مشكلتك بلغة بسيطة — لا حاجة لمعرفة ما هو API.",
        tag: "دقيقتان",
      },
      {
        num: "02",
        title: "أحلل وأرد",
        desc: "تتلقى تحليلاً شخصياً خلال 24 ساعة: ما يمكن أتمتته، وكيف، وتقدير ملموس. مجاناً.",
        tag: "خلال 24 ساعة",
      },
      {
        num: "03",
        title: "نسلّم — بسرعة",
        desc: "أتمتة بسيطة: يوم واحد. وكيل ذكاء اصطناعي كامل: أيام قليلة. SaaS متكامل: أسابيع. دائماً واضح قبل البدء.",
        tag: "حسب الحجم",
      },
    ],
    guaranteesLabel: "مدرج دائماً",
    guarantees: [
      { icon: "🔄", title: "تعديلات غير محدودة", desc: "حتى الرضا التام. بلا حدود." },
      { icon: "🔒", title: "اتفاقية سرية متاحة", desc: "سرية تامة عند الطلب." },
      { icon: "⚡", title: "رد خلال 24 ساعة", desc: "دائماً. حتى في عطلة نهاية الأسبوع." },
      { icon: "🎯", title: "عرض سعر مجاني", desc: "بلا التزام. بدون ضغط." },
    ],
  },
  es: {
    beforeAfterLabel: "// Lo que cambia concretamente",
    beforeTitle: "❌ Antes",
    afterTitle: "✅ Después",
    beforeItems: [
      "10h/semana perdidas en tareas repetitivas",
      "Leads buscados manualmente, uno a uno",
      "Datos copiados a mano entre herramientas",
      "Procesos opacos, cero visibilidad",
    ],
    afterItems: [
      "Esas 10h recuperadas — sin contratar a nadie",
      "50 leads cualificados generados en 3 minutos",
      "Sincronización automática entre todas las herramientas",
      "Workflows documentados, medibles y modificables",
    ],
    processLabel: "// Cómo funciona",
    processTitle: "Simple, rápido, sin jerga técnica.",
    processSub: "No necesitas ser técnico. Describes tu problema en lenguaje simple — yo me encargo del resto.",
    steps: [
      {
        num: "01",
        title: "Describes tu necesidad",
        desc: "2 minutos para rellenar el brief. Tu problema en lenguaje sencillo — no hace falta saber qué es una API.",
        tag: "2 minutos",
      },
      {
        num: "02",
        title: "Analizo y respondo",
        desc: "Recibes un análisis personalizado en 24h: qué podemos automatizar, cómo, y una estimación concreta. Gratis.",
        tag: "En 24h",
      },
      {
        num: "03",
        title: "Entregamos — rápido",
        desc: "Una automatización simple: 1 día. Un agente IA completo: pocos días. Un SaaS full-stack: pocas semanas. Siempre claro antes de empezar.",
        tag: "Según el tamaño",
      },
    ],
    guaranteesLabel: "Siempre incluido",
    guarantees: [
      { icon: "🔄", title: "Revisiones ilimitadas", desc: "Hasta satisfacción total. Sin límite." },
      { icon: "🔒", title: "NDA disponible", desc: "Confidencialidad total bajo petición." },
      { icon: "⚡", title: "Respuesta en 24h", desc: "Siempre. Incluso los fines de semana." },
      { icon: "🎯", title: "Presupuesto gratuito", desc: "Sin compromiso. Cero presión." },
    ],
  },
  nl: {
    beforeAfterLabel: "// Wat er concreet verandert",
    beforeTitle: "Vóór",
    afterTitle: "Na",
    beforeItems: [
      "10u/week verloren aan repetitieve taken",
      "Leads handmatig gezocht, één voor één",
      "Data handmatig gekopieerd tussen tools",
      "Ondoorzichtige processen, nul zichtbaarheid",
    ],
    afterItems: [
      "Die 10u teruggewonnen — zonder iemand in te huren",
      "50 gekwalificeerde leads in 3 minuten",
      "Automatische synchronisatie tussen alle tools",
      "Gedocumenteerde, meetbare, aanpasbare workflows",
    ],
    processLabel: "// Hoe het werkt",
    processTitle: "Eenvoudig, snel, zonder jargon.",
    processSub: "Geen technische kennis nodig. U beschrijft uw probleem in gewone taal — ik doe de rest.",
    steps: [
      {
        num: "01",
        title: "U beschrijft uw behoefte",
        desc: "2 minuten om de briefing in te vullen. Uw probleem in gewone taal — u hoeft niet te weten wat een API is.",
        tag: "2 minuten",
      },
      {
        num: "02",
        title: "Ik analyseer en reageer",
        desc: "U ontvangt binnen 24u een persoonlijke analyse: wat we kunnen automatiseren, hoe, en een concrete schatting. Gratis.",
        tag: "Binnen 24u",
      },
      {
        num: "03",
        title: "We leveren — snel",
        desc: "Een eenvoudige automatisering: 1 dag. Een volledige AI-agent: enkele dagen. Een full-stack SaaS: enkele weken. Altijd duidelijk voor we beginnen.",
        tag: "Afhankelijk van omvang",
      },
    ],
    guaranteesLabel: "Altijd inbegrepen",
    guarantees: [
      { icon: "🔄", title: "Onbeperkte revisies", desc: "Tot volledige tevredenheid. Geen limiet." },
      { icon: "🔒", title: "NDA beschikbaar", desc: "Volledige vertrouwelijkheid op aanvraag." },
      { icon: "⚡", title: "Reactie binnen 24u", desc: "Altijd. Ook in het weekend." },
      { icon: "🎯", title: "Gratis offerte", desc: "Zonder verplichting. Nul druk." },
    ],
  },
};

export default function TrustSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx = TRANS[lang] ?? TRANS.fr;
  const isRTL = lang === "ar";

  return (
    <section style={{ padding: "100px 24px", background: "var(--bg3)" }} dir={isRTL ? "rtl" : "ltr"}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── AVANT / APRÈS ─────────────────────────────────── */}
        <p style={{
          fontFamily: "'Courier New',monospace", fontSize: "11px",
          color: "rgba(0,255,200,.6)", letterSpacing: ".15em",
          textTransform: "uppercase", marginBottom: "32px",
        }}>
          {tx.beforeAfterLabel}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "80px",
        }}>
          {/* Avant */}
          <div style={{
            padding: "28px",
            background: "rgba(255,77,109,.04)",
            border: "1px solid rgba(255,77,109,.15)",
            borderRadius: "14px",
          }}>
            <p style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "16px", color: "#ff4d6d", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <X size={16} strokeWidth={2.5} />
              {tx.beforeTitle}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {tx.beforeItems.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  fontFamily: "Arial,sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,.5)", lineHeight: 1.5,
                }}>
                  <X size={13} strokeWidth={2.5} color="#ff4d6d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Après */}
          <div style={{
            padding: "28px",
            background: "rgba(0,255,200,.04)",
            border: "1px solid rgba(0,255,200,.2)",
            borderRadius: "14px",
            boxShadow: "0 0 40px rgba(0,255,200,.05)",
          }}>
            <p style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "16px", color: "#00ffc8", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <Check size={16} strokeWidth={2.5} />
              {tx.afterTitle}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {tx.afterItems.map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "10px",
                  fontFamily: "Arial,sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,.8)", lineHeight: 1.5,
                }}>
                  <Check size={13} strokeWidth={2.5} color="#00ffc8" style={{ flexShrink: 0, marginTop: "2px" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3 ÉTAPES ──────────────────────────────────────── */}
        <p style={{
          fontFamily: "'Courier New',monospace", fontSize: "11px",
          color: "rgba(0,255,200,.6)", letterSpacing: ".15em",
          textTransform: "uppercase", marginBottom: "12px",
        }}>
          {tx.processLabel}
        </p>
        <h2 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(24px,4vw,40px)", color: "white",
          marginBottom: "8px", lineHeight: 1.1,
        }}>
          {tx.processTitle}
        </h2>
        <p style={{
          fontFamily: "Arial,sans-serif", fontSize: "15px",
          color: "rgba(255,255,255,.45)", marginBottom: "48px",
          maxWidth: "520px", lineHeight: 1.7,
        }}>
          {tx.processSub}
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "80px",
          position: "relative",
        }}>
          {tx.steps.map((step, i) => (
            <div key={i} style={{
              padding: "28px",
              background: "#07090f",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: "14px",
              position: "relative",
              overflow: "hidden",
              transition: "border-color .3s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,.25)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)"}
            >
              {/* Numéro décoratif */}
              <div style={{
                position: "absolute", top: "16px", right: "20px",
                fontFamily: "'Courier New',monospace", fontWeight: 800,
                fontSize: "48px", color: "rgba(0,255,200,.05)",
                lineHeight: 1, userSelect: "none",
              }}>
                {step.num}
              </div>

              {/* Tag durée */}
              <span style={{
                display: "inline-block",
                padding: "3px 10px", borderRadius: "20px",
                background: "rgba(0,255,200,.08)",
                border: "1px solid rgba(0,255,200,.2)",
                fontFamily: "'Courier New',monospace", fontSize: "10px",
                color: "#00ffc8", letterSpacing: ".08em",
                marginBottom: "16px",
              }}>
                {step.tag}
              </span>

              <h3 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: "18px", color: "white",
                marginBottom: "12px",
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "Arial,sans-serif", fontSize: "14px",
                color: "rgba(255,255,255,.5)", lineHeight: 1.7,
              }}>
                {step.desc}
              </p>

              {/* Connecteur → entre les étapes (sauf dernier) */}
              {i < tx.steps.length - 1 && (
                <div style={{
                  display: "none", // masqué en mobile, visible via media query non disponible ici
                }} />
              )}
            </div>
          ))}
        </div>

        {/* ── GARANTIES ─────────────────────────────────────── */}
        <div style={{
          padding: "32px 36px",
          background: "rgba(0,255,200,.02)",
          border: "1px solid rgba(0,255,200,.12)",
          borderRadius: "16px",
        }}>
          <p style={{
            fontFamily: "'Courier New',monospace", fontSize: "11px",
            color: "rgba(0,255,200,.5)", letterSpacing: ".15em",
            textTransform: "uppercase", marginBottom: "24px",
            textAlign: "center",
          }}>
            {tx.guaranteesLabel}
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
          }}>
            {tx.guarantees.map((g, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "14px",
              }}>
                <div style={{
                  color: "#00ffc8", flexShrink: 0,
                  padding: "9px", borderRadius: "10px",
                  background: "rgba(0,255,200,.08)",
                  border: "1px solid rgba(0,255,200,.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {GUARANTEE_ICONS[i]}
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    fontSize: "14px", color: "white", marginBottom: "4px",
                  }}>
                    {g.title}
                  </p>
                  <p style={{
                    fontFamily: "Arial,sans-serif", fontSize: "12px",
                    color: "rgba(255,255,255,.4)", lineHeight: 1.5,
                  }}>
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
