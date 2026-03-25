"use client";
import { useState, useRef, useEffect } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ─── Types ──────────────────────────────────────────────────── */
interface AuditOpportunity {
  title:       string;
  description: string;
  saving:      string;
}

interface AuditResult {
  headline:      string;
  detected:      string[];
  opportunities: AuditOpportunity[];
  quickWin:      string;
  roiEstimate:   string;
  maturityScore: number;
  domain:        string;
  title:         string;
}

/* ─── Translations ───────────────────────────────────────────── */
const TX: Record<string, {
  sectionLabel: string;
  title:        string;
  accent:       string;
  sub:          string;
  placeholder:  string;
  cta:          string;
  loading:      string[];
  detected:     string;
  noDetected:   string;
  opportunities:string;
  quickWin:     string;
  roi:          string;
  maturity:     string;
  maturityLow:  string;
  maturityHigh: string;
  startProject: string;
  tryAnother:   string;
}> = {
  fr: {
    sectionLabel:  "// Outil 4 — Domain Audit",
    title:         "Entrez votre domaine.",
    accent:        "Obtenez votre audit IA.",
    sub:           "Je détecte votre stack, identifie vos opportunités d'automatisation et calcule votre ROI potentiel — en 10 secondes.",
    placeholder:   "ex: monentreprise.com",
    cta:           "Analyser mon site →",
    loading:       [
      "🔍 Chargement du site...",
      "🧠 Détection de la stack technique...",
      "🔎 Identification des outils...",
      "⚡ Calcul des opportunités d'automatisation...",
      "📊 Génération du rapport personnalisé...",
    ],
    detected:      "Outils détectés sur votre site",
    noDetected:    "Stack non détectée publiquement",
    opportunities: "3 opportunités d'automatisation identifiées",
    quickWin:      "🏆 Quick Win — Démarrez par ça",
    roi:           "💰 ROI estimé sur 12 mois",
    maturity:      "Maturité d'automatisation",
    maturityLow:   "Manuel",
    maturityHigh:  "Automatisé",
    startProject:  "Démarrer ce projet →",
    tryAnother:    "Tester un autre domaine",
  },
  en: {
    sectionLabel:  "// Tool 4 — Domain Audit",
    title:         "Enter your domain.",
    accent:        "Get your AI audit.",
    sub:           "I detect your stack, identify automation opportunities and calculate your potential ROI — in 10 seconds.",
    placeholder:   "e.g. mycompany.com",
    cta:           "Analyse my site →",
    loading:       [
      "🔍 Loading site...",
      "🧠 Detecting tech stack...",
      "🔎 Identifying tools...",
      "⚡ Calculating automation opportunities...",
      "📊 Generating personalized report...",
    ],
    detected:      "Tools detected on your site",
    noDetected:    "Stack not publicly detectable",
    opportunities: "3 automation opportunities identified",
    quickWin:      "🏆 Quick Win — Start with this",
    roi:           "💰 Estimated 12-month ROI",
    maturity:      "Automation maturity",
    maturityLow:   "Manual",
    maturityHigh:  "Automated",
    startProject:  "Start this project →",
    tryAnother:    "Try another domain",
  },
  ar: {
    sectionLabel:  "// أداة 4 — تدقيق النطاق",
    title:         "أدخل نطاقك.",
    accent:        "احصل على تدقيقك بالذكاء الاصطناعي.",
    sub:           "أكتشف حزمة التقنيات الخاصة بك، وأحدد فرص الأتمتة وأحسب عائد استثمارك المحتمل في 10 ثوانٍ.",
    placeholder:   "مثال: شركتي.com",
    cta:           "تحليل موقعي →",
    loading:       ["🔍 تحميل الموقع...", "🧠 كشف التقنيات...", "🔎 تحديد الأدوات...", "⚡ حساب فرص الأتمتة...", "📊 إنشاء التقرير..."],
    detected:      "الأدوات المكتشفة على موقعك",
    noDetected:    "لم يتم اكتشاف التقنيات علنًا",
    opportunities: "3 فرص أتمتة تم تحديدها",
    quickWin:      "🏆 انتصار سريع — ابدأ بهذا",
    roi:           "💰 العائد المقدر على 12 شهرًا",
    maturity:      "نضج الأتمتة",
    maturityLow:   "يدوي",
    maturityHigh:  "مُؤتمت",
    startProject:  "ابدأ هذا المشروع →",
    tryAnother:    "جرب نطاقًا آخر",
  },
  es: {
    sectionLabel:  "// Herramienta 4 — Auditoría de dominio",
    title:         "Ingresa tu dominio.",
    accent:        "Obtén tu auditoría IA.",
    sub:           "Detecto tu stack, identifico oportunidades de automatización y calculo tu ROI potencial — en 10 segundos.",
    placeholder:   "ej: miempresa.com",
    cta:           "Analizar mi sitio →",
    loading:       ["🔍 Cargando sitio...", "🧠 Detectando stack...", "🔎 Identificando herramientas...", "⚡ Calculando oportunidades...", "📊 Generando informe..."],
    detected:      "Herramientas detectadas en tu sitio",
    noDetected:    "Stack no detectable públicamente",
    opportunities: "3 oportunidades de automatización identificadas",
    quickWin:      "🏆 Quick Win — Empieza por esto",
    roi:           "💰 ROI estimado a 12 meses",
    maturity:      "Madurez de automatización",
    maturityLow:   "Manual",
    maturityHigh:  "Automatizado",
    startProject:  "Iniciar este proyecto →",
    tryAnother:    "Probar otro dominio",
  },
  nl: {
    sectionLabel:  "// Tool 4 — Domein Audit",
    title:         "Voer uw domein in.",
    accent:        "Ontvang uw AI-audit.",
    sub:           "Ik detecteer uw stack, identificeer automatiseringsmogelijkheden en bereken uw potentiële ROI — in 10 seconden.",
    placeholder:   "bijv: mijnbedrijf.nl",
    cta:           "Analyseer mijn site →",
    loading:       ["🔍 Site laden...", "🧠 Stack detecteren...", "🔎 Tools identificeren...", "⚡ Kansen berekenen...", "📊 Rapport genereren..."],
    detected:      "Tools gedetecteerd op uw site",
    noDetected:    "Stack niet publiek detecteerbaar",
    opportunities: "3 automatiseringsmogelijkheden geïdentificeerd",
    quickWin:      "🏆 Quick Win — Begin hiermee",
    roi:           "💰 Geschatte 12-maands ROI",
    maturity:      "Automatiseringsvolwassenheid",
    maturityLow:   "Handmatig",
    maturityHigh:  "Geautomatiseerd",
    startProject:  "Start dit project →",
    tryAnother:    "Ander domein proberen",
  },
};

/* ─── Keyframe CSS ───────────────────────────────────────────── */
const AUDIT_CSS = `
@keyframes auditSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes auditFadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes auditStagger {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes auditScore {
  from { stroke-dashoffset: 220; }
  to   { /* set via style */ }
}
@keyframes auditPop {
  0%   { transform: scale(0.8); opacity: 0; }
  70%  { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
`;

/* ─── Maturity bar ───────────────────────────────────────────── */
function MaturityBar({ score, low, high }: { score: number; low: string; high: string }) {
  const pct = ((score - 1) / 4) * 100;
  const color = pct < 40 ? "#ff5050" : pct < 70 ? "#f5a623" : "#00ffc8";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(255,255,255,.4)" }}>{low}</span>
        <span style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(255,255,255,.4)" }}>{high}</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,.06)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color})`,
          borderRadius: "3px", transition: "width 1s ease",
        }} />
      </div>
      <div style={{ textAlign: "center", marginTop: "8px", fontFamily: "'Courier New',monospace", fontSize: "12px", color }}>
        {score}/5
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function DomainAuditSection() {
  const ref      = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx        = TX[lang] ?? TX.fr;
  const isRTL     = lang === "ar";

  const [domain,      setDomain     ] = useState("");
  const [phase,       setPhase      ] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [loadStep,    setLoadStep   ] = useState(0);
  const [result,      setResult     ] = useState<AuditResult | null>(null);
  const [errorMsg,    setErrorMsg   ] = useState("");
  const cssInjected  = useRef(false);

  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const el = document.createElement("style");
    el.textContent = AUDIT_CSS;
    document.head.appendChild(el);
  }, []);

  const runAudit = async () => {
    const d = domain.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
    if (!d) return;

    setPhase("loading");
    setLoadStep(0);

    /* Cycle through loading steps */
    const steps = tx.loading.length;
    const stepInterval = setInterval(() => {
      setLoadStep(s => (s + 1) % steps);
    }, 1800);

    try {
      const res  = await fetch("/api/domain-audit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ domain: d, lang }),
      });
      const data = await res.json();

      clearInterval(stepInterval);

      if (data.error) throw new Error(data.error);
      setResult(data);
      setPhase("done");
    } catch (e: unknown) {
      clearInterval(stepInterval);
      setErrorMsg(e instanceof Error ? e.message : "Erreur inconnue");
      setPhase("error");
    }
  };

  return (
    <section
      id="domain-audit"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ padding: "100px 24px", background: "var(--bg)" }}
    >
      <div
        ref={ref}
        className="fade-in"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <p style={{
          fontFamily: "'Courier New',monospace", fontSize: "11px",
          color: "var(--cyan)", letterSpacing: ".18em",
          textTransform: "uppercase", marginBottom: "16px",
        }}>
          {tx.sectionLabel}
        </p>
        <h2 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(28px,5vw,52px)", color: "white",
          lineHeight: 1.1, marginBottom: "12px",
        }}>
          {tx.title}<br />
          <span style={{ color: "var(--cyan)" }}>{tx.accent}</span>
        </h2>
        <p style={{
          fontFamily: "Arial,sans-serif", fontSize: "15px",
          color: "rgba(255,255,255,.5)", maxWidth: "560px",
          marginBottom: "40px", lineHeight: 1.7,
        }}>
          {tx.sub}
        </p>

        {/* ── Input form ─────────────────────────────────────── */}
        {phase !== "done" && (
          <div style={{
            display:   "flex",
            gap:       "12px",
            flexWrap:  "wrap",
            maxWidth:  "600px",
            marginBottom: phase === "loading" ? "32px" : "0",
          }}>
            <input
              value={domain}
              onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === "Enter" && phase === "idle" && runAudit()}
              placeholder={tx.placeholder}
              disabled={phase === "loading"}
              style={{
                flex:        1,
                minWidth:    "220px",
                background:  "var(--bg3)",
                border:      "1px solid rgba(0,255,200,.18)",
                color:       "white",
                padding:     "13px 18px",
                fontFamily:  "'Courier New',monospace",
                fontSize:    "14px",
                borderRadius:"8px",
                outline:     "none",
                transition:  "border-color .2s",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(0,255,200,.6)")}
              onBlur={e  => (e.target.style.borderColor = "rgba(0,255,200,.18)")}
            />
            <button
              onClick={runAudit}
              disabled={!domain.trim() || phase === "loading"}
              style={{
                padding:      "13px 24px",
                background:   domain.trim() ? "linear-gradient(135deg,#00ffc8,#00b4d8)" : "rgba(0,255,200,.12)",
                color:        domain.trim() ? "#050810" : "rgba(0,255,200,.4)",
                border:       "none",
                borderRadius: "8px",
                fontFamily:   "'Courier New',monospace",
                fontWeight:   700,
                fontSize:     "13px",
                cursor:       domain.trim() && phase === "idle" ? "pointer" : "not-allowed",
                transition:   "all .2s",
                whiteSpace:   "nowrap",
              }}
            >
              {tx.cta}
            </button>
          </div>
        )}

        {/* ── Loading state ───────────────────────────────────── */}
        {phase === "loading" && (
          <div style={{
            maxWidth:  "600px",
            padding:   "32px",
            background:"rgba(0,255,200,.03)",
            border:    "1px solid rgba(0,255,200,.1)",
            borderRadius: "14px",
            animation: "auditFadeUp .4s ease",
          }}>
            {/* Spinner */}
            <div style={{
              width: "40px", height: "40px",
              border: "3px solid rgba(0,255,200,.12)",
              borderTop: "3px solid #00ffc8",
              borderRadius: "50%",
              animation: "auditSpin 1s linear infinite",
              marginBottom: "20px",
            }} />

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tx.loading.map((step, i) => (
                <div key={i} style={{
                  display:   "flex",
                  alignItems:"center",
                  gap:       "10px",
                  opacity:   i <= loadStep ? 1 : 0.25,
                  transition:"opacity .4s",
                }}>
                  <span style={{
                    width: "16px", height: "16px",
                    borderRadius: "50%",
                    background: i < loadStep ? "#00ffc8" : i === loadStep ? "rgba(0,255,200,.4)" : "rgba(255,255,255,.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "8px",
                    flexShrink: 0,
                    transition: "background .3s",
                  }}>
                    {i < loadStep ? "✓" : ""}
                  </span>
                  <span style={{
                    fontFamily: "'Courier New',monospace",
                    fontSize:   "12px",
                    color:      i === loadStep ? "white" : "rgba(255,255,255,.4)",
                    transition: "color .3s",
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Error state ─────────────────────────────────────── */}
        {phase === "error" && (
          <div style={{
            maxWidth: "600px",
            padding:  "20px",
            background: "rgba(255,80,80,.06)",
            border:   "1px solid rgba(255,80,80,.2)",
            borderRadius: "10px",
            fontFamily: "'Courier New',monospace",
            fontSize: "13px",
            color:    "#ff8080",
            marginTop: "16px",
          }}>
            ⚠ {errorMsg}
            <button
              onClick={() => { setPhase("idle"); setErrorMsg(""); }}
              style={{ marginLeft: "16px", background: "none", border: "none", color: "var(--cyan)", cursor: "pointer", textDecoration: "underline", fontFamily: "'Courier New',monospace", fontSize: "13px" }}
            >
              Réessayer
            </button>
          </div>
        )}

        {/* ── Results ─────────────────────────────────────────── */}
        {phase === "done" && result && (
          <div style={{ animation: "auditFadeUp .5s ease" }}>

            {/* Headline */}
            <div style={{
              padding:      "24px 28px",
              background:   "linear-gradient(135deg, rgba(0,255,200,.06), rgba(0,180,216,.04))",
              border:       "1px solid rgba(0,255,200,.2)",
              borderRadius: "14px",
              marginBottom: "24px",
              animation:    "auditPop .5s ease",
            }}>
              <p style={{ fontFamily: "'Courier New',monospace", fontSize: "11px", color: "rgba(0,255,200,.6)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: ".1em" }}>
                🌐 {result.domain}
              </p>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(18px,2.5vw,26px)", color: "white", lineHeight: 1.3 }}>
                {result.headline}
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

              {/* LEFT col */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Detected tools */}
                <div style={{
                  padding:      "20px",
                  background:   "var(--bg2)",
                  border:       "1px solid rgba(255,255,255,.06)",
                  borderRadius: "12px",
                }}>
                  <p style={{ fontFamily: "'Courier New',monospace", fontSize: "11px", color: "rgba(0,255,200,.6)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "14px" }}>
                    🔎 {tx.detected}
                  </p>
                  {result.detected && result.detected.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {result.detected.slice(0, 8).map((tool, i) => (
                        <span key={i} style={{
                          padding:      "5px 12px",
                          background:   "rgba(0,255,200,.08)",
                          border:       "1px solid rgba(0,255,200,.2)",
                          borderRadius: "20px",
                          fontFamily:   "'Courier New',monospace",
                          fontSize:     "11px",
                          color:        "#00ffc8",
                          animation:    `auditStagger .3s ease ${i * 60}ms both`,
                        }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontFamily: "'Courier New',monospace", fontSize: "12px", color: "rgba(255,255,255,.3)" }}>
                      {tx.noDetected}
                    </p>
                  )}
                </div>

                {/* Maturity score */}
                <div style={{
                  padding:      "20px",
                  background:   "var(--bg2)",
                  border:       "1px solid rgba(255,255,255,.06)",
                  borderRadius: "12px",
                }}>
                  <p style={{ fontFamily: "'Courier New',monospace", fontSize: "11px", color: "rgba(0,255,200,.6)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "14px" }}>
                    📊 {tx.maturity}
                  </p>
                  <MaturityBar score={result.maturityScore ?? 2} low={tx.maturityLow} high={tx.maturityHigh} />
                </div>

                {/* ROI */}
                <div style={{
                  padding:      "20px",
                  background:   "rgba(245,166,35,.06)",
                  border:       "1px solid rgba(245,166,35,.2)",
                  borderRadius: "12px",
                }}>
                  <p style={{ fontFamily: "'Courier New',monospace", fontSize: "11px", color: "rgba(245,166,35,.7)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "10px" }}>
                    {tx.roi}
                  </p>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(16px,2vw,22px)", color: "#f5a623", lineHeight: 1.3 }}>
                    {result.roiEstimate}
                  </p>
                </div>
              </div>

              {/* RIGHT col */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Opportunities */}
                <div style={{
                  padding:      "20px",
                  background:   "var(--bg2)",
                  border:       "1px solid rgba(255,255,255,.06)",
                  borderRadius: "12px",
                }}>
                  <p style={{ fontFamily: "'Courier New',monospace", fontSize: "11px", color: "rgba(0,255,200,.6)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "14px" }}>
                    ⚡ {tx.opportunities}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {(result.opportunities ?? []).map((opp, i) => (
                      <div key={i} style={{
                        padding:   "14px",
                        background:"rgba(255,255,255,.03)",
                        border:    "1px solid rgba(255,255,255,.06)",
                        borderRadius:"8px",
                        borderLeft:`3px solid ${"#00ffc8a0 #a78bfaa0 #f5a623a0".split(" ")[i] ?? "#00ffc8a0"}`,
                        animation: `auditStagger .4s ease ${i * 100}ms both`,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "13px", color: "white", lineHeight: 1.3 }}>
                            {opp.title}
                          </p>
                          <span style={{ padding: "3px 8px", background: "rgba(0,255,200,.1)", borderRadius: "6px", fontFamily: "'Courier New',monospace", fontSize: "10px", color: "#00ffc8", whiteSpace: "nowrap", flexShrink: 0 }}>
                            {opp.saving}
                          </span>
                        </div>
                        <p style={{ fontFamily: "Arial,sans-serif", fontSize: "12px", color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
                          {opp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Win */}
                <div style={{
                  padding:      "20px",
                  background:   "rgba(0,255,200,.04)",
                  border:       "1px solid rgba(0,255,200,.15)",
                  borderRadius: "12px",
                }}>
                  <p style={{ fontFamily: "'Courier New',monospace", fontSize: "12px", color: "#00ffc8", fontWeight: 700, marginBottom: "8px" }}>
                    {tx.quickWin}
                  </p>
                  <p style={{ fontFamily: "Arial,sans-serif", fontSize: "13px", color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
                    {result.quickWin}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
              <a
                href="/#cta"
                style={{
                  padding:      "13px 28px",
                  background:   "linear-gradient(135deg,#00ffc8,#00b4d8)",
                  color:        "#050810",
                  fontFamily:   "'Courier New',monospace",
                  fontWeight:   700,
                  fontSize:     "13px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow:    "0 0 20px rgba(0,255,200,.3)",
                  transition:   "all .2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,200,.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,200,.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                {tx.startProject}
              </a>
              <button
                onClick={() => { setPhase("idle"); setResult(null); setDomain(""); }}
                style={{
                  padding:      "13px 24px",
                  background:   "transparent",
                  color:        "rgba(255,255,255,.5)",
                  border:       "1px solid rgba(255,255,255,.12)",
                  borderRadius: "8px",
                  fontFamily:   "'Courier New',monospace",
                  fontSize:     "13px",
                  cursor:       "pointer",
                  transition:   "all .2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.12)"; }}
              >
                {tx.tryAnother}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
