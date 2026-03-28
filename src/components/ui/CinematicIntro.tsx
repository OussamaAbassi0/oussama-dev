"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   CINÉMATIQUE "THE AUTOMATION PIPELINE"
   4 actes — 7 secondes — 100% Canvas + CSS
   Ne se rejoue pas (sessionStorage)
══════════════════════════════════════════════════════════ */

const STORAGE_KEY = "oussama_cinematic_seen";
const TOTAL_DURATION = 7000; // ms

/* ── Types internes ──────────────────────────────────────── */
interface FallingEmail {
  x: number; y: number; vx: number; vy: number;
  rot: number; rotV: number; opacity: number; size: number; color: string;
}

interface Node {
  id: string; label: string; icon: string; color: string;
  x: number; y: number; visible: boolean; scale: number; glow: number;
}

interface Particle {
  x: number; y: number; t: number; speed: number;
  fromNode: string; toNode: string;
}

interface Counter {
  label: string; value: number; current: number; suffix: string; color: string;
}

/* ── Utilitaires ─────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn  = (t: number) => Math.pow(t, 3);

/* ── Nœuds du workflow ───────────────────────────────────── */
const NODES_DEF: Omit<Node, "visible" | "scale" | "glow">[] = [
  { id:"webhook", label:"Webhook",  icon:"~>", color:"#00ffc8", x:0.18, y:0.52 },
  { id:"ai",      label:"GPT-4o",   icon:"AI", color:"#a78bfa", x:0.38, y:0.35 },
  { id:"filter",  label:"Filter",   icon:"≡",  color:"#f5a623", x:0.38, y:0.68 },
  { id:"crm",     label:"CRM",      icon:"DB", color:"#00e5ff", x:0.58, y:0.35 },
  { id:"email",   label:"Email",    icon:"@",  color:"#ff4d6d", x:0.58, y:0.68 },
  { id:"slack",   label:"Slack",    icon:"#",  color:"#4ade80", x:0.78, y:0.52 },
];

const EDGES = [
  { from:"webhook", to:"ai"     },
  { from:"webhook", to:"filter" },
  { from:"ai",      to:"crm"    },
  { from:"filter",  to:"email"  },
  { from:"crm",     to:"slack"  },
  { from:"email",   to:"slack"  },
];

const COUNTERS_DEF: Counter[] = [
  { label:"Leads générés",   value:12000, current:0, suffix:"k+", color:"#00ffc8" },
  { label:"Heures récupérées", value:340, current:0, suffix:"h",  color:"#a78bfa" },
  { label:"Satisfaction",    value:98,   current:0, suffix:"%",   color:"#f5a623" },
];

/* ══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════════════ */
export default function CinematicIntro({ onDone }: { onDone: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const startTime   = useRef<number>(0);
  const rafRef      = useRef<number>(0);
  const emails      = useRef<FallingEmail[]>([]);
  const nodes       = useRef<Node[]>(NODES_DEF.map(n => ({ ...n, visible:false, scale:0, glow:0 })));
  const particles   = useRef<Particle[]>([]);
  const counters    = useRef<Counter[]>(COUNTERS_DEF.map(c => ({ ...c })));

  const [leaving,   setLeaving  ] = useState(false);
  const [phase,     setPhase    ] = useState<"chaos"|"flash"|"pipeline"|"result"|"exit">("chaos");
  const [subtitle,  setSubtitle ] = useState("");
  const [showSub,   setShowSub  ] = useState(false);
  const [showSkip,  setShowSkip ] = useState(true);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    cancelAnimationFrame(rafRef.current);
    setLeaving(true);
    setTimeout(onDone, 600);
  }, [onDone]);

  /* ── Init emails chaotiques ────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.offsetWidth;

    emails.current = Array.from({ length: 28 }, (_, i) => ({
      x:    Math.random() * W,
      y:    -80 - Math.random() * 400,
      vx:   (Math.random() - 0.5) * 2,
      vy:   2 + Math.random() * 3,
      rot:  Math.random() * 360,
      rotV: (Math.random() - 0.5) * 4,
      opacity: 0.5 + Math.random() * 0.5,
      size: 24 + Math.random() * 20,
      color: ["#ff4d6d","#f5a623","#ffffff"][i % 3],
    }));
  }, []);

  /* ── Boucle de rendu principale ────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    startTime.current = performance.now();

    const getNodePos = (id: string) => {
      const nd = nodes.current.find(n => n.id === id);
      if (!nd) return { x:0, y:0 };
      return { x: nd.x * canvas.width, y: nd.y * canvas.height };
    };

    const draw = (now: number) => {
      const elapsed = now - startTime.current;
      const t = elapsed / TOTAL_DURATION; // 0→1 sur toute la durée

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Fond ──────────────────────────────────────────── */
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* ── Grid subtile ──────────────────────────────────── */
      ctx.strokeStyle = "rgba(0,255,200,0.04)";
      ctx.lineWidth   = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      /* ════════════════════════════════════════════════════
         ACTE 1 : CHAOS (0→1.5s)
      ════════════════════════════════════════════════════ */
      if (elapsed < 2000) {
        const act1 = Math.min(elapsed / 1500, 1);

        /* Emails qui tombent */
        emails.current.forEach(em => {
          em.y   += em.vy;
          em.x   += em.vx;
          em.rot += em.rotV;
          if (em.y > canvas.height + 80) em.y = -80;

          ctx.save();
          ctx.translate(em.x, em.y);
          ctx.rotate((em.rot * Math.PI) / 180);
          ctx.globalAlpha = em.opacity * act1;
          // Draw envelope shape
          const hw = em.size * 0.6, hh = em.size * 0.4;
          ctx.strokeStyle = em.color;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-hw / 2, -hh / 2, hw, hh);
          ctx.beginPath();
          ctx.moveTo(-hw / 2, -hh / 2);
          ctx.lineTo(0, hh * 0.1);
          ctx.lineTo(hw / 2, -hh / 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.restore();
        });

        /* Alertes rouges clignotantes */
        if (elapsed > 400) {
          const alerts = ["[!] 247 emails non lus", "[●] 3h perdues aujourd'hui", "[x] Leads non suivis: 89"];
          alerts.forEach((txt, i) => {
            const blink = Math.sin((elapsed / 300) + i) > 0;
            ctx.globalAlpha = blink ? 0.9 * act1 : 0.3 * act1;
            ctx.fillStyle   = "#ff4d6d";
            ctx.font        = "bold 14px 'Courier New', monospace";
            ctx.fillText(txt, 30, 80 + i * 36);
            ctx.globalAlpha = 1;
          });
        }

        /* Phrase acte 1 */
        if (elapsed > 800) {
          const ta = Math.min((elapsed - 800) / 400, 1);
          ctx.globalAlpha = ta * act1;
          ctx.font        = `bold ${Math.round(lerp(16, 22, ta))}px Arial, sans-serif`;
          ctx.fillStyle   = "rgba(255,255,255,0.8)";
          ctx.textAlign   = "center";
          ctx.fillText("Chaque jour, votre équipe perd des heures.", canvas.width / 2, canvas.height * 0.82);
          ctx.fillText("Des tâches répétitives. Sans fin.", canvas.width / 2, canvas.height * 0.82 + 32);
          ctx.textAlign   = "left";
          ctx.globalAlpha = 1;
        }
      }

      /* ════════════════════════════════════════════════════
         ACTE 2 : FLASH CYAN (1.5s→2.2s)
      ════════════════════════════════════════════════════ */
      if (elapsed >= 1400 && elapsed < 2400) {
        const ft   = (elapsed - 1400) / 800;
        const alpha = ft < 0.4 ? ft / 0.4 : 1 - (ft - 0.4) / 0.6;

        /* Flash radial */
        const grad = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.8
        );
        grad.addColorStop(0,   `rgba(0,255,200,${0.9 * alpha})`);
        grad.addColorStop(0.3, `rgba(0,229,255,${0.4 * alpha})`);
        grad.addColorStop(1,   `rgba(0,0,0,0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Texte flash */
        if (ft > 0.2) {
          const ta = Math.min((ft - 0.2) / 0.3, 1);
          ctx.globalAlpha = ta;
          ctx.font        = `900 ${Math.round(lerp(40, 56, easeOut(ta)))}px 'Syne', Arial Black, sans-serif`;
          ctx.fillStyle   = "#050810";
          ctx.textAlign   = "center";
          ctx.fillText("Et si tout ça était automatisé ?", canvas.width / 2, canvas.height / 2 + 10);
          ctx.textAlign   = "left";
          ctx.globalAlpha = 1;
        }
      }

      /* ════════════════════════════════════════════════════
         ACTE 3 : PIPELINE (2s→5.5s)
      ════════════════════════════════════════════════════ */
      if (elapsed >= 2000) {
        const act3Start = 2000;
        const act3t     = Math.min((elapsed - act3Start) / 3500, 1);

        /* Apparition progressive des nœuds */
        nodes.current.forEach((nd, i) => {
          const appear = Math.max(0, Math.min(1, (act3t - i * 0.12) / 0.15));
          nd.scale   = easeOut(appear);
          nd.glow    = appear;
          nd.visible = appear > 0;
        });

        /* Connexions / edges */
        EDGES.forEach(edge => {
          const from = nodes.current.find(n => n.id === edge.from);
          const to   = nodes.current.find(n => n.id === edge.to);
          if (!from || !to || from.scale < 0.5 || to.scale < 0.5) return;

          const fpos = { x: from.x * canvas.width, y: from.y * canvas.height };
          const tpos = { x: to.x   * canvas.width, y: to.y   * canvas.height };

          /* Ligne */
          const lineAlpha = Math.min(from.scale, to.scale);
          ctx.beginPath();
          ctx.moveTo(fpos.x, fpos.y);
          const cpx = (fpos.x + tpos.x) / 2;
          const cpy = Math.min(fpos.y, tpos.y) - 20;
          ctx.quadraticCurveTo(cpx, cpy, tpos.x, tpos.y);
          ctx.strokeStyle = `rgba(0,229,255,${0.25 * lineAlpha})`;
          ctx.lineWidth   = 1.5;
          ctx.stroke();
        });

        /* Spawn de particules */
        if (act3t > 0.3 && elapsed % 60 < 20) {
          const readyEdges = EDGES.filter(e => {
            const f = nodes.current.find(n => n.id === e.from);
            const t = nodes.current.find(n => n.id === e.to);
            return f && t && f.scale > 0.7 && t.scale > 0.7;
          });
          if (readyEdges.length > 0) {
            const edge = readyEdges[Math.floor(Math.random() * readyEdges.length)];
            particles.current.push({ x:0, y:0, t:0, speed:0.6 + Math.random() * 0.8, fromNode:edge.from, toNode:edge.to });
          }
        }

        /* Dessiner + déplacer particules */
        particles.current = particles.current.filter(p => p.t < 1);
        particles.current.forEach(p => {
          p.t += p.speed * 0.012;
          const fpos = getNodePos(p.fromNode);
          const tpos = getNodePos(p.toNode);
          const et   = easeOut(p.t);
          const px   = lerp(fpos.x, tpos.x, et);
          const py   = lerp(fpos.y, tpos.y, et);

          const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
          grad.addColorStop(0, "rgba(0,255,200,0.9)");
          grad.addColorStop(1, "rgba(0,255,200,0)");
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        /* Dessiner les nœuds */
        nodes.current.forEach(nd => {
          if (!nd.visible) return;
          const nx = nd.x * canvas.width;
          const ny = nd.y * canvas.height;
          const r  = 38 * nd.scale;

          /* Glow */
          if (nd.glow > 0.3) {
            const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 2.5);
            g.addColorStop(0, `${nd.color}30`);
            g.addColorStop(1, "transparent");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(nx, ny, r * 2.5, 0, Math.PI * 2); ctx.fill();
          }

          /* Cercle fond */
          ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2);
          ctx.fillStyle = "#0d1220";
          ctx.fill();
          ctx.strokeStyle = nd.color;
          ctx.lineWidth   = 2 * nd.scale;
          ctx.stroke();

          /* Icône */
          ctx.font        = `${Math.round(20 * nd.scale)}px serif`;
          ctx.textAlign   = "center";
          ctx.textBaseline= "middle";
          ctx.globalAlpha = nd.scale;
          ctx.fillText(nd.icon, nx, ny);
          ctx.globalAlpha = 1;

          /* Label */
          ctx.font         = `bold ${Math.round(11 * nd.scale)}px 'Courier New', monospace`;
          ctx.fillStyle    = nd.color;
          ctx.globalAlpha  = nd.scale;
          ctx.fillText(nd.label, nx, ny + r + 14 * nd.scale);
          ctx.globalAlpha  = 1;
          ctx.textAlign    = "left";
          ctx.textBaseline = "alphabetic";
        });
      }

      /* ════════════════════════════════════════════════════
         ACTE 4 : RÉSULTATS + PHRASE FINALE (5s→7s)
      ════════════════════════════════════════════════════ */
      if (elapsed >= 5000) {
        const act4t = Math.min((elapsed - 5000) / 2000, 1);

        /* Overlay sombre graduel */
        ctx.fillStyle = `rgba(5,8,16,${0.7 * act4t})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Compteurs */
        counters.current.forEach((c, i) => {
          const delay  = i * 0.15;
          const ct     = Math.max(0, Math.min(1, (act4t - delay) / 0.5));
          c.current    = lerp(0, c.value, easeOut(ct));

          const x = canvas.width * (0.2 + i * 0.3);
          const y = canvas.height * 0.62;

          /* Card fond */
          const cardW = 160, cardH = 80;
          ctx.globalAlpha = easeOut(ct);
          ctx.fillStyle   = "rgba(255,255,255,0.04)";
          ctx.strokeStyle = `${c.color}40`;
          ctx.lineWidth   = 1;
          const r2 = 10;
          ctx.beginPath();
          ctx.roundRect(x - cardW/2, y - cardH/2, cardW, cardH, r2);
          ctx.fill();
          ctx.stroke();

          /* Valeur */
          ctx.font      = `900 32px 'Courier New', monospace`;
          ctx.fillStyle = c.color;
          ctx.textAlign = "center";
          const display = c.suffix === "k+" ? `${Math.floor(c.current / 1000)}k+` : `${Math.floor(c.current)}${c.suffix}`;
          ctx.fillText(display, x, y + 8);

          /* Label */
          ctx.font      = `12px Arial, sans-serif`;
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fillText(c.label, x, y + 30);
          ctx.textAlign = "left";
          ctx.globalAlpha = 1;
        });

        /* Phrase finale */
        if (act4t > 0.5) {
          const ft = Math.min((act4t - 0.5) / 0.4, 1);
          ctx.globalAlpha = easeOut(ft);
          ctx.font        = `900 clamp(20px,3vw,34px) 'Syne', Arial Black, sans-serif`;
          ctx.fillStyle   = "white";
          ctx.textAlign   = "center";
          ctx.fillText("C'est ce qu'Oussama construit pour vous.", canvas.width / 2, canvas.height * 0.85);
          ctx.textAlign   = "left";
          ctx.globalAlpha = 1;
        }
      }

      /* ════════════════════════════════════════════════════
         FIN automatique
      ════════════════════════════════════════════════════ */
      if (elapsed >= TOTAL_DURATION) {
        dismiss();
        return;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [dismiss]);

  /* ── Changements de phase pour le subtitle ─────────────── */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => { setPhase("chaos");    setSubtitle(""); setShowSub(false); }, 0));
    timers.push(setTimeout(() => { setPhase("flash");    setShowSub(false); }, 1400));
    timers.push(setTimeout(() => { setPhase("pipeline"); setShowSub(false); }, 2200));
    timers.push(setTimeout(() => { setPhase("result");   setShowSub(false); }, 5000));
    timers.push(setTimeout(() => { setShowSkip(false); }, 5500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @keyframes cinematicFadeOut {
          from { opacity:1; }
          to   { opacity:0; pointer-events:none; }
        }
        @keyframes skipPulse {
          0%,100% { opacity:.6; }
          50%      { opacity:1; }
        }
        @keyframes phaseIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9998,
        background: "#050810",
        animation:  leaving ? "cinematicFadeOut .6s ease forwards" : "none",
      }}>
        {/* Canvas principal */}
        <canvas
          ref={canvasRef}
          style={{ width:"100%", height:"100%", display:"block" }}
        />

        {/* Bouton Passer */}
        {showSkip && (
          <button
            onClick={dismiss}
            style={{
              position:      "fixed",
              top:           "24px",
              right:         "24px",
              zIndex:        9999,
              background:    "rgba(255,255,255,.08)",
              border:        "1px solid rgba(255,255,255,.15)",
              borderRadius:  "20px",
              padding:       "8px 18px",
              fontFamily:    "'Courier New', monospace",
              fontSize:      "12px",
              color:         "rgba(255,255,255,.6)",
              cursor:        "pointer",
              animation:     "skipPulse 2s ease-in-out infinite",
              transition:    "background .2s, color .2s",
              letterSpacing: ".06em",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.15)"; (e.currentTarget as HTMLElement).style.color="white"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.08)"; (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.6)"; }}
          >
            Passer →
          </button>
        )}

        {/* Indicateur de progression */}
        <div style={{
          position:   "fixed",
          bottom:     "24px",
          left:       "50%",
          transform:  "translateX(-50%)",
          zIndex:     9999,
          width:      "160px",
          height:     "2px",
          background: "rgba(255,255,255,.1)",
          borderRadius:"99px",
          overflow:   "hidden",
        }}>
          <div style={{
            height:     "100%",
            background: "linear-gradient(90deg,#00ffc8,#00e5ff)",
            borderRadius:"99px",
            animation:  `cinematicProgress ${TOTAL_DURATION}ms linear forwards`,
            boxShadow:  "0 0 6px rgba(0,255,200,.6)",
          }} />
        </div>

        <style>{`
          @keyframes cinematicProgress {
            from { width:0%; }
            to   { width:100%; }
          }
        `}</style>
      </div>
    </>
  );
}
