import { CategoryClient } from '@/components/categories';

export const metadata = {
  title: 'Agent Categories - SelectAI',
  description:
    'Explore our wide range of AI agent categories to find exactly what you need.'
};

/**
 * Agent Categories Page - Server Component
 * Receives searchParams for future API integration
 * All UI logic is handled by the client component
 */
export default async function AgentCategoriesPage({
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
  // Future API: GET /api/categories?type=agent&with_counts=true&lang=en
  void searchParams;

  return <CategoryClient type='agent' />;
}
