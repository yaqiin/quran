import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserContext } from './BrowserContext';
import { TOTAL_PAGES } from '@/lib/quran';

interface BrowserProviderProps {
  children: ReactNode;
}

const LAST_PAGE_KEY = 'lastPage';

// Resume reading where the user left off
const readLastPage = () => {
  try {
    const page = parseInt(localStorage.getItem(LAST_PAGE_KEY) ?? '', 10);
    return page >= 1 && page <= TOTAL_PAGES ? page : 1;
  } catch {
    return 1;
  }
};

export const BrowserProvider: React.FC<BrowserProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(readLastPage);
  const [gotoPage, setGotoPage] = useState<string>(() => String(currentPage));
  const [gotoError, setGotoError] = useState<string | null>(null);
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);
  const [selectedJozId, setSelectedJozId] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LAST_PAGE_KEY, String(currentPage));
    } catch {
      // Storage unavailable (private mode); nothing to persist
    }
  }, [currentPage]);

  return (
    <BrowserContext.Provider
      value={{
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
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};
