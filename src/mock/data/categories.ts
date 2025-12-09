// Mock data for categories - ready for API integration
// Future API: GET /api/categories?type=tool&with_counts=true&lang=en

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

// Icon mapping for categories
export const categoryIcons: Record<string, string> = {
  // Tool categories
  'text-ai': '✍️',
  'image-ai': '🖼️',
  'video-ai': '🎬',
  'audio-ai': '🎵',
  'code-ai': '💻',
  'business-ai': '💼',
  'research-ai': '🔬',
  'design-ai': '🎨',
  'marketing-ai': '📈',
  'productivity-ai': '⚡',
  // Agent categories
  'coding-agent': '👨‍💻',
  'research-agent': '🔍',
  'writing-agent': '📝',
  'data-agent': '📊',
  'customer-support-agent': '💬',
  'sales-agent': '🤝',
  'personal-assistant': '🤖',
  'creative-agent': '🎭',
  'workflow-agent': '⚙️',
  'analytics-agent': '📉'
};

// Mock Tool Categories
export const mockToolCategories: Category[] = [
  {
    id: 'cat-tool-1',
    slug: 'text-ai',
    name: 'Text AI',
    description:
      'AI tools for text generation, summarization, translation, and natural language processing.',
    icon: '✍️',
    type: 'tool',
    tools_count: 156,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-2',
    slug: 'image-ai',
    name: 'Image AI',
    description:
      'Generate, edit, and enhance images using advanced AI models and creative tools.',
    icon: '🖼️',
    type: 'tool',
    tools_count: 89,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-3',
    slug: 'video-ai',
    name: 'Video AI',
    description:
      'AI-powered video creation, editing, transcription, and enhancement tools.',
    icon: '🎬',
    type: 'tool',
    tools_count: 45,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-4',
    slug: 'audio-ai',
    name: 'Audio AI',
    description:
      'Voice synthesis, music generation, audio editing, and speech recognition tools.',
    icon: '🎵',
    type: 'tool',
    tools_count: 67,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-5',
    slug: 'code-ai',
    name: 'Code AI',
    description:
      'AI assistants for coding, debugging, code review, and software development.',
    icon: '💻',
    type: 'tool',
    tools_count: 112,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-6',
    slug: 'business-ai',
    name: 'Business AI',
    description:
      'Enterprise AI solutions for automation, analytics, and business intelligence.',
    icon: '💼',
    type: 'tool',
    tools_count: 78,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-7',
    slug: 'research-ai',
    name: 'Research AI',
    description:
      'AI tools for academic research, literature review, and scientific analysis.',
    icon: '🔬',
    type: 'tool',
    tools_count: 34,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-8',
    slug: 'design-ai',
    name: 'Design AI',
    description:
      'AI-powered design tools for graphics, UI/UX, and creative workflows.',
    icon: '🎨',
    type: 'tool',
    tools_count: 56,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-9',
    slug: 'marketing-ai',
    name: 'Marketing AI',
    description:
      'AI solutions for marketing automation, content creation, and campaign optimization.',
    icon: '📈',
    type: 'tool',
    tools_count: 91,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-tool-10',
    slug: 'productivity-ai',
    name: 'Productivity AI',
    description:
      'AI assistants for task management, scheduling, and workflow optimization.',
    icon: '⚡',
    type: 'tool',
    tools_count: 124,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  }
];

// Mock Agent Categories
export const mockAgentCategories: Category[] = [
  {
    id: 'cat-agent-1',
    slug: 'coding-agent',
    name: 'Coding Agent',
    description:
      'Autonomous AI agents that can write, debug, and deploy code independently.',
    icon: '👨‍💻',
    type: 'agent',
    agents_count: 28,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-2',
    slug: 'research-agent',
    name: 'Research Agent',
    description:
      'AI agents that conduct research, gather information, and synthesize findings.',
    icon: '🔍',
    type: 'agent',
    agents_count: 19,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-3',
    slug: 'writing-agent',
    name: 'Writing Agent',
    description:
      'Autonomous writing agents for content creation, editing, and publishing.',
    icon: '📝',
    type: 'agent',
    agents_count: 35,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-4',
    slug: 'data-agent',
    name: 'Data Agent',
    description:
      'AI agents for data analysis, transformation, and pipeline automation.',
    icon: '📊',
    type: 'agent',
    agents_count: 22,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-5',
    slug: 'customer-support-agent',
    name: 'Customer Support Agent',
    description:
      'AI agents that handle customer inquiries, support tickets, and service requests.',
    icon: '💬',
    type: 'agent',
    agents_count: 41,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-6',
    slug: 'sales-agent',
    name: 'Sales Agent',
    description:
      'Autonomous sales agents for lead generation, outreach, and deal closing.',
    icon: '🤝',
    type: 'agent',
    agents_count: 18,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-7',
    slug: 'personal-assistant',
    name: 'Personal Assistant',
    description:
      'AI assistants for scheduling, reminders, and personal task management.',
    icon: '🤖',
    type: 'agent',
    agents_count: 56,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-8',
    slug: 'creative-agent',
    name: 'Creative Agent',
    description:
      'AI agents for creative tasks like design, art generation, and content ideation.',
    icon: '🎭',
    type: 'agent',
    agents_count: 33,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-9',
    slug: 'workflow-agent',
    name: 'Workflow Agent',
    description:
      'AI agents that automate complex workflows and business processes.',
    icon: '⚙️',
    type: 'agent',
    agents_count: 27,
    is_featured: true,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  },
  {
    id: 'cat-agent-10',
    slug: 'analytics-agent',
    name: 'Analytics Agent',
    description:
      'AI agents for business analytics, reporting, and data-driven insights.',
    icon: '📉',
    type: 'agent',
    agents_count: 15,
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-12-01'
  }
];

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

// Aggregate stats
export const categoryStats = {
  totalToolCategories: mockToolCategories.length,
  totalAgentCategories: mockAgentCategories.length,
  totalTools: mockToolCategories.reduce(
    (sum, cat) => sum + (cat.tools_count || 0),
    0
  ),
  totalAgents: mockAgentCategories.reduce(
    (sum, cat) => sum + (cat.agents_count || 0),
    0
  )
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
export function getCategoryNameFromSlug(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.name || '';
}
