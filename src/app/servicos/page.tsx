import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { PageHero } from '@/components/PageHero';
import { Services } from '@/components/Services';
import { EventTypes } from '@/components/EventTypes';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Serviços | LR Bartenders — Open Bar Premium para Eventos',
  description:
    'LR Premium, LR Choco (cascata de chocolate), LR Coffee, Bar de Açaí, Bar de Gin e Festival de Caipirinhas para casamentos, formaturas, corporativos e festas.',
  alternates: { canonical: '/servicos' },
};

export default function ServicosPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Serviços"
          title="Serviços que transformam eventos em experiências"
          subtitle="Da coquetelaria premium à cascata de chocolate, oferecemos serviços versáteis e sofisticados para qualquer celebração."
          background="/images/topo-site-02.jpg"
        />
        <Services />
        <EventTypes />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
