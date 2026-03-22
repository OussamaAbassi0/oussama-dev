"use client";
import { useEffect, useState, useRef } from "react";
import { useLang } from "@/lib/LangContext";

const TEXTS = {
  fr: {
    badge:   "Attendez !",
    title:   "Avant de partir —",
    accent:  "calculez ce que vous perdez vraiment.",
    sub:     "2 minutes pour voir combien vos processus manuels vous coûtent chaque mois.",
    cta:     "Calculer mon ROI →",
    no:      "Non merci, je préfère perdre de l'argent",
  },
  en: {
    badge:   "Wait!",
    title:   "Before you leave —",
    accent:  "calculate what you're really losing.",
    sub:     "2 minutes to see how much your manual processes cost you each month.",
    cta:     "Calculate my ROI →",
    no:      "No thanks, I prefer losing money",
  },
  ar: {
    badge:   "انتظر!",
    title:   "قبل أن تغادر —",
    accent:  "احسب ما تخسره فعلاً.",
    sub:     "دقيقتان لمعرفة تكلفة عملياتك اليدوية كل شهر.",
    cta:     "احسب عائدي على الاستثمار ←",
    no:      "لا شكراً، أفضل خسارة المال",
  },
  es: {
    badge:   "¡Espera!",
    title:   "Antes de irte —",
    accent:  "calcula lo que realmente estás perdiendo.",
    sub:     "2 minutos para ver cuánto te cuestan tus procesos manuales cada mes.",
    cta:     "Calcular mi ROI →",
    no:      "No gracias, prefiero perder dinero",
  },
  nl: {
    badge:   "Wacht!",
    title:   "Voordat je vertrekt —",
    accent:  "bereken wat je echt verliest.",
    sub:     "2 minuten om te zien hoeveel uw handmatige processen per maand kosten.",
    cta:     "Mijn ROI berekenen →",
    no:      "Nee bedankt, ik verlies liever geld",
  },
};

export default function ExitIntentPopup() {
  const [visible,  setVisible ] = useState(false);
  const [leaving,  setLeaving ] = useState(false);
  const shown      = useRef(false);
  const { lang }   = useLang();
  const tx = TEXTS[lang as keyof typeof TEXTS] ?? TEXTS.fr;

  useEffect(() => {
    /* Ne se montre qu'une fois par session */
    if (sessionStorage.getItem("exit_shown")) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 10 && !shown.current) {
        shown.current = true;
        sessionStorage.setItem("exit_shown", "1");
        setVisible(true);
      }
    };

    /* Sur mobile — déclenche après 60s */
    const mobileTimer = setTimeout(() => {
      if (!shown.current && window.innerWidth < 768) {
        shown.current = true;
        sessionStorage.setItem("exit_shown", "1");
        setVisible(true);
      }
    }, 60000);

    document.addEventListener("mouseleave", onMouseOut);
    return () => {
      document.removeEventListener("mouseleave", onMouseOut);
      clearTimeout(mobileTimer);
    };
  }, []);

  const close = () => {
    setLeaving(true);
    setTimeout(() => setVisible(false), 400);
  };

  const goROI = () => {
    close();
    setTimeout(() => {
      const roi = document.getElementById("roi");
      if (roi) roi.scrollIntoView({ behavior: "smooth" });
    }, 450);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes exitIn  { from{opacity:0;transform:translate(-50%,-50%) scale(.92)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes exitOut { from{opacity:1;transform:translate(-50%,-50%) scale(1)} to{opacity:0;transform:translate(-50%,-50%) scale(.92)} }
        @keyframes shake   { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-3deg)} 75%{transform:rotate(3deg)} }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(5,8,16,.85)",
          backdropFilter: "blur(6px)",
          opacity: leaving ? 0 : 1,
          transition: "opacity .4s ease",
        }}
      />

      {/* Popup */}
      <div style={{
        position:   "fixed",
        top:        "50%", left: "50%",
        transform:  "translate(-50%,-50%)",
        zIndex:     9001,
        width:      "min(520px,90vw)",
        background: "#07090f",
        border:     "1px solid rgba(0,255,200,.2)",
        borderRadius: "18px",
        padding:    "40px 36px",
        boxShadow:  "0 0 80px rgba(0,255,200,.1), 0 40px 80px rgba(0,0,0,.6)",
        animation:  leaving ? "exitOut .4s ease forwards" : "exitIn .4s cubic-bezier(.34,1.56,.64,1) forwards",
        direction:  lang === "ar" ? "rtl" : "ltr",
      }}>
        {/* Close */}
        <button onClick={close} style={{
          position: "absolute", top: "16px", right: "20px",
          background: "none", border: "none",
          color: "rgba(255,255,255,.3)", fontSize: "22px",
          cursor: "pointer", transition: "color .2s",
          lineHeight: 1,
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "white")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.3)")}
        >×</button>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 12px", borderRadius: "20px",
          background: "rgba(255,77,109,.1)", border: "1px solid rgba(255,77,109,.25)",
          fontFamily: "'Courier New',monospace", fontSize: "11px",
          color: "#ff4d6d", fontWeight: 700, letterSpacing: ".06em",
          marginBottom: "20px", animation: "shake 1s ease .5s",
        }}>
          ⚠️ {tx.badge}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(20px,3vw,28px)", color: "white",
          lineHeight: 1.15, marginBottom: "12px",
        }}>
          {tx.title}<br />
          <span style={{ color: "#00ffc8" }}>{tx.accent}</span>
        </h2>

        <p style={{
          fontFamily: "Arial,sans-serif", fontSize: "14px",
          color: "rgba(255,255,255,.5)", lineHeight: 1.65,
          marginBottom: "28px",
        }}>
          {tx.sub}
        </p>

        {/* Visual teaser */}
        <div style={{
          background: "rgba(0,0,0,.3)", borderRadius: "10px",
          padding: "16px 20px", marginBottom: "28px",
          border: "1px solid rgba(255,255,255,.06)",
          fontFamily: "'Courier New',monospace", fontSize: "12px",
          color: "rgba(0,255,200,.6)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>3 pers. × 10h × 35€/h × 47 sem</span>
            <span style={{ color: "#ff4d6d" }}>= ?</span>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,.06)", margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(255,255,255,.35)" }}>Coût annuel de l&apos;inaction</span>
            <span style={{
              background: "rgba(255,77,109,.15)", color: "#ff4d6d",
              padding: "2px 10px", borderRadius: "6px", fontWeight: 700,
            }}>
              49 350 €/an
            </span>
          </div>
        </div>

        {/* CTA principal */}
        <button onClick={goROI} style={{
          width: "100%", padding: "14px",
          background: "linear-gradient(135deg,#00ffc8,#00b4d8)",
          color: "#050810",
          fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "14px",
          border: "none", borderRadius: "10px", cursor: "pointer",
          letterSpacing: ".04em", marginBottom: "12px",
          boxShadow: "0 0 30px rgba(0,255,200,.3)",
          transition: "box-shadow .2s, transform .2s",
        }}
          onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="0 0 50px rgba(0,255,200,.5)"; el.style.transform="translateY(-1px)"; }}
          onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="0 0 30px rgba(0,255,200,.3)"; el.style.transform="translateY(0)"; }}
        >
          {tx.cta}
        </button>

        {/* Lien de refus */}
        <button onClick={close} style={{
          width: "100%", background: "none", border: "none",
          fontFamily: "Arial,sans-serif", fontSize: "11px",
          color: "rgba(255,255,255,.2)", cursor: "pointer",
          textDecoration: "underline", padding: "4px",
          transition: "color .2s",
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.2)")}
        >
          {tx.no}
        </button>
      </div>
    </>
  );
}
