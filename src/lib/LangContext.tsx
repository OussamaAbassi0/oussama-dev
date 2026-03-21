"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SiteLang, LANGS } from "@/lib/i18n";
import t from "@/lib/i18n";

const STORAGE_KEY = "oussama_lang";

interface LangContextType {
  lang:    SiteLang;
  setLang: (l: SiteLang) => void;
  t:       typeof t["fr"];
  dir:     "ltr" | "rtl";
}

const LangContext = createContext<LangContextType>({
  lang:    "fr",
  setLang: () => {},
  t:       t["fr"],
  dir:     "ltr",
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SiteLang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as SiteLang | null;
    if (saved && LANGS.find(l => l.code === saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: SiteLang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    /* Direction RTL pour l'arabe */
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  /* Appliquer la direction au montage */
  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const dir = LANGS.find(l => l.code === lang)?.dir ?? "ltr";

  return (
    <LangContext.Provider value={{ lang, setLang, t: t[lang], dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
