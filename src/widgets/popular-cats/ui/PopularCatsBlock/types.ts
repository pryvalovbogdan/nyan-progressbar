import type { IPopularCat } from '../types';

export interface IPopularCatsBlockProps {
  heading: string;
  description: string;
  initialCats?: IPopularCat[];
}
