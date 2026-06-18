import type { Dictionary } from '@/i18n';
import Link from 'next/link';
import { Fragment } from 'react';

import { AD_SLOTS } from '@shared/lib/adsense-slots';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shared/ui/accordion';
import { GoogleAd } from '@shared/ui/google-add';
import { PageContainer } from '@shared/ui/page-container';
import { Separator } from '@shared/ui/separator';

interface IFaqViewProps {
  dict: Dictionary;
  lang: string;
}

type QuestionKey = keyof Dictionary['faq']['questions'];

const CATEGORIES: { headingKey: keyof Dictionary['faq']; questionKeys: QuestionKey[] }[] = [
  {
    headingKey: 'categoryGettingStartedHeading',
    questionKeys: ['isFree', 'browsers', 'howToInstall', 'worksOnYouTube'],
  },
  {
    headingKey: 'categoryCustomizationHeading',
    questionKeys: ['uploadGif', 'gifFormats', 'changePosition', 'catOffScreen'],
  },
  {
    headingKey: 'categoryPrivacyHeading',
    questionKeys: ['doesItTrack', 'sendsDataAnywhere', 'worksOffline'],
  },
  {
    headingKey: 'categoryTroubleshootingHeading',
    questionKeys: ['catNotShowing', 'extensionDisappeared', 'uploadFails', 'howToUninstall'],
  },
];

export function FaqView({ dict, lang }: IFaqViewProps) {
  const f = dict.faq;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Object.values(f.questions).map(qa => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.a,
      },
    })),
  };

  return (
    <PageContainer maxWidth="3xl" space="lg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-bold">{f.heading}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{f.intro}</p>
      </header>

      {CATEGORIES.map(({ headingKey, questionKeys }, idx) => (
        <Fragment key={headingKey}>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">{f[headingKey] as string}</h2>
            <Accordion>
              {questionKeys.map(qk => {
                const qa = f.questions[qk];

                return (
                  <AccordionItem key={qk}>
                    <AccordionTrigger>{qa.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">{qa.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
          {idx === 1 && <GoogleAd slot={AD_SLOTS.faq} />}
        </Fragment>
      ))}

      <Separator />
      <section className="space-y-3 text-center">
        <h2 className="text-xl font-semibold">{f.stillStuckHeading}</h2>
        <p className="text-muted-foreground">
          {f.stillStuckPre}{' '}
          <Link href={`/${lang}/contact`} className="link-accent">
            {f.stillStuckLinkText}
          </Link>{' '}
          {f.stillStuckPost}
        </p>
      </section>
    </PageContainer>
  );
}
