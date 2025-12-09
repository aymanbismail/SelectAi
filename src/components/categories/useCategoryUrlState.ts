'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { CategoryType } from './types';

// Default values for URL state
export const CATEGORY_URL_DEFAULTS = {
  search: '',
  type: 'tool' as CategoryType,
  with_counts: true,
  lang: 'en',
  featured_only: false
} as const;

// URL parameter keys
const PARAM_KEYS = {
  search: 'search',
  type: 'type',
  withCounts: 'with_counts',
  lang: 'lang',
  featuredOnly: 'featured_only'
} as const;

// Type guards
const isValidCategoryType = (value: string): value is CategoryType =>
  ['tool', 'agent'].includes(value);

export interface CategoryUrlState {
  search: string;
  type: CategoryType;
  with_counts: boolean;
  lang: string;
  featured_only: boolean;
}

export interface CategoryUrlStateActions {
  setSearch: (search: string) => void;
  setType: (type: CategoryType) => void;
  setWithCounts: (withCounts: boolean) => void;
  setLang: (lang: string) => void;
  setFeaturedOnly: (featuredOnly: boolean) => void;
  resetFilters: () => void;
}

/**
 * Custom hook for synchronizing category filters with URL query parameters.
 * Ready for future API integration: GET /api/categories?type=tool&with_counts=true&lang=en
 */
export function useCategoryUrlState(): CategoryUrlState &
  CategoryUrlStateActions {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current URL state
  const state = useMemo((): CategoryUrlState => {
    const search =
      searchParams.get(PARAM_KEYS.search) ?? CATEGORY_URL_DEFAULTS.search;

    const typeParam = searchParams.get(PARAM_KEYS.type);
    const type =
      typeParam && isValidCategoryType(typeParam)
        ? typeParam
        : CATEGORY_URL_DEFAULTS.type;

    const withCountsParam = searchParams.get(PARAM_KEYS.withCounts);
    const with_counts =
      withCountsParam !== null
        ? withCountsParam === 'true'
        : CATEGORY_URL_DEFAULTS.with_counts;

    const lang =
      searchParams.get(PARAM_KEYS.lang) ?? CATEGORY_URL_DEFAULTS.lang;

    const featuredOnlyParam = searchParams.get(PARAM_KEYS.featuredOnly);
    const featured_only = featuredOnlyParam === 'true';

    return {
      search,
      type,
      with_counts,
      lang,
      featured_only
    };
  }, [searchParams]);

  // Build URL with new params, removing defaults to keep URL clean
  const buildUrl = useCallback(
    (updates: Partial<CategoryUrlState>) => {
      const newParams = new URLSearchParams();

      // Merge current state with updates
      const newState = { ...state, ...updates };

      // Only add non-default values to URL
      if (newState.search && newState.search !== CATEGORY_URL_DEFAULTS.search) {
        newParams.set(PARAM_KEYS.search, newState.search);
      }
      if (newState.type !== CATEGORY_URL_DEFAULTS.type) {
        newParams.set(PARAM_KEYS.type, newState.type);
      }
      if (newState.with_counts !== CATEGORY_URL_DEFAULTS.with_counts) {
        newParams.set(PARAM_KEYS.withCounts, String(newState.with_counts));
      }
      if (newState.lang !== CATEGORY_URL_DEFAULTS.lang) {
        newParams.set(PARAM_KEYS.lang, newState.lang);
      }
      if (newState.featured_only !== CATEGORY_URL_DEFAULTS.featured_only) {
        newParams.set(PARAM_KEYS.featuredOnly, String(newState.featured_only));
      }

      const queryString = newParams.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, state]
  );

  // Update URL without page reload
  const updateUrl = useCallback(
    (url: string) => {
      router.push(url, { scroll: false });
    },
    [router]
  );

  // Actions
  const setSearch = useCallback(
    (search: string) => {
      updateUrl(buildUrl({ search }));
    },
    [buildUrl, updateUrl]
  );

  const setType = useCallback(
    (type: CategoryType) => {
      updateUrl(buildUrl({ type }));
    },
    [buildUrl, updateUrl]
  );

  const setWithCounts = useCallback(
    (with_counts: boolean) => {
      updateUrl(buildUrl({ with_counts }));
    },
    [buildUrl, updateUrl]
  );

  const setLang = useCallback(
    (lang: string) => {
      updateUrl(buildUrl({ lang }));
    },
    [buildUrl, updateUrl]
  );

  const setFeaturedOnly = useCallback(
    (featured_only: boolean) => {
      updateUrl(buildUrl({ featured_only }));
    },
    [buildUrl, updateUrl]
  );

  const resetFilters = useCallback(() => {
    updateUrl(
      buildUrl({
        search: CATEGORY_URL_DEFAULTS.search,
        featured_only: CATEGORY_URL_DEFAULTS.featured_only
      })
    );
  }, [buildUrl, updateUrl]);

  return {
    ...state,
    setSearch,
    setType,
    setWithCounts,
    setLang,
    setFeaturedOnly,
    resetFilters
  };
}
