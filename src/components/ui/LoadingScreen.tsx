"use client";
import { useState, useEffect } from "react";

const LINES = [
  { text: "> Initializing Oussama HQ...",          delay: 0    },
  { text: "> Loading AI modules",                   delay: 600  },
  { text: "> Connecting to n8n engine...",          delay: 1100 },
  { text: "> GPT-4o bridge — online ✓",            delay: 1500 },
  { text: "> Lead Hunter — ready ✓",               delay: 1800 },
  { text: "> All systems operational.",             delay: 2100 },
  { text: "> Welcome.",                             delay: 2500 },
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress,     setProgress    ] = useState(0);
  const [leaving,      setLeaving     ] = useState(false);

  useEffect(() => {
    /* Affiche les lignes une par une */
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        setProgress(Math.round(((i + 1) / LINES.length) * 100));
      }, line.delay);
    });

    /* Déclenche la sortie */
    setTimeout(() => {
      setLeaving(true);
      setTimeout(onDone, 700);
    }, 3000);
  }, [onDone]);

  return (
    <>
      <style>{`
        @keyframes lsSlideOut {
          from { opacity:1; transform:translateY(0); }
          to   { opacity:0; transform:translateY(-100%); }
        }
        @keyframes lsCursor {
          0%,49%  { opacity:1; }
          50%,100%{ opacity:0; }
        }
        @keyframes lsBarFill {
          from { width:0%; }
        }
        @keyframes lsLineIn {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
      `}</style>

      <div style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: "#050810",
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: leaving ? "lsSlideOut .65s cubic-bezier(.4,0,.2,1) forwards" : "none",
      }}>
        {/* Grid background */}
        <div style={{
          position:   "absolute",
          inset:      0,
          backgroundImage: "linear-gradient(rgba(0,255,200,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,200,.03) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{
          fontFamily:    "'Courier New', monospace",
          fontSize:      "clamp(22px,3vw,32px)",
          color:         "#00ffc8",
          letterSpacing: ".12em",
          marginBottom:  "40px",
          textShadow:    "0 0 30px rgba(0,255,200,.5)",
          fontWeight:    700,
        }}>
          OUSSAMA<span style={{ color:"rgba(0,255,200,.4)" }}>_HQ</span>
        </div>

        {/* Terminal box */}
        <div style={{
          width:        "min(520px,90vw)",
          background:   "rgba(0,0,0,.5)",
          border:       "1px solid rgba(0,255,200,.2)",
          borderRadius: "12px",
          padding:      "24px 28px",
          backdropFilter: "blur(12px)",
        }}>
          {LINES.map((line, i) => (
            visibleLines.includes(i) && (
              <div key={i} style={{
                fontFamily:    "'Courier New', monospace",
                fontSize:      "13px",
                color:         i === LINES.length - 1 ? "#00ffc8" : i >= LINES.length - 2 ? "rgba(0,255,200,.8)" : "rgba(0,255,200,.5)",
                marginBottom:  "6px",
                animation:     "lsLineIn .3s ease",
                fontWeight:    i === LINES.length - 1 ? 700 : 400,
              }}>
                {line.text}
                {i === visibleLines[visibleLines.length - 1] && (
                  <span style={{ animation:"lsCursor 0.8s step-end infinite", marginLeft:"2px" }}>█</span>
                )}
              </div>
            )
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          width:        "min(520px,90vw)",
          marginTop:    "16px",
          height:       "2px",
          background:   "rgba(255,255,255,.06)",
          borderRadius: "99px",
          overflow:     "hidden",
        }}>
          <div style={{
            height:     "100%",
            width:      `${progress}%`,
            background: "linear-gradient(90deg,#00ffc8,#00e5ff)",
            borderRadius: "99px",
            boxShadow:  "0 0 8px rgba(0,255,200,.6)",
            transition: "width .4s ease",
          }} />
        </div>

        <p style={{
          fontFamily:    "'Courier New', monospace",
          fontSize:      "10px",
          color:         "rgba(0,255,200,.3)",
          marginTop:     "10px",
          letterSpacing: ".15em",
        }}>
          {progress}% — CHARGEMENT
        </p>
      </div>
    </>
  );
}
