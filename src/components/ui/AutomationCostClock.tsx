"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Megaphone, Target, Users, DollarSign, Settings, Monitor, Clock, CalendarDays, Calendar } from "lucide-react";
import { useLang } from "@/lib/LangContext";

/* ─────────────────────────────────────────────────────────────────────
   AUTOMATION COST CLOCK
   Affiche en temps réel combien le visiteur perd pendant sa visite
   à cause des tâches manuelles répétitives.

   Formule :
     coût/sec = (nb_employés × coût_horaire_moyen × ratio_manuel) / 3600
   Hypothèses : équipe de 10 personnes, secteurs européens.
───────────────────────────────────────────────────────────────────── */

interface Sector {
  icon: React.ReactNode;
  label: string;
  costPerSec: number; /* € perdus / seconde pour une équipe ~10 */
}

const SECTOR_ICONS = [
  <Megaphone key="meg" size={11} />,
  <Target    key="tgt" size={11} />,
  <Users     key="usr" size={11} />,
  <DollarSign key="dlr" size={11} />,
  <Settings  key="set" size={11} />,
  <Monitor   key="mon" size={11} />,
];

const SECTORS: Record<string, Sector[]> = {
  fr: [
    { icon: SECTOR_ICONS[0], label: "Marketing",   costPerSec: 0.0311 },
    { icon: SECTOR_ICONS[1], label: "Ventes/CRM",  costPerSec: 0.0422 },
    { icon: SECTOR_ICONS[2], label: "RH",          costPerSec: 0.0278 },
    { icon: SECTOR_ICONS[3], label: "Finance",     costPerSec: 0.0389 },
    { icon: SECTOR_ICONS[4], label: "Ops/Logis.",  costPerSec: 0.0400 },
    { icon: SECTOR_ICONS[5], label: "Tech/IT",     costPerSec: 0.0458 },
  ],
  en: [
    { icon: SECTOR_ICONS[0], label: "Marketing",   costPerSec: 0.0311 },
    { icon: SECTOR_ICONS[1], label: "Sales/CRM",   costPerSec: 0.0422 },
    { icon: SECTOR_ICONS[2], label: "HR",          costPerSec: 0.0278 },
    { icon: SECTOR_ICONS[3], label: "Finance",     costPerSec: 0.0389 },
    { icon: SECTOR_ICONS[4], label: "Ops/Logis.",  costPerSec: 0.0400 },
    { icon: SECTOR_ICONS[5], label: "Tech/IT",     costPerSec: 0.0458 },
  ],
  ar: [
    { icon: SECTOR_ICONS[0], label: "التسويق",         costPerSec: 0.0311 },
    { icon: SECTOR_ICONS[1], label: "المبيعات",        costPerSec: 0.0422 },
    { icon: SECTOR_ICONS[2], label: "الموارد البشرية", costPerSec: 0.0278 },
    { icon: SECTOR_ICONS[3], label: "المالية",         costPerSec: 0.0389 },
    { icon: SECTOR_ICONS[4], label: "العمليات",        costPerSec: 0.0400 },
    { icon: SECTOR_ICONS[5], label: "تقنية المعلومات", costPerSec: 0.0458 },
  ],
  es: [
    { icon: SECTOR_ICONS[0], label: "Marketing",   costPerSec: 0.0311 },
    { icon: SECTOR_ICONS[1], label: "Ventas/CRM",  costPerSec: 0.0422 },
    { icon: SECTOR_ICONS[2], label: "RRHH",        costPerSec: 0.0278 },
    { icon: SECTOR_ICONS[3], label: "Finanzas",    costPerSec: 0.0389 },
    { icon: SECTOR_ICONS[4], label: "Operaciones", costPerSec: 0.0400 },
    { icon: SECTOR_ICONS[5], label: "Tech/IT",     costPerSec: 0.0458 },
  ],
  nl: [
    { icon: SECTOR_ICONS[0], label: "Marketing",   costPerSec: 0.0311 },
    { icon: SECTOR_ICONS[1], label: "Sales/CRM",   costPerSec: 0.0422 },
    { icon: SECTOR_ICONS[2], label: "HR",          costPerSec: 0.0278 },
    { icon: SECTOR_ICONS[3], label: "Financiën",   costPerSec: 0.0389 },
    { icon: SECTOR_ICONS[4], label: "Ops/Logis.",  costPerSec: 0.0400 },
    { icon: SECTOR_ICONS[5], label: "Tech/IT",     costPerSec: 0.0458 },
  ],
};

const COPY: Record<string, {
  eyebrow: string;
  title: string;
  since: string;
  perWeek: string;
  perYear: string;
  cta: string;
  sector: string;
  disclaimer: string;
  week: string;
  year: string;
}> = {
  fr: {
    eyebrow:    "// Horloge d'opportunité manquée",
    title:      "Votre équipe perd de l'argent pendant que vous lisez ceci.",
    since:      "Depuis votre arrivée sur cette page",
    perWeek:    "perdus / semaine",
    perYear:    "perdus / an",
    cta:        "Stopper l'hémorragie →",
    sector:     "Votre secteur :",
    disclaimer: "Basé sur une équipe de 10 personnes. Salaires + temps perdu sur tâches répétitives.",
    week:       "sem.",
    year:       "an",
  },
  en: {
    eyebrow:    "// Opportunity Cost Clock",
    title:      "Your team is losing money while you read this.",
    since:      "Since you landed on this page",
    perWeek:    "lost / week",
    perYear:    "lost / year",
    cta:        "Stop the bleeding →",
    sector:     "Your sector:",
    disclaimer: "Based on a 10-person team. Salaries + time lost on repetitive tasks.",
    week:       "wk",
    year:       "yr",
  },
  ar: {
    eyebrow:    "// ساعة تكلفة الفرصة الضائعة",
    title:      "فريقك يخسر المال أثناء قراءتك لهذا.",
    since:      "منذ وصولك إلى هذه الصفحة",
    perWeek:    "مفقود / أسبوع",
    perYear:    "مفقود / سنة",
    cta:        "أوقف النزيف →",
    sector:     "قطاعك:",
    disclaimer: "بناءً على فريق من 10 أشخاص. الرواتب + الوقت الضائع في المهام المتكررة.",
    week:       "أسبوع",
    year:       "سنة",
  },
  es: {
    eyebrow:    "// Reloj de Oportunidad Perdida",
    title:      "Tu equipo está perdiendo dinero mientras lees esto.",
    since:      "Desde que llegaste a esta página",
    perWeek:    "perdidos / semana",
    perYear:    "perdidos / año",
    cta:        "Detener la hemorragia →",
    sector:     "Tu sector:",
    disclaimer: "Basado en un equipo de 10 personas. Salarios + tiempo perdido en tareas repetitivas.",
    week:       "sem.",
    year:       "año",
  },
  nl: {
    eyebrow:    "// Gemiste Kansen Klok",
    title:      "Uw team verliest geld terwijl u dit leest.",
    since:      "Sinds u op deze pagina bent",
    perWeek:    "verloren / week",
    perYear:    "verloren / jaar",
    cta:        "Stop de bloeding →",
    sector:     "Uw sector:",
    disclaimer: "Gebaseerd op een team van 10 personen. Salarissen + tijd verloren aan repetitieve taken.",
    week:       "wk",
    year:       "jr",
  },
};

/* ─── Keyframe CSS injected once ──────────────────────────────────── */
const CLOCK_CSS = `
@keyframes clockPulse {
  0%, 100% { text-shadow: 0 0 20px rgba(255,80,80,0.4); }
  50%       { text-shadow: 0 0 40px rgba(255,80,80,0.9), 0 0 80px rgba(255,80,80,0.3); }
}
@keyframes clockSlideUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes clockSectorIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes clockCounterIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes redDot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
`;

/* ─── Format helpers ───────────────────────────────────────────────── */
function fmtTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}min ${s < 10 ? "0" + s : s}sec`;
}

function fmtMoney(eur: number): string {
  return eur.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ─── Component ───────────────────────────────────────────────────── */
export default function AutomationCostClock({
  onOpenBrief,
}: {
  onOpenBrief?: () => void;
}) {
  const { lang } = useLang();
  const isRTL      = lang === "ar";
  const tx         = COPY[lang] ?? COPY.fr;
  const sectors    = SECTORS[lang] ?? SECTORS.fr;

  const [sectorIdx,  setSectorIdx ] = useState(0);
  const [elapsed,    setElapsed   ] = useState(0);   /* seconds */
  const [cost,       setCost      ] = useState(0);   /* € */
  const [highlight,  setHighlight ] = useState(false);
  const styleInjected = useRef(false);
  const startRef      = useRef(Date.now());

  /* Inject CSS once */
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const el = document.createElement("style");
    el.textContent = CLOCK_CSS;
    document.head.appendChild(el);
  }, []);

  /* Tick every 100ms */
  useEffect(() => {
    const cps = sectors[sectorIdx]?.costPerSec ?? 0.035;
    const id  = setInterval(() => {
      const secs = (Date.now() - startRef.current) / 1000;
      setElapsed(secs);
      setCost(secs * cps);
    }, 100);
    return () => clearInterval(id);
  }, [sectorIdx, sectors]);

  /* Flash on sector change */
  const changeSector = useCallback((idx: number) => {
    setSectorIdx(idx);
    setHighlight(true);
    setTimeout(() => setHighlight(false), 600);
  }, []);

  const sector      = sectors[sectorIdx];
  const weekLoss    = fmtMoney(sector.costPerSec * 3600 * 8 * 5);   /* 40h/week */
  const yearLoss    = fmtMoney(sector.costPerSec * 3600 * 8 * 5 * 48); /* 48 weeks */

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        padding:    "0 24px 0",
        background: "linear-gradient(180deg, #050810 0%, #060c14 100%)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Subtle grid bg */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,80,80,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,80,80,.025) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div style={{
        maxWidth:  "1100px",
        margin:    "0 auto",
        padding:   "64px 0 72px",
        position:  "relative",
        zIndex:    1,
        animation: "clockSlideUp .7s .2s ease both",
      }}>

        {/* ── Eyebrow ─────────────────────────────────────────── */}
        <p style={{
          fontFamily:    "'Courier New', monospace",
          fontSize:      "11px",
          color:         "rgba(255,100,100,.7)",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          marginBottom:  "12px",
          display:       "flex",
          alignItems:    "center",
          gap:           "8px",
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#ff5050",
            boxShadow: "0 0 8px #ff5050",
            display: "inline-block",
            animation: "redDot 1.2s ease-in-out infinite",
          }} />
          {tx.eyebrow}
        </p>

        {/* ── Title ───────────────────────────────────────────── */}
        <h2 style={{
          fontFamily:   "'Syne', sans-serif",
          fontWeight:   800,
          fontSize:     "clamp(22px, 3.5vw, 40px)",
          color:        "white",
          lineHeight:   1.2,
          marginBottom: "36px",
          maxWidth:     "640px",
        }}>
          {tx.title}
        </h2>

        {/* ── Main layout ─────────────────────────────────────── */}
        <div style={{
          display:   "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:       "32px",
          alignItems:"start",
        }}>

          {/* LEFT — Live counter */}
          <div style={{
            background:   "rgba(255,50,50,.04)",
            border:       "1px solid rgba(255,80,80,.15)",
            borderRadius: "16px",
            padding:      "32px",
            position:     "relative",
            overflow:     "hidden",
          }}>
            {/* Glow bg */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "200px", height: "200px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,50,50,.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <p style={{
              fontFamily:    "'Courier New', monospace",
              fontSize:      "11px",
              color:         "rgba(255,150,150,.6)",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              marginBottom:  "12px",
            }}>
              {tx.since}
            </p>

            {/* Time elapsed */}
            <div style={{
              fontFamily:  "'Courier New', monospace",
              fontSize:    "clamp(13px, 1.5vw, 16px)",
              color:       "rgba(255,255,255,.4)",
              marginBottom: "16px",
              display:     "flex", alignItems: "center", gap: "6px",
            }}>
              <Clock size={14} /> {fmtTime(elapsed)}
            </div>

            {/* Big money counter */}
            <div
              key={Math.floor(cost * 10)} /* key trick forces re-animation on big jumps */
              style={{
                fontFamily:   "'Courier New', monospace",
                fontWeight:   900,
                fontSize:     "clamp(36px, 6vw, 72px)",
                color:        highlight ? "#ffaa00" : "#ff5050",
                lineHeight:   1,
                letterSpacing: "-.02em",
                transition:   "color .3s",
                animation:    "clockPulse 2s ease-in-out infinite, clockCounterIn .15s ease",
              }}
            >
              {fmtMoney(cost)}
            </div>

            <div style={{
              fontFamily:  "'Courier New', monospace",
              fontSize:    "12px",
              color:       "rgba(255,150,150,.5)",
              marginTop:   "8px",
            }}>
              perdus en tâches manuelles
            </div>
          </div>

          {/* RIGHT — Sector selector + projections + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Sector chips */}
            <div>
              <p style={{
                fontFamily:    "'Courier New', monospace",
                fontSize:      "11px",
                color:         "rgba(255,255,255,.35)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom:  "12px",
              }}>
                {tx.sector}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {sectors.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => changeSector(i)}
                    style={{
                      padding:      "7px 14px",
                      borderRadius: "8px",
                      border:       `1px solid ${sectorIdx === i ? "rgba(255,80,80,.5)" : "rgba(255,255,255,.08)"}`,
                      background:   sectorIdx === i ? "rgba(255,80,80,.12)" : "rgba(255,255,255,.03)",
                      color:        sectorIdx === i ? "#ff8080" : "rgba(255,255,255,.4)",
                      fontFamily:   "'Courier New', monospace",
                      fontSize:     "11px",
                      cursor:       "pointer",
                      transition:   "all .2s",
                      animation:    `clockSectorIn .3s ${i * 50}ms ease both`,
                    }}
                    onMouseEnter={e => {
                      if (sectorIdx !== i) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,80,80,.07)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,80,80,.3)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,180,180,.8)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (sectorIdx !== i) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.03)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.08)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)";
                      }
                    }}
                  >
                    <span style={{display:"flex",alignItems:"center",gap:"5px"}}>{s.icon} {s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Projections */}
            <div style={{
              display:      "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:          "12px",
            }}>
              {[
                { label: tx.perWeek, val: weekLoss, icon: <CalendarDays size={10} /> },
                { label: tx.perYear, val: yearLoss, icon: <Calendar size={10} /> },
              ].map(item => (
                <div key={item.label} style={{
                  background:   "rgba(255,255,255,.03)",
                  border:       "1px solid rgba(255,255,255,.06)",
                  borderRadius: "10px",
                  padding:      "16px",
                }}>
                  <div style={{
                    fontFamily:  "'Courier New', monospace",
                    fontWeight:  700,
                    fontSize:    "clamp(14px, 1.8vw, 20px)",
                    color:       "rgba(255,150,80,.9)",
                    lineHeight:  1,
                    marginBottom:"6px",
                  }}>
                    {item.val}
                  </div>
                  <div style={{
                    fontFamily:  "'Courier New', monospace",
                    fontSize:    "10px",
                    color:       "rgba(255,255,255,.3)",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                  }}>
                    <span style={{display:"flex",alignItems:"center",gap:"4px"}}>{item.icon} {item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onOpenBrief}
              style={{
                padding:      "14px 28px",
                background:   "linear-gradient(135deg, #ff5050, #ff8c42)",
                color:        "white",
                fontFamily:   "'Courier New', monospace",
                fontWeight:   700,
                fontSize:     "14px",
                border:       "none",
                borderRadius: "10px",
                cursor:       "pointer",
                letterSpacing:".04em",
                boxShadow:    "0 0 24px rgba(255,80,80,.3)",
                transition:   "all .25s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 0 40px rgba(255,80,80,.5)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 0 24px rgba(255,80,80,.3)";
              }}
            >
              {tx.cta}
            </button>

            {/* Disclaimer */}
            <p style={{
              fontFamily:  "'Courier New', monospace",
              fontSize:    "10px",
              color:       "rgba(255,255,255,.2)",
              lineHeight:  1.6,
            }}>
              * {tx.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
