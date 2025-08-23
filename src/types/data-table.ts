import type { Column } from '@tanstack/react-table';
import { dataTableConfig } from '@/config/data-table';

// Basic option type used by faceted filters and selects
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number; // e.g. facet hit count
  // Allow passing arbitrary metadata without widening core shape
  meta?: Record<string, unknown>;
}

// Derive union types from config so they stay in sync
export type FilterVariant = (typeof dataTableConfig)['filterVariants'][number];
export type FilterOperator = (typeof dataTableConfig)['operators'][number];
export type SortOrder = (typeof dataTableConfig)['sortOrders'][number]['value'];
export type JoinOperator = (typeof dataTableConfig)['joinOperators'][number];

// Extended sorting structure stored in query params
export interface ExtendedColumnSort<TData = unknown> {
  id: string; // column id
  desc: boolean; // matches TanStack internal shape
  // Optional: allow referencing a column accessor directly (not serialized)
  column?: Column<TData>;
}

// Filter representation stored in query params
export interface ExtendedColumnFilter<TData = unknown> {
  id: string; // column id
  value: string | string[]; // raw value or array (multi-select)
  variant: FilterVariant; // determines UI / operator set
  operator: FilterOperator; // how value compares
  filterId: string; // stable unique id for complex UIs
  // Optional: pointer to column (not serialized)
  column?: Column<TData>;
}

// Utility type for constructing filter UI state (value can be primitive or array or empty)
export type ColumnFilterValue = string | string[] | null | undefined;

// Pinning styles helper prop types (kept here to centralize DT types)
export interface PinningStyleOptions<TData> {
  column: Column<TData>;
  withBorder?: boolean;
}

export type { Option as DataTableOption };
