"use client";
import { useState, useEffect, useRef } from "react";

/* Chiffres de base réalistes — s'incrémentent en live */
const BASE = {
  workflows: 3,
  tasks:     1247,
  hours:     89,
  leads:     342,
};

/* Vitesses d'incrément (par seconde) */
const SPEED = {
  tasks: 0.4,   // ~1 tâche toutes les 2.5s
  hours: 0.008, // ~1h toutes les 2 min
  leads: 0.06,  // ~1 lead toutes les 16s
};

function fmt(n: number) {
  return Math.floor(n).toLocaleString("fr-FR");
}

export default function LiveStatsCounter() {
  const [vals, setVals] = useState({
    workflows: BASE.workflows,
    tasks:     BASE.tasks,
    hours:     BASE.hours,
    leads:     BASE.leads,
  });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTs = useRef<number>(0);

  /* Incrémentation RAF */
  useEffect(() => {
    const tick = (ts: number) => {
      const dt = lastTs.current ? (ts - lastTs.current) / 1000 : 0;
      lastTs.current = ts;
      setVals(v => ({
        ...v,
        tasks: v.tasks + SPEED.tasks * dt,
        hours: v.hours + SPEED.hours * dt,
        leads: v.leads + SPEED.leads * dt,
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* Scroll listener — apparaît après 300px */
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const STATS = [
    { icon: "⚡", value: `${vals.workflows}`, label: "workflows actifs" },
    { icon: "🔄", value: fmt(vals.tasks),     label: "tâches auto." },
    { icon: "⏱",  value: `${fmt(vals.hours)}h`, label: "économisées" },
    { icon: "🎯", value: fmt(vals.leads),     label: "leads générés" },
  ];

  return (
    <>
      <style>{`
        @keyframes statsSlideIn {
          from { opacity:0; transform:translateY(100%); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes statsSlideOut {
          from { opacity:1; transform:translateY(0); }
          to   { opacity:0; transform:translateY(100%); }
        }
        @keyframes dotFlash {
          0%,100% { opacity:1; }
          50%      { opacity:.3; }
        }
      `}</style>

      <div style={{
        position:   "fixed",
        bottom:     "96px",         /* au-dessus du chatbot */
        left:       "50%",
        transform:  "translateX(-50%)",
        zIndex:     997,
        animation:  visible
          ? "statsSlideIn .4s cubic-bezier(.4,0,.2,1) forwards"
          : "statsSlideOut .3s ease forwards",
        pointerEvents: visible ? "auto" : "none",
      }}>
        <div style={{
          display:      "flex",
          alignItems:   "center",
          gap:          "0",
          background:   "rgba(7,9,15,0.92)",
          border:       "1px solid rgba(0,229,255,.18)",
          borderRadius: "40px",
          padding:      "8px 20px",
          backdropFilter: "blur(12px)",
          boxShadow:    "0 8px 32px rgba(0,0,0,.6), 0 0 0 1px rgba(0,229,255,.06)",
        }}>

          {/* Live dot */}
          <div style={{
            display:    "flex",
            alignItems: "center",
            gap:        "6px",
            marginRight:"16px",
            paddingRight:"16px",
            borderRight:"1px solid rgba(255,255,255,.08)",
          }}>
            <span style={{
              width:  "6px", height: "6px", borderRadius: "50%",
              background: "#4ade80",
              boxShadow:  "0 0 6px #4ade80",
              animation:  "dotFlash 1.5s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily:    "'Courier New', monospace",
              fontSize:      "9px",
              color:         "#4ade80",
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}>
              EN DIRECT
            </span>
          </div>

          {/* Stats */}
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              display:       "flex",
              alignItems:    "center",
              gap:           "6px",
              padding:       "0 14px",
              borderRight:   i < STATS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
            }}>
              <span style={{ fontSize: "13px" }}>{s.icon}</span>
              <div>
                <span style={{
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  fontSize:   "13px",
                  color:      "white",
                  letterSpacing: "-.02em",
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize:   "10px",
                  color:      "rgba(255,255,255,.35)",
                  marginLeft: "4px",
                }}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
