'use client';

import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import type { Finding } from '@/lib/health-types';

interface FindingsProps {
  findings: Finding[];
}

export default function FindingsCard({ findings }: FindingsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getStatusBadge = (status: Finding['status']) => {
    switch (status) {
      case 'normal':
        return <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500 dark:text-emerald-400">Normal</span>;
      case 'low':
        return <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-500 dark:text-rose-400">Low</span>;
      case 'elevated':
        return <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500 dark:text-amber-400">Elevated</span>;
    }
  };

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-900">
        <Activity className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">Key Biomarkers & Lab Findings</h2>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
        {findings.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div key={`${item.name}-${index}`} className="py-3">
              <div
                onClick={() => toggleRow(index)}
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900/40"
              >
                <div className="min-w-0 flex-grow">
                  <span className="block truncate text-sm font-semibold text-zinc-950 dark:text-white">{item.name}</span>
                  <span className="mt-0.5 block text-xs font-mono text-zinc-500">Range: {item.referenceRange}</span>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-mono text-sm font-bold text-zinc-700 dark:text-zinc-200">{item.value}</span>
                  {getStatusBadge(item.status)}
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 pt-2 pb-1 text-xs leading-relaxed text-zinc-600 dark:border-zinc-900/60 dark:bg-zinc-950/40 dark:text-zinc-400">
                      <strong className="mb-0.5 block font-semibold text-zinc-800 dark:text-zinc-300">Clinical Meaning:</strong>
                      {item.impact}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
