import type { Dictionary } from '@/i18n';
import Link from 'next/link';

import { CTACard, FeatureCard, PageContainer, SectionHeading, Separator } from '@shared/ui';
import { ReleaseReviewsSection } from '@widgets/release-reviews';
import { ReviewsSection } from '@widgets/reviews';

interface IReviewsViewProps {
  dict: Dictionary;
  lang: string;
}

export function ReviewsView({ dict, lang }: IReviewsViewProps) {
  const r = dict.reviews;

  return (
    <PageContainer maxWidth="6xl" space="lg">
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold">{r.pageHeading}</h1>
        <p className="text-muted-foreground leading-relaxed">{r.pageIntro1}</p>
        <p className="text-muted-foreground leading-relaxed">{r.pageIntro2}</p>
      </section>

      <ReleaseReviewsSection
        labels={{
          heading: dict.releaseReviews.heading,
          subheading: dict.releaseReviews.subheading,
        }}
      />

      <Separator className="my-2" />

      <section className="space-y-4 max-w-3xl">
        <SectionHeading title={r.themesHeading} description={r.themesIntro} />
        <div className="space-y-4">
          {[
            { title: r.theme1Title, body: r.theme1Body },
            { title: r.theme2Title, body: r.theme2Body },
            { title: r.theme3Title, body: r.theme3Body },
          ].map(({ title, body }) => (
            <FeatureCard key={title} title={title} description={body} density="compact" />
          ))}
        </div>
      </section>

      <Separator className="my-2" />

      <ReviewsSection
        labels={{
          heading: r.heading,
          rateUs: r.rateUs,
          reviews: r.reviews,
          showMore: r.showMore,
          showLess: r.showLess,
        }}
      />

      <CTACard title={r.ctaHeading} body={r.ctaBody}>
        <a
          href={`https://chromewebstore.google.com/detail/nyan-cat-extension/${process.env.NEXT_PUBLIC_PROD_EXTENSION_ID}/reviews`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent"
        >
          {r.ctaWebStoreLabel}
        </a>
        <Link href={`/${lang}/contact`} className="link-accent">
          {r.ctaContactLabel}
        </Link>
      </CTACard>
    </PageContainer>
  );
}
