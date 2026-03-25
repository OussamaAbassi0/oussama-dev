"use client";
import { useState, useEffect, useRef } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ── Viewport constants ─────────────────────────────────── */
const VW = 960, VH = 320;

interface PN { id:string; icon:string; label:string; sub:string; color:string; x:number; y:number }

const NODES: PN[] = [
  { id:"trigger", icon:"🎯", label:"Prospect",   sub:"Auto-détecté",  color:"#00ffc8", x:62,  y:100 },
  { id:"enrich",  icon:"🔬", label:"Enrichi",    sub:"Apollo · email",color:"#a78bfa", x:218, y:100 },
  { id:"score",   icon:"📊", label:"Score IA",   sub:"ICP 94/100",    color:"#f5a623", x:383, y:100 },
  { id:"email",   icon:"✉️", label:"Email IA",   sub:"1.2s · GPT-4o",color:"#00e5ff", x:550, y:100 },
  { id:"crm",     icon:"🗂", label:"HubSpot",    sub:"Deal créé",     color:"#4ade80", x:455, y:250 },
  { id:"slack",   icon:"💬", label:"Slack",      sub:"#commercial",   color:"#f59e0b", x:655, y:250 },
  { id:"deal",    icon:"🚀", label:"Deal actif", sub:"+1 lead ✓",     color:"#00ffc8", x:840, y:100 },
];
const nMap = Object.fromEntries(NODES.map(n => [n.id, n]));

const EDGES = [
  { from:"trigger",to:"enrich"  },
  { from:"enrich", to:"score"   },
  { from:"score",  to:"email"   },
  { from:"email",  to:"crm"     },
  { from:"email",  to:"slack"   },
  { from:"crm",    to:"deal"    },
  { from:"slack",  to:"deal"    },
];

const SEQ = [
  { id:"trigger", at:500,  feed:"→ Prospect détecté : Sophie Martin / Nexvia",    fc:"#00ffc8" },
  { id:"enrich",  at:1200, feed:"→ Apollo: email pro vérifié en 78ms",            fc:"#a78bfa" },
  { id:"score",   at:2000, feed:"→ GPT-4o: ICP 94/100 — seuil 80 atteint ✓",    fc:"#f5a623" },
  { id:"email",   at:2800, feed:"→ Email personnalisé généré en 1.2s",            fc:"#00e5ff" },
  { id:"crm",     at:3400, feed:"→ HubSpot: deal créé · pipeline Commercial",     fc:"#4ade80" },
  { id:"slack",   at:3600, feed:"→ Slack #commercial: 🔥 lead chaud notifié",    fc:"#f59e0b" },
  { id:"deal",    at:4300, feed:"✓ Terminé en 4.3s · 0 intervention humaine",    fc:"#00ffc8" },
];

const CYCLE = 7800;

/* ── Bezier S-curve between two nodes ───────────────────── */
function bz(a: PN, b: PN) {
  const dx = b.x - a.x;
  return `M ${a.x} ${a.y} C ${a.x + dx * 0.5} ${a.y} ${b.x - dx * 0.5} ${b.y} ${b.x} ${b.y}`;
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function AutomationLiveSection() {
  const ref     = useFadeIn<HTMLDivElement>();
  const feedRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const isRTL   = lang === "ar";

  const [active, setActive] = useState<Set<string>>(new Set());
  const [feed,   setFeed  ] = useState<Array<{ text:string; color:string }>>([]);
  const [leads,  setLeads ] = useState(0);
  const [hours,  setHours ] = useState(0);

  /* ── Auto-looping animation ───────────────────────────── */
  useEffect(() => {
    let alive = true;
    const ts: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      if (!alive) return;
      setActive(new Set());
      setFeed([]);

      SEQ.forEach(s => {
        ts.push(setTimeout(() => {
          if (!alive) return;
          setActive(prev => new Set([...prev, s.id]));
        }, s.at));
        ts.push(setTimeout(() => {
          if (!alive) return;
          setFeed(prev => [...prev, { text: s.feed, color: s.fc }]);
        }, s.at + 250));
      });

      ts.push(setTimeout(() => {
        if (!alive) return;
        setLeads(l => l + 1);
        setHours(h => Math.round((h + 0.3) * 10) / 10);
      }, SEQ[SEQ.length - 1].at + 900));

      ts.push(setTimeout(() => { if (alive) run(); }, CYCLE));
    };

    ts.push(setTimeout(run, 600));
    return () => { alive = false; ts.forEach(clearTimeout); };
  }, []);

  /* Auto-scroll feed */
  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [feed]);

  const edgeState = (e: typeof EDGES[0]) => {
    const s = active.has(e.from), t = active.has(e.to);
    if (s && t) return "done";
    if (s) return "flowing";
    return "idle";
  };

  /* ── i18n ─────────────────────────────────────────────── */
  const T = {
    label:   lang==="en" ? "// Live Automation Pipeline" : lang==="ar" ? "// خط الأتمتة المباشر" : lang==="es" ? "// Pipeline en Vivo" : lang==="nl" ? "// Live Pipeline" : "// Pipeline IA — Live",
    title:   lang==="en" ? "Real-Time Automation" : lang==="ar" ? "أتمتة في الوقت الحقيقي" : lang==="es" ? "Automatización en Tiempo Real" : lang==="nl" ? "Real-Time Automatisering" : "Automatisation",
    accent:  lang==="en" ? "Watch it work." : lang==="ar" ? "شاهد كيف يعمل." : lang==="es" ? "Míralo trabajar." : lang==="nl" ? "Zie het werken." : "Regardez ça tourner.",
    sub:     lang==="en" ? "Every 7s, a new prospect processed. Zero human actions." : lang==="ar" ? "كل 7 ثوان، prospect جديد معالج. صفر تدخل بشري." : lang==="es" ? "Cada 7s, un nuevo prospecto procesado. Cero acciones humanas." : lang==="nl" ? "Elke 7s een nieuwe prospect verwerkt. Nul menselijke acties." : "Toutes les 7s, un prospect traité automatiquement. Zéro action humaine.",
    live:    lang==="en" ? "LIVE · RUNNING" : lang==="ar" ? "مباشر · يعمل" : lang==="es" ? "EN VIVO" : lang==="nl" ? "LIVE · ACTIEF" : "LIVE · EN COURS",
    s1:      lang==="en" ? "Leads processed" : lang==="ar" ? "عملاء معالجون" : lang==="es" ? "Leads procesados" : lang==="nl" ? "Leads verwerkt" : "Leads traités",
    s2:      lang==="en" ? "Hours saved" : lang==="ar" ? "ساعات موفرة" : lang==="es" ? "Horas ahorradas" : lang==="nl" ? "Uren bespaard" : "Heures économisées",
    s3:      lang==="en" ? "Human actions" : lang==="ar" ? "إجراءات بشرية" : lang==="es" ? "Acciones humanas" : lang==="nl" ? "Menselijke acties" : "Actions humaines",
    tag:     lang==="en" ? "⚡ Real: 4.3s · Manual: 2h 40min" : lang==="ar" ? "⚡ حقيقي: 4.3s · يدوي: 2h 40min" : lang==="es" ? "⚡ Real: 4.3s · Manual: 2h 40min" : lang==="nl" ? "⚡ Echt: 4.3s · Handmatig: 2u 40" : "⚡ Temps réel : 4.3s · Manuel : 2h 40min",
    waiting: lang==="en" ? "Waiting for next cycle..." : lang==="ar" ? "في انتظار الدورة التالية..." : lang==="es" ? "Esperando el próximo ciclo..." : lang==="nl" ? "Wachten op volgende cyclus..." : "En attente du prochain cycle...",
  };

  return (
    <section id="automation" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <style>{`
        @keyframes nodePop {
          0%   { transform: translate(-50%,-50%) scale(1);    }
          35%  { transform: translate(-50%,-50%) scale(1.12); }
          100% { transform: translate(-50%,-50%) scale(1);    }
        }
        @keyframes liveBlip  { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes feedSlide { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes dealWin   {
          0%,100% { box-shadow:0 0 22px #00ffc860; }
          50%     { box-shadow:0 0 52px #00ffc8cc, 0 0 90px #00ffc830; }
        }
        @keyframes scanLine {
          0%   { top:0%; opacity:.8 }
          100% { top:100%; opacity:0 }
        }
        @media (max-width:820px) {
          .auto-pipeline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth:"1100px", margin:"0 auto", direction:isRTL?"rtl":"ltr" }}>

        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"36px", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <p className="section-label">{T.label}</p>
            <h2 className="section-title">
              {T.title}<br/>
              <span className="text-cyan">{T.accent}</span>
            </h2>
            <p style={{ fontFamily:"var(--mono)", fontSize:"13px", color:"var(--text-dim)", maxWidth:"420px", lineHeight:1.75 }}>
              {T.sub}
            </p>
          </div>

          {/* LIVE badge */}
          <div style={{
            display:"flex", alignItems:"center", gap:"8px",
            padding:"8px 18px",
            background:"rgba(255,77,109,.08)", border:"1px solid rgba(255,77,109,.3)",
            borderRadius:"20px", fontFamily:"var(--mono)", fontSize:"11px",
            color:"#ff4d6d", letterSpacing:".1em", alignSelf:"flex-start",
          }}>
            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#ff4d6d", boxShadow:"0 0 10px #ff4d6d", animation:"liveBlip 1.2s ease-in-out infinite" }} />
            {T.live}
          </div>
        </div>

        {/* ── Main grid ──────────────────────────────────── */}
        <div className="auto-pipeline-grid" style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:"20px", alignItems:"start" }}>

          {/* Pipeline canvas */}
          <div style={{ position:"relative", width:"100%", paddingBottom:`${(VH/VW*100).toFixed(2)}%` }}>
            <div style={{
              position:"absolute", inset:0,
              background:"rgba(5,8,16,.97)",
              borderRadius:"16px",
              border:"1px solid rgba(0,255,200,.1)",
              overflow:"hidden",
            }}>
              {/* Scan line effect */}
              <div style={{
                position:"absolute", left:0, right:0, height:"2px", pointerEvents:"none", zIndex:20,
                background:"linear-gradient(90deg,transparent,rgba(0,255,200,.15),transparent)",
                animation:"scanLine 3s linear infinite",
              }} />

              {/* SVG connections */}
              <svg
                viewBox={`0 0 ${VW} ${VH}`}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="glowF2">
                    <feGaussianBlur stdDeviation="3" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <pattern id="gridAuto" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(0,255,200,0.035)" strokeWidth="0.5"/>
                  </pattern>
                </defs>

                {/* Grid bg */}
                <rect width={VW} height={VH} fill="url(#gridAuto)" />

                {/* Edges */}
                {EDGES.map((edge, i) => {
                  const a = nMap[edge.from], b = nMap[edge.to];
                  const path = bz(a, b);
                  const es   = edgeState(edge);
                  return (
                    <g key={i}>
                      {/* Ghost */}
                      <path d={path} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="6 9" />
                      {/* Active line */}
                      {es !== "idle" && (
                        <path d={path} fill="none" stroke={a.color} strokeWidth="2.5" opacity="0.6" filter="url(#glowF2)" />
                      )}
                      {/* Flowing packet */}
                      {es === "flowing" && (
                        <circle r="7" fill={a.color} opacity="0.95" filter="url(#glowF2)">
                          <animateMotion dur="0.55s" repeatCount="indefinite" path={path} />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* HTML nodes */}
              {NODES.map(node => {
                const on     = active.has(node.id);
                const isDeal = node.id === "deal";
                return (
                  <div key={node.id} style={{
                    position:"absolute",
                    left:`${(node.x / VW) * 100}%`,
                    top: `${(node.y / VH) * 100}%`,
                    transform:"translate(-50%,-50%)",
                    zIndex:10,
                    animation: on ? "nodePop .5s ease forwards" : "none",
                  }}>
                    <div style={{
                      width:"86px",
                      background:"rgba(5,8,16,0.97)",
                      border:`2px solid ${on ? node.color : "rgba(255,255,255,0.07)"}`,
                      borderRadius:"12px",
                      padding:"10px 6px",
                      textAlign:"center",
                      boxShadow: on && isDeal
                        ? undefined
                        : on ? `0 0 18px ${node.color}55` : "none",
                      animation: on && isDeal ? "dealWin 1.8s ease-in-out infinite" : "none",
                      transition:"border-color .3s, box-shadow .3s",
                    }}>
                      <div style={{ fontSize:"18px", marginBottom:"4px", filter:on?`drop-shadow(0 0 5px ${node.color})`:"none", transition:"filter .3s" }}>
                        {on && isDeal ? "✅" : node.icon}
                      </div>
                      <div style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"9.5px", color:on?"white":"rgba(255,255,255,0.28)", marginBottom:"2px", transition:"color .3s" }}>
                        {node.label}
                      </div>
                      <div style={{ fontFamily:"var(--mono)", fontSize:"8px", color:on?node.color:"rgba(255,255,255,0.14)", lineHeight:1.4, transition:"color .3s" }}>
                        {node.sub}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Time tag */}
              <div style={{ position:"absolute", bottom:"8px", right:"12px", fontFamily:"var(--mono)", fontSize:"9px", color:"rgba(0,255,200,.22)", letterSpacing:".07em", pointerEvents:"none" }}>
                {T.tag}
              </div>
            </div>
          </div>

          {/* Live feed */}
          <div style={{
            background:"rgba(5,8,16,.97)",
            border:"1px solid rgba(0,255,200,.1)",
            borderRadius:"12px", overflow:"hidden",
            display:"flex", flexDirection:"column",
            height:"270px",
          }}>
            {/* Feed header */}
            <div style={{
              padding:"10px 14px", borderBottom:"1px solid rgba(0,255,200,.08)",
              display:"flex", alignItems:"center", gap:"8px",
              fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.3)",
            }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#ff4d6d", boxShadow:"0 0 6px #ff4d6d", animation:"liveBlip 1.2s ease-in-out infinite" }} />
              Terminal · Live Feed
            </div>

            {/* Events */}
            <div ref={feedRef} style={{
              flex:1, overflowY:"auto", padding:"10px 14px",
              display:"flex", flexDirection:"column", gap:"6px",
              scrollbarWidth:"none",
            }}>
              {feed.length === 0 ? (
                <p style={{ color:"rgba(255,255,255,.12)", fontFamily:"var(--mono)", fontSize:"10px", margin:"auto", textAlign:"center" }}>
                  {T.waiting}
                </p>
              ) : feed.map((item, i) => (
                <p key={i} style={{
                  fontFamily:"var(--mono)", fontSize:"10.5px", color:item.color,
                  margin:0, lineHeight:1.65,
                  animation:"feedSlide .3s ease",
                }}>
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats bar ──────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"14px", marginTop:"20px" }}>
          {[
            { label:T.s1, value:String(leads),              color:"var(--cyan)" },
            { label:T.s2, value:`${hours.toFixed(1)}h`,     color:"#a78bfa"     },
            { label:T.s3, value:"0",                        color:"#4ade80"     },
          ].map(stat => (
            <div key={stat.label} style={{
              padding:"16px 18px",
              background:"rgba(0,255,200,.03)", border:"1px solid rgba(0,255,200,.08)",
              borderRadius:"10px", textAlign:"center",
            }}>
              <div style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"clamp(22px,3vw,32px)", color:stat.color, marginBottom:"4px" }}>
                {stat.value}
              </div>
              <div style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(255,255,255,.3)", letterSpacing:".07em", textTransform:"uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
