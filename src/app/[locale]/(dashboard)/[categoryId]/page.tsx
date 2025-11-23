import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { demoCategories } from '@/constants/data';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import CategoryProductListing from './components/category-product-listing';

type pageProps = {
  params: Promise<{ categoryId: string; locale: string }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  const category = demoCategories.find(
    (cat) => cat.name === categoryId || cat.id.toString() === categoryId
  );

  if (!category) {
    return {
      title: 'Category Not Found - Select AI'
    };
  }

  return {
    title: `${category.name.charAt(0).toUpperCase() + category.name.slice(1).replace('-', ' ')} - Select AI`,
    description: category.description
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: pageProps) {
  const { categoryId } = await params;
  const searchParamsData = await searchParams;

  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParamsData);

  const category = demoCategories.find(
    (cat) => cat.name === categoryId || cat.id.toString() === categoryId
  );

  if (!category) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4 pt-16'>
        <div className='flex items-start justify-between'>
          <Heading
            title={
              category.name.charAt(0).toUpperCase() +
              category.name.slice(1).replace('-', ' ')
            }
            description={category.description}
          />
          <Link
            href={`/${categoryId}/new`}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> Request New Tool
          </Link>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <CategoryProductListing categoryId={categoryId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
