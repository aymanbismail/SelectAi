'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'motion/react';

interface Testimonial {
  id: number;
  text: string;
  avatar: string;
  username: string;
  role: string;
}

const ROLES = [
  'Product Designer',
  'Software Engineer',
  'Marketing Manager',
  'Data Scientist',
  'Content Creator',
  'UX Researcher',
  'Project Manager',
  'DevOps Engineer',
  'Business Analyst',
  'Creative Director',
  'Full Stack Developer',
  'Growth Hacker'
];

function TestimonialsColumn({
  testimonials,
  className,
  duration = 15,
  isRTL = false
}: {
  testimonials: Testimonial[];
  className?: string;
  duration?: number;
  isRTL?: boolean;
}) {
  return (
    <div className={cn('relative h-full overflow-hidden', className)}>
      <motion.div
        className='flex flex-col gap-4 pb-4'
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => {
          return (
            <div
              key={`${testimonial.id}-${index}`}
              className={cn(
                'bg-card/80 border-border/50 hover:border-border rounded-xl border p-5 shadow-lg backdrop-blur-sm transition-all duration-300',
                'hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
              )}
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                unicodeBidi: 'plaintext'
              }}
            >
              <p
                className={cn(
                  'text-foreground mb-4 leading-relaxed',
                  isRTL ? 'text-right' : 'text-left'
                )}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div
                className='flex items-center gap-3'
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                <div className='border-border/50 relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border'>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.username}
                    fill
                    sizes='40px'
                    className='object-cover'
                  />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className='text-foreground text-sm font-semibold'>
                    {testimonial.username}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const testimonials: Testimonial[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const gender = i % 2 === 0 ? 'women' : 'men';
      const photoIndex = Math.floor(i / 2) + 1;

      return {
        id: i + 1,
        text: t(`testimonial${i + 1}.text`),
        avatar: `https://randomuser.me/api/portraits/${gender}/${photoIndex}.jpg`,
        username: t(`testimonial${i + 1}.username`),
        role: ROLES[i]
      };
    });
  }, [t]);

  const column1 = useMemo(() => testimonials.slice(0, 4), [testimonials]);
  const column2 = useMemo(() => testimonials.slice(4, 8), [testimonials]);
  const column3 = useMemo(() => testimonials.slice(8, 12), [testimonials]);

  return (
    <section className='relative w-full overflow-hidden py-16 sm:py-20 lg:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Title */}
        <div className='mb-12 text-center sm:mb-16'>
          <h2
            className={cn(
              'mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl',
              isRTL ? 'pb-2 leading-[1.5]' : 'leading-normal'
            )}
          >
            <span className='text-foreground'>{t('title')}</span>
          </h2>
          <p
            className='text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl'
            style={{
              direction: isRTL ? 'rtl' : 'ltr',
              unicodeBidi: 'plaintext'
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Testimonials Columns */}
        <div className='relative h-[500px] overflow-hidden sm:h-[550px] lg:h-[600px]'>
          {/* Top fade */}
          <div className='from-background pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b to-transparent' />
          {/* Bottom fade */}
          <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t to-transparent' />

          <div className='grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {/* Column 1 - visible on all screens */}
            <TestimonialsColumn
              testimonials={column1}
              duration={20}
              className='block'
              isRTL={isRTL}
            />
            {/* Column 2 - hidden on mobile */}
            <TestimonialsColumn
              testimonials={column2}
              duration={25}
              className='hidden md:block'
              isRTL={isRTL}
            />
            {/* Column 3 - hidden on mobile and tablet */}
            <TestimonialsColumn
              testimonials={column3}
              duration={22}
              className='hidden lg:block'
              isRTL={isRTL}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
