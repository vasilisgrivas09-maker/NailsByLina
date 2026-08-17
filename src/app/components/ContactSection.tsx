'use client';

import React, { useEffect, useRef } from 'react';
import { INSTAGRAM_URL, SITE_PHONE, SITE_PHONE_DISPLAY } from '@/lib/site';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const els = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #2C2C2C 0%, #1a1a1a 60%, #2C2C2C 100%)',
        }}
      />
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none grain-overlay" />
      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blob-gold opacity-60 pointer-events-none" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="animate-on-scroll mb-14">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Επικοινωνία
          </p>
          <h2 className="font-display text-section-lg font-light text-white mb-4 leading-tight">
            Επικοινωνήστε μαζί μας
          </h2>
          <div className="gold-line-short mb-6" />
          <p className="font-sans text-white/60 font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Είμαστε εδώ για εσάς. Κλείστε το ραντεβού σας μέσω Instagram ή τηλεφώνου.
          </p>
        </div>

        {/* Contact cards */}
        <div
          className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-12"
          style={{ transitionDelay: '100ms' }}
        >
          {/* Instagram card */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-400 card-hover overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              }}
            />

            {/* Instagram icon */}
            <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/60 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
                Instagram
              </p>
              <p className="font-display text-lg font-light text-white mb-1">
                Στείλτε μας DM
              </p>
              <p className="font-sans text-xs text-white/75">@liapilamprini</p>
            </div>

            <div className="flex items-center gap-2 text-primary text-xs font-sans group-hover:gap-3 transition-all duration-300">
              <span>Ανοίξτε Instagram</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </a>

          {/* Phone card */}
          <a
            href={`tel:${SITE_PHONE}`}
            className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all duration-400 card-hover overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              }}
            />

            {/* Phone icon */}
            <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/60 transition-all duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
                />
              </svg>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary mb-1">
                Τηλέφωνο
              </p>
              <p className="font-display text-lg font-light text-white mb-1">Καλέστε μας</p>
              <p className="font-sans text-xs text-white/75">{SITE_PHONE_DISPLAY}</p>
            </div>

            <div className="flex items-center gap-2 text-primary text-xs font-sans group-hover:gap-3 transition-all duration-300">
              <span>Άμεση Κλήση</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </a>
        </div>

        {/* Gold CTA */}
        <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded overflow-hidden text-primary-foreground font-sans font-medium text-sm tracking-wider uppercase transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(201,169,110,0.4)]"
          >
            <span className="absolute inset-0 gold-shimmer" />
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="relative z-10 w-4 h-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <span className="relative z-10">Κλείσε Ραντεβού Τώρα</span>
          </a>
        </div>
      </div>
    </section>
  );
}