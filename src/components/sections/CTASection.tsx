"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

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

/* ── Project Brief Modal ─────────────────────────────────── */
function ProjectBriefModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", problem: "", tools: "", budget: "",
  });
  const [phase, setPhase] = useState<"form" | "sending" | "success">("form");

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
            <div style={{ fontSize: "52px", marginBottom: "20px" }}>✅</div>
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
              }}>
                ⚠ {submitError} — Vérifiez votre connexion ou contactez-moi directement.
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
              {phase === "sending" ? "⏳ Envoi en cours..." : "📨 Envoyer mon brief →"}
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
}: {
  briefOpen?: boolean;
  onBriefOpenChange?: (v: boolean) => void;
}) {
  const ref = useFadeIn<HTMLDivElement>();
  const [_modalOpen, _setModalOpen] = useState(false);
  const modalOpen    = briefOpen    ?? _modalOpen;
  const setModalOpen = onBriefOpenChange ?? _setModalOpen;

  return (
    <>
      <section id="cta" style={{ padding: "100px 24px", background: "var(--bg2)", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }} ref={ref} className="fade-in">
          <p className="section-label" style={{ textAlign: "center" }}>// Prochaine étape</p>
          <h2 style={{
            fontFamily: "var(--sans)", fontWeight: 800, color: "white", lineHeight: 1.1,
            fontSize: "clamp(28px, 5vw, 52px)", marginBottom: "20px",
          }}>
            Prêt à automatiser<br />
            <span className="text-cyan">votre prochain projet ?</span>
          </h2>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)",
            lineHeight: 1.8, marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px",
          }}>
            Décrivez votre besoin en 2 minutes. Je vous réponds avec une analyse personnalisée et une estimation concrète sous 24h. Pas de réunion inutile.
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
            📨 Démarrer un projet →
          </button>

          {/* Trust signals */}
          <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "28px", flexWrap: "wrap" }}>
            {[
              { icon: "⚡", text: "Réponse sous 24h" },
              { icon: "🔒", text: "NDA disponible sur demande" },
              { icon: "🎯", text: "Devis gratuit & sans engagement" },
            ].map(s => (
              <div key={s.text} style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)",
              }}>
                <span>{s.icon}</span>
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
