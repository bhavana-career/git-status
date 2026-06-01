import type { Metadata } from 'next';
import Script from 'next/script';

import { themeScript } from '@/lib/theme';

import './globals.css';

export const metadata: Metadata = {
  title: 'HealthGuard AI - AI-Powered Medical Report Analyzer',
  description:
    'Secure, session-only AI health assistant that simplifies medical reports, visualizes biomarker trends, and empowers preventive health decisions aligned with UN SDG Goal 3.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-white text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
