'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <Card>
          <CardContent className='space-y-6 p-8 text-center'>
            <div className='text-muted-foreground text-6xl font-bold'>404</div>

            <div className='space-y-2'>
              <h2 className='text-2xl font-bold'>Page Not Found</h2>
              <p className='text-muted-foreground'>
                Sorry, the page you are looking for doesn&apos;t exist.
              </p>
            </div>

            <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
              <Button
                onClick={() => router.back()}
                variant='default'
                className='w-auto'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Go Back
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant='outline'
                className='w-auto'
              >
                <Home className='mr-2 h-4 w-4' />
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
