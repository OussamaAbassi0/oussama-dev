"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ── Translations ──────────────────────────────────────────────── */
const TRANS: Record<string, {
  sectionLabel: string;
  title: string;
  titleAccent: string;
}> = {
  fr: {
    sectionLabel: "// Mon Stack Tech",
    title: "Les outils qui font",
    titleAccent: "la différence",
  },
  en: {
    sectionLabel: "// My Tech Stack",
    title: "The tools that make",
    titleAccent: "the difference",
  },
  ar: {
    sectionLabel: "// مجموعة أدواتي التقنية",
    title: "الأدوات التي تصنع",
    titleAccent: "الفرق",
  },
  es: {
    sectionLabel: "// Mi Stack Tecnológico",
    title: "Las herramientas que marcan",
    titleAccent: "la diferencia",
  },
  nl: {
    sectionLabel: "// Mijn Tech Stack",
    title: "De tools die het verschil",
    titleAccent: "maken",
  },
};

/* ── Category colors ───────────────────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  "Frontend":     "#00e5ff",
  "IA & Agents":  "#a78bfa",
  "Automation":   "#00ffc8",
  "Data":         "#f5a623",
  "Backend":      "#4ade80",
};

/* ── Tool emoji map ────────────────────────────────────────────── */
const TOOL_EMOJIS: Record<string, string> = {
  "Next.js":         "⚡",
  "React":           "⚛️",
  "TailwindCSS":     "🎨",
  "Vercel":          "▲",
  "Anthropic":       "🤖",
  "OpenAI":          "🧠",
  "CrewAI":          "👥",
  "LangGraph":       "🕸️",
  "RAG":             "📚",
  "n8n":             "🔄",
  "Make":            "🔧",
  "Webhooks":        "🪝",
  "Python":          "🐍",
  "Playwright":      "🎭",
  "Firecrawl":       "🔥",
  "Apollo":          "🎯",
  "Tavily":          "🔍",
  "Google Maps API": "🗺️",
  "Prisma":          "🔷",
  "Neon (Postgres)": "🐘",
  "Qdrant":          "📦",
  "Resend":          "📧",
  "API REST":        "🌐",
  "HubSpot":         "🗂",
};

/* ── Stack data ────────────────────────────────────────────────── */
const STACK = [
  { cat: "Frontend",    items: ["Next.js", "React", "TailwindCSS", "Vercel"] },
  { cat: "IA & Agents", items: ["Anthropic", "OpenAI", "CrewAI", "LangGraph", "RAG"] },
  { cat: "Automation",  items: ["n8n", "Make", "Webhooks", "Python", "Playwright"] },
  { cat: "Data",        items: ["Firecrawl", "Apollo", "Tavily", "Google Maps API"] },
  { cat: "Backend",     items: ["Prisma", "Neon (Postgres)", "Qdrant", "Resend", "API REST"] },
];

/* ── Inject keyframes once ─────────────────────────────────────── */
const STYLE = `
@keyframes techStackFadeSlide {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

let styleInjected = false;

function injectStyle() {
  if (styleInjected || typeof document === "undefined") return;
  styleInjected = true;
  const el = document.createElement("style");
  el.textContent = STYLE;
  document.head.appendChild(el);
}

/* ── Component ─────────────────────────────────────────────────── */
export default function TechStackSection() {
  injectStyle();

  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx = TRANS[lang] ?? TRANS.fr;
  const isRTL = lang === "ar";

  /* hoveredCard: index of hovered card */
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  /* hoveredItem: "catIndex-itemIndex" */
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section
      style={{ padding: "100px 24px", background: "#050810" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        ref={ref}
        className="fade-in"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* ── Label ──────────────────────────────────────────── */}
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

        {/* ── Cards grid ─────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}>
          {STACK.map((stack, ci) => {
            const catColor = CAT_COLORS[stack.cat] ?? "#00ffc8";
            const isCardHovered = hoveredCard === ci;

            return (
              <div
                key={stack.cat}
                style={{
                  padding: "20px",
                  background: isCardHovered
                    ? `${catColor}08`
                    : "rgba(13,17,23,0.8)",
                  border: `1px solid ${isCardHovered ? catColor : "rgba(0,255,200,0.12)"}`,
                  backdropFilter: "blur(12px)",
                  borderRadius: "12px",
                  transition: "border-color .25s, background .25s, box-shadow .25s, transform .25s",
                  boxShadow: isCardHovered
                    ? `0 0 24px ${catColor}22, 0 4px 40px rgba(0,0,0,0.4)`
                    : "none",
                  transform: isCardHovered ? "translateY(-2px)" : "none",
                  animation: `techStackFadeSlide .5s ease ${ci * 100}ms both`,
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredCard(ci)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Category label */}
                <p style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "10px",
                  color: catColor,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                  fontWeight: 700,
                }}>
                  {stack.cat}
                </p>

                {/* Items */}
                {stack.items.map((item, ii) => {
                  const itemKey = `${ci}-${ii}`;
                  const isItemHovered = hoveredItem === itemKey;
                  const emoji = TOOL_EMOJIS[item] ?? "◆";

                  return (
                    <div
                      key={item}
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "12px",
                        color: isItemHovered ? catColor : "var(--text)",
                        padding: "7px 6px",
                        borderBottom: "1px solid rgba(0,255,200,0.08)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: isItemHovered ? `${catColor}15` : "transparent",
                        borderRadius: "4px",
                        transition: "color .2s, background .2s",
                        cursor: "default",
                      }}
                      onMouseEnter={() => setHoveredItem(itemKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span style={{ fontSize: "13px", flexShrink: 0, lineHeight: 1 }}>
                        {emoji}
                      </span>
                      {item}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
