'use client';

import styled from 'styled-components';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PlaceholderSection className="section">
          <div className="container">
            <Tag>Fase 1 — em construção</Tag>
            <Text>
              As próximas seções da Home (Sobre, Serviços, Cardápios, Galeria,
              CTA e Footer) chegam na Fase 2 do roadmap.
            </Text>
          </div>
        </PlaceholderSection>
      </main>
    </>
  );
}

const PlaceholderSection = styled.section`
  background: ${({ theme }) => theme.colors.fundoAlt};
  text-align: center;
`;

const Tag = styled.p`
  font-size: 0.78rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.dourado};
  margin-bottom: 12px;
`;

const Text = styled.p`
  max-width: 560px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
