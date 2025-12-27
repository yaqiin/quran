import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="yaqiin-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="يقين"
            className="h-10 w-10 rounded-lg object-contain transition-transform hover:scale-105"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">{t('siteName')}</h1>
            <p className="text-xs text-muted-foreground">{t('siteSlogan')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
