import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatNumber, getPageUrl } from '@/lib/quran';
import PageSkeleton from './PageSkeleton';

interface PageViewerProps {
  pageNumber: number;
  totalPages: number;
  /** Position in the spread, which decides the rounded corners and the spine shading. */
  side?: 'right' | 'left' | 'single';
  className?: string;
}

const sideStyles = {
  right: 'rounded-e-sm rounded-s-2xl',
  left: 'rounded-s-sm rounded-e-2xl',
  single: 'rounded-2xl',
};

// Soft shadow where the two pages meet at the spine
const spineStyles = {
  right: 'bg-gradient-to-r from-black/[0.07] via-transparent via-[6%] to-transparent',
  left: 'bg-gradient-to-l from-black/[0.07] via-transparent via-[6%] to-transparent',
  single: '',
};

export default function PageViewer({ pageNumber, totalPages, side = 'single', className }: PageViewerProps) {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const pagePath = getPageUrl(pageNumber);

  if (pageNumber > totalPages || pageNumber < 1) {
    return <div className={cn('aspect-[510/729]', className)} aria-hidden="true" />;
  }

  const retry = () => {
    setHasError(false);
    setIsLoading(true);
    setAttempt((n) => n + 1);
  };

  return (
    <figure
      // The spread container is always dir="rtl", so pin physical sides here
      dir={side === 'single' ? undefined : 'rtl'}
      className={cn(
        'relative aspect-[510/729] overflow-hidden bg-page shadow-[0_20px_50px_-20px_rgba(60,45,15,0.28)] ring-1 ring-black/[0.06] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] dark:ring-white/10',
        sideStyles[side],
        className,
      )}
    >
      {isLoading && !hasError && <PageSkeleton />}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('pageLoadError').replace('{page}', formatNumber(pageNumber, language))}
          </p>
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <RotateCw className="h-4 w-4" />
            {t('retry')}
          </button>
        </div>
      ) : (
        <img
          key={attempt}
          src={attempt ? `${pagePath}?retry=${attempt}` : pagePath}
          alt={`${t('page')} ${formatNumber(pageNumber, language)}`}
          draggable={false}
          className={cn(
            'h-full w-full select-none object-contain transition-opacity duration-500 dark:brightness-[0.93]',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}

      {side !== 'single' && <div className={cn('pointer-events-none absolute inset-0', spineStyles[side])} />}

      <figcaption className="sr-only">{`${t('page')} ${formatNumber(pageNumber, language)}`}</figcaption>
    </figure>
  );
}
