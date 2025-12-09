'use client';

import { type Table as TanstackTable } from '@tanstack/react-table';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/constants/data';
import Image from 'next/image';
import { Star, Calendar, DollarSign } from 'lucide-react';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import { CellAction } from '@/features/products/components/product-tables/cell-action';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icons } from '@/components/icons';

interface CategoryCardGridProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  categoryId: string;
}

export function CategoryCardGrid<TData>({
  table,
  children,
  categoryId
}: CategoryCardGridProps<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {children}
      <div className='relative flex flex-1'>
        <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
          <ScrollArea className='h-full w-full'>
            <div className='p-4'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {rows.length ? (
                  rows.map((row) => {
                    const product = row.original as Product;
                    const createdDate = new Date(
                      product.created_at
                    ).toLocaleDateString();

                    return (
                      <Card
                        key={row.id}
                        className='group from-primary/5 to-card relative overflow-hidden border bg-gradient-to-t shadow-xs transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
                      >
                        <CardHeader className='pb-4'>
                          <div className='relative mb-3 aspect-video w-full overflow-hidden rounded-lg'>
                            <Image
                              src={product.photo_url}
                              alt={product.name}
                              fill
                              className='object-cover transition-transform duration-200 group-hover:scale-105'
                            />
                            <div className='absolute top-2 right-2'>
                              <CellAction data={product} />
                            </div>
                          </div>

                          <div className='mb-2 flex items-center gap-3'>
                            <div className='bg-primary/10 group-hover:bg-primary/20 rounded-lg p-2 transition-all duration-200'>
                              <Icons.dashboard className='text-primary h-5 w-5 transition-transform duration-200 group-hover:scale-110' />
                            </div>
                            <Badge
                              variant='secondary'
                              className='group-hover:bg-primary/10 text-xs capitalize transition-colors duration-200'
                            >
                              {categoryId.replace('-', ' ')}
                            </Badge>
                          </div>

                          <CardTitle className='group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors duration-200'>
                            {product.name}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className='space-y-4'>
                          <CardDescription className='line-clamp-2 text-sm leading-relaxed'>
                            {product.description}
                          </CardDescription>

                          <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center gap-2'>
                                <DollarSign className='text-primary h-4 w-4' />
                                <span className='text-primary text-lg font-semibold'>
                                  ${product.price}
                                </span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Star className='h-4 w-4 fill-current text-yellow-500' />
                                <span className='text-muted-foreground text-sm'>
                                  {(Math.random() * 2 + 3).toFixed(1)}
                                </span>
                              </div>
                            </div>

                            <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                              <Calendar className='h-3 w-3' />
                              <span>Added {createdDate}</span>
                            </div>

                            <div className='text-muted-foreground flex items-center text-xs'>
                              <span className='group-hover:text-primary transition-colors duration-200'>
                                View details →
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className='col-span-full flex flex-col items-center justify-center py-12'>
                    <Icons.dashboard className='text-muted-foreground/50 mb-4 h-12 w-12' />
                    <h3 className='text-muted-foreground mb-2 text-lg font-semibold'>
                      No tools found
                    </h3>
                    <p className='text-muted-foreground max-w-md text-center text-sm'>
                      No tools are available in the &ldquo;
                      {categoryId.replace('-', ' ')}&rdquo; category yet. Check
                      back later or explore other categories.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
