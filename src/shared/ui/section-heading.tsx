import type { ReactNode } from 'react';

import { cn } from '@shared/lib/utils';

interface ISectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, description, align = 'left', className }: ISectionHeadingProps) {
  return (
    <div className={cn('space-y-1', align === 'center' && 'text-center', className)}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
    </div>
  );
}
