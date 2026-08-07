'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Container from '@/components/ui/Container';
import { buttonBase, buttonSizes, buttonVariants } from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';
import { CTA } from '@/lib/content';
import { buildWhatsAppLink } from '@/lib/site';
import { usePrefersReducedMotion } from '@/hooks/useMedia';

export function CTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        return;
      }

      gsap.from('[data-cta-anim]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.to('[data-cta-button]', {
        scale: 1.06,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section ref={sectionRef}>
      <Bg />
      <CtaContainer>
        <Title data-cta-anim>{CTA.title}</Title>
        <Subtitle data-cta-anim>{CTA.subtitle}</Subtitle>
        <Actions data-cta-anim>
          <Primary data-cta-button href="/orcamento">
            {CTA.primary.label}
          </Primary>
          <Ghost href={buildWhatsAppLink('Olá! Gostaria de mais informações sobre os serviços da LR Bartenders.')}>
            {CTA.secondary.label}
          </Ghost>
        </Actions>
      </CtaContainer>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[128]} 24px;
  text-align: center;
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.base};
  background: linear-gradient(
      135deg,
      rgba(6, 35, 39, 0.92) 0%,
      rgba(71, 24, 40, 0.94) 100%
    ),
    url('/images/cta-bg.jpg') center / cover no-repeat;
`;

const CtaContainer = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  max-width: 760px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.type.displayMd};
  color: ${({ theme }) => theme.colors.texto};

  em {
    color: ${({ theme }) => theme.colors.douradoClaro};
  }
`;

const Subtitle = styled.p`
  margin: ${({ theme }) => theme.spacing[24]} auto 0;
  max-width: 52ch;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing[40]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Primary = styled(Link)`
  ${buttonBase}
  ${buttonSizes.lg}
  ${buttonVariants.primary}
`;
const Ghost = styled(Link)`
  ${buttonBase}
  ${buttonSizes.lg}
  ${buttonVariants.ghost}
`;
