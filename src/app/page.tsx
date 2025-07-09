// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  // TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
  // const { userId } = await auth();

  // if (!userId) {
  //   return redirect('/auth/sign-in');
  // } else {
  //   redirect('/dashboard/overview');
  // }

  // Temporarily redirect all users to dashboard without authentication
  redirect('en/dashboard/overview');
}
