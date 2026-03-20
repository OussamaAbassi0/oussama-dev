"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const posRef   = useRef({ x: 0, y: 0 });
  const ringPos  = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    /* Seulement desktop */
    if (window.matchMedia("(pointer:coarse)").matches) return;

    let raf: number;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

          /* Hover sur éléments interactifs */
      const target = e.target as HTMLElement;
      const isHover = !!(target.closest("a,button,[role='button'],input,textarea,select,[tabindex]"));
      setHovered(isHover);
    };

    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    /* RAF loop — ring suit avec lag pour l'effet traîne */
    const loop = () => {
      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        /* Dot — suit instantanément */
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

        /* Ring — suit avec légère friction (0.35 = rapide, 0.1 = lent) */
        ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.35;
        ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.35;
        ring.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        @keyframes cursorClick { 0%{transform:scale(1)} 50%{transform:scale(.6)} 100%{transform:scale(1)} }
      `}</style>

      {/* Dot central */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "8px",
          height:        "8px",
          borderRadius:  "50%",
          background:    hovered ? "#ffffff" : "#00ffc8",
          pointerEvents: "none",
          zIndex:        99999,
          opacity:       visible ? 1 : 0,
          transition:    "opacity .2s, background .2s, width .2s, height .2s",
          boxShadow:     hovered ? "0 0 8px rgba(255,255,255,.8)" : "0 0 8px rgba(0,255,200,.8)",
          animation:     clicked ? "cursorClick .3s ease" : "none",
          mixBlendMode:  "difference",
        }}
      />

      {/* Ring avec lag */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         hovered ? "44px" : "32px",
          height:        hovered ? "44px" : "32px",
          borderRadius:  "50%",
          border:        `1.5px solid ${hovered ? "rgba(255,255,255,.6)" : "rgba(0,255,200,.5)"}`,
          pointerEvents: "none",
          zIndex:        99998,
          opacity:       visible ? (hovered ? 0.9 : 0.5) : 0,
          transition:    "opacity .2s, width .3s, height .3s, border-color .2s",
        }}
      />
    </>
  );
}
