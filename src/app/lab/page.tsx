"use client";
import { useState } from "react";
import Navbar               from "@/components/layout/Navbar";
import Footer               from "@/components/layout/Footer";
import LeadHunterSection      from "@/components/sections/LeadHunterSection";
import WorkflowGallery        from "@/components/sections/WorkflowGallery";
import EmailGeneratorSection  from "@/components/sections/EmailGeneratorSection";
import WorkflowSection        from "@/components/sections/WorkflowSection";
import AutomationLiveSection  from "@/components/sections/AutomationLiveSection";
import ROICalculatorSection   from "@/components/sections/ROICalculatorSection";
import DomainAuditSection    from "@/components/sections/DomainAuditSection";
import CTASection             from "@/components/sections/CTASection";
import ScrollProgressBar    from "@/components/ui/ScrollProgressBar";
import { useLang }          from "@/lib/LangContext";

const HERO_TRANS: Record<string, { label: string; title: string; accent: string; sub: string }> = {
  fr: {
    label:  "// Playground interactif",
    title:  "Testez l'IA en direct.",
    accent: "Pas des démos. La vraie chose.",
    sub:    "3 outils que j'ai construits pour mes clients — ouverts au public. Aucun compte requis. Les résultats sont réels.",
  },
  en: {
    label:  "// Interactive Playground",
    title:  "Test AI live.",
    accent: "Not demos. The real thing.",
    sub:    "3 tools I built for my clients — open to the public. No account required. Results are real.",
  },
  ar: {
    label:  "// ملعب تفاعلي",
    title:  "اختبر الذكاء الاصطناعي مباشرة.",
    accent: "ليست عروضاً. الشيء الحقيقي.",
    sub:    "3 أدوات بنيتها لعملائي — مفتوحة للعموم. لا حساب مطلوب. النتائج حقيقية.",
  },
  es: {
    label:  "// Playground Interactivo",
    title:  "Prueba la IA en directo.",
    accent: "No son demos. La cosa real.",
    sub:    "3 herramientas que construí para mis clientes — abiertas al público. Sin cuenta requerida. Los resultados son reales.",
  },
  nl: {
    label:  "// Interactieve Playground",
    title:  "Test AI live.",
    accent: "Geen demo's. Het echte ding.",
    sub:    "3 tools die ik voor mijn klanten bouwde — open voor het publiek. Geen account vereist. Resultaten zijn echt.",
  },
};

export default function LabPage() {
  const { lang } = useLang();
  const [briefOpen, setBriefOpen] = useState(false);
  const h = HERO_TRANS[lang] ?? HERO_TRANS.fr;
  const isRTL = lang === "ar";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <ScrollProgressBar />
      <Navbar />

      {/* Hero */}
      <section style={{
        padding:    "120px 24px 80px",
        textAlign:  "center",
        background: "var(--bg)",
        direction:  isRTL ? "rtl" : "ltr",
        position:   "relative",
        overflow:   "hidden",
      }}>
        {/* Grid bg */}
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
          fontFamily:  "'Syne',sans-serif", fontWeight: 800,
          fontSize:    "clamp(32px,6vw,64px)", color: "white",
          lineHeight:  1.1, marginBottom: "12px",
          position:    "relative", zIndex: 1,
        }}>
          {h.title}<br />
          <span style={{ color: "var(--cyan)" }}>{h.accent}</span>
        </h1>
        <p style={{
          fontFamily:  "Arial,sans-serif", fontSize: "16px",
          color:       "rgba(255,255,255,.5)", maxWidth: "540px",
          margin:      "0 auto 40px", lineHeight: 1.7,
          position:    "relative", zIndex: 1,
        }}>
          {h.sub}
        </p>

        {/* Nav rapide vers les 3 outils */}
        <div style={{
          display:        "flex", gap: "12px", justifyContent: "center",
          flexWrap:       "wrap", position: "relative", zIndex: 1,
        }}>
          {[
            { anchor: "#lead-hunter", emoji: "🎯", label: "Lead Hunter" },
            { anchor: "#gallery",     emoji: "🗂️", label: "Workflow Gallery" },
            { anchor: "#email-gen",   emoji: "✉️", label: "Email Generator" },
            { anchor: "#workflow",    emoji: "⚙️", label: "Workflow Builder" },
            { anchor: "#automation",  emoji: "⚡", label: "Live Pipeline" },
            { anchor: "#roi",          emoji: "💰", label: "ROI Calculator" },
            { anchor: "#domain-audit", emoji: "🔎", label: "Domain Audit" },
          ].map(item => (
            <a key={item.anchor} href={item.anchor} style={{
              padding:        "10px 20px",
              background:     "rgba(0,255,200,.06)",
              border:         "1px solid rgba(0,255,200,.2)",
              borderRadius:   "8px",
              fontFamily:     "'Courier New',monospace", fontSize: "12px",
              color:          "var(--cyan)", textDecoration: "none",
              display:        "flex", alignItems: "center", gap: "8px",
              transition:     "all .2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,.5)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,.2)";
              }}
            >
              {item.emoji} {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Les outils */}
      <LeadHunterSection />
      <WorkflowGallery onOpenBrief={() => setBriefOpen(true)} />
      <EmailGeneratorSection />
      <WorkflowSection />
      <AutomationLiveSection />
      <ROICalculatorSection onOpenBrief={() => setBriefOpen(true)} />
      <DomainAuditSection />

      {/* CTA */}
      <CTASection
        briefOpen={briefOpen}
        onBriefOpenChange={setBriefOpen}
      />

      <Footer />
    </div>
  );
}
