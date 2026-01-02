// Shared app-level types

// Derive available icon names from the Icons map without importing it at runtime
export type IconName = keyof typeof import('@/components/icons').Icons;

export interface NavItem {
  title: string;
  url?: string; // Optional to allow disabled items without navigation
  icon?: IconName;
  isActive?: boolean;
  shortcut?: [string, string];
  items?: NavItem[];
  // UX flags
  disabled?: boolean; // If true, item is non-interactive
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  count?: number; // Real count of items in this category
}
