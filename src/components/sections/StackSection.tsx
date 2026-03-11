"use client";
import { useFadeIn } from "@/hooks/useFadeIn";

const STACK = [
  { cat: "Frontend",      items: ["Next.js", "React", "TailwindCSS", "Vercel"] },
  { cat: "IA & Agents",   items: ["Anthropic", "OpenAI", "CrewAI", "LangGraph", "RAG"] },
  { cat: "Automation",    items: ["n8n", "Make", "Webhooks", "Python", "Playwright"] },
  { cat: "Data & Lead Gen",items: ["Firecrawl", "Apollo", "Tavily", "Google Maps API"] },
  { cat: "Backend",       items: ["Prisma", "Neon (Postgres)", "Qdrant", "Resend", "API REST"] },
];

export default function StackSection() {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <section id="stack" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} ref={ref} className="fade-in">
        <p className="section-label">// Mon Écosystème Tech</p>
        <h2 className="section-title">
          Le Stack qui<br /><span className="text-cyan">fait tourner la magie</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "40px" }}>
          {STACK.map(s => (
            <div key={s.cat} className="glass glow-card" style={{ padding: "20px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--cyan)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
                {s.cat}
              </p>
              {s.items.map(item => (
                <div key={item} style={{
                  fontFamily: "var(--mono)", fontSize: "12px", color: "var(--text)",
                  padding: "7px 0", borderBottom: "1px solid rgba(0,255,200,0.08)",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <span style={{ color: "var(--cyan)", fontSize: "8px" }}>◆</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
