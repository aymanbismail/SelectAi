'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroCTASection() {
  const t = useTranslations('heroCTA');

  return (
    <section className='relative w-full overflow-x-hidden py-20 lg:py-32'>
      {/* Container */}
      <div className='mx-auto max-w-7xl px-4'>
        {/* Hero Card with Purple Gradient */}
        <div
          className='relative mx-auto flex flex-col items-center gap-6 overflow-hidden rounded-[50px] p-12 text-center shadow-[rgba(31,38,135,0.5)_0px_8px_32px] backdrop-blur-[10px] transition-all duration-300 select-none sm:p-16'
          style={{
            background:
              'linear-gradient(135deg, rgb(124, 58, 237), rgba(24, 47, 255, 0.6))',
            backgroundSize: '200% 200%'
          }}
        >
          {/* Grain Texture Overlay - using ::before effect */}
          <div
            className='pointer-events-none absolute inset-0 z-[1] opacity-100 mix-blend-lighten brightness-[3]'
            style={{
              backgroundImage: 'url(/assets/grain.webp)',
              backgroundRepeat: 'repeat',
              backgroundSize: '500px 500px'
            }}
          />

          {/* Content */}
          <div className='relative z-10 flex flex-col items-center gap-6'>
            {/* Title */}
            <h2 className='text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl'>
              {t('title')}
            </h2>

            {/* Subtitle */}
            <p className='text-xl text-white/80 sm:text-2xl lg:text-3xl'>
              {t('subtitle')}
            </p>

            {/* CTA Button */}
            <Link href='/ai-tools'>
              <Button
                size='lg'
                className='rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#8b5cf6] shadow-xl transition-colors duration-300 hover:bg-white'
              >
                {t('button')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
