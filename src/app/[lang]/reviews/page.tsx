import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import { ReviewsView } from '@views/ReviewsView';
import { generatePageMetadata } from '@shared/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata(lang as Locale, dict, 'reviews');
}

export default async function ReviewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <ReviewsView dict={dict} />;
}
