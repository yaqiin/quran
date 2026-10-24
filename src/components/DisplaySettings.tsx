import { SlidersHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { ModeToggle } from './ModeToggle';

/** Compact entry point for theme and language on small screens. */
export default function DisplaySettings() {
  const { t, isRTL } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-primary"
          aria-label={t('displaySettings')}
        >
          <SlidersHorizontal className="h-[1.1rem] w-[1.1rem]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={isRTL ? 'start' : 'end'}
        sideOffset={10}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-72 rounded-2xl p-4 shadow-xl"
      >
        <p className="font-display text-base font-bold">{t('displaySettings')}</p>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{t('appearance')}</p>
            <ModeToggle showLabels className="w-full" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{t('languageLabel')}</p>
            <LanguageToggle showLabels className="w-full" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
