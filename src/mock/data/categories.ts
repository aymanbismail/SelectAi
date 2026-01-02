// Mock data for categories - using real counts from actual data
// Future API: GET /api/categories?type=tool&with_counts=true&lang=en

import {
  getToolCountBySlug,
  getAgentCountBySlug,
  getTotalToolsCount,
  getTotalAgentsCount,
  toolCategoryConfigs,
  agentCategoryConfigs
} from '@/constants/categories';

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

// Icon mapping for categories (emoji icons for display)
export const categoryIcons: Record<string, string> = {
  // Tool categories
  text: '✍️',
  image: '🖼️',
  video: '🎬',
  audio: '🎵',
  code: '💻',
  business: '💼',
  research: '🔬',
  design: '🎨',
  marketing: '📈',
  productivity: '⚡',
  // Agent categories
  coding: '👨‍💻',
  writing: '📝',
  data: '📊',
  'customer-support': '💬',
  sales: '🤝',
  'personal-assistant': '🤖',
  creative: '🎭',
  workflow: '⚙️',
  analytics: '📉'
};

// Tool category descriptions
const toolCategoryDescriptions: Record<string, string> = {
  text: 'AI tools for text generation, summarization, translation, and natural language processing.',
  image:
    'Generate, edit, and enhance images using advanced AI models and creative tools.',
  video:
    'AI-powered video creation, editing, transcription, and enhancement tools.',
  audio:
    'Voice synthesis, music generation, audio editing, and speech recognition tools.',
  code: 'AI assistants for coding, debugging, code review, and software development.',
  business:
    'Enterprise AI solutions for automation, analytics, and business intelligence.',
  research:
    'AI tools for academic research, literature review, and scientific analysis.',
  design:
    'AI-powered design tools for graphics, UI/UX, and creative workflows.',
  marketing:
    'AI solutions for marketing automation, content creation, and campaign optimization.',
  productivity:
    'AI assistants for task management, scheduling, and workflow optimization.'
};

// Agent category descriptions
const agentCategoryDescriptions: Record<string, string> = {
  coding:
    'Autonomous AI agents that can write, debug, and deploy code independently.',
  research:
    'AI agents that conduct research, gather information, and synthesize findings.',
  writing:
    'Autonomous writing agents for content creation, editing, and publishing.',
  data: 'AI agents for data analysis, transformation, and pipeline automation.',
  'customer-support':
    'AI agents that handle customer inquiries, support tickets, and service requests.',
  sales:
    'Autonomous sales agents for lead generation, outreach, and deal closing.',
  'personal-assistant':
    'AI assistants for scheduling, reminders, and personal task management.',
  creative:
    'AI agents for creative tasks like design, art generation, and content ideation.',
  workflow: 'AI agents that automate complex workflows and business processes.',
  analytics:
    'AI agents for business analytics, reporting, and data-driven insights.'
};

// Slug to display name mapping
const toolSlugToName: Record<string, string> = {
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

const agentSlugToName: Record<string, string> = {
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

// Featured categories (first 5 of each)
const featuredToolSlugs = ['text', 'image', 'video', 'code', 'design'];
const featuredAgentSlugs = [
  'coding',
  'research',
  'writing',
  'customer-support',
  'personal-assistant'
];

// Generate Tool Categories with REAL counts
export const mockToolCategories: Category[] = toolCategoryConfigs.map(
  (config, index) => ({
    id: `cat-tool-${index + 1}`,
    slug: config.slug,
    name: toolSlugToName[config.slug] || config.slug,
    description:
      toolCategoryDescriptions[config.slug] || 'AI tools for various tasks.',
    icon: categoryIcons[config.slug] || '🔧',
    type: 'tool' as CategoryType,
    tools_count: getToolCountBySlug(config.slug), // REAL COUNT
    is_featured: featuredToolSlugs.includes(config.slug),
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  })
);

// Generate Agent Categories with REAL counts
export const mockAgentCategories: Category[] = agentCategoryConfigs.map(
  (config, index) => ({
    id: `cat-agent-${index + 1}`,
    slug: config.slug,
    name: agentSlugToName[config.slug] || config.slug,
    description:
      agentCategoryDescriptions[config.slug] ||
      'AI agents for various workflows.',
    icon: categoryIcons[config.slug] || '🤖',
    type: 'agent' as CategoryType,
    agents_count: getAgentCountBySlug(config.slug), // REAL COUNT
    is_featured: featuredAgentSlugs.includes(config.slug),
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  })
);

// Combined mock data
export const mockCategories: Category[] = [
  ...mockToolCategories,
  ...mockAgentCategories
];

// Helper function to get categories by type
export function getCategoriesByType(type: CategoryType): Category[] {
  return mockCategories.filter((cat) => cat.type === type);
}

// Helper function to search categories
export function searchCategories(
  categories: Category[],
  search: string
): Category[] {
  if (!search) return categories;
  const searchLower = search.toLowerCase();
  return categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchLower) ||
      cat.description.toLowerCase().includes(searchLower)
  );
}

// Aggregate stats - using REAL counts
export const categoryStats = {
  totalToolCategories: toolCategoryConfigs.length,
  totalAgentCategories: agentCategoryConfigs.length,
  totalTools: getTotalToolsCount(), // REAL COUNT
  totalAgents: getTotalAgentsCount() // REAL COUNT
};

// Helper function to get a single category by slug
export function getCategoryBySlug(
  slug: string,
  type?: CategoryType
): Category | undefined {
  if (type) {
    return mockCategories.find((cat) => cat.slug === slug && cat.type === type);
  }
  return mockCategories.find((cat) => cat.slug === slug);
}

// Helper function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return mockCategories.find((cat) => cat.id === id);
}

// Map category slug to category name (for filtering tools/agents)
export function getCategoryNameFromSlug(
  slug: string,
  type?: CategoryType
): string {
  const category = getCategoryBySlug(slug, type);
  return category?.name || '';
}
