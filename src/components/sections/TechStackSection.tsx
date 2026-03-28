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

function IconPlaywright({ size = 18 }: { size?: number }) {
  /* Official Playwright logo — Microsoft devicon source */
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill="#2D4552" d="M43.662 70.898c-4.124 1.17-6.829 3.222-8.611 5.272 1.707-1.494 3.993-2.865 7.077-3.739 3.155-.894 5.846-.888 8.069-.459v-1.739c-1.897-.173-4.072-.035-6.536.664ZM34.863 56.28l-15.314 4.035s.279.394.796.92l12.984-3.421s-.184 2.371-1.782 4.492c3.022-2.287 3.316-6.025 3.316-6.025Zm12.819 35.991C26.131 98.076 14.729 73.1 11.277 60.137 9.682 54.153 8.986 49.621 8.8 46.697a4.955 4.955 0 0 1 .011-.794c-1.118.068-1.653.649-1.544 2.328.186 2.923.882 7.454 2.477 13.44 3.45 12.961 14.854 37.937 36.405 32.132 4.691-1.264 8.215-3.565 10.86-6.504-2.438 2.202-5.49 3.937-9.327 4.972Zm4.05-51.276v1.534h8.453c-.173-.543-.348-1.032-.522-1.534h-7.932Z"/>
      <path fill="#2D4552" d="M62.074 53.627c3.802 1.08 5.812 3.745 6.875 6.104l4.239 1.204s-.578-8.255-8.045-10.376c-6.985-1.985-11.284 3.881-11.807 4.64 2.032-1.448 4.999-2.633 8.738-1.572Zm33.741 6.142c-6.992-1.994-11.289 3.884-11.804 4.633 2.034-1.446 4.999-2.632 8.737-1.566 3.796 1.081 5.804 3.743 6.87 6.104l4.245 1.208s-.588-8.257-8.048-10.379Zm-4.211 21.766-35.261-9.858s.382 1.935 1.846 4.441l29.688 8.3c2.444-1.414 3.726-2.883 3.726-2.883Zm-24.446 21.218c-27.92-7.485-24.544-43.059-20.027-59.916 1.86-6.947 3.772-12.11 5.358-15.572-.946-.195-1.73.304-2.504 1.878-1.684 3.415-3.837 8.976-5.921 16.76-4.516 16.857-7.892 52.429 20.027 59.914 13.159 3.525 23.411-1.833 31.053-10.247-7.254 6.57-16.515 10.253-27.986 7.182Z"/>
      <path fill="#E2574C" d="M51.732 83.935v-7.179l-19.945 5.656s1.474-8.563 11.876-11.514c3.155-.894 5.846-.888 8.069-.459V40.995h9.987c-1.087-3.36-2.139-5.947-3.023-7.744-1.461-2.975-2.96-1.003-6.361 1.842-2.396 2.001-8.45 6.271-17.561 8.726-9.111 2.457-16.476 1.805-19.55 1.273-4.357-.752-6.636-1.708-6.422 1.605.186 2.923.882 7.455 2.477 13.44 3.45 12.962 14.854 37.937 36.405 32.132 5.629-1.517 9.603-4.515 12.357-8.336h-8.309v.002Zm-32.185-23.62 15.316-4.035s-.446 5.892-6.188 7.405c-5.743 1.512-9.128-3.371-9.128-3.371Z"/>
      <path fill="#2EAD33" d="M109.372 41.336c-3.981.698-13.532 1.567-25.336-1.596-11.807-3.162-19.64-8.692-22.744-11.292-4.4-3.685-6.335-6.246-8.24-2.372-1.684 3.417-3.837 8.977-5.921 16.762-4.516 16.857-7.892 52.429 20.027 59.914 27.912 7.479 42.772-25.017 47.289-41.875 2.084-7.783 2.998-13.676 3.25-17.476.287-4.305-2.67-3.055-8.324-2.064ZM53.28 55.282s4.4-6.843 11.862-4.722c7.467 2.121 8.045 10.376 8.045 10.376L53.28 55.282Zm18.215 30.706c-13.125-3.845-15.15-14.311-15.15-14.311l35.259 9.858c0-.002-7.117 8.25-20.109 4.453Zm12.466-21.51s4.394-6.838 11.854-4.711c7.46 2.124 8.048 10.379 8.048 10.379l-19.902-5.668Z"/>
      <path fill="#D65348" d="M44.762 78.733 31.787 82.41s1.41-8.029 10.968-11.212l-7.347-27.573-.635.193c-9.111 2.457-16.476 1.805-19.55 1.273-4.357-.751-6.636-1.708-6.422 1.606.186 2.923.882 7.454 2.477 13.44 3.45 12.961 14.854 37.937 36.405 32.132l.635-.199-3.555-13.337ZM19.548 60.315l15.316-4.035s-.446 5.892-6.188 7.405c-5.743 1.512-9.128-3.371-9.128-3.371Z"/>
      <path fill="#1D8D22" d="m72.086 86.132-.594-.144c-13.125-3.844-15.15-14.311-15.15-14.311l18.182 5.082L84.15 39.77l-.116-.031c-11.807-3.162-19.64-8.692-22.744-11.292-4.4-3.685-6.335-6.246-8.24-2.372-1.682 3.417-3.836 8.977-5.92 16.762-4.516 16.857-7.892 52.429 20.027 59.914l.572.129 4.357-16.748Zm-18.807-30.85s4.4-6.843 11.862-4.722c7.467 2.121 8.045 10.376 8.045 10.376l-19.907-5.654Z"/>
      <path fill="#C04B41" d="m45.423 78.544-3.48.988c.822 4.634 2.271 9.082 4.545 13.011.396-.087.788-.163 1.192-.273a25.224 25.224 0 0 0 2.98-1.023c-2.541-3.771-4.222-8.114-5.237-12.702Zm-1.359-32.64c-1.788 6.674-3.388 16.28-2.948 25.915a20.061 20.061 0 0 1 2.546-.923l.644-.144c-.785-10.292.912-20.78 2.825-27.915a139.404 139.404 0 0 1 1.455-5.05 45.171 45.171 0 0 1-2.578 1.53 132.234 132.234 0 0 0-1.944 6.587Z"/>
    </svg>
  );
}

function IconQdrant({ size = 18 }: { size?: number }) {
  /* Official Qdrant logo — simple-icons source, brand color #DC244C */
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="m12 16.5 3.897-2.25v-4.5L12 7.5 8.103 9.75v4.5zM1.607 18 12 24l3.897-2.25v-4.5L12 19.5l-6.495-3.75v-7.5L12 4.5l6.495 3.75v15L22.393 21V6L12 0 1.607 6Z"/>
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
  "Playwright":      IconPlaywright,
  "Qdrant":          IconQdrant,
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
    /* Playwright has hardcoded fill colors — use opacity+filter instead of color */
    const isMultiColor = name === "Playwright";
    return (
      <span style={{
        color: isHovered ? catColor : "rgba(255,255,255,0.45)",
        opacity: isMultiColor ? (isHovered ? 1 : 0.45) : 1,
        filter: isMultiColor ? (isHovered ? "none" : "grayscale(1) brightness(1.4)") : "none",
        transition: "color .25s ease, opacity .25s ease, filter .25s ease",
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
