import { cn } from '@shared/lib/utils';

import type { ICTACardProps } from './types';

export function CTACard({ title, body, children, className }: ICTACardProps) {
  return (
    <section className={cn('max-w-2xl mx-auto text-center space-y-3 card p-6', className)}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
      {children ? <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">{children}</div> : null}
    </section>
  );
}
