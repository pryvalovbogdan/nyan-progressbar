'use client';

import { trackEvent } from '@shared/lib/analytics';

import { GAME_APP_STORE_URL } from '../consts';
import type { IGameLinkProps } from './types';

export function GameLink({ placement, className, children }: IGameLinkProps) {
  return (
    <a
      href={GAME_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('game_app_store_click', { placement })}
      className={className}
    >
      {children}
    </a>
  );
}
