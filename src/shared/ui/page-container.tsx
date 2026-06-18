import type { ReactNode } from 'react';

import { cn } from '@shared/lib/utils';

type PageMaxWidth = '2xl' | '3xl' | '4xl' | '6xl';
type PageSpace = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

interface IPageContainerProps {
  children: ReactNode;
  maxWidth?: PageMaxWidth;
  space?: PageSpace;
  className?: string;
}

const maxWidthClass: Record<PageMaxWidth, string> = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
};

const spaceClass: Record<PageSpace, string> = {
  sm: 'space-y-8',
  md: 'space-y-8 sm:space-y-10',
  lg: 'space-y-10',
  xl: 'space-y-10 sm:space-y-16',
  '2xl': 'space-y-12',
  '3xl': 'space-y-12 sm:space-y-20',
};

export function PageContainer({ children, maxWidth = '6xl', space = '3xl', className }: IPageContainerProps) {
  return (
    <div className={cn('mx-auto px-4 py-8 sm:py-16', maxWidthClass[maxWidth], spaceClass[space], className)}>
      {children}
    </div>
  );
}
