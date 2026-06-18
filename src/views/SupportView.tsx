'use client';

import type { Dictionary } from '@/i18n';

import { CryptoCard } from '@features/crypto-donate';
import { trackEvent } from '@shared/lib/analytics';
import { buttonVariants } from '@shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';
import { FeatureCard } from '@shared/ui/feature-card';
import { PageContainer } from '@shared/ui/page-container';
import { Separator } from '@shared/ui/separator';

interface ISupportViewProps {
  dict: Dictionary;
}

export function SupportView({ dict }: ISupportViewProps) {
  const s = dict.support;

  const tiles = [
    {
      icon: '☕',
      title: s.kofiTitle,
      description: s.kofiDesc,
      href: 'https://ko-fi.com/nyancustombar',
      buttonLabel: s.kofiBtn,
      accentColor: '#ff5e5b',
      platform: 'kofi',
    },
    {
      icon: '🎗️',
      title: s.patreonTitle,
      description: s.patreonDesc,
      href: 'https://www.patreon.com/cw/nyancustombar?vanity=nyancustombar',
      buttonLabel: s.patreonBtn,
      accentColor: '#ffdd00',
      platform: 'patreon',
    },
    {
      icon: '🐱',
      title: s.donatelloTitle,
      description: s.donatelloDesc,
      href: 'https://donatello.to/nyan-progressbar',
      buttonLabel: s.donatelloBtn,
      accentColor: '#8a53b6',
      platform: 'donatello',
    },
  ];

  return (
    <PageContainer maxWidth="4xl" space="md">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{s.heading}</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">{s.description}</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tiles.map(({ icon, title, description, href, buttonLabel, accentColor, platform }) => (
          <Card
            key={title}
            className="flex flex-col border-border bg-card hover:border-[#80deea]/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]"
          >
            <CardHeader className="pb-3">
              <div className="text-4xl mb-2">{icon}</div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ className: 'w-full text-background font-semibold' })}
                style={{ backgroundColor: accentColor }}
                onClick={() => trackEvent('donate_click', { platform })}
              >
                {buttonLabel}
              </a>
            </CardContent>
          </Card>
        ))}
        <CryptoCard
          title={s.cryptoTitle}
          description={s.cryptoDesc}
          networkLabel={s.cryptoNetwork}
          copyLabel={s.cryptoCopy}
          copiedLabel={s.cryptoCopied}
        />
      </div>

      <p className="text-center text-sm text-muted-foreground">{s.thankYou}</p>

      <Separator />

      <section className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">{s.whereHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{s.whereIntro}</p>
        <div className="space-y-4">
          {[
            { title: s.whereItem1Title, desc: s.whereItem1Desc },
            { title: s.whereItem2Title, desc: s.whereItem2Desc },
            { title: s.whereItem3Title, desc: s.whereItem3Desc },
          ].map(({ title, desc }) => (
            <FeatureCard key={title} title={title} description={desc} />
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">{s.otherWaysHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{s.otherWaysIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: s.otherWay1Title, desc: s.otherWay1Desc },
            { title: s.otherWay2Title, desc: s.otherWay2Desc },
            { title: s.otherWay3Title, desc: s.otherWay3Desc },
            { title: s.otherWay4Title, desc: s.otherWay4Desc },
          ].map(({ title, desc }) => (
            <FeatureCard key={title} title={title} description={desc} density="compact" />
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-3 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-bold">{s.transparencyHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{s.transparencyBody}</p>
      </section>
    </PageContainer>
  );
}
