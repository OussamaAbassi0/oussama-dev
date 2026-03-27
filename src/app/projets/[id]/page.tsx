"use client";
import { useParams, notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/LangContext";
import { SAAS_PROJECTS, N8N_PROJECTS, STACK_COLORS, SaasProject, N8nProject } from "@/data/projects";

/* ══════════════════════════════════════════════════════════
   USE SCROLL ENTRANCE
══════════════════════════════════════════════════════════ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════════════════
   ANIMATED BIG METRIC
══════════════════════════════════════════════════════════ */
function BigMetric({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      flex: "1 1 180px", padding: "28px 20px", borderRadius: "14px", textAlign: "center",
      background: `${color}08`, border: `1px solid ${color}20`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity .6s ease, transform .6s ease",
    }}>
      <div style={{ fontSize: "28px", marginBottom: "10px" }}>{icon}</div>
      <div style={{
        fontFamily: "var(--mono)", fontWeight: 700, fontSize: "32px",
        color: color, lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,.35)", marginTop: "8px" }}>
        {label}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STEP CARD — Problem / Solution / Result
══════════════════════════════════════════════════════════ */
function StepCard({
  icon, title, text, color, delay = 0,
}: { icon: string; title: string; text: string; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      display: "flex", gap: "20px", alignItems: "flex-start",
      padding: "24px 28px", borderRadius: "14px",
      background: "rgba(255,255,255,.025)", border: `1px solid ${color}20`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-24px)",
      transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `${color}14`, border: `1px solid ${color}25`,
        fontSize: "20px", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: color, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px" }}>
          {title}
        </p>
        <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "rgba(255,255,255,.65)", lineHeight: 1.75, margin: 0 }}>
          {text}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SAAS PROJECT PAGE
══════════════════════════════════════════════════════════ */
function SaasProjectPage({ project }: { project: SaasProject }) {
  const { lang } = useLang();
  const l = (o: Record<string, string>) => o[lang] ?? o.en ?? "";
  const isLive = project.liveUrl !== "#";
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>
        {/* Background gradient from project color */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${project.color}12 0%, transparent 70%)`,
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Back + category */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <Link href="/projets" style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.35)",
              textDecoration: "none", letterSpacing: ".1em",
              transition: "color .2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.7)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.35)"; }}
            >
              ← Projets
            </Link>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,.1)" }} />
            <span style={{
              padding: "3px 10px", borderRadius: "20px",
              background: `${project.color}14`, border: `1px solid ${project.color}25`,
              fontFamily: "var(--mono)", fontSize: "10px", color: project.color, letterSpacing: ".1em",
            }}>
              {l(project.category)}
            </span>
            <span style={{
              padding: "3px 10px", borderRadius: "20px",
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
              fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.3)",
            }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="proj-hero-text" style={{
            fontFamily: "var(--sans)", fontWeight: 800,
            fontSize: "clamp(36px,6vw,72px)", color: "#fff",
            lineHeight: 1.05, marginBottom: "8px",
          }}>
            {project.name}
          </h1>
          <p className="proj-hero-text-delay" style={{
            fontFamily: "var(--sans)", fontSize: "clamp(16px,2vw,22px)",
            color: project.color, marginBottom: "24px", fontWeight: 500,
          }}>
            {l(project.tagline)}
          </p>
          <p className="proj-hero-text-delay" style={{
            fontFamily: "var(--sans)", fontSize: "16px", color: "rgba(255,255,255,.5)",
            maxWidth: "640px", lineHeight: 1.8, marginBottom: "36px",
          }}>
            {l(project.desc)}
          </p>

          {/* CTA buttons */}
          <div className="proj-hero-metrics" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {isLive && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "13px 28px", borderRadius: "10px",
                background: project.color, color: "#050810",
                fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
                textDecoration: "none", letterSpacing: ".06em",
                transition: "opacity .2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = ".85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#050810", display: "inline-block" }} />
                Voir le projet live ↗
              </a>
            )}
            <Link href="/projets" style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "13px 28px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,.1)",
              fontFamily: "var(--mono)", fontSize: "13px", color: "rgba(255,255,255,.5)",
              textDecoration: "none", letterSpacing: ".06em",
              transition: "all .2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.25)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.5)"; }}
            >
              ← Autres projets
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="proj-hero-img" style={{
            borderRadius: "16px", overflow: "hidden",
            border: `1px solid ${project.color}20`,
            boxShadow: `0 32px 80px rgba(0,0,0,.5), 0 0 0 1px ${project.color}15`,
            background: `${project.color}08`,
            minHeight: "200px",
          }}>
            {!imgError ? (
              <Image
                src={project.screenshot}
                alt={project.screenshotAlt}
                width={900}
                height={500}
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{ height: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                <div style={{ fontSize: "48px" }}>🚀</div>
                <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: project.color }}>{project.name}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "28px" }}>
            // {lang === "fr" ? "Résultats chiffrés" : "Key metrics"}
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {project.metrics.map((m) => (
              <BigMetric key={m.label} icon={m.icon} value={m.value} label={m.label} color={project.color} />
            ))}
          </div>
        </div>
      </section>

      {/* ── THE STORY ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "32px" }}>
            // {lang === "fr" ? "Le projet en détail" : "Project deep dive"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <StepCard
              icon="❌"
              title={lang === "fr" ? "Le problème" : "The challenge"}
              text={l(project.challenge)}
              color="#ff4d6d"
              delay={0}
            />
            <StepCard
              icon="⚙️"
              title={lang === "fr" ? "La solution" : "The solution"}
              text={l(project.solution)}
              color={project.color}
              delay={0.1}
            />
            <StepCard
              icon="✅"
              title={lang === "fr" ? "L'impact" : "The impact"}
              text={l(project.impact)}
              color="#4ade80"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "28px" }}>
            // Tech stack
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {project.stack.map((s) => (
              <div key={s} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px", borderRadius: "10px",
                background: `${STACK_COLORS[s] ?? "#fff"}0a`,
                border: `1px solid ${STACK_COLORS[s] ?? "#fff"}20`,
                transition: "all .25s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${STACK_COLORS[s] ?? "#fff"}16`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${STACK_COLORS[s] ?? "#fff"}0a`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: STACK_COLORS[s] ?? "#fff",
                  boxShadow: `0 0 8px ${STACK_COLORS[s] ?? "#fff"}80`,
                }} />
                <span style={{
                  fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
                  color: STACK_COLORS[s] ?? "rgba(255,255,255,.7)",
                }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "80px 24px",
        background: "var(--bg2)",
        borderTop: "1px solid rgba(255,255,255,.05)",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(0,255,200,.6)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
            // {lang === "fr" ? "Un projet similaire ?" : "Similar project?"}
          </p>
          <h2 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
            {lang === "fr" ? "Parlons de votre projet." : "Let's talk about your project."}
            <br />
            <span style={{ color: "var(--cyan)" }}>{lang === "fr" ? "Je réponds sous 24h." : "I respond within 24h."}</span>
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: "36px" }}>
            {lang === "fr"
              ? "Automatisation n8n, agent IA, SaaS full-stack — si ça ressemble à ce projet, j'ai déjà la stack et l'expérience pour le livrer vite."
              : "n8n automation, AI agent, full-stack SaaS — if it looks like this project, I already have the stack and experience to deliver it fast."}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#cta" style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "10px",
              background: "var(--cyan)", color: "#050810",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
              textDecoration: "none", letterSpacing: ".06em",
              transition: "opacity .2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = ".85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {lang === "fr" ? "Démarrer un projet" : "Start a project"} →
            </Link>
            <Link href="/projets" style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,.1)",
              fontFamily: "var(--mono)", fontSize: "13px", color: "rgba(255,255,255,.5)",
              textDecoration: "none", letterSpacing: ".06em",
              transition: "all .2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.25)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.5)"; }}
            >
              {lang === "fr" ? "Voir tous les projets" : "See all projects"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   N8N PROJECT PAGE
══════════════════════════════════════════════════════════ */
function N8nProjectPage({ wf }: { wf: N8nProject }) {
  const { lang } = useLang();
  const l = (o: Record<string, string>) => o[lang] ?? o.en ?? "";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${wf.color}12 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Back + category */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <Link href="/projets" style={{
              fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.35)",
              textDecoration: "none", letterSpacing: ".1em", transition: "color .2s",
            }}>
              ← Projets
            </Link>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,.1)" }} />
            <span style={{
              padding: "3px 10px", borderRadius: "20px",
              background: `${wf.color}14`, border: `1px solid ${wf.color}25`,
              fontFamily: "var(--mono)", fontSize: "10px", color: wf.color, letterSpacing: ".1em",
            }}>
              n8n Automation
            </span>
            <span style={{
              padding: "3px 10px", borderRadius: "20px",
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
              fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.4)",
            }}>
              {wf.category}
            </span>
          </div>

          {/* Emoji + title */}
          <div className="proj-hero-text" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `${wf.color}14`, border: `1px solid ${wf.color}25`,
              fontSize: "36px", flexShrink: 0,
            }}>
              {wf.emoji}
            </div>
            <h1 style={{
              fontFamily: "var(--sans)", fontWeight: 800,
              fontSize: "clamp(28px,5vw,56px)", color: "#fff", lineHeight: 1.1, margin: 0,
            }}>
              {wf.name}
            </h1>
          </div>

          <p className="proj-hero-text-delay" style={{
            fontFamily: "var(--sans)", fontSize: "17px", color: "rgba(255,255,255,.5)",
            lineHeight: 1.8, marginBottom: "36px", maxWidth: "600px",
          }}>
            {l(wf.result)}
          </p>

          {/* Metrics */}
          <div className="proj-hero-metrics" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {wf.metrics.map((m) => (
              <div key={m.label} style={{
                padding: "14px 20px", borderRadius: "12px", textAlign: "center",
                background: `${wf.color}0c`, border: `1px solid ${wf.color}22`,
              }}>
                <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "22px", color: wf.color }}>{m.val}</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "rgba(255,255,255,.35)", marginTop: "4px" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The story */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "32px" }}>
            // {lang === "fr" ? "Comment ça fonctionne" : "How it works"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <StepCard
              icon="❌"
              title={lang === "fr" ? "Le problème" : "The challenge"}
              text={l(wf.problem)}
              color="#ff4d6d"
              delay={0}
            />
            <StepCard
              icon="⚙️"
              title={lang === "fr" ? "La solution n8n" : "The n8n solution"}
              text={l(wf.solution)}
              color={wf.color}
              delay={0.1}
            />
            <StepCard
              icon="✅"
              title={lang === "fr" ? "Le résultat" : "The result"}
              text={l(wf.result)}
              color="#4ade80"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "24px" }}>
            // Tools & integrations
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {wf.stack.map((s) => (
              <div key={s} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px", borderRadius: "10px",
                background: `${STACK_COLORS[s] ?? "#fff"}0a`,
                border: `1px solid ${STACK_COLORS[s] ?? "#fff"}20`,
                transition: "all .25s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${STACK_COLORS[s] ?? "#fff"}16`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${STACK_COLORS[s] ?? "#fff"}0a`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: STACK_COLORS[s] ?? "#fff",
                  boxShadow: `0 0 8px ${STACK_COLORS[s] ?? "#fff"}80`,
                }} />
                <span style={{
                  fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
                  color: STACK_COLORS[s] ?? "rgba(255,255,255,.7)",
                }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 24px",
        background: "var(--bg2)",
        borderTop: "1px solid rgba(255,255,255,.05)",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: `${wf.color}99`, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "16px" }}>
            // {lang === "fr" ? "Une automatisation similaire ?" : "Similar automation?"}
          </p>
          <h2 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
            {lang === "fr" ? "Ce workflow peut être adapté à votre business." : "This workflow can be adapted to your business."}
            <br />
            <span style={{ color: wf.color }}>{lang === "fr" ? "Livraison en 48h." : "Delivery in 48h."}</span>
          </h2>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
            <Link href="/#cta" style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "10px",
              background: wf.color, color: "#050810",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
              textDecoration: "none", letterSpacing: ".06em",
              transition: "opacity .2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = ".85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {lang === "fr" ? "Démarrer ce workflow" : "Start this workflow"} →
            </Link>
            <Link href="/projets" style={{
              padding: "14px 32px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,.1)",
              fontFamily: "var(--mono)", fontSize: "13px", color: "rgba(255,255,255,.5)",
              textDecoration: "none", letterSpacing: ".06em",
              transition: "all .2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.25)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.5)"; }}
            >
              {lang === "fr" ? "Voir tous les projets" : "See all projects"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE ROUTER
══════════════════════════════════════════════════════════ */
export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const saas = SAAS_PROJECTS.find((p) => p.id === id);
  if (saas) return <SaasProjectPage project={saas} />;

  const n8n = N8N_PROJECTS.find((w) => w.id === id);
  if (n8n) return <N8nProjectPage wf={n8n} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
      <Navbar />
      <p style={{ fontFamily: "var(--mono)", fontSize: "14px", color: "rgba(255,255,255,.3)" }}>Projet non trouvé.</p>
      <Link href="/projets" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--cyan)", textDecoration: "none" }}>
        ← Retour aux projets
      </Link>
    </div>
  );
}
