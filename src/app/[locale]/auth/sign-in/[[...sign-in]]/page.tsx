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

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'email' | 'password'>('email');

  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { login, loading, error, clearError, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      window.location.href = `/${locale}/home`;
    }
  }, [user, locale]);

  const handleEmailNext = () => {
    if (!email.trim()) return;
    clearError(); // Clear error when advancing to password step
    setStep('password');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 'email') {
      handleEmailNext();
      return;
    }

    if (!password.trim()) return;

    try {
      await login(email.trim(), password);
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  const handleBackToEmail = () => {
    clearError(); // Clear error when going back
    setStep('email');
    setPassword('');
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
          {/* Logo and Site Name + Switchers */}
          <div
            className={cn(
              'flex w-full flex-row items-center justify-between gap-3'
            )}
          >
            {isRTL ? (
              <>
                {/* For Arabic (RTL): Logo + Site Name on the right */}
                <div className='flex items-center gap-3'>
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
                </div>
                {/* Switchers on the left */}
                <div className='flex items-center gap-2'>
                  <ModeToggle />
                  <LanguageSwitcher />
                </div>
              </>
            ) : (
              <>
                {/* For English (LTR): Logo + Site Name on the left */}
                <div className='flex items-center gap-3'>
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
                </div>
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
              {locale === 'ar' ? 'سجل الدخول' : 'Sign in'}
            </h1>
            <p className='text-muted-foreground text-base'>
              {locale === 'ar'
                ? 'أدخل بريدك الإلكتروني للمتابعة'
                : 'Enter your email to continue'}
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
            {step === 'email' ? (
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
            ) : (
              <div className='space-y-4'>
                {/* Show email (read-only) */}
                <div className='bg-muted rounded-lg p-4'>
                  <div
                    className={cn(
                      'text-muted-foreground mb-1 text-sm',
                      isRTL && 'text-right'
                    )}
                  >
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </div>
                  <div className={cn('font-medium', isRTL && 'text-right')}>
                    {email}
                  </div>
                </div>

                {/* Password input */}
                <FloatingInput
                  type='password'
                  label={locale === 'ar' ? 'كلمة المرور' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  isRTL={isRTL}
                  disabled={loading}
                  autoFocus
                  className='text-base'
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type='submit'
              className='h-12 w-full text-base'
              disabled={
                loading ||
                (step === 'email' && !email.trim()) ||
                (step === 'password' && !password.trim())
              }
            >
              {loading ? (
                <div className='flex items-center gap-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></div>
                  <span>
                    {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                  </span>
                </div>
              ) : step === 'email' ? (
                locale === 'ar' ? (
                  'التالي'
                ) : (
                  'Continue'
                )
              ) : locale === 'ar' ? (
                'سجل الدخول'
              ) : (
                'Sign in'
              )}
            </Button>

            {/* Back Button for password step */}
            {step === 'password' && (
              <Button
                type='button'
                variant='ghost'
                className='h-12 w-full text-base'
                onClick={handleBackToEmail}
                disabled={loading}
              >
                {locale === 'ar' ? 'العودة' : 'Back'}
              </Button>
            )}
          </form>

          {/* Sign Up Link */}
          <div className={cn('text-center text-base', isRTL && 'text-right')}>
            <span className='text-muted-foreground'>
              {locale === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
            </span>
            <Link
              href={`/${locale}/auth/sign-up`}
              className='text-primary font-medium hover:underline'
            >
              {locale === 'ar' ? 'إنشاء حساب' : 'Sign up'}
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

export default SignInPage;
