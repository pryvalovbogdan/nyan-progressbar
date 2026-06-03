import { getDictionary, hasLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import { notFound } from 'next/navigation';

import { generatePageMetadata } from '@shared/lib/metadata';
import { ExtensionView } from '@views/ExtensionView';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return generatePageMetadata(lang as Locale, dict, 'extension');
}

export default async function ExtensionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <ExtensionView dict={dict} locale={locale} />;
}
