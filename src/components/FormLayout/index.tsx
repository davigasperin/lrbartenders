'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';
import Container from '@/components/ui/Container';

export function FormLayout({ children }: { children: ReactNode }) {
  return (
    <Section className="section">
      <FormGrid>{children}</FormGrid>
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

const FormGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 56px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
