'use client';

import React from 'react';
import { useAudioSimulation } from '@/hooks/useAudioSimulation';
import { Phone, Mic, PhoneOff, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const AGENT_TYPES = ['sales', 'support', 'collections', 'bookings'] as const;

export function DemoInbound() {
  const t = useTranslations('demoInbound');
  const { demoState, volumeLevels, duration, startCall, endCall, resetDemo } = useAudioSimulation();
  const [selectedAgent, setSelectedAgent] = React.useState<typeof AGENT_TYPES[number]>('sales');

  const agentLabels: Record<typeof AGENT_TYPES[number], string> = {
    sales: t('agentSales'),
    support: t('agentSupport'),
    collections: t('agentCollections'),
    bookings: t('agentBookings'),
  };

  if (demoState === 'ended') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/5">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t('callEnded')}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm">{t('callEndedDesc')}</p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="#agendar"
            onClick={resetDemo}
            className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-semibold transition-colors"
          >
            {t('scheduleConsultation')}
          </Link>
          <button
            onClick={resetDemo}
            className="w-full py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg font-medium transition-colors"
          >
            {t('tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-2xl flex flex-col transition-colors duration-300">
      {/* status bar */}
      <div className="absolute top-4 left-0 right-0 py-2 px-4 flex justify-between items-center text-xs text-zinc-500 dark:text-white/30 z-10">
        <span>{t('simulatorVersion')}</span>
        <div className="flex gap-1">
           <div className="size-2 rounded-full bg-green-500/50"></div>
           <span>{t('online')}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative p-6">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-violet-500/5 pointer-events-none" />

        {demoState === 'idle' && (
          <div className="w-full max-w-sm flex flex-col gap-6 z-10">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full mx-auto flex items-center justify-center border border-zinc-200 dark:border-white/10 mb-4 shadow-[0_0_30px_-5px_var(--color-violet-500)] shadow-violet-500/20">
                <Phone className="size-8 text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{t('webCall')}</h3>
              <p className="text-sm text-zinc-500">{t('selectAgentDesc')}</p>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">{t('agentType')}</label>
              <select 
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value as typeof AGENT_TYPES[number])}
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-colors"
              >
                {AGENT_TYPES.map((type) => (
                  <option key={type} value={type}>{agentLabels[type]}</option>
                ))}
              </select>

              <button
                onClick={startCall}
                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-xl shadow-black/5 dark:shadow-white/5 flex items-center justify-center gap-2"
              >
                <Phone className="size-5" />
                {t('callNow')}
              </button>
            </div>
          </div>
        )}

        {(demoState === 'connecting' || demoState === 'connected') && (
          <div className="flex flex-col items-center z-10 w-full">
            <div className="mb-8 relative">
              <div className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
                demoState === 'connected' ? "bg-violet-500/20 animate-pulse-ring" : "bg-zinc-100 dark:bg-zinc-800"
              )}>
                <User className="size-12 text-zinc-400 dark:text-white/80" />
              </div>
              {demoState === 'connecting' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="size-16 text-violet-600 dark:text-violet-400 animate-spin opacity-50 absolute" />
                  </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
              {demoState === 'connecting' ? t('connecting') : `${t('agent')} ${agentLabels[selectedAgent]}`}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 font-mono">{duration}</p>

            {/* Visualizer */}
            <div className="h-16 flex items-center gap-1 mb-12">
               {demoState === 'connected' ? (
                 volumeLevels.map((level, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 10 }}
                      animate={{ height: level }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-3 bg-gradient-to-t from-violet-600 to-blue-400 rounded-full"
                    />
                 ))
               ) : (
                  <div className="text-zinc-600 text-sm animate-pulse">{t('establishingConnection')}</div>
               )}
            </div>

            <button
              onClick={endCall}
              className="size-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <PhoneOff className="size-8" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

