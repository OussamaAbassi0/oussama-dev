"use client";
import { useState } from "react";
import Link from "next/link";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useLang } from "@/lib/LangContext";

const FAQS: { q: Record<string, string>; a: Record<string, string> }[] = [
  {
    q: {
      fr: "Travaillez-vous seul ?",
      en: "Do you work alone?",
    },
    a: {
      fr: "Oui, je travaille seul sur chaque projet. C'est un avantage concret : vous avez un interlocuteur unique, une communication directe, et aucune réunion de coordination inutile. Vous savez exactement qui fait quoi. Pour des projets très larges, je peux faire appel à des partenaires de confiance ponctuellement — mais vous restez toujours mon seul point de contact.",
      en: "Yes, I work alone on every project. This is a concrete advantage: one point of contact, direct communication, no unnecessary coordination meetings. You know exactly who does what. For very large projects, I may occasionally bring in trusted partners — but you always have me as your single point of contact.",
    },
  },
  {
    q: {
      fr: "Quel délai ?",
      en: "What are your turnaround times?",
    },
    a: {
      fr: "Ça dépend du type de projet :\n• Automatisation n8n simple : quelques heures à 1 jour maximum\n• Workflow complexe ou intégration multi-outils : 1 à 2 jours\n• Agent IA avec logique métier : 2 à 4 jours\n• SaaS full-stack ou plateforme web : quelques semaines\n\nJe communique toujours un délai précis avant de démarrer, et je le respecte.",
      en: "It depends on the project type:\n• Simple n8n automation: a few hours to 1 day max\n• Complex workflow or multi-tool integration: 1–2 days\n• AI agent with business logic: 2–4 days\n• Full-stack SaaS or web platform: a few weeks\n\nI always communicate a precise deadline before starting, and I stick to it.",
    },
  },
  {
    q: {
      fr: "Garanties ?",
      en: "What guarantees do you offer?",
    },
    a: {
      fr: "Plusieurs garanties concrètes :\n• Révisions illimitées jusqu'à votre satisfaction totale\n• Le livrable doit correspondre exactement au brief validé au départ\n• Si quelque chose ne fonctionne pas après livraison, je corrige sans supplément\n• Suivi de 30 jours inclus sur les automatisations\n• Vous ne payez pas pour un travail qui ne vous convient pas",
      en: "Several concrete guarantees:\n• Unlimited revisions until your complete satisfaction\n• The deliverable must exactly match the validated brief\n• If something stops working after delivery, I fix it at no extra cost\n• 30-day follow-up included on automations\n• You don't pay for work that doesn't meet your expectations",
    },
  },
  {
    q: {
      fr: "NDA ?",
      en: "NDA?",
    },
    a: {
      fr: "Oui, je signe un accord de confidentialité (NDA) sur demande, avant de démarrer la moindre discussion sur votre projet. Vos données, processus internes, idées et informations business restent strictement confidentiels. C'est une pratique standard que j'applique systématiquement quand c'est demandé.",
      en: "Yes, I sign a Non-Disclosure Agreement (NDA) on request, before any discussion about your project begins. Your data, internal processes, ideas, and business information remain strictly confidential. This is a standard practice I apply systematically when requested.",
    },
  },
  {
    q: {
      fr: "Quel budget minimum ?",
      en: "What's the minimum budget?",
    },
    a: {
      fr: "Cela dépend du scope :\n• Automatisation n8n simple : à partir de 150–300 €\n• Workflow complexe ou agent IA : à partir de 500 €\n• SaaS full-stack : à partir de 1 500 €\n\nChaque devis est gratuit, sans engagement et sans pression. Si votre budget est limité, dites-le — on trouve souvent une solution adaptée au périmètre.",
      en: "It depends on the scope:\n• Simple n8n automation: from €150–300\n• Complex workflow or AI agent: from €500\n• Full-stack SaaS: from €1,500\n\nEvery quote is free, no commitment, no pressure. If your budget is limited, just say so — we can often find a solution that fits.",
    },
  },
];

export default function FAQSection() {
  const ref = useFadeIn<HTMLDivElement>();
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const l = (o: Record<string, string>) => o[lang] ?? o.fr;

  return (
    <section id="faq" style={{ padding: "100px 24px", background: "var(--bg2)" }}>
      <style>{`
        @keyframes faqOpen {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div ref={ref} className="fade-in" style={{ maxWidth: "780px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p className="section-label" style={{ display: "flex", justifyContent: "center" }}>
            // FAQ
          </p>
          <h2 style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "clamp(26px,4vw,38px)", color: "white", lineHeight: 1.2 }}>
            {l({ fr: "Les questions", en: "The questions" })}<br />
            <span style={{ color: "var(--cyan)" }}>{l({ fr: "qu'on me pose toujours.", en: "I always get asked." })}</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const answer = l(faq.a);
            return (
              <div key={i} style={{
                background:   isOpen ? "#0a0f1a" : "#07090f",
                border:       `1px solid ${isOpen ? "rgba(0,229,255,.25)" : "rgba(255,255,255,.07)"}`,
                borderRadius: "10px", overflow: "hidden",
                transition:   "border-color .2s, background .2s",
              }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: "16px",
                    padding: "18px 22px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--sans)", fontSize: "15px",
                    fontWeight: 600, color: isOpen ? "white" : "rgba(255,255,255,.8)",
                    lineHeight: 1.4, transition: "color .2s",
                  }}>
                    {l(faq.q)}
                  </span>
                  <span style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background:   isOpen ? "rgba(0,229,255,.15)" : "rgba(255,255,255,.05)",
                    border:       `1px solid ${isOpen ? "rgba(0,229,255,.3)" : "rgba(255,255,255,.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontFamily: "var(--mono)", fontSize: "14px",
                    color: isOpen ? "var(--cyan)" : "rgba(255,255,255,.4)",
                    transition: "all .2s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 22px 18px", animation: "faqOpen .2s ease" }}>
                    <div style={{ height: "1px", background: "rgba(0,229,255,.08)", marginBottom: "14px" }} />
                    {answer.includes("\n") ? (
                      <div>
                        {answer.split("\n").map((line, j) => (
                          <p key={j} style={{
                            fontFamily: "var(--sans)", fontSize: "14px",
                            color: line.startsWith("•") ? "rgba(255,255,255,.65)" : "rgba(255,255,255,.5)",
                            lineHeight: 1.7, margin: "0 0 4px",
                            paddingLeft: line.startsWith("•") ? "8px" : "0",
                          }}>
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,.6)", lineHeight: 1.75, margin: 0 }}>
                        {answer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: "36px", textAlign: "center", padding: "28px",
          background: "rgba(0,229,255,.04)", border: "1px solid rgba(0,229,255,.1)",
          borderRadius: "12px",
        }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,.5)", marginBottom: "16px" }}>
            {l({ fr: "Une autre question ?", en: "Another question?" })}
          </p>
          <Link href="/#cta" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 22px", background: "var(--cyan)", color: "var(--bg)",
            fontFamily: "var(--mono)", fontWeight: 700, fontSize: "12px",
            borderRadius: "6px", textDecoration: "none", letterSpacing: ".04em",
          }}>
            {l({ fr: "Me contacter directement →", en: "Contact me directly →" })}
          </Link>
        </div>
      </div>
    </section>
  );
}
