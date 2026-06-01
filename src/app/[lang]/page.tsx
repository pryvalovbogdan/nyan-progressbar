import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@shared/dictionaries';
import type { Locale } from '@shared/dictionaries';
import { HomeView } from '@views/HomeView';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <HomeView dict={dict} />;
}
