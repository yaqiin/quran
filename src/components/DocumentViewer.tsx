import PageViewer from './PageViewer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';

interface DocumentViewerProps {
  className?: string;
}

export default function DocumentViewer({ className }: DocumentViewerProps) {
  const totalPages = 604; // Total number of pages in the document
  const { t, isRTL, currentLanguage } = useLanguage();

  const {
    isMobile,
    currentPage,
    gotoPage,
    gotoError,
    inputRef,
    setGotoPage,
    handleGoto,
    handleGotoInputKeyDown,
    goToNextPages,
    goToPreviousPages,
    goToFirstPage,
    goToLastPage,
  } = useBrowseQuran(totalPages);

  const getPageDisplay = () => {
    if (isMobile) {
      return [
        <PageViewer
          key={currentPage}
          pageNumber={currentPage}
          totalPages={totalPages}
          className="animate-fadeIn aspect-[3/4] w-full max-w-md"
        />,
      ];
    }

    return [
      <PageViewer
        key={currentPage + 1}
        pageNumber={currentPage + 1}
        totalPages={totalPages}
        className="animate-slideInRight aspect-[3/4] w-1/2 max-w-md"
      />,
      <PageViewer
        key={currentPage}
        pageNumber={currentPage}
        totalPages={totalPages}
        className="animate-slideInLeft aspect-[3/4] w-1/2 max-w-md"
      />,
    ];
  };

  const getNavigationIcons = () => {
    return isRTL
      ? {
          first: <SkipForward className="h-4 w-4" />,
          previous: <ChevronRight className="h-4 w-4" />,
          next: <ChevronLeft className="h-4 w-4" />,
          last: <SkipBack className="h-4 w-4" />,
        }
      : {
          first: <SkipBack className="h-4 w-4" />,
          previous: <ChevronLeft className="h-4 w-4" />,
          next: <ChevronRight className="h-4 w-4" />,
          last: <SkipForward className="h-4 w-4" />,
        };
  };

  const icons = getNavigationIcons();

  return (
    <div className={className} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col items-center space-y-8">
        {/* Pages container */}
        <div
          className={`flex w-full items-center justify-center gap-1 md:gap-2 lg:gap-3 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {getPageDisplay()}
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            title={t('firstPage')}
            aria-label={t('firstPage')}
          >
            {icons.first}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPages}
            disabled={currentPage === 1}
            title={t('previousPage')}
            aria-label={t('previousPage')}
          >
            {icons.previous}
          </Button>

          <div className="mx-4 text-sm font-medium">
            <span>{currentPage.toLocaleString(currentLanguage)}</span>
            {!isMobile && currentPage + 1 <= totalPages && (
              <>
                <span className="mx-1">-</span>
                <span>{(currentPage + 1).toLocaleString(currentLanguage)}</span>
              </>
            )}
            <span className="mx-1 text-muted-foreground">{t('of')}</span>
            <span>{totalPages.toLocaleString(currentLanguage)}</span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPages}
            disabled={isMobile ? currentPage === totalPages : currentPage + 1 >= totalPages}
            title={t('nextPage')}
            aria-label={t('nextPage')}
          >
            {icons.next}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToLastPage}
            disabled={isMobile ? currentPage === totalPages : currentPage + 1 >= totalPages}
            title={t('lastPage')}
            aria-label={t('lastPage')}
          >
            {icons.last}
          </Button>
        </div>

        {/* Page number input */}
        <div className="flex flex-col items-center gap-1">
          <label
            htmlFor="goto-input"
            className="mb-1 w-full text-xs font-bold text-muted-foreground md:text-sm"
            style={{ textAlign: isRTL ? 'right' : 'left' }}
          >
            {t('goToPage')}
          </label>
          <div className="flex items-center gap-2">
            <input
              id="goto-input"
              ref={inputRef}
              type="number"
              min={1}
              max={totalPages}
              value={gotoPage}
              onChange={(e) => setGotoPage(e.target.value.replace(/\D/, ''))}
              onKeyDown={handleGotoInputKeyDown}
              className={`h-10 w-20 rounded border px-2 text-center transition-all focus:ring-2 focus:ring-primary md:w-28 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              aria-label={t('pageNumber')}
              dir="ltr" // Always LTR for numbers
            />
            <Button variant="secondary" onClick={handleGoto}>
              {t('goTo')}
            </Button>
          </div>
          {gotoError && (
            <div className="animate-fadeIn mt-2 text-xs text-red-500" role="alert">
              {gotoError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
