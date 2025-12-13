'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Grid3X3,
  Layers,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ai';
import { AnimatedContainer } from '@/components/animation/animated-container';
import { Footer } from '@/components/layout/footer';
import type { AIItemBase } from '@/components/ai/types';
import BlurText from '@/components/BlurText';

// ============================================
// PLACEHOLDER DATA
// ============================================

const featuredTools: AIItemBase[] = [
  {
    id: 'tool-1',
    name: 'ChatGPT',
    description:
      'Advanced AI assistant for conversational AI, writing, and problem-solving',
    short_description: 'Advanced AI assistant for conversations & writing',
    category: 'Text AI',
    pricing_type: 'freemium',
    icon: '🤖',
    average_rating: 4.9,
    usage_count: 500000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-01',
    tags: ['chat', 'writing', 'assistant']
  },
  {
    id: 'tool-2',
    name: 'Midjourney',
    description:
      'AI art generator creating stunning, artistic images from text prompts',
    short_description: 'AI art generator for stunning images',
    category: 'Image AI',
    pricing_type: 'paid',
    icon: '🎨',
    average_rating: 4.8,
    usage_count: 320000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-15',
    tags: ['art', 'images', 'creative']
  },
  {
    id: 'tool-3',
    name: 'Claude',
    description:
      'AI assistant by Anthropic for helpful, harmless, and honest conversations',
    short_description: 'AI assistant for thoughtful conversations',
    category: 'Text AI',
    pricing_type: 'freemium',
    icon: '🧠',
    average_rating: 4.7,
    usage_count: 280000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-03-01',
    tags: ['chat', 'assistant', 'analysis']
  },
  {
    id: 'tool-4',
    name: 'Runway Gen-3',
    description: 'Next-gen AI video model for cinematic generation and editing',
    short_description: 'AI video generation & editing',
    category: 'Video AI',
    pricing_type: 'paid',
    icon: '🎬',
    average_rating: 4.6,
    usage_count: 150000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-04-10',
    tags: ['video', 'editing', 'creative']
  },
  {
    id: 'tool-5',
    name: 'GitHub Copilot',
    description:
      'AI-powered code completion and suggestion tool for developers',
    short_description: 'AI code assistant for developers',
    category: 'Code AI',
    pricing_type: 'paid',
    icon: '💻',
    average_rating: 4.8,
    usage_count: 450000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-01-20',
    tags: ['coding', 'developer', 'productivity']
  },
  {
    id: 'tool-6',
    name: 'ElevenLabs',
    description:
      'AI voice generation and cloning for realistic speech synthesis',
    short_description: 'AI voice generation & cloning',
    category: 'Audio AI',
    pricing_type: 'freemium',
    icon: '🎙️',
    average_rating: 4.7,
    usage_count: 180000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-28',
    tags: ['voice', 'audio', 'speech']
  }
];

const popularTools: AIItemBase[] = [
  {
    id: 'pop-1',
    name: 'Perplexity AI',
    description: 'Answer engine combining search with AI reasoning',
    short_description: 'AI-powered answer engine',
    category: 'Research AI',
    pricing_type: 'freemium',
    icon: '🔍',
    average_rating: 4.6,
    usage_count: 420000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-05-01',
    tags: ['search', 'research']
  },
  {
    id: 'pop-2',
    name: 'Notion AI',
    description: 'Integrated AI assistant for notes and documents',
    short_description: 'AI for notes & documents',
    category: 'Productivity AI',
    pricing_type: 'paid',
    icon: '📝',
    average_rating: 4.5,
    usage_count: 380000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-04-15',
    tags: ['productivity', 'notes']
  },
  {
    id: 'pop-3',
    name: 'Leonardo AI',
    description: 'AI platform for stylized image generation',
    short_description: 'Stylized AI image generation',
    category: 'Image AI',
    pricing_type: 'freemium',
    icon: '🖼️',
    average_rating: 4.4,
    usage_count: 350000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-03-20',
    tags: ['images', 'art']
  },
  {
    id: 'pop-4',
    name: 'Suno',
    description: 'Generate full songs from text prompts',
    short_description: 'AI music generation',
    category: 'Audio AI',
    pricing_type: 'freemium',
    icon: '🎵',
    average_rating: 4.5,
    usage_count: 290000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-06-01',
    tags: ['music', 'audio']
  },
  {
    id: 'pop-5',
    name: 'Gamma',
    description: 'AI tool for polished presentations',
    short_description: 'AI presentations & docs',
    category: 'Business AI',
    pricing_type: 'freemium',
    icon: '📊',
    average_rating: 4.3,
    usage_count: 260000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-05-15',
    tags: ['presentations', 'business']
  },
  {
    id: 'pop-6',
    name: 'Cursor',
    description: 'AI-first code editor for developers',
    short_description: 'AI code editor',
    category: 'Code AI',
    pricing_type: 'freemium',
    icon: '⌨️',
    average_rating: 4.7,
    usage_count: 240000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-04-01',
    tags: ['coding', 'editor']
  }
];

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  tool_count: number;
  agent_count: number;
}

const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Text & Writing',
    icon: '✍️',
    description:
      'AI tools for content creation, copywriting, and text generation',
    tool_count: 45,
    agent_count: 12
  },
  {
    id: 'cat-2',
    name: 'Image Generation',
    icon: '🎨',
    description: 'Create stunning visuals, art, and graphics with AI',
    tool_count: 32,
    agent_count: 8
  },
  {
    id: 'cat-3',
    name: 'Video & Animation',
    icon: '🎬',
    description: 'AI-powered video editing, generation, and animation',
    tool_count: 18,
    agent_count: 5
  },
  {
    id: 'cat-4',
    name: 'Audio & Music',
    icon: '🎵',
    description: 'Voice synthesis, music generation, and audio editing',
    tool_count: 24,
    agent_count: 6
  },
  {
    id: 'cat-5',
    name: 'Coding & Dev',
    icon: '💻',
    description: 'AI assistants for coding, debugging, and development',
    tool_count: 28,
    agent_count: 15
  },
  {
    id: 'cat-6',
    name: 'Research & Analysis',
    icon: '🔬',
    description: 'Deep research, data analysis, and insights',
    tool_count: 20,
    agent_count: 10
  },
  {
    id: 'cat-7',
    name: 'Business & Marketing',
    icon: '📈',
    description: 'Marketing automation, analytics, and business tools',
    tool_count: 35,
    agent_count: 14
  },
  {
    id: 'cat-8',
    name: 'Productivity',
    icon: '⚡',
    description: 'Streamline workflows and boost efficiency',
    tool_count: 40,
    agent_count: 18
  }
];

interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  tool_count: number;
  agent_count: number;
}

const collections: Collection[] = [
  {
    id: 'col-1',
    slug: 'best-ai-tools-for-students',
    title: 'Best AI Tools for Students',
    description:
      'Essential AI tools to enhance learning, research, and academic productivity',
    icon: '🎓',
    tool_count: 3,
    agent_count: 1
  },
  {
    id: 'col-2',
    slug: 'top-free-ai-tools',
    title: 'Top Free AI Tools',
    description: 'Powerful AI tools you can use without spending a dime',
    icon: '🆓',
    tool_count: 2,
    agent_count: 2
  },
  {
    id: 'col-3',
    slug: 'best-image-video-generators',
    title: 'Best Image & Video Generators',
    description: 'Create stunning visuals and videos with cutting-edge AI',
    icon: '🖼️',
    tool_count: 3,
    agent_count: 0
  },
  {
    id: 'col-4',
    slug: 'ai-tools-for-developers',
    title: 'AI Tools for Developers',
    description: 'Code faster and smarter with AI-powered development tools',
    icon: '👨‍💻',
    tool_count: 2,
    agent_count: 2
  },
  {
    id: 'col-5',
    slug: 'productivity-boosters',
    title: 'Productivity Boosters',
    description: 'AI tools that supercharge your daily workflow',
    icon: '🚀',
    tool_count: 3,
    agent_count: 1
  },
  {
    id: 'col-6',
    slug: 'business-marketing-ai',
    title: 'Business & Marketing AI',
    description: 'Grow your business with AI-powered marketing and analytics',
    icon: '💼',
    tool_count: 3,
    agent_count: 1
  }
];

const trendingAgents: AIItemBase[] = [
  {
    id: 'agent-1',
    name: 'Devin',
    description:
      'Autonomous AI software engineer that can plan, code, debug, and deploy',
    short_description: 'Autonomous AI software engineer',
    category: 'Coding Agent',
    pricing_type: 'enterprise',
    icon: '👨‍💻',
    average_rating: 4.7,
    usage_count: 45000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-03-01',
    tags: ['coding', 'autonomous']
  },
  {
    id: 'agent-2',
    name: 'Auto-GPT',
    description: 'Open-source autonomous AI agent for complex goals',
    short_description: 'Open-source autonomous AI agent',
    category: 'Workflow Agent',
    pricing_type: 'free',
    icon: '🔄',
    average_rating: 4.2,
    usage_count: 180000,
    is_featured: true,
    is_verified: true,
    created_at: '2023-11-15',
    tags: ['autonomous', 'automation']
  },
  {
    id: 'agent-3',
    name: 'CrewAI',
    description: 'Framework for orchestrating role-playing AI agents',
    short_description: 'AI agent orchestration framework',
    category: 'Workflow Agent',
    pricing_type: 'free',
    icon: '👥',
    average_rating: 4.5,
    usage_count: 120000,
    is_featured: true,
    is_verified: true,
    created_at: '2024-02-01',
    tags: ['orchestration', 'multi-agent']
  },
  {
    id: 'agent-4',
    name: 'AgentGPT',
    description: 'Deploy autonomous AI agents in your browser',
    short_description: 'Browser-based autonomous agents',
    category: 'Personal Assistant',
    pricing_type: 'freemium',
    icon: '🤖',
    average_rating: 4.0,
    usage_count: 95000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-01-10',
    tags: ['browser', 'autonomous']
  },
  {
    id: 'agent-5',
    name: 'LangGraph Agent',
    description: 'Build stateful, multi-actor applications with LLMs',
    short_description: 'Stateful multi-actor AI agents',
    category: 'Workflow Agent',
    pricing_type: 'free',
    icon: '🕸️',
    average_rating: 4.4,
    usage_count: 85000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-04-01',
    tags: ['stateful', 'multi-agent']
  },
  {
    id: 'agent-6',
    name: 'Sweep AI',
    description: 'AI-powered code review and bug fixing agent',
    short_description: 'AI code review & bug fixing',
    category: 'Coding Agent',
    pricing_type: 'freemium',
    icon: '🧹',
    average_rating: 4.3,
    usage_count: 70000,
    is_featured: false,
    is_verified: true,
    created_at: '2024-05-01',
    tags: ['code-review', 'bugs']
  }
];

// ============================================
// COMPONENTS
// ============================================

function HeroSection() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const t = useTranslations('explore');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className='relative py-24 md:py-32'>
      {/* Subtle gradient background */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='bg-background absolute inset-0' />
        <div className='from-accent/30 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent to-transparent' />
      </div>

      <div className='flex flex-col items-center px-3 text-center sm:px-4'>
        <AnimatedContainer delay={0.1}>
          <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <BlurText
              text={`${t('title')}`}
              delay={150}
              animateBy='words'
              displayAs='block'
              direction='top'
              className='text-foreground mb-4 text-center text-3xl leading-tight font-bold tracking-tight whitespace-pre-wrap sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl'
            />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2}>
          <p className='text-muted-foreground mx-auto mb-10 max-w-2xl text-lg md:text-xl'>
            {t('subtitle')}
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3} className='w-full max-w-2xl'>
          <div className='group relative w-full' dir={isRTL ? 'rtl' : 'ltr'}>
            <Search className='text-muted-foreground group-focus-within:text-foreground pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors' />
            <Input
              type='text'
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='border-border/50 bg-card/80 placeholder:text-muted-foreground/60 focus-visible:border-border focus-visible:ring-ring/20 h-14 w-full rounded-xl ps-12 pe-4 text-base backdrop-blur-sm transition-all duration-300 focus-visible:ring-4'
            />
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
  action,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  delay?: number;
}) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <AnimatedContainer delay={delay}>
      <div
        className={cn(
          'mb-8 flex items-end justify-between',
          isRTL && 'flex-row-reverse'
        )}
      >
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <div
            className={cn(
              'mb-2 flex items-center gap-2',
              isRTL && 'flex-row-reverse'
            )}
          >
            <Icon className='text-muted-foreground h-5 w-5' />
            <h2 className='text-foreground text-2xl font-bold tracking-tight md:text-3xl'>
              {title}
            </h2>
          </div>
          {description && (
            <p className='text-muted-foreground text-sm md:text-base'>
              {description}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={`/${locale}${action.href}`}
            className={cn(
              'text-muted-foreground hover:text-foreground group flex items-center gap-1 text-sm font-medium transition-colors',
              isRTL && 'flex-row-reverse'
            )}
          >
            {action.label}
            <ArrowIcon
              className={cn(
                'h-4 w-4 transition-transform',
                isRTL
                  ? 'group-hover:-translate-x-0.5'
                  : 'group-hover:translate-x-0.5'
              )}
            />
          </Link>
        )}
      </div>
    </AnimatedContainer>
  );
}

function FeaturedToolsSection() {
  const t = useTranslations('explore');

  return (
    <section className='py-24'>
      <div className='mx-auto max-w-7xl px-4'>
        <SectionHeader
          icon={Sparkles}
          title={t('featuredTools')}
          description={t('featuredToolsDescription')}
          action={{ label: t('viewAll'), href: '/ai-tools' }}
          delay={0.1}
        />

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {featuredTools.map((tool, index) => (
            <Card
              key={tool.id}
              item={tool}
              index={index}
              onClick={() => void 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularThisWeekSection() {
  const t = useTranslations('explore');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  // Sort by usage_count (already sorted in data, but showing the logic)
  const sortedTools = [...popularTools].sort(
    (a, b) => b.usage_count - a.usage_count
  );

  return (
    <section className='bg-accent/30 py-24'>
      <div className='mx-auto max-w-7xl px-4'>
        <SectionHeader
          icon={TrendingUp}
          title={t('popularThisWeek')}
          description={t('popularThisWeekDescription')}
          delay={0.1}
        />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {sortedTools.map((tool, index) => (
            <AnimatedContainer key={tool.id} delay={0.15 + index * 0.05}>
              <div
                className={cn(
                  'group flex items-center gap-4 rounded-xl p-4',
                  'bg-card/60 backdrop-blur-sm',
                  'border-border/50 border',
                  'hover:border-border hover:bg-card/80',
                  'cursor-pointer transition-all duration-200',
                  isRTL && 'flex-row-reverse'
                )}
                onClick={() => void 0}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
                    'bg-accent border-border/50 border'
                  )}
                >
                  <span className='text-xl'>{tool.icon}</span>
                </div>
                <div className={cn('min-w-0 flex-1', isRTL && 'text-right')}>
                  <h3 className='text-foreground truncate font-semibold'>
                    {tool.name}
                  </h3>
                  <p className='text-muted-foreground truncate text-sm'>
                    {tool.short_description}
                  </p>
                </div>
                <div className='text-muted-foreground shrink-0 text-xs'>
                  {(tool.usage_count / 1000).toFixed(0)}k
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrowseByCategoriesSection() {
  const locale = useLocale();
  const t = useTranslations('explore');
  const isRTL = locale === 'ar';

  return (
    <section className='py-24'>
      <div className='mx-auto max-w-7xl px-4'>
        <SectionHeader
          icon={Grid3X3}
          title={t('browseByCategory')}
          description={t('browseByDescription')}
          delay={0.1}
        />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {categories.map((category, index) => (
            <AnimatedContainer key={category.id} delay={0.15 + index * 0.05}>
              <Link
                href={`/${locale}/ai-tools?category=${encodeURIComponent(category.name)}`}
                className='block h-full'
              >
                <div
                  className={cn(
                    'group relative flex h-full min-h-[180px] flex-col rounded-xl p-5',
                    'bg-card/80 backdrop-blur-sm',
                    'border-border/50 border',
                    'hover:border-border hover:scale-[1.02]',
                    'transition-all duration-200',
                    isRTL && 'text-right'
                  )}
                >
                  <div className='mb-3 text-3xl'>{category.icon}</div>
                  <h3 className='text-foreground mb-1 font-semibold'>
                    {category.name}
                  </h3>
                  <p className='text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm'>
                    {category.description}
                  </p>
                  <div
                    className={cn(
                      'text-muted-foreground mt-auto flex items-center gap-3 text-xs',
                      isRTL && 'flex-row-reverse'
                    )}
                  >
                    <span>
                      {category.tool_count} {t('tools')}
                    </span>
                    <span className='text-border'>•</span>
                    <span>
                      {category.agent_count} {t('agents')}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

function CuratedCollectionsSection() {
  const locale = useLocale();
  const t = useTranslations('explore');
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className='bg-accent/30 py-24'>
      <div className='mx-auto max-w-7xl px-4'>
        <SectionHeader
          icon={Layers}
          title={t('curatedCollections')}
          description={t('curatedCollectionsDescription')}
          delay={0.1}
        />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {collections.map((collection, index) => (
            <AnimatedContainer key={collection.id} delay={0.15 + index * 0.05}>
              <Link
                href={`/${locale}/collections/${collection.slug}`}
                className='block h-full'
              >
                <div
                  className={cn(
                    'group relative flex h-full min-h-[200px] flex-col rounded-xl p-6',
                    'bg-card/60 backdrop-blur-sm',
                    'border-border/50 border',
                    'hover:border-border hover:bg-card/80 hover:shadow-lg',
                    'transition-all duration-300',
                    isRTL && 'text-right'
                  )}
                >
                  {/* Glass effect overlay */}
                  <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent' />

                  <div className='relative flex h-full flex-col'>
                    <div className='mb-3 text-4xl'>{collection.icon}</div>
                    <h3 className='text-foreground mb-2 text-lg font-semibold'>
                      {collection.title}
                    </h3>
                    <p className='text-muted-foreground mb-4 line-clamp-2 flex-1 text-sm'>
                      {collection.description}
                    </p>
                    <div
                      className={cn(
                        'text-muted-foreground mt-auto flex items-center justify-between text-xs',
                        isRTL && 'flex-row-reverse'
                      )}
                    >
                      <span
                        className={cn(
                          'flex items-center gap-2',
                          isRTL && 'flex-row-reverse'
                        )}
                      >
                        <span>
                          {collection.tool_count} {t('tools')}
                        </span>
                        {collection.agent_count > 0 && (
                          <>
                            <span className='text-border'>·</span>
                            <span>
                              {collection.agent_count} {t('agents')}
                            </span>
                          </>
                        )}
                      </span>
                      <ArrowIcon
                        className={cn(
                          'h-3 w-3 transition-transform',
                          isRTL
                            ? 'group-hover:-translate-x-0.5'
                            : 'group-hover:translate-x-0.5'
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingAgentsSection() {
  const t = useTranslations('explore');

  return (
    <section className='py-24'>
      <div className='mx-auto max-w-7xl px-4'>
        <SectionHeader
          icon={Bot}
          title={t('trendingAgents')}
          description={t('trendingAgentsDescription')}
          action={{ label: t('viewAll'), href: '/agents' }}
          delay={0.1}
        />

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {trendingAgents.map((agent, index) => (
            <Card
              key={agent.id}
              item={agent}
              index={index}
              onClick={() => void 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('explore');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className='border-border/50 border-t py-24'>
      <div className='mx-auto max-w-3xl px-4 text-center'>
        <AnimatedContainer delay={0.1}>
          <h2 className='text-foreground mb-4 text-2xl font-bold tracking-tight md:text-3xl'>
            {t('readyToFind')}
          </h2>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2}>
          <p className='text-muted-foreground mb-8 text-base md:text-lg'>
            {t('startExploring')}
          </p>
        </AnimatedContainer>

        <AnimatedContainer delay={0.3}>
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-4 sm:flex-row',
              isRTL && 'sm:flex-row-reverse'
            )}
          >
            <Button size='lg' className='h-12 min-w-[140px] rounded-lg'>
              {t('browseTools')}
              <ArrowIcon className={cn('h-4 w-4', isRTL ? 'mr-2' : 'ml-2')} />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='h-12 min-w-[140px] rounded-lg'
            >
              {t('browseAgents')}
            </Button>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function ExplorePage() {
  return (
    <PageContainer scrollable={true} className='!p-0'>
      <div className='flex w-full flex-col'>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Tools */}
        <FeaturedToolsSection />

        {/* Popular This Week */}
        <PopularThisWeekSection />

        {/* Browse by Categories */}
        <BrowseByCategoriesSection />

        {/* Curated Collections */}
        <CuratedCollectionsSection />

        {/* Trending Agents */}
        <TrendingAgentsSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </PageContainer>
  );
}
