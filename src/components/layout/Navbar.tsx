"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CommandPalette from "@/components/ui/CommandPalette";
import TerminalMode   from "@/components/ui/TerminalMode";

export default function Navbar() {
  const [paletteOpen,  setPaletteOpen ] = useState(false);
  const [briefOpen,    setBriefOpen   ] = useState(false);
  const [hackerMode,   setHackerMode  ] = useState(false);

  /* Détection Mac côté client uniquement */
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.platform));
  }, []);

  /* Sync avec le raccourci global : si la palette est déjà ouverte via
     Ctrl+K depuis CommandPalette lui-même, on ne double-ouvre pas */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const kbdLabel = isMac ? "⌘ K" : "Ctrl K";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "60px", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 32px",
        background: "rgba(8,12,16,0.85)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,255,200,0.12)",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--mono)", fontSize: "13px",
          color: "var(--cyan)", textDecoration: "none", flexShrink: 0,
        }}>
          <span style={{ opacity: 0.5 }}>~/</span>oussama.dev
        </Link>

        {/* ── Centre : barre de recherche Command Palette ── */}
        <button
          onClick={() => setPaletteOpen(true)}
          aria-label="Ouvrir la palette de commandes"
          style={{
            display:       "flex",
            alignItems:    "center",
            gap:           "10px",
            padding:       "7px 14px",
            background:    "rgba(255,255,255,0.03)",
            border:        "1px solid rgba(255,255,255,0.09)",
            borderRadius:  "8px",
            cursor:        "pointer",
            transition:    "all 0.2s",
            minWidth:      "220px",
            outline:       "none",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background   = "rgba(0,229,255,0.06)";
            el.style.borderColor  = "rgba(0,229,255,0.25)";
            el.style.boxShadow    = "0 0 12px rgba(0,229,255,0.08)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background   = "rgba(255,255,255,0.03)";
            el.style.borderColor  = "rgba(255,255,255,0.09)";
            el.style.boxShadow    = "none";
          }}
        >
          {/* Search icon */}
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="#00e5ff" strokeWidth="1.5"/>
            <path d="M10.5 10.5L14 14" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          {/* Label */}
          <span style={{
            fontFamily:  "'Courier New', monospace",
            fontSize:    "12px",
            color:       "rgba(255,255,255,0.3)",
            flex:         1,
            textAlign:   "left",
            letterSpacing: "0.02em",
            userSelect:  "none",
          }}>
            Menu Rapide...
          </span>

          {/* Kbd badge */}
          <span style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "2px",
            padding:       "2px 7px",
            background:    "rgba(0,229,255,0.07)",
            border:        "1px solid rgba(0,229,255,0.18)",
            borderRadius:  "5px",
            fontFamily:    "'Courier New', monospace",
            fontSize:      "10px",
            color:         "rgba(0,229,255,0.6)",
            letterSpacing: "0.04em",
            flexShrink:    0,
            userSelect:    "none",
          }}>
            {kbdLabel}
          </span>
        </button>

        {/* ── Droite : badges + CTA ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "4px 10px", borderRadius: "20px",
            background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.2)",
            fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 700,
            color: "var(--red)", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "var(--red)", display: "inline-block",
              animation: "livePulse 1.5s ease-in-out infinite",
            }} />
            LIVE LAB
          </span>

          <a
            href="#cta"
            style={{
              padding: "8px 18px", background: "var(--cyan)", color: "var(--bg)",
              fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
              borderRadius: "6px", textDecoration: "none", letterSpacing: "0.05em",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,200,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Démarrer un projet →
          </a>
        </div>
      </nav>

      {/* Command Palette */}
      {paletteOpen && (
        <CommandPalette
          onOpenBrief={() => { setBriefOpen(true); setPaletteOpen(false); }}
          onClose={() => setPaletteOpen(false)}
          onHackerMode={() => setHackerMode(true)}
        />
      )}

      {/* Easter Egg Terminal */}
      {hackerMode && (
        <TerminalMode
          onOpenBrief={() => { setHackerMode(false); setBriefOpen(true); }}
          onExit={() => setHackerMode(false)}
        />
      )}
    </>
  );
}
