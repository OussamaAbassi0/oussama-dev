"use client";
import { useState, useEffect } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";
import { MOCK_LEADS, QUICK_TARGETS } from "@/lib/mock-leads";
import type { Lead } from "@/lib/types";
import { trackLabTool } from "@/lib/sessionTracker";

/* ── Terminal logs ───────────────────────────────────────── */
const LOGS_MOCK = [
  "→ Connexion au cache sécurisé...",
  "→ Cible identifiée dans la base de données...",
  "→ Chargement des leads pré-qualifiés...",
  "→ Enrichissement des signaux d'intent...",
  "→ Scoring ICP finalisé...",
  "→ 3 leads ultra-qualifiés prêts ✓",
];

const LOGS_CUSTOM = [
  "→ Analyse de la requête personnalisée...",
  "→ Vérification du profil utilisateur...",
  "→ Protection anti-abus activée 🛡️",
  "→ Accès scraping custom : authentification requise...",
];

/* ── LeadCard ─────────────────────────────────────────────── */
function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  const hasWebsite = lead.website && lead.website !== "N/A";
  const hasPhone   = lead.phone   && lead.phone   !== "Non spécifié";
  const scoreColor =
    lead.score >= 80 ? "var(--cyan)"  :
    lead.score >= 60 ? "var(--amber)" : "var(--red)";
  const fullStars  = Math.floor(lead.rating);
  const emptyStars = 5 - fullStars;

  return (
    <div
      className="glass glow-card lead-card"
      style={{ padding: "24px", animationDelay: `${index * 0.2}s` } as React.CSSProperties}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
        <div style={{ flex: 1, paddingRight: "12px" }}>
          <div style={{ fontWeight: 700, fontSize: "15px", color: "white", marginBottom: "5px", lineHeight: 1.3 }}>
            {lead.company}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            {Array.from({ length: fullStars  }).map((_, i) => <span key={`f${i}`} style={{ color: "var(--amber)", fontSize: "12px" }}>★</span>)}
            {Array.from({ length: emptyStars }).map((_, i) => <span key={`e${i}`} style={{ color: "var(--text-dim)", fontSize: "12px" }}>★</span>)}
            {lead.rating > 0 && (
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", marginLeft: "4px" }}>
                {lead.rating.toFixed(1)}/5
              </span>
            )}
          </div>
        </div>
        <div style={{
          background: `${scoreColor}18`, color: scoreColor,
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: "18px",
          padding: "6px 12px", borderRadius: "8px",
          border: `1px solid ${scoreColor}33`,
          minWidth: "52px", textAlign: "center", flexShrink: 0,
        }}>
          {lead.score}
        </div>
      </div>

      {/* Contacts */}
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", lineHeight: 2, marginBottom: "12px" }}>
        <div style={{ color: hasPhone ? "var(--text)" : "var(--text-dim)" }}>📱 {lead.phone}</div>
        <div>
          🌐{" "}
          {hasWebsite ? (
            <a
              href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
              target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--cyan)", textDecoration: "none", borderBottom: "1px dashed rgba(0,255,200,0.3)" }}
            >
              {lead.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          ) : (
            <span style={{ color: "var(--red)", opacity: 0.7 }}>Aucun site détecté</span>
          )}
        </div>
        <div style={{ color: "var(--text-dim)", fontSize: "10px" }}>📍 {lead.address}</div>
      </div>

      {/* Signal */}
      <div style={{
        background: "rgba(245,166,35,0.07)", border: "1px solid rgba(245,166,35,0.2)",
        borderRadius: "6px", padding: "10px 12px",
        fontFamily: "var(--mono)", fontSize: "11px", color: "var(--amber)", lineHeight: 1.6,
        marginBottom: "12px",
      }}>
        🎯 {lead.signal}
      </div>

      {/* Maps CTA */}
      <a
        href={lead.mapsUrl} target="_blank" rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "8px", borderRadius: "6px",
          border: "1px solid rgba(0,255,200,0.15)",
          fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)",
          textDecoration: "none", transition: "all 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.15)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"; }}
      >
        📍 Voir sur Google Maps →
      </a>
    </div>
  );
}

/* ── Lead Capture Block ───────────────────────────────────── */
function LeadCaptureBlock({ query }: { query: string }) {
  const [email,   setEmail  ] = useState("");
  const [status,  setStatus ] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg,  setErrMsg ] = useState("");

  const submit = async () => {
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    setErrMsg("");
    try {
      const res  = await fetch("/api/webhook-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "Lead Hunter", query, email }),
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
        padding: "40px 32px", textAlign: "center", maxWidth: "520px",
        boxShadow: "0 0 40px rgba(0,255,200,0.08)",
        border: "1px solid rgba(0,255,200,0.25)",
      }}>
        <div style={{ fontSize: "44px", marginBottom: "16px" }}>✅</div>
        <h3 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "20px", color: "white", marginBottom: "10px" }}>
          Demande envoyée !
        </h3>
        <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-dim)", lineHeight: 1.8 }}>
          Vérifiez votre boîte mail — vos 3 leads{" "}
          <span style={{ color: "var(--cyan)" }}>&ldquo;{query}&rdquo;</span>{" "}
          arrivent dans moins de 2 minutes.
        </p>
      </div>
    );
  }

  return (
    <div className="glass" style={{
      padding: "32px", maxWidth: "560px",
      border: "1px solid rgba(245,166,35,0.25)",
      boxShadow: "0 0 40px rgba(245,166,35,0.05), 0 0 80px rgba(0,0,0,0.3)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.6), transparent)",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "8px", flexShrink: 0,
          background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
        }}>
          🛡️
        </div>
        <div>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--amber)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2px" }}>
            Protection Anti-Abus Activée
          </p>
          <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "15px", color: "white" }}>
            Scraping personnalisé détecté
          </p>
        </div>
      </div>

      {/* Query badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "5px 12px", borderRadius: "20px", marginBottom: "18px",
        background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)",
        fontFamily: "var(--mono)", fontSize: "11px", color: "var(--amber)",
      }}>
        🔍 Requête : &ldquo;{query}&rdquo;
      </div>

      <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "24px" }}>
        Pour éviter les abus d&apos;API, le scraping sur mesure est réservé aux{" "}
        <span style={{ color: "var(--text)" }}>professionnels vérifiés</span>.
        Entrez votre email pro pour recevoir vos{" "}
        <span style={{ color: "var(--cyan)" }}>3 leads gratuits</span> dans 2 minutes.
      </p>

      {/* Email input + button */}
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
            padding: "11px 22px",
            background: email.trim() ? "var(--cyan)" : "rgba(0,255,200,0.2)",
            color: email.trim() ? "var(--bg)" : "var(--text-dim)",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
            border: "none", borderRadius: "6px", cursor: email.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}
        >
          {status === "sending" ? "⏳ Envoi..." : "📨 Recevoir mes leads"}
        </button>
      </div>

      {/* Error */}
      {status === "error" && (
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--red)", marginTop: "10px" }}>
          ⚠ {errMsg}
        </p>
      )}

      {/* Trust note */}
      <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "14px", opacity: 0.7 }}>
        🔒 Aucun spam · Données non partagées · Réponse sous 2 min
      </p>
    </div>
  );
}

/* ── Terminal ─────────────────────────────────────────────── */
function TerminalBlock({ logs, label }: { logs: string[]; label: string }) {
  if (logs.length === 0) return null;
  return (
    <div className="glass" style={{ padding: "18px 22px", marginBottom: "28px", fontFamily: "var(--mono)", fontSize: "12px", maxWidth: "520px" }}>
      <p style={{ color: "var(--text-dim)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--red)", display: "inline-block", animation: "livePulse 1.5s ease infinite" }} />
        {label}
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
export default function LeadHunterSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();

  useEffect(() => { trackLabTool("lead-hunter"); }, []);

  const [query,         setQuery        ] = useState("");
  const [phase,         setPhase        ] = useState<"idle" | "scanning" | "done">("idle");
  const [logs,          setLogs         ] = useState<string[]>([]);
  const [leads,         setLeads        ] = useState<Lead[]>([]);
  const [isLeadCapture, setIsLeadCapture] = useState(false);
  const [captureQuery,  setCaptureQuery ] = useState("");
  const [error,         setError        ] = useState<string | null>(null);

  const animateLogs = async (logList: string[], delay: number) => {
    for (let i = 0; i < logList.length; i++) {
      await new Promise(r => setTimeout(r, delay));
      setLogs(l => [...l, logList[i]]);
    }
  };

  const run = async (q: string) => {
    if (!q.trim() || phase === "scanning") return;
    const trimmed = q.trim();

    setPhase("scanning");
    setLeads([]);
    setLogs([]);
    setError(null);
    setIsLeadCapture(false);

    const isMock = QUICK_TARGETS.includes(trimmed);

    if (isMock) {
      /* ── Chemin Mock : animation 2.5s + affichage mock data ─ */
      await animateLogs(LOGS_MOCK, 420);
      setLeads(MOCK_LEADS[trimmed]);
      setPhase("done");
    } else {
      /* ── Chemin Custom : animation courte + Lead Capture ──── */
      await animateLogs(LOGS_CUSTOM, 380);
      setCaptureQuery(trimmed);
      setIsLeadCapture(true);
      setPhase("done");
    }
  };

  return (
    <section id="lead-hunter" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">

        <p className="section-label">{t.lab.leadLabel}</p>
        <h2 className="section-title">
          {t.lab.leadTitle}<br /><span className="text-cyan">Lead Hunter</span>
        </h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "36px", maxWidth: "520px", lineHeight: 1.7 }}>
          {t.lab.leadSub}
        </p>

        {/* Search bar */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
          <input
            style={{
              flex: 1, maxWidth: "440px", background: "var(--bg3)",
              border: "1px solid rgba(0,255,200,0.12)", color: "var(--text)",
              padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "13px",
              borderRadius: "6px", outline: "none", transition: "border-color 0.2s",
            }}
            placeholder={lang==="ar" ? 'اكتب هدفك... أو جرّب مثالاً ⬇️' : lang==="en" ? 'Type your target... or test an example below 👇' : lang==="es" ? 'Escribe tu objetivo... o prueba un ejemplo 👇' : lang==="nl" ? 'Typ uw doel... of probeer een voorbeeld 👇' : 'Tapez votre cible... ou testez un exemple ci-dessous 👇'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && run(query)}
            onFocus={e  => (e.target.style.borderColor = "var(--cyan)")}
            onBlur={e   => (e.target.style.borderColor = "rgba(0,255,200,0.12)")}
            disabled={phase === "scanning"}
          />
          <button
            onClick={() => run(query)}
            disabled={!query.trim() || phase === "scanning"}
            style={{
              padding: "12px 24px", background: "var(--cyan)", color: "var(--bg)",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
              border: "none", borderRadius: "6px", cursor: "pointer",
              opacity: !query.trim() || phase === "scanning" ? 0.5 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {phase === "scanning" ? (lang==="ar" ? "⏳ جاري البحث..." : lang==="en" ? "⏳ Scanning..." : lang==="es" ? "⏳ Buscando..." : lang==="nl" ? "⏳ Zoeken..." : "⏳ Scanning...") : (lang==="ar" ? "⚡ وضع الصياد" : lang==="en" ? "⚡ Hunter Mode" : lang==="es" ? "⚡ Modo Cazador" : lang==="nl" ? "⚡ Jager Modus" : "⚡ Hunter Mode")}
          </button>
        </div>

        {/* Quick targets */}
        <p style={{
          fontFamily: "var(--mono)", fontSize: "12px",
          color: "rgba(0,255,200,0.75)", marginBottom: "10px", letterSpacing: "0.03em",
        }}>
          {lang==="ar" ? "⚡ شاهد السحر مباشرة" : lang==="en" ? "⚡ See the magic live" : lang==="es" ? "⚡ Ver la magia en directo" : lang==="nl" ? "⚡ Zie de magie live" : "⚡ Voir la magie en direct"}{" "}
          <span style={{ color: "rgba(0,255,200,0.45)" }}>{lang==="ar" ? "(عروض مجانية) :" : lang==="en" ? "(Free demos):" : lang==="es" ? "(Demos gratuitas):" : lang==="nl" ? "(Gratis demo's):" : "(Démos gratuites) :"}</span>
        </p>
        <style>{`
          @keyframes demoButtonPulse {
            0%, 100% { box-shadow: 0 0 8px rgba(0,255,200,0.15); border-color: rgba(0,255,200,0.4); }
            50%       { box-shadow: 0 0 18px rgba(0,255,200,0.35); border-color: rgba(0,255,200,0.8); }
          }
        `}</style>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
          {QUICK_TARGETS.map((t, idx) => (
            <button
              key={t}
              onClick={() => { setQuery(t); run(t); }}
              disabled={phase === "scanning"}
              style={{
                padding: "6px 14px",
                background: idx === 0 ? "rgba(0,255,200,0.07)" : "transparent",
                border: `1px solid ${idx === 0 ? "rgba(0,255,200,0.4)" : "rgba(0,255,200,0.15)"}`,
                color: "var(--cyan)",
                fontFamily: "var(--mono)", fontSize: "11px", borderRadius: "6px",
                cursor: phase === "scanning" ? "not-allowed" : "pointer",
                opacity: phase === "scanning" ? 0.5 : 1,
                transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                animation: idx === 0 && phase !== "scanning" ? "demoButtonPulse 2.8s ease-in-out infinite" : "none",
              } as React.CSSProperties}
              onMouseEnter={e => { if (phase !== "scanning") { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,0.12)"; (e.currentTarget as HTMLElement).style.animation = "none"; } }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = idx === 0 ? "rgba(0,255,200,0.07)" : "transparent";
                if (idx === 0 && phase !== "scanning") (e.currentTarget as HTMLElement).style.animation = "demoButtonPulse 2.8s ease-in-out infinite";
              }}
            >
              {idx === 0 ? `▶ ${t}` : t}
            </button>
          ))}
        </div>

        {/* Terminal */}
        <TerminalBlock
          logs={logs}
          label={isLeadCapture || (!leads.length && phase === "done") ? "Terminal — Vérification sécurité" : "Terminal — Smart Lead Engine"}
        />

        {/* Error */}
        {error && (
          <div style={{
            marginBottom: "20px", padding: "12px 16px", borderRadius: "6px",
            background: "rgba(255,77,109,0.08)", border: "1px solid rgba(255,77,109,0.2)",
            fontFamily: "var(--mono)", fontSize: "12px", color: "var(--red)",
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Lead Capture (custom query) */}
        {isLeadCapture && <LeadCaptureBlock query={captureQuery} />}

        {/* Lead Cards (mock query) */}
        {!isLeadCapture && leads.length > 0 && (
          <>
            <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", marginBottom: "16px" }}>
              ✓ {leads.length} leads qualifiés — données vérifiées
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              {leads.map((lead, i) => <LeadCard key={i} lead={lead} index={i} />)}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
