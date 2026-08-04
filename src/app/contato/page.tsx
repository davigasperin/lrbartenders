import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { PageHero } from '@/components/PageHero';
import { FormLayout, FormCard } from '@/components/FormLayout';
import { ContactForm } from '@/components/ContactForm';
import { ContactInfo } from '@/components/ContactInfo';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contato | LR Bartenders — Bartenders para Festas e Eventos',
  description:
    'Entre em contato com a LR Bartenders por telefone, WhatsApp, e-mail ou Instagram. Atendemos festas e eventos em Campinas e região.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Contato"
          title="Estamos à disposição"
          subtitle="Tire suas dúvidas, agende uma degustação ou peça um orçamento. Escolha o melhor canal para você."
          background="/images/topo-site-03.jpg"
        />
        <FormLayout>
          <FormCard>
            <ContactForm />
          </FormCard>
          <ContactInfo />
        </FormLayout>
      </main>
      <Footer />
    </>
  );
}
