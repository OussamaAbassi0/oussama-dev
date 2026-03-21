"use client";
import Link from "next/link";
import { Article, Lang } from "@/lib/articles";

const LANG_LABELS: Record<Lang, string> = { fr:"🇫🇷 FR", en:"🇬🇧 EN", ar:"🇸🇦 AR", es:"🇪🇸 ES" };
const validLangs: Lang[] = ["fr","en","ar","es"];

function renderMarkdown(md: string): string {
  return md.trim()
    .replace(/^# (.+)$/gm, '<h1 style="font-family:\'Syne\',sans-serif;font-weight:800;font-size:clamp(24px,4vw,38px);color:white;line-height:1.15;margin:0 0 24px">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family:\'Syne\',sans-serif;font-weight:700;font-size:clamp(18px,2.5vw,24px);color:white;line-height:1.25;margin:40px 0 14px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-family:\'Syne\',sans-serif;font-weight:600;font-size:17px;color:rgba(255,255,255,.85);margin:28px 0 10px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:white;font-weight:700">$1</strong>')
    .replace(/```[\s\S]*?```/g, (m) => {
      const code = m.replace(/```[a-z]*\n?/g, "").trim();
      return `<pre style="background:#060a12;border:1px solid rgba(0,255,200,.12);border-radius:8px;padding:16px 20px;overflow-x:auto;margin:20px 0;font-family:'Courier New',monospace;font-size:13px;color:#00ffc8;line-height:1.6">${code}</pre>`;
    })
    .replace(/`(.+?)`/g, '<code style="background:rgba(0,255,200,.08);border:1px solid rgba(0,255,200,.15);border-radius:4px;padding:2px 6px;font-family:\'Courier New\',monospace;font-size:12px;color:#00ffc8">$1</code>')
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g, (_, header, rows) => {
      const ths = header.split("|").filter(Boolean).map((h: string) =>
        `<th style="padding:10px 16px;text-align:left;font-family:'Courier New',monospace;font-size:11px;color:rgba(0,255,200,.7);font-weight:700;letter-spacing:.06em;border-bottom:1px solid rgba(0,255,200,.15);text-transform:uppercase">${h.trim()}</th>`
      ).join("");
      const trs = rows.trim().split("\n").map((row: string) => {
        const tds = row.split("|").filter(Boolean).map((d: string) =>
          `<td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.05)">${d.trim()}</td>`
        ).join("");
        return `<tr>${tds}</tr>`;
      }).join("");
      return `<div style="overflow-x:auto;margin:24px 0"><table style="width:100%;border-collapse:collapse;background:#07090f;border:1px solid rgba(255,255,255,.07);border-radius:10px;overflow:hidden"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
    })
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--cyan);text-decoration:underline;text-underline-offset:3px">$1</a>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin:32px 0"/>')
    .replace(/\n\n(?!<)/g, '</p><p style="font-family:Arial,sans-serif;font-size:15px;color:rgba(255,255,255,.6);line-height:1.8;margin:0 0 16px">')
    .replace(/^(?!<)/, '<p style="font-family:Arial,sans-serif;font-size:15px;color:rgba(255,255,255,.6);line-height:1.8;margin:0 0 16px">')
    + "</p>";
}

export default function ArticleClient({
  article,
  lang,
  slug,
}: {
  article: Article;
  lang: Lang;
  slug: string;
}) {
  const t     = article[lang];
  const isRTL = lang === "ar";

  const CTA_TEXT: Record<Lang, string> = {
    fr: "Vous voulez que je construise ça pour vous ?",
    en: "Want to build this for your business?",
    ar: "هل تريد بناء هذا لشركتك؟",
    es: "¿Quieres construir esto para tu empresa?",
  };
  const CTA_SUB: Record<Lang, string> = {
    fr: "Décrivez votre problème, je vous réponds avec un plan d'action concret sous 24h.",
    en: "Tell me your problem and I'll get back to you with a clear action plan within 24h.",
    ar: "أخبرني بمشكلتك وسأعود إليك بخطة عمل واضحة خلال 24 ساعة.",
    es: "Cuéntame tu problema y te respondo con un plan de acción claro en 24h.",
  };
  const CTA_BTN: Record<Lang, string> = {
    fr: "Démarrer mon projet →",
    en: "Start your project →",
    ar: "ابدأ مشروعك ←",
    es: "Iniciar proyecto →",
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingTop:"80px" }}>

      {/* Nav top */}
      <div style={{
        maxWidth:"760px", margin:"0 auto", padding:"24px 24px 0",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:"12px",
      }}>
        <Link href={`/blog?lang=${lang}`} style={{
          fontFamily:"'Courier New',monospace", fontSize:"12px",
          color:"rgba(0,229,255,.5)", textDecoration:"none",
        }}>
          ← Tous les articles
        </Link>

        {/* Sélecteur de langue */}
        <div style={{ display:"flex", gap:"6px" }}>
          {validLangs.map(l => (
            <Link key={l} href={`/blog/${slug}?lang=${l}`} style={{
              padding:        "4px 12px",
              background:     lang===l ? "var(--cyan)" : "rgba(255,255,255,.05)",
              color:          lang===l ? "var(--bg)"   : "rgba(255,255,255,.4)",
              border:         `1px solid ${lang===l ? "var(--cyan)" : "rgba(255,255,255,.1)"}`,
              borderRadius:   "20px",
              fontFamily:     "'Courier New',monospace", fontSize:"11px",
              fontWeight:     lang===l ? 700 : 400,
              textDecoration: "none", transition:"all .2s",
            }}>
              {LANG_LABELS[l]}
            </Link>
          ))}
        </div>
      </div>

      {/* Article */}
      <article style={{
        maxWidth:"760px", margin:"0 auto",
        padding:"40px 24px 100px",
        direction: isRTL ? "rtl" : "ltr",
      }}>
        {/* Meta */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"24px", flexWrap:"wrap" }}>
          <span style={{
            fontFamily:"'Courier New',monospace", fontSize:"10px",
            color:article.tagColor, background:`${article.tagColor}15`,
            border:`1px solid ${article.tagColor}25`,
            borderRadius:"20px", padding:"3px 10px", letterSpacing:".06em",
          }}>
            {article.tag}
          </span>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.3)" }}>
            {new Date(article.date).toLocaleDateString(
              lang === "ar" ? "ar-SA" : lang,
              { year:"numeric", month:"long", day:"numeric" }
            )}
          </span>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.3)" }}>
            · {article.readTime}
          </span>
        </div>

        {/* Contenu */}
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(t.content) }} />

        {/* CTA bas */}
        <div style={{
          marginTop:"64px", padding:"32px",
          background:"rgba(0,255,200,.05)",
          border:"1px solid rgba(0,255,200,.15)",
          borderRadius:"14px",
          textAlign: isRTL ? "right" : "left",
        }}>
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"18px", color:"white", marginBottom:"8px" }}>
            {CTA_TEXT[lang]}
          </p>
          <p style={{ fontFamily:"Arial,sans-serif", fontSize:"14px", color:"rgba(255,255,255,.5)", marginBottom:"20px" }}>
            {CTA_SUB[lang]}
          </p>
          <Link href="/#cta" style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"12px 28px", background:"var(--cyan)", color:"var(--bg)",
            fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:"13px",
            borderRadius:"8px", textDecoration:"none", letterSpacing:".04em",
          }}>
            {CTA_BTN[lang]}
          </Link>
        </div>
      </article>
    </div>
  );
}
