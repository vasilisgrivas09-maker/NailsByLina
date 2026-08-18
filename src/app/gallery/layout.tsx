import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { GALLERY_DESCRIPTION, GALLERY_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

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

export default function GalleryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
