"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { MOCK_AUDITS, QUICK_AUDIT_TARGETS, type MockAuditData, type Bottleneck } from "@/lib/mock-audits";

/* ── Terminal logs ───────────────────────────────────────── */
const LOGS_MOCK = [
  "→ Connexion au moteur d'audit...",
  "→ Crawling du sitemap & structure DOM...",
  "→ Analyse de la stack technique détectée...",
  "→ Mapping des process manuels vs automatisés...",
  "→ Benchmarking sectoriel en cours...",
  "→ Évaluation du ROI d'automatisation IA...",
  "→ Rapport complet généré ✓",
];

const LOGS_CUSTOM = [
  "→ Initialisation du scan profond...",
  "→ Résolution DNS & analyse headers HTTP...",
  "→ Détection de la stack technologique...",
  "→ Audit complexe détecté — niveau Pro requis...",
];

/* ── Difficulty badge ────────────────────────────────────── */
function DiffBadge({ diff }: { diff: Bottleneck["difficulty"] }) {
  const map = {
    easy:   { label: "Rapide à implémenter", color: "var(--cyan)",  bg: "rgba(0,255,200,0.08)",  border: "rgba(0,255,200,0.2)"  },
    medium: { label: "2–3 semaines",         color: "var(--amber)", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.2)" },
    hard:   { label: "Projet sur-mesure",    color: "var(--red)",   bg: "rgba(255,77,109,0.08)", border: "rgba(255,77,109,0.2)" },
  };
  const s = map[diff];
  return (
    <span style={{
      padding: "2px 8px", borderRadius: "20px", fontSize: "10px",
      fontFamily: "var(--mono)", background: s.bg,
      color: s.color, border: `1px solid ${s.border}`,
    }}>
      {s.label}
    </span>
  );
}

/* ── Score ring ──────────────────────────────────────────── */
function ScoreRing({ score }: { score: number }) {
  const color = score >= 70 ? "var(--cyan)" : score >= 45 ? "var(--amber)" : "var(--red)";
  const label = score >= 70 ? "Bon" : score >= 45 ? "Moyen" : "Critique";
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width: "90px", height: "90px", borderRadius: "50%",
        border: `3px solid ${color}`,
        boxShadow: `0 0 20px ${color}40`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: `${color}0d`,
      }}>
        <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "24px", color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text-dim)", letterSpacing: "0.1em", marginTop: "2px" }}>
          /100
        </span>
      </div>
      <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color, marginTop: "6px", letterSpacing: "0.1em" }}>
        {label}
      </p>
    </div>
  );
}

/* ── Audit Report Card ───────────────────────────────────── */
function AuditReportCard({ report }: { report: MockAuditData }) {
  const [tab, setTab] = useState<"issues" | "bottlenecks" | "wins">("issues");
  const totalHours = report.bottlenecks.reduce((s, b) => s + b.hours, 0);

  return (
    <div className="glass" style={{
      maxWidth: "720px", padding: "32px",
      boxShadow: "0 0 60px rgba(0,255,200,0.06)",
      border: "1px solid rgba(0,255,200,0.2)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: "5%", right: "5%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,255,200,0.5), transparent)",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
        <ScoreRing score={report.score} />
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "18px", color: "white", margin: 0 }}>
              {report.company}
            </h3>
            <span style={{
              padding: "3px 10px", borderRadius: "20px", fontSize: "10px",
              fontFamily: "var(--mono)", background: "rgba(0,255,200,0.08)",
              color: "var(--cyan)", border: "1px solid rgba(0,255,200,0.2)",
            }}>
              {report.industry}
            </span>
          </div>
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", marginBottom: "12px" }}>
            Score d&apos;automatisation actuel
          </p>
          {/* Metrics strip */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              { icon: "⏱", val: report.automationPotential, label: "potentiel" },
              { icon: "🔧", val: `${totalHours}h/mois`, label: "récupérables" },
              { icon: "🔴", val: `${report.bottlenecks.filter(b => b.difficulty === "easy").length} quick wins`, label: "immédiats" },
            ].map(m => (
              <div key={m.label} style={{
                padding: "6px 12px", borderRadius: "6px",
                background: "var(--bg3)", border: "1px solid rgba(0,255,200,0.1)",
              }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--cyan)", fontWeight: 700 }}>
                  {m.icon} {m.val}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack detected */}
      <div style={{ marginBottom: "20px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
          Stack détectée
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {report.techStack.map(t => (
            <span key={t} style={{
              padding: "3px 10px", borderRadius: "4px",
              background: "var(--bg3)", fontFamily: "var(--mono)",
              fontSize: "11px", color: "var(--text-dim)",
              border: "1px solid rgba(0,255,200,0.08)",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
        {(["issues", "bottlenecks", "wins"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "7px 14px", borderRadius: "6px",
              fontFamily: "var(--mono)", fontSize: "11px", cursor: "pointer",
              border: tab === t ? "1px solid rgba(0,255,200,0.4)" : "1px solid rgba(0,255,200,0.1)",
              background: tab === t ? "rgba(0,255,200,0.1)" : "transparent",
              color: tab === t ? "var(--cyan)" : "var(--text-dim)",
              transition: "all 0.15s",
            }}
          >
            {t === "issues" ? "🔍 Problèmes" : t === "bottlenecks" ? "⚡ Goulots" : "✅ Quick Wins"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "issues" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {report.issues.map((issue, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: "8px",
              background: issue.type === "critical" ? "rgba(255,77,109,0.06)" : issue.type === "warning" ? "rgba(245,166,35,0.06)" : "var(--bg3)",
              border: `1px solid ${issue.type === "critical" ? "rgba(255,77,109,0.2)" : issue.type === "warning" ? "rgba(245,166,35,0.2)" : "rgba(0,255,200,0.12)"}`,
            }}>
              <div style={{ fontWeight: 600, fontSize: "13px", color: "white", marginBottom: "6px" }}>
                {issue.type === "critical" ? "🔴" : issue.type === "warning" ? "🟡" : "🔵"} {issue.label}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-dim)", lineHeight: 1.6 }}>
                {issue.detail}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "bottlenecks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {report.bottlenecks.map((b, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: "8px",
              background: "var(--bg3)", border: "1px solid rgba(0,255,200,0.1)",
              display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "13px", color: "white", marginBottom: "4px" }}>
                  {b.title}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)" }}>
                  {b.impact}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "14px", color: "var(--amber)" }}>
                  {b.hours}h/mois
                </span>
                <DiffBadge diff={b.difficulty} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "wins" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {report.quickWins.map((w, i) => (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: "8px",
              background: "rgba(0,255,200,0.04)", border: "1px solid rgba(0,255,200,0.15)",
              fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text)", lineHeight: 1.6,
              display: "flex", gap: "10px", alignItems: "flex-start",
            }}>
              <span style={{ color: "var(--cyan)", flexShrink: 0 }}>→</span>
              {w}
            </div>
          ))}
        </div>
      )}

      {/* ROI Banner */}
      <div style={{
        marginTop: "20px", padding: "14px 18px", borderRadius: "8px",
        background: "rgba(0,255,200,0.06)", border: "1px solid rgba(0,255,200,0.2)",
        fontFamily: "var(--mono)", fontSize: "12px", color: "var(--cyan)", lineHeight: 1.6,
      }}>
        💰 {report.roi}
      </div>

      {/* CTA */}
      <button
        onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          marginTop: "20px", width: "100%", padding: "14px",
          background: "var(--cyan)", color: "var(--bg)",
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
          border: "none", borderRadius: "6px", cursor: "pointer",
          transition: "box-shadow 0.2s",
          letterSpacing: "0.05em",
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,200,0.3)")}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
      >
        📨 Obtenir mon plan d&apos;action complet →
      </button>
    </div>
  );
}

/* ── Audit Capture Block ─────────────────────────────────── */
function AuditCaptureBlock({ url }: { url: string }) {
  const [email,  setEmail ] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async () => {
    if (!email.trim() || status === "sending") return;
    setStatus("sending"); setErrMsg("");
    try {
      const res  = await fetch("/api/webhook-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "Audit Machine", query: url, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : "Erreur d'envoi");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass" style={{
        padding: "40px 32px", textAlign: "center", maxWidth: "560px",
        border: "1px solid rgba(0,255,200,0.25)",
        boxShadow: "0 0 40px rgba(0,255,200,0.08)",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
        <h3 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "20px", color: "white", marginBottom: "10px" }}>
          Demande d&apos;audit envoyée !
        </h3>
        <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-dim)", lineHeight: 1.8 }}>
          Votre rapport d&apos;audit personnalisé pour{" "}
          <span style={{ color: "var(--cyan)" }}>{url}</span>{" "}
          sera dans votre boîte mail sous <strong style={{ color: "white" }}>2 heures</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="glass" style={{
      padding: "32px", maxWidth: "600px",
      border: "1px solid rgba(245,166,35,0.25)",
      boxShadow: "0 0 50px rgba(245,166,35,0.05), 0 20px 60px rgba(0,0,0,0.3)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Accent lines */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent)",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
          background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
        }}>
          🔬
        </div>
        <div>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--amber)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2px" }}>
            Audit Profond Requis
          </p>
          <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "15px", color: "white" }}>
            Opportunités complexes détectées
          </p>
        </div>
      </div>

      {/* URL badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "18px",
        padding: "5px 12px", borderRadius: "6px",
        background: "var(--bg3)", border: "1px solid rgba(245,166,35,0.2)",
        fontFamily: "var(--mono)", fontSize: "11px", color: "var(--amber)",
        maxWidth: "100%", overflow: "hidden",
      }}>
        <span>🌐</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</span>
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "10px" }}>
        L&apos;analyse complète de votre site a détecté plusieurs{" "}
        <span style={{ color: "var(--text)" }}>opportunités d&apos;automatisation complexes</span>.
        L&apos;audit complet avec plan d&apos;action chiffré est réservé aux{" "}
        <span style={{ color: "var(--cyan)" }}>professionnels vérifiés</span>.
      </p>

      {/* What's included */}
      <div style={{
        padding: "12px 16px", borderRadius: "8px", marginBottom: "20px",
        background: "var(--bg3)", border: "1px solid rgba(0,255,200,0.1)",
        fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", lineHeight: 2,
      }}>
        <span style={{ color: "var(--cyan)" }}>→</span> Score d&apos;automatisation + benchmark sectoriel<br />
        <span style={{ color: "var(--cyan)" }}>→</span> 3+ goulots d&apos;étranglement chiffrés (h/mois + €)<br />
        <span style={{ color: "var(--cyan)" }}>→</span> Plan d&apos;action priorisé en 3 étapes<br />
        <span style={{ color: "var(--cyan)" }}>→</span> Livraison estimée : <strong style={{ color: "white" }}>sous 2 heures</strong>
      </div>

      {/* Email capture */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder="votre@email-pro.com"
          disabled={status === "sending"}
          style={{
            flex: 1, minWidth: "200px",
            background: "var(--bg3)", border: "1px solid rgba(0,255,200,0.12)",
            color: "var(--text)", padding: "11px 14px",
            fontFamily: "var(--mono)", fontSize: "13px",
            borderRadius: "6px", outline: "none", transition: "border-color 0.2s",
          }}
          onFocus={e  => (e.target.style.borderColor = "var(--cyan)")}
          onBlur={e   => (e.target.style.borderColor = "rgba(0,255,200,0.12)")}
        />
        <button
          onClick={submit}
          disabled={!email.trim() || status === "sending"}
          style={{
            padding: "11px 20px", borderRadius: "6px", border: "none",
            background: email.trim() ? "var(--cyan)" : "rgba(0,255,200,0.2)",
            color: email.trim() ? "var(--bg)" : "var(--text-dim)",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
            cursor: email.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}
        >
          {status === "sending" ? "⏳ Envoi..." : "🔍 Recevoir mon Audit Gratuit"}
        </button>
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--red)", marginTop: "10px" }}>
          ⚠ {errMsg}
        </p>
      )}

      <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "12px", opacity: 0.7 }}>
        🔒 Analyse confidentielle · Aucun spam · Réponse sous 2h
      </p>
    </div>
  );
}

/* ── Terminal ─────────────────────────────────────────────── */
function TerminalBlock({ logs }: { logs: string[] }) {
  if (logs.length === 0) return null;
  return (
    <div className="glass" style={{ padding: "18px 22px", marginBottom: "28px", fontFamily: "var(--mono)", fontSize: "12px", maxWidth: "520px" }}>
      <p style={{ color: "var(--text-dim)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--red)", display: "inline-block", animation: "livePulse 1.5s ease infinite" }} />
        Terminal — Audit Engine v2.1
      </p>
      {logs.map((l, i) => (
        <p key={i} style={{ color: i === logs.length - 1 ? "var(--cyan)" : "var(--text-dim)", marginBottom: "4px", transition: "color 0.3s" }}>
          {l}
        </p>
      ))}
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export default function AuditSection() {
  const ref = useFadeIn<HTMLDivElement>();

  const [url,           setUrl          ] = useState("");
  const [phase,         setPhase        ] = useState<"idle" | "scanning" | "done">("idle");
  const [logs,          setLogs         ] = useState<string[]>([]);
  const [report,        setReport       ] = useState<MockAuditData | null>(null);
  const [isLeadCapture, setIsLeadCapture] = useState(false);
  const [captureUrl,    setCaptureUrl   ] = useState("");

  const animateLogs = async (logList: string[], delay: number) => {
    for (let i = 0; i < logList.length; i++) {
      await new Promise(r => setTimeout(r, delay));
      setLogs(l => [...l, logList[i]]);
    }
  };

  const run = async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed || phase === "scanning") return;

    setPhase("scanning");
    setReport(null);
    setLogs([]);
    setIsLeadCapture(false);

    const isMock = QUICK_AUDIT_TARGETS.includes(trimmed);

    if (isMock) {
      /* ── Chemin Mock : animation 3s + rapport complet ─── */
      await animateLogs(LOGS_MOCK, 430);
      setReport(MOCK_AUDITS[trimmed]);
      setPhase("done");
    } else {
      /* ── Chemin Custom : animation courte + Lead Capture  */
      await animateLogs(LOGS_CUSTOM, 500);
      setCaptureUrl(trimmed);
      setIsLeadCapture(true);
      setPhase("done");
    }
  };

  return (
    <section id="audit" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">

        <p className="section-label">// Playground #03 — Smart Audit Engine</p>
        <h2 className="section-title">
          The Audit<br /><span className="text-cyan">Machine</span>
        </h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "36px", maxWidth: "520px", lineHeight: 1.7 }}>
          Collez l&apos;URL de votre site ou choisissez un test rapide. L&apos;IA analyse vos opportunités d&apos;automatisation et génère un{" "}
          <span style={{ color: "var(--cyan)" }}>rapport ROI chiffré</span> en temps réel.
        </p>

        {/* Input row */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
          <input
            style={{
              flex: 1, maxWidth: "420px", background: "var(--bg3)",
              border: "1px solid rgba(0,255,200,0.12)", color: "var(--text)",
              padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "13px",
              borderRadius: "6px", outline: "none", transition: "border-color 0.2s",
            }}
            placeholder="Entrez l'URL de votre site... ou testez un exemple ci-dessous 👇"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && run(url)}
            onFocus={e  => (e.target.style.borderColor = "var(--cyan)")}
            onBlur={e   => (e.target.style.borderColor = "rgba(0,255,200,0.12)")}
            disabled={phase === "scanning"}
          />
          <button
            onClick={() => run(url)}
            disabled={!url.trim() || phase === "scanning"}
            style={{
              padding: "12px 24px", background: "var(--cyan)", color: "var(--bg)",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
              border: "none", borderRadius: "6px", cursor: "pointer",
              opacity: !url.trim() || phase === "scanning" ? 0.5 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {phase === "scanning" ? "⏳ Analyse..." : "🔍 Auditer"}
          </button>
        </div>

        {/* Quick test buttons */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "12px",
            color: "rgba(0,255,200,0.75)", marginBottom: "10px", letterSpacing: "0.03em",
          }}>
            ⚡ Voir l&apos;audit en direct{" "}
            <span style={{ color: "rgba(0,255,200,0.45)" }}>(Démos gratuites) :</span>
          </p>
          <style>{`
            @keyframes demoAuditPulse {
              0%, 100% { box-shadow: 0 0 8px rgba(0,255,200,0.15); border-color: rgba(0,255,200,0.4); }
              50%       { box-shadow: 0 0 18px rgba(0,255,200,0.35); border-color: rgba(0,255,200,0.8); }
            }
          `}</style>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {QUICK_AUDIT_TARGETS.map((t, idx) => (
              <button
                key={t}
                onClick={() => { setUrl(t); run(t); }}
                disabled={phase === "scanning"}
                style={{
                  padding: "8px 16px",
                  background: idx === 0 ? "rgba(0,255,200,0.07)" : "transparent",
                  border: `1px solid ${idx === 0 ? "rgba(0,255,200,0.4)" : "rgba(0,255,200,0.15)"}`,
                  color: "var(--cyan)",
                  fontFamily: "var(--mono)", fontSize: "11px", borderRadius: "6px",
                  cursor: phase === "scanning" ? "not-allowed" : "pointer",
                  opacity: phase === "scanning" ? 0.5 : 1,
                  transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                  animation: idx === 0 && phase !== "scanning" ? "demoAuditPulse 2.8s ease-in-out infinite" : "none",
                } as React.CSSProperties}
                onMouseEnter={e => { if (phase !== "scanning") { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,0.12)"; (e.currentTarget as HTMLElement).style.animation = "none"; } }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = idx === 0 ? "rgba(0,255,200,0.07)" : "transparent";
                  if (idx === 0 && phase !== "scanning") (e.currentTarget as HTMLElement).style.animation = "demoAuditPulse 2.8s ease-in-out infinite";
                }}
              >
                {idx === 0 ? `▶ ${t}` : t}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <TerminalBlock logs={logs} />

        {/* Audit Report (mock) */}
        {report && !isLeadCapture && <AuditReportCard report={report} />}

        {/* Lead Capture (custom URL) */}
        {isLeadCapture && <AuditCaptureBlock url={captureUrl} />}

      </div>
    </section>
  );
}
