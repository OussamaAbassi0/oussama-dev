"use client";
import { useState } from "react";
import Navbar               from "@/components/layout/Navbar";
import Footer               from "@/components/layout/Footer";
import HeroSection          from "@/components/sections/HeroSection";
import HowItWorksSection    from "@/components/sections/HowItWorksSection";
import ProjectsSection      from "@/components/sections/ProjectsSection";
import LeadHunterSection    from "@/components/sections/LeadHunterSection";
import WorkflowSection      from "@/components/sections/WorkflowSection";
import ROICalculatorSection from "@/components/sections/ROICalculatorSection";
import PersonalizedROI      from "@/components/sections/PersonalizedROI";
import BlueprintGenerator   from "@/components/sections/BlueprintGenerator";
import AuditSection         from "@/components/sections/AuditSection";
import WorkflowGallery      from "@/components/sections/WorkflowGallery";
import MaturityQuiz         from "@/components/sections/MaturityQuiz";
import StackSection         from "@/components/sections/StackSection";
import TestimonialsSection  from "@/components/sections/TestimonialsSection";
import FAQSection           from "@/components/sections/FAQSection";
import AboutSection         from "@/components/sections/AboutSection";
import CTASection           from "@/components/sections/CTASection";
import AIClone              from "@/components/ui/AIClone";
import LiveActivityFeed     from "@/components/ui/LiveActivityFeed";
import WelcomeBanner        from "@/components/ui/WelcomeBanner";
import ScrollProgressBar    from "@/components/ui/ScrollProgressBar";
import LiveStatsCounter     from "@/components/ui/LiveStatsCounter";

function Scanline() {
  return (
    <div aria-hidden style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", zIndex: 100, opacity: 0.15, pointerEvents: "none",
      background: "linear-gradient(90deg, transparent, #00ffc8, transparent)",
      animation: "scanline 6s linear infinite",
    }} />
  );
}

export default function HomePage() {
  const [briefOpen,    setBriefOpen   ] = useState(false);
  const [prefillBrief, setPrefillBrief] = useState<string | undefined>();

  const openBrief = (prefill?: string) => {
    if (prefill) setPrefillBrief(prefill);
    setBriefOpen(true);
  };

  return (
    <>
      {/* ── UI globale fixed ── */}
      <ScrollProgressBar />
      <Scanline />
      <Navbar />
      <WelcomeBanner />
      <LiveStatsCounter />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Comment ça marche — 3 étapes claires */}
        <HowItWorksSection />

        {/* 3. Projets SaaS — preuves */}
        <ProjectsSection />

        {/* 4. Outils interactifs */}
        <LeadHunterSection />
        <WorkflowSection />

        {/* 5. ROI Calculator générique */}
        <ROICalculatorSection onOpenBrief={() => openBrief()} />

        {/* 6. Simulateur ROI personnalisé par profil */}
        <PersonalizedROI onOpenBrief={() => openBrief()} />

        {/* 7. Blueprint + Audit */}
        <BlueprintGenerator />
        <AuditSection />

        {/* 8. Galerie workflows — pré-remplissage brief */}
        <WorkflowGallery onOpenBrief={openBrief} />

        {/* 9. Quiz de maturité + Roadmap */}
        <MaturityQuiz onOpenBrief={() => openBrief()} />

        {/* 10. Stack tech */}
        <StackSection />

        {/* 11. Témoignages */}
        <TestimonialsSection />

        {/* 12. FAQ */}
        <FAQSection />

        {/* 13. À propos */}
        <AboutSection />

        {/* 14. CTA final */}
        <CTASection
          briefOpen={briefOpen}
          onBriefOpenChange={setBriefOpen}
          prefillProblem={prefillBrief}
        />
      </main>

      <Footer />
      <AIClone />
      <LiveActivityFeed />
    </>
  );
}
