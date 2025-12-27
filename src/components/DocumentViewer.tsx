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
          className="animate-fade-in aspect-[3/4] w-full max-w-md"
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
        <div className="flex items-center justify-center gap-1.5 rounded-lg border bg-card p-2 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            title={t('firstPage')}
            aria-label={t('firstPage')}
            className="h-9 w-9"
          >
            {icons.first}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousPages}
            disabled={currentPage === 1}
            title={t('previousPage')}
            aria-label={t('previousPage')}
            className="h-9 w-9"
          >
            {icons.previous}
          </Button>

          <div className="mx-3 flex items-center gap-1 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
            <span className="text-foreground">{currentPage.toLocaleString(currentLanguage)}</span>
            {!isMobile && currentPage + 1 <= totalPages && (
              <>
                <span className="text-muted-foreground">-</span>
                <span className="text-foreground">{(currentPage + 1).toLocaleString(currentLanguage)}</span>
              </>
            )}
            <span className="text-muted-foreground">{t('of')}</span>
            <span className="text-foreground">{totalPages.toLocaleString(currentLanguage)}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextPages}
            disabled={isMobile ? currentPage === totalPages : currentPage + 1 >= totalPages}
            title={t('nextPage')}
            aria-label={t('nextPage')}
            className="h-9 w-9"
          >
            {icons.next}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToLastPage}
            disabled={isMobile ? currentPage === totalPages : currentPage + 1 >= totalPages}
            title={t('lastPage')}
            aria-label={t('lastPage')}
            className="h-9 w-9"
          >
            {icons.last}
          </Button>
        </div>

        {/* Page number input */}
        <div className="flex flex-col items-center gap-2">
          <label
            htmlFor="goto-input"
            className="text-xs font-medium text-muted-foreground"
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
              className={`h-10 w-20 rounded-md border border-input bg-background px-3 text-center text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:w-28 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              aria-label={t('pageNumber')}
              dir="ltr" // Always LTR for numbers
            />
            <Button variant="default" onClick={handleGoto} className="h-10">
              {t('goTo')}
            </Button>
          </div>
          {gotoError && (
            <div className="animate-fade-in text-xs text-destructive" role="alert">
              {gotoError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
