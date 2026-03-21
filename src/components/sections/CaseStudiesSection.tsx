"use client";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

const CASES = [
  {
    emoji:   "🏢",
    client:  "Agence Marketing Digitale",
    sector:  "Marketing B2B",
    color:   "#00ffc8",
    before: {
      problem:  "L'équipe passait 3h/jour à trier des leads LinkedIn manuellement et à envoyer des emails un par un.",
      pain:     ["18 leads qualifiés/semaine", "3h/jour de travail manuel", "30% de leads oubliés", "Équipe frustrée"],
    },
    solution: "Workflow n8n : scraping LinkedIn → enrichissement Apollo → scoring IA → CRM HubSpot → séquence email automatique.",
    tools:    ["n8n", "LinkedIn", "Apollo", "HubSpot", "OpenAI"],
    after: {
      results:  ["340 leads qualifiés/semaine", "0h de travail manuel", "0% de leads oubliés", "+285% de rendez-vous"],
      roi:      "ROI atteint en 3 semaines",
    },
    quote:    "\"On a multiplié par 18 notre volume de leads sans embaucher. C'est magique.\"",
    duration: "5 jours",
    invest:   "2 800 €",
  },
  {
    emoji:   "👥",
    client:  "Cabinet RH — 45 employés",
    sector:  "Ressources Humaines",
    color:   "#a78bfa",
    before: {
      problem:  "Chaque offre d'emploi générait 200+ CVs. Le tri prenait 2 jours complets avec 3 personnes mobilisées.",
      pain:     ["200+ CVs par offre", "2 jours de tri manuel", "3 personnes mobilisées", "Bons profils manqués"],
    },
    solution: "Agent IA : réception email → extraction CV → scoring multi-critères → classement automatique → planification entretiens Calendly.",
    tools:    ["Gmail", "OpenAI GPT-4o", "Notion", "Calendly", "n8n"],
    after: {
      results:  ["200 CVs triés en 20 minutes", "1 agent IA autonome", "Score fiable à 94%", "Entretiens planifiés automatiquement"],
      roi:      "ROI atteint en 12 jours",
    },
    quote:    "\"Nos managers voient uniquement les 5 meilleurs candidats. Le reste ne leur arrive plus jamais.\"",
    duration: "7 jours",
    invest:   "3 500 €",
  },
  {
    emoji:   "🛒",
    client:  "E-commerce Mode — 2M€/an",
    sector:  "E-commerce",
    color:   "#f5a623",
    before: {
      problem:  "Le SAV gérait 150 tickets/jour manuellement. Délais de réponse de 48h, clients insatisfaits.",
      pain:     ["150 tickets/jour manuels", "48h de délai de réponse", "Score NPS : 6.2/10", "2 ETP mobilisés"],
    },
    solution: "Agent IA Shopify : catégorisation automatique → réponses personnalisées → escalade cas complexes → rapport quotidien.",
    tools:    ["Shopify", "OpenAI", "Intercom", "Slack", "n8n"],
    after: {
      results:  ["Réponse en < 2 minutes 24/7", "85% tickets résolus sans humain", "Score NPS : 8.9/10", "+23% de CA (relances panier)"],
      roi:      "ROI atteint en 18 jours",
    },
    quote:    "\"Mon SAV tourne seul la nuit et le weekend. On a réduit les coûts de 60% tout en améliorant la satisfaction.\"",
    duration: "10 jours",
    invest:   "4 200 €",
  },
];

export default function CaseStudiesSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { t } = useLang();

  return (
    <section id="case-studies" style={{ padding:"100px 24px", background:"var(--bg2)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth:"1100px", margin:"0 auto" }}>

        <p className="section-label">{t.cases.label}</p>
        <h2 className="section-title">
          {t.cases.title1}<br />
          <span className="text-cyan">{t.cases.title2}</span>
        </h2>
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"56px", maxWidth:"480px", lineHeight:1.65 }}>
          {t.cases.subtitle}
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:"32px" }}>
          {CASES.map((c, i) => (
            <div key={i} style={{
              background:"#07090f",
              border:`1px solid ${c.color}20`,
              borderRadius:"16px",
              overflow:"hidden",
            }}>
              {/* Header case */}
              <div style={{
                padding:"20px 28px",
                background:`linear-gradient(90deg, ${c.color}08, transparent)`,
                borderBottom:`1px solid ${c.color}15`,
                display:"flex", alignItems:"center", gap:"14px", flexWrap:"wrap",
              }}>
                <span style={{ fontSize:"28px" }}>{c.emoji}</span>
                <div>
                  <p style={{ fontFamily:"var(--sans)", fontWeight:700, fontSize:"16px", color:"white" }}>{c.client}</p>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:`${c.color}80`, letterSpacing:".1em" }}>{c.sector}</p>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", gap:"16px" }}>
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"14px", color:c.color }}>{c.duration}</p>
                    <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"rgba(255,255,255,.3)" }}>{t.cases.solution}</p>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"14px", color:"white" }}>{c.invest}</p>
                    <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"rgba(255,255,255,.3)" }}>{t.cases.results}</p>
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0" }}>
                {/* AVANT */}
                <div style={{ padding:"24px", borderRight:"1px solid rgba(255,255,255,.05)" }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"#ff4d6d", letterSpacing:".2em", marginBottom:"12px" }}>
                    ❌ {t.cases.before}
                  </p>
                  <p style={{ fontFamily:"Arial,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,.5)", lineHeight:1.6, marginBottom:"14px" }}>
                    {c.before.problem}
                  </p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                    {c.before.pain.map((p, j) => (
                      <div key={j} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                        <span style={{ color:"#ff4d6d", fontSize:"11px" }}>✗</span>
                        <span style={{ fontFamily:"Arial,sans-serif", fontSize:"12px", color:"rgba(255,255,255,.45)" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOLUTION */}
                <div style={{ padding:"24px", borderRight:"1px solid rgba(255,255,255,.05)", background:`${c.color}04` }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:c.color, letterSpacing:".2em", marginBottom:"12px" }}>
                    ⚙️ {t.cases.solution}
                  </p>
                  <p style={{ fontFamily:"Arial,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,.6)", lineHeight:1.65, marginBottom:"14px" }}>
                    {c.solution}
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                    {c.tools.map(t => (
                      <span key={t} style={{
                        fontFamily:"var(--mono)", fontSize:"9px",
                        color:`${c.color}80`, background:`${c.color}10`,
                        border:`1px solid ${c.color}20`,
                        borderRadius:"4px", padding:"2px 8px",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* APRÈS */}
                <div style={{ padding:"24px" }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"#4ade80", letterSpacing:".2em", marginBottom:"12px" }}>
                    ✅ {t.cases.results}
                  </p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"14px" }}>
                    {c.after.results.map((r, j) => (
                      <div key={j} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                        <span style={{ color:"#4ade80", fontSize:"11px" }}>✓</span>
                        <span style={{ fontFamily:"Arial,sans-serif", fontSize:"12px", color:"rgba(255,255,255,.75)", fontWeight:500 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    padding:"8px 12px",
                    background:"rgba(74,222,128,.08)", border:"1px solid rgba(74,222,128,.2)",
                    borderRadius:"6px",
                    fontFamily:"var(--mono)", fontSize:"10px", color:"#4ade80",
                  }}>
                    💰 {c.after.roi}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div style={{
                padding:"16px 28px",
                borderTop:`1px solid ${c.color}12`,
                background:`${c.color}05`,
                fontFamily:"Arial,sans-serif", fontSize:"13px",
                color:"rgba(255,255,255,.6)", fontStyle:"italic",
              }}>
                {c.quote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
