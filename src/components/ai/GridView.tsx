'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { Skeleton } from '@/components/ui/skeleton';
import { PackageOpen } from 'lucide-react';
import type { GridViewProps } from './types';

export function GridView({ items, onItemClick, isLoading }: GridViewProps) {
  if (isLoading) {
    return <GridSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={cn(
        'grid gap-5',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4'
      )}
    >
      {items.map((item) => (
        <Card key={item.id} item={item} onClick={() => onItemClick?.(item)} />
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div
      className={cn(
        'grid gap-5',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4'
      )}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex flex-col rounded-xl p-5',
            'border-border bg-card/50 border'
          )}
        >
          {/* Top section */}
          <div className='mb-4 flex items-start justify-between'>
            <Skeleton className='bg-muted h-14 w-14 rounded-xl' />
            <div className='flex gap-1.5'>
              <Skeleton className='bg-muted h-5 w-16 rounded-md' />
              <Skeleton className='bg-muted h-5 w-14 rounded-md' />
            </div>
          </div>

          {/* Title + Description */}
          <Skeleton className='bg-muted mb-2 h-6 w-3/4' />
          <Skeleton className='bg-muted/70 mb-1 h-4 w-full' />
          <Skeleton className='bg-muted/70 mb-4 h-4 w-2/3' />

          {/* Badges */}
          <div className='mb-4 flex gap-2'>
            <Skeleton className='bg-muted h-5 w-20 rounded-md' />
            <Skeleton className='bg-muted h-5 w-16 rounded-md' />
          </div>

          {/* Bottom section */}
          <div className='border-border flex items-center justify-between border-t pt-4'>
            <div className='flex gap-4'>
              <Skeleton className='bg-muted/70 h-4 w-10' />
              <Skeleton className='bg-muted/70 h-4 w-14' />
            </div>
            <Skeleton className='bg-muted h-8 w-16 rounded-md' />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20',
        'text-center'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center',
          'mb-6 h-20 w-20 rounded-2xl',
          'border-border bg-secondary border'
        )}
      >
        <PackageOpen className='text-muted-foreground h-10 w-10' />
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
