import type { Dictionary } from '@/i18n';
import Link from 'next/link';

import { ScrubberGallery } from '@features/cat-selector';
import { CustomizerPanel } from '@features/customizer';
import { AD_SLOTS } from '@shared/lib/adsense-slots';
import { buttonVariants } from '@shared/ui/button';
import { CTACard } from '@shared/ui/cta-card';
import { FeatureCard } from '@shared/ui/feature-card';
import { GoogleAd } from '@shared/ui/google-add';
import { PageContainer } from '@shared/ui/page-container';
import { SectionHeading } from '@shared/ui/section-heading';
import { Separator } from '@shared/ui/separator';
import { ReviewsSection } from '@widgets/reviews';
import { StatsSection } from '@widgets/stats';

interface IHomeViewProps {
  dict: Dictionary;
  lang: string;
}

export function HomeView({ dict, lang }: IHomeViewProps) {
  const h = dict.home;

  const features = [
    { icon: '🐱', title: h.feature1Title, desc: h.feature1Desc },
    { icon: '🎨', title: h.feature2Title, desc: h.feature2Desc },
    { icon: '🌙', title: h.feature3Title, desc: h.feature3Desc },
  ];

  const howSteps = [
    { title: h.howStep1Title, desc: h.howStep1Desc },
    { title: h.howStep2Title, desc: h.howStep2Desc },
    { title: h.howStep3Title, desc: h.howStep3Desc },
  ];

  return (
    <PageContainer>
      <section className="text-center space-y-5 sm:space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          {h.headingPart1} <span className="text-[#80deea]">{h.headingAccent}</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">{h.description}</p>
        <a
          href={`https://chromewebstore.google.com/detail/nyan-cat-extension/${process.env.NEXT_PUBLIC_PROD_EXTENSION_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: 'lg',
            variant: 'accent',
            className: 'text-base px-8',
          })}
        >
          {h.cta}
        </a>
      </section>

      <section className="max-w-3xl mx-auto space-y-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">{h.introHeading}</h2>
        <p className="text-muted-foreground leading-relaxed text-left">{h.introBody1}</p>
        <p className="text-muted-foreground leading-relaxed text-left">{h.introBody2}</p>
      </section>

      <StatsSection
        labels={{
          heading: dict.stats.heading,
          totalInstalls: dict.stats.totalInstalls,
          activeUsers: dict.stats.activeUsers,
          countries: dict.stats.countries,
          dailyUsers: dict.stats.dailyUsers,
          catThemes: dict.stats.catThemes,
        }}
      />

      <GoogleAd slot={AD_SLOTS.homeMid} />

      <Separator />

      <section className="space-y-6 sm:space-y-8">
        <SectionHeading title={h.galleryHeading} description={h.galleryDesc} />

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8 items-start">
          <ScrubberGallery uploadLabel={dict.customizer.uploadGif} isMainPage />
          <div className="lg:sticky lg:top-20">
            <CustomizerPanel
              labels={{
                adjustPosition: dict.customizer.adjustPosition,
                height: dict.customizer.height,
                topOffset: dict.customizer.topOffset,
              }}
              previewLabels={{
                label: dict.preview.label,
                player: dict.preview.player,
              }}
              isMainPage
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading title={h.howHeading} description={h.howIntro} align="center" />
        <div className="grid sm:grid-cols-3 gap-4">
          {howSteps.map(({ title, desc }) => (
            <FeatureCard key={title} title={title} description={desc} />
          ))}
        </div>
      </section>

      <Separator />

      <section className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {features.map(({ icon, title, desc }) => (
          <FeatureCard key={title} icon={icon} title={title} description={desc} align="center" />
        ))}
      </section>

      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">{h.useCasesHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{h.useCasesBody1}</p>
        <p className="text-muted-foreground leading-relaxed">{h.useCasesBody2}</p>
        <p className="text-muted-foreground leading-relaxed">{h.useCasesBody3}</p>
      </section>

      <GoogleAd slot={AD_SLOTS.homeFooter} />

      <ReviewsSection
        labels={{
          heading: dict.reviews.heading,
          rateUs: dict.reviews.rateUs,
          reviews: dict.reviews.reviews,
          showMore: dict.reviews.showMore,
          showLess: dict.reviews.showLess,
        }}
      />

      <CTACard title={h.trustHeading} body={h.trustBody}>
        <a
          href={process.env.NEXT_PUBLIC_GIT_HUB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
        >
          {h.trustLinkGithubLabel}
        </a>
        <Link href={`/${lang}/support`} className="link-accent">
          {h.trustLinkSupportLabel}
        </Link>
      </CTACard>
    </PageContainer>
  );
}
