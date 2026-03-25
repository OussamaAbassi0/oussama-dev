"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "oussama_welcome_dismissed";

const SHORTCUTS = [
  { label: "💰 Calculer mon ROI",    href: "/lab#roi",      color: "#ff4d6d" },
  { label: "⚡ Trouver des leads",   href: "/lab#lead-hunter", color: "#00ffc8" },
  { label: "🚀 Démarrer un projet",  href: "#cta",          color: "#a78bfa" },
];

export default function WelcomeBanner() {
  const [visible, setVisible]   = useState(false);
  const [leaving, setLeaving]   = useState(false);

  useEffect(() => {
    /* N'affiche que si jamais dismissé */
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      /* Petit délai pour ne pas bloquer le paint initial */
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setLeaving(true);
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setVisible(false), 380);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes bannerSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes bannerSlideUp {
          from { transform: translateY(0);     opacity: 1; }
          to   { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>

      <div style={{
        position:   "fixed",
        top:        "60px",          /* juste sous la navbar */
        left:       0,
        right:      0,
        zIndex:     49,
        background: "linear-gradient(90deg, #07090f, #0a0e18, #07090f)",
        borderBottom: "1px solid rgba(0,229,255,.15)",
        padding:    "10px 24px",
        display:    "flex",
        alignItems: "center",
        gap:        "16px",
        flexWrap:   "wrap",
        animation:  leaving
          ? "bannerSlideUp .35s ease forwards"
          : "bannerSlideDown .4s cubic-bezier(.4,0,.2,1)",
        boxShadow:  "0 4px 24px rgba(0,0,0,.4)",
      }}>

        {/* Emoji + texte */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "200px" }}>
          <span style={{ fontSize: "18px" }}>👋</span>
          <p style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize:   "13px",
            color:      "rgba(255,255,255,.75)",
            lineHeight: 1.4,
          }}>
            <strong style={{ color: "white" }}>Première visite ?</strong>{" "}
            Commencez par le{" "}
            <a href="/lab" onClick={dismiss} style={{ color: "#ff4d6d", textDecoration: "underline", cursor: "pointer" }}>
              Calculateur de ROI
            </a>
            {" "}— 30 secondes pour voir ce que vous perdez chaque mois.
          </p>
        </div>

        {/* Boutons rapides */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {SHORTCUTS.map(s => (
            <a
              key={s.href}
              href={s.href}
              onClick={dismiss}
              style={{
                padding:        "6px 14px",
                background:     `${s.color}15`,
                border:         `1px solid ${s.color}35`,
                borderRadius:   "20px",
                fontFamily:     "'Courier New', monospace",
                fontSize:       "11px",
                color:          s.color,
                textDecoration: "none",
                whiteSpace:     "nowrap",
                transition:     "background .15s, border-color .15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background   = `${s.color}28`;
                (e.currentTarget as HTMLElement).style.borderColor  = `${s.color}70`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background   = `${s.color}15`;
                (e.currentTarget as HTMLElement).style.borderColor  = `${s.color}35`;
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Fermer */}
        <button
          onClick={dismiss}
          aria-label="Fermer"
          style={{
            background:   "none",
            border:       "none",
            color:        "rgba(255,255,255,.3)",
            cursor:       "pointer",
            fontSize:     "18px",
            lineHeight:   1,
            padding:      "2px 4px",
            flexShrink:   0,
            transition:   "color .15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.3)")}
        >×</button>
      </div>
    </>
  );
}
