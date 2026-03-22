"use client";
import { useEffect, useState, useRef } from "react";
import { useLang } from "@/lib/LangContext";

const TEXTS: Record<string, { badge: string; title: string; accent: string; sub: string; cta: string; no: string }> = {
  fr: {
    badge:  "Attendez !",
    title:  "Avant de partir —",
    accent: "calculez ce que vous perdez vraiment.",
    sub:    "2 minutes pour voir combien vos processus manuels vous coûtent chaque mois.",
    cta:    "Calculer mon ROI →",
    no:     "Non merci, je préfère perdre de l'argent",
  },
  en: {
    badge:  "Wait!",
    title:  "Before you leave —",
    accent: "calculate what you're really losing.",
    sub:    "2 minutes to see how much your manual processes cost you each month.",
    cta:    "Calculate my ROI →",
    no:     "No thanks, I prefer losing money",
  },
  ar: {
    badge:  "انتظر!",
    title:  "قبل أن تغادر —",
    accent: "احسب ما تخسره فعلاً.",
    sub:    "دقيقتان لمعرفة تكلفة عملياتك اليدوية كل شهر.",
    cta:    "احسب عائدي على الاستثمار ←",
    no:     "لا شكراً، أفضل خسارة المال",
  },
  es: {
    badge:  "¡Espera!",
    title:  "Antes de irte —",
    accent: "calcula lo que realmente estás perdiendo.",
    sub:    "2 minutos para ver cuánto te cuestan tus procesos manuales cada mes.",
    cta:    "Calcular mi ROI →",
    no:     "No gracias, prefiero perder dinero",
  },
  nl: {
    badge:  "Wacht!",
    title:  "Voordat je vertrekt —",
    accent: "bereken wat je echt verliest.",
    sub:    "2 minuten om te zien hoeveel uw handmatige processen per maand kosten.",
    cta:    "Mijn ROI berekenen →",
    no:     "Nee bedankt, ik verlies liever geld",
  },
};

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const shown    = useRef(false);
  const { lang } = useLang();
  const tx = TEXTS[lang] ?? TEXTS.fr;

  const show = () => {
    if (shown.current) return;
    shown.current = true;
    /* Stocke avec expiration 24h */
    localStorage.setItem("exit_shown", String(Date.now() + 24 * 60 * 60 * 1000));
    setVisible(true);
  };

  useEffect(() => {
    /* Vérifie si déjà vu ET pas expiré */
    const expiry = Number(localStorage.getItem("exit_shown") ?? 0);
    if (expiry && Date.now() < expiry) return;

    /* ── Desktop : souris qui sort par le haut de la fenêtre ── */
    const onMouseMove = (e: MouseEvent) => {
      /* clientY < 5 = souris très proche du bord supérieur */
      if (e.clientY < 5) show();
    };

    /* ── Fallback : scroll vers le haut (intention de partir) ── */
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      /* Scroll vers le haut depuis le milieu de la page */
      if (currentY < lastScrollY && currentY < 200 && lastScrollY > 400) {
        show();
      }
      lastScrollY = currentY;
    };

    /* ── Mobile : déclenche après 45s ── */
    const mobileTimer = setTimeout(() => {
      if (window.innerWidth < 768) show();
    }, 45000);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll",    onScroll,    { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
      clearTimeout(mobileTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    setLeaving(true);
    setTimeout(() => setVisible(false), 350);
  };

  const goROI = () => {
    close();
    setTimeout(() => {
      const el = document.getElementById("roi");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes exitIn  { from{opacity:0;transform:translate(-50%,-50%) scale(.9)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes exitOut { from{opacity:1;transform:translate(-50%,-50%) scale(1)} to{opacity:0;transform:translate(-50%,-50%) scale(.9)} }
        @keyframes badgeShake { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-4deg)} 40%{transform:rotate(4deg)} 60%{transform:rotate(-3deg)} 80%{transform:rotate(3deg)} }
      `}</style>

      {/* Backdrop */}
      <div onClick={close} style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(5,8,16,.88)",
        backdropFilter: "blur(8px)",
        opacity:    leaving ? 0 : 1,
        transition: "opacity .35s ease",
      }} />

      {/* Modal */}
      <div style={{
        position:     "fixed",
        top: "50%",   left: "50%",
        transform:    "translate(-50%,-50%)",
        zIndex:       9001,
        width:        "min(520px,92vw)",
        background:   "#07090f",
        border:       "1px solid rgba(0,255,200,.2)",
        borderRadius: "20px",
        padding:      "40px 36px",
        boxShadow:    "0 0 80px rgba(0,255,200,.12), 0 40px 80px rgba(0,0,0,.7)",
        animation:    leaving
          ? "exitOut .35s ease forwards"
          : "exitIn .4s cubic-bezier(.34,1.56,.64,1) forwards",
        direction:    lang === "ar" ? "rtl" : "ltr",
      }}>

        {/* Bouton fermer */}
        <button onClick={close} style={{
          position: "absolute", top: "16px", right: "20px",
          background: "none", border: "none",
          color: "rgba(255,255,255,.25)", fontSize: "24px",
          cursor: "pointer", lineHeight: 1, padding: "4px",
          transition: "color .2s",
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "white")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.25)")}
        >
          ×
        </button>

        {/* Badge alerte */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "5px 14px", borderRadius: "20px",
          background: "rgba(255,77,109,.1)", border: "1px solid rgba(255,77,109,.3)",
          fontFamily: "'Courier New',monospace", fontSize: "11px",
          color: "#ff4d6d", fontWeight: 700, letterSpacing: ".06em",
          marginBottom: "20px",
          animation: "badgeShake 1s ease .3s both",
        }}>
          ⚠️ {tx.badge}
        </div>

        {/* Titre */}
        <h2 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800,
          fontSize: "clamp(20px,3.5vw,28px)", color: "white",
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

        {/* Aperçu calcul ROI */}
        <div style={{
          background: "rgba(0,0,0,.4)", borderRadius: "10px",
          padding: "16px 20px", marginBottom: "28px",
          border: "1px solid rgba(255,255,255,.06)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: "'Courier New',monospace", fontSize: "12px",
            color: "rgba(0,255,200,.5)", marginBottom: "10px",
          }}>
            <span>3 pers. × 10h × 35€ × 47 sem.</span>
            <span style={{ color: "#ff4d6d" }}>= ?</span>
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,.05)", marginBottom: "10px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Arial,sans-serif", fontSize: "12px", color: "rgba(255,255,255,.35)" }}>
              Coût annuel de l&apos;inaction
            </span>
            <span style={{
              background: "rgba(255,77,109,.15)", color: "#ff4d6d",
              padding: "3px 12px", borderRadius: "6px",
              fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "13px",
            }}>
              49 350 €/an
            </span>
          </div>
        </div>

        {/* CTA principal */}
        <button onClick={goROI} style={{
          width: "100%", padding: "15px",
          background: "linear-gradient(135deg,#00ffc8,#00b4d8)",
          color: "#050810",
          fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "14px",
          border: "none", borderRadius: "10px", cursor: "pointer",
          letterSpacing: ".04em", marginBottom: "12px",
          boxShadow: "0 0 30px rgba(0,255,200,.3)",
          transition: "box-shadow .2s, transform .2s",
        }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = "0 0 50px rgba(0,255,200,.5)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = "0 0 30px rgba(0,255,200,.3)";
            el.style.transform = "translateY(0)";
          }}
        >
          {tx.cta}
        </button>

        {/* Refus */}
        <button onClick={close} style={{
          width: "100%", background: "none", border: "none",
          fontFamily: "Arial,sans-serif", fontSize: "11px",
          color: "rgba(255,255,255,.18)", cursor: "pointer",
          textDecoration: "underline", padding: "6px",
          transition: "color .2s",
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.18)")}
        >
          {tx.no}
        </button>
      </div>
    </>
  );
}
