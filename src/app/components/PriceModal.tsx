"use client";

import React, { useEffect } from 'react';

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const priceItems = [
  {
    name: 'Ημιμόνιμο Απλό',
    nameEn: 'Semi-Permanent',
    price: '20',
    badge: 'Δημοφιλές',
  },
  {
    name: 'Ημιμόνιμο με Ενίσχυση',
    nameEn: 'Semi-Permanent + Strengthening',
    price: '25',
    badge: null,
  },
  {
    name: 'Τζελ (Gel)',
    nameEn: 'Gel Extensions',
    price: '30',
    badge: null,
  },
  {
    name: 'Extreme Nail Art / Sculpted',
    nameEn: 'Nail Art & Sculpted',
    price: 'Από 35€+',
    badge: 'Premium',
    priceNote: true,
  },
  {
    name: 'Αφαίρεση (ξένου προϊόντος)',
    nameEn: 'Removal - foreign product',
    price: '5',
    badge: null,
  },
];

export default function PriceModal({ isOpen, onClose }: PriceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="price-modal-title"
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}
        />

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary mb-2">NailsByLina</p>
              <h2 id="price-modal-title" className="font-display text-2xl font-light text-foreground leading-tight">
                Υπηρεσίες & Τιμοκατάλογος
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200"
              aria-label="Κλείσιμο"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Price list */}
        <div className="px-8 py-6 space-y-2">
          {priceItems.map((item) => (
            <div key={item.name} className="group flex items-center justify-between py-4 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--primary)' }} />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-base font-light text-foreground">{item.name}</span>
                    {item.badge && (
                      <span
                        className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full font-sans font-medium"
                        style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-sans text-xs text-muted-foreground">{item.nameEn}</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                {item.priceNote ? (
                  <span className="font-display text-lg font-light text-primary">{item.price}</span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-xl font-light text-primary">{item.price}</span>
                    <span className="font-sans text-xs text-muted-foreground">€</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="px-8 pb-8">
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex gap-3">
              <div className="w-4 h-4 flex-shrink-0 mt-0.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-4 h-4 text-primary"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Οι τιμές για <span className="text-foreground font-medium">Nail Art</span> διαμορφώνονται ανάλογα με τον βαθμό δυσκολίας - stones, charms, 3D art. Επικοινωνήστε μαζί μας για προσφορά.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
