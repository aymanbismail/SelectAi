'use client';

import React from 'react';

interface TenantContextType {
  activeTenant: { id: string; name: string };
  isLoadingCategories: boolean;
  setActiveTenant: (tenant: { id: string; name: string }) => void;
  setIsLoadingCategories: (loading: boolean) => void;
}

const TenantContext = React.createContext<TenantContextType | null>(null);

export function useTenant() {
  const context = React.useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [activeTenant, setActiveTenant] = React.useState({
    id: '1',
    name: 'AI Tools'
  });
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);

  const value = React.useMemo(
    () => ({
      activeTenant,
      isLoadingCategories,
      setActiveTenant,
      setIsLoadingCategories
    }),
    [activeTenant, isLoadingCategories]
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}
