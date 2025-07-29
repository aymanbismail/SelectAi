import type { Metadata } from 'next';
import '@/app/[locale]/globals.css';

export const metadata: Metadata = {
  title: 'Select AI',
  description: 'Find the best AI tools for your task'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
