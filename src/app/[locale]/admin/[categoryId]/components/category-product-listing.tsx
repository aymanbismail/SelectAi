import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { CategoryProductTable } from './category-product-table';
import { columns } from '@/features/products/components/product-tables/columns';

type CategoryProductListingProps = {
  categoryId: string;
};

export default async function CategoryProductListing({
  categoryId
}: CategoryProductListingProps) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    // Filter by the current category - convert single category to array format
    categories: categoryId
  };

  const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  return (
    <CategoryProductTable
      data={products}
      totalItems={totalProducts}
      columns={columns}
      categoryId={categoryId}
    />
  );
}
