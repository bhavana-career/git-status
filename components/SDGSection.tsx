'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Heart, GraduationCap } from 'lucide-react';

const targets = [
  {
    icon: Heart,
    title: 'SDG Target 3.4: Preventive Care',
    description: 'Promotes early awareness of silent cardiovascular, glycemic, and nutrient issues, helping reduce premature mortality through timely diet and lifestyle adjustments.',
  },
  {
    icon: GraduationCap,
    title: 'SDG Target 3.c: Health Education & Literacy',
    description: 'Bridges the terminology gap by translating complex medical markers such as EGFR, LDL, and HbA1c into plain, readable feedback.',
  },
  {
    icon: Leaf,
    title: 'SDG Target 3.d: Early Warning Systems',
    description: 'Functions as a digital early-warning tool that identifies abnormal biomarkers and advises users to consult qualified physicians before symptoms escalate.',
  },
];

export default function SDGSection() {
  return (
    <section id="sdg3" className="relative border-t border-zinc-200 bg-white py-24 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 backdrop-blur-sm dark:bg-emerald-950/30 dark:text-emerald-400">
              <Award className="h-3.5 w-3.5" />
              UN Sustainable Development Goals
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              Championing SDG Goal 3: Good Health & Well-being
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              We believe healthcare understanding is a fundamental human right. HealthGuard AI is built to democratize health data, turning cryptic diagnostic numbers into actionable insights.
            </p>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <span className="block text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Official Mission</span>
              <p className="mt-2 text-sm italic leading-relaxed text-zinc-700 dark:text-zinc-300">
                &ldquo;Ensure healthy lives and promote well-being for all at all ages.&rdquo; HealthGuard AI directly addresses this by providing free, private, instant clarification on diagnostic report metadata.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {targets.map((target, index) => {
              const Icon = target.icon;

              return (
                <motion.div
                  key={target.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 rounded-xl border border-zinc-200 bg-white/80 p-5 transition-all duration-300 hover:border-zinc-300 hover:bg-white dark:border-zinc-900 dark:bg-zinc-900/10 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/20"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{target.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {target.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
