import type { Lead } from "@/lib/types";

/* ============================================================
   MOCK LEADS — Données pré-enregistrées ultra-réalistes
   Utilisées pour les "Quick Targets" afin de préserver le quota
   Google Maps API tout en garantissant une démo parfaite.
   ============================================================ */

export const MOCK_LEADS: Record<string, Lead[]> = {

  /* ── Agences web à Paris ─────────────────────────────────── */
  "Agences web à Paris": [
    {
      company: "AKQA Paris",
      phone: "+33 1 53 32 73 00",
      website: "https://www.akqa.com/fr",
      rating: 4.7,
      score: 94,
      signal: "Scale-up confirmée — 3 offres d'emploi UX/Dev actives ce mois-ci",
      address: "15 Rue des Halles, 75001 Paris",
      mapsUrl: "https://maps.google.com/?q=AKQA+Paris",
    },
    {
      company: "Digitas France",
      phone: "+33 1 56 88 50 00",
      website: "https://www.digitas.com/fr-fr",
      rating: 4.5,
      score: 88,
      signal: "Migration stack tech en cours — budget transformation digitale validé",
      address: "31 Rue du Faubourg Saint-Antoine, 75011 Paris",
      mapsUrl: "https://maps.google.com/?q=Digitas+Paris",
    },
    {
      company: "Wunderman Thompson Paris",
      phone: "+33 1 49 23 63 00",
      website: "https://www.wundermanthompson.com",
      rating: 4.3,
      score: 81,
      signal: "Fusion récente — harmonisation des outils CRM & automatisation à prévoir",
      address: "1 Rue Royale, 75008 Paris",
      mapsUrl: "https://maps.google.com/?q=Wunderman+Thompson+Paris",
    },
  ],

  /* ── Cabinets comptables Lyon ────────────────────────────── */
  "Cabinets comptables Lyon": [
    {
      company: "Fiducial Lyon Centre",
      phone: "+33 4 72 10 28 00",
      website: "https://www.fiducial.fr",
      rating: 4.6,
      score: 92,
      signal: "Cabinet multi-sites — automatisation des rapports mensuels = gain estimé 30h/mois",
      address: "30 Rue de la République, 69002 Lyon",
      mapsUrl: "https://maps.google.com/?q=Fiducial+Lyon",
    },
    {
      company: "Grant Thornton Lyon",
      phone: "+33 4 72 29 43 29",
      website: "https://www.grant-thornton.fr",
      rating: 4.8,
      score: 96,
      signal: "Croissance +22% en 2024 — recrutement gelé, IA/automatisation = levier prioritaire",
      address: "Tour Oxygène, 10 Rue Abbé Rozier, 69001 Lyon",
      mapsUrl: "https://maps.google.com/?q=Grant+Thornton+Lyon",
    },
    {
      company: "Exco Valliance Lyon",
      phone: "+33 4 37 24 12 12",
      website: "https://www.exco-valliance.com",
      rating: 4.2,
      score: 78,
      signal: "Processus de clôture encore manuel — opportunité forte d'automatisation comptable",
      address: "3 Place des Échanges, 69100 Villeurbanne",
      mapsUrl: "https://maps.google.com/?q=Exco+Valliance+Lyon",
    },
  ],

  /* ── Restaurants gastronomiques Bordeaux ─────────────────── */
  "Restaurants gastronomiques Bordeaux": [
    {
      company: "Le Pressoir d'Argent — Gordon Ramsay",
      phone: "+33 5 57 30 43 04",
      website: "https://www.le-pressoir-dargent.com",
      rating: 4.9,
      score: 98,
      signal: "1 étoile Michelin — aucun système de réservation automatisé détecté",
      address: "2-5 Place de la Comédie, 33000 Bordeaux",
      mapsUrl: "https://maps.google.com/?q=Le+Pressoir+d+Argent+Bordeaux",
    },
    {
      company: "La Cape — Fronton du Château",
      phone: "+33 5 57 74 51 21",
      website: "https://www.lacape-restaurant.com",
      rating: 4.7,
      score: 90,
      signal: "Forte saisonnalité — gestion des stocks et commandes fournisseurs automatisable",
      address: "8 Allée de l'Île Vincent, 33270 Floirac",
      mapsUrl: "https://maps.google.com/?q=La+Cape+Floirac+Bordeaux",
    },
    {
      company: "Miles Restaurant",
      phone: "+33 5 56 81 17 20",
      website: "https://www.miles-restaurant.com",
      rating: 4.5,
      score: 84,
      signal: "Site web sans module de réservation en ligne — opportunité directe de conversion",
      address: "35 Rue de Borie, 33000 Bordeaux",
      mapsUrl: "https://maps.google.com/?q=Miles+Restaurant+Bordeaux",
    },
  ],

  /* ── Plombiers Marseille ─────────────────────────────────── */
  "Plombiers Marseille": [
    {
      company: "Plomberie Générale Méditerranée",
      phone: "+33 4 91 22 45 67",
      website: "N/A",
      rating: 4.4,
      score: 76,
      signal: "Aucun site web — perd des leads en ligne chaque jour. Opportunité création site + CRM",
      address: "14 Rue Francis de Pressensé, 13005 Marseille",
      mapsUrl: "https://maps.google.com/?q=Plomberie+Marseille+13005",
    },
    {
      company: "Sarl Thermi-Sud",
      phone: "+33 4 91 77 33 21",
      website: "https://www.thermi-sud.fr",
      rating: 4.6,
      score: 86,
      signal: "Système de devis encore par email/papier — automatisation = +15 devis qualifiés/mois",
      address: "48 Boulevard Michelet, 13008 Marseille",
      mapsUrl: "https://maps.google.com/?q=Thermi+Sud+Marseille",
    },
    {
      company: "Depannage Express 13",
      phone: "+33 6 12 88 55 44",
      website: "https://www.depannage-express13.fr",
      rating: 3.9,
      score: 68,
      signal: "Note < 4/5 avec 80+ avis — automatisation des réponses clients améliorerait la note",
      address: "22 Rue Paradis, 13006 Marseille",
      mapsUrl: "https://maps.google.com/?q=Depannage+Express+Marseille",
    },
  ],
};

/* Clés exactes des quick targets — utilisées pour la comparaison */
export const QUICK_TARGETS = Object.keys(MOCK_LEADS);
