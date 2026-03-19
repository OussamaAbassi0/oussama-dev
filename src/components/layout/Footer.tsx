"use client";
import { useState, useEffect, useRef } from "react";

const HOURLY_RATE = 35; // € — taux moyen par défaut

function useElapsedSeconds() {
  const [secs, setSecs] = useState(0);
  const start = useRef(Date.now());
  useEffect(() => {
    const t = setInterval(() => setSecs(Math.floor((Date.now() - start.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  return secs;
}

function TimeLostWidget() {
  const secs    = useElapsedSeconds();
  const cost    = ((secs / 3600) * HOURLY_RATE).toFixed(2);
  const minutes = Math.floor(secs / 60);
  const secsRem = secs % 60;
  const time    = `${String(minutes).padStart(2,"0")}:${String(secsRem).padStart(2,"0")}`;

  return (
    <div style={{
      padding:"16px 24px",
      background:"rgba(255,77,109,.06)",
      border:"1px solid rgba(255,77,109,.15)",
      borderRadius:"10px",
      textAlign:"center",
      maxWidth:"380px",
      margin:"0 auto 24px",
    }}>
      <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"rgba(255,77,109,.7)", letterSpacing:".15em", marginBottom:"6px" }}>
        ⏱ EN LISANT CETTE PAGE, VOUS AVEZ PERDU
      </p>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px" }}>
        <span style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"22px", color:"#ff4d6d" }}>
          {time}
        </span>
        <span style={{ fontFamily:"var(--mono)", fontSize:"11px", color:"rgba(255,255,255,.3)" }}>×</span>
        <span style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"22px", color:"#f5a623" }}>
          {cost} €
        </span>
      </div>
      <p style={{ fontFamily:"Arial,sans-serif", fontSize:"11px", color:"rgba(255,255,255,.3)", marginTop:"6px" }}>
        Basé sur {HOURLY_RATE}€/h · Automatisez avant que ça continue →
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{
      padding:"40px 24px 28px",
      borderTop:"1px solid rgba(0,255,200,0.1)",
      background:"var(--bg)",
    }}>
      <TimeLostWidget />

      <div style={{
        textAlign:"center",
        fontFamily:"var(--mono)", fontSize:"11px",
        color:"var(--text-dim)",
        display:"flex", alignItems:"center", justifyContent:"center",
        gap:"16px", flexWrap:"wrap",
      }}>
        <span>© 2026 Oussama Abassi · Full-Stack Dev & Expert IA</span>
        <span style={{ opacity:.3 }}>·</span>
        <a href="#cta" style={{ color:"var(--cyan)", textDecoration:"none", opacity:.6 }}>Démarrer un projet</a>
        <span style={{ opacity:.3 }}>·</span>
        <a href="https://www.malt.fr/profile/oussamaabassi1" target="_blank" rel="noopener noreferrer" style={{ color:"var(--text-dim)", textDecoration:"none", opacity:.6 }}>Malt</a>
      </div>
    </footer>
  );
}
