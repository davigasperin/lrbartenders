'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <Wrapper>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  max-width: 720px;
  margin: 0 auto 56px;
`;

const Eyebrow = styled.p`
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.dourado};
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  color: ${({ theme }) => theme.colors.texto};

  em {
    background: ${({ theme }) => theme.gradients.goldText};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  margin-top: 16px;
  font-size: 1.02rem;
  color: ${({ theme }) => theme.colors.textoMuted};
`;
