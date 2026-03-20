"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";

/* ══════════════════════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -1000, y: -1000 });
  const particles = useRef<{ x:number;y:number;vx:number;vy:number;size:number;opacity:number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Init particles */
    const count = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
    particles.current = Array.from({ length: count }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      (Math.random() - 0.5) * 0.25,
      size:    Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        /* Mouvement souris — répulsion douce */
        const dx   = p.x - mouse.current.x;
        const dy   = p.y - mouse.current.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          p.vx += (dx / dist) * 0.04;
          p.vy += (dy / dist) * 0.04;
        }

        /* Friction */
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x  += p.vx;
        p.y  += p.vy;

        /* Wrap */
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        /* Draw */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,200,${p.opacity})`;
        ctx.fill();
      });

      /* Draw connections */
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a  = particles.current[i];
          const b  = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - d / 90)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:   "absolute",
        inset:      0,
        width:      "100%",
        height:     "100%",
        pointerEvents: "none",
        zIndex:     0,
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════════════════════ */
const WORDS = ["Automatisez.", "Scalez.", "Dominez."];

function Typewriter() {
  const [wordIdx,  setWordIdx ] = useState(0);
  const [charIdx,  setCharIdx ] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [shown,    setShown   ] = useState("");

  useEffect(() => {
    const word  = WORDS[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= word.length) {
      setShown(word.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c + 1), 80);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx >= 0) {
      setShown(word.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c - 1), 45);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  return (
    <span style={{
      background:    "linear-gradient(90deg,#00ffc8,#00e5ff,#a78bfa,#00ffc8)",
      backgroundSize:"200% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor:  "transparent",
      backgroundClip: "text",
      animation:     "gradientShift 3s linear infinite",
    }}>
      {shown}
      <span style={{ animation:"blink .7s step-end infinite", WebkitTextFillColor:"#00ffc8" }}>|</span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section style={{
      minHeight:    "100vh",
      display:      "flex",
      alignItems:   "center",
      padding:      "120px 24px 80px",
      position:     "relative",
      overflow:     "hidden",
      background:   "#050810",
    }}>
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes heroFadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes glow {
          0%,100% { opacity:.5; }
          50%      { opacity:1; }
        }
        @keyframes blink {
          0%,49%  { opacity:1; }
          50%,100%{ opacity:0; }
        }
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-12px); }
        }
        @keyframes statsIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* Particules */}
      <ParticleCanvas />

      {/* Glow orbs */}
      <div style={{
        position:"absolute", top:"15%", right:"8%",
        width:"500px", height:"500px", borderRadius:"50%",
        background:"radial-gradient(circle,rgba(0,255,200,.07) 0%,transparent 70%)",
        pointerEvents:"none", zIndex:0,
        animation:"glow 4s ease-in-out infinite",
      }} />
      <div style={{
        position:"absolute", bottom:"10%", left:"-5%",
        width:"400px", height:"400px", borderRadius:"50%",
        background:"radial-gradient(circle,rgba(167,139,250,.06) 0%,transparent 70%)",
        pointerEvents:"none", zIndex:0,
        animation:"glow 5s ease-in-out 1s infinite",
      }} />

      {/* Contenu */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>

        {/* Badges */}
        <div style={{
          display:"flex", gap:"10px", flexWrap:"wrap",
          marginBottom:"32px", alignItems:"center",
          opacity: mounted ? 1 : 0,
          animation: mounted ? "heroFadeUp .7s ease forwards" : "none",
        }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:"6px",
            padding:"5px 14px", borderRadius:"20px",
            background:"rgba(0,255,200,.1)", border:"1px solid rgba(0,255,200,.2)",
            fontFamily:"'Courier New',monospace", fontSize:"11px", fontWeight:700,
            color:"#00ffc8", letterSpacing:".06em",
          }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#ff4d6d", animation:"livePulse 1.5s ease-in-out infinite" }} />
            Lab interactif · Testez en direct
          </span>
          <AvailabilityBadge />
        </div>

        {/* Headline */}
        <div style={{
          opacity:   mounted ? 1 : 0,
          animation: mounted ? "heroFadeUp .7s .15s ease forwards" : "none",
          animationFillMode: "both",
          marginBottom: "20px",
        }}>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight:800,
            fontSize:   "clamp(42px,7.5vw,96px)", lineHeight:1.0,
            color:      "white",
          }}>
            Votre business peut
          </h1>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight:800,
            fontSize:   "clamp(42px,7.5vw,96px)", lineHeight:1.05,
          }}>
            <Typewriter />
          </h1>
        </div>

        {/* Sous-titre */}
        <p style={{
          fontFamily:  "Arial,Helvetica,sans-serif",
          fontSize:    "clamp(15px,1.5vw,18px)",
          color:       "rgba(255,255,255,.6)",
          maxWidth:    "580px", lineHeight:1.75,
          marginBottom:"40px",
          opacity:     mounted ? 1 : 0,
          animation:   mounted ? "heroFadeUp .7s .3s ease forwards" : "none",
          animationFillMode:"both",
        }}>
          Je suis <strong style={{ color:"white" }}>Oussama</strong> — spécialiste IA et automatisation.
          Mon but n&apos;est pas de vous vendre du code.{" "}
          <strong style={{ color:"#00ffc8" }}>Mon but est de vous faire gagner du temps et de l&apos;argent.</strong>
        </p>

        {/* CTAs */}
        <div style={{
          display:"flex", gap:"14px", flexWrap:"wrap", alignItems:"center",
          marginBottom:"24px",
          opacity:     mounted ? 1 : 0,
          animation:   mounted ? "heroFadeUp .7s .45s ease forwards" : "none",
          animationFillMode:"both",
        }}>
          {/* CTA principal */}
          <a href="#roi" style={{
            padding:"14px 34px",
            background:"linear-gradient(135deg,#00ffc8,#00b4d8)",
            color:"#050810",
            fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:"14px",
            borderRadius:"8px", textDecoration:"none", letterSpacing:".04em",
            boxShadow:"0 0 30px rgba(0,255,200,.35)",
            transition:"all .25s",
            display:"inline-flex", alignItems:"center", gap:"8px",
          }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="0 0 50px rgba(0,255,200,.6)"; el.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.boxShadow="0 0 30px rgba(0,255,200,.35)"; el.style.transform="translateY(0)"; }}
          >
            💰 Calculer mon ROI gratuit
          </a>

          <a href="#lead-hunter" style={{
            padding:"12px 26px", background:"rgba(255,255,255,.05)",
            color:"rgba(255,255,255,.8)",
            fontFamily:"'Courier New',monospace", fontSize:"13px",
            border:"1px solid rgba(255,255,255,.15)", borderRadius:"8px",
            textDecoration:"none", transition:"all .25s",
          }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(0,255,200,.08)"; el.style.borderColor="rgba(0,255,200,.4)"; el.style.color="white"; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(255,255,255,.05)"; el.style.borderColor="rgba(255,255,255,.15)"; el.style.color="rgba(255,255,255,.8)"; }}
          >
            ⚡ Tester les outils
          </a>

          <a href="#cta" style={{
            padding:"12px 26px", background:"transparent",
            color:"rgba(255,255,255,.4)",
            fontFamily:"'Courier New',monospace", fontSize:"13px",
            border:"1px solid rgba(255,255,255,.08)", borderRadius:"8px",
            textDecoration:"none", transition:"all .25s",
          }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.2)"; el.style.color="rgba(255,255,255,.65)"; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,.08)"; el.style.color="rgba(255,255,255,.4)"; }}
          >
            🚀 Démarrer un projet
          </a>
        </div>

        {/* Ctrl+K hint */}
        <div style={{
          display:"flex", alignItems:"center", gap:"8px",
          marginBottom:"72px",
          opacity:     mounted ? 1 : 0,
          animation:   mounted ? "heroFadeUp .7s .55s ease forwards" : "none",
          animationFillMode:"both",
        }}>
          <span style={{ fontSize:"11px", opacity:.3 }}>💡</span>
          <p style={{ fontFamily:"'Courier New',monospace", fontSize:"11px", color:"rgba(255,255,255,.22)" }}>
            Navigation rapide :{" "}
            <kbd style={{ padding:"1px 7px", background:"rgba(0,229,255,.08)", border:"1px solid rgba(0,229,255,.2)", borderRadius:"4px", color:"rgba(0,229,255,.55)", fontSize:"11px" }}>
              Ctrl + K
            </kbd>
          </p>
        </div>

        {/* Stats card */}
        <div style={{
          display:"flex", gap:"0", flexWrap:"wrap",
          padding:"24px 28px",
          background:"rgba(255,255,255,.03)",
          border:"1px solid rgba(255,255,255,.07)",
          borderRadius:"14px",
          backdropFilter:"blur(12px)",
          opacity:     mounted ? 1 : 0,
          animation:   mounted ? "statsIn .8s .7s ease forwards" : "none",
          animationFillMode:"both",
        }}>
          {[
            { val:12000, suffix:"+", label:"Leads générés automatiquement" },
            { val:340,   suffix:"h", label:"Économisées / mois" },
            { val:98,    suffix:"%", label:"Satisfaction client" },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex:1, minWidth:"130px", textAlign:"center",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,.07)" : "none",
              padding:"0 20px",
            }}>
              <div style={{ fontFamily:"'Courier New',monospace", fontWeight:700, color:"#00ffc8", fontSize:"clamp(20px,2.5vw,30px)" }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </div>
              <p style={{ fontFamily:"Arial,sans-serif", fontSize:"12px", color:"rgba(255,255,255,.35)", marginTop:"4px", lineHeight:1.4 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:"absolute", bottom:"-60px", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
          opacity:.35,
          animation:"float 2.5s ease-in-out infinite",
        }}>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:"9px", color:"rgba(0,255,200,.7)", letterSpacing:".2em" }}>SCROLL</span>
          <div style={{ width:"1px", height:"32px", background:"linear-gradient(180deg,rgba(0,255,200,.6),transparent)" }} />
        </div>

      </div>
    </section>
  );
}
