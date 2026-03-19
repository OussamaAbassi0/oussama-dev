"use client";
import { useState, useEffect } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

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
      paddingTop: "100px", paddingBottom: "60px", padding: "100px 24px 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "20%", right: "5%", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(0,255,200,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: 0, width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 12px", borderRadius: "20px",
            background: "rgba(0,255,200,0.15)", border: "1px solid rgba(0,255,200,0.2)",
            fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700,
            color: "var(--cyan)", letterSpacing: "0.08em",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "var(--red)",
              animation: "livePulse 1.5s ease-in-out infinite",
            }} />
            Expérience interactive — Pas un portfolio
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--sans)", fontWeight: 800,
          fontSize: "clamp(40px, 7vw, 90px)", lineHeight: 1.0,
          color: "white", marginBottom: "8px",
        }}>
          Votre business peut<br />
          <span style={{ color: "var(--cyan)", textShadow: "0 0 40px rgba(0,255,200,0.3)" }}>
            {WORDS[wIdx]}
          </span>
        </h1>

        <p style={{
          fontFamily: "var(--mono)", fontSize: "14px", color: "var(--text-dim)",
          maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px", marginTop: "24px",
        }}>
          Je suis Oussama — développeur spécialisé IA. Testez mes outils{" "}
          <span style={{ color: "var(--cyan)" }}>en temps réel ci-dessous</span>.
          Pas de jargon. Pas de promesses. Juste des résultats concrets pour votre business.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <a href="#lead-hunter" style={{
            padding: "12px 28px", background: "var(--cyan)", color: "var(--bg)",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
            borderRadius: "6px", textDecoration: "none", letterSpacing: "0.05em",
            transition: "all 0.2s",
          }}>
            ⚡ Lancer le Lab →
          </a>
          <a href="#stack" style={{
            padding: "10px 24px", background: "transparent", color: "var(--cyan)",
            fontFamily: "var(--mono)", fontSize: "12px",
            border: "1px solid rgba(0,255,200,0.2)", borderRadius: "6px",
            textDecoration: "none", transition: "all 0.2s",
          }}>
            Voir mon stack tech
          </a>
        </div>

        {/* Hint Ctrl+K */}
        <div style={{
          marginTop: "20px",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ fontSize: "13px", opacity: 0.4 }}>💡</span>
          <p style={{
            fontFamily: "var(--mono)", fontSize: "11px",
            color: "rgba(255,255,255,0.28)", lineHeight: 1,
          }}>
            Astuce pro : appuyez sur{" "}
            <kbd style={{
              display: "inline-flex", alignItems: "center", gap: "2px",
              padding: "1px 6px",
              background: "rgba(0,229,255,0.07)",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: "4px",
              fontFamily: "var(--mono)", fontSize: "11px",
              color: "rgba(0,229,255,0.65)",
            }}>
              Ctrl + K
            </kbd>
            {" "}pour ouvrir le centre de commande.
          </p>
        </div>

        {/* Stats */}
        <div style={{ marginTop: "72px", display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {[
            { val: 12000, suffix: "+", label: "Leads générés automatiquement" },
            { val: 340, suffix: "h", label: "Économisées pour mes clients / mois" },
            { val: 98, suffix: "%", label: "Taux de satisfaction client" },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "var(--mono)", fontWeight: 700, color: "var(--cyan)",
                fontSize: "clamp(24px, 3vw, 36px)",
              }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </div>
              <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
