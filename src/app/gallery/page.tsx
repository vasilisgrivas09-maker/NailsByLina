'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppImage from '@/components/ui/AppImage';
import FloatingContactButton from '@/app/components/FloatingContactButton';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// Δημιουργία των 50 εικόνων — υπολογίζεται ΜΙΑ φορά σε επίπεδο module
const generateGalleryImages = (): GalleryImage[] => {
  const images: GalleryImage[] = [];
  for (let i = 1; i <= 50; i++) {
    images.push({
      id: i,
      src: `/assets/images/${i}.webp`,
      alt: `Εργασία νυχιών ${i} – Elegant Nails Αγρίνιο`,
    });
  }
  return images;
};

const galleryImages: GalleryImage[] = generateGalleryImages();

// Πόσες εικόνες φορτώνουν με priority (above the fold) για καλύτερο LCP
const PRIORITY_COUNT = 4;

// ✅ Progressive / windowed rendering: πόσες εικόνες φορτώνουμε αρχικά
// και πόσες προσθέτουμε κάθε φορά που ο χρήστης πλησιάζει το τέλος της λίστας.
// Αυτό αντικαθιστά την ανάγκη για βαριά virtualization βιβλιοθήκη (π.χ. react-window)
// όσο ο αριθμός εικόνων παραμένει σε λογικά όρια (μέχρι μερικές εκατοντάδες).
const INITIAL_BATCH = 32;
const BATCH_SIZE = 12;

// SVG Icons
const XIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} className={className}>
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} className={className}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);



const SpinnerIcon = () => (
  <div
    className="w-9 h-9 rounded-full border-2 border-white/20 border-t-white animate-spin"
    role="status"
    aria-label="Φόρτωση εικόνας"
  />
);

// Gallery Content Component
const GalleryContent = () => {
  // Lightbox state — μία και μοναδική πηγή αλήθειας για ποια εικόνα εμφανίζεται
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Progressive rendering του κεντρικού grid
  const [visibleCount, setVisibleCount] = useState(Math.min(INITIAL_BATCH, galleryImages.length));
  const sentinelRef = useRef<HTMLDivElement>(null);
  const visibleImages = galleryImages.slice(0, visibleCount);

  const currentImage = lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ✅ Φόρτωσε την επόμενη παρτίδα εικόνων ΠΡΙΝ ο χρήστης φτάσει στο τέλος (rootMargin)
  useEffect(() => {
    if (visibleCount >= galleryImages.length) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, galleryImages.length));
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? prev : (prev + 1) % galleryImages.length));
  }, []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const openLightbox = (index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    previousFocusRef.current?.focus();
  }, []);

  // ✅ Κάθε φορά που αλλάζει η εικόνα, δείξε μαύρο+spinner μέχρι να φορτώσει η ΝΕΑ εικόνα.
  // Έτσι δεν υπάρχει ποτέ overlap/ανακάτεμα ανάμεσα σε παλιά και νέα εικόνα.
  useEffect(() => {
    if (lightboxIndex !== null) {
      setIsImageLoading(true);
    }
  }, [lightboxIndex]);

  // Εστίαση στο κουμπί κλεισίματος όταν ανοίγει το lightbox (προσβασιμότητα)
  useEffect(() => {
    if (lightboxIndex !== null) {
      closeButtonRef.current?.focus();
    }
  }, [lightboxIndex !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ Preload της επόμενης & προηγούμενης εικόνας ώστε τα βέλη να νιώθουν στιγμιαία
  useEffect(() => {
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + 1) % galleryImages.length;
    const prevIdx = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    const srcs = [galleryImages[nextIdx].src, galleryImages[prevIdx].src];
    const links = srcs.map((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((l) => l.remove());
    };
  }, [lightboxIndex]);

  // Keyboard shortcuts μέσα στο lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, goToPrevious, goToNext, closeLightbox]);

  // Καθαρισμός overflow σε unmount (π.χ. αλλαγή σελίδας ενώ είναι ανοιχτό το lightbox)
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  // Touch support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) goToNext();
    if (diff < -50) goToPrevious();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleThumbKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  };

  // JSON-LD structured data για SEO (ImageGallery) — αφορά ΟΛΕΣ τις εικόνες,
  // ανεξάρτητα από το πόσες είναι ήδη ορατές στο progressive rendering
  const jsonLd = useMemo(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: '50 Δημιουργίες Νυχιών',
      description: '50 εκπληκτικές δημιουργίες νυχιών με έμφαση στη λεπτομέρεια και την αισθητική.',
      image: galleryImages.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: `${siteUrl}${img.src}`,
        description: img.alt,
      })),
    };
  }, []);

  return (
    <section className="px-4 md:px-8 pb-16">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Gallery Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-rose-500 mb-4">Gallery</p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">50 Δημιουργίες</h2>
          <div className="w-12 h-0.5 bg-rose-500 mx-auto mb-6" />
          <p className="text-gray-400 font-light text-sm md:text-base max-w-md mx-auto">
            50 εκπληκτικές δημιουργίες νυχιών, επιλεγμένες για να αναδείξουν κάθε λεπτομέρεια.
          </p>
          <div className="flex justify-center mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-2 text-rose-500">
              <span className="text-xs">✦</span>
              {galleryImages.length} φωτογραφίες
            </span>
          </div>
        </motion.div>

        <ul role="list" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {visibleImages.map((image, index) => (
            <motion.li
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
              className="relative"
              style={{ height: 280 + (index % 5) * 30 }}
            >
              <motion.div
                role="button"
                tabIndex={0}
                aria-label={`Προβολή εικόνας ${image.id} σε πλήρη οθόνη`}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-900 border border-gray-800 w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                onClick={() => openLightbox(galleryImages.findIndex((g) => g.id === image.id))}
                onKeyDown={(e) => handleThumbKeyDown(e, galleryImages.findIndex((g) => g.id === image.id))}
              >
                <div className="relative w-full h-full">
                  <AppImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    {...(index < PRIORITY_COUNT ? { priority: true } : { loading: 'lazy' as const })}
                  />
                </div>

                {/* Hover Overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-4 right-4">
                    <span className="text-white/60 text-xs font-light">#{image.id}</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        {/* Sentinel για progressive loading — αόρατο, ενεργοποιεί την επόμενη παρτίδα */}
        {visibleCount < galleryImages.length && (
          <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />
        )}

        <motion.div
          className="text-center mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {galleryImages.length} φωτογραφίες • Πάτησε για μεγέθυνση
        </motion.div>
      </div>

      {/* Lightbox - Full Screen */}
      <AnimatePresence>
        {currentImage && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Προβολή εικόνας σε πλήρη οθόνη"
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors p-2"
              aria-label="Κλείσιμο πλήρους προβολής"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XIcon size={28} className="text-white" />
            </motion.button>

            {/* Image Counter */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm"
              aria-live="polite"
            >
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Navigation Arrows */}
            <motion.button
              type="button"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 md:left-4 z-50 text-white/80 hover:text-white transition-colors p-2.5 md:p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm flex"
              aria-label="Προηγούμενη εικόνα"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon size={26} className="text-white" />
            </motion.button>

            <motion.button
              type="button"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 md:right-4 z-50 text-white/80 hover:text-white transition-colors p-2.5 md:p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm flex"
              aria-label="Επόμενη εικόνα"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRightIcon size={26} className="text-white" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              className="relative w-full h-[85vh] max-w-7xl mx-4 flex items-center justify-center"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                {/* ✅ Native <img>: κρατάει το φυσικό aspect ratio και περιορίζεται μόνο
                    από max-width/max-height, ώστε ολόκληρη η εικόνα να παραμένει ορατή. */}
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <SpinnerIcon />
                  </div>
                )}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={lightboxIndex}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-200 ${
                    isImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  decoding="async"
                  draggable={false}
                  onLoad={() => setIsImageLoading(false)}
                />
              </div>

              {/* Image Info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 pointer-events-none"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center justify-center max-w-3xl mx-auto flex-wrap gap-2">
                  <div className="text-center">
                    <p className="text-white text-sm font-light">{currentImage.alt}</p>
                    <span className="text-xs text-white/40">#{currentImage.id}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Nail Tips - ΑΜΕΤΑΒΛΗΤΑ
const nailTips = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Πώς να διατηρήσεις τα extreme νύχια σου για 4 εβδομάδες χωρίς σπασίματα',
    body: 'Απόφυγε να χρησιμοποιείς τα νύχια σου ως εργαλείο. Φόρα γάντια στις δουλειές σπιτιού και ενυδάτωνε τα χέρια σου καθημερινά με λάδι και κρέμα. Η σωστή φροντίδα μπορεί να διπλασιάσει τη διάρκεια της εφαρμογής.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.513.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.611l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.611l1.285-5.386a.562.562 0 00-.182-.557L6.204 10.11a.563.563 0 01.321-.988l5.513-.442a.563.563 0 00.475-.345L11.48 3.499z" />
      </svg>
    ),
    title: 'Γιατί η ενίσχυση είναι απαραίτητη για μεγάλα νύχια',
    body: 'Τα μεγάλα νύχια χωρίς ενίσχυση σπάνε εύκολα. Η ενίσχυση δημιουργεί μια προστατευτική στρώση που κρατά το φυσικό νύχι υγιές, ενώ επιτρέπει το μήκος και το σχήμα που θέλεις χωρίς κίνδυνο.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Do's and Don'ts πριν έρθεις στο ραντεβού",
    body: "✅ Do: Έλα με καθαρά χέρια, χωρίς βερνίκι ή λάδι. Ενημέρωσε για τυχόν αλλεργίες. ❌ Don't: Μην κόψεις ή λιμάρεις τα νύχια σου πριν – άφησε τα στα χέρια μας για το καλύτερο αποτέλεσμα.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 8.25l.258 1.035a3.375 3.375 0 002.455 2.456L21.75 12l-1.035.259a3.375 3.375 0 00-2.455 2.456L18 15.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 12l1.036-.259a3.375 3.375 0 002.455-2.456L18.25 8.25z" />
      </svg>
    ),
    title: 'Πότε να κλείσεις το επόμενο ραντεβού',
    body: 'Για ημιμόνιμο: κάθε 2-3 εβδομάδες. Για gel/ενίσχυση: κάθε 3-4 εβδομάδες. Μην αφήνεις να περάσουν πάνω από 5 εβδομάδες – το φυσικό νύχι μεγαλώνει και αυξάνεται ο κίνδυνος σπασίματος.',
  },
];

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black overflow-x-hidden">

      {/* Hero */}
      <motion.section
        className="pt-32 pb-16 px-6 md:px-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Αρχική
          </Link>
          <p className="text-xs tracking-[0.3em] uppercase text-rose-500 mb-4">Γκαλερί Εργασιών</p>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">Η Τέχνη μας</h1>
          <div className="w-12 h-0.5 bg-rose-500 mx-auto mb-6" />
          <p className="text-gray-400 font-light text-sm md:text-base max-w-md mx-auto">
            Κάθε εργασία είναι μια μοναδική δημιουργία – επιλεγμένη για εσάς.
          </p>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <GalleryContent />

      {/* Nail Care Guide - ΑΜΕΤΑΒΛΗΤΟ */}
      <motion.section
        className="px-6 md:px-12 py-24 border-t border-gray-800"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-rose-500 mb-4">Συμβουλές φροντίδας</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Nail Care Guide</h2>
            <div className="w-12 h-0.5 bg-rose-500 mx-auto mb-6" />
            <p className="text-gray-400 font-light text-sm md:text-base max-w-md mx-auto">
              Δώσε αξία στα νύχια σου. Μάθε πώς να τα διατηρείς όμορφα για εβδομάδες.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {nailTips.map((tip, i) => (
              <motion.div
                key={i}
                className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-7 overflow-hidden"
                whileHover={{ borderColor: '#e11d48', transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute top-0 left-0 h-[1px] bg-rose-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.7 }}
                />

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-rose-500/30 flex items-center justify-center flex-shrink-0 text-rose-500 group-hover:bg-rose-500/10 transition-all duration-300">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-light text-white mb-3 leading-snug">{tip.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{tip.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      </main>
      <Footer />
      <FloatingContactButton />
    </>
  );
}
