import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import { CustomizerView } from '@views/CustomizerView';
import { generatePageMetadata } from '@shared/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata(lang as Locale, dict, 'customizer');
}

export default async function CustomizerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <CustomizerView dict={dict} />;
}
