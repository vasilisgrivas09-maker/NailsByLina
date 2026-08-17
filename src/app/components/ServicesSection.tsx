'use client';

import React, { useEffect, useRef } from 'react';

const services = [
  {
    id: 1,
    title: 'Ημιμόνιμο',
    subtitle: 'Semi-Permanent',
    description:
      'Έντονο χρώμα που διαρκεί έως 3 εβδομάδες. Γρήγορη εφαρμογή, γυαλιστερό αποτέλεσμα και αντοχή που ταιριάζει στον ρυθμό της καθημερινότητάς σας.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Ενίσχυση',
    subtitle: 'Nail Strengthening',
    description:
      'Ενδυνάμωση και προστασία του φυσικού νυχιού με εξειδικευμένη τεχνική. Ιδανικό για εύθραυστα νύχια που χρειάζονται φροντίδα και στήριγμα.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.513.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.611l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.611l1.285-5.386a.562.562 0 00-.182-.557L6.204 10.11a.563.563 0 01.321-.988l5.513-.442a.563.563 0 00.475-.345L11.48 3.499z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Gel',
    subtitle: 'Gel Extensions',
    description:
      'Κατασκευή νυχιών με gel για τέλειο σχήμα και μήκος. Ανθεκτική επιλογή με φυσική εμφάνιση, κατάλληλη για κάθε περίσταση και στυλ.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Nail Art',
    subtitle: 'Nail Design',
    description:
      'Μοναδικά σχέδια και διακοσμήσεις προσωποποιημένα στο δικό σας στυλ. Από minimal γραμμές μέχρι floral και geometric patterns – κάθε νύχι είναι έργο τέχνης.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 8.25l.258 1.035a3.375 3.375 0 002.455 2.456L21.75 12l-1.035.259a3.375 3.375 0 00-2.455 2.456L18 15.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 12l1.036-.259a3.375 3.375 0 002.455-2.456L18.25 8.25z"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-24 px-6 md:px-12 bg-background overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob-gold absolute top-0 right-0 w-96 h-96 pointer-events-none" />
      <div className="blob-primary absolute bottom-0 left-0 w-80 h-80 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="animate-on-scroll text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">Οι Υπηρεσίες μας</p>
          <h2 className="font-display text-section-lg font-light text-foreground mb-4 leading-tight">Τέχνη στα Νύχια σας</h2>
          <div className="gold-line-short mb-6" />
          <p className="font-sans text-muted-foreground font-light max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Κάθε υπηρεσία σχεδιάστηκε για να σας προσφέρει αποτελέσματα υψηλής αισθητικής.
          </p>
        </div>

        {/* Services grid - 2x2 asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="animate-on-scroll card-hover group relative bg-card border border-border rounded-2xl p-8 overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Corner gold accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div
                  className="absolute top-0 right-0 w-32 h-32 rotate-45 translate-x-16 -translate-y-16 opacity-20"
                  style={{ background: 'var(--primary)' }}
                />
              </div>

              {/* Top line accent */}
              <div
                className="absolute top-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-700 ease-out"
                style={{ background: 'var(--primary)' }}
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:bg-secondary group-hover:border-primary/60 transition-all duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                {service.subtitle}
              </p>
              <h3 className="font-display text-2xl font-light text-foreground mb-3">{service.title}</h3>
              <div className="w-8 h-px mb-4" style={{ background: 'var(--primary)' }} />
              <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}