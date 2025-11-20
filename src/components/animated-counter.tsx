'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  className,
  duration = 2000
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extract numeric value and suffix (like +, %, etc.)
  const numericMatch = value.match(/(\d+)/);
  const targetValue = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = Date.now();
          const endTime = startTime + duration;

          const updateCounter = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * targetValue);

            setCount(currentCount);

            if (now < endTime) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration, hasAnimated]);

  return (
    <div ref={elementRef} className={className}>
      {count}
      {suffix}
    </div>
  );
}
