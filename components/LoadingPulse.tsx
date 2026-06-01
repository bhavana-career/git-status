'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Sparkles, Database } from 'lucide-react';

const loadingSteps = [
  { text: 'Parsing PDF document structure...', icon: Database },
  { text: 'Extracting biomarker values and report context...', icon: Activity },
  { text: 'Checking for clinically notable thresholds...', icon: ShieldAlert },
  { text: 'Generating recommendations with HealthGuard AI...', icon: Sparkles },
];

interface LoadingPulseProps {
  fileName?: string;
  progress?: number;
}

export default function LoadingPulse({ fileName, progress = 0 }: LoadingPulseProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  const StepIcon = loadingSteps[currentStep].icon;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-20 text-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border border-emerald-500/20 bg-emerald-500/10 animate-ping [animation-duration:2.5s]" />
        <div className="absolute h-32 w-32 rounded-full border border-cyan-500/10 bg-cyan-500/5 animate-ping [animation-delay:1s] [animation-duration:4s]" />

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-200 bg-white text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)] dark:border-zinc-800 dark:bg-zinc-900"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <StepIcon className="h-9 w-9 text-emerald-400" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <h2 className="mt-8 text-xl font-bold tracking-tight text-zinc-950 dark:text-white">Analyzing Health Report</h2>

      <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
        This is a session-only procedure. No records are saved to disk.
      </p>

      {fileName ? <p className="mt-3 text-xs font-mono text-zinc-500">{fileName}</p> : null}

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
          style={{ width: `${Math.max(progress, 8)}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-emerald-500 dark:text-emerald-400">{Math.round(progress)}% complete</p>

      <div className="mt-8 flex h-16 w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5 text-sm font-medium text-emerald-500 dark:text-emerald-400"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {loadingSteps[currentStep].text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
