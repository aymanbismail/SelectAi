import { Metadata } from 'next';
// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import SignUpViewPage from '@/features/auth/components/sign-up-view';

export const metadata: Metadata = {
  title: 'Authentication | Sign Up',
  description: 'Sign Up page for authentication.'
};

export default async function Page() {
  // TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
  // let stars = 3000; // Default value

  // try {
  //   const response = await fetch(
  //     'https://api.github.com/repos/kiranism/next-shadcn-dashboard-starter',
  //     {
  //       next: { revalidate: 86400 }
  //     }
  //   );

  //   if (response.ok) {
  //     const data = await response.json();
  //     stars = data.stargazers_count || stars; // Update stars if API response is valid
  //   }
  // } catch (error) {
  //   // Error fetching GitHub stars, using default value
  // }
  // return <SignUpViewPage stars={stars} />;

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>
          Authentication Temporarily Disabled
        </h1>
        <p className='text-muted-foreground mb-4'>
          Authentication is being migrated to Laravel backend.
        </p>
        <p className='text-muted-foreground text-sm'>
          You can access the dashboard directly without authentication.
        </p>
        <a
          href='/dashboard/overview'
          className='bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-block rounded-md px-4 py-2'
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
