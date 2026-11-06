// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { routing } from '@/i18n/routing';

export default async function Page() {
  // The i18n middleware normally handles `/`; this is the fallback so the
  // root URL always resolves to the default locale.
  redirect(`/${routing.defaultLocale}`);
}
