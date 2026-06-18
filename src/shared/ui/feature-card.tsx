import type { ReactNode } from 'react';

import { cn } from '@shared/lib/utils';

interface IFeatureCardProps {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  align?: 'left' | 'center';
  density?: 'default' | 'compact';
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  align = 'left',
  density = 'default',
  className,
}: IFeatureCardProps) {
  const isCompact = density === 'compact';

  return (
    <div
      className={cn(
        'card',
        isCompact ? 'p-4 space-y-1' : 'p-4 sm:p-5 space-y-2',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {icon ? <div className="text-3xl">{icon}</div> : null}
      <h3 className={cn('font-semibold', isCompact && 'text-sm')}>{title}</h3>
      <p className={cn('text-muted-foreground leading-relaxed', isCompact ? 'text-xs' : 'text-sm')}>{description}</p>
    </div>
  );
}
