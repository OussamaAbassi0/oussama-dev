"use client";
import { ClipboardList, Search, Settings, Rocket, BarChart3, ShieldCheck } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

const STEP_ICONS = [
  <ClipboardList key="brief" size={22} strokeWidth={1.8} />,
  <Search key="search" size={22} strokeWidth={1.8} />,
  <Settings key="settings" size={22} strokeWidth={1.8} />,
  <Rocket key="rocket" size={22} strokeWidth={1.8} />,
  <BarChart3 key="chart" size={22} strokeWidth={1.8} />,
];

const STEPS_DATA = [
  { day:"Brief",       title:"Tu décris ton besoin",      desc:"Formulaire de 2 minutes. Ton problème en langage simple — pas besoin de savoir ce qu'est une API.",                color:"#00ffc8" },
  { day:"< 24h",       title:"Analyse & devis",           desc:"Je reviens avec une solution concrète, un périmètre clair et un prix fixe. Gratuit, sans engagement.",             color:"#a78bfa" },
  { day:"Selon scope", title:"Développement & tests",     desc:"n8n simple : quelques heures. Workflow complexe : 1-2 jours. Agent IA : 2-4 jours. SaaS : quelques semaines.",    color:"#f5a623" },
  { day:"Livraison",   title:"Mise en prod & documentation", desc:"Déploiement, tests finaux sur vos vraies données, documentation claire. Tu es autonome dès le premier jour.", color:"#00e5ff" },
  { day:"30 jours",    title:"Suivi inclus",              desc:"Monitoring des performances, alertes automatiques, ajustements inclus. Aucun supplément pendant 30 jours.",         color:"#4ade80" },
];

export default function DeliveryTimeline() {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();

  const STEP_TRANS: Record<string, {title:string;desc:string;day:string}[]> = {
    en: [
      {day:"Brief",       title:"Describe your need",    desc:"2-minute form. Your problem in plain language — no need to know what an API is."},
      {day:"< 24h",       title:"Analysis & quote",      desc:"I come back with a concrete solution, clear scope and a fixed price. Free, no commitment."},
      {day:"By scope",    title:"Development & testing", desc:"Simple n8n: a few hours. Complex workflow: 1–2 days. AI agent: 2–4 days. SaaS: a few weeks."},
      {day:"Delivery",    title:"Production & docs",     desc:"Deployment, final tests on your real data, clear documentation. Autonomous from day one."},
      {day:"30 days",     title:"Monitoring included",   desc:"Performance monitoring, automatic alerts, adjustments included — no extra charge for 30 days."},
    ],
    ar: [
      {day:"اليوم 1",       title:"تحليل الاحتياج",        desc:"مكالمة اكتشافية لمدة 30 دقيقة. نفهم مشكلتك وأدواتك وأهدافك. لا مصطلحات تقنية."},
      {day:"اليوم 2-3",     title:"هندسة سير العمل",    desc:"أرسم الحل الكامل: الأدوات المتصلة وقواعد القرار والنتائج المتوقعة."},
      {day:"اليوم 4-5",     title:"التطوير والاختبار", desc:"بناء سير العمل في n8n أو Make، اختبارات على بيانات حقيقية، تصحيحات حتى صفر أخطاء."},
      {day:"اليوم 6",       title:"التسليم والتدريب",  desc:"نشر الإنتاج، تدريب فيديو 20 دقيقة لفريقك. أنتم مستقلون منذ اليوم الأول."},
      {day:"الأسبوع 2+",   title:"مراقبة وتحسين",    desc:"متابعة الأداء 30 يومًا. تنبيهات تلقائية. تعديلات مشمولة بدون رسوم إضافية."},
    ],
    es: [
      {day:"Día 1",       title:"Análisis de necesidades",   desc:"Llamada de descubrimiento de 30 min. Entendemos tu problema, herramientas y objetivos."},
      {day:"Día 2-3",     title:"Arquitectura del workflow",desc:"Dibujo la solución completa: herramientas conectadas, reglas de decisión, resultados esperados."},
      {day:"Día 4-5",     title:"Desarrollo y pruebas",     desc:"Construcción del workflow en n8n o Make, pruebas con datos reales, correcciones hasta cero bugs."},
      {day:"Día 6",       title:"Entrega y formación",      desc:"Puesta en producción, formación en vídeo de 20 min para tu equipo. Eres autónomo desde el primer día."},
      {day:"Semana 2+",  title:"Monitorización y optimización",desc:"Seguimiento del rendimiento durante 30 días. Alertas automáticas. Ajustes incluidos sin coste adicional."},
    ],
    nl: [
      {day:"Dag 1",        title:"Behoefteanalyse",         desc:"30 min ontdekkingsgesprek. We begrijpen uw probleem, tools en doelen. Geen jargon."},
      {day:"Dag 2-3",      title:"Workflow-architectuur",   desc:"Ik teken de volledige oplossing: verbonden tools, beslissingsregels, verwachte resultaten."},
      {day:"Dag 4-5",      title:"Ontwikkeling & testen",   desc:"Workflow bouwen in n8n of Make, testen op echte data, fixes tot nul bugs."},
      {day:"Dag 6",        title:"Levering & training",     desc:"Productie-implementatie, 20 min videotraining voor uw team. U bent meteen zelfstandig."},
      {day:"Week 2+",      title:"Monitoring & optimalisatie",desc:"Prestatiebewaking gedurende 30 dagen. Automatische meldingen. Aanpassingen inbegrepen."},
    ],
  };

  const steps = STEP_TRANS[lang] ?? STEPS_DATA;

  return (
    <section id="timeline" style={{ padding:"100px 24px", background:"var(--bg)" }}>
      <style>{`
        @keyframes tlPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
      `}</style>
      <div ref={ref} className="fade-in" style={{ maxWidth:"900px", margin:"0 auto" }}>

        <p className="section-label">{t.timeline.label}</p>
        <h2 className="section-title">
          {t.timeline.title1}<br />
          <span className="text-cyan">{t.timeline.title2}</span>
        </h2>
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"56px", maxWidth:"480px", lineHeight:1.65 }}>
          {t.timeline.subtitle}
        </p>

        <div style={{ position:"relative" }}>
          {/* Ligne verticale */}
          <div style={{
            position:"absolute", left:"24px", top:"24px", bottom:"24px", width:"2px",
            background:"linear-gradient(180deg, #00ffc8, #a78bfa, #f5a623, #00e5ff, #4ade80)",
            opacity:.3,
          }} />

          <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
            {STEPS_DATA.map((step, i) => ({
              ...step,
              title: (steps[i] as any)?.title ?? step.title,
              desc:  (steps[i] as any)?.desc  ?? step.desc,
              day:   (steps[i] as any)?.day   ?? step.day,
            })).map((step, i) => (
              <div key={i} style={{ display:"flex", gap:"28px", alignItems:"flex-start" }}>
                {/* Dot */}
                <div style={{
                  width:"50px", height:"50px", borderRadius:"50%", flexShrink:0,
                  background:`${step.color}15`, border:`2px solid ${step.color}40`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  zIndex:1,
                  boxShadow:`0 0 16px ${step.color}20`,
                }}>
                  <div style={{ color: step.color }}>{STEP_ICONS[i]}</div>
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
          <div style={{ color:"#4ade80", flexShrink:0 }}><ShieldCheck size={26} strokeWidth={1.8} /></div>
          <div>
            <p style={{ fontFamily:"var(--sans)", fontWeight:700, fontSize:"15px", color:"white", marginBottom:"4px" }}>
              {t.timeline.guarantee}
            </p>
            <p style={{ fontFamily:"Arial,sans-serif", fontSize:"13px", color:"rgba(255,255,255,.5)", lineHeight:1.6 }}>
              {t.timeline.guaranteeDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
