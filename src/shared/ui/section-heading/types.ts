import type { ReactNode } from 'react';

export interface ISectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}
