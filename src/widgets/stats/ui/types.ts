export interface StatsLabels {
  heading: string;
  totalInstalls: string;
  countries: string;
  dailyUsers: string;
  activeUsers: string;
  catThemes: string;
}

export interface IStatsSectionProps {
  labels: StatsLabels;
}

export interface IStatCardProps {
  target: number;
  unit: string;
  label: string;
  started: boolean;
  duration?: number;
}
