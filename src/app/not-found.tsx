"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count <= 0) {
      window.location.href = "/";
      return;
    }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  const LINES = [
    "> boot Oussama_OS...",
    "> loading route...",
    "> ERROR 404: page not found",
    "> scanning filesystem...",
    "> page introuvable.",
    `> redirection vers / dans ${count}s`,
  ];

  return (
    <div style={{
      minHeight:      "100vh",
      background:     "#050810",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "24px",
      fontFamily:     "'Courier New', monospace",
    }}>
      <style>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes lineIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {/* Grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,255,200,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,200,.03) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Terminal */}
      <div style={{
        width:        "min(560px,90vw)",
        background:   "rgba(0,0,0,.6)",
        border:       "1px solid rgba(0,255,200,.2)",
        borderRadius: "12px",
        padding:      "28px 32px",
        position:     "relative",
        zIndex:       1,
      }}>
        {/* Dots */}
        <div style={{ display:"flex", gap:"6px", marginBottom:"20px" }}>
          {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
            <span key={i} style={{ width:"10px", height:"10px", borderRadius:"50%", background:c }} />
          ))}
          <span style={{ marginLeft:"10px", fontSize:"11px", color:"rgba(255,255,255,.3)" }}>
            bash — 404
          </span>
        </div>

        {/* Lines */}
        {LINES.map((line, i) => (
          <div key={i} style={{
            fontSize:     "13px",
            color:        i === 2 ? "#ff4d6d" : i === LINES.length - 1 ? "#f5a623" : "rgba(0,255,200,.6)",
            marginBottom: "6px",
            fontWeight:   i === 2 ? 700 : 400,
            animation:    `lineIn .3s ease ${i * .1}s both`,
          }}>
            {line}
            {i === LINES.length - 1 && (
              <span style={{ animation:"blink .8s step-end infinite" }}>█</span>
            )}
          </div>
        ))}
      </div>

      {/* 404 big */}
      <div style={{
        fontSize:   "clamp(80px,15vw,160px)",
        fontWeight: 900,
        color:      "transparent",
        WebkitTextStroke: "1px rgba(0,255,200,.15)",
        letterSpacing: "-.04em",
        lineHeight:  1,
        margin:      "32px 0 8px",
        userSelect:  "none",
        position:    "relative",
        zIndex:      1,
      }}>
        404
      </div>

      <p style={{
        fontFamily:    "Arial, sans-serif",
        fontSize:      "16px",
        color:         "rgba(255,255,255,.5)",
        marginBottom:  "32px",
        textAlign:     "center",
        position:      "relative",
        zIndex:        1,
      }}>
        Cette page n&apos;existe pas. Retour à la base dans{" "}
        <strong style={{ color:"#00ffc8" }}>{count}s</strong>.
      </p>

      <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:1 }}>
        <Link href="/" style={{
          padding:        "12px 28px",
          background:     "linear-gradient(135deg,#00ffc8,#00b4d8)",
          color:          "#050810",
          fontFamily:     "'Courier New',monospace",
          fontWeight:     700,
          fontSize:       "13px",
          borderRadius:   "8px",
          textDecoration: "none",
          letterSpacing:  ".04em",
        }}>
          ← Retour à l&apos;accueil
        </Link>
        <Link href="#cta" style={{
          padding:        "12px 24px",
          background:     "transparent",
          color:          "rgba(255,255,255,.5)",
          fontFamily:     "'Courier New',monospace",
          fontSize:       "12px",
          border:         "1px solid rgba(255,255,255,.1)",
          borderRadius:   "8px",
          textDecoration: "none",
        }}>
          Démarrer un projet →
        </Link>
      </div>
    </div>
  );
}
