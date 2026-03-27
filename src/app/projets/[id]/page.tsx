"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/LangContext";
import { SAAS_PROJECTS, N8N_PROJECTS, STACK_COLORS, SaasProject, N8nProject } from "@/data/projects";

/* ──────────────────────────────────────────────
   HOOKS
────────────────────────────────────────────── */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, visible: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);
  return val;
}

/* ──────────────────────────────────────────────
   BACK NAV
────────────────────────────────────────────── */
function BackNav({ color, category, year }: { color: string; category: string; year?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px", flexWrap: "wrap" }}>
      <Link href="/projets" style={{
        display: "flex", alignItems: "center", gap: "6px",
        fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.35)",
        textDecoration: "none", letterSpacing: ".1em", transition: "color .2s",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.35)"; }}
      >
        ← Projets
      </Link>
      <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,.1)" }} />
      <span style={{
        padding: "3px 12px", borderRadius: "20px",
        background: `${color}14`, border: `1px solid ${color}30`,
        fontFamily: "var(--mono)", fontSize: "10px", color: color, letterSpacing: ".1em",
      }}>{category}</span>
      {year && (
        <span style={{
          padding: "3px 12px", borderRadius: "20px",
          background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
          fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.3)",
        }}>{year}</span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   TECH STACK ROW
────────────────────────────────────────────── */
function StackRow({ stack, color }: { stack: string[]; color: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {stack.map((s, i) => (
        <div key={s} style={{
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 18px", borderRadius: "10px",
          background: `${STACK_COLORS[s] ?? "#fff"}0a`,
          border: `1px solid ${STACK_COLORS[s] ?? "#fff"}20`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`,
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${STACK_COLORS[s] ?? "#fff"}18`;
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = `${STACK_COLORS[s] ?? "#fff"}0a`;
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          <div style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: STACK_COLORS[s] ?? color,
            boxShadow: `0 0 8px ${STACK_COLORS[s] ?? color}`,
          }} />
          <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px", color: STACK_COLORS[s] ?? "rgba(255,255,255,.7)" }}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   WORKFLOW FLOW VISUALIZER (pour n8n)
────────────────────────────────────────────── */
function WorkflowFlow({ steps, color }: { steps: { icon: string; label: string; sub: string }[]; color: string }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const t = setInterval(() => {
      setActive(prev => {
        if (prev >= steps.length - 1) { clearInterval(t); return prev; }
        return prev + 1;
      });
      i++;
      if (i >= steps.length) clearInterval(t);
    }, 600);
    return () => clearInterval(t);
  }, [visible, steps.length]);

  return (
    <div ref={ref} style={{ overflowX: "auto", paddingBottom: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0", minWidth: "fit-content", padding: "4px" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            {/* Node */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              padding: "16px 20px", borderRadius: "12px", minWidth: "120px",
              background: active >= i ? `${color}12` : "rgba(255,255,255,.03)",
              border: `1px solid ${active >= i ? color + "40" : "rgba(255,255,255,.07)"}`,
              boxShadow: active >= i ? `0 0 20px ${color}15` : "none",
              transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.85)",
              transitionDelay: `${i * 0.15}s`,
            }}>
              <span style={{ fontSize: "22px" }}>{step.icon}</span>
              <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "11px", color: active >= i ? color : "rgba(255,255,255,.3)", textAlign: "center", letterSpacing: ".05em" }}>
                {step.label}
              </span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "9px", color: "rgba(255,255,255,.25)", textAlign: "center" }}>
                {step.sub}
              </span>
            </div>
            {/* Arrow */}
            {i < steps.length - 1 && (
              <div style={{
                display: "flex", alignItems: "center", padding: "0 4px",
                position: "relative", width: "48px", flexShrink: 0,
              }}>
                <div style={{
                  height: "2px", width: "100%",
                  background: active > i
                    ? `linear-gradient(90deg, ${color}, ${color}60)`
                    : "rgba(255,255,255,.08)",
                  transition: "background 0.4s ease",
                  transitionDelay: `${(i + 1) * 0.15}s`,
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {active > i && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent)`,
                      animation: "shimmer 1.5s ease infinite",
                    }} />
                  )}
                </div>
                <span style={{
                  position: "absolute", right: "0",
                  fontFamily: "var(--mono)", fontSize: "14px",
                  color: active > i ? color : "rgba(255,255,255,.12)",
                  transition: "color 0.4s ease",
                  transitionDelay: `${(i + 1) * 0.15}s`,
                }}>›</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   BEFORE / AFTER CARD
────────────────────────────────────────────── */
function BeforeAfter({ before, after, color, lang }: { before: string; after: string; color: string; lang: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {[
        { label: lang === "fr" ? "Avant" : "Before", text: before, accent: "#ff4d6d", icon: "❌" },
        { label: lang === "fr" ? "Après" : "After", text: after, accent: color, icon: "✅" },
      ].map((side, i) => (
        <div key={side.label} style={{
          padding: "24px", borderRadius: "14px",
          background: `${side.accent}07`, border: `1px solid ${side.accent}20`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity .6s ease ${i * 0.15}s, transform .6s ease ${i * 0.15}s`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "16px" }}>{side.icon}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: side.accent, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 700 }}>
              {side.label}
            </span>
          </div>
          <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,.6)", lineHeight: 1.7, margin: 0 }}>
            {side.text}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   ANIMATED STAT BOX
────────────────────────────────────────────── */
function StatBox({ icon, rawValue, label, color, delay = 0 }: { icon: string; rawValue: string; label: string; color: string; delay?: number }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.4);
  const numMatch = rawValue.match(/\d+/);
  const num = numMatch ? parseInt(numMatch[0]) : null;
  const prefix = numMatch ? rawValue.slice(0, rawValue.indexOf(numMatch[0])) : "";
  const suffix = numMatch ? rawValue.slice(rawValue.indexOf(numMatch[0]) + numMatch[0].length) : rawValue;
  const counted = useCountUp(num ?? 0, visible);

  return (
    <div ref={ref} style={{
      flex: "1 1 160px", padding: "28px 20px", borderRadius: "14px", textAlign: "center",
      background: `${color}08`, border: `1px solid ${color}20`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s`,
    }}>
      <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
      <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "34px", color, lineHeight: 1, letterSpacing: "-.02em" }}>
        {prefix}{num !== null ? counted : rawValue}{num !== null ? suffix : ""}
      </div>
      <div style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,.35)", marginTop: "10px", lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   NARRATIVE SECTION (Problem → Solution → Impact)
────────────────────────────────────────────── */
function NarrativeStep({ icon, accentColor, title, body, delay = 0, connector = true }: {
  icon: string; accentColor: string; title: string; body: string; delay?: number; connector?: boolean;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  return (
    <div style={{ display: "flex", gap: "20px", position: "relative" }}>
      {/* Left column: icon + connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "52px", height: "52px", borderRadius: "16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${accentColor}14`, border: `1px solid ${accentColor}35`,
          fontSize: "22px", flexShrink: 0,
          boxShadow: `0 0 24px ${accentColor}20`,
        }}>
          {icon}
        </div>
        {connector && (
          <div style={{
            width: "2px", flex: 1, minHeight: "40px",
            background: `linear-gradient(to bottom, ${accentColor}40, transparent)`,
            marginTop: "8px",
          }} />
        )}
      </div>

      {/* Right: content */}
      <div ref={ref} style={{
        flex: 1, paddingBottom: connector ? "32px" : "0",
        paddingTop: "4px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity .7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform .7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: accentColor, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700 }}>
          {title}
        </p>
        <p style={{ fontFamily: "var(--sans)", fontSize: "16px", color: "rgba(255,255,255,.65)", lineHeight: 1.8, margin: 0 }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   CTA SECTION
────────────────────────────────────────────── */
function ProjectCTA({ color, isN8n, lang }: { color: string; isN8n: boolean; lang: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <section style={{ padding: "80px 24px", background: "var(--bg2)", borderTop: "1px solid rgba(255,255,255,.05)" }}>
      <div ref={ref} style={{
        maxWidth: "600px", margin: "0 auto", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .8s ease, transform .8s ease",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "5px 16px", borderRadius: "20px", marginBottom: "24px",
          background: `${color}12`, border: `1px solid ${color}25`,
          fontFamily: "var(--mono)", fontSize: "10px", color, letterSpacing: ".15em",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, animation: "livePulse 2s infinite" }} />
          {lang === "fr" ? "Disponible maintenant" : "Available now"}
        </div>
        <h2 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "clamp(24px,4vw,38px)", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
          {isN8n
            ? (lang === "fr" ? "Ce workflow adapté à votre business." : "This workflow adapted to your business.")
            : (lang === "fr" ? "Un projet similaire en tête ?" : "A similar project in mind?")
          }
          <br />
          <span style={{ color }}>{lang === "fr" ? "Livraison en moins de 7 jours." : "Delivery in less than 7 days."}</span>
        </h2>
        <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: "36px" }}>
          {isN8n
            ? (lang === "fr" ? "J'adapte ce workflow à vos outils et votre processus exact. Brief → Démo → Livraison." : "I adapt this workflow to your tools and exact process. Brief → Demo → Delivery.")
            : (lang === "fr" ? "Stack identique, expérience déjà acquise — je peux démarrer immédiatement." : "Same stack, already acquired experience — I can start immediately.")
          }
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/#cta" style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "14px 32px", borderRadius: "10px", background: color, color: "#050810",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
            textDecoration: "none", letterSpacing: ".06em", transition: "opacity .2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".85"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            {lang === "fr" ? "Démarrer ce projet" : "Start this project"} →
          </Link>
          <Link href="/projets" style={{
            padding: "14px 28px", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,.1)",
            fontFamily: "var(--mono)", fontSize: "13px", color: "rgba(255,255,255,.45)",
            textDecoration: "none", transition: "all .2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.25)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.45)"; }}
          >
            {lang === "fr" ? "Voir tous les projets" : "All projects"}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE SAAS — expérience immersive par projet
══════════════════════════════════════════════════════════ */
function SaasPage({ p }: { p: SaasProject }) {
  const { lang } = useLang();
  const L = (o: Record<string, string>) => o[lang] ?? o.en ?? "";
  const isLive = p.liveUrl !== "#";
  const [imgErr, setImgErr] = useState(false);

  // Thème visuel par projet
  const themes: Record<string, { bgPattern: string; heroEmoji: string }> = {
    flowaudit:   { bgPattern: "radial", heroEmoji: "⚡" },
    leadscout:   { bgPattern: "matrix", heroEmoji: "🔍" },
    talentscout: { bgPattern: "grid",   heroEmoji: "🧠" },
    darkosclaw:  { bgPattern: "cyber",  heroEmoji: "🖤" },
  };
  const theme = themes[p.id] ?? { bgPattern: "radial", heroEmoji: "🚀" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "110px 24px 70px", overflow: "hidden" }}>
        {/* Background thématique */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 90% 70% at 60% -20%, ${p.color}10 0%, transparent 65%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        {/* Orbe couleur flottant */}
        <div style={{
          position: "absolute", right: "5%", top: "15%",
          width: "380px", height: "380px", borderRadius: "50%",
          background: `radial-gradient(circle, ${p.color}10 0%, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
          animation: "floatLoop 8s ease-in-out infinite",
        }} />

        <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <BackNav color={p.color} category={L(p.category)} year={p.year} />

          {/* Layout split: text left, badge right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "flex-start" }}>
            <div>
              {/* Type badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "20px",
                padding: "4px 14px", borderRadius: "20px",
                background: `${p.color}14`, border: `1px solid ${p.color}30`,
                fontFamily: "var(--mono)", fontSize: "10px", color: p.color, letterSpacing: ".12em",
              }}>
                <span style={{ fontSize: "14px" }}>{theme.heroEmoji}</span>
                {p.type === "saas" ? "SaaS · Full-Stack" : "Agent IA · Autonome"}
              </div>

              <h1 className="proj-hero-text" style={{
                fontFamily: "var(--sans)", fontWeight: 800,
                fontSize: "clamp(38px,6vw,76px)", color: "#fff",
                lineHeight: 1.0, marginBottom: "10px",
              }}>
                {p.name}
              </h1>
              <p className="proj-hero-text-delay" style={{
                fontFamily: "var(--sans)", fontSize: "clamp(17px,2vw,22px)",
                color: p.color, marginBottom: "20px", fontWeight: 500,
              }}>
                {L(p.tagline)}
              </p>
              <p style={{
                fontFamily: "var(--sans)", fontSize: "16px",
                color: "rgba(255,255,255,.5)", maxWidth: "560px", lineHeight: 1.8,
              }}>
                {L(p.desc)}
              </p>

              {/* CTAs */}
              <div className="proj-hero-metrics" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
                {isLive && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "10px",
                    background: p.color, color: "#050810",
                    fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
                    textDecoration: "none", letterSpacing: ".06em", transition: "opacity .2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".85"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#050810", animation: "livePulse 2s infinite", display: "inline-block" }} />
                    Voir le projet live ↗
                  </a>
                )}
                <Link href="/#cta" style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "13px 24px", borderRadius: "10px",
                  border: `1px solid ${p.color}30`,
                  fontFamily: "var(--mono)", fontSize: "13px", color: p.color,
                  textDecoration: "none", transition: "all .2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${p.color}10`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  Projet similaire ?
                </Link>
              </div>
            </div>

            {/* Floating year badge */}
            <div style={{
              padding: "20px 24px", borderRadius: "16px",
              background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
              backdropFilter: "blur(12px)", textAlign: "center",
              animation: "floatLoop 6s ease-in-out infinite 1s",
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.3)", marginBottom: "4px", letterSpacing: ".15em" }}>ANNÉE</div>
              <div style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "32px", color: p.color }}>{p.year}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT ── */}
      <section style={{ padding: "0 24px 72px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div className="proj-hero-img" style={{
            borderRadius: "18px", overflow: "hidden",
            border: `1px solid ${p.color}18`,
            boxShadow: `0 40px 100px rgba(0,0,0,.6), 0 0 0 1px ${p.color}10, 0 0 60px ${p.color}08`,
            background: `${p.color}06`, minHeight: "200px",
          }}>
            {!imgErr ? (
              <Image
                src={p.screenshot} alt={p.screenshotAlt}
                width={960} height={540}
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={() => setImgErr(true)}
              />
            ) : (
              <div style={{ height: "320px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                <div style={{ fontSize: "56px" }}>{theme.heroEmoji}</div>
                <p style={{ fontFamily: "var(--mono)", fontSize: "14px", color: p.color }}>{p.name}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── KEY METRICS ── */}
      <section style={{ padding: "0 24px 72px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "32px" }}>
            // {lang === "fr" ? "Résultats mesurables" : "Key results"}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {p.metrics.map((m, i) => (
              <StatBox key={m.label} icon={m.icon} rawValue={m.value} label={m.label} color={p.color} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NARRATIVE : problème → solution → impact ── */}
      <section style={{ padding: "0 24px 72px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "44px" }}>
            // {lang === "fr" ? "L'histoire du projet" : "Project story"}
          </p>
          <NarrativeStep
            icon="❌" accentColor="#ff4d6d"
            title={lang === "fr" ? "Le problème" : "The challenge"}
            body={L(p.challenge)} delay={0}
          />
          <NarrativeStep
            icon="⚙️" accentColor={p.color}
            title={lang === "fr" ? "La solution" : "The solution"}
            body={L(p.solution)} delay={0.1}
          />
          <NarrativeStep
            icon="✅" accentColor="#4ade80"
            title={lang === "fr" ? "L'impact" : "The impact"}
            body={L(p.impact)} delay={0.2} connector={false}
          />
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "28px" }}>
            // Tech stack
          </p>
          <StackRow stack={p.stack} color={p.color} />
        </div>
      </section>

      <ProjectCTA color={p.color} isN8n={false} lang={lang} />
      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE N8N — expérience immersive avec visualisation workflow
══════════════════════════════════════════════════════════ */
function N8nPage({ wf }: { wf: N8nProject }) {
  const { lang } = useLang();
  const L = (o: Record<string, string>) => o[lang] ?? o.en ?? "";

  // Steps du workflow déduits de la stack
  const buildSteps = () => {
    const steps: { icon: string; label: string; sub: string }[] = [];
    // Trigger
    if (wf.stack.includes("LinkedIn"))     steps.push({ icon: "🔗", label: "LinkedIn",      sub: "Trigger" });
    else if (wf.stack.includes("Typeform")) steps.push({ icon: "📋", label: "Typeform",      sub: "Formulaire" });
    else if (wf.stack.includes("Gmail"))    steps.push({ icon: "📧", label: "Gmail",          sub: "Trigger" });
    else if (wf.stack.includes("Stripe"))   steps.push({ icon: "💳", label: "Stripe",         sub: "Paiement" });
    else if (wf.stack.includes("Shopify"))  steps.push({ icon: "🛒", label: "Shopify",        sub: "Événement" });
    else if (wf.stack.includes("Twitter/X")) steps.push({ icon: "📡", label: "Social",        sub: "Scan" });
    else                                    steps.push({ icon: "⚡", label: "Trigger",         sub: "Entrée" });
    // Process n8n
    steps.push({ icon: "⚙️", label: "n8n", sub: "Workflow" });
    // IA si présente
    if (wf.stack.some(s => s.includes("GPT") || s.includes("OpenAI")))
      steps.push({ icon: "🧠", label: "GPT-4o", sub: "Analyse IA" });
    if (wf.stack.includes("Apollo"))
      steps.push({ icon: "🎯", label: "Apollo", sub: "Enrichissement" });
    // Outputs
    if (wf.stack.includes("HubSpot"))      steps.push({ icon: "📊", label: "HubSpot",       sub: "CRM" });
    if (wf.stack.includes("Slack"))        steps.push({ icon: "💬", label: "Slack",          sub: "Alerte" });
    if (wf.stack.includes("Notion"))       steps.push({ icon: "📝", label: "Notion",         sub: "Base" });
    if (wf.stack.includes("Calendly"))     steps.push({ icon: "📅", label: "Calendly",       sub: "RDV" });
    if (wf.stack.includes("Zendesk"))      steps.push({ icon: "🎫", label: "Zendesk",        sub: "Ticket" });
    if (wf.stack.includes("Twilio"))       steps.push({ icon: "📱", label: "Twilio",         sub: "SMS" });
    // Result
    steps.push({ icon: "✅", label: "Résultat", sub: "Automatisé" });
    return steps.slice(0, 7); // max 7 nœuds
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "110px 24px 70px", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 100% 80% at 50% -10%, ${wf.color}12 0%, transparent 65%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        {/* Orbe flottant */}
        <div style={{
          position: "absolute", right: "8%", top: "20%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: `radial-gradient(circle, ${wf.color}10 0%, transparent 70%)`,
          filter: "blur(50px)", pointerEvents: "none",
          animation: "floatLoop 7s ease-in-out infinite",
        }} />

        <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <BackNav color={wf.color} category="n8n Automation" />

          {/* Emoji + Title */}
          <div className="proj-hero-text" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px", flexWrap: "wrap" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "22px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `${wf.color}14`, border: `1px solid ${wf.color}30`,
              fontSize: "38px", flexShrink: 0,
              boxShadow: `0 0 40px ${wf.color}20`,
              animation: "floatLoop 5s ease-in-out infinite",
            }}>
              {wf.emoji}
            </div>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "10px",
                padding: "3px 12px", borderRadius: "20px",
                background: `${wf.color}12`, border: `1px solid ${wf.color}25`,
                fontFamily: "var(--mono)", fontSize: "9px", color: wf.color, letterSpacing: ".15em",
              }}>
                {wf.category}
              </div>
              <h1 style={{
                fontFamily: "var(--sans)", fontWeight: 800,
                fontSize: "clamp(28px,5vw,60px)", color: "#fff", lineHeight: 1.05, margin: 0,
              }}>
                {wf.name}
              </h1>
            </div>
          </div>

          <p className="proj-hero-text-delay" style={{
            fontFamily: "var(--sans)", fontSize: "18px", color: "rgba(255,255,255,.5)",
            lineHeight: 1.8, maxWidth: "620px", marginBottom: "32px",
          }}>
            {L(wf.result)}
          </p>

          {/* Metrics hero */}
          <div className="proj-hero-metrics" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {wf.metrics.map((m, i) => (
              <StatBox key={m.label} icon={m.icon} rawValue={m.val} label={m.label} color={wf.color} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW VISUALIZATION ── */}
      <section style={{ padding: "0 24px 72px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "32px" }}>
            // {lang === "fr" ? "Comment fonctionne l'automatisation" : "How the automation works"}
          </p>
          <div style={{
            padding: "28px 24px", borderRadius: "16px",
            background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)",
          }}>
            <WorkflowFlow steps={buildSteps()} color={wf.color} />
          </div>
        </div>
      </section>

      {/* ── NARRATIVE ── */}
      <section style={{ padding: "0 24px 72px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "44px" }}>
            // {lang === "fr" ? "Problème · Solution · Résultat" : "Problem · Solution · Result"}
          </p>
          <NarrativeStep
            icon="❌" accentColor="#ff4d6d"
            title={lang === "fr" ? "Le problème" : "The challenge"}
            body={L(wf.problem)} delay={0}
          />
          <NarrativeStep
            icon="⚙️" accentColor={wf.color}
            title={lang === "fr" ? "La solution n8n" : "The n8n solution"}
            body={L(wf.solution)} delay={0.1}
          />
          <NarrativeStep
            icon="📈" accentColor="#4ade80"
            title={lang === "fr" ? "Le résultat" : "The result"}
            body={L(wf.result)} delay={0.2} connector={false}
          />
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.25)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "28px" }}>
            // {lang === "fr" ? "Outils & intégrations" : "Tools & integrations"}
          </p>
          <StackRow stack={wf.stack} color={wf.color} />
        </div>
      </section>

      <ProjectCTA color={wf.color} isN8n lang={lang} />
      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ROUTER
══════════════════════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const saas = SAAS_PROJECTS.find(p => p.id === id);
  if (saas) return <SaasPage p={saas} />;

  const n8n = N8N_PROJECTS.find(w => w.id === id);
  if (n8n) return <N8nPage wf={n8n} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <Navbar />
      <p style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "rgba(255,255,255,.3)" }}>
        Projet &quot;{id}&quot; non trouvé.
      </p>
      <Link href="/projets" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--cyan)", textDecoration: "none" }}>
        ← Retour aux projets
      </Link>
    </div>
  );
}
