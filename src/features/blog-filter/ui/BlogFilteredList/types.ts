import type { Dictionary } from '@/i18n';

import type { BlogPost } from '@entities/blog';

export interface IBlogFilteredListProps {
  posts: readonly BlogPost[];
  dict: Dictionary['blog'];
  lang: string;
}
