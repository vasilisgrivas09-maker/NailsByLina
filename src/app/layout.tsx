import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import '../styles/tailwind.css';
import JsonLd from '@/components/JsonLd';
import { PRICE_ITEMS } from '@/lib/prices';
import {
  INSTAGRAM_URL,
  OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_BRAND,
  SITE_CITY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PHONE_E164,
  SITE_REGION,
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
    'gel νύχια Αγρίνιο',
    'νύχια Αγρίνιο',
    'Elegant Nails',
    'NailsByLina',
    'τιμοκατάλογος μανικιούρ',
  ],
  authors: [{ name: SITE_BRAND }],
  creator: SITE_BRAND,
  category: 'beauty',
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
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
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
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

const offerCatalog = {
  '@type': 'OfferCatalog',
  name: 'Υπηρεσίες νυχιών',
  itemListElement: PRICE_ITEMS.map((item, index) => ({
    '@type': 'Offer',
    position: index + 1,
    name: item.name,
    description: item.nameEn,
    priceCurrency: 'EUR',
    price: String(item.amountEur ?? (item.price.replace(/[^\d.]/g, '') || '0')),
    availability: 'https://schema.org/InStock',
    url: `${SITE_URL}/#prices`,
  })),
};

const salonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NailSalon',
  '@id': `${SITE_URL}/#salon`,
  name: SITE_NAME,
  alternateName: SITE_BRAND,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: SITE_PHONE_E164,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE_CITY,
    addressRegion: SITE_REGION,
    addressCountry: 'GR',
  },
  areaServed: {
    '@type': 'City',
    name: SITE_CITY,
  },
  sameAs: [INSTAGRAM_URL.split('?')[0]],
  hasOfferCatalog: offerCatalog,
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: SITE_BRAND,
  url: SITE_URL,
  inLanguage: 'el-GR',
  publisher: { '@id': `${SITE_URL}/#salon` },
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
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
