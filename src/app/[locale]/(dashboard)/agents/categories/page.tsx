'use client';

import Link from 'next/link';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { aiAgentsCategories } from '@/constants/data';
import { Icons } from '@/components/icons';
import PageContainer from '@/components/layout/page-container';
import { CategoriesPageSkeleton } from '@/components/layout/categories-skeleton';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading time (similar to sidebar categories loading)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2 seconds loading time (same as sidebar categories)

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <CategoriesPageSkeleton categoriesCount={aiAgentsCategories.length} />
    );
  }
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Agent Categories'
            description='Explore our wide range of AI Agent categories to find exactly what you need.'
          />
          <Link
            href='/agents/categories/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <IconPlus className='mr-2 h-4 w-4' /> Request New Category
          </Link>
        </div>

        {/* Scrollable Container like AI Tools */}
        <div className='relative flex flex-1'>
          <div className='absolute inset-0 flex overflow-hidden rounded-lg border'>
            <ScrollArea className='h-full w-full'>
              <div className='p-4'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                  {aiAgentsCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/agents/${category.name}`}
                      className='group transition-all duration-200 hover:scale-[1.02]'
                    >
                      <Card className='hover:border-primary/50 from-primary/5 to-card @container/card h-full border bg-gradient-to-t shadow-xs transition-all duration-200 group-hover:shadow-lg hover:shadow-lg'>
                        <CardHeader className='pb-4'>
                          <div className='mb-2 flex items-center gap-3'>
                            <div className='bg-primary/10 group-hover:bg-primary/20 rounded-lg p-2 transition-all duration-200'>
                              <Icons.dashboard className='text-primary h-6 w-6 transition-transform duration-200 group-hover:scale-110' />
                            </div>
                            <Badge
                              variant='secondary'
                              className='group-hover:bg-primary/10 text-xs transition-colors duration-200'
                            >
                              {category.name}
                            </Badge>
                          </div>
                          <CardTitle className='group-hover:text-primary text-lg font-semibold capitalize transition-colors duration-200 @[250px]/card:text-xl'>
                            {category.name.charAt(0).toUpperCase() +
                              category.name.slice(1).replace('-', ' ')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className='text-sm leading-relaxed'>
                            {category.description}
                          </CardDescription>
                          <div className='text-muted-foreground mt-4 flex items-center text-xs'>
                            <span>Explore agents →</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Stats Section inside scrollable area */}
                <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
                  <Card className='from-primary/5 to-card @container/card bg-gradient-to-t shadow-xs'>
                    <CardHeader className='text-center'>
                      <CardTitle className='text-primary text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        {aiAgentsCategories.length}
                      </CardTitle>
                      <CardDescription>Total Categories</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className='from-primary/5 to-card @container/card bg-gradient-to-t shadow-xs'>
                    <CardHeader className='text-center'>
                      <CardTitle className='text-primary text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        200+
                      </CardTitle>
                      <CardDescription>Available Agents</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className='from-primary/5 to-card @container/card bg-gradient-to-t shadow-xs'>
                    <CardHeader className='text-center'>
                      <CardTitle className='text-primary text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        24/7
                      </CardTitle>
                      <CardDescription>Support Available</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
