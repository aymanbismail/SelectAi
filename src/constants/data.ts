import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: Navigation items for AI Tools tenant
export const getAiToolsNavItems = (
  locale: string = 'en',
  translations?: {
    home: string;
    explore: string;
    collections: string;
    aiTools: string;
  }
): NavItem[] => [
  {
    title: translations?.home || 'Home',
    url: `/${locale}/home`,
    icon: 'dashboard',
    isActive: false,
    shortcut: ['h', 'm'],
    items: []
  },
  {
    title: translations?.explore || 'Explore',
    url: `/${locale}/explore`,
    icon: 'search',
    isActive: false,
    shortcut: ['e', 'x'],
    items: []
  },
  {
    title: translations?.collections || 'Collections',
    url: `/${locale}/collections`,
    icon: 'folder',
    isActive: false,
    shortcut: ['c', 'o'],
    items: []
  },
  {
    title: translations?.aiTools || 'AI Tools',
    url: `/${locale}/tools`,
    icon: 'dashboard',
    shortcut: ['a', 'i'],
    isActive: false,
    items: []
  }
];

//Info: Navigation items for AI Agents tenant
export const getAiAgentsNavItems = (
  locale: string = 'en',
  translations?: {
    home: string;
    explore: string;
    categories: string;
    aiAgents: string;
  }
): NavItem[] => [
  {
    title: translations?.home || 'Home',
    url: `/${locale}/home`,
    icon: 'dashboard',
    isActive: false,
    shortcut: ['h', 'm'],
    items: []
  },
  {
    title: translations?.explore || 'Explore',
    url: `/${locale}/explore`,
    icon: 'search',
    isActive: false,
    shortcut: ['e', 'x'],
    items: []
  },
  {
    title: translations?.categories || 'Categories',
    url: `/${locale}/agents/categories`,
    icon: 'dashboard',
    shortcut: ['c', 't'],
    isActive: false,
    items: []
  },
  {
    title: translations?.aiAgents || 'AI Agents',
    url: `/${locale}/agents`,
    icon: 'dashboard',
    shortcut: ['a', 'i'],
    isActive: false,
    items: []
  }
];

// Backward compatibility - these will use 'en' as default
export const aiToolsNavItems: NavItem[] = getAiToolsNavItems('en');
export const aiAgentsNavItems: NavItem[] = getAiAgentsNavItems('en');

// Default export for backward compatibility
export const navItems = aiToolsNavItems;

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
