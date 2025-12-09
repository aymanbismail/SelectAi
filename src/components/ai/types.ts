// Shared types for AI Tools and AI Agents components
export interface AIItemBase {
  id: string;
  name: string;
  description: string;
  short_description: string;
  category: string;
  pricing_type: 'free' | 'freemium' | 'paid' | 'enterprise';
  logo_url?: string;
  icon?: string;
  average_rating: number;
  usage_count: number;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  website_url?: string;
  tags?: string[];
}

export type SortField = 'name' | 'created_at' | 'usage_count' | 'average_rating';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'grid' | 'table';
export type PricingType = 'free' | 'freemium' | 'paid' | 'enterprise' | 'all';

export interface FilterState {
  search: string;
  category: string;
  pricing_type: PricingType;
  featured_only: boolean;
  sort_by: SortField;
  sort_order: SortOrder;
}

export interface PaginationState {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

export interface AIListingState {
  filters: FilterState;
  pagination: PaginationState;
  view_mode: ViewMode;
}

// Props interfaces for components
export interface CardProps {
  item: AIItemBase;
  onClick?: () => void;
}

export interface GridViewProps {
  items: AIItemBase[];
  onItemClick?: (item: AIItemBase) => void;
  isLoading?: boolean;
}

export interface TableViewProps {
  items: AIItemBase[];
  onItemClick?: (item: AIItemBase) => void;
  isLoading?: boolean;
}

export interface TableRowProps {
  item: AIItemBase;
  onClick?: () => void;
}

export interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export interface PricingFilterProps {
  value: PricingType;
  onChange: (value: PricingType) => void;
}

export interface SortDropdownProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

export interface FeaturedSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface RowsPerPageSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
}

export interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export interface BadgeProps {
  variant: 'category' | 'pricing' | 'verified' | 'featured';
  value?: string;
  className?: string;
}
