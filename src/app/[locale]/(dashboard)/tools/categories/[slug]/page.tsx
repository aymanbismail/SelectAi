import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';
import { CategoryDetailClient } from '@/components/categories';
import { getCategoryBySlug } from '@/mock/data/categories';
import { notFound } from 'next/navigation';

interface CategoryDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{
    search?: string;
    pricing?: string;
    sort?: string;
    view?: string;
    page?: string;
    per_page?: string;
  }>;
}

/**
 * Tool Category Detail Page - Server Component
 * Displays all tools within a specific category
 * Route: /tools/categories/[slug]
 */
export default async function ToolCategoryDetailPage({
  params,
  searchParams
}: CategoryDetailPageProps) {
  const { slug } = await params;

  // Validate category exists
  const category = getCategoryBySlug(slug, 'tool');
  if (!category) {
    notFound();
  }

  // searchParams available for future API integration
  // Future API: GET /api/tools?category={slug}&search=...&pricing=...
  void searchParams;

  return <CategoryDetailClient slug={slug} type='tool' />;
}

/**
 * Generate metadata for the category detail page
 */
export async function generateMetadata({
  params
}: CategoryDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug, 'tool');

  if (!category) {
    return {
      title: 'Category Not Found - SelectAI'
    };
  }

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: `/tools/categories/${slug}`,
    title: `${category.name} Tools - SelectAI`,
    description: category.description
  });
}
