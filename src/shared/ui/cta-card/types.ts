import type { ReactNode } from 'react';

export interface ICTACardProps {
  title: ReactNode;
  body: ReactNode;
  children?: ReactNode;
  className?: string;
}
