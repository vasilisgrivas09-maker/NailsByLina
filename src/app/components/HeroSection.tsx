import Image from 'next/image';
import heroDesktop from '../../../public/assets/images/hero-desktop.webp';
import heroMobile from '../../../public/assets/images/hero-mobile.webp';
import { INSTAGRAM_URL } from '@/lib/site';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between"
      style={{ minHeight: '100dvh' }}
    >
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={heroDesktop}
          alt="Elegant Nails Αγρίνιο — nail studio μανικιούρ και nail art"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          quality={78}
          className="object-cover object-center"
          placeholder="blur"
        />
      </div>

      <div className="absolute inset-0 z-0 block md:hidden">
        <Image
          src={heroMobile}
          alt="Elegant Nails Αγρίνιο — nail studio μανικιούρ και nail art"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={78}
          className="object-cover object-center"
          placeholder="blur"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75 z-10" />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none grain-overlay z-10" />
      <div className="scan-line z-10" />

      <div className="relative z-20 flex flex-col items-center text-center md:items-start md:text-left justify-start flex-1 px-6 md:px-16 pt-40 md:pt-40 pb-12">
        <div className="animate-fade-in-1 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm mb-8">
          <div className="animate-pulse-gold w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase text-white font-sans font-medium">
            Nail Studio Αγρίνιο
          </span>
        </div>

        <h1
          className="animate-fade-in-2 font-display text-hero-xl font-light leading-[0.9] tracking-tight text-white mb-4"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          Elegant{' '}
          <span className="italic font-semibold" style={{ color: '#F3DDA0' }}>Nails</span>
        </h1>

        <div className="animate-fade-in-2 gold-line-short mb-8 mx-auto md:mx-0" />

        <p
          className="animate-fade-in-3 font-sans font-light text-white tracking-[0.12em] text-base md:text-lg uppercase mb-10"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          Πολυτέλεια σε κάθε λεπτομέρεια
        </p>

        <div className="animate-fade-in-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded overflow-hidden text-primary-foreground font-sans font-medium text-sm tracking-wider uppercase transition-transform duration-500 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(201,169,110,0.5)]"
          >
            <span className="absolute inset-0 gold-shimmer" />
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
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

        <div className="animate-fade-in-4 absolute bottom-8 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 flex flex-col items-center gap-2 opacity-70">
          <span className="text-white tracking-[0.2em] uppercase font-sans text-xs">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
