'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { ModeToggle } from '@/components/layout/ThemeToggle/theme-toggle';
import { Sparkles, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  const locale = useLocale();
  const isRTL = locale === 'ar';
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      return;
    }
    // Placeholder - in real implementation, validate token with API
    // For now, just check if token exists
    setTokenValid(true);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) return;

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError(
        isRTL
          ? 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
          : 'Password must be at least 8 characters'
      );
      return;
    }

    setLoading(true);
    setError(null);

    // Placeholder for password reset - will be implemented later
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO: Implement actual password reset API call with token
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

  // Invalid token state
  if (tokenValid === false) {
    return (
      <div className={cn('flex min-h-screen flex-col', isRTL && 'font-arabic')}>
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
                  <div className='flex items-center gap-2'>
                    <ModeToggle />
                    <LanguageSwitcher />
                  </div>
                </>
              ) : (
                <>
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
                  <div className='flex items-center gap-2'>
                    <LanguageSwitcher />
                    <ModeToggle />
                  </div>
                </>
              )}
            </div>

            {/* Invalid Token Message */}
            <div className='space-y-6'>
              <div className={cn('space-y-2', isRTL && 'text-right')}>
                <div className='mb-4 flex items-center justify-center'>
                  <div className='rounded-full bg-red-100 p-3 dark:bg-red-900/30'>
                    <AlertCircle className='h-8 w-8 text-red-600 dark:text-red-400' />
                  </div>
                </div>
                <h1 className='text-center text-3xl font-bold tracking-tight'>
                  {isRTL ? 'رابط غير صالح' : 'Invalid Link'}
                </h1>
                <p className='text-muted-foreground text-center text-base'>
                  {isRTL
                    ? 'هذا الرابط غير صالح أو منتهي الصلاحية. يرجى طلب رابط جديد.'
                    : 'This link is invalid or has expired. Please request a new password reset link.'}
                </p>
              </div>

              <Button asChild className='h-12 w-full text-base'>
                <Link href={`/${locale}/auth/forgot-password`}>
                  {isRTL ? 'طلب رابط جديد' : 'Request New Link'}
                </Link>
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
  }

  // Loading token validation state
  if (tokenValid === null) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent'></div>
          <p className='text-muted-foreground'>
            {isRTL ? 'جاري التحقق...' : 'Verifying...'}
          </p>
        </div>
      </div>
    );
  }

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
                <div className='flex items-center gap-2'>
                  <ModeToggle />
                  <LanguageSwitcher />
                </div>
              </>
            ) : (
              <>
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
                  {isRTL ? 'تم إعادة تعيين كلمة المرور!' : 'Password Reset!'}
                </h1>
                <p className='text-muted-foreground text-center text-base'>
                  {isRTL
                    ? 'تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.'
                    : 'Your password has been successfully changed. You can now sign in with your new password.'}
                </p>
              </div>

              <Button asChild className='h-12 w-full text-base'>
                <Link href={`/${locale}/auth/sign-in`}>
                  {isRTL ? 'تسجيل الدخول' : 'Sign in'}
                </Link>
              </Button>
            </div>
          ) : (
            // Form State
            <>
              {/* Page Title and Description */}
              <div className={cn('space-y-2', isRTL && 'text-right')}>
                <h1 className='text-3xl font-bold tracking-tight'>
                  {isRTL ? 'إعادة تعيين كلمة المرور' : 'Reset Your Password'}
                </h1>
                <p className='text-muted-foreground text-base'>
                  {isRTL
                    ? 'أدخل كلمة المرور الجديدة أدناه.'
                    : 'Enter your new password below.'}
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
                  type='password'
                  label={isRTL ? 'كلمة المرور الجديدة' : 'New Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  isRTL={isRTL}
                  disabled={loading}
                  className='h-12 text-base'
                />

                <FloatingInput
                  type='password'
                  label={isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    loading || !password.trim() || !confirmPassword.trim()
                  }
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></div>
                      <span>
                        {isRTL ? 'جاري إعادة التعيين...' : 'Resetting...'}
                      </span>
                    </div>
                  ) : isRTL ? (
                    'إعادة تعيين كلمة المرور'
                  ) : (
                    'Reset Password'
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

export default ResetPasswordPage;
