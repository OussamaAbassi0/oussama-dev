"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { ARTICLES, Lang } from "@/lib/articles";
import Navbar from "@/components/layout/Navbar";

const validLangs: Lang[] = ["fr","en","ar","es"];

const READ_MORE: Record<string, string> = {
  fr: "Lire l'article →",
  en: "Read article →",
  ar: "← اقرأ المقال",
  es: "Leer el artículo →",
};

const HEADER: Record<string, { title: string; accent: string; sub: string; back: string }> = {
  fr: {
    title: "Automatisation, IA",
    accent: "& résultats concrets.",
    sub: "Des articles pratiques basés sur de vrais projets clients. Pas de théorie — des systèmes qui tournent en production.",
    back: "← Retour au site",
  },
  en: {
    title: "Automation, AI",
    accent: "& concrete results.",
    sub: "Practical articles based on real client projects. No theory — systems running in production.",
    back: "← Back to site",
  },
  ar: {
    title: "الأتمتة والذكاء الاصطناعي",
    accent: "& نتائج ملموسة.",
    sub: "مقالات عملية مبنية على مشاريع عملاء حقيقيين. لا نظرية — أنظمة تعمل في الإنتاج.",
    back: "العودة إلى الموقع ←",
  },
  es: {
    title: "Automatización, IA",
    accent: "& resultados concretos.",
    sub: "Artículos prácticos basados en proyectos reales de clientes. Sin teoría — sistemas en producción.",
    back: "← Volver al sitio",
  },
  nl: {
    title: "Automatisering, AI",
    accent: "& concrete resultaten.",
    sub: "Praktische artikelen gebaseerd op echte projecten. Geen theorie — systemen in productie.",
    back: "← Terug naar de site",
  },
};

function getLangFromStorage(): Lang {
  if (typeof window === "undefined") return "fr";
  const saved = localStorage.getItem("oussama_lang");
  return validLangs.includes(saved as Lang) ? (saved as Lang) : "fr";
}

function BlogContent() {
  const [lang, setLang] = useState<Lang>("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLang(getLangFromStorage());
    setMounted(true);

    /* Écoute les changements de langue depuis la Navbar */
    const onStorage = (e: StorageEvent) => {
      if (e.key === "oussama_lang" && e.newValue) {
        const newLang = e.newValue as Lang;
        if (validLangs.includes(newLang)) setLang(newLang);
      }
    };
    window.addEventListener("storage", onStorage);

    /* Event custom depuis LangContext — réponse instantanée */
    const onLangChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as Lang;
      if (detail && validLangs.includes(detail)) setLang(detail);
    };
    window.addEventListener("oussama_lang_change", onLangChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("oussama_lang_change", onLangChange);
    };
  }, []);

  const activeLang: Lang = validLangs.includes(lang) ? lang : "fr";
  const isRTL = activeLang === "ar";
  const h = HEADER[activeLang] ?? HEADER.fr;

  /* Évite le flash français avant hydratation */
  if (!mounted) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }} />
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingTop:"80px" }}>
      <Navbar />

      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"24px 24px 0" }}>
        <Link href="/" style={{
          fontFamily:"'Courier New',monospace", fontSize:"12px",
          color:"rgba(0,229,255,.5)", textDecoration:"none",
        }}>
          {h.back}
        </Link>
      </div>

      <div style={{
        maxWidth:"900px", margin:"0 auto", padding:"40px 24px 100px",
        direction: isRTL ? "rtl" : "ltr",
      }}>
        {/* Header */}
        <div style={{ marginBottom:"48px" }}>
          <p style={{
            fontFamily:"'Courier New',monospace", fontSize:"11px",
            color:"var(--cyan)", letterSpacing:".2em", textTransform:"uppercase", marginBottom:"12px",
          }}>
            // Blog & Ressources
          </p>
          <h1 style={{
            fontFamily:"'Syne',sans-serif", fontWeight:800,
            fontSize:"clamp(28px,5vw,48px)", color:"white", lineHeight:1.1, marginBottom:"16px",
          }}>
            {h.title}<br />
            <span style={{ color:"var(--cyan)" }}>{h.accent}</span>
          </h1>
          <p style={{
            fontFamily:"Arial,sans-serif", fontSize:"15px",
            color:"rgba(255,255,255,.5)", maxWidth:"480px", lineHeight:1.65,
          }}>
            {h.sub}
          </p>
        </div>

        {/* Articles */}
        <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          {ARTICLES.map(article => {
            const t = article[activeLang] ?? article.fr;
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  display:"block", background:"#07090f",
                  border:"1px solid rgba(255,255,255,.07)",
                  borderRadius:"14px", padding:"28px 32px",
                  textDecoration:"none",
                  transition:"border-color .2s, box-shadow .2s, transform .2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${article.tagColor}40`;
                  el.style.boxShadow   = `0 8px 32px ${article.tagColor}10`;
                  el.style.transform   = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,.07)";
                  el.style.boxShadow   = "none";
                  el.style.transform   = "translateY(0)";
                }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px", flexWrap:"wrap" }}>
                  <span style={{
                    fontFamily:"'Courier New',monospace", fontSize:"10px",
                    color:article.tagColor, background:`${article.tagColor}15`,
                    border:`1px solid ${article.tagColor}25`,
                    borderRadius:"20px", padding:"3px 10px", letterSpacing:".06em",
                  }}>
                    {article.tagI18n?.[activeLang] ?? article.tag}
                  </span>
                  <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.25)" }}>
                    {new Date(article.date).toLocaleDateString(
                      activeLang === "ar" ? "ar-SA" : activeLang,
                      { year:"numeric", month:"long", day:"numeric" }
                    )}
                  </span>
                  <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.25)" }}>
                    · {article.readTime}
                  </span>
                </div>

                <h2 style={{
                  fontFamily:"'Syne',sans-serif", fontWeight:700,
                  fontSize:"clamp(16px,2vw,20px)", color:"white",
                  lineHeight:1.3, marginBottom:"10px",
                }}>
                  {t.title}
                </h2>

                <p style={{
                  fontFamily:"Arial,sans-serif", fontSize:"14px",
                  color:"rgba(255,255,255,.5)", lineHeight:1.65,
                }}>
                  {t.excerpt}
                </p>

                <div style={{
                  marginTop:"16px", fontFamily:"'Courier New',monospace",
                  fontSize:"12px", color:article.tagColor, opacity:.8,
                }}>
                  {READ_MORE[activeLang]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight:"100vh", background:"var(--bg)" }} />
    }>
      <BlogContent />
    </Suspense>
  );
}
