export interface Review {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ReviewsLabels {
  heading: string;
  rateUs: string;
  reviews: string;
  showMore: string;
  showLess: string;
}

export interface IReviewsSectionProps {
  labels: ReviewsLabels;
}

export interface IStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export interface IReviewCardProps {
  review: Review;
  className?: string;
}
