import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const LanguageToggle = () => {
  const { language, setLanguage, t, supportedLanguages, isRTL } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t('toggleLanguage')}>
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('toggleLanguage')}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="min-w-[120px]">
        {Object.entries(supportedLanguages).map(([code, config]) => {
          const isActive = language === code;
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={cn(
                'flex cursor-pointer items-center justify-between',
                isActive && 'bg-accent font-medium',
              )}
            >
              <span className="text-sm">{config.nativeName}</span>
              {isActive && <Check className="h-4 w-4 shrink-0 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
