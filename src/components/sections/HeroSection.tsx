"use client";
import { useState, useEffect } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";

const WORDS = ["Automatisez.", "Scalez.", "Dominez."];

export default function HeroSection() {
  const [wIdx, setWIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWIdx(i => (i + 1) % WORDS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="grid-bg noise-overlay" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "120px 24px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"20%", right:"5%", width:"400px", height:"400px", background:"radial-gradient(circle,rgba(0,255,200,.08) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", left:0, width:"300px", height:"300px", background:"radial-gradient(circle,rgba(245,166,35,.06) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />

      <div style={{ maxWidth:"1100px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>

        {/* Badges top */}
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"28px", alignItems:"center" }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:"6px",
            padding:"5px 14px", borderRadius:"20px",
            background:"rgba(0,255,200,.12)", border:"1px solid rgba(0,255,200,.2)",
            fontFamily:"var(--mono)", fontSize:"11px", fontWeight:700,
            color:"var(--cyan)", letterSpacing:".06em",
          }}>
            <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"var(--red)", animation:"livePulse 1.5s ease-in-out infinite" }} />
            Lab interactif — Testez en direct
          </span>
          <AvailabilityBadge />
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily:"var(--sans)", fontWeight:800,
          fontSize:"clamp(38px,7vw,88px)", lineHeight:1.02,
          color:"white", marginBottom:"10px",
        }}>
          Votre business peut<br />
          <span style={{ color:"var(--cyan)", textShadow:"0 0 40px rgba(0,255,200,.3)" }}>
            {WORDS[wIdx]}
          </span>
        </h1>

        {/* Sous-titre clair, humain */}
        <p style={{
          fontFamily:"Arial,Helvetica,sans-serif", fontSize:"17px",
          color:"rgba(255,255,255,.65)",
          maxWidth:"560px", lineHeight:1.75, marginBottom:"36px", marginTop:"20px",
        }}>
          Je suis <strong style={{ color:"white" }}>Oussama</strong> — développeur spécialisé en IA et automatisation.{" "}
          Mon but : <strong style={{ color:"var(--cyan)" }}>vous faire gagner du temps et de l&apos;argent</strong>,
          pas vous vendre du code.
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center", marginBottom:"20px" }}>
          <a href="#roi" style={{
            padding:"13px 30px", background:"var(--cyan)", color:"var(--bg)",
            fontFamily:"var(--mono)", fontWeight:700, fontSize:"13px",
            borderRadius:"8px", textDecoration:"none", letterSpacing:".04em",
            boxShadow:"0 0 24px rgba(0,255,200,.3)", transition:"all .2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow="0 0 40px rgba(0,255,200,.5)"; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow="0 0 24px rgba(0,255,200,.3)"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
          >
            💰 Calculer mon ROI gratuit
          </a>

          <a href="#lead-hunter" style={{
            padding:"11px 24px", background:"transparent", color:"var(--cyan)",
            fontFamily:"var(--mono)", fontSize:"12px",
            border:"1px solid rgba(0,255,200,.25)", borderRadius:"8px",
            textDecoration:"none", transition:"all .2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(0,255,200,.06)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(0,255,200,.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.borderColor="rgba(0,255,200,.25)"; }}
          >
            ⚡ Tester les outils →
          </a>

          <a href="#cta" style={{
            padding:"11px 24px", background:"transparent", color:"rgba(255,255,255,.45)",
            fontFamily:"var(--mono)", fontSize:"12px",
            border:"1px solid rgba(255,255,255,.1)", borderRadius:"8px",
            textDecoration:"none", transition:"all .2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.25)"; (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.7)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.45)"; }}
          >
            🚀 Démarrer un projet
          </a>
        </div>

        {/* Hint Ctrl+K — discret */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"64px" }}>
          <span style={{ fontSize:"12px", opacity:.35 }}>💡</span>
          <p style={{ fontFamily:"var(--mono)", fontSize:"11px", color:"rgba(255,255,255,.25)" }}>
            Astuce : appuyez sur{" "}
            <kbd style={{ padding:"1px 6px", background:"rgba(0,229,255,.07)", border:"1px solid rgba(0,229,255,.2)", borderRadius:"4px", fontFamily:"var(--mono)", fontSize:"11px", color:"rgba(0,229,255,.6)" }}>
              Ctrl + K
            </kbd>
            {" "}pour naviguer rapidement
          </p>
        </div>

        {/* Stats — avec séparateurs */}
        <div style={{
          display:"flex", gap:"0", flexWrap:"wrap",
          padding:"24px 28px",
          background:"rgba(255,255,255,.03)",
          border:"1px solid rgba(255,255,255,.07)",
          borderRadius:"12px",
          backdropFilter:"blur(8px)",
        }}>
          {[
            { val:12000, suffix:"+", label:"Leads générés automatiquement" },
            { val:340,   suffix:"h", label:"Économisées / mois pour mes clients" },
            { val:98,    suffix:"%", label:"Taux de satisfaction client" },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex:1, minWidth:"140px", textAlign:"center",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,.07)" : "none",
              padding:"0 24px",
            }}>
              <div style={{ fontFamily:"var(--mono)", fontWeight:700, color:"var(--cyan)", fontSize:"clamp(22px,2.5vw,32px)" }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </div>
              <p style={{ fontFamily:"Arial,sans-serif", fontSize:"12px", color:"rgba(255,255,255,.4)", marginTop:"4px", lineHeight:1.4 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
