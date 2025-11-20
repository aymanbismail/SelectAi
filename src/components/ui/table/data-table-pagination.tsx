import type { Table } from '@tanstack/react-table';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface DataTablePaginationProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const locale = useLocale?.();
  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  const rowsInfo = selectedRows
    ? isRTL
      ? `${selectedRows} من ${totalRows} صفوف محددة`
      : `${selectedRows} of ${totalRows} row(s) selected.`
    : isRTL
      ? `إجمالي ${totalRows} صفوف`
      : `${totalRows} row(s) total.`;

  const rowsPerPageLabel = isRTL ? 'عدد الصفوف في الصفحة' : 'Rows per page';
  const pageStatus = isRTL
    ? `الصفحة ${pageIndex} من ${pageCount}`
    : `Page ${pageIndex} of ${pageCount}`;

  // Icons adjusted for logical direction; previous should point towards start
  const PrevIcon = isRTL ? ChevronRightIcon : ChevronLeftIcon;
  const NextIcon = isRTL ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <div
      className={cn(
        'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8',
        isRTL && 'rtl',
        className
      )}
      dir={dir}
      {...props}
    >
      <div
        className={cn(
          'text-muted-foreground flex-1 text-sm whitespace-nowrap',
          isRTL ? 'text-right sm:text-right' : 'text-left'
        )}
      >
        {rowsInfo}
      </div>
      {(() => {
        const rowsPerPageGroup = (
          <div
            key='rows'
            className={cn('flex items-center gap-4', isRTL && 'flex-row')}
          >
            <p className='text-sm font-medium whitespace-nowrap'>
              {rowsPerPageLabel}
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className='h-8 w-[4.5rem] [&[data-size]]:h-8'>
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side='top'>
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        const pageStatusBlock = (
          <div
            key='status'
            className='flex items-center justify-center text-sm font-medium'
          >
            {pageStatus}
          </div>
        );
        const controlsBlock = (
          <div key='controls' className='flex items-center gap-2'>
            <Button
              aria-label='Go to first page'
              variant='outline'
              size='icon'
              className='hidden size-8 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>
            <Button
              aria-label={isRTL ? 'الصفحة السابقة' : 'Go to previous page'}
              variant='outline'
              size='icon'
              className='size-8'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <PrevIcon />
            </Button>
            <Button
              aria-label={isRTL ? 'الصفحة التالية' : 'Go to next page'}
              variant='outline'
              size='icon'
              className='size-8'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <NextIcon />
            </Button>
            <Button
              aria-label='Go to last page'
              variant='outline'
              size='icon'
              className='hidden size-8 lg:flex'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>
        );
        const ordered = isRTL
          ? [rowsPerPageGroup, pageStatusBlock, controlsBlock]
          : [rowsPerPageGroup, pageStatusBlock, controlsBlock];
        return (
          <div
            className={cn(
              'flex w-full flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8',
              'sm:justify-end'
            )}
          >
            {ordered.map((el) => el)}
          </div>
        );
      })()}
    </div>
  );
}
