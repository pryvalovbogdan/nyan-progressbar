import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDictionary, hasLocale } from '@shared/dictionaries';
import type { Locale } from '@shared/dictionaries';
import { ReviewsView } from '@views/ReviewsView';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return { title: dict.metadata.reviews.title };
}

export default async function ReviewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <ReviewsView dict={dict} />;
}
