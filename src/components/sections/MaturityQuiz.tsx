"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";


/* ══════════════════════════════════════════════════════════
   TRADUCTIONS QUIZ COMPLÈTES
══════════════════════════════════════════════════════════ */
type QuizTranslations = {
  questions: {
    q: string;
    opts: { label: string; value: string; score: number }[];
  }[];
  profileLabels: Record<string, string>;
  roadmaps: Record<string, {
    level: string;
    levelColor: string;
    headline: string;
    steps: { icon: string; title: string; desc: string; delay: string }[];
    roi: string;
  }>;
  intro: {
    title: string;
    desc: string;
  };
};

const QUIZ_TRANS: Record<string, QuizTranslations> = {
  /* ── FRANÇAIS ── */
  fr: {
    questions: [
      {
        q: "Vous êtes plutôt...",
        opts: [
          { label: "🏢 Dirigeant / CEO",       value: "ceo",   score: 0 },
          { label: "💼 Directeur Commercial",   value: "sales", score: 0 },
          { label: "👥 DRH / Responsable RH",  value: "hr",    score: 0 },
          { label: "🏪 E-commerce / Retail",   value: "ecom",  score: 0 },
        ],
      },
      {
        q: "Combien d'outils utilisez-vous au quotidien ?",
        opts: [
          { label: "1–2 (email + Excel)",          value: "few",    score: 0 },
          { label: "3–5 (CRM, Slack, Drive...)",   value: "medium", score: 1 },
          { label: "6–10 outils différents",       value: "many",   score: 2 },
          { label: "10+ outils (stack complexe)",  value: "stack",  score: 3 },
        ],
      },
      {
        q: "Combien d'heures par semaine passez-vous sur des tâches répétitives ?",
        opts: [
          { label: "Moins de 2h",  value: "low",    score: 0 },
          { label: "2 à 5h",       value: "medium", score: 1 },
          { label: "5 à 15h",      value: "high",   score: 2 },
          { label: "Plus de 15h",  value: "very",   score: 3 },
        ],
      },
      {
        q: "Votre niveau d'automatisation actuel ?",
        opts: [
          { label: "😅 Tout est manuel",                    value: "zero",  score: 0 },
          { label: "🔧 Quelques outils, pas connectés",     value: "basic", score: 1 },
          { label: "⚙️ Quelques automatisations simples",   value: "mid",   score: 2 },
          { label: "🚀 Pipeline partiellement automatisé",  value: "adv",   score: 3 },
        ],
      },
      {
        q: "Votre priorité numéro 1 ?",
        opts: [
          { label: "💰 Réduire les coûts opérationnels",  value: "cost",  score: 0 },
          { label: "⚡ Accélérer la croissance",           value: "grow",  score: 0 },
          { label: "🎯 Qualifier plus de leads",           value: "leads", score: 0 },
          { label: "😌 Libérer du temps à mon équipe",     value: "time",  score: 0 },
        ],
      },
    ],
    profileLabels: {
      ceo:   "Dirigeant",
      sales: "Directeur Commercial",
      hr:    "DRH",
      ecom:  "E-commerce",
    },
    roadmaps: {
      low: {
        level: "Niveau 0 — Territoire vierge", levelColor: "#ff4d6d",
        headline: "Bonne nouvelle : tout est à gagner.",
        steps: [
          { icon: "🔗", title: "Connecter vos outils existants",      desc: "Gmail, Google Sheets, CRM — les relier en 1 workflow simple.", delay: "Semaine 1–2" },
          { icon: "📧", title: "Automatiser les réponses email",       desc: "Qualifier et trier automatiquement vos emails entrants.",      delay: "Semaine 3–4" },
          { icon: "📊", title: "Mettre en place un tableau de bord",   desc: "Vos KPIs consolidés automatiquement chaque lundi.",           delay: "Mois 2" },
        ],
        roi: "Économie estimée : 8–12h/semaine dès le mois 1",
      },
      mid: {
        level: "Niveau 1 — Premiers pas", levelColor: "#f5a623",
        headline: "Vous avez les bases. Il faut connecter.",
        steps: [
          { icon: "⚙️", title: "Unifier votre stack",        desc: "Connecter tous vos outils dans un pipeline cohérent.",          delay: "Semaine 1–2" },
          { icon: "🤖", title: "Ajouter de l'IA",            desc: "Scoring automatique des leads, résumés de réunions.",           delay: "Semaine 3–5" },
          { icon: "📈", title: "Automatiser le reporting",   desc: "Rapports hebdo générés et envoyés sans intervention.",          delay: "Mois 2" },
          { icon: "🚀", title: "Scaler les automatisations", desc: "Dupliquer les workflows qui marchent sur d'autres équipes.",    delay: "Mois 3" },
        ],
        roi: "Économie estimée : 15–25h/semaine dès le mois 2",
      },
      high: {
        level: "Niveau 2 — En route vers l'excellence", levelColor: "#00ffc8",
        headline: "Bonne base. Passez aux agents autonomes.",
        steps: [
          { icon: "🧠", title: "Agents IA multi-tâches",    desc: "Des agents qui prennent des décisions et agissent seuls.",          delay: "Semaine 1–3" },
          { icon: "🔄", title: "Pipelines complexes",       desc: "Workflows conditionnels avec branches et boucles.",                 delay: "Semaine 4–6" },
          { icon: "📡", title: "Monitoring en temps réel",  desc: "Alertes automatiques sur anomalies et performances.",               delay: "Mois 2" },
          { icon: "💡", title: "IA prédictive",             desc: "Anticipez les besoins clients avant qu'ils se manifestent.",        delay: "Mois 3–4" },
        ],
        roi: "Économie estimée : 40–60h/semaine à pleine maturité",
      },
    },
    intro: {
      title: "Diagnostic de maturité IA",
      desc:  "Répondez à 5 questions pour obtenir votre roadmap personnalisée avec les automatisations prioritaires pour votre business.",
    },
  },

  /* ── ENGLISH ── */
  en: {
    questions: [
      {
        q: "You are mainly...",
        opts: [
          { label: "🏢 CEO / Business Owner",       value: "ceo",   score: 0 },
          { label: "💼 Sales Director",              value: "sales", score: 0 },
          { label: "👥 HR Director / HR Manager",   value: "hr",    score: 0 },
          { label: "🏪 E-commerce / Retail",        value: "ecom",  score: 0 },
        ],
      },
      {
        q: "How many tools do you use on a daily basis?",
        opts: [
          { label: "1–2 (email + spreadsheet)",    value: "few",    score: 0 },
          { label: "3–5 (CRM, Slack, Drive...)",   value: "medium", score: 1 },
          { label: "6–10 different tools",         value: "many",   score: 2 },
          { label: "10+ tools (complex stack)",    value: "stack",  score: 3 },
        ],
      },
      {
        q: "How many hours per week do you spend on repetitive tasks?",
        opts: [
          { label: "Less than 2h",  value: "low",    score: 0 },
          { label: "2 to 5h",       value: "medium", score: 1 },
          { label: "5 to 15h",      value: "high",   score: 2 },
          { label: "More than 15h", value: "very",   score: 3 },
        ],
      },
      {
        q: "Your current level of automation?",
        opts: [
          { label: "😅 Everything is manual",                value: "zero",  score: 0 },
          { label: "🔧 A few tools, not connected",          value: "basic", score: 1 },
          { label: "⚙️ Some basic automations",              value: "mid",   score: 2 },
          { label: "🚀 Partially automated pipeline",        value: "adv",   score: 3 },
        ],
      },
      {
        q: "Your number 1 priority?",
        opts: [
          { label: "💰 Reduce operational costs",    value: "cost",  score: 0 },
          { label: "⚡ Accelerate growth",            value: "grow",  score: 0 },
          { label: "🎯 Qualify more leads",           value: "leads", score: 0 },
          { label: "😌 Free up my team's time",      value: "time",  score: 0 },
        ],
      },
    ],
    profileLabels: {
      ceo:   "CEO",
      sales: "Sales Director",
      hr:    "HR Director",
      ecom:  "E-commerce Manager",
    },
    roadmaps: {
      low: {
        level: "Level 0 — Virgin territory", levelColor: "#ff4d6d",
        headline: "Good news: everything is to gain.",
        steps: [
          { icon: "🔗", title: "Connect your existing tools",    desc: "Gmail, Google Sheets, CRM — link them in 1 simple workflow.",  delay: "Week 1–2" },
          { icon: "📧", title: "Automate email responses",       desc: "Automatically qualify and sort your incoming emails.",          delay: "Week 3–4" },
          { icon: "📊", title: "Set up a KPI dashboard",        desc: "Your KPIs consolidated automatically every Monday.",            delay: "Month 2" },
        ],
        roi: "Estimated savings: 8–12h/week from month 1",
      },
      mid: {
        level: "Level 1 — First steps", levelColor: "#f5a623",
        headline: "You have the basics. Time to connect.",
        steps: [
          { icon: "⚙️", title: "Unify your stack",           desc: "Connect all your tools in a coherent pipeline.",                    delay: "Week 1–2" },
          { icon: "🤖", title: "Add AI",                     desc: "Automatic lead scoring, meeting summaries.",                        delay: "Week 3–5" },
          { icon: "📈", title: "Automate reporting",         desc: "Weekly reports generated and sent without any intervention.",       delay: "Month 2" },
          { icon: "🚀", title: "Scale automations",          desc: "Duplicate working workflows across other teams.",                   delay: "Month 3" },
        ],
        roi: "Estimated savings: 15–25h/week from month 2",
      },
      high: {
        level: "Level 2 — On the road to excellence", levelColor: "#00ffc8",
        headline: "Solid foundation. Move to autonomous agents.",
        steps: [
          { icon: "🧠", title: "Multi-task AI agents",      desc: "Agents that make decisions and act independently.",                  delay: "Week 1–3" },
          { icon: "🔄", title: "Complex pipelines",         desc: "Conditional workflows with branches and loops.",                     delay: "Week 4–6" },
          { icon: "📡", title: "Real-time monitoring",      desc: "Automatic alerts on anomalies and performance.",                     delay: "Month 2" },
          { icon: "💡", title: "Predictive AI",             desc: "Anticipate customer needs before they arise.",                       delay: "Month 3–4" },
        ],
        roi: "Estimated savings: 40–60h/week at full maturity",
      },
    },
    intro: {
      title: "AI Maturity Diagnostic",
      desc:  "Answer 5 questions to get your personalized roadmap with the priority automations for your business.",
    },
  },

  /* ── ARABIC ── */
  ar: {
    questions: [
      {
        q: "أنت بشكل رئيسي...",
        opts: [
          { label: "🏢 مدير تنفيذي / CEO",         value: "ceo",   score: 0 },
          { label: "💼 مدير مبيعات",                value: "sales", score: 0 },
          { label: "👥 مدير الموارد البشرية",       value: "hr",    score: 0 },
          { label: "🏪 تجارة إلكترونية / تجزئة",   value: "ecom",  score: 0 },
        ],
      },
      {
        q: "كم عدد الأدوات التي تستخدمها يومياً؟",
        opts: [
          { label: "1–2 (بريد إلكتروني + جداول)",   value: "few",    score: 0 },
          { label: "3–5 (CRM، Slack، Drive...)",     value: "medium", score: 1 },
          { label: "6–10 أدوات مختلفة",              value: "many",   score: 2 },
          { label: "أكثر من 10 أدوات (بنية معقدة)", value: "stack",  score: 3 },
        ],
      },
      {
        q: "كم ساعة أسبوعياً تقضي في المهام المتكررة؟",
        opts: [
          { label: "أقل من ساعتين",      value: "low",    score: 0 },
          { label: "من 2 إلى 5 ساعات",   value: "medium", score: 1 },
          { label: "من 5 إلى 15 ساعة",   value: "high",   score: 2 },
          { label: "أكثر من 15 ساعة",    value: "very",   score: 3 },
        ],
      },
      {
        q: "مستوى الأتمتة الحالي لديك؟",
        opts: [
          { label: "😅 كل شيء يدوي",                      value: "zero",  score: 0 },
          { label: "🔧 بعض الأدوات غير المتصلة",           value: "basic", score: 1 },
          { label: "⚙️ بعض الأتمتة البسيطة",              value: "mid",   score: 2 },
          { label: "🚀 خط أنابيب مؤتمت جزئياً",           value: "adv",   score: 3 },
        ],
      },
      {
        q: "أولويتك الأولى؟",
        opts: [
          { label: "💰 تقليل التكاليف التشغيلية",    value: "cost",  score: 0 },
          { label: "⚡ تسريع النمو",                   value: "grow",  score: 0 },
          { label: "🎯 تأهيل المزيد من العملاء",      value: "leads", score: 0 },
          { label: "😌 توفير وقت فريقي",              value: "time",  score: 0 },
        ],
      },
    ],
    profileLabels: {
      ceo:   "مدير تنفيذي",
      sales: "مدير مبيعات",
      hr:    "مدير الموارد البشرية",
      ecom:  "مدير التجارة الإلكترونية",
    },
    roadmaps: {
      low: {
        level: "المستوى 0 — أرض بكر", levelColor: "#ff4d6d",
        headline: "بشرى سارة: كل شيء أمامك لتكسبه.",
        steps: [
          { icon: "🔗", title: "ربط أدواتك الحالية",        desc: "Gmail وGoogle Sheets وCRM — ربطها في سير عمل واحد بسيط.", delay: "الأسبوع 1–2" },
          { icon: "📧", title: "أتمتة الردود البريدية",     desc: "تأهيل وفرز رسائلك الواردة تلقائياً.",                    delay: "الأسبوع 3–4" },
          { icon: "📊", title: "إنشاء لوحة مؤشرات KPI",    desc: "مؤشراتك موحدة تلقائياً كل اثنين.",                      delay: "الشهر 2" },
        ],
        roi: "الوفورات المقدرة: 8–12 ساعة/أسبوع من الشهر الأول",
      },
      mid: {
        level: "المستوى 1 — الخطوات الأولى", levelColor: "#f5a623",
        headline: "لديك الأساس. حان وقت الربط.",
        steps: [
          { icon: "⚙️", title: "توحيد بنيتك التقنية",      desc: "ربط جميع أدواتك في خط أنابيب متماسك.",                  delay: "الأسبوع 1–2" },
          { icon: "🤖", title: "إضافة الذكاء الاصطناعي",   desc: "تسجيل نقاط تلقائي للعملاء وملخصات الاجتماعات.",         delay: "الأسبوع 3–5" },
          { icon: "📈", title: "أتمتة التقارير",            desc: "تقارير أسبوعية تُولَّد وتُرسَل دون تدخل.",               delay: "الشهر 2" },
          { icon: "🚀", title: "توسيع نطاق الأتمتة",       desc: "تكرار سير العمل الناجح عبر فرق أخرى.",                   delay: "الشهر 3" },
        ],
        roi: "الوفورات المقدرة: 15–25 ساعة/أسبوع من الشهر الثاني",
      },
      high: {
        level: "المستوى 2 — في طريق التميز", levelColor: "#00ffc8",
        headline: "أساس متين. انتقل إلى الوكلاء المستقلين.",
        steps: [
          { icon: "🧠", title: "وكلاء ذكاء اصطناعي متعدد المهام", desc: "وكلاء يتخذون قرارات ويعملون باستقلالية تامة.",       delay: "الأسبوع 1–3" },
          { icon: "🔄", title: "خطوط أنابيب معقدة",               desc: "سير عمل شرطي بفروع وحلقات.",                         delay: "الأسبوع 4–6" },
          { icon: "📡", title: "مراقبة في الوقت الحقيقي",         desc: "تنبيهات تلقائية على الشذوذات والأداء.",               delay: "الشهر 2" },
          { icon: "💡", title: "ذكاء اصطناعي تنبؤي",              desc: "توقع احتياجات العملاء قبل أن تظهر.",                  delay: "الشهر 3–4" },
        ],
        roi: "الوفورات المقدرة: 40–60 ساعة/أسبوع عند النضج الكامل",
      },
    },
    intro: {
      title: "تشخيص نضج الذكاء الاصطناعي",
      desc:  "أجب على 5 أسئلة للحصول على خارطة طريقك المخصصة مع أولويات الأتمتة لعملك.",
    },
  },

  /* ── ESPAÑOL ── */
  es: {
    questions: [
      {
        q: "Eres principalmente...",
        opts: [
          { label: "🏢 CEO / Empresario",            value: "ceo",   score: 0 },
          { label: "💼 Director Comercial",          value: "sales", score: 0 },
          { label: "👥 Director de RRHH",            value: "hr",    score: 0 },
          { label: "🏪 E-commerce / Retail",         value: "ecom",  score: 0 },
        ],
      },
      {
        q: "¿Cuántas herramientas usas diariamente?",
        opts: [
          { label: "1–2 (email + hoja de cálculo)",   value: "few",    score: 0 },
          { label: "3–5 (CRM, Slack, Drive...)",      value: "medium", score: 1 },
          { label: "6–10 herramientas diferentes",    value: "many",   score: 2 },
          { label: "10+ herramientas (stack complejo)",value: "stack", score: 3 },
        ],
      },
      {
        q: "¿Cuántas horas por semana dedicas a tareas repetitivas?",
        opts: [
          { label: "Menos de 2h",   value: "low",    score: 0 },
          { label: "De 2 a 5h",     value: "medium", score: 1 },
          { label: "De 5 a 15h",    value: "high",   score: 2 },
          { label: "Más de 15h",    value: "very",   score: 3 },
        ],
      },
      {
        q: "¿Tu nivel actual de automatización?",
        opts: [
          { label: "😅 Todo es manual",                   value: "zero",  score: 0 },
          { label: "🔧 Algunas herramientas, no conectadas", value: "basic", score: 1 },
          { label: "⚙️ Algunas automatizaciones simples", value: "mid",   score: 2 },
          { label: "🚀 Pipeline parcialmente automatizado", value: "adv",  score: 3 },
        ],
      },
      {
        q: "¿Tu prioridad número 1?",
        opts: [
          { label: "💰 Reducir costes operativos",     value: "cost",  score: 0 },
          { label: "⚡ Acelerar el crecimiento",        value: "grow",  score: 0 },
          { label: "🎯 Calificar más leads",            value: "leads", score: 0 },
          { label: "😌 Liberar tiempo a mi equipo",    value: "time",  score: 0 },
        ],
      },
    ],
    profileLabels: {
      ceo:   "CEO",
      sales: "Director Comercial",
      hr:    "Director de RRHH",
      ecom:  "Responsable E-commerce",
    },
    roadmaps: {
      low: {
        level: "Nivel 0 — Territorio virgen", levelColor: "#ff4d6d",
        headline: "Buenas noticias: todo está por ganar.",
        steps: [
          { icon: "🔗", title: "Conectar tus herramientas existentes",  desc: "Gmail, Google Sheets, CRM — vincularlos en 1 workflow simple.",   delay: "Semana 1–2" },
          { icon: "📧", title: "Automatizar respuestas de email",       desc: "Calificar y clasificar automáticamente tus emails entrantes.",    delay: "Semana 3–4" },
          { icon: "📊", title: "Crear un dashboard de KPIs",           desc: "Tus KPIs consolidados automáticamente cada lunes.",               delay: "Mes 2" },
        ],
        roi: "Ahorro estimado: 8–12h/semana desde el mes 1",
      },
      mid: {
        level: "Nivel 1 — Primeros pasos", levelColor: "#f5a623",
        headline: "Tienes las bases. Es hora de conectar.",
        steps: [
          { icon: "⚙️", title: "Unificar tu stack",             desc: "Conectar todas tus herramientas en un pipeline coherente.",           delay: "Semana 1–2" },
          { icon: "🤖", title: "Añadir IA",                    desc: "Puntuación automática de leads, resúmenes de reuniones.",              delay: "Semana 3–5" },
          { icon: "📈", title: "Automatizar el reporting",     desc: "Informes semanales generados y enviados sin intervención.",            delay: "Mes 2" },
          { icon: "🚀", title: "Escalar las automatizaciones", desc: "Duplicar los workflows que funcionan en otros equipos.",              delay: "Mes 3" },
        ],
        roi: "Ahorro estimado: 15–25h/semana desde el mes 2",
      },
      high: {
        level: "Nivel 2 — Rumbo a la excelencia", levelColor: "#00ffc8",
        headline: "Buena base. Pasa a los agentes autónomos.",
        steps: [
          { icon: "🧠", title: "Agentes IA multitarea",       desc: "Agentes que toman decisiones y actúan de forma independiente.",        delay: "Semana 1–3" },
          { icon: "🔄", title: "Pipelines complejos",         desc: "Workflows condicionales con ramas y bucles.",                          delay: "Semana 4–6" },
          { icon: "📡", title: "Monitorización en tiempo real", desc: "Alertas automáticas sobre anomalías y rendimiento.",                 delay: "Mes 2" },
          { icon: "💡", title: "IA predictiva",               desc: "Anticipa las necesidades de los clientes antes de que surjan.",        delay: "Mes 3–4" },
        ],
        roi: "Ahorro estimado: 40–60h/semana en plena madurez",
      },
    },
    intro: {
      title: "Diagnóstico de Madurez IA",
      desc:  "Responde 5 preguntas para obtener tu hoja de ruta personalizada con las automatizaciones prioritarias para tu negocio.",
    },
  },

  /* ── NEDERLANDS ── */
  nl: {
    questions: [
      {
        q: "U bent voornamelijk...",
        opts: [
          { label: "🏢 CEO / Bedrijfseigenaar",      value: "ceo",   score: 0 },
          { label: "💼 Commercieel Directeur",       value: "sales", score: 0 },
          { label: "👥 HR-directeur / HR-manager",   value: "hr",    score: 0 },
          { label: "🏪 E-commerce / Retail",         value: "ecom",  score: 0 },
        ],
      },
      {
        q: "Hoeveel tools gebruikt u dagelijks?",
        opts: [
          { label: "1–2 (e-mail + spreadsheet)",    value: "few",    score: 0 },
          { label: "3–5 (CRM, Slack, Drive...)",    value: "medium", score: 1 },
          { label: "6–10 verschillende tools",      value: "many",   score: 2 },
          { label: "10+ tools (complexe stack)",    value: "stack",  score: 3 },
        ],
      },
      {
        q: "Hoeveel uur per week besteedt u aan repetitieve taken?",
        opts: [
          { label: "Minder dan 2u",  value: "low",    score: 0 },
          { label: "2 tot 5u",       value: "medium", score: 1 },
          { label: "5 tot 15u",      value: "high",   score: 2 },
          { label: "Meer dan 15u",   value: "very",   score: 3 },
        ],
      },
      {
        q: "Uw huidige niveau van automatisering?",
        opts: [
          { label: "😅 Alles is handmatig",                 value: "zero",  score: 0 },
          { label: "🔧 Enkele tools, niet verbonden",       value: "basic", score: 1 },
          { label: "⚙️ Enkele eenvoudige automatiseringen", value: "mid",   score: 2 },
          { label: "🚀 Gedeeltelijk geautomatiseerde pipeline", value: "adv", score: 3 },
        ],
      },
      {
        q: "Uw prioriteit nummer 1?",
        opts: [
          { label: "💰 Operationele kosten verlagen",  value: "cost",  score: 0 },
          { label: "⚡ Groei versnellen",               value: "grow",  score: 0 },
          { label: "🎯 Meer leads kwalificeren",        value: "leads", score: 0 },
          { label: "😌 Tijd vrijmaken voor mijn team", value: "time",  score: 0 },
        ],
      },
    ],
    profileLabels: {
      ceo:   "CEO",
      sales: "Commercieel Directeur",
      hr:    "HR-directeur",
      ecom:  "E-commerce Manager",
    },
    roadmaps: {
      low: {
        level: "Niveau 0 — Onontgonnen terrein", levelColor: "#ff4d6d",
        headline: "Goed nieuws: alles staat u nog te wachten.",
        steps: [
          { icon: "🔗", title: "Uw bestaande tools verbinden",    desc: "Gmail, Google Sheets, CRM — koppelen in 1 eenvoudige workflow.",     delay: "Week 1–2" },
          { icon: "📧", title: "E-mailantwoorden automatiseren",  desc: "Uw inkomende e-mails automatisch kwalificeren en sorteren.",          delay: "Week 3–4" },
          { icon: "📊", title: "Een KPI-dashboard opzetten",     desc: "Uw KPI's elke maandag automatisch geconsolideerd.",                   delay: "Maand 2" },
        ],
        roi: "Geschatte besparing: 8–12u/week vanaf maand 1",
      },
      mid: {
        level: "Niveau 1 — Eerste stappen", levelColor: "#f5a623",
        headline: "U heeft de basis. Tijd om te verbinden.",
        steps: [
          { icon: "⚙️", title: "Uw stack unificeren",             desc: "Al uw tools verbinden in een coherente pipeline.",                    delay: "Week 1–2" },
          { icon: "🤖", title: "AI toevoegen",                   desc: "Automatische lead scoring, vergadersamenvattingen.",                   delay: "Week 3–5" },
          { icon: "📈", title: "Rapportage automatiseren",       desc: "Wekelijkse rapporten gegenereerd en verstuurd zonder ingreep.",        delay: "Maand 2" },
          { icon: "🚀", title: "Automatiseringen opschalen",     desc: "Werkende workflows dupliceren naar andere teams.",                     delay: "Maand 3" },
        ],
        roi: "Geschatte besparing: 15–25u/week vanaf maand 2",
      },
      high: {
        level: "Niveau 2 — Op weg naar uitmuntendheid", levelColor: "#00ffc8",
        headline: "Solide basis. Stap over naar autonome agents.",
        steps: [
          { icon: "🧠", title: "Multitaak AI-agents",            desc: "Agents die zelfstandig beslissingen nemen en handelen.",               delay: "Week 1–3" },
          { icon: "🔄", title: "Complexe pipelines",             desc: "Conditionele workflows met vertakkingen en lussen.",                   delay: "Week 4–6" },
          { icon: "📡", title: "Realtime monitoring",            desc: "Automatische meldingen bij afwijkingen en prestaties.",                delay: "Maand 2" },
          { icon: "💡", title: "Voorspellende AI",               desc: "Anticipeer op klantbehoeften voordat ze zich manifesteren.",           delay: "Maand 3–4" },
        ],
        roi: "Geschatte besparing: 40–60u/week bij volledige volwassenheid",
      },
    },
    intro: {
      title: "AI-volwassenheidsdiagnose",
      desc:  "Beantwoord 5 vragen om uw gepersonaliseerde routekaart te ontvangen met de prioritaire automatiseringen voor uw bedrijf.",
    },
  },
};

/* ══════════════════════════════════════════════════════════
   ROADMAP SELECTOR
══════════════════════════════════════════════════════════ */
function getRoadmap(totalScore: number, lang: string) {
  const trans = QUIZ_TRANS[lang] ?? QUIZ_TRANS.fr;
  if (totalScore <= 2) return trans.roadmaps.low;
  if (totalScore <= 5) return trans.roadmaps.mid;
  return trans.roadmaps.high;
}

/* ══════════════════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════════════════ */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
        <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(0,229,255,.6)", letterSpacing:".1em" }}>
          {current} / {total}
        </span>
        <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.3)" }}>
          {Math.round((current / total) * 100)}%
        </span>
      </div>
      <div style={{ height:"3px", background:"rgba(255,255,255,.07)", borderRadius:"99px", overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:"99px",
          background:"linear-gradient(90deg,#00ffc8,#00e5ff)",
          width:`${(current / total) * 100}%`,
          transition:"width .5s cubic-bezier(.4,0,.2,1)",
          boxShadow:"0 0 8px rgba(0,229,255,.4)",
        }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function MaturityQuiz({ onOpenBrief }: { onOpenBrief: () => void }) {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();

  const trans    = QUIZ_TRANS[lang] ?? QUIZ_TRANS.fr;
  const isRTL    = lang === "ar";

  const [step,      setStep     ] = useState<"intro" | "quiz" | "result">("intro");
  const [qIdx,      setQIdx     ] = useState(0);
  const [answers,   setAnswers  ] = useState<Record<string, { value: string; score: number }>>({});
  const [selected,  setSelected ] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
  const roadmap    = getRoadmap(totalScore, lang);
  const profileAns = answers["profile"]?.value ?? "ceo";

  const choose = (value: string, score: number) => {
    if (animating) return;
    setSelected(value);
    setAnimating(true);
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [trans.questions[qIdx].q]: { value, score } }));
      if (qIdx < trans.questions.length - 1) {
        setQIdx(q => q + 1);
        setSelected(null);
      } else {
        setStep("result");
      }
      setAnimating(false);
    }, 350);
  };

  const reset = () => {
    setStep("intro"); setQIdx(0); setAnswers({}); setSelected(null);
  };

  return (
    <section id="quiz" style={{ padding:"100px 24px", background:"var(--bg2)" }}>
      <style>{`
        @keyframes quizFadeIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes resultReveal {
          from { opacity:0; transform:scale(.97); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth:"800px", margin:"0 auto", direction: isRTL ? "rtl" : "ltr" }}>

        {/* Header */}
        <p className="section-label">{t.quiz.label}</p>
        <h2 className="section-title">
          {t.quiz.title1}<br />
          <span className="text-cyan">{t.quiz.title2}</span>
        </h2>
        <p style={{ fontFamily:"Arial, sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"48px", maxWidth:"480px", lineHeight:1.65 }}>
          {t.quiz.subtitle}
        </p>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div style={{ textAlign:"center", padding:"48px 32px", background:"#07090f", border:"1px solid rgba(0,229,255,.15)", borderRadius:"16px", animation:"quizFadeIn .4s ease" }}>
            <div style={{ fontSize:"56px", marginBottom:"20px" }}>🧠</div>
            <h3 style={{ fontFamily:"var(--sans)", fontWeight:800, fontSize:"24px", color:"white", marginBottom:"12px" }}>
              {trans.intro.title}
            </h3>
            <p style={{ fontFamily:"Arial, sans-serif", fontSize:"14px", color:"rgba(255,255,255,.5)", lineHeight:1.7, marginBottom:"32px", maxWidth:"380px", margin:"0 auto 32px" }}>
              {trans.intro.desc}
            </p>
            <button
              onClick={() => setStep("quiz")}
              style={{
                padding:"14px 36px", background:"var(--cyan)", color:"var(--bg)",
                fontFamily:"var(--mono)", fontWeight:700, fontSize:"14px",
                border:"none", borderRadius:"8px", cursor:"pointer",
                boxShadow:"0 0 24px rgba(0,255,200,.3)", letterSpacing:".04em",
              }}
            >
              {t.quiz.start}
            </button>
            <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.2)", marginTop:"16px" }}>
              {t.quiz.free} · {t.quiz.noSignup} · {t.quiz.instant}
            </p>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <div style={{ background:"#07090f", border:"1px solid rgba(0,229,255,.12)", borderRadius:"16px", padding:"36px", animation:"quizFadeIn .3s ease" }}>
            <ProgressBar current={qIdx + 1} total={trans.questions.length} />

            <h3 style={{
              fontFamily:"var(--sans)", fontWeight:700, fontSize:"22px",
              color:"white", marginBottom:"28px", lineHeight:1.3,
            }}>
              {trans.questions[qIdx].q}
            </h3>

            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {trans.questions[qIdx].opts.map(opt => {
                const isSelected = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value, opt.score)}
                    disabled={animating}
                    style={{
                      padding:      "14px 20px",
                      background:   isSelected ? "rgba(0,229,255,.12)" : "rgba(255,255,255,.03)",
                      border:       `1px solid ${isSelected ? "rgba(0,229,255,.4)" : "rgba(255,255,255,.08)"}`,
                      borderRadius: "10px",
                      cursor:       animating ? "not-allowed" : "pointer",
                      textAlign:    isRTL ? "right" : "left",
                      fontFamily:   "Arial, Helvetica, sans-serif",
                      fontSize:     "14.5px",
                      color:        isSelected ? "white" : "rgba(255,255,255,.7)",
                      fontWeight:   isSelected ? 600 : 400,
                      transition:   "all .2s",
                      transform:    isSelected ? `translateX(${isRTL ? "-6px" : "6px"})` : "translateX(0)",
                    }}
                    onMouseEnter={e => {
                      if (!animating && !isSelected) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.06)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.2)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.03)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.08)";
                      }
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RÉSULTAT ── */}
        {step === "result" && (
          <div style={{ animation:"resultReveal .5s cubic-bezier(.4,0,.2,1)" }}>

            {/* Badge niveau */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"8px 18px", borderRadius:"20px", marginBottom:"24px",
              background:`${roadmap.levelColor}15`,
              border:`1px solid ${roadmap.levelColor}30`,
              fontFamily:"var(--mono)", fontSize:"12px", fontWeight:700,
              color:roadmap.levelColor, letterSpacing:".06em",
            }}>
              📊 {roadmap.level}
            </div>

            <h3 style={{ fontFamily:"var(--sans)", fontWeight:800, fontSize:"28px", color:"white", marginBottom:"8px", lineHeight:1.2 }}>
              {trans.profileLabels[profileAns]},<br />{roadmap.headline}
            </h3>

            {/* ROI */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"8px 16px", borderRadius:"8px", marginBottom:"32px",
              background:"rgba(74,222,128,.08)", border:"1px solid rgba(74,222,128,.2)",
              fontFamily:"var(--mono)", fontSize:"12px", color:"#4ade80",
            }}>
              💰 {roadmap.roi}
            </div>

            {/* Steps */}
            <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"32px" }}>
              {roadmap.steps.map((step_, i) => (
                <div key={i} style={{
                  display:"flex", gap:"16px", alignItems:"flex-start",
                  padding:"16px 20px",
                  background:"#07090f",
                  border:`1px solid ${roadmap.levelColor}18`,
                  borderRadius:"10px",
                  animation:`quizFadeIn .4s ease ${i * .1}s both`,
                }}>
                  <div style={{
                    width:"40px", height:"40px", borderRadius:"10px", flexShrink:0,
                    background:`${roadmap.levelColor}12`,
                    border:`1px solid ${roadmap.levelColor}25`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px",
                  }}>
                    {step_.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px", flexWrap:"wrap", gap:"6px" }}>
                      <p style={{ fontFamily:"var(--sans)", fontWeight:600, fontSize:"14px", color:"white" }}>
                        {step_.title}
                      </p>
                      <span style={{
                        fontFamily:"var(--mono)", fontSize:"9px",
                        color:`${roadmap.levelColor}70`,
                        background:`${roadmap.levelColor}10`,
                        border:`1px solid ${roadmap.levelColor}20`,
                        borderRadius:"20px", padding:"2px 8px", whiteSpace:"nowrap",
                      }}>
                        {step_.delay}
                      </span>
                    </div>
                    <p style={{ fontFamily:"Arial, sans-serif", fontSize:"13px", color:"rgba(255,255,255,.5)", lineHeight:1.5 }}>
                      {step_.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <button
                onClick={onOpenBrief}
                style={{
                  padding:"13px 28px", background:"var(--cyan)", color:"var(--bg)",
                  fontFamily:"var(--mono)", fontWeight:700, fontSize:"13px",
                  border:"none", borderRadius:"8px", cursor:"pointer",
                  boxShadow:"0 0 20px rgba(0,255,200,.25)", letterSpacing:".04em",
                }}
              >
                {t.quiz.startRoadmap}
              </button>
              <button
                onClick={reset}
                style={{
                  padding:"11px 20px", background:"transparent", color:"rgba(255,255,255,.4)",
                  fontFamily:"var(--mono)", fontSize:"12px",
                  border:"1px solid rgba(255,255,255,.1)", borderRadius:"8px", cursor:"pointer",
                }}
              >
                {t.quiz.restartCta}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
