"use client";
import { useState } from "react";

/* ── Layout ─────────────────────────────────────────────── */
import Navbar            from "@/components/layout/Navbar";
import Footer            from "@/components/layout/Footer";

/* ── Sections principales ───────────────────────────────── */
import HeroSection           from "@/components/sections/HeroSection";
import HowItWorksSection     from "@/components/sections/HowItWorksSection";
import BeforeAfterSection    from "@/components/sections/BeforeAfterSection";
import ProjectsSection       from "@/components/sections/ProjectsSection";
import CaseStudiesSection    from "@/components/sections/CaseStudiesSection";
import DeliveryTimeline      from "@/components/sections/DeliveryTimeline";

/* ── Outils interactifs (Lab) ────────────────────────────── */
import LeadHunterSection     from "@/components/sections/LeadHunterSection";
import WorkflowSection       from "@/components/sections/WorkflowSection";
import ROICalculatorSection  from "@/components/sections/ROICalculatorSection";
import PersonalizedROI       from "@/components/sections/PersonalizedROI";
import BlueprintGenerator    from "@/components/sections/BlueprintGenerator";
import AuditSection          from "@/components/sections/AuditSection";

/* ── Conversion & confiance ──────────────────────────────── */
import WorkflowGallery       from "@/components/sections/WorkflowGallery";
import MaturityQuiz          from "@/components/sections/MaturityQuiz";
import StackSection          from "@/components/sections/StackSection";
import TestimonialsSection   from "@/components/sections/TestimonialsSection";
import FAQSection            from "@/components/sections/FAQSection";
import AboutSection          from "@/components/sections/AboutSection";
import CTASection            from "@/components/sections/CTASection";

/* ── UI globale (fixed / overlay) ───────────────────────── */
import ScrollProgressBar  from "@/components/ui/ScrollProgressBar";
import WelcomeBanner      from "@/components/ui/WelcomeBanner";
import LiveStatsCounter   from "@/components/ui/LiveStatsCounter";
import LiveActivityFeed   from "@/components/ui/LiveActivityFeed";
import ProactiveChat      from "@/components/ui/ProactiveChat";

/* ══════════════════════════════════════════════════════════
   SCANLINE décorative
══════════════════════════════════════════════════════════ */
function Scanline() {
  return (
    <div aria-hidden style={{
      position:"fixed", top:0, left:0, right:0, height:"2px",
      zIndex:100, opacity:.12, pointerEvents:"none",
      background:"linear-gradient(90deg,transparent,#00ffc8,transparent)",
      animation:"scanline 6s linear infinite",
    }} />
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [briefOpen,    setBriefOpen   ] = useState(false);
  const [prefillBrief, setPrefillBrief] = useState<string|undefined>();

  const openBrief = (prefill?: string) => {
    if (prefill) setPrefillBrief(prefill);
    setBriefOpen(true);
  };

  return (
    <>
      {/* ════════════════════════════════════════
          UI GLOBALE — fixed, toujours visible
      ════════════════════════════════════════ */}
      <ScrollProgressBar />
      <Scanline />
      <Navbar />
      <WelcomeBanner />
      <LiveStatsCounter />
      <LiveActivityFeed />
      <ProactiveChat />

      {/* ════════════════════════════════════════
          CONTENU PRINCIPAL
      ════════════════════════════════════════ */}
      <main>

        {/* ── BLOC 1 : ACCROCHE ───────────────────
            Capturer l'attention immédiatement.
            Qui est Oussama, pourquoi venir ici.
        ─────────────────────────────────────── */}
        <HeroSection />

        {/* ── BLOC 2 : COMPRENDRE ─────────────────
            Expliquer le processus simplement.
            Réduire l'anxiété du "comment ça marche".
        ─────────────────────────────────────── */}
        <HowItWorksSection />

        {/* ── BLOC 3 : CONVAINCRE VISUELLEMENT ───
            Montrer la différence avant/après.
            Preuves sociales et cas clients.
        ─────────────────────────────────────── */}
        <BeforeAfterSection />
        <CaseStudiesSection />
        <ProjectsSection />

        {/* ── BLOC 4 : TESTER (le Lab) ─────────────
            Laisser le visiteur expérimenter.
            La preuve par l'action.
        ─────────────────────────────────────── */}
        <LeadHunterSection />
        <WorkflowSection />
        <ROICalculatorSection onOpenBrief={() => openBrief()} />
        <PersonalizedROI     onOpenBrief={() => openBrief()} />
        <BlueprintGenerator />
        <AuditSection />

        {/* ── BLOC 5 : CHOISIR & PLANIFIER ────────
            Galerie de workflows prêts.
            Quiz de maturité et roadmap.
        ─────────────────────────────────────── */}
        <WorkflowGallery onOpenBrief={openBrief} />
        <MaturityQuiz    onOpenBrief={() => openBrief()} />

        {/* ── BLOC 6 : RASSURER ────────────────────
            Timeline de livraison claire.
            Stack technique.
        ─────────────────────────────────────── */}
        <DeliveryTimeline />
        <StackSection />

        {/* ── BLOC 7 : VALIDER ─────────────────────
            Témoignages clients.
            FAQ pour lever les dernières objections.
        ─────────────────────────────────────── */}
        <TestimonialsSection />
        <FAQSection />

        {/* ── BLOC 8 : CONTACT ─────────────────────
            Qui est Oussama (humain).
            Formulaire de brief.
        ─────────────────────────────────────── */}
        <AboutSection />
        <CTASection
          briefOpen={briefOpen}
          onBriefOpenChange={setBriefOpen}
          prefillProblem={prefillBrief}
        />

      </main>

      <Footer />
    </>
  );
}
