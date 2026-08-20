export interface PriceItem {
  name: string;
  nameEn: string;
  price: string;
  badge: string | null;
  priceNote?: boolean;
  /** Numeric EUR amount for schema.org Offer (omit when price is "from / variable") */
  amountEur?: number;
}

export const PRICE_ITEMS: PriceItem[] = [
  {
    name: 'Ημιμόνιμο Απλό',
    nameEn: 'Semi-Permanent',
    price: '20',
    badge: 'Δημοφιλές',
    amountEur: 20,
  },
  {
    name: 'Ημιμόνιμο με Ενίσχυση',
    nameEn: 'Semi-Permanent + Strengthening',
    price: '25',
    badge: null,
    amountEur: 25,
  },
  {
    name: 'Τζελ (Gel)',
    nameEn: 'Gel Extensions',
    price: '30',
    badge: null,
    amountEur: 30,
  },
  {
    name: 'Extreme Nail Art / Sculpted',
    nameEn: 'Nail Art & Sculpted',
    price: 'Από 35€+',
    badge: 'Premium',
    priceNote: true,
    amountEur: 35,
  },
  {
    name: 'Αφαίρεση (ξένου προϊόντος)',
    nameEn: 'Removal - foreign product',
    price: '5',
    badge: null,
    amountEur: 5,
  },
];

export const PRICE_NOTE =
  'Οι τιμές για Nail Art διαμορφώνονται ανάλογα με τον βαθμό δυσκολίας - stones, charms, 3D art. Επικοινωνήστε μαζί μας για προσφορά.';
