import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/tailwind.css';
import JsonLd from '@/components/JsonLd';
import {
  INSTAGRAM_URL,
  OG_IMAGE,
  SITE_BRAND,
  SITE_CITY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PHONE_E164,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'μανικιούρ Αγρίνιο',
    'ημιμόνιμο Αγρίνιο',
    'nail art Αγρίνιο',
    'gel νύχια',
    'Elegant Nails',
    'NailsByLina',
  ],
  authors: [{ name: SITE_BRAND }],
  creator: SITE_BRAND,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'el_GR',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        alt: 'Nail art Elegant Nails στο Αγρίνιο',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

const salonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NailSalon',
  name: SITE_NAME,
  alternateName: SITE_BRAND,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: SITE_PHONE_E164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE_CITY,
    addressCountry: 'GR',
  },
  sameAs: [INSTAGRAM_URL.split('?')[0]],
  priceRange: '€€',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'el-GR',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className={dmSans.className}>
        <JsonLd data={salonJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
