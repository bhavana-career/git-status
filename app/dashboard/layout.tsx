import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | HealthGuard AI',
  description: 'Upload your medical PDF reports, analyze biomarker values, track historical health metrics, and consult with the report-aware AI assistant.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col font-sans antialiased">
      {children}
    </div>
  );
}
