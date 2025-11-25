'use client';

import { memo, useCallback, useMemo } from 'react';
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

const FEMALE_AVATAR_IDS = [79, 63, 83, 86, 66, 61];
const MALE_AVATAR_IDS = [42, 37, 4, 5, 1, 23];

const SECTION_STYLE = Object.freeze({ contain: 'layout paint' });
const ROW_WRAPPER_STYLE = Object.freeze({
  contain: 'layout style paint',
  maxWidth: '100%'
});
const MOBILE_COLUMN_WRAPPER_STYLE = Object.freeze({ contain: 'layout paint' });
const TRACK_BASE_STYLE = Object.freeze({
  width: 'max-content',
  transform: 'translateZ(0)'
});

const EDGE_FADE_STYLE_LEFT = Object.freeze({
  background:
    'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
  maskImage: 'linear-gradient(to right, black 0%, black 50%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to right, black 0%, black 50%, transparent 100%)'
});

const EDGE_FADE_STYLE_RIGHT = Object.freeze({
  background:
    'linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
  maskImage: 'linear-gradient(to left, black 0%, black 50%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to left, black 0%, black 50%, transparent 100%)'
});

const MOBILE_BLUR_STYLE_TOP = Object.freeze({
  background:
    'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
  maskImage:
    'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)'
});

const MOBILE_BLUR_STYLE_BOTTOM = Object.freeze({
  background:
    'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
  maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to top, black 0%, black 40%, transparent 100%)'
});

const rowCardDimensions = cn(
  'flex-shrink-0',
  'h-[170px] max-h-[170px] min-h-[170px] w-[240px] p-3',
  'min-[500px]:h-[180px] min-[500px]:max-h-[180px] min-[500px]:min-h-[180px] min-[500px]:w-[260px] min-[500px]:p-4',
  'md:w-[300px] md:p-5',
  'lg:w-[340px] lg:p-6'
);

const mobileCardDimensions = cn('w-full p-4', 'min-[500px]:p-5', 'sm:p-6');

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  className
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const isCardRTL = isArabic(testimonial.text);

  return (
    <div
      className={cn(
        'bg-background/40 dark:bg-background/40 border-border/50 hover:border-border flex flex-col justify-between rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:border-white/10 dark:hover:border-white/30 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
        className
      )}
      style={{
        direction: isCardRTL ? 'rtl' : 'ltr',
        unicodeBidi: 'plaintext'
      }}
      data-testimonial-card=''
    >
      <p
        className={cn(
          'text-foreground mb-2 w-full flex-1 overflow-hidden leading-relaxed break-words md:mb-3 dark:text-white',
          'text-sm md:text-base',
          'line-clamp-5 md:line-clamp-6',
          isCardRTL ? 'text-right' : 'text-left'
        )}
        style={{ unicodeBidi: 'plaintext' }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div
        className={cn(
          'flex w-full flex-shrink-0 items-center gap-3',
          isCardRTL ? 'flex-row justify-end' : 'flex-row justify-start'
        )}
      >
        <div className='border-border/50 relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border dark:border-white/10'>
          <Image
            src={testimonial.avatar}
            alt={testimonial.username}
            fill
            sizes='40px'
            className='object-cover'
          />
        </div>

        <div
          className={cn(
            'flex-1 overflow-hidden',
            isCardRTL ? 'text-right' : 'text-left'
          )}
        >
          <p className='text-foreground truncate text-xs font-semibold md:text-sm dark:text-white'>
            {testimonial.username}
          </p>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Memoize translation-driven data so the rows never rebuild unless the locale copy changes.
  const testimonials: Testimonial[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const isFemale = i % 2 === 0;
      const avatarIndex = Math.floor(i / 2);
      const avatarId = isFemale
        ? FEMALE_AVATAR_IDS[avatarIndex]
        : MALE_AVATAR_IDS[avatarIndex];

      return {
        id: i + 1,
        text: t(`testimonial${i + 1}.text`),
        avatar: `https://avatar.iran.liara.run/public/${avatarId}`,
        username: t(`testimonial${i + 1}.username`)
      };
    });
  }, [t]);

  const row1 = useMemo(() => testimonials.slice(0, 4), [testimonials]);
  const row2 = useMemo(() => testimonials.slice(4, 8), [testimonials]);
  const row3 = useMemo(() => testimonials.slice(8, 12), [testimonials]);

  // Duplicate rows just once; arrays stay referentially stable between renders.
  const row1Duplicated = useMemo(() => [...row1, ...row1, ...row1], [row1]);
  const row2Duplicated = useMemo(() => [...row2, ...row2, ...row2], [row2]);
  const row3Duplicated = useMemo(() => [...row3, ...row3, ...row3], [row3]);

  const buildTrackStyle = useCallback(
    (direction: 'ltr' | 'rtl', speed: number) => ({
      ...TRACK_BASE_STYLE,
      animation: `scroll-${direction} ${speed}s linear infinite`
    }),
    []
  );

  // Avoid re-creating the render helper every render; keeps animation containers stable.
  const renderRow = useCallback(
    (
      testimonialsRow: Testimonial[],
      direction: 'ltr' | 'rtl',
      speed: number,
      rowIndex: number
    ) => (
      <div
        className='relative isolate mb-3 w-full overflow-hidden last:mb-0 md:mb-4'
        style={ROW_WRAPPER_STYLE}
      >
        {/* Left Fade Gradient - Fully transparent with blur effect */}
        <div
          className='testimonial-edge-blur pointer-events-none absolute top-0 left-0 z-[1] h-full w-20 backdrop-blur-xl min-[500px]:w-24 md:w-40 lg:w-56'
          style={EDGE_FADE_STYLE_LEFT}
        />
        {/* Right Fade Gradient - Fully transparent with blur effect */}
        <div
          className='testimonial-edge-blur pointer-events-none absolute top-0 right-0 z-[1] h-full w-20 backdrop-blur-xl min-[500px]:w-24 md:w-40 lg:w-56'
          style={EDGE_FADE_STYLE_RIGHT}
        />{' '}
        {/* Scrolling Container */}
        <div className='testimonials-scroll group relative h-[170px] w-full overflow-hidden min-[500px]:h-[180px]'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className='testimonial-row-track relative z-[2] flex items-center gap-2 will-change-transform min-[500px]:gap-3 md:gap-4 lg:gap-6'
              style={buildTrackStyle(direction, speed)}
            >
              {testimonialsRow.map((testimonial, index) => (
                <TestimonialCard
                  key={`row${rowIndex}-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  className={rowCardDimensions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    [buildTrackStyle]
  );

  const mobileTestimonialsMarquee = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  return (
    <section
      className='relative flex h-screen w-full flex-col overflow-x-clip py-12 sm:py-20 md:flex md:h-auto md:flex-col lg:py-32'
      style={SECTION_STYLE}
    >
      {/* Self-contained wrapper - prevents page overflow */}
      <div className='relative mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden px-3 sm:px-4 md:flex md:flex-1 md:flex-col'>
        {/* Section Title */}
        <div className='mb-8 text-center sm:mb-12'>
          <h2
            className={cn(
              'mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl',
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
            className='text-muted-foreground mx-auto max-w-2xl px-2 text-base sm:px-0 sm:text-lg md:text-xl'
            style={{
              direction: isRTL ? 'rtl' : 'ltr',
              unicodeBidi: 'plaintext'
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Mobile Column Layout */}
        <div
          className='relative flex-1 overflow-hidden md:hidden'
          style={MOBILE_COLUMN_WRAPPER_STYLE}
        >
          <div
            className='mobile-testimonial-blur pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 backdrop-blur-2xl'
            style={MOBILE_BLUR_STYLE_TOP}
          />
          <div
            className='mobile-testimonial-blur pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 backdrop-blur-2xl'
            style={MOBILE_BLUR_STYLE_BOTTOM}
          />
          <div
            className='mobile-testimonials-marquee relative z-[2] flex flex-col gap-3 min-[500px]:gap-4'
            style={{
              animation: 'testimonials-mobile-up 45s linear infinite',
              transform: 'translateZ(0)'
            }}
          >
            {mobileTestimonialsMarquee.map((testimonial, idx) => (
              <TestimonialCard
                key={`mobile-${testimonial.id}-${Math.floor(
                  idx / testimonials.length
                )}-${idx % testimonials.length}`}
                testimonial={testimonial}
                className={mobileCardDimensions}
              />
            ))}
          </div>
        </div>

        {/* 3-Row Testimonials Container (Desktop & Tablet) */}
        <div className='relative hidden w-full overflow-visible md:block'>
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

        @keyframes testimonials-mobile-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .testimonial-edge-blur,
        .mobile-testimonial-blur {
          animation: testimonial-blur-pulse 4s ease-in-out infinite;
          opacity: 1;
        }

        @keyframes testimonial-blur-pulse {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }

        @media (min-width: 768px) {
          .mobile-testimonials-marquee {
            animation: none !important;
            transform: none !important;
          }

          section {
            height: auto !important;
          }

          .mobile-testimonial-blur {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
