'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { INSTAGRAM_URL } from '@/lib/site';

export default function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = badge.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      badge.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background image - Desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <AppImage
          src="/assets/images/hero-desktop.png"
          alt="Luxury nail art με μαύρο μάρμαρο, χρυσό και διαμάντια – Elegant Nails Αγρίνιο"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Background image - Mobile */}
      <div className="absolute inset-0 z-0 block md:hidden">
        <AppImage
          src="/assets/images/hero-mobile.png"
          alt="Luxury nail art με μαύρο μάρμαρο, χρυσό και διαμάντια – Elegant Nails Αγρίνιο"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Multi-layer gradient scrim for white text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75 z-10" />
      {/* Dark tint layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-transparent to-transparent z-10" />
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none grain-overlay z-10" />

      {/* Scan line effect */}
      <div className="scan-line z-10" />

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center text-center md:items-start md:text-left justify-start flex-1 px-6 md:px-16 pt-40 md:pt-40 pb-12">
        {/* Pill badge */}
        <div
          ref={badgeRef}
          className="animate-fade-in-1 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8"
        >
          <div className="animate-pulse-gold w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase text-white/90 font-sans font-medium">
            Nail Studio Αγρίνιο
          </span>
        </div>

        {/* Main title */}
        <h1 className="animate-fade-in-2 font-display text-hero-xl font-light leading-[0.9] tracking-tight text-white mb-4">
          Elegant{' '}
          <span
            className="italic font-light"
            style={{
              background: 'linear-gradient(135deg, #DDB87A 0%, #C99C63 40%, #FEECBB 60%, #C99C63 80%, #DDB87A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nails
          </span>
        </h1>

        {/* Gold divider */}
        <div className="animate-fade-in-2 gold-line-short mb-8 mx-auto md:mx-0" />

        {/* Subtitle */}
        <p className="animate-fade-in-3 font-sans font-light text-white/80 tracking-[0.12em] text-base md:text-lg uppercase mb-10">
          Πολυτέλεια σε κάθε λεπτομέρεια
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded overflow-hidden text-primary-foreground font-sans font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(201,169,110,0.5)]"
          >
            {/* Gold shimmer background */}
            <span className="absolute inset-0 gold-shimmer" />
            {/* Hover overlay */}
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            {/* Diamond icon */}
            <svg
              className="relative z-10 w-4 h-4 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2L2 8l10 14 10-14-10-6zm0 3.5L19.5 9 12 19.5 4.5 9 12 5.5z" />
            </svg>
            <span className="relative z-10">Κλείσε Ραντεβού</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-4 absolute bottom-8 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 flex flex-col items-center gap-2 opacity-60">
          <span className="text-white tracking-[0.2em] uppercase font-sans text-xs">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}