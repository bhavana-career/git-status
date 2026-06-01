'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Sparkles, User, HeartPulse, Terminal } from 'lucide-react';

import type { ChatMessage, ReportAnalysis } from '@/lib/health-types';

interface ChatPanelProps {
  analysis: ReportAnalysis;
  rawText: string;
}

const SUGGESTIONS = [
  'Explain this report in simple language.',
  'What is most concerning here?',
  'What lifestyle changes should I make?',
  'What questions should I ask my doctor?',
];

export default function ChatPanel({ analysis, rawText }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "I have the report context loaded. Ask me about findings, risk areas, next steps, or how to explain this report in simpler language.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoModeActive, setDemoModeActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: textToSend.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          rawText,
          analysis,
        }),
      });

      const data = (await response.json()) as { content?: string; demoMode?: boolean; error?: string };

      if (!response.ok || !data.content) {
        throw new Error(data.error || 'Failed to generate chat response.');
      }

      setDemoModeActive(Boolean(data.demoMode));
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content! }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reach the chat endpoint.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I ran into an error while generating a follow-up answer: ${message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-900">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-400" />
          <h2 className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">HealthGuard Consultation</h2>
        </div>
        {demoModeActive ? (
          <div className="flex items-center gap-1 rounded border border-amber-500/10 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-500 dark:text-amber-400">
            <Terminal className="h-3 w-3" />
            <span>Demo Mode AI</span>
          </div>
        ) : null}
      </div>

      <div className="scrollbar-thin flex-grow space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex max-w-[85%] gap-3 ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                  isUser
                    ? 'border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <HeartPulse className="h-4 w-4" />}
              </div>

              <div
                className={`whitespace-pre-wrap rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-900/60 dark:bg-zinc-950/60 dark:text-zinc-300'
                }`}
              >
                {message.content}
              </div>
            </div>
          );
        })}

        {isLoading ? (
          <div className="mr-auto flex max-w-[80%] gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="flex h-8 items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-900/60 dark:bg-zinc-950/60">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : null}

        <div ref={scrollRef} />
      </div>

      <div className="shrink-0 space-y-3 border-t border-zinc-200 bg-zinc-50/90 p-4 dark:border-zinc-900 dark:bg-zinc-950/40">
        {messages.length === 1 ? (
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTIONS.map((text) => (
              <button
                key={text}
                onClick={() => handleSend(text)}
                className="cursor-pointer whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[10px] text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
              >
                {text}
              </button>
            ))}
          </div>
        ) : null}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={isLoading ? 'HealthGuard is analyzing...' : 'Ask follow-up questions about this report...'}
            disabled={isLoading}
            className="flex-grow rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
