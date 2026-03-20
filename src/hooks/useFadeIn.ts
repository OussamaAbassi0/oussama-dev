"use client";
import { useEffect, useRef } from "react";

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; delay?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Applique un délai CSS si fourni */
    if (options?.delay) {
      el.style.transitionDelay = `${options.delay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            /* Petit délai RAF pour que le navigateur ait peint le state "invisible" avant */
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                e.target.classList.add("visible");
              });
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: options?.threshold ?? 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.delay, options?.threshold]);

  return ref;
}
