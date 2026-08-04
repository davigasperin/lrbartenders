import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { PageHero } from '@/components/PageHero';
import { FormLayout, FormCard } from '@/components/FormLayout';
import { OrcamentoForm } from '@/components/OrcamentoForm';
import { ContactInfo } from '@/components/ContactInfo';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Orçamento | LR Bartenders — Premium Open Bar para Eventos',
  description:
    'Solicite um orçamento personalizado para o seu evento: casamento, 15 anos, formatura ou festa corporativa. Coquetelaria premium em Campinas e região.',
  alternates: { canonical: '/orcamento' },
};

export default function OrcamentoPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Orçamento"
          title="Vamos transformar a sua festa?"
          subtitle="Preencha o formulário abaixo e receba um orçamento personalizado. Respondemos rapidamente pelo WhatsApp."
          background="/images/topo-site-02.jpg"
        />
        <FormLayout>
          <FormCard>
            <OrcamentoForm />
          </FormCard>
          <ContactInfo />
        </FormLayout>
      </main>
      <Footer />
    </>
  );
}
