'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { Logo } from '@/components/Logo';
import { useIsMobile } from '@/hooks/useMedia';

export function TopBand() {
  const isMobile = useIsMobile();

  return (
    <Band>
      <Inner>
        <BrandLink href="/" aria-label="LR Bartenders — início">
          <Logo size={isMobile ? 112 : 150} />
        </BrandLink>
        <Slogan>Os melhores bartenders de Campinas e região</Slogan>
      </Inner>
    </Band>
  );
}

const Band = styled.section`
  width: 100%;
  background: #000;
  border-bottom: 1px solid rgba(201, 162, 39, 0.35);
  padding: 140px 24px 72px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 116px 24px 56px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  border-radius: 16px;
  animation: bandGlow 4.5s ease-in-out infinite;

  @keyframes bandGlow {
    0%,
    100% {
      box-shadow: 0 0 22px rgba(201, 162, 39, 0.16);
    }
    50% {
      box-shadow: 0 0 42px rgba(240, 215, 123, 0.38);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.dourado};
    outline-offset: 6px;
  }
`;

const Slogan = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: clamp(1.05rem, 2.4vw, 1.5rem);
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.douradoClaro};
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.7);
`;