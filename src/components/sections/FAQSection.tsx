"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

const FAQS = [
  {
    q: "Je ne suis pas développeur. Puis-je quand même travailler avec vous ?",
    a: "Absolument — et c'est même mon client idéal. Mon rôle est de traduire votre problème métier en solution technique. Vous n'avez pas besoin de comprendre le code. Vous décrivez le problème, je construis la solution.",
  },
  {
    q: "Combien de temps prend une automatisation ?",
    a: "Un workflow simple (ex: réception email → création tâche → notification Slack) prend 2 à 5 jours. Un système plus complexe avec IA et multi-agents, 2 à 4 semaines. Je livre toujours en plusieurs étapes pour que vous voyez des résultats rapidement.",
  },
  {
    q: "Est-ce que ça fonctionne avec mes outils existants (Excel, Gmail, HubSpot...) ?",
    a: "Dans 95% des cas, oui. Les outils que j'utilise (n8n, Make) se connectent à plus de 400 applications : Gmail, Google Sheets, HubSpot, Slack, Notion, Stripe, Jira, LinkedIn... Si vous avez un doute sur un outil spécifique, mentionnez-le dans le brief.",
  },
  {
    q: "Quel est le coût d'une automatisation ?",
    a: "Cela dépend de la complexité. Un workflow simple commence à partir de 500€. Un système complet avec IA et multi-agents se situe entre 2 000€ et 8 000€. Dans tous les cas, le ROI est calculable dès le départ — utilisez le calculateur ROI sur cette page pour avoir une première estimation.",
  },
  {
    q: "Qu'est-ce que l'IA peut vraiment automatiser pour mon business ?",
    a: "Concrètement : trier et répondre aux emails, qualifier des leads automatiquement, extraire des données de documents, générer des rapports, analyser des avis clients, poster sur les réseaux sociaux, ou encore faire de la veille concurrentielle. Tout ce qui est répétitif et basé sur des règles peut être automatisé.",
  },
  {
    q: "Que se passe-t-il si l'automatisation tombe en panne après livraison ?",
    a: "Je fournis une documentation complète et une période de support de 30 jours après livraison. Pour les systèmes critiques, je propose aussi une maintenance mensuelle. Les outils utilisés (n8n, Make) ont des systèmes d'alertes intégrés qui vous préviennent en cas de problème.",
  },
];

export default function FAQSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <style>{`
        @keyframes faqOpen {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-label" style={{ display: "flex", justifyContent: "center" }}>
            // Questions fréquentes
          </p>
          <h2 style={{
            fontFamily: "var(--sans)", fontWeight: 800,
            fontSize:   "clamp(26px, 4vw, 38px)",
            color:      "white", lineHeight: 1.2,
          }}>
            Tout ce que vous voulez savoir<br />
            <span style={{ color: "var(--cyan)" }}>avant de nous contacter</span>
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background:   isOpen ? "#0a0f1a" : "#07090f",
                  border:       `1px solid ${isOpen ? "rgba(0,229,255,.25)" : "rgba(255,255,255,.07)"}`,
                  borderRadius: "10px",
                  overflow:     "hidden",
                  transition:   "border-color .2s, background .2s",
                }}
              >
                {/* Question */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width:      "100%",
                    display:    "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap:        "16px",
                    padding:    "18px 22px",
                    background: "none",
                    border:     "none",
                    cursor:     "pointer",
                    textAlign:  "left",
                  }}
                >
                  <span style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize:   "14.5px",
                    fontWeight: 600,
                    color:      isOpen ? "white" : "rgba(255,255,255,.8)",
                    lineHeight: 1.4,
                    transition: "color .2s",
                  }}>
                    {faq.q}
                  </span>

                  {/* Toggle icon */}
                  <span style={{
                    width:          "26px",
                    height:         "26px",
                    borderRadius:   "50%",
                    background:     isOpen ? "rgba(0,229,255,.15)" : "rgba(255,255,255,.05)",
                    border:         `1px solid ${isOpen ? "rgba(0,229,255,.3)" : "rgba(255,255,255,.1)"}`,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    fontFamily:     "var(--mono)",
                    fontSize:       "14px",
                    color:          isOpen ? "var(--cyan)" : "rgba(255,255,255,.4)",
                    transition:     "all .2s",
                    transform:      isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    +
                  </span>
                </button>

                {/* Réponse */}
                {isOpen && (
                  <div style={{
                    padding:    "0 22px 18px",
                    animation:  "faqOpen .2s ease",
                  }}>
                    <div style={{
                      height:       "1px",
                      background:   "rgba(0,229,255,.08)",
                      marginBottom: "14px",
                    }} />
                    <p style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize:   "14px",
                      color:      "rgba(255,255,255,.6)",
                      lineHeight: 1.7,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA bas de FAQ */}
        <div style={{
          marginTop:    "40px",
          textAlign:    "center",
          padding:      "28px",
          background:   "rgba(0,229,255,.04)",
          border:       "1px solid rgba(0,229,255,.1)",
          borderRadius: "12px",
        }}>
          <p style={{
            fontFamily:   "Arial, Helvetica, sans-serif",
            fontSize:     "14px",
            color:        "rgba(255,255,255,.6)",
            marginBottom: "16px",
          }}>
            Vous avez une question spécifique à votre situation ?
          </p>
          <a href="#cta" style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "8px",
            padding:        "10px 22px",
            background:     "var(--cyan)",
            color:          "var(--bg)",
            fontFamily:     "var(--mono)",
            fontWeight:     700,
            fontSize:       "12px",
            borderRadius:   "6px",
            textDecoration: "none",
            letterSpacing:  ".04em",
          }}>
            Poser ma question →
          </a>
        </div>
      </div>
    </section>
  );
}
