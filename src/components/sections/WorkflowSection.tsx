"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */
interface NodeDef {
  id:    string;
  icon:  string;
  label: string;
  sub:   string;
  color: string;
  x:     number; // position initiale %
  y:     number;
}
interface Connection { from: string; to: string; }

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const NODES: NodeDef[] = [
  { id: "webhook", icon: "⚡", label: "Webhook",   sub: "Trigger n8n",       color: "#00ffc8", x: 4,  y: 25 },
  { id: "openai",  icon: "🧠", label: "OpenAI",    sub: "Analyse & génère",  color: "#a78bfa", x: 30, y: 6  },
  { id: "filter",  icon: "🔍", label: "Filter",    sub: "Score ICP ≥ 80",    color: "#f5a623", x: 30, y: 50 },
  { id: "gmail",   icon: "📧", label: "Gmail",     sub: "Envoi automatique", color: "#ff4d6d", x: 62, y: 28 },
];

/* Étapes guidées une par une */
const GUIDED_STEPS: { from: string; to: string; hint: string }[] = [
  { from: "webhook", to: "openai",  hint: "1 / 4 — Connectez Webhook → OpenAI" },
  { from: "webhook", to: "filter",  hint: "2 / 4 — Connectez Webhook → Filter" },
  { from: "openai",  to: "gmail",   hint: "3 / 4 — Connectez OpenAI → Gmail"  },
  { from: "filter",  to: "gmail",   hint: "4 / 4 — Connectez Filter → Gmail"  },
];

const RUN_STEPS = [
  { nodeId: "webhook", log: "→ Webhook déclenché — payload reçu de LinkedIn..." },
  { nodeId: "openai",  log: "→ OpenAI GPT-4o : analyse du profil & génération email..." },
  { nodeId: "filter",  log: "→ Filter : score ICP calculé à 94/100 ✓" },
  { nodeId: "gmail",   log: "→ Gmail : envoi vers sophie.martin@nexvia.fr..." },
];

const EMAIL_LINES: { text: string; color: string }[] = [
  { text: "// EMAIL GÉNÉRÉ PAR IA — 2.3s",           color: "#00ffc8" },
  { text: "",                                          color: "" },
  { text: "OBJET : Nexvia — 18h/sem économisées",     color: "white"   },
  { text: "",                                          color: "" },
  { text: "Bonjour Sophie,",                           color: "#c9d8e8" },
  { text: "",                                          color: "" },
  { text: "J'ai analysé votre offre SDR.",             color: "#c9d8e8" },
  { text: "Combien d'heures qualifiez-vous des leads", color: "#c9d8e8" },
  { text: "manuellement chaque semaine ?",             color: "#c9d8e8" },
  { text: "",                                          color: "" },
  { text: "J'ai automatisé ce process chez",          color: "#c9d8e8" },
  { text: "un concurrent direct de Nexvia.",           color: "#c9d8e8" },
  { text: "+340 leads · 0 CDI supplémentaire.",        color: "#00ffc8" },
  { text: "",                                          color: "" },
  { text: "20 minutes cette semaine ?",               color: "white"   },
  { text: "",                                          color: "" },
  { text: "✓ Prêt à envoyer",                         color: "#00ffc8" },
];

/* ══════════════════════════════════════════════════════════
   SVG CONNECTIONS
══════════════════════════════════════════════════════════ */
function ConnectionLines({
  connections, activeNode, canvasRef, nodePositions, guidedFrom, guidedTo,
}: {
  connections:   Connection[];
  activeNode:    string | null;
  canvasRef:     React.RefObject<HTMLDivElement | null>;
  nodePositions: Record<string, { cx: number; cy: number }>;
  guidedFrom:    string;
  guidedTo:      string;
}) {
  if (!canvasRef.current || Object.keys(nodePositions).length < NODES.length) return null;

  /* Toutes les connexions à afficher : établies + fantômes restants */
  const ghosts = GUIDED_STEPS.filter(
    s => !connections.some(c => c.from === s.from && c.to === s.to)
  );

  const bezier = (from: { cx: number; cy: number }, to: { cx: number; cy: number }) => {
    const dx = to.cx - from.cx;
    return `M ${from.cx} ${from.cy} C ${from.cx + dx * 0.45} ${from.cy}, ${from.cx + dx * 0.55} ${to.cy}, ${to.cx} ${to.cy}`;
  };

  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Fantômes */}
      {ghosts.map((g, i) => {
        const f = nodePositions[g.from], t = nodePositions[g.to];
        if (!f || !t) return null;
        const isGuided = g.from === guidedFrom && g.to === guidedTo;
        return (
          <path key={`gh${i}`} d={bezier(f, t)} fill="none"
            stroke={isGuided ? "rgba(0,255,200,0.22)" : "rgba(255,255,255,0.05)"}
            strokeWidth={isGuided ? 1.5 : 1} strokeDasharray="4 6" />
        );
      })}

      {/* Connexions établies */}
      {connections.map((c, i) => {
        const f = nodePositions[c.from], t = nodePositions[c.to];
        if (!f || !t) return null;
        const path    = bezier(f, t);
        const flowing = activeNode === c.to;
        return (
          <g key={`cn${i}`}>
            <path d={path} fill="none" stroke="rgba(0,255,200,0.55)" strokeWidth="2" />
            {flowing && (
              <circle r="5" fill="#00ffc8" filter="url(#glow2)">
                <animateMotion dur="0.65s" repeatCount="indefinite" path={path} />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   DRAGGABLE NODE
══════════════════════════════════════════════════════════ */
function DraggableNode({
  node, isSelected, isConnected, isActive, isDone,
  isGuidedSource, isGuidedTarget,
  onSelect, onPositionChange, canvasRef,
}: {
  node:            NodeDef;
  isSelected:      boolean;
  isConnected:     boolean;
  isActive:        boolean;
  isDone:          boolean;
  isGuidedSource:  boolean;
  isGuidedTarget:  boolean;
  onSelect:        (id: string) => void;
  onPositionChange:(id: string, cx: number, cy: number) => void;
  canvasRef:       React.RefObject<HTMLDivElement | null>;
}) {
  const nodeRef    = useRef<HTMLDivElement>(null);
  const dragging   = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos   = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: node.x, y: node.y });

  const notifyCenter = useCallback(() => {
    const canvas = canvasRef.current;
    const el     = nodeRef.current;
    if (!canvas || !el) return;
    const cr = canvas.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    onPositionChange(node.id, er.left + er.width / 2 - cr.left, er.top + er.height / 2 - cr.top);
  }, [canvasRef, node.id, onPositionChange]);

  useEffect(() => { notifyCenter(); }, [pos, notifyCenter]);

  /* Recalcule sur resize */
  useEffect(() => {
    window.addEventListener("resize", notifyCenter);
    return () => window.removeEventListener("resize", notifyCenter);
  }, [notifyCenter]);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current   = true;
    startMouse.current = { x: e.clientX, y: e.clientY };
    startPos.current   = { ...pos };
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current || !canvasRef.current) return;
      const cr = canvasRef.current.getBoundingClientRect();
      const nx = Math.max(0, Math.min(82, startPos.current.x + ((ev.clientX - startMouse.current.x) / cr.width)  * 100));
      const ny = Math.max(0, Math.min(72, startPos.current.y + ((ev.clientY - startMouse.current.y) / cr.height) * 100));
      setPos({ x: nx, y: ny });
    };
    const onUp = () => { dragging.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  };

  const highlighted = isGuidedSource || isGuidedTarget;
  const borderColor = isActive   ? node.color
    : isDone         ? "rgba(0,255,200,0.6)"
    : isSelected     ? "rgba(0,255,200,0.9)"
    : highlighted    ? `${node.color}90`
    : isConnected    ? `${node.color}50`
    : "rgba(255,255,255,0.08)";

  const shadow = isActive    ? `0 0 24px ${node.color}90`
    : isSelected  ? "0 0 16px rgba(0,255,200,0.5)"
    : highlighted ? `0 0 14px ${node.color}55`
    : isDone      ? "0 0 10px rgba(0,255,200,0.3)"
    : "none";

  const portAnim  = highlighted && !isConnected ? "portPulse 1.2s ease-in-out infinite" : "none";

  return (
    <div
      ref={nodeRef}
      data-node="true"
      onMouseDown={onMouseDown}
      onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
      style={{
        position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
        width: "110px", cursor: "grab", userSelect: "none",
        zIndex: isSelected || isActive ? 10 : 1,
      }}
    >
      <div style={{
        background: "var(--bg3)", border: `1.5px solid ${borderColor}`,
        borderRadius: "10px", padding: "12px 10px", textAlign: "center",
        boxShadow: shadow, transition: "all 0.3s",
        animation: isActive ? "nodeActivePulse 0.7s ease-in-out infinite"
          : highlighted && !isConnected ? "nodeHighlight 1.5s ease-in-out infinite" : "none",
      }}>
        <div style={{ fontSize: "22px", marginBottom: "5px", filter: isActive ? `drop-shadow(0 0 6px ${node.color})` : "none", transition: "filter 0.3s" }}>
          {isDone ? "✅" : isActive ? "⚡" : node.icon}
        </div>
        <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "11px", color: isActive || isDone ? "white" : highlighted ? node.color : isConnected ? "var(--text)" : "var(--text-dim)", marginBottom: "2px", transition: "color 0.3s" }}>
          {node.label}
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: isActive ? node.color : "var(--text-dim)", lineHeight: 1.3, transition: "color 0.3s" }}>
          {node.sub}
        </div>
        {isSelected && !isActive && (
          <div style={{ position: "absolute", top: "-8px", right: "-8px", width: "16px", height: "16px", borderRadius: "50%", background: "var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "var(--bg)" }}>●</div>
        )}
      </div>

      {/* Ports gauche + droit */}
      {(["left", "right"] as const).map(side => (
        <div key={side} style={{
          position: "absolute",
          [side === "left" ? "left" : "right"]: "-7px",
          top: "50%", transform: "translateY(-50%)",
          width: "13px", height: "13px", borderRadius: "50%",
          background: isConnected ? node.color : highlighted ? `${node.color}60` : "var(--bg3)",
          border: `2px solid ${isConnected ? node.color : highlighted ? node.color : "rgba(255,255,255,0.15)"}`,
          boxShadow: isConnected ? `0 0 8px ${node.color}` : highlighted ? `0 0 6px ${node.color}` : "none",
          transition: "all 0.3s",
          animation: portAnim,
          zIndex: 2,
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TERMINAL — sans scrollIntoView
══════════════════════════════════════════════════════════ */
function TerminalOutput({ lines, emailLines }: { lines: string[]; emailLines: { text: string; color: string }[] }) {
  const boxRef = useRef<HTMLDivElement>(null);

  /* Scroll INTERNE au terminal uniquement — jamais la page */
  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, emailLines]);

  return (
    <div ref={boxRef} className="glass" style={{
      padding: "18px 20px", height: "380px", overflowY: "auto",
      fontFamily: "var(--mono)", fontSize: "12px",
      display: "flex", flexDirection: "column", gap: "4px",
      scrollbarWidth: "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid rgba(0,255,200,0.1)" }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: lines.length > 0 ? "var(--red)" : "rgba(255,255,255,0.15)", display: "inline-block", animation: lines.length > 0 ? "livePulse 1.5s ease infinite" : "none" }} />
        <span style={{ color: "var(--text-dim)", fontSize: "11px" }}>Terminal — n8n Workflow</span>
      </div>

      {lines.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "11px", margin: "auto", textAlign: "center" }}>
          En attente du lancement...
        </p>
      ) : (
        lines.map((l, i) => (
          <p key={i} style={{ color: l.startsWith("✓") ? "var(--cyan)" : "var(--text-dim)", marginBottom: "2px", animation: "slideInLog 0.3s ease" }}>{l}</p>
        ))
      )}

      {emailLines.length > 0 && (
        <div style={{ marginTop: "14px", padding: "14px", background: "rgba(0,255,200,0.04)", border: "1px solid rgba(0,255,200,0.15)", borderRadius: "8px" }}>
          {emailLines.map((l, i) => (
            <p key={i} style={{ color: l.color || "var(--text-dim)", fontWeight: l.color === "white" ? 700 : 400, marginBottom: "2px", animation: "slideInLog 0.3s ease" }}>
              {l.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function WorkflowSection() {
  const sectionRef  = useFadeIn<HTMLDivElement>();
  const canvasRef   = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const [selected,      setSelected     ] = useState<string | null>(null);
  const [connections,   setConnections  ] = useState<Connection[]>([]);
  const [nodePositions, setNodePositions] = useState<Record<string, { cx: number; cy: number }>>({});
  const [phase,         setPhase        ] = useState<"build" | "running" | "done">("build");
  const [activeNode,    setActiveNode   ] = useState<string | null>(null);
  const [termLines,     setTermLines    ] = useState<string[]>([]);
  const [emailLines,    setEmailLines   ] = useState<{ text: string; color: string }[]>([]);

  /* Étape guidée courante */
  const currentStepIdx = connections.filter(c =>
    GUIDED_STEPS.some(s => s.from === c.from && s.to === c.to)
  ).length;
  const currentStep    = GUIDED_STEPS[currentStepIdx] ?? null;
  const allConnected   = currentStepIdx >= GUIDED_STEPS.length;
  const connectedIds   = new Set(connections.flatMap(c => [c.from, c.to]));

  const handlePositionChange = useCallback((id: string, cx: number, cy: number) => {
    setNodePositions(prev => ({ ...prev, [id]: { cx, cy } }));
  }, []);

  /* ── Click-to-connect guidé ──────────────────────────── */
  const handleNodeSelect = (id: string) => {
    if (phase !== "build") return;

    if (!currentStep) return; // tout connecté

    if (!selected) {
      /* Accepte uniquement la source guidée ou n'importe quel nœud (pour flexibilité) */
      setSelected(id);
      return;
    }
    if (selected === id) { setSelected(null); return; }

    /* Crée la connexion si elle correspond à une étape requise (dans n'importe quel sens) */
    const pair = GUIDED_STEPS.find(
      s => (s.from === selected && s.to === id) || (s.from === id && s.to === selected)
    );
    const alreadyDone = connections.some(
      c => (c.from === selected && c.to === id) || (c.from === id && c.to === selected)
    );

    if (pair && !alreadyDone) {
      setConnections(prev => [...prev, { from: pair.from, to: pair.to }]);
    }
    setSelected(null);
  };

  /* ── Lancer le workflow (sans aucun scroll page) ─────── */
  const launch = async () => {
    if (!allConnected || phase !== "build") return;
    setPhase("running");
    setTermLines([]);
    setEmailLines([]);

    for (const step of RUN_STEPS) {
      setActiveNode(step.nodeId);
      await new Promise(r => setTimeout(r, 300));
      setTermLines(prev => [...prev, step.log]);
      await new Promise(r => setTimeout(r, 1100));
    }
    setActiveNode(null);

    /* Affiche l'email ligne par ligne avec délai progressif */
    for (let i = 0; i < EMAIL_LINES.length; i++) {
      await new Promise(r => setTimeout(r, 180));
      setEmailLines(prev => [...prev, EMAIL_LINES[i]]);
    }

    setTermLines(prev => [...prev, "✓ Workflow terminé — email envoyé avec succès"]);
    setPhase("done");
  };

  const reset = () => {
    setConnections([]); setSelected(null); setPhase("build");
    setActiveNode(null); setTermLines([]); setEmailLines([]);
  };

  /* ── Hint texte ──────────────────────────────────────── */
  const hintText = allConnected
    ? "✅ Pipeline complet — lancez le workflow !"
    : selected
    ? `🔗 Cliquez sur "${NODES.find(n => n.id === (currentStep?.from === selected ? currentStep?.to : currentStep?.from))?.label ?? "un nœud"}" pour connecter`
    : currentStep
    ? currentStep.hint
    : "";

  const hintColor = allConnected ? "var(--cyan)" : "var(--amber)";
  const hintBg    = allConnected ? "rgba(0,255,200,0.1)" : "rgba(245,166,35,0.08)";
  const hintBorder= allConnected ? "rgba(0,255,200,0.3)" : "rgba(245,166,35,0.2)";

  return (
    <section id="workflow" style={{ padding: "100px 24px" }}>
      <style>{`
        @keyframes nodeActivePulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }
        @keyframes nodeHighlight {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.75; }
        }
        @keyframes portPulse {
          0%,100% { transform: translateY(-50%) scale(1);   opacity: 1; }
          50%      { transform: translateY(-50%) scale(1.5); opacity: 0.7; }
        }
        @keyframes slideInLog {
          from { opacity:0; transform:translateY(4px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 14px rgba(0,255,200,0.3); }
          50%      { box-shadow: 0 0 28px rgba(0,255,200,0.65); }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={sectionRef} className="fade-in">

        {/* Header */}
        <p className="section-label">{t.lab.workflowLabel}</p>
        <h2 className="section-title">
          {t.lab.workflowTitle}<br /><span className="text-cyan">Workflow</span>
        </h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "16px", maxWidth: "520px", lineHeight: 1.7 }}>
          {t.lab.workflowSub}
        </p>

        {/* Hint bar — FIXE, pas de scroll */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 16px", borderRadius: "20px", marginBottom: "16px",
          background: hintBg, border: `1px solid ${hintBorder}`,
          fontFamily: "var(--mono)", fontSize: "11px", color: hintColor,
          transition: "all 0.4s", minHeight: "34px",
        }}>
          {hintText}
        </div>

        {/* Progress pills */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
          {GUIDED_STEPS.map((s, i) => {
            const done    = connections.some(c => c.from === s.from && c.to === s.to);
            const current = i === currentStepIdx;
            return (
              <div key={i} style={{
                padding: "4px 10px", borderRadius: "20px",
                background: done ? "rgba(0,255,200,0.1)" : current ? "rgba(245,166,35,0.08)" : "transparent",
                border: `1px solid ${done ? "rgba(0,255,200,0.3)" : current ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.07)"}`,
                fontFamily: "var(--mono)", fontSize: "10px",
                color: done ? "var(--cyan)" : current ? "var(--amber)" : "rgba(255,255,255,0.2)",
                transition: "all 0.3s",
                animation: current && !done ? "nodeHighlight 2s ease-in-out infinite" : "none",
              }}>
                {done ? "✓" : current ? "●" : "○"}{" "}
                {NODES.find(n => n.id === s.from)?.label} → {NODES.find(n => n.id === s.to)?.label}
              </div>
            );
          })}
        </div>

        {/* Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* Canvas */}
          <div>
            <div
              ref={canvasRef}
              onClick={() => setSelected(null)}
              style={{
                position: "relative", height: "290px",
                background: "var(--bg3)", borderRadius: "12px",
                border: `1px solid ${phase === "running" ? "rgba(0,255,200,0.35)" : "rgba(0,255,200,0.1)"}`,
                overflow: "hidden",
                cursor: selected ? "crosshair" : "default",
                transition: "border-color 0.4s",
              }}
            >
              {/* Grille */}
              <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,255,200,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,200,0.03) 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />

              <ConnectionLines
                connections={connections} activeNode={activeNode}
                canvasRef={canvasRef} nodePositions={nodePositions}
                guidedFrom={currentStep?.from ?? ""} guidedTo={currentStep?.to ?? ""}
              />

              {NODES.map(node => (
                <DraggableNode
                  key={node.id} node={node}
                  isSelected={selected === node.id}
                  isConnected={connectedIds.has(node.id)}
                  isActive={activeNode === node.id}
                  isDone={phase === "done" && RUN_STEPS.some(s => s.nodeId === node.id)}
                  isGuidedSource={!allConnected && currentStep?.from === node.id}
                  isGuidedTarget={!allConnected && currentStep?.to   === node.id}
                  onSelect={handleNodeSelect}
                  onPositionChange={handlePositionChange}
                  canvasRef={canvasRef}
                />
              ))}

              <div style={{ position: "absolute", bottom: "8px", right: "12px", fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(0,255,200,0.2)", letterSpacing: "0.1em", pointerEvents: "none" }}>
                DRAG · CLICK TO CONNECT
              </div>
            </div>

            {/* Boutons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
              <button
                onClick={launch}
                disabled={!allConnected || phase === "running"}
                style={{
                  padding: "12px 24px",
                  background: allConnected && phase === "build" ? "var(--cyan)" : "rgba(0,255,200,0.12)",
                  color:      allConnected && phase === "build" ? "var(--bg)"   : "var(--text-dim)",
                  fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
                  border:     `1px solid ${allConnected ? "rgba(0,255,200,0.6)" : "rgba(0,255,200,0.1)"}`,
                  borderRadius: "6px",
                  cursor:     allConnected && phase === "build" ? "pointer" : "not-allowed",
                  transition: "all 0.3s",
                  animation:  allConnected && phase === "build" ? "glowPulse 2s ease-in-out infinite" : "none",
                }}
              >
                {phase === "running" ? (lang==="ar" ? "⏳ جاري التنفيذ..." : lang==="en" ? "⏳ Running..." : lang==="es" ? "⏳ Ejecutando..." : lang==="nl" ? "⏳ Uitvoeren..." : "⏳ Exécution...") : phase === "done" ? (lang==="ar" ? "✅ سير العمل مكتمل" : lang==="en" ? "✅ Workflow completed" : lang==="es" ? "✅ Workflow completado" : lang==="nl" ? "✅ Workflow voltooid" : "✅ Workflow complété") : (lang==="ar" ? "▶ تشغيل سير العمل" : lang==="en" ? "▶ Launch workflow" : lang==="es" ? "▶ Lanzar workflow" : lang==="nl" ? "▶ Workflow starten" : "▶ Lancer le workflow")}
              </button>

              {(connections.length > 0 || phase !== "build") && (
                <button onClick={reset} disabled={phase === "running"} style={{
                  padding: "10px 18px", background: "transparent",
                  color: "var(--text-dim)", border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "var(--mono)", fontSize: "12px", borderRadius: "6px",
                  cursor: phase === "running" ? "not-allowed" : "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,200,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"; }}
                >↺ Reset</button>
              )}
            </div>
          </div>

          {/* Terminal — scroll interne uniquement */}
          <TerminalOutput lines={termLines} emailLines={emailLines} />
        </div>
      </div>
    </section>
  );
}
