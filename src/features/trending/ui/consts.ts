import type { TrendingBadge } from '@entities/trending-style';

export const BADGE_STYLES: Record<TrendingBadge, string> = {
  new: 'bg-[#80deea] text-background',
  hot: 'bg-rose-500 text-white',
  custom: 'bg-amber-400 text-amber-950',
};

export const PAGINATED_PAGE_SIZE = 6;
