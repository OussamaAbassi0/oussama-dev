"use client";
import { useRef, useEffect, useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ── Translations ──────────────────────────────────────────────── */
const TRANS: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  stats: string[];
}> = {
  fr: {
    badge: "⚡ Gratuit · 2 minutes",
    title: "Quel est votre potentiel d'automatisation ?",
    subtitle: "Répondez à 5 questions → obtenez votre rapport personnalisé avec ROI estimé",
    cta: "Faire le diagnostic →",
    stats: ["🎯 +340 diagnostics réalisés", "⚡ Résultat en 30 secondes", "🔒 100% gratuit"],
  },
  en: {
    badge: "⚡ Free · 2 minutes",
    title: "What is your automation potential?",
    subtitle: "Answer 5 questions → get your personalized report with estimated ROI",
    cta: "Take the diagnostic →",
    stats: ["🎯 +340 diagnostics done", "⚡ Result in 30 seconds", "🔒 100% free"],
  },
  ar: {
    badge: "⚡ مجاني · دقيقتان",
    title: "ما هي إمكاناتك في الأتمتة؟",
    subtitle: "أجب على 5 أسئلة ← احصل على تقريرك الشخصي مع عائد الاستثمار المقدر",
    cta: "← إجراء التشخيص",
    stats: ["🎯 +340 تشخيص منجز", "⚡ النتيجة في 30 ثانية", "🔒 مجاني 100٪"],
  },
  es: {
    badge: "⚡ Gratis · 2 minutos",
    title: "¿Cuál es tu potencial de automatización?",
    subtitle: "Responde 5 preguntas → obtén tu informe personalizado con ROI estimado",
    cta: "Hacer el diagnóstico →",
    stats: ["🎯 +340 diagnósticos realizados", "⚡ Resultado en 30 segundos", "🔒 100% gratis"],
  },
  nl: {
    badge: "⚡ Gratis · 2 minuten",
    title: "Wat is uw automatiseringspotentieel?",
    subtitle: "Beantwoord 5 vragen → ontvang uw gepersonaliseerd rapport met geschatte ROI",
    cta: "Diagnose stellen →",
    stats: ["🎯 +340 diagnoses uitgevoerd", "⚡ Resultaat in 30 seconden", "🔒 100% gratis"],
  },
};

/* ── Keyframes injected once ───────────────────────────────────── */
const DIAG_CSS = `
@keyframes diagGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,200,.35), 0 4px 24px rgba(0,229,255,.2); }
  50%       { box-shadow: 0 0 36px rgba(0,255,200,.6),  0 4px 32px rgba(0,229,255,.35); }
}
@keyframes diagSlideUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes diagBtnPulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.03); }
}
`;

let diagStyleInjected = false;

/* ── Component ─────────────────────────────────────────────────── */
export default function DiagnosticCTABanner() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx = TRANS[lang] ?? TRANS.fr;
  const isRTL = lang === "ar";

  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    if (diagStyleInjected || typeof document === "undefined") return;
    diagStyleInjected = true;
    const el = document.createElement("style");
    el.textContent = DIAG_CSS;
    document.head.appendChild(el);
  }, []);

  return (
    <section
      style={{
        padding: "60px 24px",
        background: "linear-gradient(180deg, #050810 0%, #060a12 100%)",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        ref={ref}
        className="fade-in"
        style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}
      >
        {/* ── Badge ──────────────────────────────────────────── */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 16px",
          background: "rgba(0,255,200,.08)",
          border: "1px solid rgba(0,255,200,.25)",
          borderRadius: "24px",
          fontFamily: "'Courier New', monospace",
          fontSize: "12px",
          color: "#00ffc8",
          letterSpacing: ".06em",
          marginBottom: "28px",
          animation: "diagSlideUp .5s ease 0ms both",
        }}>
          {tx.badge}
        </div>

        {/* ── Title ──────────────────────────────────────────── */}
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(26px,4.5vw,46px)",
          color: "white",
          lineHeight: 1.15,
          marginBottom: "18px",
          animation: "diagSlideUp .5s ease 80ms both",
        }}>
          {tx.title}
        </h2>

        {/* ── Subtitle ───────────────────────────────────────── */}
        <p style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "clamp(14px,2vw,17px)",
          color: "rgba(255,255,255,.55)",
          lineHeight: 1.7,
          marginBottom: "36px",
          animation: "diagSlideUp .5s ease 160ms both",
        }}>
          {tx.subtitle}
        </p>

        {/* ── CTA Button ─────────────────────────────────────── */}
        <div style={{ animation: "diagSlideUp .5s ease 240ms both" }}>
          <a
            href="/diagnostic"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: btnHovered
                ? "linear-gradient(135deg, #00ffc8 0%, #0099ff 100%)"
                : "linear-gradient(135deg, #00e6b4 0%, #007fd4 100%)",
              color: "#050810",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              borderRadius: "10px",
              textDecoration: "none",
              letterSpacing: ".02em",
              transition: "background .2s, transform .2s",
              animation: "diagGlow 2.5s ease-in-out infinite",
              transform: btnHovered ? "scale(1.04)" : "scale(1)",
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            {tx.cta}
          </a>
        </div>

        {/* ── Mini stats ─────────────────────────────────────── */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px 24px",
          marginTop: "24px",
          animation: "diagSlideUp .5s ease 320ms both",
        }}>
          {tx.stats.map((stat, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,.35)",
                letterSpacing: ".04em",
              }}
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
