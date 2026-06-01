'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, BrainCircuit, Activity, MessageSquareHeart, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Smart PDF Reader',
    description: 'Direct text extraction from standard healthcare PDFs, lab sheets, blood tests, and discharge summaries without external database dependencies.',
  },
  {
    icon: BrainCircuit,
    title: 'Cognitive Analysis',
    description: 'Harnesses advanced LLM comprehension to distill complex clinical terminology into clear summaries, highlight critical deviations, and assess general risks.',
  },
  {
    icon: Activity,
    title: 'Visual Biomarkers',
    description: 'Automatically detects vital stats like Cholesterol, Glucose, Blood Pressure, and Heart Rate to display historical charts and tracking indicators.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Interactive Wellness Chat',
    description: 'Ask contextual follow-up questions about your report, from diet suggestions to recommended questions for your upcoming primary care visit.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trace Privacy',
    description: 'Session-only client execution. Your uploaded health records are processed live, never stored in database arrays, and erased on refresh.',
  },
  {
    icon: Zap,
    title: 'Hyper-Fast Responses',
    description: 'Optimized pipeline processes documents and returns detailed health scores and findings in seconds, ready for immediate consultation.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative border-t border-zinc-200 bg-white py-24 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
            Intelligent Health Analysis
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
            Engineered for clarity, privacy, and action
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            HealthGuard AI replaces complex medical jargon with visual charts, structured risk tiers, and helpful lifestyle advice to make healthcare accessible.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative rounded-xl border border-zinc-200 bg-white/80 p-6 transition-all duration-300 hover:border-zinc-300 hover:bg-white dark:border-zinc-900 dark:bg-zinc-900/20 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-emerald-500 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:text-emerald-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-950 transition-colors group-hover:text-emerald-500 dark:text-white dark:group-hover:text-emerald-400">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
