export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  shortName: string;
  dir: 'rtl' | 'ltr';
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', shortName: 'ع', dir: 'rtl' },
  en: { code: 'en', name: 'English', nativeName: 'English', shortName: 'EN', dir: 'ltr' },
};

export type Language = keyof typeof SUPPORTED_LANGUAGES;

export const translations = {
  ar: {
    siteName: 'القرآن الكريم',
    siteSlogan: 'نور للعقل، يقين للقلب',
    toggleLanguage: 'تغيير اللغة',
    error: 'حدث خطأ في تحميل البيانات',
    pageNotFound: 'عذرًا! الصفحة غير موجودة',
    backHome: 'العودة إلى الصفحة الرئيسية',
    copyright: 'يقين للقرآن الكريم. جميع الحقوق محفوظة.',
    goToPage: 'اذهب إلى صفحة معينة',
    goTo: 'انتقال',
    firstPage: 'الصفحة الأولى',
    previousPage: 'الصفحة السابقة',
    lastPage: 'الصفحة الأخيرة',
    nextPage: 'الصفحة التالية',
    of: 'من',
    pageNumber: 'رقم الصفحة',
    pageNumberError: 'أدخل رقمًا بين {min} و{max}',
    contributeOnGitHub: 'المساهمة على GitHub',
    toggleTheme: 'تبديل المظهر',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    themeSystem: 'النظام',
    brand: 'يقين',
    tableOfContents: 'الفهرس',
    tocSummary: '١١٤ سورة · ٣٠ جزءًا',
    surahs: 'السور',
    juz: 'الأجزاء',
    juzSingular: 'الجزء',
    searchSurah: 'ابحث باسم السورة أو رقمها',
    noResults: 'لم يتم العثور على نتائج',
    pageShort: 'ص',
    page: 'صفحة',
    openSidebar: 'فتح الفهرس',
    closeSidebar: 'إغلاق الفهرس',
    loading: 'جاري التحميل...',
    pageLoadError: 'تعذّر تحميل الصفحة {page}',
    retry: 'إعادة المحاولة',
    keyboardHint: 'استخدم الأسهم ← → للتنقل',
    displaySettings: 'إعدادات العرض',
    appearance: 'المظهر',
    languageLabel: 'اللغة',
  },
  en: {
    siteName: 'Holy Quran',
    siteSlogan: 'Light for the Mind, Yaqiin for the Heart',
    toggleLanguage: 'Change Language',
    error: 'Error loading data',
    pageNotFound: 'Oops! Page not found',
    backHome: 'Back Home',
    copyright: 'Yaqiin Quran. All rights reserved.',
    goToPage: 'Go To Page',
    goTo: 'Go To',
    firstPage: 'First Page',
    previousPage: 'Previous Page',
    lastPage: 'Last Page',
    nextPage: 'Next Page',
    of: 'of',
    pageNumber: 'Page Number',
    pageNumberError: 'Enter a number between {min} and {max}',
    contributeOnGitHub: 'Contribute on GitHub',
    toggleTheme: 'Toggle Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    brand: 'Yaqiin',
    tableOfContents: 'Contents',
    tocSummary: '114 Surahs · 30 Juz',
    surahs: 'Surahs',
    juz: 'Juz',
    juzSingular: 'Juz',
    searchSurah: 'Search by name or number',
    noResults: 'No results found',
    pageShort: 'p.',
    page: 'Page',
    openSidebar: 'Open contents',
    closeSidebar: 'Close contents',
    loading: 'Loading...',
    pageLoadError: 'Could not load page {page}',
    retry: 'Retry',
    keyboardHint: 'Use ← → arrow keys to turn pages',
    displaySettings: 'Display settings',
    appearance: 'Appearance',
    languageLabel: 'Language',
  },
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
