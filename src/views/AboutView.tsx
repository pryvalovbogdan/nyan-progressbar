import type { Dictionary } from '@/i18n';
import Link from 'next/link';

interface IAboutViewProps {
  dict: Dictionary;
  lang: string;
}

export function AboutView({ dict, lang }: IAboutViewProps) {
  const a = dict.about;
  const contactEmail = process.env.CONTACT_TO ?? '';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nyanprogressbar.com';

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nyan Progress Bar',
    url: siteUrl,
    logo: `${siteUrl}/catty.png`,
    description: a.intro,
    sameAs: ['https://chromewebstore.google.com/'],
    contactPoint: contactEmail
      ? {
          '@type': 'ContactPoint',
          email: contactEmail,
          contactType: 'customer support',
        }
      : undefined,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-16 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      <header className="space-y-2">
        <h1 className="text-4xl font-bold">{a.heading}</h1>
      </header>

      <p className="text-muted-foreground leading-relaxed">{a.intro}</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{a.s1Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{a.s1Body}</p>
        <p className="text-muted-foreground leading-relaxed">{a.s1Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{a.s2Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{a.s2Body}</p>
        <p className="text-muted-foreground leading-relaxed">{a.s2Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{a.s3Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{a.s3Body}</p>
        <p className="text-muted-foreground leading-relaxed">{a.s3Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{a.s4Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{a.s4Body}</p>
        <p className="text-muted-foreground leading-relaxed">{a.s4Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{a.s5Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{a.s5Intro}</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>{a.s5Item1}</li>
          <li>{a.s5Item2}</li>
          <li>{a.s5Item3}</li>
          <li>{a.s5Item4}</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{a.s6Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {a.s6Pre}{' '}
          <Link href={`/${lang}/contact`} className="text-[#80deea] hover:underline">
            {a.s6ContactLink}
          </Link>
          {a.s6Mid}{' '}
          <a href={`mailto:${contactEmail}`} className="text-[#80deea] hover:underline">
            {contactEmail}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
