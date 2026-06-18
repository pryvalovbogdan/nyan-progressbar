'use client';

import type { Locale } from '@/i18n';
import { locales } from '@/i18n';
import { Menu } from '@base-ui/react/menu';
import { usePathname, useRouter } from 'next/navigation';

import { LANG_META } from '../consts';
import type { ILanguageSelectorProps } from './types';

export function LanguageSelector({ currentLang }: ILanguageSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(locale: Locale) {
    const newPath = pathname.replace(`/${currentLang}`, `/${locale}`);

    router.push(newPath);
  }

  const current = LANG_META[currentLang];

  return (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors select-none cursor-pointer outline-none">
        <span className="text-base leading-none">{current.flag}</span>
        <span className="uppercase tracking-widest text-[11px] font-bold">{currentLang}</span>
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={6}>
          <Menu.Popup
            className="
              z-50 min-w-[210px] rounded-xl border border-border bg-card/95 backdrop-blur-md
              shadow-[0_8px_32px_rgba(0,0,0,0.24),0_0_0_1px_rgba(128,222,234,0.06)]
              py-1.5 outline-none
              data-[starting-style]:opacity-0 data-[starting-style]:scale-95
              data-[ending-style]:opacity-0 data-[ending-style]:scale-95
              transition-[opacity,transform] duration-150 ease-out
              origin-top-right
            "
          >
            {locales.map(locale => {
              const meta = LANG_META[locale];
              const isActive = locale === currentLang;

              return (
                <Menu.Item
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`
                    flex items-center gap-3 px-3.5 py-2.5 mx-1.5 rounded-lg text-sm cursor-pointer outline-none select-none
                    transition-colors duration-100
                    ${
                      isActive
                        ? 'bg-[#80deea]/10 text-[#80deea] font-medium'
                        : 'text-foreground hover:bg-accent data-[highlighted]:bg-accent'
                    }
                  `}
                >
                  <span className="text-base leading-none w-5 shrink-0">{meta.flag}</span>
                  <span className="flex-1">{meta.label}</span>
                  {isActive && (
                    <svg
                      className="w-3.5 h-3.5 text-[#80deea] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </Menu.Item>
              );
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
