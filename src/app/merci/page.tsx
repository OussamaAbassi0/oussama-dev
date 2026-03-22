"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const STEPS = [
  { icon: "📨", title: "Brief reçu",            desc: "Votre message est arrivé. Oussama l'a lu." },
  { icon: "🔍", title: "Analyse sous 24h",      desc: "Analyse de votre besoin et identification de la solution optimale." },
  { icon: "📋", title: "Plan d'action concret", desc: "Vous recevez un chiffrage précis et un plan étape par étape." },
  { icon: "🚀", title: "On démarre",            desc: "Si tout vous convient, on lance le projet. Zéro surprise." },
];

export default function MerciPage() {
  const [visible, setVisible] = useState(false);
  const [count,   setCount  ] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);

    /* Compteur animé — nombre de projets */
    let c = 0;
    const interval = setInterval(() => {
      c += 1;
      setCount(c);
      if (c >= 47) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "#050810",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "40px 24px",
      position:       "relative",
      overflow:       "hidden",
    }}>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes confetti { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
        @keyframes gridGlow { 0%,100%{opacity:.03} 50%{opacity:.06} }
      `}</style>

      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,255,200,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,200,.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "gridGlow 4s ease-in-out infinite",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,255,200,.08) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Confetti particles */}
      {visible && Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left:     `${Math.random() * 100}%`,
          top:      "-20px",
          width:    `${4 + Math.random() * 6}px`,
          height:   `${4 + Math.random() * 6}px`,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          background: ["#00ffc8","#00e5ff","#a78bfa","#f5a623","#ff4d6d"][i % 5],
          animation: `confetti ${2 + Math.random() * 3}s ease ${Math.random() * 2}s forwards`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}

      <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", width: "100%", textAlign: "center" }}>

        {/* Icône succès */}
        <div style={{
          width: "90px", height: "90px", borderRadius: "50%",
          background: "linear-gradient(135deg,rgba(0,255,200,.15),rgba(0,229,255,.1))",
          border: "2px solid rgba(0,255,200,.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "40px", margin: "0 auto 32px",
          boxShadow: "0 0 40px rgba(0,255,200,.2)",
          animation: visible ? "fadeUp .6s ease both, pulse 3s 1s ease-in-out infinite" : "none",
        }}>
          ✅
        </div>

        {/* Titre */}
        <h1 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(28px,5vw,48px)", color: "white",
          lineHeight: 1.1, marginBottom: "16px",
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeUp .6s .1s ease both" : "none",
        }}>
          Brief envoyé.<br />
          <span style={{ color: "#00ffc8" }}>Je reviens sous 24h.</span>
        </h1>

        {/* Sous-titre */}
        <p style={{
          fontFamily: "Arial,sans-serif", fontSize: "16px",
          color: "rgba(255,255,255,.55)", lineHeight: 1.7,
          marginBottom: "48px",
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeUp .6s .2s ease both" : "none",
        }}>
          Votre message a bien été reçu. Oussama analyse votre besoin
          et vous répond avec une solution concrète et un chiffrage précis.
        </p>

        {/* Timeline de ce qui va se passer */}
        <div style={{
          background: "rgba(255,255,255,.03)",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: "16px", padding: "28px 32px",
          marginBottom: "40px", textAlign: "left",
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeUp .6s .3s ease both" : "none",
        }}>
          <p style={{
            fontFamily: "'Courier New',monospace", fontSize: "11px",
            color: "rgba(0,255,200,.6)", letterSpacing: ".15em",
            textTransform: "uppercase", marginBottom: "24px",
          }}>
            // Ce qui se passe maintenant
          </p>

          {STEPS.map((step, i) => (
            <div key={step.title} style={{
              display: "flex", gap: "16px", alignItems: "flex-start",
              marginBottom: i < STEPS.length - 1 ? "20px" : "0",
              position: "relative",
            }}>
              {/* Ligne verticale */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: "absolute", left: "19px", top: "36px",
                  width: "1px", height: "20px",
                  background: "rgba(0,255,200,.15)",
                }} />
              )}

              {/* Icône */}
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: i === 0 ? "rgba(0,255,200,.15)" : "rgba(255,255,255,.04)",
                border: `1px solid ${i === 0 ? "rgba(0,255,200,.3)" : "rgba(255,255,255,.06)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
              }}>
                {step.icon}
              </div>

              <div>
                <p style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700,
                  fontSize: "14px", color: i === 0 ? "white" : "rgba(255,255,255,.6)",
                  marginBottom: "3px",
                }}>
                  {step.title}
                  {i === 0 && (
                    <span style={{
                      marginLeft: "8px", fontSize: "10px",
                      color: "#00ffc8", fontFamily: "'Courier New',monospace",
                      background: "rgba(0,255,200,.1)", padding: "2px 8px",
                      borderRadius: "10px", letterSpacing: ".06em",
                    }}>
                      ✓ FAIT
                    </span>
                  )}
                </p>
                <p style={{
                  fontFamily: "Arial,sans-serif", fontSize: "13px",
                  color: "rgba(255,255,255,.35)", lineHeight: 1.55,
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "16px", marginBottom: "40px", justifyContent: "center",
          flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeUp .6s .4s ease both" : "none",
        }}>
          {[
            { val: `${count}+`, label: "Projets livrés" },
            { val: "< 24h",     label: "Délai de réponse" },
            { val: "100%",      label: "Taux de satisfaction" },
          ].map(s => (
            <div key={s.label} style={{
              flex: 1, minWidth: "120px", padding: "16px",
              background: "rgba(0,255,200,.04)",
              border: "1px solid rgba(0,255,200,.1)",
              borderRadius: "10px", textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'Courier New',monospace", fontWeight: 700,
                fontSize: "22px", color: "#00ffc8", marginBottom: "4px",
              }}>
                {s.val}
              </p>
              <p style={{
                fontFamily: "Arial,sans-serif", fontSize: "11px",
                color: "rgba(255,255,255,.35)",
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeUp .6s .5s ease both" : "none",
        }}>
          <Link href="/" style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg,#00ffc8,#00b4d8)",
            color: "#050810",
            fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "13px",
            borderRadius: "8px", textDecoration: "none", letterSpacing: ".04em",
          }}>
            ← Retour à l&apos;accueil
          </Link>
          <Link href="/blog" style={{
            padding: "12px 24px",
            background: "transparent", color: "rgba(255,255,255,.5)",
            fontFamily: "'Courier New',monospace", fontSize: "12px",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: "8px", textDecoration: "none", transition: "all .2s",
          }}>
            Lire le blog →
          </Link>
        </div>

      </div>
    </div>
  );
}
