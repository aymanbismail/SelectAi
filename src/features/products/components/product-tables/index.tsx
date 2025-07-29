'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { CardGrid } from '@/components/ui/table/card-grid';
import { ViewToggle } from '@/components/ui/table/view-toggle';

import { useDataTable } from '@/hooks/use-data-table';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';

type ViewMode = 'table' | 'cards';

interface ProductTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}

export function ProductTable<TData, TValue>({
  data,
  totalItems,
  columns
}: ProductTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [viewMode, setViewMode] = useQueryState(
    'view',
    parseAsStringLiteral(['table', 'cards'] as const).withDefault(
      'table' as ViewMode
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
      <CardGrid table={table}>
        <DataTableToolbar table={table}>{toolbarChildren}</DataTableToolbar>
      </CardGrid>
    );
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>{toolbarChildren}</DataTableToolbar>
    </DataTable>
  );
}
