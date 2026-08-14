'use client';

import { HeroSlides } from '@/components/HeroSlides';
import { VideoIntro } from '@/components/VideoIntro';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { MenuShowcase } from '@/components/MenuShowcase';
import { Gallery } from '@/components/Gallery';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HeroSlides />
      <VideoIntro />
      <About />
      <Services />
      <MenuShowcase />
      <Gallery />
      <CTASection />
      <Footer />
    </>
  );
}
