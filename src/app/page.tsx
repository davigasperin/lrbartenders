'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { HeroSlides } from '@/components/HeroSlides';
import { Services } from '@/components/Services';
import { MenuShowcase } from '@/components/MenuShowcase';
import { Gallery } from '@/components/Gallery';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <HeroSlides />
      <Services />
      <MenuShowcase />
      <Gallery />
      <CTASection />
      <Footer />
    </>
  );
}
