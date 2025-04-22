import { useContext, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrowserContext } from '@/contexts/BrowserContext/BrowserContext';

interface BrowseQuranReturnType {
  isMobile: boolean;
  currentPage: number;
  gotoPage: string;
  gotoError: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  setGotoPage: (value: string) => void;
  handleGoto: () => void;
  handleGotoInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  goToNextPages: () => void;
  goToPreviousPages: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export function useBrowseQuran(totalPages: number): BrowseQuranReturnType {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const { currentPage, setCurrentPage, gotoPage, setGotoPage, gotoError, setGotoError } = useContext(BrowserContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const pageIncrement = isMobile ? 1 : 2;

  // Adjust page number when switching between mobile/desktop
  useEffect(() => {
    if (!isMobile && currentPage % 2 === 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [isMobile, currentPage, setCurrentPage]);

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
    }
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
    goToNextPages,
    goToPreviousPages,
    goToFirstPage,
    goToLastPage,
  };
}
