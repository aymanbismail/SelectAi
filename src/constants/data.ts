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

export type Category = {
  name: string;
  description: string;
  id: number;
  created_at: string;
  updated_at: string;
};

// list of demo categories for AI Tools
export const aiToolsCategories: Category[] = [
  {
    name: 'design',
    description: 'Find design tools to enhance your creative projects.',
    id: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'marketing',
    description: 'Discover marketing tools to boost your business.',
    id: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'productivity',
    description: 'Tools to help you be more productive and organized.',
    id: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'development',
    description: 'Development tools and resources for developers.',
    id: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'analytics',
    description: 'Analytics and data visualization tools.',
    id: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'finance',
    description: 'Financial management and accounting tools.',
    id: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'communication',
    description: 'Communication and collaboration tools.',
    id: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'education',
    description: 'Educational resources and learning platforms.',
    id: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'health',
    description: 'Health and wellness tracking applications.',
    id: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'travel',
    description: 'Travel planning and booking services.',
    id: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'photography',
    description: 'Photo editing and management tools.',
    id: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'music',
    description: 'Music production and streaming services.',
    id: 13,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'gaming',
    description: 'Gaming platforms and development tools.',
    id: 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'security',
    description: 'Cybersecurity and privacy protection tools.',
    id: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'automation',
    description: 'Workflow automation and task management.',
    id: 16,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'ecommerce',
    description: 'Online shopping and marketplace platforms.',
    id: 17,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'social',
    description: 'Social media and networking platforms.',
    id: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'news',
    description: 'News aggregation and media consumption.',
    id: 19,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'weather',
    description: 'Weather forecasting and climate tracking.',
    id: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'food',
    description: 'Recipe management and food delivery services.',
    id: 21,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// list of demo categories for AI Agents
export const aiAgentsCategories: Category[] = [
  {
    name: 'conversational',
    description: 'AI agents for natural language conversations.',
    id: 22,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'automation',
    description: 'Intelligent automation and workflow agents.',
    id: 23,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'analysis',
    description: 'Data analysis and insight generation agents.',
    id: 24,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'content',
    description: 'Content creation and management agents.',
    id: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'customer-service',
    description: 'AI agents for customer support and service.',
    id: 26,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'research',
    description: 'Research and information gathering agents.',
    id: 27,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'scheduling',
    description: 'Calendar and appointment management agents.',
    id: 28,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: 'monitoring',
    description: 'System monitoring and alerting agents.',
    id: 29,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// For backward compatibility
export const demoCategories = aiToolsCategories;

//Info: Navigation items for AI Tools tenant
export const getAiToolsNavItems = (locale: string = 'en'): NavItem[] => [
  {
    title: 'Chat',
    url: `/${locale}/chat`,
    icon: 'chat',
    isActive: false,
    shortcut: ['c', 'c'],
    items: []
  },
  {
    title: 'AI Tools',
    url: `/${locale}/ai-tools`,
    icon: 'dashboard',
    shortcut: ['a', 'i'],
    isActive: false,
    items: []
  },
  {
    title: 'Categories',
    url: `/${locale}/categories`,
    icon: 'dashboard',
    shortcut: ['c', 't'],
    isActive: false,
    items: []
  }
];

//Info: Navigation items for AI Agents tenant
export const getAiAgentsNavItems = (locale: string = 'en'): NavItem[] => [
  {
    title: 'Chat',
    url: `/${locale}/chat`,
    icon: 'chat',
    isActive: false,
    shortcut: ['c', 'c'],
    items: []
  },
  {
    title: 'AI Agents',
    url: `/${locale}/agents`,
    icon: 'dashboard',
    shortcut: ['a', 'i'],
    isActive: false,
    items: []
  },
  {
    title: 'Categories',
    url: `/${locale}/agents/categories`,
    icon: 'dashboard',
    shortcut: ['c', 't'],
    isActive: false,
    items: []
  }
];

// Backward compatibility - these will use 'en' as default
export const aiToolsNavItems: NavItem[] = getAiToolsNavItems('en');
export const aiAgentsNavItems: NavItem[] = getAiAgentsNavItems('en');

// Default export for backward compatibility
export const navItems = aiToolsNavItems;

// Categories that will be displayed in the scrollable container for AI Tools
export const getAiToolsAdditionalCategories = (
  locale: string = 'en'
): NavItem[] =>
  aiToolsCategories.map((category) => ({
    title: category.name.charAt(0).toUpperCase() + category.name.slice(1),
    url: `/${locale}/${category.name}`,
    icon: 'dashboard' as const,
    shortcut: ['a', 'i'] as [string, string],
    isActive: false,
    items: []
  }));

// Categories that will be displayed in the scrollable container for AI Agents
export const getAiAgentsAdditionalCategories = (
  locale: string = 'en'
): NavItem[] =>
  aiAgentsCategories.map((category) => ({
    title:
      category.name.charAt(0).toUpperCase() +
      category.name.slice(1).replace('-', ' '),
    url: `/${locale}/agents/${category.name}`,
    icon: 'chat' as const,
    shortcut: ['a', 'g'] as [string, string],
    isActive: false,
    items: []
  }));

// Backward compatibility - these will use 'en' as default
export const aiToolsAdditionalCategories: NavItem[] =
  getAiToolsAdditionalCategories('en');
export const aiAgentsAdditionalCategories: NavItem[] =
  getAiAgentsAdditionalCategories('en');

// Default export for backward compatibility
export const additionalCategories = aiToolsAdditionalCategories;

// Helper function to get all navigation data for a specific locale and tenant
export function getNavigationData(
  locale: string = 'en',
  tenantName: string = 'AI Tools'
) {
  const isAiTools = tenantName === 'AI Tools';

  return {
    navItems: isAiTools
      ? getAiToolsNavItems(locale)
      : getAiAgentsNavItems(locale),
    additionalCategories: isAiTools
      ? getAiToolsAdditionalCategories(locale)
      : getAiAgentsAdditionalCategories(locale),
    categoryLabel: isAiTools ? 'Categories' : 'Agent Types'
  };
}

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
