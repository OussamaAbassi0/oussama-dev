import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

const MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY ?? process.env.MAPS_API_KEY ?? "";

/* ── Helpers ─────────────────────────────────────────────── */

/** Dérive un score 0-100 depuis le rating Google (0-5) */
function ratingToScore(rating?: number): number {
  if (!rating) return 60;
  return Math.round((rating / 5) * 100);
}

/** Génère un signal d'intent dynamique selon les données disponibles */
function buildSignal(place: GooglePlaceDetail): string {
  const hasWebsite = !!place.website;
  const hasPhone   = !!place.formatted_phone_number;
  const rating     = place.rating ?? 0;
  const reviews    = place.user_ratings_total ?? 0;

  if (!hasWebsite && !hasPhone)
    return "Aucune présence digitale détectée — opportunité de création de site";
  if (!hasWebsite)
    return "Pas de site web — forte opportunité d'acquisition digitale";
  if (rating >= 4.5 && reviews >= 50)
    return `Note ${rating}/5 (${reviews} avis) — forte réputation, potentiel de scale IA`;
  if (rating < 3.5 && reviews >= 10)
    return `Note ${rating}/5 — amélioration de l'expérience client via automatisation possible`;
  if (hasWebsite && hasPhone)
    return "Présence digitale confirmée — maturité pour intégration IA/automatisation";
  return "Lead qualifié — prêt pour une approche personnalisée";
}

/* ── Google Places types ─────────────────────────────────── */
interface GooglePlaceSearchResult {
  place_id: string;
  name: string;
}

interface GooglePlaceDetail {
  place_id: string;
  name: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  formatted_address?: string;
  url?: string; // lien Google Maps
}

/* ── Route Handler ───────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    if (!MAPS_KEY) {
      return NextResponse.json(
        { error: "MAPS_API_KEY non configurée dans .env.local" },
        { status: 500 }
      );
    }

    /* ── 1. Text Search → récupère les place_id ─────────── */
    const searchUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/textsearch/json"
    );
    searchUrl.searchParams.set("query", query);
    searchUrl.searchParams.set("language", "fr");
    searchUrl.searchParams.set("key", MAPS_KEY);

    const searchRes  = await fetch(searchUrl.toString());
    const searchData = await searchRes.json();

    if (searchData.status !== "OK" && searchData.status !== "ZERO_RESULTS") {
      console.error("[lead-hunter] Google Text Search error:", searchData.status, searchData.error_message);
      return NextResponse.json(
        { error: `Google Maps API error: ${searchData.status}` },
        { status: 502 }
      );
    }

    const results: GooglePlaceSearchResult[] = searchData.results ?? [];
    const top3 = results.slice(0, 3);

    if (top3.length === 0) {
      return NextResponse.json({ leads: [] });
    }

    /* ── 2. Place Details → enrichit chaque résultat ─────── */
    const detailFields = [
      "place_id",
      "name",
      "formatted_phone_number",
      "international_phone_number",
      "website",
      "rating",
      "user_ratings_total",
      "formatted_address",
      "url",
    ].join(",");

    const detailPromises = top3.map(async (place) => {
      const detailUrl = new URL(
        "https://maps.googleapis.com/maps/api/place/details/json"
      );
      detailUrl.searchParams.set("place_id", place.place_id);
      detailUrl.searchParams.set("fields", detailFields);
      detailUrl.searchParams.set("language", "fr");
      detailUrl.searchParams.set("key", MAPS_KEY);

      const res  = await fetch(detailUrl.toString());
      const data = await res.json();
      return data.result as GooglePlaceDetail;
    });

    const details = await Promise.all(detailPromises);

    /* ── 3. Formate les leads pour le frontend ───────────── */
    const leads: Lead[] = details.map((place) => ({
      company: place.name ?? "Nom inconnu",
      phone:   place.formatted_phone_number
                 ?? place.international_phone_number
                 ?? "Non spécifié",
      website: place.website ?? "N/A",
      rating:  place.rating ?? 0,
      score:   ratingToScore(place.rating),
      signal:  buildSignal(place),
      address: place.formatted_address ?? "Adresse non disponible",
      mapsUrl: place.url ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name ?? "")}`,
    }));

    return NextResponse.json({ leads });

  } catch (err) {
    console.error("[lead-hunter]", err);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
