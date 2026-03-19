"use client";
import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position:   "fixed",
      top:        0,
      left:       0,
      right:      0,
      height:     "2px",
      zIndex:     200,
      background: "transparent",
      pointerEvents: "none",
    }}>
      <div style={{
        height:     "100%",
        width:      `${progress}%`,
        background: "linear-gradient(90deg, #00ffc8, #00e5ff, #a78bfa)",
        boxShadow:  "0 0 8px rgba(0,229,255,.6)",
        transition: "width .1s linear",
        borderRadius: "0 2px 2px 0",
      }} />
    </div>
  );
}
