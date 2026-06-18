import type { Dictionary } from '@/i18n';

import { PageContainer } from '@shared/ui';

interface ITermsViewProps {
  dict: Dictionary;
}

export function TermsView({ dict }: ITermsViewProps) {
  const t = dict.terms;
  const contactEmail = process.env.CONTACT_TO ?? '';

  return (
    <PageContainer maxWidth="3xl" space="sm">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">{t.heading}</h1>
        <p className="text-muted-foreground text-sm">{t.lastUpdated}</p>
      </header>

      <p className="text-muted-foreground leading-relaxed">{t.intro}</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s1Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s1Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s2Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s2Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s3Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s3Body}</p>
        <p className="text-muted-foreground leading-relaxed">{t.s3Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s4Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s4Body}</p>
        <p className="text-muted-foreground leading-relaxed">{t.s4Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s5Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s5Body}</p>
        <p className="text-muted-foreground leading-relaxed">{t.s5Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s6Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s6Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s7Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s7Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s8Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s8Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s9Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.s9Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t.s10Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t.s10Pre}{' '}
          <a href={`mailto:${contactEmail}`} className="link-accent">
            {contactEmail}
          </a>
          .
        </p>
      </section>
    </PageContainer>
  );
}
