import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ServicesSection from '@/app/components/ServicesSection';
import GallerySection from '@/app/components/GallerySection';
import ContactSection from '@/app/components/ContactSection';
import FloatingContactButton from '@/app/components/FloatingContactButton';

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
