'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAppReady } from '@/contexts/app-ready-context';

export function InitialLoader() {
  const { isAppReady, isFirstVisit } = useAppReady();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect theme from localStorage or system preference (same logic as ThemeProvider)
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

  if (!isFirstVisit) return null;

  // Use inline styles to avoid flash; default to light before mount
  const bgColor = mounted && isDark ? '#000000' : '#ffffff';
  const iconColor = mounted && isDark ? '#ffffff' : '#000000';

  return (
    <AnimatePresence mode='wait'>
      {!isAppReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='fixed inset-0 z-9999 flex items-center justify-center'
          style={{ backgroundColor: bgColor }}
          aria-label='Loading'
          role='status'
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { rotate: [0, 360], scale: [1, 1.05, 1] }
            }
            transition={
              prefersReducedMotion
                ? {}
                : {
                    rotate: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }
            }
          >
            <Sparkles
              className='h-16 w-16'
              style={{ color: iconColor }}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
