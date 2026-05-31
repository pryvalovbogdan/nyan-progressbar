import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SupportTile } from '@/components/support/SupportTile';
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
  return { title: dict.metadata.support.title };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const s = dict.support;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{s.heading}</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">{s.description}</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <SupportTile
          icon="☕"
          title={s.kofiTitle}
          description={s.kofiDesc}
          href="https://ko-fi.com/nyancustombar"
          buttonLabel={s.kofiBtn}
          accentColor="#ff5e5b"
        />
        <SupportTile
          icon="🎗️"
          title={s.patreonTitle}
          description={s.patreonDesc}
          href="https://patreon.com"
          buttonLabel={s.patreonBtn}
          accentColor="#ff424d"
        />
        <SupportTile
          icon="☕"
          title={s.bmcTitle}
          description={s.bmcDesc}
          href="https://buymeacoffee.com"
          buttonLabel={s.bmcBtn}
          accentColor="#ffdd00"
        />
      </div>

      <p className="text-center text-sm text-muted-foreground">{s.thankYou}</p>
    </div>
  );
}
