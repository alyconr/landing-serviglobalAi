import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAudioSimulation } from '@/hooks/useAudioSimulation';
import { PhoneIncoming, Loader2, CheckCircle2, PhoneOff, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const COUNTRY_CODES = [
  { code: '+1', flag: '/flags/us.svg', name: 'USA' },
  { code: '+57', flag: '/flags/co.svg', name: 'COL' },
  { code: '+52', flag: '/flags/mx.svg', name: 'MEX' },
  { code: '+34', flag: '/flags/es.svg', name: 'ESP' },
  { code: '+54', flag: '/flags/ar.svg', name: 'ARG' },
  { code: '+56', flag: '/flags/cl.svg', name: 'CHL' },
  { code: '+51', flag: '/flags/pe.svg', name: 'PER' },
];


export function DemoOutbound() {
  const t = useTranslations('demoOutbound');
  const { demoState, startCall, endCall, resetDemo } = useAudioSimulation();
  const [formStep, setFormStep] = useState<'form' | 'submitting' | 'calling'>('form');
  const [countryCode, setCountryCode] = useState('+57');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep('submitting');
    
    try {
        const fullPhone = `${countryCode}${phone}`;
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        console.log("Submitting to:", `${API_URL}/api/v1/call-outbound`);
        console.log("Payload:", { name, email, phone: fullPhone });

        const response = await fetch(`${API_URL}/api/v1/call-outbound`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone: fullPhone })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log("Success:", data);

        // Transition to calling state
        setFormStep('calling');
        startCall();
        
    } catch (error) {
        console.error("Error initiating call:", error);
        alert('Error initiating call. Check console for details.');
        setFormStep('form');
    }
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
          <button 
            onClick={() => { resetDemo(); setFormStep('form'); setName(''); setEmail(''); setPhone(''); }} // Reset form as well
            className="w-full max-w-xs py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-center"
          >
             {t('scheduleConsultation')}
          </button>
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
    <div className="relative h-[500px] w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col p-6 transition-colors duration-300">
       {/* Decorative Wrapper */}
       <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
       </div>

       {formStep === 'form' && (
         <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full z-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{t('weCallYou')}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{t('weCallYouDesc')}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('name')}</label>
                  <input 
                    required 
                    type="text" 
                    placeholder={t('namePlaceholder')} 
                    className="w-full bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500/50 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('email')}</label>
                  <input 
                    required 
                    type="email" 
                    placeholder={t('emailPlaceholder')} 
                    className="w-full bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500/50 transition-colors" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t('phone')}</label>
                  <div className="flex gap-2 relative">
                    {/* Custom Country Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-[46px] px-3 rounded-lg bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 focus:outline-none focus:border-green-500/50 transition-all text-sm flex items-center gap-2 min-w-[80px] text-zinc-900 dark:text-white"
                      >
                        {(() => {
                          const selected = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];
                          return (
                            <>
                              <div className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm shrink-0">
                                  <Image 
                                      src={selected.flag} 
                                      alt={selected.name} 
                                      fill 
                                      className="object-cover"
                                  />
                              </div>
                              <span>{selected.code}</span>
                              <ChevronDown className="size-3 opacity-50 ml-auto" />
                            </>
                          );
                        })()}
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 max-h-60 overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-50 py-1">
                          {COUNTRY_CODES.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(country.code);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3"
                            >
                               <div className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm shrink-0">
                                  <Image 
                                      src={country.flag} 
                                      alt={country.name} 
                                      fill 
                                      className="object-cover"
                                  />
                              </div>
                              <span className="font-medium text-zinc-900 dark:text-white">{country.code}</span>
                              <span className="text-zinc-500 text-xs ml-auto">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  
                    <input 
                        required 
                        type="tel" 
                        placeholder={t('phonePlaceholder')} 
                        className="flex-1 bg-zinc-100 dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-green-500/50 transition-colors"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
               </div>
               
               <button type="submit" disabled={formStep === 'submitting'} className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
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

