"use client";
import { useState, useEffect } from "react";

/* ── Layout ──────────────────────────────────────────────── */
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";

/* ── Sections ────────────────────────────────────────────── */
import HeroSection         from "@/components/sections/HeroSection";
import ProjectsSection     from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreviewSection  from "@/components/sections/BlogPreviewSection";
import AboutSection        from "@/components/sections/AboutSection";
import CTASection          from "@/components/sections/CTASection";
import TrustSection        from "@/components/sections/TrustSection";

/* ── UI globale ──────────────────────────────────────────── */
import LoadingScreen     from "@/components/ui/LoadingScreen";
import CustomCursor      from "@/components/ui/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import WelcomeBanner     from "@/components/ui/WelcomeBanner";
import LiveActivityFeed  from "@/components/ui/LiveActivityFeed";
import ProactiveChat     from "@/components/ui/ProactiveChat";
import ExitIntentPopup   from "@/components/ui/ExitIntentPopup";

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

      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      {!loading && <WelcomeBanner />}
      <LiveActivityFeed />
      <ProactiveChat />
      <ExitIntentPopup />

      <main style={{ opacity: loading ? 0 : 1, transition: "opacity .5s ease" }}>

        {/* 1 — Hero : qui est Oussama en 5 secondes */}
        <HeroSection />

        {/* 2 — Portfolio : 4 projets live avec screenshots */}
        <ProjectsSection />

        {/* 3 — Témoignages : preuve sociale Malt + Upwork */}
        <TestimonialsSection />

        {/* 4 — Avant/Après + 3 étapes + garanties */}
        <TrustSection />

        {/* 5 — About : parcours + expertise */}
        <AboutSection />

        {/* 6 — Blog : 3 articles récents */}
        <BlogPreviewSection />

        {/* 7 — CTA : formulaire de brief */}
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
