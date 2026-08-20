import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  GALLERY_DESCRIPTION,
  GALLERY_TITLE,
  OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

export const metadata: Metadata = {
  title: GALLERY_TITLE,
  description: GALLERY_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
  openGraph: {
    title: GALLERY_TITLE,
    description: GALLERY_DESCRIPTION,
    url: `${SITE_URL}/gallery`,
    siteName: SITE_NAME,
    locale: 'el_GR',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: 'Γκαλερί nail art Elegant Nails Αγρίνιο',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: GALLERY_TITLE,
    description: GALLERY_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Αρχική',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: GALLERY_TITLE,
      item: `${SITE_URL}/gallery`,
    },
  ],
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
