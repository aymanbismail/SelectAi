'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

type AppReadyContextValue = {
  isAppReady: boolean;
  isFirstVisit: boolean;
};

const AppReadyContext = createContext<AppReadyContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'select-ai-initial-load';

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const readyTimer = useRef<number | null>(null);

  useEffect(() => {
    // Determine first visit for the session
    const hasLoaded = sessionStorage.getItem(STORAGE_KEY);
    const first = !hasLoaded;
    setIsFirstVisit(first);

    if (first) {
      // Mark session as loaded immediately so subsequent navigations skip loader
      sessionStorage.setItem(STORAGE_KEY, 'true');
      // Gate the app until we intentionally release it
      // Keep short but perceptible; do not block indefinitely
      readyTimer.current = window.setTimeout(() => {
        setIsAppReady(true);
      }, 1200);
    } else {
      // Not first visit: app is immediately ready
      setIsAppReady(true);
    }

    return () => {
      if (readyTimer.current) {
        window.clearTimeout(readyTimer.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({ isAppReady, isFirstVisit }),
    [isAppReady, isFirstVisit]
  );
  return (
    <AppReadyContext.Provider value={value}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  const ctx = useContext(AppReadyContext);
  if (!ctx) throw new Error('useAppReady must be used within AppReadyProvider');
  return ctx;
}
