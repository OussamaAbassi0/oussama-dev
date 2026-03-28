"use client";
import { useState, useEffect, useRef } from "react";
import { Mail, Target, Users, BarChart3, X, Check } from "lucide-react";
import { useLang } from "@/lib/LangContext";

export default function BeforeAfterSection() {
  const { t } = useLang();
  const [active, setActive]   = useState(0);
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const COMPARISON_ICONS = [
    <Mail key="mail" size={14} />,
    <Target key="target" size={14} />,
    <Users key="users" size={14} />,
    <BarChart3 key="bar" size={14} />,
  ];

  const COMPARISONS = [
    {
      icon: <Mail size={14} />, topicKey: "topic1" as const,
      before: {
        items: {
          fr:["4h de tri emails / jour","Réponses oubliées","Stress permanent","Priorités mélangées"],
          en:["4h of email sorting / day","Forgotten replies","Constant stress","Mixed priorities"],
          ar:["4 ساعات فرز بريد إلكتروني / يوم","ردود منسية","ضغط مستمر","أولويات مختلطة"],
          es:["4h clasificando emails / día","Respuestas olvidadas","Estrés constante","Prioridades mezcladas"],
          nl:["4u e-mails sorteren / dag","Vergeten antwoorden","Constante stress","Gemengde prioriteiten"],
        },
        after: {
          fr:["8 minutes / jour","Réponses auto personnalisées","Zéro email oublié","Priorités gérées par IA"],
          en:["8 minutes / day","Personalized auto-replies","Zero forgotten email","Priorities managed by AI"],
          ar:["8 دقائق / يوم","ردود تلقائية شخصية","صفر بريد منسي","الأولويات تديرها الذكاء الاصطناعي"],
          es:["8 minutos / día","Respuestas automáticas personalizadas","Cero emails olvidados","Prioridades gestionadas por IA"],
          nl:["8 minuten / dag","Gepersonaliseerde auto-antwoorden","Nul vergeten email","Prioriteiten beheerd door AI"],
        },
      },
    },
    {
      icon: <Target size={14} />, topicKey: "topic2" as const,
      before: {
        items: {
          fr:["15 leads / semaine manuels","3h de recherche / jour","Données souvent fausses","Suivi impossible à tenir"],
          en:["15 leads / week manually","3h of research / day","Often inaccurate data","Impossible to track"],
          ar:["15 عميل محتمل / أسبوع يدوياً","3 ساعات بحث / يوم","بيانات غير دقيقة","متابعة مستحيلة"],
          es:["15 leads / semana manualmente","3h de investigación / día","Datos a menudo incorrectos","Seguimiento imposible"],
          nl:["15 leads / week handmatig","3u onderzoek / dag","Vaak onjuiste data","Onmogelijk bij te houden"],
        },
        after: {
          fr:["340 leads / semaine auto","0h de recherche manuelle","Données enrichies et vérifiées","Suivi entièrement automatisé"],
          en:["340 leads / week automated","0h of manual research","Enriched & verified data","Fully automated tracking"],
          ar:["340 عميل محتمل / أسبوع تلقائياً","0 ساعة بحث يدوي","بيانات مُثراة ومتحقق منها","متابعة آلية بالكامل"],
          es:["340 leads / semana automatizados","0h de investigación manual","Datos enriquecidos y verificados","Seguimiento totalmente automatizado"],
          nl:["340 leads / week geautomatiseerd","0u handmatig onderzoek","Verrijkte & geverifieerde data","Volledig geautomatiseerde tracking"],
        },
      },
    },
    {
      icon: <Users size={14} />, topicKey: "topic3" as const,
      before: {
        items: {
          fr:["2 jours de tri CVs","3 personnes mobilisées","Bons profils passés à la trappe","Entretiens mal organisés"],
          en:["2 days of CV sorting","3 people mobilized","Good profiles missed","Poorly organized interviews"],
          ar:["يومان لفرز السير الذاتية","3 أشخاص مُعبَّئون","ملفات جيدة فُقدت","مقابلات سيئة التنظيم"],
          es:["2 días clasificando CVs","3 personas movilizadas","Buenos perfiles perdidos","Entrevistas mal organizadas"],
          nl:["2 dagen cv's sorteren","3 mensen ingezet","Goede profielen gemist","Slecht georganiseerde interviews"],
        },
        after: {
          fr:["20 minutes de tri IA","1 agent autonome","Score 94/100 sur chaque profil","Entretiens planifiés automatiquement"],
          en:["20 minutes of AI sorting","1 autonomous agent","94/100 score on each profile","Automatically scheduled interviews"],
          ar:["20 دقيقة فرز بالذكاء الاصطناعي","وكيل واحد مستقل","94/100 نقطة لكل ملف","مقابلات مجدولة تلقائياً"],
          es:["20 minutos de clasificación IA","1 agente autónomo","Puntuación 94/100 en cada perfil","Entrevistas programadas automáticamente"],
          nl:["20 minuten AI-sortering","1 autonome agent","Score 94/100 op elk profiel","Automatisch geplande interviews"],
        },
      },
    },
    {
      icon: <BarChart3 size={14} />, topicKey: "topic4" as const,
      before: {
        items: {
          fr:["6h de consolidation / semaine","Excel mis à jour à la main","Données toujours en retard","Erreurs fréquentes"],
          en:["6h of consolidation / week","Excel updated manually","Always outdated data","Frequent errors"],
          ar:["6 ساعات توحيد / أسبوع","تحديث Excel يدوياً","بيانات متأخرة دائماً","أخطاء متكررة"],
          es:["6h de consolidación / semana","Excel actualizado manualmente","Datos siempre desactualizados","Errores frecuentes"],
          nl:["6u consolidatie / week","Excel handmatig bijgewerkt","Altijd verouderde data","Frequente fouten"],
        },
        after: {
          fr:["0h — tout est automatique","Dashboard en temps réel","Rapport envoyé chaque lundi","Zéro erreur humaine"],
          en:["0h — everything is automatic","Real-time dashboard","Report sent every Monday","Zero human error"],
          ar:["0 ساعة — كل شيء تلقائي","لوحة تحكم في الوقت الحقيقي","تقرير يُرسل كل يوم اثنين","صفر خطأ بشري"],
          es:["0h — todo es automático","Dashboard en tiempo real","Informe enviado cada lunes","Cero errores humanos"],
          nl:["0u — alles is automatisch","Real-time dashboard","Rapport elke maandag verzonden","Nul menselijke fouten"],
        },
      },
    },
  ];

  const comp = COMPARISONS[active];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderX(Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderX(Math.max(5, Math.min(95, ((e.touches[0].clientX - rect.left) / rect.width) * 100)));
  };

  useEffect(() => { setSliderX(50); }, [active]);

  // @ts-ignore
  const lang = (typeof window !== "undefined" ? localStorage.getItem("oussama_lang") : null) as any ?? "fr";
  const items_before = comp.before.items[lang as keyof typeof comp.before.items] ?? comp.before.items.fr;
  const items_after  = comp.before.after[lang as keyof typeof comp.before.after]  ?? comp.before.after.fr;

  return (
    <section id="before-after" style={{ padding:"100px 24px", background:"var(--bg2)" }}>
      <style>{`@keyframes baReveal{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
        <p className="section-label">{t.ba.label}</p>
        <h2 className="section-title">{t.ba.title}<span className="text-cyan">{t.cases.title2.includes("satisf") ? "" : ""}</span></h2>
        <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"36px", maxWidth:"480px", lineHeight:1.65 }}>
          {t.ba.subtitle}
        </p>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"32px" }}>
          {COMPARISONS.map((c, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding:"8px 18px", borderRadius:"24px",
              background: active===i ? "var(--cyan)" : "rgba(255,255,255,.04)",
              color:       active===i ? "var(--bg)"  : "rgba(255,255,255,.5)",
              border:      `1px solid ${active===i ? "var(--cyan)" : "rgba(255,255,255,.1)"}`,
              fontFamily:"Arial,sans-serif", fontSize:"13px", fontWeight:active===i?700:400,
              cursor:"pointer", transition:"all .2s",
              display:"flex", alignItems:"center", gap:"6px",
            }}>
              {COMPARISON_ICONS[i]} {t.ba[c.topicKey]}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div ref={containerRef}
          onMouseDown={() => { dragging.current = true; }}
          onMouseUp={() => { dragging.current = false; }}
          onMouseLeave={() => { dragging.current = false; }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          style={{ position:"relative", borderRadius:"16px", overflow:"hidden", cursor:"ew-resize", userSelect:"none", height:"300px" }}
        >
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#1a0610,#0d0208)", border:"1px solid rgba(255,77,109,.2)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px" }}>
            <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"#ff4d6d", letterSpacing:".2em", marginBottom:"20px", display:"flex", alignItems:"center", gap:"6px" }}>
              <X size={12} strokeWidth={2.5} /> {t.ba.before} — {t.ba[comp.topicKey]}
            </p>
            {items_before.map((item: string, i: number) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
                <span style={{ color:"#ff4d6d", display:"flex" }}><X size={13} strokeWidth={2.5} /></span>
                <span style={{ fontFamily:"Arial,sans-serif", fontSize:"14px", color:"rgba(255,255,255,.7)" }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ position:"absolute", inset:0, clipPath:`inset(0 ${100-sliderX}% 0 0)`, background:"linear-gradient(135deg,#041210,#060f12)", border:"1px solid rgba(0,255,200,.25)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px", transition:"clip-path .05s" }}>
            <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"#00ffc8", letterSpacing:".2em", marginBottom:"20px", display:"flex", alignItems:"center", gap:"6px" }}>
              <Check size={12} strokeWidth={2.5} /> {t.ba.after} — {t.ba[comp.topicKey]}
            </p>
            {items_after.map((item: string, i: number) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
                <span style={{ color:"#00ffc8", display:"flex" }}><Check size={13} strokeWidth={2.5} /></span>
                <span style={{ fontFamily:"Arial,sans-serif", fontSize:"14px", color:"rgba(255,255,255,.85)", fontWeight:500 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ position:"absolute", top:0, bottom:0, left:`${sliderX}%`, transform:"translateX(-50%)", width:"3px", background:"white", zIndex:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"white", border:"2px solid rgba(0,0,0,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px", boxShadow:"0 4px 16px rgba(0,0,0,.4)", cursor:"ew-resize" }}>⇔</div>
          </div>
        </div>
        <p style={{ textAlign:"center", fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.2)", marginTop:"12px" }}>{t.ba.hint}</p>
      </div>
    </section>
  );
}
