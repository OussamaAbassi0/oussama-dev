"use client";
import { useFadeIn } from "@/hooks/useFadeIn";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id:    "leadscout",
    emoji: "⚡",
    title: "LeadScout AI",
    sub:   "Agent Autonome B2B",
    desc:  "Agent autonome de Lead Generation. Recherche web, scraping ciblé et orchestration des données via un système multi-agents Python.",
    tags:  ["Python", "Systèmes Multi-Agents", "Scraping", "CI/CD"],
    href:  "https://lead-scout-ai-agent.vercel.app/",
    accent:"#00ffc8",
  },
  {
    id:    "talentscout",
    emoji: "🧠",
    title: "TalentScout AI",
    sub:   "ATS & IA",
    desc:  "Système complet de matching CV/offres et entretiens vocaux gérés par l'IA. Pipeline de recrutement entièrement automatisé.",
    tags:  ["Next.js", "OpenAI Whisper", "Automation", "Prisma"],
    href:  "https://talentscout-ai-seven.vercel.app/",
    accent:"#a78bfa",
  },
  {
    id:    "flowaudit",
    emoji: "🔷",
    title: "FlowAudit AI",
    sub:   "Générateur n8n",
    desc:  "SaaS transformant des processus métiers bruts en workflows n8n complets et monétisés. De la description textuelle au déploiement.",
    tags:  ["n8n", "Stripe", "ERP/Workflows", "IA Structurée"],
    href:  "https://flowaudit-ai.vercel.app/",
    accent:"#f5a623",
  },
];

const MARQUEE_ITEMS = [
  "Next.js",
  "Systèmes Multi-Agents",
  "Python",
  "OpenAI / Mistral AI",
  "CI/CD",
  "n8n Automatisation",
  "Playwright",
  "LangGraph",
  "Qdrant",
  "Firecrawl",
];

/* ══════════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════════ */
function Marquee() {
  /* On duplique les items pour un défilement infini sans saut */
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div style={{
      overflow:  "hidden",
      position:  "relative",
      padding:   "14px 0",
      borderTop:    "1px solid rgba(0,229,255,.08)",
      borderBottom: "1px solid rgba(0,229,255,.08)",
      marginBottom: "72px",
      /* Masques de fondu sur les bords */
      WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
             maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
    }}>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div style={{
        display:   "flex",
        width:     "max-content",
        animation: "marqueeScroll 28s linear infinite",
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display:    "flex",
            alignItems: "center",
            gap:        "0",
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily:    "var(--mono)",
              fontSize:      "11px",
              color:         "rgba(255,255,255,.38)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              padding:       "0 28px",
              whiteSpace:    "nowrap",
            }}>
              {item}
            </span>
            {/* Séparateur */}
            <span style={{
              width:      "4px",
              height:     "4px",
              borderRadius: "50%",
              background: "rgba(0,229,255,.35)",
              flexShrink: 0,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════════════ */
function ProjectCard({ project, idx }: { project: typeof PROJECTS[0]; idx: number }) {
  const { emoji, title, sub, desc, tags, href, accent } = project;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display:        "flex",
        flexDirection:  "column",
        background:     "#07090f",
        border:         "1px solid rgba(255,255,255,.07)",
        borderRadius:   "14px",
        padding:        "28px",
        textDecoration: "none",
        transition:     "border-color .25s, box-shadow .25s, transform .25s",
        cursor:         "pointer",
        position:       "relative",
        overflow:       "hidden",
        animationDelay: `${idx * 0.1}s`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${accent}55`;
        el.style.boxShadow   = `0 0 32px ${accent}14, 0 8px 32px rgba(0,0,0,.4)`;
        el.style.transform   = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,.07)";
        el.style.boxShadow   = "none";
        el.style.transform   = "translateY(0)";
      }}
    >
      {/* Accent glow coin haut-gauche */}
      <div style={{
        position:      "absolute",
        top:           "-40px",
        left:          "-40px",
        width:         "120px",
        height:        "120px",
        borderRadius:  "50%",
        background:    `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
        <div style={{
          width:          "46px",
          height:         "46px",
          borderRadius:   "10px",
          background:     `linear-gradient(135deg, ${accent}18, ${accent}08)`,
          border:         `1px solid ${accent}30`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       "20px",
          flexShrink:     0,
        }}>
          {emoji}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily:  "var(--sans)",
            fontWeight:  700,
            fontSize:    "16px",
            color:       "white",
            marginBottom:"2px",
            lineHeight:  1.2,
          }}>
            {title}
          </p>
          <p style={{
            fontFamily:    "var(--mono)",
            fontSize:      "10px",
            color:         accent,
            opacity:       0.75,
            letterSpacing: ".1em",
            textTransform: "uppercase",
          }}>
            {sub}
          </p>
        </div>

        {/* Arrow */}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, marginTop: "4px", opacity: .3, transition: "opacity .2s, transform .2s" }}
          className="card-arrow"
        >
          <path d="M3 13L13 3M13 3H6M13 3V10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "var(--sans)",
        fontSize:   "13px",
        color:      "rgba(255,255,255,.55)",
        lineHeight: 1.6,
        flex:       1,
        marginBottom: "20px",
      }}>
        {desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontFamily:    "var(--mono)",
            fontSize:      "10px",
            color:         accent,
            background:    `${accent}10`,
            border:        `1px solid ${accent}25`,
            borderRadius:  "4px",
            padding:       "3px 9px",
            letterSpacing: ".04em",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        display:     "flex",
        alignItems:  "center",
        gap:         "6px",
        fontFamily:  "var(--mono)",
        fontSize:    "12px",
        fontWeight:  700,
        color:       accent,
        letterSpacing: ".04em",
        marginTop:   "auto",
      }}>
        Voir le projet
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 11L11 1M11 1H4M11 1V8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       "20%",
        right:      "20%",
        height:     "1px",
        background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
      }} />
    </a>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function ProjectsSection() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section id="projects" style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <style>{`
        a:hover .card-arrow {
          opacity: .8 !important;
          transform: translate(2px, -2px);
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">

        {/* Header */}
        <p className="section-label">// SaaS & Systèmes Multi-Agents</p>
        <h2 className="section-title" style={{ marginBottom: "12px" }}>
          Projets en production
        </h2>
        <p style={{
          fontFamily:   "var(--mono)",
          fontSize:     "13px",
          color:        "var(--text-dim)",
          maxWidth:     "540px",
          lineHeight:   1.7,
          marginBottom: "48px",
        }}>
          Trois produits déployés sur Vercel, chacun combinant{" "}
          <span style={{ color: "var(--cyan)" }}>Python, IA générative et automatisation</span>{" "}
          pour résoudre des problèmes B2B réels.
        </p>

        {/* Marquee */}
        <Marquee />

        {/* Grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "20px",
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} idx={i} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop:   "36px",
          textAlign:   "center",
          fontFamily:  "var(--mono)",
          fontSize:    "11px",
          color:       "rgba(255,255,255,.18)",
          letterSpacing: ".08em",
        }}>
          // Tous les projets sont open à la démo sur demande · oussama.abassi.work@gmail.com
        </div>

      </div>
    </section>
  );
}
