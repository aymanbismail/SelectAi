import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: {
    imageUrl?: string;
    name?: string;
    email?: string;
    fullName?: string | null;
    emailAddresses?: Array<{ emailAddress: string }>;
  } | null;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  user
}: UserAvatarProfileProps) {
  // Support both new User type and legacy format
  const displayName = user?.name || user?.fullName || '';
  const displayEmail =
    user?.email || user?.emailAddresses?.[0]?.emailAddress || '';

  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={displayName} />
        <AvatarFallback className='rounded-lg'>
          {displayName?.slice(0, 2)?.toUpperCase() || 'CN'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
          <span className='truncate font-semibold'>{displayName}</span>
          <span className='truncate text-xs'>{displayEmail}</span>
        </div>
      )}
    </div>
  );
}
