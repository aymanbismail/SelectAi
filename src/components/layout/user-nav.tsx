'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function UserNav() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('auth');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Error is handled by the AuthContext
    }
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <UserAvatarProfile user={user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56'
          align='end'
          sideOffset={10}
          forceMount
        >
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>{user.name}</p>
              <p className='text-muted-foreground text-xs leading-none'>
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push(`/${locale}/profile`)}>
              <Icons.user className='mr-2 h-4 w-4' />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/${locale}/settings`)}
            >
              <Icons.settings className='mr-2 h-4 w-4' />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={loading}>
            <Icons.login className='mr-2 h-4 w-4' />
            {loading ? 'Signing out...' : t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If not logged in, show sign in/sign up buttons
  return (
    <div className='flex items-center gap-2'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='sm' asChild>
            <Link
              href={`/${locale}/auth/sign-in`}
              className='flex items-center gap-2'
            >
              <Icons.login className='h-4 w-4' />
              <span className='hidden min-[600px]:inline'>{t('signIn')}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          align='center'
          sideOffset={4}
          className='min-[600px]:hidden'
        >
          <p>{t('signIn')}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size='sm' asChild>
            <Link
              href={`/${locale}/auth/sign-up`}
              className='flex items-center gap-2'
            >
              <Icons.userPen className='h-4 w-4' />
              <span className='hidden min-[600px]:inline'>{t('signUp')}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          align='center'
          sideOffset={4}
          className='min-[600px]:hidden'
        >
          <p>{t('signUp')}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
