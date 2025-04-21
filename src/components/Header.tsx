import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="top-0 z-10 bg-background/80 shadow-sm backdrop-blur-sm dark:shadow-yaqiin-50/5">
      <div className="yaqiin-container flex items-center justify-between">
      </div>
      <div className="flex flex-col items-center mb-12">
        <img
          src="/logo.png"
          alt="يقين"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-4xl font-bold text-yaqiin-800 dark:text-yaqiin-500 mb-2">{t('siteName')}</h1>
        <p>{t('siteSlogan')}</p>

        <div className="flex items-center gap-2 mt-4">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
