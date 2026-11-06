import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';
import { CategoryClient } from '@/components/categories';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: '/tools/categories',
    title: 'Tool Categories - SelectAI',
    description:
      'Explore our wide range of AI tool categories to find exactly what you need.'
  });
}

/**
 * Tool Categories Page - Server Component
 * Receives searchParams for future API integration
 * All UI logic is handled by the client component
 */
export default async function ToolCategoriesPage({
  searchParams
}: {
  searchParams: Promise<{
    search?: string;
    with_counts?: string;
    lang?: string;
    featured_only?: string;
  }>;
}) {
  // searchParams are available for future server-side data fetching
  // Future API: GET /api/categories?type=tool&with_counts=true&lang=en
  void searchParams;

  return <CategoryClient type='tool' />;
}
