import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TOTAL_PAGES, formatNumber } from '@/lib/quran';
import { cn } from '@/lib/utils';

const NavButton = ({
  label,
  onClick,
  disabled,
  primary,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  primary?: boolean;
  children: React.ReactNode;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={cn(
          'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35',
          primary
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:bg-primary/90'
            : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground',
        )}
      >
        {children}
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export default function ReaderControls() {
  const { t, isRTL, language } = useLanguage();
  const {
    isMobile,
    currentPage,
    gotoPage,
    gotoError,
    inputRef,
    setGotoPage,
    handleGoto,
    handleGotoInputKeyDown,
    resetGoto,
    goToNextPages,
    goToPreviousPages,
    goToFirstPage,
    goToLastPage,
  } = useBrowseQuran(TOTAL_PAGES);

  const lastVisiblePage = isMobile ? currentPage : Math.min(currentPage + 1, TOTAL_PAGES);
  const atStart = currentPage === 1;
  const atEnd = lastVisiblePage >= TOTAL_PAGES;
  const progress = (lastVisiblePage / TOTAL_PAGES) * 100;

  const icon = 'h-[1.15rem] w-[1.15rem]';

  return (
    <div className="mx-auto flex w-full max-w-lg shrink-0 flex-col items-center gap-2">
      <div className="glass relative flex w-full items-center justify-between gap-1 overflow-hidden rounded-full p-1.5 shadow-xl shadow-black/[0.04]">
        <div className="flex items-center gap-0.5">
          <NavButton label={t('firstPage')} onClick={goToFirstPage} disabled={atStart}>
            {isRTL ? <ChevronsRight className={icon} /> : <ChevronsLeft className={icon} />}
          </NavButton>
          <NavButton label={t('previousPage')} onClick={goToPreviousPages} disabled={atStart} primary>
            {isRTL ? <ChevronRight className={icon} /> : <ChevronLeft className={icon} />}
          </NavButton>
        </div>

        {/* Page indicator doubles as the "go to page" field */}
        <form
          className="flex min-w-0 items-center gap-1.5 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
            handleGoto();
          }}
        >
          <label htmlFor="goto-input" className="hidden text-muted-foreground sm:inline">
            {t('page')}
          </label>
          <input
            id="goto-input"
            ref={inputRef}
            type="number"
            inputMode="numeric"
            min={1}
            max={TOTAL_PAGES}
            value={gotoPage}
            onChange={(e) => setGotoPage(e.target.value.replace(/\D/g, ''))}
            onKeyDown={handleGotoInputKeyDown}
            onFocus={(e) => e.target.select()}
            onBlur={resetGoto}
            aria-label={t('pageNumber')}
            aria-invalid={!!gotoError}
            dir="ltr"
            className={cn(
              'h-9 w-14 rounded-full border bg-background/70 text-center font-semibold tabular-nums text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30',
              gotoError && 'border-destructive focus:border-destructive focus:ring-destructive/30',
            )}
          />
          {!isMobile && lastVisiblePage !== currentPage && (
            <span className="tabular-nums text-foreground/70">– {formatNumber(lastVisiblePage, language)}</span>
          )}
          <span className="whitespace-nowrap text-muted-foreground">
            {t('of')} <span className="tabular-nums">{formatNumber(TOTAL_PAGES, language)}</span>
          </span>
        </form>

        <div className="flex items-center gap-0.5">
          <NavButton label={t('nextPage')} onClick={goToNextPages} disabled={atEnd} primary>
            {isRTL ? <ChevronLeft className={icon} /> : <ChevronRight className={icon} />}
          </NavButton>
          <NavButton label={t('lastPage')} onClick={goToLastPage} disabled={atEnd}>
            {isRTL ? <ChevronsLeft className={icon} /> : <ChevronsRight className={icon} />}
          </NavButton>
        </div>

        {/* Reading progress */}
        <span
          className="absolute bottom-0 end-6 start-6 h-[3px] overflow-hidden rounded-full bg-foreground/[0.06]"
          aria-hidden="true"
        >
          <span
            className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-l from-primary to-gold transition-[width] duration-500 ltr:bg-gradient-to-r"
            style={{ width: `${progress}%` }}
          />
        </span>
      </div>

      <p
        className={cn('h-4 text-xs', gotoError ? 'text-destructive' : 'hidden text-muted-foreground md:block')}
        role={gotoError ? 'alert' : undefined}
      >
        {gotoError ?? t('keyboardHint')}
      </p>
    </div>
  );
}
