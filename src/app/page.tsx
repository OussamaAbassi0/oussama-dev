"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LeadHunterSection  from "@/components/sections/LeadHunterSection";
import ProjectsSection    from "@/components/sections/ProjectsSection";
import AboutSection       from "@/components/sections/AboutSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import ROICalculatorSection  from "@/components/sections/ROICalculatorSection";
import BlueprintGenerator   from "@/components/sections/BlueprintGenerator";
import AuditSection          from "@/components/sections/AuditSection";
import StackSection from "@/components/sections/StackSection";
import CTASection from "@/components/sections/CTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AIClone from "@/components/ui/AIClone";
import LiveActivityFeed from "@/components/ui/LiveActivityFeed";

function Scanline() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px", zIndex: 100, opacity: 0.15, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, #00ffc8, transparent)",
        animation: "scanline 6s linear infinite",
      }}
    />
  );
}

export default function HomePage() {
  /* État global du modal de brief — partagé entre ROI Calculator et CTA */
  const [briefOpen, setBriefOpen] = useState(false);

  return (
    <>
      <Scanline />
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <LeadHunterSection />
        <WorkflowSection />
        <ROICalculatorSection onOpenBrief={() => setBriefOpen(true)} />
        <BlueprintGenerator />
        <AuditSection />
        <StackSection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection briefOpen={briefOpen} onBriefOpenChange={setBriefOpen} />
      </main>
      <Footer />
      <AIClone />
      <LiveActivityFeed />
    </>
  );
}
