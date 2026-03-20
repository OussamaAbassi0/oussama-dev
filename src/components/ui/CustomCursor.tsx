"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const raf     = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    /* Seulement sur desktop */
    if (window.matchMedia("(pointer:coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;
      setHovered(!!target.closest("a,button,[role='button'],input,textarea,select"));
    };

    const onDown  = () => { setClicked(true);  setTimeout(() => setClicked(false), 150); };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    /* RAF — mise à jour de la position via transform direct, pas de state */
    const loop = () => {
      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    window.addEventListener("mousemove",      onMove,  { passive: true });
    window.addEventListener("mousedown",      onDown);
    document.addEventListener("mouseleave",   onLeave);
    document.addEventListener("mouseenter",   onEnter);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mousedown",    onDown);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Un seul élément — dot + ring fusionnés, suit instantanément */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          /* Centrage via margin négatif — pas de calcul JS */
          marginLeft:    hovered ? "-18px" : "-5px",
          marginTop:     hovered ? "-18px" : "-5px",
          width:         hovered ? "36px" : "10px",
          height:        hovered ? "36px" : "10px",
          borderRadius:  "50%",
          background:    hovered ? "transparent" : "#00ffc8",
          border:        hovered ? "2px solid rgba(0,255,200,.7)" : "none",
          pointerEvents: "none",
          zIndex:        99999,
          opacity:       visible ? 1 : 0,
          transition:    "width .15s ease, height .15s ease, margin .15s ease, background .15s ease, border .15s ease, opacity .2s ease",
          boxShadow:     hovered
            ? "0 0 12px rgba(0,255,200,.3)"
            : clicked
            ? "0 0 14px rgba(0,255,200,1)"
            : "0 0 6px rgba(0,255,200,.7)",
          /* GPU acceleration */
          willChange:    "transform",
        }}
      />
    </>
  );
}
