import Image from 'next/image';
import Link from 'next/link';

interface PreviewImage {
  src: string;
  alt: string;
  label: string;
}

const previewImages: PreviewImage[] = [
  {
    src: '/assets/images/4.webp',
    alt: '3D nail art με stiletto νύχια, λουλούδια και leopard French – Elegant Nails Αγρίνιο',
    label: '3D Nail Art',
  },
  {
    src: '/assets/images/5.webp',
    alt: 'Αμυγδαλωτό ημιμόνιμο nude με στρας – Elegant Nails Αγρίνιο',
    label: 'Ημιμόνιμο',
  },
  {
    src: '/assets/images/6.webp',
    alt: 'Γυαλιστερό nude μανικιούρ με κρυστάλλους – Elegant Nails Αγρίνιο',
    label: 'Gel Design',
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 px-6 md:px-12 bg-background overflow-hidden">
      <div className="blob-primary absolute top-0 right-0 w-96 h-96 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">Γκαλερί Εργασιών</p>
          <h2 className="font-display text-section-lg font-light text-foreground mb-4 leading-tight">Η Τέχνη μας</h2>
          <div className="gold-line-short mb-6" />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-accent/60 text-accent hover:bg-accent hover:text-background font-sans text-sm font-medium tracking-wide transition-transform duration-300 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"
              />
            </svg>
            Δείτε όλες τις κατηγορίες
          </Link>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0">
          {previewImages.map((image, index) => (
            <li key={image.src} className="will-change-transform" style={{ animation: `fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms both` }}>
              <Link
                href="/gallery"
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-secondary card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`${image.label}: δείτε τη γκαλερί`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  quality={70}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 font-sans text-xs tracking-[0.18em] uppercase text-white translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
