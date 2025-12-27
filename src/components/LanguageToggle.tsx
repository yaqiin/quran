import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const LanguageToggle = () => {
  const { language, setLanguage, t, supportedLanguages, isRTL } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5 px-2" aria-label={t('toggleLanguage')}>
          <Globe className="h-4 w-4 shrink-0" />
          <span className="hidden text-sm font-medium sm:inline">{supportedLanguages[language].nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="min-w-[140px]">
        {Object.entries(supportedLanguages).map(([code, config]) => {
          const isActive = language === code;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-2',
                isActive && 'bg-accent font-medium',
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{config.nativeName}</span>
                <span className="text-xs text-muted-foreground">({config.name})</span>
              </span>
              {isActive && <Check className="h-4 w-4 shrink-0 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
