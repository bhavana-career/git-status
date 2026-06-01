'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileUp, ShieldAlert, Sparkles, TrendingUp, HeartPulse } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 dark:bg-zinc-950 md:pt-28 md:pb-36">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse-slow" />
      <div className="pointer-events-none absolute top-1/3 left-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-slow [animation-delay:2s]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 backdrop-blur-sm dark:bg-emerald-950/30 dark:text-emerald-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Healthcare Insights - SDG 3 Goal Alignment
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-4xl text-4xl font-extrabold leading-none tracking-tight text-zinc-950 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Demystify your health reports with{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              HealthGuard AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg md:text-xl"
          >
            Upload your medical reports, discharge summaries, or blood tests. Get instant executive summaries, key findings, risk scores, and personalized wellness recommendations in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3.5 text-base font-semibold text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-200 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] sm:w-auto"
            >
              <FileUp className="h-5 w-5" />
              Analyze Your Report
            </Link>
            <a
              href="#features"
              className="flex w-full items-center justify-center rounded-lg border border-zinc-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-zinc-700 backdrop-blur-sm transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white sm:w-auto"
            >
              Explore Features
            </a>
          </motion.div>
        </div>

        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mt-16 overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-md animate-float dark:border-zinc-800 dark:bg-zinc-900/40 dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] sm:mt-20"
        >
          <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="ml-2 text-xs font-mono text-zinc-500">healthguard-dashboard-preview.exe</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-500 dark:text-emerald-400">Live Preview</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Health Score</span>
                <HeartPulse className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-zinc-950 dark:text-white">82</span>
                <span className="text-sm font-medium text-emerald-400">/ 100</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: '82%' }} />
              </div>
              <p className="mt-3 text-xs text-zinc-500">Based on blood metrics and risk factors detected.</p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Risk Assessment</span>
                <ShieldAlert className="h-5 w-5 text-amber-500" />
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Cardiovascular Risk</span>
                  <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-semibold text-emerald-400">Low</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Glycemic Control</span>
                  <span className="rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 font-semibold text-amber-400">Moderate</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Micronutrient Levels</span>
                  <span className="rounded border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 font-semibold text-rose-400">Deficit</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white/90 p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Biomarker Trend</span>
                <TrendingUp className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="mt-5 flex h-24 items-end justify-between gap-1.5">
                <div className="group relative h-[30%] w-full rounded-t bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-x-0 bottom-0 h-full rounded-t bg-cyan-500/30 transition-all duration-300 group-hover:bg-cyan-500" />
                </div>
                <div className="group relative h-[45%] w-full rounded-t bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-x-0 bottom-0 h-full rounded-t bg-cyan-500/40 transition-all duration-300 group-hover:bg-cyan-500" />
                </div>
                <div className="group relative h-[35%] w-full rounded-t bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-x-0 bottom-0 h-full rounded-t bg-cyan-500/30 transition-all duration-300 group-hover:bg-cyan-500" />
                </div>
                <div className="group relative h-[60%] w-full rounded-t bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-x-0 bottom-0 h-full rounded-t bg-cyan-500/60 transition-all duration-300 group-hover:bg-cyan-500" />
                </div>
                <div className="group relative h-[75%] w-full rounded-t bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-x-0 bottom-0 h-full rounded-t bg-cyan-500/80 transition-all duration-300 group-hover:bg-cyan-500" />
                </div>
                <div className="group relative h-[90%] w-full rounded-t bg-zinc-100 dark:bg-zinc-900">
                  <div className="absolute inset-x-0 bottom-0 h-full rounded-t bg-emerald-500 transition-all duration-300" />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Today (Optimal)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
