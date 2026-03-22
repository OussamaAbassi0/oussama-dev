"use client";
import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
══════════════════════════════════════════════════════════ */
function useAnimatedValue(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const raf      = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef  = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;

    if (raf.current) cancelAnimationFrame(raf.current);
    startRef.current = null;

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        fromRef.current = target;
      }
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return display;
}

/* ══════════════════════════════════════════════════════════
   STYLED SLIDER
══════════════════════════════════════════════════════════ */
function RoiSlider({
  label, value, min, max, step = 1, format,
  onChange,
}: {
  label:    string;
  value:    number;
  min:      number;
  max:      number;
  step?:    number;
  format:   (v: number) => string;
  onChange: (v: number) => void;
}) {
  const [active, setActive] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: "28px" }}>
      {/* Label + value */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: ".08em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{
          fontFamily: "var(--mono)", fontWeight: 700, fontSize: "15px",
          color: active ? "var(--cyan)" : "white",
          transition: "color .2s",
          textShadow: active ? "0 0 12px rgba(0,255,200,.6)" : "none",
        }}>
          {format(value)}
        </span>
      </div>

      {/* Track + thumb */}
      <div style={{ position: "relative", height: "4px" }}>
        {/* Background track */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "99px",
          background: "rgba(255,255,255,0.07)",
        }} />
        {/* Filled track */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${pct}%`, borderRadius: "99px",
          background: active
            ? "linear-gradient(90deg,#00ffc8,#00e5ff)"
            : "linear-gradient(90deg,rgba(0,255,200,.5),rgba(0,229,255,.5))",
          boxShadow: active ? "0 0 10px rgba(0,255,200,.5)" : "none",
          transition: "background .2s, box-shadow .2s",
        }} />
        {/* Native range (transparent, on top) */}
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          onMouseDown={() => setActive(true)}
          onTouchStart={() => setActive(true)}
          onMouseUp={() => setActive(false)}
          onTouchEnd={() => setActive(false)}
          style={{
            position: "absolute", inset: "-8px 0",
            width: "100%", height: "20px",
            appearance: "none", WebkitAppearance: "none",
            background: "transparent", cursor: "pointer", outline: "none",
          }}
        />
      </div>

      {/* Min / Max hints */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.2)" }}>{format(min)}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.2)" }}>{format(max)}</span>
      </div>

      {/* Thumb glow ring CSS */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: #00ffc8;
          box-shadow: 0 0 0 3px rgba(0,255,200,.15), 0 0 12px rgba(0,255,200,.4);
          cursor: pointer; transition: box-shadow .2s, transform .2s;
        }
        input[type=range]::-webkit-slider-thumb:hover,
        input[type=range]:active::-webkit-slider-thumb {
          box-shadow: 0 0 0 6px rgba(0,255,200,.2), 0 0 20px rgba(0,255,200,.6);
          transform: scale(1.15);
        }
        input[type=range]::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%; border: none;
          background: #00ffc8;
          box-shadow: 0 0 0 3px rgba(0,255,200,.15), 0 0 12px rgba(0,255,200,.4);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   METRIC CARD
══════════════════════════════════════════════════════════ */
function MetricCard({ label, value, unit, color, sub }: {
  label: string; value: string; unit?: string; color: string; sub?: string;
}) {
  return (
    <div style={{
      background: "var(--bg3)", border: `1px solid ${color}30`,
      borderRadius: "10px", padding: "20px 22px",
      boxShadow: `0 0 20px ${color}10`,
    }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "8px" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "26px", color: "white", lineHeight: 1, marginBottom: sub ? "6px" : 0 }}>
        {value}
        {unit && <span style={{ fontSize: "14px", color, marginLeft: "4px" }}>{unit}</span>}
      </p>
      {sub && <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.35)", marginTop: "4px" }}>{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */

const INVEST = 3000; // coût estimé one-off de la solution n8n

export default function ROICalculatorSection({ onOpenBrief }: { onOpenBrief: () => void }) {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();

  const [team,     setTeam    ] = useState(3);
  const [hours,    setHours   ] = useState(10);
  const [rate,     setRate    ] = useState(35);

  /* ── Calculs ─────────────────────────────────────────── */
  const hoursYear    = team * hours * 47;
  const costYear     = hoursYear * rate;
  const costMonth    = costYear / 12;
  const roiMonths    = costMonth > 0 ? Math.ceil(INVEST / costMonth) : 0;
  const savingsYear  = Math.round(costYear * 0.65); // hypothèse : 65% automatisables

  /* ── Compteurs animés ────────────────────────────────── */
  const animHours   = useAnimatedValue(hoursYear);
  const animCost    = useAnimatedValue(costYear);
  const animSavings = useAnimatedValue(savingsYear);

  const fmtEur  = (n: number) => n.toLocaleString("fr-FR") + " €";
  const fmtNum  = (n: number) => n.toLocaleString("fr-FR");

  return (
    <section id="roi" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <style>{`
        @keyframes roiFlash {
          0%,100% { opacity: 1; }
          50%      { opacity: .6; }
        }
        @keyframes roiBlink {
          0%,49%  { border-color: rgba(245,166,35,.35); }
          50%,100%{ border-color: rgba(245,166,35,.08); }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">

        {/* ── Header ──────────────────────────────────────── */}
        <p className="section-label">{t.lab.roiLabel}</p>
        <h2 className="section-title">
          {t.lab.roiTitle}<br />
          <span style={{ color: "var(--red)" }}>{lang==="ar" ? "غياب الأتمتة ؟" : lang==="en" ? "the absence of automation?" : lang==="es" ? "¿la ausencia de automatización?" : lang==="nl" ? "het ontbreken van automatisering?" : "l’absence d’automatisation ?"}</span>
        </h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "48px", maxWidth: "520px", lineHeight: 1.7 }}>
          {t.lab.roiSub}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>

          {/* ── Sliders ─────────────────────────────────── */}
          <div className="glass" style={{ padding: "32px" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "28px" }}>
              // Vos paramètres
            </p>

            <RoiSlider
              label={lang==="ar" ? "حجم الفريق" : lang==="en" ? "Team size" : lang==="es" ? "Tamaño del equipo" : lang==="nl" ? "Teamgrootte" : "Taille de l'équipe concernée"}
              value={team} min={1} max={50}
              format={v => `${v} ${lang==="ar" ? "شخص" : lang==="en" ? "pers." : lang==="es" ? "pers." : lang==="nl" ? "pers." : "pers."}`}
              onChange={setTeam}
            />
            <RoiSlider
              label={lang==="ar" ? "ساعات ضائعة / شخص / أسبوع" : lang==="en" ? "Hours lost / person / week" : lang==="es" ? "Horas perdidas / persona / semana" : lang==="nl" ? "Verloren uren / persoon / week" : "Heures perdues / personne / semaine"}
              value={hours} min={1} max={20}
              format={v => `${v}h`}
              onChange={setHours}
            />
            <RoiSlider
              label={lang==="ar" ? "متوسط الأجر بالساعة" : lang==="en" ? "Average hourly rate" : lang==="es" ? "Tarifa horaria media" : lang==="nl" ? "Gemiddeld uurtarief" : "Taux horaire moyen chargé"}
              value={rate} min={20} max={150}
              format={v => `${v} €/h`}
              onChange={setRate}
            />

            {/* Terminal récap */}
            <div style={{
              background: "#060a12", border: "1px solid rgba(0,255,200,.08)",
              borderRadius: "8px", padding: "14px 16px", marginTop: "4px",
              fontFamily: "var(--mono)", fontSize: "11px",
            }}>
              <p style={{ color: "var(--text-dim)", marginBottom: "4px" }}>$ calc.run —</p>
              <p style={{ color: "var(--cyan)" }}>
                {team}p × {hours}h × 47sem = <strong style={{ color: "white" }}>{fmtNum(hoursYear)} h/an</strong>
              </p>
              <p style={{ color: "var(--text-dim)", marginTop: "4px" }}>
                × {rate}€/h = <strong style={{ color: "#ff4d6d" }}>{fmtEur(costYear)}</strong>
              </p>
            </div>
          </div>

          {/* ── Résultats ───────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Heures perdues */}
            <MetricCard
              label={lang==="ar" ? "ساعات إنتاجية ضائعة / سنة" : lang==="en" ? "Productive hours lost / year" : lang==="es" ? "Horas productivas perdidas / año" : lang==="nl" ? "Verloren productieve uren / jaar" : "Heures productives perdues / an"}
              value={fmtNum(animHours)}
              unit="h"
              color="#f5a623"
              sub={`${fmtNum(Math.round(animHours / 47))} h ${lang==="ar" ? "مفقودة هذا الأسبوع" : lang==="en" ? "lost this week" : lang==="es" ? "perdidas esta semana" : lang==="nl" ? "verloren deze week" : "perdues cette semaine"}`}
            />

            {/* Coût de l'inaction — card principale */}
            <div style={{
              background: "linear-gradient(135deg, #1a0a0f, #0d0810)",
              border: "1.5px solid rgba(255,77,109,.3)",
              borderRadius: "10px", padding: "24px 22px",
              boxShadow: "0 0 30px rgba(255,77,109,.1)",
              animation: "roiBlink 3s ease-in-out infinite",
            }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#ff4d6d", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>
                {lang==="ar" ? "// التكلفة السنوية لعدم الأتمتة" : lang==="en" ? "// Annual cost of inaction" : lang==="es" ? "// Coste financiero anual de la inacción" : lang==="nl" ? "// Jäarlijkse kosten van inactie" : "// Coût financier de l'inaction / an"}
              </p>
              <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "36px", color: "white", lineHeight: 1, marginBottom: "6px" }}>
                {fmtEur(animCost)}
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(255,77,109,.7)" }}>
                ≈ {fmtEur(Math.round(costMonth))} {lang==="ar" ? "/ شهر نزيف صامت" : lang==="en" ? "/ month of silent bleeding" : lang==="es" ? "/ mes de hemorragia silenciosa" : lang==="nl" ? "/ maand stil verlies" : "/ mois d'hémorragie silencieuse"}
              </p>
            </div>

            {/* Solution n8n */}
            <div style={{
              background: "linear-gradient(135deg, #041210, #060f12)",
              border: "1.5px solid rgba(0,255,200,.25)",
              borderRadius: "10px", padding: "22px",
              boxShadow: "0 0 24px rgba(0,255,200,.07)",
            }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--cyan)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>
                // La solution n8n · Investissement one-off
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.35)", marginBottom: "4px" }}>Investissement</p>
                  <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "18px", color: "var(--cyan)" }}>~{fmtEur(INVEST)}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.35)", marginBottom: "4px" }}>ROI estimé</p>
                  <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "18px", color: "#4ade80" }}>
                    {roiMonths <= 1 ? "< 1 mois" : `${roiMonths} mois`}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.35)", marginBottom: "4px" }}>Économie estimée / an</p>
                  <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "18px", color: "var(--cyan)" }}>
                    {fmtEur(animSavings)}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.35)", marginBottom: "4px" }}>Tâches automatisables</p>
                  <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "18px", color: "#4ade80" }}>~65%</p>
                </div>
              </div>

              {/* Progress ROI */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em" }}>
                    Rentabilité
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--cyan)" }}>
                    {roiMonths <= 1 ? "Immédiat" : `Mois ${roiMonths}`}
                  </span>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,.06)", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: "99px",
                    background: "linear-gradient(90deg, #4ade80, #00ffc8)",
                    width: `${Math.min(100, 100 / Math.max(roiMonths, 1) * 3)}%`,
                    transition: "width .6s cubic-bezier(.4,0,.2,1)",
                  }} />
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onOpenBrief}
                style={{
                  width: "100%", padding: "13px",
                  background: "var(--cyan)", color: "var(--bg)",
                  fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
                  border: "none", borderRadius: "6px", cursor: "pointer",
                  letterSpacing: ".05em",
                  boxShadow: "0 0 20px rgba(0,255,200,.25)",
                  transition: "box-shadow .2s, transform .2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(0,255,200,.5)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,200,.25)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {lang==="ar" ? "← أوقف النزيف المالي" : lang==="en" ? "Stop the financial bleeding →" : lang==="es" ? "Detener la hemorragia financiera →" : lang==="nl" ? "Stop het financiële bloeden →" : "Arrêter l'hémorragie financière →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
