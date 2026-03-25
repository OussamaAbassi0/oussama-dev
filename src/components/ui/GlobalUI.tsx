"use client";
import ProactiveChat from "@/components/ui/ProactiveChat";

/* ─────────────────────────────────────────────────────────
   GlobalUI — composants client présents sur TOUTES les pages
   Importé depuis le RootLayout (Server Component).
   Ajouter ici tout composant global : chat, cookies, etc.
───────────────────────────────────────────────────────── */
export default function GlobalUI() {
  return <ProactiveChat />;
}
