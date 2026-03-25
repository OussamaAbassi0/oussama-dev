"use client";
import { useState } from "react";
import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CTASection      from "@/components/sections/CTASection";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function ProjetsPage() {
  const [briefOpen, setBriefOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <ScrollProgressBar />
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <ProjectsSection />
      </div>
      <CTASection
        briefOpen={briefOpen}
        onBriefOpenChange={setBriefOpen}
      />
      <Footer />
    </div>
  );
}
