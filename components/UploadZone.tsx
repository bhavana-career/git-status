'use client';

import React, { useEffect, useRef, useState } from 'react';
import { UploadCloud, FileWarning, CheckCircle2, ShieldAlert, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  status?: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  progress?: number;
  fileName?: string;
  errorMessage?: string | null;
}

export default function UploadZone({
  onFileSelected,
  status = 'idle',
  progress = 0,
  fileName = '',
  errorMessage = null,
}: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (status === 'idle' && !fileName) {
        setSelectedFileName('');
        setLocalError(null);
      }

      if (fileName) {
        setSelectedFileName(fileName);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [fileName, status]);

  const resolvedError = errorMessage || localError;
  const isBusy = status === 'uploading' || status === 'processing';
  const isSuccess = status === 'success';

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isBusy) return;

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragActive(true);
    } else if (event.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setLocalError(null);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setLocalError('Please upload a PDF file only. Other file formats are not supported.');
      setIsDragActive(false);
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setLocalError('The selected file exceeds the 10MB limit. Please upload a smaller PDF.');
      setIsDragActive(false);
      return;
    }

    setSelectedFileName(file.name);
    onFileSelected(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    if (isBusy) return;

    if (event.dataTransfer.files?.[0]) {
      validateAndProcessFile(event.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      validateAndProcessFile(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (!isBusy) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative rounded-2xl border-2 border-dashed p-10 text-center backdrop-blur-sm transition-all duration-300 md:p-14 ${
          isDragActive
            ? 'scale-[1.01] border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
            : 'border-zinc-300 bg-white/80 hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/10 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/20'
        } ${isSuccess ? 'border-emerald-500 bg-emerald-500/5' : ''} ${
          resolvedError ? 'border-rose-500/50 bg-rose-500/5' : ''
        } ${isBusy ? 'cursor-wait' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,application/pdf"
          disabled={isBusy}
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {isBusy ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <LoaderCircle className="h-8 w-8 animate-spin" />
            </div>
          ) : isSuccess ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
          ) : resolvedError ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/20 text-rose-400">
              <FileWarning className="h-8 w-8" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              <UploadCloud className="h-8 w-8" />
            </div>
          )}

          {isBusy ? (
            <div className="w-full max-w-md space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                  {status === 'uploading' ? 'Uploading report' : 'Analyzing report'}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{selectedFileName}</p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${Math.max(progress, 6)}%` }}
                />
              </div>
              <p className="text-xs font-medium text-emerald-500 dark:text-emerald-400">
                {Math.round(progress)}% complete
              </p>
            </div>
          ) : isSuccess ? (
            <div>
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Report analyzed</h3>
              <p className="mt-1 text-sm font-medium text-emerald-500 dark:text-emerald-400">{selectedFileName}</p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Upload your healthcare PDF</h3>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Drag and drop your report here, or{' '}
                <span className="font-semibold text-emerald-500 underline decoration-wavy dark:text-emerald-400">
                  browse files
                </span>
              </p>
            </div>
          )}

          {!isBusy && !isSuccess && (
            <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-4 border-t border-zinc-200 pt-6 text-left text-xs text-zinc-500 dark:border-zinc-900/60 dark:text-zinc-500 sm:grid-cols-2">
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-500 dark:text-emerald-400">&bull;</span>
                <span>Supports blood, lab, diagnostic, and discharge reports</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="font-bold text-emerald-500 dark:text-emerald-400">&bull;</span>
                <span>Max size 10MB with PDF structure validation enforced</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {resolvedError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-4 text-sm text-rose-400"
        >
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <div>
            <span className="block font-semibold">File Validation Failed</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-rose-400/80">{resolvedError}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
