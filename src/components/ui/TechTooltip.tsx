"use client";
import { useState, useRef } from "react";

interface TechTooltipProps {
  term:    string;   // le mot affiché
  explain: string;   // explication simple
  color?:  string;
}

export default function TechTooltip({ term, explain, color = "#00e5ff" }: TechTooltipProps) {
  const [show, setShow]   = useState(false);
  const [pos,  setPos ]   = useState<"top" | "bottom">("top");
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos(rect.top < 120 ? "bottom" : "top");
    }
    setShow(true);
  };

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "2px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      <span style={{
        color:          color,
        borderBottom:   `1px dashed ${color}60`,
        cursor:         "help",
        fontWeight:     600,
      }}>
        {term}
      </span>

      {/* Badge ? */}
      <span style={{
        width:          "13px",
        height:         "13px",
        borderRadius:   "50%",
        background:     `${color}18`,
        border:         `1px solid ${color}30`,
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     "'Courier New', monospace",
        fontSize:       "8px",
        color:          `${color}80`,
        cursor:         "help",
        flexShrink:     0,
      }}>?</span>

      {/* Tooltip */}
      {show && (
        <div style={{
          position:   "absolute",
          [pos]:      "calc(100% + 8px)",
          left:       "50%",
          transform:  "translateX(-50%)",
          zIndex:     500,
          background: "#07090f",
          border:     `1px solid ${color}30`,
          borderRadius:"8px",
          padding:    "10px 14px",
          width:      "220px",
          boxShadow:  `0 8px 24px rgba(0,0,0,.6), 0 0 0 1px ${color}10`,
          pointerEvents: "none",
          animation:  "tooltipFadeIn .15s ease",
        }}>
          <style>{`
            @keyframes tooltipFadeIn {
              from { opacity:0; transform:translateX(-50%) translateY(4px); }
              to   { opacity:1; transform:translateX(-50%) translateY(0); }
            }
          `}</style>

          {/* Arrow */}
          <div style={{
            position:    "absolute",
            [pos === "top" ? "bottom" : "top"]: "-5px",
            left:        "50%",
            transform:   "translateX(-50%) rotate(45deg)",
            width:       "8px",
            height:      "8px",
            background:  "#07090f",
            borderLeft:  pos === "top"    ? `1px solid ${color}30` : "none",
            borderTop:   pos === "top"    ? `1px solid ${color}30` : "none",
            borderRight: pos === "bottom" ? `1px solid ${color}30` : "none",
            borderBottom:pos === "bottom" ? `1px solid ${color}30` : "none",
          }} />

          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize:   "9px",
            color:      color,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>
            C&apos;est quoi ?
          </p>
          <p style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize:   "12px",
            color:      "rgba(255,255,255,.7)",
            lineHeight: 1.5,
          }}>
            {explain}
          </p>
        </div>
      )}
    </span>
  );
}
