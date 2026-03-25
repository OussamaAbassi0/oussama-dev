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
import LiveStatsSection    from "@/components/sections/LiveStatsSection";
import TechStackSection    from "@/components/sections/TechStackSection";

/* ── UI globale ──────────────────────────────────────────── */
import LoadingScreen       from "@/components/ui/LoadingScreen";
import CustomCursor        from "@/components/ui/CustomCursor";
import ScrollProgressBar   from "@/components/ui/ScrollProgressBar";
import WelcomeBanner       from "@/components/ui/WelcomeBanner";
import LiveActivityFeed    from "@/components/ui/LiveActivityFeed";
import ProactiveChat       from "@/components/ui/ProactiveChat";
import ExitIntentPopup     from "@/components/ui/ExitIntentPopup";
import DiagnosticCTABanner    from "@/components/ui/DiagnosticCTABanner";
import NewsletterBanner       from "@/components/ui/NewsletterBanner";
import AutomationCostClock    from "@/components/ui/AutomationCostClock";

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

        {/* 2 — Automation Cost Clock : coût en temps réel des tâches manuelles */}
        <AutomationCostClock onOpenBrief={() => openBrief()} />

        {/* 3 — Live Stats : automatisations en temps réel */}
        <LiveStatsSection />

        {/* 3 — Portfolio : 4 projets live avec screenshots */}
        <ProjectsSection />

        {/* 4 — Témoignages : preuve sociale Malt + Upwork */}
        <TestimonialsSection />

        {/* 5 — Avant/Après + 3 étapes + garanties */}
        <TrustSection />

        {/* 6 — Diagnostic CTA Banner */}
        <DiagnosticCTABanner />

        {/* 7 — About : parcours + expertise */}
        <AboutSection />

        {/* 8 — Tech Stack : les outils avec animations */}
        <TechStackSection />

        {/* 9 — Blog : 3 articles récents */}
        <BlogPreviewSection />

        {/* 10 — Newsletter */}
        <section style={{ padding: "60px 24px", background: "var(--bg2)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <NewsletterBanner />
          </div>
        </section>

        {/* 11 — CTA : formulaire de brief */}
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
