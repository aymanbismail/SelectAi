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
 * Agent Category Detail Page - Server Component
 * Displays all agents within a specific category
 * Route: /agents/categories/[slug]
 */
export default async function AgentCategoryDetailPage({
  params,
  searchParams
}: CategoryDetailPageProps) {
  const { slug } = await params;

  // Validate category exists
  const category = getCategoryBySlug(slug, 'agent');
  if (!category) {
    notFound();
  }

  // searchParams available for future API integration
  // Future API: GET /api/agents?category={slug}&search=...&pricing=...
  void searchParams;

  return <CategoryDetailClient slug={slug} type='agent' />;
}

/**
 * Generate metadata for the category detail page
 */
export async function generateMetadata({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug, 'agent');

  if (!category) {
    return {
      title: 'Category Not Found - SelectAI'
    };
  }

  return {
    title: `${category.name} Agents - SelectAI`,
    description: category.description
  };
}
