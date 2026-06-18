import type { ReactNode } from 'react';

export interface IFeatureCardProps {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  align?: 'left' | 'center';
  density?: 'default' | 'compact';
  className?: string;
}
