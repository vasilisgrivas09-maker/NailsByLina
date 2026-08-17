'use client';

import React, { useEffect, useRef } from 'react';

const priceItems = [
  {
    name: 'Ημιμόνιμο Απλό',
    nameEn: 'Semi-Permanent',
    description: 'απλή βαφή',
    price: '20',
    badge: 'Δημοφιλές',
  },
  {
    name: 'Ημιμόνιμο με Ενίσχυση',
    nameEn: 'Semi-Permanent + Strengthening',
    description: 'με ενίσχυση φυσικού νυχιού',
    price: '25',
    badge: null,
  },
  {
    name: 'Ενίσχυση',
    nameEn: 'Nail Strengthening',
    description: 'φυσικό νύχι',
    price: '25',
    badge: null,
  },
  {
    name: 'Gel',
    nameEn: 'Gel Extensions',
    description: 'Κατασκευή & ενίσχυση',
    price: '30',
    badge: null,
  },
  {
    name: 'Nail Art',
    nameEn: 'Nail Design',
    description: 'Σχέδιο & διακόσμηση',
    price: 'Από 5',
    badge: 'Νέο',
  },
];

export default function PriceListSection() {
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
      id="prices"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5E6E8 0%, #FEFCFB 60%, #F5E6E8 100%)' }}
    >
      {/* Decorative elements */}
      <div className="blob-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-50" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="animate-on-scroll text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">Τιμοκατάλογος</p>
          <h2 className="font-display text-section-lg font-light text-foreground mb-4 leading-tight">Τιμές Υπηρεσιών</h2>
          <div className="gold-line-short mb-6" />
          <p className="font-sans text-muted-foreground font-light text-sm md:text-base">
            Ποιότητα που αξίζει κάθε λεπτό
          </p>
        </div>

        {/* Price cards */}
        <div className="space-y-3">
          {priceItems.map((item, i) => (
            <div
              key={item.name}
              className="animate-on-scroll group relative bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden transition-all duration-400 hover:border-primary/40 hover:bg-card"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Left gold bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)' }}
              />

              <div className="flex items-center justify-between px-6 md:px-8 py-5">
                {/* Left: name + description */}
                <div className="flex items-center gap-4">
                  {/* Gold dot */}
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
                  <div>
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="font-display text-lg font-light text-foreground">{item.name}</span>
                      {item.badge && (
                        <span
                          className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full font-sans font-medium"
                          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-sans text-xs text-muted-foreground">
                      {item.nameEn} · {item.description}
                    </span>
                  </div>
                </div>

                {/* Right: price */}
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl font-light text-primary">{item.price}</span>
                  <span className="font-sans text-xs text-muted-foreground">€</span>
                </div>
              </div>

              {/* Bottom divider (not on last) */}
              {i < priceItems.length - 1 && (
                <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="animate-on-scroll text-center font-sans text-xs text-muted-foreground mt-8 opacity-70">
          * Οι τιμές ενημερώνονται τακτικά. Επικοινωνήστε μαζί μας για την τελευταία τιμολόγηση.
        </p>
      </div>
    </section>
  );
}