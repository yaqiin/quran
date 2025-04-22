import React, { ReactNode, useState } from 'react';
import { BrowserContext } from './BrowserContext';

interface BrowserProviderProps {
  children: ReactNode;
}

export const BrowserProvider: React.FC<BrowserProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [gotoPage, setGotoPage] = useState<string>('1');
  const [gotoError, setGotoError] = useState<string | null>(null);

  return (
    <BrowserContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        gotoPage,
        setGotoPage,
        gotoError,
        setGotoError,
      }}
    >
      {children}
    </BrowserContext.Provider>
  );
};
