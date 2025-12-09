'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TableRow, TableRowMobile } from './TableRow';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageOpen } from 'lucide-react';
import type { TableViewProps } from './types';

export function TableView({ items, onItemClick, isLoading }: TableViewProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return <TableSkeleton isMobile={isMobile} />;
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  // Mobile view: stacked cards
  if (isMobile) {
    return (
      <div className='space-y-3'>
        {items.map((item) => (
          <TableRowMobile
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    );
  }

  // Desktop view: full table
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl',
        'border-border border',
        'bg-card'
      )}
    >
      <div className='overflow-x-auto'>
        <table className='w-full' role='table'>
          <thead>
            <tr
              className={cn(
                'border-border bg-card border-b',
                'text-muted-foreground text-left text-sm font-medium'
              )}
            >
              <th className='min-w-[280px] px-4 py-3' scope='col'>
                <div className='flex items-center gap-1.5'>Name</div>
              </th>
              <th
                className='hidden min-w-[120px] px-4 py-3 md:table-cell'
                scope='col'
              >
                Category
              </th>
              <th
                className='hidden min-w-[100px] px-4 py-3 lg:table-cell'
                scope='col'
              >
                Pricing
              </th>
              <th
                className='hidden min-w-[140px] px-4 py-3 sm:table-cell'
                scope='col'
              >
                Status
              </th>
              <th
                className='hidden min-w-[80px] px-4 py-3 xl:table-cell'
                scope='col'
              >
                Rating
              </th>
              <th
                className='hidden min-w-[100px] px-4 py-3 xl:table-cell'
                scope='col'
              >
                Usage
              </th>
              <th className='min-w-[80px] px-4 py-3' scope='col'>
                <span className='sr-only'>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                onClick={() => onItemClick?.(item)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableSkeleton({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'rounded-xl p-4',
              'bg-card/30 border-border/30 border'
            )}
          >
            <div className='flex items-start gap-3'>
              <Skeleton className='h-12 w-12 shrink-0 rounded-xl' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-5 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <div className='flex gap-2 pt-1'>
                  <Skeleton className='h-5 w-20 rounded-md' />
                  <Skeleton className='h-5 w-16 rounded-md' />
                </div>
                <div className='flex items-center justify-between pt-1'>
                  <div className='flex gap-4'>
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className='h-4 w-14' />
                  </div>
                  <Skeleton className='h-8 w-16 rounded-md' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl',
        'border-border/40 border',
        'bg-card/30'
      )}
    >
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-muted/30 border-border/40 border-b'>
              <th className='px-4 py-3 text-left'>
                <Skeleton className='h-4 w-16' />
              </th>
              <th className='hidden px-4 py-3 text-left md:table-cell'>
                <Skeleton className='h-4 w-16' />
              </th>
              <th className='hidden px-4 py-3 text-left lg:table-cell'>
                <Skeleton className='h-4 w-14' />
              </th>
              <th className='hidden px-4 py-3 text-left sm:table-cell'>
                <Skeleton className='h-4 w-14' />
              </th>
              <th className='hidden px-4 py-3 text-left xl:table-cell'>
                <Skeleton className='h-4 w-12' />
              </th>
              <th className='hidden px-4 py-3 text-left xl:table-cell'>
                <Skeleton className='h-4 w-12' />
              </th>
              <th className='px-4 py-3' />
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className='border-border/30 border-b last:border-b-0'>
                <td className='px-4 py-4'>
                  <div className='flex items-center gap-4'>
                    <Skeleton className='h-12 w-12 shrink-0 rounded-xl' />
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-5 w-32' />
                      <Skeleton className='h-4 w-48' />
                    </div>
                  </div>
                </td>
                <td className='hidden px-4 py-4 md:table-cell'>
                  <Skeleton className='h-5 w-20 rounded-md' />
                </td>
                <td className='hidden px-4 py-4 lg:table-cell'>
                  <Skeleton className='h-5 w-16 rounded-md' />
                </td>
                <td className='hidden px-4 py-4 sm:table-cell'>
                  <div className='flex gap-1.5'>
                    <Skeleton className='h-5 w-16 rounded-md' />
                    <Skeleton className='h-5 w-14 rounded-md' />
                  </div>
                </td>
                <td className='hidden px-4 py-4 xl:table-cell'>
                  <Skeleton className='h-4 w-10' />
                </td>
                <td className='hidden px-4 py-4 xl:table-cell'>
                  <Skeleton className='h-4 w-14' />
                </td>
                <td className='px-4 py-4'>
                  <Skeleton className='h-8 w-16 rounded-md' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20',
        'text-center',
        'border-border rounded-xl border',
        'bg-card/50'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center',
          'mb-6 h-20 w-20 rounded-2xl',
          'border-border bg-secondary border'
        )}
      >
        <PackageOpen className='text-foreground h-10 w-10' />
      </div>
      <h3 className='text-foreground mb-2 text-xl font-semibold'>
        No results found
      </h3>
      <p className='text-muted-foreground max-w-md'>
        Try adjusting your filters or search terms to find what you&apos;re
        looking for.
      </p>
    </div>
  );
}
