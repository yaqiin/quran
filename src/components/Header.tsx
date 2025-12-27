import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';
import { Github } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const Header = () => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const totalPages = 604;
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Row: Logo, Title, Controls */}
      <div className="yaqiin-container flex h-14 items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="يقين"
            className="h-8 w-8 rounded-lg object-contain transition-transform hover:scale-105"
          />
          <div className="hidden sm:block">
            <h1 className="text-base font-semibold text-foreground">{t('siteName')}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/yaqiin/quran"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                aria-label={t('contributeOnGitHub')}
              >
                <Github className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('contributeOnGitHub')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Bottom Row: Navigation Controls */}
      <div className="yaqiin-container flex h-12 items-center justify-between gap-2">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            title={t('firstPage')}
            aria-label={t('firstPage')}
            className="h-8 w-8"
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
            className="h-8 w-8"
          >
            {icons.previous}
          </Button>

          <div className="mx-2 flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium">
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
            className="h-8 w-8"
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
            className="h-8 w-8"
          >
            {icons.last}
          </Button>
        </div>

        {/* Page Input & Footer Content */}
        <div className="flex items-center gap-3">
          {/* Page Input */}
          <div className="flex items-center gap-1.5">
            <input
              id="goto-input"
              ref={inputRef}
              type="number"
              min={1}
              max={totalPages}
              value={gotoPage}
              onChange={(e) => setGotoPage(e.target.value.replace(/\D/, ''))}
              onKeyDown={handleGotoInputKeyDown}
              className={`h-8 w-16 rounded-md border border-input bg-background px-2 text-center text-xs transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 md:w-20 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              aria-label={t('pageNumber')}
              dir="ltr"
            />
            <Button variant="default" onClick={handleGoto} className="h-8 px-2 text-xs">
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
    </header>
  );
};

export default Header;
