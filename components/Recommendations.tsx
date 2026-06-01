'use client';

import React, { useState } from 'react';
import { Lightbulb, Salad, HeartPulse, UserRoundSearch, CircleAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import type { RecommendationItem } from '@/lib/health-types';

interface RecommendationsProps {
  recommendations: RecommendationItem[];
}

export default function Recommendations({ recommendations }: RecommendationsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'diet' | 'lifestyle' | 'medical_questions'>('all');

  const tabs = [
    { id: 'all', label: 'All Actions', icon: Lightbulb },
    { id: 'diet', label: 'Nutrition & Diet', icon: Salad },
    { id: 'lifestyle', label: 'Lifestyle & Care', icon: HeartPulse },
    { id: 'medical_questions', label: 'Doctor Checklist', icon: UserRoundSearch },
  ] as const;

  const filteredItems = recommendations.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'diet':
        return Salad;
      case 'lifestyle':
        return HeartPulse;
      case 'medical_questions':
        return UserRoundSearch;
      default:
        return CircleAlert;
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-900">
        <Lightbulb className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">Recommended Action Protocol</h2>
      </div>

      <div className="flex gap-1.5 overflow-x-auto border-b border-zinc-200 pb-2 no-scrollbar dark:border-zinc-900">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                  : 'border-transparent bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const Icon = getRecommendationIcon(item.type);

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-900 dark:bg-zinc-950/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-emerald-400">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">{item.title}</h4>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs font-medium text-zinc-500">No recommendations found for this category.</div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
