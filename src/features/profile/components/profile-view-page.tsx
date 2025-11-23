// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { UserProfile } from '@clerk/nextjs';

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col p-4 pt-16'>
      {/* TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION */}
      {/* <UserProfile /> */}
      <div className='py-8 text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Profile Management Disabled</h1>
        <p className='text-muted-foreground mb-4'>
          Profile management is being migrated to Laravel backend.
        </p>
        <div className='bg-muted mx-auto max-w-md rounded-lg p-6'>
          <h2 className='mb-2 text-lg font-semibold'>Demo User Profile</h2>
          <p className='text-muted-foreground mb-1 text-sm'>Name: Demo User</p>
          <p className='text-muted-foreground text-sm'>
            Email: demo@example.com
          </p>
        </div>
      </div>
    </div>
  );
}
