'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HeartPulse, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import UploadZone from '@/components/UploadZone';
import LoadingPulse from '@/components/LoadingPulse';
import HealthScore from '@/components/HealthScore';
import FindingsCard from '@/components/FindingsCard';
import RiskCard from '@/components/RiskCard';
import Recommendations from '@/components/Recommendations';
import ChatPanel from '@/components/ChatPanel';
import TrendsChart from '@/components/TrendsChart';
import ThemeToggle from '@/components/ThemeToggle';
import type { AnalyzeResponse } from '@/lib/health-types';

type DashboardStatus = 'idle' | 'loading' | 'analyzed';

interface ExtractedData extends AnalyzeResponse {
  rawText: string;
}

export default function Dashboard() {
  const [status, setStatus] = useState<DashboardStatus>('idle');
  const [fileName, setFileName] = useState('');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const startProcessingProgress = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = window.setInterval(() => {
      setUploadProgress((current) => (current >= 98 ? current : current + 1));
    }, 350);
  };

  const stopProcessingProgress = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleFileSelected = async (file: File) => {
    setFileName(file.name);
    setErrorMsg(null);
    setUploadProgress(0);
    setUploadState('uploading');
    setStatus('loading');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await new Promise<AnalyzeResponse>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/analyze');
        xhr.responseType = 'json';

        xhr.upload.onprogress = (event) => {
          if (!event.lengthComputable) return;
          const percent = Math.min(92, Math.round((event.loaded / event.total) * 92));
          setUploadProgress(percent);
          setUploadState('uploading');
        };

        xhr.upload.onload = () => {
          setUploadState('processing');
          setUploadProgress((current) => Math.max(current, 92));
          startProcessingProgress();
        };

        xhr.onerror = () => reject(new Error('Unable to upload the PDF. Please try again.'));

        xhr.onload = () => {
          stopProcessingProgress();
          const response = xhr.response as AnalyzeResponse | { error?: string } | null;

          if (xhr.status < 200 || xhr.status >= 300 || !response || !('success' in response)) {
            const message = response && 'error' in response ? response.error : 'Failed to process PDF file.';
            reject(new Error(message || 'Failed to process PDF file.'));
            return;
          }

          resolve(response);
        };

        xhr.send(formData);
      });

      setUploadProgress(100);
      setUploadState('success');
      setExtractedData({
        ...data,
        rawText: data.extractedText,
      });
      setStatus('analyzed');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred while parsing the medical PDF.';
      setErrorMsg(message);
      setUploadState('error');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    stopProcessingProgress();
    setFileName('');
    setExtractedData(null);
    setErrorMsg(null);
    setStatus('idle');
    setUploadProgress(0);
    setUploadState('idle');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <header className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-zinc-900 dark:bg-zinc-950/50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-emerald-400" />
            <span className="font-semibold tracking-tight text-zinc-950 dark:text-white">HealthGuard Console</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs font-mono text-zinc-500 sm:inline">{fileName}</span>
          <div className="hidden items-center gap-2 font-mono text-xs text-zinc-500 md:flex">
            <span>Session:</span>
            <span className="rounded border border-emerald-500/10 bg-emerald-500/10 px-1.5 py-0.5 font-semibold text-emerald-500 dark:text-emerald-400">
              Active Sandbox
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-start px-4 py-8 sm:px-6 lg:px-8">
        {status === 'idle' ? (
          <div className="flex flex-grow flex-col justify-center space-y-6 py-10 text-center">
            <div className="mx-auto max-w-md space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
                Analyze Health Records
              </h1>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Provide a digital PDF copy of your recent lab report, diagnostic summary, or wellness blood work. All computation is handled instantly.
              </p>
            </div>

            {errorMsg ? (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto flex max-w-2xl items-start gap-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-4 text-left text-sm text-rose-400"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <div>
                  <span className="block font-semibold">Analysis Halted</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-rose-400/80">{errorMsg}</span>
                </div>
              </motion.div>
            ) : null}

            <UploadZone
              onFileSelected={handleFileSelected}
              status={uploadState}
              progress={uploadProgress}
              fileName={fileName}
              errorMessage={errorMsg}
            />
          </div>
        ) : null}

        {status === 'loading' ? (
          <div className="flex flex-grow flex-col items-center justify-center gap-8 py-10">
            <UploadZone
              onFileSelected={handleFileSelected}
              status={uploadState}
              progress={uploadProgress}
              fileName={fileName}
              errorMessage={errorMsg}
            />
            <LoadingPulse fileName={fileName} progress={uploadProgress} />
          </div>
        ) : null}

        {status === 'analyzed' && extractedData ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 pb-12"
          >
            {extractedData.demoMode ? (
              <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-500 dark:text-amber-400">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="space-y-1">
                  <span className="block font-semibold">Demo Mode Active</span>
                  <p className="text-xs leading-relaxed text-amber-500/80 dark:text-amber-400/80">
                    `GEMINI_API_KEY` is not configured, so the dashboard is showing a safe mock analysis. Add your key in `.env.local` to run live Gemini report analysis.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white/80 p-4 dark:border-zinc-900 dark:bg-zinc-900/20 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <span className="block text-xs font-mono text-zinc-500">Currently Inspecting</span>
                <span className="block max-w-md truncate text-sm font-bold text-zinc-800 dark:text-zinc-200">{fileName}</span>
              </div>
              <button
                onClick={handleReset}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-200 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Upload New Record
              </button>
            </div>

            <HealthScore score={extractedData.healthScore} summary={extractedData.summary} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <FindingsCard findings={extractedData.findings} />
                <RiskCard risks={extractedData.risks} />
              </div>

              <div className="space-y-6 lg:col-span-5">
                <Recommendations recommendations={extractedData.recommendations} />
                <ChatPanel analysis={extractedData} rawText={extractedData.rawText} />
                <TrendsChart biomarkers={extractedData.biomarkers} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </main>
    </div>
  );
}
