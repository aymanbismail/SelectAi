'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!loading && !user) {
      const redirectPath = redirectTo || `/${locale}/auth/sign-in`;
      router.push(redirectPath);
    }
  }, [user, loading, router, locale, redirectTo]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent'></div>
          <p className='text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

// Higher-order component version
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  redirectTo?: string
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute redirectTo={redirectTo}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
