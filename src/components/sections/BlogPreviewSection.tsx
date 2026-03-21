"use client";
import Link from "next/link";
import { useFadeIn } from "@/hooks/useFadeIn";
import { ARTICLES } from "@/lib/articles";
import { useLang } from "@/lib/LangContext";

export default function BlogPreviewSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { t, lang } = useLang();

  return (
    <section id="blog" style={{ padding:"100px 24px", background:"var(--bg)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth:"1100px", margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"16px", marginBottom:"48px" }}>
          <div>
            <p className="section-label">{t.blog.label}</p>
            <h2 className="section-title">
              {t.blog.title1}<br />
              <span className="text-cyan">{t.blog.title2}</span>
            </h2>
            <p style={{ fontFamily:"Arial,sans-serif", fontSize:"15px", color:"rgba(255,255,255,.5)", maxWidth:"420px", lineHeight:1.65 }}>
              {t.blog.subtitle}
            </p>
          </div>
          <Link href="/blog" style={{
            padding:"10px 24px",
            background:"transparent",
            color:"var(--cyan)",
            fontFamily:"'Courier New',monospace",
            fontSize:"12px",
            border:"1px solid rgba(0,255,200,.25)",
            borderRadius:"8px",
            textDecoration:"none",
            transition:"all .2s",
            whiteSpace:"nowrap",
            flexShrink:0,
          }}
            onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(0,255,200,.08)"; el.style.borderColor="rgba(0,255,200,.5)"; }}
            onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor="rgba(0,255,200,.25)"; }}
          >
            {t.blog.viewAll}
          </Link>
        </div>

        {/* 3 cartes articles */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px",
        }}>
          {ARTICLES.map((article, i) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={`fade-in stagger-${i + 1}`}
              style={{
                display:"flex",
                flexDirection:"column",
                background:"#07090f",
                border:"1px solid rgba(255,255,255,.07)",
                borderRadius:"14px",
                padding:"28px 24px",
                textDecoration:"none",
                transition:"border-color .25s, box-shadow .25s, transform .25s",
                height:"100%",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${article.tagColor}40`;
                el.style.boxShadow   = `0 12px 40px ${article.tagColor}12`;
                el.style.transform   = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,.07)";
                el.style.boxShadow   = "none";
                el.style.transform   = "translateY(0)";
              }}
            >
              {/* Tag + durée */}
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
                <span style={{
                  fontFamily:"'Courier New',monospace", fontSize:"10px",
                  color:article.tagColor, background:`${article.tagColor}15`,
                  border:`1px solid ${article.tagColor}25`,
                  borderRadius:"20px", padding:"3px 10px", letterSpacing:".06em",
                }}>
                  {article.tag}
                </span>
                <span style={{ fontFamily:"'Courier New',monospace", fontSize:"10px", color:"rgba(255,255,255,.25)" }}>
                  {article.readTime}
                </span>
              </div>

              {/* Titre */}
              <h3 style={{
                fontFamily:"'Syne',sans-serif", fontWeight:700,
                fontSize:"16px", color:"white",
                lineHeight:1.35, marginBottom:"12px", flex:1,
              }}>
                {(article[lang as keyof typeof article] as any)?.title ?? article.fr.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontFamily:"Arial,sans-serif", fontSize:"13px",
                color:"rgba(255,255,255,.45)", lineHeight:1.65,
                marginBottom:"20px",
                display:"-webkit-box",
                WebkitLineClamp:3,
                WebkitBoxOrient:"vertical" as const,
                overflow:"hidden",
              }}>
                {(article[lang as keyof typeof article] as any)?.excerpt ?? article.fr.excerpt}
              </p>

              {/* Lire */}
              <div style={{
                display:"flex", alignItems:"center", gap:"6px",
                fontFamily:"'Courier New',monospace", fontSize:"11px",
                color:article.tagColor, opacity:.8,
                marginTop:"auto",
              }}>
                {t.blog.readMore}
              </div>

              {/* Ligne décorative bas */}
              <div style={{
                position:"absolute",
                bottom:0, left:"15%", right:"15%", height:"1px",
                background:`linear-gradient(90deg,transparent,${article.tagColor}30,transparent)`,
              }} />
            </Link>
          ))}
        </div>

        {/* Langues disponibles */}
        <div style={{
          marginTop:"32px", textAlign:"center",
          fontFamily:"'Courier New',monospace", fontSize:"11px",
          color:"rgba(255,255,255,.25)",
        }}>
          📖 {t.blog.available}{" "}
          {["🇫🇷 Français","🇬🇧 English","🇸🇦 العربية","🇪🇸 Español","🇳🇱 Nederlands"].map((l, i, arr) => (
            <span key={l}>
              <span style={{ color:"rgba(255,255,255,.45)" }}>{l}</span>
              {i < arr.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
