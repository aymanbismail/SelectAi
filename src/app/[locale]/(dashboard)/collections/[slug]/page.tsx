'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, ExternalLink, Wrench, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ai';
import { AnimatedContainer } from '@/components/animation/animated-container';
import { Footer } from '@/components/layout/footer';
import type { AIItemBase } from '@/components/ai/types';

// ============================================
// TYPES
// ============================================

// Extended type for collection items that can be either a tool or agent
interface CollectionItem extends AIItemBase {
  type: 'tool' | 'agent';
}

interface CollectionData {
  slug: string;
  title: string;
  description: string;
  icon: string;
  longDescription: string;
  items: CollectionItem[];
}

// ============================================
// PLACEHOLDER COLLECTION DATA
// ============================================

const collectionsData: Record<string, CollectionData> = {
  'best-ai-tools-for-students': {
    slug: 'best-ai-tools-for-students',
    title: 'Best AI Tools for Students',
    description:
      'Essential AI tools to enhance learning, research, and academic productivity',
    icon: '🎓',
    longDescription:
      "Whether you're writing essays, conducting research, or studying for exams, these AI tools will help you work smarter and achieve better results in your academic journey.",
    items: [
      {
        id: 'stu-1',
        type: 'tool',
        name: 'ChatGPT',
        description:
          'AI assistant for homework help, essay writing, and explaining complex concepts',
        short_description: 'AI study companion & writing helper',
        category: 'Text AI',
        pricing_type: 'freemium',
        icon: '🤖',
        average_rating: 4.9,
        usage_count: 500000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-01-01',
        tags: ['writing', 'study', 'research']
      },
      {
        id: 'stu-2',
        type: 'tool',
        name: 'Grammarly',
        description:
          'Perfect your essays with AI-powered grammar and style suggestions',
        short_description: 'AI writing assistant',
        category: 'Writing AI',
        pricing_type: 'freemium',
        icon: '✍️',
        average_rating: 4.7,
        usage_count: 380000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['grammar', 'writing']
      },
      {
        id: 'stu-agent-1',
        type: 'agent',
        name: 'Study Buddy Agent',
        description:
          'Autonomous AI tutor that creates personalized study plans and quizzes',
        short_description: 'AI study planning agent',
        category: 'Personal Assistant',
        pricing_type: 'freemium',
        icon: '📚',
        average_rating: 4.5,
        usage_count: 85000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-03-01',
        tags: ['study', 'tutor', 'agent']
      },
      {
        id: 'stu-3',
        type: 'tool',
        name: 'Perplexity AI',
        description: 'AI-powered research assistant with cited sources',
        short_description: 'Research with citations',
        category: 'Research AI',
        pricing_type: 'freemium',
        icon: '🔍',
        average_rating: 4.5,
        usage_count: 180000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-04-01',
        tags: ['research', 'citations']
      }
    ]
  },
  'top-free-ai-tools': {
    slug: 'top-free-ai-tools',
    title: 'Top Free AI Tools',
    description: 'Powerful AI tools you can use without spending a dime',
    icon: '🆓',
    longDescription:
      "You don't need to break the bank to leverage AI. These free tools offer incredible value and functionality for individuals and teams looking to explore the AI landscape.",
    items: [
      {
        id: 'free-1',
        type: 'tool',
        name: 'Stable Diffusion',
        description: 'Free and open-source AI image generation',
        short_description: 'Open-source image generation',
        category: 'Image AI',
        pricing_type: 'free',
        icon: '🎨',
        average_rating: 4.5,
        usage_count: 250000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['images', 'open-source']
      },
      {
        id: 'free-agent-1',
        type: 'agent',
        name: 'Auto-GPT',
        description: 'Open-source autonomous AI agent for complex automation',
        short_description: 'Free autonomous AI agent',
        category: 'Workflow Agent',
        pricing_type: 'free',
        icon: '🔄',
        average_rating: 4.2,
        usage_count: 180000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-01-01',
        tags: ['automation', 'open-source', 'agent']
      },
      {
        id: 'free-2',
        type: 'tool',
        name: 'Hugging Face',
        description: 'Free access to thousands of AI models',
        short_description: 'AI model hub',
        category: 'Platform',
        pricing_type: 'free',
        icon: '🤗',
        average_rating: 4.6,
        usage_count: 320000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-03-01',
        tags: ['models', 'platform']
      },
      {
        id: 'free-agent-2',
        type: 'agent',
        name: 'CrewAI',
        description: 'Open-source framework for orchestrating AI agents',
        short_description: 'Free multi-agent framework',
        category: 'Workflow Agent',
        pricing_type: 'free',
        icon: '👥',
        average_rating: 4.5,
        usage_count: 120000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['multi-agent', 'open-source']
      }
    ]
  },
  'best-image-video-generators': {
    slug: 'best-image-video-generators',
    title: 'Best Image & Video Generators',
    description: 'Create stunning visuals and videos with cutting-edge AI',
    icon: '🖼️',
    longDescription:
      'From photorealistic images to cinematic videos, these AI tools are revolutionizing visual content creation. Perfect for creators, marketers, and artists.',
    items: [
      {
        id: 'img-1',
        type: 'tool',
        name: 'Midjourney',
        description: 'Create stunning artistic images from text descriptions',
        short_description: 'Premium AI art generation',
        category: 'Image AI',
        pricing_type: 'paid',
        icon: '🎨',
        average_rating: 4.8,
        usage_count: 320000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-01-01',
        tags: ['art', 'images']
      },
      {
        id: 'img-2',
        type: 'tool',
        name: 'DALL-E 3',
        description: "OpenAI's most advanced image generation model",
        short_description: 'Advanced image generation',
        category: 'Image AI',
        pricing_type: 'paid',
        icon: '🖼️',
        average_rating: 4.7,
        usage_count: 280000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['images', 'openai']
      },
      {
        id: 'img-3',
        type: 'tool',
        name: 'Runway Gen-3',
        description: 'Generate cinematic videos from text and images',
        short_description: 'AI video generation',
        category: 'Video AI',
        pricing_type: 'paid',
        icon: '🎬',
        average_rating: 4.6,
        usage_count: 150000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-03-01',
        tags: ['video', 'cinematic']
      }
    ]
  },
  'ai-tools-for-developers': {
    slug: 'ai-tools-for-developers',
    title: 'AI Tools for Developers',
    description: 'Code faster and smarter with AI-powered development tools',
    icon: '👨‍💻',
    longDescription:
      'Level up your development workflow with these AI coding assistants. From code completion to automated testing, these tools are changing how we build software.',
    items: [
      {
        id: 'dev-1',
        type: 'tool',
        name: 'GitHub Copilot',
        description: 'AI pair programmer that suggests code as you type',
        short_description: 'AI code completion',
        category: 'Code AI',
        pricing_type: 'paid',
        icon: '💻',
        average_rating: 4.8,
        usage_count: 450000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-01-01',
        tags: ['coding', 'completion']
      },
      {
        id: 'dev-2',
        type: 'tool',
        name: 'Cursor',
        description: 'AI-first code editor built for productivity',
        short_description: 'AI code editor',
        category: 'Code AI',
        pricing_type: 'freemium',
        icon: '⌨️',
        average_rating: 4.7,
        usage_count: 240000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['editor', 'coding']
      },
      {
        id: 'dev-agent-1',
        type: 'agent',
        name: 'Devin',
        description:
          'Autonomous AI software engineer that plans, codes, and deploys',
        short_description: 'AI software engineer',
        category: 'Coding Agent',
        pricing_type: 'enterprise',
        icon: '🤖',
        average_rating: 4.7,
        usage_count: 45000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-03-01',
        tags: ['autonomous', 'agent', 'coding']
      },
      {
        id: 'dev-agent-2',
        type: 'agent',
        name: 'Sweep AI',
        description: 'AI agent for automated code review and bug fixing',
        short_description: 'Code review agent',
        category: 'Coding Agent',
        pricing_type: 'freemium',
        icon: '🧹',
        average_rating: 4.3,
        usage_count: 70000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-04-01',
        tags: ['code-review', 'agent']
      }
    ]
  },
  'productivity-boosters': {
    slug: 'productivity-boosters',
    title: 'Productivity Boosters',
    description: 'AI tools that supercharge your daily workflow',
    icon: '🚀',
    longDescription:
      'Stop wasting time on repetitive tasks. These AI productivity tools help you work faster, smarter, and more efficiently every single day.',
    items: [
      {
        id: 'prod-1',
        type: 'tool',
        name: 'Notion AI',
        description: 'AI-powered workspace for notes, docs, and projects',
        short_description: 'AI workspace',
        category: 'Productivity AI',
        pricing_type: 'freemium',
        icon: '📝',
        average_rating: 4.6,
        usage_count: 380000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-01-01',
        tags: ['notes', 'workspace']
      },
      {
        id: 'prod-agent-1',
        type: 'agent',
        name: 'AgentGPT',
        description: 'Deploy autonomous AI agents to complete tasks for you',
        short_description: 'Task automation agent',
        category: 'Personal Assistant',
        pricing_type: 'freemium',
        icon: '🤖',
        average_rating: 4.0,
        usage_count: 95000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['automation', 'agent']
      },
      {
        id: 'prod-2',
        type: 'tool',
        name: 'Otter.ai',
        description: 'AI meeting transcription and note-taking',
        short_description: 'Meeting transcription',
        category: 'Productivity AI',
        pricing_type: 'freemium',
        icon: '🦦',
        average_rating: 4.4,
        usage_count: 180000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['meetings', 'transcription']
      },
      {
        id: 'prod-3',
        type: 'tool',
        name: 'Gamma',
        description: 'Create presentations in seconds with AI',
        short_description: 'AI presentations',
        category: 'Business AI',
        pricing_type: 'freemium',
        icon: '📊',
        average_rating: 4.3,
        usage_count: 260000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-03-01',
        tags: ['presentations', 'slides']
      }
    ]
  },
  'business-marketing-ai': {
    slug: 'business-marketing-ai',
    title: 'Business & Marketing AI',
    description: 'Grow your business with AI-powered marketing and analytics',
    icon: '💼',
    longDescription:
      'From content creation to customer analytics, these AI tools help businesses scale their marketing efforts and make data-driven decisions.',
    items: [
      {
        id: 'biz-1',
        type: 'tool',
        name: 'Jasper',
        description: 'AI marketing content generation platform',
        short_description: 'AI marketing content',
        category: 'Marketing AI',
        pricing_type: 'paid',
        icon: '✨',
        average_rating: 4.5,
        usage_count: 220000,
        is_featured: true,
        is_verified: true,
        created_at: '2024-01-01',
        tags: ['marketing', 'content']
      },
      {
        id: 'biz-agent-1',
        type: 'agent',
        name: 'AI Sales Agent',
        description:
          'Autonomous agent that handles lead qualification and outreach',
        short_description: 'Sales automation agent',
        category: 'Sales Agent',
        pricing_type: 'paid',
        icon: '💰',
        average_rating: 4.2,
        usage_count: 65000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['sales', 'automation', 'agent']
      },
      {
        id: 'biz-2',
        type: 'tool',
        name: 'Copy.ai',
        description: 'Generate marketing copy and social media content',
        short_description: 'AI copywriting',
        category: 'Marketing AI',
        pricing_type: 'freemium',
        icon: '📋',
        average_rating: 4.3,
        usage_count: 180000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-02-01',
        tags: ['copywriting', 'social']
      },
      {
        id: 'biz-3',
        type: 'tool',
        name: 'Surfer SEO',
        description: 'AI-powered SEO optimization and content planning',
        short_description: 'AI SEO optimization',
        category: 'Marketing AI',
        pricing_type: 'paid',
        icon: '🏄',
        average_rating: 4.4,
        usage_count: 120000,
        is_featured: false,
        is_verified: true,
        created_at: '2024-03-01',
        tags: ['seo', 'optimization']
      }
    ]
  }
};

// Default fallback collection
const defaultCollection: CollectionData = {
  slug: 'coming-soon',
  title: 'Collection Coming Soon',
  description: 'This collection is being curated',
  icon: '🔮',
  longDescription:
    'Our team is working on curating the best AI tools for this collection. Check back soon!',
  items: []
};

export default function CollectionPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('collectionDetail');
  const isRTL = locale === 'ar';
  const slug = params.slug as string;

  const collection = collectionsData[slug] || defaultCollection;
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <PageContainer scrollable={true} className='!p-0'>
      <div className='flex w-full flex-col' dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header Section */}
        <section className='border-border/50 border-b py-16 md:py-24'>
          <div className='mx-auto max-w-7xl px-4'>
            <AnimatedContainer delay={0.1}>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => router.push(`/${locale}/explore`)}
                className={cn(
                  'text-muted-foreground hover:text-foreground mb-6',
                  isRTL && 'flex-row-reverse'
                )}
              >
                <BackIcon className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
                {t('backToExplore')}
              </Button>
            </AnimatedContainer>

            <AnimatedContainer delay={0.15}>
              <div className='mb-4 text-5xl'>{collection.icon}</div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <h1 className='text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
                {collection.title}
              </h1>
            </AnimatedContainer>

            <AnimatedContainer delay={0.25}>
              <p className='text-muted-foreground max-w-2xl text-lg md:text-xl'>
                {collection.longDescription}
              </p>
            </AnimatedContainer>

            <AnimatedContainer delay={0.3}>
              <div
                className={cn(
                  'text-muted-foreground mt-6 flex items-center gap-4 text-sm',
                  isRTL && 'flex-row-reverse justify-start'
                )}
              >
                <span
                  className={cn(
                    'flex items-center gap-1.5',
                    isRTL && 'flex-row-reverse'
                  )}
                >
                  <Wrench className='h-4 w-4' />
                  {
                    collection.items.filter((item) => item.type === 'tool')
                      .length
                  }{' '}
                  {t('tools')}
                </span>
                <span className='text-border'>·</span>
                <span
                  className={cn(
                    'flex items-center gap-1.5',
                    isRTL && 'flex-row-reverse'
                  )}
                >
                  <Bot className='h-4 w-4' />
                  {
                    collection.items.filter((item) => item.type === 'agent')
                      .length
                  }{' '}
                  {t('agents')}
                </span>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Items Grid */}
        <section className='py-16 md:py-24'>
          <div className='mx-auto max-w-7xl px-4'>
            {collection.items.length > 0 ? (
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {collection.items.map((item, index) => (
                  <Card
                    key={item.id}
                    item={item}
                    index={index}
                    onClick={() => void 0}
                  />
                ))}
              </div>
            ) : (
              <AnimatedContainer delay={0.1}>
                <div className='py-24 text-center'>
                  <div className='mb-4 text-5xl'>🔮</div>
                  <h3 className='text-foreground mb-2 text-xl font-semibold'>
                    {t('comingSoon')}
                  </h3>
                  <p className='text-muted-foreground'>{t('comingSoonDesc')}</p>
                </div>
              </AnimatedContainer>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className='bg-accent/30 py-16'>
          <div className='mx-auto max-w-3xl px-4 text-center'>
            <AnimatedContainer delay={0.1}>
              <h2 className='text-foreground mb-4 text-2xl font-bold'>
                {t('cantFindTitle')}
              </h2>
            </AnimatedContainer>
            <AnimatedContainer delay={0.2}>
              <p className='text-muted-foreground mb-6'>{t('cantFindDesc')}</p>
            </AnimatedContainer>
            <AnimatedContainer delay={0.3}>
              <div
                className={cn(
                  'flex flex-col items-center justify-center gap-4 sm:flex-row',
                  isRTL && 'sm:flex-row-reverse'
                )}
              >
                <Button asChild variant='default'>
                  <Link href={`/${locale}/ai-tools`}>
                    {t('browseAllTools')}
                    <ExternalLink
                      className={cn('h-4 w-4', isRTL ? 'mr-2' : 'ml-2')}
                    />
                  </Link>
                </Button>
                <Button asChild variant='outline'>
                  <Link href={`/${locale}/agents`}>
                    {t('browseAllAgents')}
                    <ExternalLink
                      className={cn('h-4 w-4', isRTL ? 'mr-2' : 'ml-2')}
                    />
                  </Link>
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </PageContainer>
  );
}
