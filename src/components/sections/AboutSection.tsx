"use client";
import Image from "next/image";
import { useFadeIn } from "@/hooks/useFadeIn";

const TRAITS = [
  { icon: "⚡", label: "Automatisation B2B",  desc: "n8n, Make, Webhooks" },
  { icon: "🧠", label: "IA & Multi-Agents",   desc: "OpenAI, LangGraph, RAG" },
  { icon: "🚀", label: "Full-Stack Dev",       desc: "Next.js, Python, Prisma" },
  { icon: "📈", label: "Résultats mesurables", desc: "+340h/mois, +12k leads" },
];

export default function AboutSection() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section id="about" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <div
        ref={ref}
        className="fade-in"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <p className="section-label">// À propos</p>

        <div style={{
          display:      "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap:          "64px",
          alignItems:   "center",
        }}>

          {/* ── Photo ────────────────────────────────────── */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Glow ring */}
              <div style={{
                position:     "absolute",
                inset:        "-6px",
                borderRadius: "50%",
                background:   "conic-gradient(from 180deg, #00ffc8, #00e5ff, #a78bfa, #00ffc8)",
                filter:       "blur(8px)",
                opacity:      0.45,
                zIndex:       0,
                animation:    "aboutSpin 6s linear infinite",
              }} />

              {/* Photo container */}
              <div style={{
                position:     "relative",
                width:        "240px",
                height:       "240px",
                borderRadius: "50%",
                overflow:     "hidden",
                border:       "3px solid rgba(0,229,255,.25)",
                zIndex:       1,
              }}>
                <Image
                  src="/profile-pic.png"
                  alt="Oussama Abassi"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>

              {/* Badge disponible */}
              <div style={{
                position:       "absolute",
                bottom:         "10px",
                right:          "10px",
                zIndex:         2,
                background:     "#07090f",
                border:         "1px solid rgba(74,222,128,.3)",
                borderRadius:   "20px",
                padding:        "4px 12px",
                display:        "flex",
                alignItems:     "center",
                gap:            "6px",
                fontFamily:     "var(--mono)",
                fontSize:       "10px",
                color:          "#4ade80",
                letterSpacing:  ".06em",
                boxShadow:      "0 0 12px rgba(74,222,128,.15)",
              }}>
                <span style={{
                  width:        "6px",
                  height:       "6px",
                  borderRadius: "50%",
                  background:   "#4ade80",
                  boxShadow:    "0 0 6px #4ade80",
                  animation:    "livePulse 2s ease infinite",
                }} />
                Disponible
              </div>
            </div>
          </div>

          {/* ── Texte ─────────────────────────────────────── */}
          <div>
            <h2 style={{
              fontFamily:   "var(--sans)",
              fontWeight:   800,
              fontSize:     "clamp(28px, 3.5vw, 42px)",
              color:        "white",
              lineHeight:   1.15,
              marginBottom: "20px",
            }}>
              Je suis Oussama,<br />
              <span style={{ color: "var(--cyan)" }}>
                développeur passionné par l&apos;IA
              </span>
            </h2>

            <p style={{
              fontFamily:   "var(--sans)",
              fontSize:     "16px",
              color:        "rgba(255,255,255,.65)",
              lineHeight:   1.75,
              marginBottom: "32px",
              maxWidth:     "520px",
            }}>
              Mon but n&apos;est pas de vous vendre du code.{" "}
              <span style={{ color: "white", fontWeight: 600 }}>
                Mon but est de vous faire gagner du temps et de l&apos;argent.
              </span>{" "}
              Je conçois des systèmes d&apos;automatisation qui travaillent pendant que vous dormez.
            </p>

            {/* Traits */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 "12px",
              marginBottom:        "32px",
            }}>
              {TRAITS.map(t => (
                <div key={t.label} style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "12px",
                  padding:      "12px 16px",
                  background:   "rgba(0,229,255,.04)",
                  border:       "1px solid rgba(0,229,255,.1)",
                  borderRadius: "8px",
                  transition:   "border-color .2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.25)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.1)"}
                >
                  <span style={{ fontSize: "20px", flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "white", fontWeight: 600, marginBottom: "2px" }}>
                      {t.label}
                    </p>
                    <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(0,229,255,.5)", letterSpacing: ".04em" }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#lead-hunter"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "8px",
                padding:       "12px 24px",
                background:    "var(--cyan)",
                color:         "var(--bg)",
                fontFamily:    "var(--mono)",
                fontWeight:    700,
                fontSize:      "13px",
                borderRadius:  "6px",
                textDecoration:"none",
                letterSpacing: ".04em",
                boxShadow:     "0 0 20px rgba(0,255,200,.25)",
                transition:    "box-shadow .2s, transform .2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(0,255,200,.5)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,200,.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Tester mes outils ⚡
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aboutSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
