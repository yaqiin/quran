import { useLanguage } from '@/contexts/LanguageContext';
import SegmentedControl from './SegmentedControl';

/** Every language is visible and one tap away. */
const LanguageToggle = ({ showLabels, className }: { showLabels?: boolean; className?: string }) => {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();

  return (
    <SegmentedControl
      label={t('toggleLanguage')}
      value={language}
      onChange={setLanguage}
      className={className ?? 'w-[5.5rem]'}
      options={Object.entries(supportedLanguages).map(([code, config]) => ({
        value: code,
        label: showLabels ? config.nativeName : config.shortName,
      }))}
    />
  );
};

export default LanguageToggle;
