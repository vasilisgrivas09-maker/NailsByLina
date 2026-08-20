import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import dynamic from 'next/dynamic';

const ServicesSection = dynamic(
  () => import('@/app/components/ServicesSection'),
  { ssr: true, loading: () => null }
);

const GallerySection = dynamic(
  () => import('@/app/components/GallerySection'),
  { ssr: true, loading: () => null }
);

const ContactSection = dynamic(
  () => import('@/app/components/ContactSection'),
  { ssr: true, loading: () => null }
);

const FloatingContactButton = dynamic(
  () => import('@/app/components/FloatingContactButton'),
  { ssr: false, loading: () => null }
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContactButton />
    </>
  );
}
