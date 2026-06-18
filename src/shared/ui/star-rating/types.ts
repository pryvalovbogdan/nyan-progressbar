export interface IStarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  ariaLabel?: (n: number) => string;
  className?: string;
}
