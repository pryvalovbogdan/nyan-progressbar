import type { Dictionary } from '@/i18n';
import Link from 'next/link';

import { ScrubberGallery } from '@features/cat-selector';
import { CustomizerPanel } from '@features/customizer';
import { AD_SLOTS } from '@shared/lib/adsense-slots';
import { buttonVariants } from '@shared/ui/button';
import { GoogleAd } from '@shared/ui/google-add';
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">
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
            className: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90 text-base px-8',
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
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{h.galleryHeading}</h2>
          <p className="text-muted-foreground text-sm">{h.galleryDesc}</p>
        </div>

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
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">{h.howHeading}</h2>
          <p className="text-muted-foreground text-sm">{h.howIntro}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {howSteps.map(({ title, desc }) => (
            <div key={title} className="card p-5 space-y-2">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="space-y-2 p-4 sm:p-6 card">
            <div className="text-3xl">{icon}</div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
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

      <section className="max-w-2xl mx-auto text-center space-y-3 card p-6">
        <h2 className="text-xl font-bold">{h.trustHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{h.trustBody}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href={process.env.NEXT_PUBLIC_GIT_HUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#80deea] hover:underline"
          >
            {h.trustLinkGithubLabel}
          </a>
          <Link href={`/${lang}/support`} className="text-[#80deea] hover:underline">
            {h.trustLinkSupportLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
