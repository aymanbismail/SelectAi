'use client';

import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import * as React from 'react';
import { useLocale } from 'next-intl';

import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getCommonPinningStyles } from '@/lib/data-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  /** Render table in RTL (Right-to-Left) by mirroring column order */
  rtl?: boolean;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  rtl = false
}: DataTableProps<TData>) {
  // Auto-detect RTL from the active locale (ar) if rtl prop not explicitly set
  const locale = useLocale?.();
  // Synchronous RTL detection to avoid initial reversal issues
  const computedRTL =
    rtl ||
    locale === 'ar' ||
    (typeof document !== 'undefined' && document.documentElement.dir === 'rtl');
  // Small screen detection (synchronous best-effort)
  const [isRTL, setIsRTL] = React.useState(computedRTL);
  React.useEffect(() => {
    if (computedRTL !== isRTL) setIsRTL(computedRTL);
  }, [computedRTL, isRTL]);

  // Ref to scope scroll viewport lookup to this table instance
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  // Ensure on RTL we start scrolled to the rightmost edge so the logical first column appears
  React.useLayoutEffect(() => {
    if (!isRTL) return;
    const viewport = containerRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement | null;
    if (!viewport) return;
    // Only adjust if horizontal overflow exists and we're near the left edge
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll > 0 && viewport.scrollLeft < maxScroll - 2) {
      // Set immediately via requestAnimationFrame for smoother paint
      requestAnimationFrame(() => {
        viewport.scrollLeft = maxScroll;
      });
    }
  }, [isRTL, table]);
  return (
    <div
      className={`flex flex-1 flex-col space-y-4 ${isRTL ? 'direction-rtl' : ''}`}
      dir={isRTL ? 'rtl' : undefined}
    >
      {children}
      <div className='relative flex flex-1'>
        <div
          ref={containerRef}
          className='absolute inset-0 flex overflow-hidden rounded-lg border'
        >
          <ScrollArea className='h-full w-full'>
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {table.getHeaderGroups().map((headerGroup) => {
                  const headers = headerGroup.headers;
                  // For small screens in RTL, rely on synchronous detection; if mismatch occurred earlier avoid double reversing
                  const displayHeaders = isRTL
                    ? [...headers].reverse()
                    : headers;
                  return (
                    <TableRow key={headerGroup.id}>
                      {displayHeaders.map((header) => (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className='text-center'
                          style={{
                            ...getCommonPinningStyles({ column: header.column })
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  );
                })}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const cells = row.getVisibleCells();
                    const displayCells = isRTL ? [...cells].reverse() : cells;
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {displayCells.map((cell) => (
                          <TableCell
                            key={cell.id}
                            className='text-center'
                            style={{
                              ...getCommonPinningStyles({ column: cell.column })
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className='h-24 text-center'
                    >
                      لا توجد نتائج.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
