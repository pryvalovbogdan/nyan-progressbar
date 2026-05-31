import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { getDictionary, hasLocale } from '@/dictionaries';
import type { Locale } from '@/dictionaries';

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
  const c = dict.contact;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-16 space-y-8 sm:space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">{c.heading}</h1>
        <p className="text-muted-foreground">{c.description}</p>
      </section>

      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <ContactForm t={c.form} />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {c.githubPre}{' '}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#80deea] hover:underline"
        >
          {c.githubLink}
        </a>
        .
      </p>
    </div>
  );
}
