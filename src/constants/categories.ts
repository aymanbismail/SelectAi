/**
 * Unified Categories Configuration
 * Single source of truth for all category data across the application
 * Icons are unique per category - no reuse between categories
 */

import { mockTools } from '@/mock/data/tools';
import { mockAgents } from '@/mock/data/agents';
import type { NavItem } from '@/types';

export type CategoryType = 'tool' | 'agent';

export interface CategoryConfig {
  slug: string;
  icon: keyof typeof import('@/components/icons').Icons;
  nameKey: string; // Translation key
}

// ============================================
// Tool Categories with Unique Icons
// ============================================
export const toolCategoryConfigs: CategoryConfig[] = [
  { slug: 'text', icon: 'fileText', nameKey: 'textAi' },
  { slug: 'image', icon: 'image', nameKey: 'imageAi' },
  { slug: 'video', icon: 'video', nameKey: 'videoAi' },
  { slug: 'audio', icon: 'audio', nameKey: 'audioAi' },
  { slug: 'code', icon: 'code', nameKey: 'codeAi' },
  { slug: 'business', icon: 'briefcase', nameKey: 'businessAi' },
  { slug: 'research', icon: 'microscope', nameKey: 'researchAi' },
  { slug: 'design', icon: 'palette', nameKey: 'designAi' },
  { slug: 'marketing', icon: 'trendingUp', nameKey: 'marketingAi' },
  { slug: 'productivity', icon: 'zap', nameKey: 'productivityAi' }
];

// ============================================
// Agent Categories with Unique Icons
// ============================================
export const agentCategoryConfigs: CategoryConfig[] = [
  { slug: 'coding', icon: 'terminal', nameKey: 'codingAgent' },
  { slug: 'research', icon: 'search', nameKey: 'researchAgent' },
  { slug: 'writing', icon: 'edit', nameKey: 'writingAgent' },
  { slug: 'data', icon: 'barChart', nameKey: 'dataAgent' },
  {
    slug: 'customer-support',
    icon: 'messageCircle',
    nameKey: 'customerSupportAgent'
  },
  { slug: 'sales', icon: 'dollarSign', nameKey: 'salesAgent' },
  { slug: 'personal-assistant', icon: 'user', nameKey: 'personalAssistant' },
  { slug: 'creative', icon: 'sparkles', nameKey: 'creativeAgent' },
  { slug: 'workflow', icon: 'gitBranch', nameKey: 'workflowAgent' },
  { slug: 'analytics', icon: 'pieChart', nameKey: 'analyticsAgent' }
];

// ============================================
// Mapping from slug to display name (for matching with data)
// ============================================
const toolSlugToDataCategory: Record<string, string> = {
  text: 'Text AI',
  image: 'Image AI',
  video: 'Video AI',
  audio: 'Audio AI',
  code: 'Code AI',
  business: 'Business AI',
  research: 'Research AI',
  design: 'Design AI',
  marketing: 'Marketing AI',
  productivity: 'Productivity AI'
};

const agentSlugToDataCategory: Record<string, string> = {
  coding: 'Coding Agent',
  research: 'Research Agent',
  writing: 'Writing Agent',
  data: 'Data Agent',
  'customer-support': 'Customer Support Agent',
  sales: 'Sales Agent',
  'personal-assistant': 'Personal Assistant',
  creative: 'Creative Agent',
  workflow: 'Workflow Agent',
  analytics: 'Analytics Agent'
};

// ============================================
// Get Real Counts from Actual Data
// ============================================
export function getToolCountBySlug(slug: string): number {
  const categoryName = toolSlugToDataCategory[slug];
  if (!categoryName) return 0;
  return mockTools.filter((tool) => tool.category === categoryName).length;
}

export function getAgentCountBySlug(slug: string): number {
  const categoryName = agentSlugToDataCategory[slug];
  if (!categoryName) return 0;
  return mockAgents.filter((agent) => agent.category === categoryName).length;
}

export function getTotalToolsCount(): number {
  return mockTools.length;
}

export function getTotalAgentsCount(): number {
  return mockAgents.length;
}

// ============================================
// Get Categories with Real Counts
// ============================================
export interface CategoryWithCount {
  slug: string;
  icon: keyof typeof import('@/components/icons').Icons;
  nameKey: string;
  count: number;
  type: CategoryType;
}

export function getToolCategoriesWithCounts(): CategoryWithCount[] {
  return toolCategoryConfigs.map((config) => ({
    ...config,
    count: getToolCountBySlug(config.slug),
    type: 'tool' as CategoryType
  }));
}

export function getAgentCategoriesWithCounts(): CategoryWithCount[] {
  return agentCategoryConfigs.map((config) => ({
    ...config,
    count: getAgentCountBySlug(config.slug),
    type: 'agent' as CategoryType
  }));
}

// ============================================
// Navigation Items for Sidebar
// ============================================
export function getToolCategoriesForSidebar(
  locale: string,
  translations: Record<string, string>
): NavItem[] {
  return toolCategoryConfigs.map((config) => ({
    title: translations[config.nameKey] || config.nameKey,
    url: `/${locale}/tools/categories/${config.slug}`,
    icon: config.icon,
    isActive: false,
    items: [],
    count: getToolCountBySlug(config.slug)
  }));
}

export function getAgentCategoriesForSidebar(
  locale: string,
  translations: Record<string, string>
): NavItem[] {
  return agentCategoryConfigs.map((config) => ({
    title: translations[config.nameKey] || config.nameKey,
    url: `/${locale}/agents/categories/${config.slug}`,
    icon: config.icon,
    isActive: false,
    items: [],
    count: getAgentCountBySlug(config.slug)
  }));
}

// ============================================
// Stats
// ============================================
export const getCategoryStats = () => ({
  totalToolCategories: toolCategoryConfigs.length,
  totalAgentCategories: agentCategoryConfigs.length,
  totalTools: getTotalToolsCount(),
  totalAgents: getTotalAgentsCount()
});

// ============================================
// Get category by slug
// ============================================
export function getToolCategoryBySlug(
  slug: string
): CategoryConfig | undefined {
  return toolCategoryConfigs.find((c) => c.slug === slug);
}

export function getAgentCategoryBySlug(
  slug: string
): CategoryConfig | undefined {
  return agentCategoryConfigs.find((c) => c.slug === slug);
}

// ============================================
// Get category display name from slug
// ============================================
export function getToolCategoryDisplayName(slug: string): string {
  return toolSlugToDataCategory[slug] || slug;
}

export function getAgentCategoryDisplayName(slug: string): string {
  return agentSlugToDataCategory[slug] || slug;
}

// ============================================
// Legacy exports for backward compatibility
// These match the old format from constants/data.ts
// ============================================
export interface LegacyCategory {
  id: number;
  name: string;
  description: string;
  count: number;
}

export const aiToolsCategories: LegacyCategory[] = toolCategoryConfigs.map(
  (config, index) => ({
    id: index + 1,
    name: config.slug,
    description: `Browse ${toolSlugToDataCategory[config.slug]} tools`,
    count: getToolCountBySlug(config.slug)
  })
);

export const aiAgentsCategories: LegacyCategory[] = agentCategoryConfigs.map(
  (config, index) => ({
    id: index + 1,
    name: config.slug,
    description: `Browse ${agentSlugToDataCategory[config.slug]} agents`,
    count: getAgentCountBySlug(config.slug)
  })
);
