"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CommandPalette from "@/components/ui/CommandPalette";
import TerminalMode   from "@/components/ui/TerminalMode";
import { useLang }   from "@/lib/LangContext";
import { LANGS, SiteLang } from "@/lib/i18n";

export default function Navbar() {
  const [paletteOpen,  setPaletteOpen ] = useState(false);
  const [briefOpen,    setBriefOpen   ] = useState(false);
  const [hackerMode,   setHackerMode  ] = useState(false);
  const [menuOpen,     setMenuOpen    ] = useState(false);
  const [isMac,        setIsMac       ] = useState(false);
  const [langOpen,     setLangOpen    ] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
      if (e.key === "Escape") { setPaletteOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Ferme menu mobile au scroll */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [menuOpen]);

  const NAV_LINKS = [
    { label: "Comment ça marche", href: "#how-it-works" },
    { label: "Lead Hunter",        href: "#lead-hunter"  },
    { label: "ROI Calculator",     href: "#roi"          },
    { label: "Cas clients",        href: "#case-studies" },
    { label: "Blog",               href: "/blog"         },
    { label: "FAQ",                href: "#faq"          },
  ];

  return (
    <>
      <style>{`
        @keyframes mobileMenuIn {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nav-cmd-btn { display:flex; }
        @media (max-width: 768px) {
          .nav-cmd-btn { display:none !important; }
          .nav-live-badge { display:none !important; }
          .nav-cta-desktop { display:none !important; }
          .nav-links-desktop { display:none !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display:none !important; }
        }
      `}</style>

      <nav style={{
        position:   "fixed", top:0, left:0, right:0, zIndex:50,
        height:     "60px",
        display:    "flex", alignItems:"center", justifyContent:"space-between",
        padding:    "0 20px",
        background: "rgba(8,12,16,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,255,200,0.1)",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily:   "var(--mono)", fontSize:"13px",
          color:        "var(--cyan)", textDecoration:"none", flexShrink:0,
        }}>
          <span style={{ opacity:0.5 }}>~/</span>oussama.dev
        </Link>

        {/* Centre — liens nav + barre Ctrl+K (desktop) */}
        <div className="nav-links-desktop" style={{ display:"flex", alignItems:"center", gap:"4px" }}>
          {[{label:"Lab",href:"#lead-hunter"},{label:"ROI",href:"#roi"},{label:"Blog",href:"/blog"}].map(link => (
            <a key={link.href} href={link.href} style={{
              fontFamily:"'Courier New',monospace", fontSize:"12px",
              color:"rgba(255,255,255,.45)", textDecoration:"none",
              padding:"6px 12px", borderRadius:"6px",
              transition:"color .2s, background .2s",
            }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.color="white"; el.style.background="rgba(255,255,255,.06)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.color="rgba(255,255,255,.45)"; el.style.background="transparent"; }}
            >{link.label}</a>
          ))}
        </div>

        {/* Barre Ctrl+K */}
        <button
          className="nav-cmd-btn"
          onClick={() => setPaletteOpen(true)}
          style={{
            alignItems:   "center", gap:"10px",
            padding:      "7px 14px",
            background:   "rgba(255,255,255,.03)",
            border:       "1px solid rgba(255,255,255,.09)",
            borderRadius: "8px", cursor:"pointer",
            transition:   "all .2s", minWidth:"200px", outline:"none",
          }}
          onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(0,229,255,.06)"; el.style.borderColor="rgba(0,229,255,.25)"; }}
          onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(255,255,255,.03)"; el.style.borderColor="rgba(255,255,255,.09)"; }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity:.35, flexShrink:0 }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="#00e5ff" strokeWidth="1.5"/>
            <path d="M10.5 10.5L14 14" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:"12px", color:"rgba(255,255,255,.3)", flex:1, textAlign:"left" }}>
            Menu Rapide...
          </span>
          <span style={{
            padding:"2px 7px", background:"rgba(0,229,255,.07)",
            border:"1px solid rgba(0,229,255,.18)", borderRadius:"5px",
            fontFamily:"'Courier New',monospace", fontSize:"10px",
            color:"rgba(0,229,255,.6)", flexShrink:0,
          }}>
            {isMac ? "⌘K" : "Ctrl K"}
          </span>
        </button>

        {/* Droite desktop */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", flexShrink:0 }}>
          <span className="nav-live-badge" style={{
            display:"inline-flex", alignItems:"center", gap:"5px",
            padding:"4px 10px", borderRadius:"20px",
            background:"rgba(255,77,109,.1)", border:"1px solid rgba(255,77,109,.2)",
            fontFamily:"var(--mono)", fontSize:"10px", fontWeight:700,
            color:"var(--red)", letterSpacing:".06em", textTransform:"uppercase",
          }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--red)", animation:"livePulse 1.5s ease infinite" }} />
            LIVE LAB
          </span>

          {/* Sélecteur de langue */}
          <div style={{ position:"relative" }} className="nav-cta-desktop">
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{
                display:"flex", alignItems:"center", gap:"6px",
                padding:"7px 12px",
                background:"rgba(255,255,255,.05)",
                border:"1px solid rgba(255,255,255,.12)",
                borderRadius:"8px", cursor:"pointer",
                fontFamily:"'Courier New',monospace", fontSize:"12px",
                color:"rgba(255,255,255,.7)",
                transition:"all .2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(0,255,200,.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.12)"; }}
            >
              <span>{LANGS.find(l => l.code === lang)?.flag}</span>
              <span>{lang.toUpperCase()}</span>
              <span style={{ opacity:.5, fontSize:"9px" }}>{langOpen ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown */}
            {langOpen && (
              <div style={{
                position:"absolute", top:"calc(100% + 8px)", right:0,
                background:"#07090f",
                border:"1px solid rgba(0,229,255,.2)",
                borderRadius:"10px", overflow:"hidden",
                boxShadow:"0 16px 40px rgba(0,0,0,.6)",
                zIndex:200, minWidth:"160px",
                animation:"mobileMenuIn .2s ease",
              }}>
                {LANGS.map(l => (
                  <button key={l.code}
                    onClick={() => { setLang(l.code as SiteLang); setLangOpen(false); }}
                    style={{
                      display:"flex", alignItems:"center", gap:"10px",
                      width:"100%", padding:"10px 14px",
                      background: lang===l.code ? "rgba(0,255,200,.08)" : "transparent",
                      border:"none", cursor:"pointer",
                      fontFamily:"Arial,sans-serif", fontSize:"13px",
                      color: lang===l.code ? "var(--cyan)" : "rgba(255,255,255,.7)",
                      fontWeight: lang===l.code ? 600 : 400,
                      textAlign:"left", transition:"background .15s",
                      borderBottom:"1px solid rgba(255,255,255,.04)",
                    }}
                    onMouseEnter={e => { if(lang!==l.code) (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.05)"; }}
                    onMouseLeave={e => { if(lang!==l.code) (e.currentTarget as HTMLElement).style.background="transparent"; }}
                  >
                    <span style={{ fontSize:"16px" }}>{l.flag}</span>
                    <span>{l.label}</span>
                    {lang===l.code && <span style={{ marginLeft:"auto", fontSize:"10px" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#cta" className="nav-cta-desktop" style={{
            padding:"8px 18px", background:"var(--cyan)", color:"var(--bg)",
            fontFamily:"var(--mono)", fontWeight:700, fontSize:"12px",
            borderRadius:"6px", textDecoration:"none", letterSpacing:".04em",
            transition:"box-shadow .2s",
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow="0 0 20px rgba(0,255,200,.4)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow="none")}
          >
            {t.nav.start}
          </a>

          {/* Hamburger mobile */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              background:"none", border:"1px solid rgba(255,255,255,.12)",
              borderRadius:"6px", color:"rgba(255,255,255,.7)",
              cursor:"pointer", padding:"6px 10px", fontSize:"16px",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Menu mobile dropdown */}
      {menuOpen && (
        <div style={{
          position:   "fixed", top:"60px", left:0, right:0,
          zIndex:     49,
          background: "rgba(7,9,15,.97)",
          borderBottom:"1px solid rgba(0,255,200,.1)",
          padding:    "16px 20px 20px",
          animation:  "mobileMenuIn .25s ease",
          backdropFilter:"blur(16px)",
        }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"4px", marginBottom:"16px" }}>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding:        "12px 16px",
                  fontFamily:     "Arial,sans-serif",
                  fontSize:       "15px",
                  color:          "rgba(255,255,255,.75)",
                  textDecoration: "none",
                  borderRadius:   "8px",
                  transition:     "background .15s, color .15s",
                  display:        "block",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(0,255,200,.07)"; (e.currentTarget as HTMLElement).style.color="white"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.75)"; }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href="#cta" onClick={() => setMenuOpen(false)} style={{
            display:"block", textAlign:"center",
            padding:"13px", background:"var(--cyan)", color:"var(--bg)",
            fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:"14px",
            borderRadius:"8px", textDecoration:"none", letterSpacing:".04em",
          }}>
            🚀 Démarrer un projet
          </a>
        </div>
      )}

      {paletteOpen && (
        <CommandPalette
          onOpenBrief={() => { setBriefOpen(true); setPaletteOpen(false); }}
          onClose={() => setPaletteOpen(false)}
          onHackerMode={() => setHackerMode(true)}
        />
      )}

      {hackerMode && (
        <TerminalMode
          onOpenBrief={() => { setHackerMode(false); setBriefOpen(true); }}
          onExit={() => setHackerMode(false)}
        />
      )}
    </>
  );
}
