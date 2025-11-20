// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  redirect('en');
}
