'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { CategoryCardGrid } from './category-card-grid';
import { ViewToggle } from '@/components/ui/table/view-toggle';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';

type ViewMode = 'table' | 'cards';

interface CategoryProductTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
  categoryId: string;
}

export function CategoryProductTable<TData, TValue>({
  data,
  totalItems,
  columns,
  categoryId
}: CategoryProductTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [viewMode, setViewMode] = useQueryState(
    'view',
    parseAsStringLiteral(['table', 'cards'] as const).withDefault(
      'cards' as ViewMode // Default to cards view for category pages
    )
  );

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // product data
    columns, // product columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });

  const toolbarChildren = (
    <ViewToggle value={viewMode} onValueChange={setViewMode} />
  );

  if (viewMode === 'cards') {
    return (
      <CategoryCardGrid table={table} categoryId={categoryId}>
        <DataTableToolbar table={table}>{toolbarChildren}</DataTableToolbar>
      </CategoryCardGrid>
    );
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>{toolbarChildren}</DataTableToolbar>
    </DataTable>
  );
}
