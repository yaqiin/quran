import { createContext } from 'react';

interface BrowserContextType {
  gotoError: string | null;
  setGotoError: React.Dispatch<React.SetStateAction<string>>;
  gotoPage: string;
  setGotoPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const BrowserContext = createContext<BrowserContextType | undefined>(undefined);
