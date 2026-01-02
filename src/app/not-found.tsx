'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Translations
const translations = {
  en: {
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or has been moved.",
    goBack: 'Go Back',
    backToHome: 'Back to Home'
  },
  ar: {
    title: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    goBack: 'رجوع',
    backToHome: 'العودة للرئيسية'
  }
};

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/ar') ? 'ar' : 'en';
  const isRTL = locale === 'ar';
  const t = translations[locale];

  useEffect(() => {
    setMounted(true);

    // Detect theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const dark =
      storedTheme === 'dark' ||
      ((!storedTheme || storedTheme === 'system') && systemDark);
    setIsDark(dark);

    // Listen for system theme changes
    const darkMq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkChange = (e: MediaQueryListEvent) => {
      const currentStored = localStorage.getItem('theme');
      if (!currentStored || currentStored === 'system') {
        setIsDark(e.matches);
      }
    };
    darkMq.addEventListener('change', handleDarkChange);

    // Reduced motion preference
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionMq.matches);
    const handleMotionChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    motionMq.addEventListener('change', handleMotionChange);

    return () => {
      darkMq.removeEventListener('change', handleDarkChange);
      motionMq.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const handleGoBack = () => router.back();
  const handleGoHome = () => router.push(locale === 'ar' ? '/ar' : '/');

  // Arrow icon based on direction
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  // Theme colors
  const colors = {
    bg: isDark ? '#0a0a0a' : '#ffffff',
    text: isDark ? '#ffffff' : '#0a0a0a',
    muted: isDark ? '#71717a' : '#71717a',
    border: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    accent: isDark ? '#18181b' : '#f4f4f5',
    glow: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'
  };

  return (
    <div
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden p-4',
        mounted && !prefersReducedMotion && 'animate-in fade-in duration-700',
        mounted && isDark ? 'dark' : ''
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: mounted ? colors.bg : undefined
      }}
    >
      {/* Subtle gradient background */}
      {mounted && (
        <div
          className='pointer-events-none absolute inset-0'
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.1), transparent)'
              : 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.08), transparent)'
          }}
        />
      )}

      <div className='relative z-10 w-full max-w-lg'>
        <div className='text-center'>
          {/* Decorative icon */}
          <div
            className='mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl'
            style={{
              backgroundColor: mounted ? colors.accent : undefined,
              border: mounted ? `1px solid ${colors.border}` : undefined
            }}
          >
            <Sparkles
              className='h-10 w-10'
              strokeWidth={1.5}
              style={{ color: mounted ? colors.muted : undefined }}
            />
          </div>

          {/* 404 Number */}
          <div
            className='mb-4 text-8xl font-bold tracking-tighter sm:text-9xl'
            style={{
              color: mounted ? colors.text : undefined,
              opacity: mounted ? 0.1 : undefined
            }}
          >
            404
          </div>

          {/* Title */}
          <h1
            className='-mt-12 mb-4 text-2xl font-semibold tracking-tight sm:text-3xl'
            style={{ color: mounted ? colors.text : undefined }}
          >
            {t.title}
          </h1>

          {/* Description */}
          <p
            className='mx-auto mb-10 max-w-sm text-base leading-relaxed sm:text-lg'
            style={{ color: mounted ? colors.muted : undefined }}
          >
            {t.description}
          </p>

          {/* Action Buttons */}
          <div
            className={cn(
              'flex flex-col gap-3 sm:flex-row sm:justify-center',
              isRTL && 'sm:flex-row-reverse'
            )}
          >
            <Button
              onClick={handleGoHome}
              variant='default'
              size='lg'
              className='w-full sm:w-auto'
              style={{
                backgroundColor: mounted ? colors.text : undefined,
                color: mounted ? colors.bg : undefined
              }}
            >
              <Home className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              {t.backToHome}
            </Button>
            <Button
              onClick={handleGoBack}
              variant='outline'
              size='lg'
              className='w-full sm:w-auto'
              style={{
                borderColor: mounted ? colors.border : undefined,
                color: mounted ? colors.text : undefined,
                backgroundColor: 'transparent'
              }}
            >
              <BackArrow className={cn('h-4 w-4', isRTL ? 'ml-2' : 'mr-2')} />
              {t.goBack}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
