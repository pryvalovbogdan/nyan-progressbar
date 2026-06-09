import type { Dictionary } from '@/i18n';

import { ScrubberGallery } from '@features/cat-selector';
import { CustomizerPanel } from '@features/customizer';
import { buttonVariants } from '@shared/ui/button';
import { Separator } from '@shared/ui/separator';
import { ReviewsSection } from '@widgets/reviews';
import { StatsSection } from '@widgets/stats';

interface IHomeViewProps {
  dict: Dictionary;
}

export function HomeView({ dict }: IHomeViewProps) {
  const h = dict.home;

  const features = [
    { icon: '🐱', title: h.feature1Title, desc: h.feature1Desc },
    { icon: '🎨', title: h.feature2Title, desc: h.feature2Desc },
    { icon: '🌙', title: h.feature3Title, desc: h.feature3Desc },
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

      <ReviewsSection
        labels={{
          heading: dict.reviews.heading,
          rateUs: dict.reviews.rateUs,
          reviews: dict.reviews.reviews,
          showMore: dict.reviews.showMore,
          showLess: dict.reviews.showLess,
        }}
      />
    </div>
  );
}
