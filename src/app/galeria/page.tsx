import type { Metadata } from 'next';

import { PageHero } from '@/components/PageHero';
import { Gallery } from '@/components/Gallery';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Galeria | LR Bartenders — Momentos e Eventos',
  description:
    'Veja momentos registrados dos nossos serviços: casamentos, formaturas, aniversários e eventos corporativos com a coquetelaria premium da LR Bartenders.',
  alternates: { canonical: '/galeria' },
};

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Momentos que já fizemos acontecer"
        subtitle="Um olhar por dentro dos eventos que marcaram a história da LR Bartenders."
        background="/images/topo-site-04.jpg"
      />
      <Gallery />
      <CTASection />
      <Footer />
    </>
  );
}
