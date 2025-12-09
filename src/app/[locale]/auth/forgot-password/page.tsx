'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);
    setError(null);

    // Placeholder for password reset - will be implemented later
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Implement actual password reset API call
      setSuccess(true);
    } catch (err) {
      setError(
        isRTL
          ? 'حدث خطأ. حاول مرة أخرى.'
          : 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex min-h-screen flex-col', isRTL && 'font-arabic')}>
      {/* Main Content */}
      <main className='flex flex-1 items-center justify-center px-6 py-8'>
        <div className='w-full max-w-[400px] space-y-8'>
          {/* Logo and Site Name + Switchers */}
          <div
            className={cn(
              'flex w-full flex-row items-center justify-between gap-3'
            )}
          >
            {isRTL ? (
              <>
                {/* For Arabic (RTL): Logo + Site Name on the right */}
                <Link
                  href={`/${locale}`}
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
                  href={`/${locale}`}
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

          {success ? (
            // Success State
            <div className='space-y-6'>
              <div className={cn('space-y-2', isRTL && 'text-right')}>
                <div className='mb-4 flex items-center justify-center'>
                  <div className='rounded-full bg-green-100 p-3 dark:bg-green-900/30'>
                    <CheckCircle2 className='h-8 w-8 text-green-600 dark:text-green-400' />
                  </div>
                </div>
                <h1 className='text-center text-3xl font-bold tracking-tight'>
                  {isRTL ? 'تم الإرسال!' : 'Check your email'}
                </h1>
                <p className='text-muted-foreground text-center text-base'>
                  {isRTL
                    ? `لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى ${email}`
                    : `We've sent a password reset link to ${email}`}
                </p>
              </div>

              <Button
                type='button'
                variant='outline'
                className='h-12 w-full text-base'
                onClick={() => setSuccess(false)}
              >
                {isRTL ? 'إرسال مرة أخرى' : 'Send again'}
              </Button>

              {/* Back to Sign In */}
              <div className={cn('text-center', isRTL && 'text-right')}>
                <Link
                  href={`/${locale}/auth/sign-in`}
                  className='text-primary inline-flex items-center gap-2 text-base font-medium hover:underline'
                >
                  {isRTL ? (
                    <>
                      العودة لتسجيل الدخول
                      <ArrowLeft className='h-4 w-4' />
                    </>
                  ) : (
                    <>
                      <ArrowLeft className='h-4 w-4' />
                      Back to Sign in
                    </>
                  )}
                </Link>
              </div>
            </div>
          ) : (
            // Form State
            <>
              {/* Page Title and Description */}
              <div className={cn('space-y-2', isRTL && 'text-right')}>
                <h1 className='text-3xl font-bold tracking-tight'>
                  {isRTL ? 'نسيت كلمة المرور' : 'Forgot Password'}
                </h1>
                <p className='text-muted-foreground text-base'>
                  {isRTL
                    ? 'أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور.'
                    : 'Enter your email and we will send you instructions to reset your password.'}
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
                  type='email'
                  label={isRTL ? 'البريد الإلكتروني' : 'Email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isRTL={isRTL}
                  disabled={loading}
                  className='h-12 text-base'
                />

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='h-12 w-full text-base'
                  disabled={loading || !email.trim()}
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></div>
                      <span>{isRTL ? 'جاري الإرسال...' : 'Sending...'}</span>
                    </div>
                  ) : isRTL ? (
                    'إرسال رابط إعادة التعيين'
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>

              {/* Back to Sign In */}
              <div className={cn('text-center', isRTL && 'text-right')}>
                <Link
                  href={`/${locale}/auth/sign-in`}
                  className='text-primary inline-flex items-center gap-2 text-base font-medium hover:underline'
                >
                  {isRTL ? (
                    <>
                      العودة لتسجيل الدخول
                      <ArrowLeft className='h-4 w-4' />
                    </>
                  ) : (
                    <>
                      <ArrowLeft className='h-4 w-4' />
                      Back to Sign in
                    </>
                  )}
                </Link>
              </div>
            </>
          )}
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

export default ForgotPasswordPage;
