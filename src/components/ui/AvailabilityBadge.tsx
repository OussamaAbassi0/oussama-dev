"use client";
import { useState, useEffect } from "react";

const SLOTS_LEFT = 2; // à modifier manuellement chaque mois
const MONTH = "Avril 2026";

export default function AvailabilityBadge() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display:        "inline-flex",
      alignItems:     "center",
      gap:            "8px",
      padding:        "6px 14px",
      background:     SLOTS_LEFT <= 1 ? "rgba(255,77,109,.12)" : "rgba(245,166,35,.1)",
      border:         `1px solid ${SLOTS_LEFT <= 1 ? "rgba(255,77,109,.35)" : "rgba(245,166,35,.3)"}`,
      borderRadius:   "20px",
      fontFamily:     "var(--mono)",
      fontSize:       "11px",
      color:          SLOTS_LEFT <= 1 ? "#ff4d6d" : "#f5a623",
      letterSpacing:  ".04em",
    }}>
      <span style={{
        width:"6px", height:"6px", borderRadius:"50%",
        background:  SLOTS_LEFT <= 1 ? "#ff4d6d" : "#f5a623",
        boxShadow:   `0 0 6px ${SLOTS_LEFT <= 1 ? "#ff4d6d" : "#f5a623"}`,
        display:     "inline-block",
        opacity:     pulse ? 1 : .4,
        transition:  "opacity .6s",
      }} />
      ⚠️ {SLOTS_LEFT} créneaux restants pour {MONTH}
    </div>
  );
}
