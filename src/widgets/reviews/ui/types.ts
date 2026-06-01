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
}

export interface Props {
  labels: ReviewsLabels;
}
