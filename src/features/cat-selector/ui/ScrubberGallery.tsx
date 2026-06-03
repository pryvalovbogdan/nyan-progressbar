'use client';

import { useEffect, useRef } from 'react';

import { catsList } from '@entities/cat';
import { IScrubberGalleryProps } from '@features/cat-selector/ui/types';
import { useCustomizerStore } from '@features/customizer';
import { getExtensionState, sendToExtension } from '@shared/lib/extensionBridge';
import { useExtensionDetected } from '@shared/lib/useExtensionDetected';

import { ScrubberCard } from './ScrubberCard';

export function ScrubberGallery({ installTooltip, uploadLabel, isMainPage }: IScrubberGalleryProps) {
  const detected = useExtensionDetected();
  const disabled = !detected;
  const extensionActive = detected;
  const { customGif, setCustomGif, loadCustomGif, selectedCat, setSelectedCat, setHeight, setTop } =
    useCustomizerStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isCustomSelected = selectedCat === '__custom__';

  useEffect(() => {
    function handler(e: Event) {
      const { src, isCustom } = (e as CustomEvent<{ src: string; isCustom: boolean }>).detail;

      if (isCustom) {
        getExtensionState().then(({ customUserCat }) => {
          if (customUserCat) {
            setCustomGif(customUserCat);
          }
        });
      } else {
        setSelectedCat(src);
      }
    }

    window.addEventListener('nyan:cat-selected', handler);

    return () => window.removeEventListener('nyan:cat-selected', handler);
  }, []);

  useEffect(() => {
    if (!extensionActive) {
      return;
    }

    getExtensionState().then(({ selectedCat: saved, customUserCat, customCatStyles }) => {
      if (customUserCat) {
        loadCustomGif(customUserCat);
      }

      if (saved) {
        setSelectedCat(saved);
      }

      if (customCatStyles) {
        setHeight(customCatStyles.height);
        setTop(customCatStyles.top);
      }
    });
  }, [extensionActive]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = ev => {
      const base64 = ev.target?.result as string;

      setCustomGif(base64);
      sendToExtension('UPLOAD_CUSTOM_CAT', { base64 });
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      <div className="relative">
        <input ref={fileInputRef} type="file" accept="image/gif" className="hidden" onChange={handleFileChange} />
        <button
          onClick={() => !disabled && fileInputRef.current?.click()}
          disabled={disabled}
          className={`relative aspect-square w-full rounded-xl border-dashed border bg-card p-3 flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
            disabled
              ? 'opacity-50 cursor-not-allowed border-border'
              : 'opacity-80 hover:opacity-100 cursor-pointer hover:border-[#80deea] hover:bg-accent border-border'
          }`}
        >
          <span className="text-[22px] font-bold leading-none text-[#80deea]">+</span>
          {uploadLabel && (
            <span className="text-[11px] tracking-[0.2px] text-foreground leading-tight text-center px-1 font-bold">
              {uploadLabel}
            </span>
          )}
        </button>
      </div>

      {customGif && (
        <div className="relative">
          <button
            onClick={() => {
              if (disabled) {
                return;
              }

              setSelectedCat('__custom__');

              if (extensionActive) {
                sendToExtension('SELECT_CAT', { src: '__custom__' });
              }
            }}
            disabled={disabled}
            className={`relative aspect-square w-full rounded-xl border bg-card p-3 flex items-center justify-center transition-all duration-200 ${
              disabled
                ? 'opacity-50 cursor-not-allowed border-border'
                : `cursor-pointer hover:-translate-y-1 hover:border-[#80deea] hover:shadow-[0_4px_16px_rgba(128,222,234,0.2)] ${
                    isCustomSelected
                      ? 'border-[#80deea] shadow-[0_0_0_1px_#80deea,0_4px_16px_rgba(128,222,234,0.2)] -translate-y-0.5'
                      : 'border-border'
                  }`
            }`}
          >
            <img src={customGif} alt="custom cat" className="object-contain w-full h-full" />
          </button>
        </div>
      )}

      {catsList.map(cat => (
        <ScrubberCard
          key={cat.src}
          cat={cat}
          disabled={disabled}
          isMainPage={isMainPage}
          tooltip={disabled ? installTooltip : undefined}
          onSelect={extensionActive ? src => sendToExtension('SELECT_CAT', { src }) : undefined}
        />
      ))}
    </div>
  );
}
