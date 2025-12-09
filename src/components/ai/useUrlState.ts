'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type {
  FilterState,
  ViewMode,
  SortField,
  SortOrder,
  PricingType
} from './types';

// Default values - single source of truth
export const URL_DEFAULTS = {
  page: 1,
  per_page: 12,
  search: '',
  category: 'all',
  pricing_type: 'all' as PricingType,
  sort_by: 'usage_count' as SortField,
  sort_order: 'desc' as SortOrder,
  view: 'grid' as ViewMode,
  is_featured: false
} as const;

// URL parameter keys
const PARAM_KEYS = {
  page: 'page',
  perPage: 'per_page',
  search: 'search',
  category: 'category',
  pricingType: 'pricing_type',
  sortBy: 'sort_by',
  sortOrder: 'sort_order',
  view: 'view',
  isFeatured: 'is_featured'
} as const;

// Type guards and validators
const isValidSortField = (value: string): value is SortField =>
  ['name', 'created_at', 'usage_count', 'average_rating'].includes(value);

const isValidSortOrder = (value: string): value is SortOrder =>
  ['asc', 'desc'].includes(value);

const isValidViewMode = (value: string): value is ViewMode =>
  ['grid', 'table'].includes(value);

const isValidPricingType = (value: string): value is PricingType =>
  ['free', 'freemium', 'paid', 'enterprise', 'all'].includes(value);

const parseNumber = (
  value: string | null,
  fallback: number,
  min = 1
): number => {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) || parsed < min ? fallback : parsed;
};

const parseBoolean = (value: string | null): boolean => {
  return value === 'true' || value === '1';
};

export interface UrlState {
  filters: FilterState;
  viewMode: ViewMode;
  currentPage: number;
  perPage: number;
}

export interface UrlStateActions {
  setFilters: (filters: FilterState) => void;
  setViewMode: (mode: ViewMode) => void;
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  resetFilters: () => void;
}

/**
 * Custom hook for synchronizing UI state with URL query parameters.
 * The URL becomes the single source of truth for all filter/pagination/view state.
 */
export function useUrlState(): UrlState & UrlStateActions {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current URL state
  const state = useMemo((): UrlState => {
    const search = searchParams.get(PARAM_KEYS.search) ?? URL_DEFAULTS.search;
    const category =
      searchParams.get(PARAM_KEYS.category) ?? URL_DEFAULTS.category;

    const pricingTypeParam = searchParams.get(PARAM_KEYS.pricingType);
    const pricing_type =
      pricingTypeParam && isValidPricingType(pricingTypeParam)
        ? pricingTypeParam
        : URL_DEFAULTS.pricing_type;

    const sortByParam = searchParams.get(PARAM_KEYS.sortBy);
    const sort_by =
      sortByParam && isValidSortField(sortByParam)
        ? sortByParam
        : URL_DEFAULTS.sort_by;

    const sortOrderParam = searchParams.get(PARAM_KEYS.sortOrder);
    const sort_order =
      sortOrderParam && isValidSortOrder(sortOrderParam)
        ? sortOrderParam
        : URL_DEFAULTS.sort_order;

    const viewParam = searchParams.get(PARAM_KEYS.view);
    const viewMode =
      viewParam && isValidViewMode(viewParam) ? viewParam : URL_DEFAULTS.view;

    const featured_only = parseBoolean(searchParams.get(PARAM_KEYS.isFeatured));
    const currentPage = parseNumber(
      searchParams.get(PARAM_KEYS.page),
      URL_DEFAULTS.page
    );
    const perPage = parseNumber(
      searchParams.get(PARAM_KEYS.perPage),
      URL_DEFAULTS.per_page
    );

    return {
      filters: {
        search,
        category,
        pricing_type,
        featured_only,
        sort_by,
        sort_order
      },
      viewMode,
      currentPage,
      perPage
    };
  }, [searchParams]);

  // Build URL with new params, removing defaults to keep URL clean
  const buildUrl = useCallback(
    (
      updates: Partial<{
        filters: Partial<FilterState>;
        viewMode: ViewMode;
        currentPage: number;
        perPage: number;
      }>
    ) => {
      const newParams = new URLSearchParams();

      // Merge current state with updates
      const newFilters = { ...state.filters, ...updates.filters };
      const newViewMode = updates.viewMode ?? state.viewMode;
      const newCurrentPage = updates.currentPage ?? state.currentPage;
      const newPerPage = updates.perPage ?? state.perPage;

      // Only add non-default values to URL
      if (newCurrentPage !== URL_DEFAULTS.page) {
        newParams.set(PARAM_KEYS.page, String(newCurrentPage));
      }
      if (newPerPage !== URL_DEFAULTS.per_page) {
        newParams.set(PARAM_KEYS.perPage, String(newPerPage));
      }
      if (newFilters.search && newFilters.search !== URL_DEFAULTS.search) {
        newParams.set(PARAM_KEYS.search, newFilters.search);
      }
      if (
        newFilters.category &&
        newFilters.category !== URL_DEFAULTS.category
      ) {
        newParams.set(PARAM_KEYS.category, newFilters.category);
      }
      if (newFilters.pricing_type !== URL_DEFAULTS.pricing_type) {
        newParams.set(PARAM_KEYS.pricingType, newFilters.pricing_type);
      }
      if (newFilters.sort_by !== URL_DEFAULTS.sort_by) {
        newParams.set(PARAM_KEYS.sortBy, newFilters.sort_by);
      }
      if (newFilters.sort_order !== URL_DEFAULTS.sort_order) {
        newParams.set(PARAM_KEYS.sortOrder, newFilters.sort_order);
      }
      if (newViewMode !== URL_DEFAULTS.view) {
        newParams.set(PARAM_KEYS.view, newViewMode);
      }
      if (newFilters.featured_only !== URL_DEFAULTS.is_featured) {
        newParams.set(PARAM_KEYS.isFeatured, String(newFilters.featured_only));
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
  const setFilters = useCallback(
    (filters: FilterState) => {
      // Reset to page 1 when filters change
      updateUrl(buildUrl({ filters, currentPage: 1 }));
    },
    [buildUrl, updateUrl]
  );

  const setViewMode = useCallback(
    (viewMode: ViewMode) => {
      updateUrl(buildUrl({ viewMode }));
    },
    [buildUrl, updateUrl]
  );

  const setCurrentPage = useCallback(
    (currentPage: number) => {
      updateUrl(buildUrl({ currentPage }));
    },
    [buildUrl, updateUrl]
  );

  const setPerPage = useCallback(
    (perPage: number) => {
      // Reset to page 1 when per_page changes
      updateUrl(buildUrl({ perPage, currentPage: 1 }));
    },
    [buildUrl, updateUrl]
  );

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      const newFilters = { ...state.filters, [key]: value };
      // Reset to page 1 when filters change
      updateUrl(buildUrl({ filters: newFilters, currentPage: 1 }));
    },
    [state.filters, buildUrl, updateUrl]
  );

  const resetFilters = useCallback(() => {
    // Reset all filters to defaults, keep view mode
    const defaultFilters: FilterState = {
      search: URL_DEFAULTS.search,
      category: URL_DEFAULTS.category,
      pricing_type: URL_DEFAULTS.pricing_type,
      featured_only: URL_DEFAULTS.is_featured,
      sort_by: URL_DEFAULTS.sort_by,
      sort_order: URL_DEFAULTS.sort_order
    };
    updateUrl(buildUrl({ filters: defaultFilters, currentPage: 1 }));
  }, [buildUrl, updateUrl]);

  return {
    ...state,
    setFilters,
    setViewMode,
    setCurrentPage,
    setPerPage,
    updateFilter,
    resetFilters
  };
}
