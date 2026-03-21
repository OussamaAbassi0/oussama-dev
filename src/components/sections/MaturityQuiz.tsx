"use client";
import { useState } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   QUESTIONS
══════════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    id:   "profile",
    q:    "Vous êtes plutôt...",
    opts: [
      { label: "🏢 Dirigeant / CEO",      value: "ceo",     score: 0 },
      { label: "💼 Directeur Commercial", value: "sales",   score: 0 },
      { label: "👥 DRH / Responsable RH", value: "hr",      score: 0 },
      { label: "🏪 E-commerce / Retail",  value: "ecom",    score: 0 },
    ],
  },
  {
    id:   "tools",
    q:    "Combien d'outils utilisez-vous au quotidien ?",
    opts: [
      { label: "1–2 (email + Excel)",         value: "few",    score: 0 },
      { label: "3–5 (CRM, Slack, Drive...)",  value: "medium", score: 1 },
      { label: "6–10 outils différents",      value: "many",   score: 2 },
      { label: "10+ outils (stack complexe)", value: "stack",  score: 3 },
    ],
  },
  {
    id:   "manual",
    q:    "Combien d'heures par semaine passez-vous sur des tâches répétitives ?",
    opts: [
      { label: "Moins de 2h",   value: "low",    score: 0 },
      { label: "2 à 5h",        value: "medium", score: 1 },
      { label: "5 à 15h",       value: "high",   score: 2 },
      { label: "Plus de 15h",   value: "very",   score: 3 },
    ],
  },
  {
    id:   "automation",
    q:    "Votre niveau d'automatisation actuel ?",
    opts: [
      { label: "😅 Tout est manuel",                  value: "zero",   score: 0 },
      { label: "🔧 Quelques outils, pas connectés",   value: "basic",  score: 1 },
      { label: "⚙️ Quelques automatisations simples", value: "mid",    score: 2 },
      { label: "🚀 Pipeline partiellement automatisé",value: "adv",    score: 3 },
    ],
  },
  {
    id:   "priority",
    q:    "Votre priorité numéro 1 ?",
    opts: [
      { label: "💰 Réduire les coûts opérationnels",  value: "cost",   score: 0 },
      { label: "⚡ Accélérer la croissance",           value: "grow",   score: 0 },
      { label: "🎯 Qualifier plus de leads",           value: "leads",  score: 0 },
      { label: "😌 Libérer du temps à mon équipe",     value: "time",   score: 0 },
    ],
  },
];

/* ══════════════════════════════════════════════════════════
   ROADMAPS par profil
══════════════════════════════════════════════════════════ */
const ROADMAPS: Record<string, {
  level:   string;
  levelColor: string;
  headline: string;
  steps:   { icon: string; title: string; desc: string; delay: string }[];
  roi:     string;
}> = {
  low: {
    level:      "Niveau 0 — Territoire vierge",
    levelColor: "#ff4d6d",
    headline:   "Bonne nouvelle : tout est à gagner.",
    steps: [
      { icon: "🔗", title: "Connecter vos outils existants", desc: "Gmail, Google Sheets, CRM — les relier en 1 workflow simple.", delay: "Semaine 1–2" },
      { icon: "📧", title: "Automatiser les réponses email", desc: "Qualifier et trier automatiquement vos emails entrants.", delay: "Semaine 3–4" },
      { icon: "📊", title: "Mettre en place un tableau de bord", desc: "Vos KPIs consolidés automatiquement chaque lundi.", delay: "Mois 2" },
    ],
    roi: "Économie estimée : 8–12h/semaine dès le mois 1",
  },
  mid: {
    level:      "Niveau 1 — Premiers pas",
    levelColor: "#f5a623",
    headline:   "Vous avez les bases. Il faut connecter.",
    steps: [
      { icon: "⚙️", title: "Unifier votre stack",        desc: "Connecter tous vos outils dans un pipeline cohérent.", delay: "Semaine 1–2" },
      { icon: "🤖", title: "Ajouter de l'IA",            desc: "Scoring automatique des leads, résumés de réunions.", delay: "Semaine 3–5" },
      { icon: "📈", title: "Automatiser le reporting",   desc: "Rapports hebdo générés et envoyés sans intervention.", delay: "Mois 2" },
      { icon: "🚀", title: "Scaler les automatisations", desc: "Dupliquer les workflows qui marchent sur d'autres équipes.", delay: "Mois 3" },
    ],
    roi: "Économie estimée : 15–25h/semaine dès le mois 2",
  },
  high: {
    level:      "Niveau 2 — En route vers l'excellence",
    levelColor: "#00ffc8",
    headline:   "Bonne base. Passez aux agents autonomes.",
    steps: [
      { icon: "🧠", title: "Agents IA multi-tâches",    desc: "Des agents qui prennent des décisions et agissent seuls.", delay: "Semaine 1–3" },
      { icon: "🔄", title: "Pipelines complexes",       desc: "Workflows conditionnels avec branches et boucles.", delay: "Semaine 4–6" },
      { icon: "📡", title: "Monitoring en temps réel",  desc: "Alertes automatiques sur anomalies et performances.", delay: "Mois 2" },
      { icon: "💡", title: "IA prédictive",             desc: "Anticipez les besoins clients avant qu'ils se manifestent.", delay: "Mois 3–4" },
    ],
    roi: "Économie estimée : 40–60h/semaine à pleine maturité",
  },
};

function getRoadmap(totalScore: number) {
  if (totalScore <= 2) return ROADMAPS.low;
  if (totalScore <= 5) return ROADMAPS.mid;
  return ROADMAPS.high;
}

/* ══════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════ */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
        <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(0,229,255,.6)", letterSpacing:".1em" }}>
          QUESTION {current} / {total}
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
  const { t } = useLang();

  const [step,      setStep     ] = useState<"intro" | "quiz" | "result">("intro");
  const [qIdx,      setQIdx     ] = useState(0);
  const [answers,   setAnswers  ] = useState<Record<string, { value: string; score: number }>>({});
  const [selected,  setSelected ] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
  const roadmap    = getRoadmap(totalScore);
  const profileAns = answers["profile"]?.value ?? "ceo";

  const choose = (value: string, score: number) => {
    if (animating) return;
    setSelected(value);
    setAnimating(true);
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [QUESTIONS[qIdx].id]: { value, score } }));
      if (qIdx < QUESTIONS.length - 1) {
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

  /* Label profile */
  const PROFILE_LABELS: Record<string, string> = {
    ceo:   "Dirigeant",
    sales: "Directeur Commercial",
    hr:    "DRH",
    ecom:  "E-commerce",
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

      <div ref={ref} className="fade-in" style={{ maxWidth:"800px", margin:"0 auto" }}>

        {/* Header */}
        <p className="section-label">{t.quiz.label}</p>
        <h2 className="section-title">
          {t.quiz.title1}<br />
          <span className="text-cyan">{t.quiz.title2}</span>
        </h2>
        <p style={{ fontFamily:"Arial, sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"48px", maxWidth:"480px", lineHeight:1.65 }}>
          {t.quiz.subtitle}
        </p>

        {/* ── INTRO ─────────────────────────────────────── */}
        {step === "intro" && (
          <div style={{ textAlign:"center", padding:"48px 32px", background:"#07090f", border:"1px solid rgba(0,229,255,.15)", borderRadius:"16px", animation:"quizFadeIn .4s ease" }}>
            <div style={{ fontSize:"56px", marginBottom:"20px" }}>🧠</div>
            <h3 style={{ fontFamily:"var(--sans)", fontWeight:800, fontSize:"24px", color:"white", marginBottom:"12px" }}>
              Diagnostic de maturité IA
            </h3>
            <p style={{ fontFamily:"Arial, sans-serif", fontSize:"14px", color:"rgba(255,255,255,.5)", lineHeight:1.7, marginBottom:"32px", maxWidth:"380px", margin:"0 auto 32px" }}>
              Répondez à 5 questions pour obtenir votre roadmap personnalisée avec les automatisations prioritaires pour votre business.
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

        {/* ── QUIZ ──────────────────────────────────────── */}
        {step === "quiz" && (
          <div style={{ background:"#07090f", border:"1px solid rgba(0,229,255,.12)", borderRadius:"16px", padding:"36px", animation:"quizFadeIn .3s ease" }}>
            <ProgressBar current={qIdx + 1} total={QUESTIONS.length} />

            <h3 style={{
              fontFamily:"var(--sans)", fontWeight:700, fontSize:"22px",
              color:"white", marginBottom:"28px", lineHeight:1.3,
            }}>
              {QUESTIONS[qIdx].q}
            </h3>

            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {QUESTIONS[qIdx].opts.map(opt => {
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
                      textAlign:    "left",
                      fontFamily:   "Arial, Helvetica, sans-serif",
                      fontSize:     "14.5px",
                      color:        isSelected ? "white" : "rgba(255,255,255,.7)",
                      fontWeight:   isSelected ? 600 : 400,
                      transition:   "all .2s",
                      transform:    isSelected ? "translateX(6px)" : "translateX(0)",
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

        {/* ── RÉSULTAT ──────────────────────────────────── */}
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
              {PROFILE_LABELS[profileAns]},<br />{roadmap.headline}
            </h3>

            {/* ROI estimate */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"8px 16px", borderRadius:"8px", marginBottom:"32px",
              background:"rgba(74,222,128,.08)", border:"1px solid rgba(74,222,128,.2)",
              fontFamily:"var(--mono)", fontSize:"12px", color:"#4ade80",
            }}>
              💰 {roadmap.roi}
            </div>

            {/* Roadmap steps */}
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
                  {/* Numéro + icône */}
                  <div style={{
                    width:"40px", height:"40px", borderRadius:"10px", flexShrink:0,
                    background:`${roadmap.levelColor}12`,
                    border:`1px solid ${roadmap.levelColor}25`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px",
                  }}>
                    {step_.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"4px" }}>
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
