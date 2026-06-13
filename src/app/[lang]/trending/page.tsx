import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import { notFound } from 'next/navigation';

import { generatePageMetadata } from '@shared/lib/metadata';
import { TrendingView } from '@views/TrendingView';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata(lang as Locale, dict, 'trending');
}

export default async function TrendingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <TrendingView dict={dict} lang={lang} />;
}
