export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  en: { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
};

export type Language = keyof typeof SUPPORTED_LANGUAGES;

export const translations = {
  ar: {
    siteName: 'القرأن الكريم',
    siteSlogan: 'تصفح الآيات، وامنح قلبك يقينًا لا يزول',
    toggleLanguage: 'English',
    error: 'حدث خطأ في تحميل البيانات',
    pageNotFound: 'عذرًا! الصفحة غير موجودة',
    backHome: 'العودة إلى الصفحة الرئيسية',
    copyright: 'يقين للقرأن الكريم. جميع الحقوق محفوظة.',
    goToPage: 'اذهب إلى صفحة معينة',
    goTo: 'إنتقال',
  },
  en: {
    siteName: 'Holy Quran',
    siteSlogan: 'Light for the Mind, Yaqiin for the Heart',
    toggleLanguage: 'العربية',
    error: 'Error loading data',
    pageNotFound: 'Oops! Page not found',
    backHome: 'Back Home',
    copyright: 'Yaqiin Quran. All rights reserved.',
    goToPage: 'Go To Page',
    goTo: 'Go To',
  }
};

export type TranslationKey = keyof (typeof translations)['ar'];

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
  isLoading: boolean;
}
