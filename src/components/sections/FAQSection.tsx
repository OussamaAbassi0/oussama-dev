"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

export default function FAQSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  const FAQS = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
  ];

  return (
    <section id="faq" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <style>{`
        @keyframes faqOpen {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth: "780px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-label" style={{ display: "flex", justifyContent: "center" }}>
            {t.faq.label}
          </p>
          <h2 style={{
            fontFamily: "var(--sans)", fontWeight: 800,
            fontSize:   "clamp(26px, 4vw, 38px)",
            color:      "white", lineHeight: 1.2,
          }}>
            {t.faq.title1}<br />
            <span style={{ color: "var(--cyan)" }}>{t.faq.title2}</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background:   isOpen ? "#0a0f1a" : "#07090f",
                border:       `1px solid ${isOpen ? "rgba(0,229,255,.25)" : "rgba(255,255,255,.07)"}`,
                borderRadius: "10px", overflow: "hidden",
                transition:   "border-color .2s, background .2s",
              }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width:"100%", display:"flex", alignItems:"center",
                    justifyContent:"space-between", gap:"16px",
                    padding:"18px 22px", background:"none", border:"none",
                    cursor:"pointer", textAlign:"left",
                  }}
                >
                  <span style={{
                    fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14.5px",
                    fontWeight:600, color: isOpen ? "white" : "rgba(255,255,255,.8)",
                    lineHeight:1.4, transition:"color .2s",
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    width:"26px", height:"26px", borderRadius:"50%",
                    background:     isOpen ? "rgba(0,229,255,.15)" : "rgba(255,255,255,.05)",
                    border:         `1px solid ${isOpen ? "rgba(0,229,255,.3)" : "rgba(255,255,255,.1)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, fontFamily:"var(--mono)", fontSize:"14px",
                    color:     isOpen ? "var(--cyan)" : "rgba(255,255,255,.4)",
                    transition:"all .2s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding:"0 22px 18px", animation:"faqOpen .2s ease" }}>
                    <div style={{ height:"1px", background:"rgba(0,229,255,.08)", marginBottom:"14px" }} />
                    <p style={{
                      fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px",
                      color:"rgba(255,255,255,.6)", lineHeight:1.7,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop:"40px", textAlign:"center", padding:"28px",
          background:"rgba(0,229,255,.04)", border:"1px solid rgba(0,229,255,.1)",
          borderRadius:"12px",
        }}>
          <p style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", color:"rgba(255,255,255,.6)", marginBottom:"16px" }}>
            {t.faq.question}
          </p>
          <a href="#cta" style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"10px 22px", background:"var(--cyan)", color:"var(--bg)",
            fontFamily:"var(--mono)", fontWeight:700, fontSize:"12px",
            borderRadius:"6px", textDecoration:"none", letterSpacing:".04em",
          }}>
            {t.faq.questionCta}
          </a>
        </div>
      </div>
    </section>
  );
}
