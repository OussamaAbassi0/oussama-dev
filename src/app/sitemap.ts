import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://oussama-hq.vercel.app";
  const now  = new Date();

  return [
    { url: base,                                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/blog`,                               lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/blog/automatiser-prospection-b2b-n8n`, lastModified: new Date("2026-03-10"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog/roi-automatisation-calcul-concret`, lastModified: new Date("2026-03-03"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog/agent-ia-multi-agents-architecture`, lastModified: new Date("2026-02-24"), changeFrequency: "monthly", priority: 0.8 },
  ];
}
