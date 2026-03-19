"use client";
import { useFadeIn } from "@/hooks/useFadeIn";

const STEPS = [
  {
    num:   "01",
    icon:  "🧪",
    title: "Testez les outils",
    desc:  "Essayez gratuitement le chercheur de prospects, le calculateur de ROI ou le générateur de workflow. Aucune inscription requise — les résultats sont immédiats.",
    color: "#00ffc8",
    link:  "#lead-hunter",
    cta:   "Tester maintenant",
  },
  {
    num:   "02",
    icon:  "📋",
    title: "Décrivez votre projet",
    desc:  "Remplissez le formulaire de brief en 2 minutes. Pas de jargon technique — expliquez simplement votre problème avec vos mots.",
    color: "#a78bfa",
    link:  "#cta",
    cta:   "Remplir le brief",
  },
  {
    num:   "03",
    icon:  "✅",
    title: "Recevez une analyse sous 24h",
    desc:  "Oussama vous répond avec une solution concrète, un chiffrage et un plan d'action. Pas de promesses vagues — des résultats mesurables.",
    color: "#f5a623",
    link:  "#cta",
    cta:   "Démarrer",
  },
];

export default function HowItWorksSection() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section id="how-it-works" style={{ padding: "80px 24px", background: "var(--bg)" }}>
      <style>{`
        @keyframes connectorPulse {
          0%,100% { opacity:.2; }
          50%      { opacity:.6; }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label" style={{ justifyContent: "center", display: "flex" }}>
            // Comment ça marche
          </p>
          <h2 style={{
            fontFamily: "var(--sans)", fontWeight: 800,
            fontSize:   "clamp(26px, 4vw, 42px)",
            color:      "white", lineHeight: 1.2, marginBottom: "14px",
          }}>
            3 étapes simples.<br />
            <span style={{ color: "var(--cyan)" }}>Zéro jargon technique.</span>
          </h2>
          <p style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize:   "15px",
            color:      "rgba(255,255,255,.5)",
            maxWidth:   "480px",
            margin:     "0 auto",
            lineHeight: 1.65,
          }}>
            Que vous soyez dirigeant, commercial ou responsable RH — ce processus est fait pour vous.
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 40px 1fr 40px 1fr",
          gap:                 "0",
          alignItems:          "start",
        }}>
          {STEPS.map((step, i) => (
            <>
              {/* Card */}
              <div key={step.num} style={{
                background:   "#07090f",
                border:       `1px solid ${step.color}20`,
                borderRadius: "14px",
                padding:      "28px 24px",
                position:     "relative",
                overflow:     "hidden",
                transition:   "border-color .25s, box-shadow .25s, transform .25s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor  = `${step.color}50`;
                  el.style.boxShadow    = `0 0 28px ${step.color}12`;
                  el.style.transform    = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor  = `${step.color}20`;
                  el.style.boxShadow    = "none";
                  el.style.transform    = "translateY(0)";
                }}
              >
                {/* Corner glow */}
                <div style={{
                  position:   "absolute",
                  top:        "-30px",
                  right:      "-30px",
                  width:      "100px",
                  height:     "100px",
                  borderRadius:"50%",
                  background: `radial-gradient(circle, ${step.color}18 0%, transparent 70%)`,
                  pointerEvents:"none",
                }} />

                {/* Numéro */}
                <div style={{
                  fontFamily:    "var(--mono)",
                  fontSize:      "11px",
                  color:         step.color,
                  opacity:       0.6,
                  letterSpacing: ".2em",
                  marginBottom:  "12px",
                }}>
                  ÉTAPE {step.num}
                </div>

                {/* Icône */}
                <div style={{
                  width:          "52px",
                  height:         "52px",
                  borderRadius:   "12px",
                  background:     `${step.color}12`,
                  border:         `1px solid ${step.color}25`,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "24px",
                  marginBottom:   "16px",
                }}>
                  {step.icon}
                </div>

                {/* Titre */}
                <h3 style={{
                  fontFamily:   "var(--sans)",
                  fontWeight:   700,
                  fontSize:     "18px",
                  color:        "white",
                  marginBottom: "10px",
                  lineHeight:   1.3,
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize:   "13.5px",
                  color:      "rgba(255,255,255,.55)",
                  lineHeight: 1.65,
                  marginBottom:"20px",
                }}>
                  {step.desc}
                </p>

                {/* CTA */}
                <a href={step.link} style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "6px",
                  fontFamily:     "var(--mono)",
                  fontSize:       "11px",
                  color:          step.color,
                  textDecoration: "none",
                  letterSpacing:  ".04em",
                  transition:     "gap .15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = "10px"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = "6px"}
                >
                  {step.cta} →
                </a>

                {/* Bottom line */}
                <div style={{
                  position:   "absolute",
                  bottom:     0,
                  left:       "20%",
                  right:      "20%",
                  height:     "1px",
                  background: `linear-gradient(90deg, transparent, ${step.color}40, transparent)`,
                }} />
              </div>

              {/* Connecteur entre steps */}
              {i < STEPS.length - 1 && (
                <div key={`conn-${i}`} style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  paddingTop:     "70px",
                }}>
                  <div style={{
                    width:      "100%",
                    height:     "2px",
                    background: "linear-gradient(90deg, rgba(0,229,255,.15), rgba(0,229,255,.4), rgba(0,229,255,.15))",
                    animation:  "connectorPulse 2.5s ease-in-out infinite",
                    position:   "relative",
                  }}>
                    {/* Flèche */}
                    <div style={{
                      position:   "absolute",
                      right:      "-1px",
                      top:        "50%",
                      transform:  "translateY(-50%)",
                      width:      0,
                      height:     0,
                      borderTop:  "5px solid transparent",
                      borderBottom:"5px solid transparent",
                      borderLeft: "7px solid rgba(0,229,255,.4)",
                    }} />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>

        {/* Reassurance bar */}
        <div style={{
          marginTop:    "48px",
          padding:      "16px 24px",
          background:   "rgba(0,229,255,.04)",
          border:       "1px solid rgba(0,229,255,.1)",
          borderRadius: "10px",
          display:      "flex",
          alignItems:   "center",
          justifyContent:"center",
          gap:          "32px",
          flexWrap:     "wrap",
        }}>
          {[
            { icon: "🔒", text: "Aucune inscription requise" },
            { icon: "⚡", text: "Résultats en temps réel" },
            { icon: "🎯", text: "100% gratuit à tester" },
            { icon: "💬", text: "Réponse sous 24h garantie" },
          ].map(item => (
            <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize:   "12.5px",
                color:      "rgba(255,255,255,.55)",
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
