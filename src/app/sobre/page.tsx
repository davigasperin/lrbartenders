import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { PageHero } from '@/components/PageHero';
import { SobreContent } from '@/components/SobreContent';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre a LR Bartenders | Coquetelaria Premium em Campinas',
  description:
    'Conheça a história da LR Bartenders: criada em 2012, referência em coquetelaria premium, bartenders profissionais e eventos inesquecíveis em Campinas e região.',
  alternates: { canonical: '/sobre' },
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Sobre nós"
          title="A arte de servir, elevada à sofisticação"
          subtitle="Conheça a história, a missão e a essência da LR Bartenders — referência em coquetelaria premium para festas e eventos."
          background="/images/topo-site-01.jpg"
        />
        <SobreContent />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
