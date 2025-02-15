"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const LoadingContext = createContext({});

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 페이지 전환이 완료되면 로딩 상태 해제
    setIsLoading(false);
  }, [pathname, searchParams]);

  const handleLoading = (targetPath) => {
    // 현재 경로와 다른 경우에만 로딩 표시
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

export const useLoading = () => useContext(LoadingContext);
