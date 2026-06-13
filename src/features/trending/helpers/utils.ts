import { catsData } from '@entities/cat';

export async function fetchAsBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

const BUILT_IN_PREFIX = '/cats/';

export function getBuiltInCatSrc(imageSrc: string): string | null {
  if (!imageSrc.startsWith(BUILT_IN_PREFIX)) {
    return null;
  }

  const filename = imageSrc.slice(BUILT_IN_PREFIX.length);

  return catsData[filename] ? filename : null;
}
