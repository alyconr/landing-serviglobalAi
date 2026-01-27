'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS = [
    { name: t('cases'), href: '#casos' },
    { name: t('howItWorks'), href: '#como-funciona' },
    { name: t('integrations'), href: '#integraciones' },
    { name: t('demo'), href: '#demos' },
  ];

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath || ''}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-zinc-200/50 dark:border-white/10 py-3 shadow-sm dark:shadow-none'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <div className="size-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center overflow-hidden">
            <Globe className="size-4 text-white animate-spin-slow" />
          </div>
          <span className={cn(
             "text-lg font-bold tracking-tight transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300",
             isScrolled ? "text-zinc-900 dark:text-white" : "text-white dark:text-white"
          )}>
            ServiGlobal<span className="text-violet-600 dark:text-violet-500">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                isScrolled 
                   ? "text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white"
                   : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          {/* Language Switcher */}
          <div className={cn(
             "flex items-center gap-1 rounded-full p-1 border transition-colors",
             isScrolled 
                ? "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5"
                : "bg-white/10 dark:bg-white/5 border-white/10 dark:border-white/5 backdrop-blur-md"
          )}>
            <button
              onClick={() => switchLocale('es')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                locale === 'es' 
                  ? "bg-violet-600 text-white" 
                  : isScrolled
                        ? "text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white"
                        : "text-white/70 hover:text-white"
              )}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                locale === 'en' 
                  ? "bg-violet-600 text-white" 
                  : isScrolled
                        ? "text-zinc-600 dark:text-white/60 hover:text-black dark:hover:text-white"
                        : "text-white/70 hover:text-white"
              )}
            >
              EN
            </button>
          </div>
          
          <Link
            href="#agendar"
            className={cn(
               "px-5 py-2 rounded-full font-semibold text-sm transition-colors shadow-lg",
               isScrolled
                 ? "bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                 : "bg-white text-black hover:bg-zinc-100"
            )}
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          {/* Mobile Language Switcher */}
          <div className={cn(
             "flex items-center gap-1 rounded-full p-1 border transition-colors",
             isScrolled 
                ? "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/5"
                : "bg-white/10 dark:bg-white/5 border-white/10 dark:border-white/5 backdrop-blur-md"
          )}>
            <button
              onClick={() => switchLocale('es')}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-semibold transition-all",
                locale === 'es' 
                  ? "bg-violet-600 text-white" 
                  : isScrolled
                        ? "text-zinc-600 dark:text-white/60"
                        : "text-white/70"
              )}
            >
              ES
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-semibold transition-all",
                locale === 'en' 
                  ? "bg-violet-600 text-white" 
                  : isScrolled
                        ? "text-zinc-600 dark:text-white/60"
                        : "text-white/70"
              )}
            >
              EN
            </button>
          </div>
          
          <button
            className={cn(
               "p-1 transition-colors",
               isScrolled ? "text-zinc-900 dark:text-white" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-black/95 border-b border-zinc-200 dark:border-white/10 overflow-hidden backdrop-blur-xl"
          >
            <nav className="flex flex-col p-4 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-800 dark:text-white/80 hover:text-violet-600 dark:hover:text-white font-medium py-2 border-b border-zinc-100 dark:border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#agendar"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center px-5 py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 transition-colors"
              >
                {t('cta')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
