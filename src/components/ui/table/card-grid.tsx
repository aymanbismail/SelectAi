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
import { CheckCircle2, XCircle } from 'lucide-react';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';
import { CellAction } from '@/features/products/components/product-tables/cell-action';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CardGridProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
}

export function CardGrid<TData>({ table, children }: CardGridProps<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {children}
      <div className='relative flex flex-1'>
        <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
          <ScrollArea className='h-full w-full'>
            <div className='p-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                {rows.length ? (
                  rows.map((row) => {
                    const product = row.original as Product;
                    const Icon =
                      product.category === 'active' ? CheckCircle2 : XCircle;

                    return (
                      <Card
                        key={row.id}
                        className='group relative overflow-hidden transition-all duration-200 hover:shadow-lg'
                      >
                        <CardHeader className='pb-4'>
                          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                            <Image
                              src={product.photo_url}
                              alt={product.name}
                              fill
                              className='object-cover transition-transform duration-200 group-hover:scale-105'
                            />
                          </div>
                          <div className='absolute top-4 right-4'>
                            <CellAction data={product} />
                          </div>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                          <div className='space-y-2'>
                            <CardTitle className='line-clamp-1 text-base font-semibold'>
                              {product.name}
                            </CardTitle>
                            <CardDescription className='line-clamp-2 text-sm'>
                              {product.description}
                            </CardDescription>
                          </div>

                          <div className='flex items-center justify-between'>
                            <Badge variant='outline' className='capitalize'>
                              <Icon className='mr-1 h-3 w-3' />
                              {product.category}
                            </Badge>
                            <span className='text-primary text-lg font-semibold'>
                              ${product.price}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className='text-muted-foreground col-span-full flex h-24 items-center justify-center'>
                    No results found.
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
