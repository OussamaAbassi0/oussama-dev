"use client";
import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ── Translations ────────────────────────────────────────── */
const EMAIL_TRANS: Record<string, {
  sectionLabel: string;
  titleMain: string;
  titleAccent: string;
  companyLabel: string;
  companyPlaceholder: string;
  sectorLabel: string;
  contextLabel: string;
  contextPlaceholder: string;
  generateBtn: string;
  generating: string;
  copyBtn: string;
  copiedBtn: string;
  ctaBtn: string;
  subjectLabel: string;
  waitingLine1: string;
  waitingLine2: string;
  waitingLine3: string;
  sectors: string[];
}> = {
  fr: {
    sectionLabel:       "// Outil 3",
    titleMain:          "Générateur d'Email",
    titleAccent:        "de Prospection IA",
    companyLabel:       "Entreprise cible",
    companyPlaceholder: "Nexvia, Decathlon, Airbus...",
    sectorLabel:        "Secteur",
    contextLabel:       "Contexte (optionnel)",
    contextPlaceholder: "Optionnel : ce que vous savez de l'entreprise...",
    generateBtn:        "⚡ Générer l'email",
    generating:         "⏳ Génération",
    copyBtn:            "📋 Copier",
    copiedBtn:          "✓ Copié !",
    ctaBtn:             "📋 Commander ce type d'automation",
    subjectLabel:       "Objet",
    waitingLine1:       "> Entrez une entreprise et un secteur",
    waitingLine2:       "> L'IA génère un email personnalisé",
    waitingLine3:       "> en moins de 3 secondes",
    sectors: ["SaaS/Tech", "E-commerce", "RH/Recrutement", "Immobilier", "Finance", "Santé", "Industrie", "Autre"],
  },
  en: {
    sectionLabel:       "// Tool 3",
    titleMain:          "AI Prospecting",
    titleAccent:        "Email Generator",
    companyLabel:       "Target company",
    companyPlaceholder: "Nexvia, Decathlon, Airbus...",
    sectorLabel:        "Sector",
    contextLabel:       "Context (optional)",
    contextPlaceholder: "Optional: what you know about the company...",
    generateBtn:        "⚡ Generate email",
    generating:         "⏳ Generating",
    copyBtn:            "📋 Copy",
    copiedBtn:          "✓ Copied!",
    ctaBtn:             "📋 Order this type of automation",
    subjectLabel:       "Subject",
    waitingLine1:       "> Enter a company and sector",
    waitingLine2:       "> AI generates a personalized email",
    waitingLine3:       "> in less than 3 seconds",
    sectors: ["SaaS/Tech", "E-commerce", "HR/Recruiting", "Real Estate", "Finance", "Healthcare", "Industry", "Other"],
  },
  ar: {
    sectionLabel:       "// الأداة 3",
    titleMain:          "مولّد بريد",
    titleAccent:        "التنقيب بالذكاء الاصطناعي",
    companyLabel:       "الشركة المستهدفة",
    companyPlaceholder: "Nexvia, Decathlon, Airbus...",
    sectorLabel:        "القطاع",
    contextLabel:       "السياق (اختياري)",
    contextPlaceholder: "اختياري: ما تعرفه عن الشركة...",
    generateBtn:        "⚡ توليد البريد",
    generating:         "⏳ جاري التوليد",
    copyBtn:            "📋 نسخ",
    copiedBtn:          "✓ تم النسخ!",
    ctaBtn:             "📋 طلب هذا النوع من الأتمتة",
    subjectLabel:       "الموضوع",
    waitingLine1:       "> أدخل شركة وقطاع",
    waitingLine2:       "> يولّد الذكاء الاصطناعي بريداً مخصصاً",
    waitingLine3:       "> في أقل من 3 ثوانٍ",
    sectors: ["SaaS/تقنية", "تجارة إلكترونية", "موارد بشرية", "عقارات", "مالية", "صحة", "صناعة", "أخرى"],
  },
  es: {
    sectionLabel:       "// Herramienta 3",
    titleMain:          "Generador de Email",
    titleAccent:        "de Prospección IA",
    companyLabel:       "Empresa objetivo",
    companyPlaceholder: "Nexvia, Decathlon, Airbus...",
    sectorLabel:        "Sector",
    contextLabel:       "Contexto (opcional)",
    contextPlaceholder: "Opcional: lo que sabes de la empresa...",
    generateBtn:        "⚡ Generar email",
    generating:         "⏳ Generando",
    copyBtn:            "📋 Copiar",
    copiedBtn:          "✓ ¡Copiado!",
    ctaBtn:             "📋 Pedir este tipo de automatización",
    subjectLabel:       "Asunto",
    waitingLine1:       "> Introduce una empresa y sector",
    waitingLine2:       "> La IA genera un email personalizado",
    waitingLine3:       "> en menos de 3 segundos",
    sectors: ["SaaS/Tech", "E-commerce", "RRHH/Reclutamiento", "Inmobiliaria", "Finanzas", "Salud", "Industria", "Otro"],
  },
  nl: {
    sectionLabel:       "// Tool 3",
    titleMain:          "AI Prospectie",
    titleAccent:        "E-mailgenerator",
    companyLabel:       "Doelbedrijf",
    companyPlaceholder: "Nexvia, Decathlon, Airbus...",
    sectorLabel:        "Sector",
    contextLabel:       "Context (optioneel)",
    contextPlaceholder: "Optioneel: wat u weet over het bedrijf...",
    generateBtn:        "⚡ E-mail genereren",
    generating:         "⏳ Genereren",
    copyBtn:            "📋 Kopiëren",
    copiedBtn:          "✓ Gekopieerd!",
    ctaBtn:             "📋 Bestel dit type automatisering",
    subjectLabel:       "Onderwerp",
    waitingLine1:       "> Voer een bedrijf en sector in",
    waitingLine2:       "> AI genereert een gepersonaliseerde e-mail",
    waitingLine3:       "> in minder dan 3 seconden",
    sectors: ["SaaS/Tech", "E-commerce", "HR/Werving", "Vastgoed", "Financiën", "Gezondheidszorg", "Industrie", "Overig"],
  },
};

/* ── Typewriter hook ─────────────────────────────────────── */
function useTypewriter(text: string, speed = 20) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) { setDisplayed(""); setDone(false); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Dots loading animation ──────────────────────────────── */
function LoadingDots() {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const iv = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 400);
    return () => clearInterval(iv);
  }, []);
  return <span style={{ color: "var(--cyan)" }}>{dots}</span>;
}

/* ── Main Section ─────────────────────────────────────────── */
export default function EmailGeneratorSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tr = EMAIL_TRANS[lang] ?? EMAIL_TRANS.fr;

  const [company, setCompany]   = useState("");
  const [sector, setSector]     = useState("");
  const [context, setContext]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [subject, setSubject]   = useState("");
  const [body, setBody]         = useState("");
  const [copied, setCopied]     = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const { displayed: displayedBody } = useTypewriter(body, 20);

  const hasResult = subject || body;

  const generate = async () => {
    if (!company.trim() || !sector) return;
    setLoading(true);
    setError(null);
    setSubject("");
    setBody("");
    try {
      const res = await fetch("/api/email-generator", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ company: company.trim(), sector, context, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setSubject(data.subject ?? "");
      setBody(data.body ?? "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur de génération");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!subject && !body) return;
    const text = `Objet: ${subject}\n\n${body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    background:   "var(--bg3)",
    border:       "1px solid rgba(0,255,200,0.12)",
    color:        "var(--text)",
    padding:      "11px 14px",
    fontFamily:   "var(--mono)",
    fontSize:     "13px",
    borderRadius: "6px",
    outline:      "none",
    transition:   "border-color 0.2s",
    boxSizing:    "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily:    "var(--mono)",
    fontSize:      "11px",
    color:         "rgba(0,255,200,0.7)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom:  "6px",
    display:       "block",
  };

  return (
    <section id="email-gen" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <p className="section-label">{tr.sectionLabel}</p>
        <h2 className="section-title">
          {tr.titleMain}<br />
          <span className="text-cyan">{tr.titleAccent}</span>
        </h2>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "13px",
          color:      "var(--text-dim)", marginBottom: "40px",
          maxWidth:   "520px", lineHeight: 1.7,
        }}>
          {lang === "ar"
            ? "أدخل اسم الشركة والقطاع — يولّد الذكاء الاصطناعي بريداً مخصصاً وفعّالاً في ثوانٍ."
            : lang === "en"
            ? "Enter a company name and sector — AI generates a hyper-personalized B2B email in seconds."
            : lang === "es"
            ? "Introduce el nombre de la empresa y el sector — la IA genera un email B2B hiperpersonalizado en segundos."
            : lang === "nl"
            ? "Voer een bedrijfsnaam en sector in — AI genereert in seconden een hypergepersonaliseerde B2B-e-mail."
            : "Entrez un nom d'entreprise et un secteur — l'IA génère un email B2B ultra-personnalisé en quelques secondes."}
        </p>

        {/* Two-column grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "28px",
          alignItems:          "start",
        }}>

          {/* ── LEFT: Form ───────────────────────────────── */}
          <div className="glass" style={{
            padding:  "32px",
            border:   "1px solid rgba(0,255,200,0.12)",
            display:  "flex",
            flexDirection: "column",
            gap: "20px",
          }}>

            {/* Company */}
            <div>
              <label style={labelStyle}>{tr.companyLabel}</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                onKeyDown={e => e.key === "Enter" && generate()}
                placeholder={tr.companyPlaceholder}
                disabled={loading}
                style={inputStyle}
                onFocus={e  => (e.target.style.borderColor = "var(--cyan)")}
                onBlur={e   => (e.target.style.borderColor = "rgba(0,255,200,0.12)")}
              />
            </div>

            {/* Sector */}
            <div>
              <label style={labelStyle}>{tr.sectorLabel}</label>
              <select
                value={sector}
                onChange={e => setSector(e.target.value)}
                disabled={loading}
                style={{
                  ...inputStyle,
                  cursor:          "pointer",
                  appearance:      "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2300ffc8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat:   "no-repeat",
                  backgroundPosition: "right 14px center",
                  paddingRight:       "36px",
                  color: sector ? "var(--text)" : "var(--text-dim)",
                }}
                onFocus={e  => (e.target.style.borderColor = "var(--cyan)")}
                onBlur={e   => (e.target.style.borderColor = "rgba(0,255,200,0.12)")}
              >
                <option value="" disabled style={{ background: "var(--bg3)" }}>
                  {lang === "ar" ? "— اختر القطاع —" : lang === "en" ? "— Select sector —" : lang === "es" ? "— Selecciona sector —" : lang === "nl" ? "— Kies sector —" : "— Choisir un secteur —"}
                </option>
                {tr.sectors.map(s => (
                  <option key={s} value={s} style={{ background: "var(--bg3)", color: "var(--text)" }}>{s}</option>
                ))}
              </select>
            </div>

            {/* Context */}
            <div>
              <label style={labelStyle}>{tr.contextLabel}</label>
              <textarea
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder={tr.contextPlaceholder}
                disabled={loading}
                rows={2}
                style={{
                  ...inputStyle,
                  resize:     "vertical",
                  lineHeight: 1.6,
                  minHeight:  "64px",
                }}
                onFocus={e  => (e.target.style.borderColor = "var(--cyan)")}
                onBlur={e   => (e.target.style.borderColor = "rgba(0,255,200,0.12)")}
              />
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={!company.trim() || !sector || loading}
              style={{
                width:        "100%",
                padding:      "13px 24px",
                background:   company.trim() && sector && !loading ? "var(--cyan)" : "rgba(0,255,200,0.15)",
                color:        company.trim() && sector && !loading ? "var(--bg)"   : "var(--text-dim)",
                fontFamily:   "var(--mono)",
                fontWeight:   700,
                fontSize:     "13px",
                border:       "none",
                borderRadius: "6px",
                cursor:       company.trim() && sector && !loading ? "pointer" : "not-allowed",
                transition:   "all 0.2s",
                letterSpacing: "0.04em",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                gap:          "6px",
              }}
            >
              {loading ? <>{tr.generating}<LoadingDots /></> : tr.generateBtn}
            </button>

            {/* Error */}
            {error && (
              <div style={{
                padding:      "10px 14px",
                background:   "rgba(255,77,109,0.08)",
                border:       "1px solid rgba(255,77,109,0.2)",
                borderRadius: "6px",
                fontFamily:   "var(--mono)",
                fontSize:     "11px",
                color:        "var(--red)",
              }}>
                ⚠ {error}
              </div>
            )}
          </div>

          {/* ── RIGHT: Result terminal ───────────────────── */}
          <div style={{
            background:   "#060a12",
            border:       "1px solid rgba(0,255,200,0.25)",
            borderRadius: "12px",
            overflow:     "hidden",
            boxShadow:    "0 0 40px rgba(0,255,200,0.05)",
            minHeight:    "340px",
            display:      "flex",
            flexDirection:"column",
          }}>

            {/* Terminal top bar */}
            <div style={{
              background:  "rgba(0,255,200,0.04)",
              borderBottom:"1px solid rgba(0,255,200,0.12)",
              padding:     "10px 16px",
              display:     "flex",
              alignItems:  "center",
              gap:         "8px",
            }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,77,109,0.6)", display: "inline-block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(245,166,35,0.6)", display: "inline-block" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(0,255,200,0.4)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", marginLeft: "8px" }}>
                email-generator.ai
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

              {!hasResult && !loading ? (
                /* Waiting placeholder */
                <div style={{ fontFamily: "var(--mono)", fontSize: "13px", lineHeight: 2, color: "var(--text-dim)" }}>
                  <p style={{ color: "rgba(0,255,200,0.4)", marginBottom: "12px" }}>// {lang === "ar" ? "في انتظار..." : lang === "en" ? "Waiting..." : lang === "es" ? "En espera..." : lang === "nl" ? "Wachten..." : "En attente..."}</p>
                  <p>{tr.waitingLine1}</p>
                  <p>{tr.waitingLine2}</p>
                  <p>{tr.waitingLine3}</p>
                </div>
              ) : loading ? (
                /* Loading state */
                <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", lineHeight: 2 }}>
                  <p style={{ color: "rgba(0,255,200,0.4)", marginBottom: "12px" }}>// {lang === "ar" ? "جاري التوليد..." : lang === "en" ? "Generating..." : lang === "es" ? "Generando..." : lang === "nl" ? "Genereren..." : "Génération en cours..."}</p>
                  <p>→ {lang === "ar" ? "تحليل الشركة..." : lang === "en" ? "Analyzing company..." : lang === "es" ? "Analizando empresa..." : lang === "nl" ? "Bedrijf analyseren..." : "Analyse de l'entreprise..."}</p>
                  <p>→ {lang === "ar" ? "صياغة البريد..." : lang === "en" ? "Crafting email..." : lang === "es" ? "Redactando email..." : lang === "nl" ? "E-mail opstellen..." : "Rédaction de l'email..."} <LoadingDots /></p>
                </div>
              ) : (
                /* Result */
                <>
                  {/* Subject */}
                  <div style={{
                    background:   "rgba(0,255,200,0.06)",
                    border:       "1px solid rgba(0,255,200,0.2)",
                    borderRadius: "8px",
                    padding:      "12px 16px",
                  }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(0,255,200,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "4px" }}>
                      {tr.subjectLabel}
                    </span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "14px", fontWeight: 700, color: "var(--cyan)" }}>
                      {subject}
                    </span>
                  </div>

                  {/* Body with typewriter */}
                  <div style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize:   "13px",
                    color:      "rgba(255,255,255,0.75)",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                    flex:       1,
                  }}>
                    {displayedBody}
                    {displayedBody.length < body.length && (
                      <span style={{ display: "inline-block", width: "2px", height: "14px", background: "var(--cyan)", marginLeft: "2px", verticalAlign: "middle", animation: "blink 0.8s step-end infinite" }} />
                    )}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                    <button
                      onClick={copy}
                      style={{
                        padding:      "9px 18px",
                        background:   copied ? "rgba(0,255,200,0.15)" : "rgba(0,255,200,0.06)",
                        color:        copied ? "var(--cyan)" : "var(--text-dim)",
                        fontFamily:   "var(--mono)",
                        fontSize:     "12px",
                        fontWeight:   600,
                        border:       "1px solid rgba(0,255,200,0.2)",
                        borderRadius: "6px",
                        cursor:       "pointer",
                        transition:   "all 0.2s",
                      }}
                      onMouseEnter={e => { if (!copied) { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; } }}
                      onMouseLeave={e => { if (!copied) { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"; } }}
                    >
                      {copied ? tr.copiedBtn : tr.copyBtn}
                    </button>

                    <a
                      href="/#cta"
                      style={{
                        padding:        "9px 18px",
                        background:     "rgba(0,255,200,0.06)",
                        color:          "var(--text-dim)",
                        fontFamily:     "var(--mono)",
                        fontSize:       "12px",
                        fontWeight:     600,
                        border:         "1px solid rgba(0,255,200,0.2)",
                        borderRadius:   "6px",
                        cursor:         "pointer",
                        transition:     "all 0.2s",
                        textDecoration: "none",
                        display:        "inline-flex",
                        alignItems:     "center",
                        whiteSpace:     "nowrap",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.4)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,255,200,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.2)"; }}
                    >
                      {tr.ctaBtn}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}
