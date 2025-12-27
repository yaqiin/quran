import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { t, isRTL } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const getThemeIcon = () => {
    if (theme === 'light') {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
    if (theme === 'dark') {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    }
    return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t('toggleTheme')}>
              {getThemeIcon()}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('toggleTheme')}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn('flex cursor-pointer items-center justify-between', theme === 'light' && 'bg-accent font-medium')}
        >
          <span className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span className="text-sm">{t('themeLight')}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn('flex cursor-pointer items-center justify-between', theme === 'dark' && 'bg-accent font-medium')}
        >
          <span className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="text-sm">{t('themeDark')}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn('flex cursor-pointer items-center justify-between', theme === 'system' && 'bg-accent font-medium')}
        >
          <span className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="text-sm">{t('themeSystem')}</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
