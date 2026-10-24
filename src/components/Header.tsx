import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { ModeToggle } from './ModeToggle';
import DisplaySettings from './DisplaySettings';
import { Button } from '@/components/ui/button';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';
import { Github, Menu } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Logo } from './Brand';
import { TOTAL_PAGES, formatNumber } from '@/lib/quran';

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  const { t, isRTL, language } = useLanguage();
  const { currentPage, activeSurah: surah, activeJoz: joz } = useBrowseQuran(TOTAL_PAGES);

  return (
    <header className="relative z-30 w-full shrink-0 px-3 pt-3 md:px-5 md:pt-4">
      <div className="glass flex h-14 items-center justify-between gap-3 rounded-2xl px-2 md:h-16 md:px-4">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSidebar}
            className="h-10 w-10 rounded-full md:hidden"
            aria-label={t('openSidebar')}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="flex items-center gap-2.5" aria-label={`${t('brand')} - ${t('siteName')}`}>
            <Logo className="h-9 w-9 md:h-10 md:w-10" />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-bold text-foreground">{t('brand')}</span>
              <span className="text-xs font-medium text-muted-foreground">{t('siteName')}</span>
            </span>
          </a>
        </div>

        {/* Where am I */}
        {surah && (
          <div className="flex min-w-0 flex-col items-center text-center leading-tight">
            <span className="truncate font-display text-lg font-bold text-foreground md:text-xl">
              {isRTL ? `سورة ${surah.name.ar}` : surah.name.en}
            </span>
            {joz && (
              <span className="mt-0.5 text-[11px] font-medium text-gold md:text-xs">
                {joz.name[isRTL ? 'ar' : 'en']}
                <span className="mx-1.5 text-muted-foreground/50">·</span>
                {t('page')} {formatNumber(currentPage, language)}
              </span>
            )}
          </div>
        )}

        {/* Settings */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggle />
            <ModeToggle />
          </div>
          <div className="lg:hidden">
            <DisplaySettings />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/yaqiin/quran"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-accent-foreground sm:inline-flex"
                aria-label={t('contributeOnGitHub')}
              >
                <Github className="h-[1.1rem] w-[1.1rem]" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('contributeOnGitHub')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
