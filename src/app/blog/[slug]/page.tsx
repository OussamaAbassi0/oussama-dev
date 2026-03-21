import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/articles";
import ArticleClient from "./ArticleClient";

/* ── Génère toutes les routes statiques ─────────────────── */
export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

/* ── Metadata statique (sans searchParams) ──────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title:       `${article.fr.title} — Oussama Abassi`,
    description: article.fr.excerpt,
  };
}

/* ── Page — la langue est gérée côté client ─────────────── */
export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  /* On passe l'article au client — la langue est lue depuis
     le LangContext (localStorage) directement dans ArticleClient */
  return <ArticleClient article={article} slug={params.slug} />;
}
