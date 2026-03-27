"use client";
import { useLang } from "@/lib/LangContext";

export default function SocialProof() {
  const { lang } = useLang();
  const l = (o: Record<string, string>) => o[lang] ?? o.fr;

  return (
    <section style={{ padding: "48px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,255,255,.35)", letterSpacing: ".08em" }}>
          {l({ fr: "Profils vérifiables :", en: "Verifiable profiles:" })}
        </p>
        <a
          href="https://www.malt.fr/profile/oussamaabassi"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "8px",
            background: "rgba(255,94,58,.08)", border: "1px solid rgba(255,94,58,.25)",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
            color: "#ff5e3a", textDecoration: "none", letterSpacing: ".06em",
            transition: "all .25s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,94,58,.15)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,94,58,.08)"; }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5e3a", display: "inline-block" }} />
          Profil Malt ↗
        </a>
        <a
          href="https://www.upwork.com/freelancers/oussamaabassi"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "8px",
            background: "rgba(20,168,0,.08)", border: "1px solid rgba(20,168,0,.25)",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
            color: "#14a800", textDecoration: "none", letterSpacing: ".06em",
            transition: "all .25s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,168,0,.15)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(20,168,0,.08)"; }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14a800", display: "inline-block" }} />
          Profil Upwork ↗
        </a>
      </div>
    </section>
  );
}
