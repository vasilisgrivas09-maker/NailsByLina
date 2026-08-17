import React from 'react';
import { INSTAGRAM_URL, SITE_BRAND, SITE_CITY, SITE_PHONE, SITE_PHONE_DISPLAY } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: brand */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
          <span className="font-display text-sm font-light text-foreground tracking-wide">
            {SITE_BRAND}
          </span>
        </div>

        {/* Center: copyright */}
        <p className="font-sans text-xs text-muted-foreground">
          © 2026 {SITE_BRAND} · {SITE_CITY}
        </p>

        {/* Right: links */}
        <div className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href={`tel:${SITE_PHONE}`}
            className="font-sans text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {SITE_PHONE_DISPLAY}
          </a>
          <a
            href="/#contact"
            className="font-sans text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Επικοινωνία
          </a>
        </div>
      </div>
    </footer>
  );
}