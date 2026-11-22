import Image from 'next/image';

import { cn } from '@shared/lib/utils';
import { buttonVariants } from '@shared/ui/button';

import { GameLink } from '../GameLink';
import { GAME_IMAGE_BLUR, GAME_IMAGE_SRC } from '../consts';
import type { IGameCardProps } from './types';

export function GameCard({ labels }: IGameCardProps) {
  return (
    <section className="card overflow-hidden transition-all duration-200 hover:border-[#80deea] hover:shadow-[0_4px_16px_rgba(128,222,234,0.2)]">
      <GameLink
        placement="banner"
        className="block rounded-t-xl focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-ring"
      >
        <Image
          src={GAME_IMAGE_SRC}
          alt={labels.imageAlt}
          width={1920}
          height={823}
          sizes="(max-width: 1152px) 100vw, 1120px"
          placeholder="blur"
          blurDataURL={GAME_IMAGE_BLUR}
          className="h-auto w-full"
        />
      </GameLink>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-balance">{labels.heading}</h2>
          <p className="max-w-2xl text-muted-foreground leading-relaxed text-pretty">{labels.description}</p>
        </div>
        <GameLink
          placement="button"
          className={cn(buttonVariants({ variant: 'gradient', size: 'lg' }), 'text-base px-8')}
        >
          {labels.cta}
        </GameLink>
      </div>
    </section>
  );
}
