export interface StatsLabels {
  heading: string;
  totalInstalls: string;
  countries: string;
  dailyUsers: string;
  activeUsers: string;
  catThemes: string;
}

export interface Props {
  labels: StatsLabels;
}

export interface StatCardProps {
  target: number;
  unit: string;
  label: string;
  started: boolean;
  duration?: number;
}
