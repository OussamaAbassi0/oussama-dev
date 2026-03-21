"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   Messages contextuels par section
══════════════════════════════════════════════════════════ */
const CONTEXT_MESSAGES: Record<string, string> = {
  "roi":              "Je vois que vous calculez votre ROI 💰 Quel est votre secteur d'activité ? Je peux affiner l'estimation.",
  "lead-hunter":      "Vous explorez le Lead Hunter ⚡ Combien de prospects ciblez-vous par mois actuellement ?",
  "workflow":         "Ce workflow vous intéresse 🤖 Avez-vous déjà essayé n8n ou Make ?",
  "blueprint":        "Vous générez une architecture 🔷 Décrivez votre problème — je peux suggérer la meilleure approche.",
  "audit":            "Vous auditez un site 🔍 Je peux analyser votre process actuel et suggérer des automatisations.",
  "gallery":          "Un workflow vous a plu 🎯 Cliquez sur «\u00a0Je veux ça\u00a0» pour pré-remplir le formulaire.",
  "quiz":             "Vous faites le diagnostic 📊 Après le quiz, je peux affiner votre roadmap personnellement.",
  "personalized-roi": "Votre simulateur personnalisé 💼 Quel profil vous correspond le mieux ?",
  "default":          "Bonjour 👋 Je suis l'Agent IA d'Oussama. Une question sur l'automatisation de votre business ?",
};

const DELAY_FIRST = 90000; // 90s — laisse le visiteur explorer tranquillement

export default function ProactiveChat() {
  const [open,       setOpen      ] = useState(false);
  const [messages,   setMessages  ] = useState<{ role:"user"|"assistant"; content:string }[]>([]);
  const [input,      setInput     ] = useState("");
  const [loading,    setLoading   ] = useState(false);
  const [bubble,     setBubble    ] = useState<string|null>(null);
  const [bubbleShown,setBubbleShown] = useState(false);
  const [section,    setSection   ] = useState("default");
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout>|null>(null);

  /* ── Intersection Observer — section visible ─────────── */
  useEffect(() => {
    const sections = ["roi","lead-hunter","workflow","blueprint","audit","gallery","quiz","personalized-roi"];
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── Premier message proactif après délai ─────────────── */
  useEffect(() => {
    if (bubbleShown) return;
    timerRef.current = setTimeout(() => {
      if (!open) {
        setBubble(CONTEXT_MESSAGES[section] ?? CONTEXT_MESSAGES.default);
        setBubbleShown(true);
        /* Auto-hide après 5s */
        setTimeout(() => setBubble(null), 5000);
      }
    }, DELAY_FIRST);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  /* ── Scroll interne messages ─────────────────────────── */
  useEffect(() => {
    const el = bottomRef.current;
    if (el) el.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  /* ── Ouverture du chat ───────────────────────────────── */
  const openChat = useCallback(() => {
    setBubble(null);
    if (!open) {
      setOpen(true);
      /* Message d'accueil contextuel */
      if (messages.length === 0) {
        const ctx = CONTEXT_MESSAGES[section] ?? CONTEXT_MESSAGES.default;
        setMessages([{ role:"assistant", content: ctx }]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setOpen(false);
    }
  }, [open, messages.length, section]);

  /* ── Envoi message ───────────────────────────────────── */
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:"user" as const, content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/chat", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role:"assistant", content: data.message ?? "Désolé, essayez à nouveau." }]);
    } catch {
      setMessages(m => [...m, { role:"assistant", content:"Connexion perdue. Réessayez." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bubbleIn  { from{opacity:0;transform:translateY(8px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes chatSlide { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fabBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      `}</style>

      <div style={{ position:"fixed", bottom:"28px", right:"28px", zIndex:999 }}>

        {/* Bulle proactive */}
        {bubble && !open && (
          <div onClick={openChat} style={{
            marginBottom:"12px",
            background:"#07090f",
            border:"1px solid rgba(0,229,255,.25)",
            borderRadius:"12px 12px 4px 12px",
            padding:"12px 16px",
            maxWidth:"260px",
            fontFamily:"Arial,sans-serif",
            fontSize:"13px",
            color:"rgba(255,255,255,.8)",
            lineHeight:1.5,
            cursor:"pointer",
            animation:"bubbleIn .3s ease",
            boxShadow:"0 8px 32px rgba(0,0,0,.5), 0 0 0 1px rgba(0,229,255,.06)",
          }}>
            {bubble}
            <div style={{ marginTop:"8px", fontFamily:"var(--mono)", fontSize:"10px", color:"rgba(0,229,255,.6)" }}>
              Cliquez pour répondre →
            </div>
          </div>
        )}

        {/* Panel chat */}
        {open && (
          <div style={{
            width:"340px", marginBottom:"16px",
            background:"#07090f",
            border:"1px solid rgba(0,229,255,.18)",
            borderRadius:"14px",
            boxShadow:"0 24px 64px rgba(0,0,0,.7), 0 0 40px rgba(0,229,255,.06)",
            overflow:"hidden",
            animation:"chatSlide .3s cubic-bezier(.4,0,.2,1)",
          }}>
            {/* Header */}
            <div style={{
              padding:"13px 16px", background:"#060a12",
              borderBottom:"1px solid rgba(0,229,255,.1)",
              display:"flex", alignItems:"center", gap:"10px",
            }}>
              <div style={{
                width:"36px", height:"36px", borderRadius:"50%",
                background:"linear-gradient(135deg,#001a14,#002820)",
                border:"1.5px solid rgba(0,255,200,.35)",
                display:"flex", alignItems:"center", justifyContent:"center",
                overflow:"hidden",
              }}>
                <img src="/chat-icon.svg" alt="Agent IA" width="36" height="36" style={{ display:"block" }} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"12px", color:"white", marginBottom:"2px" }}>
                  Agent IA · Oussama HQ
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80", display:"inline-block" }} />
                  <span style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"#4ade80", letterSpacing:".1em" }}>EN LIGNE · GROQ AI</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.3)", cursor:"pointer", fontSize:"18px" }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ maxHeight:"300px", overflowY:"auto", padding:"14px", display:"flex", flexDirection:"column", gap:"10px", scrollbarWidth:"none" }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role==="user" ? "flex-end" : "flex-start",
                  maxWidth:"88%",
                  padding:"9px 13px",
                  borderRadius: m.role==="user" ? "10px 10px 3px 10px" : "10px 10px 10px 3px",
                  background: m.role==="user" ? "linear-gradient(135deg,rgba(0,255,200,.18),rgba(0,229,255,.1))" : "#0d1220",
                  border: `1px solid ${m.role==="user" ? "rgba(0,255,200,.25)" : "rgba(0,229,255,.1)"}`,
                  color: m.role==="user" ? "var(--cyan)" : "var(--text)",
                  fontFamily: m.role==="user" ? "var(--mono)" : "Arial,sans-serif",
                  fontSize:"13px", lineHeight:1.55,
                }}>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div style={{ alignSelf:"flex-start", background:"#0d1220", border:"1px solid rgba(0,229,255,.1)", borderRadius:"10px 10px 10px 3px", padding:"10px 14px", display:"flex", gap:"4px", alignItems:"center" }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--cyan)", opacity:.5, animation:`dotBounce 1.2s ease-in-out ${i*.2}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ display:"flex", gap:"8px", padding:"10px 14px 14px", borderTop:"1px solid rgba(0,229,255,.08)" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key==="Enter" && send()}
                placeholder="Posez votre question..."
                disabled={loading}
                style={{
                  flex:1, background:"#0d1220",
                  border:"1px solid rgba(0,229,255,.12)",
                  color:"var(--text)", padding:"9px 12px",
                  fontFamily:"var(--mono)", fontSize:"12px",
                  borderRadius:"6px", outline:"none",
                }}
                onFocus={e => (e.target.style.borderColor="rgba(0,229,255,.4)")}
                onBlur={e  => (e.target.style.borderColor="rgba(0,229,255,.12)")}
              />
              <button onClick={send} disabled={!input.trim()||loading} style={{
                padding:"9px 14px",
                background: input.trim()&&!loading ? "var(--cyan)" : "rgba(0,229,255,.15)",
                color:       input.trim()&&!loading ? "#050810" : "rgba(0,229,255,.4)",
                border:"none", borderRadius:"6px",
                fontFamily:"var(--mono)", fontWeight:700, fontSize:"14px",
                cursor: input.trim()&&!loading ? "pointer" : "not-allowed",
                transition:"all .2s",
              }}>→</button>
            </div>
          </div>
        )}

        {/* FAB */}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <button onClick={openChat} style={{
            width:"56px", height:"56px", borderRadius:"50%",
            background: open ? "#0d1220" : "linear-gradient(135deg,#00ffc8,#00b4d8)",
            border:"1.5px solid rgba(0,255,200,.4)",
            cursor:"pointer", fontSize:"22px",
            boxShadow: open ? "none" : "0 4px 20px rgba(0,255,200,.35)",
            display:"flex", alignItems:"center", justifyContent:"center",
            animation: open ? "none" : "fabBounce 3s ease-in-out infinite",
            color: open ? "rgba(0,229,255,.6)" : "white",
            transition:"background .25s",
          }}>
            {open ? "×" : (
              <img src="/chat-icon.svg" alt="Agent IA" width="30" height="30" style={{ display:"block" }} />
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-5px);opacity:1} }
      `}</style>
    </>
  );
}
