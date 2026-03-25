"use client";
import { useState } from "react";
import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import WorkflowGallery   from "@/components/sections/WorkflowGallery";
import MaturityQuiz      from "@/components/sections/MaturityQuiz";
import DeliveryTimeline  from "@/components/sections/DeliveryTimeline";
import FAQSection        from "@/components/sections/FAQSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import CTASection        from "@/components/sections/CTASection";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { useLang }       from "@/lib/LangContext";

const NAV_TRANS: Record<string, string[]> = {
  fr: ["Comment ça marche", "Cas clients", "Workflows prêts", "Diagnostic IA", "Livraison", "FAQ"],
  en: ["How it works", "Case studies", "Ready workflows", "AI Diagnostic", "Delivery", "FAQ"],
  ar: ["كيف يعمل", "دراسات الحالة", "سير العمل الجاهزة", "تشخيص الذكاء الاصطناعي", "التسليم", "الأسئلة الشائعة"],
  es: ["Cómo funciona", "Casos de clientes", "Workflows listos", "Diagnóstico IA", "Entrega", "FAQ"],
  nl: ["Hoe het werkt", "Klantcases", "Kant-en-klare workflows", "AI Diagnose", "Levering", "FAQ"],
};

const HERO_TRANS: Record<string, { label: string; title: string; accent: string; sub: string }> = {
  fr: {
    label:  "// Services & Process",
    title:  "Ce que je construis",
    accent: "et comment ça marche.",
    sub:    "Automatisation n8n, agents IA, SaaS full-stack. Des solutions concrètes avec un process clair — du brief à la livraison en moins de 7 jours.",
  },
  en: {
    label:  "// Services & Process",
    title:  "What I build",
    accent: "and how it works.",
    sub:    "n8n automation, AI agents, full-stack SaaS. Concrete solutions with a clear process — from brief to delivery in less than 7 days.",
  },
  ar: {
    label:  "// الخدمات والعملية",
    title:  "ما أبنيه",
    accent: "وكيف يعمل.",
    sub:    "أتمتة n8n، وكلاء ذكاء اصطناعي، SaaS متكامل. حلول ملموسة بعملية واضحة — من الموجز إلى التسليم في أقل من 7 أيام.",
  },
  es: {
    label:  "// Servicios y Proceso",
    title:  "Lo que construyo",
    accent: "y cómo funciona.",
    sub:    "Automatización n8n, agentes IA, SaaS full-stack. Soluciones concretas con un proceso claro — del brief a la entrega en menos de 7 días.",
  },
  nl: {
    label:  "// Diensten & Proces",
    title:  "Wat ik bouw",
    accent: "en hoe het werkt.",
    sub:    "n8n automatisering, AI-agents, full-stack SaaS. Concrete oplossingen met een duidelijk proces — van briefing tot levering in minder dan 7 dagen.",
  },
};

export default function ServicesPage() {
  const { lang } = useLang();
  const [briefOpen, setBriefOpen] = useState(false);
  const [prefill,   setPrefill  ] = useState<string | undefined>();
  const h = HERO_TRANS[lang] ?? HERO_TRANS.fr;
  const navLabels = NAV_TRANS[lang] ?? NAV_TRANS.fr;
  const isRTL = lang === "ar";

  const openBrief = (prefillText?: string) => {
    if (prefillText) setPrefill(prefillText);
    setBriefOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <ScrollProgressBar />
      <Navbar />

      {/* Hero */}
      <section style={{
        padding:   "120px 24px 80px",
        textAlign: "center",
        background:"var(--bg)",
        direction: isRTL ? "rtl" : "ltr",
        position:  "relative", overflow: "hidden",
      }}>
        <div style={{
          position:        "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,255,200,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,200,.03) 1px,transparent 1px)",
          backgroundSize:  "40px 40px",
        }} />

        <p style={{
          fontFamily:    "'Courier New',monospace", fontSize: "11px",
          color:         "var(--cyan)", letterSpacing: ".2em",
          textTransform: "uppercase", marginBottom: "16px",
          position:      "relative", zIndex: 1,
        }}>
          {h.label}
        </p>
        <h1 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize:   "clamp(32px,6vw,64px)", color: "white",
          lineHeight: 1.1, marginBottom: "12px",
          position:   "relative", zIndex: 1,
        }}>
          {h.title}<br />
          <span style={{ color: "var(--cyan)" }}>{h.accent}</span>
        </h1>
        <p style={{
          fontFamily: "Arial,sans-serif", fontSize: "16px",
          color:      "rgba(255,255,255,.5)", maxWidth: "560px",
          margin:     "0 auto", lineHeight: 1.7,
          position:   "relative", zIndex: 1,
        }}>
          {h.sub}
        </p>

        {/* Nav rapide */}
        <div style={{
          display: "flex", gap: "12px", justifyContent: "center",
          flexWrap: "wrap", marginTop: "36px",
          position: "relative", zIndex: 1,
        }}>
          {[
            { anchor:"#how-it-works", label: navLabels[0] },
            { anchor:"#case-studies", label: navLabels[1] },
            { anchor:"#gallery",      label: navLabels[2] },
            { anchor:"#quiz",         label: navLabels[3] },
            { anchor:"#timeline",     label: navLabels[4] },
            { anchor:"#faq",          label: navLabels[5] },
          ].map(item => (
            <a key={item.anchor} href={item.anchor} style={{
              padding:    "8px 16px",
              background: "rgba(0,255,200,.06)",
              border:     "1px solid rgba(0,255,200,.15)",
              borderRadius:"8px",
              fontFamily: "'Courier New',monospace", fontSize: "11px",
              color:      "rgba(0,255,200,.7)", textDecoration: "none",
              transition: "all .2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,.12)";
                (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(0,255,200,.7)";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Sections */}
      <div id="how-it-works"><HowItWorksSection /></div>
      <BeforeAfterSection />
      <div id="case-studies"><CaseStudiesSection /></div>
      <WorkflowGallery onOpenBrief={openBrief} />
      <MaturityQuiz    onOpenBrief={() => openBrief()} />
      <div id="timeline"><DeliveryTimeline /></div>
      <FAQSection />

      <CTASection
        briefOpen={briefOpen}
        onBriefOpenChange={setBriefOpen}
        prefillProblem={prefill}
      />

      <Footer />
    </div>
  );
}
