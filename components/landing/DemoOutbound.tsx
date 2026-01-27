'use client';

import React, { useState } from 'react';
import { useAudioSimulation } from '@/hooks/useAudioSimulation';
import { PhoneIncoming, Loader2, CheckCircle2, PhoneOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function DemoOutbound() {
  const t = useTranslations('demoOutbound');
  const { demoState, startCall, endCall, resetDemo } = useAudioSimulation();
  const [formStep, setFormStep] = useState<'form' | 'submitting' | 'calling'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep('submitting');
    setTimeout(() => {
      setFormStep('calling');
      startCall();
    }, 1500);
  };

  const handleEndCall = () => {
    endCall();
  };

  if (demoState === 'ended') {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-2xl">
          <CheckCircle2 className="size-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t('requestCompleted')}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm">{t('requestCompletedDesc')}</p>
          <Link 
            href="#agendar" 
            className="w-full max-w-xs py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-center"
          >
            {t('scheduleConsultation')}
          </Link>
          <button 
             onClick={() => { resetDemo(); setFormStep('form'); }}
             className="mt-4 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline"
          >
            {t('back')}
          </button>
        </div>
      )
  }

  return (
    <div className="relative h-[500px] w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-2xl flex flex-col p-6 transition-colors duration-300">
       {/* Decorative */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

       {formStep === 'form' && (
         <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full z-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{t('weCallYou')}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{t('weCallYouDesc')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('name')}</label>
                  <input required type="text" placeholder={t('namePlaceholder')} className="w-full bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500/50 transition-colors" />
               </div>
               <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('phone')}</label>
                  <input required type="tel" placeholder={t('phonePlaceholder')} className="w-full bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500/50 transition-colors" />
               </div>
               
               <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 mt-2">
                 <PhoneIncoming className="size-5" />
                 {t('wantCall')}
               </button>
               <p className="text-[10px] text-zinc-600 text-center">
                  {t('submitDisclaimer')}
               </p>
            </form>
         </div>
       )}

       {formStep === 'submitting' && (
           <div className="flex-1 flex flex-col items-center justify-center">
               <Loader2 className="size-12 text-green-600 dark:text-green-500 animate-spin mb-4" />
               <p className="text-zinc-900 dark:text-white font-medium">{t('processingRequest')}</p>
           </div>
       )}

       {formStep === 'calling' && (
           <div className="flex-1 flex flex-col items-center justify-center relative">
               <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
               <div className="z-10 text-center">
                   <div className="size-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
                      <PhoneIncoming className="size-10 text-green-600 dark:text-green-400" />
                   </div>
                   <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t('simulatingCall')}</h3>
                   <p className="text-zinc-600 dark:text-zinc-400 mb-8">{t('agentDialing')}</p>
                   
                   <button 
                      onClick={handleEndCall}
                      className="px-8 py-3 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all flex items-center gap-2 mx-auto"
                    >
                      <PhoneOff className="size-4" />
                      {t('hangUp')}
                   </button>
               </div>
           </div>
       )}
    </div>
  );
}

