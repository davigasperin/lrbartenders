'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

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
      <Container>
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
      </Container>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  text-align: center;
`;

const Bg = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.base};
  background: linear-gradient(
      135deg,
      rgba(11, 58, 63, 0.92) 0%,
      rgba(90, 31, 46, 0.94) 100%
    ),
    url('/images/cta-bg.jpg') center / cover no-repeat;
`;

const Container = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  max-width: 760px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 6vw, 3.6rem);
  color: ${({ theme }) => theme.colors.texto};

  em {
    color: ${({ theme }) => theme.colors.douradoClaro};
  }
`;

const Subtitle = styled.p`
  margin: 20px auto 0;
  max-width: 580px;
  color: ${({ theme }) => theme.colors.textoMuted};
`;

const Actions = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const baseBtn = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 34px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.98rem;
  letter-spacing: 0.03em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-3px); }
`;

const Primary = styled(Link)`
  ${baseBtn}
  color: ${({ theme }) => theme.colors.verdePetroleoEscuro};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.douradoClaro} 0%,
    ${({ theme }) => theme.colors.dourado} 60%,
    ${({ theme }) => theme.colors.douradoEscuro} 100%
  );
  box-shadow: ${({ theme }) => theme.shadows.goldStrong};
`;

const Ghost = styled(Link)`
  ${baseBtn}
  color: ${({ theme }) => theme.colors.texto};
  border: 1px solid rgba(240, 215, 123, 0.6);
  background: rgba(7, 37, 41, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;
