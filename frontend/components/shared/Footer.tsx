'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const headerT = useTranslations('header');
  
  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
              ServiGlobal<span className="text-violet-600 dark:text-violet-500">AI</span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-neutral-400 leading-relaxed">
              {t('tagline')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('product')}</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-neutral-400">
              <li><Link href="#casos" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{headerT('cases')}</Link></li>
              <li><Link href="#demos" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{headerT('demo')}</Link></li>
              <li><Link href="#integraciones" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{headerT('integrations')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('services')}</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-neutral-400">
              <li><span className="cursor-default">Implementation</span></li>
              <li><span className="cursor-default">VoIP Consulting</span></li>
              <li><span className="cursor-default">Custom Development</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">{t('contact')}</h4>
             <Link
              href="#agendar"
              className="inline-block px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors text-sm"
            >
              {headerT('cta')}
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 dark:text-neutral-600">
          <p>{t('copyright')}</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
