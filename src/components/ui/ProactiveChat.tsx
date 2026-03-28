"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/lib/LangContext";
import { trackPageVisit, buildPersonalizedWelcome } from "@/lib/sessionTracker";
import { BookOpen, Rocket, Zap, Briefcase, DollarSign } from "lucide-react";

const stripEmoji = (s: string) => s.replace(/^[\p{Extended_Pictographic}][\uFE0F]?\u20E3?\s*/u, "");
const SUGGESTION_ICONS = [<BookOpen key="b" size={13} />, <Rocket key="r" size={13} />, <Zap key="z" size={13} />, <Briefcase key="br" size={13} />, <DollarSign key="d" size={13} />];

/* ══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════ */
interface Action { label: string; href: string; color: string }
interface Msg {
  role:    "user" | "assistant";
  content: string;
  actions?: Action[];
}

/* ══════════════════════════════════════════════════════════
   INTENT → ACTION BUTTONS (v2 — logique en 2 passes)

   Passe 1 : texte USER uniquement — intention explicite du visiteur
   Passe 2 : texte BOT uniquement — URLs précises mentionnées par le bot
   → évite les faux positifs sur "projet", "gratuit", "formulaire"…
══════════════════════════════════════════════════════════ */
function getActions(userText: string, botText: string): Action[] {
  const n = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");

  const u = n(userText);   // intention de l'utilisateur
  const b = n(botText);    // réponse du bot

  /* ── Passe 1 : intention USER (patterns stricts) ──────── */
  const USER_INTENTS: [RegExp, Action][] = [
    // Contact / démarrer — TOP PRIORITY
    [/contacter|contact|joindre|ecrire|envoyer|message|collaboration|travaill.*ensemble|commencer.*projet|demarrer.*projet|brief|devis|tarif|combien.*cout|combien.*pric/,
      { label: "📋 Démarrer un projet",  href: "/#cta",                         color: "#00ffc8" }],
    // Blog / articles
    [/\barticle|\bblog|lire|post|publication|guide.*pme|taches.*repetitives/,
      { label: "📖 Lire le blog",        href: "/blog",                         color: "#00ffc8" }],
    // Projets concrets
    [/\bprojets?\b|portfolio|realisation|leadscout|flowaudit|talentscout|ce que tu as fait|tes travaux/,
      { label: "🚀 Voir les projets",    href: "/projets",                      color: "#a78bfa" }],
    // Services
    [/\bservice|prestation|offre|que proposes|que fais.?tu|qu est.?ce que|expertise/,
      { label: "💼 Voir les services",   href: "/services",                     color: "#f5a623" }],
    // Lead Hunter spécifique
    [/lead.?hunter|generer.*lead|trouver.*prospect|prospects? qualifie/,
      { label: "🎯 Lead Hunter",         href: "/lab#lead-hunter",              color: "#00ffc8" }],
    // ROI Calculator
    [/\broi\b|calculer.*roi|calculateur|heures.*perdues|economis.*argent/,
      { label: "💰 Calculateur ROI",     href: "/lab#roi",                      color: "#f5a623" }],
    // Workflow Builder
    [/\bn8n\b|\bmake\b|workflow.*builder|construire.*workflow/,
      { label: "⚙️ Workflow Builder",    href: "/lab#workflow",                 color: "#a78bfa" }],
    // Lab / outils générique
    [/\blab\b|tester.*outil|outils.*gratuit|essayer.*demo|playground/,
      { label: "⚡ Tester les outils",   href: "/lab",                          color: "#00e5ff" }],
    // Cas client RH
    [/recrutement|embauche|tri.*cv|cv.*tri|rh\b/,
      { label: "📖 Cas client RH",       href: "/blog/recrutement-ia-temps-divise-par-5", color: "#f5a623" }],
    // Guide PME
    [/pme|petite.*entreprise|tpe\b|petite.*boite/,
      { label: "📖 Guide PME",           href: "/blog/ia-pas-reservee-grandes-entreprises", color: "#a78bfa" }],
  ];

  const seen    = new Set<string>();
  const actions: Action[] = [];

  for (const [re, action] of USER_INTENTS) {
    if (re.test(u) && !seen.has(action.href)) {
      actions.push(action);
      seen.add(action.href);
      break; // une seule action depuis le texte user
    }
  }

  /* ── Passe 2 : URLs citées par le BOT (patterns très précis) ── */
  // Le bot est forcé par son system prompt à écrire les URLs → on les détecte
  const BOT_URLS: [RegExp, Action][] = [
    [/\/blog(?!\/)/,
      { label: "📖 Lire le blog",        href: "/blog",                         color: "#00ffc8" }],
    [/\/projets/,
      { label: "🚀 Voir les projets",    href: "/projets",                      color: "#a78bfa" }],
    [/\/services/,
      { label: "💼 Voir les services",   href: "/services",                     color: "#f5a623" }],
    [/lead.?hunter|\/lab#lead/,
      { label: "🎯 Lead Hunter",         href: "/lab#lead-hunter",              color: "#00ffc8" }],
    [/roi.?calculat|\/lab#roi/,
      { label: "💰 Calculateur ROI",     href: "/lab#roi",                      color: "#f5a623" }],
    [/workflow.?builder|\/lab#workflow/,
      { label: "⚙️ Workflow Builder",    href: "/lab#workflow",                 color: "#a78bfa" }],
    [/live.?pipeline|\/lab#automation/,
      { label: "⚡ Live Pipeline",       href: "/lab#automation",               color: "#00e5ff" }],
    [/\/lab(?!#)/,
      { label: "⚡ Tester les outils",   href: "/lab",                          color: "#00e5ff" }],
    [/formulaire.*brief|bouton.*demarrer|cta|\/#cta/,
      { label: "📋 Démarrer un projet",  href: "/#cta",                         color: "#00ffc8" }],
  ];

  if (actions.length < 2) {
    for (const [re, action] of BOT_URLS) {
      if (re.test(b) && !seen.has(action.href)) {
        actions.push(action);
        seen.add(action.href);
        if (actions.length >= 2) break;
      }
    }
  }

  return actions;
}

/* ══════════════════════════════════════════════════════════
   RICH TEXT RENDERER — supporte **gras**
══════════════════════════════════════════════════════════ */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i} style={{ color:"white", fontWeight:700 }}>{p.slice(2,-2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   I18N
══════════════════════════════════════════════════════════ */
const WELCOME: Record<string, string> = {
  fr: "Bonjour ! Je connais tout le site. Posez-moi n'importe quelle question ou choisissez une suggestion ci-dessous",
  en: "Hello! I know the whole site. Ask me anything or pick a suggestion below",
  ar: "مرحباً! أعرف كل شيء عن الموقع. اسألني أي سؤال أو اختر من الاقتراحات أدناه",
  es: "¡Hola! Conozco todo el sitio. Hazme cualquier pregunta o elige una sugerencia abajo",
  nl: "Hallo! Ik ken de hele site. Stel een vraag of kies een suggestie hieronder",
};

const SUGGESTIONS: Record<string, Array<{ label: string; q: string }>> = {
  fr: [
    { label: "📖 Articles du blog",     q: "Où sont les articles du blog ?" },
    { label: "🚀 Les projets",          q: "Quels projets as-tu réalisés ?" },
    { label: "⚡ Tester les outils",    q: "Quels outils gratuits puis-je tester ?" },
    { label: "💼 Les services",         q: "Quels services proposes-tu ?" },
    { label: "💰 Calculer mon ROI",     q: "Comment calculer mon ROI avec l'automatisation ?" },
  ],
  en: [
    { label: "📖 Blog articles",        q: "Where are the blog articles?" },
    { label: "🚀 Projects",             q: "What projects have you built?" },
    { label: "⚡ Test the tools",       q: "What free tools can I try?" },
    { label: "💼 Services",             q: "What services do you offer?" },
    { label: "💰 Calculate my ROI",     q: "How do I calculate my automation ROI?" },
  ],
  ar: [
    { label: "📖 مقالات المدونة",       q: "أين توجد مقالات المدونة؟" },
    { label: "🚀 المشاريع",             q: "ما المشاريع التي أنجزتها؟" },
    { label: "⚡ تجربة الأدوات",        q: "ما الأدوات المجانية التي يمكنني تجربتها؟" },
    { label: "💼 الخدمات",              q: "ما الخدمات التي تقدمها؟" },
    { label: "💰 حساب العائد",          q: "كيف أحسب عائد الاستثمار؟" },
  ],
  es: [
    { label: "📖 Artículos del blog",   q: "¿Dónde están los artículos del blog?" },
    { label: "🚀 Los proyectos",        q: "¿Qué proyectos has realizado?" },
    { label: "⚡ Probar herramientas",  q: "¿Qué herramientas gratuitas puedo probar?" },
    { label: "💼 Los servicios",        q: "¿Qué servicios ofreces?" },
    { label: "💰 Calcular mi ROI",      q: "¿Cómo calculo mi ROI con la automatización?" },
  ],
  nl: [
    { label: "📖 Blog artikelen",       q: "Waar zijn de blog artikelen?" },
    { label: "🚀 Projecten",            q: "Welke projecten heb je gebouwd?" },
    { label: "⚡ Tools uitproberen",    q: "Welke gratis tools kan ik uitproberen?" },
    { label: "💼 Diensten",             q: "Welke diensten bied je aan?" },
    { label: "💰 Mijn ROI berekenen",   q: "Hoe bereken ik mijn automatisering ROI?" },
  ],
};

const PLACEHOLDER: Record<string, string> = {
  fr: "Posez votre question...",
  en: "Ask me anything...",
  ar: "اسألني أي شيء...",
  es: "Hazme una pregunta...",
  nl: "Stel een vraag...",
};

const CONTEXT_MESSAGES: Record<string, Record<string, string>> = {
  fr: {
    "roi":         "Je vois que vous calculez votre ROI 💰 Je peux affiner l'estimation — quel est votre secteur ?",
    "lead-hunter": "Vous explorez le Lead Hunter ⚡ Combien de prospects ciblez-vous par mois ?",
    "workflow":    "Ce workflow vous intéresse 🤖 Avez-vous déjà utilisé n8n ou Make ?",
    "automation":  "La puissance de l'automatisation en direct 🚀 Imaginez ça pour votre business !",
    "default":     "Bonjour 👋 Je suis l'Agent IA d'Oussama. Une question sur le site ou sur l'automatisation ?",
  },
  en: {
    "roi":         "I see you're calculating ROI 💰 I can refine the estimate — what's your industry?",
    "lead-hunter": "Exploring the Lead Hunter ⚡ How many prospects do you target monthly?",
    "workflow":    "Interested in this workflow 🤖 Have you used n8n or Make before?",
    "automation":  "Automation power live 🚀 Imagine this running for your business!",
    "default":     "Hello 👋 I'm Oussama's AI Agent. Any questions about the site or automation?",
  },
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function ProactiveChat() {
  const { lang } = useLang();
  const L = (lang in WELCOME) ? lang : "fr";

  const [open,        setOpen       ] = useState(false);
  const [messages,    setMessages   ] = useState<Msg[]>([]);
  const [input,       setInput      ] = useState("");
  const [loading,     setLoading    ] = useState(false);
  const [bubble,      setBubble     ] = useState<string|null>(null);
  const [bubbleShown, setBubbleShown] = useState(false);
  const [section,     setSection    ] = useState("default");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout>|null>(null);

  /* ── Track current page visit on mount ──────────────────── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageVisit(window.location.pathname);
    }
  }, []);

  /* ── Intersection Observer — section visible ─────────── */
  useEffect(() => {
    const ids = ["roi","lead-hunter","workflow","automation","blueprint","audit","gallery"];
    const obs: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setSection(id); },
        { threshold: 0.3 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  /* ── Bulle proactive après 90s ───────────────────────── */
  useEffect(() => {
    if (bubbleShown) return;
    timerRef.current = setTimeout(() => {
      if (!open) {
        const ctxMsgs = CONTEXT_MESSAGES[L] ?? CONTEXT_MESSAGES.fr;
        setBubble(ctxMsgs[section] ?? ctxMsgs.default);
        setBubbleShown(true);
        setTimeout(() => setBubble(null), 6000);
      }
    }, 90000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  /* ── Scroll interne messages ─────────────────────────── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── Ouverture ────────────────────────────────────────── */
  const openChat = useCallback(() => {
    setBubble(null);
    if (!open) {
      setOpen(true);
      if (messages.length === 0) {
        /* Try personalized welcome based on session data */
        const personalized = buildPersonalizedWelcome(
          L,
          typeof window !== "undefined" ? window.location.pathname : "/",
        );
        const welcomeMsg = personalized ?? (WELCOME[L] ?? WELCOME.fr);
        setMessages([{ role:"assistant", content: welcomeMsg }]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setOpen(false);
    }
  }, [open, messages.length, L]);

  /* ── Envoyer un message ───────────────────────────────── */
  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const userMsg: Msg = { role:"user", content: text };
    const withUser = [...messages, userMsg];
    setMessages(withUser);
    setInput("");
    setLoading(true);

    try {
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          messages: withUser.map(m => ({ role: m.role, content: m.content })),
          page:     typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });
      const data = await res.json();
      const botText = data.message ?? "Désolé, essayez à nouveau.";

      /* Détection d'intentions → boutons d'action */
      const actions = getActions(text, botText);

      setMessages(m => [...m, { role:"assistant", content: botText, actions }]);
    } catch {
      setMessages(m => [...m, { role:"assistant", content:"Connexion perdue. Réessayez." }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const suggestions = SUGGESTIONS[L] ?? SUGGESTIONS.fr;

  return (
    <>
      <style>{`
        @keyframes bubbleIn  { from{opacity:0;transform:translateY(8px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes chatSlide { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fabBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes dotBounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-5px);opacity:1} }
        @keyframes actionIn  { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes suggIn    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ position:"fixed", bottom:"28px", right:"28px", zIndex:999 }}>

        {/* ── Bulle proactive ─────────────────────────── */}
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

        {/* ── Panel chat ──────────────────────────────── */}
        {open && (
          <div style={{
            width:"360px", marginBottom:"16px",
            background:"#07090f",
            border:"1px solid rgba(0,229,255,.18)",
            borderRadius:"16px",
            boxShadow:"0 24px 64px rgba(0,0,0,.75), 0 0 40px rgba(0,229,255,.06)",
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
                width:"38px", height:"38px", borderRadius:"50%",
                background:"linear-gradient(135deg,#001a14,#002820)",
                border:"1.5px solid rgba(0,255,200,.35)",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0,
              }}>
                <img src="/chat-icon.svg" alt="Agent IA" width="36" height="36" style={{ display:"block" }} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontFamily:"var(--mono)", fontWeight:700, fontSize:"12px", color:"white", marginBottom:"2px" }}>
                  Agent IA · Oussama HQ
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80", display:"inline-block" }} />
                  <span style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"#4ade80", letterSpacing:".1em" }}>
                    EN LIGNE · GROQ AI
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background:"none", border:"none", color:"rgba(255,255,255,.3)", cursor:"pointer", fontSize:"20px", lineHeight:1, padding:"2px 6px" }}
              >×</button>
            </div>

            {/* Messages */}
            <div style={{
              maxHeight:"340px", overflowY:"auto", padding:"14px",
              display:"flex", flexDirection:"column", gap:"10px",
              scrollbarWidth:"none",
            }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems: m.role==="user" ? "flex-end" : "flex-start", gap:"6px" }}>
                  {/* Bulle */}
                  <div style={{
                    maxWidth:"88%",
                    padding:"9px 13px",
                    borderRadius: m.role==="user" ? "10px 10px 3px 10px" : "10px 10px 10px 3px",
                    background: m.role==="user"
                      ? "linear-gradient(135deg,rgba(0,255,200,.18),rgba(0,229,255,.1))"
                      : "#0d1220",
                    border:`1px solid ${m.role==="user" ? "rgba(0,255,200,.25)" : "rgba(0,229,255,.1)"}`,
                    color:      m.role==="user" ? "var(--cyan)" : "rgba(255,255,255,.85)",
                    fontFamily: m.role==="user" ? "var(--mono)" : "Arial,sans-serif",
                    fontSize:"13px", lineHeight:1.6,
                  }}>
                    <RichText text={m.content} />
                  </div>

                  {/* Action buttons (seulement sur les messages assistant) */}
                  {m.role === "assistant" && m.actions && m.actions.length > 0 && (
                    <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", maxWidth:"100%" }}>
                      {m.actions.map((a, ai) => (
                        <a
                          key={ai}
                          href={a.href}
                          style={{
                            display:"inline-flex", alignItems:"center", gap:"5px",
                            padding:"5px 11px",
                            background:`${a.color}14`,
                            border:`1px solid ${a.color}40`,
                            borderRadius:"20px",
                            fontFamily:"var(--mono)", fontSize:"11px", color:a.color,
                            textDecoration:"none", letterSpacing:".03em",
                            transition:"all .2s",
                            animation:`actionIn .35s ease ${ai * .07}s both`,
                            cursor:"pointer",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = `${a.color}28`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${a.color}80`;
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = `${a.color}14`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${a.color}40`;
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                          }}
                        >
                          {stripEmoji(a.label)} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Quick suggestions (avant le premier message user) */}
              {messages.length === 1 && messages[0].role === "assistant" && (
                <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"4px" }}>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => send(s.q)}
                      style={{
                        display:"flex", alignItems:"center", gap:"8px",
                        padding:"8px 12px",
                        background:"rgba(0,229,255,.05)",
                        border:"1px solid rgba(0,229,255,.14)",
                        borderRadius:"8px",
                        fontFamily:"Arial,sans-serif", fontSize:"12px",
                        color:"rgba(255,255,255,.7)", cursor:"pointer",
                        textAlign:"left",
                        transition:"all .2s",
                        animation:`suggIn .3s ease ${i * .06}s both`,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.3)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.95)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,.05)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,.14)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.7)";
                      }}
                    >
                      <span style={{ color: "rgba(0,229,255,.7)", display:"flex" }}>{SUGGESTION_ICONS[i]}</span>
                      <span>{stripEmoji(s.label)}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {loading && (
                <div style={{
                  alignSelf:"flex-start",
                  background:"#0d1220", border:"1px solid rgba(0,229,255,.1)",
                  borderRadius:"10px 10px 10px 3px",
                  padding:"10px 14px",
                  display:"flex", gap:"5px", alignItems:"center",
                }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{
                      width:"5px", height:"5px", borderRadius:"50%",
                      background:"var(--cyan)", opacity:.5,
                      animation:`dotBounce 1.2s ease-in-out ${i*.2}s infinite`,
                    }} />
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              display:"flex", gap:"8px", padding:"10px 14px 14px",
              borderTop:"1px solid rgba(0,229,255,.08)",
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key==="Enter" && send()}
                placeholder={PLACEHOLDER[L] ?? PLACEHOLDER.fr}
                disabled={loading}
                style={{
                  flex:1, background:"#0d1220",
                  border:"1px solid rgba(0,229,255,.12)",
                  color:"rgba(255,255,255,.9)", padding:"9px 12px",
                  fontFamily:"Arial,sans-serif", fontSize:"13px",
                  borderRadius:"8px", outline:"none",
                  transition:"border-color .2s",
                }}
                onFocus={e  => (e.target.style.borderColor="rgba(0,229,255,.45)")}
                onBlur={e   => (e.target.style.borderColor="rgba(0,229,255,.12)")}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  padding:"9px 14px",
                  background: input.trim() && !loading ? "var(--cyan)" : "rgba(0,229,255,.12)",
                  color:       input.trim() && !loading ? "#050810"    : "rgba(0,229,255,.35)",
                  border:"none", borderRadius:"8px",
                  fontFamily:"var(--mono)", fontWeight:700, fontSize:"16px",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  transition:"all .2s",
                }}
              >→</button>
            </div>
          </div>
        )}

        {/* FAB */}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <button
            onClick={openChat}
            style={{
              width:"56px", height:"56px", borderRadius:"50%",
              background: open ? "#0d1220" : "linear-gradient(135deg,#00ffc8,#00b4d8)",
              border:"1.5px solid rgba(0,255,200,.4)",
              cursor:"pointer", fontSize:"22px",
              boxShadow: open ? "none" : "0 4px 20px rgba(0,255,200,.35)",
              display:"flex", alignItems:"center", justifyContent:"center",
              animation: open ? "none" : "fabBounce 3s ease-in-out infinite",
              color: open ? "rgba(0,229,255,.6)" : "white",
              transition:"background .25s, box-shadow .25s",
            }}
          >
            {open
              ? <span style={{ fontSize:"24px", lineHeight:1 }}>×</span>
              : <img src="/chat-icon.svg" alt="Agent IA" width="30" height="30" style={{ display:"block" }} />
            }
          </button>
        </div>

      </div>
    </>
  );
}
