"use client";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ─────────────────────────────────────────────────────────────
   SOCIAL PROOF — remplace les témoignages
   2 vrais clients · 3 avis · 5/5 · Liens Malt & Upwork
───────────────────────────────────────────────────────────── */

const REVIEWS = [
  {
    author: "Matys · PLATINUMAAA",
    source: "Upwork",
    sourceColor: "#14a800",
    date: "Mars 2026",
    project: "MVP Ordonnances PDF — n8n",
    stars: 5,
    quote: {
      fr: "Oussama a été très efficace, sérieux et professionnel tout au long de la mission. Il a su comprendre rapidement le besoin, proposer une solution adaptée et avancer avec réactivité. La communication a été fluide, le travail bien exécuté. Je recommande vivement.",
      en: "Oussama was highly efficient, serious and professional throughout the project. He quickly understood the need, proposed the right solution and delivered fast. Communication was smooth, work well done. Highly recommended.",
    },
    tags: ["n8n", "Automatisation", "Secteur Médical"],
  },
  {
    author: "Mouna BAATOUT",
    source: "Malt",
    sourceColor: "#ff5e3a",
    date: "Fév. 2026",
    project: "Ingénierie Algorithmique & Python",
    stars: 5,
    quote: {
      fr: "Je ne peux que le recommander à 100 %. Il comprend rapidement les enjeux business et techniques. Il ne se contente pas d'exécuter : il réfléchit et apporte une réelle valeur ajoutée.",
      en: "I can only recommend him 100%. He quickly understands both business and technical challenges. He doesn't just execute — he thinks and brings real added value.",
    },
    tags: ["Python", "Algorithmique", "Transport"],
  },
];

export default function SocialProof() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const l = (o: Record<string, string>) => o[lang] ?? o.fr;

  return (
    <section style={{ padding: "80px 24px", background: "var(--bg)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
          <div>
            <p className="section-label">// {l({ fr: "Avis vérifiés", en: "Verified reviews" })}</p>
            <h2 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)", color: "#fff", lineHeight: 1.1, margin: 0 }}>
              {l({ fr: "2 clients · 3 avis · 5/5.", en: "2 clients · 3 reviews · 5/5." })}<br />
              <span style={{ color: "var(--cyan)" }}>{l({ fr: "Vérifiables en un clic.", en: "Verifiable in one click." })}</span>
            </h2>
          </div>

          {/* Malt + Upwork buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
        </div>

        {/* Review cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "16px" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{
              padding: "24px 26px", borderRadius: "14px",
              background: "#0a0e16", border: "1px solid rgba(255,255,255,.07)",
              display: "flex", flexDirection: "column", gap: "14px",
              transition: "border-color .3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${r.sourceColor}30`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)"; }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "14px", color: "#fff", margin: "0 0 4px" }}>
                    {r.author}
                  </p>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.35)", margin: 0 }}>
                    {r.project} · {r.date}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: r.stars }).map((_, k) => (
                      <span key={k} style={{ color: "#f5a623", fontSize: "13px" }}>★</span>
                    ))}
                  </div>
                  {/* Source badge */}
                  <span style={{
                    padding: "2px 8px", borderRadius: "20px",
                    background: `${r.sourceColor}14`, border: `1px solid ${r.sourceColor}25`,
                    fontFamily: "var(--mono)", fontSize: "9px", color: r.sourceColor, letterSpacing: ".1em",
                  }}>
                    {r.source}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: "var(--sans)", fontSize: "14px",
                color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: 0,
                fontStyle: "italic",
              }}>
                "{l(r.quote)}"
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {r.tags.map(tag => (
                  <span key={tag} style={{
                    padding: "2px 8px", borderRadius: "20px",
                    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                    fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.3)",
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note de transparence */}
        <p style={{
          fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.2)",
          textAlign: "center", marginTop: "24px", letterSpacing: ".06em",
        }}>
          {l({ fr: "// Avis réels · Non filtrés · Clique sur les liens pour vérifier", en: "// Real reviews · Unfiltered · Click links to verify" })}
        </p>
      </div>
    </section>
  );
}
