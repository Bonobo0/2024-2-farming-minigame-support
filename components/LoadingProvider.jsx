"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const LoadingContext = createContext({});

function LoadingStateManager({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  const handleLoading = (targetPath) => {
    if (targetPath !== pathname) {
      setIsLoading(true);
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: handleLoading }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}

export function LoadingProvider({ children }) {
  return (
    <Suspense>
      <LoadingStateManager>{children}</LoadingStateManager>
    </Suspense>
  );
}

export const useLoading = () => useContext(LoadingContext);
