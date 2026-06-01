import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import { SupportView } from '@views/SupportView';
import { generatePageMetadata } from '@shared/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata(lang as Locale, dict, 'support');
}

export default async function SupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <SupportView dict={dict} />;
}
