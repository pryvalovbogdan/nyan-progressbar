import type { ReactNode } from 'react';

export type PageMaxWidth = '2xl' | '3xl' | '4xl' | '6xl';
export type PageSpace = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface IPageContainerProps {
  children: ReactNode;
  maxWidth?: PageMaxWidth;
  space?: PageSpace;
  className?: string;
}
