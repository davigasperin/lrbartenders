'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  return (
    <Wrapper $align={align} data-align={align}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $align?: "center" | "left" }>`
  text-align: ${({ $align }) => ($align === "left" ? "left" : "center")};
  max-width: 720px;
  margin: 0 auto ${({ theme }) => theme.spacing[48]};

  ${({ $align }) =>
    $align === "left" &&
    `
    margin-left: 0;
    margin-right: 0;
  `}

  &[data-align="left"] p {
    margin-left: 0;
    margin-right: 0;
  }

  @media (max-width: 640px) {
    margin-bottom: ${({ theme }) => theme.spacing[32]};
  }
`;

const Eyebrow = styled.p`
  font-size: ${({ theme }) => theme.type.label};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.dourado};
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.type.displayMd};
  color: ${({ theme }) => theme.colors.texto};

  em {
    color: ${({ theme }) => theme.colors.douradoClaro};
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  margin-top: 16px;
  max-width: 60ch;
  margin-left: auto;
  margin-right: auto;
  font-size: ${({ theme }) => theme.type.body};
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.textoMuted};
`;
