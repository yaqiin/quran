import { createContext } from 'react';

interface BrowserContextType {
  gotoError: string | null;
  setGotoError: React.Dispatch<React.SetStateAction<string>>;
  gotoPage: string;
  setGotoPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  // Surah / Juz the reader picked from the table of contents. Several Surahs can share a page and
  // spreads start on odd pages, so the target can't always be recovered from currentPage alone.
  selectedSurahId: number | null;
  setSelectedSurahId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedJozId: number | null;
  setSelectedJozId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const BrowserContext = createContext<BrowserContextType | undefined>(undefined);
