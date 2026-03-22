"use client";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

const CASES_FR = [
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

const CASES_TRANS: Record<string, typeof CASES_FR> = {
  fr: CASES_FR,
  nl: CASES_FR, // fallback FR
  en: [
    {
      emoji:"🏢", client:"Digital Marketing Agency", sector:"B2B Marketing", color:"#00ffc8",
      before:{ problem:"The team spent 3h/day manually sorting LinkedIn leads and sending emails one by one.", pain:["18 qualified leads/week","3h/day manual work","30% leads forgotten","Frustrated team"] },
      solution:"n8n workflow: LinkedIn scraping → Apollo enrichment → AI scoring → HubSpot CRM → automated email sequence.",
      tools:["n8n","LinkedIn","Apollo","HubSpot","OpenAI"],
      after:{ results:["340 qualified leads/week","0h manual work","0% leads forgotten","+285% meetings booked"], roi:"ROI reached in 3 weeks" },
      quote:'"We multiplied our lead volume by 18 without hiring. It\'s magic."',
      duration:"5 days", invest:"€2,800",
    },
    {
      emoji:"👥", client:"HR Firm — 45 employees", sector:"Human Resources", color:"#a78bfa",
      before:{ problem:"Each job posting generated 200+ CVs. Sorting took 2 full days with 3 people mobilized.", pain:["200+ CVs per posting","2 days manual sorting","3 people tied up","Good profiles missed"] },
      solution:"AI agent: email intake → CV extraction → multi-criteria scoring → auto-ranking → Calendly interview scheduling.",
      tools:["Gmail","OpenAI GPT-4o","Notion","Calendly","n8n"],
      after:{ results:["200 CVs sorted in 20 minutes","1 autonomous AI agent","94% reliable scoring","Interviews auto-scheduled"], roi:"ROI reached in 12 days" },
      quote:'"Our managers only see the top 5 candidates. The rest never reaches them anymore."',
      duration:"7 days", invest:"€3,500",
    },
    {
      emoji:"🛒", client:"Fashion E-commerce — €2M/year", sector:"E-commerce", color:"#f5a623",
      before:{ problem:"Customer service handled 150 tickets/day manually. 48h response times, dissatisfied customers.", pain:["150 tickets/day manually","48h response delay","NPS score: 6.2/10","2 FTEs tied up"] },
      solution:"Shopify AI agent: auto-categorization → personalized replies → complex case escalation → daily report.",
      tools:["Shopify","OpenAI","Intercom","Slack","n8n"],
      after:{ results:["Response in < 2 min 24/7","85% tickets resolved without human","NPS score: 8.9/10","+23% revenue (cart recovery)"], roi:"ROI reached in 18 days" },
      quote:'"My customer service runs alone at night and on weekends. We cut costs by 60% while improving satisfaction."',
      duration:"10 days", invest:"€4,200",
    },
  ],
  ar: [
    {
      emoji:"🏢", client:"وكالة التسويق الرقمي", sector:"تسويق B2B", color:"#00ffc8",
      before:{ problem:"كان الفريق يقضي 3 ساعات يومياً في فرز عملاء LinkedIn يدوياً وإرسال رسائل البريد واحدة تلو الأخرى.", pain:["18 عميل مؤهل/أسبوع","3 ساعات عمل يدوي/يوم","30% من العملاء منسيون","فريق محبط"] },
      solution:"سير عمل n8n: استخراج LinkedIn ← إثراء Apollo ← تسجيل نقاط IA ← CRM HubSpot ← تسلسل بريد إلكتروني تلقائي.",
      tools:["n8n","LinkedIn","Apollo","HubSpot","OpenAI"],
      after:{ results:["340 عميل مؤهل/أسبوع","0 ساعة عمل يدوي","0% عملاء منسيون","+285% من الاجتماعات"], roi:"تم تحقيق العائد في 3 أسابيع" },
      quote:'"ضاعفنا حجم العملاء 18 مرة دون توظيف. إنه سحر."',
      duration:"5 أيام", invest:"2,800 €",
    },
    {
      emoji:"👥", client:"شركة الموارد البشرية — 45 موظف", sector:"موارد بشرية", color:"#a78bfa",
      before:{ problem:"كل إعلان وظيفة يولد أكثر من 200 سيرة ذاتية. الفرز يستغرق يومين كاملين مع 3 أشخاص.", pain:["200+ سيرة ذاتية/إعلان","يومان من الفرز اليدوي","3 أشخاص مشغولون","مرشحون جيدون ضائعون"] },
      solution:"وكيل ذكاء اصطناعي: استقبال البريد ← استخراج السيرة ← تسجيل نقاط متعدد المعايير ← ترتيب تلقائي ← جدولة مقابلات Calendly.",
      tools:["Gmail","OpenAI GPT-4o","Notion","Calendly","n8n"],
      after:{ results:["200 سيرة ذاتية في 20 دقيقة","وكيل ذكاء اصطناعي مستقل","دقة التسجيل 94%","مقابلات مجدولة تلقائياً"], roi:"تم تحقيق العائد في 12 يوماً" },
      quote:'"مديرونا يرون فقط أفضل 5 مرشحين. الباقي لا يصلهم أبداً."',
      duration:"7 أيام", invest:"3,500 €",
    },
    {
      emoji:"🛒", client:"تجارة إلكترونية — 2 مليون €/سنة", sector:"تجارة إلكترونية", color:"#f5a623",
      before:{ problem:"كانت خدمة العملاء تدير 150 تذكرة/يوم يدوياً. أوقات استجابة 48 ساعة، عملاء غير راضين.", pain:["150 تذكرة/يوم يدوياً","تأخر 48 ساعة في الرد","نقاط NPS: 6.2/10","موظفان مشغولان"] },
      solution:"وكيل Shopify: تصنيف تلقائي ← ردود مخصصة ← تصعيد الحالات المعقدة ← تقرير يومي.",
      tools:["Shopify","OpenAI","Intercom","Slack","n8n"],
      after:{ results:["رد خلال < 2 دقيقة 24/7","85% تذاكر محلولة بدون بشر","نقاط NPS: 8.9/10","+23% مبيعات (استرداد السلة)"], roi:"تم تحقيق العائد في 18 يوماً" },
      quote:'"خدمة العملاء تعمل وحدها ليلاً وعطل نهاية الأسبوع. خفضنا التكاليف 60% مع تحسين الرضا."',
      duration:"10 أيام", invest:"4,200 €",
    },
  ],
  es: [
    {
      emoji:"🏢", client:"Agencia de Marketing Digital", sector:"Marketing B2B", color:"#00ffc8",
      before:{ problem:"El equipo pasaba 3h/día clasificando leads de LinkedIn manualmente y enviando emails uno a uno.", pain:["18 leads calificados/semana","3h/día de trabajo manual","30% de leads olvidados","Equipo frustrado"] },
      solution:"Workflow n8n: scraping LinkedIn → enriquecimiento Apollo → puntuación IA → CRM HubSpot → secuencia email automática.",
      tools:["n8n","LinkedIn","Apollo","HubSpot","OpenAI"],
      after:{ results:["340 leads calificados/semana","0h trabajo manual","0% leads olvidados","+285% reuniones"], roi:"ROI alcanzado en 3 semanas" },
      quote:'"Multiplicamos por 18 nuestro volumen de leads sin contratar. Es magia."',
      duration:"5 días", invest:"2.800 €",
    },
    {
      emoji:"👥", client:"Empresa RRHH — 45 empleados", sector:"Recursos Humanos", color:"#a78bfa",
      before:{ problem:"Cada oferta generaba 200+ CVs. La clasificación tardaba 2 días con 3 personas.", pain:["200+ CVs por oferta","2 días de clasificación manual","3 personas ocupadas","Buenos perfiles perdidos"] },
      solution:"Agente IA: recepción email → extracción CV → puntuación multicritério → clasificación automática → programación entrevistas Calendly.",
      tools:["Gmail","OpenAI GPT-4o","Notion","Calendly","n8n"],
      after:{ results:["200 CVs clasificados en 20 min","1 agente IA autónomo","Puntuación 94% fiable","Entrevistas programadas automáticamente"], roi:"ROI alcanzado en 12 días" },
      quote:'"Nuestros managers solo ven los 5 mejores candidatos. El resto ya no les llega."',
      duration:"7 días", invest:"3.500 €",
    },
    {
      emoji:"🛒", client:"E-commerce Moda — 2M€/año", sector:"E-commerce", color:"#f5a623",
      before:{ problem:"El SAV gestionaba 150 tickets/día manualmente. Tiempos de respuesta de 48h, clientes insatisfechos.", pain:["150 tickets/día manuales","48h de tiempo de respuesta","NPS: 6.2/10","2 FTEs ocupados"] },
      solution:"Agente IA Shopify: categorización automática → respuestas personalizadas → escalada casos complejos → informe diario.",
      tools:["Shopify","OpenAI","Intercom","Slack","n8n"],
      after:{ results:["Respuesta en < 2 min 24/7","85% tickets resueltos sin humano","NPS: 8.9/10","+23% ventas (recuperación carrito)"], roi:"ROI alcanzado en 18 días" },
      quote:'"Mi SAV funciona solo de noche y los fines de semana. Redujimos costes un 60% mejorando la satisfacción."',
      duration:"10 días", invest:"4.200 €",
    },
  ],
};

export default function CaseStudiesSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();
  const CASES = CASES_TRANS[lang] ?? CASES_FR;

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
