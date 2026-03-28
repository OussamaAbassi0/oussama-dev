"use client";
import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Mic, Loader2, AlertTriangle, Send, Zap, Lock, Target } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ── Types ───────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  problem: string;
  tools: string;
  budget: string;
}

const BUDGET_OPTIONS = [
  "< 500 €",
  "500 € – 1 500 €",
  "1 500 € – 5 000 €",
  "> 5 000 €",
  "À définir ensemble",
];

/* ── Small reusable input ────────────────────────────────── */
function Field({
  label, name, value, onChange, placeholder, type = "text", required = false,
}: {
  label: string; name: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  type?: string; required?: boolean;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{
        display: "block", fontFamily: "var(--mono)", fontSize: "11px",
        color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: "8px",
      }}>
        {label} {required && <span style={{ color: "var(--red)" }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%", background: "var(--bg3)",
          border: "1px solid rgba(0,255,200,0.12)", color: "var(--text)",
          padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "13px",
          borderRadius: "6px", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={e => {
          e.target.style.borderColor = "var(--cyan)";
          e.target.style.boxShadow = "0 0 0 3px rgba(0,255,200,0.08)";
        }}
        onBlur={e => {
          e.target.style.borderColor = "rgba(0,255,200,0.12)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function TextAreaField({
  label, name, value, onChange, placeholder, required = false,
}: {
  label: string; name: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{
        display: "block", fontFamily: "var(--mono)", fontSize: "11px",
        color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: "8px",
      }}>
        {label} {required && <span style={{ color: "var(--red)" }}>*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        style={{
          width: "100%", background: "var(--bg3)",
          border: "1px solid rgba(0,255,200,0.12)", color: "var(--text)",
          padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "13px",
          borderRadius: "6px", outline: "none", resize: "vertical",
          transition: "border-color 0.2s, box-shadow 0.2s",
          lineHeight: 1.6,
        }}
        onFocus={e => {
          e.target.style.borderColor = "var(--cyan)";
          e.target.style.boxShadow = "0 0 0 3px rgba(0,255,200,0.08)";
        }}
        onBlur={e => {
          e.target.style.borderColor = "rgba(0,255,200,0.12)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

/* ─── Voice CSS injected once ──────────────────────────────── */
const VOICE_CSS = `
@keyframes voicePulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,80,80,0); }
  50%      { box-shadow: 0 0 0 8px rgba(255,80,80,0.2); }
}
@keyframes voiceWave {
  0%,100% { transform: scaleY(0.4); }
  50%      { transform: scaleY(1); }
}
@keyframes voiceFillIn {
  from { opacity: 0; max-height: 0; }
  to   { opacity: 1; max-height: 200px; }
}
@keyframes fieldTypeIn {
  from { background: rgba(0,255,200,.08); }
  to   { background: var(--bg3); }
}
`;

/* ── Project Brief Modal ─────────────────────────────────── */
function ProjectBriefModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLang();
  const [form, setForm] = useState<FormData>({
    name: "", email: "", problem: "", tools: "", budget: "",
  });
  const [phase, setPhase] = useState<"form" | "sending" | "success">("form");

  /* ── Voice state ── */
  const [voicePhase,  setVoicePhase ] = useState<"idle" | "listening" | "processing">("idle");
  const [voiceError,  setVoiceError ] = useState<string | null>(null);
  const [transcript,  setTranscript ] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const cssInjected    = useRef(false);

  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const el = document.createElement("style");
    el.textContent = VOICE_CSS;
    document.head.appendChild(el);
  }, []);

  const voiceLabels: Record<string, { listen: string; processing: string; error: string; transcript: string; noSupport: string }> = {
    fr: { listen: "Parler mon brief", processing: "Analyse en cours...", error: "Erreur micro", transcript: "Votre brief oral :", noSupport: "Micro non supporté sur ce navigateur" },
    en: { listen: "Speak my brief", processing: "Analysing...", error: "Mic error", transcript: "Your spoken brief:", noSupport: "Microphone not supported in this browser" },
    ar: { listen: "تحدث عن مشروعي", processing: "جارٍ التحليل...", error: "خطأ في الميكروفون", transcript: "ملخصك الشفهي:", noSupport: "الميكروفون غير مدعوم" },
    es: { listen: "Hablar mi brief", processing: "Analizando...", error: "Error de micro", transcript: "Tu brief oral:", noSupport: "Micrófono no soportado" },
    nl: { listen: "Spreek mijn brief", processing: "Analyseren...", error: "Microfoon fout", transcript: "Jouw gesproken brief:", noSupport: "Microfoon niet ondersteund" },
  };
  const vl = voiceLabels[lang] ?? voiceLabels.fr;

  /* Start/stop listening */
  const toggleVoice = () => {
    if (voicePhase === "listening") {
      recognitionRef.current?.stop();
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) { setVoiceError(vl.noSupport); return; }

    const rec = new SR();
    rec.lang        = lang === "ar" ? "ar-SA" : lang === "nl" ? "nl-NL" : lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "fr-FR";
    rec.continuous  = true;
    rec.interimResults = false;

    let fullText = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        fullText += e.results[i][0].transcript + " ";
      }
      setTranscript(fullText.trim());
    };

    rec.onerror = () => { setVoiceError(vl.error); setVoicePhase("idle"); };

    rec.onend = async () => {
      setVoicePhase("processing");
      try {
        const res  = await fetch("/api/voice-brief", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: fullText.trim(), lang }),
        });
        const data = await res.json();

        /* Animate field fill-in */
        const typeIn = (key: keyof FormData, value: string) => {
          if (!value) return;
          setForm(f => ({ ...f, [key]: value }));
        };
        typeIn("name",    data.name    ?? "");
        typeIn("email",   data.email   ?? "");
        typeIn("problem", data.problem ?? "");
        typeIn("tools",   data.tools   ?? "");
        if (data.budget) setForm(f => ({ ...f, budget: data.budget }));
      } catch {
        setVoiceError(vl.error);
      }
      setVoicePhase("idle");
    };

    recognitionRef.current = rec;
    rec.start();
    setVoicePhase("listening");
    setVoiceError(null);
    setTranscript("");
  };

  const set = (key: keyof FormData) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.problem) return;
    setPhase("sending");
    setSubmitError(null);
    try {
      const res = await fetch("/api/webhook-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source:    "Project Brief",
          email:     form.email,
          query:     `[${form.name}] ${form.problem}${form.tools ? ` | Outils: ${form.tools}` : ""}${form.budget ? ` | Budget: ${form.budget}` : ""}`,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setPhase("success");
      /* Redirection vers la page de confirmation */
      setTimeout(() => { window.location.href = "/merci"; }, 1200);
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Erreur d'envoi");
      setPhase("form");
    }
  };

  return (
    /* Backdrop */
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(8,12,16,0.92)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", overflowY: "auto",
      }}
    >
      {/* Modal */}
      <div
        className="glass"
        style={{
          width: "100%", maxWidth: "580px",
          padding: "36px", position: "relative",
          boxShadow: "0 0 60px rgba(0,255,200,0.1), 0 20px 80px rgba(0,0,0,0.6)",
          animation: "slideIn 0.3s ease",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "20px",
            background: "none", border: "none", color: "var(--text-dim)",
            fontSize: "22px", cursor: "pointer", lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "white")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
        >
          ×
        </button>

        {phase === "success" ? (
          /* ── Success state ── */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ marginBottom: "20px", color: "#00ffc8", display:"flex", justifyContent:"center" }}><CheckCircle2 size={52} strokeWidth={1.5} /></div>
            <h3 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "24px", color: "white", marginBottom: "12px" }}>
              Brief reçu !
            </h3>
            <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "28px" }}>
              Je reviendrai vers vous sous <span style={{ color: "var(--cyan)" }}>24h maximum</span> avec une analyse de votre besoin et une estimation concrète.
            </p>
            <button onClick={onClose} style={{
              padding: "12px 28px", background: "var(--cyan)", color: "var(--bg)",
              border: "none", borderRadius: "6px", fontFamily: "var(--mono)",
              fontWeight: 700, fontSize: "13px", cursor: "pointer",
            }}>
              Fermer
            </button>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--cyan)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
                // Project Brief
              </p>
              <h3 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "24px", color: "white", marginBottom: "8px" }}>
                Décrivez votre projet
              </h3>
              <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text-dim)", lineHeight: 1.7 }}>
                Remplissez ce brief en 2 minutes. Je vous réponds avec une analyse personnalisée sous 24h.
              </p>
            </div>

            {/* ── Voice-to-Brief button ─────────────────────── */}
            <div style={{ marginBottom: "20px" }}>
              <button
                type="button"
                onClick={toggleVoice}
                style={{
                  width:        "100%",
                  padding:      "11px 16px",
                  background:   voicePhase === "listening"
                    ? "rgba(255,50,50,.12)"
                    : voicePhase === "processing"
                    ? "rgba(255,170,0,.08)"
                    : "rgba(0,255,200,.04)",
                  border:       `1px solid ${voicePhase === "listening" ? "rgba(255,50,50,.4)" : voicePhase === "processing" ? "rgba(255,170,0,.3)" : "rgba(0,255,200,.15)"}`,
                  borderRadius: "6px",
                  cursor:       voicePhase === "processing" ? "wait" : "pointer",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  gap:          "10px",
                  transition:   "all .2s",
                  animation:    voicePhase === "listening" ? "voicePulse 1.4s ease-in-out infinite" : "none",
                }}
                disabled={voicePhase === "processing"}
              >
                {/* Mic icon / waves */}
                {voicePhase === "listening" ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    {[0,1,2,3,4].map(i => (
                      <span key={i} style={{
                        display: "inline-block",
                        width: "3px",
                        height: `${8 + i * 4}px`,
                        background: "#ff5050",
                        borderRadius: "2px",
                        animation: `voiceWave .5s ${i * 80}ms ease-in-out infinite`,
                      }} />
                    ))}
                  </span>
                ) : (
                  <span style={{ color: voicePhase === "processing" ? "#ffaa00" : "var(--cyan)", display:"flex" }}>
                    {voicePhase === "processing" ? <Loader2 size={16} style={{animation:"spin 1s linear infinite"}} /> : <Mic size={16} />}
                  </span>
                )}
                <span style={{
                  fontFamily:  "var(--mono)",
                  fontSize:    "12px",
                  color:       voicePhase === "listening" ? "#ff8080"
                             : voicePhase === "processing" ? "#ffaa00"
                             : "var(--cyan)",
                  letterSpacing: ".05em",
                }}>
                  {voicePhase === "listening"
                    ? "● Écoute en cours — cliquer pour stopper"
                    : voicePhase === "processing"
                    ? vl.processing
                    : `${vl.listen} — remplissage auto des champs`}
                </span>
              </button>

              {/* Error */}
              {voiceError && (
                <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--red)", marginTop: "6px", display:"flex", alignItems:"center", gap:"4px" }}>
                  <AlertTriangle size={11} /> {voiceError}
                </p>
              )}

              {/* Transcript preview */}
              {transcript && (
                <div style={{
                  marginTop:    "8px",
                  padding:      "10px 14px",
                  background:   "rgba(0,255,200,.04)",
                  border:       "1px solid rgba(0,255,200,.1)",
                  borderRadius: "6px",
                  animation:    "voiceFillIn .3s ease",
                }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(0,255,200,.5)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".08em" }}>
                    {vl.transcript}
                  </p>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "rgba(255,255,255,.6)", lineHeight: 1.6 }}>
                    "{transcript}"
                  </p>
                </div>
              )}
            </div>

            {/* Form fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <Field label="Votre nom" name="name" value={form.name} onChange={set("name")} placeholder="Jean Dupont" required />
              <Field label="Email professionnel" name="email" value={form.email} onChange={set("email")} placeholder="jean@company.com" type="email" required />
            </div>

            <TextAreaField
              label="Quel problème voulez-vous résoudre ?"
              name="problem" value={form.problem} onChange={set("problem")}
              placeholder="Ex: Nous passons 15h/semaine à copier des données entre nos outils. Nous voulons automatiser notre prospection LinkedIn..."
              required
            />

            <Field
              label="Outils actuels"
              name="tools" value={form.tools} onChange={set("tools")}
              placeholder="Ex: HubSpot, Google Sheets, Slack, Notion..."
            />

            {/* Budget selector */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{
                display: "block", fontFamily: "var(--mono)", fontSize: "11px",
                color: "var(--cyan)", letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: "10px",
              }}>
                Budget estimé
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => set("budget")(opt)}
                    style={{
                      padding: "8px 14px", borderRadius: "6px", cursor: "pointer",
                      fontFamily: "var(--mono)", fontSize: "12px",
                      border: form.budget === opt ? "1px solid var(--cyan)" : "1px solid rgba(0,255,200,0.12)",
                      background: form.budget === opt ? "rgba(0,255,200,0.12)" : "var(--bg3)",
                      color: form.budget === opt ? "var(--cyan)" : "var(--text-dim)",
                      transition: "all 0.15s",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Error message */}
            {submitError && (
              <div style={{
                marginBottom: "16px", padding: "12px 16px", borderRadius: "6px",
                background: "rgba(255,77,109,0.08)", border: "1px solid rgba(255,77,109,0.2)",
                fontFamily: "var(--mono)", fontSize: "12px", color: "var(--red)",
                display:"flex", alignItems:"center", gap:"6px",
              }}>
                <AlertTriangle size={12} /> {submitError} — Vérifiez votre connexion ou contactez-moi directement.
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.email || !form.problem || phase === "sending"}
              style={{
                width: "100%", padding: "14px",
                background: form.name && form.email && form.problem ? "var(--cyan)" : "rgba(0,255,200,0.2)",
                color: form.name && form.email && form.problem ? "var(--bg)" : "var(--text-dim)",
                border: "none", borderRadius: "6px",
                fontFamily: "var(--mono)", fontWeight: 700, fontSize: "14px",
                cursor: form.name && form.email && form.problem ? "pointer" : "not-allowed",
                transition: "all 0.2s", letterSpacing: "0.05em",
                boxShadow: form.name && form.email && form.problem ? "0 0 20px rgba(0,255,200,0.2)" : "none",
              }}
            >
              <span style={{display:"flex",alignItems:"center",gap:"8px",justifyContent:"center"}}>
                {phase === "sending" ? <><Loader2 size={14} style={{animation:"spin 1s linear infinite"}} /> Envoi en cours...</> : <><Send size={14} /> Envoyer mon brief →</>}
              </span>
            </button>

  
          </>
        )}
      </div>
    </div>
  );
}

/* ── Export du modal pour usage externe (ROI Calculator) ── */
export { ProjectBriefModal as ProjectBriefModalExport };

/* ── CTA Section ─────────────────────────────────────────── */
export default function CTASection({
  briefOpen,
  onBriefOpenChange,
  prefillProblem,
}: {
  briefOpen?: boolean;
  onBriefOpenChange?: (v: boolean) => void;
  prefillProblem?: string;
}) {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();
  const [_modalOpen, _setModalOpen] = useState(false);
  const modalOpen    = briefOpen    ?? _modalOpen;
  const setModalOpen = onBriefOpenChange ?? _setModalOpen;

  return (
    <>
      <section id="cta" style={{ padding: "100px 24px", background: "var(--bg2)", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }} ref={ref} className="fade-in">
          <p className="section-label" style={{ textAlign: "center" }}>{t.cta.label}</p>
          <h2 style={{
            fontFamily: "var(--sans)", fontWeight: 800, color: "white", lineHeight: 1.1,
            fontSize: "clamp(28px, 5vw, 52px)", marginBottom: "20px",
          }}>
            {t.cta.title1}<br />
            <span className="text-cyan">{t.cta.title2}</span>
          </h2>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)",
            lineHeight: 1.8, marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px",
          }}>
            {t.cta.subtitle}
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: "16px 44px", background: "var(--cyan)", color: "var(--bg)",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "15px",
              border: "none", borderRadius: "6px", cursor: "pointer",
              letterSpacing: "0.05em",
              boxShadow: "0 0 30px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-flex", alignItems: "center", gap: "10px",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(0,255,200,0.5), 0 0 80px rgba(0,255,200,0.15)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.1)";
            }}
          >
            <Send size={15} /> {t.cta.send}
          </button>

          {/* Trust signals */}
          <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "28px", flexWrap: "wrap" }}>
            {[
              { icon: <Zap size={13} />, text: lang==="en" ? "Reply within 24h" : lang==="ar" ? "رد خلال 24 ساعة" : lang==="es" ? "Respuesta en 24h" : lang==="nl" ? "Reactie binnen 24u" : "Réponse sous 24h" },
              { icon: <Lock size={13} />, text: lang==="en" ? "NDA available on request" : lang==="ar" ? "اتفاقية سرية متاحة" : lang==="es" ? "NDA disponible bajo petición" : lang==="nl" ? "NDA beschikbaar op aanvraag" : "NDA disponible sur demande" },
              { icon: <Target size={13} />, text: lang==="en" ? "Free & no-commitment quote" : lang==="ar" ? "عرض سعر مجاني بدون التزام" : lang==="es" ? "Presupuesto gratuito sin compromiso" : lang==="nl" ? "Gratis offerte zonder verplichting" : "Devis gratuit & sans engagement" },
            ].map((s, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)",
              }}>
                <span style={{ color: "rgba(0,255,200,.6)" }}>{s.icon}</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Modal */}
      {modalOpen && <ProjectBriefModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
