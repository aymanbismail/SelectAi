'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { GoogleButton } from '@/components/auth/google-button';

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

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign-up with your authentication provider
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) return;

    try {
      clearError();
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
        <div className='w-full max-w-[400px] space-y-8'>
          {/* Logo, Site Name + Switchers */}
          <div
            className={cn(
              'flex w-full flex-row items-center justify-between gap-3'
            )}
          >
            {isRTL ? (
              <>
                {/* For Arabic (RTL): Logo + Site Name on the right */}
                <Link
                  href={`/${locale}/home`}
                  className='flex items-center gap-3 transition-opacity hover:opacity-80'
                >
                  <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg'>
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
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
                      }}
                    >
                      <Sparkles className='h-6 w-6 text-current' />
                    </motion.div>
                  </div>
                  <span className='text-2xl font-semibold'>SelectAi</span>
                </Link>
                {/* Switchers on the left */}
                <div className='flex items-center gap-2'>
                  <ModeToggle />
                  <LanguageSwitcher />
                </div>
              </>
            ) : (
              <>
                {/* For English (LTR): Logo + Site Name on the left */}
                <Link
                  href={`/${locale}/home`}
                  className='flex items-center gap-3 transition-opacity hover:opacity-80'
                >
                  <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg'>
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
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
                      }}
                    >
                      <Sparkles className='h-6 w-6 text-current' />
                    </motion.div>
                  </div>
                  <span className='text-2xl font-semibold'>SelectAi</span>
                </Link>
                {/* Switchers on the right */}
                <div className='flex items-center gap-2'>
                  <LanguageSwitcher />
                  <ModeToggle />
                </div>
              </>
            )}
          </div>

          {/* Page Title and Description */}
          <div className={cn('space-y-2', isRTL && 'text-right')}>
            <h1 className='text-3xl font-bold tracking-tight'>
              {isRTL ? 'إنشاء حساب' : 'Sign up'}
            </h1>
            <p className='text-muted-foreground text-base'>
              {isRTL
                ? 'أنشئ حساباً جديداً للمتابعة'
                : 'Create a new account to continue'}
            </p>
          </div>

          {/* Google Sign-up Button */}
          <GoogleButton
            variant='signup'
            isRTL={isRTL}
            onClick={handleGoogleSignUp}
            disabled={loading}
          />

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-neutral-300 dark:border-neutral-700/50' />
            </div>
            <div className='relative flex justify-center'>
              <span className='text-muted-foreground rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium tracking-wider uppercase dark:bg-neutral-800/60'>
                {isRTL ? 'أو' : 'or'}
              </span>
            </div>
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
              label={isRTL ? 'الاسم' : 'Name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              isRTL={isRTL}
              disabled={loading}
              className='h-12 text-base'
            />

            <FloatingInput
              type='email'
              label={isRTL ? 'البريد الإلكتروني' : 'Email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isRTL={isRTL}
              disabled={loading}
              className='h-12 text-base'
            />

            <FloatingInput
              type='password'
              label={isRTL ? 'كلمة المرور' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isRTL={isRTL}
              disabled={loading}
              className='h-12 text-base'
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
                  <span>{isRTL ? 'جاري التحميل...' : 'Loading...'}</span>
                </div>
              ) : isRTL ? (
                'إنشاء حساب'
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className={cn('text-center text-base', isRTL && 'text-right')}>
            <span className='text-muted-foreground'>
              {isRTL ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
            </span>
            <Link
              href={`/${locale}/auth/sign-in`}
              className='text-primary font-medium hover:underline'
            >
              {isRTL ? 'سجل الدخول' : 'Sign in'}
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
        <div className='text-muted-foreground flex items-center justify-center gap-6 text-sm'>
          <span>© SelectAi</span>
          <Link href='#' className='hover:text-foreground transition-colors'>
            {isRTL ? 'شروط الخدمة' : 'Terms of Service'}
          </Link>
          <Link href='#' className='hover:text-foreground transition-colors'>
            {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
          <Link href='#' className='hover:text-foreground transition-colors'>
            {isRTL ? 'سياسة الإرسال' : 'Sending Policy'}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
