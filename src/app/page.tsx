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
import BlueprintGenerator   from "@/components/sections/BlueprintGenerator";
import AuditSection         from "@/components/sections/AuditSection";
import StackSection         from "@/components/sections/StackSection";
import TestimonialsSection  from "@/components/sections/TestimonialsSection";
import FAQSection           from "@/components/sections/FAQSection";
import AboutSection         from "@/components/sections/AboutSection";
import CTASection           from "@/components/sections/CTASection";
import AIClone              from "@/components/ui/AIClone";
import LiveActivityFeed     from "@/components/ui/LiveActivityFeed";
import WelcomeBanner        from "@/components/ui/WelcomeBanner";
import ScrollProgressBar    from "@/components/ui/ScrollProgressBar";

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
  const [briefOpen, setBriefOpen] = useState(false);

  return (
    <>
      {/* UI globale */}
      <ScrollProgressBar />
      <Scanline />
      <Navbar />
      <WelcomeBanner />

      <main>
        {/* 1. Hero — accroche */}
        <HeroSection />

        {/* 2. Comment ça marche — guide non-tech */}
        <HowItWorksSection />

        {/* 3. Projets SaaS — preuve de compétence */}
        <ProjectsSection />

        {/* 4–7. Outils interactifs (lab) */}
        <LeadHunterSection />
        <WorkflowSection />
        <ROICalculatorSection onOpenBrief={() => setBriefOpen(true)} />
        <BlueprintGenerator />
        <AuditSection />

        {/* 8. Stack tech */}
        <StackSection />

        {/* 9. Témoignages */}
        <TestimonialsSection />

        {/* 10. FAQ — rassure les non-tech */}
        <FAQSection />

        {/* 11. À propos */}
        <AboutSection />

        {/* 12. CTA final */}
        <CTASection briefOpen={briefOpen} onBriefOpenChange={setBriefOpen} />
      </main>

      <Footer />
      <AIClone />
      <LiveActivityFeed />
    </>
  );
}
