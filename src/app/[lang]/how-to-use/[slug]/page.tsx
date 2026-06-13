import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HOW_TO_ARTICLE_SLUGS, isHowToArticleSlug } from '@entities/how-to-article';
import { generatePageMetadata } from '@shared/lib/metadata';
import { HowToUseArticleView } from '@views/HowToUseArticleView';

export function generateStaticParams() {
  return HOW_TO_ARTICLE_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isHowToArticleSlug(slug)) return {};

  const dict = await getDictionary(lang as Locale);
  const article = dict.howToUse.articles[slug];

  return generatePageMetadata(lang as Locale, dict, 'howToUse', {
    title: article.title,
    description: article.summary,
    route: `/how-to-use/${slug}`,
    ogType: 'article',
  });
}

export default async function HowToUseArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isHowToArticleSlug(slug)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <HowToUseArticleView dict={dict} lang={lang} slug={slug} />;
}
