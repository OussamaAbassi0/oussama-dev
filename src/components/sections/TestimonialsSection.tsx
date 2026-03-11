"use client";
import { useFadeIn } from "@/hooks/useFadeIn";

const TESTIMONIALS = [
  {
    name: "Matys",
    handle: "PLATINUMAAA",
    avatar: "M",
    avatarBg: "#1a3a2a",
    project: "Automatisation n8n",
    sector: "Secteur Médical",
    date: "01/03/2026",
    rating: 5,
    text: "Oussama est un freelance réactif, professionnel et très agréable dans la collaboration. Il a su réaliser les workflows demandés avec sérieux et efficacité, tout en prenant le temps d'expliquer clairement les étapes. Je recommande vivement son travail.",
    tags: ["n8n", "Automatisation", "Workflows"],
  },
  {
    name: "Mounaa",
    handle: "Mouna BAATOUT",
    avatar: "mc",
    avatarBg: "#1a1a3a",
    project: "Ingénierie Algorithmique & Python",
    sector: "Transports",
    date: "27/02/2026",
    rating: 5,
    text: "Je ne peux que le recommander à 100 %. C'est une personne exceptionnelle, à l'écoute et extrêmement professionnelle. Il comprend rapidement les enjeux business et techniques. Il ne se contente pas d'exécuter : il réfléchit et apporte une réelle valeur ajoutée.",
    tags: ["Python", "Algorithmique", "Conseil"],
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section style={{ padding: "100px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "56px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="section-label">// Social Proof</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Ce que disent<br />
              <span className="text-cyan">mes clients</span>
            </h2>
          </div>
          <a
            href="https://www.malt.fr/profile/oussamaabassi1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 16px", borderRadius: "8px",
              border: "1px solid rgba(0,255,200,0.15)",
              background: "rgba(0,255,200,0.04)",
              fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)",
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.4)";
              (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.15)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-dim)";
            }}
          >
            <span style={{ fontSize: "14px" }}>⭐</span>
            Voir sur Malt →
          </a>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="glass glow-card"
              style={{
                padding: "28px",
                position: "relative",
                overflow: "hidden",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {/* Quote mark decoration */}
              <div style={{
                position: "absolute", top: "16px", right: "20px",
                fontSize: "80px", lineHeight: 1, fontFamily: "Georgia, serif",
                color: "rgba(0,255,200,0.06)", fontWeight: 700, pointerEvents: "none",
                userSelect: "none",
              }}>
                "
              </div>

              {/* Top row: avatar + name + stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: t.avatarBg,
                  border: "1px solid rgba(0,255,200,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
                  color: "var(--cyan)", flexShrink: 0,
                  textTransform: "uppercase",
                }}>
                  {t.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                    <span style={{ fontWeight: 700, fontSize: "14px", color: "white" }}>{t.name}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)" }}>
                      — {t.handle}
                    </span>
                  </div>
                  <Stars count={t.rating} />
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", alignSelf: "flex-start" }}>
                  {t.date}
                </span>
              </div>

              {/* Project badge */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px",
                  background: "rgba(0,255,200,0.08)", border: "1px solid rgba(0,255,200,0.15)",
                  fontFamily: "var(--mono)", fontSize: "10px", color: "var(--cyan)",
                  letterSpacing: "0.05em",
                }}>
                  {t.project}
                </span>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px",
                  background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.15)",
                  fontFamily: "var(--mono)", fontSize: "10px", color: "var(--amber)",
                }}>
                  {t.sector}
                </span>
              </div>

              {/* Review text */}
              <p style={{
                fontSize: "14px", lineHeight: 1.75, color: "var(--text)",
                fontStyle: "italic", marginBottom: "20px",
              }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {t.tags.map(tag => (
                  <span key={tag} style={{
                    padding: "2px 8px", borderRadius: "4px",
                    background: "var(--bg3)",
                    fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)",
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom glow line */}
              <div style={{
                position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(0,255,200,0.3), transparent)",
              }} />
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: "48px", padding: "20px 28px",
          border: "1px solid rgba(0,255,200,0.1)",
          borderRadius: "12px", background: "rgba(0,255,200,0.03)",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "32px", flexWrap: "wrap",
        }}>
          {[
            { icon: "⭐", val: "5/5", label: "Note moyenne Malt" },
            { icon: "✅", val: "100%", label: "Taux de recommandation" },
            { icon: "⚡", val: "< 24h", label: "Délai de réponse" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "18px", color: "var(--cyan)" }}>{s.val}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
