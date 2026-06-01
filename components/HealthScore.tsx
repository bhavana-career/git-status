'use client';

import React from 'react';
import { HeartPulse, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HealthScoreProps {
  score: number;
  summary: string;
}

export default function HealthScore({ score, summary }: HealthScoreProps) {
  const getScoreTheme = (value: number) => {
    if (value >= 80) {
      return {
        stroke: 'stroke-emerald-500',
        text: 'text-emerald-500 dark:text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
        label: 'Optimal',
      };
    }

    if (value >= 60) {
      return {
        stroke: 'stroke-amber-500',
        text: 'text-amber-500 dark:text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
        label: 'Moderate',
      };
    }

    return {
      stroke: 'stroke-rose-500',
      text: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      glow: 'shadow-[0_0_20px_rgba(244,63,94,0.2)]',
      label: 'Attention Needed',
    };
  };

  const theme = getScoreTheme(score);
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30 md:grid-cols-12 md:p-8">
      <div className="flex flex-col items-center justify-center md:col-span-4">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div className={`absolute inset-4 rounded-full ${theme.bg} ${theme.glow} blur-md transition-all duration-500`} />

          <svg className="h-full w-full -rotate-90 transform">
            <circle
              className="stroke-current text-zinc-200 dark:text-zinc-800"
              strokeWidth={strokeWidth}
              fill="transparent"
              r={radius}
              cx="80"
              cy="80"
            />
            <motion.circle
              className={`${theme.stroke} stroke-current transition-all duration-500`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="80"
              cy="80"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">{score}</span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Health Score</span>
          </div>
        </div>

        <div className={`mt-3 rounded-full border px-3 py-1 text-xs font-semibold ${theme.bg} ${theme.border} ${theme.text}`}>
          {theme.label} Status
        </div>
      </div>

      <div className="space-y-4 md:col-span-8">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <HeartPulse className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-semibold uppercase tracking-wider">Executive Summary</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Clinical Insights Overview</h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
        <div className="inline-flex items-center gap-1 text-xs text-zinc-500">
          <span>AI-generated analysis. Verify critical parameters.</span>
          <ArrowUpRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
