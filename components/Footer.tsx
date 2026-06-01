'use client';

import React from 'react';
import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <HeartPulse className="h-4.5 w-4.5" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
                HealthGuard <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </span>
            </div>
            <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
              Empowering global health literacy by bringing clinical insights and data accessibility to everyday consumers. Supporting UN SDG 3.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Navigation</h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a href="#features" className="transition-colors hover:text-emerald-400">Features</a>
              </li>
              <li>
                <a href="#sdg3" className="transition-colors hover:text-emerald-400">SDG 3 Impact</a>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-emerald-400">Dashboard Console</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Regulatory & Disclaimer</h4>
            <p className="text-xs leading-relaxed text-zinc-500">
              HealthGuard AI is an AI-powered diagnostic helper for educational and demonstration purposes. It does not store medical records and is not a replacement for professional primary care, medical diagnosis, or treatment.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-xs text-zinc-500 dark:border-zinc-900 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} HealthGuard AI. Devpost Hackathon Submission.</p>
          <div className="flex gap-4">
            <span className="transition-colors hover:text-zinc-400">SDG 3 Certified Goals</span>
            <span>&bull;</span>
            <span className="transition-colors hover:text-zinc-400">Session-Only Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
