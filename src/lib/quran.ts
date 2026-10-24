import { jozList } from '@/data/joz';
import { Surah, surahList } from '@/data/surah';

export const TOTAL_PAGES = 604;

/** Width / height of a mushaf page SVG (510.236 × 729.448). */
export const PAGE_ASPECT_RATIO = 510.236 / 729.448;

export const getPageUrl = (page: number) =>
  `https://raw.githubusercontent.com/yaqiin/quran-svg/refs/heads/main/hafs/${page.toString().padStart(3, '0')}.svg`;

const findLastStartingBefore = <T extends { page: number }>(list: T[], page: number): T | undefined => {
  for (let i = list.length - 1; i >= 0; i--) {
    if (page >= list[i].page) return list[i];
  }
  return undefined;
};

export const getSurahForPage = (page: number): Surah | undefined => findLastStartingBefore(surahList, page);

export const getJozForPage = (page: number) => findLastStartingBefore(jozList, page);

/** Arabic UI uses Arabic-Indic digits, matching the Juz labels in the data. */
export const formatNumber = (value: number, language: string) =>
  value.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US');

/** Loose Arabic matching: ignores diacritics, tatweel and alef/yaa/taa-marbuta variants. */
export const normalizeArabic = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/['’\-\s]/g, '');
