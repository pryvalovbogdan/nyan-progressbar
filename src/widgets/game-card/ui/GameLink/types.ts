import type { ReactNode } from 'react';

export interface IGameLinkProps {
  placement: 'banner' | 'button';
  className?: string;
  children: ReactNode;
}
