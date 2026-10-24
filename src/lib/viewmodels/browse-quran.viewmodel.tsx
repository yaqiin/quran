import { useContext, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrowserContext } from '@/contexts/BrowserContext/BrowserContext';
import { Surah, surahList } from '@/data/surah';
import { jozList } from '@/data/joz';
import { getJozForPage, getSurahForPage } from '@/lib/quran';

type Joz = (typeof jozList)[number];

interface BrowseQuranReturnType {
  isMobile: boolean;
  currentPage: number;
  gotoPage: string;
  gotoError: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  setGotoPage: (value: string) => void;
  handleGoto: () => void;
  handleGotoInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetGoto: () => void;
  goToNextPages: () => void;
  goToPreviousPages: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  activeSurah: Surah | undefined;
  activeJoz: Joz | undefined;
  selectSurah: (surah: Surah) => void;
  selectJoz: (joz: Joz) => void;
}

export function useBrowseQuran(totalPages: number): BrowseQuranReturnType {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const {
    currentPage,
    setCurrentPage,
    gotoPage,
    setGotoPage,
    gotoError,
    setGotoError,
    selectedSurahId,
    setSelectedSurahId,
    selectedJozId,
    setSelectedJozId,
  } = useContext(BrowserContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const pageIncrement = isMobile ? 1 : 2;

  // Desktop spreads always start on an odd (right-hand) page. Every component using this hook runs
  // this effect, so the update must be idempotent: decrementing `prev` blindly would apply once per
  // component and overshoot (page 2 → 0 → -1 ...).
  useEffect(() => {
    if (!isMobile && currentPage % 2 === 0) {
      setCurrentPage((prev) => (prev % 2 === 0 ? Math.max(1, prev - 1) : prev));
    }
  }, [isMobile, currentPage, setCurrentPage]);

  // An explicit pick from the table of contents wins while its first page is on screen;
  // otherwise fall back to whatever starts on or before the first visible page.
  const lastVisiblePage = isMobile ? currentPage : Math.min(currentPage + 1, totalPages);
  const isVisible = (page: number) => page >= currentPage && page <= lastVisiblePage;

  const selectedJoz = jozList.find((joz) => joz.id === selectedJozId);
  const activeJoz = selectedJoz && isVisible(selectedJoz.page) ? selectedJoz : getJozForPage(currentPage);

  // After picking a Juz, name the Surah it opens in rather than the one on the first visible page
  const selectedSurah = surahList.find((surah) => surah.id === selectedSurahId);
  const activeSurah =
    selectedSurah && isVisible(selectedSurah.page)
      ? selectedSurah
      : getSurahForPage(selectedJoz && isVisible(selectedJoz.page) ? selectedJoz.page : currentPage);

  const selectSurah = (surah: Surah) => {
    setSelectedSurahId(surah.id);
    setSelectedJozId(null);
    setCurrentPage(surah.page);
  };

  const selectJoz = (joz: Joz) => {
    setSelectedJozId(joz.id);
    setSelectedSurahId(null);
    setCurrentPage(joz.page);
  };

  // Navigation handlers
  const goToNextPages = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + pageIncrement));
  };

  const goToPreviousPages = () => {
    setCurrentPage((prev) => Math.max(1, prev - pageIncrement));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    const lastPage = isMobile ? totalPages : totalPages % 2 === 0 ? totalPages - 1 : totalPages;
    setCurrentPage(lastPage);
  };

  const handleGoto = () => {
    const page = parseInt(gotoPage, 10);
    if (isNaN(page) || page < 1 || page > totalPages) {
      setGotoError(t('pageNumberError').replace('{min}', '1').replace('{max}', String(totalPages)));
      inputRef.current?.focus();
    } else {
      setCurrentPage(page);
      setGotoError(null);
      setGotoPage(String(page));
      inputRef.current?.blur();
    }
  };

  const handleGotoInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGoto();
    } else if (e.key === 'Escape') {
      resetGoto();
      inputRef.current?.blur();
    }
  };

  // Discard an unsubmitted or invalid entry
  const resetGoto = () => {
    setGotoPage(String(currentPage));
    setGotoError(null);
  };

  useEffect(() => {
    setGotoPage(String(currentPage));
    setGotoError(null);
  }, [currentPage, setGotoError, setGotoPage]);

  return {
    isMobile,
    currentPage,
    gotoPage,
    gotoError,
    inputRef,
    setGotoPage,
    handleGoto,
    handleGotoInputKeyDown,
    resetGoto,
    goToNextPages,
    goToPreviousPages,
    goToFirstPage,
    goToLastPage,
    activeSurah,
    activeJoz,
    selectSurah,
    selectJoz,
  };
}
