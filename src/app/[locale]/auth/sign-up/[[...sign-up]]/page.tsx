'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { signup, loading, error, clearError, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      window.location.href = `/${locale}/home`;
    }
  }, [user, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) return;

    try {
      clearError(); // Clear any previous errors before submitting
      await signup(name.trim(), email.trim(), password);
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  if (user) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent'></div>
          <p className='text-muted-foreground'>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex min-h-screen flex-col', isRTL && 'font-arabic')}>
      {/* Main Content */}
      <main className='flex flex-1 items-center justify-center px-6 py-8'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo, Site Name + Switchers (order reverses for Arabic vs English) */}
          <div
            className={cn(
              'flex w-full flex-row items-center gap-3',
              isRTL ? 'justify-end' : 'justify-start'
            )}
          >
            {isRTL ? (
              <>
                {/* Arabic: site name + logo first, then spacer, then switchers */}
                <span className={cn('text-2xl font-semibold', 'text-right')}>
                  SelectAi
                </span>
                <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg'>
                  <Icons.logo className='text-primary h-6 w-6' />
                </div>
                <LanguageSwitcher />
                <ModeToggle />
              </>
            ) : (
              <>
                {/* English: switchers first, then spacer, then site name + logo */}
                <LanguageSwitcher />
                <ModeToggle />
                <span className={cn('text-2xl font-semibold', 'text-left')}>
                  SelectAi
                </span>
                <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg'>
                  <Icons.logo className='text-primary h-6 w-6' />
                </div>
              </>
            )}
          </div>

          {/* Page Title and Description */}
          <div className={cn('space-y-2', isRTL && 'text-right')}>
            <h1 className='text-3xl font-bold tracking-tight'>
              {locale === 'ar' ? 'إنشاء حساب' : 'Sign up'}
            </h1>
            <p className='text-muted-foreground text-base'>
              {locale === 'ar'
                ? 'أنشئ حساباً جديداً للمتابعة'
                : 'Create a new account to continue'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <FloatingInput
              type='text'
              label={locale === 'ar' ? 'الاسم' : 'Name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              isRTL={isRTL}
              disabled={loading}
              className='text-base'
            />

            <FloatingInput
              type='email'
              label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isRTL={isRTL}
              disabled={loading}
              className='text-base'
            />

            <FloatingInput
              type='password'
              label={locale === 'ar' ? 'كلمة المرور' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isRTL={isRTL}
              disabled={loading}
              className='text-base'
            />

            {/* Submit Button */}
            <Button
              type='submit'
              className='h-12 w-full text-base'
              disabled={
                loading || !name.trim() || !email.trim() || !password.trim()
              }
            >
              {loading ? (
                <div className='flex items-center gap-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></div>
                  <span>
                    {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                  </span>
                </div>
              ) : locale === 'ar' ? (
                'إنشاء حساب'
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className={cn('text-center text-base', isRTL && 'text-right')}>
            <span className='text-muted-foreground'>
              {locale === 'ar'
                ? 'لديك حساب بالفعل؟ '
                : 'Already have an account? '}
            </span>
            <Link
              href={`/${locale}/auth/sign-in`}
              className='text-primary font-medium hover:underline'
            >
              {locale === 'ar' ? 'سجل الدخول' : 'Sign in'}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={cn(
          'bg-background/50 border-t p-6 backdrop-blur-sm',
          isRTL && 'text-right'
        )}
      >
        <div
          className={cn(
            'text-muted-foreground flex items-center justify-center gap-6 text-sm'
            // Always center for both LTR and RTL
          )}
        >
          <span>© SelectAi</span>
          <Link href='#' className='hover:text-foreground transition-colors'>
            {locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
          </Link>
          <Link href='#' className='hover:text-foreground transition-colors'>
            {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
          <Link href='#' className='hover:text-foreground transition-colors'>
            {locale === 'ar' ? 'سياسة الإرسال' : 'Sending Policy'}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
