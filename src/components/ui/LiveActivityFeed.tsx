"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   DATA — Événements fictifs hyper-réalistes B2B
══════════════════════════════════════════════════════════ */
interface ActivityEvent {
  id:      number;
  icon:    string;
  text:    string;
  source:  string;
  timeAgo: string;
}

const EVENTS: Omit<ActivityEvent, "id">[] = [
  { icon: "⚡", text: "Un CEO à Paris vient de générer 3 leads",        source: "Lead Hunter",     timeAgo: "à l'instant"  },
  { icon: "🤖", text: "Une agence web a audité son process complet",     source: "Audit Machine",   timeAgo: "il y a 1 min" },
  { icon: "💰", text: "ROI calculé : +42 000 € économisés / an",        source: "ROI Calculator",  timeAgo: "il y a 2 min" },
  { icon: "🚀", text: "Nouveau brief reçu — intégration CRM",           source: "Project Brief",   timeAgo: "il y a 3 min" },
  { icon: "⚡", text: "Un DG à Lyon : 18 leads qualifiés en 40s",       source: "Lead Hunter",     timeAgo: "il y a 4 min" },
  { icon: "🔍", text: "Un e-commerce a scoré 94/100 en audit IA",       source: "Audit Machine",   timeAgo: "il y a 5 min" },
  { icon: "💼", text: "Brief reçu — automatisation LinkedIn + HubSpot", source: "Project Brief",   timeAgo: "il y a 7 min" },
  { icon: "📈", text: "Un directeur commercial : +340h/an récupérées",  source: "ROI Calculator",  timeAgo: "il y a 8 min" },
  { icon: "⚡", text: "Avocats Paris — 3 prospects à fort potentiel",   source: "Lead Hunter",     timeAgo: "il y a 9 min" },
  { icon: "🧠", text: "Workflow n8n construit et simulé avec succès",   source: "n8n Playground",  timeAgo: "il y a 11 min"},
  { icon: "🚀", text: "Brief reçu — scraping + enrichissement auto",    source: "Project Brief",   timeAgo: "il y a 12 min"},
  { icon: "💰", text: "Inaction estimée à 78 400 € / an pour 8 pers.", source: "ROI Calculator",  timeAgo: "il y a 14 min"},
];

/* Couleur de l'accent par source */
const SOURCE_COLOR: Record<string, string> = {
  "Lead Hunter":    "#00ffc8",
  "Audit Machine":  "#f5a623",
  "ROI Calculator": "#ff4d6d",
  "Project Brief":  "#a78bfa",
  "n8n Playground": "#00e5ff",
};

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════════════════════ */
interface ToastProps {
  event:   ActivityEvent;
  visible: boolean;
  onClose: () => void;
}

function Toast({ event, visible, onClose }: ToastProps) {
  const accentColor = SOURCE_COLOR[event.source] ?? "#00ffc8";

  return (
    <div
      style={{
        display:       "flex",
        alignItems:    "flex-start",
        gap:           "12px",
        padding:       "13px 16px",
        background:    "#07090f",
        border:        "1px solid rgba(255,255,255,0.07)",
        borderLeft:    `2.5px solid ${accentColor}`,
        borderRadius:  "10px",
        boxShadow:     `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03), 0 0 16px ${accentColor}18`,
        maxWidth:      "310px",
        cursor:        "pointer",
        /* Slide-in / slide-out */
        transform:     visible ? "translateY(0) scale(1)"   : "translateY(16px) scale(0.97)",
        opacity:       visible ? 1                          : 0,
        transition:    "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
        willChange:    "transform, opacity",
      }}
      onClick={onClose}
    >
      {/* Live pulse dot */}
      <div style={{
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop:  "1px",
      }}>
        <span style={{
          width:        "7px",
          height:       "7px",
          borderRadius: "50%",
          background:   accentColor,
          boxShadow:    `0 0 6px ${accentColor}`,
          display:      "inline-block",
          animation:    "liveActivityPulse 1.8s ease-in-out infinite",
          flexShrink:   0,
        }} />
      </div>

      {/* Icon */}
      <span style={{ fontSize: "18px", flexShrink: 0, lineHeight: 1.3 }}>{event.icon}</span>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily:   "Arial, Helvetica, sans-serif",
          fontSize:     "12.5px",
          color:        "#e2e8f0",
          lineHeight:   1.45,
          marginBottom: "4px",
          whiteSpace:   "normal",
        }}>
          {event.text}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            fontFamily:  "'Courier New', monospace",
            fontSize:    "10px",
            color:       accentColor,
            opacity:     0.75,
            letterSpacing: ".04em",
          }}>
            {event.source}
          </span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "9px" }}>·</span>
          <span style={{
            fontFamily:  "'Courier New', monospace",
            fontSize:    "10px",
            color:       "#4a5568",
          }}>
            {event.timeAgo}
          </span>
        </div>
      </div>

      {/* Dismiss × */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          background: "none", border: "none",
          color:      "rgba(255,255,255,0.2)",
          cursor:     "pointer", fontSize: "15px",
          lineHeight: 1, padding: "0 2px", flexShrink: 0,
          marginTop:  "-1px", transition: "color .15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,.5)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.2)")}
        aria-label="Fermer"
      >×</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
interface ActiveToast {
  event:   ActivityEvent;
  visible: boolean;   // true = slide-in, false = sliding out
}

export default function LiveActivityFeed() {
  const [toast,       setToast      ] = useState<ActiveToast | null>(null);
  const idxRef   = useRef(0);               // index circulaire dans EVENTS
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counter  = useRef(0);               // id unique par toast

  const dismiss = useCallback(() => {
    /* 1. Déclenche l'animation de sortie */
    setToast(prev => prev ? { ...prev, visible: false } : null);
    /* 2. Après la transition, supprime */
    setTimeout(() => setToast(null), 380);
  }, []);

  const showNext = useCallback(() => {
    const raw   = EVENTS[idxRef.current % EVENTS.length];
    idxRef.current++;
    counter.current++;

    const event: ActivityEvent = { ...raw, id: counter.current };

    /* Slide-in */
    setToast({ event, visible: false });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setToast({ event, visible: true });
      });
    });

    /* Auto-dismiss après 4.5s */
    const dismissTimer = setTimeout(dismiss, 4500);

    /* Prochain event dans 8–15s */
    const nextDelay = 8000 + Math.random() * 7000;
    timerRef.current = setTimeout(() => {
      clearTimeout(dismissTimer);
      dismiss();
      /* Attend la transition out avant d'afficher le suivant */
      setTimeout(showNext, 450);
    }, nextDelay);
  }, [dismiss]);

  useEffect(() => {
    /* Premier événement après 4–7s pour laisser la page charger */
    const initDelay = 4000 + Math.random() * 3000;
    timerRef.current = setTimeout(showNext, initDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showNext]);

  return (
    <>
      <style>{`
        @keyframes liveActivityPulse {
          0%,100% { opacity: 1;   transform: scale(1);    }
          50%      { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>

      {/* Position : bas gauche, ne gêne pas le chatbot (bas droit) */}
      <div style={{
        position:      "fixed",
        bottom:        "28px",
        left:          "24px",
        zIndex:        998,
        pointerEvents: toast?.visible ? "auto" : "none",
      }}>
        {toast && (
          <Toast
            event={toast.event}
            visible={toast.visible}
            onClose={dismiss}
          />
        )}
      </div>
    </>
  );
}
