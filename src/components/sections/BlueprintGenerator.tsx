"use client";
import { useState, useEffect, useRef, useId } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

/* ══════════════════════════════════════════════════════════
   QUICK EXAMPLES
══════════════════════════════════════════════════════════ */
const EXAMPLES = [
  "Quand je reçois un email Stripe, créer un ticket Jira et notifier Slack",
  "Nouveau lead HubSpot → enrichir via Apollo → scorer avec IA → notifier le commercial",
  "Chaque nuit, scraper les offres concurrentes, comparer les prix, envoyer un rapport",
  "Formulaire Typeform soumis → créer contact Notion → envoyer email de bienvenue personnalisé",
];

/* ══════════════════════════════════════════════════════════
   MERMAID RENDERER — dynamic import, SSR safe
══════════════════════════════════════════════════════════ */
function MermaidDiagram({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramId    = useId().replace(/:/g, "m");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      if (!containerRef.current || !code) return;
      setError(null);

      try {
        /* Import dynamique — jamais côté serveur */
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad:   false,
          theme:         "base",
          darkMode:      true,
          themeVariables: {
            /* Fond transparent, texte + traits cyan */
            background:          "transparent",
            primaryColor:        "#0d1220",
            primaryBorderColor:  "#00e5ff",
            primaryTextColor:    "#e2e8f0",
            secondaryColor:      "#111827",
            secondaryBorderColor:"#00ffc8",
            secondaryTextColor:  "#94a3b8",
            tertiaryColor:       "#0a0e17",
            tertiaryBorderColor: "#f5a623",
            tertiaryTextColor:   "#f5a623",
            lineColor:           "#00e5ff",
            edgeLabelBackground: "#0a0e17",
            clusterBkg:          "#0d1220",
            titleColor:          "#00e5ff",
            nodeBorder:          "#00e5ff",
            mainBkg:             "#0d1220",
          },
        });

        /* Génère le SVG dans une div temporaire */
        const id  = `mermaid-${diagramId}-${Date.now()}`;
        const { svg } = await mermaid.render(id, code);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;

          /* Rend le SVG responsive + transparent */
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.maxWidth  = "100%";
            svgEl.style.height    = "auto";
            svgEl.style.background= "transparent";
            svgEl.removeAttribute("width");
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.error("[mermaid]", e);
          setError("Impossible de rendre le diagramme. L'IA a peut-être retourné une syntaxe inattendue.");
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [code, diagramId]);

  if (error) {
    return (
      <div style={{
        padding: "20px", fontFamily: "'Courier New',monospace", fontSize: "12px",
        color: "#ff4d6d", background: "rgba(255,77,109,0.06)",
        border: "1px solid rgba(255,77,109,0.2)", borderRadius: "8px",
      }}>
        ⚠ {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", minHeight: "80px" }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   SCAN LOADER
══════════════════════════════════════════════════════════ */
function ScanLoader() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "20px", padding: "48px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes scanBeam {
          0%   { top: 0%;   opacity: 1; }
          95%  { top: 100%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes bpPulse {
          0%,100% { opacity: .5; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* Scan lines background */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden",
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.03) 3px, rgba(0,229,255,0.03) 4px)",
        pointerEvents: "none",
      }}>
        {/* Moving beam */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg,transparent,rgba(0,229,255,.6),transparent)",
          boxShadow: "0 0 12px rgba(0,229,255,.4)",
          animation: "scanBeam 1.8s ease-in-out infinite",
        }} />
      </div>

      {/* Icon */}
      <div style={{
        width: "52px", height: "52px", borderRadius: "12px",
        background: "rgba(0,229,255,.08)",
        border: "1px solid rgba(0,229,255,.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "24px", animation: "bpPulse 1.5s ease infinite", zIndex: 1,
      }}>
        🔷
      </div>

      <div style={{ zIndex: 1, textAlign: "center" }}>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: "13px", color: "#00e5ff", marginBottom: "6px" }}>
          Génération de l&apos;architecture...
        </p>
        <p style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(255,255,255,.3)" }}>
          GPT-4o analyse votre workflow
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════════════════ */
export default function BlueprintGenerator() {
  const ref = useFadeIn<HTMLDivElement>();

  const [prompt,   setPrompt  ] = useState("");
  const [mermaid,  setMermaid ] = useState("");
  const [rawCode,  setRawCode ] = useState("");
  const [phase,    setPhase   ] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg,   setErrMsg  ] = useState("");
  const [showCode, setShowCode] = useState(false);

  const generate = async () => {
    if (!prompt.trim() || phase === "loading") return;
    setPhase("loading");
    setMermaid("");
    setRawCode("");
    setErrMsg("");
    setShowCode(false);

    try {
      const res  = await fetch("/api/blueprint", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");

      const code = data.code ?? data.mermaid ?? ""; // compat les deux champs
      setRawCode(code);
      setMermaid(code);
      setPhase("done");
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : "Erreur serveur");
      setPhase("error");
    }
  };

  return (
    <section id="blueprint" style={{ padding: "100px 24px" }}>
      <style>{`
        @keyframes bpSlideIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">

        {/* Header */}
        <p className="section-label">// Playground #05 — Live Blueprint</p>
        <h2 className="section-title">
          Générateur d&apos;Architecture<br />
          <span className="text-cyan">en temps réel</span>
        </h2>
        <p style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "40px", maxWidth: "560px", lineHeight: 1.7 }}>
          Décrivez votre automatisation en langage naturel.{" "}
          <span style={{ color: "var(--cyan)" }}>GPT-4o génère le schéma d&apos;architecture</span>{" "}
          en syntaxe Mermaid instantanément.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "32px", alignItems: "start" }}>

          {/* ── Input panel ─────────────────────────────── */}
          <div>
            <div className="glass" style={{ padding: "28px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--cyan)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>
                // Décrivez votre workflow
              </p>

              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) generate(); }}
                placeholder="Ex: Quand un prospect remplit mon formulaire Typeform, enrichir le contact via Apollo, scorer avec IA, si score > 80 créer deal HubSpot et notifier Slack..."
                rows={5}
                style={{
                  width: "100%", background: "var(--bg3)",
                  border: "1px solid rgba(0,229,255,.1)", color: "var(--text)",
                  padding: "14px 16px", fontFamily: "var(--mono)", fontSize: "12px",
                  borderRadius: "8px", outline: "none", resize: "vertical",
                  lineHeight: 1.7, transition: "border-color .2s, box-shadow .2s",
                  marginBottom: "16px",
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(0,229,255,.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,.06)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(0,229,255,.1)"; e.target.style.boxShadow = "none"; }}
              />

              <button
                onClick={generate}
                disabled={!prompt.trim() || phase === "loading"}
                style={{
                  width: "100%", padding: "12px",
                  background: prompt.trim() && phase !== "loading" ? "var(--cyan)" : "rgba(0,229,255,.12)",
                  color:      prompt.trim() && phase !== "loading" ? "var(--bg)"   : "var(--text-dim)",
                  fontFamily: "var(--mono)", fontWeight: 700, fontSize: "13px",
                  border:     "none", borderRadius: "6px",
                  cursor:     prompt.trim() && phase !== "loading" ? "pointer" : "not-allowed",
                  transition: "all .2s", letterSpacing: ".04em",
                  boxShadow:  prompt.trim() ? "0 0 16px rgba(0,229,255,.2)" : "none",
                  marginBottom: "20px",
                }}
              >
                {phase === "loading" ? "⏳ Génération..." : "🔷 Générer le blueprint →"}
              </button>

              {/* Hint Ctrl+Enter */}
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(255,255,255,.2)", textAlign: "center", marginBottom: "20px" }}>
                ou <kbd style={{ padding: "1px 5px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "3px" }}>Ctrl</kbd>{" "}
                +{" "}
                <kbd style={{ padding: "1px 5px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "3px" }}>↵</kbd>
              </p>

              {/* Quick examples */}
              <div>
                <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.25)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "10px" }}>
                  ⚡ Exemples rapides
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setPrompt(ex)}
                      style={{
                        textAlign: "left", padding: "8px 12px",
                        background: "rgba(255,255,255,.03)",
                        border: "1px solid rgba(255,255,255,.06)",
                        borderRadius: "6px", cursor: "pointer",
                        fontFamily: "var(--mono)", fontSize: "10px",
                        color: "rgba(255,255,255,.4)", lineHeight: 1.5,
                        transition: "all .15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(0,229,255,.7)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)"; }}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Output panel ────────────────────────────── */}
          <div>
            <div style={{
              background: "#060a12",
              border: `1px solid ${phase === "done" ? "rgba(0,229,255,.25)" : "rgba(255,255,255,.07)"}`,
              borderRadius: "12px", overflow: "hidden",
              transition: "border-color .4s",
              minHeight: "300px",
            }}>
              {/* Panel header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 18px",
                borderBottom: "1px solid rgba(255,255,255,.05)",
                background: "rgba(255,255,255,.02)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
                    <span key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, display: "inline-block" }} />
                  ))}
                  <span style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(255,255,255,.25)", marginLeft: "6px" }}>
                    blueprint.mmd
                  </span>
                </div>

                {phase === "done" && (
                  <button
                    onClick={() => setShowCode(s => !s)}
                    style={{
                      padding: "3px 10px", background: "rgba(0,229,255,.07)",
                      border: "1px solid rgba(0,229,255,.15)", borderRadius: "4px",
                      fontFamily: "'Courier New',monospace", fontSize: "10px",
                      color: "rgba(0,229,255,.6)", cursor: "pointer", transition: "all .15s",
                    }}
                  >
                    {showCode ? "◉ Diagramme" : "</> Code"}
                  </button>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: phase === "idle" ? "0" : "20px", minHeight: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {phase === "idle" && (
                  <div style={{ padding: "40px 24px", textAlign: "center", width: "100%" }}>
                    <div style={{ fontSize: "36px", marginBottom: "16px", opacity: .3 }}>🔷</div>
                    <p style={{ fontFamily: "'Courier New',monospace", fontSize: "12px", color: "rgba(255,255,255,.2)" }}>
                      Le schéma d&apos;architecture apparaîtra ici
                    </p>
                  </div>
                )}

                {phase === "loading" && <ScanLoader />}

                {phase === "error" && (
                  <div style={{ width: "100%", padding: "24px", fontFamily: "'Courier New',monospace", fontSize: "12px", color: "#ff4d6d" }}>
                    ⚠ {errMsg}
                  </div>
                )}

                {phase === "done" && (
                  <div style={{ width: "100%", animation: "bpSlideIn .4s ease" }}>
                    {showCode ? (
                      /* Raw code view */
                      <pre style={{
                        fontFamily: "'Courier New',monospace", fontSize: "11px",
                        color: "#00e5ff", lineHeight: 1.7, overflowX: "auto",
                        whiteSpace: "pre-wrap", wordBreak: "break-word",
                        margin: 0,
                      }}>
                        {rawCode}
                      </pre>
                    ) : (
                      /* Mermaid diagram */
                      <MermaidDiagram code={mermaid} />
                    )}
                  </div>
                )}
              </div>

              {/* Footer tag */}
              {phase === "done" && (
                <div style={{
                  padding: "8px 18px",
                  borderTop: "1px solid rgba(255,255,255,.04)",
                  fontFamily: "'Courier New',monospace", fontSize: "9px",
                  color: "rgba(0,229,255,.3)", display: "flex", alignItems: "center", gap: "6px",
                }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                  Généré avec GPT-4o · Mermaid.js · Oussama HQ
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
