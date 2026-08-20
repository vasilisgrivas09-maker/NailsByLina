export const INSTAGRAM_URL =
  'https://www.instagram.com/liapilamprini/?utm_source=ig_web_button_share_sheet';

export const SITE_NAME = 'Elegant Nails';
export const SITE_BRAND = 'NailsByLina';
export const SITE_CITY = 'Αγρίνιο';
export const SITE_REGION = 'Αιτωλοακαρνανία';
export const SITE_PHONE = '6940132888';
export const SITE_PHONE_DISPLAY = '6940 132 888';
export const SITE_PHONE_E164 = '+306940132888';

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit.replace(/\/$/, '');
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) {
    return `https://${vercelProduction.replace(/\/$/, '')}`;
  }

  // Stable production fallback so sitemap/canonicals never ship as localhost
  if (process.env.NODE_ENV === 'production') {
    return 'https://nailsbylina.vercel.app';
  }

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

export const SITE_TITLE = 'Μανικιούρ Αγρίνιο | Elegant Nails – Ημιμόνιμο & Gel';
export const SITE_DESCRIPTION =
  'Nail studio στο Αγρίνιο για ημιμόνιμο, gel, ενίσχυση και nail art. Κλείστε ραντεβού στο Instagram και απολαύστε πολυτέλεια σε κάθε λεπτομέρεια.';

export const OG_IMAGE = '/assets/images/4.webp';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const GALLERY_TITLE = 'Γκαλερί Νυχιών Αγρίνιο';
export const GALLERY_DESCRIPTION =
  'Δείτε εργασίες ημιμόνιμου, gel και nail art από το Elegant Nails στο Αγρίνιο. Εμπνευστείτε και κλείστε το ραντεβού σας.';
