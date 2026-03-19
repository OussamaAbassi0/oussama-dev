"use client";
import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER
══════════════════════════════════════════════════════════ */
const COMPARISONS = [
  {
    icon:   "📧",
    topic:  "Gestion des emails",
    before: { label: "AVANT", color: "#ff4d6d", items: ["4h de tri emails / jour", "Réponses oubliées", "Stress permanent", "Priorités mélangées"] },
    after:  { label: "APRÈS", color: "#00ffc8", items: ["8 minutes / jour", "Réponses auto personnalisées", "Zéro email oublié", "Priorités gérées par IA"] },
  },
  {
    icon:   "🎯",
    topic:  "Prospection commerciale",
    before: { label: "AVANT", color: "#ff4d6d", items: ["15 leads / semaine manuels", "3h de recherche / jour", "Données souvent fausses", "Suivi impossible à tenir"] },
    after:  { label: "APRÈS", color: "#00ffc8", items: ["340 leads / semaine auto", "0h de recherche manuelle", "Données enrichies et vérifiées", "Suivi entièrement automatisé"] },
  },
  {
    icon:   "👥",
    topic:  "Recrutement RH",
    before: { label: "AVANT", color: "#ff4d6d", items: ["2 jours de tri CVs", "3 personnes mobilisées", "Bons profils passés à la trappe", "Entretiens mal organisés"] },
    after:  { label: "APRÈS", color: "#00ffc8", items: ["20 minutes de tri IA", "1 agent autonome", "Score 94/100 sur chaque profil", "Entretiens planifiés automatiquement"] },
  },
  {
    icon:   "📊",
    topic:  "Reporting & KPIs",
    before: { label: "AVANT", color: "#ff4d6d", items: ["6h de consolidation / semaine", "Excel mis à jour à la main", "Données toujours en retard", "Erreurs fréquentes"] },
    after:  { label: "APRÈS", color: "#00ffc8", items: ["0h — tout est automatique", "Dashboard en temps réel", "Rapport envoyé chaque lundi", "Zéro erreur humaine"] },
  },
];

export default function BeforeAfterSection() {
  const [active, setActive]   = useState(0);
  const [reveal, setReveal]   = useState(false);
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const comp = COMPARISONS[active];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = Math.max(5, Math.min(95, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  };

  /* Auto-reveal after tab switch */
  useEffect(() => {
    setReveal(false);
    setSliderX(50);
    const t = setTimeout(() => setReveal(true), 400);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section id="before-after" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <style>{`
        @keyframes baReveal { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <p className="section-label">// Transformation concrète</p>
        <h2 className="section-title">
          La différence est <span className="text-cyan">visible</span>
        </h2>
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"36px", maxWidth:"480px", lineHeight:1.65 }}>
          Comparez votre quotidien avant et après l&apos;automatisation. Glissez le curseur pour révéler la transformation.
        </p>

        {/* Topic tabs */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"32px" }}>
          {COMPARISONS.map((c, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding:"8px 18px", borderRadius:"24px",
              background: active===i ? "var(--cyan)" : "rgba(255,255,255,.04)",
              color:       active===i ? "var(--bg)"  : "rgba(255,255,255,.5)",
              border:      `1px solid ${active===i ? "var(--cyan)" : "rgba(255,255,255,.1)"}`,
              fontFamily:"Arial,sans-serif", fontSize:"13px", fontWeight: active===i ? 700:400,
              cursor:"pointer", transition:"all .2s",
            }}>
              {c.icon} {c.topic}
            </button>
          ))}
        </div>

        {/* Slider container */}
        <div
          ref={containerRef}
          onMouseDown={() => { dragging.current = true; }}
          onMouseUp={() => { dragging.current = false; }}
          onMouseLeave={() => { dragging.current = false; }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{ position:"relative", borderRadius:"16px", overflow:"hidden", cursor:"ew-resize", userSelect:"none", height:"300px", animation:"baReveal .4s ease" }}
        >
          {/* BEFORE panel (full width, clipped) */}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(135deg,#1a0610,#0d0208)",
            border:"1px solid rgba(255,77,109,.2)",
            display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px",
          }}>
            <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"#ff4d6d", letterSpacing:".2em", marginBottom:"20px" }}>
              😩 AVANT — {comp.topic}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {comp.before.items.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ color:"#ff4d6d", fontSize:"14px", flexShrink:0 }}>✗</span>
                  <span style={{ fontFamily:"Arial,sans-serif", fontSize:"14px", color:"rgba(255,255,255,.7)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AFTER panel (clipped to sliderX) */}
          <div style={{
            position:"absolute", inset:0,
            clipPath:`inset(0 ${100-sliderX}% 0 0)`,
            background:"linear-gradient(135deg,#041210,#060f12)",
            border:"1px solid rgba(0,255,200,.25)",
            display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px",
            transition:"clip-path .05s",
          }}>
            <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"#00ffc8", letterSpacing:".2em", marginBottom:"20px" }}>
              ✅ APRÈS — {comp.topic}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {comp.after.items.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ color:"#00ffc8", fontSize:"14px", flexShrink:0 }}>✓</span>
                  <span style={{ fontFamily:"Arial,sans-serif", fontSize:"14px", color:"rgba(255,255,255,.85)", fontWeight:500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slider handle */}
          <div style={{
            position:"absolute", top:0, bottom:0,
            left:`${sliderX}%`, transform:"translateX(-50%)",
            width:"3px", background:"white", zIndex:10,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <div style={{
              width:"36px", height:"36px", borderRadius:"50%",
              background:"white", border:"2px solid rgba(0,0,0,.2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"14px", boxShadow:"0 4px 16px rgba(0,0,0,.4)",
              cursor:"ew-resize",
            }}>⇔</div>
          </div>
        </div>

        <p style={{ textAlign:"center", fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.2)", marginTop:"12px" }}>
          ← Glissez le curseur pour révéler →
        </p>
      </div>
    </section>
  );
}
