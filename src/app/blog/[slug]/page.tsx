import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ARTICLES, getArticle, Lang } from "@/lib/articles";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lang?: string };
}): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};
  const lang = (["fr","en","ar","es"].includes(searchParams.lang ?? "") ? searchParams.lang : "fr") as Lang;
  const t    = article[lang] ?? article.fr;
  return {
    title:       `${t.title} — Oussama Abassi`,
    description: t.excerpt,
  };
}

export default function ArticlePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { lang?: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const validLangs: Lang[] = ["fr","en","ar","es"];
  const lang = (validLangs.includes(searchParams.lang as Lang) ? searchParams.lang : "fr") as Lang;

  return <ArticleClient article={article} lang={lang} slug={params.slug} />;
}
