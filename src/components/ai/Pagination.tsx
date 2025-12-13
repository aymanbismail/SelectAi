'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import type { PaginationProps } from './types';

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange
}: PaginationProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('pagination');

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Calculate visible page numbers
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  // Navigation icons - swap icons for RTL so visual direction matches expectation
  const FirstIcon = isRTL ? ChevronsRight : ChevronsLeft;
  const LastIcon = isRTL ? ChevronsLeft : ChevronsRight;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-4 sm:flex-row',
        'text-muted-foreground text-sm'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Results count */}
      <div className='order-2 sm:order-1'>
        <span>
          {t('showingPage')}{' '}
          <span className='text-foreground font-medium'>{currentPage}</span>{' '}
          {t('of')}{' '}
          <span className='text-foreground font-medium'>{totalPages}</span> (
          {totalItems.toLocaleString()} {t('totalItems')})
        </span>
      </div>

      {/* Pagination controls */}
      <div className='order-1 flex items-center gap-1 sm:order-2'>
        {/* First page */}
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(1)}
          disabled={!canGoPrevious}
          className={cn(
            'h-9 w-9',
            'bg-secondary/50',
            'border-border',
            'text-muted-foreground hover:text-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-foreground/15 hover:bg-secondary',
            'transition-all duration-200'
          )}
          aria-label={t('goToFirst')}
        >
          <FirstIcon className='h-4 w-4' />
        </Button>

        {/* Previous page */}
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={cn(
            'h-9 w-9',
            'bg-secondary/50',
            'border-border',
            'text-muted-foreground hover:text-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-foreground/15 hover:bg-secondary',
            'transition-all duration-200'
          )}
          aria-label={t('goToPrevious')}
        >
          <PrevIcon className='h-4 w-4' />
        </Button>

        {/* Page numbers */}
        <div className='mx-1 hidden items-center gap-1 sm:flex'>
          {visiblePages.map((page, index) =>
            page === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                className='text-muted-foreground px-2'
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size='icon'
                onClick={() => onPageChange(page)}
                className={cn(
                  'h-9 w-9',
                  currentPage === page
                    ? 'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                    : cn(
                        'bg-secondary/50',
                        'border-border',
                        'text-muted-foreground hover:text-foreground',
                        'hover:border-foreground/15 hover:bg-secondary',
                        'transition-all duration-200'
                      )
                )}
                aria-label={`${t('goToPage')} ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </Button>
            )
          )}
        </div>

        {/* Mobile page indicator */}
        <div className='flex items-center px-3 sm:hidden'>
          <span className='text-foreground font-medium'>
            {currentPage}/{totalPages}
          </span>
        </div>

        {/* Next page */}
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={cn(
            'h-9 w-9',
            'bg-secondary/50',
            'border-border',
            'text-muted-foreground hover:text-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-foreground/15 hover:bg-secondary',
            'transition-all duration-200'
          )}
          aria-label={t('goToNext')}
        >
          <NextIcon className='h-4 w-4' />
        </Button>

        {/* Last page */}
        <Button
          variant='outline'
          size='icon'
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className={cn(
            'h-9 w-9',
            'bg-secondary/50',
            'border-border',
            'text-muted-foreground hover:text-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'hover:border-foreground/15 hover:bg-secondary',
            'transition-all duration-200'
          )}
          aria-label={t('goToLast')}
        >
          <LastIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
