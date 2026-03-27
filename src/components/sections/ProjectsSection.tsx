"use client";
import { useState, useRef, useCallback, useEffect, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";
import {
  SAAS_PROJECTS, N8N_PROJECTS, STACK_COLORS,
  SaasProject, N8nProject,
} from "@/data/projects";

/* ══════════════════════════════════════════════════════════
   TILT WRAPPER — 3D perspective tilt on mouse move
══════════════════════════════════════════════════════════ */
function TiltWrap({
  children, color, className = "", style = {},
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -8;
    const ry = ((x - rect.width / 2) / rect.width) * 8;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    el.style.boxShadow = `
      0 32px 64px rgba(0,0,0,.55),
      0 0 0 1px ${color}40,
      0 0 50px ${color}18
    `;
  }, [color]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
    el.style.boxShadow = "0 4px 24px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.06)";
  }, []);

  return (
    <div
      ref={ref}
      className={`proj-card-wrap ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.12s ease, box-shadow 0.35s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.06)",
        willChange: "transform",
        borderRadius: "16px",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════════ */
function AnimCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const r = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let n = 0;
      const step = target / 45;
      const t = setInterval(() => {
        n += step;
        if (n >= target) { setV(target); clearInterval(t); } else setV(Math.floor(n));
      }, 28);
    }, { threshold: 0.5 });
    if (r.current) obs.observe(r.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={r}>{v}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   BENTO SAAS CARD — homepage featured mode
══════════════════════════════════════════════════════════ */
function BentoCard({
  project, lang, minH = 420,
}: {
  project: SaasProject;
  lang: string;
  minH?: number;
}) {
  const l = (o: Record<string, string>) => o[lang] ?? o.en;
  const isLive = project.liveUrl !== "#";
  const visibleStack = project.stack.slice(0, 4);
  const extraStack = project.stack.length - 4;

  return (
    <TiltWrap color={project.color} style={{ minHeight: `${minH}px`, display: "flex", flexDirection: "column", background: "#0a0e16" }}>
      {/* Color accent bar */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />

      {/* Screenshot */}
      <div style={{ flex: "0 0 200px", position: "relative", overflow: "hidden" }}>
        <Image
          src={project.screenshot}
          alt={project.screenshotAlt}
          fill
          className="proj-screenshot"
          style={{ objectFit: "cover" }}
          sizes="(max-width:768px) 100vw, 50vw"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        {/* Gradient fade to card */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, transparent 55%, #0a0e16 100%)`,
        }} />
        {/* Shimmer on hover */}
        <div className="proj-shimmer" />
        {/* Year badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          padding: "3px 10px", borderRadius: "20px",
          background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)",
          border: `1px solid ${project.color}30`,
          fontFamily: "var(--mono)", fontSize: "10px",
          color: project.color, letterSpacing: ".12em",
        }}>
          {project.year}
        </div>
        {/* Type badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          padding: "3px 10px", borderRadius: "20px",
          background: `${project.color}18`, backdropFilter: "blur(8px)",
          border: `1px solid ${project.color}30`,
          fontFamily: "var(--mono)", fontSize: "9px",
          color: project.color, letterSpacing: ".12em", textTransform: "uppercase",
        }}>
          {l(project.category)}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Name + tagline */}
        <div>
          <h3 style={{
            fontFamily: "var(--sans)", fontWeight: 800, fontSize: "22px",
            color: "#fff", marginBottom: "6px", lineHeight: 1.1,
          }}>
            {project.name}
          </h3>
          <p style={{
            fontFamily: "var(--sans)", fontSize: "13px",
            color: "rgba(255,255,255,.45)", lineHeight: 1.5,
          }}>
            {l(project.tagline)}
          </p>
        </div>

        {/* Metrics */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {project.metrics.map((m) => (
            <div key={m.label} style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 12px", borderRadius: "8px",
              background: `${project.color}0c`,
              border: `1px solid ${project.color}22`,
            }}>
              <span style={{ fontSize: "12px" }}>{m.icon}</span>
              <span style={{
                fontFamily: "var(--mono)", fontWeight: 700,
                fontSize: "12px", color: project.color,
              }}>{m.value}</span>
              <span style={{
                fontFamily: "var(--sans)", fontSize: "10px",
                color: "rgba(255,255,255,.3)",
              }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Stack pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {visibleStack.map((s) => (
            <span key={s} className="proj-stack-pill" style={{
              padding: "3px 10px", borderRadius: "20px",
              background: `${STACK_COLORS[s] ?? "#fff"}12`,
              border: `1px solid ${STACK_COLORS[s] ?? "#fff"}25`,
              fontFamily: "var(--mono)", fontSize: "10px",
              color: STACK_COLORS[s] ?? "rgba(255,255,255,.6)",
            }}>
              {s}
            </span>
          ))}
          {extraStack > 0 && (
            <span style={{
              padding: "3px 10px", borderRadius: "20px",
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              fontFamily: "var(--mono)", fontSize: "10px",
              color: "rgba(255,255,255,.3)",
            }}>
              +{extraStack}
            </span>
          )}
        </div>

        {/* CTA row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "auto", paddingTop: "12px",
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}>
          <Link href={`/projets/${project.id}`} style={{
            display: "flex", alignItems: "center", gap: "6px",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "11px",
            color: project.color, textDecoration: "none", letterSpacing: ".08em",
          }}>
            Voir le projet
            <span className="proj-arrow" style={{ color: project.color }}>→</span>
          </Link>
          {isLive && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", borderRadius: "20px",
              background: `${project.color}14`,
              border: `1px solid ${project.color}30`,
              fontFamily: "var(--mono)", fontSize: "10px",
              color: project.color, textDecoration: "none",
            }}>
              <span className="proj-status-dot" style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: project.color, display: "inline-block",
              }} />
              Live ↗
            </a>
          )}
        </div>
      </div>
    </TiltWrap>
  );
}

/* ══════════════════════════════════════════════════════════
   FULL SAAS CARD — /projets page
══════════════════════════════════════════════════════════ */
function FullSaasCard({ project, lang, index }: { project: SaasProject; lang: string; index: number }) {
  const l = (o: Record<string, string>) => o[lang] ?? o.en;
  const isLive = project.liveUrl !== "#";

  return (
    <TiltWrap
      color={project.color}
      style={{ background: "#0a0e16", cursor: "default", animation: `projectIn 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s both` }}
    >
      {/* Top accent bar */}
      <div style={{ height: "2px", background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      {/* Screenshot */}
      <Link href={`/projets/${project.id}`} style={{ display: "block", position: "relative", height: "180px", overflow: "hidden" }}>
        <Image
          src={project.screenshot}
          alt={project.screenshotAlt}
          fill
          className="proj-screenshot"
          style={{ objectFit: "cover" }}
          sizes="(max-width:768px) 100vw, 600px"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.parentElement as HTMLElement).style.background = `${project.color}0a`;
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #0a0e16 100%)" }} />
        <div className="proj-shimmer" />
        {/* Badges */}
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px" }}>
          <span style={{
            padding: "2px 8px", borderRadius: "20px",
            background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
            border: `1px solid ${project.color}30`,
            fontFamily: "var(--mono)", fontSize: "9px", color: project.color,
          }}>{project.year}</span>
          <span style={{
            padding: "2px 8px", borderRadius: "20px",
            background: `${project.color}18`, backdropFilter: "blur(8px)",
            border: `1px solid ${project.color}30`,
            fontFamily: "var(--mono)", fontSize: "9px", color: project.color,
            textTransform: "uppercase",
          }}>{project.type}</span>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "20px", color: "#fff", marginBottom: "4px" }}>
            {project.name}
          </h3>
          <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>
            {l(project.tagline)}
          </p>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {project.metrics.map((m) => (
            <div key={m.label} style={{
              padding: "10px 8px", borderRadius: "10px", textAlign: "center",
              background: `${project.color}08`, border: `1px solid ${project.color}1a`,
            }}>
              <div style={{ fontSize: "14px", marginBottom: "2px" }}>{m.icon}</div>
              <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px", color: project.color }}>{m.value}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: "9px", color: "rgba(255,255,255,.3)", marginTop: "2px", lineHeight: 1.3 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {project.stack.slice(0, 5).map((s) => (
            <span key={s} className="proj-stack-pill" style={{
              padding: "2px 8px", borderRadius: "20px",
              background: `${STACK_COLORS[s] ?? "#fff"}10`,
              border: `1px solid ${STACK_COLORS[s] ?? "#fff"}20`,
              fontFamily: "var(--mono)", fontSize: "9px",
              color: STACK_COLORS[s] ?? "rgba(255,255,255,.5)",
            }}>{s}</span>
          ))}
          {project.stack.length > 5 && (
            <span style={{
              padding: "2px 8px", borderRadius: "20px",
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.25)",
            }}>+{project.stack.length - 5}</span>
          )}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: "8px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
          <Link href={`/projets/${project.id}`} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            padding: "9px", borderRadius: "8px",
            background: `${project.color}14`, border: `1px solid ${project.color}30`,
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "11px",
            color: project.color, textDecoration: "none",
          }}>
            Étude de cas
            <span className="proj-arrow">→</span>
          </Link>
          {isLive && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
              padding: "9px 14px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,.08)",
              fontFamily: "var(--mono)", fontSize: "11px",
              color: "rgba(255,255,255,.4)", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              Live ↗
            </a>
          )}
        </div>
      </div>
    </TiltWrap>
  );
}

/* ══════════════════════════════════════════════════════════
   N8N COMPACT CARD — /projets page
══════════════════════════════════════════════════════════ */
function N8nCompactCard({ wf, lang, index }: { wf: N8nProject; lang: string; index: number }) {
  const [open, setOpen] = useState(false);
  const l = (o: Record<string, string>) => o[lang] ?? o.en;

  return (
    <div className="proj-card-wrap" style={{
      animation: `projectIn 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s both`,
      background: "#0a0e16",
      border: `1px solid ${open ? wf.color + "30" : "rgba(255,255,255,.06)"}`,
      borderRadius: "14px", overflow: "hidden",
      transition: "border-color .3s ease",
      cursor: "pointer",
    }} onClick={() => setOpen(!open)}>
      {/* Top accent */}
      <div style={{ height: "2px", background: `linear-gradient(90deg, ${wf.color}, transparent)` }} />

      {/* Header */}
      <div style={{ padding: "18px 20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
        {/* Emoji */}
        <div style={{
          width: "44px", height: "44px", flexShrink: 0,
          borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
          background: `${wf.color}12`, border: `1px solid ${wf.color}22`,
          fontSize: "20px",
        }}>
          {wf.emoji}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h4 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "14px", color: "#fff", margin: 0 }}>
              {wf.name}
            </h4>
          </div>
          <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: wf.color, letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>
            {wf.category}
          </p>

          {/* Key result */}
          <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,.4)", lineHeight: 1.5, marginTop: "6px" }}>
            {l(wf.result)}
          </p>
        </div>

        {/* Chevron */}
        <div style={{
          width: "24px", height: "24px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
          fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.3)",
          transition: "transform .35s ease",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0,
        }}>
          ↓
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ padding: "0 20px 14px", display: "flex", gap: "8px" }}>
        {wf.metrics.map((m) => (
          <div key={m.label} style={{
            flex: 1, padding: "8px", borderRadius: "8px", textAlign: "center",
            background: `${wf.color}08`, border: `1px solid ${wf.color}18`,
          }}>
            <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px", color: wf.color }}>{m.val}</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: "9px", color: "rgba(255,255,255,.3)", marginTop: "2px" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Expandable detail */}
      <div className={`n8n-detail ${open ? "open" : ""}`}>
        <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { icon: "❌", label: lang === "fr" ? "Problème" : "Problem", text: l(wf.problem), bg: "rgba(255,77,109,.06)", border: "rgba(255,77,109,.15)" },
            { icon: "⚙️", label: lang === "fr" ? "Solution" : "Solution", text: l(wf.solution), bg: `${wf.color}06`, border: `${wf.color}18` },
            { icon: "✅", label: lang === "fr" ? "Résultat" : "Result", text: l(wf.result), bg: "rgba(74,222,128,.06)", border: "rgba(74,222,128,.15)" },
          ].map((row) => (
            <div key={row.label} style={{ padding: "10px 14px", background: row.bg, border: `1px solid ${row.border}`, borderRadius: "8px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px" }}>{row.icon}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.35)", letterSpacing: ".1em", textTransform: "uppercase" }}>{row.label}</span>
              </div>
              <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,.55)", lineHeight: 1.6, margin: 0 }}>{row.text}</p>
            </div>
          ))}
          {/* Stack */}
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "4px" }}>
            {wf.stack.map((s) => (
              <span key={s} style={{
                padding: "2px 8px", borderRadius: "20px",
                background: `${STACK_COLORS[s] ?? "#fff"}10`,
                border: `1px solid ${STACK_COLORS[s] ?? "#fff"}20`,
                fontFamily: "var(--mono)", fontSize: "9px",
                color: STACK_COLORS[s] ?? "rgba(255,255,255,.5)",
              }}>{s}</span>
            ))}
          </div>
          {/* Detail page link */}
          <Link href={`/projets/${wf.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "4px",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "10px",
              color: wf.color, textDecoration: "none", letterSpacing: ".08em",
            }}>
            Voir le détail complet <span className="proj-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT — ProjectsSection
══════════════════════════════════════════════════════════ */
const N8N_CATEGORIES = [
  { key: "all",       label: { fr: "Tous", en: "All" } },
  { key: "sales",     label: { fr: "Sales", en: "Sales" } },
  { key: "hr",        label: { fr: "RH", en: "HR" } },
  { key: "support",   label: { fr: "Support", en: "Support" } },
  { key: "marketing", label: { fr: "Marketing", en: "Marketing" } },
  { key: "ops",       label: { fr: "Ops / Finance", en: "Ops / Finance" } },
  { key: "ecommerce", label: { fr: "E-commerce", en: "E-commerce" } },
];

export default function ProjectsSection({ featured = false }: { featured?: boolean }) {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const [tab, setTab] = useState<"saas" | "n8n">("saas");
  const [n8nFilter, setN8nFilter] = useState("all");

  const l = (o: Record<string, string>) => o[lang] ?? o.en ?? "";

  const filteredN8n = n8nFilter === "all"
    ? N8N_PROJECTS
    : N8N_PROJECTS.filter((w) => w.categoryKey === n8nFilter);

  /* ── FEATURED MODE (homepage) ── */
  if (featured) {
    return (
      <section id="projects" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
        <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Header */}
          <p className="section-label">// {l({ fr: "Projets récents", en: "Recent projects" })}</p>
          <h2 className="section-title">
            {l({ fr: "Ce que j'ai construit.", en: "What I've built." })}<br />
            <span className="text-cyan">{l({ fr: "Testez-le vous-même.", en: "Test it yourself." })}</span>
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "rgba(255,255,255,.45)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "56px" }}>
            {l({ fr: "4 projets live — SaaS full-stack et agents IA. Pas des démos, des vrais produits avec des vrais résultats.", en: "4 live projects — full-stack SaaS and AI agents. Not demos, real products with real results." })}
          </p>

          {/* BENTO GRID — zigzag layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Row 1 : 3fr + 2fr */}
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "20px" }}>
              <BentoCard project={SAAS_PROJECTS[0]} lang={lang} minH={440} />
              <BentoCard project={SAAS_PROJECTS[1]} lang={lang} minH={380} />
            </div>
            {/* Row 2 : 2fr + 3fr (zigzag) */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "20px" }}>
              <BentoCard project={SAAS_PROJECTS[2]} lang={lang} minH={380} />
              <BentoCard project={SAAS_PROJECTS[3]} lang={lang} minH={440} />
            </div>
          </div>

          {/* CTA vers /projets */}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/projets" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "13px 32px", borderRadius: "10px",
              border: "1px solid rgba(0,255,200,.25)",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
              color: "var(--cyan)", textDecoration: "none", letterSpacing: ".08em",
              background: "rgba(0,255,200,.04)",
              transition: "all .3s ease",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,.25)";
              }}
            >
              {l({ fr: "Voir tous les projets + 13 automatisations n8n", en: "See all projects + 13 n8n automations" })}
              <span className="proj-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ── FULL MODE (/projets page) ── */
  return (
    <section id="projects" style={{ padding: "80px 24px 100px", background: "var(--bg)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <p className="section-label">// {l({ fr: "Portfolio complet", en: "Full portfolio" })}</p>
        <h2 className="section-title">
          {l({ fr: "17 projets livrés.", en: "17 projects delivered." })}<br />
          <span className="text-cyan">{l({ fr: "Des résultats mesurables.", en: "Measurable results." })}</span>
        </h2>
        <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "rgba(255,255,255,.45)", maxWidth: "560px", lineHeight: 1.7, marginBottom: "48px" }}>
          {l({ fr: "4 SaaS et agents IA live + 13 automatisations n8n déployées en production chez des clients.", en: "4 live SaaS and AI agents + 13 n8n automations deployed in production for clients." })}
        </p>

        {/* Main tab switcher */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "48px", padding: "4px", background: "rgba(255,255,255,.04)", borderRadius: "12px", width: "fit-content" }}>
          {([
            { id: "saas", label: { fr: "SaaS & Agents IA", en: "SaaS & AI Agents" }, count: SAAS_PROJECTS.length },
            { id: "n8n",  label: { fr: "Automatisations n8n", en: "n8n Automations" }, count: N8N_PROJECTS.length },
          ] as const).map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 24px", borderRadius: "8px",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
              cursor: "pointer", border: "none", letterSpacing: ".06em",
              transition: "all .25s ease",
              background: tab === t.id ? "var(--cyan)" : "transparent",
              color:       tab === t.id ? "#050810"   : "rgba(255,255,255,.4)",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              {l(t.label)}
              <span style={{
                padding: "1px 7px", borderRadius: "10px", fontSize: "10px",
                background: tab === t.id ? "rgba(0,0,0,.2)" : "rgba(255,255,255,.08)",
                color: tab === t.id ? "#050810" : "rgba(255,255,255,.35)",
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── SaaS Tab ── */}
        {tab === "saas" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {SAAS_PROJECTS.map((p, i) => (
              <FullSaasCard key={p.id} project={p} lang={lang} index={i} />
            ))}
          </div>
        )}

        {/* ── N8n Tab ── */}
        {tab === "n8n" && (
          <>
            {/* Category filter */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
              {N8N_CATEGORIES.map((c) => (
                <button key={c.key} onClick={() => setN8nFilter(c.key)} style={{
                  padding: "7px 16px", borderRadius: "20px", cursor: "pointer",
                  fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700,
                  letterSpacing: ".08em", border: "none", transition: "all .2s ease",
                  background: n8nFilter === c.key ? "rgba(0,255,200,.15)" : "rgba(255,255,255,.04)",
                  color:       n8nFilter === c.key ? "var(--cyan)"          : "rgba(255,255,255,.35)",
                  boxShadow:   n8nFilter === c.key ? "0 0 0 1px rgba(0,255,200,.3)" : "0 0 0 1px rgba(255,255,255,.06)",
                }}>
                  {l(c.label)}
                  {c.key !== "all" && (
                    <span style={{ marginLeft: "5px", opacity: .5 }}>
                      ({N8N_PROJECTS.filter((w) => w.categoryKey === c.key).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* N8n grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px" }}>
              {filteredN8n.map((wf, i) => (
                <N8nCompactCard key={wf.id} wf={wf} lang={lang} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Stats bar */}
        <div style={{
          marginTop: "64px", padding: "24px 32px",
          background: "rgba(0,255,200,.03)", border: "1px solid rgba(0,255,200,.1)",
          borderRadius: "14px", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "48px", flexWrap: "wrap",
        }}>
          {[
            { icon: "📅", val: "2022", label: l({ fr: "Dans ce domaine depuis", en: "In this field since" }) },
            { icon: "🚀", val: "17+",  label: l({ fr: "Projets livrés", en: "Projects delivered" }) },
            { icon: "🛠", val: "20+",  label: l({ fr: "Technologies maîtrisées", en: "Technologies mastered" }) },
            { icon: "⭐", val: "5/5",  label: l({ fr: "Note Malt & Upwork", en: "Malt & Upwork rating" }) },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "22px", color: "var(--cyan)" }}>{s.val}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "rgba(255,255,255,.3)", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
