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
// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Demo user for testing without authentication
const demoUser = {
  fullName: 'Demo User',
  emailAddresses: [{ emailAddress: 'demo@example.com' }],
  imageUrl: ''
};

export function UserNav() {
  // TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
  // const { user } = useUser();
  const router = useRouter();

  // Using demo user instead of Clerk user
  const user = demoUser;

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
              <p className='text-sm leading-none font-medium'>
                {user.fullName}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {/* TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION */}
            {/* <SignOutButton redirectUrl='/auth/sign-in' /> */}
            <span className='text-muted-foreground'>Sign Out (Disabled)</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
