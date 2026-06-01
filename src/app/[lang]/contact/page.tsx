import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDictionary, hasLocale } from '@shared/dictionaries';
import type { Locale } from '@shared/dictionaries';
import { ContactView } from '@views/ContactView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return { title: dict.metadata.contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <ContactView dict={dict} />;
}
