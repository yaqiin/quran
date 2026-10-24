import { useEffect, useRef } from 'react';
import PageViewer from './PageViewer';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';
import { TOTAL_PAGES, getPageUrl } from '@/lib/quran';
import { cn } from '@/lib/utils';

interface DocumentViewerProps {
  className?: string;
}

const SWIPE_THRESHOLD = 50;

// Page widths below hardcode PAGE_ASPECT_RATIO (0.6995) since Tailwind classes must be static

export default function DocumentViewer({ className }: DocumentViewerProps) {
  const { isMobile, currentPage, goToNextPages, goToPreviousPages } = useBrowseQuran(TOTAL_PAGES);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastPage = useRef(currentPage);
  const direction = useRef<'next' | 'previous'>('next');

  // Remember which way we turned so the new spread slides in from the matching side
  if (currentPage !== lastPage.current) {
    direction.current = currentPage > lastPage.current ? 'next' : 'previous';
    lastPage.current = currentPage;
  }

  // The mushaf always reads right-to-left, whatever the UI language:
  // ← (or a swipe to the right) turns to the next page.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        target.closest('input, textarea, [role="radiogroup"], [contenteditable="true"]')
      )
        return;
      if (e.key === 'ArrowLeft') {
        goToNextPages();
      } else if (e.key === 'ArrowRight') {
        goToPreviousPages();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goToNextPages, goToPreviousPages]);

  // Warm the cache for the neighbouring spread in both directions
  useEffect(() => {
    const step = isMobile ? 1 : 2;
    const pages = [currentPage + step, currentPage + step + 1, currentPage - step, currentPage - step + 1];
    pages
      .filter((page) => page >= 1 && page <= TOTAL_PAGES)
      .forEach((page) => {
        const img = new Image();
        img.src = getPageUrl(page);
      });
  }, [currentPage, isMobile]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) {
      goToNextPages();
    } else {
      goToPreviousPages();
    }
  };

  // Next page enters from the left, as when turning a mushaf page
  const enterAnimation = direction.current === 'next' ? 'animate-slideInLeft' : 'animate-slideInRight';

  return (
    <div
      className={cn('flex w-full items-center justify-center p-1 [container-type:size]', className)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {isMobile ? (
        <PageViewer
          key={currentPage}
          pageNumber={currentPage}
          totalPages={TOTAL_PAGES}
          side="single"
          className={cn('w-[min(100cqw,calc(100cqh*0.6995))]', enterAnimation)}
        />
      ) : (
        // Right-hand page first: a mushaf spread opens right-to-left
        <div key={currentPage} dir="rtl" className={cn('flex items-stretch', enterAnimation)}>
          <PageViewer
            pageNumber={currentPage}
            totalPages={TOTAL_PAGES}
            side="right"
            className="w-[min(50cqw,calc(100cqh*0.6995))]"
          />
          <PageViewer
            pageNumber={currentPage + 1}
            totalPages={TOTAL_PAGES}
            side="left"
            className="w-[min(50cqw,calc(100cqh*0.6995))]"
          />
        </div>
      )}
    </div>
  );
}
