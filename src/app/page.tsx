"use client";
import { useState, useEffect } from "react";

import Navbar             from "@/components/layout/Navbar";
import Footer             from "@/components/layout/Footer";
import HeroSection        from "@/components/sections/HeroSection";
import LiveStatsSection   from "@/components/sections/LiveStatsSection";
import ProjectsSection    from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustSection       from "@/components/sections/TrustSection";
import AboutSection       from "@/components/sections/AboutSection";
import TechStackSection   from "@/components/sections/TechStackSection";
import CTASection         from "@/components/sections/CTASection";
import LoadingScreen      from "@/components/ui/LoadingScreen";
import ScrollProgressBar  from "@/components/ui/ScrollProgressBar";

export default function HomePage() {
  const [loading,      setLoading     ] = useState(true);
  const [briefOpen,    setBriefOpen   ] = useState(false);
  const [prefillBrief, setPrefillBrief] = useState<string | undefined>();

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  const openBrief = (prefill?: string) => {
    if (prefill) setPrefillBrief(prefill);
    setBriefOpen(true);
  };

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <ScrollProgressBar />
      <Navbar />

      <main style={{ opacity: loading ? 0 : 1, transition: "opacity .5s ease" }}>
        <HeroSection />
        <LiveStatsSection />
        <ProjectsSection featured />
        <TestimonialsSection />
        <TrustSection />
        <AboutSection />
        <TechStackSection />
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
