import type { IFooterProps } from './types';

export function Footer({ labels }: IFooterProps) {
  return (
    <footer className="border-t border-border mt-12 sm:mt-24 py-6 sm:py-8 text-center text-sm text-muted-foreground">
      <p>
        {labels.madeWith} ·{' '}
        <a
          href="https://ko-fi.com/nyancustombar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#80deea] transition-colors"
        >
          {labels.support}
        </a>
      </p>
    </footer>
  );
}
