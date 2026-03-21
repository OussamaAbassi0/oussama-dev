import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/articles";
import ArticleClient from "./ArticleClient";

/* Force le rendu dynamique — évite les problèmes de cache Vercel */
export const dynamic = "force-dynamic";

/* ── Metadata ───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title:       `${article.fr.title} — Oussama Abassi`,
    description: article.fr.excerpt,
  };
}

/* ── Page ───────────────────────────────────────────────── */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return <ArticleClient article={article} slug={slug} />;
}
