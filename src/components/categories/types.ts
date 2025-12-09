// Shared types for Category components
// Ready for API integration: GET /api/categories?type=tool&with_counts=true&lang=en

export type CategoryType = 'tool' | 'agent';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  type: CategoryType;
  tools_count?: number;
  agents_count?: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryFilterState {
  search: string;
  type: CategoryType;
  featured_only: boolean;
}

export interface CategoryQueryParams {
  type: CategoryType;
  with_counts: boolean;
  lang: string;
  search?: string;
  featured_only?: boolean;
}

// Props interfaces
export interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export interface CategoryGridProps {
  categories: Category[];
  isLoading?: boolean;
  onCategoryClick?: (category: Category) => void;
}

export interface CategoryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: CategoryType;
  onTypeChange: (type: CategoryType) => void;
  showTypeToggle?: boolean;
}

export interface CategoryStatsProps {
  totalCategories: number;
  totalItems: number;
  type: CategoryType;
}

export interface CategoryClientProps {
  type: CategoryType;
  initialSearch?: string;
}
