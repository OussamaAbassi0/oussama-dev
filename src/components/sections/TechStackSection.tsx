"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════════════════ */
const TRANS: Record<string, { sectionLabel: string; title: string; titleAccent: string }> = {
  fr: { sectionLabel: "// Mon Stack Tech", title: "Les outils qui font", titleAccent: "la différence" },
  en: { sectionLabel: "// My Tech Stack",  title: "The tools that make", titleAccent: "the difference" },
  ar: { sectionLabel: "// مجموعة أدواتي التقنية", title: "الأدوات التي تصنع", titleAccent: "الفرق" },
  es: { sectionLabel: "// Mi Stack Tecnológico", title: "Las herramientas que marcan", titleAccent: "la diferencia" },
  nl: { sectionLabel: "// Mijn Tech Stack", title: "De tools die het verschil", titleAccent: "maken" },
};

/* ══════════════════════════════════════════════════════════
   CATEGORY COLORS
══════════════════════════════════════════════════════════ */
const CAT_COLORS: Record<string, string> = {
  "Frontend":     "#00e5ff",
  "IA & Agents":  "#a78bfa",
  "Automation":   "#00ffc8",
  "Data":         "#f5a623",
  "Backend":      "#4ade80",
};

/* ══════════════════════════════════════════════════════════
   SIMPLE ICONS CDN MAP (official brand logos)
   URL: https://cdn.simpleicons.org/{slug}
══════════════════════════════════════════════════════════ */
const SIMPLE_ICONS: Record<string, string> = {
  "Next.js":         "nextdotjs",
  "React":           "react",
  "TailwindCSS":     "tailwindcss",
  "Vercel":          "vercel",
  "Anthropic":       "anthropic",
  "OpenAI":          "openai",
  "n8n":             "n8n",
  "Make":            "make",
  "Python":          "python",
  "Prisma":          "prisma",
  "Resend":          "resend",
  "LangChain":       "langchain",
  "HubSpot":         "hubspot",
  "Slack":           "slack",
  "Notion":          "notion",
  "Stripe":          "stripe",
  "LinkedIn":        "linkedin",
  "Playwright":      "playwright",
  "Qdrant":          "qdrant",
};

/* ══════════════════════════════════════════════════════════
   CUSTOM SVG ICONS — tools not on Simple Icons
   viewBox="0 0 24 24", stroke-based (Lucide style)
══════════════════════════════════════════════════════════ */
function IconCrewAI({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="3"/>
      <circle cx="17" cy="8" r="2.2"/>
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6H2z"/>
      <path d="M17 14c2.7 0 5 1.8 5 4h-5"/>
    </svg>
  );
}

function IconLangGraph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="2.5" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="5.5" r="2.5" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="18.5" r="2.5" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" opacity="0.5"/>
      <line x1="7.5" y1="12" x2="10.2" y2="12"/>
      <line x1="13.8" y1="11.3" x2="16.7" y2="7.2"/>
      <line x1="13.8" y1="12.7" x2="16.7" y2="16.8"/>
    </svg>
  );
}

function IconRAG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="10" cy="6" rx="7" ry="2.5"/>
      <path d="M3 6v4c0 1.38 3.13 2.5 7 2.5 1.2 0 2.32-.13 3.3-.35"/>
      <path d="M3 10v4c0 1.38 3.13 2.5 7 2.5"/>
      <path d="M3 14v3c0 1.38 3.13 2.5 7 2.5"/>
      <circle cx="18.5" cy="17.5" r="3"/>
      <line x1="20.7" y1="19.7" x2="23" y2="22"/>
    </svg>
  );
}

function IconWebhooks({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function IconAPIRest({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3.5" width="20" height="5" rx="1.5"/>
      <rect x="2" y="10.5" width="20" height="5" rx="1.5"/>
      <rect x="2" y="17.5" width="20" height="3" rx="1.5"/>
      <circle cx="5.5" cy="6" r="1" fill="currentColor" stroke="none"/>
      <circle cx="5.5" cy="13" r="1" fill="currentColor" stroke="none"/>
      <circle cx="5.5" cy="19" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconFirecrawl({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 2c0 0-1.5 3-1 5.5C11 6 9.5 4 9.5 4 8 6 7 8.5 7 11c0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.2-1.2-4.2-3-5.5 0 1.5-.5 2.7-1.5 3C13.5 7 13.5 4 13.5 2z M9 20h6a6 6 0 0 0-3-5.2V15c0 1.1-.9 2-2 2H9a6 6 0 0 0-3 5.2L9 20z"/>
    </svg>
  );
}

function IconTavily({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.5" cy="10.5" r="7"/>
      <line x1="16.5" y1="16.5" x2="22" y2="22"/>
      <path d="M7.5 10.5h6" strokeWidth="1.8"/>
      <path d="M10.5 7.5v6" strokeWidth="1.8"/>
    </svg>
  );
}

function IconGoogleMaps({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" fill="currentColor" stroke="none" opacity="0.25"/>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconApollo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" opacity="0.4"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      <line x1="20.2" y1="12" x2="22" y2="12"/>
      <line x1="2" y1="12" x2="3.8" y2="12"/>
    </svg>
  );
}

function IconNeon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="6" rx="8" ry="3"/>
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
      <path d="M4 12v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"/>
      <path d="M12 9 L12 15" strokeWidth="2.5" stroke="currentColor" opacity="0.6"/>
    </svg>
  );
}


/* ══════════════════════════════════════════════════════════
   CUSTOM ICON MAP
══════════════════════════════════════════════════════════ */
const CUSTOM_ICON_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
  "CrewAI":          IconCrewAI,
  "LangGraph":       IconLangGraph,
  "RAG":             IconRAG,
  "Webhooks":        IconWebhooks,
  "API REST":        IconAPIRest,
  "Firecrawl":       IconFirecrawl,
  "Tavily":          IconTavily,
  "Google Maps API": IconGoogleMaps,
  "Apollo":          IconApollo,
  "Neon (Postgres)": IconNeon,
};

/* ══════════════════════════════════════════════════════════
   TECH ICON — CDN img or inline SVG
══════════════════════════════════════════════════════════ */
function TechIcon({
  name,
  size = 18,
  isHovered,
  catColor,
}: {
  name: string;
  size?: number;
  isHovered: boolean;
  catColor: string;
}) {
  const slug = SIMPLE_ICONS[name];
  const CustomIcon = CUSTOM_ICON_COMPONENTS[name];

  if (slug) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          objectFit: "contain",
          filter: isHovered
            ? "grayscale(0) opacity(1) drop-shadow(0 0 4px currentColor)"
            : "grayscale(1) brightness(1.6) opacity(0.55)",
          transition: "filter .25s ease",
        }}
      />
    );
  }

  if (CustomIcon) {
    return (
      <span style={{
        color: isHovered ? catColor : "rgba(255,255,255,0.45)",
        transition: "color .25s ease",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}>
        <CustomIcon size={size} />
      </span>
    );
  }

  /* fallback — diamond dot */
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="8" height="8" transform="rotate(45 12 12)"
        fill={isHovered ? catColor : "rgba(255,255,255,0.3)"}
        style={{ transition: "fill .25s" }}
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   STACK DATA
══════════════════════════════════════════════════════════ */
const STACK = [
  { cat: "Frontend",    items: ["Next.js", "React", "TailwindCSS", "Vercel"] },
  { cat: "IA & Agents", items: ["Anthropic", "OpenAI", "CrewAI", "LangGraph", "RAG"] },
  { cat: "Automation",  items: ["n8n", "Make", "Webhooks", "Python", "Playwright", "LinkedIn"] },
  { cat: "Data",        items: ["Firecrawl", "Apollo", "Tavily", "Google Maps API"] },
  { cat: "Backend",     items: ["Prisma", "Neon (Postgres)", "Qdrant", "Resend", "API REST"] },
];

/* ══════════════════════════════════════════════════════════
   KEYFRAMES
══════════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
export default function TechStackSection() {
  injectStyle();

  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx = TRANS[lang] ?? TRANS.fr;
  const isRTL = lang === "ar";

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section
      style={{ padding: "100px 24px", background: "#050810" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p style={{
          fontFamily: "'Courier New', monospace", fontSize: "11px",
          color: "rgba(0,255,200,.6)", letterSpacing: ".15em",
          textTransform: "uppercase", marginBottom: "16px",
        }}>
          {tx.sectionLabel}
        </p>

        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px,4.5vw,48px)", color: "white",
          lineHeight: 1.1, marginBottom: "48px",
        }}>
          {tx.title}{" "}
          <span style={{ color: "#00ffc8" }}>{tx.titleAccent}</span>
        </h2>

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
                  background: isCardHovered ? `${catColor}08` : "rgba(13,17,23,0.8)",
                  border: `1px solid ${isCardHovered ? catColor + "60" : "rgba(0,255,200,0.10)"}`,
                  backdropFilter: "blur(12px)",
                  borderRadius: "14px",
                  transition: "border-color .3s, background .3s, box-shadow .3s, transform .25s",
                  boxShadow: isCardHovered
                    ? `0 0 30px ${catColor}18, 0 4px 40px rgba(0,0,0,0.4)`
                    : "none",
                  transform: isCardHovered ? "translateY(-3px)" : "none",
                  animation: `techStackFadeSlide .5s ease ${ci * 100}ms both`,
                  cursor: "default",
                }}
                onMouseEnter={() => setHoveredCard(ci)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Category header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  marginBottom: "16px", paddingBottom: "12px",
                  borderBottom: `1px solid ${catColor}20`,
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: catColor,
                    boxShadow: isCardHovered ? `0 0 8px ${catColor}` : "none",
                    transition: "box-shadow .3s",
                  }} />
                  <p style={{
                    fontFamily: "'Courier New', monospace", fontSize: "10px",
                    color: catColor, letterSpacing: ".15em",
                    textTransform: "uppercase", fontWeight: 700, margin: 0,
                  }}>
                    {stack.cat}
                  </p>
                </div>

                {/* Items */}
                {stack.items.map((item, ii) => {
                  const itemKey = `${ci}-${ii}`;
                  const isItemHovered = hoveredItem === itemKey;

                  return (
                    <div
                      key={item}
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "12px",
                        color: isItemHovered ? catColor : "rgba(255,255,255,0.65)",
                        padding: "8px 6px",
                        borderBottom: ii < stack.items.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        background: isItemHovered ? `${catColor}12` : "transparent",
                        borderRadius: "6px",
                        transition: "color .2s, background .2s",
                        cursor: "default",
                        letterSpacing: ".02em",
                      }}
                      onMouseEnter={() => setHoveredItem(itemKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <TechIcon
                        name={item}
                        size={17}
                        isHovered={isItemHovered}
                        catColor={catColor}
                      />
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
