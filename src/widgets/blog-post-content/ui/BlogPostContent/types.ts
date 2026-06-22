import type { Dictionary } from '@/i18n';

import type { BlogPost } from '@entities/blog';

export interface IBlogPostContentProps {
  post: BlogPost;
  dict: Dictionary['blog'];
  lang: string;
}
