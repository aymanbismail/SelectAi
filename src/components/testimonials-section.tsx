'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import GradientText from './GradientText';
import { isArabic } from '@/lib/arabic';

interface Testimonial {
  id: number;
  text: string;
  avatar: string;
  username: string;
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Specific avatar IDs for variety
  const femaleAvatarIds = [79, 63, 83, 86, 66, 61]; // For testimonials 1, 3, 5, 7, 9, 11
  const maleAvatarIds = [42, 37, 4, 5, 1, 23]; // For testimonials 2, 4, 6, 8, 10, 12

  const testimonials: Testimonial[] = Array.from({ length: 12 }, (_, i) => {
    // Odd positions (0, 2, 4, 6, 8, 10) = Female names (1, 3, 5, 7, 9, 11)
    // Even positions (1, 3, 5, 7, 9, 11) = Male names (2, 4, 6, 8, 10, 12)
    const isFemale = i % 2 === 0;
    const avatarIndex = Math.floor(i / 2);
    const avatarId = isFemale
      ? femaleAvatarIds[avatarIndex]
      : maleAvatarIds[avatarIndex];

    return {
      id: i + 1,
      text: t(`testimonial${i + 1}.text`),
      avatar: `https://avatar.iran.liara.run/public/${avatarId}`,
      username: t(`testimonial${i + 1}.username`)
    };
  });

  // Split testimonials into 3 rows (4 testimonials each)
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);
  const row3 = testimonials.slice(8, 12);

  // Duplicate for seamless loop
  const row1Duplicated = [...row1, ...row1, ...row1];
  const row2Duplicated = [...row2, ...row2, ...row2];
  const row3Duplicated = [...row3, ...row3, ...row3];

  // Render a single row of testimonials
  const renderRow = (
    testimonials: Testimonial[],
    direction: 'ltr' | 'rtl',
    speed: number,
    rowIndex: number
  ) => {
    return (
      <div
        className='relative isolate mb-3 w-full overflow-hidden last:mb-0 md:mb-4'
        style={{ contain: 'layout style paint', maxWidth: '100%' }}
      >
        {/* Left Fade Gradient - Fully transparent with blur effect */}
        <div
          className='pointer-events-none absolute top-0 left-0 z-10 h-full w-16 backdrop-blur-[1px] min-[500px]:w-20 md:w-32 lg:w-48'
          style={{
            maskImage:
              'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, black 0%, black 30%, transparent 100%)'
          }}
        />

        {/* Right Fade Gradient - Fully transparent with blur effect */}
        <div
          className='pointer-events-none absolute top-0 right-0 z-10 h-full w-16 backdrop-blur-[1px] min-[500px]:w-20 md:w-32 lg:w-48'
          style={{
            maskImage:
              'linear-gradient(to left, black 0%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to left, black 0%, black 30%, transparent 100%)'
          }}
        />

        {/* Scrolling Container */}
        <div className='testimonials-scroll group relative h-[170px] w-full overflow-hidden min-[500px]:h-[180px]'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='flex items-center gap-2 will-change-transform min-[500px]:gap-3 md:gap-4 lg:gap-6'
              style={{
                animation: `scroll-${direction} ${speed}s linear infinite`,
                width: 'max-content',
                transform: 'translateZ(0)'
              }}
            >
              {testimonials.map((testimonial, index) => {
                // Auto-detect if this specific testimonial contains Arabic
                const isCardRTL = isArabic(testimonial.text);

                return (
                  <div
                    key={`row${rowIndex}-${testimonial.id}-${index}`}
                    className={cn(
                      'bg-background/40 flex flex-shrink-0 flex-col justify-between rounded-xl border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
                      // Responsive sizing with fixed heights
                      'h-[170px] max-h-[170px] min-h-[170px] w-[240px] p-3',
                      'min-[500px]:h-[180px] min-[500px]:max-h-[180px] min-[500px]:min-h-[180px] min-[500px]:w-[260px] min-[500px]:p-4',
                      'md:w-[300px] md:p-5',
                      'lg:w-[340px] lg:p-6'
                    )}
                    style={{
                      direction: isCardRTL ? 'rtl' : 'ltr',
                      unicodeBidi: 'plaintext'
                    }}
                  >
                    {/* Testimonial Text */}
                    <p
                      className={cn(
                        'mb-2 w-full flex-1 overflow-hidden leading-relaxed break-words text-white md:mb-3',
                        'text-sm md:text-base',
                        'line-clamp-5 md:line-clamp-6',
                        isCardRTL ? 'text-right' : 'text-left'
                      )}
                      style={{ unicodeBidi: 'plaintext' }}
                    >
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* User Info */}
                    <div
                      className={cn(
                        'flex w-full flex-shrink-0 items-center gap-3',
                        isCardRTL
                          ? 'flex-row justify-end'
                          : 'flex-row justify-start'
                      )}
                    >
                      {/* Avatar */}
                      <div className='relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-white/10'>
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.username}
                          fill
                          className='object-cover'
                        />
                      </div>

                      {/* Username */}
                      <div
                        className={cn(
                          'flex-1 overflow-hidden',
                          isCardRTL ? 'text-right' : 'text-left'
                        )}
                      >
                        <p className='truncate text-xs font-semibold text-white md:text-sm'>
                          {testimonial.username}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className='relative w-full overflow-x-clip py-20 lg:py-32'
      style={{ contain: 'layout paint' }}
    >
      {/* Self-contained wrapper - prevents page overflow */}
      <div className='relative mx-auto w-full max-w-7xl overflow-hidden px-4'>
        {/* Section Title */}
        <div className='mb-12 text-center'>
          <h2
            className={cn(
              'mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl',
              isRTL ? 'pb-2 leading-[1.5]' : 'leading-normal'
            )}
          >
            <GradientText
              colors={['#6366f1', '#8b5cf6', '#6366f1', '#8b5cf6', '#6366f1']}
              animationSpeed={3}
              showBorder={false}
              className='!m-0 !max-w-full !cursor-default !font-bold !backdrop-blur-none'
            >
              {t('title')}
            </GradientText>
          </h2>
          <p
            className='text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl'
            style={{
              direction: isRTL ? 'rtl' : 'ltr',
              unicodeBidi: 'plaintext'
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* 3-Row Testimonials Container */}
        <div className='relative w-full overflow-hidden'>
          <div className='relative w-full overflow-x-hidden'>
            {/* Row 1 - Scrolls left to right (or right to left in RTL) */}
            {renderRow(row1Duplicated, isRTL ? 'rtl' : 'ltr', 50, 1)}

            {/* Row 2 - Scrolls in opposite direction (slower) */}
            {renderRow(row2Duplicated, isRTL ? 'ltr' : 'rtl', 70, 2)}

            {/* Row 3 - Scrolls same as Row 1 (faster) */}
            {renderRow(row3Duplicated, isRTL ? 'rtl' : 'ltr', 40, 3)}
          </div>
        </div>
      </div>

      {/* CSS Keyframe Animations */}
      <style jsx global>{`
        @keyframes scroll-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-rtl {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
