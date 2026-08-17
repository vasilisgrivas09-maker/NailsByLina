'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';
import PriceModal from '@/app/components/PriceModal';
import { INSTAGRAM_URL } from '@/lib/site';

const navLinks = [
  { label: 'Αρχική', href: '/#home', type: 'anchor' },
  { label: 'Υπηρεσίες', href: '/#services', type: 'anchor' },
  { label: 'Επικοινωνία', href: '/#contact', type: 'anchor' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
           ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <a href="/#home" className="flex items-center gap-2.5 group" aria-label="NailsByLina - Αρχική">
            <AppLogo size={32} />
            <span
              className={`font-display text-lg font-light tracking-wide transition-colors duration-300 ${
                scrolled? 'text-foreground' : 'text-white'
              }`}
            >
              NailsByLina
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6" aria-label="Κύρια πλοήγηση">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className={`relative font-sans text-sm font-medium transition-colors duration-300 group ${
                  scrolled? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
                }`}
              >
                {link?.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: 'var(--primary)' }}
                />
              </a>
            ))}

            <button
              onClick={() => setPriceModalOpen(true)}
              className="relative font-sans text-sm font-medium transition-colors duration-300 group border rounded-full px-4 py-1.5 border-primary/60 text-primary hover:bg-primary hover:text-white"
            >
              Υπηρεσίες & Τιμοκατάλογος
            </button>

            <Link
              href="/gallery"
              className={`relative font-sans text-sm font-medium transition-colors duration-300 group border rounded-full px-4 py-1.5 ${
                scrolled
                 ? 'border-accent/60 text-accent hover:bg-accent hover:text-background'
                  : 'border-white/40 text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Γκαλερί
            </Link>
          </nav>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded text-xs font-sans font-medium tracking-wider uppercase overflow-hidden relative group transition-all duration-300 hover:scale-[1.02]"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            <span className="relative z-10">Ραντεβού</span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300 ${
              scrolled? 'text-foreground' : 'text-white'
            }`}
            aria-label={menuOpen? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'}
            aria-expanded={menuOpen}
          >
            {menuOpen? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          menuOpen? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background/97 backdrop-blur-lg" onClick={() => setMenuOpen(false)} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks?.map((link, i) => (
            <a
              key={link?.href}
              href={link?.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl font-light text-foreground hover:text-primary transition-colors duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link?.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              setPriceModalOpen(true);
            }}
            className="font-display text-3xl font-light text-primary hover:text-primary/80 transition-colors duration-300"
          >
            Τιμοκατάλογος
          </button>
          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl font-light text-foreground hover:text-primary transition-colors duration-300"
          >
            Γκαλερί
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded text-sm font-sans font-medium tracking-wider uppercase"
            style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Κλείσε Ραντεβού
          </a>
        </div>
      </div>

      <PriceModal isOpen={priceModalOpen} onClose={() => setPriceModalOpen(false)} />
    </>
  );
}