'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

export function FormLayout({ children }: { children: ReactNode }) {
  return (
    <Section className="section">
      <Container>{children}</Container>
    </Section>
  );
}

export const FormCard = styled.div`
  background: rgba(11, 58, 63, 0.18);
  border: 1px solid rgba(201, 162, 39, 0.18);
  border-radius: ${({ theme }) => theme.radius.large};
  padding: 36px;

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.fundo};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 56px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
