import { ReviewsSection } from '@widgets/reviews';
import type { Dictionary } from '@/i18n';

interface Props {
  dict: Dictionary;
}

export function ReviewsView({ dict }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
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
