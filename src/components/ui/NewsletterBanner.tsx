"use client";
import { useState } from "react";
import { Lock, CheckCircle2 } from "lucide-react";

const TEXTS = {
  fr: {
    label:  "// Newsletter",
    title:  "1 conseil d'automatisation par semaine.",
    sub:    "Concret, applicable, gratuit. Rejoignez 200+ dirigeants qui automatisent leur business.",
    placeholder: "votre@email.com",
    cta:    "S'inscrire →",
    ok:     "Vous êtes inscrit ! Premier email dans 24h.",
    count:  "200+ abonnés",
  },
  en: {
    label:  "// Newsletter",
    title:  "1 automation tip per week.",
    sub:    "Concrete, actionable, free. Join 200+ leaders automating their business.",
    placeholder: "your@email.com",
    cta:    "Subscribe →",
    ok:     "You're in! First email in 24h.",
    count:  "200+ subscribers",
  },
  ar: {
    label:  "// النشرة البريدية",
    title:  "نصيحة أتمتة واحدة أسبوعياً.",
    sub:    "عملية، قابلة للتطبيق، مجانية. انضم إلى 200+ مدير يؤتمتون أعمالهم.",
    placeholder: "بريدك@الإلكتروني.com",
    cta:    "← اشترك",
    ok:     "أنت مشترك! أول بريد خلال 24 ساعة.",
    count:  "+200 مشترك",
  },
  es: {
    label:  "// Newsletter",
    title:  "1 consejo de automatización por semana.",
    sub:    "Concreto, aplicable, gratuito. Únete a 200+ directivos que automatizan su negocio.",
    placeholder: "tu@email.com",
    cta:    "Suscribirse →",
    ok:     "¡Estás dentro! Primer email en 24h.",
    count:  "200+ suscriptores",
  },
  nl: {
    label:  "// Nieuwsbrief",
    title:  "1 automatiseringstip per week.",
    sub:    "Concreet, toepasbaar, gratis. Sluit je aan bij 200+ directeuren die hun bedrijf automatiseren.",
    placeholder: "uw@email.com",
    cta:    "Abonneren →",
    ok:     "Je bent aangemeld! Eerste e-mail binnen 24u.",
    count:  "200+ abonnees",
  },
};

export default function NewsletterBanner({ lang = "fr" }: { lang?: string }) {
  const [email,   setEmail  ] = useState("");
  const [done,    setDone   ] = useState(false);
  const [loading, setLoading] = useState(false);
  const tx = TEXTS[lang as keyof typeof TEXTS] ?? TEXTS.fr;
  const isRTL = lang === "ar";

  const submit = async () => {
    if (!email.includes("@") || loading) return;
    setLoading(true);
    try {
      await fetch("/api/webhook-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Newsletter",
          email,
          query: `Newsletter signup — lang: ${lang}`,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {}
    setDone(true);
    setLoading(false);
  };

  return (
    <div style={{
      margin: "64px 0 0",
      padding: "36px 32px",
      background: "linear-gradient(135deg,rgba(0,255,200,.06),rgba(167,139,250,.04))",
      border: "1px solid rgba(0,255,200,.15)",
      borderRadius: "16px",
      direction: isRTL ? "rtl" : "ltr",
    }}>
      <p style={{
        fontFamily: "'Courier New',monospace", fontSize: "11px",
        color: "rgba(0,255,200,.6)", letterSpacing: ".15em",
        textTransform: "uppercase", marginBottom: "12px",
      }}>
        {tx.label}
      </p>

      <h3 style={{
        fontFamily: "'Syne',sans-serif", fontWeight: 800,
        fontSize: "clamp(18px,2.5vw,24px)", color: "white",
        marginBottom: "10px", lineHeight: 1.2,
      }}>
        {tx.title}
      </h3>

      <p style={{
        fontFamily: "Arial,sans-serif", fontSize: "14px",
        color: "rgba(255,255,255,.5)", marginBottom: "24px", lineHeight: 1.6,
      }}>
        {tx.sub}
      </p>

      {done ? (
        <div style={{
          padding: "14px 20px",
          background: "rgba(0,255,200,.1)", border: "1px solid rgba(0,255,200,.25)",
          borderRadius: "8px",
          fontFamily: "'Courier New',monospace", fontSize: "13px",
          color: "#00ffc8", fontWeight: 700,
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          <CheckCircle2 size={14} />{tx.ok}
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder={tx.placeholder}
            style={{
              flex: 1, minWidth: "200px",
              background: "rgba(0,0,0,.3)",
              border: "1px solid rgba(0,255,200,.15)",
              borderRadius: "8px", color: "white",
              padding: "12px 16px",
              fontFamily: "'Courier New',monospace", fontSize: "13px",
              outline: "none",
            }}
            onFocus={e => (e.target.style.borderColor = "rgba(0,255,200,.4)")}
            onBlur={e  => (e.target.style.borderColor = "rgba(0,255,200,.15)")}
          />
          <button onClick={submit} disabled={loading} style={{
            padding: "12px 24px",
            background: email.includes("@") ? "var(--cyan)" : "rgba(0,255,200,.2)",
            color: email.includes("@") ? "#050810" : "rgba(0,255,200,.4)",
            fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "13px",
            border: "none", borderRadius: "8px", cursor: "pointer",
            transition: "all .2s", whiteSpace: "nowrap",
          }}>
            {loading ? "..." : tx.cta}
          </button>
        </div>
      )}

      <p style={{
        fontFamily: "'Courier New',monospace", fontSize: "10px",
        color: "rgba(255,255,255,.2)", marginTop: "12px",
      }}>
        <Lock size={10} style={{ display:"inline", verticalAlign:"middle", marginRight:"4px" }} />{lang==="en" ? "Zero spam. Unsubscribe in 1 click." : lang==="ar" ? "صفر بريد مزعج. إلغاء الاشتراك بنقرة." : lang==="es" ? "Cero spam. Darse de baja en 1 clic." : lang==="nl" ? "Nul spam. Afmelden in 1 klik." : "Zéro spam. Désabonnement en 1 clic."} {tx.count}.
      </p>
    </div>
  );
}
