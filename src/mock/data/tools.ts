export interface AITool {
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

export const categories = [
  'Text AI',
  'Image AI',
  'Video AI',
  'Audio AI',
  'Code AI',
  'Business AI',
  'Research AI',
  'Design AI',
  'Marketing AI',
  'Productivity AI'
] as const;

export const pricingTypes = ['free', 'freemium', 'paid', 'enterprise'] as const;

export const mockTools: AITool[] = [
  {
    id: 'tool-1',
    name: 'ChatGPT',
    description:
      'Advanced AI assistant powered by GPT-4 for conversational AI, writing assistance, coding help, and complex problem-solving. Supports plugins and browsing.',
    short_description: 'AI assistant for conversations, writing, and coding',
    category: 'Text AI',
    pricing_type: 'freemium',
    icon: '🤖',
    average_rating: 4.8,
    usage_count: 1500000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-15',
    website_url: 'https://chat.openai.com',
    tags: ['chatbot', 'writing', 'coding', 'productivity']
  },
  {
    id: 'tool-2',
    name: 'Claude',
    description:
      'AI assistant by Anthropic designed for helpful, harmless, and honest conversations. Excels at analysis, writing, and nuanced discussions.',
    short_description: 'Thoughtful AI assistant for analysis and writing',
    category: 'Text AI',
    pricing_type: 'freemium',
    icon: '🧠',
    average_rating: 4.7,
    usage_count: 850000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-20',
    website_url: 'https://claude.ai',
    tags: ['chatbot', 'analysis', 'writing', 'research']
  },
  {
    id: 'tool-3',
    name: 'Midjourney',
    description:
      'AI image generation platform that creates stunning artwork and photorealistic images from text descriptions. Known for artistic and aesthetic outputs.',
    short_description: 'Create stunning AI-generated artwork from text',
    category: 'Image AI',
    pricing_type: 'paid',
    icon: '🎨',
    average_rating: 4.9,
    usage_count: 2000000,
    is_featured: true,
    is_verified: true,
    created_at: '2023-12-01',
    website_url: 'https://midjourney.com',
    tags: ['image generation', 'art', 'design', 'creative']
  },
  {
    id: 'tool-4',
    name: 'DALL-E 3',
    description:
      "OpenAI's latest image generation model with improved understanding of prompts and ability to create detailed, accurate images with text.",
    short_description: 'Advanced AI image generation with text understanding',
    category: 'Image AI',
    pricing_type: 'paid',
    icon: '🖼️',
    average_rating: 4.6,
    usage_count: 1200000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-10',
    website_url: 'https://openai.com/dall-e-3',
    tags: ['image generation', 'art', 'text-to-image']
  },
  {
    id: 'tool-5',
    name: 'GitHub Copilot',
    description:
      'AI pair programmer that helps write code faster with autocomplete suggestions, code explanations, and chat-based coding assistance.',
    short_description: 'AI coding assistant for faster development',
    category: 'Code AI',
    pricing_type: 'paid',
    icon: '👨‍💻',
    average_rating: 4.7,
    usage_count: 1800000,
    is_featured: true,
    is_verified: true,
    created_at: '2023-11-15',
    website_url: 'https://github.com/features/copilot',
    tags: ['coding', 'autocomplete', 'development', 'productivity']
  },
  {
    id: 'tool-6',
    name: 'Runway Gen-3',
    description:
      'Next-generation AI video model for cinematic video generation and professional video editing with AI-powered tools.',
    short_description: 'Cinematic AI video generation and editing',
    category: 'Video AI',
    pricing_type: 'freemium',
    icon: '🎬',
    average_rating: 4.5,
    usage_count: 650000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-03-01',
    website_url: 'https://runway.ml',
    tags: ['video', 'generation', 'editing', 'cinematic']
  },
  {
    id: 'tool-7',
    name: 'ElevenLabs',
    description:
      'AI voice synthesis platform with realistic text-to-speech, voice cloning, and multilingual support for content creators.',
    short_description: 'Realistic AI voice synthesis and cloning',
    category: 'Audio AI',
    pricing_type: 'freemium',
    icon: '🎙️',
    average_rating: 4.8,
    usage_count: 920000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-25',
    website_url: 'https://elevenlabs.io',
    tags: ['voice', 'text-to-speech', 'audio', 'content creation']
  },
  {
    id: 'tool-8',
    name: 'Suno',
    description:
      'Generate full songs from text prompts using AI music models. Create lyrics, melodies, and complete productions instantly.',
    short_description: 'AI music generation from text prompts',
    category: 'Audio AI',
    pricing_type: 'freemium',
    icon: '🎵',
    average_rating: 4.4,
    usage_count: 480000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-15',
    website_url: 'https://suno.ai',
    tags: ['music', 'generation', 'audio', 'creative']
  },
  {
    id: 'tool-9',
    name: 'Perplexity AI',
    description:
      'AI-powered answer engine combining search with AI reasoning to provide concise, well-sourced answers to complex questions.',
    short_description: 'AI search engine with sourced answers',
    category: 'Research AI',
    pricing_type: 'freemium',
    icon: '🔍',
    average_rating: 4.6,
    usage_count: 1100000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-05',
    website_url: 'https://perplexity.ai',
    tags: ['search', 'research', 'answers', 'knowledge']
  },
  {
    id: 'tool-10',
    name: 'Gamma',
    description:
      'AI tool for generating polished presentations, documents, and webpages in seconds. Transform ideas into professional content.',
    short_description: 'AI-powered presentation and document creator',
    category: 'Business AI',
    pricing_type: 'freemium',
    icon: '📑',
    average_rating: 4.5,
    usage_count: 720000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-01',
    website_url: 'https://gamma.app',
    tags: ['presentations', 'documents', 'business', 'productivity']
  },
  {
    id: 'tool-11',
    name: 'Leonardo AI',
    description:
      'AI platform for stylized image generation and game asset creation. Perfect for artists and game developers.',
    short_description: 'Stylized AI images and game assets',
    category: 'Image AI',
    pricing_type: 'freemium',
    icon: '🖌️',
    average_rating: 4.4,
    usage_count: 580000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-20',
    website_url: 'https://leonardo.ai',
    tags: ['image generation', 'art', 'game assets', 'design']
  },
  {
    id: 'tool-12',
    name: 'Jasper',
    description:
      'AI content generation platform for marketing teams. Create blog posts, social media, ads, and marketing copy at scale.',
    short_description: 'AI marketing content generator',
    category: 'Marketing AI',
    pricing_type: 'paid',
    icon: '✍️',
    average_rating: 4.3,
    usage_count: 420000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-10-15',
    website_url: 'https://jasper.ai',
    tags: ['marketing', 'content', 'copywriting', 'business']
  },
  {
    id: 'tool-13',
    name: 'Notion AI',
    description:
      'AI writing assistant integrated into Notion workspace. Brainstorm, draft, edit, and organize content seamlessly.',
    short_description: 'AI writing in your Notion workspace',
    category: 'Productivity AI',
    pricing_type: 'paid',
    icon: '📝',
    average_rating: 4.4,
    usage_count: 890000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-08',
    website_url: 'https://notion.so',
    tags: ['writing', 'productivity', 'workspace', 'organization']
  },
  {
    id: 'tool-14',
    name: 'Canva AI',
    description:
      'AI-powered design tools within Canva. Generate images, remove backgrounds, resize designs, and create with Magic Write.',
    short_description: 'AI design tools in Canva',
    category: 'Design AI',
    pricing_type: 'freemium',
    icon: '🎯',
    average_rating: 4.5,
    usage_count: 1350000,
    is_featured: true,
    is_verified: true,
    created_at: '2023-12-20',
    website_url: 'https://canva.com',
    tags: ['design', 'graphics', 'templates', 'creative']
  },
  {
    id: 'tool-15',
    name: 'Cursor',
    description:
      'AI-first code editor built for pair programming with AI. Understand codebases, write code, and fix bugs with AI assistance.',
    short_description: 'AI-powered code editor',
    category: 'Code AI',
    pricing_type: 'freemium',
    icon: '⌨️',
    average_rating: 4.6,
    usage_count: 380000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-28',
    website_url: 'https://cursor.com',
    tags: ['coding', 'editor', 'development', 'AI assistant']
  },
  {
    id: 'tool-16',
    name: 'Grammarly',
    description:
      'AI-powered writing assistant that checks grammar, tone, clarity, and style. Works across all apps and websites.',
    short_description: 'AI writing assistant for better communication',
    category: 'Text AI',
    pricing_type: 'freemium',
    icon: '📖',
    average_rating: 4.5,
    usage_count: 2200000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-09-01',
    website_url: 'https://grammarly.com',
    tags: ['writing', 'grammar', 'productivity', 'communication']
  },
  {
    id: 'tool-17',
    name: 'Synthesia',
    description:
      'Create AI videos with realistic avatars speaking any text. Perfect for training, marketing, and explainer videos.',
    short_description: 'AI video creation with virtual avatars',
    category: 'Video AI',
    pricing_type: 'paid',
    icon: '🎥',
    average_rating: 4.3,
    usage_count: 290000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-18',
    website_url: 'https://synthesia.io',
    tags: ['video', 'avatars', 'training', 'marketing']
  },
  {
    id: 'tool-18',
    name: 'Copy.ai',
    description:
      'AI copywriting tool for marketers. Generate social media posts, ads, emails, and product descriptions in seconds.',
    short_description: 'AI copywriting for marketing teams',
    category: 'Marketing AI',
    pricing_type: 'freemium',
    icon: '📋',
    average_rating: 4.2,
    usage_count: 520000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-11-20',
    website_url: 'https://copy.ai',
    tags: ['copywriting', 'marketing', 'social media', 'content']
  },
  {
    id: 'tool-19',
    name: 'Otter.ai',
    description:
      'AI meeting assistant that transcribes, summarizes, and captures action items from meetings in real-time.',
    short_description: 'AI meeting transcription and notes',
    category: 'Productivity AI',
    pricing_type: 'freemium',
    icon: '🦦',
    average_rating: 4.4,
    usage_count: 680000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-12-10',
    website_url: 'https://otter.ai',
    tags: ['meetings', 'transcription', 'notes', 'productivity']
  },
  {
    id: 'tool-20',
    name: 'Stable Diffusion',
    description:
      'Open-source AI image generation model. Run locally or use online services for text-to-image and image editing.',
    short_description: 'Open-source AI image generation',
    category: 'Image AI',
    pricing_type: 'free',
    icon: '🌊',
    average_rating: 4.5,
    usage_count: 1600000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-08-15',
    website_url: 'https://stability.ai',
    tags: ['image generation', 'open source', 'local', 'free']
  },
  {
    id: 'tool-21',
    name: 'Descript',
    description:
      'AI-powered video and podcast editing. Edit audio by editing text, remove filler words, and create eye contact with AI.',
    short_description: 'AI video and audio editing platform',
    category: 'Video AI',
    pricing_type: 'freemium',
    icon: '🎧',
    average_rating: 4.5,
    usage_count: 450000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-12',
    website_url: 'https://descript.com',
    tags: ['video editing', 'podcasts', 'audio', 'transcription']
  },
  {
    id: 'tool-22',
    name: 'Fireflies.ai',
    description:
      'AI note-taker that records, transcribes and summarizes meetings. Integrates with all major video conferencing tools.',
    short_description: 'AI meeting recorder and summarizer',
    category: 'Productivity AI',
    pricing_type: 'freemium',
    icon: '🔥',
    average_rating: 4.3,
    usage_count: 390000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-05',
    website_url: 'https://fireflies.ai',
    tags: ['meetings', 'transcription', 'notes', 'integration']
  },
  {
    id: 'tool-23',
    name: 'Tome',
    description:
      'AI presentation tool that generates complete decks from prompts. Create professional presentations in minutes.',
    short_description: 'AI-generated presentations from prompts',
    category: 'Business AI',
    pricing_type: 'freemium',
    icon: '📚',
    average_rating: 4.2,
    usage_count: 340000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-28',
    website_url: 'https://tome.app',
    tags: ['presentations', 'business', 'storytelling', 'design']
  },
  {
    id: 'tool-24',
    name: 'Anthropic Console',
    description:
      "Build with Claude through Anthropic's developer platform. Access API, fine-tuning, and enterprise features.",
    short_description: 'Claude API and developer platform',
    category: 'Code AI',
    pricing_type: 'enterprise',
    icon: '🔧',
    average_rating: 4.6,
    usage_count: 180000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-03-05',
    website_url: 'https://console.anthropic.com',
    tags: ['API', 'development', 'enterprise', 'AI platform']
  },
  {
    id: 'tool-25',
    name: 'Murf AI',
    description:
      'Professional AI voice generator with natural-sounding voices for videos, presentations, and content creation.',
    short_description: 'Natural AI voice generation',
    category: 'Audio AI',
    pricing_type: 'freemium',
    icon: '🗣️',
    average_rating: 4.3,
    usage_count: 280000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-10',
    website_url: 'https://murf.ai',
    tags: ['voice', 'text-to-speech', 'audio', 'professional']
  },
  {
    id: 'tool-26',
    name: 'PhotoRoom',
    description:
      'AI background removal and photo editing. Create professional product photos and marketing images instantly.',
    short_description: 'AI background removal and photo editing',
    category: 'Image AI',
    pricing_type: 'freemium',
    icon: '📷',
    average_rating: 4.4,
    usage_count: 560000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-22',
    website_url: 'https://photoroom.com',
    tags: ['photo editing', 'background removal', 'product photos', 'marketing']
  },
  {
    id: 'tool-27',
    name: 'Beautiful.ai',
    description:
      'AI presentation software that automatically designs slides as you add content. Smart templates and consistent branding.',
    short_description: 'Auto-designing AI presentations',
    category: 'Business AI',
    pricing_type: 'paid',
    icon: '💎',
    average_rating: 4.2,
    usage_count: 210000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-12-15',
    website_url: 'https://beautiful.ai',
    tags: ['presentations', 'design', 'business', 'templates']
  },
  {
    id: 'tool-28',
    name: 'Writesonic',
    description:
      'AI writing tool for blogs, ads, and product descriptions. Features article writer, paraphraser, and SEO tools.',
    short_description: 'AI content writer with SEO features',
    category: 'Marketing AI',
    pricing_type: 'freemium',
    icon: '🚀',
    average_rating: 4.1,
    usage_count: 380000,
    is_featured: false,
    is_verified: true,
    created_at: '2023-11-25',
    website_url: 'https://writesonic.com',
    tags: ['writing', 'SEO', 'marketing', 'content']
  },
  {
    id: 'tool-29',
    name: 'Luma AI',
    description:
      'Capture 3D scenes and objects with your phone. Create photorealistic 3D models using AI neural radiance fields.',
    short_description: '3D capture and generation from photos',
    category: 'Image AI',
    pricing_type: 'freemium',
    icon: '🔮',
    average_rating: 4.4,
    usage_count: 190000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-02-22',
    website_url: 'https://lumalabs.ai',
    tags: ['3D', 'capture', 'neural radiance', 'photorealistic']
  },
  {
    id: 'tool-30',
    name: 'Speechify',
    description:
      'AI text-to-speech reader that converts any text into natural audio. Listen to documents, articles, and books.',
    short_description: 'AI text-to-speech reader app',
    category: 'Audio AI',
    pricing_type: 'freemium',
    icon: '📢',
    average_rating: 4.3,
    usage_count: 620000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-30',
    website_url: 'https://speechify.com',
    tags: ['text-to-speech', 'reading', 'accessibility', 'audio']
  }
];

export const getToolById = (id: string): AITool | undefined => {
  return mockTools.find((tool) => tool.id === id);
};

export const getToolsByCategory = (category: string): AITool[] => {
  return mockTools.filter((tool) => tool.category === category);
};

export const getFeaturedTools = (): AITool[] => {
  return mockTools.filter((tool) => tool.is_featured);
};

export const searchTools = (query: string): AITool[] => {
  const lowerQuery = query.toLowerCase();
  return mockTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery) ||
      tool.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
