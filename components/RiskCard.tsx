'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react';

import type { RiskItem } from '@/lib/health-types';

interface RiskCardProps {
  risks: RiskItem[];
}

export default function RiskCard({ risks }: RiskCardProps) {
  const getRiskTheme = (level: RiskItem['level']) => {
    switch (level) {
      case 'high':
        return {
          icon: AlertCircle,
          text: 'text-rose-500 dark:text-rose-400',
          badge: 'border-rose-500/20 bg-rose-500/15 text-rose-500 dark:text-rose-400',
          bg: 'bg-rose-500/5',
          border: 'border-rose-200 dark:border-rose-950',
          label: 'High Risk',
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          text: 'text-amber-500 dark:text-amber-400',
          badge: 'border-amber-500/20 bg-amber-500/15 text-amber-500 dark:text-amber-400',
          bg: 'bg-amber-500/5',
          border: 'border-amber-200 dark:border-amber-950',
          label: 'Moderate Risk',
        };
      case 'low':
        return {
          icon: ShieldAlert,
          text: 'text-emerald-500 dark:text-emerald-400',
          badge: 'border-emerald-500/20 bg-emerald-500/15 text-emerald-500 dark:text-emerald-400',
          bg: 'bg-emerald-500/5',
          border: 'border-emerald-200 dark:border-emerald-950',
          label: 'Low Risk',
        };
      default:
        return {
          icon: HelpCircle,
          text: 'text-zinc-500 dark:text-zinc-400',
          badge: 'border-zinc-500/20 bg-zinc-500/10 text-zinc-500 dark:text-zinc-400',
          bg: 'bg-zinc-500/5',
          border: 'border-zinc-200 dark:border-zinc-900',
          label: 'Unknown',
        };
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-900">
        <ShieldAlert className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">Risk Category Stratification</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {risks.map((item, index) => {
          const theme = getRiskTheme(item.level);
          const Icon = theme.icon;

          return (
            <div
              key={`${item.category}-${index}`}
              className={`flex items-start gap-4 rounded-xl border p-4 transition-all duration-300 hover:scale-[1.01] ${theme.border} ${theme.bg}`}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white ${theme.text} dark:border-zinc-800 dark:bg-zinc-950`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-grow space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-white">{item.category}</span>
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}>
                    {theme.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.findings}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
