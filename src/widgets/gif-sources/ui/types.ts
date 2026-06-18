export interface IGifSource {
  name: string;
  description: string;
  url: string;
  previews: { src: string; alt: string }[];
}
