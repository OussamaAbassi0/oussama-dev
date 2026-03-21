"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ARTICLES, Lang } from "@/lib/articles";
import Navbar from "@/components/layout/Navbar";

const LANG_LABELS: Record<Lang, string> = { fr:"FR", en:"EN", ar:"AR", es:"ES" };
const LANG_FLAGS:  Record<Lang, string> = { fr:"🇫🇷", en:"🇬🇧", ar:"🇸🇦", es:"🇪🇸" };
const validLangs: Lang[] = ["fr","en","ar","es"];

function BlogContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") ?? "fr") as Lang;
  const activeLang = validLangs.includes(lang) ? lang : "fr";

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingTop:"80px" }}>
      <Navbar />
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"24px 24px 0" }}>
        <Link href="/" style={{
          fontFamily:"'Courier New',monospace", fontSize:"12px",
          color:"rgba(0,229,255,.5)", textDecoration:"none",
        }}>
          ← Retour au site
        </Link>
      </div>

      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"40px 24px 100px" }}>

        {/* Header */}
        <div style={{ marginBottom:"48px" }}>
          <p style={{ fontFamily:"'Courier New',monospace", fontSize:"11px", color:"var(--cyan)", letterSpacing:".2em", textTransform:"uppercase", marginBottom:"12px" }}>
            // Blog & Ressources
          </p>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(28px,5vw,48px)", color:"white", lineHeight:1.1, marginBottom:"16px" }}>
            Automatisation, IA<br />
            <span style={{ color:"var(--cyan)" }}>& résultats concrets.</span>
          </h1>
          <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", maxWidth:"480px", lineHeight:1.65 }}>
            Des articles pratiques basés sur de vrais projets clients. Pas de théorie — des systèmes qui tournent en production.
          </p>
        </div>

        {/* Sélecteur de langue */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"40px" }}>
          {validLangs.map(l => (
            <Link key={l} href={`/blog?lang=${l}`} style={{
              padding:"6px 16px",
              background:     activeLang===l ? "var(--cyan)" : "rgba(255,255,255,.05)",
              color:          activeLang===l ? "var(--bg)"   : "rgba(255,255,255,.5)",
              border:         `1px solid ${activeLang===l ? "var(--cyan)" : "rgba(255,255,255,.1)"}`,
              borderRadius:   "20px",
              fontFamily:     "'Courier New',monospace", fontSize:"12px",
              fontWeight:     activeLang===l ? 700 : 400,
              textDecoration: "none", transition:"all .2s",
            }}>
              {LANG_FLAGS[l]} {LANG_LABELS[l]}
            </Link>
          ))}
        </div>

        {/* Articles */}
        <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          {ARTICLES.map(article => {
            const t = article[activeLang];
            const isRTL = activeLang === "ar";
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  display:"block", background:"#07090f",
                  border:"1px solid rgba(255,255,255,.07)",
                  borderRadius:"14px", padding:"28px 32px",
                  textDecoration:"none", transition:"border-color .2s, box-shadow .2s, transform .2s",
                  direction: isRTL ? "rtl" : "ltr",
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
                    {article.tag}
                  </span>
                  <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.25)" }}>
                    {new Date(article.date).toLocaleDateString(activeLang === "ar" ? "ar-SA" : activeLang, { year:"numeric", month:"long", day:"numeric" })}
                  </span>
                  <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.25)" }}>
                    · {article.readTime}
                  </span>
                </div>

                <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(16px,2vw,20px)", color:"white", lineHeight:1.3, marginBottom:"10px" }}>
                  {t.title}
                </h2>

                <p style={{ fontFamily:"Arial,sans-serif", fontSize:"14px", color:"rgba(255,255,255,.5)", lineHeight:1.65 }}>
                  {t.excerpt}
                </p>

                <div style={{ marginTop:"16px", fontFamily:"'Courier New',monospace", fontSize:"12px", color:article.tagColor, opacity:.8 }}>
                  {activeLang==="ar" ? "← اقرأ المقال" : activeLang==="es" ? "Leer el artículo →" : activeLang==="en" ? "Read article →" : "Lire l'article →"}
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
    <Suspense fallback={<div style={{ minHeight:"100vh", background:"var(--bg)" }} />}>
      <BlogContent />
    </Suspense>
  );
}
