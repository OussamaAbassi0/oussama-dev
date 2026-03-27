"use client";
import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

/* ── Translations ──────────────────────────────────────────────── */
const TRANS: Record<string, {
  sectionLabel: string;
  title: string;
  titleAccent: string;
  hours: string;
  workflows: string;
  projects: string;
  satisfaction: string;
}> = {
  fr: {
    sectionLabel: "// En chiffres",
    title: "Ce que j'ai",
    titleAccent: "réellement livré.",
    hours: "heures économisées / semaine (total clients)",
    workflows: "automatisations n8n livrées",
    projects: "projets livrés",
    satisfaction: "note moyenne Malt & Upwork",
  },
  en: {
    sectionLabel: "// By the numbers",
    title: "What I've",
    titleAccent: "actually delivered.",
    hours: "hours saved / week (total clients)",
    workflows: "n8n automations delivered",
    projects: "projects delivered",
    satisfaction: "avg rating Malt & Upwork",
  },
  ar: {
    sectionLabel: "// بالأرقام",
    title: "ما قدّمته",
    titleAccent: "فعلياً.",
    hours: "ساعات موفرة / أسبوع",
    workflows: "أتمتة n8n مسلّمة",
    projects: "مشروع مسلّم",
    satisfaction: "متوسط التقييم",
  },
  es: {
    sectionLabel: "// En números",
    title: "Lo que he",
    titleAccent: "entregado realmente.",
    hours: "horas ahorradas / semana (total clientes)",
    workflows: "automatizaciones n8n entregadas",
    projects: "proyectos entregados",
    satisfaction: "nota media Malt & Upwork",
  },
  nl: {
    sectionLabel: "// In cijfers",
    title: "Wat ik",
    titleAccent: "echt heb geleverd.",
    hours: "uren bespaard / week (totaal klanten)",
    workflows: "n8n-automatiseringen geleverd",
    projects: "projecten geleverd",
    satisfaction: "gemiddelde score Malt & Upwork",
  },
};

/* ── Types ─────────────────────────────────────────────────────── */
interface StatConfig {
  key: string;
  base: number;
  increment: number;
  intervalMs: number;
  suffix?: string;
  isFloat?: boolean;
  fixed?: boolean;
}

const STAT_CONFIGS: StatConfig[] = [
  { key: "projects",     base: 17,  increment: 0, intervalMs: 0, fixed: true },
  { key: "workflows",    base: 13,  increment: 0, intervalMs: 0, fixed: true },
  { key: "hours",        base: 148, increment: 0, intervalMs: 0, fixed: true },
  { key: "satisfaction", base: 5,   increment: 0, intervalMs: 0, fixed: true, suffix: "/5" },
];

/* ── Flash animation injected once ─────────────────────────────── */
const FLASH_CSS = `
@keyframes liveStatFlash {
  0%   { border-color: rgba(0,255,200,0.08); box-shadow: none; }
  30%  { border-color: #00ffc8;              box-shadow: 0 0 18px rgba(0,255,200,0.25); }
  100% { border-color: rgba(0,255,200,0.08); box-shadow: none; }
}
@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.85); }
}
@keyframes liveFadeSlide {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

/* ── Component ─────────────────────────────────────────────────── */
export default function LiveStatsSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx = TRANS[lang] ?? TRANS.fr;
  const isRTL = lang === "ar";

  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(STAT_CONFIGS.map(s => [s.key, s.base]))
  );
  const [flashing, setFlashing] = useState<Record<string, boolean>>({});
  const styleInjected = useRef(false);

  /* Inject keyframes once */
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const el = document.createElement("style");
    el.textContent = FLASH_CSS;
    document.head.appendChild(el);
  }, []);

  /* Ticking intervals per stat */
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    STAT_CONFIGS.forEach(cfg => {
      if (cfg.fixed || cfg.intervalMs === 0) return;

      const id = setInterval(() => {
        setValues(prev => ({
          ...prev,
          [cfg.key]: cfg.isFloat
            ? Math.round(prev[cfg.key] + cfg.increment)
            : prev[cfg.key] + cfg.increment,
        }));
        setFlashing(prev => ({ ...prev, [cfg.key]: true }));
        setTimeout(() =>
          setFlashing(prev => ({ ...prev, [cfg.key]: false })),
          500
        );
      }, cfg.intervalMs);

      cleanups.push(() => clearInterval(id));
    });

    return () => cleanups.forEach(fn => fn());
  }, []);

  const getLocale = () => {
    if (lang === "ar") return "ar-SA";
    if (lang === "nl") return "nl-NL";
    if (lang === "en") return "en-US";
    if (lang === "es") return "es-ES";
    return "fr-FR";
  };

  const formatValue = (key: string) => {
    const cfg = STAT_CONFIGS.find(c => c.key === key)!;
    const val = values[key];
    const num = cfg.isFloat ? Math.round(val) : val;
    return num.toLocaleString(getLocale()) + (cfg.suffix ?? "");
  };

  const statLabels: Record<string, string> = {
    hours: tx.hours,
    workflows: tx.workflows,
    projects: tx.projects,
    satisfaction: tx.satisfaction,
  };

  return (
    <section
      style={{ padding: "80px 24px", background: "#060a12" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        ref={ref}
        className="fade-in"
        style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}
      >
        {/* ── LIVE badge ─────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          top: 0,
          right: isRTL ? "auto" : 0,
          left: isRTL ? 0 : "auto",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 12px",
          background: "rgba(255,50,50,0.12)",
          border: "1px solid rgba(255,50,50,0.3)",
          borderRadius: "20px",
        }}>
          <span style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#ff3232",
            boxShadow: "0 0 8px #ff3232",
            animation: "livePulse 1.4s ease-in-out infinite",
            display: "inline-block",
          }} />
          <span style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "9px",
            color: "#ff3232",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}>
            LIVE
          </span>
        </div>

        {/* ── Section label ──────────────────────────────────── */}
        <p style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "11px",
          color: "rgba(0,255,200,.6)",
          letterSpacing: ".15em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          {tx.sectionLabel}
        </p>

        {/* ── Title ──────────────────────────────────────────── */}
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(28px,4.5vw,48px)",
          color: "white",
          lineHeight: 1.1,
          marginBottom: "48px",
        }}>
          {tx.title}{" "}
          <span style={{ color: "#00ffc8" }}>{tx.titleAccent}</span>
        </h2>

        {/* ── Stats grid ─────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}>
          {STAT_CONFIGS.map((cfg, i) => {
            const isFlashing = flashing[cfg.key];
            return (
              <div
                key={cfg.key}
                style={{
                  background: "rgba(0,255,200,.03)",
                  border: `1px solid ${isFlashing ? "#00ffc8" : "rgba(0,255,200,.08)"}`,
                  borderRadius: "12px",
                  padding: "24px",
                  transition: "border-color .2s",
                  animation: isFlashing
                    ? "liveStatFlash 0.5s ease forwards"
                    : `liveFadeSlide .5s ease ${i * 80}ms both`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Value */}
                <div style={{
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 800,
                  fontSize: "clamp(22px,3vw,32px)",
                  color: "#00ffc8",
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}>
                  {formatValue(cfg.key)}
                </div>

                {/* Label */}
                <p style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "10px",
                  color: "rgba(255,255,255,.4)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  lineHeight: 1.4,
                }}>
                  {statLabels[cfg.key]}
                </p>

                {/* Live dot on ticking stats */}
                {!cfg.fixed && (
                  <span style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 6px #4ade80",
                    animation: "livePulse 2s ease-in-out infinite",
                    display: "inline-block",
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
