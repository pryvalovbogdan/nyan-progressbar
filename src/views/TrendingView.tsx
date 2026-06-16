import type { Dictionary } from '@/i18n';
import Link from 'next/link';
import { Fragment } from 'react';

import { TRENDING_SECTIONS } from '@entities/trending-style';
import { TrendingSection } from '@features/trending';
import { AD_SLOTS } from '@shared/lib/adsense-slots';
import { buttonVariants } from '@shared/ui/button';
import { GoogleAd } from '@shared/ui/google-add';
import { Separator } from '@shared/ui/separator';

interface ITrendingViewProps {
  dict: Dictionary;
  lang: string;
}

export function TrendingView({ dict, lang }: ITrendingViewProps) {
  const t = dict.trending;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">
      <header className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.heading}</h1>
        <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">{t.description}</p>
      </header>

      <section className="max-w-3xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{t.introHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.introBody1}</p>
        <p className="text-muted-foreground leading-relaxed">{t.introBody2}</p>
      </section>

      {TRENDING_SECTIONS.map((section, idx) => (
        <Fragment key={section.id}>
          <TrendingSection section={section} dict={dict} lang={lang} />
          {idx === 1 && <GoogleAd slot={AD_SLOTS.trending} />}
        </Fragment>
      ))}

      <Separator />

      <section className="max-w-3xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{t.rankingsHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.rankingsBody1}</p>
        <p className="text-muted-foreground leading-relaxed">{t.rankingsBody2}</p>
        <p className="text-muted-foreground leading-relaxed">{t.rankingsBody3}</p>
      </section>

      <Separator />

      <section className="max-w-2xl mx-auto text-center space-y-3 card p-6">
        <h2 className="text-xl font-bold">{t.customizeHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{t.customizeBody}</p>
        <Link
          href={`/${lang}/customizer`}
          className={buttonVariants({
            className: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90',
          })}
        >
          {t.customizeCta}
        </Link>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{t.installHeading}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{t.installDescription}</p>
        <a
          href={`https://chromewebstore.google.com/detail/nyan-cat-extension/${process.env.NEXT_PUBLIC_PROD_EXTENSION_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: 'lg',
            className: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90',
          })}
        >
          {t.installCta}
        </a>
      </section>
    </div>
  );
}
