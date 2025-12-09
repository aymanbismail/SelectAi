export interface AIAgent {
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
  capabilities?: string[];
}

export const agentCategories = [
  'Coding Agent',
  'Research Agent',
  'Writing Agent',
  'Data Agent',
  'Customer Support Agent',
  'Sales Agent',
  'Personal Assistant',
  'Creative Agent',
  'Workflow Agent',
  'Analytics Agent'
] as const;

export const pricingTypes = ['free', 'freemium', 'paid', 'enterprise'] as const;

export const mockAgents: AIAgent[] = [
  {
    id: 'agent-1',
    name: 'Devin',
    description:
      'Autonomous AI software engineer that can plan, code, debug, and deploy entire projects. Works independently on complex engineering tasks.',
    short_description: 'Autonomous AI software engineer',
    category: 'Coding Agent',
    pricing_type: 'enterprise',
    icon: '👨‍💻',
    average_rating: 4.7,
    usage_count: 45000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-03-01',
    website_url: 'https://devin.ai',
    tags: ['coding', 'autonomous', 'software development', 'engineering'],
    capabilities: ['Code generation', 'Bug fixing', 'Deployment', 'Testing']
  },
  {
    id: 'agent-2',
    name: 'Auto-GPT',
    description:
      'Open-source autonomous AI agent that chains together LLM calls to accomplish complex goals without human intervention.',
    short_description: 'Open-source autonomous AI agent',
    category: 'Workflow Agent',
    pricing_type: 'free',
    icon: '🔄',
    average_rating: 4.2,
    usage_count: 180000,
    is_featured: true,
    is_verified: true,
    created_at: '2023-11-15',
    website_url: 'https://github.com/Significant-Gravitas/AutoGPT',
    tags: ['autonomous', 'open source', 'automation', 'chains'],
    capabilities: [
      'Task planning',
      'Web research',
      'File management',
      'Code execution'
    ]
  },
  {
    id: 'agent-3',
    name: 'AgentGPT',
    description:
      'Deploy autonomous AI agents in your browser. Configure an agent with a goal and watch it reason, form tasks, and execute actions.',
    short_description: 'Browser-based autonomous AI agents',
    category: 'Personal Assistant',
    pricing_type: 'freemium',
    icon: '🤖',
    average_rating: 4.0,
    usage_count: 95000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-10',
    website_url: 'https://agentgpt.reworkd.ai',
    tags: ['browser', 'autonomous', 'goals', 'tasks'],
    capabilities: ['Goal setting', 'Task creation', 'Web browsing', 'Reasoning']
  },
  {
    id: 'agent-4',
    name: 'GitHub Copilot Workspace',
    description:
      'AI-powered development environment that understands your codebase and helps plan, implement, and test changes across files.',
    short_description: 'AI workspace for code development',
    category: 'Coding Agent',
    pricing_type: 'paid',
    icon: '🐙',
    average_rating: 4.6,
    usage_count: 120000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-20',
    website_url: 'https://github.com/features/copilot',
    tags: ['coding', 'workspace', 'planning', 'implementation'],
    capabilities: [
      'Code planning',
      'Multi-file editing',
      'Testing',
      'PR creation'
    ]
  },
  {
    id: 'agent-5',
    name: 'Claude Projects',
    description:
      'Upload knowledge and let Claude work as a dedicated agent for your project. Maintains context across conversations.',
    short_description: 'Claude as a dedicated project agent',
    category: 'Research Agent',
    pricing_type: 'paid',
    icon: '📁',
    average_rating: 4.5,
    usage_count: 85000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-03-05',
    website_url: 'https://claude.ai',
    tags: ['projects', 'knowledge base', 'context', 'research'],
    capabilities: [
      'Document analysis',
      'Long-term memory',
      'Research assistance',
      'Writing'
    ]
  },
  {
    id: 'agent-6',
    name: 'Intercom Fin',
    description:
      'AI customer support agent that resolves support tickets autonomously using your help center and past conversations.',
    short_description: 'AI-powered customer support resolution',
    category: 'Customer Support Agent',
    pricing_type: 'enterprise',
    icon: '💬',
    average_rating: 4.4,
    usage_count: 62000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-25',
    website_url: 'https://intercom.com',
    tags: ['customer support', 'tickets', 'resolution', 'help desk'],
    capabilities: [
      'Ticket resolution',
      'Knowledge retrieval',
      'Escalation',
      'Analytics'
    ]
  },
  {
    id: 'agent-7',
    name: 'Lindy.ai',
    description:
      'Create custom AI assistants that automate repetitive tasks. Connect to your tools and let Lindy handle scheduling, email, and research.',
    short_description: 'Custom AI assistants for automation',
    category: 'Personal Assistant',
    pricing_type: 'freemium',
    icon: '🦋',
    average_rating: 4.3,
    usage_count: 38000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-10',
    website_url: 'https://lindy.ai',
    tags: ['automation', 'custom', 'scheduling', 'email'],
    capabilities: [
      'Task automation',
      'Scheduling',
      'Email management',
      'Research'
    ]
  },
  {
    id: 'agent-8',
    name: 'Adept ACT-1',
    description:
      'AI agent that can use any software tool by watching your screen. Automate complex workflows across applications.',
    short_description: 'AI that uses software like humans',
    category: 'Workflow Agent',
    pricing_type: 'enterprise',
    icon: '🖥️',
    average_rating: 4.5,
    usage_count: 28000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-15',
    website_url: 'https://adept.ai',
    tags: ['automation', 'workflow', 'screen', 'software'],
    capabilities: [
      'UI automation',
      'Cross-app workflows',
      'Learning',
      'Adaptation'
    ]
  },
  {
    id: 'agent-9',
    name: 'Salesforce Einstein GPT',
    description:
      'AI sales agent that generates personalized emails, summarizes calls, and provides deal insights within Salesforce.',
    short_description: 'AI sales assistant in Salesforce',
    category: 'Sales Agent',
    pricing_type: 'enterprise',
    icon: '☁️',
    average_rating: 4.2,
    usage_count: 75000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-20',
    website_url: 'https://salesforce.com/einstein',
    tags: ['sales', 'CRM', 'emails', 'insights'],
    capabilities: [
      'Email generation',
      'Call summaries',
      'Deal insights',
      'Forecasting'
    ]
  },
  {
    id: 'agent-10',
    name: 'Elicit',
    description:
      'AI research assistant that finds relevant papers, extracts claims, and synthesizes findings. Perfect for literature reviews.',
    short_description: 'AI research paper analysis assistant',
    category: 'Research Agent',
    pricing_type: 'freemium',
    icon: '🔬',
    average_rating: 4.6,
    usage_count: 92000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-01',
    website_url: 'https://elicit.org',
    tags: ['research', 'papers', 'analysis', 'academic'],
    capabilities: [
      'Paper search',
      'Claim extraction',
      'Synthesis',
      'Summarization'
    ]
  },
  {
    id: 'agent-11',
    name: 'Consensus',
    description:
      'AI-powered search engine for scientific research. Ask questions and get answers backed by peer-reviewed papers.',
    short_description: 'AI search for scientific papers',
    category: 'Research Agent',
    pricing_type: 'freemium',
    icon: '📊',
    average_rating: 4.4,
    usage_count: 68000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-08',
    website_url: 'https://consensus.app',
    tags: ['research', 'science', 'papers', 'citations'],
    capabilities: [
      'Paper search',
      'Answer synthesis',
      'Citation tracking',
      'Summarization'
    ]
  },
  {
    id: 'agent-12',
    name: 'Jasper Campaigns',
    description:
      'AI marketing agent that creates complete marketing campaigns. Generates copy, images, and strategy recommendations.',
    short_description: 'AI marketing campaign generator',
    category: 'Creative Agent',
    pricing_type: 'paid',
    icon: '📢',
    average_rating: 4.1,
    usage_count: 42000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-15',
    website_url: 'https://jasper.ai/campaigns',
    tags: ['marketing', 'campaigns', 'copy', 'strategy'],
    capabilities: [
      'Campaign planning',
      'Copy generation',
      'Image creation',
      'Analytics'
    ]
  },
  {
    id: 'agent-13',
    name: 'Replit Agent',
    description:
      'AI coding agent within Replit that builds entire applications from natural language descriptions. Deploys instantly.',
    short_description: 'Build and deploy apps with AI',
    category: 'Coding Agent',
    pricing_type: 'freemium',
    icon: '⚡',
    average_rating: 4.5,
    usage_count: 156000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-03-10',
    website_url: 'https://replit.com',
    tags: ['coding', 'deployment', 'apps', 'natural language'],
    capabilities: ['App building', 'Code generation', 'Deployment', 'Debugging']
  },
  {
    id: 'agent-14',
    name: 'Crew AI',
    description:
      'Framework for orchestrating multiple AI agents that work together. Build teams of specialized agents for complex tasks.',
    short_description: 'Multi-agent orchestration framework',
    category: 'Workflow Agent',
    pricing_type: 'free',
    icon: '👥',
    average_rating: 4.3,
    usage_count: 48000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-25',
    website_url: 'https://crewai.com',
    tags: ['multi-agent', 'orchestration', 'framework', 'teams'],
    capabilities: [
      'Agent coordination',
      'Task delegation',
      'Role assignment',
      'Workflow management'
    ]
  },
  {
    id: 'agent-15',
    name: 'Langchain Agents',
    description:
      'Build custom AI agents using LangChain framework. Create agents that can use tools, access databases, and execute code.',
    short_description: 'Framework for building AI agents',
    category: 'Coding Agent',
    pricing_type: 'free',
    icon: '🔗',
    average_rating: 4.4,
    usage_count: 220000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-12-01',
    website_url: 'https://langchain.com',
    tags: ['framework', 'development', 'tools', 'custom'],
    capabilities: ['Tool usage', 'Database access', 'Code execution', 'Memory']
  },
  {
    id: 'agent-16',
    name: 'Zapier Central',
    description:
      'AI automation agent that connects your apps and creates automated workflows. Tell it what you want and it builds the automation.',
    short_description: 'AI-powered workflow automation',
    category: 'Workflow Agent',
    pricing_type: 'paid',
    icon: '⚙️',
    average_rating: 4.2,
    usage_count: 89000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-30',
    website_url: 'https://zapier.com/central',
    tags: ['automation', 'integrations', 'workflows', 'apps'],
    capabilities: [
      'App integration',
      'Workflow creation',
      'Trigger management',
      'Data sync'
    ]
  },
  {
    id: 'agent-17',
    name: 'Writesonic Chatsonic',
    description:
      'AI writing agent with real-time web access. Creates content, answers questions with current information, and generates images.',
    short_description: 'AI writer with real-time web access',
    category: 'Writing Agent',
    pricing_type: 'freemium',
    icon: '✨',
    average_rating: 4.0,
    usage_count: 125000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-08',
    website_url: 'https://writesonic.com/chatsonic',
    tags: ['writing', 'web access', 'content', 'images'],
    capabilities: [
      'Content writing',
      'Web search',
      'Image generation',
      'Real-time data'
    ]
  },
  {
    id: 'agent-18',
    name: 'Fixie.ai',
    description:
      'Build AI agents that can access your data and APIs. Create conversational interfaces for your business systems.',
    short_description: 'Custom AI agents for your data',
    category: 'Data Agent',
    pricing_type: 'paid',
    icon: '🔧',
    average_rating: 4.1,
    usage_count: 32000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-18',
    website_url: 'https://fixie.ai',
    tags: ['custom', 'data', 'APIs', 'conversational'],
    capabilities: [
      'Data access',
      'API integration',
      'Conversation',
      'Business logic'
    ]
  },
  {
    id: 'agent-19',
    name: 'Julius AI',
    description:
      'AI data analysis agent that analyzes spreadsheets, creates visualizations, and answers questions about your data.',
    short_description: 'AI data analysis and visualization',
    category: 'Data Agent',
    pricing_type: 'freemium',
    icon: '📈',
    average_rating: 4.5,
    usage_count: 78000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-12',
    website_url: 'https://julius.ai',
    tags: ['data analysis', 'visualization', 'spreadsheets', 'insights'],
    capabilities: [
      'Data analysis',
      'Chart creation',
      'Statistical analysis',
      'Reporting'
    ]
  },
  {
    id: 'agent-20',
    name: 'Spell.so',
    description:
      'Create AI agents that automate any task. Connect to GPT-4, plugins, and APIs to build powerful automation workflows.',
    short_description: 'AI agent builder for task automation',
    category: 'Workflow Agent',
    pricing_type: 'freemium',
    icon: '🪄',
    average_rating: 4.0,
    usage_count: 45000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-22',
    website_url: 'https://spell.so',
    tags: ['automation', 'plugins', 'workflows', 'APIs'],
    capabilities: [
      'Task automation',
      'Plugin integration',
      'API access',
      'Scheduling'
    ]
  },
  {
    id: 'agent-21',
    name: 'HubSpot ChatSpot',
    description:
      'AI sales and marketing agent integrated with HubSpot CRM. Draft emails, create reports, and manage contacts conversationally.',
    short_description: 'AI assistant for HubSpot CRM',
    category: 'Sales Agent',
    pricing_type: 'freemium',
    icon: '🧡',
    average_rating: 4.1,
    usage_count: 58000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-18',
    website_url: 'https://hubspot.com/chatspot',
    tags: ['sales', 'marketing', 'CRM', 'emails'],
    capabilities: [
      'Email drafting',
      'Report creation',
      'Contact management',
      'Data lookup'
    ]
  },
  {
    id: 'agent-22',
    name: 'Notion Q&A',
    description:
      'AI agent that answers questions about your Notion workspace. Ask anything and get instant answers from your documents.',
    short_description: 'AI Q&A for your Notion workspace',
    category: 'Personal Assistant',
    pricing_type: 'paid',
    icon: '📒',
    average_rating: 4.3,
    usage_count: 95000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-05',
    website_url: 'https://notion.so',
    tags: ['Q&A', 'workspace', 'documents', 'search'],
    capabilities: [
      'Question answering',
      'Document search',
      'Summarization',
      'Context understanding'
    ]
  },
  {
    id: 'agent-23',
    name: 'Lex.page',
    description:
      "AI writing agent that helps you write better. Get suggestions, expand ideas, and overcome writer's block with AI assistance.",
    short_description: 'AI writing assistant and editor',
    category: 'Writing Agent',
    pricing_type: 'freemium',
    icon: '📝',
    average_rating: 4.2,
    usage_count: 65000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-28',
    website_url: 'https://lex.page',
    tags: ['writing', 'editing', 'suggestions', 'creativity'],
    capabilities: [
      'Writing suggestions',
      'Idea expansion',
      'Editing',
      'Tone adjustment'
    ]
  },
  {
    id: 'agent-24',
    name: 'Clay',
    description:
      'AI agent for sales prospecting. Enriches lead data, finds contact information, and personalizes outreach at scale.',
    short_description: 'AI sales prospecting and enrichment',
    category: 'Sales Agent',
    pricing_type: 'paid',
    icon: '🎯',
    average_rating: 4.4,
    usage_count: 42000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-12',
    website_url: 'https://clay.com',
    tags: ['sales', 'prospecting', 'enrichment', 'outreach'],
    capabilities: [
      'Data enrichment',
      'Contact finding',
      'Personalization',
      'Automation'
    ]
  },
  {
    id: 'agent-25',
    name: 'Bardeen AI',
    description:
      'AI automation agent that automates repetitive browser tasks. Record actions once and let AI repeat them intelligently.',
    short_description: 'AI browser automation agent',
    category: 'Workflow Agent',
    pricing_type: 'freemium',
    icon: '🤹',
    average_rating: 4.2,
    usage_count: 72000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-22',
    website_url: 'https://bardeen.ai',
    tags: ['browser', 'automation', 'recording', 'tasks'],
    capabilities: [
      'Task recording',
      'Smart replay',
      'Web scraping',
      'Form filling'
    ]
  }
];

export const getAgentById = (id: string): AIAgent | undefined => {
  return mockAgents.find((agent) => agent.id === id);
};

export const getAgentsByCategory = (category: string): AIAgent[] => {
  return mockAgents.filter((agent) => agent.category === category);
};

export const getFeaturedAgents = (): AIAgent[] => {
  return mockAgents.filter((agent) => agent.is_featured);
};

export const searchAgents = (query: string): AIAgent[] => {
  const lowerQuery = query.toLowerCase();
  return mockAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(lowerQuery) ||
      agent.description.toLowerCase().includes(lowerQuery) ||
      agent.category.toLowerCase().includes(lowerQuery) ||
      agent.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
