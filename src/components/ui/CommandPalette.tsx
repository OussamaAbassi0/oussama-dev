"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */
interface CommandAction {
  id:     string;
  group:  string;
  icon:   string;
  label:  string;
  sub?:   string;
  action: () => void;
}

export interface CommandPaletteProps {
  onOpenBrief:    () => void;
  onClose?:       () => void;
  onHackerMode?:  () => void;  // Easter egg sudo
}

/* ══════════════════════════════════════════════════════════
   UTILS
══════════════════════════════════════════════════════════ */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
async function copyToClipboard(text: string) {
  try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
}

/* ══════════════════════════════════════════════════════════
   COMMAND PALETTE
   — Le composant est toujours monté quand rendu.
   — L'état ouvert/fermé est géré par le parent (Navbar).
══════════════════════════════════════════════════════════ */
export default function CommandPalette({ onOpenBrief, onClose, onHackerMode }: CommandPaletteProps) {
  const [query,    setQuery   ] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied,   setCopied  ] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const isMac    = typeof navigator !== "undefined" && /Mac|iPhone|iPod|iPad/.test(navigator.platform);

  /* Focus input au montage */
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 60); }, []);

  /* ── Helper fermeture ─────────────────────────────────── */
  const close = useCallback(() => {
    setQuery("");
    setSelected(0);
    setCopied(false);
    onClose?.();
  }, [onClose]);

  /* ── Échap ──────────────────────────────────────────────── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [close]);

  /* ── Actions catalogue ──────────────────────────────────── */
  const ACTIONS: CommandAction[] = [
    {
      id: "leads",   group: "Outils",
      icon: "⚡",    label: "Chasser des Leads",
      sub: "Scroll → Lead Hunter",
      action: () => { close(); scrollTo("lead-hunter"); },
    },
    {
      id: "audit",   group: "Outils",
      icon: "🔍",    label: "Auditer mon site",
      sub: "Scroll → Audit Machine",
      action: () => { close(); scrollTo("audit"); },
    },
    {
      id: "roi",     group: "Outils",
      icon: "💰",    label: "Calculer mon ROI",
      sub: "Scroll → ROI Calculator",
      action: () => { close(); scrollTo("roi"); },
    },
    {
      id: "workflow", group: "Outils",
      icon: "🤖",    label: "Voir le workflow n8n",
      sub: "Scroll → n8n Playground",
      action: () => { close(); scrollTo("workflow"); },
    },
    {
      id: "brief",   group: "Contact",
      icon: "🚀",    label: "Démarrer un projet",
      sub: "Ouvre le formulaire de brief",
      action: () => { close(); onOpenBrief(); },
    },
    {
      id: "email",   group: "Contact",
      icon: "📧",    label: copied ? "Email copié ✓" : "Copier l'email d'Oussama",
      sub: "oussama.abassi.work@gmail.com",
      action: async () => {
        await copyToClipboard("oussama.abassi.work@gmail.com");
        setCopied(true);
        setTimeout(() => { setCopied(false); close(); }, 1200);
      },
    },
    {
      id: "blog",    group: "Navigation",
      icon: "📝",    label: "Lire le Blog",
      sub: "Articles automatisation & IA",
      action: () => { close(); window.location.href = "/blog"; },
    },
    {
      id: "stack",   group: "Navigation",
      icon: "🛠",    label: "Voir le Stack Tech",
      sub: "Scroll → Écosystème",
      action: () => { close(); scrollTo("stack"); },
    },
    {
      id: "top",     group: "Navigation",
      icon: "↑",     label: "Retour en haut",
      sub: "Scroll → Héro",
      action: () => { close(); window.scrollTo({ top: 0, behavior: "smooth" }); },
    },
  ];

  /* ── Easter egg : sudo ───────────────────────────────────── */
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed === "sudo" || trimmed === "> sudo") {
      setTimeout(() => {
        close();
        onHackerMode?.();
      }, 120);
    }
  }, [query, close, onHackerMode]);

  /* ── Filtered list ──────────────────────────────────────── */
  const filtered = query.trim()
    ? ACTIONS.filter(a =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.group.toLowerCase().includes(query.toLowerCase()) ||
        (a.sub ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : ACTIONS;

  /* ── Keyboard navigation ────────────────────────────────── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === "Enter")     { e.preventDefault(); filtered[selected]?.action(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selected, filtered]);

  /* Auto-scroll item sélectionné */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  /* Reset selected quand query change */
  useEffect(() => { setSelected(0); }, [query]);

  /* ── Groups ─────────────────────────────────────────────── */
  const groups = [...new Set(filtered.map(a => a.group))];

  return (
    <>
      <style>{`
        @keyframes paletteIn {
          from { opacity:0; transform:translateY(-12px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes backdropIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(6px)",
          animation: "backdropIn .2s ease",
        }}
      />

      {/* Panel */}
      <div style={{
        position:  "fixed",
        top:       "20%",
        left:      "50%",
        transform: "translateX(-50%)",
        zIndex:    1001,
        width:     "min(560px, calc(100vw - 32px))",
        background:"#07090f",
        border:    "1px solid rgba(0,229,255,.18)",
        borderRadius: "14px",
        boxShadow: "0 32px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(0,229,255,.06), 0 0 40px rgba(0,229,255,.06)",
        overflow:  "hidden",
        animation: "paletteIn .22s cubic-bezier(.4,0,.2,1)",
      }}>

        {/* Input */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,.06)",
        }}>
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: "16px", color: "rgba(0,229,255,.6)", flexShrink: 0, userSelect: "none" }}>›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Que voulez-vous faire ?"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "'Courier New',monospace", fontSize: "15px",
              color: "#e2e8f0", caretColor: "#00e5ff",
            }}
          />
          <kbd
            onClick={close}
            style={{
              fontFamily: "'Courier New',monospace", fontSize: "10px",
              color: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)", borderRadius: "4px",
              padding: "2px 6px", flexShrink: 0, cursor: "pointer",
            }}
          >esc</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight: "360px", overflowY: "auto", padding: "8px 0", scrollbarWidth: "none" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", fontFamily: "'Courier New',monospace", fontSize: "12px", color: "rgba(255,255,255,.2)" }}>
              Aucun résultat pour &quot;{query}&quot;
            </div>
          ) : groups.map(group => {
            const items = filtered.filter(a => a.group === group);
            return (
              <div key={group}>
                <div style={{ padding: "6px 20px 4px", fontFamily: "'Courier New',monospace", fontSize: "9px", color: "rgba(255,255,255,.22)", letterSpacing: ".18em", textTransform: "uppercase" }}>
                  // {group}
                </div>
                {items.map(action => {
                  const idx      = filtered.indexOf(action);
                  const isActive = idx === selected;
                  return (
                    <div
                      key={action.id}
                      data-idx={idx}
                      onClick={action.action}
                      onMouseEnter={() => setSelected(idx)}
                      style={{
                        display: "flex", alignItems: "center", gap: "14px",
                        padding: "10px 20px", cursor: "pointer",
                        background:  isActive ? "rgba(0,229,255,.08)" : "transparent",
                        borderLeft:  `2px solid ${isActive ? "#00e5ff" : "transparent"}`,
                        transition:  "background .1s, border-color .1s",
                      }}
                    >
                      <span style={{ fontSize: "17px", width: "28px", textAlign: "center", flexShrink: 0, filter: isActive ? "drop-shadow(0 0 4px rgba(0,229,255,.5))" : "none", transition: "filter .15s" }}>
                        {action.icon}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "Arial,Helvetica,sans-serif", fontSize: "13.5px", color: isActive ? "#fff" : "#a1a1aa", fontWeight: isActive ? 600 : 400, transition: "color .1s", marginBottom: action.sub ? "1px" : 0 }}>
                          {action.label}
                        </p>
                        {action.sub && (
                          <p style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: isActive ? "rgba(0,229,255,.6)" : "rgba(255,255,255,.25)", transition: "color .1s" }}>
                            {action.sub}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <kbd style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(0,229,255,.5)", background: "rgba(0,229,255,.08)", border: "1px solid rgba(0,229,255,.15)", borderRadius: "4px", padding: "2px 6px", flexShrink: 0 }}>↵</kbd>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 20px", borderTop: "1px solid rgba(255,255,255,.05)",
          fontFamily: "'Courier New',monospace", fontSize: "10px", color: "rgba(255,255,255,.2)",
        }}>
          <span>
            <kbd style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"3px", padding:"1px 5px" }}>↑</kbd>
            {" "}<kbd style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"3px", padding:"1px 5px" }}>↓</kbd>
            {" "}Naviguer &nbsp;&nbsp;
            <kbd style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:"3px", padding:"1px 5px" }}>↵</kbd>
            {" "}Valider
          </span>
          <span style={{ color: "rgba(0,229,255,.25)", letterSpacing: ".05em", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>Oussama HQ</span>
            <span style={{ opacity: .4 }}>·</span>
            <span style={{ fontSize: "9px", color: "rgba(0,229,255,.2)", fontStyle: "italic" }}
              title="Essayez de taper 'sudo'...">
              try: sudo
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
