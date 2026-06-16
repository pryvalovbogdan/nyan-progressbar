import type { Dictionary } from '@/i18n';
import Link from 'next/link';

import { Separator } from '@shared/ui';
import { ReleaseReviewsSection } from '@widgets/release-reviews';
import { ReviewsSection } from '@widgets/reviews';

interface IReviewsViewProps {
  dict: Dictionary;
  lang: string;
}

export function ReviewsView({ dict, lang }: IReviewsViewProps) {
  const r = dict.reviews;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-10">
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
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{r.themesHeading}</h2>
          <p className="text-muted-foreground text-sm">{r.themesIntro}</p>
        </div>
        <div className="space-y-4">
          {[
            { title: r.theme1Title, body: r.theme1Body },
            { title: r.theme2Title, body: r.theme2Body },
            { title: r.theme3Title, body: r.theme3Body },
          ].map(({ title, body }) => (
            <div key={title} className="card p-4 space-y-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
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

      <section className="max-w-2xl mx-auto text-center space-y-3 card p-6">
        <h2 className="text-xl font-bold">{r.ctaHeading}</h2>
        <p className="text-muted-foreground leading-relaxed">{r.ctaBody}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href={`https://chromewebstore.google.com/detail/nyan-cat-extension/${process.env.NEXT_PUBLIC_PROD_EXTENSION_ID}/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#80deea] hover:underline"
          >
            {r.ctaWebStoreLabel}
          </a>
          <Link href={`/${lang}/contact`} className="text-[#80deea] hover:underline">
            {r.ctaContactLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
