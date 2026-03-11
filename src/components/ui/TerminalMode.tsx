"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */
interface TerminalLine {
  id:    number;
  text:  string;
  type:  "system" | "cmd" | "output" | "error" | "success";
}

interface TerminalModeProps {
  onOpenBrief: () => void;
  onExit:      () => void;
}

/* ══════════════════════════════════════════════════════════
   BOOT SEQUENCE
══════════════════════════════════════════════════════════ */
const BOOT_LINES: { text: string; delay: number; type: TerminalLine["type"] }[] = [
  { text: "BIOS v2.6.1 — Initializing hardware...",                delay: 0   , type: "system"  },
  { text: "[  OK  ] Started Oussama_OS kernel",                    delay: 200 , type: "success" },
  { text: "[  OK  ] Loading IA/Automation modules...",             delay: 400 , type: "success" },
  { text: "[  OK  ] n8n daemon — running on port 5678",           delay: 600 , type: "success" },
  { text: "[  OK  ] OpenAI bridge — connected",                    delay: 800 , type: "success" },
  { text: "[  OK  ] Mermaid renderer — ready",                     delay: 1000, type: "success" },
  { text: "[ WARN ] Unauthorized access detected — profiling...", delay: 1200, type: "error"   },
  { text: "[  OK  ] Access granted. Welcome, Guest.",              delay: 1600, type: "success" },
  { text: "",                                                       delay: 1900, type: "system"  },
  { text: "Type 'help' to list available commands.",               delay: 2000, type: "system"  },
  { text: "",                                                       delay: 2100, type: "system"  },
];

/* ══════════════════════════════════════════════════════════
   HELP TEXT
══════════════════════════════════════════════════════════ */
const HELP_LINES = [
  "┌─────────────────────────────────────────────┐",
  "│         Oussama_OS — Commandes              │",
  "├─────────────────────────────────────────────┤",
  "│  whoami     Affiche le profil d'Oussama     │",
  "│  skills     Liste le stack technique        │",
  "│  projects   Projets clients récents         │",
  "│  contact    Ouvrir le formulaire de brief   │",
  "│  clear      Vider le terminal               │",
  "│  exit       Retourner au site               │",
  "│  help       Afficher cette aide             │",
  "└─────────────────────────────────────────────┘",
];

const WHOAMI_LINES = [
  "┌─── PROFIL ──────────────────────────────────┐",
  "│  Name    : Oussama Abassi                   │",
  "│  Role    : Full-Stack Dev & Expert IA       │",
  "│  Stack   : Next.js · n8n · OpenAI · Python  │",
  "│  Focus   : Automatisation B2B               │",
  "│  Results : +12k leads · 340h/mois écon.     │",
  "│  Status  : [●] Disponible pour missions     │",
  "└─────────────────────────────────────────────┘",
];

const SKILLS_LINES = [
  "STACK TECHNIQUE :",
  "  Frontend    → Next.js 16, React 19, TailwindCSS",
  "  IA & Agents → OpenAI GPT-4o, Anthropic, LangGraph",
  "  Automation  → n8n, Make, Playwright, Python",
  "  Data        → Qdrant, Firecrawl, Apollo, Google Maps",
  "  Backend     → Prisma, Neon (Postgres), API REST",
  "",
  "Certifications : [██████████] 100% Résultats clients",
];

const PROJECTS_LINES = [
  "PROJETS RÉCENTS :",
  "  [2025] CRM Automation — Nexvia · +340 leads/mois",
  "  [2025] Lead Hunter B2B — 12 000+ leads qualifiés",
  "  [2025] Audit IA — 50+ sites analysés automatiquement",
  "  [2024] Scraping + enrichissement — agence marketing",
  "  [2024] Workflow Stripe → Jira → Slack — SaaS B2B",
  "",
  "→ Voir plus : oussama.dev/#stack",
];

/* ══════════════════════════════════════════════════════════
   TERMINAL MODE
══════════════════════════════════════════════════════════ */
let _lineId = 0;
const nextId = () => ++_lineId;

export default function TerminalMode({ onOpenBrief, onExit }: TerminalModeProps) {
  const [lines,   setLines  ] = useState<TerminalLine[]>([]);
  const [input,   setInput  ] = useState("");
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ── Scroll interne terminal ─────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  /* ── Boot sequence ────────────────────────────────────── */
  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay, type }) => {
      setTimeout(() => {
        setLines(prev => [...prev, { id: nextId(), text, type }]);
      }, delay);
    });
    setTimeout(() => {
      setBooting(false);
      inputRef.current?.focus();
    }, BOOT_LINES[BOOT_LINES.length - 1].delay + 300);
  }, []);

  /* ── Add lines helper ─────────────────────────────────── */
  const addLines = useCallback((texts: string[], type: TerminalLine["type"] = "output") => {
    setLines(prev => [
      ...prev,
      ...texts.map(text => ({ id: nextId(), text, type })),
    ]);
  }, []);

  /* ── Command processor ───────────────────────────────── */
  const processCmd = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();

    /* Echo la commande */
    setLines(prev => [...prev, { id: nextId(), text: `guest@oussama-os:~$ ${raw}`, type: "cmd" }]);

    /* Historique */
    setHistory(h => [raw, ...h.slice(0, 49)]);
    setHistIdx(-1);

    switch (cmd) {
      case "help":
        addLines(HELP_LINES);
        break;
      case "whoami":
        addLines(WHOAMI_LINES);
        break;
      case "skills":
        addLines(SKILLS_LINES);
        break;
      case "projects":
        addLines(PROJECTS_LINES);
        break;
      case "contact":
        addLines(["→ Ouverture du formulaire de brief...", ""], "success");
        setTimeout(() => { onOpenBrief(); onExit(); }, 600);
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        addLines(["→ Retour au site...", ""], "success");
        setTimeout(onExit, 600);
        break;
      case "":
        break;
      default:
        addLines([`bash: ${raw}: command not found`, "Type 'help' for available commands."], "error");
    }

    setInput("");
  }, [addLines, onOpenBrief, onExit]);

  /* ── Key handlers ────────────────────────────────────── */
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCmd(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(history[next] ?? ""); }
    }
  };

  /* ── Color per type ─────────────────────────────────── */
  const colorOf = (type: TerminalLine["type"]) => {
    switch (type) {
      case "system":  return "rgba(0,229,255,0.55)";
      case "cmd":     return "#e2e8f0";
      case "output":  return "rgba(0,229,255,0.8)";
      case "success": return "#4ade80";
      case "error":   return "#ff4d6d";
    }
  };

  return (
    <>
      <style>{`
        @keyframes crtFlicker {
          0%,100% { opacity:1; }
          92%      { opacity:1; }
          93%      { opacity:.85; }
          94%      { opacity:1; }
          96%      { opacity:.9; }
          97%      { opacity:1; }
        }
        @keyframes termIn {
          from { opacity:0; transform:scale(1.02); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes cursorBlink {
          0%,49%  { opacity:1; }
          50%,100%{ opacity:0; }
        }
        /* Masque CRT scannlines */
        .crt-overlay {
          pointer-events:none;
          position:fixed; inset:0; z-index:9999;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
        }
        /* Vignette CRT */
        .crt-vignette {
          pointer-events:none;
          position:fixed; inset:0; z-index:9998;
          background: radial-gradient(ellipse at center,
            transparent 60%,
            rgba(0,0,0,0.55) 100%
          );
        }
      `}</style>

      {/* CRT effects */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      {/* Terminal fullscreen */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          position: "fixed", inset: 0, zIndex: 9997,
          background: "#000",
          fontFamily: "'Courier New', 'Lucida Console', monospace",
          padding: "24px 28px",
          display: "flex", flexDirection: "column",
          animation: "termIn .3s ease, crtFlicker 8s ease infinite",
          overflow: "hidden",
        }}
      >
        {/* ── Topbar ──────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "20px", paddingBottom: "12px",
          borderBottom: "1px solid rgba(0,229,255,.12)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
              <span key={i} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c, display: "inline-block" }} />
            ))}
            <span style={{ fontSize: "12px", color: "rgba(0,229,255,.5)", marginLeft: "8px" }}>
              Oussama_OS — bash — 120×40
            </span>
          </div>

          <button
            onClick={onExit}
            style={{
              background: "rgba(255,77,109,.15)", border: "1px solid rgba(255,77,109,.25)",
              color: "#ff4d6d", fontFamily: "inherit", fontSize: "11px",
              padding: "3px 12px", borderRadius: "4px", cursor: "pointer",
              letterSpacing: ".08em",
            }}
          >
            ✕ EXIT
          </button>
        </div>

        {/* ── Output log ──────────────────────────────── */}
        <div style={{
          flex: 1, overflowY: "auto", scrollbarWidth: "none",
          fontSize: "13px", lineHeight: "1.65",
          display: "flex", flexDirection: "column", gap: "0",
        }}>
          {lines.map(line => (
            <div key={line.id} style={{ color: colorOf(line.type), whiteSpace: "pre" }}>
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ── Input line ──────────────────────────────── */}
        {!booting && (
          <div style={{
            display: "flex", alignItems: "center", gap: "0",
            borderTop: "1px solid rgba(0,229,255,.08)", paddingTop: "12px", marginTop: "8px",
          }}>
            <span style={{ color: "#4ade80", fontSize: "13px", marginRight: "6px", flexShrink: 0 }}>
              guest@oussama-os:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontFamily: "inherit", fontSize: "13px", color: "#00e5ff",
                caretColor: "#00e5ff",
              }}
            />
            {/* Curseur clignotant */}
            <span style={{
              width: "8px", height: "15px",
              background: "#00e5ff",
              display: "inline-block",
              animation: "cursorBlink 1s step-end infinite",
              marginLeft: "1px",
              opacity: input.length > 0 ? 0 : 1,
            }} />
          </div>
        )}

        {/* Hint */}
        {!booting && (
          <div style={{
            marginTop: "6px", fontSize: "10px",
            color: "rgba(0,229,255,.2)", letterSpacing: ".05em",
          }}>
            ↑↓ historique · Tab autocomplete · type &apos;exit&apos; pour quitter
          </div>
        )}
      </div>
    </>
  );
}
