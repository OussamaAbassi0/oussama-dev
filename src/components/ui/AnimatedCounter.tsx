"use client";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

export default function AnimatedCounter({
  target, suffix = "", duration = 2000,
}: { target: number; suffix?: string; duration?: number }) {
  const { count, ref } = useAnimatedCounter(target, duration);
  return <span ref={ref}>{count.toLocaleString("fr-FR")}{suffix}</span>;
}
