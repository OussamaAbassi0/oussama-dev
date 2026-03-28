"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { useLang } from "@/lib/LangContext";
import { Brain, Zap, CheckCircle2, Lock, Map, ClipboardList, Rocket } from "lucide-react";

const stripEmoji = (s: string) => s.replace(/^[\p{Extended_Pictographic}][\uFE0F]?\u20E3?\s*/u, "");

/* ══════════════════════════════════════════════════════════
   QUESTIONS — extraites de MaturityQuiz.tsx (5 premières)
══════════════════════════════════════════════════════════ */
type Opt = { label: string; value: string };
type Question = { q: string; opts: Opt[] };

const DIAG_QUESTIONS: Record<string, Question[]> = {
  fr: [
    {
      q: "Vous êtes plutôt...",
      opts: [
        { label: "🏢 Dirigeant / CEO", value: "ceo" },
        { label: "💼 Directeur Commercial", value: "sales" },
        { label: "👥 DRH / Responsable RH", value: "hr" },
        { label: "🏪 E-commerce / Retail", value: "ecom" },
      ],
    },
    {
      q: "Combien d'outils utilisez-vous au quotidien ?",
      opts: [
        { label: "1–2 (email + Excel)", value: "1-2 outils (email + Excel)" },
        { label: "3–5 (CRM, Slack, Drive...)", value: "3-5 outils (CRM, Slack, Drive)" },
        { label: "6–10 outils différents", value: "6-10 outils différents" },
        { label: "10+ outils (stack complexe)", value: "10+ outils (stack complexe)" },
      ],
    },
    {
      q: "Combien d'heures par semaine passez-vous sur des tâches répétitives ?",
      opts: [
        { label: "Moins de 2h", value: "moins de 2h de tâches répétitives/semaine" },
        { label: "2 à 5h", value: "2 à 5h de tâches répétitives/semaine" },
        { label: "5 à 15h", value: "5 à 15h de tâches répétitives/semaine" },
        { label: "Plus de 15h", value: "plus de 15h de tâches répétitives/semaine" },
      ],
    },
    {
      q: "Votre niveau d'automatisation actuel ?",
      opts: [
        { label: "😅 Tout est manuel", value: "tout est manuel (niveau 0)" },
        { label: "🔧 Quelques outils, pas connectés", value: "quelques outils non connectés (niveau basique)" },
        { label: "⚙️ Quelques automatisations simples", value: "quelques automatisations simples (niveau intermédiaire)" },
        { label: "🚀 Pipeline partiellement automatisé", value: "pipeline partiellement automatisé (niveau avancé)" },
      ],
    },
    {
      q: "Votre priorité numéro 1 ?",
      opts: [
        { label: "💰 Réduire les coûts opérationnels", value: "réduire les coûts opérationnels" },
        { label: "⚡ Accélérer la croissance", value: "accélérer la croissance" },
        { label: "🎯 Qualifier plus de leads", value: "qualifier plus de leads" },
        { label: "😌 Libérer du temps à mon équipe", value: "libérer du temps à l'équipe" },
      ],
    },
  ],
  en: [
    {
      q: "You are mainly...",
      opts: [
        { label: "🏢 CEO / Business Owner", value: "CEO / Business Owner" },
        { label: "💼 Sales Director", value: "Sales Director" },
        { label: "👥 HR Director / HR Manager", value: "HR Director / HR Manager" },
        { label: "🏪 E-commerce / Retail", value: "E-commerce / Retail" },
      ],
    },
    {
      q: "How many tools do you use on a daily basis?",
      opts: [
        { label: "1–2 (email + spreadsheet)", value: "1-2 tools (email + spreadsheet)" },
        { label: "3–5 (CRM, Slack, Drive...)", value: "3-5 tools (CRM, Slack, Drive)" },
        { label: "6–10 different tools", value: "6-10 different tools" },
        { label: "10+ tools (complex stack)", value: "10+ tools (complex stack)" },
      ],
    },
    {
      q: "How many hours per week do you spend on repetitive tasks?",
      opts: [
        { label: "Less than 2h", value: "less than 2h of repetitive tasks/week" },
        { label: "2 to 5h", value: "2 to 5h of repetitive tasks/week" },
        { label: "5 to 15h", value: "5 to 15h of repetitive tasks/week" },
        { label: "More than 15h", value: "more than 15h of repetitive tasks/week" },
      ],
    },
    {
      q: "Your current level of automation?",
      opts: [
        { label: "😅 Everything is manual", value: "everything is manual (level 0)" },
        { label: "🔧 A few tools, not connected", value: "a few tools, not connected (basic level)" },
        { label: "⚙️ Some basic automations", value: "some basic automations (intermediate level)" },
        { label: "🚀 Partially automated pipeline", value: "partially automated pipeline (advanced level)" },
      ],
    },
    {
      q: "Your number 1 priority?",
      opts: [
        { label: "💰 Reduce operational costs", value: "reduce operational costs" },
        { label: "⚡ Accelerate growth", value: "accelerate growth" },
        { label: "🎯 Qualify more leads", value: "qualify more leads" },
        { label: "😌 Free up my team's time", value: "free up my team's time" },
      ],
    },
  ],
  ar: [
    {
      q: "أنت بشكل رئيسي...",
      opts: [
        { label: "🏢 مدير تنفيذي / CEO", value: "مدير تنفيذي / CEO" },
        { label: "💼 مدير مبيعات", value: "مدير مبيعات" },
        { label: "👥 مدير الموارد البشرية", value: "مدير الموارد البشرية" },
        { label: "🏪 تجارة إلكترونية / تجزئة", value: "تجارة إلكترونية / تجزئة" },
      ],
    },
    {
      q: "كم عدد الأدوات التي تستخدمها يومياً؟",
      opts: [
        { label: "1–2 (بريد إلكتروني + جداول)", value: "1-2 أدوات (بريد إلكتروني + جداول)" },
        { label: "3–5 (CRM، Slack، Drive...)", value: "3-5 أدوات (CRM، Slack، Drive)" },
        { label: "6–10 أدوات مختلفة", value: "6-10 أدوات مختلفة" },
        { label: "أكثر من 10 أدوات (بنية معقدة)", value: "أكثر من 10 أدوات (بنية معقدة)" },
      ],
    },
    {
      q: "كم ساعة أسبوعياً تقضي في المهام المتكررة؟",
      opts: [
        { label: "أقل من ساعتين", value: "أقل من ساعتين في المهام المتكررة/أسبوع" },
        { label: "من 2 إلى 5 ساعات", value: "من 2 إلى 5 ساعات في المهام المتكررة/أسبوع" },
        { label: "من 5 إلى 15 ساعة", value: "من 5 إلى 15 ساعة في المهام المتكررة/أسبوع" },
        { label: "أكثر من 15 ساعة", value: "أكثر من 15 ساعة في المهام المتكررة/أسبوع" },
      ],
    },
    {
      q: "مستوى الأتمتة الحالي لديك؟",
      opts: [
        { label: "😅 كل شيء يدوي", value: "كل شيء يدوي (المستوى 0)" },
        { label: "🔧 بعض الأدوات غير المتصلة", value: "بعض الأدوات غير المتصلة (المستوى الأساسي)" },
        { label: "⚙️ بعض الأتمتة البسيطة", value: "بعض الأتمتة البسيطة (المستوى المتوسط)" },
        { label: "🚀 خط أنابيب مؤتمت جزئياً", value: "خط أنابيب مؤتمت جزئياً (المستوى المتقدم)" },
      ],
    },
    {
      q: "أولويتك الأولى؟",
      opts: [
        { label: "💰 تقليل التكاليف التشغيلية", value: "تقليل التكاليف التشغيلية" },
        { label: "⚡ تسريع النمو", value: "تسريع النمو" },
        { label: "🎯 تأهيل المزيد من العملاء", value: "تأهيل المزيد من العملاء" },
        { label: "😌 توفير وقت فريقي", value: "توفير وقت الفريق" },
      ],
    },
  ],
  es: [
    {
      q: "Eres principalmente...",
      opts: [
        { label: "🏢 CEO / Empresario", value: "CEO / Empresario" },
        { label: "💼 Director Comercial", value: "Director Comercial" },
        { label: "👥 Director de RRHH", value: "Director de RRHH" },
        { label: "🏪 E-commerce / Retail", value: "E-commerce / Retail" },
      ],
    },
    {
      q: "¿Cuántas herramientas usas diariamente?",
      opts: [
        { label: "1–2 (email + hoja de cálculo)", value: "1-2 herramientas (email + hoja de cálculo)" },
        { label: "3–5 (CRM, Slack, Drive...)", value: "3-5 herramientas (CRM, Slack, Drive)" },
        { label: "6–10 herramientas diferentes", value: "6-10 herramientas diferentes" },
        { label: "10+ herramientas (stack complejo)", value: "10+ herramientas (stack complejo)" },
      ],
    },
    {
      q: "¿Cuántas horas por semana dedicas a tareas repetitivas?",
      opts: [
        { label: "Menos de 2h", value: "menos de 2h en tareas repetitivas/semana" },
        { label: "De 2 a 5h", value: "de 2 a 5h en tareas repetitivas/semana" },
        { label: "De 5 a 15h", value: "de 5 a 15h en tareas repetitivas/semana" },
        { label: "Más de 15h", value: "más de 15h en tareas repetitivas/semana" },
      ],
    },
    {
      q: "¿Tu nivel actual de automatización?",
      opts: [
        { label: "😅 Todo es manual", value: "todo es manual (nivel 0)" },
        { label: "🔧 Algunas herramientas, no conectadas", value: "algunas herramientas no conectadas (nivel básico)" },
        { label: "⚙️ Algunas automatizaciones simples", value: "algunas automatizaciones simples (nivel intermedio)" },
        { label: "🚀 Pipeline parcialmente automatizado", value: "pipeline parcialmente automatizado (nivel avanzado)" },
      ],
    },
    {
      q: "¿Tu prioridad número 1?",
      opts: [
        { label: "💰 Reducir costes operativos", value: "reducir costes operativos" },
        { label: "⚡ Acelerar el crecimiento", value: "acelerar el crecimiento" },
        { label: "🎯 Calificar más leads", value: "calificar más leads" },
        { label: "😌 Liberar tiempo a mi equipo", value: "liberar tiempo al equipo" },
      ],
    },
  ],
  nl: [
    {
      q: "U bent voornamelijk...",
      opts: [
        { label: "🏢 CEO / Bedrijfseigenaar", value: "CEO / Bedrijfseigenaar" },
        { label: "💼 Commercieel Directeur", value: "Commercieel Directeur" },
        { label: "👥 HR-directeur / HR-manager", value: "HR-directeur / HR-manager" },
        { label: "🏪 E-commerce / Retail", value: "E-commerce / Retail" },
      ],
    },
    {
      q: "Hoeveel tools gebruikt u dagelijks?",
      opts: [
        { label: "1–2 (e-mail + spreadsheet)", value: "1-2 tools (e-mail + spreadsheet)" },
        { label: "3–5 (CRM, Slack, Drive...)", value: "3-5 tools (CRM, Slack, Drive)" },
        { label: "6–10 verschillende tools", value: "6-10 verschillende tools" },
        { label: "10+ tools (complexe stack)", value: "10+ tools (complexe stack)" },
      ],
    },
    {
      q: "Hoeveel uur per week besteedt u aan repetitieve taken?",
      opts: [
        { label: "Minder dan 2u", value: "minder dan 2u aan repetitieve taken/week" },
        { label: "2 tot 5u", value: "2 tot 5u aan repetitieve taken/week" },
        { label: "5 tot 15u", value: "5 tot 15u aan repetitieve taken/week" },
        { label: "Meer dan 15u", value: "meer dan 15u aan repetitieve taken/week" },
      ],
    },
    {
      q: "Uw huidige niveau van automatisering?",
      opts: [
        { label: "😅 Alles is handmatig", value: "alles is handmatig (niveau 0)" },
        { label: "🔧 Enkele tools, niet verbonden", value: "enkele tools, niet verbonden (basisniveau)" },
        { label: "⚙️ Enkele eenvoudige automatiseringen", value: "enkele eenvoudige automatiseringen (gemiddeld niveau)" },
        { label: "🚀 Gedeeltelijk geautomatiseerde pipeline", value: "gedeeltelijk geautomatiseerde pipeline (gevorderd niveau)" },
      ],
    },
    {
      q: "Uw prioriteit nummer 1?",
      opts: [
        { label: "💰 Operationele kosten verlagen", value: "operationele kosten verlagen" },
        { label: "⚡ Groei versnellen", value: "groei versnellen" },
        { label: "🎯 Meer leads kwalificeren", value: "meer leads kwalificeren" },
        { label: "😌 Tijd vrijmaken voor mijn team", value: "tijd vrijmaken voor het team" },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════
   TRADUCTIONS UI
══════════════════════════════════════════════════════════ */
const DIAG_TRANS: Record<string, {
  label: string;
  h1a: string;
  h1b: string;
  subtitle: string;
  badge1: string;
  badge2: string;
  badge3: string;
  analyzing: string;
  step1: string;
  step2: string;
  step3: string;
  reportTitle: string;
  score: string;
  roiLabel: string;
  roiSub: string;
  quickWinsTitle: string;
  roadmapTitle: string;
  summaryTitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  impact: string;
}> = {
  fr: {
    label: "// Diagnostic IA Gratuit",
    h1a: "Votre potentiel d'automatisation",
    h1b: "en 5 questions",
    subtitle: "Obtenez votre rapport personnalisé avec ROI estimé en 30 secondes",
    badge1: "✅ 100% gratuit",
    badge2: "⚡ 30 secondes",
    badge3: "🔒 Sans inscription",
    analyzing: "Analyse de votre profil en cours...",
    step1: "→ Analyse des réponses...",
    step2: "→ Calcul du ROI personnalisé...",
    step3: "→ Génération du rapport...",
    reportTitle: "Votre rapport personnalisé",
    score: "Score",
    roiLabel: "d'économies potentielles",
    roiSub: "estimation mensuelle",
    quickWinsTitle: "⚡ Quick Wins — Actions immédiates",
    roadmapTitle: "🗺️ Votre roadmap personnalisée",
    summaryTitle: "📋 Bilan",
    ctaPrimary: "📋 Démarrer mon projet avec Oussama →",
    ctaSecondary: "↻ Refaire le diagnostic",
    impact: "Impact",
  },
  en: {
    label: "// Free AI Diagnostic",
    h1a: "Your automation potential",
    h1b: "in 5 questions",
    subtitle: "Get your personalized report with estimated ROI in 30 seconds",
    badge1: "✅ 100% free",
    badge2: "⚡ 30 seconds",
    badge3: "🔒 No sign-up",
    analyzing: "Analyzing your profile...",
    step1: "→ Analyzing answers...",
    step2: "→ Calculating personalized ROI...",
    step3: "→ Generating report...",
    reportTitle: "Your personalized report",
    score: "Score",
    roiLabel: "potential savings",
    roiSub: "monthly estimate",
    quickWinsTitle: "⚡ Quick Wins — Immediate actions",
    roadmapTitle: "🗺️ Your personalized roadmap",
    summaryTitle: "📋 Summary",
    ctaPrimary: "📋 Start my project with Oussama →",
    ctaSecondary: "↻ Redo the diagnostic",
    impact: "Impact",
  },
  ar: {
    label: "// تشخيص ذكاء اصطناعي مجاني",
    h1a: "إمكانات الأتمتة لديك",
    h1b: "في 5 أسئلة",
    subtitle: "احصل على تقريرك المخصص مع تقدير العائد على الاستثمار في 30 ثانية",
    badge1: "✅ مجاني 100%",
    badge2: "⚡ 30 ثانية",
    badge3: "🔒 بدون تسجيل",
    analyzing: "جارٍ تحليل ملفك الشخصي...",
    step1: "→ تحليل الإجابات...",
    step2: "→ حساب العائد على الاستثمار المخصص...",
    step3: "→ إنشاء التقرير...",
    reportTitle: "تقريرك المخصص",
    score: "النقاط",
    roiLabel: "وفورات محتملة",
    roiSub: "تقدير شهري",
    quickWinsTitle: "⚡ المكاسب السريعة — الإجراءات الفورية",
    roadmapTitle: "🗺️ خارطة طريقك المخصصة",
    summaryTitle: "📋 ملخص",
    ctaPrimary: "📋 ابدأ مشروعي مع أسامة →",
    ctaSecondary: "↻ إعادة التشخيص",
    impact: "التأثير",
  },
  es: {
    label: "// Diagnóstico IA Gratuito",
    h1a: "Tu potencial de automatización",
    h1b: "en 5 preguntas",
    subtitle: "Obtén tu informe personalizado con ROI estimado en 30 segundos",
    badge1: "✅ 100% gratis",
    badge2: "⚡ 30 segundos",
    badge3: "🔒 Sin registro",
    analyzing: "Analizando tu perfil...",
    step1: "→ Analizando respuestas...",
    step2: "→ Calculando ROI personalizado...",
    step3: "→ Generando informe...",
    reportTitle: "Tu informe personalizado",
    score: "Puntuación",
    roiLabel: "ahorros potenciales",
    roiSub: "estimación mensual",
    quickWinsTitle: "⚡ Quick Wins — Acciones inmediatas",
    roadmapTitle: "🗺️ Tu hoja de ruta personalizada",
    summaryTitle: "📋 Resumen",
    ctaPrimary: "📋 Iniciar mi proyecto con Oussama →",
    ctaSecondary: "↻ Repetir diagnóstico",
    impact: "Impacto",
  },
  nl: {
    label: "// Gratis AI Diagnose",
    h1a: "Uw automatiseringspotentieel",
    h1b: "in 5 vragen",
    subtitle: "Ontvang uw gepersonaliseerde rapport met geschatte ROI in 30 seconden",
    badge1: "✅ 100% gratis",
    badge2: "⚡ 30 seconden",
    badge3: "🔒 Geen registratie",
    analyzing: "Uw profiel wordt geanalyseerd...",
    step1: "→ Antwoorden analyseren...",
    step2: "→ Gepersonaliseerde ROI berekenen...",
    step3: "→ Rapport genereren...",
    reportTitle: "Uw gepersonaliseerd rapport",
    score: "Score",
    roiLabel: "potentiële besparingen",
    roiSub: "maandelijkse schatting",
    quickWinsTitle: "⚡ Quick Wins — Directe acties",
    roadmapTitle: "🗺️ Uw gepersonaliseerde roadmap",
    summaryTitle: "📋 Samenvatting",
    ctaPrimary: "📋 Mijn project starten met Oussama →",
    ctaSecondary: "↻ Diagnose opnieuw doen",
    impact: "Impact",
  },
};

/* ══════════════════════════════════════════════════════════
   TYPES RAPPORT
══════════════════════════════════════════════════════════ */
interface Report {
  level: string;
  levelColor: string;
  score: number;
  headline: string;
  roiMin: number;
  roiMax: number;
  quickWins: string[];
  roadmap: { week: string; action: string; impact: string }[];
  summary: string;
}

/* ══════════════════════════════════════════════════════════
   COMPOSANT SCORE CIRCULAIRE SVG
══════════════════════════════════════════════════════════ */
function ScoreCircle({ score, color }: { score: number; color: string }) {
  const [animated, setAnimated] = useState(false);
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (animated ? (score / 100) * circ : circ);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "relative", width: 128, height: 128, flexShrink: 0 }}>
      <svg width="128" height="128" style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" />
        {/* Progress */}
        <circle
          cx="64" cy="64" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)", filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "28px", color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.4)", marginTop: "2px" }}>
          /100
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════════════════ */
export default function DiagnosticPage() {
  const { lang } = useLang();
  const safeLang = (["fr", "en", "ar", "es", "nl"].includes(lang) ? lang : "fr") as keyof typeof DIAG_QUESTIONS;
  const tr = DIAG_TRANS[safeLang] ?? DIAG_TRANS.fr;
  const questions = DIAG_QUESTIONS[safeLang] ?? DIAG_QUESTIONS.fr;
  const isRTL = lang === "ar";

  const [step, setStep] = useState(0); // 0-4 = questions, 5 = loading/report
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [questionKey, setQuestionKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  /* Loading steps animation */
  useEffect(() => {
    if (step !== 5 || report) return;
    const t1 = setTimeout(() => setLoadingStep(1), 600);
    const t2 = setTimeout(() => setLoadingStep(2), 1400);
    const t3 = setTimeout(() => setLoadingStep(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [step, report]);

  const handleOptionClick = (value: string) => {
    if (selectedOpt) return; // prevent double-click
    setSelectedOpt(value);
    const newAnswers = [...answers, value];

    timerRef.current = setTimeout(() => {
      if (step < 4) {
        setAnswers(newAnswers);
        setSelectedOpt(null);
        setQuestionKey(k => k + 1);
        setStep(s => s + 1);
      } else {
        // Last question — go to loading
        setAnswers(newAnswers);
        setSelectedOpt(null);
        setStep(5);
        fetchReport(newAnswers);
      }
    }, 400);
  };

  const fetchReport = async (ans: string[]) => {
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: ans, lang: safeLang }),
      });
      const data = await res.json();
      // Small delay so loading animation is visible
      setTimeout(() => setReport(data), 600);
    } catch {
      setTimeout(() => setReport({
        level: "Intermédiaire",
        levelColor: "#00e5ff",
        score: 65,
        headline: "Vous avez un fort potentiel d'automatisation !",
        roiMin: 800,
        roiMax: 2500,
        quickWins: ["Automatiser vos relances email", "Synchroniser votre CRM", "Qualifier vos leads automatiquement"],
        roadmap: [
          { week: "Semaine 1", action: "Audit de vos processus", impact: "Identifier les 3 priorités" },
          { week: "Semaine 2-4", action: "Premier workflow", impact: "-5h/semaine" },
          { week: "Mois 2-3", action: "Pipeline complet", impact: "-15h/semaine" },
        ],
        summary: "Votre profil montre un potentiel élevé. Commencez par automatiser vos tâches les plus répétitives.",
      }), 800);
    }
  };

  const resetDiagnostic = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOpt(null);
    setReport(null);
    setLoadingStep(0);
    setQuestionKey(k => k + 1);
  };

  const currentQuestion = questions[step] ?? questions[0];

  return (
    <>
      <style>{`
        :root {
          --cyan: #00ffc8;
          --bg: #050810;
          --bg2: #060a12;
          --bg3: #0d1220;
          --mono: 'Courier New', monospace;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes reportReveal {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,255,200,.3), 0 0 40px rgba(0,255,200,.1); transform: scale(1); }
          50%       { box-shadow: 0 0 40px rgba(0,255,200,.6), 0 0 80px rgba(0,255,200,.2); transform: scale(1.05); }
        }
        @keyframes loadingDot {
          0%, 100% { opacity: .3; }
          50%       { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .diag-option-btn {
          width: 100%;
          background: rgba(0,255,200,.04);
          border: 1px solid rgba(0,255,200,.1);
          border-radius: 10px;
          padding: 16px 20px;
          cursor: pointer;
          text-align: left;
          font-family: 'Syne', 'Arial', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,.85);
          transition: background .2s, border-color .2s, box-shadow .2s, transform .15s;
          display: flex;
          align-items: center;
          gap: 10px;
          outline: none;
        }
        .diag-option-btn:hover {
          background: rgba(0,255,200,.1) !important;
          border-color: rgba(0,255,200,.4) !important;
          transform: translateY(-1px);
        }
        .diag-option-btn.selected {
          background: rgba(0,255,200,.15) !important;
          border-color: var(--cyan) !important;
          box-shadow: 0 0 20px rgba(0,255,200,.2);
          color: white;
        }
        .diag-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 28px;
          background: linear-gradient(135deg, var(--cyan), #00b8ff);
          color: var(--bg);
          font-family: var(--mono);
          font-weight: 700;
          font-size: 14px;
          border-radius: 8px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: box-shadow .2s, transform .15s;
          letter-spacing: .03em;
        }
        .diag-cta-primary:hover {
          box-shadow: 0 0 30px rgba(0,255,200,.5);
          transform: translateY(-2px);
        }
        .diag-cta-secondary {
          padding: 16px 24px;
          background: transparent;
          border: 1px solid rgba(0,255,200,.3);
          color: rgba(0,255,200,.8);
          font-family: var(--mono);
          font-weight: 600;
          font-size: 13px;
          border-radius: 8px;
          cursor: pointer;
          transition: background .2s, border-color .2s;
          letter-spacing: .03em;
        }
        .diag-cta-secondary:hover {
          background: rgba(0,255,200,.07);
          border-color: var(--cyan);
          color: var(--cyan);
        }
        .roadmap-card {
          background: rgba(13,18,32,.8);
          border: 1px solid rgba(0,255,200,.1);
          border-radius: 10px;
          padding: 16px 20px;
          animation: fadeInUp .5s ease both;
        }
        .roadmap-card:hover {
          border-color: rgba(0,255,200,.25);
        }
        .quick-win-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          background: rgba(0,255,200,.04);
          border: 1px solid rgba(0,255,200,.1);
          border-radius: 8px;
          animation: fadeInUp .4s ease both;
        }
      `}</style>

      <ScrollProgressBar />
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          paddingTop: "120px",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px 100px" }}>

          {/* ── HERO ── */}
          {step < 5 && (
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--cyan)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                opacity: .8,
              }}>
                {tr.label}
              </span>

              <h1 style={{
                fontFamily: "'Syne', 'Arial', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 46px)",
                color: "white",
                margin: "12px 0 8px",
                lineHeight: 1.15,
              }}>
                {tr.h1a}{" "}
                <span style={{ color: "var(--cyan)", textShadow: "0 0 30px rgba(0,255,200,.4)" }}>
                  {tr.h1b}
                </span>
              </h1>

              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "16px",
                color: "rgba(255,255,255,.55)",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}>
                {tr.subtitle}
              </p>

              {/* Badges */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}>
                {[
                  { text: tr.badge1, icon: <CheckCircle2 size={11} /> },
                  { text: tr.badge2, icon: <Zap size={11} /> },
                  { text: tr.badge3, icon: <Lock size={11} /> },
                ].map((b, i) => (
                  <span key={i} style={{
                    padding: "6px 14px",
                    background: "rgba(0,255,200,.06)",
                    border: "1px solid rgba(0,255,200,.15)",
                    borderRadius: "20px",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,.7)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}>
                    {b.icon} {stripEmoji(b.text)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── STEPPER ── */}
          {step < 5 && (
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "40px" }}>
              {[1, 2, 3, 4, 5].map((n, i) => (
                <React.Fragment key={n}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--mono)", fontWeight: 700, fontSize: "14px",
                    background: step > i ? "#4ade80" : step === i ? "var(--cyan)" : "rgba(255,255,255,.08)",
                    color: step >= i ? "var(--bg)" : "rgba(255,255,255,.4)",
                    border: step === i ? "2px solid var(--cyan)" : "none",
                    boxShadow: step === i ? "0 0 20px rgba(0,255,200,.5)" : "none",
                    transition: "all .3s",
                  }}>
                    {step > i ? "✓" : n}
                  </div>
                  {i < 4 && (
                    <div style={{
                      flex: 1,
                      height: "2px",
                      background: step > i ? "#4ade80" : "rgba(255,255,255,.08)",
                      transition: "background .3s",
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* ══════════════════════════
              ÉTAPES 0–4 : QUESTIONS
          ══════════════════════════ */}
          {step < 5 && (
            <div
              key={questionKey}
              style={{
                animation: `${isRTL ? "slideInLeft" : "slideInRight"} .4s ease both`,
              }}
            >
              {/* Card question */}
              <div style={{
                background: "var(--bg3)",
                border: "1px solid rgba(0,255,200,.12)",
                borderRadius: "16px",
                padding: "32px 28px",
                boxShadow: "0 8px 40px rgba(0,0,0,.4)",
              }}>
                {/* Numéro de question */}
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  color: "var(--cyan)",
                  opacity: .7,
                  marginBottom: "12px",
                  letterSpacing: ".08em",
                }}>
                  {step + 1} / 5
                </div>

                {/* Texte de la question */}
                <h2 style={{
                  fontFamily: "'Syne', 'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 3vw, 26px)",
                  color: "white",
                  marginBottom: "28px",
                  lineHeight: 1.3,
                }}>
                  {currentQuestion.q}
                </h2>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {currentQuestion.opts.map((opt) => (
                    <button
                      key={opt.value}
                      className={`diag-option-btn${selectedOpt === opt.value ? " selected" : ""}`}
                      onClick={() => handleOptionClick(opt.value)}
                      style={{
                        textAlign: isRTL ? "right" : "left",
                        flexDirection: isRTL ? "row-reverse" : "row",
                      }}
                    >
                      {stripEmoji(opt.label)}
                      {selectedOpt === opt.value && (
                        <span style={{ marginLeft: "auto", marginRight: isRTL ? "auto" : 0, color: "var(--cyan)", fontSize: "16px" }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════
              ÉTAPE 5 : LOADING + RAPPORT
          ══════════════════════════ */}
          {step === 5 && !report && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              {/* Cercle pulsant */}
              <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(0,255,200,.08)",
                border: "2px solid rgba(0,255,200,.3)",
                margin: "0 auto 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulseGlow 2s ease infinite",
                color: "var(--cyan)",
              }}>
                <Brain size={36} strokeWidth={1.5} />
              </div>

              <p style={{
                fontFamily: "'Syne', 'Arial', sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "white",
                marginBottom: "32px",
              }}>
                {tr.analyzing}
              </p>

              {/* Étapes de chargement */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "340px", margin: "0 auto", textAlign: isRTL ? "right" : "left" }}>
                {[tr.step1, tr.step2, tr.step3].map((s, i) => (
                  <div key={i} style={{
                    fontFamily: "var(--mono)",
                    fontSize: "13px",
                    color: loadingStep > i ? "var(--cyan)" : "rgba(255,255,255,.25)",
                    transition: "color .4s",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    opacity: loadingStep > i ? 1 : loadingStep === i ? .5 : .15,
                    animation: loadingStep > i ? "none" : loadingStep === i ? "loadingDot 1s ease infinite" : "none",
                  }}>
                    <span style={{
                      width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
                      background: loadingStep > i ? "var(--cyan)" : "rgba(255,255,255,.2)",
                      boxShadow: loadingStep > i ? "0 0 8px var(--cyan)" : "none",
                    }} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════
              RAPPORT FINAL
          ══════════════════════════ */}
          {step === 5 && report && (
            <div style={{ animation: "reportReveal .6s ease both" }}>

              {/* ── Header rapport ── */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginBottom: "32px",
                flexWrap: "wrap",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}>
                <ScoreCircle score={report.score} color={report.levelColor} />

                <div style={{ flex: 1, minWidth: "200px" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "5px 14px",
                    background: `${report.levelColor}22`,
                    border: `1px solid ${report.levelColor}55`,
                    borderRadius: "20px",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: report.levelColor,
                    marginBottom: "10px",
                    letterSpacing: ".05em",
                  }}>
                    {report.level}
                  </span>

                  <h2 style={{
                    fontFamily: "'Syne', 'Arial', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 3vw, 24px)",
                    color: "white",
                    lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {report.headline}
                  </h2>
                </div>
              </div>

              {/* ── ROI Estimé ── */}
              <div style={{
                background: "linear-gradient(135deg, rgba(0,255,200,.06), rgba(0,229,255,.04))",
                border: "1px solid rgba(0,255,200,.25)",
                borderRadius: "14px",
                padding: "24px 28px",
                marginBottom: "28px",
                textAlign: "center",
                boxShadow: "0 0 40px rgba(0,255,200,.08)",
              }}>
                <div style={{
                  fontFamily: "'Syne', 'Arial', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 5vw, 42px)",
                  color: "var(--cyan)",
                  textShadow: "0 0 30px rgba(0,255,200,.4)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  €{report.roiMin.toLocaleString()} – €{report.roiMax.toLocaleString()}
                  <span style={{ fontSize: "18px", opacity: .7 }}>/mois</span>
                </div>
                <div style={{
                  fontFamily: "var(--mono)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,.5)",
                }}>
                  {tr.roiLabel}
                </div>
              </div>

              {/* ── Quick Wins ── */}
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{
                  fontFamily: "'Syne', 'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "white",
                  marginBottom: "14px",
                }}>
                  <Zap size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />{stripEmoji(tr.quickWinsTitle)}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {report.quickWins.map((qw, i) => (
                    <div
                      key={i}
                      className="quick-win-item"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <span style={{ flexShrink: 0, color: "var(--cyan)", display: "flex" }}><Zap size={14} /></span>
                      <span style={{
                        fontFamily: "'Arial', sans-serif",
                        fontSize: "14px",
                        color: "rgba(255,255,255,.8)",
                      }}>
                        {qw}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Roadmap ── */}
              <div style={{ marginBottom: "28px" }}>
                <h3 style={{
                  fontFamily: "'Syne', 'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "white",
                  marginBottom: "14px",
                }}>
                  <Map size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />{stripEmoji(tr.roadmapTitle)}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {report.roadmap.map((r, i) => (
                    <div
                      key={i}
                      className="roadmap-card"
                      style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                        {/* Timeline dot */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                          <div style={{
                            width: "10px", height: "10px", borderRadius: "50%",
                            background: "var(--cyan)",
                            boxShadow: "0 0 8px rgba(0,255,200,.5)",
                            marginTop: "4px",
                          }} />
                          {i < report.roadmap.length - 1 && (
                            <div style={{ width: "1px", flex: 1, background: "rgba(0,255,200,.15)", minHeight: "20px", marginTop: "4px" }} />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                            <span style={{
                              fontFamily: "var(--mono)",
                              fontSize: "11px",
                              color: "var(--cyan)",
                              opacity: .8,
                            }}>
                              {r.week}
                            </span>
                            <span style={{
                              padding: "2px 10px",
                              background: "rgba(74,222,128,.1)",
                              border: "1px solid rgba(74,222,128,.2)",
                              borderRadius: "10px",
                              fontFamily: "var(--mono)",
                              fontSize: "11px",
                              color: "#4ade80",
                            }}>
                              {tr.impact}: {r.impact}
                            </span>
                          </div>
                          <p style={{
                            fontFamily: "'Arial', sans-serif",
                            fontSize: "14px",
                            color: "rgba(255,255,255,.8)",
                            margin: 0,
                            lineHeight: 1.5,
                          }}>
                            {r.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Summary ── */}
              <div style={{
                background: "var(--bg3)",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "36px",
              }}>
                <h3 style={{
                  fontFamily: "'Syne', 'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "rgba(255,255,255,.6)",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}>
                  <ClipboardList size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "5px" }} />{stripEmoji(tr.summaryTitle)}
                </h3>
                <p style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "15px",
                  color: "rgba(255,255,255,.75)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {report.summary}
                </p>
              </div>

              {/* ── CTA Final ── */}
              <div style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: isRTL ? "row-reverse" : "row",
              }}>
                <a href="/#cta" className="diag-cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Rocket size={14} />{stripEmoji(tr.ctaPrimary)}
                </a>
                <button className="diag-cta-secondary" onClick={resetDiagnostic}>
                  {tr.ctaSecondary}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
