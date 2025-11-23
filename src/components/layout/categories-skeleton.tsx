import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import PageContainer from '@/components/layout/page-container';

interface CategoriesSkeletonProps {
  categoriesCount?: number;
}

export function CategoryCardSkeleton() {
  return (
    <Card className='@container/card h-full border'>
      <CardHeader className='pb-4'>
        <div className='mb-2 flex items-center gap-3'>
          {/* Icon skeleton */}
          <div className='rounded-lg p-2'>
            <Skeleton className='h-6 w-6' />
          </div>
          {/* Badge skeleton */}
          <Skeleton className='h-5 w-16' />
        </div>
        {/* Title skeleton - vary the width */}
        <Skeleton className='h-7 w-28' />
      </CardHeader>
      <CardContent>
        {/* Description skeleton - multiple lines with varying widths */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-4/5' />
          <Skeleton className='h-4 w-3/4' />
        </div>
        {/* Call-to-action skeleton */}
        <div className='mt-4'>
          <Skeleton className='h-4 w-24' />
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoriesPageSkeleton({
  categoriesCount = 8
}: CategoriesSkeletonProps) {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4 pt-16'>
        {/* Header skeleton */}
        <div className='flex items-start justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-48' /> {/* Title */}
            <Skeleton className='h-5 w-96' /> {/* Description */}
          </div>
          <Skeleton className='h-10 w-40' /> {/* Button */}
        </div>

        {/* Scrollable Container */}
        <div className='relative flex flex-1'>
          <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
            <ScrollArea className='h-full w-full'>
              <div className='p-4'>
                {/* Categories grid skeleton */}
                <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {Array.from({ length: categoriesCount }).map((_, i) => (
                    <CategoryCardSkeleton key={i} />
                  ))}
                </div>

                {/* Stats Section skeleton */}
                <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card mt-8 grid grid-cols-1 gap-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-3'>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className='@container/card'>
                      <CardHeader className='space-y-2 text-center'>
                        <Skeleton className='mx-auto h-8 w-16' /> {/* Number */}
                        <Skeleton className='mx-auto h-5 w-24' /> {/* Label */}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
