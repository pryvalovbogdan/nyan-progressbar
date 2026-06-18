import { cn } from '@shared/lib/utils';

import type { ISectionHeadingProps } from './types';

export function SectionHeading({ title, description, align = 'left', className }: ISectionHeadingProps) {
  return (
    <div className={cn('space-y-1', align === 'center' && 'text-center', className)}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
    </div>
  );
}
