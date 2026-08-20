import { PRICE_ITEMS, PRICE_NOTE } from '@/lib/prices';

export default function PricesSection() {
  return (
    <section id="prices" className="relative py-24 px-6 md:px-12 bg-background" aria-labelledby="prices-heading">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">Τιμοκατάλογος</p>
          <h2 id="prices-heading" className="font-display text-section-lg font-light text-foreground mb-4 leading-tight">
            Υπηρεσίες &amp; Τιμές
          </h2>
          <div className="gold-line-short mb-6" />
          <p className="font-sans text-muted-foreground font-light text-sm md:text-base">
            Διαφανείς τιμές για μανικιούρ, ημιμόνιμο, gel και nail art στο Αγρίνιο
          </p>
        </div>

        <ul className="space-y-0 border border-border rounded-2xl overflow-hidden bg-card">
          {PRICE_ITEMS.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-3 px-5 md:px-8 py-4 md:py-5 border-b border-border last:border-b-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-display text-base md:text-lg font-light text-foreground">{item.name}</span>
                  {item.badge && (
                    <span
                      className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full font-sans font-medium"
                      style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="font-sans text-xs text-muted-foreground">{item.nameEn}</span>
              </div>
              <div className="flex-shrink-0">
                {item.priceNote ? (
                  <span className="font-display text-base md:text-lg font-light text-primary whitespace-nowrap">
                    {item.price}
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-xl font-light text-primary">{item.price}</span>
                    <span className="font-sans text-xs text-muted-foreground">€</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 font-sans text-xs text-muted-foreground leading-relaxed text-center max-w-xl mx-auto">
          {PRICE_NOTE}
        </p>
      </div>
    </section>
  );
}
