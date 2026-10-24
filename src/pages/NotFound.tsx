import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GeometricPattern, Logo } from '@/components/Brand';

const NotFound = () => {
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/80 via-background to-background dark:from-accent/50" />
      <GeometricPattern className="absolute inset-0 -z-10 h-full w-full text-foreground/[0.035] dark:text-white/[0.02]" />

      <div className="text-center">
        <Logo className="mx-auto h-14 w-14" />
        <h1 className="mt-6 font-display text-6xl font-bold text-foreground">404</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t('pageNotFound')}</p>
        <a
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
        >
          {t('backHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
