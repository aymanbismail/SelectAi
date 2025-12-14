'use client';

import { useAppReady } from '@/contexts/app-ready-context';

export function GatedApp({ children }: { children: React.ReactNode }) {
  const { isAppReady } = useAppReady();
  if (!isAppReady) return null;
  return children as React.ReactElement;
}
