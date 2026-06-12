import { getDictionary, hasLocale, locales } from '@/i18n';
import type { Locale } from '@/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HOW_TO_ARTICLE_SLUGS, isHowToArticleSlug } from '@entities/how-to-article';
import { HowToUseArticleView } from '@views/HowToUseArticleView';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

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

  const pageUrl = `${SITE_URL}/${lang}/how-to-use/${slug}`;
  const alternateLanguages = Object.fromEntries(
    locales.map(locale => [locale, `${SITE_URL}/${locale}/how-to-use/${slug}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: pageUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: pageUrl,
      siteName: 'Nyan Progress Bar',
      type: 'article',
      images: [{ url: '/catty.png', width: 264, height: 160, alt: 'Nyan Progress Bar' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: ['/catty.png'],
    },
  };
}

export default async function HowToUseArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isHowToArticleSlug(slug)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <HowToUseArticleView dict={dict} lang={lang} slug={slug} />;
}
