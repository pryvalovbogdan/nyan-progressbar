import type { Dictionary } from '@/i18n';

import { Separator } from '@shared/ui';
import { ReleaseReviewsSection } from '@widgets/release-reviews';
import { ReviewsSection } from '@widgets/reviews';

interface IReviewsViewProps {
  dict: Dictionary;
}

export function ReviewsView({ dict }: IReviewsViewProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <ReleaseReviewsSection
        labels={{
          heading: dict.releaseReviews.heading,
          subheading: dict.releaseReviews.subheading,
        }}
      />

      <Separator className="my-10" />

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
