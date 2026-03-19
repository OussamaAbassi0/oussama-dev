"use client";
import { useFadeIn } from "@/hooks/useFadeIn";

const STEPS = [
  { day:"Jour 1",      icon:"📋", title:"Analyse du besoin",        desc:"Appel de découverte de 30 min. On comprend votre problème, vos outils et vos objectifs. Aucun jargon.",           color:"#00ffc8" },
  { day:"Jour 2–3",    icon:"🔷", title:"Architecture du workflow",  desc:"Je dessine la solution complète : les outils connectés, les règles de décision, les résultats attendus.",          color:"#a78bfa" },
  { day:"Jour 4–5",    icon:"⚙️", title:"Développement & tests",     desc:"Construction du workflow en n8n ou Make, tests sur des données réelles, corrections jusqu'à zéro bug.",             color:"#f5a623" },
  { day:"Jour 6",      icon:"🚀", title:"Livraison & formation",     desc:"Mise en production, formation vidéo de 20 min pour votre équipe. Vous êtes autonomes dès le premier jour.",        color:"#00e5ff" },
  { day:"Semaine 2+",  icon:"📊", title:"Monitoring & optimisation", desc:"Suivi des performances pendant 30 jours. Alertes automatiques. Ajustements inclus sans supplément.",              color:"#4ade80" },
];

export default function DeliveryTimeline() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <section id="timeline" style={{ padding:"100px 24px", background:"var(--bg)" }}>
      <style>{`
        @keyframes tlPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
      `}</style>
      <div ref={ref} className="fade-in" style={{ maxWidth:"900px", margin:"0 auto" }}>

        <p className="section-label">// Processus de livraison</p>
        <h2 className="section-title">
          De votre brief à la mise en production<br />
          <span className="text-cyan">en 6 jours.</span>
        </h2>
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"56px", maxWidth:"480px", lineHeight:1.65 }}>
          Un processus clair, structuré et sans surprise. Vous savez exactement ce qui se passe chaque jour.
        </p>

        <div style={{ position:"relative" }}>
          {/* Ligne verticale */}
          <div style={{
            position:"absolute", left:"24px", top:"24px", bottom:"24px", width:"2px",
            background:"linear-gradient(180deg, #00ffc8, #a78bfa, #f5a623, #00e5ff, #4ade80)",
            opacity:.3,
          }} />

          <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display:"flex", gap:"28px", alignItems:"flex-start" }}>
                {/* Dot */}
                <div style={{
                  width:"50px", height:"50px", borderRadius:"50%", flexShrink:0,
                  background:`${step.color}15`, border:`2px solid ${step.color}40`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"20px", zIndex:1,
                  boxShadow:`0 0 16px ${step.color}20`,
                }}>
                  {step.icon}
                </div>

                {/* Content */}
                <div style={{
                  flex:1, paddingTop:"8px",
                  background:"rgba(255,255,255,.02)",
                  border:"1px solid rgba(255,255,255,.06)",
                  borderRadius:"10px", padding:"18px 22px",
                  transition:"border-color .2s, background .2s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${step.color}30`;
                    (e.currentTarget as HTMLElement).style.background = `${step.color}05`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.06)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.02)";
                  }}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"8px" }}>
                    <span style={{
                      fontFamily:"var(--mono)", fontSize:"9px", color:step.color,
                      background:`${step.color}12`, border:`1px solid ${step.color}20`,
                      borderRadius:"20px", padding:"2px 10px", letterSpacing:".1em",
                      fontWeight:700,
                    }}>
                      {step.day}
                    </span>
                    <h3 style={{ fontFamily:"var(--sans)", fontWeight:700, fontSize:"16px", color:"white" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily:"Arial,sans-serif", fontSize:"13.5px", color:"rgba(255,255,255,.55)", lineHeight:1.65 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garantie */}
        <div style={{
          marginTop:"40px", padding:"24px 28px",
          background:"rgba(74,222,128,.06)", border:"1px solid rgba(74,222,128,.2)",
          borderRadius:"12px", display:"flex", alignItems:"center", gap:"16px",
        }}>
          <span style={{ fontSize:"28px", flexShrink:0 }}>🛡️</span>
          <div>
            <p style={{ fontFamily:"var(--sans)", fontWeight:700, fontSize:"15px", color:"white", marginBottom:"4px" }}>
              Garantie satisfaction 30 jours
            </p>
            <p style={{ fontFamily:"Arial,sans-serif", fontSize:"13px", color:"rgba(255,255,255,.5)", lineHeight:1.6 }}>
              Si le workflow ne fonctionne pas comme convenu à la livraison, je corrige gratuitement jusqu&apos;à ce que ce soit parfait. Aucun risque pour vous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
