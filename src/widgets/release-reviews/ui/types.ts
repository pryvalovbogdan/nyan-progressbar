export interface ReleaseReview {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ReleaseReviewsLabels {
  heading: string;
  subheading: string;
}

export interface IReleaseReviewsSectionProps {
  labels: ReleaseReviewsLabels;
}

export interface IReleaseReviewCardProps {
  review: ReleaseReview;
  version: string;
}
