import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function PageContainer({
  children,
  scrollable = true,
  className
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}) {
  const containerClasses = cn(
    'flex flex-1 p-4 md:px-6',
    'rtl:flex-row-reverse', // Handle RTL layout
    className
  );

  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-64px)]'>
          <div className={containerClasses}>{children}</div>
        </ScrollArea>
      ) : (
        <div className={containerClasses}>{children}</div>
      )}
    </>
  );
}
