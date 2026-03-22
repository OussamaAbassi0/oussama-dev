"use client";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

import { useLang } from "@/lib/LangContext";

export default function AnimatedCounter({
  target, suffix = "", duration = 2000,
}: { target: number; suffix?: string; duration?: number }) {
  const { count, ref } = useAnimatedCounter(target, duration);
  const { lang } = useLang();
  /* Locale par langue — évite l'affichage "0" en RTL */
  const locale = lang === "ar" ? "ar-SA" : lang === "nl" ? "nl-NL" : lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "fr-FR";
  return <span ref={ref}>{count.toLocaleString(locale)}{suffix}</span>;
}
