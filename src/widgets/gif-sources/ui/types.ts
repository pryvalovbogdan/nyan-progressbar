export interface IGifSourcesBlockProps {
  heading: string;
  description: string;
  browseCta: string;
  sourceDescriptions: Record<string, string>;
}

export interface IGifSource {
  name: string;
  description: string;
  url: string;
  previews: { src: string; alt: string }[];
}
