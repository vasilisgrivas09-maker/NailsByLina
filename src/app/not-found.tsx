import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Η σελίδα δεν βρέθηκε',
  description: 'Η σελίδα που ζητήσατε δεν υπάρχει. Επιστρέψτε στην αρχική του Elegant Nails Αγρίνιο.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl font-light text-primary/25 mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="font-display text-2xl font-light text-foreground mb-3">Η σελίδα δεν βρέθηκε</h1>
        <p className="font-sans text-sm text-muted-foreground mb-8 leading-relaxed">
          Η διεύθυνση δεν υπάρχει ή μετακινήθηκε. Μπορείτε να επιστρέψετε στην αρχική σελίδα.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded text-sm font-sans font-medium tracking-wider uppercase"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          Αρχική σελίδα
        </Link>
      </div>
    </div>
  );
}
