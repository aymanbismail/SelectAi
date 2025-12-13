'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Layers, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { AnimatedContainer } from '@/components/animation/animated-container';
import { Footer } from '@/components/layout/footer';
import BlurText from '@/components/BlurText';

// ============================================
// PLACEHOLDER COLLECTIONS DATA
// ============================================

interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  item_count: number;
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
    item_count: 4,
    tool_count: 3,
    agent_count: 1
  },
  {
    id: 'col-2',
    slug: 'top-free-ai-tools',
    title: 'Top Free AI Tools',
    description: 'Powerful AI tools you can use without spending a dime',
    icon: '🆓',
    item_count: 4,
    tool_count: 2,
    agent_count: 2
  },
  {
    id: 'col-3',
    slug: 'best-image-video-generators',
    title: 'Best Image & Video Generators',
    description: 'Create stunning visuals and videos with cutting-edge AI',
    icon: '🖼️',
    item_count: 3,
    tool_count: 3,
    agent_count: 0
  },
  {
    id: 'col-4',
    slug: 'ai-tools-for-developers',
    title: 'AI Tools for Developers',
    description: 'Code faster and smarter with AI-powered development tools',
    icon: '👨‍💻',
    item_count: 4,
    tool_count: 2,
    agent_count: 2
  },
  {
    id: 'col-5',
    slug: 'productivity-boosters',
    title: 'Productivity Boosters',
    description: 'AI tools that supercharge your daily workflow',
    icon: '🚀',
    item_count: 4,
    tool_count: 3,
    agent_count: 1
  },
  {
    id: 'col-6',
    slug: 'business-marketing-ai',
    title: 'Business & Marketing AI',
    description: 'Grow your business with AI-powered marketing and analytics',
    icon: '💼',
    item_count: 4,
    tool_count: 3,
    agent_count: 1
  }
];

// ============================================
// COMPONENTS
// ============================================

function HeroSection() {
  const t = useTranslations('collections');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className='relative py-16 md:py-24'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='bg-background absolute inset-0' />
        <div className='from-accent/30 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent to-transparent' />
      </div>

      <div className='mx-auto max-w-5xl px-4 text-center'>
        <AnimatedContainer delay={0.1}>
          <div className='bg-accent/50 border-border/50 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border'>
            <Layers className='text-foreground h-8 w-8' />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.15}>
          <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <BlurText
              text={t('title')}
              delay={150}
              animateBy='words'
              displayAs='block'
              direction='top'
              className='text-foreground mb-4 text-center text-3xl leading-tight font-bold tracking-tight whitespace-pre-wrap md:text-4xl lg:text-5xl'
            />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2}>
          <p className='text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl'>
            {t('subtitle')}
          </p>
        </AnimatedContainer>
      </div>
    </section>
  );
}

function CollectionsGrid() {
  const locale = useLocale();
  const t = useTranslations('collections');
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className='py-16 md:py-24'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {collections.map((collection, index) => (
            <AnimatedContainer key={collection.id} delay={0.1 + index * 0.05}>
              <Link
                href={`/${locale}/collections/${collection.slug}`}
                className='block h-full'
              >
                <div
                  className={cn(
                    'group relative flex h-full min-h-[220px] flex-col rounded-xl p-6',
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
                    <div className='mb-4 text-5xl'>{collection.icon}</div>
                    <h3 className='text-foreground mb-2 text-xl font-semibold'>
                      {collection.title}
                    </h3>
                    <p className='text-muted-foreground mb-6 line-clamp-2 flex-1 text-sm'>
                      {collection.description}
                    </p>
                    <div
                      className={cn(
                        'mt-auto flex items-center justify-between',
                        isRTL && 'flex-row-reverse'
                      )}
                    >
                      <div
                        className={cn(
                          'text-muted-foreground flex items-center gap-2 text-xs',
                          isRTL && 'flex-row-reverse'
                        )}
                      >
                        <span>
                          {collection.tool_count} {t('toolsCount')}
                        </span>
                        {collection.agent_count > 0 && (
                          <>
                            <span className='text-border'>·</span>
                            <span>
                              {collection.agent_count} {t('agentsCount')}
                            </span>
                          </>
                        )}
                      </div>
                      <ArrowIcon
                        className={cn(
                          'text-muted-foreground h-4 w-4 transition-transform',
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

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function CollectionsPage() {
  return (
    <PageContainer scrollable={true} className='!p-0'>
      <div className='flex w-full flex-col'>
        {/* Hero Section */}
        <HeroSection />

        {/* Collections Grid */}
        <CollectionsGrid />

        {/* Footer */}
        <Footer />
      </div>
    </PageContainer>
  );
}
