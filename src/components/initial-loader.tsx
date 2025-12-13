'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LOADER_STORAGE_KEY = 'select-ai-initial-load';

export function InitialLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    // Check if this is the first visit this session
    const hasLoaded = sessionStorage.getItem(LOADER_STORAGE_KEY);

    if (!hasLoaded) {
      setShouldRender(true);
      setIsVisible(true);

      // Mark as loaded
      sessionStorage.setItem(LOADER_STORAGE_KEY, 'true');

      // Minimum display time + app ready simulation
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Don't render anything if not first visit
  if (!shouldRender) return null;

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black'
          aria-label='Loading'
          role='status'
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }
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
              className='h-16 w-16 text-black dark:text-white'
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
