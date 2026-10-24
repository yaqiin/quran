import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import SegmentedControl from './SegmentedControl';

type Theme = 'light' | 'dark' | 'system';

/** Light / dark / system in one tap — no menu to open. */
export function ModeToggle({ showLabels, className }: { showLabels?: boolean; className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: the stored theme is only known on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const icon = 'h-4 w-4 shrink-0';

  return (
    <SegmentedControl<Theme>
      label={t('toggleTheme')}
      value={mounted ? ((theme as Theme | undefined) ?? 'system') : 'system'}
      onChange={setTheme}
      iconOnly={!showLabels}
      className={className ?? 'w-[7.5rem]'}
      options={[
        { value: 'light', label: t('themeLight'), icon: <Sun className={icon} /> },
        { value: 'dark', label: t('themeDark'), icon: <Moon className={icon} /> },
        { value: 'system', label: t('themeSystem'), icon: <Monitor className={icon} /> },
      ]}
    />
  );
}
