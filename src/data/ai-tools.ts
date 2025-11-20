export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  logoUrl?: string;
}

export const aiToolsData: Record<string, AITool[]> = {
  'Trending Tools': [
    {
      id: '1',
      name: 'Perplexity AI',
      description:
        'Answer engine combining search with AI reasoning for concise, sourced results',
      category: 'Text AI',
      icon: '🧭'
    },
    {
      id: '2',
      name: 'Gamma',
      description:
        'AI tool for generating polished presentations and documents fast',
      category: 'Business AI',
      icon: '📑'
    },
    {
      id: '3',
      name: 'Leonardo AI',
      description:
        'AI platform for stylized image generation and asset creation',
      category: 'Image AI',
      icon: '🖌️'
    },
    {
      id: '4',
      name: 'Devin',
      description:
        'AI software engineering agent handling complex coding tasks',
      category: 'Code AI',
      icon: '👨‍💻'
    },
    {
      id: '5',
      name: 'Suno',
      description:
        'Generate full songs from text prompts using AI music models',
      category: 'Audio AI',
      icon: '🎵'
    },
    {
      id: '6',
      name: 'Runway Gen-3',
      description:
        'Next‑gen AI video model for cinematic generation and editing',
      category: 'Video AI',
      icon: '🎞️'
    }
  ],
  'Text AI': [
    {
      id: '1',
      name: 'ChatGPT',
      description:
        'Advanced AI assistant for conversational AI, writing, and problem-solving',
      category: 'Text AI',
      icon: '🤖'
    },
    {
      id: '2',
      name: 'Claude',
      description:
        'AI assistant by Anthropic for helpful, harmless, and honest conversations',
      category: 'Text AI',
      icon: '🧠'
    },
    {
      id: '3',
      name: 'Grammarly',
      description:
        'AI-powered writing assistant for grammar, tone, and clarity improvements',
      category: 'Text AI',
      icon: '✍️'
    },
    {
      id: '4',
      name: 'Jasper',
      description:
        'AI content generation platform for marketing copy and creative writing',
      category: 'Text AI',
      icon: '📝'
    },
    {
      id: '5',
      name: 'Copy.ai',
      description:
        'AI copywriting tool for marketing content and social media posts',
      category: 'Text AI',
      icon: '📋'
    },
    {
      id: '6',
      name: 'Notion AI',
      description:
        'Integrated AI assistant for notes, documents, and project management',
      category: 'Text AI',
      icon: '📄'
    }
  ],
  'Image AI': [
    {
      id: '7',
      name: 'DALL-E 3',
      description:
        'Advanced AI image generator from OpenAI for creative visual content',
      category: 'Image AI',
      icon: '🎨'
    },
    {
      id: '8',
      name: 'Midjourney',
      description:
        'AI art generator creating stunning, artistic images from text prompts',
      category: 'Image AI',
      icon: '🖼️'
    },
    {
      id: '9',
      name: 'Stable Diffusion',
      description:
        'Open-source AI image generation model for creative professionals',
      category: 'Image AI',
      icon: '🌟'
    },
    {
      id: '10',
      name: 'Adobe Firefly',
      description:
        'AI-powered creative tools integrated into Adobe Creative Suite',
      category: 'Image AI',
      icon: '🔥'
    },
    {
      id: '11',
      name: 'Canva AI',
      description:
        'AI design assistant for creating graphics, presentations, and social media',
      category: 'Image AI',
      icon: '🎭'
    },
    {
      id: '12',
      name: 'Remove.bg',
      description: 'AI background removal tool for automatic image editing',
      category: 'Image AI',
      icon: '🗂️'
    }
  ],
  'Video AI': [
    {
      id: '13',
      name: 'Runway',
      description:
        'AI video generation and editing platform for creative professionals',
      category: 'Video AI',
      icon: '🎬'
    },
    {
      id: '14',
      name: 'Pika Labs',
      description:
        'AI video generator creating dynamic videos from text and images',
      category: 'Video AI',
      icon: '🎥'
    },
    {
      id: '15',
      name: 'Synthesia',
      description:
        'AI avatar video creation platform for training and marketing content',
      category: 'Video AI',
      icon: '👤'
    },
    {
      id: '16',
      name: 'Luma AI',
      description:
        '3D capture and AI video generation technology for immersive content',
      category: 'Video AI',
      icon: '🌐'
    },
    {
      id: '17',
      name: 'Descript',
      description:
        'AI-powered video editing with text-based editing and voice synthesis',
      category: 'Video AI',
      icon: '✂️'
    },
    {
      id: '18',
      name: 'Pictory',
      description:
        'AI video creation from scripts and blog posts with automated editing',
      category: 'Video AI',
      icon: '📹'
    }
  ],
  'Code AI': [
    {
      id: '19',
      name: 'GitHub Copilot',
      description:
        'AI pair programmer that helps write code faster and with fewer errors',
      category: 'Code AI',
      icon: '💻'
    },
    {
      id: '20',
      name: 'Cursor',
      description: 'AI-first code editor designed for pair programming with AI',
      category: 'Code AI',
      icon: '⚡'
    },
    {
      id: '21',
      name: 'Replit AI',
      description:
        'AI coding assistant integrated into the Replit development environment',
      category: 'Code AI',
      icon: '🔧'
    },
    {
      id: '22',
      name: 'Tabnine',
      description:
        'AI code completion tool that predicts and suggests code snippets',
      category: 'Code AI',
      icon: '⭐'
    },
    {
      id: '23',
      name: 'CodeWhisperer',
      description: 'Amazon AI coding companion for real-time code suggestions',
      category: 'Code AI',
      icon: '🔮'
    },
    {
      id: '24',
      name: 'Codeium',
      description: 'Free AI-powered code completion and chat for developers',
      category: 'Code AI',
      icon: '🚀'
    }
  ],
  'Audio AI': [
    {
      id: '25',
      name: 'ElevenLabs',
      description:
        'AI voice generation and cloning technology for realistic speech synthesis',
      category: 'Audio AI',
      icon: '🎤'
    },
    {
      id: '26',
      name: 'Murf',
      description:
        'AI voiceover generator with natural-sounding text-to-speech',
      category: 'Audio AI',
      icon: '🔊'
    },
    {
      id: '27',
      name: 'Suno',
      description:
        'AI music generation platform for creating songs from text prompts',
      category: 'Audio AI',
      icon: '🎵'
    },
    {
      id: '28',
      name: 'Udio',
      description:
        'AI music creation tool for generating high-quality musical compositions',
      category: 'Audio AI',
      icon: '🎶'
    },
    {
      id: '29',
      name: 'Whisper',
      description:
        'OpenAI speech recognition system for transcribing audio to text',
      category: 'Audio AI',
      icon: '🎧'
    },
    {
      id: '30',
      name: 'Adobe Podcast',
      description:
        'AI audio enhancement tools for podcast production and audio cleanup',
      category: 'Audio AI',
      icon: '📻'
    }
  ],
  'Business AI': [
    {
      id: '31',
      name: 'Zapier AI',
      description:
        'AI-powered automation platform connecting apps and workflows',
      category: 'Business AI',
      icon: '⚙️'
    },
    {
      id: '32',
      name: 'Salesforce Einstein',
      description:
        'AI-powered CRM insights and predictive analytics for sales teams',
      category: 'Business AI',
      icon: '📊'
    },
    {
      id: '33',
      name: 'Monday.com AI',
      description: 'AI project management assistant for workflow optimization',
      category: 'Business AI',
      icon: '📅'
    },
    {
      id: '34',
      name: 'HubSpot AI',
      description: 'AI-enhanced marketing and sales automation platform',
      category: 'Business AI',
      icon: '🎯'
    },
    {
      id: '35',
      name: 'Krisp',
      description:
        'AI noise cancellation and meeting assistant for better communication',
      category: 'Business AI',
      icon: '🔇'
    },
    {
      id: '36',
      name: 'Otter.ai',
      description: 'AI meeting transcription and note-taking assistant',
      category: 'Business AI',
      icon: '📝'
    }
  ]
};

export const categoryOrder = [
  'Trending Tools',
  'Text AI',
  'Image AI',
  'Video AI',
  'Code AI',
  'Audio AI',
  'Business AI'
];
