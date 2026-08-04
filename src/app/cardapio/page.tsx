import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { PageHero } from '@/components/PageHero';
import { MenuCatalog } from '@/components/MenuCatalog';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cardápio | LR Bartenders — Coquetéis e Drinks Premium',
  description:
    'Conheça os cardápios da LR Bartenders: Festival de Caipirinhas, Old Ideale, Clássicos Atuais, Bar de Gin, Fresh Sem Álcool e Premium Sem Álcool.',
  alternates: { canonical: '/cardapio' },
};

export default function CardapioPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Cardápio"
          title="Roteiros de drinks para cada estilo de festa"
          subtitle="Clássicos atemporais, releituras autorais e opções sem álcool — todos elaborados pela nossa coquetelaria premium."
          background="/images/topo-site-03.jpg"
        />
        <MenuCatalog />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
