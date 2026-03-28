"use client";
import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import {
  Building2, Briefcase, Users, ShoppingCart,
  Clock, BarChart3, DollarSign, Target, Mail, FileText,
  Calendar, MessageCircle, Package, Star, MousePointerClick,
} from "lucide-react";

const PROFILE_ICONS = [
  <Building2 key="ceo" size={14} />,
  <Briefcase key="sales" size={14} />,
  <Users key="hr" size={14} />,
  <ShoppingCart key="ecom" size={14} />,
];

const GAIN_ICON_MAP: Record<string, React.ReactNode> = {
  "⏱":  <Clock size={13} />,
  "📊":  <BarChart3 size={13} />,
  "💰":  <DollarSign size={13} />,
  "🎯":  <Target size={13} />,
  "📧":  <Mail size={13} />,
  "📄":  <FileText size={13} />,
  "📅":  <Calendar size={13} />,
  "💬":  <MessageCircle size={13} />,
  "📦":  <Package size={13} />,
  "⭐":  <Star size={13} />,
};

/* ══════════════════════════════════════════════════════════
   PROFILS & DONNÉES
══════════════════════════════════════════════════════════ */
const PROFILES = [
  {
    id:     "ceo",
    emoji:  "🏢",
    label:  "Dirigeant / CEO",
    color:  "#a78bfa",
    gains: [
      { icon:"⏱",  label:"Réunions de reporting éliminées",  value:"8h/sem"  },
      { icon:"📊",  label:"Tableaux de bord automatisés",     value:"100%"    },
      { icon:"💰",  label:"Coût opérationnel réduit",         value:"-35%"    },
    ],
    stories:[
      "\"Mes rapports hebdos se font seuls. Je regarde juste les alertes.\"",
      "\"J'ai récupéré 2 jours par semaine que je réinvestis en prospection.\"",
    ],
    multiplier: 1.4,
  },
  {
    id:     "sales",
    emoji:  "💼",
    label:  "Directeur Commercial",
    color:  "#00ffc8",
    gains: [
      { icon:"🎯",  label:"Leads qualifiés automatiquement",  value:"18/jour" },
      { icon:"📧",  label:"Emails de relance personnalisés",  value:"100%"    },
      { icon:"⏱",  label:"Temps de qualification économisé", value:"12h/sem" },
    ],
    stories:[
      "\"Mon pipeline s'est rempli tout seul pendant mes vacances.\"",
      "\"On a triplé le nombre de leads traités sans embaucher.\"",
    ],
    multiplier: 1.6,
  },
  {
    id:     "hr",
    emoji:  "👥",
    label:  "DRH / Responsable RH",
    color:  "#ff4d6d",
    gains: [
      { icon:"📄",  label:"CVs triés automatiquement",        value:"340/sem" },
      { icon:"📅",  label:"Entretiens planifiés par IA",       value:"Auto"    },
      { icon:"⏱",  label:"Temps de recrutement économisé",    value:"20h/sem" },
    ],
    stories:[
      "\"Le tri de CVs qui prenait 2 jours se fait maintenant en 20 minutes.\"",
      "\"Les managers voient uniquement les candidats qui valent le coup.\"",
    ],
    multiplier: 1.3,
  },
  {
    id:     "ecom",
    emoji:  "🛒",
    label:  "E-commerce",
    color:  "#f5a623",
    gains: [
      { icon:"💬",  label:"Support client 24/7 par IA",        value:"100%"    },
      { icon:"📦",  label:"Gestion retours automatisée",        value:"-60%"    },
      { icon:"⭐",  label:"Avis collectés automatiquement",     value:"x3"      },
    ],
    stories:[
      "\"Mon SAV tourne seul la nuit et le weekend. Zéro ticket non traité.\"",
      "\"Les relances panier abandonné se font automatiquement. +23% CA.\"",
    ],
    multiplier: 1.5,
  },
];

/* Animated counter hook */
function useCounter(target: number, active: boolean, duration = 800) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) { setVal(0); return; }
    let start: number | null = null;
    const from = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, active, duration]);

  return val;
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function PersonalizedROI({ onOpenBrief }: { onOpenBrief: () => void }) {
  const ref = useFadeIn<HTMLDivElement>();

  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [teamSize,      setTeamSize      ] = useState(5);
  const [hoursPerWeek,  setHoursPerWeek  ] = useState(8);
  const [hourlyRate,    setHourlyRate    ] = useState(35);

  const profile = PROFILES.find(p => p.id === activeProfile);

  const multiplier  = profile?.multiplier ?? 1;
  const hoursYear   = teamSize * hoursPerWeek * 47 * multiplier;
  const costYear    = hoursYear * hourlyRate;
  const savingYear  = Math.round(costYear * 0.65);
  const roiMonths   = Math.ceil(3000 / (costYear / 12));

  const animHours   = useCounter(Math.round(hoursYear),  !!activeProfile);
  const animCost    = useCounter(Math.round(costYear),   !!activeProfile);
  const animSaving  = useCounter(savingYear,             !!activeProfile);

  const fmtEur = (n: number) => n.toLocaleString("fr-FR") + " €";
  const fmtNum = (n: number) => n.toLocaleString("fr-FR");

  return (
    <section id="personalized-roi" style={{ padding:"100px 24px" }}>
      <style>{`
        @keyframes profileReveal {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth:"1100px", margin:"0 auto" }}>

        {/* Header */}
        <p className="section-label">// Simulateur personnalisé</p>
        <h2 className="section-title">
          Votre gain selon<br />
          <span className="text-cyan">votre profil exact</span>
        </h2>
        <p style={{ fontFamily:"Arial, sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", marginBottom:"48px", maxWidth:"480px", lineHeight:1.65 }}>
          Sélectionnez votre profil. Les calculs s&apos;adaptent instantanément à votre réalité métier.
        </p>

        {/* Profil selector */}
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"40px" }}>
          {PROFILES.map((p, pi) => (
            <button
              key={p.id}
              onClick={() => setActiveProfile(p.id === activeProfile ? null : p.id)}
              style={{
                padding:      "10px 20px",
                background:   activeProfile === p.id ? `${p.color}18` : "rgba(255,255,255,.04)",
                border:       `1px solid ${activeProfile === p.id ? p.color + "60" : "rgba(255,255,255,.1)"}`,
                borderRadius: "24px",
                cursor:       "pointer",
                fontFamily:   "Arial, sans-serif",
                fontSize:     "14px",
                color:        activeProfile === p.id ? p.color : "rgba(255,255,255,.6)",
                fontWeight:   activeProfile === p.id ? 600 : 400,
                transition:   "all .2s",
                transform:    activeProfile === p.id ? "scale(1.04)" : "scale(1)",
                boxShadow:    activeProfile === p.id ? `0 0 16px ${p.color}25` : "none",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>{PROFILE_ICONS[pi]} {p.label}</span>
            </button>
          ))}
        </div>

        {!activeProfile ? (
          /* État initial */
          <div style={{
            textAlign:"center", padding:"48px",
            background:"rgba(255,255,255,.02)",
            border:"1px dashed rgba(255,255,255,.08)",
            borderRadius:"16px",
          }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"12px", opacity:.3, color:"rgba(255,255,255,.5)" }}><MousePointerClick size={36} strokeWidth={1} /></div>
            <p style={{ fontFamily:"var(--mono)", fontSize:"13px", color:"rgba(255,255,255,.25)" }}>
              Sélectionnez votre profil pour voir votre simulation personnalisée
            </p>
          </div>
        ) : (
          <div style={{ animation:"profileReveal .4s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"32px" }}>

              {/* ── Gauche : sliders + gains spécifiques ── */}
              <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

                {/* Gains spécifiques au profil */}
                <div className="glass" style={{ padding:"24px" }}>
                  <p style={{
                    fontFamily:"var(--mono)", fontSize:"9px",
                    color:profile!.color, letterSpacing:".2em",
                    textTransform:"uppercase", marginBottom:"16px",
                  }}>
                    // Gains typiques — {profile!.label}
                  </p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                    {profile!.gains.map(g => (
                      <div key={g.label} style={{
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                        padding:"10px 14px",
                        background:`${profile!.color}08`,
                        border:`1px solid ${profile!.color}15`,
                        borderRadius:"8px",
                      }}>
                        <span style={{ fontFamily:"Arial, sans-serif", fontSize:"13px", color:"rgba(255,255,255,.6)" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: profile!.color }}>{GAIN_ICON_MAP[g.icon] ?? null}</span> {g.label}
                        </span>
                        <span style={{
                          fontFamily:"var(--mono)", fontWeight:700, fontSize:"13px",
                          color:profile!.color,
                        }}>
                          {g.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Témoignage */}
                <div style={{
                  padding:"16px 20px",
                  background:"rgba(255,255,255,.02)",
                  border:"1px solid rgba(255,255,255,.06)",
                  borderRadius:"10px",
                  fontFamily:"Arial, sans-serif",
                  fontSize:"13px",
                  color:"rgba(255,255,255,.5)",
                  lineHeight:1.6,
                  fontStyle:"italic",
                }}>
                  {profile!.stories[0]}
                </div>

                {/* Sliders */}
                <div className="glass" style={{ padding:"24px" }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"var(--cyan)", letterSpacing:".2em", textTransform:"uppercase", marginBottom:"20px" }}>
                    // Vos paramètres
                  </p>

                  {[
                    { label:"Personnes concernées", value:teamSize,     min:1,  max:50,  fmt:(v:number)=>`${v} pers.`, set:setTeamSize },
                    { label:"Heures perdues / pers / sem", value:hoursPerWeek, min:1,  max:20,  fmt:(v:number)=>`${v}h`, set:setHoursPerWeek },
                    { label:"Taux horaire moyen", value:hourlyRate,   min:20, max:150, fmt:(v:number)=>`${v}€/h`, set:setHourlyRate },
                  ].map(s => (
                    <div key={s.label} style={{ marginBottom:"18px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                        <span style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:".08em" }}>
                          {s.label}
                        </span>
                        <span style={{ fontFamily:"var(--mono)", fontSize:"13px", color:profile!.color, fontWeight:700 }}>
                          {s.fmt(s.value)}
                        </span>
                      </div>
                      <input type="range" min={s.min} max={s.max} value={s.value}
                        onChange={e => s.set(Number(e.target.value))}
                        style={{ width:"100%", accentColor:profile!.color, cursor:"pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Droite : résultats animés ─────────────── */}
              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>

                {/* Heures */}
                <div style={{
                  background:"#0d1220",
                  border:`1px solid ${profile!.color}25`,
                  borderRadius:"10px", padding:"20px 22px",
                }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:profile!.color, letterSpacing:".2em", textTransform:"uppercase", marginBottom:"8px" }}>
                    Heures perdues / an
                  </p>
                  <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"28px", color:"white" }}>
                    {fmtNum(animHours)}
                    <span style={{ fontSize:"14px", color:profile!.color, marginLeft:"4px" }}>h</span>
                  </p>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.3)", marginTop:"4px" }}>
                    Soit {fmtNum(Math.round(animHours / 47))}h cette semaine
                  </p>
                </div>

                {/* Coût principal */}
                <div style={{
                  background:"linear-gradient(135deg,#1a0a0f,#0d0810)",
                  border:"1.5px solid rgba(255,77,109,.3)",
                  borderRadius:"10px", padding:"22px",
                  boxShadow:"0 0 24px rgba(255,77,109,.08)",
                }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"#ff4d6d", letterSpacing:".2em", textTransform:"uppercase", marginBottom:"10px" }}>
                    // Coût annuel de l&apos;inaction
                  </p>
                  <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"32px", color:"white", marginBottom:"6px" }}>
                    {fmtEur(animCost)}
                  </p>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"11px", color:"rgba(255,77,109,.6)" }}>
                    ≈ {fmtEur(Math.round(animCost / 12))} / mois gaspillés
                  </p>
                </div>

                {/* Solution */}
                <div style={{
                  background:"linear-gradient(135deg,#041210,#060f12)",
                  border:`1.5px solid ${profile!.color}30`,
                  borderRadius:"10px", padding:"20px",
                  boxShadow:`0 0 20px ${profile!.color}06`,
                }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:"9px", color:profile!.color, letterSpacing:".2em", textTransform:"uppercase", marginBottom:"12px" }}>
                    // Avec l&apos;automatisation
                  </p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"14px" }}>
                    <div>
                      <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.3)", marginBottom:"3px" }}>Économie / an</p>
                      <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"16px", color:profile!.color }}>
                        {fmtEur(animSaving)}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.3)", marginBottom:"3px" }}>ROI en</p>
                      <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"16px", color:"#4ade80" }}>
                        {roiMonths <= 1 ? "< 1 mois" : `${roiMonths} mois`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenBrief}
                    style={{
                      width:"100%", padding:"12px",
                      background:profile!.color, color:"#050810",
                      fontFamily:"var(--mono)", fontWeight:700, fontSize:"12px",
                      border:"none", borderRadius:"6px", cursor:"pointer",
                      letterSpacing:".04em",
                      boxShadow:`0 0 16px ${profile!.color}30`,
                    }}
                  >
                    Récupérer mes {fmtEur(animSaving)} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
