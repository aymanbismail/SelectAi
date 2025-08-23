import type { Option, FilterVariant } from '@/types/data-table';

// Module augmentation for TanStack Table to include our custom column meta fields
declare module '@tanstack/react-table' {
  interface ColumnMeta {
    // Filter variant determines which filter UI to render
    variant?: FilterVariant;
    // Human-readable label for headers, toolbars, etc.
    label?: string;
    // Placeholder text for inputs
    placeholder?: string;
    // Unit displayed beside numeric inputs (e.g., %, $, hrs)
    unit?: string;
    // Default range for range/slider filters [min, max]
    range?: [number, number];
    // Option list for select / multiSelect filters
    options?: Option[];
    // Icon component for toolbar/filter UI (e.g., lucide-react icon)
    icon?: React.ComponentType<{ className?: string }>;
  }
}
