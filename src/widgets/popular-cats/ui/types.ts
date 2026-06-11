export interface IPopularCatsBlockProps {
  heading: string;
  description: string;
  initialCats?: IPopularCat[];
}

export interface IPopularCat {
  src: string;
  name: string;
  percentage: number;
}

export interface ICatCardProps {
  cat: IPopularCat;
  rank: number;
  isSelected: boolean;
  onSelect: (src: string) => void;
}
