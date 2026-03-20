"use client";
import { useState, useEffect } from "react";

/* ── Layout ──────────────────────────────────────────────── */
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";

/* ── Sections ────────────────────────────────────────────── */
import HeroSection        from "@/components/sections/HeroSection";
import HowItWorksSection  from "@/components/sections/HowItWorksSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import LeadHunterSection  from "@/components/sections/LeadHunterSection";
import WorkflowSection    from "@/components/sections/WorkflowSection";
import ROICalculatorSection from "@/components/sections/ROICalculatorSection";
import WorkflowGallery    from "@/components/sections/WorkflowGallery";
import MaturityQuiz       from "@/components/sections/MaturityQuiz";
import DeliveryTimeline   from "@/components/sections/DeliveryTimeline";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection         from "@/components/sections/FAQSection";
import AboutSection       from "@/components/sections/AboutSection";
import CTASection         from "@/components/sections/CTASection";

/* ── UI globale ──────────────────────────────────────────── */
import LoadingScreen    from "@/components/ui/LoadingScreen";
import CustomCursor     from "@/components/ui/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import WelcomeBanner    from "@/components/ui/WelcomeBanner";
import LiveActivityFeed from "@/components/ui/LiveActivityFeed";
import ProactiveChat    from "@/components/ui/ProactiveChat";

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [loading,      setLoading     ] = useState(true);
  const [briefOpen,    setBriefOpen   ] = useState(false);
  const [prefillBrief, setPrefillBrief] = useState<string|undefined>();

  /* Bloque le scroll pendant le loading */
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  const openBrief = (prefill?: string) => {
    if (prefill) setPrefillBrief(prefill);
    setBriefOpen(true);
  };

  return (
    <>
      {/* ─────────────────────────────────────────
          LOADING SCREEN — 3 secondes d'impact
      ───────────────────────────────────────── */}
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* ─────────────────────────────────────────
          UI GLOBALE — toujours visible
      ───────────────────────────────────────── */}
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      {!loading && <WelcomeBanner />}
      <LiveActivityFeed />
      <ProactiveChat />

      {/* ─────────────────────────────────────────
          CONTENU — 8 blocs logiques
      ───────────────────────────────────────── */}
      <main style={{ opacity: loading ? 0 : 1, transition: "opacity .5s ease" }}>

        {/* 1 ─ ACCROCHE
            Capturer l'attention en 3 secondes.
            Hero avec particules + typewriter. */}
        <HeroSection />

        {/* 2 ─ COMPRENDRE
            "Comment ça marche" en 3 étapes.
            Avant / Après pour visualiser. */}
        <HowItWorksSection />
        <BeforeAfterSection />

        {/* 3 ─ PREUVES
            Cas clients réels avec chiffres.
            Témoignages. */}
        <CaseStudiesSection />
        <TestimonialsSection />

        {/* 4 ─ TESTER (le Lab)
            Les outils interactifs gratuits.
            Le visiteur vit la preuve lui-même. */}
        <LeadHunterSection />
        <WorkflowSection />
        <ROICalculatorSection onOpenBrief={() => openBrief()} />

        {/* 5 ─ CHOISIR
            Workflows prêts à déployer.
            Quiz de maturité + roadmap. */}
        <WorkflowGallery onOpenBrief={openBrief} />
        <MaturityQuiz    onOpenBrief={() => openBrief()} />

        {/* 6 ─ RASSURER
            Timeline de livraison claire.
            FAQ pour lever les objections. */}
        <DeliveryTimeline />
        <FAQSection />

        {/* 7 ─ HUMANISER
            Qui est Oussama vraiment. */}
        <AboutSection />

        {/* 8 ─ CONVERTIR
            Formulaire de brief. */}
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
