"use client";
import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════
   TYPES & CONSTANTS
══════════════════════════════════════════════════════════ */
interface Message { role: "user" | "assistant"; content: string; }

const INIT_MSG: Message = {
  role: "assistant",
  content:
    "Bonjour. Je suis l'Agent IA d'Oussama. Je peux vous expliquer nos architectures n8n, évaluer la faisabilité technique de votre projet, ou vous orienter vers le bon service. Comment puis-je vous aider ?",
};

/* Suggestions rapides affichées au démarrage */
const QUICK_PROMPTS = [
  "Comment fonctionne n8n ?",
  "Automatiser ma prospection",
  "Évaluer mon projet",
];

/* ══════════════════════════════════════════════════════════
   TYPING INDICATOR
══════════════════════════════════════════════════════════ */
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: "var(--cyan)", display: "inline-block", opacity: .5,
          animation: `dotBounce 1.2s ease-in-out ${i * .2}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MESSAGE BUBBLE
══════════════════════════════════════════════════════════ */
function Bubble({ msg, idx }: { msg: Message; idx: number }) {
  const isUser = msg.role === "user";
  return (
    <div
      style={{
        display: "flex", flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        animation: "msgSlideIn .25s ease",
        animationFillMode: "both",
        animationDelay: `${idx * 0.03}s`,
      }}
    >
      {/* Role label */}
      {!isUser && (
        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--cyan)", letterSpacing: ".15em", marginBottom: "4px", paddingLeft: "2px" }}>
          AGENT IA
        </span>
      )}
      <div style={{
        maxWidth: "88%",
        padding: isUser ? "9px 14px" : "11px 14px",
        borderRadius: isUser ? "10px 10px 3px 10px" : "10px 10px 10px 3px",
        fontSize: "13px", lineHeight: 1.55,
        background: isUser
          ? "linear-gradient(135deg, rgba(0,255,200,.18), rgba(0,229,255,.1))"
          : "#0d1220",
        border: isUser
          ? "1px solid rgba(0,255,200,.25)"
          : "1px solid rgba(0,229,255,.1)",
        color: isUser ? "var(--cyan)" : "var(--text)",
        fontFamily: isUser ? "var(--mono)" : "var(--sans)",
      }}>
        {msg.content}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CHAT PANEL
══════════════════════════════════════════════════════════ */
function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([INIT_MSG]);
  const [input,    setInput   ] = useState("");
  const [loading,  setLoading ] = useState(false);
  const [showHints,setShowHints] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Scroll interne uniquement */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setShowHints(false);
    setInput("");
    setLoading(true);

    const userMsg: Message = { role: "user", content };
    const newMessages      = [...messages, userMsg];
    setMessages(newMessages);

    try {
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", content: data.message ?? "Désolé, une erreur est survenue." }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Connexion perdue. Réessayez dans un instant." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "360px", marginBottom: "16px",
      background: "#080c14",
      border: "1px solid rgba(0,229,255,.18)",
      borderRadius: "14px",
      boxShadow: "0 24px 64px rgba(0,0,0,.7), 0 0 40px rgba(0,229,255,.08)",
      overflow: "hidden",
      animation: "chatSlideUp .3s cubic-bezier(.4,0,.2,1)",
    }}>

      {/* ── Header ────────────────────────────────────── */}
      <div style={{
        padding: "14px 16px",
        background: "#060a12",
        borderBottom: "1px solid rgba(0,229,255,.1)",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        {/* Avatar */}
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%",
          background: "linear-gradient(135deg,#001a14,#002820)",
          border: "1.5px solid rgba(0,255,200,.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px", flexShrink: 0,
          boxShadow: "0 0 12px rgba(0,255,200,.2)",
        }}>
          🤖
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px", color: "white", marginBottom: "2px" }}>
            Agent IA · Oussama HQ
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#4ade80", display: "inline-block",
              boxShadow: "0 0 6px #4ade80",
              animation: "livePulse 2s ease infinite",
            }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#4ade80", letterSpacing: ".1em" }}>
              EN LIGNE · GPT-4o
            </span>
          </div>
        </div>

        <button onClick={onClose} style={{
          background: "none", border: "none", color: "rgba(255,255,255,.3)",
          cursor: "pointer", fontSize: "20px", lineHeight: 1,
          transition: "color .2s", padding: "2px 4px",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "white")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.3)")}
        >×</button>
      </div>

      {/* ── Scanline décorative ────────────────────────── */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg,transparent,rgba(0,229,255,.3),transparent)",
      }} />

      {/* ── Messages ──────────────────────────────────── */}
      <div
        ref={scrollRef}
        style={{
          display: "flex", flexDirection: "column", gap: "10px",
          maxHeight: "320px", overflowY: "auto",
          padding: "16px", scrollbarWidth: "none",
        }}
      >
        {messages.map((m, i) => <Bubble key={i} msg={m} idx={i} />)}

        {/* Typing */}
        {loading && (
          <div style={{
            alignSelf: "flex-start",
            background: "#0d1220", border: "1px solid rgba(0,229,255,.1)",
            borderRadius: "10px 10px 10px 3px", padding: "10px 14px",
          }}>
            <TypingDots />
          </div>
        )}
      </div>

      {/* ── Quick prompts ─────────────────────────────── */}
      {showHints && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "6px",
          padding: "0 16px 12px",
        }}>
          {QUICK_PROMPTS.map(p => (
            <button
              key={p}
              onClick={() => send(p)}
              style={{
                padding: "5px 10px", borderRadius: "20px",
                background: "rgba(0,229,255,.06)",
                border: "1px solid rgba(0,229,255,.15)",
                fontFamily: "var(--mono)", fontSize: "10px", color: "rgba(0,229,255,.8)",
                cursor: "pointer", transition: "all .15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.3)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.15)";
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* ── Input bar ─────────────────────────────────── */}
      <div style={{
        display: "flex", gap: "8px",
        padding: "10px 14px 14px",
        borderTop: "1px solid rgba(0,229,255,.08)",
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Posez votre question..."
          disabled={loading}
          style={{
            flex: 1,
            background: "#0d1220",
            border: "1px solid rgba(0,229,255,.12)",
            color: "var(--text)",
            padding: "9px 12px",
            fontFamily: "var(--mono)", fontSize: "12px",
            borderRadius: "6px", outline: "none",
            transition: "border-color .2s",
          }}
          onFocus={e => (e.target.style.borderColor = "rgba(0,229,255,.4)")}
          onBlur={e => (e.target.style.borderColor = "rgba(0,229,255,.12)")}
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          style={{
            padding: "9px 14px",
            background: input.trim() && !loading ? "var(--cyan)" : "rgba(0,229,255,.15)",
            color: input.trim() && !loading ? "#050810" : "rgba(0,229,255,.4)",
            border: "none", borderRadius: "6px",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "14px",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            transition: "all .2s",
            boxShadow: input.trim() && !loading ? "0 0 12px rgba(0,255,200,.25)" : "none",
          }}
        >→</button>
      </div>

      {/* ── Footer disclaimer ─────────────────────────── */}
      <div style={{
        padding: "8px 16px 12px", textAlign: "center",
        fontFamily: "var(--mono)", fontSize: "9px",
        color: "rgba(255,255,255,.15)", letterSpacing: ".05em",
        borderTop: "1px solid rgba(255,255,255,.04)",
      }}>
        Agent IA · Oussama HQ · Réponse sous 24h garantie
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FAB + GLOBAL ANIMATIONS
══════════════════════════════════════════════════════════ */
export default function AIClone() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity:0; transform:translateY(16px) scale(.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes msgSlideIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform:translateY(0); opacity:.4; }
          40%          { transform:translateY(-5px); opacity:1; }
        }
        @keyframes fabPulse {
          0%,100% { box-shadow:0 4px 20px rgba(0,255,200,.35); }
          50%      { box-shadow:0 4px 32px rgba(0,255,200,.6), 0 0 0 6px rgba(0,255,200,.08); }
        }
      `}</style>

      <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 999 }}>
        {open && <ChatPanel onClose={() => setOpen(false)} />}

        {/* FAB */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Ouvrir le chat IA"
            style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: open
                ? "#0d1220"
                : "linear-gradient(135deg,#00ffc8,#00b4d8)",
              border: "1.5px solid rgba(0,255,200,.4)",
              cursor: "pointer", fontSize: open ? "22px" : "22px",
              boxShadow: open ? "none" : undefined,
              animation: open ? "none" : "fabPulse 2.5s ease-in-out infinite",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .25s, border-color .25s",
              color: open ? "rgba(0,229,255,.6)" : "white",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            {open ? "×" : "🤖"}
          </button>
        </div>
      </div>
    </>
  );
}
