'use client';

import { Header } from '@/components/Header';
import { TopBand } from '@/components/TopBand';
import { HeroSlides } from '@/components/HeroSlides';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { MenuShowcase } from '@/components/MenuShowcase';
import { Gallery } from '@/components/Gallery';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <TopBand />
      <HeroSlides />
      <About />
      <Services />
      <MenuShowcase />
      <Gallery />
      <CTASection />
      <Footer />
    </>
  );
}