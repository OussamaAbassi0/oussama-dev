import type { AuditReport } from "@/lib/types";

/* ============================================================
   MOCK AUDIT REPORTS — Données pré-enregistrées ultra-réalistes
   Utilisées pour les "Quick Tests" afin de préserver les
   ressources serveur tout en garantissant une démo bluffante.
   ============================================================ */

export interface MockAuditData extends AuditReport {
  industry: string;
  techStack: string[];
  automationPotential: string;
  bottlenecks: Bottleneck[];
  quickWins: string[];
}

export interface Bottleneck {
  title: string;
  impact: string;
  hours: number; // heures perdues par mois
  difficulty: "easy" | "medium" | "hard";
}

export const MOCK_AUDITS: Record<string, MockAuditData> = {

  /* ── E-commerce ─────────────────────────────────────────── */
  "E-commerce (ex: nike.com)": {
    company: "nike.com",
    url: "https://nike.com",
    score: 42,
    industry: "E-commerce & Retail",
    techStack: ["Shopify / Magento", "Google Analytics", "Klaviyo", "Zendesk"],
    automationPotential: "58h sauvées / mois",
    issues: [
      {
        type: "critical",
        label: "Support client 100% manuel",
        detail: "Aucun chatbot IA détecté. ~312 tickets/mois traités à la main. Coût estimé : 6 200€/mois en temps agent.",
      },
      {
        type: "warning",
        label: "Relances panier abandonné sous-optimisées",
        detail: "Séquence email basique (1 email). Les benchmarks sectoriels montrent qu'une séquence IA de 3 emails récupère 18% des paniers perdus.",
      },
      {
        type: "info",
        label: "Gestion des stocks non prédictive",
        detail: "Aucun système de prévision IA. Les ruptures de stock coûtent en moyenne 4% du CA annuel selon Gartner.",
      },
    ],
    roi: "ROI estimé en 90 jours : +€18 400/mois · −58h de tâches répétitives",
    bottlenecks: [
      { title: "Support client manuel", impact: "6 200€/mois perdus", hours: 28, difficulty: "easy" },
      { title: "Relances panier abandonnées", impact: "−18% taux de récupération", hours: 14, difficulty: "easy" },
      { title: "Reporting analytics manuel", impact: "12h/mois perdues", hours: 12, difficulty: "medium" },
      { title: "Gestion retours sans IA", impact: "NPS client impacté", hours: 16, difficulty: "medium" },
    ],
    quickWins: [
      "Chatbot IA Zendesk → −70% tickets niveau 1 en 2 semaines",
      "Séquence email IA abandons panier → +18% récupération dès J+30",
      "Dashboard reporting automatisé → 12h/mois libérées immédiatement",
    ],
  },

  /* ── Agence Web ─────────────────────────────────────────── */
  "Agence Web (ex: publicis.fr)": {
    company: "publicis.fr",
    url: "https://publicis.fr",
    score: 38,
    industry: "Agence Digitale & Conseil",
    techStack: ["HubSpot CRM", "Notion", "Slack", "Google Workspace", "Figma"],
    automationPotential: "74h sauvées / mois",
    issues: [
      {
        type: "critical",
        label: "Onboarding client entièrement manuel",
        detail: "Contrats, briefs, accès outils : 100% fait à la main. Chaque nouveau client = 6h de setup. Avec 4 clients/mois = 24h perdues.",
      },
      {
        type: "warning",
        label: "CRM non automatisé",
        detail: "Les leads entrants ne sont pas qualifiés automatiquement. Taux de réponse moyen : 18h. La concurrence répond en 2h grâce à l'IA.",
      },
      {
        type: "info",
        label: "Reporting client en PowerPoint manuel",
        detail: "3h/client/mois pour les rapports de performance. Automatisable à 100% avec des dashboards dynamiques connectés aux APIs.",
      },
    ],
    roi: "ROI estimé en 90 jours : +€22 000/mois · −74h de travail répétitif",
    bottlenecks: [
      { title: "Onboarding client manuel", impact: "24h/mois perdues", hours: 24, difficulty: "easy" },
      { title: "Qualification leads non automatisée", impact: "−40% taux de conversion", hours: 18, difficulty: "easy" },
      { title: "Reporting client manuel", impact: "3h × clients/mois", hours: 20, difficulty: "medium" },
      { title: "Suivi projet sans automatisation", impact: "Retards et re-travail", hours: 12, difficulty: "hard" },
    ],
    quickWins: [
      "Workflow n8n onboarding → client opérationnel en 20min au lieu de 6h",
      "Agent IA qualification leads → réponse < 5min 24h/24, +40% conversion",
      "Reporting auto connecté HubSpot → 20h/mois libérées immédiatement",
    ],
  },

  /* ── Cabinet RH / Recrutement ───────────────────────────── */
  "Cabinet RH (ex: adecco.fr)": {
    company: "adecco.fr",
    url: "https://adecco.fr",
    score: 31,
    industry: "RH & Recrutement",
    techStack: ["ATS Taleo", "LinkedIn Recruiter", "Excel", "Outlook", "Teams"],
    automationPotential: "92h sauvées / mois",
    issues: [
      {
        type: "critical",
        label: "Screening CV 100% humain",
        detail: "Un recruteur traite en moyenne 250 CV/semaine manuellement. Un agent IA peut pré-qualifier 95% des profils en 30 secondes avec 89% de précision.",
      },
      {
        type: "critical",
        label: "Planification d'entretiens par email",
        detail: "Chaque planification = 6-8 emails échangés en moyenne. Coût réel : 45min/candidat. Avec 20 candidats/semaine = 15h perdues.",
      },
      {
        type: "warning",
        label: "Suivi candidats sur Excel",
        detail: "Pipeline candidats géré sur spreadsheets partagées. Zéro visibilité temps réel, doublons fréquents, historique perdu à chaque départ.",
      },
    ],
    roi: "ROI estimé en 90 jours : +€31 000/mois · −92h de travail administratif",
    bottlenecks: [
      { title: "Screening manuel des CV", impact: "250 CV/sem traités à la main", hours: 40, difficulty: "easy" },
      { title: "Planification entretiens par email", impact: "15h/sem perdues", hours: 30, difficulty: "easy" },
      { title: "Reporting RH manuel", impact: "KPIs calculés 1× / mois", hours: 12, difficulty: "medium" },
      { title: "Suivi onboarding sans workflow", impact: "3 nouvelles recrues perdues/an", hours: 10, difficulty: "medium" },
    ],
    quickWins: [
      "Agent IA screening CV → 95% pré-qualification en 30s, libère 40h/mois",
      "Calendly + automatisation → 0 email de planification, +15h/sem récupérées",
      "Pipeline CRM auto → visibilité totale, 0 candidat perdu",
    ],
  },
};

export const QUICK_AUDIT_TARGETS = Object.keys(MOCK_AUDITS);
