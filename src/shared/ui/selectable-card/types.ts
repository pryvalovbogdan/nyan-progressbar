import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ISelectableCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  selected: boolean;
  children: ReactNode;
  showCheck?: boolean;
  selectedClassName?: string;
}
