"use client";
import { Activity, Bus } from "lucide-react";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

const CASES = [
  {
    emoji: <Activity size={24} />,
    client: "Matys · PLATINUMAAA",
    platform: "Upwork",
    platformColor: "#14a800",
    date: { fr: "Mars 2026", en: "March 2026" },
    sector: { fr: "Secteur Médical", en: "Medical Sector" },
    color: "#00ffc8",
    before: {
      problem: {
        fr: "Traitement 100 % manuel des ordonnances PDF : téléchargement fichier par fichier, extraction des données à la main, risques d'erreurs élevés dans un contexte médical sensible.",
        en: "Fully manual PDF prescription processing: downloading files one by one, manually extracting data, with high error risk in a sensitive medical context.",
      },
      pain: {
        fr: ["Processus entièrement manuel", "Risque d'erreurs élevé", "Aucune traçabilité automatique", "Temps de traitement non scalable"],
        en: ["Fully manual process", "High error risk", "No automatic traceability", "Processing time not scalable"],
      },
    },
    solution: {
      fr: "MVP n8n + GPT-4o : réception automatique des ordonnances PDF → extraction structurée des données médicales → validation et traçabilité → export vers le système cible.",
      en: "n8n + GPT-4o MVP: automatic receipt of PDF prescriptions → structured medical data extraction → validation and traceability → export to target system.",
    },
    tools: ["n8n", "GPT-4o", "PDF parsing", "Webhook"],
    after: {
      results: {
        fr: ["Traitement automatisé bout en bout", "MVP livré dans les délais", "Extraction fiable des données médicales", "Solution documentée et maintenable"],
        en: ["End-to-end automated processing", "MVP delivered on time", "Reliable medical data extraction", "Documented and maintainable solution"],
      },
    },
    quote: {
      fr: "\"Oussama a été très efficace, sérieux et professionnel tout au long de la mission. Il a su comprendre rapidement le besoin, proposer une solution adaptée et avancer avec réactivité. La communication a été fluide, le travail bien exécuté. Je recommande vivement.\"",
      en: "\"Oussama was highly efficient, serious and professional throughout the project. He quickly understood the need, proposed the right solution and delivered fast. Communication was smooth, work well done. Highly recommended.\"",
    },
    stars: 5,
  },
  {
    emoji: <Bus size={24} />,
    client: "Mouna BAATOUT",
    platform: "Malt",
    platformColor: "#ff5e3a",
    date: { fr: "Fév. 2026", en: "Feb. 2026" },
    sector: { fr: "Transport & Logistique", en: "Transport & Logistics" },
    color: "#a78bfa",
    before: {
      problem: {
        fr: "Problème algorithmique complexe en Python nécessitant une expertise double : compréhension des enjeux métier du transport ET maîtrise des structures de données avancées.",
        en: "Complex Python algorithmic problem requiring dual expertise: understanding transport business logic AND mastery of advanced data structures.",
      },
      pain: {
        fr: ["Logique métier complexe à modéliser", "Performance algorithmique critique", "Peu de profils combinant algo + secteur", "Besoin d'une livraison fiable et rapide"],
        en: ["Complex business logic to model", "Critical algorithmic performance", "Few profiles combining algo + sector knowledge", "Need for reliable and fast delivery"],
      },
    },
    solution: {
      fr: "Ingénierie algorithmique Python : analyse des contraintes métier → conception de la structure de données → implémentation et optimisation des algorithmes → tests de performance.",
      en: "Python algorithmic engineering: analysis of business constraints → data structure design → algorithm implementation and optimization → performance testing.",
    },
    tools: ["Python", "Algorithmique", "Optimisation", "Data structures"],
    after: {
      results: {
        fr: ["Algorithmes performants et bien structurés", "Logique métier correctement modélisée", "Code maintenable et documenté", "Livraison dans les délais avec valeur ajoutée"],
        en: ["Performant and well-structured algorithms", "Business logic correctly modeled", "Maintainable and documented code", "On-time delivery with added value"],
      },
    },
    quote: {
      fr: "\"Je ne peux que le recommander à 100 %. Il comprend rapidement les enjeux business et techniques. Il ne se contente pas d'exécuter : il réfléchit et apporte une réelle valeur ajoutée.\"",
      en: "\"I can only recommend him 100%. He quickly understands both business and technical challenges. He doesn't just execute — he thinks and brings real added value.\"",
    },
    stars: 5,
  },
];

const LABELS: Record<string, {
  sectionLabel: string; title1: string; title2: string; subtitle: string;
  before: string; solution: string; after: string; verifiedBadge: string;
}> = {
  fr: {
    sectionLabel: "// Études de cas",
    title1: "2 clients réels.",
    title2: "Des résultats vérifiables.",
    subtitle: "Pas de clients fictifs. Pas de métriques inventées. Ce que vous lisez correspond exactement aux projets livrés.",
    before: "AVANT", solution: "SOLUTION", after: "RÉSULTATS",
    verifiedBadge: "Avis vérifié",
  },
  en: {
    sectionLabel: "// Case studies",
    title1: "2 real clients.",
    title2: "Verifiable results.",
    subtitle: "No fictional clients. No made-up metrics. What you read exactly matches the projects delivered.",
    before: "BEFORE", solution: "SOLUTION", after: "RESULTS",
    verifiedBadge: "Verified review",
  },
};

export default function CaseStudiesSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const tx = LABELS[lang] ?? LABELS.fr;
  const l = <T extends Record<string, string | string[]>>(o: T): string | string[] =>
    (o[lang] ?? o.fr) as string | string[];
  const ls = (o: Record<string, string>) => (o[lang] ?? o.fr) as string;
  const la = (o: Record<string, string[]>) => (o[lang] ?? o.fr) as string[];

  return (
    <section id="case-studies" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <div ref={ref} className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <p className="section-label">{tx.sectionLabel}</p>
        <h2 className="section-title">
          {tx.title1}<br />
          <span className="text-cyan">{tx.title2}</span>
        </h2>
        <p style={{ fontFamily: "Arial,sans-serif", fontSize: "15px", color: "rgba(255,255,255,.5)", marginBottom: "56px", maxWidth: "480px", lineHeight: 1.65 }}>
          {tx.subtitle}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {CASES.map((c, i) => (
            <div key={i} style={{
              background: "#07090f",
              border: `1px solid ${c.color}20`,
              borderRadius: "16px",
              overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{
                padding: "20px 28px",
                background: `linear-gradient(90deg, ${c.color}08, transparent)`,
                borderBottom: `1px solid ${c.color}15`,
                display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap",
              }}>
                <span style={{ display:"flex", color: c.color }}>{c.emoji}</span>
                <div>
                  <p style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "16px", color: "white", margin: 0 }}>{c.client}</p>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: `${c.color}80`, letterSpacing: ".1em", margin: 0 }}>
                    {ls(c.sector)} · {ls(c.date)}
                  </p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: c.stars }).map((_, k) => (
                      <span key={k} style={{ color: "#f5a623", fontSize: "14px" }}>★</span>
                    ))}
                  </div>
                  {/* Platform badge */}
                  <span style={{
                    padding: "3px 10px", borderRadius: "20px",
                    background: `${c.platformColor}14`, border: `1px solid ${c.platformColor}30`,
                    fontFamily: "var(--mono)", fontSize: "9px", color: c.platformColor, letterSpacing: ".1em", fontWeight: 700,
                  }}>
                    {c.platform}
                  </span>
                  <span style={{
                    padding: "3px 10px", borderRadius: "20px",
                    background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.2)",
                    fontFamily: "var(--mono)", fontSize: "9px", color: "#4ade80", letterSpacing: ".1em",
                  }}>
                    ✓ {tx.verifiedBadge}
                  </span>
                </div>
              </div>

              {/* 3 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
                {/* BEFORE */}
                <div style={{ padding: "24px", borderRight: "1px solid rgba(255,255,255,.05)" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#ff4d6d", letterSpacing: ".2em", marginBottom: "12px" }}>
                    ❌ {tx.before}
                  </p>
                  <p style={{ fontFamily: "Arial,sans-serif", fontSize: "12.5px", color: "rgba(255,255,255,.5)", lineHeight: 1.6, marginBottom: "14px" }}>
                    {ls(c.before.problem)}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {la(c.before.pain).map((p, j) => (
                      <div key={j} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "#ff4d6d", fontSize: "11px" }}>✗</span>
                        <span style={{ fontFamily: "Arial,sans-serif", fontSize: "12px", color: "rgba(255,255,255,.45)" }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOLUTION */}
                <div style={{ padding: "24px", borderRight: "1px solid rgba(255,255,255,.05)", background: `${c.color}04` }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: c.color, letterSpacing: ".2em", marginBottom: "12px" }}>
                    ⚙️ {tx.solution}
                  </p>
                  <p style={{ fontFamily: "Arial,sans-serif", fontSize: "12.5px", color: "rgba(255,255,255,.6)", lineHeight: 1.65, marginBottom: "14px" }}>
                    {ls(c.solution)}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {c.tools.map(tool => (
                      <span key={tool} style={{
                        fontFamily: "var(--mono)", fontSize: "9px",
                        color: `${c.color}80`, background: `${c.color}10`,
                        border: `1px solid ${c.color}20`,
                        borderRadius: "4px", padding: "2px 8px",
                      }}>{tool}</span>
                    ))}
                  </div>
                </div>

                {/* RESULTS */}
                <div style={{ padding: "24px" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "#4ade80", letterSpacing: ".2em", marginBottom: "12px" }}>
                    ✅ {tx.after}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {la(c.after.results).map((r, j) => (
                      <div key={j} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "#4ade80", fontSize: "11px" }}>✓</span>
                        <span style={{ fontFamily: "Arial,sans-serif", fontSize: "12px", color: "rgba(255,255,255,.75)", fontWeight: 500 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div style={{
                padding: "16px 28px",
                borderTop: `1px solid ${c.color}12`,
                background: `${c.color}05`,
                fontFamily: "Arial,sans-serif", fontSize: "13px",
                color: "rgba(255,255,255,.6)", fontStyle: "italic",
              }}>
                {ls(c.quote)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
