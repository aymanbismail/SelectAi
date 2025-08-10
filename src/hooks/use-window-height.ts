'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to track window height changes
 * Returns the current window height in pixels
 * Updates on window resize events
 */
export function useWindowHeight() {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    // Set initial height
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}
